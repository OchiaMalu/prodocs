# 接口

利用抽象类可以实现对子类覆写方法的控制，但是抽象类的子类存在一个很大的问题——单继承局限，所以为了打破这个局限，就需要用 Java
接口来解决。同时在开发中为了<u>将具体代码的实现细节对调用处进行隐藏</u>，也可以利用接口来进行方法视图的描述。

## 接口的基本定义

如果一个类只是由抽象方法和全局常量组成的，那么在这种情况下不会将其定义为一个抽象类，而只会将其定义为接口。所以所谓的接口严格来讲就属于一个特殊的类，而且这个类里面只有抽象方法与全局常量。

在 Java 中可以使用 `interface` 关键字来实现接口的定义。下面来看具体的代码。

```java
interface A { 									// 定义接口
	public static final String MSG = "YOOTK"; 		// 全局常量
	public abstract void print(); 				// 抽象方法
}
```

本程序定义了一个 A 接口，在此接口中定义了一个抽象方法 `print()` 和一个全局常量 `MSG`
，但是由于接口中存在抽象方法，所以接口对象不可能直接使用关键字 `new` 进行实例化的操作。因此，接口具有以下使用原则。

- 接口必须要有子类，但是此时一个子类可以使用 `implements` 关键字实现多个接口，避免单继承局限；
- 接口的子类（如果不是抽象类），必须要覆写接口中的全部抽象方法；
- 接口的对象可以利用子类对象的向上转型进行实例化操作。

:::tip 接口的简化定义

对接口而言，其组成部分就是抽象方法和全局常量，所以很多时候也有一些人为了省略编写，不写 `abstract` 或 `public static final`
，并且在方法上是否编写 `public` 结果都是样的，因为在接口里面 **只能够使用一种访问权限** —— `public` 。以下两个接口的定义最终效果就是完全相同的。

```java
interface A {
	public static final String MSG = "HELLO";
	public abstract void fun();
}
```

```java
interface A {
	String MSG = "HELLO";
	void fun();
}
```

即便在接口的方法中没有写 `public` ，其最终的访问权限也是 `public` ，绝对不会是 `default` (默认)
权限。所以为了准确定义，强烈建议在接口定义方法时一定要写上 `public` ，如下代码所示。

```java
interface A {
	String MSG = "HELLO";
	public void fun();
}
```

在实际的开发中，只要是定义接口，大部分情况下都是以定义抽象方法为主，很少有接口只是单纯地去定义全局常量。

:::

```java
interface A { 									// 定义接口
	public static final String MSG = "YOOTK"; // 全局常量
	public abstract void print(); 				// 抽象方法
}
interface B {									// 定义接口
	public abstract void get();					// 抽象方法
}
class X implements A, B { 						// X类实现了A和B两个接口
	public void print() {							// 覆写A接口的抽象方法
		System.out.println("A接口的抽象方法！");
	}
	public void get() {							// 覆写B接口的抽象方法
		System.out.println("B接口的抽象方法！");
	}
}
public class TestDemo {
	public static void main(String args[]) {
		// 此时X类是A和B两个接口的子类，所以此类对象可以同时实现两个接口的向上转型
		X x = new X(); 						// 实例化子类对象
		A a = x; 								// 向上转型
		B b = x; 								// 向上转型
		a.print();								// 调用被覆写过的方法
		b.get();									// 调用被覆写过的方法
		System.out.println(A.MSG);			// 直接访问全局常量
	}
}
```

本程序定义了两个接口 A、B ，同时在定义 X 子类时利用 `implements` 关键字实现了两个接口，这样在 X 子类中就必须覆写两个接口中提供的全部抽象方法，同时
X 类的对象也就可以利用向上转型的概念，为 A 或 B 两个接口进行对象的实例化操作。

:::tip 更复杂的转型操作

上述代码实例化了 X 类对象，由于 X 是 A 和 B 的子类，因此 X 类的对象可以变为 A 接口或 B 接口类的对象。

```java
public class TestDemo {
	public static void main(String args[]) {
		A a = new X() ;							// 对象向上转型
		B b = (B) a ;							// a实际上代表的是X类对象
		b.get() ;								// 调用B接口方法
		System.out.println(a instanceof A) ;	// 判断a是否是A接口实例，true
		System.out.println(a instanceof B) ;	// 判断a是否是B接口实例，true
	}
}
```

本程序从定义结构上来讲，A 和 B 接口没有任何直接联系，但是这两个接口却同时拥有一个子类—— X 子类，读者千万不要被类型和名称弄迷糊，因为最终实例化的是
X 子类，而这个子类属于 B 类的对象。所以本程序的代码都可以行得通，只不过从代码的阅读上来讲，并不具备良好的结构。

:::

如果一个子类既要继承抽象类又要实现接口，那么应该采用 **先继承** （extends） **后实现接口** （implements）的顺序完成。

```java
interface A { 										// 定义接口
	public abstract void print(); 					// 抽象方法
}
interface B {										// 定义接口
	public abstract void get();						// 定义抽象方法
}
abstract class C {									// 定义抽象类
	public abstract void change();					// 定义抽象方法
}
class X extends C implements A, B { 				// X类继承了抽象类C，实现了A和B两个接口
	public void print() {								// 覆写接口A中的方法
		System.out.println("A接口的抽象方法！");
	}
	public void get() {								// 覆写接口B中的方法
		System.out.println("B接口的抽象方法！");
	}
	public void change() {							// 覆写抽象类C的方法
		System.out.println("C类的抽象方法！");
	}
}
```

本程序的 X 子类是接口 A、B 以及抽象类 C 三个的子类，所以 X 类的对象可以同时被三个父类实例化。

一个抽象类可以继承一个抽象类或者实现若干个接口，但是反过来，一个接口却不能继承抽象类。但是一个接口却可以使用 `extends`
关键字同时 **继承多个** 父接口。

```java
interface A {				// 定义父接口
	public void funA();
}
interface B {				// 定义父接口
	public void funB();
}
interface C extends A, B {	// 利用extends，实现接口多继承
	public void funC();
}
class X implements C {		// 实现C接口子类要覆写全部抽象方法
	public void funA() {}		// A接口定义的方法
	public void funB() {}		// B接口定义的方法
	public void funC() {}		// C接口定义的方法
}
```

本程序在定义接口 C 时使用 `extends` 关键字继承了两个父接口，这就相当于 C 接口中一共定义 3 个抽象方法( `funA` 与 `funB`
通过父接口继承下来)，所以在定义 X 子类时必须覆写 3 个抽象方法。

:::tip 抽象类的限制要比接口多

从继承关系上讲抽象类的限制要比接口多。

- 一个抽象类只能继承一个抽象的父类，而接口没有这个限制，一个接口可以继承多个父接口；
- 一个子类只能继承一个抽象类，却可以实现多个接口。

所以，在整个Java中，接口主要用于解决单继承局限的问题。

:::

虽然从接口本身的概念上来讲只能够由抽象方法和全局常量组成，但是所有的内部结构不受这些要求的限制，也就是说在接口里面可以定义普通内部类、抽象内部类、内部接口。

```java
interface A {
	public void funA();
	abstract class B {							// 定义接口中的抽象类
		public abstract void funB();
	}
}
class X implements A { 						// X实现了A接口
	public void funA() {
		System.out.println("Hello World !");
	}
	class Y extends B { 						// 内部抽象类的子类，可以选择性继承
		public void funB() {}
	}
}
```

本程序在 A 接口的内部定义了一个内部抽象类 B ，这样在 A 接口的 X 子类中就可以根据自己的需求来选择是否要继承内部的抽象类 B。

```java
interface A {
	public void funA();
	static interface B { 			// 外部接口
		public void funB();
	}
}
class X implements A.B { 			// X实现了A接口
	public void funB() {}
}
```

本程序利用 `static` 定义了一个 `A.B` 的外部接口，这样子类可以直接实现 `A.B` 接口并覆写接口中的抽象方法。

## 接口的应用一工厂设计模式（Factory)

工厂设计模式，是 Java 开发中使用的最多的一种设计模式，那么什么叫工厂设计？工厂设计有哪些作用呢？在说明问题前，请读者先观察以下程序。

```java
interface Fruit {					// 定义接口
	public void eat();				// 定义抽象方法
}
class Apple implements Fruit {		// 定义接口子类
	public void eat() {				// 覆写抽象方法
		System.out.println("*** 吃苹果。");
	}
}
public class TestDemo {
	public static void main(String args[]) {
		Fruit f = new Apple();		// 子类实例化父类对象
		f.eat();						// 调用被覆写过的方法
	}
}
```

本程序首先定义了一个表示水果的 `Fruit` 接口，然后为 `Fruit` 定义了一个苹果（Apple)子类，在主类中通过 `Apple`
类实例化 `Fruit` 接口对象，所以当利用 `Fruit` 接口对象调用 `eat()` 方法时调用的是被子类覆写过的方法。

本程序是读者所熟知的程序结构，因为接口不能够被直接实例化对象，所以必须利用向上转型技术，通过子类实例化父接口对象，其关系如图所示。但是这样的做法真的合理吗？

如果要想确认一个代码的编写风格是否良好，应该遵从于以下两个标准。

- 客户端（现在为主方法）调用简单，不需要关注具体的细节；
- 程序代码的修改，不影响客户端的调用，即使用者可以不去关心代码是否变更。

根据以上两个标准，就可以发现本程序设计上的问题。本程序在取得接口的实例化对象时明确地指明了要使用的子类 `Fruit f = new Apple()`
，而关键的问题就出现在关键字 `new` 上。因为一个接口不可能只有一个子类，所以对于 `Fruit`
也有可能产生多个子类对象，而一旦要扩充子类，客户端中的使用也就有可能还会与新的子类有关系。下面通过程序建立一个 `Orange` 子类。

<img src="http://niu.ochiamalu.top/image-20240925105434748.png" alt="image-20240925105434748" style="zoom:80%;margin:0 auto" />

```java
class Orange implements Fruit {		// 定义接口子类
	public void eat() {				// 覆写抽象方法
		System.out.println("*** 吃橘子。");
	}
}
```

本程序的客户端上要想得到这个新的子类对象，需要修改代码。

```java
public class TestDemo {
	public static void main(String args[]) {
		Fruit f = new Orange();		// 子类实例化父类对象
		f.eat();						// 调用被覆写过的方法
	}
}
```

本程序客户端的代码更换了一个子类 `Orange` ，所以修改了客户端的代码，将 `Apple` 子类替换为 `0range` 子类，如图所示。

这个时候如果有更多的子类呢？难道每次都要去修改实例化接口的子类吗？在整个过程中，客户端关心的事情只有一件：如何可以取得 `Fruit`
接口对象。至于说这个对象是被哪个子类所实例化的客户端根本就不需要知道，所以在整个代码中最大的问题就在于关键字 `new` 的使用上。

那么该如何去解决这个关键字 `new` 所带来的耦合度问题呢？读者不妨来一起回顾一下 JVM 的核心原理，如图所示。在 Java 中的 JVM
为了解决程序与操作系统的耦合问题，在程序与操作系统之间加入了一个中间过渡层一 JVM ，由 JVM 去匹配不同的操作系统，只要 JVM
的核心支持不变，程序就可以在任意的操作系统间进行移植。所以解决办法就产生了，即想办法让客户端只看见接口而不让其看见子类，但是需要一个中间的工具类来取得接口对象，如图所示。这样客户端就不再需要关心接口子类，只要通过 `Factory`
（工厂类)程序类就可以取得接口对象。

<img src="http://niu.ochiamalu.top/image-20240925105803930.png" alt="image-20240925105803930" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.top/image-20240925105748488.png" alt="image-20240925105748488" style="zoom:80%;margin:0 auto" />

```java
class Factory {									// 定义工厂类，此类不提供属性
	/**
	 * 取得指定类型的接口对象
	 * @param className 要取得的类实例化对象标记
	 * @return 如果指定标记存在，则Fruit接口的实例化对象，否则返回null
	 */
	public static Fruit getInstance(String className) {
		if ("apple".equals(className)) {			// 是否是苹果类
			return new Apple();
		} else if ("orange".equals(className)) {	// 是否是橘子类
			return new Orange();
		} else {
			return null;
		}
	}
}
public class TestDemo {
	public static void main(String args[]) {
		Fruit f = Factory.getInstance("orange");	// 通过工厂类取得指定标记的对象
		f.eat();									// 调用接口方法
	}
}
```

本程序在客户端的操作上取消关键字 `new` 的使用，而使用 `Factory.getInstance()`
方法根据指定子类的标记取得接口实例化对象，这时客户端不再需要关注具体子类，也不需要关注 `Factory`
类是怎样处理的只需要关注如何取得接口对象并且操作。这样的设计在开发中就称为工厂设计模式。

## 接口的应用一代理设计模式（Proxy)

代理设计也是在 Java
开发中使用较多的一种设计模式，所谓代理设计就是指一个代理主题来操作真实主题，真实主题执行具体的业务操作，而代理主题负责其他相关业务的处理。就好比在生活中经常使用到的代理上网，客户通过网络代理连接网络，由代理服务器完成用户权限、访问限制等与上网操作相关的操作，如图所示。

<img src="http://niu.ochiamalu.top/image-20240925105944712.png" alt="image-20240925105944712" style="zoom:80%;margin:0 auto" />

不管是代理操作也好，真实的操作也好，其共同的目的就是上网，所以用户关心的只是如何上网至于里面是如何操作的用户并不关心，因此可以得出图所示的分析结果。

<img src="http://niu.ochiamalu.top/image-20240925110007174.png" alt="image-20240925110007174" style="zoom:80%;margin:0 auto" />

```java
interface Network{							// 定义Network接口
	public void browse() ;					// 定义浏览的抽象方法
}
class Real implements Network{			// 真实的上网操作
	public void browse(){					// 覆写抽象方法
		System.out.println("上网浏览信息") ;
	}
}
class Proxy implements Network{			// 代理上网
	private Network network ;
	public Proxy(Network network){		// 设置代理的真实操作
		this.network = network ;			// 设置代理的子类
	}
	public void check(){						// 与具体上网相关的操作
		System.out.println("检查用户是否合法");
	}
	public void browse(){
		this.check() ;						// 可以同时调用多个与具体业务相关的操作
		this.network.browse() ;				// 调用真实上网操作
	}
}
public class TestDemo {
	public static void main(String args[]){
		Network net = null ;				// 定义接口对象
		net = new Proxy(new Real()) ;		// 实例化代理，同时传入代理的真实操作
		net.browse() ;						// 客户只关心上网浏览一个功能
	}
}
```

在本程序中，真实主题实现类(Real)完成的只是上网的最基本功能，而代理主题(Proxy)要做比真实主题更多的相关业务操作。

## 抽象类与接口的区别

抽象类和接口都会强制性地规定子类必须要覆写的方法，这样在使用形式上是很相似的，那么在实际开发中是使用抽象类还是使用接口呢？为了让读者更加清楚两个概念的对比，下面给出表所示的抽象类与接口的比较。

| No. | 区别    | 抽象类                             | 接口                         |
|-----|-------|---------------------------------|----------------------------|
| 1   | 关键字   | abstract class                  | interface                  |
| 2   | 组成    | 构造方法、普通方法、抽象方法、 static 方法、常量、变量 | 抽象方法、全局常量                  |
| 3   | 子类使用  | class 子类 extends 抽象类            | class子类implements接口，接口，... |
| 4   | 关系    | 抽象类可以实现多个接口                     | 接口不能继承抽象类，却可以继承多个父接口       |
| 5   | 权限    | 可以使用各种权限                        | 只能使用public权限               |
| 6   | 限制    | 单继承局限                           | 没有单继承局限                    |
| 7   | 子类    | 抽象类和接口都必须有子类，子类必须要覆写全部的抽象方法     | 同左                         |
| 8   | 实例化对象 | 依靠子类对象的向上转型进行对象的实例化             | 同左                         |

经过比较可以发现，抽象类中支持的功能绝对要比接口多，但是其有一点不好，那就是 **单继承局限**
，所以这重要的一点就掩盖了所有抽象类的优点，即当抽象类和接口都可以使用时，优先考虑接口。

:::tip 关于实际开发中接口使用的几个建议

对于实际的项目开发，可能会有各种各样的问题，为了方便读者快速使用接口的概念，下面给出读者一些个人总结的使用参考意见。

- 在进行某些公共操作时一定要定义出接口；
- 有了接口就需要利用子类完善方法；
- 如果是自己写的接口，那么绝对不要使用关键字 `new` 直接实例化接口子类，应该使用工厂类完成。

:::

:::tip 概念太多了，该如何使用？

到此时已经学习过对象、类、抽象类、接口、继承、实现等，这些都属于什么样的关系呢？在开发中，又该如何使用这几个概念呢？

**回答：接口是在类之上的标准。**

为了更好地说明给出的几种结构的关系，下面通过一个简短的分析完成。

如果现在要定义一个动物，那么动物肯定是一个公共标准，而这个公共标准就可以通过接口来完成。

在动物中又分为两类：哺乳动物、卵生动物，而这个标准属于对动物标准进一步细化，应该称为子标准，所以此种关系可以使用接口的继承来表示。

而哺乳动物又可以继续划分为：人、狗、猫等不同的类型，这些由于不表示具体的事务标准，所以可以使用抽象类进行表示。

现在如果要表示出个工人或者是学生这样的概念，肯定是一个具体的定义，则需要使用类的方式。

由于每一个学生或每一个工人都是具体的，因此就通过对象来表示。所以以上几种关系可以通过图来表示。

<img src="http://niu.ochiamalu.top/image-20240925110520838.png" alt="image-20240925110520838" style="zoom:80%;margin:0 auto" />

通过图可以发现，在所有设计中，接口应该是最先被设计出来的，所以在项目开发中，接口设计最重要。

:::

