# 字符编码

计算机中所有信息都是由二进制数据组成的，因此所有能够描述出的中文文字都是经过处理后的结果。在计算机的世界里，所有的语言文字都会使用编码来进行描述，例如：最常见的编码是 `ASCⅡ`
码。在实际的工作里面最为常见的 4 种编码如下。

- GBK、GB2312：中文的国标编码，其中 `GBK` 包含简体中文与繁体中文两种，而 `GB2312` 只包含简体中文；
- ISO 8859-1：是国际编码，可以描述任何文字信息（中文需要转码）；
- UNICODE：是十六进制编码，但是在传递字符信息时会造成传输的数据较大；
- UTF 编码（Unicode Transformation Format）：是一种 `UNICODE` 的可变长度编码，常见的编码为 UTF-8 编码。

:::tip 项目开发中全部都要使用 UTF-8 编码

实际上对于编码问题，在实际的项目开发过程中，往往都会以 UTF-8 编码为主，所以在编写代码时强烈建议将文件编码都统一设置为UTF-8
的形式。

:::

既然计算机世界中存在这么多编码，在实际项目的开发中就有可能在数据传输中出现编码与解码所使用的字符集不统一的问题，而这样就会产生乱码。如何才能知道当前系统所使用的默认编码呢？可以利用
System 类取得当前系统中的环境属性。

```java
package com.yootk.demo;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        System.getProperties().list(System.out);		// 列出全部系统属性
    }
}
```

本程序的功能是列出全部的系统属性，其中会发现一个 `file.encoding` 的属性名称，此属性定义的是文件的默认编码，可以发现编码方式为
GBK 。

:::tip 关于系统属性列出操作的说明

System类中定义的取得系统属性的方法为：`public static Properties getProperties()` ，此方法返回的是一个 `Properties`
类对象，此类将在后续为读者讲解，在此处读者并不需要关注具体的代码，只需要关注程序的执行结果。

另外在系统属性输出时可以发现存在一个 `file.separator = \`
的信息，此处描述的新是文件的路径分隔符定义，也就是 `File.separator` 常量的内容。

:::

因为默认的编码为 GBK ，所以当程序向文件中输出信息时，文件就会使用 GBK 编码，而文件的内容也应该是 GBK
编码，此处如果强行修改为其他编码，就会出现乱码。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        File file = new File("D:" + File.separator + "mldn.txt");
        OutputStream output = new FileOutputStream(file);
        // 强制改变文字的编码，此操作可以通过String类的getBytes()方法实现
        output.write("更多课程请访问：www.yootk.com".getBytes("ISO8859-1"));
        output.close();
    }
}
```

在当前系统中默认的编码应该使用 GBK ，但是在程序处理时强制性地将内容编码转换为了 `ISO8859-1`
，这样程序的编码与文件的保存编码就会发生冲突，那么保存后的文件就会出现中文乱码问题。
