# 抽象类

抽象类是代码开发中的重要组成部分，利用抽象类可以明确地定义子类需要覆写的方法，这样相当于在语法程度上对子类进行了严格的定义限制，代码的开发也就更加标准。下面具体介绍抽象类的概念。

## 抽象类的概念

普通类可以直接产生实例化对象，并且在普通类中可以包含<u>构造方法、普通方法、static方法、常量、变量</u>的内容。而所谓抽象类就是指在普通类的结构里面增加
**抽象方法** 的组成部分，抽象方法指的是<u>没有方法体的方法</u>，同时抽象方法还必须使用 `abstract`
关键字进行定义。拥有抽象方法的类一定属于抽象类，抽象类要使用 `abstract` 声明。

:::tip 关于抽象方法与普通方法

所有的普通方法上面都会有一个 `{}`
，来表示方法体，有方法体的方法一定可以被对象直接调用。抽象类中的抽象方法没有方法体，声明时不需要加 `{}`
，但是必须有 `abstract` 声明，否则在编译时将出现语法错误。

:::

```java
abstract class A { 				// 定义一个抽象类，使用abstract声明
	public void fun() { 			// 普通方法
		System.out.println("存在有方法体的方法！");
	}
	// 此方法并没有方法体的声明，并且存在abstract关键字，表示抽象方法
	public abstract void print();
}
```

在本程序的类中定义了一个抽象方法 `print()` ，既然类中有抽象方法，那么类就必须定义为抽象类，所以使用了 `abstract class`
来定义。但是一定要记住：抽象类只是比普通类多了抽象方法的定义，其他结构与普通类完全一样。

:::warning 抽象类不能直接实例化对象

按照传统的思路，既然已经实例化好了抽象类，那么就应该通过实例化对象来操作，但是抽象类是不能直接进行对象实例化操作的。

```java
public class TestDemo {
	public static void main(String args[]) {
		A a = new A(); 		// A是抽象的，无法实例化
	}
}
```

本程序的代码在编译中会出现错误，也就是说抽象类不能进行直接的对象实例化操作。不能够实例化的原因很简单：当一个类的对象实例化后，就意味着这个对象可以调用类中的属性或方法，但是在抽象类里面存在抽象方法，抽象方法没有方法体，没有方法体的方法怎么可能去调用呢？既然不能调用方法，那么又怎么去产生实例化对象呢？

:::

范例的抽象类已经被成功地定义出来，但是如果要想使用抽象类，则必须遵守如下原则。·

- 抽象类必须有子类，即每一个抽象类一定要被子类所继承（使用 `extends` 关键字)，但是在 Java 中每一个子类只能够继承一个抽象类，所以具备单继承局限；
- 抽象类的子类（子类不是抽象类）必须覆写抽象类中的 **全部** 抽象方法（强制子类覆写)；
- 依靠对象的向上转型概念，可以通过抽象类的子类完成抽象类的实例化对象操作。

```java
abstract class A { 				// 定义一个抽象类，使用abstract声明
	public void fun() { 			// 普通方法
		System.out.println("存在有方法体的方法！");
	}
	// 此方法并没有方法体的声明，并且存在abstract关键字，表示抽象方法
	public abstract void print();
}
//一个子类只能够继承一个抽象类，属于单继承局限
class B extends A {				// B类是抽象类的子类，并且是一个普通类
	public void print() {			// 强制要求覆写的方法
		System.out.println("Hello World !") ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		A a = new B() ;			// 向上转型
		a.print() ;				// 被子类覆写过的方法
	}
}
```

本程序为抽象类定义了一个子类 B ，而子类 B （是一个普通类）必须要覆写抽象类中的全部抽象方法，而在主方法中依靠子类对象的向上转型实现了抽象类
A 对象的实例化操作，而调用的 `print()` 方法由于被子类所覆写，所以最终调用的是在子类 B 中覆写过的 `print()` 方法。

:::tip 开发中是继承一个普通类还是抽象类？

虽然一个子类可以去继承任意一个普通类，但是从开发的实际要求来讲，普通类不要去继承另外一个普通类，而要继承抽象类。相比较开发的约定，开发者更愿意相信语法程度上给予的限定。很明显，强制子类去覆写父类的方法可以更好地进行操作的统一，所以对于抽象类与普通类的对比，作者给出如下
3 点总结。

- 抽象类继承子类里面会有明确的方法覆写要求，而普通类没有；
- 抽象类只比普通类多了一些抽象方法的定义，其他的组成部分与普通类完全一样；
- 普通类对象可以直接实例化，但是抽象类的对象必须经过向上转型后才可以得到实例化对象。

:::

## 抽象类的相关限制

抽象类的组成和普通类组成的最大区别只是在抽象方法的定义上，但是由于抽象类和普通类使用以及定义的区别，如下概念可能会被读者所忽略，下面依次说明。

(1)抽象类里面由于会存在一些属性，那么在抽象类中一定会存在构造方法，目的是为属性初始化，并且子类对象实例化时依然满足先执行父类构造再调用子类构造的情况。

(2)抽象类不能使用 `final` 定义，因为抽象类必须有子类，而 `final` 定义的类不能有子类；

(3)抽象类中可以没有任何抽象方法，但是只要是抽象类，就不能直接使用关键字 `new` 实例化对象。

```java
abstract class A {				// 定义一个抽象类
	public void print() {			// 此为普通方法
		System.out.println("更多课程请访问：www.yootk.com") ;
	}
}
class X extends A {				// 抽象类必须有子类
}
public class TestDemo {
	public static void main(String args[]) {
		A a = new X() ;			// 通过子类实例化抽象类对象
		a.print();
	}
}
```

本程序的抽象类 A 中没有定义任何抽象方法，但是按照 Java 的语法要求，此时的A类依然无法直接实例化，必须利用子类对象的向上转型才能为抽象类实例化对象。

(4)抽象类中依然可以定义内部的抽象类，而实现的子类也可以根据需要选择是否定义内部类来继承抽象内部类。

```java
abstract class A {				// 定义一个抽象类
	abstract class B {			// 定义内部抽象类
		public abstract void print() ;
	}
}
class X extends A {				// 继承static内部抽象类
	public void print() {
		System.out.println("更多课程请访问：www.yootk.com") ;
	}
	class Y extends B {			// 定义内部抽象类的子类，此类不是必须编写
		public void print() {
								// 方法覆写
		}
	}
}
```

本程序在抽象类 A 中又定义了一个抽象类 B ，而在定义 A 的子类X时不一定非要定义内部类 Y 。当然也可以定义一个内部类 Y
，这样可以直接继承内部的抽象类 B。

(5)外部抽象类不允许使用 `static` 声明，而内部的抽象类允许使用 `static` 声明，使用 `static`
声明的内部抽象类就相当于是一个外部抽象类，继承的时候使用 `外部类.内部类` 的形式表示类名称。

```java
abstract class A {				// 定义一个抽象类
	static abstract class B {	// static定义的内部类属于外部类
		public abstract void print() ;
	}
}
class X extends A.B {			// 继承static内部抽象类
	public void print() {
		System.out.println("更多课程请访问：www.yootk.com") ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		A.B ab = new X() ;		// 向上转型
		ab.print() ;
	}
}
```

本程序利用 `static` 在抽象类 A 中定义了一个抽象类 B ，这样就相当于 B 是一个外部类，则 X 类就可以直接使用 `A.B` 的名称继承这个外部类。

(6)在抽象类中，如果定义了 `static` 属性或方法时，就可以在没有对象的时候直接调用。

```java
abstract class A {						// 定义一个抽象类
	public static void print() {			// static方法
		System.out.println("更多课程请访问：www.yootk.com") ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		A.print() ;						// 直接调用static方法
	}
}
```

本程序在抽象类 A 中定义了一个 `static` 方法，由于 `static` 方法不受实例化对象的限制，所以可以直接由类名称调用。

:::tip 隐藏抽象类子类

利用 `static` 可以在抽象类中定义不受实例化对象限制的方法，那么可以针对于范例的程序做进一步的延伸。例如：现在抽象类只需要一个特定的系统子类操作，那么就可以通过内部类的方式来定义抽象类的子类。

```java
abstract class A { 						// 定义一个抽象类
	public abstract void print();			// 定义抽象方法
	private static class B extends A { 	// 内部抽象类子类
		public void print() { 			// 覆写抽象类的方法
			System.out.println("更多课程请访问：www.yootk.com");
		}
	}
	public static A getInstance() {		// 此方法可以通过类名称直接调用
		return new B();
	}
}
public class TestDemo {
	public static void main(String args[]) {
		// 此时取得抽象类对象时完全不需要知道B类这个子类存在
		A a = A.getInstance();
		a.print();						// 调用被覆写过的抽象方法
	}
}
```

本程序在抽象类 A 中利用内部类 B 进行子类继承，而后再调用，用户不需要知道抽象类的具体子类，只要调用了类中的 `getInstance()`
方法就可以取得抽象类的实例化对象，并且调用方法。

这样的设计在系统类库中会比较常见，目的是为用户隐藏不需要知道的子类。

:::

在讲解构造方法中的关于属性初始化问题时，曾经遗留过一个问题：<u>
在任何一个类的构造执行完前，所有属性的内容都是其对应数据类型的默认值</u>。下面就通过程序来为读者解释此概念。

```java
abstract class A {							// 定义抽象类
	public A() { 							// 2. 父类构造方法
		// 此方法为抽象方法，所以要调用子类中已经被覆写过的方法
		this.print(); 						// 3. 调用print()方法
	}
	public abstract void print();				// 抽象方法
}
class B extends A {
	private int num = 100;					// 子类属性的默认值，无用
	public B(int num) {						// 通过构造设置内容
		this.num = num;					// 保存属性
	}
	public void print() { 					// 4. 调用覆写后的方法
		// num在子类对象未构造前，还未被初始化，内容是其对应数据类型的默认值
		System.out.println("num = " + num);
	}
}
public class TestDemo {
	public static void main(String args[]) {
		new B(30); 						// 1. 执行构造
	}
}
```

本程序可能有一些绕，为了方便读者，在程序中使用序号标记出了代码的执行顺序。在本程序中主方法调用的是子类的有参构造方法，是为了子类中的 `num`
属性初始化。但是 **在执行子类构造前一定会默认调用父类中的无参构造** ，而在父类中的无参构造方法里又调用了 `print()`
抽象方法，而此抽象方法是在子类中覆写的，其主要的功能是输出子类中的 `num` 属性，但是由于此时子类构造还未执行，所以`num`
属性的内容就是其对应数据类型的默认值。

本程序的讲解目的是演示属性初始化与构造的关系，但是与实际的开发区别不大，读者可以根据自己的需要选择性理解，如果不理解，也可以暂时放下。

## 抽象类应用——模板设计模式

抽象类的最主要特点相当于制约了子类必须覆写的方法，同时抽象类中也可以定义普通方法，而且最为关键的是，这些普通方法定义在抽象类时，可以直接调用类中定义的抽象方法，但是具体的抽象方法内容就必须由子类来提供。

```java
abstract class A {					// 定义一个抽象类
	public void fun() {				// 此为普通方法
		this.print() ;				// 在普通方法中直接调用抽象方法
	}
	public abstract void print() ;	// 此为抽象方法
}
class X extends A {					// 抽象类必须有子类
	public void print() {
		System.out.println("更多课程请访问：www.yootk.com") ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		A a = new X() ;				// 通过子类实例化抽象类对象
		a.fun();						// 抽象类中的普通方法
	}
}
```

本程序在抽象类中的抽象方法 `print()` 被 `fun()` 方法直接调用，在定义抽象类 A
的时候并不知道具体的子类是什么，但是只要是有子类，就必须明确地强制子类来覆写 `print()` 方法，当调用 `fun()`
方法时，执行的一定是被子类所覆写的抽象方法。

按照以上的设计思路，实际上可以对程序做进一步的扩展，现在假设有以下3类现实的事物（或者是更多的事物)。

- 机器人（Robot）：具备充电、工作两个基本操作；
- 人类（Human）：具备吃饭、工作、睡觉三个基本操作；
- 猪（Pig）：具备吃饭、睡觉两个基本操作。

现在要求实现对以上事物的控制，即可以控制机器人、人类、猪的操作行为，而控制的模式只具备三个功能：吃（eat()）、睡（sleep()
）工作（work()）。实际上读者可以发现，以上三类事物本身都具备一些相同的行为特征，例如：机器人、人类、猪都需要进行 “吃”
的操作，但是唯一的区别是机器人的吃实际上是充电的功能，本身也是属于补充能量的过程，而其他两类行为都是共同的。但是机器人不存在休息（睡)
的功能，即使让它休息也休息不了，而猪不具备工作的功能，即使让猪工作也是不可能的，所以即使调用了这些操作，也应该不起任何作用。因此应该首先对行为进行抽象，然后每种行为可以创建出具体的子类，而每个子类的具体操作都应该由行为类的发出命令（command()
）方法发出命令，是固定好的设计，所以应该为普通方法）。本程序的类设计图如图所示。

```java
abstract class Action {					// 定义一个抽象的行为类，行为不是具体的
	// 定义常量时必须保证两个内容相加的结果不是其他行为，例如：EAT + SLEEP的结果为6，不会和其他值冲突
	public static final int EAT = 1;		// 定义吃的命令
	public static final int SLEEP = 5;		// 定义睡的命令
	public static final int WORK = 7;		// 定义工作的命令
	/**
	 * 控制操作的行为，所有的行为都通过类中的常量描述，可以使用EAT、SLEEP、WORK
	 * 或者进行命令的叠加使用，例如：边吃边工作，使用EAT + WORK来描述
	 * @param flag 操作的行为标记
	 */
	public void command(int flag) {
		switch (flag) {					// switch只支持数值判断，而if支持条件判断
		case EAT:						// 当前为吃的操作
			this.eat();					// 调用子类中具体的“吃”方法
			break;
		case SLEEP:					// 当前为睡的操作
			this.sleep();					// 调用子类中具体的“睡”方法
			break;
		case WORK:					// 当前为工作的操作
			this.work();				// 调用子类中具体的“工作”方法
			break;
		case EAT + WORK:			// 行为组合，本处只是举例说明，不演示
			this.eat();					// 调用“吃”的方法
			this.work();				// 调用“工作”的方法
			break;
		}
	}
	public abstract void eat();			// 定义子类的操作标准
	public abstract void sleep();		// 定义子类的操作标准
	public abstract void work();		// 定义子类的操作标准
}
```

<img src="http://niu.ochiamalu.fun/image-20240925103207761.png" alt="image-20240925103207761" style="zoom:80%;margin:0 auto" />

在本程序的定义中，将具体的接收指令定义为 `command()` 方法，并且 `command()` 方法只接收固定的几个操作值（由具体的常量提供)
，同时该方法也支持操作的组合传递，而具体的操作行为不应该由行为这个类负责，而应由不同的子类覆写。

```java
class Robot extends Action {		// 定义机器人行为
	public void eat() {				// 覆写行为的操作
		System.out.println("机器人补充能量！");
	}
	public void sleep() {				// 此操作不需要但必须覆写，所以方法体为空
	}
	public void work() {				// 覆写行为的操作
		System.out.println("机器人正在努力工作！");
	}
}
```

```java
class Human extends Action {		// 定义人类行为
	public void eat() {				// 覆写行为的操作
		System.out.println("人类正在吃饭！");
	}
	public void sleep() {				// 覆写行为的操作
		System.out.println("人类正在睡觉休息！");
	}
	public void work() {				// 覆写行为的操作
		System.out.println("人为了梦想在努力工作！");
	}
}
```

```java
class Pig extends Action {
	public void eat() { 				// 覆写行为的操作
		System.out.println("猪正在啃食槽！");
	}
	public void sleep() { 			// 覆写行为的操作
		System.out.println("猪在睡觉养膘！");
	}
	public void work() {				// 此操作不需要但必须覆写，所以方法体为空
	}
}
```

范例定义了 3 种事物的具体操作行为，但是由于抽象类的定义要求，所以每一个子类中即使不需要的操作方法也需要进行覆写，此时只要将它的方法体设置为空即可。

```java
public class TestDemo {
	public static void main(String args[]) {
		fun(new Robot());				// 传递机器人行为子类
		fun(new Human());				// 传递人类行为子类
		fun(new Pig());					// 传递猪的行为子类
	}
	/**
	 * 执行具体的操作行为，假设本处只执行EAT、SLEEP、WORK3个行为
	 * @param act 具体的行为对象
	 */
	public static void fun(Action act) {
		act.command(Action.EAT);		// 调用“吃”操作
		act.command(Action.SLEEP);	// 调用“睡”操作
		act.command(Action.WORK);	// 调用“工作”操作
	}
}
```

本程序中的 `fun()` 方法实现了固定的行为操作，并且这些具体的行为都是根据传递的子类的不同而有所不同，但是由于机器人没有 “睡”
这个功能，所以方法体为空，表示此操作不起作用。

这些不同的类型最终都在行为上成功地进行了抽象，即如果要使用行为操作，就必须按照 `Action` 类的标准来实现子类。
