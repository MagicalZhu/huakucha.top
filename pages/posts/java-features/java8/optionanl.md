---
  author: '花裤衩'
  title: Optionanl类浅析
  tags:
    - Java

  date: 2022-11-23 16:15:28
  categories: Java8
---
[[toc]]

# 前提

- 为什么会有 Optional 这个类呢?我们经常会遇到这种情况: 当调用完一个方法拿到返回值后,不能立刻使用该返回值,而是需要**先判断这个返回值是不是为`null`**,只有在返回值不为 null 的时候才能使用。为了解决这个问题,我们通常会使用`Guava`等工具库, 而在java8中则引入了`Optional`。

- **Optional是一个可以为null的容器对象, 如果值存在则isPresent()方法会返回true,调用get()方法会返回该对象。**

# Optional常用方法

:::info 提示
由于概念较为简单,直接看下 Optional 的基本使用方法
:::

## Of

> 为非null的值创建一个Optional

- of方法通过工厂方法创建Optional类
- 需要注意的是: <mark>创建对象时传入的参数**不能为null**,如果传入参数为null,则抛出 **NullPointerException。**</mark>

```java
//调用工厂方法创建Optional实例
Optional<String> name = Optional.of("Sanaulla");
//传入参数为null，抛出NullPointerException.
Optional<String> someNull = Optional.of(null);
```


## 参考资料 <Badge type="tip" text="Tip"/>
[Java8 - Optional类深度解析](https://pdai.tech/md/java/java8/java8-optional.html)
