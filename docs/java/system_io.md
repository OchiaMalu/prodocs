# System 类对 IO 的支持

`System` 类是现在为止使用最多的一个类，所有的信息输出都会使用到 `System.out.println()` 或 `System.out.print()`
两个方法完成。实际上 `System` 类中也专门提供了与 IO 有关的 3 个对象常量，如表所示。

<img src="http://niu.ochiamalu.top/image-20240927235120373.png" alt="image-20240927235120373" style="zoom:80%;margin:0 auto" />

通过表可以发现，`err` 与 `out` 两个对象的类型都属于 `PrintStream` 类型，`in` 对象类型属于 `InputStream`
，而最早使用的 `System.out.println()` 代码从本质上来讲就是调用了 `System` 类中的 `out`
常量，由于此常量类型为 `PrintStream` ，所以可以继续调用 `PrintStream` 类中的 `print()` 或 `println()` 方法，也就证明，Java
的任何输出操作实际上都是 IO 操作。

## 错误输出：System.err

`System.err` 是 `PrintStream` 类对象，此对象专门负责进行错误信息的输出操作。

```java
package com.yootk.demo;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        try {
            Integer.parseInt("abc");		// 此处一定会发生异常
        } catch (Exception e) {
            System.err.println(e);		// 错误输出
        }
    }
}
```

本程序试图将字符串 `“abc”` 转换为 `int`
型数据，而由于字符串不是由数字所组成，所以此处一定会产生异常，而本程序在异常处理中利用 `System.err` 实现了错误信息的打印。

## 信息输出：System.out

`Sysetm.out` 是进行屏幕输出的操作对象，是一个 `PrintStream` 类的实例化对象，并且由 JVM
负责该对象的实例化，由于 `PrintStream` 也是 `OutputStream` 的子类，所以可以利用 `System.out` 为 `OutputStream` 类进行实例化。

但是从实际上讲，范例的代码意义并不大，因为 `OutputStream` 与 `PrintStream` 相比，明显输出时使用 `PrintStream`
更加方便（因为它提供了各种 `print()` 、`println()` 方法），而本程序的意义只是在于验证不同的子类为 `OutputStream`
对象实例化，输出的位置也不同这一对象多态性的概念应用。

```java
package com.yootk.demo;
import java.io.OutputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception {		// 此处直接抛出异常
        OutputStream out = System.out; 					// OutputStream就为屏幕输出
        out.write("www.yootk.com".getBytes()); 			// 屏幕输出
    }
}
```

由于 `System.out` 属于 `PrintStream` 类的实例，所以可以直接利用其为 `OutputStream` 对象实例化，此时调用 `write()`
方法输出时就变为了屏幕显示。

:::tip 与函数式接口的联系

在 JDK1.8
提供的函数式接口里面，有一个消费型的函数式接口，此接口中的方法不返回结果，但是会接收参数。此时就可以利用方法引用的概念，利用 `System.out.println()`
实现 `Consumer` 接口的实例化。

```java
package com.yootk.demo;
import java.util.function.Consumer;
public class TestDemo {
    public static void main(String[] args) throws Exception { 	// 此处直接抛出
        Consumer<String> con = System.out::println;		// 方法引用
        con.accept("更多课程请访问：www.yootk.com");		// 输出
    }
}
```

本程序采用方法引用的概念，将 `System.out` 对象中的 `println()` 方法引用到 `Consumer` 接口中，而后利用 `accept()`
方法就可以实现屏幕信息输出。

:::

## 系统输入：System.in

在许多编程语言中为了方便用户的交互操作，都会直接提供一种键盘输入数据的操作功能，但是在 Java
中并没有提供这样可以直接使用的键盘输入操作，而要想实现此类操作必须采用 IO 处理的形式完成，操作的核心就是利用 `System.in` (
此为 `InputStream` 类实例化对象)完成。

```java
package com.yootk.demo;
import java.io.InputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception { 	// 此处直接抛出
        // 为了方便读者理解，本处将System.in使用InputStream接收，但实际上不需要此操作
        InputStream input = System.in;					// System.in为InputStream类实例
        byte data[] = new byte[1024];						// 开辟空间接收数据
        System.out.print("请输入数据：");					// 信息提示，此处没有换行
        int len = input.read(data);						// 读取数据并返回长度
        System.out.println("输入数据为：" + new String(data, 0, len));
    }
}
```

本程序利用 `System.in`
实现了键盘数据的读取操作，与文件读取不同的地方在于，本程序的文件内容已经是固定好的，所以读取时会直接进行加载（如图(a)
所示）。通过键盘读取时，由于内容还未输入，所以会出现一个等待用户输入的操作界面，用户输入完成按回车后才会开始读取数据（如图(b)
所示)。

<img src="http://niu.ochiamalu.top/image-20240927235814802.png" alt="image-20240927235814802" style="zoom:80%;margin:0 auto" />

虽然范例的代码实现了键盘输入的操作功能，但是此时就会出现一个问题：本处读取的数据为 1024 个字节，如果读取的内容超过了 1024
个字节，就会出现漏读的问题（超过数组长度的部分不会被接收）。

:::tip 可以利用内存流转换

在范例的程序中，只是读取了一次，所以当出现内容超过预定义数组长度后就会出现漏读的问题。但是读者也可以利用内存流将其进行改进，例如：可以将所有读取的数据暂时保存在内存输出流中，并且 `ByteArraryOutputStream`
类中提供了 `toByteArray()`
方法可以取得全部的字节数句，这样结合循环读取就可以将内容读取全面。但是这样的操作较为复杂，讲解此问题的目的也在于引出后面的输入流操作类，同时此处知识又不作为重点掌握，所以本书不再编写复杂代码，只是作为一个思路提醒读者，有兴趣的读者可以自行实现。

:::

要想解决此时的漏读问题，可以不使用数组接收，而是采用循环的方式进行读取，并且将每次读取进来的数据利用 `StringBuffer` 类对象保存。

```java
package com.yootk.demo;
import java.io.InputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出异常
        InputStream input = System.in ;
        StringBuffer buf = new StringBuffer();			// 接收输入数据
        System.out.print("请输入数据：");				// 提示信息
        int temp = 0;							// 接收每次读取数据长度
        while ((temp = input.read()) != -1) {				// 判断是否有输入数据
            if (temp == '\n') {						// 判断是否为回车符
               break;							// 停止接收
            }
            buf.append((char) temp);					// 保存读取数据
        }
        System.out.println("输入数据为：" + buf);		// 输出内容
    }
}
```

本程序由于使用了 `StringBuffer`
类对象保存数据，所以没有数据长度的限制，但是此时的代码在输入英文数据时没有任何问题，而输入中文数据时却会出现乱码。造成乱码的原因也很简单，这是一个中文的编码拆分成了两半（每次读取一个字节）而造成的编码出错，如图所示。要想解决此类问题，就可以利用字符缓冲输入流完成。

<img src="http://niu.ochiamalu.top/image-20240928000013848.png" alt="image-20240928000013848" style="zoom:80%;margin:0 auto" />
