# 打印流

在 `java.io` 包中 `OutputStream` 是进行输出操作的最核心控制类，但是利用 `OutputStream`
会存在一个问题：所有的输出数据必须以字节类型的数据为主，也就是说如果现在要输出的数据是 `int` (Integer)、`double` (
Double)、`java.util.Date` 等常用类型都需要将其转换为字节后才可以输出。为了解决这样的矛盾问题，在 `java.io`
包中又专门提供了一组打印流（字节打印流：`PrintStream` ，字符打印流：`PrintWriter` ）方便用户的输出操作。本节将为读者讲解打印流的设计思想以及打印流的具体使用。

## 打印流设计思想

`java.io.OutputStream` 类主要是进行数据输出，如果要设计更加合适的打印流操作类，就必须解决 `OutputStream`
输出数据类型有限（只有 `byte` 类型）的问题。这时可以采用一种包装设计的模式，即将 `OutputStream`
类利用其他类进行包装，并且在这个类中提供了各种常见数据类型的输出操作，这样用户在进行输出操作时就可以回避字节数据的操作。打印流实现思想如图所示。

<img src="http://niu.ochiamalu.fun/image-20240927234337057.png" alt="image-20240927234337057" style="zoom:80%;margin:0 auto" />

在图中可以发现，打印流的核心思想就是首先包装一个 `OutputStream`
类的实例化对象，然后在打印流的内部自动帮助用户处理好各种数据类型与字节数组的转换操作。也就是说 `OutputStream`
的本质功能没有改变，但是操作的形式变得更加多样化，也更加方便用户使用，这样的设计就属于装饰设计模式。下面来看打印流代码的实现。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
class PrintUtil {							// 实现专门的输出操作功能
    private OutputStream output ;			// 输出只能依靠OutputStream
    /**
     * 输出流的输出目标要通过构造方法传递
     * @param output
     */
    public PrintUtil(OutputStream output) {
        this.output = output ;
    }
    public void print(int x) {				// 输出int型数据
        this.print(String.valueOf(x));			// 调用本类字符串的输出方法
    }
    public void print(String x) {
        try {	// 采用OutputStream类中定义的方法，将字符串转变为字节数组后输出
            this.output.write(x.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void print(double x) {				// 输出double型数据
        this.print(String.valueOf(x));
    }
    public void println(int x) {				// 输出数据后换行
        this.println(String.valueOf(x));
    }
    public void println(String x) {			// 输出数据后换行
        this.print(x.concat("\n"));
    }
    public void println(double x) { 
        this.println(String.valueOf(x));
    }
    public void close() {					// 输出流关闭
        try {
            this.output.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        PrintUtil pu = new PrintUtil(new FileOutputStream(new File("d:"
               + File.separator + "yootk.txt")));
        pu.print("优拓教育：");
        pu.println("www.yootk.com");
        pu.println(1 + 1);
        pu.println(1.1 + 1.1);
        pu.close();
    }
}
```

本程序利用 `PrintUtil` 类包装了 `OutputStream` 类，在实例化 `PrintStream`
类对象时需要传递输出的位置（实际上就是传递`OutputStream` 类的子类），这样就可以利用 `PrintUtil`
类中提供的一系列方法实现数据的输出操作，而这样的做法对于客户端而言是比较容易的，因为客户端没有必要再去关心数据类型的转换操作。

但是从实际的开发来讲，面对的数据类型可能会有多种，如果这样的工具类全部都由用户自己来实现，那么明显是不现实的，为此 `java.io`
包提供了专门的打印流处理类： `PrintStream` 、`PrintWriter` 。

## 打印流

`OutputStream` 提供了核心的数据输出操作标准，但是为了更方便地实现输出操作，`java.io`
包提供了两个数据打印流的操作类：`PrintStream` (打印字节流)、 `PrintWriter` （打印字符流）。以 `PrintStream` 类为例，此类的继承结构如图所示。

:::tip 以 `PrintStream` 为例

实际上 `PrintStream` 与 `PrintWriter` 两个类在使用上是完全一样的，方法功能也一样。本节将以 `PrintStream` 类为例进行讲解。

:::



<img src="http://niu.ochiamalu.fun/image-20240927234349611.png" alt="image-20240927234349611" style="zoom:80%;margin:0 auto" />

下表列出了 `PrintStream` 类的常用操作方法。

<img src="http://niu.ochiamalu.fun/image-20240927234447402.png" alt="image-20240927234447402" style="zoom:80%;margin:0 auto" />

通过表可以发现，`PrintStream` (或 `PrintWriter` )类中提供了一系列 `print()` 与 `println()`
方法，并且这些方法适合各种常见数据类型的输出（例如：int、double、long、Object等）。而这些方法就相当于为用户隐藏了 `OutputStream`
类中的 `write()` 方法，即将原本的 `OutputStream` 类的功能进行包装，在保持原方法功能不变的情况下，提供更方便的操作，这就是装饰设计模式的体现。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        // 实例化PrintStream类对象，本次利用FileOutputStream类实例化PrintStream类对象
        PrintStream pu = new PrintStream(new FileOutputStream(new File("d:"
                + File.separator + "yootk.txt")));
        pu.print("优拓教育：");
        pu.println("www.yootk.com");
        pu.println(1 + 1);
        pu.println(1.1 + 1.1);
        pu.close();
    }
}
```

本程序在实例化 `PrintStream` 类对象时传递了一个 `FileOutputStream`
类对象，表示将进行文件内容的输出，随后调用了 `PrintStream` 类中的 `print()` 与 `println()` 两个方法进行文件内容的输出。

:::tip PrintStream、PrintWriter原理

实际上在上一节中所讲解的内容就是 `PrintStream` (PrintWriter) 类的实现原理，也为读者讲解了为什么在 `PrintStream`
类的对象实例化中需要使用 `OutputStream` 的子类。本类设计属于装饰设计模式，即将原本功能不足的类使用另外一个类包装，并提供更多更方便的操作方法。

:::

## PrintStream 类的改进

`PrintStram` 类在最初设计时主要是为了弥补 `OutputStream` 输出类的功能不足，但是从 JDK1.5 开始，Java 为 `PrintStream`
增加了格式化输出的支持方法：`public PrintStream printf(String format,.Object..args)` 。利用这些方法可以使用像 C
语言那样的数据标记实现内容填充，常见的输出标记为：整数（%d）、字符串（%s）、小数（%m.nf）、字符（%c）。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        String name = "李兴华";
        int age = 19;
        double score = 59.95891023456;
        PrintStream pu = new PrintStream(new FileOutputStream(new File("d:"
                + File.separator + "yootk.txt")));
        pu.printf("姓名：%s，年龄：%d，成绩：%5.2f", name, age, score);
        pu.close();
    }
}
```

本程序利用 `printf()` 进行了格式化输出操作，在输出字符串时使用了一系列占位符进行标记，由于 `printf()`
方法中设置的参数使用了可变参数类型，所以只需要根据参数意义依次传递数据即可，同时在格式化操作中还具备四舍五入的功能（本次使用的是 `
%5.2，表示整数位为 3 位，小数位为 2 位，一共 5 位）。

:::tip String 类中的 `format()` 方法

从 JDK1.5 开始在 `String`
类中也提供了一个格式化字符串的方法，即格式化字符串：`public static String format(String format,Object..args)` 。

```java
package com.yootk.demo;
public class TestDemo {
    public static void main(String[] args) throws Exception { 
        String name = "李兴华";
        int age = 19;
        double score = 59.95891023456;
        String str = String.format("姓名：%s，年龄：%d，成绩：%5.2f", name, age, score);
        System.out.println(str);
    }
}
```

由于 `format()` 方法使用了 `static` 进行定义，所以可以直接利用 `String` 类调用，在本方法使用中需要传递数据的标记与相应的数据才可以实现最终显示结果的拼凑。

:::
