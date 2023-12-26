---
  author: 'ant'
  title: Spring 注解处理
  tags:
    - Java
    - Spring
  date: 2023-11-07 13:12:06
  categories: Spring
  forward: false
  lock: false
  fav: false
  draft: false
---

[[TOC]]

> 我们可以通过 XML 的方式对 Spring 进行配置，但是注解驱动的方式会更符合现代 java 的编程思维，尤其是在 SpringBoot、SpringCloud 中，注解的能力得到了进一步的发挥,这里阐述了注解驱动编程的基本逻辑。

## XML 驱动

> 虽然是探索注解驱动，但是我们还是需要了解下 XML 的方式下如何驱动 Spring

我们常见使用 XML 编程的基本步骤如下:

1. 创建 Spring 应用上下文对象: `ClassPathXmlApplicationContext` ,并传入 Spring XML 配置文件的路径
2. 通过 ClassPathXmlApplicationContext 进行操作，比如依赖查找、注册Bean、发布事件...

下面给出一段基本的代码:

```java
// 仅包含部分代码
String configPath = "/META-INF/beans.xml"
ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(configPath);
ctx.getBean(User.class);
```

## 注解驱动

### 特点

Spring 官方给出了[注解编程模型](https://github.com/spring-projects/spring-framework/wiki/Spring-Annotation-Programming-Model),概括起来有下面四大特性:

1. 元注解 (Meta-Annotation )
2. Spring 模式注解 (Stereotype Annotation)
3. Spring 组合注解 (Composed Annotations)
4. Spring 注解属性别名和覆盖 (Attribute Aliases and Overrides)

首先是元注解,元注解的概念实际上在 java 注解中早有体现: **一个可以声明在其他注解上的注解, 如果一个注解标注在其他注解上,那么它就是元注解**。所以 @Retention、@Documented 都属于元注解。 在 Spring 中常见的元注解有 @Component、@Condition、@Import...

其次是模式注解。Spring 给出的定义很明确,就是用来声明一个组件(Component)的角色 role,比如 @Controller 用于声明一个控制器、@Repository 用于声明一个数据仓储组件、用于声明一个配置类的 @Configuration ...

最后是组合注解。组合注解也需要有元注解的支持,组合注解具有多个元注解的功能,比如 SpringBoot 中的 @SpringBootApplication 就是一个典型的组合注解, 它既具有表示为一个配置类(@SpringBootConfiguration),也具有自动装配的功能(@EnableAutoConfiguration)，还具有组件扫描的功能(@ComponentScan)

  ```java
  @Target(ElementType.TYPE)
  @Retention(RetentionPolicy.RUNTIME)
  @Documented
  @Inherited
  @SpringBootConfiguration
  @EnableAutoConfiguration
  @ComponentScan(excludeFilters = {
    @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
    @Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) }) {
    // ...
  }
  ```

### 使用

> 了解完注解驱动的特点之后, 我们还需要了解注解驱动的基本使用方式

注解驱动的 Spring 应用上下文对象是: `AnnotationConfigApplicationContext`, 我们通过如下的方式使用它:

1. 创建 AnnotationConfigApplicationContext 对象,并且传入的配置类
2. 通过 AnnotationConfigApplicationContext 进行操作，比如依赖查找、注册Bean、发布事件...

可以看出来使用方式和 ClassPathXmlApplicationContext 是类似的。那么问题来了,它是如何实现注解驱动的呢? 我们可以看下 AnnotationConfigApplicationContext 的默认构造器:

  ```java
  public AnnotationConfigApplicationContext() {
    this.reader = new AnnotatedBeanDefinitionReader(this);
    this.scanner = new ClassPathBeanDefinitionScanner(this);
  }
  ```

这里创建 `AnnotatedBeanDefinitionReader` 用于解析 Bean 的元信息(BeanDefinition),我们再观察它的构造器:

  ```java {lines: "3-4"}
  public AnnotatedBeanDefinitionReader(BeanDefinitionRegistry registry, Environment environment) {
    this.registry = registry;
    this.conditionEvaluator = new ConditionEvaluator(registry, environment, null);
    AnnotationConfigUtils.registerAnnotationConfigProcessors(this.registry);
  }
  ```

AnnotatedBeanDefinitionReader 在被创建时有两个动作:

1. 创建 ConditionEvaluator: 它是 @Condition 注解进行判断操作的
2. `AnnotationConfigUtils.registerAnnotationConfigProcessors` : 注册了很多关于注解驱动的 Processor

    ```java
    public static Set<BeanDefinitionHolder> registerAnnotationConfigProcessors(
      BeanDefinitionRegistry registry, @Nullable Object source) {

      DefaultListableBeanFactory beanFactory = unwrapDefaultListableBeanFactory(registry);

      Set<BeanDefinitionHolder> beanDefs = new LinkedHashSet<>(8);

      if (!registry.containsBeanDefinition(CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME)) {
        RootBeanDefinition def = new RootBeanDefinition(ConfigurationClassPostProcessor.class);
        def.setSource(source);
        // 注册 ConfigurationClassPostProcessor, 用于处理配置类 @Configuration
        beanDefs.add(registerPostProcessor(registry, def, CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME));
      }

      if (!registry.containsBeanDefinition(AUTOWIRED_ANNOTATION_PROCESSOR_BEAN_NAME)) {
        RootBeanDefinition def = new RootBeanDefinition(AutowiredAnnotationBeanPostProcessor.class);
        def.setSource(source);
        // 注册 AutowiredAnnotationBeanPostProcessor, 用于依赖注入相关的注解
        // 比如: @Autowired、@Value、@Inject
        beanDefs.add(registerPostProcessor(registry, def, AUTOWIRED_ANNOTATION_PROCESSOR_BEAN_NAME));
      }

      if (jsr250Present && !registry.containsBeanDefinition(COMMON_ANNOTATION_PROCESSOR_BEAN_NAME)) {
        RootBeanDefinition def = new RootBeanDefinition(CommonAnnotationBeanPostProcessor.class);
        def.setSource(source);
        // 支持 JSR-250,比如 @Resource、@PostConstruct、@PreDestroy
        beanDefs.add(registerPostProcessor(registry, def, COMMON_ANNOTATION_PROCESSOR_BEAN_NAME));
      }

      // ...
      // 处理 @EventListener
      if (!registry.containsBeanDefinition(EVENT_LISTENER_PROCESSOR_BEAN_NAME)) {
        RootBeanDefinition def = new RootBeanDefinition(EventListenerMethodProcessor.class);
        def.setSource(source);
        beanDefs.add(registerPostProcessor(registry, def, EVENT_LISTENER_PROCESSOR_BEAN_NAME));
      }

      return beanDefs;
    }
    ```

可以看出来,注解驱动的大部分功能都会在这里进行注册,比如 `ConfigurationClassPostProcessor` 实现了 `BeanDefinitionRegistryPostProcessor` 接口, 这样就会在 BeanFactory 的后置处理中对配置类进行处理
