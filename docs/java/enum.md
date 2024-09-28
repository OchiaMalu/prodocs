# 枚举

枚举是 JDK1.5 之后增加的一个主要新功能，利用枚举可以简化多例设计模式（一个类只能产生固定几个实例化对象)的定义，同时在 Java
中的枚举也可以像普通类那样定义属性、构造方法、实现接口等。下面来看具体操作。

## 认识枚举

枚举主要用于定义一组可以使用的类对象，这样在使用时只能通过固定的几个对象来进行类的操作。这样的操作形式在实际生活中非常的多，下面列举如下
3 个例子。

- 如果要表示日期的对象，只能有 7 种定义：SUNDAY(星期日)、MONDAY(星期一)、 TUESDAY(星期二)、WEDNESDAY(星期三)、THURSDAY(星期四)
  、FRIDAY(星期五.)、 SATURDAY(星期六)；
- 如果要表示的是人的性别，只能够有 2 种定义：MALE(男)、FEMALE(女)；
- 描述颜色基色有 3 种定义：RED(红色)、GREEN(绿色)、BLUE(蓝色)。

从 JDK1.5 开始，专门提供了一个新的关键字：`enum` ，利用 `enum` 关键字就可以定义枚举类型。下面使用枚举定义一个表示颜色基色的枚举类。

```java
package com.yootk.demo;
enum Color { 						// 定义枚举类
	RED, GREEN, BLUE; 				// 表示此处为实例化对象
}
public class TestDemo {
	public static void main(String[] args) {
		Color red = Color.RED;		// 直接取得枚举对象
		System.out.println(red);
	}
}
```

本程序定义了一个 `Color` 的类，同时在类中定义了 3 种颜色对象(RED、GREEN、BLUE)，当需要表示红色时只需要调用 `Color` 类中的RED
对象即可，同时输出对象信息时默认内容就是对象的名称。

:::tip 枚举属于简化的多例设计模式

实际上对于范例的程序功能，在讲解多例设计模式中曾经为读者讲解过。下面使用多例设计模式实现一个与之类似的功能。

```java
package com.yootk.demo;
class Color {
	private String title;
	private static final Color RED = new Color("红色");
	private static final Color GREEN = new Color("绿色");	
	private static final Color BLUE = new Color("蓝色");
	private Color(String title) {
		this.title = title;
	}
	public static Color getInstance(int ch) {
		switch (ch) {
		case 1:
			return RED;
		case 2:
			return GREEN;
		case 3:
			return BLUE;
		default:
			return null;
		}
	}
	public String toString() {
		return this.title;
	}
}
public class TestDemo {
	public static void main(String[] args) {
		Color red = Color.getInstance(1);
		System.out.println(red);
	}
}
```

如果使用多例设计模式时，必须保证构造方法要封装，同时还需要提供 `static` 方法取得本类对象。这样的做法是在 JDK1.5
之前使用的，而通过对比，读者可以明显地发现，枚举的实现更加简单。所以枚举实现的就是多例设计模式，这样读者也就可以理解为什么在定义枚举对象时字母全部使用大写了。此时读者也可以发现，枚举可以利用多例来替代，所以在实际的
Java 开发中，有许多不习惯使用枚举的开发者，也不会去选择使用枚举进行开发。

随着枚举技术的讲解深入，开发者也可以在枚举中定义其他结构，例如：方法、属性等。

:::

枚举只需要使用 `enum` 关键字就可以定义，但是严格来讲，枚举只是类结构的加强而已。因为在 Java 中使用 `enum`
定义的枚举类就相当于默认继承 `java.lang.Enum` 类，此类定义如下。

> public abstract class Enum\<E extends Enum\<E>>
>
> extends Object
>
> implements Comparable\<E>,Serializable

从定义中可以发现，`Enum` 类本身是一个抽象类，而抽象类在使用时必须被子类继承，同时在这个抽象类里面提供了表所示的方法。

<img src="http://niu.ochiamalu.top/image-20240928130619901.png" alt="image-20240928130619901" style="zoom:80%;margin:0 auto" />

在任何枚举类中都可以使用表所示的操作方法，并且每个枚举类中的对象在定义时都会按照其定义的顺序自动分配一个序号。

:::tip 关于 `Enum` 类中提供的构造方法

一再强调<u>枚举就是一种简化的多例设计模式</u>。而多例设计模式中最为关键的部分是 **构造方法私有化** 。但是 `Enum`
类设计时考虑到继承与子类实例化调用构造的因素，所以构造方法上使用了 `protected`
权限定义，这也是一种封装（只要权限不是 `public` 都表示封装）。

:::

```java
package com.yootk.demo;
enum Color { 								// 定义枚举类
	RED, GREEN, BLUE; 				// 表示此处为实例化对象
}
public class TestDemo {
	public static void main(String[] args) {
		Color red = Color.RED;				// 直接取得枚举对象
		System.out.println("枚举对象序号：" + red.ordinal());
		System.out.println("枚举对象名称：" + red.name());
	}
}
```

本程序在枚举对象中使用了 `Enum` 类定义的方法，由于 RED 对象是被最先定义的，所以其序号为 0。

:::tip `enum` 和 `Enum` 的关系

`enum` 是 JDK1.5 之后定义的新关键字，主要用于定义枚举类型，在 Java 中每一个使用 `enum`
定义的枚举类型实际上都表示一个类默认继承了 `Enum` 类。

:::

枚举类除了可以继承 `Enum` 抽象类提供的方法外，还定义了一个 `values()` 方法，这个方法会将枚举类中的全部对象以对象数组的形式返回。

```java
package com.yootk.demo;
enum Color { 						// 定义枚举类
	RED, GREEN, BLUE; 			// 表示此处为实例化对象
}
public class TestDemo {
	public static void main(String[] args) {
		for(Color c : Color.values()) {
			System.out.println(c.ordinal() + " - " + c.name());
		}
	}
}
```

本程序利用 `values()` 方法返回了枚举中的全部对象信息，同时读者可以观察到，枚举对象的序号都是按照定义顺序自动生成的。

## 定义其他结构

按照之前的理解，枚举就属于多例设计模式，那么既然是多例设计模式，类中肯定有多种组成，包括属性、方法、构造方法，在枚举中也同样可以定义以上内容，但是此处需要注意以下两点问题。

- 枚举中定义的构造方法不能使用 `public` 声明，如果没有无参构造，要手工调用构造传递参数；
- 枚举对象必须要放在首行，随后才可以定义属性、构造、普通方法等结构。

```java
package com.yootk.demo;
enum Color {
	RED("红色"), GREEN("绿色"), BLUE("蓝色");		// 定义枚举对象，必须写在首行
	private String title; 								// 属性
	private Color(String title) {							// 构造方法，不能使用public声明
		this.title = title;
	}
	public String toString() {							// 覆写toString()方法
		return this.title;
	}
}
public class TestDemo {
	public static void main(String[] args) {
		for (Color c : Color.values()) {					// 取得全部枚举对象
			System.out.print(c + "、"); 				// 直接输出对象调用toString()
		}
	}
}
```

本程序在枚举中定义了参构造方法，所以在创建枚举对象时必须传递具体的参数内容，同时该类中又覆写了 `toString()`
方法，可以直接取得枚举对象的内容。

```java
package com.yootk.demo;
interface IMessage {
	public String getTitle() ;
}
enum Color implements IMessage {						// 实现接口
	RED("红色"), GREEN("绿色"), BLUE("蓝色");		// 定义枚举对象，都是IMessage接口实例
	private String title; 								// 属性
	private Color(String title) {							// 构造方法，不能使用public声明
		this.title = title;
	}
	public String getTitle() {							// 覆写方法
		return this.title ;
	}
	public String toString() {							// 覆写toString()方法
		return this.title;
	}
}
public class TestDemo {
	public static void main(String[] args) { 
		IMessage msg = Color.RED ;					// 实例化接口对象
		System.out.println(msg.getTitle());
	}
}
```

本程序首先让枚举类实现了 `IMessage` 接口，然后在枚举中覆写了 `getTitle()`
方法。由于枚举实现了接口，所以所有的枚举对象都是`IMessage` 接口的实例。

范例是在枚举类中明确地定义了一个公共的 `getTitle()`
方法，除了这种接口实现方式外，也可以采用匿名内部类的方式，让每一个枚举对象都分别覆写 `getTitle()` 方法。

```java
package com.yootk.demo;
interface IMessage {
	public String getTitle() ;
}
enum Color implements IMessage {					// 实现接口
	RED("红色") {									// 适应匿名内部类的方式实现接口
		public String getTitle() {
			return this + " - red";
		}
	},
	GREEN("绿色") {								// 适应匿名内部类的方式实现接口
		public String getTitle() {
			return this + " - green";
		}
	},
	BLUE("蓝色") {									// 适应匿名内部类的方式实现接口
		public String getTitle() {
			return this + " - blue";
		}
	};
	private String title; 							// 属性
	private Color(String title) {						// 构造方法，不能使用public声明
		this.title = title;
	}
	public String toString() {					// 覆写toString()方法
		return this.title;
	}
}
public class TestDemo {
	public static void main(String[] args) { 
		IMessage msg = Color.RED ;				// 实例化接口对象
		System.out.println(msg.getTitle());
	}
}
```

本程序并没有在枚举类中直接覆写 `getTitle()` 方法，而是在每一个枚举类的对象上采用匿名内部类的方式定义了接口的实现操作。

除了实现接口外，在枚举类中也可以直接定义抽象方法，这样枚举中的每一个对象都必须在声明时覆写抽象方法。

```java
package com.yootk.demo;
enum Color {
	RED("红色") {								// 适应匿名内部类的方式实现接口
		public String getTitle() {
			return this + " - red";
		}
	},
	GREEN("绿色") {							// 适应匿名内部类的方式实现接口
		public String getTitle() {
			return this + " - green";
		}
	},
	BLUE("蓝色") {								// 适应匿名内部类的方式实现接口
		public String getTitle() {
			return this + " - blue";
		}
	};
	private String title; 						// 属性
	private Color(String title) {					// 构造方法，不能使用public声明
		this.title = title;
	}
	public String toString() {					// 覆写toString()方法
		return this.title;
	}
	public abstract String getTitle() ;			// 定义抽象方法
}
public class TestDemo {
	public static void main(String[] args) { 
		System.out.println(Color.RED.getTitle());
	}
}
```

本程序在枚举类中定义了一个 `getTitle()` 的抽象方法，这样枚举中的每一个对象都必须覆写此方法。

## 枚举的实际作用

枚举最大的作用就是限定一个类的对象的产生格式，并且其要比多例设计模式更加简单，但是从 JDK1.5
后由于枚举的提供，对应的`switch` 功能也就发生了改变，即可以直接支持枚举判断。

:::tip 关于 `switch` 允许的操作类型

对于 `switch` 中判断数据的支持，随着 JDK 版本的升高也越来越完善。

- 在 JDK1.5 之前，`switch` 只能操作 `int` 或 `char` 型数据；

- 在 JDK1.5 之后 JDK1.7 之前，`switch` 可以操作 `enum` 型；
- 在 JDK1.7 之后，`switch` 可以操作 `String` 型。

```java
package com.yootk.demo;
enum Color {
	RED, GREEN, BLUE;
}
public class TestDemo {
	public static void main(String[] args) {
		Color c = Color.RED;
		switch (c) { 					// 支持枚举判断
			case RED:					// 判断枚举内容
				System.out.println("这是红色！");
				break;
			case GREEN:					// 判断枚举内容
				System.out.println("这是绿色！");
				break;
			case BLUE:					// 判断枚举内容
				System.out.println("这是蓝色！");
				break;
		}
	}
}
```

本程序在 `switch` 上可以直接针对枚举类型进行判断，在每一个 `case` 中只需要定义要匹配的枚举对象内容即可。

枚举本身属于类的结构，所以其也可以直接应用在类定义上。下面定义一个表示人员性别的枚举类，并且在人员类中使用。

```java
package com.yootk.demo;
enum Sex {
	MALE("男"),FEMALE("女") ;
	private String title ;
	private Sex(String title) {
		this.title = title ;
	}
	public String toString() {
		return this.title ;
	}
}
class Member {
	private String name ;
	private int age ;
	private Sex sex ;			// 定义性别属性
	public Member(String name,int age,Sex sex) {
		this.name = name ;
		this.age = age ;
		this.sex = sex ;
	}
	public String toString() {
		return "姓名：" + this.name + "，年龄：" + this.age + "，性别：" + this.sex ;
	}
}
public class TestDemo { 
	public static void main(String[] args) {
		System.out.println(new Member("李兴华", 36, Sex.MALE)); 
	}
}
```

由于性别是有限的对象范围，所以本程序用枚举定义了性别，同时在 `Member` 类中定义性别属性时直接使用了枚举，这样就保证人员的性别只有男或女两个对象可以使用。

:::tip 不使用枚举也可以实现

实际上对于范例的程序开发，不少读者会认为即使不使用枚举，要实现同样的功能也不困难，事实上的确如此。由于在最早期设计时，Java
并没有使用枚举，所以导致许多开发者已经习惯于不使用枚举进行开发。而后期之所以加入，也是考虑到其他语言的开发者转到 Java
开发后的适应性问题。所以本书对枚举的观点只有一个：<u>
如果你是一个已经习惯于使用枚举开发的人员，那么就继续使用，如果你没有习惯于使用枚举，那么不如不用</u>。

:::
