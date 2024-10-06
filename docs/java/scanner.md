# 扫描流：Scanner

从 JDK1.5 开始增加了一个 `java.util.Scanner` 的程序类，利用这个类可以方便地实现数据的输入操作。`Scanner`
类并没有定义在`java.io` 包中，而是定义在了 `java.util` 包中，所以此类是一个工具类，此类的继承结构如图所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240928000907308.png" alt="image-20240928000907308" style="zoom:80%;" />

:::tip 关于 Scanner 产生的背景

在 JDK1.5 之前如果要进行数据的输入操作，使用 `java.io.BufferedReader` 类是最方便的，但是 `BufferedReader` 类会存在以下两个问题。

- 它读取数据时只能按照字符串返回：`public String readLine() throws IOException` ；
- 所有的分隔符都是固定的。

为此，从 JDK1.5 开始增加了新的 `Scanner` 类，而 `Scanner` 类增加后对于键盘数据输入的实现也会变得更加简单，这一点可以通过本节的讲解观察到。

:::

:::tip 关于 Iterator 接口

在 `Scanner` 类的定义中可以发现其实现了 `Iterator` 接口，这在整个 Java
开发中是一个重要的接口，本接口的内容将在后续为读者讲解。读者需要记住的是，在 `Iterator`
接口里面主要定义了两个抽象方法：`hasNext()` (判断是否有数据)、`next()` (取得数据)，同时这两个方法也会出现在 `Scanner`
类中，并且 `Scanner` 类提供了具体数据类型的判断与取得操作。

:::

通过 `Scanner` 类的继承关系可以发现，`Scanner` 实现了 `Iterator` (迭代)接口与 `Closeable` 接口。而 `Scanner`
类的构造方法还可以接收 `InputStream` 或 `File` 等类型以实现输入流操作。`Scanner` 类中定义的常用方法如表所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240928001151835.png" alt="image-20240928001151835" style="zoom:80%;" />

```java
package com.yootk.demo;
import java.util.Scanner;
public class TestDemo {
    public static void main(String[] args) throws Exception { 	// 此处直接抛出
        Scanner scan = new Scanner(System.in); 			// 准备接收键盘输入数据
        System.out.print("请输入内容：");					// 提示信息
        if (scan.hasNext()) { 							// 是否有输入数据
           System.out.println("输入内容：" + scan.next());		// 存在内容则输出
        }
        scan.close();
    }
}
```

本程序实现了键盘输入数据的操作，通过对比可以发现，利用 `Scanner` 实现的键盘输入数据操作代码要比 `BufferedReader` 更加简单。

:::tip 关于字符串的操作

实际上范例的代码属于 `Scanner` 使用的标准形式，即先使用 `hasNextXxx()`
进行判断，有数据之后再进行输入。对于字符串的操作中是否有 `hasNextXxx()` 方法判断意义不大（可以直接使用 `next()`
，但是这样做不标准），因为即使此时代码不输入任何字符串也表示接收（因为不为 NULL，是一个空字符串），但是如果是具体的数据类型输入就有意义了。

:::

```java
package com.yootk.demo;
import java.util.Scanner;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        Scanner scan = new Scanner(System.in); 		// 准备接收键盘输入数据
        System.out.print("请输入成绩：");
        if (scan.hasNextDouble()) { 					// 表示输入的是一个小数
           double score = scan.nextDouble(); 			// 省略了转型
           System.out.println("输入内容：" + score);
        } else { 								// 表示输入的不是一个小数
           System.out.println("输入的不是数字，错误！");
        }
        scan.close();
    }
}
```

本程序在输入数据时使用了 `Scanner` 类的 `hasNextDouble()` 方法来判断输入的数据是否是 `double`
数值，如果是则利用 `nextDouble()` 直接将输入的字符串转化为 `double` 型数据后返回。

`Scanner` 类中除了支持各种常用的数据类型外，也可以在输入数据时使用正则表达式来进行格式验证。

```java
package com.yootk.demo;
import java.util.Scanner;
public class TestDemo {
    public static void main(String[] args) throws Exception { 	// 此处直接抛出
        Scanner scan = new Scanner(System.in) ;			// 准备接收键盘输入数据
        System.out.print("请输入生日：");					// 提示文字
        if (scan.hasNext("\\d{4}-\\d{2}-\\d{2}")) {			// 正则验证
           String bir = scan.next("\\d{4}-\\d{2}-\\d{2}") ;	// 接收数据
           System.out.println("输入内容：" + bir);
        } else {										// 数据格式错误
           System.out.println("输入的生日格式错误！");
        }
        scan.close(); 
    }
}
```

本程序利用正则验证了输入的字符串数据，如果数据符合正则规则，则进行接收，如果不符合则提示信息错误。

在 `Scanner` 类的构造里面由于接收的类型是 `InputStream`
，所以依然可以设置一个文件的数据流。考虑到文件本身会存在多行内容，所以需要考虑读取的分隔符问题（默认是空字符为分隔符，例如：空格或换行)
，这样在读取前就必须使用 `useDelimiter()` 方法来设置分隔符。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileInputStream;
import java.util.Scanner;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        Scanner scan = new Scanner(new FileInputStream(new File("D:"
                + File.separator + "yootk.txt")));		// 设置读取的文件输入流
        scan.useDelimiter("\n"); 					// 设置读取的分隔符
        while (scan.hasNext()) {						// 循环读取
            System.out.println(scan.next());			// 直接输出读取数据
        }
        scan.close();
    }
}
```

本程序利用 `Scanner` 实现了文件数据的读取操作，在读取前可以使用 `useDelimiter()`
方法设置指定的读取分隔符，随后就可以利用`while` 循环来读取数据。

:::tip 关于输入与输出的新操作

通过一系列分析，读者应该已经清楚了 `InputStream` 、`OutputStream` 的不足，同时也应该发现利用 `PrintStream` （或
PrintWriter）可以加强程序输出数据的操作支持， `Scanner`（或
BufferedReader）可以加强程序输入数据的操作支持。所以在日后的开发中，只要操作的是文本数据（不是二进制数据），输出时都使用打印流，输入时都使用扫描流（或者使用字符缓冲区输入流）。

:::
