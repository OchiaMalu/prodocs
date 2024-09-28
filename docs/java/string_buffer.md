# StringBuffer 类

在 Java 中，字符串使用 `String` 类进行表示，但是 `String` 类所表示的字符串有一个最大的问题：<u>
字符串常量一旦声明则不可改变，而字符串对象可以改变，但是改变的是其内存地址的指向</u>。所以 `String` 类不适合于被 **频繁修改
** 的字符串操作上，所以在这种情况下，往往可以使用 `StringBuffer` 类，即 `StringBuffer` 类方便用户进行内容的修改。在 `String`
类中使用 `“+”` 作为数据库的连接操作，而在 `StringBuffer` 类中使用 `append()`
方法（方法定义：`public StringBuffer append(数据类型变量)` )进行数据的连接。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		// String类可以直接赋值实例化，但是StringBuffer类不行
		StringBuffer buf = new StringBuffer();			// 实例化StringBuffer类对象
		buf.append("Hello ").append("MLDN ").append("!!");
		change(buf); 									// 引用传递
		System.out.println(buf);
	}
	public static void change(StringBuffer temp) {		// 接收StringBuffer引用
		temp.append("\n").append("www.yootk.com");	// 修改内容
	}
}
```

本程序利用 `StringBuffer` 类对象实现了引用传递，并且通过最终的结果发现，在 `change()` 方法中对 `StringBuffer`
对象的修改可以影响原始 `StringBuffer` 类对象，所以 `StringBuffer` 对象的内容是 **可修改** 的。

:::tip 优先考虑 String 类

`StringBuffer` 类主要用于频繁修改字符串的操作上。但是在任何开发中，面对字符串的操作，大部分情况下都先考虑 `String`
类，只有在需要频繁修改时才会考虑使用 `StringBuffer` 或 `StringBuilder` 类操作。

:::

`String` 与 `StringBuffer` 两个类都是进行字符串操作的，为了进一步理解这两个类的关系，下面来介绍这两个类的定义结构。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926115049136.png" alt="image-20240926115049136" style="zoom:80%;" />

通过两个类的定义结构可以发现，`String` 类与 `StringBuffer` 类都是 `CharSequence` 接口的子类，也就证明 `String`
或 `StringBuffer` 类的对象都可以利用自动向上转型的操作为 `CharSequence` 接口实例化。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		CharSequence seq = "www.yootk.com"; 	// 向上转型
		System.out.println(seq); 				// String类覆写的toString()
	}
}
```

本程序将 `String` 类的实例化对象向上转型为 `CharSequence` 接口对象，同样也可以利用 `CharSequence` 接口接收 `StringBuffer`
类对象。

:::tip 关于 CharSequence 接口

在一些类库中会出现接收 `CharSequence`
接口对象的方法，简单的话只需要传递字符串即可操作。但需要读者注意的是，在`CharSequence`
接口里面提供了 `charAt()` 、 `length()` 方法，这些方法在 `String` 类方法讲解时都已经为读者讲解过了。

:::

虽然 `String` 和 `StringBuffer` 类都属于 `CharSequence` 接口的子类，但是这两个类对象是 **不能直接转换**
的。这两个类可以按照如下的原则进行操作。

原则一：将 `String` 转换为 `StringBuffer` 类对象。

- 方式一：利用 `StringBuffer` 类的构造方法 `public StringBuffer(String str)` 。

在 `StringBuffer` 类中提供了一个专门接收 `String` 类对象的构造方法，利用此构造方法可以将传递进来的 `String`
类对象实例化为`StringBuffer` 类对象。

- 方式二：利用 `StringBuffer` 类中的 `append()` 方法 `public StringBuffer append(String str)` 。

本程序首先实例化了一个 `StringBuffer` 类对象，然后利用 `append()` 方法向 `StringBuffer` 类对象中增加了一个 `String`
类对象，这样就相当于将 `String` 类对象变为 `StringBuffer` 类对象。

原则二：将 `StringBuffer` 类变为 `String` 。

- 方式一：利用 `toString()` 方法可以将 `StringBuffer` 转换为 `String`。

实际上所有的类中都会继承 `Object` 类的 `toString()` 方法，所以所有的类对象都可以转换为 `String` 类对象。

- 方式二：利用 `String` 类的构造方法 `public String(StringBuffer buffer)` 实现 `StringBuffer` 与 `String` 的转换。

本程序利用了 `String` 类的构造方法接收了 `StringBuffer` 类对象，这样就实现了 `StringBuffer` 转换为 `String` 类对象的操作。

:::tip String 对象与 StringBuffer 对象比较

由于 `String` 与 `StringBuffer` 都表示字符串，所以在 `String` 类里面也提供了一个和 `StringBuffer`
比较的方法：`public boolean contentEquals(StringBuffer sb)` 。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		StringBuffer buf = new StringBuffer("yootk");
		System.out.println("yootk".contentEquals(buf));	
	}
}
```

本程序利用 `contentEquals()` 方法实现了字符串的比较，但是此方法比较时要区分大小写。

:::

`String` 类中定义了许多便于用户开发的方法，而在 `StringBuffer` 类里面也定义了许多的常用操作方法（如表所示)
，而且部分方法与`String` 类正好互补。

| No. | 方法                                             | 类型 | 描述          |
|-----|------------------------------------------------|----|-------------|
| 1   | public StringBuffer append(数据类型变量)             | 普通 | 数据追加操作      |
| 2   | public StringBuffer reverse()                  | 普通 | 字符串反转操作     |
| 3   | public StringBuffer insert(int offset，数据 类型变量) | 普通 | 在指定位置追加内容   |
| 4   | public StringBuffer delete(int start,int end)  | 普通 | 删除指定索引范围的内容 |

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		StringBuffer buf = new StringBuffer("www.yootk.com");
		System.out.println(buf.reverse());
	}
}
```

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		StringBuffer buf = new StringBuffer("yootk");
		// 首先在最前面追加一个字符串，然后在指定位置追加字符串
		buf.insert(0, "www.").insert(9, ".com");
		System.out.println(buf);
	}
}
```

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		StringBuffer buf = new StringBuffer("Hello World MLDN");
		System.out.println(buf.delete(5, 11));
	}
}
```

以上讲解的 3 个方法，是 `StringBuffer` 类中比较有特点的操作方法，并且读者可以发现，所有的方法都返回了 `StringBuffer`
类型的对象，所以可以使用代码链的方式一直调用 `StringBuffer` 的方法，例如：`对象.append().insert()...` 。

:::tip StringBuilder 类

从 JDK1.5 开始，Java 增加了一个新的字符串操作类：`StringBuilder` 。这个类的定义结构如下

> public final class StringBuilder
>
> extends Object
>
> implements Serializable , CharSequence

通过定义结构，读者可以发现，`StringBuilder` 类与 `StringBuffer` 类是完全相同的，而且打开 Java Doc
文档后可以发现，两个类定义的方法功能也是相同的。而打开 Java 源代码就会发现区别，在 `StringBuffer`
类中定义的方法全部使用 `synchronized` 进行同步定义，而 `StringBuilder` 类没有进行同步定义，所以 `StringBuilder`
类的方法都是异步方法。

:::

:::tip 请解释 String 类、StringBuffer 类和 StringBuilder 类的区别

- `String` 类的内容一旦声明则不可改变，而 `StringBuffer` 类与 `StringBuilder` 类声明的内容可以改变；
- `StringBuffer` 类中提供的方法都是同步方法，属于安全的线程操作；而 `StringBuilder` 类中的方法都属于异步方法，属于非线程安全的操作。

:::
