---
  title: 函数式编程
  tags:
    - Java
  date: 2022-11-01 14:39:27
  categories: Java新特性
---
[[toc]]

<Alert>
  <strong>面向对象编程是对数据(Data)进行抽象, 而函数式编程是对行为(Action)进行抽象</strong>
</Alert>

> 在函数式编程的 **回调函数(Callback Function)** 和 **事件处理器(Event Handler)** ,不必再纠缠于匿名内部类的冗繁和可读性，函数式编程让事件处理系统变得更加简单。通过将函数方便地传递也让编写惰性代码变得容易，只有在真正需要的时候，才初始化变量的值
>
> **核心思想: 使用不可变值和函数，函数对一个值进行处理，映射成另一个值**
>
> 对核心类库的改进主要包括集合类的API和新引入的流Stream。流使程序员可以站在更高的抽象层次上对集合进行操作

# Lambda表达式

## 定义

- Lambda表达式在 Java 中又称为`闭包或匿名函数`, 表达式中仅能放入如下代码: `预定义使用了 @Functional 注释的函数式接口, 自带一个抽象函数的方法, 或者SAM(Single Abstract Method: 单个抽象方法)类型`, 我们也把这些称之为**Lambda表达式的目标类型参数**, 可以用作返回类型。

    - 举个例子: 若一个方法接收Runnable、Comparable或者 Callable 接口,都有单个抽象方法，可以传入Lambda表达式。

    - 类似的: **如果一个方法接受声明于 `java.util.function` 包内的接口，例如 `Predicate、Function、Consumer 或 Supplier`，那么就可以向其传 Lambda表达式**

- Lambda表达式中, **当且仅当该方法不修改Lambda表达式提供的参数时**还可以使用`方法引用`。但**如果对参数有任何修改,则不能使用方法引用,而需要完整的Lambda表达式**。

  ```java
    // ①.可以使用方法引用
    list.forEach(n -> System.out.println(n));   // 没有使用方法引用
    list.forEach(System.out::println);          // 等效于使用方法引用

    // ②.不能使用方法引用 => 由于在方法的参数上进行了"相关操作",所以无法使用"方法引用"
    // 注意的是: 这里的参数类型 String 是可以省略的, 编译器可以从参数列表的类属性推测出来
    list.forEach((String s) -> System.out.println("*" + s + "*"));
  ```

- Lambda表达式内部可以使用`静态、非静态和局部变量,` 这称为Lambda内的**变量捕获**
- Lambda方法在编译器内部被翻译成私有方法，并派发 `invokedynamic` 字节码指令来进行调用
  - 可以使用JDK中的 javap 工具来反编译class文件。使用 `javap -p` 或 `javap -c -v` 命令来看一看Lambda表达式生成的字节码。大致应该长这样:

    ```java
      private static java.lang.Object lambda$0(java.lang.String);
    ```
- Lambda表达式有个限制, 那就是只能引用 `final` 或 `final 局部变量`，这就是说**不能在Lambda内部修改定义在域外的变量(如果仅仅是访问的话是可以的)**

  ```java
    List<Integer> primes = Arrays.asList(new Integer[] { 2, 3, 5, 7 });
    int factor = 2;
    // ERROR: Local variables referenced from a lambda expression must be final or effectively final
    primes.forEach((element) -> {
      factor++;
    });

    // 但如果是访问外部非final变量,而不是修改的话,则是允许的
    primes.forEach((element) -> {
      System.out.println(factor * element );
    });
  ```

# 分类

Lambda表达式依据**求值的时机**,可以分为下面两种方式:
1. `惰性求值(Lazy Evaluation)`
   - 也被称为**传需求调用(call-by-need)**, 不会立即求值,而是对数据的操作需求进行**归总**
   - <mark>如果是多个条件组合，可以通过代码块 { } 对条件进行组合</mark>
    ```java
    // 代码并未做什么实际性的工作，filter只是描述了Stream,没有产生新的集合。
    lists.stream().filter(f -> f.getName().equals("p1"));
    // 多个条件组合
    lists.stream().filter(p -> {return  p.getName() == "p1" &&  p.getAge() == 12;});
    ```

2. `及早求值(Eager Evaluation)`
   - 与惰性求值相对应的,会立即求值,表示终止操作

   ```java
   // collect操作会终止 Stream流,并且返回结果
   List<Person> list2 = lists.stream().filter(f -> f.getName().equals("p1"))
                                      .collect(Collectors.toList());
   ```

在Lambda表达式中,最为理想的方式就是**形成一个惰性求值的链,最后用一个及早求值的操作返回想要的结果**

# Stream & ParallelStream

每个 Stream 都有两种模式
1. `顺序执行`
    - 这种方式会使用顺序方式去遍历时，每个item读完后再读下一个item
    ```java
    List <Person> people = list.getStream.collect(Collectors.toList());
    ```
2. `并行执行`
    - 并行的方式,会将数组分成多个段, 其中每一段都在不同的线程中处理,然后将结果一起输出,这一点和 Hadoop 的 MapReduce 思想类似,都是将数据**化大为小,而后汇总**
    ```java
    List <Person> people = list.getStream.parallel().collect(Collectors.toList());
    ```
## Stream 常用方法
- `stream`、`parallelStream`
- `filter`
- `findAny`、`findFirst`
- `sort`
- `forEach`
- `map`、`reduce`
- `flatMap`
  - 将多个Stream连接成一个Stream
- `collect`
- `distinct`、`limit`
- `count`
- `min`、`max`、`summaryStatistics`

# 常用例子

## 匿名类

```java
// 没有使用Lambda表达式
new Thread(new Runnable() {
  @Override
  public void run() {
    System.out.println("do Something...");
  }
}).start();

// 等价于下面使用Lambda表达式
new Thread(() -> System.out.println("do Something...")).start();
```

## forEach

```js
// forEach
List features = Arrays.asList("Lambdas", "Default Method", "Stream API", "Date and Time API");
features.forEach(n -> System.out.println(n));

// 使用Java 8的方法引用更方便，方法引用由::双冒号操作符表示
features.forEach(System.out::println);
```

## 方法引用
### 构造引用


::: danger
This is an `info` box.
:::
