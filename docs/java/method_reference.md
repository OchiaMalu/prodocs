# 方法引用

在 Java 中利用对象的引用传递可以实现不同的对象名称操作同一块堆内存空间，而从 JDK1.8
开始，在方法上也支持了引用操作，这样就相当于为方法定义了别名。对于方法引用，Java8 一共定义了以下 4 种操作形式。

- 引用静态方法：`类名称 :: static 方法名称` ；
- 引用某个对象的方法：`实例化对象 :: 普通方法` ；
- 引用特定类型的方法：`特定类 :: 普通方法` ；
- 引用构造方法：`类名称 :: new` 。

```java
package com.yootk.demo;
/**
 * 实现方法的引用接口
 * @param <P> 引用方法的参数类型
 * @param <R> 引用方法的返回类型
 */
@FunctionalInterface
interface IMessage<P, R> {
	/**
	 * 此处为方法引用后的名字
	 * @param p 参数类型
	 * @return 返回指定类型的数据
	 */
	public R zhuanhuan(P p);
}
public class TestDemo {
	public static void main(String[] args) {
		// 将String.valueOf()方法变为IMessage接口里的zhuanhuan()方法
		// valueOf()方法可以接收int型数据，返回String型数据
		IMessage<Integer, String> msg = String::valueOf;
		String str = msg.zhuanhuan(1000);			// 调用引用方法进行操作
		System.out.println(str.replaceAll("0", "9"));
	}
}
```

本程序将 `String` 类的 `valueOf()` 方法引用为 `IMessage` 接口中的 `zhuanhuan()` 方法，这样当调用 `zhuanhuan()`
方法时，实际上就相当于调用了 `String.valueOf()` 方法。

```java
package com.yootk.demo;
/**
 * 实现方法的引用接口
 * @param <P> 引用方法的参数类型
 * @param <R> 引用方法的返回类型
 */
@FunctionalInterface
interface IMessage<R> {
	public R upper() ;
}
public class TestDemo {
	public static void main(String[] args) {
		// String类的toUpperCase()定义：public String toUpperCase()
		// 此方法没有参数，但是有返回值，并且这个方法一定要在有实例化对象的情况下才可以调用
		//“yootk”字符串是String类的实例化对象，所以可以直接调用toUpperCase()方法
		// 将toUpperCase()函数的应用交给了IMessage接口
		IMessage<String> msg = "yootk" :: toUpperCase ;
		String str = msg.upper() ;		// 相当于“"yootk".toUpperCase()”
		System.out.println(str);
	}
}
```

`String` 类中提供的 `toUpperCase()` 方法一般都需要通过 `String`
类的实例化对象才可以调用，所以本程序使用实例化对象引用类中的普通方法 `"yootk" :: toUpperCase` 为 `IMessage`
接口的 `upper()` ，即调用 `upper()` 方法就可以实现 `toUpperCase()` 方法的执行结果。

在进行方法引用的过程中，还有另外一种形式的引用（它需要特定类的对象支持），正常情况下如果使用 `类 :: 方法`
，引用的一定是类中的静态方法，但是这种形式也可以引用普通方法。

例如：在 `String` 类里面有一个方法：`public int compareTo(String anotherString)` 。

如果要进行比较的操作，则可以采用的代码形式是：`字符串 1 对象.compareTo(字符串 2 对象)` ，也就是说如果要引用这个方法就需要准备两个参数。

```java
package com.yootk.demo;
@FunctionalInterface
interface IMessage<P> {
	public int compare(P p1,P p2) ;
}
public class TestDemo {
	public static void main(String[] args) {
		IMessage<String> msg = String :: compareTo ;	// 引用String类的普通方法
		// 传递调用的参数，形式为："A".compareTo("B")
		System.out.println(msg.compare("A", "B"));
	}
}
```

本程序直接引用了 `String` 类中的 `compareTo()` 方法，由于此方法调用时需要指定对象，所以在使用引用方法 `compare()`
时就必须传递两个参数。与之前引用操作相比，方法引用前不再需要定义具体的类对象，而是可以理解为将需要调用方法的对象作为参数进行传递。

```java
package com.yootk.demo;
@FunctionalInterface
interface IMessage<C> {	
	public C create(String t, double p);			// 引用构造方法
}
class Book {
	private String title;
	private double price;
	public Book(String title, double price) {		// 有两个参数的构造
		this.title = title;
		this.price = price;
	}
	@Override
	public String toString() {
		return "书名：" + this.title + "，价格：" + this.price;
	}
}
public class TestDemo {
	public static void main(String[] args) {
		IMessage<Book> msg = Book::new; 		// 引用构造方法
		// 调用的虽然是create()，但是这个方法引用的是Book类的构造
		Book book = msg.create("Java开发实战经典", 79.8);
		System.out.println(book);
	}
}
```

本程序定义的 `IMessage` 接口主要是进行 `Book` 类构造方法的引用，由于构造方法执行后会返回 `Book`
类的实例化对象，所以在定义` IMessage` 接口时需要使用泛型定义要产生的对象类型。
