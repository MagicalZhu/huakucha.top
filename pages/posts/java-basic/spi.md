---
  author: '花裤衩'
  title: SPI机制
  tags:
    - Java
    - Spring
  date: 2022-11-30 04:07:06
  categories: Java基础
---

[[TOC]]

## 什么是SPI

SPI (Service Provider Interface), 是JDK内置的一种 **`服务发现机制`**, 可以用来**启用框架拓展和替换组件**。它主要面向于框架的开发者使用,比如数据库驱动接口 `java.sql.Driver`, 不同的数据库厂商可以针对同一接口做出不同的实现(MySQL 和 PostgreSQL都有不同的实现提供给用户)。
SPI 机制可以**为某个接口寻找服务实现**, 它的主要思想是`将装配的控制权移到程序之外`,在模块化设计中这个机制尤其重要, 其核心思想就是 **`解耦`**。

SPI整体机制图如下:

![SPI机制](/spi/SPI-Mechanism.png)


当服务的提供方提供了一种接口的实现之后,需要在 `classpath` 下面的 ***`META-INF/services/`*** 目录中创建一个**以服务接口命名的文件**, 这个文件的内容就是这个接口的实现类的**全类名**。

当其他的程序需要这个服务的时候,就可以通过查找这个jar包的 *META-INF/services/* 中的配置文件,配置文件中有接口的具体实现全类名, **然后可以利用这个类名通过反射进行加载以及实例化**,就可以使用该服务了。JDK中查找服务的实现的工具类是: **`java.util.ServiceLoader`**

## 简单的示例

> 我们现在需要使用一个内容搜索接口,搜索的实现可能是基于文件系统的搜索,也可能是基于数据库的搜索。
>
> 示例中可以看出来,通过*ServiceLoader* 可以加载 *META-INF/services/* 下的文件,并且通过反射创建文件中指定的对象

1. 定义好搜索的接口以及其实现类
    ```java
    // 定义服务接口
    package com.yoey.spiDemo;
    public interface Search {
      public String searchDoc(String keyword);
    }

    // 定义服务接口的实现类
    package com.yoey.spiDemo;

    public class SearchByFS implements Search{
      @Override
      public String searchDoc(String keyword) {
        return "SearchByFS=>" + keyword;
      }
    }

    public class SearchByDB implements Search{

      @Override
      public String searchDoc(String keyword) {
        return "SearchByDB=>" + keyword;
      }
    }
    ```

2. 在 classpath 下的 *META-INF/services* 目录下创建**服务接口全类名的文件**,这里就是 *com.yoey.spiDemo.Search*

    ```ini
    # Search 接口的实现类全类名
    com.yoey.spiDemo.SearchByFS
    ```

3. 测试
    ```java
    public static void main(String[] args) {
      ServiceLoader<Search> seasrchList = ServiceLoader.load(Search.class);
      seasrchList.forEach((s) -> {
        System.out.println(s.searchDoc("hello")); // out: SearchByFS=>hello
      });
    }
    ```

可以看到输出结果：文件搜索 SearchByFS=>hello

如果在com.yoey.spiDemo.Search文件里写上两个实现类,那最后的输出结果就是两行了。这就是因为 *ServiceLoader.load(Search.class)* 在加载某接口时, 会去 *META-INF/services* 下找接口的全限定名文件, 再根据里面的内容加载相应的实现类。

这就是spi的思想: <mark>接口的实现由provider实现, provider 只需要在提交的jar包里的 META-INF/services下根据平台定义的接口新建文件,并添加进相应的实现类的全限定名即可!</mark>


## SPI的广泛应用

### JDBC Manager

> 在JDBC4.0之前,我们开发有连接数据库的时候,通常会用 *Class.forName("com.mysql.jdbc.Driver")* 这句先加载数据库相关的驱动,然后再进行获取连接等的操作
>
> 而JDBC4.0之后不需要用 *Class.forName("com.mysql.jdbc.Driver")* 来加载驱动,直接获取连接就可以了,因为现在这种方式就是使用了Java的SPI扩展机制来实现


#### 定义与实现

- JDBC接口的定义
  - 首先在java中定义了接口java.sql.Driver,并没有具体的实现,具体的实现都是由不同厂商来提供的。

- MySQL
  - MySQL 的jar包 mysql-connector-java-6.0.6.jar 中,可以找到META-INF/services目录,该目录下会有一个名字为java.sql.Driver的文件,文件内容是 `com.mysql.cj.jdbc.Driver`, 这里面的内容就是针对JDBC定义的接口的实现

- Postgresql
  - 在postgresql的jar包 postgresql-42.0.0.jar中,也可以找到同样的配置文件,文件内容是 `org.postgresql.Driver`,这是postgresql对Java的java.sql.Driver的实现

#### 使用方法

不再需要通过 *Class.forName* 的方式加载启动类,而是直接使用如下代码:
```java
String url = "jdbc:xxxx://xxxx:xxxx/xxxx";
Connection conn = DriverManager.getConnection(url,username,password);
```

#### 源码解析

> 我们通过上述的示例看到并没有显式的使用SPI,但是的确通过该操作就可以操作DB,关键操作在于 **DriverManager**

我们看下 DriverManager 的处理:

```java {lines: "28-34"}
/**
  * 静态代码块,加载类的时候就会被调用,主要用于加载 JDBC 的各种驱动
  * Load the initial JDBC drivers by checking the System property
  * jdbc.properties and then use the ServiceLoader mechanism
  */
static {
  loadInitialDrivers();
  println("JDBC DriverManager initialized");
}

// 加载 JDBC 驱动
private static void loadInitialDrivers() {
  String drivers;
  try {
    // ①、从系统变量中获取有关驱动的定义
    drivers = AccessController.doPrivileged(new PrivilegedAction<String>() {
      public String run() {
        return System.getProperty("jdbc.drivers");
      }
    });
  } catch (Exception ex) {
    drivers = null;
  }
  // SPI的使用
  AccessController.doPrivileged(new PrivilegedAction<Void>() {
    public Void run() {
      // ②、使用SPI来获取驱动的实现
      ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class);
      Iterator<Driver> driversIterator = loadedDrivers.iterator();
      try{
        // ③、遍历使用SPI获取到的具体实现,实例化各个实现类
        while(driversIterator.hasNext()) {
          driversIterator.next();
        }
      } catch(Throwable t) { }
      return null;
    }
  });
  println("DriverManager.initialize: jdbc.drivers = " + drivers);
  if (drivers == null || drivers.equals("")) {
    return;
  }
  String[] driversList = drivers.split(":");
  println("number of Drivers:" + driversList.length);
  for (String aDriver : driversList) {
    try {
      println("DriverManager.Initialize: loading " + aDriver);
      Class.forName(aDriver, true,ClassLoader.getSystemClassLoader());
    } catch (Exception ex) {
      println("DriverManager.Initialize: load failed: " + ex);
    }
  }
}
```

### Commons-Logging

> commons-logging(也称Jakarta Commons Logging,缩写 JCL)是常用的日志库门面

1. 首先,日志实例是通过 LogFactory 的getLog(String)方法创建的:

    ```java
    public static getLog(Class clazz) throws LogConfigurationException {
      return getFactory().getInstance(clazz);
    }
    ```
2. LogFactory 是一个抽象类,它负责加载具体的日志实现,可以分析其 getFactory() 方法

    ``` java {lines: '7-8,28-40'}
    public static final String FACTORY_PROPERTY =
                        "org.apache.commons.logging.LogFactory";
    public static final String FACTORY_DEFAULT =
                        "org.apache.commons.logging.impl.LogFactoryImpl";
    public static final String FACTORY_PROPERTIES = "commons-logging.properties";
    // SPI文件路径
    protected static final String SERVICE_ID =
        "META-INF/services/org.apache.commons.logging.LogFactory";
    public static LogFactory getFactory()
                  throws LogConfigurationException {
        // ...
        // 这里真正开始决定使用哪个factory
        // 首先,尝试查找vm系统属性LogFactory,其是否指定factory
        try {
          String factoryClass = getSystemProperty(FACTORY_PROPERTY, null);
          if (factoryClass != null) {
              factory = newFactory(factoryClass, baseClassLoader, contextClassLoader);
          }
        } catch (SecurityException e) {
        } catch (RuntimeException e) {
          throw e;
        }

        // 第二,尝试使用java spi服务发现机制,加载META-INF/services下寻找LogFactory实现
        if (factory == null) {
          try {
            // META-INF/services/LogFactory, SERVICE_ID
            final InputStream is = getResourceAsStream(contextClassLoader, SERVICE_ID);
            if (is != null) {
              BufferedReader rd;
              try {
                rd = new BufferedReader(new InputStreamReader(is, "UTF-8"));
              } catch (java.io.UnsupportedEncodingException e) {
                rd = new BufferedReader(new InputStreamReader(is));
              }
              String factoryClassName = rd.readLine();
              rd.close();
              if (factoryClassName != null && !"".equals(factoryClassName)) {
                factory = newFactory(factoryClassName, baseClassLoader, contextClassLoader);
              }
          }
          } catch (Exception ex) {
            // ignore
          }
        }

        // 第三,从classpath下的commons-logging.properties中查找LogFactory属性指定的factory
        // ...
        // 最后,使用默认的 LogFactory实现
        // ...
      return factory;
    }
    ```

### Spring 中的SPI

> 在 SpringBoot 的自动装配的过程中,最终会加载 `META-INF/spring.factories` 文件,而加载的过程是由 `SpringFactoriesLoader` 加载的。
>
> **加载流程: 从 CLASSPATH 下的每个jar包中搜寻所有 META-INF/spring.factories 配置文件, 然后将解析properties文件,找到指定名称的配置后返回**。
>
> 需要注意的是,其实这里不仅仅是会去 CLASSPATH 路径下查找, 会扫描所有路径下的 jar 包,只不过这个文件只会在 CLASSPATH 下的jar 包中


下面看下 Spring 的源码: **core.io.support.SpringFactoriesLoader#loadFactoryNames** :

```java
public static final String FACTORIES_RESOURCE_LOCATION =
                    "META-INF/spring.factories";

// spring.factories 文件的格式为：key=value1,value2,value3
// 从所有的jar包中找到 META-INF/spring.factories 文件
// 然后从文件中解析出key=factoryClass类名称的所有value值

public static List<String> loadFactoryNames(Class<?> factoryClass,
                                           ClassLoader classLoader) {

  String factoryClassName = factoryClass.getName();
  // 取得资源文件的URL
  Enumeration<URL> urls = (classLoader != null ?
                    classLoader.getResources(FACTORIES_RESOURCE_LOCATION) :
                    ClassLoader.getSystemResources(FACTORIES_RESOURCE_LOCATION));
  List<String> result = new ArrayList<String>();
  // 遍历所有的URL
  while (urls.hasMoreElements()) {
      URL url = urls.nextElement();
      // 根据资源文件URL解析properties文件,得到对应的一组@Configuration类
      Properties properties = PropertiesLoaderUtils.loadProperties(new UrlResource(url));
      String factoryClassNames = properties.getProperty(factoryClassName);
      // 组装数据,并返回
      result.addAll(Arrays.asList(StringUtils.commaDelimitedListToStringArray(factoryClassNames)));
  }
  return result;
}
```

## SPI机制深入

### 使用流程

- 通常我们应该如何使用 SPI 机制呢?
    - **定义标准**
      - 定义标准,就是定义接口。比如接口 *java.sql.Driver*
    - **具体厂商或者框架开发者实现**
      - 在 *META-INF/services* 目录下定义一个名字为接口全限定名的文件, 比如java.sql.Driver文件, 文件内容是具体的实现名字,比如me.cxis.sql.MyDriver
    - 开发者使用

### SPI Vs API

- SPI
  - **接口位于调用方所在的包中**
  - 概念上更依赖调用方
  - 组织上位于调用方所在的包中
  - 实现位于独立的包中
  - 常见的例子是：插件模式的插件

- API
  - **接口位于实现方所在的包中**
  - 概念上更接近实现方。
  - 组织上位于实现方所在的包中。
  - 实现和接口在一个包中

### SPI 原理

```java
//ServiceLoader实现了Iterable接口,可以遍历所有的服务实现者
public final class ServiceLoader<S>
    implements Iterable<S> {

  //查找配置文件的目录
  private static final String PREFIX = "META-INF/services/";

  //表示要被加载的服务的类或接口
  private final Class<S> service;

  //这个ClassLoader用来定位,加载,实例化服务提供者
  private final ClassLoader loader;

  // 访问控制上下文
  private final AccessControlContext acc;

  // 缓存已经被实例化的服务提供者,按照实例化的顺序存储
  private LinkedHashMap<String,S> providers = new LinkedHashMap<>();

  // 迭代器
  private LazyIterator lookupIterator;

  /**
    重新加载,就相当于重新创建ServiceLoader了
    用于新的服务提供者安装到正在运行的Java虚拟机中的情况
   */
  public void reload() {
    //清空缓存中所有已实例化的服务提供者
    providers.clear();
    //新建一个迭代器,该迭代器会从头查找和实例化服务提供者
    lookupIterator = new LazyIterator(service, loader);
  }

  /**

    私有构造器:使用指定的类加载器和服务创建服务加载器
             如果没有指定类加载器,使用系统类加载器,就是应用类加载器
  */
  private ServiceLoader(Class<S> svc, ClassLoader cl) {
      service = Objects.requireNonNull(svc, "Service interface cannot be null");
      loader = (cl == null) ? ClassLoader.getSystemClassLoader() : cl;
      acc = (System.getSecurityManager() != null) ? AccessController.getContext() : null;
      reload();
  }

  //解析失败处理的方法...

  /**
    解析服务提供者配置文件中的一行(首先去掉注释校验,然后保存)
    重复的配置项和已经被实例化的配置项不会被保存
   */
  private int parseLine(Class<?> service,
                        URL u,
                        BufferedReader r,
                        int lc,
                        List<String> names)
              throws IOException, ServiceConfigurationError{
    //读取一行
    String ln = r.readLine();
    if (ln == null) {
        return -1;
    }
    //#号代表注释行
    int ci = ln.indexOf('#');
    if (ci >= 0) ln = ln.substring(0, ci);
    ln = ln.trim();
    int n = ln.length();
    if (n != 0) {
        if ((ln.indexOf(' ') >= 0) || (ln.indexOf('\t') >= 0))
            fail(service, u, lc, "Illegal configuration-file syntax");
        int cp = ln.codePointAt(0);
        if (!Character.isJavaIdentifierStart(cp))
            fail(service, u, lc, "Illegal provider-class name: " + ln);
        for (int i = Character.charCount(cp); i < n; i += Character.charCount(cp)) {
            cp = ln.codePointAt(i);
            if (!Character.isJavaIdentifierPart(cp) && (cp != '.'))
                fail(service, u, lc, "Illegal provider-class name: " + ln);
        }
        if (!providers.containsKey(ln) && !names.contains(ln))
            names.add(ln);
    }
    return lc + 1;
  }

  // 解析配置文件,解析指定的url配置文件
  // 使用parseLine方法进行解析,未被实例化的服务提供者会被保存到缓存中去
  private Iterator<String> parse(Class<?> service,
                                 URL u)
                           throws ServiceConfigurationError{
    InputStream in = null;
    BufferedReader r = null;
    ArrayList<String> names = new ArrayList<>();
    try {
        in = u.openStream();
        r = new BufferedReader(new InputStreamReader(in, "utf-8"));
        int lc = 1;
        while ((lc = parseLine(service, u, r, lc, names)) >= 0);
    }
    return names.iterator();
  }
  //服务提供者查找的迭代器
  private class LazyIterator
      implements Iterator<S>{

    Class<S> service;//服务提供者接口
    ClassLoader loader;//类加载器
    Enumeration<URL> configs = null;//保存实现类的url
    Iterator<String> pending = null;//保存实现类的全名
    String nextName = null;//迭代器中下一个实现类的全名

    private LazyIterator(Class<S> service, ClassLoader loader) {
        this.service = service;
        this.loader = loader;
    }

    private boolean hasNextService() {
      if (nextName != null) {
          return true;
      }
      if (configs == null) {
          try {
            String fullName = PREFIX + service.getName();
            if (loader == null)
              configs = ClassLoader.getSystemResources(fullName);
            else
              configs = loader.getResources(fullName);
          }
      }
      while ((pending == null) || !pending.hasNext()) {
        if (!configs.hasMoreElements()) {
          return false;
        }
        pending = parse(service, configs.nextElement());
      }
      nextName = pending.next();
      return true;
    }

    private S nextService() {
      if (!hasNextService())
        throw new NoSuchElementException();
      String cn = nextName;
      nextName = null;
      Class<?> c = null;
      try {
        c = Class.forName(cn, false, loader);
      }
      if (!service.isAssignableFrom(c)) {
        fail(service, "Provider " + cn  + " not a subtype");
      }
      try {
        S p = service.cast(c.newInstance());
        providers.put(cn, p);
        return p;
      }
    }

    public boolean hasNext() {
      if (acc == null) {
        return hasNextService();
      } else {
        PrivilegedAction<Boolean> action = new PrivilegedAction<Boolean>() {
          public Boolean run() { return hasNextService(); }
        };
        return AccessController.doPrivileged(action, acc);
      }
    }
    public S next() {
      if (acc == null) {
        return nextService();
      } else {
        PrivilegedAction<S> action = new PrivilegedAction<S>() {
          public S run() { return nextService(); }
        };
        return AccessController.doPrivileged(action, acc);
      }
    }
    public void remove() {
      throw new UnsupportedOperationException();
    }
  }

  /**
    返回遍历服务提供者的迭代器(以懒加载的方式加载可用的服务提供者)
    懒加载的实现是: 解析配置文件和实例化服务提供者的工作由迭代器本身完成
   */
  public Iterator<S> iterator() {
    return new Iterator<S>() {
      //按照实例化顺序返回已经缓存的服务提供者实例
      Iterator<Map.Entry<String,S>> knownProviders
          = providers.entrySet().iterator();
      public boolean hasNext() {
          if (knownProviders.hasNext())
              return true;
          return lookupIterator.hasNext();
      }
      public S next() {
        if (knownProviders.hasNext())
          return knownProviders.next().getValue();
        return lookupIterator.next();
      }
      public void remove() {
        throw new UnsupportedOperationException();
      }
    };
  }

  //为指定的服务使用指定的类加载器来创建一个ServiceLoader
  public static <S> ServiceLoader<S> load(Class<S> service,
                                      ClassLoader loader){
    return new ServiceLoader<>(service, loader);
  }

  //使用线程上下文的类加载器来创建ServiceLoader
  public static <S> ServiceLoader<S> load(Class<S> service) {
    ClassLoader cl = Thread.currentThread().getContextClassLoader();
    return ServiceLoader.load(service, cl);
  }

  //使用扩展类加载器为指定的服务创建ServiceLoader
  //只能找到并加载已经安装到当前Java虚拟机中的服务提供者,应用程序类路径中的服务提供者将被忽略
  public static <S> ServiceLoader<S> loadInstalled(Class<S> service) {
    ClassLoader cl = ClassLoader.getSystemClassLoader();
    ClassLoader prev = null;
    while (cl != null) {
      prev = cl;
      cl = cl.getParent();
    }
    return ServiceLoader.load(service, prev);
  }
}
```

1. 首先 ServiceLoader 实现了Iterable 接口,所以它有迭代器的属性,这里主要都是实现了迭代器的 `hasNext` 和 `next` 方法。这里主要都是调用的 lookupIterator 的相应 hasNext 和 next 方法, lookupIterator 是**懒加载迭代器**。

2. 其次 LazyIterator 中的 hasNext 方法, 静态变量PREFIX就是`META-INF/services/`目录,这也就是为什么需要在classpath下的META-INF/services/ 目录里创建一个以服务接口命名的文件。

3. 最后通过反射方法Class.forName()加载类对象,并用 `newInstance` 方法将类实例化,并把实例化后的类缓存到 providers 对象中,(LinkedHashMap<String,S>类型）然后返回实例对象

所以我们可以看到: <mark>ServiceLoader 不是实例化以后,就去读取配置文件中的具体实现,并进行实例化。而是等到使用迭代器去遍历的时候,才会加载对应的配置文件去解析,调用hasNext方法的时候会去加载配置文件进行解析,调用next方法的时候进行实例化并缓存</mark>

所有的配置文件只会加载一次,服务提供者也只会被实例化一次,重新加载配置文件可使用reload方法

### SPI的缺陷

通过上面的解析可以发现,我们使用SPI机制的缺陷:
1. 不能按需加载,需要遍历所有的实现,并实例化,然后在循环中才能找到我们需要的实现。如果不想用某些实现类,或者某些类实例化很耗时,它也被载入并实例化了,这就造成了浪费。

2. 获取某个实现类的方式不够灵活,只能通过 Iterator 形式获取,不能根据某个参数来获取对应的实现类。

3. 多个并发多线程使用 ServiceLoader 类的实例是不安全的

# 参考资料 <Badge type="tip" text="Tip"/>

1. <app-link to="https://pdai.tech/md/java/advanced/java-advanced-spi.html" class="sourceLink">Java常用机制 - SPI机制详解</app-link>
2. <app-link to="https://www.cnblogs.com/happyframework/archive/2013/09/17/3325560.html" class="sourceLink">设计原则：小议 SPI 和 API</app-link>
