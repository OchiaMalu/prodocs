# 多例设计模式

单例设计模式只留下一个类的一个实例化对象，而多例设计模式，会定义出多个对象。例如：定义一个表示星期的操作类，这个类的对象只能有
7 个实例化对象（星期一到星期日）；定义一个表示性别的类，只能有 2 个实例化对象（男、女），定义一个表示颜色基色的操作类，只能有 3
个实例化对象（红、绿、蓝)。这种情况下，这样的类就不应该由用户无限制地去创造实例化对象，应该只使用 **有限**
的几个，这个就属于多例设计。不管是单例设计还是多例设计，有一个核心不可动摇，即 **构造方法私有化** 。

```java
package com.yootk.demo;
class Sex {
	private String title;
	private static final Sex MALE = new Sex("男");
	private static final Sex FEMALE = new Sex("女");
	private Sex(String title) { 				// 构造私有化了
		this.title = title;
	}
	public String toString() {
		return this.title;
	}
	public static Sex getInstance(int ch) {	// 返回实例化对象
		switch (ch) {
		case 1:
			return MALE;
		case 2:
			return FEMALE;
		default:
			return null;
		}
	}
}
public class TestDemo {
	public static void main(String args[]) {
		Sex sex = Sex.getInstance(2);
		System.out.println(sex);
	}
}
```

本程序首先定义了一个描述性别的多例程序类，并且将其构造方法封装，然后利用 `getInstance()`
方法，接收指定编号后返回一个实例化好的 `Sex` 类对象。

:::tip 可以利用接口标记编号

范例的代码利用数字编号来取得了一个 `Sex` 类的对象，但是会有读者觉得这样做表示的概念不明确，那么为了更加明确要取得对象类型，可以引入一个接口进行说明。

```java
interface Choose {
	public int MAN = 1;							// 描述数字
	public int WOMAN = 2;							// 描述数字
}
public class TestDemo {
	public static void main(String args[]) {
		Sex sex = Sex.getInstance(Choose.MAN) ;	// 利用接口标记内容取得对象
		System.out.println(sex) ;
	}
}
```

本程序如果要取得指定的 `Sex` 类对象，可以利用接口中定义的全局常量（实际上也可以在 `Sex`
类中定义一些全局常量）来进行判断。这样的做法是一种标准做法，但是这样做有一些复杂，所以利用字符串直接判断会更加简单一些。

:::

在 JDK1.7 之前，`switch` 只能利用 `int` 或 `char` 进行判断，正因为如果纯粹是数字或字符意义不明确，所以增加了 `String` 的支持。

```java
package com.yootk.demo;
class Sex {
	private String title;
	private static final Sex MALE = new Sex("男");
	private static final Sex FEMALE = new Sex("女");
	private Sex(String title) { 				// 构造私有化了
		this.title = title;
	}
	public String toString() {
		return this.title;
	}
	public static Sex getInstance(String ch) {
		switch (ch) {						// 利用字符串判断
			case "man":
				return MALE;
			case "woman":
				return FEMALE;
			default:
				return null;
		}
	}
}
public class TestDemo {
	 public static void main(String args[]) {
		 Sex sex = Sex.getInstance("man");
		 System.out.println(sex);
	}
}
```

本程序直接使用 `String` 作为 `switch` 的判断条件，这样在取得实例化对象时就可以利用字符串来描述对象名字，这一点要比直接使用数字更加方便。
