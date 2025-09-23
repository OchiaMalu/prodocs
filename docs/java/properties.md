# Properties 子类

利用 `Map` 集合可以将任意的数据类型设置为 `Key` 或 `Value`
的类型，虽然这样较为灵活，但是在某些开发中并不适用，所以在类集框架中提供了一个 `Properties`
子类，利用此子类只能保存字符串类型的数据(key=value)。

`Properties` 类本身属于 `Hashtable` 的子类，但是由于 `Properties` 类都使用 `String`
数据类型进行操作，所以在使用 `Properties` 类时主要使用本类所定义的方法。`Properties` 类常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928104547074.png" alt="image-20240928104547074" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.util.Properties;
public class TestDemo {
    public static void main(String[] args) {
        Properties pro = new Properties();					// 实例化类对象
        pro.setProperty("BJ", "北京");					// 保存属性信息
        pro.setProperty("TJ", "天津");					// 保存属性信息
        System.out.println(pro.getProperty("BJ"));			// 根据key取得属性信息
        System.out.println(pro.getProperty("GZ"));			// 根据key取得属性信息
        System.out.println(pro.getProperty("GZ", "没有此记录"));	// 没有key返回默认值
    }
}
```

本程序是 `Properties` 类的基本操作，首先进行属性内容的设置，然后根据 `key` 取得指定的内容。在数据取得时如果有对应的 `key`
则可以直接输出 `value` ，如果没有对应的 `key` 并且设置了默认值，则会输出默认值。

利用 `Properties` 类还可以实现属性信息的输出流输出以及输入流读取操作，下面分别介绍这两个操作。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Properties;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Properties pro = new Properties();							// 实例化类对象
        pro.setProperty("BJ", "北京");							// 保存属性信息
        pro.setProperty("TJ", "天津");							// 保存属性信息
        // 一般而言后缀可以随意设置，但是标准来讲，既然是属性文件，后缀就必须是*.properties，这样做也是为了与国际化对应
        // 在进行属性信息保存时如果属性内容为中文则会自动进行转码操作
        pro.store(new FileOutputStream(new File("E:" + File.separator + "area.properties")), "Area Info");
    }
}
```

本程序在属性设置完成后利用 `store()`
方法将属性内容设置到输出流中，由于使用的是文件输出流，所以最终属性的内容会保存在文件中，同时中文也会自动进行 `UNICODE`
编码转换。

如果本机 E 盘上存在 `area.properties` 文件，那么就可以利用文件输入流(FilelnputStream)来进行数据的读取。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Properties pro = new Properties(); 				// 实例化类对象
        pro.load(new FileInputStream(new File("E:" + File.separator + "area.properties")));
        System.out.println(pro.getProperty("BJ"));			// 根据key取得value
    }
}
```

本程序利用 `load()` 方法加载了文件输入流中的属性内容，随后就可以根据 `key` 取得属性内容了。

:::tip `Properties` 类与 `ResourceBundle` 类使用哪个

回答：`Properrties` 可以读取任意输入流，`ResourceBundle` 要结合国际化读取 `*.prperties` 文件。

`ResourceBundle` 类在进行资源文件读取时只能读取后缀为 `*.properties` 的文件，并且往往需要通过 `Locale`
类来设置当前国家及语言环境。但是 `Properties`
类却可以不区分文件后缀，只要符合它保存数据的结构标准的输入流（可能通过网络输入或用户输入）数据都可以进行读取。理论上 `Properties`
在读取上更加灵活，但是 `ResourceBundle` 与 `Locale` 类结合读取不同语言资源文件的功能`Properties` 类并没有。

所以最终的结论是：如果读取国际化资源文件使用 `Resource Bundle` 类，如果读取一些配置信息则可以使用 `Properties` 类。

:::
