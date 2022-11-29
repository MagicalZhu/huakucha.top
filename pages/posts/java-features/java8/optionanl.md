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
name.ifPresent(x -> System.out.println(x));  // out:Sanaulla

Optional<String>  someNull = Optional.of(null);
//传入参数为null, 抛出NullPointerException.
someNull.ifPresent(x -> System.out.println(x)); 
```

## ofNullable

> 为指定的值创建一个Optional, 和of不同的是:**如果指定的值为null，则返回一个空的Optional,而不是抛出异常**

- ofNullable与of方法相似，唯一的区别是可以接受参数为null的情况。示例如下:

```java
Optional<String> someNull = Optional.ofNullable(null);
// 虽然传入的参数是Null,但是不会抛出NullPointerException
someNull.ifPresent(x->System.out.println(x));
```

## isPresent

> 如果Optional中有值(Null不算)返回true,否则返回false

```java
Optional<String> someNull = Optional.ofNullable(null);
boolean hasVal = someNull.isPresent();
System.out.println(hasVal); //out:false
```

## get

> 如果 Optional有值则将其返回, 否则抛出 NoSuchElementException

```java
Optional<String> of = Optional.of("123");
if (of.isPresent()) {
  System.out.println(of.get());   // out: 123
}
```

## ifPresent

> 如果 Optional 有值则为其调用 Consumer 函数式接口，否则不做处理

[使用示例](optionanl#ofnullable)

## orElse

> 如果 Optional 有值则将其返回，否则返回 orElse方法传入的参数

- 与 orElse 方法类似的还有下面几个
   - `orElseGet` : 可以接受 Supplier 接口的实现用来生成默认值
   - `orElseThrow` : 可以传入一个 lambda 表达式或方法，如果值不存在来抛出异常

```java
try {
  Optional<String> op = Optional.ofNullable(null);
  // orElse => out:its null
  System.out.println(op.orElse("its null"));

  // orElseGet => out:orElseGet
  System.out.println(op.orElseGet(() -> "orElseGet"));

  // orElseThrow => NoSuchFieldError 异常信息
  op.orElseThrow(NoSuchFieldError::new);
} catch (Exception e) {
  e.printStackTrace();
}
```

## map

> 如果 Optional 有值，则对其执行调用 mapper 函数式接口得到返回值。
> 如果返回值不为 null，则创建包含该 mapper 返回值的 Optional作为 map 方法的返回值，否则返回空 Optional

```java
Optional<String> op = Optional.ofNullable("name");
// 返回一个新的 Optional
op = op.map(val -> val.toUpperCase());
System.out.println(op.get()); // out: NAME
```

## flatMap

> 如果有值，为其执行 mapper 函数式接口返回 Optional类型返回值，否则返回空Optional

- flatMap 与 map 类似, 区别在于 mapper 函数式接口的返回值不同
   - map的 mapper 函数式接口的返回值可以是任何类型 T
   - flatMap的 mapper 函数式接口的返回值类型必须是 *Optional*

```java
Optional<String> op = Optional.ofNullable("flatMap");
// flatMap 中 mapper函数式接口参数的返回值是 Optional 类型
Optional<String> flatMapVal = op.flatMap(x -> Optional.ofNullable(x.toUpperCase()));
System.out.println(flatMapVal.get());  // out: FLATMAP
```

## filter

> filter 方法通过传入限定条件对 Optional 的值进行过滤, 如果有值并且满足断言条件返回包含该值的 Optional，否则返回空Optional

```java
Optional<String> op = Optional.ofNullable("flatMap");
Optional<String> filterSuccess = op.filter(x -> x.startsWith("f"));
Optional<String> filterFail = op.filter(x -> x.startsWith("g"));

// out: flatMap
System.out.println(filterSuccess.orElse("dont startsWith f"));
// out: dont startsWith g
System.out.println(filterFail.orElse("dont startsWith g"));
```

# 参考资料 <Badge type="tip" text="Tip"/>
[Java8 - Optional类深度解析](https://pdai.tech/md/java/java8/java8-optional.html)
