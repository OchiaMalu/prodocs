# 字符缓冲流：BufferedReader

为了可以进行完整数据的输入操作，最好的做法是采用缓冲区的方式对输入的数据进行暂存，而后程序可以利用输入流一次性读取内容，如图所示，这样就可以避免输入中文时的读取错乱问题。

<img src="http://niu.ochiamalu.fun/image-20240928000208951.png" alt="image-20240928000208951" style="zoom:80%;margin:0 auto" />

如果要使用缓冲区进行数据操作，`java.io` 包提供了以下两种操作流。

- 字符缓冲区流：`BufferedReader` 、`BufferedWriter` ；
- 字节缓冲区流：`BufferedInputStream` 、`BufferedOutputStream` 。

以上给出的 4 个操作类中，最为重要的就是 `BufferedReader` 类，此类是 `Reader`
的子类，属于字符缓冲输入流，而如果要处理中文数据，字符流是最方便的。`BufferedReader` 类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928000329436.png" alt="image-20240928000329436" style="zoom:80%;margin:0 auto" />

如果要使用 `BufferedReader` 类来处理 `System.in` 的操作就会出现一个问题，`BufferedReader` 是 `Reader`
的子类，并且构造方法中也要接收 `Reader` 类型，而 `System.in` 是 `InputStream` 类型，所以此处必须将 `InputStream`
类型转换为 `Reader` 类型，那么就可以利用 `InputStreamReader` 类来实现这一转换操作。字节输入流转字符缓冲输入流结构如图所示。

<img src="http://niu.ochiamalu.fun/image-20240928000412264.png" alt="image-20240928000412264" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.io.BufferedReader;
import java.io.InputStreamReader;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        // System.in是InputStream类对象，BufferedReader的构造方法里面需要接收Reader类对象
        // 利用InputStreamReader将字节流对象变为字符流对象
        BufferedReader buf = new BufferedReader(new InputStreamReader(System.in));
        System.out.print("请输入数据：");
        String str = buf.readLine(); 					// 以回车作为换行
        System.out.println("输入的内容：" + str);
    }
}
```

本程序将 `System.in` 字节输入流对象转换为了 `BufferedReader` 类对象，可以利用 `readLine()` 方法直接读取键盘输入的数据，并且可以很好地进行中文处理。

:::tip 为什么不使用 `BufferedInputStream` ?

`System.in` 属于 `InputStream` 类型对象，并且对于字节流也提供了一个 `BufferedInputStream`
的字节缓冲输入流对象，为什么不使用这个类，而非要使用 `BufferedReader` 类？

**回答：字符流方便处理中文，并且支持String返回。**

如果读者打开 `BufferedInputStream` 类的方法可以发现，在该类中并没有类似 `readLine()`
功能的方法，也就是说只有`BufferedReader` 类可以直接将一行输入数据以字符串的形式返回，这样用户可以进行更多操作，例如：数据类型转换、正则验证、字符串操作等。

:::

```java
package com.yootk.demo;
import java.io.BufferedReader;
import java.io.InputStreamReader;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        BufferedReader buf = new BufferedReader(new InputStreamReader(System.in));
        boolean flag = true; 						// 编写一个循环的逻辑
        while (flag) {								// 判断标志位
            System.out.print("请输入年龄：");			// 提示信息
            String str = buf.readLine(); 				// 以回车作为换行
            if (str.matches("\\d{1,3}")) {				// 输入数据由数字组成
               System.out.println("年龄是：" + Integer.parseInt(str));
               flag = false ;						// 退出循环
            } else {
               System.out.println("年龄输入错误，应该由数字所组成。");
            }
        }
    }
}
```

本程序实现了一个简单的逻辑，要求用户在输入年龄时必须输入数字，由于 `BufferedReader` 读取数据时使用的 `readLine()`
方法返回的是 `String` 类型，所以可以利用正则进行判断。当判断通过时会利用包装类将字符串转换为 `int`
型数据，同时会退出 `while` 循环；当判断失败时会提示用户错误信息，并且等待用户重新输入。本程序流程如图所示。

<img src="http://niu.ochiamalu.fun/image-20240928000649748.png" alt="image-20240928000649748" style="zoom:80%;margin:0 auto" />

字符缓冲流除了可以接收输入信息外，也可以利用缓冲区进行文件的读取，此时只需要在实例化 `BufferedReader`
类对象时传递`FileReader` 类（实际上也可以使用 `FilelnputStream` ，但是依然需要 `InputStreamReader` 转换）。

```java
package com.yootk.demo;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        File file = new File("D:" + File.separator + "yootk.txt");
        // 使用文件输入流实例化BufferedReader类对象
        BufferedReader buf = new BufferedReader(new FileReader(file));
        String str = null;							// 接收输入数据
        while ((str = buf.readLine()) != null) {			// 读取数据并判断是否存在
            System.out.println(str);					// 输出读取内容
        }
        buf.close();
    }
}
```

本程序使用 `BufferedReader` 读取输入的数据信息，以 `“\n”`
作为读取数据的分隔符，并在读取时采用循环的模式，将每一行数据读取后直接进行输出，利用这样的处理方式要比直接使用 `InputStream`
读取更加简单。
