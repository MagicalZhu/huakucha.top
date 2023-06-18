---
  author: 'athu'
  title: 关于 FactoryBean
  tags:
    - Java
    - Spring
  date: 2023-06-18 14:22:59
  categories: Spring
  forward: false
  lock: false
  fav: false
---

[[TOC]]

我们知道,Bean 的实例化方式有很多种, 比如构造器、Setter、静态工厂方法(factory-method)、实例工厂方法(factory-method + factory-bean),初次之外还有 FactoryBean

# 示例代码

为了测试,首先定义一个 pojo 对象 *User*

```java
/**
 * <b>用户类</b>
 *
 * @author <a href="mailto:zhuyuliangm@gmail.com">yuliang zhu</a>
 */
@NoArgsConstructor
@Builder
@Data
public class User {
  private Long id;
  private String name;

  public User(Long id, String name) {
      this.id = id;
      this.name = name;
  }
}
```

然后,我们定义一个类*UserFactory*,实现`FactoryBean`接口:

```java
/**
 * UserFactory
 *
 * @author <a href="mailto:zhuyuliangm@gmail.com">yuliang zhu</a>
 */
public class UserFactory implements FactoryBean<User> {
  @Override
  public User getObject() throws Exception {
      // 返回一个 自定义的 bean 对象
      return User.builder()
              .id(22L)
              .name("athu")
              .build();
  }

  @Override
  public Class<?> getObjectType() {
      return User.class;
  }
}

```

然后按照传统的模式, 定义一个 XML 文件来配置上面 userFactory 的元信息:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--注册 FactoryBean-->
    <bean id="userFactory" class="bean.UserFactory"/>
</beans>
```

接下来就是喜闻乐见测试环节了:

```java
/**
 * 用于测试 FactoryBean 的代码
 *
 * @author <a href="mailto:zhuyuliangm@gmail.com">yuliang zhu</a>
 */
public class FactoryBeanDemo {
    public static void main(String[] args) {
        DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
        XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(beanFactory);
        reader.loadBeanDefinitions("META-INF/test-factory-bean.xml");

        User user = beanFactory.getBean(User.class);
        System.out.println(user);
        Object customerFactoryBean = beanFactory.getBean("userFactory");
        System.out.println(customerFactoryBean);
        System.out.println("user == customerFactoryBean : "+ (user == customerFactoryBean));
    }
}
```

我们看下测试结果:

<AppImg src="https://cdn.staticaly.com/gh/MagicalZhu/image-host@master/spring/测试1.webp"
        intro="测试1"/>

现在有 4 个问题:

1. 我注册的是`UserFactory` 类型的Bean,为什么可以获取 `User` 类型的 Bean?
2. 我明明是查找的 `userFactory`,但是得到的却是 `User`?
3. 为什么通过 userFactory 和 User.class 获取到的对象是同一个?
4. 既然通过 userFactory 这个 beanName 无法获取到 UserFactory 的单例对象，那么应该怎么获取呢？

# 源码分析

在获取 User 类型的对象时,会进入 `DefaultListableBeanFactory#getBean(Class<T> requiredType)` 方法,通过 Bean 的类型获取 Bean 对象,该方法通过`DefaultListableBeanFactory#resolveNamedBean` 来获取 Bean

```java {lines: '6, 16-19'}
private <T> NamedBeanHolder<T> resolveNamedBean(ResolvableType requiredType,
                      @Nullable Object[] args,
                      boolean nonUniqueAsNull) throws BeansException {

  // 通过 Bean 的类型获取候选 beanName
  String[] candidateNames = getBeanNamesForType(requiredType);

  if (candidateNames.length > 1) {
    // 如果候选的 beanName 有多个,对候选 beanName 进行过滤
    // ..
  }

  if (candidateNames.length == 1) {
    // 如果只有一个候选 bean根据 beanName 和 bean 直接返回一个 NamedBeanHolder<T>
    String beanName = candidateNames[0];
    return new NamedBeanHolder<>(
      beanName,
      (T) getBean(beanName, requiredType.toClass(), args)
    );
  }
  else if (candidateNames.length > 1) {
   // 如果候选的 beanName 有多个,探测最合适的 beanName,如果最后还是有多个,则抛出异常
  }
  return null;
}
```

可以看出来关键点在于两个方法:

1. `DefaultListableBeanFactory#getBeanNamesForType(ResolvableType type)`
2. `AbstractBeanFactory#getBean(String name, @Nullable Class<T> requiredType, @Nullable Object... args)`

## getBeanNamesForType

> 对上述的测试代码 **beanFactory.getBean(User.class)** 来说,在这一步发生了什么?

这里实际上调用了方法: `DefaultListableBeanFactory#doGetBeanNamesForType`

```java {lines: '28, 36-37'}
/**
 * @param type: 依赖查找传入的类型,这里就是 User
 */
private String[] doGetBeanNamesForType(ResolvableType type,
                  boolean includeNonSingletons,
                  boolean allowEagerInit) {
  List<String> result = new ArrayList<>();

  // 检查所有的 beanDefinitionName
  // 这里示例中只有一个 userFactory
  for (String beanName : this.beanDefinitionNames) {
    // 只考虑 bean 的原始 name,不考虑别名
    if (!isAlias(beanName)) {
      try {
        RootBeanDefinition mbd = getMergedLocalBeanDefinition(beanName);
        if (!mbd.isAbstract() && (allowEagerInit ||
            (mbd.hasBeanClass() || !mbd.isLazyInit() || isAllowEagerClassLoading()) &&
            !requiresEagerInitForType(mbd.getFactoryBeanName()))) {
          if (!isFactoryBean) {
            // 如果 BeanDefinition 不是FactoryBean
            if (includeNonSingletons || isSingleton(beanName, mbd, dbd)) {
              matchFound = isTypeMatch(beanName, type, allowFactoryBeanInit);
            }
          }
          else  {
            if (includeNonSingletons || isNonLazyDecorated ||
                (allowFactoryBeanInit && isSingleton(beanName, mbd, dbd))) {
              matchFound = isTypeMatch(beanName, type, allowFactoryBeanInit);
            }
            if (!matchFound) {
              beanName = FACTORY_BEAN_PREFIX + beanName;
              matchFound = isTypeMatch(beanName, type, allowFactoryBeanInit);
            }
          }
          if (matchFound) {
            // 返回候选 beanNames
            result.add(beanName);
          }
        }
      }
      catch (CannotLoadBeanClassException | BeanDefinitionStoreException ex) {
       // ...
      }
    }
  }

  // ...

  return StringUtils.toStringArray(result);
}
```

可以看出来,这里 Spring 循环了所有的 BeanDefinition,将 BeanDefinition 中的 beanClass 与 传入的 Bean 类型进行比较。比较过程中,如果某个 BeanDefinition 是FactoryBean,则还需要通过 `isTypeMatch` 进行判断,即判断 `FactoryBean.getObjectType` 与 传入的 Bean 类型是否一致。

这里传入的 Bean 类型是User,且 UserFactory.getObjectType 返回的类型也是 User.class,所以将 `userFactory` 作为 beanName 返回,也就是说<mark>依赖查询使用 User 类型,虽然没有 beanClass=User 的 BeanDefinition,但是存在 getObjectType=User 的 FactoryBean,于是将 FactoryBean 的 beanName 返回</mark>

## getBean

> 到这里,我们知道了依赖查询的类型是 User,经过处理后,实际使用的 beanName 是 userFactory

知道了 beanName 之后,Spring 就利用 beanName 开始获取 bean 对象,同时伴随着 bean 的实例化、初始化...也就是使用 `getBean` 方法,实际的操作会通过`AbstractBeanFactory#doGetBean` 进行(这个方法很长,这里截取与示例相关的部分)

需要留意下面几点:

1. `transformedBeanName()`
    - 这个方法很简单,用于转换 beanName,基本的思路: 如果 beanName 以`&` 开始,则返回 & 之后的字符串,否则直接返回 beanName
2. `getSingleton(beanName, () -> {...})`
    - 这个方法主要用于通过 beanName 和 RootBeanDefinition 创建 bean 对象
    - 方法中的函数式接口是 `ObjectFactory<?> singletonFactory`

3. `getObjectForBeanInstance`
    - 这个方法主要是获取 Bean 对象

```java {lines: '28,36'}
/**
 * @param name 传入的 beanName
 */
protected <T> T doGetBean(final String name,
    @Nullable final Class<T> requiredType,
    @Nullable final Object[] args,
    boolean typeCheckOnly) throws BeansException {

  // 这个方法用于转换 beanName
  final String beanName = transformedBeanName(name);
  Object bean;

  Object sharedInstance = getSingleton(beanName);
  if (sharedInstance != null && args == null) {
    // ...
    bean = getObjectForBeanInstance(sharedInstance, name, beanName, null);
  }
  else {
    // ...
    try {
      final RootBeanDefinition mbd = getMergedLocalBeanDefinition(beanName);
      checkMergedBeanDefinition(mbd, beanName, args);
      // ...
      // 创建 bean 对象
      if (mbd.isSingleton()) {
        sharedInstance = getSingleton(beanName, () -> {
          try {
            return createBean(beanName, mbd, args);
          }
          catch (BeansException ex) {
            destroySingleton(beanName);
            throw ex;
          }
        });
        // 返回 Bean 对象
        bean = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
      }
      // ...
    }
    catch (BeansException ex) {
      // ...
    }
  }
  // ...
  return (T) bean;
}
```

可以看到,Spring 通过 `getObjectForBeanInstance` 获取 bean 对象,这就是一个关键点

### getObjectForBeanInstance

# 总结

1. Spring 框架定义了FactoryBean 的前缀符(Prefix) 是 `&`
