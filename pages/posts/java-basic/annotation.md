---
  author: '花裤衩'
  title: 注解机制
  tags:
    - Java
    - Annotation
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
4. **运行时动态处理**，运行时通过代码里标识的元数据动态处理，例如<mark>使用反射注入实例</mark>

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
> 在JDK 1.8中又提供了两个元注解 `@Repeatable 、 @Native`

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

# 参考资料
- <app-link to="https://pdai.tech/md/java/basic/java-basic-x-annotation.html">注解机制详解</app-link>