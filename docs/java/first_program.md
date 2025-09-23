# 第一个 Java 程序

Java程序分为两种类型：一种是 `Application` 程序，另一种是 `Applet` 程序。其第一个 Java 程序中有 `main`
方法的程序主要都是`Application` 程序。

`Applet` 程序主要应用在网页上，因为其已经基本不再使用，所以只做简短介绍。

:::warning 文件名称后缀必须是 *.java

编写的程序的文件名称后缀一定是 `*.java`
，如果发现在编译的时候找不到文件，那么很有可能是因为计算机隐藏了已知的文件扩展名称，此时可以在命令行方式先使用 `dir`
命令查看详细文件列表。

:::

定义一个新的文件： `Hello.java`

```java
public class Hello { //定义一个类
    public static void main(String[] args) { //主方法，一切程序的起点
        System.out.println("Hello World!"); //在屏幕上打印输出
    }
}
```

当一个 `*.java` 程序编写完成后，可以按照如下步骤执行：

- 编译程序，通过命令行进入程序所在的路径，执行 `javac Hello.java` ，形成 `Hello.class`（字节码)。
- 解释程序，输入：`java Hello` ，将生成的 Hello.class 在 JVM 上执行，

也可以在集成开发环境中直接点击绿色箭头运行。

<img src="http://niu.ochiamalu.fun/image-20240917155049868.png" alt="image-20240917155049868" style="zoom:80%;margin:0 auto" />

### 类的定义

关于类的定义类是 Java 中的**基本组成元素**，而所有的 Java 程序一定要被类管理，定义类的简单格式如下：

> [public] class 类名称 {}

在类前面可以有**选择性地**决定是否需要编写 `public` ,所以对于类的定义有以下两种形式。

1. public class定义：类名称必须和文件名称保持一致，否则程序将无法编译。在一个 java 中**只能有一个** public class。
1. class定义：类名称可以和文件名称不一致，但是生成的是 class 定义的名称。在一个java程序中可以同时存在 **多个**
   class定义，编译之后会分为不同的 *.class 文件。

### 主方法 main()

主方法表示的是一个程序起点，所有的程序代码都由此开始顺序执行，在Java中主方法也要放在一个类中，其定义格式如下：

> ```java
> public static void main(String[] args) {}
> ```

通过格式可以发现，在主方法中存在许多字母，这些字母的顺序是**完全固定**的，此处可以暂时先将其记下，以后的章节部分会进行完整的讲解。

### 系统输出 System.out.println()

在范例中，主方法只定义了一个 `System.out.print1n("He1 lo World!")` 语句，此语句的功能是直接在**屏幕上显示输出信息**
，而对于输出的操作也有如下两种语法。

> 输出后加换行：System.out.printIn(输出内容)
>
> 输出后不加换行：System.out.print(输出内容)

::: tip 语句使用分号完结

在 Java 中每一个完整的语句代码，例如：`System.out.println("Hello Nor1d!");` 语句是一个完整的语句代码，都要求使用 `；` 进行结尾。

:::
