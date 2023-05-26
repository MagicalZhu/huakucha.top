---
  author: '花裤衩'
  title: 注解机制
  tags:
    - Java
  date: 2022-12-07 13:23:27
  categories: Java基础
---
[[TOC]]

> 注解是JDK1.5版本开始引入的一个特性,用于对代码进行说明,可以对包、类、接口、字段、方法参数、局部变量等进行注解

# 注解基础

注解主要的作用有以下四方面:
1. **生成文档**,通过代码里标识的元数据生成javadoc文档
2. **编译检查**,通过代码里标识的元数据让编译器在编译期间进行检查验证
3. **编译时动态处理**,编译时通过代码里标识的元数据动态处理,例如<mark>动态生成代码</mark>
4. **运行时动态处理**,运行时通过代码里标识的元数据动态处理,例如<mark>使用反射注入实例</mark>

注解有下面常见的几种分类:
1. **内置的注解**
   - @Override : 标记重写的方法
   - @Deprecated : 标记废弃的方法、类、字段
   - @SuppressWarning : 标记要忽略警告

2. <mark>元注解(用于定义注解的注解)</mark>
   - `@Retention` : 标记注解被保留的阶段
   - `@Target` : 标记注解使用的范围
   - `@Inherited` : 标记注解**可继承**
   - `@Documented` : 标记是否生成 javadoc 文档

3. **自定义注解**
   - 可以根据自己的需求定义注解, 并可用元注解对自定义注解进行注解

## 元注解

> 在 JDK1.5 中,内置了4个标准的元注解: `@Target 、 @Retention 、 @Inherited 、 @Documented`
>
> 在 JDK 1.8 中又提供了两个元注解 `@Repeatable 、 @Native`

### @Target

> Target注解的作用是:**描述注解的使用范围**(即:<mark>被修饰的注解可以用在什么地方</mark>)

Target注解用来说明那些被它所注解的注解类可修饰的对象范围:
1. 注解可以用于修饰 packages
2. types (类、接口、枚举、注解类)
3. 类成员(方法、构造方法、成员变量、枚举值)
4. 方法参数
5. 本地变量(如循环变量、catch参数)

在定义注解类时使用了`@Target` 能够更加清晰的知道它能够被用来修饰哪些对象,它的取值范围定义在 `ElementType` 枚举中。

```java
public enum ElementType {
  // 类、接口、枚举类
  TYPE,
  // 成员变量（包括：枚举常量）
  FIELD,
  // 成员方法
  METHOD,
  // 方法参数
  PARAMETER,
  // 构造方法
  CONSTRUCTOR,
  // 局部变量
  LOCAL_VARIABLE,
  // 注解类
  ANNOTATION_TYPE,
  // 可用于修饰：包
  PACKAGE,
  // 类型参数,JDK 1.8 新增
  TYPE_PARAMETER,
  // 使用类型的任何地方,JDK 1.8 新增
  TYPE_USE
}
```

### @Retention

> Reteniton 注解的作用是: **描述注解保留的时间范围** (即:<mark>被描述的注解在它所修饰的类中可以被保留到何时</mark>)

Reteniton 注解用来限定那些被它所注解的注解类在注解到其他类上以后,可被保留到何时,一共有三种策略,定义在`RetentionPolicy`枚举中:

```java
public enum RetentionPolicy {
  // 源文件保留
  SOURCE,
  // 编译期保留,默认值
  CLASS,
  // 运行期保留,可通过反射去获取注解信息
  RUNTIME
}
```

为了确定 @Reteniton 注解的保留时间,我们用这三个元注解标记在方法上:

```java
// 首先定义三个注解:
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
@interface SourcePolicy {

}

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.CLASS)
@interface ClassPolicy {

}

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@interface RunTimePolicy{

}

// 然后将这3个注解标记在方法上
public class testRetention {
  @SourcePolicy
  public void testInSource(){

  }

  @ClassPolicy
  public void testInClass() {

  }

  @RunTimePolicy
  public void testInRunTime() {

  }
}
```

然后执行 *javap -verbose* 命令获取到的测试类的 class 字节码内容:

```java {lines: '55-56, 66-67'}
public class testRetention
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #3.#17         // java/lang/Object."<init>":()V
   #2 = Class              #18            // testRetention
   #3 = Class              #19            // java/lang/Object
   #4 = Utf8               <init>
   #5 = Utf8               ()V
   #6 = Utf8               Code
   #7 = Utf8               LineNumberTable
   #8 = Utf8               testInSource
   #9 = Utf8               testInClass
  #10 = Utf8               RuntimeInvisibleAnnotations
  #11 = Utf8               LClassPolicy;
  #12 = Utf8               testInRunTime
  #13 = Utf8               RuntimeVisibleAnnotations
  #14 = Utf8               LRunTimePolicy;
  #15 = Utf8               SourceFile
  #16 = Utf8               testRetention.java
  #17 = NameAndType        #4:#5          // "<init>":()V
  #18 = Utf8               testRetention
  #19 = Utf8               java/lang/Object
{
  public testRetention();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 8: 0

  // RetentionPolicy.SOURCE
  public void testInSource();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=0, locals=1, args_size=1
         0: return
      LineNumberTable:
        line 12: 0
  // RetentionPolicy.CLASS
  public void testInClass();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=0, locals=1, args_size=1
         0: return
      LineNumberTable:
        line 17: 0
    RuntimeInvisibleAnnotations:
      0: #11()  // LClassPolicy
  // RetentionPolicy.RUNTIME
  public void testInRunTime();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=0, locals=1, args_size=1
         0: return
      LineNumberTable:
        line 22: 0
    RuntimeVisibleAnnotations:
      0: #14()    // LRunTimePolicy
}
SourceFile: "testRetention.java"

```

由上面的字节码可以看出来:
1. 编译器没有留下 *SOURCE* 注解范围的信息
2. 编译器分别使用 `RuntimeInvisibleAnnotations` 和  `RuntimeVisibleAnnotations` 去表示*CLASS* 与 *RUNTIME* 的元注解信息


### @Documented

> Documented注解的作用是: 描述在使用 javadoc 工具为类生成帮助文档时是否要保留其注解信息

以下代码在使用 javadoc 工具可以生成 @TestDocAnnotation 注解信息。

```java
@Documented
@Target({ElementType.TYPE,ElementType.METHOD})
public @interface TestDocAnnotation {
	public String value() default "default";
}

@TestDocAnnotation("myMethodDoc")
public void testDoc() {

}
```

### @Inherited

> Inherited注解的作用：**被它修饰的注解将具有继承性**。<mark>如果某个类使用了被@Inherited修饰的注解,则其子类将自动具有该注解</mark>

我们编写代码测试这一个特性:

```java
// 首先定义注解
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE,ElementType.METHOD})
@interface inheritedAnnotation {
  String [] values();
  int number();
}

// 定义一个父类,并且标记上刚才的自定义注解
@inheritedAnnotation(values = { "value1", "value2" }, number = 10)
class Parent {
}

// 定义一个子类继承父类
public class testInheritedAnnotation extends Parent {
  public static void main(String[] args) {
    Class clazz = testInheritedAnnotation.class;
    Annotation[] annotations = clazz.getAnnotations();
    for (Annotation item : annotations) {
      // out: [value1, value2]:10
      if (item.annotationType().isAssignableFrom(inheritedAnnotation.class)) {
        inheritedAnnotation itemIn = (inheritedAnnotation)item;
        System.out.println(Arrays.asList(itemIn.values()) + ":"+itemIn.number());
      }
    }
  }
}
```

可以很明显的看到,即使子类没有标注 @Inherited派生的注解,但如果父类有标注则会继承过来

### @Repeatable

> 待补充


## 内置注解

> 直接上代码演示

```java
class A{
  public void test() {
    // ...
  }
}
class B extends A{
  /**
    * 重载父类的test方法
    */
  @Override
  public void test() {
    // ...
  }
  // 被弃用的方法
  @Deprecated
  public void oldMethod() {
  }
  // 忽略告警
  @SuppressWarnings("rawtypes")
  public List processList() {
    List list = new ArrayList();
    return list;
  }
}
```

### @Override

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {
}
```

通过元注解我们可以得知,@Override **只能标记在方法上**,且注解保留的时间范围是*SOURCE*。

这个注解的作用我们大家都不陌生,那就是告诉编译器被修饰的方法是重写的父类的中的相同签名的方法,编译器会对此做出检查,若发现父类中不存在这个方法或是存在的方法签名不同,则会报错

### @Deprecated

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, PARAMETER, TYPE})
public @interface Deprecated {
}
```

- 从它的定义我们可以知道
  - 它会被文档化
  - 能够保留到运行时
  - 能够修饰构造方法、属性、局部变量、方法、包、参数、类型
- 这个注解的作用是告诉编译器被修饰的程序元素已被"废弃",不再建议用户使用。

### @SuppressWarnings

```java
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings {
    String[] value();
}
```

- 从它的定义我们可以知道
  - 它能够修饰的程序元素包括类型、属性、方法、参数、构造器、局部变量
  - 只能存活在源码时
  - 取值为String[]
- 它的作用是告诉编译器忽略指定的警告信息


## 注解与反射接口(AnnotatedElement)

>  定义注解后,如何获取注解中的内容呢？反射包 `java.lang.reflect` 下的 `AnnotatedElement` 接口提供这些方法
>
>  这里注意：<mark>只有注解被定义为RUNTIME后,该注解才能是运行时可见,当 class 文件被装载时被保存在 class 文件中的 Annotation 才会被虚拟机读取。</mark>

**AnnotatedElement** 接口是所有程序元素(Class、Method和Constructor)的父接口,所以通过反射获取了某个类的 AnnotatedElement 对象之后,程序就可以调用 AnnotatedElement 的相关实现方法来访问 Annotation 信息。

常见的方法如下:

1. `boolean isAnnotationPresent(Class<?extends Annotation> annotationClass)`
   - 判断该程序元素上是否包含指定类型的注解,存在则返回true,,否则返回false
   - <mark>注意: 此方法会忽略注解对应的注解容器</mark>

2. `<T extends Annotation> T getAnnotation(Class<T> annotationClass)`
   - 返回该程序元素上存在的、指定类型的注解,如果该类型注解不存在,则返回null

3. `Annotation[] getAnnotations()`
   - 返回该程序元素上存在的所有注解,若没有注解,返回长度为0的数组

4. `<T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)`
   - 返回该程序元素上存在的、指定类型的注解数组。没有注解对应类型的注解时,返回长度为0的数组
   - 该方法的调用者可以随意修改返回的数组,而不会对其他调用者返回的数组产生任何影响
   - 与 `getAnnotation` 的区别在于, *getAnnotationsByType* 会检测注解对应的重复注解容器,若程序元素为类,当前类上找不到注解,且该注解为可继承的,则会去父类上检测对应的注解

5. `<T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass)`
   - 返回直接存在于此元素上的所有注解
   - 与此接口中的其他方法不同,该方法将忽略继承的注解。如果没有注解直接存在于此元素上,则返回null

6. `<T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass)`
   - 返回直接存在于此元素上的所有注解
   - 与此接口中的其他方法不同,该方法将忽略继承的注解

7. `Annotation[] getDeclaredAnnotations()`
   - 返回直接存在于此元素上的所有注解及注解对应的重复注解容器,如果没有注解直接存在于此元素上,则返回长度为零的一个数组
   - 该方法的调用者可以随意修改返回的数组,而不会对其他调用者返回的数组产生任何影响
   - 与此接口中的其他方法不同,**该方法将忽略继承的注解**

下面用实际代码演示:

```java
// 自定义注解
@Retention(RetentionPolicy.RUNTIME)
@Target({
  ElementType.METHOD,
  ElementType.ANNOTATION_TYPE,
  ElementType.TYPE,
  ElementType.PARAMETER
})
@interface Info {
  public String title() default "";
  public String description() default "";
}

// 使用注解
public class MyAnnotation {
  @Override
  @Info(title = "toStringMethod", description = "override toString method")
  public String toString() {
    return "Override toString method";
  }

  @Deprecated
  @Info(title = "old static method", description = "deprecated old static method")
  public static void oldMethod() {
    System.out.println("old method, don't use it.");
  }
}

// 测试
public static void main(String[] args) {
  Method[] methods = MyAnnotation.class.getMethods();
  for (Method method : methods) {
    // 方法上是否包含@Info 注解
    if (method.isAnnotationPresent(Info.class)) {
      Annotation[] declaredAnnotations = method.getDeclaredAnnotations();
      // 输出方法、注解信息
      for (Annotation annotation : declaredAnnotations) {
        System.out.println(method + "' : " + annotation);
      }
      // 获取自定义注解对象
      Info methodAnno = method.getAnnotation(Info.class);
      System.out.println(methodAnno.title());
    }
  }
}
```

# 参考资料
- <app-link to="https://pdai.tech/md/java/basic/java-basic-x-annotation.html">注解机制详解</app-link>