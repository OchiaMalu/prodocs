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

<img src="http://niu.ochiamalu.top/image-20240917155049868.png" alt="image-20240917155049868" style="zoom:80%;margin:0 auto" />

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

## 注释

在程序中，由于其基本组成都是代码，所以考虑到程序可维护性的特点，在编写代码时都要在每段代码上增加若干个说明文字，这些文字不需要被编译器编译，它们被称为Java的注释。对于注释，Java一共分为以下3种形式

- /：单行注释；
- /\*...\*/:多行注释；
- /\**....\*/:文档注释。

::: tip 关于3种注释的选择

一般单行注释，注释少量代码或者说明内容，多行注释一般使用多行注释大量的代码或者说明内容，文档注释一般用于对类和方法进行功能说明
，说明类的编写时间和作者以及方法作用参数和返回值。

:::

### 单行注释

单行注释，就是在注释内容前面加双斜线(/)，Java 编译器在进行程序编译时会 **忽略** 掉这部分信息。

```java
public class Hello {
    public static void main(String[] args) {
        //此处为注释，编译代码时不编译
        System.out.println("Hello World!");
    }
}
```

### 多行注释

多行注释，就是在注释内容前面以单斜线加一个星形标记(/*)开头，并在注释内容末尾以一个星形标记加单斜线(*/)
结束。当注释内容超过一行时一般使用这种方法。

```java
public class Hello {
    public static void main(String[] args) {
        /*
         * 此处为多行
         * 注释
         */
        System.out.println("Hello World!");
    }
}
```

### 文档注释

文档注释，是以单斜线加两个星形标记(/\*\*)开头，并以一个星形标记加单斜线(\*/)结束。用这种方法注释的内容会被解释成程序的正式文档，并能包含进如
javadoc 工具生成的文档里，用以说明该程序的层次结构及其方法。

```java
/**
 * 你好
 *
 * @author OchiaMalu
 * @date 2024/09/17
 */
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

在文档注释中提供了许多类似于 `@Author` 的标记，例如：参数类型、返回值、方法说明等。而对于初学者而言，以上 3
种注释，重点先掌握单行注释和多行注释即可。

## 关键字与标识符

`public class 类名称 {}` 实际上这里的类名称就属于一个标识符的内容，但是除了类名称之外，属性名标识符与关键字称、方法名称等也都属于标识符的定义范畴，但是在
Java 中每一个标识符都有自己的严格定义要求。** 标识符的定义要求是：标识符由字母、数字、_
、$组成，其中不能以数字开头，不能是Java中的关键字(有些语言也称其为保留字)。**
对于以上的要求，需要注意以下问题：

- 在编写的时候尽量不要去使用数字，例如：1、2；
- 命名尽量有意义，不要使用 “a” “b” 这样的标识符。例如：Student、Math这些都属于有意义的内容；
- Java 中标识符是 **区分大小写** 的，例如：mldn、Mldn、MLDN表示3个不同的标识符；
- 对于 `$` 符号有特殊意义，不要去使用（将在内部类中讲解）；

:::tip 标识符编写的简单建议

一些刚接触编程语言的读者可能会觉得记住上面的规则很麻烦，所以在这里提醒读者，标识符最好永远用字母开头，而且尽量不要包含其他符号。

:::

对于初学者来讲，关键字是一个比较麻烦的问题，所谓的关键字就是指具备有特殊含义的单词，例如：<u>public、class、static</u>
，这些都属于关键字，关键字全部用小写字母的形式表示，在 Java 中可以使用的关键字如表所示。

<img src="http://niu.ochiamalu.top/image-20240917161636967.png" alt="image-20240917161636967" style="zoom:67%;margin:0 auto" />

:::tip 不需要去强记 Java 中的关键字

对于刚学习语言的读者来说，可能会觉得如果要记住以上全部关键字是一件比较麻烦的事，对于以上的内容随着知识的熟练度会慢慢记住，不用强记，回顾一下之前的内容，会发现已经见过public、class、void、static等关键字，所以对于一门编程语言多加练习才是最好的掌握方法。

:::

对于所有给出的关键字有如下 4 点说明。

- Java有两个未使用到的关键字：`goto` (在其他语言中表示无条件跳转)、`const` (在其他语言中表示常量)；
- JDK1.4之后增加了 `assert` 关键字；
- JDK1.5之后增加了 `enum` 关键字；
- Java有3个特殊含义的标记（严格来讲不算是关键字)：true、false、null 。

## 数据类型划分

任何程序严格来讲都属于一个数据的处理游戏，所以对于数据的保存就必须有严格的限制，这些限制就体现在了数据类型的划分上，即：<u>
不同的数据类型可数据类型划分以保存不同的数据内容</u>。Java 的数据类型可分为**基本数据类型**与**引用数据类型**。

其中基本数据类型包括最基本的 **byte、short、int、long、float、double、char、boolean** 等类型。

引用数据类型（类似于C/C++的指针）在操作的时候必须要进行内存的开辟，数据类型的划分如图所示。

<u>基本数据类型不牵扯内存分配问题，而引用数据类型需要由开发者为其分配空间，而后进行关系的匹配。</u>

<img src="http://niu.ochiamalu.top/image-20240917162155156.png" alt="image-20240917162155156" style="zoom:80%;margin:0 auto" />

Java 的基本数据类型主要以数值的方式进行定义，这些基本数据类型的保存数据范围与默认值如表

<img src="http://niu.ochiamalu.top/image-20240917162249520.png" alt="image-20240917162249520" style="zoom:80%;margin:0 auto" />

:::tip 记下各个基本数据类型

表给出的各个基本数据类型，都有其数据的默认值，为了日后的开发方便，读者一定要将这些数据类型的默认值记住，同时还需要记住byte表示的范围是-128~
127,double保存的数据长度最大。

:::

### 数据类型的选择

实际上在编程初期许多人会犹豫选择哪种基本数据类型，也会思考是否要记住这些数据类型所表示的数据范围，而最终的结果会发现可能根本就记不下来。考虑到这样的原因，与大家分享一下基本数据类型选择经验。

- 如果要想表示整数就使用 `int` (例如，表示一个人的年龄)，表示小数就使用 `double`（例如，表示一个人的成绩或者是工资)：
- 如果要描述日期时间数字或者表示文件或内存大小（程序中是以字节为单元统计大小的)就用 `long` ;
- 如果要实现内容传递(IO操作、网络编程)或者是编码转换（JSP开发中使
  用UTF-8编码)就用 `byte` ;
- 如果要想实现逻辑的控制，就用 `boolean` 描述(boolean只有true和false两种值)；
- 如果要想处理中文，使用 `char` 可以避免乱码问题。

而且由于现在的计算机硬件价格（CPU、内存、磁盘)逐步走低，这样对于数据类型的选择也不像最早编程那样需要严格的限制其大小，所以像short、float
等数据类型已经很少出现了。