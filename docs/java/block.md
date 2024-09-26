# 代码块

在程序编写中可以直接使用 `{}` 定义一段语句，根据此部分定义的位置以及声明的关键字的不同，代码块一共可以分为 4 种：<u>
普通代码块、构造块、静态块、同步代码块（等待多线程时）</u>。

:::warning 开发代码不建议使用代码块

代码块本身有许多破坏程序结构的操作，所以在编写实际代码的过程中，并不建议使用代码块编写。而对于此部分的内容是了解即可。

:::

## 普通代码块

如果一个代码块写在方法里，就称它为普通代码块。

```java
public class TestDemo {
    public static void main(String args[]) {
        { 	// 普通代码块
            int num = 10; 					// 局部变量
            System.out.println("num = " + num);
        }
        int num = 100; 						// 全局变量
        System.out.println("num = " + num);
    }
}
```

本程序首先在普通代码块中定义了一个 `num` 变量，然后在普通代码块的外部定义了一个 `num` 变量。由于第一个 `num`
变量 `int num=10;` 定义在代码块中，所以是个局部变量；第二个 `num` 变量 `int num=100;`
定义在普通代码块外，所以相对而言就属于全局变量，这两个变量彼此不会互相影响。一般而言普通代码块可以实现较大程序的分隔，这样可以更好地避免重名变量的问题。

:::tip 什么叫全局变量？什么叫局部变量？

**回答：全局变量和局部变量是一种相对性的概念。**

全局变量和局部变量是针对于定义代码的情况而定的，只是一种相对性的概念。例如范例中，由于第一个变量 `num`
定义在一个代码块中，所以相对于第二个变量 `num` 而言，第一个 `num` 就成为局部变量。下面来看如下程序代码。

```java
public class TestDemo {
    private static int num = 100 ;			// 全局变量
    public static void main(String args[]) {
        int num = 100; 					// 局部变量
    }
}
```

对于此程序而言，在类中定义的变量 `num` 相对于主方法中定义的变量 `num` 而言，就成为全局变量。所以这两个概念是相对而言的。

:::

## 构造块

如果将一个代码块写在一个类里，这个代码块就称为构造块。

```java
class Book {
    public Book() { 						// 构造方法
        System.out.println("【A】Book类的构造方法");
    }
    { 								// 将代码块写在类里，所以为构造块
        System.out.println("【B】Book类中的构造块");
    }
}
public class TestDemo {
    public static void main(String args[]) {
        new Book();						// 实例化类对象
        new Book();						// 实例化类对象
    }
}
```

本程序为了说明问题，特别将构造方法放在构造块之前定义，可以发现代码的结构与顺序无关。同时也可以发现，构造块在每一次实例化类对象时都会被调用，而且优于构造方法执行。

## 静态块

如果一个代码块使用 `static` 进行定义，就称其为静态块。静态块有时需要分为两种情况。

**情况一：** 在非主类中使用。

本程序在 `Book`
类中增加了静态块的定义，通过运行结果可以发现当有多个实例化对象产生时，静态块会优先调用，而且只调用一次。静态块的主要作用一般可以为 `static`
属性初始化。

```java
class Book {
    static String msg ;				// static属性，暂不封装
    public Book() { 					// 构造方法
        System.out.println("【A】Book类的构造方法");
    }
    { 							// 将代码块写在类里，所以为构造块
        System.out.println("【B】Book类中的构造块");
    }
    static {						// 定义静态块
        msg = "Hello".substring(0,2) ;
        System.out.println("【C】Book类中的静态块") ;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        new Book();					// 实例化类对象
        new Book();					// 实例化类对象
        System.out.println(Book.msg) ;
    }
}
```

本程序利用静态块为 `static` 属性进行赋值操作，但是这样做一般意义不大，所以读者有个了解即可。

**情况二：** 在主类中定义。

通过本程序的执行可以发现， **静态块将优先于主方法执行** 。

:::tip JDK1.7 的改变

在 JDK1.7 之前，Java 一直存在一个 Bug。按照标准来讲，所有的程序应该由主方法开始执行，通过 `情况二` 的代码可以发现，静态块会优先于主方法执行，所以在
JDK1.7 之前，是可以使用静态块来代替主方法的，即下述程序是可以执行的。

```java
public class TestDemo {
    static {
        System.out.println("Hello World .");
        System.exit(1);
    }
}
```

本程序在 JDK1.7 之后无法执行了，这是由于版本升级所解决的问题，而这一 Bug 从 1995 年开始到 2012 年一直都存在。

:::
