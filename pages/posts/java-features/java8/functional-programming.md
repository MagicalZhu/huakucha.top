---
  title: 函数式编程
  tags:
    - Java
  date: 2022-11-01 14:39:27
  categories: Java8
---
[[toc]]

>
> <mark><strong>面向对象编程是对数据(Data)进行抽象, 而函数式编程是对行为(Action)进行抽象</strong></mark>
>
> 在函数式编程的 **回调函数(Callback Function)** 和 **事件处理器(Event Handler)** ,不必再纠缠于匿名内部类的冗繁和可读性，函数式编程让事件处理系统变得更加简单。通过将函数方便地传递也让编写惰性代码变得容易，只有在真正需要的时候，才初始化变量的值
>
> **核心思想: 使用不可变值和函数，函数对一个值进行处理，映射成另一个值**
>
> 对核心类库的改进主要包括集合类的API和新引入的流Stream。流使程序员可以站在更高的抽象层次上对集合进行操作
>

# Lambda表达式

## 定义

- Lambda表达式在 Java 中又称为`闭包或匿名函数`, 表达式中仅能放入如下代码: `预定义使用了 @Functional 注释的函数式接口, 自带一个抽象函数的方法, 或者SAM(Single Abstract Method: 单个抽象方法)类型`, 我们也把这些称之为**Lambda表达式的目标类型参数**, 可以用作返回类型。

    - 举个例子: 若一个方法接收Runnable、Comparable或者 Callable 接口,都有单个抽象方法，可以传入Lambda表达式。

    - 类似的: **如果一个方法接受声明于 `java.util.function` 包内的接口，例如 `Predicate、Function、Consumer 或 Supplier`，那么就可以向其传 Lambda表达式**

- Lambda表达式中, **当且仅当该方法不修改Lambda表达式提供的参数时**还可以使用`方法引用`。但**如果对参数有任何修改,则不能使用方法引用,而需要完整的Lambda表达式**

  ```java
  // ①.可以使用方法引用
  list.forEach(n -> System.out.println(n));   // 没有使用方法引用
  list.forEach(System.out::println);          // 等效于使用方法引用

  // ②.不能使用方法引用 => 由于在方法的参数上进行了"相关操作",所以无法使用"方法引用"
  // 注意的是: 这里的参数类型 String 是可以省略的, 编译器可以从参数列表的类属性推测出来
  list.forEach((String s) -> System.out.println("*" + s + "*"));
  ```

- Lambda表达式内部可以使用`静态、非静态变量和局部变量,` 这称为Lambda内的**变量捕获**
- Lambda方法在编译器内部被翻译成私有方法，并派发 `invokedynamic` 字节码指令来进行调用
  - 可以使用JDK中的 javap 工具来反编译class文件。使用 `javap -p` 或 `javap -c -v` 命令来看一看Lambda表达式生成的字节码。大致应该长这样:

    ```java
    private static java.lang.Object lambda$0(java.lang.String);
    ```
- Lambda表达式有个限制, 那就是只能操作 `final` 或 `final 局部变量`，这就是说**不能在Lambda内部修改定义在域外的变量(如果仅仅是访问的话是可以的)**

  ```java {lines: '5'}
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
    - 并行的方式,会将数组分成多个段, 其中每一段都在`不同的线程`中处理,然后将结果一起输出,这一点和 Hadoop 的 MapReduce 思想类似,都是将数据**化大为小,而后汇总**
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

```java
// forEach
List features = Arrays.asList("Lambdas", "Default Method", "Stream API", "Date and Time API");
features.forEach(n -> System.out.println(n));

// 使用Java 8的方法引用更方便，方法引用由::双冒号操作符表示
features.forEach(System.out::println);
```

## 方法引用

对于方法引用来说,可以简化Lambda表达式的书写,下面是常见的方法引用的使用(注:每种方法引用与具体函数式接口没有绑定关系,只是简单的介绍各个内置函数式接口)

::: tip 说明
需要保证引用方法的`参数列表、返回值类型`与我们当前所要实现的函数式接口方法的参数列表、返回值类型保持一致。
:::

### 构造引用

```java
// Supplier 函数式接口普通写法
Supplier<Person> s1 = () -> new Person();

// 使用构造引用
Supplier<Person> s2 = Person::new;

/*
 * Supplier 函数式接口的定义,定义了获取数据的接口,但是方法没有入参的函数
 */
@FunctionalInterface
public interface Supplier<T> {
  T get();
}
```

### 对象::实例方法

```java
// Consumer 函数式接口,用于消费参数列表
Consumer<String> con = (x) -> System.out.println(x);
con.accept("hua");

// Lambda 简写
Consumer<Integer> con2 = System.out::println;
Consumer<Integer> con3 = (x) -> System.out.println(x + 10);
con2.andThen(con3).accept(10);  // out: 10,20

/**
 * Consumer 函数式接口的定义,定义了有入参但是没有返回值的函数(消费函数)
 * 其中 andThen 可以将多个 Consumer 串联,最后通过 accept 依次执行每个 Consumer
 */
@FunctionalInterface
public interface Consumer<T> {
  void accept(T t);
  default Consumer<T> andThen(Consumer<? super T> after) {
    Objects.requireNonNull(after);
    return (T t) -> { accept(t); after.accept(t); };
  }
}
```

### 类名::静态方法

```java
/**
 * 这里在Person中自定义了静态方法 void foo(String x) {...}
 */
// 函数式接口
Consumer<String> con1 = (x) -> Person.foo(x);
con1.accept("hua");

// 类::静态方法引用
Consumer<String> con2 = Person::foo;
con2.accept("hua");
```

## Filter(Predicate)

> 通过 Filter 和 Predicate 对数据进行过滤与断言匹配。同时可以通过 Predicate 的逻辑连接符对将多个 Predicate 连接

```java
// 准备数据
List<String> data = Arrays.asList("A1", "A2", "A3","A11", "B1", "B2", "B11");
// 定义断言
Predicate<String> p1 = s -> s.startsWith("A");
Predicate<String> p2 = s -> s.length() > 2;
Predicate<String> pGroup = p1.and(p2);
// 使用filter
data.stream().filter(pGroup).forEach((name) -> {
  System.out.println(name + " ");
});  // out: A11

/**
 * Returns a stream consisting of the elements of this stream that match
 * the given predicate.
 */
Stream<T> filter(Predicate<? super T> predicate);


/**
 * Predicate 函数式接口的定义,定义了判断类型的函数
 */
@FunctionalInterface
public interface Predicate<T> {
  /**
   * Evaluates this predicate on the given argument.
   */
  boolean test(T t);

  default Predicate<T> and(Predicate<? super T> other) {
    Objects.requireNonNull(other);
    return (t) -> test(t) && other.test(t);
  }

  default Predicate<T> negate() {
    return (t) -> !test(t);
  }

  default Predicate<T> or(Predicate<? super T> other) {
    Objects.requireNonNull(other);
    return (t) -> test(t) || other.test(t);
  }
}
```

## Map&Reduce

> Map 将集合类元素进行转换, Reduce 可以将所有值合并成一个

```java
/**
 * 每个数据*2 后相加
 */
List<Integer> numbers = Arrays.asList(100, 200, 300, 400, 500);
// 定义多个Function函数式接口
Function<Integer,Integer> addFn = (n) -> n * 2;
Function<Integer,Integer> minusFn = (n) -> n - 1;
Function<Integer,Integer> finalFn = addFn.andThen(minusFn);
// 定义BinaryOperator函数式接口,用于消费数据并返回结果
BinaryOperator<Integer> reduceFn = (m,n) -> m+n;

Integer res = numbers.stream().map(finalFn).reduce(reduceFn).get();
System.out.println(res);  // out:2995

/**
 * Function 函数式接口,定义了有入参和返回值的功能型函数
 */
@FunctionalInterface
public interface Function<T, R> {
  /**
   * Applies this function to the given argument.
   */
  R apply(T t);
}
```

## Collectors

> 用于收集、转换流中的元素

```java
// 将字符串换成大写并用逗号链接起来
List<String> G7 = Arrays.asList("USA", "Japan", "France", "Germany", "Italy", "U.K.","Canada");
String G7Countries = G7.stream().map(x -> x.toUpperCase()).collect(Collectors.joining(", "));
System.out.println(G7Countries);


/*
 * Collector 不是一个函数式接口
 * @param <T> the type of input elements to the reduction operation
 * @param <A> the mutable accumulation type of the reduction operation (often
 *            hidden as an implementation detail)
 * @param <R> the result type of the reduction operation
 */
public interface Collector<T, A, R> {
```

## flatMap

> 将多个 Stream 连接成一个 Stream

```java
List<Integer> result= Stream.of(Arrays.asList(1,3),Arrays.asList(5,6))
                            .flatMap(a->a.stream())
                            .collect(Collectors.toList());
```

## distinct & count

> 去重和计数

```java
List<Integer> numbers = Arrays.asList(1,3,3,4,2,4,7);
List<Integer> distinctData = numbers.stream().distinct().collect(Collectors.toList());
System.out.println(distinctData);   // out: [1, 3, 4, 2, 7]
System.out.println(numbers.stream().distinct().count());    //out:5

```

## Match

```java
boolean anyStartsWithA = stringCollection
        .stream()
        .anyMatch((s) -> s.startsWith("a"));

System.out.println(anyStartsWithA);      // true

boolean allStartsWithA = tringCollection
              .stream()
              .allMatch((s) -> s.startsWith("a"));

System.out.println(allStartsWithA);      // false

boolean noneStartsWithZ = stringCollection
        .stream()
        .noneMatch((s) -> s.startsWith("z"));

System.out.println(noneStartsWithZ);      // true
```

## peek

> 利用 peek方法可以对流进行一些调试, 且peek方法可只包含一个空的方法体

```java
List<Person> lists = new ArrayList<Person>();
lists.add(new Person(1, "p1"));
lists.add(new Person(2, "p2"));
lists.add(new Person(3, "k3"));
lists.add(new Person(4, "k4"));
System.out.println(lists);

List<Person> list2 = lists.stream()
				        .filter(f -> f.getName().startsWith("p"))
                .peek(t -> {
                    System.out.println(t.getName());
                })
                .collect(Collectors.toList());
System.out.println(list2);
```

:::tip 说明
从上面可以看出来,函数式接口是一种对函数的描述
:::

# FunctionalInterface

函数式接口有下面的几个特点:

1. interface做注解的注解类型，被定义成java语言规范
2. 一个被它注解的接口只能有一个抽象方法，有两种例外
   - 第一: 接口允许有实现的方法，这种实现的方法是用default关键字来标记的(java反射中java.lang.reflect.Method#isDefault()方法用来判断是否是default方法)
   - 第二: 如果声明的方法和java.lang.Object中的某个方法一样，它可以不当做未实现的方法，不违背这个原则: 一个被它注解的接口只能有一个抽象方法, 比如:
      ```java
      public interface Comparator<T> {
        int compare(T o1, T o2);
        boolean equals(Object obj);
      }
      ```
3. 如果一个类型被这个注解修饰，那么编译器会要求这个类型必须满足如下条件
   - 这个类型必须是一个interface，而不是其他的注解类型、枚举enum或者类class
   - 这个类型必须满足function interface的所有要求，如你个包含两个抽象方法的接口增加这个注解，会有编译错误。
4. 编译器会自动把满足function interface要求的接口自动识别为function interface

## 自定义函数接口

```java
@FunctionalInterface
public interface MyFInterface<T,E,R> {
  R consume(T t, E e) ;
}

/**
 * 使用函数式接口
 */
MyFInterface<Integer, Integer, Integer> mfn = (x,y) -> {
  int num = x+y *2;
  return num;
};
Integer val = mfn.consume(100, 200);
System.out.println(val);  // out:500

```

## 内置四大函数接口

1. 消费型接口: `Consumer<T>     void accept(T t)`, 定义了有参数,无返回值的抽象方法
2. 供给型接口: `Supplier <T>    T get()`, 定义了无参,有返回值的抽象方法
3. 断定型接口: `Predicate<T>    boolean test(T t)`, 定义了有参，但是返回值类型是固定的boolean
4. 函数型接口: `Function<T,R>   R apply(T t)`, 定义了有参,有返回值的抽象方法

# 参考
1. <app-link to="https://pdai.tech/md/java/java8/java8-stream.html" class="sourceLink">Java8-函数编程(lambda表达式)</app-link>
2. <app-link to="https://github.com/aalansehaiyang/java8-tutorial" class="sourceLink">java8-tutorial</app-link>
