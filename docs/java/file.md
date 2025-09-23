# 文件操作类：File

在 `java.io` 包中，如果要进行文件自身的操作（例如：创建、删除等），只能依靠 `java.io.File` 类完成。`File` 类常用操作方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240927133339343.png" alt="image-20240927133339343" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.fun/image-20240927133353429.png" alt="image-20240927133353429" style="zoom:80%;margin:0 auto" />

通过表可以发现 `File` 类中提供的方法并 **不涉及文件的具体内容** ，只是针对文件本身的操作。

:::tip 注意方法的返回值

读者可以发现在 `File` 类中的 `length()` 及 `lastModified()` 方法返回的数据类型都是 `long` 型，这是因为 `long`
数据类型可以描述内存（或文件）大小、日期时间数字。

:::

**范例：** 文件基本操作。任意给定一个文件路径，如果文件不存在则创建一个新的文件，如果文件存在则将文件删除。文件操作流程如图所示。

<img src="http://niu.ochiamalu.fun/image-20240927133524852.png" alt="image-20240927133524852" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.io.File;
public class TestDemo {
    public static void main(String[] args) throws Exception { 	// 此处直接抛出
        File file = new File("d:\\test.txt"); 				// 设置文件的路径
        if (file.exists()) { 								// 判断文件是否存在
           file.delete();								// 删除文件
        } else { 									// 文件不存在
           System.out.println(file.createNewFile());			// 创建新文件
        }
    }
}
```

本程序首先定义了文件的操作路径 `e:\1test.txt` （“”是“\”的转义字符，也是路径分隔符)，然后利用 `exists()`
方法判断该路径的文件是否存在，如果存在则使用 `delete()` 删除，否则使用 `createNewFile()` 创建新文件。

:::tip 关于路径分隔符问题

在操作系统中如果要定义路径则一定会存在路径分隔符的问题，因为程序运行在 Windows 系统下，所以范例的程序中使用了`“\\”`
（本质为 `“\”` ）作为了分隔符。但是如果程序运行在 Linux 系统中，则路径分隔符为 `“/”` 。而 Java
本身属于跨平台的操作系统，总不能针对每一个不同的操作系统手工去修改路径分隔符，这样的操作实在是不智能。因此在 `java.io.File`
类里面提供有一个路径分隔符常量：`public static final String separator`
；利用此常量可以在不同的操作系统中自动转化为适合于该操作系统的路径分隔符。所以在实际开发中，如果要定义 `File`
类对象往往会使用如下形式的操作代码。

> File file=new File("d:"+File.separator+"test.txt; //设置文件的路径

为了保证代码开发的严格性，在使用文件操作中都会利用此常量定义路径分隔符。同时读者也会发现一个问题，虽然 `separator`
是一个常量，但是这个常量并没有遵守字母全部大写的原则，而造成这样的问题是在 JDK1.0 时常量与变量的定义规则相同，而这一问题也属于历史遗留问题。

另外需要提醒读者的是，在进行 `java.io` 操作文件的过程中，会出现延迟情况。因为 Java 程序是通过 JVM
间接地调用操作系统的文件处理函数进行的文件处理操作，所以中间会出现延迟情况。

:::

**范例：** 如果给定的路径为根路径，则文件可以直接利用 `createNewFile()`
方法进行创建；如果要创建的文件存在目录，那么将无法进行创建。所以合理的做法应该是在创建文件前判断父路径（ `getParent()`
取得父路径）是否存在，如果不存在则应该先创建目录（ `mkdirs()` 创建多级目录），再创建文件。包含路径的文件创建如图所示。

<img src="http://niu.ochiamalu.fun/image-20240927134059887.png" alt="image-20240927134059887" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.io.File;
public class TestDemo {
    public static void main(String[] args) throws Exception { 	// 此处直接抛出
        File file = new File("d:" + File.separator + "demo" + File.separator
              + "hello" + File.separator + "yootk" + File.separator
              + "test.txt");							// 设置文件的路径
        if (!file.getParentFile().exists()) { 					// 现在父路径不存在
           file.getParentFile().mkdirs(); 				// 创建父路径
        }
        System.out.println(file.createNewFile());			// 创建新文件
    }
}
```

本程序所要创建的文件保存在目录中，所以在创建文件前需要首先判断父路径是否存在，如果不存在则一定要先创建父目录（否则会出现 `java.io.IOException`
：系统找不到指定的路径。”）。由于目录会存在多级子目录的问题，所以需要使用 `mkdirs()` 方法进行创建。

:::tip 在项目的实际开发中都需要操作文件目录

当用户在开发中使用 Struts Spring MVC 的 MVC
开发框架时，都会面临接收文件上传及保存的操作。在文件保存操作中，往往只会提供一个父目录（例如： `upload`
），而具体的子目录有可能需要根据实际的使用情况进行动态创建，这样就需要使用范例的方式创建目录。

:::

```java
package com.yootk.demo;
import java.io.File;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
public class TestDemo {
    public static void main(String[] args) throws Exception {  // 此处直接抛出
        File file = new File("d:" + File.separator + "my.jpg"); // 设置文件的路径
        if (file.exists()) {
           System.out.println("是否是文件：" + (file.isFile()));
           System.out.println("是否是目录：" + (file.isDirectory()));
           // 文件大小是按照字节单位返回的数字，所以需要将字节单元转换为兆（M）的单元
           // 但是考虑到小数点问题，所以使用BigDecimal处理
           System.out.println("文件大小："
                    + (new BigDecimal((double) file.length() / 1024 / 1024)
                            .divide(new BigDecimal(1), 2,
                                   BigDecimal.ROUND_HALF_UP)) + "M");
           // 返回的日期是以long的形式返回，可以利用SimpleDateFormat进行格式化操作
           System.out.println("上次修改时间："
                    + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                             .format(new Date(file.lastModified())));
        }
    }
}
```

本程序利用 `File` 类中提供的方法进行操作，其中最为重要的就是关于数字的四舍五入处理以及 `long` 与 `Date` 间的转换操作。

范例的所有操作都是围绕文件进行的，但是在整个磁盘上除了文件之外，还会包含使用的目录。对于目录而言，最为常用的功能就是列出目录组成，可以使用 `listFiles()`
方法完成。

```java
package com.yootk.demo;
import java.io.File;
public class TestDemo {
    public static void main(String[] args) throws Exception {	// 此处直接抛出
        File file = new File("c:" + File.separator);
        if (file.isDirectory()) { 						// 判断当前路径是否为目录
           File result [] = file.listFiles() ;
           for (int x = 0; x < result.length; x++) {
               System.out.println(result[x]);			// 调用toString()
           }
        }
    }
}
```

在进行目录列出之前首先要判断给定的路径是否是目录。如果是目录则利用 `listFiles()`
方法列出当前目录中所有内容（文件以及子目录）的文件对象，这样就可以采用循环的方式直接输出 `File`
类对象（默认输出的是完整路径；如果有需要也可以继续利用数组中的每一个 `File` 类对象进行操作。

**范例：** 列出指定目录下的所有文件及子目录信息。在每一个目录中有可能还会存在其他子目录，并且还可能有更深层次的子目录，所以为了可以列出所有的内容，应该判断每一个给定的路径是否是目录。如果是目录则应该继续列出，这样的操作最好使用
**递归** 的方式完成。列出完整目录结构操作流程如图所示。

```java
package com.yootk.demo;
import java.io.File;
public class TestDemo {
    public static void main(String[] args) throws Exception { // 此处直接抛出
        File file = new File("c:" + File.separator);		// 定义操作路径
        print(file);								// 列出目录
    }
    /**
     * 列出目录结构，此方法采用递归调用形式
     * @param file 要列出目录的路径
     */
    public static void print(File file) {
        if (file.isDirectory()) { 						// 路径为目录
           File result[] = file.listFiles(); 				// 列出子目录
           if (result != null) { 						// 目录可以列出
              for (int x = 0; x < result.length; x++) {
                  print(result[x]); 					// 递归调用
              }
           }
        }
        System.out.println(file);						// 直接输出完整路径
    }
}
```

<img src="http://niu.ochiamalu.fun/image-20240927134742249.png" alt="image-20240927134742249" style="zoom:80%;margin:0 auto" />

本程序会列出指定目录中的全部内容（包括子目录中的内容）。由于不确定要操作的目录层级数，所以使用递归的方式，将列出的每一个路径继续判断；如果是目录则继续列出。
