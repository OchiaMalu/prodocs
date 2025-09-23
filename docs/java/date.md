# 日期处理类

日期是一种重要并且特殊的数据类型，在所有的开发中都不可避免的要使用到日期进行处理操作。本节将为读者讲解日期类以及日期格式化类的使用。

## Date 类

本书在之前一直强调简单 Java 类的概念，也重点阐述了简单 Java 类和数据表之间的映射关系，但是对于数据表的日期型字段却一直没有映射。而在
Java 中，如果要表示日期型，需要使用 `java.util.Date` 类完成，`java.util.Date` 类的主要操作方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928115629134.png" alt="image-20240928115629134" style="zoom:80%;margin:0 auto" />

如果要想取得当前的日期时间，只需要直接实例化 Date 类对象即可。

```java
package com.yootk.demo;
import java.util.Date;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Date date = new Date();
        System.out.println(date); 		// 输出对象信息
    }
}
```

本程序首先直接实例化了 `java.util.Date` 类对象，然后直接进行对象输出（调用 `toString()` ),这样就可以直接取得当前的日期时间数据。

:::tip 范例日期并未格式化处理

范例的程序只是为读者简单演示了日期时间数据的取得以及 `Date`
类对象的输出效果。不过这样的日期时间显示格式并不是最好的，在实际开发中显示日期时间时，往往都需要利用 `SimpleDateFormat`
类进行格式化。

:::

在 `Date` 类的方法中，构造方法可以接收一个 `long` 类型的数据，而且 `getTime()` 也可以返回一个
long类型的数据，利用这两个方法就可以实现 `Date` 与 `long` 之间的转换。

```java
package com.yootk.demo;
import java.util.Date;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        long cur = System.currentTimeMillis();			// 取得当前的日期时间以long型返回
        Date date = new Date(cur);					// 将long转换为Date
        System.out.println(date);					// 输出对象信息
        System.out.println(date.getTime()); 			// 输出对象信息
    }
}
```

本程序首先利用 `System.currentTimeMillis()` 取得了当前的系统日期时间数字，然后利用 `Date` 类构造方法以及 `getTime()`
方法，实现了 `long` 与 `Date` 类对象之间的转换操作。

## 日期格式化：SimpleDateFormat

虽然使用 `java.util.Date`
类可以明确取得当前的日期时间，但是最终数据的显示格式并不方便用户阅读。如果要对显示的日期时间进行格式转换，则可以通过 `java.text.SimpleDateFormat`
类完成，此类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928115716482.png" alt="image-20240928115716482" style="zoom:80%;margin:0 auto" />

除了表列出的 3 个核心操作方法外，要想正常地完成格式化的操作，还需要准备出一些常用的日期时间标记（在 Java Doc 中可以查找到）：
**年（yyyy）、月（MM）、日（dd）、时（HH）、分（mm）、秒（ss）、毫秒（SSS）**。

```java
package com.yootk.demo;
import java.text.SimpleDateFormat;
import java.util.Date;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Date date = new Date();					// 实例化Date类对象
        // 实例化SimpleDateFormat类对象，同时定义好要转换的目标字符串格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        String str = sdf.format(date); 			// 将Date型变为String型
        System.out.println(str);
    }
}
```

本程序利用 `SimpleDateFormat` 类，将 `Date` 对象按照指定的格式转换为一个字符串进行显示。

```java
package com.yootk.demo;
import java.text.SimpleDateFormat;
import java.util.Date;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "2005-07-27 07:15:22.111" ;	// 字符串由日期时间组成
        // 实例化SimpleDateFormat类对象，同时定义好要转换的目标字符串格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS") ;
        Date date = sdf.parse(str) ;				// 将字符串变为日期型数据
        System.out.println(date);
    }
}
```

本程序首先定义了一个 `String` 型对象，并且设置了相关的日期时间数据，然后利用 `SimpleDateFormat` 类将字符串转换为了 `Date`
型对象。

:::tip `SimpleDateFormat` 可以自动处理错误的日期时间数

一般定义月份只有 12 个月，天数不能超过 31
天，诸如此类的限制还包括小时、分钟等数据。如果用户设置了不正确的日期时间数字，`SimpleDateFormat` 类会帮助用户自动进行进位处理，也就是说如果设置的月数是
15，则自动增加一年，变为 3 个月。

```java
package com.yootk.demo;
import java.text.SimpleDateFormat;
import java.util.Date;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "2005-15-57 77:95:22.111" ;	// 字符串由日期时间组成
        // 实例化SimpleDateFormat类对象，同时定义好要转换的目标字符串格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS") ;
        Date date = sdf.parse(str) ;				// 将字符串变为日期型数据
        System.out.println(date);
    }
}
```

本程序虽然设置了错误的日期时间数字，但是都能自动进行进位处理。

:::

:::tip 关于数据类型的转换操作

在实际的 Java 项目开发中，有 6 种最为常见的数据类型：<u>java.lang.String、java.util. Date、int(Integer)、double(Double)、byte(
Byte、boolean(Boolean)</u>。这 6 种数据类型的转换可以依靠以下 3 个原则。

- `Date` 与 `String` 类之间的转换依靠 `SimpleDateFormat` ；
- `String` 与基本类型之间的转换依靠包装类与 `String.valueOf()` 方法；
- `long` 与 `Date` 转换依靠 `Date` 类提供的构造以及 `getTime()` 方法。

## Calendar 类

`Calendar`
类可以将取得的时间精确到毫秒，并且由于其可以分别取得日期时间数字，这样可以直接进行各种日期时间的计算操作。`Calendar`
类中定义的常量与方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928115741034.png" alt="image-20240928115741034" style="zoom:80%;margin:0 auto" />

`Calendar` 类本身是一个抽象类，可以使用 `GregorianCalendar` 子类进行实例化。除了这种方式外，更多的是利用 `getInstance()`
方法取得本类的实例化对象。

```java
package com.yootk.demo;
import java.util.Calendar;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Calendar cal = Calendar.getInstance(); 					// 取得本类对象
        StringBuffer buf = new StringBuffer();					// 保存日期时间数据
        buf.append(cal.get(Calendar.YEAR)).append("-");			// 取得年数据
        buf.append(cal.get(Calendar.MONTH) + 1).append("-");		// 取得月数据，从0开始
        buf.append(cal.get(Calendar.DAY_OF_MONTH)).append(" ");	// 取得天数据
        buf.append(cal.get(Calendar.HOUR_OF_DAY)).append(":");	// 取得小时数据
        buf.append(cal.get(Calendar.MINUTE)).append(":");			// 取得分钟数据
        buf.append(cal.get(Calendar.SECOND));					// 取得秒数据
        System.out.println(buf);
    }
}
```

本程序首先利用 `getInstance()` 方法取得了 `Calendar` 类的实例化对象，然后使用 `get()`
方法分别取得了各个日期时间数据。但是在取得数据中读者可以发现，`Calendar` 取得的内容不会出现前导 0，即如果当前日期是 5
月，那么返回的不是 “05” 而是 “5” 。

利用`Calendar` 类可以实现一些简单的日期计算，例如：若干天之后的日期，就可以利用此类完成。

```java
package com.yootk.demo;
import java.util.Calendar;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Calendar cal = Calendar.getInstance(); 						// 取得本类对象
        StringBuffer buf = new StringBuffer();						// 保存日期时间数据
        buf.append(cal.get(Calendar.YEAR)).append("-");				// 取得年数据
        buf.append(cal.get(Calendar.MONTH) + 1).append("-");			// 取得月数据，从0开始
        buf.append(cal.get(Calendar.DAY_OF_MONTH) + 5).append(" ");	// 取得5天后数据
        buf.append(cal.get(Calendar.HOUR_OF_DAY)).append(":");		// 取得小时数据
        buf.append(cal.get(Calendar.MINUTE)).append(":");				// 取得分钟数据
        buf.append(cal.get(Calendar.SECOND));						// 取得秒数据
        System.out.println(buf);
    }
}
```

本程序在进行天数的计算时数据增加了 5，这样就表示计算 5 天后的日期。

:::tip 关于 `Calendar` 的补充说明

虽然利用 `Calendar` 可以取得日期时间，但是 `Calendar` 的月是从 0
开始计算的，所以每一次在进行月份计算时都需要执行一个 `“+1”` 的操作。由于 `Calendar`
可以分开取得数据，所以在进行 `日期+数字` 操作上就比较方便，但是要注意累加过大问题，例如：假设今天是 7月 27 日，如果只是增加一个
10 天，那么取得的就是 7 月 37 日，这一点处理就比较麻烦了。在 `SimpleDateFormat`
格式化日期时，会将多余的日期时间进行自动进位，所以将这几个类结合在一起使用就比较方便了。

:::
