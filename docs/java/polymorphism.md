# 多态

多态是面向对象的最后一个主要特征，也是一个非常重要的特性，掌握了多态性才可以编写出更加合理的面向对象程序。而多态性在开发中可以体现在以下两个方面。

- 方法的多态性：重载与覆写：

**|一重载：**同一个方法名称，根据不同的参数类型及个数可以完成不同的功能；

**|一覆写：**同一个方法，根据实例化的子类对象不同，所完成的功能也不同。

- 对象的多态性：父子类对象的转换。

**|一向上转型：**子类对象变为父类对象，格式：父类 父类对象 = 子类实例，自动转换；

**|一向下转型：**父类对象变为子类对象，格式：子类 子类对象 =（子类）父类实例，强制转换；

对于方法的多态性在之前已经有了详细地阐述，所以本节重点介绍对象多态性，但是读者一定要记住一点，对象多态性和方法覆写是紧密联系在一起的。下面通过程序来验证。

```java
Class A {
	public void print() {
		System.out.println("A、public void print(){}");
	}
}
class B extends A {
	public void print() {		// 此时子类覆写了父类中的print()方法
		System.out.println("B、public void print(){}");
	}
}
public class TestDemo {
	public static void main(String args[]) {
		B b = new B();		// 实例化的是子类对象
		b.print();			// 调用被子类覆写过的方法
	}
}
```

本程序在方法覆写中已经讲解过了，由于现在子类 B 覆写了 A 类中的 `print()`
，并且在主方法中实例化的是子类对象，这样当调用 `print()` 方法时调用的一定是已经被覆写过的方法。也就是说在本程序中需要观察以下两点。

- 第一点：观察实例化的是哪个类的对象：`new B()` ；
- 第二点：观察调用的方法是否被子类所覆写，如果覆写了，则调用被覆写过的方法，否则调用父类方法。

这样的概念与对象的多态性有什么关联呢？下面对主方法进行一些变更，以观察对象的向上转型操作。

```java
public class TestDemo {
	public static void main(String args[]) {
		A a = new B();		// 实例化的是子类对象，对象向上转型
		a.print();			// 调用被子类覆写过的方法
	}
}
```

本程序的执行结果与范例的程序没有任何区别，然而在本程序中发生了对象的向上转型操作 `A a = new B()`
，并且最终由父类对象调用了 `print()`
方法，但是最终的执行结果却是被子类所覆写过的方法。而产生这样结果的原因也很好理解，在范例中已经重点强调了：根据实例化对象所在类是否覆写了父类中的方法来决定最终执行，本程序实例化的是子类对象 `new B()`
，并且 `print()` 方法又被子类覆写了，那么最终所调用的一定是被覆写过的方法。

:::tip 不要看类名称，而要看实例化对象的类

实际上通过本程序读者可以发现对象向上转型的特点，整个操作中根本不需要关心对象的声明类型，关键在于实例化新对象时所调用的是哪个子类的构造，如果方法被子类所覆写，调用的就是被覆写过的方法，否则就调用父类中定义的方法。这一点与方法覆写的执行原则是完全一样的。

:::

清楚了对象的向上转型操作及特点后，下面再来观察对象的向下转型操作。

```java
public class TestDemo {
	public static void main(String args[]) {
		A a = new B();		// 实例化的是子类对象，对象向上转型
		B b = (B) a ;		// 对象需要强制性地向下转型
		b.print();			// 调用被子类覆写过的方法
	}
}
```

本程序首先利用对象的向上转型实例化了父类 A 的对象，然后将此对象进行向下转型为子类 B 的对象，由于整个代码中关键字 `new`
调用的是子类 B 的构造 `new B()` ，所以调用的是被子类 B 所覆写的 `print()` 方法。

因为有强制性转换的操作，所以向下转型操作本身是有前提条件的，即<u>必须发生向上转型后才可以发生向下转型</u>
。如果是两个没有关系的类对象发生强制转换，就会出现 `ClassCastException` 异常。

```java
public class TestDemo {
	public static void main(String args[]) {
		A a = new A();		// 直接实例化子类对象
		// 此时并没有发生子类对象向上转型的操作，所以强制转型会带来安全隐患
		B b = (B) a;			// 强制向下转型，此处产生“ClassCastException”异常
		b.print();			// 此语句无法执行
	}
}
```

本程序出现的异常表示的是类转换异常，指的是两个没有关系的类对象强制发生向下转型时所带来的异常（因为此时并没有发生向上转型）。所以向下转型是会存在安全隐患的，开发中应该尽量避免此类操作。

:::tip 对象多态性有什么用

**回答：在实际开发中，对象向上转型的主要意义在于参数的统一，也是最为主要的用法，而对象的向下转型指的是调用子类的个性化操作方法。
**

在前面的部分曾经为读者分析过，在链表操作中由于数据类型不能统一，所以需要重复定义多个链表，而通过对象的向上转型就可以轻松地实现参数统一。

```java
class A {
	public void print() {
		System.out.println("A、public void print(){}");
	}
}
class B extends A {		// 定义A的子类
	public void print() {	// 此时子类覆写了父类中的print()方法
		System.out.println("B、public void print(){}");
	}
}
class C extends A {		// 定义A的子类
	public void print() {	// 此时子类覆写了父类中的print()方法
		System.out.println("C、public void print(){}");
	}
}
public class TestDemo {
	public static void main(String args[]) {
		fun(new B()) ;	// 对象向上转型，等价于：A a = new B() ;
		fun(new C()) ;	// 对象向上转型，等价于：A a = new C() ;
	}
	/**
	 * 接收A类或其子类对象，不管传递哪个对象都要求调用print()方法
	 * @param a A类实例化对象
	 */
	public static void fun(A a) {
		a.print();
	}
}
```

在本程序的 `fun()` 方法上只是接收了一个 A 类的实例化对象，按照对象的向上转型原则，此时的 `fun()` 方法可以接收 A 类对象或所有
A 类的子类对象，这样只需要一个 A 类的参数类型，此方法就可以处理一切 A 的子类对象（即便 A 类有几百万个子类，`fun()`
方法依然可以接收）。而在 `fun()` 方法中将统一调用 `print()` 方法，如果此时传递的是子类对象，并且覆写过 `print()`
方法，就表示执行被子类所覆写过的方法。

如果说向上转型是统一调用的参数类型，那么向下转型就表示要执行子类的个性化操作方法。实际上当发生继承关系后，父类对象可以使用的方法必须在父类中明确定义，例如：此时在父类中存在一个 `print()`
方法，哪怕这时此方法被子类覆写过，父类对象依然可以调用。但是如果子类要扩充一个 `funB()`
方法，这个方法父类对象并不知道，一旦发生向上转型，那么 `funB()` 方法父类对象肯定无法使用。

```java
class A {
	public void print() {
		System.out.println("A、public void print(){}");
	}
}
class B extends A {		// 定义A的子类
	public void print() {	// 此时子类覆写了父类中的print()方法
		System.out.println("B、public void print(){}");
	}
	/**
	 * 在子类中扩充一个新的方法，但是此方法只能由子类对象调用，父类对象不能调用
	 */
	public void funB() {
		System.out.println("B、扩充的funB()方法");
	}
}
```

本程序在子类 B 中定义的 `funB()` 方法在子类对象发生向上转型时 `A a = new B()`
,父类对象将无法调用，也就是说这个方法是子类自己的特殊功能，并没有在父类中定义，就好比：我们将普通的人作为父类，那么超人除了具备普通人的功能外，还可以飞，所以能飞是超人特殊的功能，而不是人所具备的功能。

如果此时要想调用子类中的方法，就必须将父类对象向下转型。

```java
public class TestDemo {
	public static void main(String args[]) {
		fun(new B());	// 向上转型，只能调用父类中定义的方法
	}
	public static void fun(A a) {
		B b = (B) a;		// 要调用子类的特殊操作，需要向下转型
		b.funB();		// 调用子类的扩充方法
	}
}
```

本程序如果要调用 `fun()` 方法，则子类 B 的实例化对象一定要发生向上转型操作，但是这个时候父类对象无法调用子类 B 的 `funB()`
方法，所以需要进行向下转型才能正常调用 `funB()`
方法。但是如果每一个子类都去大量扩充自己的新功能，这样就会严重破环开发的参数统一性，所以本依然强调，<u>
方法应该以父类为主，子类可以覆写父类方法，但尽量不要扩充新的方法</u>。

通过以上分析相信读者已经发现如下特点。

- 向上转型：其目的是参数的统一，但是向上转型中，通过子类实例化后的父类对象所能调用的方法只能是父类中定义过的方法；
- 向下转型：其目的是父类对象要调用实例化它的子类中的特殊方法，但是向下转型是需要强制转换的，这样的操作容易带来安全隐患。

对于对象的转型，作者给出以下个人经验总结。

- 80% 的情况下都只会使用向上转型，因为可以得到参数类型的统一，方便于程序设计；

​ |- 子类定义的方法大部分情况下请以父类的方法名称为标准进行覆写，不要过多地扩充方法；

- 5% 的情况下会使用向下转型，目的是调用子类的特殊方法；
- 15%的情况下是不转型，例如：String。

:::

为了保证转型的顺利进行，Java 提供了一个关键字：`instanceof` ，利用此关键字可以判断某一个对象是否是指定类的实例，使用格式如下。

> 对象 instanceof 类 返回 boolean 型

如果某个对象是某个类的实例，就返回 `true` ，否则返回 `false` 。

```java
public class TestDemo {
	public static void main(String args[]) {
		A a = new B();			// 对象向上转型
		System.out.println(a instanceof A);
		System.out.println(a instanceof B); 
		System.out.println(null instanceof A);
	}
}
```

本程序利用 `instanceof` 判断了某个对象是否是指定类的实例，通过程序的执行结果可以发现 a 对象由于采用了向上转型进行实例化操作，所以
a 是 A 类或 B 类的实例化对象，而 `null` 在使用 `instanceof` 判断时返回的结果为 `false` 。

既然 `instanceof` 关键字可以准确地判断出实例化对象与类的关系，那么就可以在进行对象强制转换前进行判断，以保证安全可靠的向下转型操作。

:::tip 在进行向下转型时建议都使用 `instanceof` 判断

从实际的开发来讲，向下转型的操作几乎是很少见到的，但是如果真的出现了，并且开发者不确定此操作是否安全时，一定要先使用`instanceof`
关键字判断。也就是说向下转型的操作永远都是 **存在安全隐患** 的。

:::

```java
class A {
	public void print() {
		System.out.println("A、public void print(){}");
	}
}
class B extends A {				// 定义A的子类
	public void print() {			// 此时子类覆写了父类中的print()方法
		System.out.println("B、public void print(){}");
	}
	public void funB() {
		System.out.println("B、扩充的funB()方法");
	}
}
public class TestDemo {
	public static void main(String args[]) {
		fun(new B()) ;			// 对象向上转型
	}
	public static void fun(A a) {
		a.print() ;
		if (a instanceof B) { 	// 如果a对象是B类的实例
			B b = (B) a; 		// 向下转型
			b.funB();			// 调用子类扩充的方法
		}
	}
}
```

在本程序中为了保证安全的向下转型操作，在将父类转换为子类对象时首先使用了 `instanceof`
进行判断，如果当前对象是子类实例，则进行强制转换，以调用子类的扩充方法。
