# 内存流

在流的操作中除了进行文件的输入与输出操作之外，还可以针对内存进行同样的操作。假设某一种应用需要进行 IO
操作，但是又不希望在磁盘上产生一些文件时，就可以将内存当作一个临时文件进行操作。在 Java 中，针对内存操作提供了以下两组类（关系如图所示）。

<img src="http://niu.ochiamalu.top/image-20240927233304172.png" alt="image-20240927233304172" style="zoom:80%;margin:0 auto" />

- 字节内存流：`ByteArrayInputStream` （内存字节输入流）、`ByteArrayOutputStream` （内存字节输出流）；
- 字符内存流：`CharArrayReader` （内存字符输入流）、`CharArrayWriter` （内存字符输出流）。

:::tip 本节以内存字节流讲解为主

字节内存流与字符内存流两者唯一的区别就在于操作数据类型上，字节内存流操作使用 `byte` 数据类型，而字符内存流操作使用 `char`
数据类型。但是这两类操作的基本结构相同，考虑到实际的开发情况，本节主要讲解字节内存流的使用。

:::

虽然清楚了内存流的操作结构，但是要想真正使用内存流还必须清楚内存流定义的构造方法（以字节内存流为例）。内存流定义的构造方法如下。

- `ByteArrayInputStream` 类构造：`public ByteArrayInputStream(byte[] buf)` ；
- `ByteArrayOutputStream` 类构造：`public ByteArrayOutputStream()` 。

通过 `ByteArrayInputStream` 类的构造可以发现，在内存流对象实例化时就必须准备好要操作的数据信息，所以内存流的操作实质上就是将操作数据首先保存到内存中，然后利用
IO 流操作进行单个字节的处理。

**范例：**实现一个小写字母转大写字母的操作。

- 本程序不使用 `String` 类中提供的 `toUpperCase()` 方法，而是利用 IO 操作，将每一个字节进行大写字母转换；

- 为了方便地实现字母的转大写操作（避免不必要的字符也被转换）可以借助 `Character` 包装类的方法。

|- 转小写字母：`public static char toLowerCase(char ch)` ；

|- 转小写字母（利用字母编码转换）：`public static int toLowerCase(int codePoint)` ；

|- 转大写字母：`public static char toUpperCase(char ch)` ；

|- 转大写字母（利用字母编码转换）：`public static int toUpperCase(int codePoint)` 。

```java
package com.yootk.demo;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        String str = "www.yootk.com & www.MLDN.cn"; 	// 要求被转换的字符串
        // 本次将通过内存操作流实现转换，先将数据保存在内存流里面，再从里面取出每一个数据
        // 将所有要读取的数据设置到内存输入流中，本次利用向上转型为InputStream类实例化
        InputStream input = new ByteArrayInputStream(str.getBytes());
        // 为了能够将所有的内存流数据取出，可以使用ByteArrayOutputStream
        OutputStream output = new ByteArrayOutputStream();
        int temp = 0; 							// 读取每一个字节数据
        // 经过此次循环后，所有的数据都将保存在内存输出流对象中 
        while ((temp = input.read()) != -1) { 			// 每次读取一个数据
        // 将读取进来的数据转换为大写字母，利用Character.toUpperCase()可以保证只转换字母
            output.write(Character.toUpperCase(temp));	// 字节输出流
        }
        System.out.println(output); 					// 调用toString()方法
        input.close();								// 关闭输入流
        output.close();							// 关闭输出流
    }
}
```

本程序分别利用 `ByteArrayInputStream` 与 `ByteArrayOutputStream` 为 `InputStream` 与 `OutputStream`
类对象实例化，同时在实例化 `ByteArrayInputStream` 类对象时需要设置好操作的数据，这样才可以利用 `InputStream`
通过内存进行读取。读取数据时采用循环的方式，并且为了防止将非字母进行转换的操作，使用了 `Character.toUpperCase()`
方法操作。本程序的执行流程如图所示。

<img src="http://niu.ochiamalu.top/image-20240927233745705.png" alt="image-20240927233745705" style="zoom:80%;margin:0 auto" />

:::tip 关于输入流数据的读取

通过本章讲解的若干个程序代码，可以发现 `InputStream` 读取数据的常用操作：利用 `while`
循环读取输入流数据，在读取时可以直接进行操作。所以针对此种代码操作读者必须重点掌握。

:::

范例的程序是利用子类对象向上转型实现的输入流与输出流类对象的实例化操作，这样操作的好处是可以利用统一的 IO
操作标准，但是在 `ByteArrayOutputStream`
类里面却会存在一个重要的方法，即通过内存输出流取得全部数据：`public byte[] toByteArray()`
。此方法可以将所有暂时保存在内存输出流中的字节数据全部以字节数组的形式返回，而利用这样的方法，就可以实现多个文件的合并读取操作。

```java
package com.yootk.demo;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception { 			// 异常简化处理
        File fileA = new File("D:" + File.separator + "infoa.txt");			// 文件路径
        File fileB = new File("D:" + File.separator + "infob.txt");			// 文件路径
        InputStream inputA = new FileInputStream(fileA);				// 字节输入流
        InputStream inputB = new FileInputStream(fileB);				// 字节输入流
        ByteArrayOutputStream output = new ByteArrayOutputStream();	// 内存输出流
        int temp = 0; 										// 每次读取一个字节
        while ((temp = inputA.read()) != -1) {						// 循环读取数据
            output.write(temp);									// 将数据保存到输出流
        }
        while ((temp = inputB.read()) != -1) {						// 循环读取数据
            output.write(temp);									// 将数据保存到输出流
        }
        // 现在所有的内容都保存在了内存输出流里面，所有的内容变为字节数组取出
        byte data[] = output.toByteArray();						// 取出全部数据
        output.close();										// 关闭输出流
        inputA.close();										// 关闭输入流
        inputB.close();										// 关闭输入流
        System.out.println(new String(data));						// 字节转换为字符串输出
    }
}
```

本程序首先定义了两个要读取的文件路径，并且利用这两个路径分别创建了各自的 `InputStream`
类实例化对象，由于需要进行文件的合并，所以将所有 `InputStream` 读取进来的数据都保存在 `ByteArrayOutputStream`
类对象中。当数据读取完毕后，可以直接利用`ByteArrayOutputStream` 类中的 `toByteArray()` 方法将读取进来的全部数据变为字符串后输出。
