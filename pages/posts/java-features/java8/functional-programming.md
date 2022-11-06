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

- Lambda表达式仅能放入如下代码: `预定义使用了 @Functional 注释的函数式接口, 自带一个抽象函数的方法, 或者SAM(Single Abstract Method: 单个抽象方法)类型`, 我们也把这些称之为**Lambda表达式的目标类型参数**, 可以用作返回类型。

    - 举个例子: 若一个方法接收Runnable、Comparable或者 Callable 接口，都有单个抽象方法，可以传入lambda表达式。

    - 类似的: **如果一个方法接受声明于 `java.util.function` 包内的接口，例如 `Predicate、Function、Consumer 或 Supplier`，那么就可以向其传 lambda 表达式**

- Lambda 表达式内, **当且仅当该方法不修改lambda表达式提供的参数时**还可以使用`方法引用`。

    ```java
      /*
        本例中的lambda表达式可以换为方法引用，因为这仅是一个参数相同的简单方法调用
      */
      // 没有使用方法引用
      list.forEach(n -> System.out.println(n));
      // 等效于使用方法引用
      list.forEach(System.out::println);

      // 然而, 如果对参数有任何修改，则不能使用方法引用，则需要完整地使用lambda表达式:
      list.forEach((String s) -> System.out.println("*" + s + "*"));
    ```
