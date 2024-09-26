# 匿名内部类

**内部类**
指的是在一个类的内部定义了另外的类结构，利用内部类可以方便地实现私有属性的互相访问，但是内部类需要明确地使用 `class`
进行定义。而<u>匿名内部类的是没有名字的内部类，其必须在抽象类或接口基础上才可以定义</u>。下面首先来为读者分析为什么需要有匿名内部类的定义。

```java
interface Message {							// 定义接口
	public void print();
}
class MessageImpl implements Message {		// 定义实现子类
	public void print() {
		System.out.println("Hello World !");
	}
}
public class TestDemo {
	public static void main(String args[]) {
		fun(new MessageImpl());				// 传递子类实例化对象
	}
	public static void fun(Message msg) {		// 接收接口对象
		msg.print();
	}
}
```

本程序是一个标准的子类实例化接口操作的程序，首先在主方法中实例化 `Messagelmpl` 子类，然后将实例化对象传递到 `fun()`
方法中，在 `fun()` 方法中利用接口对象调用 `print()` 方法。但是现在有一个问题出现了，假设 `Messagelmpl`
这个子类只使用一次，那么还有必要将其定义为一个具体的类吗？很明显，答案一定是不将其定义为类，这时就可以 **利用匿名内部类的方式来进行简化
** 。

```java
interface Message {							// 定义接口
	public void print();
}
public class TestDemo {
	public static void main(String args[]) {
		fun(new Message() {					// 直接实例化接口对象
			public void print() {				// 匿名内部类中覆写print()方法
				System.out.println("Hello World !");
			}
		}); 									// 传递匿名内部类实例化
	}
	public static void fun(Message msg) {	// 接收接口对象
		msg.print();
	}
}
```

本程序利用匿名内部类的的概念简化了 `Message` 接口子类的定义，在主方法调用 `fun()`
方法时，直接实例化了接口对象，但是由于接口中包含抽象方法，所以需要同时覆写接口中的抽象方法才可以正常完成，此时虽然节约了子类，但是带来的效果却是结构混乱。

:::warning 关于 JDK1.8 及以前版本的问题

匿名内部类或者是普通内部类，在 JDK1.8 以前，如果要想访问方法中定义的参数或者是变量，就必须加上 `final` 关键字，而 JDK1.8
之后，为了便于 `Lambda` 表达式的操作，就没有严格要求。

:::

