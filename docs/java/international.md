# 国际化

国际化程序指的是同一套程序代码可以在不同的国家使用，那么在假设项目功能不变的情况下，文字就成为这一操作中最为重要的处理环节。所谓的国际化程序实际上指的就是同一套程序，可以根据其应用的国家自动在项目中显示出本国的相应文字信息，如图所示。而在本操作中需要两个关键的技术实现点：
**如何确定当前的软件项目运行的语言环境** ；要想实现多语言切换，必须针对每一个语言提供一个资源文件，并且可以根据语言环境选择不同的资源文件进行信息的读取。

<img src="http://niu.ochiamalu.top/image-20240927125204195.png" alt="image-20240927125204195" style="zoom:80%;margin:0 auto" />

## 使用 Locale 类定义语言环境

如果要对用户使用的语言环境进行定义，则可以使用 `java.util.Locale` 类完成，此类定义的常用方法如表所示。

<img src="http://niu.ochiamalu.top/image-20240927125240098.png" alt="image-20240927125240098" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.util.Locale;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Locale loc = Locale.getDefault() ;		// 取得本地默认的Local对象
        System.out.println(loc);				// 直接输出loc对象
    }
}
```

本程序直接取得了当前语言环境中默认的 `Local` 对象，而输出的内容由两个部分组成 “zh_CN(语言标记国家标记)” ，其中 `zh`
表示现在使用的语言是中文，而 `CN` 表示现在的国家是中国。

:::tip 如何知道所有的语言及国家编码？

在 `java.util.Locale` 类中还提供了一系列的对象常量，例如：中文语言环境 `Locale.CHINA` 或英文语言环境`Locale.ENGLISH`
，这样可以直接取得指定语言编码和国家编码的 `Locale` 对象，使用较为方便。

```java
package com.yootk.demo;
import java.util.Locale;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Locale loc = Locale.CHINA ;		// 中文语言环境
        System.out.println(loc);
    }
}
```

本程序直接取得了中文环境，这样就相当于固定好语言环境，而不能随着运行环境进行自动检测。

:::

## 利用 ResourceBundle 读取资源文件

资源文件一般都是以 `key=value` 的形式保存文本信息，这样在进行信息读取时就可以根据指定的 `key` 取得对应的 `value`
数据，但是资源文件的文件名称是有要求的，必须以`*.properties`
作为文件后缀。如果要在程序中读取资源文件，则可以利用`java.util.ResourceBundle` 类完成，此类的常用方法如表所示。

<img src="http://niu.ochiamalu.top/image-20240927125553035.png" alt="image-20240927125553035" style="zoom:80%;margin:0 auto" />

下面通过具体的程序操作来为读者演示资源文件的读取操作。

:::warning 关于资源文件保存以及中文问题

资源文件必须保存在 `CLASSPATH`
目录下，也就是说资源文件可以保存在包中，但是在读取时需要加上包名称（如果访问不到则会出现 `MissingResourceException` 异常)
。同时资源文件的命名规范应该与类名称相同，即每个单词的首字母必须大写。资源文件要保存中文则必须将中文转换为 `UNICODE`
编码，这一操作在 IDE 中会自动完成（前提：文件后缀是 `*.properties` ），如果使用手工编写，则必须利用 JDK
提供的 `native2ascii.exe` 工具手工转换。

:::

```
# （注释内容）yootk.info = 更多课程请访问：www.yootk.com
yootk.info = \u66F4\u591A\u8BFE\u7A0B\u8BF7\u8BBF\u95EE\uFF1Awww.yootk.com
```

本资源文件的所在包名称为 `com.yootk.demo` ，而文件名称为 `Messages.properties` ，由于需要进行编写中文内容，则必须将中文进行转码，具体的内容使用注释为读者标记。

```java
package com.yootk.demo;
import java.util.ResourceBundle;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        // 访问的时候一定不要加上后缀，因为默认找到的后缀就是“*.properties”
        // 此时的Messages.properties文件一定要放在CLASSPATH路径下
        ResourceBundle rb = ResourceBundle.getBundle("com.yootk.demo.Messages");
        System.out.println(rb.getString("yootk.info"));
    }
}
```

本程序利用 `ResourceBundle` 类加载 `Messages.properties` 文件，而在进行加载时只能加载 `*.properties`
文件，所以没有编写文件的后缀，而后就可以利用 `getString()` 方法根据资源文件中定义的 `key` 取得对应的 `value` 数据。

但是范例读取的数据内容在资源文件中都属于固定的内容，用户也可以通过占位符在资源文件中采用动态的内容设置，而这一操作就必须依靠 `java.text.MessageFormat`
类完成。设置占位符数据方法为：`public static String format(String pattern,Object...arguments)` 。

:::tip 国际化与格式化操作

文本数据的格式化使用 `MessageFormat` 类，在对于日期时间的格式化使用的是 `SimpleDateFormat` 类，而这两个类的关系如图所示。

<img src="http://niu.ochiamalu.top/image-20240927125932389.png" alt="image-20240927125932389" style="zoom:80%;margin:0 auto" />

所有的格式化操作类都保存在 `java.text` 包中，也就是说这个包中定义的类都是与国际化操作有关的程序类。

:::

```
# （注释内容）yootk.info = 更多课程请访问：{0}，讲师：{1}
yootk.info = \u66F4\u591A\u8BFE\u7A0B\u8BF7\u8BBF\u95EE\uFF1A{0}\uFF0C\u8BB2\u5E08\uFF1A{1}
```

此时在资源信息中使用 `{0}` 表示第一个动态文本，使用 `{1}` 表示第二个动态文本，如果有需要也可以定义更多的动态文本占位符。

```java
package com.yootk.demo;
import java.text.MessageFormat;
import java.util.ResourceBundle;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        // 访问的时候一定不要加上后缀，因为默认找到的后缀就是“*.properties”
        // 此时的Messages.properties文件一定要放在CLASSPATH路径下
        ResourceBundle rb = ResourceBundle.getBundle("com.yootk.demo.Messages");
        System.out.println(MessageFormat.format(rb.getString("yootk.info"),
                 "www.yootk.com", "李兴华"));		// 设置两个占位符的内容
    }
}
```

本程序利用 `MessageFormat` 类为读取数据中的两个占位符设置了具体的内容。

## 多资源读取

掌握了 `Locale` 与 `ResourceBundle`
类后，就可以利用这两个类的结合实现多资源文件的读取，这些资源文件会根据不同的语言环境（实质上是根据 `Locale`
对象内容）读取不同的资源文件。假设要读取的资源信息有两种：中文资源(com.yootk.demo.Messages_.zh_CN.properties)、英文资源(
com.yootk.demo.Messages_en_US.properties )

:::tip 关于读取顺序

即使定义了多个资源文件（资源文件格式：“文件名称语言编码国家编码.properties”)，在使用 `ResourceBundle`
类读取时依然只会输入文件名称，即只会使用 `com.yootk.demo.Messages` 这个名称，而具体的语言编码和国家编码都是由程序自己分辨的。

这样在进行资源文件定义时就有可能有两类资源：**公共资源**（没有设置语言与国家编码)和 **具体的语言资源文件**
（设置了语言与国家编码)。这样在读取时会优先读取存在具体语言与国家编码的资源文件，如果读取不到则再读取公共资源。

不过在本次讲解中并没有将资源结构类考虑在内，这一种资源定义使用情况也较少，不再阐述。

:::

定义中文资源文件—— `com.yootk.demo.Messages_zh_CN.properties` 。

```
# （注释内容）yootk.info = 更多课程请访问：{0}
yootk.info = \u66F4\u591A\u8BFE\u7A0B\u8BF7\u8BBF\u95EE\uFF1A{0}
```

定义英文（英语-美国）资源文件—— `com.yootk.demo.Messages_en_US.properties` 。

```
yootk.info = More courses, please click: {0}
```

此时两个资源文件定义使用不同的语言进行内容的编写，但是其组成结构相同，都存在一个占位符数据。

:::warning 资源文件结构一定要相同

国际化程序的实现是一个标准，而在此标准中最为重要的就是资源文件的结构必须相同，不能说一个资源文件内容中只有一个占位符，另外一个同样性质的资源文件内容中就定义有
3 个占位符，这样的做法是不合理的。

在前面使用 JDK 手工开发项目时，提示的信息都很晦涩，实际上这就是利用国际化程序实现的。所以对于国际化的操作本身也有其自身的缺点，这一点就需要读者自己进行取舍。

:::

```java
package com.yootk.demo;
import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Locale zhLoc = new Locale("zh","CN") ;				// 中国—中文
        Locale enLoc = new Locale("en","US") ;				// 英语—美国
        ResourceBundle zhRB = ResourceBundle.getBundle(
                 "com.yootk.demo.Messages", zhLoc);		// 读取中文资源文件
        ResourceBundle enRB = ResourceBundle.getBundle(
                 "com.yootk.demo.Messages", enLoc);		// 读取英文资源文件
        // 读取资源内容，由于资源本身存在有一个占位符，所以需要设置相应的显示数据
        System.out.println(MessageFormat.format(zhRB.getString("yootk.info"),
                 "www.yootk.com"));
        System.out.println(MessageFormat.format(enRB.getString("yootk.info"),
                 "www.yootk.com"));
    }
}
```

本程序由于要读取两种不同语言的资源文件，所以准备了两个 `Locale` 类对象，这样通过 `Locale` 类对象取得的 `ResourceBundle`
对象就会自动加载指定语言以及国家的资源文件信息，从而进行内容的读取。
