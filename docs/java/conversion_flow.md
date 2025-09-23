# 转换流

虽然字节流与字符流表示两种不同的数据流操作，但是这两种流彼此间是可以实现互相转换的，而要实现这样的转换可以通过`InputStreamReader` 、`Output Stream Writer`
两个类。首先介绍这两个类的继承结构以及构造方法。

<img src="http://niu.ochiamalu.fun/image-20240927231516254.png" alt="image-20240927231516254" style="zoom:80%;margin:0 auto" />

从以上给出的关系可以发现：

- `InputStreamReader` 类的构造方法中接收 `InputStream` 类的对象，而 `InputStreamReader` 是 `Reader`
  的子类，该类对象可以直接向上转型为 `Reader` 类对象，这样就表示可以将接收到的字节输入流转换为字符输入流；
- `OutputStreamWriter` 类的构造方法接收 `OutputStream` 类的对象，而 `OutputStreamWriter` 是 `Writer`
  的子类，该类对象可以直接向上转型为 `Writer` 类对象，这样就表示可以将接收到的字节输出流转换为字符输出流（ `Writer`
  类中提供了直接输出字符串的操作）。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        File file = new File("d:" + File.separator + "demo" + File.separator
              + "mldn.txt");						// 1．定义要输出文件的路径
        if (!file.getParentFile().exists()) {				// 判断父路径是否存在
           file.getParentFile().mkdirs() ;				// 创建父路径
        }
        OutputStream output = new FileOutputStream(file) ;// 字节流
        // 将OutputStream类对象传递给OutputStreamWriter类的构造方法，而后向上转型为Writer
        Writer out = new OutputStreamWriter(output) ;
        out.write("更多课程请访问：www.yootk.com");	// Writer类的方法
        out.flush();
        out.close();
    }
}
```

本程序利用 `OutputStreamWriter` 类将字节输出流转换为字符输出流，这样就可以方便地实现字符串数据的输出。

:::tip 关于转换流的说明

从实际的开发来讲，转换流的使用情况并不多，并且JDK随着版本的提高会扩充越来越多方便的类库，所以这种转换流的意义大部分也只会停留在理论分析上，而之所以为读者讲解转换流，是要针对之前程序的一个遗留问题进行说明。

通过之前的讲解可以发现，四个流的操作类如果要操作文件都要求分别使用不同的子类（FileXxx）。下面分别介绍 `FileOutputStream` 、`FilelnputStream` 、`FileWriter` 、 `FileReader`
四个类的继承结构，如图所示。

<img src="http://niu.ochiamalu.fun/image-20240927231903674.png" alt="image-20240927231903674" style="zoom:80%;margin:0 auto" />

通过继承结构可以发现，`FileWriter` 与 `FileReader` 都是转换流的子类，也就证明所有要读取的文件数据都是字节数据，所有的字符都是在内存中处理后形成的。

:::
