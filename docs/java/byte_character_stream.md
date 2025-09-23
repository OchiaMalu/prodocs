# 字节流与字符流

使用 `java.io.File` 类虽然可以操作文件，但是却不能操作文件的内容。如果要进行文件内容的操作，就必须依靠流的概念来完成。流在实际中分为
**输入流** 与 **输出流**
两种。输入流与输出流是一种相对的概念，关键是要看参考点，以图所示为例：水库的水源流向房屋，如果以房屋为参考点，那么这就属于输入流；如果以水库为参考点，这就属于输出流；同样以下雨向水库输水源一样，对水库而言就属于输入流。

<img src="http://niu.ochiamalu.fun/image-20240927141821821.png" alt="image-20240927141821821" style="zoom:80%;margin:0 auto" />

在 Java 中针对数据流的操作也分为输入与输出两种方式，而且针对此操作提供了以下两类支持。

- 字节流（JDK1.0 开始提供）：InputStream(输入字节流)、OutputStream(输出字节流)；
- 字符流（JDK1.1 开始提供)：Reader(输入字符流)、Writer(输出字符流).

:::tip 流的基本操作形式

在 `java.io` 包中提供的 4 个操作流的类是其核心的组成部分，但是这些类本质上的操作流程区别不大。以文件读、写操作为例，其基本流程为以下四步。

- 第一步：通过 `File` 类定义一个要操作文件的路径；
- 第二步：通过字节流或字符流的子类对象为父类对象实例化；
- 第三步：进行数据的读（输入）、写（输出）操作；
- 第四步：数据流属于资源操作，资源操作必须关闭。

其中最为重要的是第四步，读者一定要记住，不管何种情况只要是资源操作（例如：网络、文件、数据库的操作都属于资源操作)
，必须要关闭连接（几乎每种类都会提供 `close()` 方法）。

:::

在 `java.io` 包中，四个操作流的类（OutputStream、InputStream、Writer、Reader）全部都属于抽象类，所以在使用这些类时，一定要通过子类对象的向上转型来进行抽象类对象的实例化操作。在整个
IO 流的操作中最麻烦的并不是这四个基础的父类，而是一系列子类。每种子类代表着不同的输入流、输出流位置。

## 字节输出流：OutputStream

字节流是在实际开发中使用较多的一种流操作，而 `java.io.OutputStream` 是一个专门实现字节输出流的操作类。`OutputStream`
类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240927142107833.png" alt="image-20240927142107833" style="zoom:80%;margin:0 auto" />

通过表可以发现，在 `OutputStream` 类中提供了 3 个输出（write()）方法，这 3 个 `write()` 方法分别可以输出单个字节（使用 `int`
接收）、全部字节数组和部分字节数组。

:::tip 关于 `OutputStream` 类的组成说明

`OutputStream` 是一个 **抽象类** ，而这个抽象类的定义如下。

> public abstract class OutputStream extends Object implements Closeable,Flushable

在类定义中可以发现 `OutputStream` 类同时实现了 `Closeable` 与 `Flushable` 两个父接口，而这两个父接口的定义组成如下

> Closeable接口：JDK 1.5 之后才提供
>
> public interface Closeable extends AutoCloseable {
>
> ​ public void close()
>
> ​ throws IOException
>
> }

> Flushable 接口：JDK1.5 之后才出现
>
> public interface Flushable {
>
> ​ public void flush()
>
> ​ throws IOException
>
> }

通过两个父接口提供的方法可以发现，`close()` 与 `flush()` 方法都已经在 `OutputStream` 类中明确定义过了，这是因为在 JDK1.0
时并没有为 `OutputStream` 类设计继承的接口，而从 JDK1.5 之后考虑到标准的做法，才增加了两个父接口，不过由于最初的使用习惯，这两个接口很少被关注到。

到了 JDK1.7 版本之后，对于接口的定义又发生了改变，在 `Closeable` 接口声明时继承了 `AutoCloseable` 父接口，这个接口就是
JDK1.7 中新增的接口，此接口定义如下。

> public interface AutoCloseable {
>
> ​ public void close() throws Exception;
>
> }

通过定义可以发现，在 `AutoCloseable` 接口中也定义了一个 `close()` 方法，那么为什么在 JDK1.7
中又需要提供这样的`AutoCloseable` (自动关闭)接口呢？原因是 JDK1.7
中针对异常处理产生了新的支持。在以往的开发中，如果是资源操作，用户必须手工关闭资源（方法名称几乎都是 `close()` )
，但是实际上会有许多开发者忘记关闭资源，就经常导致其他线程无法打开资源进行操作，所以Java 提供了以下一种新的异常处理格式。

> try(AutoCloseable 接口子类对象 = new AutoCloseable 接口子类名称()){
>
> ​ 调用方法（有可能会出现异常）;
>
> }catch(异常类型对象){
>
> ​ 异常处理；
>
> }...[finally{
>
> ​ 异常处理的统一出口;
>
> }]

只要使用此种格式，在操作完成后用户就没有必要再去调用 `close()` 方法了，系统会自动帮助用户调用 `close()` 方法以释放资源。

```java
package com.yootk.demo;
class Net implements AutoCloseable {	
    @Override
    public void close() throws Exception {
        System.out.println("*** 网络资源自动关闭，释放资源。");
    }
    public void info() throws Exception {	// 假设有异常抛出
        System.out.println("*** 欢迎访问：www.yootk.com");
    }
}
public class TestDemo {
    public static void main(String[] args) {
        try (Net n = new Net()){
            n.info();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

本程序按照 `AutoCloseable` 的使用原则使用异常处理格式，可以发现程序中并没有明确调用 `close()`
方法的语句，但是在整个资源操作完成后会自动调用 `close()` 释放资源。

虽然 Java 本身提供了这种自动关闭操作的支持，不过从开发习惯上讲，仍有不少开发者还是愿意手工调用 `close()`
方法，所以可以由读者自己来决定是否使用此类操作。

:::

`OutputStream` 本身是一个 **抽象类** ，这样就需要一个子类。如果要进行文件操作，则可以使用 `FileOutputStream`
子类完成操作，此类定义的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240927142829028.png" alt="image-20240927142829028" style="zoom:80%;margin:0 auto" />

由于输出操作主要以 `OutputStream` 类为主，所以对于 `FileOutputStream`
只需要关注其常用的两个构造方法即可。读者可以通过图理解 `FileOutputStream` 类的继承结构。

<img src="http://niu.ochiamalu.fun/image-20240927142853526.png" alt="image-20240927142853526" style="zoom:80%;margin:0 auto" />

:::tip 异常问题

如果读者细心观察可以发现，在 `OutputStream` 类中定义的方法都使用了 `throws`
抛出异常，因为流属于资源操作，所以任何操作都不一定确保可以正常完成，不仅是流操作，而且后面章节讲解的网络操作、数据库操作里面所使用的方法绝大部分也都会抛出异常。

为了编写需要，会在主方法上直接使用 `throws` 抛出异常，而在实际开发中，读者一定要记住，**主方法一定要处理异常，不能抛出**。

:::

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception { 	// 直接抛出
        // 1．定义要输出文件的路径
        File file = new File("d:" + File.separator + "demo" + File.separator
              + "mldn.txt");
        // 此时由于目录不存在，所以文件不能输出，应该首先创建目录
        if (!file.getParentFile().exists()) { 					// 文件目录不存在
           file.getParentFile().mkdirs(); 					// 创建目录
        }
        // 2．应该使用OutputStream和其子类进行对象的实例化，此时目录存在，文件还不存在
        OutputStream output = new FileOutputStream(file);
        // 字节输出流需要使用byte类型，需要将String类对象变为字节数组
        String str = "更多课程资源请访问：www.yootk.com";
        byte data[] = str.getBytes(); 						// 将字符串变为字节数组
        output.write(data); 							// 3．输出内容
        output.close();								// 4．资源操作的最后一定要进行关闭
    }
}
```

本程序严格按照流的操作步骤进行，并且在程序执行前指定的文件路径并不存在，为了保证程序可以正常执行，需要先创建对应的父路径，再利用 `FileOutputStream`
类对象为 `OutputStream` 父类实例化，这样 `write()` 方法输出时就表示向文件中进行输出。由于`OutputStream`
只适合输出字节数据，所以需要将定义的字符串利用 `getBytes()` 方法转换为字节数组后才可以完成操作。

:::tip 关于追加操作

如果重复执行范例的代码会发生文件内容的覆盖，而如果要实现文件的追加可以使用另外一个 `FileOutputStream()`
类的构造方法`public FileOutputStream(File file,boolean append)` 。

```
    // 2．应该使用OutputStream和其子类进行对象的实例化，此时目录存在，文件还不存在
    OutputStream output = new FileOutputStream(file,true) ;
```

本程序使用了 **追加模式** ，这样每次执行完程序都会向文件中不断追加新的操作。

:::

范例的程序是将整个字节数组的内容进行了输出。同时可以发现一个问题：利用 `OutputStream`
向文件输出信息时如果文件不存在，则会自动创建（不需要用户手工调用 `createNewFile()` 方法）。对于输出操作在整个 `OutputStream`
类里面一共定义了三个方法，下面来看一下其他两种输出方法（为方便操作，本处只列出代码片断）。

采用单个字节的方式输出（此处可以利用循环操作输出全部字节数组中的数据）。

```java
    for (int x= 0 ; x < data.length ; x ++) {
        output.write(data[x]); 			// 内容输出
    }
```

输出部分字节数组内容（设置数组的开始索引和长度）。

```java
    output.write(data, 6, 6); 			// 内容输出
```

虽然在 `OutputStream` 类中定义了 3
种操作，但是从实际的开发来讲，输出部分字节数组操作 `public void write(bytell b,int off,int len)`
是实际工作中使用较多的方法，所以一定要重点掌握此方法的使用。

## 字节输入流：InputStream

在程序中如果要进行文件数据的读取操作，可以使用 `java.io.InputStream` 类完成，此类可以完成字节数据的读取操作。`InputStream`
类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240927143342956.png" alt="image-20240927143342956" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.fun/image-20240927143354782.png" alt="image-20240927143354782" style="zoom:80%;margin:0 auto" />

通过 `InputStream` 类提供的 3 个 `read()` 方法可以发现，其操作的数据类型与 `OutputStream` 类中的 3 个 `write()`
方法对应。但是`OutputStream` 类中的 `write()` 中的参数包含的是要输出的数据，而 `InputStream` 类中的 `read()`
方法中的参数是为了接收输入数据准备的。

:::tip InputStream 类的定义

`InputStream` 依然属于一个 **抽象类** ，此类的定义如下。

> public abstract class InputStream extends Object implements Closeable

通过定义可以发现 `InputStream` 类实现了 `Closeable` 接口（其继承 `AutoCloseable` 接口)
，所以利用自动关闭的异常处理结构可以实现自动的资源释放。与 `OutputStream` 类一样，由于`Closeable`
属于后加入的接口，并且在 `InputStream` 类中存在 `close()` 方法，所以用户可以忽略此接口的存在。

:::

在 `InputStream` 类中最为重要的、最难理解的就是 3 个 `read()` 方法，这三个方法的详细作用如下。

- 读取单个字节：`public abstract int read() throws IOException` ；

**|—返回值：**返回读取的字节内容，如果已经没有内容，则读取后返回 `-1` ，如图所示；

- 将读取的数据保存在字节数组里（一次性读取多个数据）：`public int read(byte[] b) throws IOException` ；

**|—返回值：**返回读取的数据长度，如果已经读取到结尾，则读取后返回 `-1` ；

- 将读取的数据保存在部分字节数组里：`public int read(byte[] b,int off,int len) throws IOException` 。

**|—返回值：**读取的部分数据的长度，如果已经读取到结尾，则读取后返回 `-1` ，如图所示。

<img src="http://niu.ochiamalu.fun/image-20240927143750599.png" alt="image-20240927143750599" style="zoom:80%;margin:0 auto" />

`java.io.InputStream` 是一个抽象类，所以如果要想进行文件读取，需要使用 `FilelnputStream` 子类，而这个子类的构造方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240927220433770.png" alt="image-20240927220433770" style="zoom:80%;margin:0 auto" />

与 `OutputStream` 的使用规则相同，所有的子类要向父类对象转型，所以 `FilelnputStream`
类中只需要关注构造方法即可，而`FilelnputStream` 类的继承结构如图所示。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 直接抛出
        File file = new File("d:" + File.separator + "demo" + File.separator
              + "mldn.txt");						// 1．定义要输出文件的路径
        if (file.exists()) {	// 需要判断文件是否存在后才可以进行读取
           // 2．使用InputStream进行读取
           InputStream input = new FileInputStream(file) ;
           byte data [] = new byte [1024] ;				// 准备出一个1024的数组
           int len = input.read(data) ;					// 3．进行数据读取，将内容保存到字节数组中
           input.close();							// 4．关闭输入流
           // 将读取出来的字节数组数据变为字符串进行输出
           System.out.println("【" + new String(data,0,len) + "】");
        }
    }
}
```

<img src="http://niu.ochiamalu.fun/image-20240927220529689.png" alt="image-20240927220529689" style="zoom:80%;margin:0 auto" />

本程序利用 `InputStream`
实现了文件的读取操作，为了确保可以正确读取，首先要对文件是否存在进行判断。在进行数据读取时，首先要开辟一个字节数组空间以保存读取的数据，但是考虑到要读取的数据量有可能小于数组大小，所以在将字节数组转换为字符串时设置了数组可用数据的长度（该长度为 `input.read(data)`
方法返回结果）。

范例是将数据一次性读取到字节数组中，但是在 `InputStream` 类中定义了 3 个 `read()` 方法，其中有一个 `read()`
方法可以每次读取一个字节数据，如果要使用此方法操作，就必须结合循环一起完成。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception { 	// 直接抛出
        File file = new File("d:" + File.separator + "demo" + File.separator
              + "mldn.txt");							// 1．定义要输出文件的路径
        if (file.exists()) {								// 需要判断文件是否存在后才可以进行读取
           // 2．使用InputStream进行读取
           InputStream input = new FileInputStream(file) ;
           byte data [] = new byte [1024] ;					// 准备出一个1024的数组
           int foot = 0 ;								// 表示字节数组的操作脚标 
           int temp = 0 ;								// 表示接收每次读取的字节数据
           // 第一部分：(temp = input.read())，表示将read()方法读取的字节内容给temp变量
           // 第二部分：(temp = input.read()) != -1，判断读取的temp内容是否是-1
           while((temp = input.read()) != -1) {				// 3．读取数据
               data[foot ++] = (byte) temp ;				// 有内容进行保存
           }
           input.close();								// 4．关闭输入流
           System.out.println("【" + new String(data,0,foot) + "】");
        }
    }
}
```

本程序采用了循环的方式进行数据读取操作，每次循环时都会将读取出来的字节数据保存给 `temp` 变量，如果读取出来的数据不是 `-1`
就表示还有数据需要继续进行读取。循环读取字节数据的执行流程如图所示。

<img src="http://niu.ochiamalu.fun/image-20240927222054805.png" alt="image-20240927222054805" style="zoom:80%;margin:0 auto" />

:::tip 关于 `while(temp=input..read()l=-1)` 语句的解释

很多读者第一次接触此类语法会有一些不习惯，而实际上这样的语法在进行 IO 操作时是最好用的。按照程序中的注解，此语法分为以下两个执行步骤。

- 第一步（`temp = input.read()` )：表示将 `read()` 方法读取的字节内容给 `temp` 变量，同时此代码由于是在 `0`
  中编写的，所以运算符的优先级高于赋值运算符；
- 第二步（`(temp = input.read()) != -1`）：表示判断 `temp` 接收数据返回的是否是 `-1` ，如果不是 `-1`
  表示当前已经读取到数据，如果是 `-1` 表示数据已经读取完毕，不再需要读了。

实际上如果不使用 `while` 语句，换为 `do...while` 也是可以的。

```java
    byte data [] = new byte [1024] ;		// 准备出一个1024的数组
    int foot = 0 ;					// 表示字节数组的操作脚标 
    int temp = 0 ;					// 表示接收每次读取的字节数据
    do {
        temp = input.read() ;			// 读取一个字节
        if (temp != -1) {				// 现在是真实的内容
           data[foot ++] = (byte) temp ;	// 保存读取的字节到数组中
        }
    } while (temp != -1) ;		// 如果现在读取的temp的字节数据不是-1，表示还有内容
```

本程序只列出了部分代码片断，但是通过代码的比较就可以清楚地发现，利用 `while` 读取要比 `do...while`
操作更加简单，所以在实际的开发中都会利用 `while` 循环完成输入流的读取操作。

:::

## 字符输出流：Writer

`java.io.Writer` 类是从 JDK1.1 版本之后增加的，利用 `Writer` 类可以直接实现字符数组（包含了字符串）的输出。`Writer`
类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240927222625166.png" alt="image-20240927222625166" style="zoom:80%;margin:0 auto" />

通过 `Writer` 类定义的方法可以发现，`Writer` 类中直接提供了输出字符串数据的方法，这样就没有必要将字符串转成字节数组后再输出了。

:::tip Writer 类的定义

与 `OutputStream` 的定义类似，`Writer` 类本身也，属于一个抽象类，此类的定义结构如下。

> public abstract class Writer extends Object implements Appendable,Closeable,Flushable

通过继承结构可以发现，`Writer` 类中除了实现 `Closeable` 与 `Flushable` 接口之外，还实现了一个 `Appendable`
接口。`Appendable` 接口定义如下。

> public interface Appendable {
>
> ​ public Appendable append(char c) throws IOException;
>
> ​ public Appendable append(CharSequence csq) throws IOException;
>
> ​ public Appendable append(CharSequence csq,int start,int end) throws IOException;
>
> }

在 `Appendable` 接口中定义了一系列数据追加操作，而追加的类型可以是 `CharSequence`
（可以保存String、StringBuffer、StringBuilder类对象）。`Writer` 类的继承结构如图所示。

<img src="http://niu.ochiamalu.fun/image-20240927222914825.png" alt="image-20240927222914825" style="zoom:80%;margin:0 auto" />

:::

`Writer` 是一个抽象类，要针对文件内容进行输出，可以使用 `java.io.FileWriter` 类实现 `Writer`
类对象的实例化操作。`FileWriter` 类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240927222945082.png" alt="image-20240927222945082" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileWriter;
import java.io.Writer;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        File file = new File("d:" + File.separator + "demo" + File.separator
              + "mldn.txt");						// 1．定义要输出文件的路径
        if (!file.getParentFile().exists()) {				// 判断目录是否存在
           file.getParentFile().mkdirs();				// 创建文件目录
        }
        Writer out = new FileWriter(file);				// 2．实例化了Writer类的对象
        String str = "更多课程请访问：www.yootk.com";	// 定义输出内容
        out.write(str);							// 3．输出字符串数据
        out.close();								// 4．关闭输出流
    }
}
```

本程序实现了字符串数据的内容输出，基本的使用流程与 `OutputStream` 相同，而最方便的是 `Writer` 类可以直接进行 `String`
数据的输出。

## 字符输入流：Reader

`java.io.Reader`
类是实现字符数据输入的操作类，在进行数据读取时可以不使用字节数据，而直接依靠字符数据（方便处理中文）进行操作。`Reader`
类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240927223054694.png" alt="image-20240927223054694" style="zoom:80%;margin:0 auto" />

通过表可以发现，在 `Reader` 类中也定义有 `read()` 方法，但是与 `InputStream` 最大的不同在于此处返回的数据是字符数据。

:::tip 关于 `Reader` 类的定义结构

为了更好地理解 `Reader` 类的操作，下面介绍 `Reader` 类的定义结构。

> public abstract class Reader extends Object implements Readable,Closeable

通过定义结构可以发现，在 `Reader` 类中实现了两个接口：Readable、Closeable，而 `Readable` 接口定义如下。

> public interface Readable {
>
> ​ public int read(CharBuffer cb) throws IOException
>
> }

在 `Readable` 接口中定义的 `read()` 方法可以将数据保存在 `CharBuffer` （字符缓冲，类似于 `StringBuffer`
）对象中，也就是说利用此类就可以替代字符数组的操作。`Reader` 类的继承结构如图所示。

<img src="http://niu.ochiamalu.fun/image-20240927223340548.png" alt="image-20240927223340548" style="zoom:80%;margin:0 auto" />

另外读者可以发现，在 `Writer` 类中存在直接输出字符串的操作，而 `Reader`
类中并没有直接返回字符串的操作，这是因为输出数据时可以采用追加的模式，所以随着时间的推移，文件有可能变得非常庞大（假设现在已经达到了
10 G）。而如果在 `Reader` 类中提供了直接读取全部数据的方式，则有可能造成内存溢出问题。

:::

`Reader` 类是一个抽象类，要实现文件数据的字符流读取，可以利用 `FileReader` 子类为 `Reader` 类对象实例化。`FileReader`
类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240927223525773.png" alt="image-20240927223525773" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileReader;
import java.io.Reader;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        File file = new File("d:" + File.separator + "demo" + File.separator
              + "mldn.txt");						// 1．定义要输出文件的路径
        if (file.exists()) {
           Reader in = new FileReader(file) ;			// 2．为Reader类对象实例化
           char data [] = new char [1024] ;				// 开辟字符数组，接收读取数据
           int len = in.read(data) ;					// 3．进行数据读取
           in.close();								// 4．关闭输入流
           System.out.println(new String(data, 0, len));
        }
    }
}
```

本程序首先使用了字符数组作为接收数据，当使用 `read()`
方法时会将数据保存到数组中，然后返回读取的数据长度，由于数组开辟较大，内容无法全部填充，这样在输出时就可以将部分字符数组转换为字符串后输出。

:::tip 字节流与字符流的区别

以上讲解已经为读者详细地分析了字节流与字符流类的继承结构、基本操作流程。这两类流都可以完成类似的功能，那么这两种操作流有哪些区别呢？

以文件操作为例，字节流与字符流最大的区别是：字节流直接与终端文件进行数据交互，字符流需要将数据经过缓冲区处理才与终端文件数据交互。

在使用 `OutputStream` 输出数据时即使最后没有关闭输出流，内容也可以正常输出，但是反过来如果使用的是字符输出流 `Writer`
，在执行到最后如果不关闭输出流，就表示在缓冲区中处理的内容不会被强制性清空，所以就不会输出数据。如果有特殊情况不能关闭字符输出流，可以使用 `flush()`
方法强制清空缓冲区。

:::

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileWriter;
import java.io.Writer;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        File file = new File("d:" + File.separator + "demo" + File.separator
              + "mldn.txt");						// 1．定义要输出文件的路径
        if (!file.getParentFile().exists()) {				// 判断目录是否存在
           file.getParentFile().mkdirs();				// 创建文件目录
        } 
        Writer out = new FileWriter(file);				// 2．实例化了Writer类的对象
        String str = "更多课程请访问：www.yootk.com";	// 定义输出内容
        out.write(str);							// 3．输出字符串数据
        out.flush();								// 强制刷新缓冲区
    }
}
```

本程序执行到最后并没有执行流的关闭操作，所以从本质上讲，内容将无法完整输出。在不关闭流又需要完整输出时就只能利用 `flush()`
方法强制刷新缓冲区。

:::tip 在实际开发中流的选用原则

在开发中，对于字节数据处理是比较多的，例如：图片、音乐、电影、文字。而字符流最大的好处是它可以进行中文的有效处理。在开发中，如果要处理中文时应优先考虑字符流，如果没有中文问题，建议使用字节流。

:::

