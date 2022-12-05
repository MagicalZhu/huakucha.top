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

![SPI机制](/spi/SPI机制流程.png)


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

如果在com.cainiao.ys.spi.learn.Search文件里写上两个实现类,那最后的输出结果就是两行了。这就是因为 *ServiceLoader.load(Search.class)* 在加载某接口时, 会去 *META-INF/services* 下找接口的全限定名文件, 再根据里面的内容加载相应的实现类。

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

```java
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

### Common-Logging

> common-logging(也称Jakarta Commons Logging,缩写 JCL)是常用的日志库门面

1. 首先,日志实例是通过LogFactory的getLog(String)方法创建的:

    ```java
    public static getLog(Class clazz) throws LogConfigurationException {
      return getFactory().getInstance(clazz);
    }
    ```

### 插件体系
### Spring 中的SPI

# 参考资料 <Badge type="tip" text="Tip"/>
[Java常用机制 - SPI机制详解](https://pdai.tech/md/java/advanced/java-advanced-spi.html)