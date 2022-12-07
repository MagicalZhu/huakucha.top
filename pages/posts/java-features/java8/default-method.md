---
  author: '花裤衩'
  title: 默认方法
  tags:
    - Java

  date: 2022-11-29 05:54:01
  categories: Java8
---
[[toc]]

# 概念

## 引入

下面的代码是可以编译的, 即使 Clazz 类并没有实现 foo() 方法。因为**在 interface A中提供了foo()方法的默认实现**
```java
// interface A
public interface A {
    default void foo(){
       System.out.println("Calling A.foo()");
    }
}
// 类 Clazz 实现了 interface A
public class Clazz implements A {
    public static void main(String[] args){
       Clazz clazz = new Clazz();
       clazz.foo(); // 虽然 Clazz 中没有foo方法, 但是可以调用 interface A#foo()
    }
}
```

## 什么是默认方法

简单说, 就是**接口可以有实现方法，而且不需要实现类去实现其方法**, 只需在方法名前面加个 `default` 关键字即可

## 为什么需要默认方法

- 首先.之前的接口是个双刃剑。
   - 好处是: 面向抽象而不是面向具体编程
   - 缺陷是: 当需要修改接口时候，需要修改全部实现该接口的类

- 比如目前的java 8之前的集合框架没有 stream 方法, 那通常能想到的解决办法是在 JDK 里给相关的接口添加新的方法及实现。然而, 对于已经发布的版本, 是没法在给接口添加新方法的同时不影响已有的实现。所以引进的默认方法。他们的**目的是为了解决接口的修改与现有的实现不兼容的问题**


## 抽象类Vs接口

> 有了default method之后, java 8的接口跟抽象类还有什么区别?

| 相同点      | 不同点 |
| ----------- | ------ |
| 都是抽象类型  | 抽象类不可以多重继承,但接口可以(无论是多重类型继承还是多重行为继承)  |
| 都可以有实现方法(**以前接口不行**)  | 两者的设计理念不同<br/>抽象类表示的是`is-a`关系，接口表示的是`like-a`关系  |
| 都可以不需要实现类或者继承者去实现所有方法<br/>(以前不行,现在接口中**默认方法不需要实现者实现**)  | 接口中定义的变量默认是`public static final型`,且必须给其初值,所以实现类中不能改变其值<br/>抽象类中的变量默认是 `friendly型`, 其值可以在子类中重新定义,或者重新赋值  |

## 多重继承的冲突

- 由于同一个方法可以从不同接口引入，自然而然的会有冲突的现象，默认方法判断冲突的规则如下:
   - **一个声明在类里面的方法优先于任何默认方法**(classes always win)
   - 否则，则会优先选取路径最短的




# 参考资料
<app-link to="https://pdai.tech/md/java/java8/java8-default.html" class="sourceLink">Java 8-默认方法</app-link>
