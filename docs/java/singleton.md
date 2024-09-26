# 单例设计模式（Singleton)

在之前大部分的属性定义时都使用了 `private` 进行声明，而对于构造方法也可以使用 `private` 声明，则此时的构造方法就被 **私有化
** 。而构造方法私有化之后会带来哪些问题，以及有什么作用？下面就来进行简单的分析。首先在讲解私有化构造方法操作之前，来观察如下的程序。

```java
class Singleton { 						// 定义一个类，此类默认提供无参构造方法
	public void print() {
		 System.out.println("Hello World .");
	}
}
public class TestDemo {
	public static void main(String args[]) {
		 Singleton inst = null; 			// 声明对象
		 inst = new Singleton(); 		// 实例化对象
		 inst.print(); 					// 调用方法
	}
}
```

在本程序中，`Singleton`
类里面存在构造方法（因为如果一个类中没有明确地定义一个构造方法，则会自动生成一个无参的、什么都不做的构造方法)
，所以可以先直接实例化对象，再调用类中提供的 `print()` 方法。下面将构造方法改变一下，即使用 `private` 封装。

```java
class Singleton { 						// 定义一个类
	private Singleton() {				// 构造方法私有化
	} 
	public void print() {
		System.out.println("Hello World .");
	}
}
public class TestDemo {
	public static void main(String args[]) {
		Singleton inst = null; 			// 声明对象
		inst = new Singleton(); 		// 错误：The constructor Singleton() is not visible
		inst.print(); 					// 调用方法
	}
}
```

本程序在实例化 `Singleton`
类对象时，程序出现了编译错误，因为构造方法被私有化了，无法在外部调用，即无法在外部实例化`Singleton` 类的对象。

现在就需要思考：在保证 `Singleton` 类中的构造方法不修改不增加，以及 `print()`
方法不修改的情况下，如何操作才可以让类的外部通过实例化对象去调用 `print()` 方法？

**思考过程一：** 使用 `private` 访问权限定义的操作只能被本类所访问，外部无法调用，现在既然构造方法被私有化，就证明，这个类的构造方法只能被本类所调用，即只能在本类中产生本类实例化对象。

```java
class Singleton { 							// 定义一个类
	Singleton instance = new Singleton() ;	// 在内部实例化本类对象
	private Singleton() {					// 构造方法私有化
	} 
	public void print() {
		System.out.println("Hello World .");
	}
}
```

**思考过程二：** 对于一个类中的普通属性，默认情况下一定要在本类存在实例化对象后才可以进行调用，可是本程序在 `Singleton`
类的外部无法产生实例化对象，就必须想一个办法，让 `Singleton` 类中的 `instance` 属性可以在没有 `Singleton`
类实例化对象时来进行调用。因此可以使用 `static` 完成。`static` 定义的属性特点是由类名称直接调用，并且在没有实例化对象时候可以调用。

```java
class Singleton { 									// 定义一个类
	static Singleton instance = new Singleton() ;	// 可以由类名称直接访问
	private Singleton() {							// 构造方法私有化
	} 
	public void print() {
		System.out.println("Hello World .");
	}
}
public class TestDemo {
	public static void main(String args[]) {
		Singleton inst = null; 						// 声明对象
		inst = Singleton.instance; 					// 利用“类.static属性”方式取得实例化对象
		inst.print(); 								// 调用方法
	}
}
```

**思考过程三：** 类中的全部属性都应该封装，所以上述两段代码的 `instance`
属性应该进行封装，而封装之后要想取得属性，则要编写`getter` 方法，只不过这时的 `getter`
方法应该也由类名称直接调用，定义为 `static` 型。

```java
class Singleton { 									// 定义一个类
	private static Singleton instance = new Singleton() ; 
	private Singleton() {							// 构造方法私有化
	} 
	public void print() {
		System.out.println("Hello World .");
	}
	public static Singleton getInstance() {			// 取得本类对象
		return instance;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		Singleton inst = null; 						// 声明对象
		inst = Singleton.getInstance(); 				// 利用“类.static方法()”取得实例化对象
		inst.print(); 								// 调用方法
	}
}
```

**思考过程四：** 这样做的目的是什么？本程序中的 `instance` 属性属于 `static` ，就表示所有 `Singleton`
类的对象不管有多少个对象声明，其本质都会共同拥有同一个 `instance` 属性引用，那么既然是同一个，又有什么意义呢？

如果要控制一个类中实例化对象的产生个数，首先要锁定的就是类中的构造方法（使用private定义构造方法），因为在实例化任何新对象时都要使用构造方法，如果构造方法被锁，就自然就无法产生新的实例化对象。

如果要调用类中定义的操作，那么很显然需要一个实例化对象，这时就可以在类的内部使用 `static`
方式来定义一个公共的对象，并且每一次通过 `static` 方法返回唯一的一个对象，这样外部不管有多少次调用，最终一个类只能够产生唯一的一个对象，这样的设计就属于单例设计模式（Singleton）。

:::tip Windows 的回收站就属于单例设计

实际上这样的应用，读者应该早就有所了解了，并且很清楚在 Windows
中有一个回收站的程序，除了桌面上的回收站之外，每个硬盘上都有一个回收站。实际上每个硬盘的回收站和桌面上的回收站都是同一个，也就是说在整个操作系统上只有一个回收站实例，各个地方只是引用此实例而已。

:::

不过本程序依然有一个问题，就是以下代码也可以使用。

```java
class Singleton { 								// 定义一个类
	private static Singleton instance = new Singleton() ;
	private Singleton() {						// 构造方法私有化
	} 
	public void print() {
		System.out.println("Hello World .");
	}
	public static Singleton getInstance() {		// 取得本类对象
		instance = new Singleton();				// 重新实例化对象
		return instance;
	}
}
```

本操作语法没有错误，也不需要考虑是否有意义，现在的代码也允许这样做，而这样做会发现之前表示唯一一个实例化对象的所有努力就白费了。因此，必须想办法废除这种做法，可以在定义 `instance`
的时候增加一个 `final` 关键字。

```java
class Singleton { 								// 定义一个类
	private final static Singleton instance = new Singleton() ;	
	private Singleton() {						// 构造方法私有化
	} 
	public void print() {
		System.out.println("Hello World .");
	}
	public static Singleton getInstance() {		// 取得本类对象
		return instance;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		Singleton inst = null; 					// 声明对象
		inst = Singleton.getInstance(); 			// 利用“类.static方法()”取得实例化对象
		inst.print(); 							// 调用方法
	}
}
```

在使用 `Singleton` 类时，不管代码如何操作，也永远只会存在唯一的一个 `Singleton` 类的实例化对象，而这样的代码，在设计模式上就称为单例设计模式（Singleton）。
