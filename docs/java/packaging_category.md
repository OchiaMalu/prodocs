# 基本数据类型的包装类

Java 在设计中有一个基本原则，即 **一切皆对象** ，也就是说一切操作都要求用对象的形式进行描述。但是就会出现一个矛盾：<u>
基本数据类型不是对象</u>，为了解决这样的矛盾，可以采用基本数据类型包装的形式描述。

```java
class MyInt { 							// 基本数据类型包装类
	private int num; 					// 这个类包装的是基本数据类型
	/**
	 * 包装类是为了基本数据类型准备的，所以构造方法中需要明确接收一个数字
	 * @param num
	 */
	public MyInt(int num) { 			// 将基本类型包装类
		this.num = num;
	}
	/**
	 * 通过包装类取得所包装的基本数据类型
	 * @return 保证的数据
	 */
	public int intValue() { 				// 将包装的数据内容返回
		return this.num;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		MyInt mi = new MyInt(10); 	// 将int包装为类
		int temp = mi.intValue(); 		// 将对象中包装的数据取出
		System.out.println(temp * 2);	// 只有取出包装数据后才可以进行计算
	}
}
```

本程序为了实现 `int` 基本数据类型的包装，专门定义了一个 `Mylt`
类，通过这个类的构造就可以将基本数据类型转化为类对象的形式，当要进行数据计算时，可以利用 `MyInt` 类中的 `intValue()`
方法将包装的数据取出。

虽然范例实现了一个包装类的结构，但是读者可以发现以下两个问题。

- 如果由用户自己来包装 8 种基本数据类型，这样的代码维护过于麻烦；
- 每一次进行数学计算时都需要通过类对象取出包装的数据后才能够正常进行，也过于麻烦。所以从 JDK1.0 开始，为了方便用户的开发，Java
  专门给出了一组包装类，来包装 8 种基本数据类型：<u>byte(Byte)、short(Short)、int(Integer)、long(Long)、float(Float)、double(
  Double)、 char(Character)和boolean(Boolean)</u>。

以上给出的包装类又可以分为以下两种子类型。

- 对象型包装类(Object直接子类)：Character、Boolean。
- 数值型包装类(Number直接子类)：Byte、Short、Integer、Long、Float、Double。

:::tip 关于 `Number` 类的定义

`Number` 是一个抽象类，里面一共定义了 6 个操作方法：intValue()、doubleValue()、 floatValue()、bytevalue()、shortValue()
、longValue()。

:::

## 装箱与拆箱操作

现在已经存在基本数据类型与包装类两种类型，这两种类型间的转换可以通过以下方式定义。

- 装箱操作：将基本数据类型变为包装类的形式；

|一 每个包装类的构造方法都可以接收各自数据类型的变量；

- 拆箱操作：从包装类中取出被包装的数据。

|— 利用从 `Number` 类中继承而来的一系列 `xxxValue()` 方法完成。

```java
public class TestDemo {
	public static void main(String args[]) {
		Integer obj = new Integer(10); 		// 将基本数据类型装箱
		int temp = obj.intValue(); 			// 将基本数据类型拆箱
		System.out.println(temp * 2);			// 数学计算
	}
}
```

本程序首先利用 `Integer` 类的构造方法将基本数据类型装箱为 `Integer` 类对象，然后利用从 `Number` 类继承的 `intValue()`
方法可以直接从包装类对象中取出所包装的 `int` 型数据。

```java
public class TestDemo {
	public static void main(String args[]) {
		Double obj = new Double(10.2); 		// 将基本数据类型装箱
		double temp = obj.doubleValue(); 	// 将基本数据类型拆箱
		System.out.println(temp * 2);			// 数学计算
	}
}
```

本程序与范例的程序功能完全相同，唯一的区别就是将 `int` 数据类型变为了 `double` 数据类型。

`Integer` 和 `Double` 都属于 `Number`
的子类，表示的是数值型的包装类，但是除了数值型包装类外还存在对象型包装类。下面观察`boolean` 与 `Boolean` 间的转换。

```java
public class TestDemo {
	public static void main(String args[]) {
		Boolean obj = new Boolean(true); 		// 将基本数据类型装箱
		boolean temp = obj.booleanValue(); 	// 将基本数据类型拆箱
		System.out.println(temp);
	}
}
```

虽然 `Boolean` 是对象型的包装类，但是在使用时可以发现其代码的处理结构都是相似的。

范例的代码形式采用的是手工装箱与拆箱的操作，但是在进行计算时发现会出现一个问题：<u>
需要将包装类中的数据拆箱后才可以计算</u>。这样过于麻烦，在 JDK1.5 之前都是采用此类操作模式进行的，而从 JDK1.5 开始，Java
为了方便代码开发，提供了自动装箱与自动拆箱的机制，并且可以直接利用包装类的对象进行数学计算。

```java
public class TestDemo {
	public static void main(String args[]) {
		Integer obj = 10; 				// 自动装箱
		int temp = obj; 					// 自动拆箱
		obj++; 							// 包装类直接进行数学计算
		System.out.println(temp * obj);	// 包装类直接进行数学计算
	}
}
```

通过本程序读者可以发现，利用自动装箱操作可以将一个 `int` 型常量直接赋予 `Integer`
类对象，需要时也可以利用自动拆箱操作将包装的数据取出，而且最关键的是可以直接利用包装类进行数学计算。

:::warning 关于数值型包装类的相等判断问题

有了自动装箱这一概念，实际上又会引发一个与 `String` 类似的古老问题，`Integer`
类直接装箱实例化对象，与调用构造方法实例化对象的区别。很明显，`Integer` 毕竟是一个类，所以如果使用自动装箱实例化对象，对象就会保存在对象池中，可以重复使用。

```java
public class TestDemo {
	public static void main(String args[]) {
		Integer obja = 10; 						// 直接装箱实例化
		Integer objb = 10; 						// 直接装箱实例化
		Integer objc = new Integer(10);			// 构造方法实例化
		System.out.println(obja == objb); 		// 比较结果：true
		System.out.println(obja == objc); 		// 比较结果：false
		System.out.println(objb == objc); 		// 比较结果：false
		System.out.println(obja.equals(objc)); 	// 比较结果：true
	}
}
```

通过本程序可以观察到，如果使用直接装箱实例化的方式，会使用同一块堆内存空间，而使用了构造方法实例化的包装类对象，会开辟新的堆内存空间。而在进行包装类数据相等比较时，最可靠的方法依然是 `equals()`
，这一点读者在日后进行项目开发时一定要特别注意。

:::

:::tip 利用 `Object` 类可以接收全部数据类型

清楚了包装类的基本作用以及自动装箱的处理操作后，实际上也就意味着 `Object`
可以进行参数操作的统一了。所有的引用数据类型都可以利用 `Object`
类来接收，而现在由于存在自动装箱机制，那么基本数据类型也同样可以使用 `Object` 接收。利用 `Object`
接收基本数据类型的流程是：基本数据类型 → 自动装箱（成为对象）→ 向上转型为 `Object`

```java
public class TestDemo {
	public static void main(String args[]) {
		Object obj = 10; 			// 先自动装箱后再向上转型，此时不能进行数学计算
		// Object不可能直接向下转型为int
		// 所以要取出基本数据类型必须首先向下转型为指定的包装类
		int temp = (Integer) obj; // 向下变为Integer后自动拆箱
		System.out.println(temp * 2);
	}
}
```

本程序利用 `Object` 接收了 `int` 基本数据类型，但是 `Object` 类对象并不具备直接的数学计算功能。如果要想将 `Object`
类中的包装数据取出，必须将其强制转换为包装类后才可以利用自动拆箱的完成。

:::

```java
public class TestDemo {
	public static void main(String args[]) {
		Double obj = 10.2;				// 自动装箱
		System.out.println(obj * 2);		// 直接进行数学计算
	}
}
```

本程序利用 `Double` 演示了自动装箱的操作，首先将一个 `double` 型的常量利用自动装箱赋值给 `Double` 类型，然后就可以利用包装类对象进行数学计算了。

```java
public class TestDemo {
	public static void main(String args[]) {
		Boolean flag = true; 			// 自动装箱
		if (flag) { 						// 直接判断
			System.out.println("Hello World !");
		}
	}
}
```

本程序使用 `Boolean` 型数据实现了自动装箱的操作，并且由于自动拆箱机制的存在，可以直接在 `if` 语句中使用 `Boolean`
型的包装类进行条件判断。

## 数据类型转换

使用包装类最多的情况实际上是它的数据类型转换功能，在包装类里面提供了将 `String`
型数据变为基本数据类型的方法。下面对使用Integer、Double、Boolean 三个常用类做以下说明。

- `Integer` 类：`public static int parselnt(String s);`
- `Double` 类：`public static double parseDouble(String s);`
- `Boolean` 类：`public static boolean parseBoolean(String s);`

:::tip 关于 `Character` 类的操作

实际上在给出的 8 种基本数据类型的包装类中，一共有七个类都定义了 `parseXxx()`
的方法，可以实现将字符串变为指定的基本数据类型。但是在 `Character` 类（单个字符)中并没有提供这样的方法，这是因为在 `String`
类中提供了一个 `charAt()` 方法，利用这个方法就可以将字符串变为 `char` 字符数据了。

:::

```java
public class TestDemo {
	public static void main(String args[]) {
		String str = "123"; 				// 字符串，由数字组成
		int temp = Integer.parseInt(str);	// 将字符串转化为int型数据
		System.out.println(temp * 2);		// 数学计算
	}
}
```

本程序首先将字符串数据直接利用 `Integer.parselnt()` 方法变为了 `int` 型数据，然后进行了乘法计算。

:::warning 数据转换时要注意数据组成格式

如果要将一个字符串数据变为数字，就必须保证字符串中定义的字符都是数字（如果是小数会包含小数点 `“.”`
），如果出现了非数字的字符，那么转换就会出现异常。

```java
public class TestDemo {
	public static void main(String args[]) {
		String str = "1a3"; 				// 字符串
		int temp = Integer.parseInt(str);	// 将字符串转化为int型数据
		System.out.println(temp * 2);		// 数学计算
	}
}
```

本程序由于字符串中包含非数字的字符内容，所以转换时会出现 `NumberFormat Exception`
异常。而在实际的开发中，如果要进行数据的传递操作，大部分都以 `String` 型为主，所以严格的做法是需要进行字符串组成检测。

:::

```java
public class TestDemo {
	public static void main(String args[]) {
		String str = "1.3"; 						// 字符串
		double temp = Double.parseDouble(str);		// 将字符串转化为double型数据
		System.out.println(temp * 2);				// 数学计算
	}
}
```

由于字符串是一个小数数据，所以本程序首先利用 `Double.parseDouble()` 方法将字符串变为了 `double` 型数据，然后进行乘法计算输出。

```java
public class TestDemo {
	public static void main(String args[]) {
		String str = "true"; 						// 字符串
		boolean flag = Boolean.parseBoolean(str);	// 将字符串转化为boolean型
		if (flag) {
			System.out.println("** 满足条件！");
		} else {
			System.out.println("** 不满足条件！");
		}
	}
}
```

本程序首先定义了一个字符串数据 `true` ，然后将此字符串利用 `Boolean.parseBoolean()` 方法转换为 `boolean` 型数据，最后进行条件判断。

:::tip `boolean` 转换较为灵活

`boolean` 数据类型在 Java 中只有 `true` 和 `false` 两种取值，所以在 `Boolean`
进行转换的过程中，如果要转换的字符串不是 `true` 或者是 `false` ，将统一按照 `false`
进行处理。也就是说在字符串转换为 `boolean` 数据类型的操作中永远不会出现转换异常。

:::

:::tip 基本数据类型变为 `String` 型数据

既然以上的操作实现了字符串变为基本数据类型的功能，那么也一定存在将基本数据类型变为字符串的操作，而这样的转换可以通过以下两种方式完成。

- **方式一：**任何基本数据类型与字符串使用 `“+”` 操作后都表示变为字符串：

```java
public class TestDemo {
	public static void main(String args[]){
		int num = 100;
		String str = num + "";
		System.out.println(str.replaceAll("0","9"));
	}
}
```

本程序使用了 `“+”` 将一个 `int` 型数据与一个空字符串（不是 `null` ）进行连接，这样就会将 `num`
变量所包含的内容自动变为字符串后进行连接，结果就变为了字符串。实际上任何数据类型遇见 `“+”`
都会变为字符串进行连接处理（如果是引用数据类型会调用 `toString()` 转换后进行连接），但是这样的连接会造成垃圾空间的产生，所以不建议使用。

- 方式二：利用 `String` 类中提供的方法：public static String valueOf(数据类型变量)。

```java
public class TestDemo {
	public static void main(String args[]){
		int num = 100;
		String str = String.valueOf(num);
		System.out.println(str.replaceAll("0","9"));
	}
}
```

本程序使用 `String` 类提供的 `valueOf()` 方法，此方法使用 `static` 声明，可以直接利用类进行调用，而此方法在 `String`
类中也进行了多次重载，可以将任意数据类型变为 `String` 型数据，这样的操作可以避免垃圾的产生，所以在开发中往往使用较多。

:::
