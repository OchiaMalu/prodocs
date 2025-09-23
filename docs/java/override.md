# 覆写

继承性的主要特征是子类可以根据父类已有的功能进行功能的扩展，但是在子类定义属性或方法时，有可能出现<u>
定义的属性或方法与父类同名</u>的情况，这样的操作就称为 **覆写** 。

## 方法的覆写

当子类定义了和父类的方法名称、返回值类型、参数类型及个数完全相同的方法时，就称为方法的覆写。为了更好地帮助读者理解方法覆写的意义，下面编写两个测试程序进行说明。

```java
class A {
	public void fun() {			// 在父类中定义的方法
		System.out.println("A类中的fun()方法。") ;
	}
}
class B extends A {				// 定义子类，此时没有覆写任何方法
}
public class TestDemo {
	public static void main(String args[]) {
		B b = new B() ;			// 实例化子类对象
		b.fun() ;				// 调用fun()方法
	}
}
```

本程序在定义子类 B 时没有定义任何方法，所以在主方法中利用 B 类的实例化对象调用的 `fun()` 方法是通过 A 类继承而来的。

```java
class A {
	 public void fun() {			// 在父类中定义的方法
		  System.out.println("A类中的fun()方法。") ;
	 }
}
class B extends A {				// 定义子类，此时没有覆写任何方法
	 public void fun() {			// 此处为覆写
		 System.out.println("B类中的fun()方法。") ;
	}
}
public class TestDemo {
	 public static void main(String args[]) {
		  B b = new B() ;		// 实例化子类对象
		  b.fun() ;				// 调用fun()方法，此时方法被覆写，所以调用被覆写过的方法
	}
}
```

本程序在 B 类中定义了一个与 A 类完全一样的 `fun()` 方法，所以当实例化 B 子类对象，调用 `fun()`
方法时，将不再执行父类的方法，而是直接调用已经被子类覆写过的方法。

一个类可能会产生多个子类，每个子类都可能会覆写父类中的方法，这样一个方法就会根据不同的子类有 **不同** 的实现效果。

```java
class A {
	public void fun() {		// 在父类中定义的方法
		System.out.println("A类中的fun()方法。") ;
	}
}
class B extends A {			// 定义子类，此时没有覆写任何方法
	public void fun() {		// 此处为覆写
		System.out.println("B类中的fun()方法。") ;
	}
}
class C extends A {
	public void fun() {		// 此处为覆写
		System.out.println("C类中的fun()方法。") ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		B b = new B() ;		// 实例化子类对象
		b.fun() ;			// 调用fun()方法，此时方法被覆写，所以调用被覆写过的方法
		C c = new C() ;		// 实例化子类对象
		c.fun() ;			// 调用fun()方法，此时方法被覆写所以调用被覆写过的方法
	}
}
```

本程序为 A 类定义了两个子类：B 类和 C 类，并且都覆写了 A 类中的 `fun()` 方法，当实例化各自类对象并且调用 `fun()`
方法时，调用的一定是被覆写过的方法。

:::warning 关于覆写方法的执行问题

对于方法的覆写操作，读者一定要记住一个原则：如果子类覆写了方法（如 B 类中的 `fun()`
方法，或者可能有更多的子类也覆写了 `fun()` 方法），并且实例化了子类对象 `B b = new B()` 时，调用的一定是被覆写过的方法。

**简单地讲，就是要注意以下覆写代码执行结果的分析要素。**

- 观察实例化的是哪个类；

- 观察这个实例化的类里面调用的方法是否已经被覆写过，如果没被覆写过则调用父类。

这一原则直接与后续的对象多态性息息相关，所以读者必须认真领悟。

:::

:::tip 什么时候会使用到方法覆写的概念呢？

方法覆写的概念其实就是子类定义了与父类完全一样的方法，但是什么时候需要子类覆写方法，什么时候不需要呢？

**回答：当子类发现功能不足时可以考虑覆写。**

如果现在发现父类中的方法名称功能不足（不适合本子类对象操作大，但是又必须使用这个方法名称时，就需要采用覆写这一概念实现。就好比动物都有一个跑的行为动作，但是狗是四条腿跑，而人是两条腿跑。这个时候父类定义此功能时假设只考虑了两条腿跑，则狗这个类对于跑的功能就会出现不足，那么狗的类自然会需要对这一方法进行功能上的扩充，这个时候自然就需要使用到覆写这一概念。

:::

范例的代码的确已经实现了覆写的功能，但是在覆写的过程中，还必须考虑到权限问题，即：**被子类所覆写的方法不能拥有比父类更严格的访问控制权限
** 。

对于访问控制权限实际上已经给读者讲解过 3 种了，这 3 种权限由宽到严的顺序是：public > default(默认，什么都不写) >
private，也就是说 `private` 的访问权限是最严格的（只能被一个类访问)。即如果父类的方法使用的是 `public`
声明，那么子类覆写此方法时只能是`public` ；如果父类的方法是 `default`（默认)，那么子类覆写方法时候只能使用 `default`
或 `public` 。

```java
class A {
	public void fun() {		// 在父类中定义的方法
		System.out.println("A类中的fun()方法。") ;
	}
}
class B extends A {			// 定义子类，此时没有覆写任何方法
	// 父类中的fun()方法权限为public，此时子类中的方法权限并没有变得严格，而是与父类一致
	public void fun() {		// 此处为覆写
		System.out.println("B类中的fun()方法。") ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		B b = new B() ;		// 实例化子类对象
		b.fun() ;			// 调用fun()方法，此时方法被覆写，所以调用被覆写过的方法
	}
}
```

本程序的子类奉行着方法覆写的严格标准，父类中的 `fun()` 方法使用 `public` 访问权限，而子类中的 `fun()`
方法并没有将权限变得更加严格，依然使用 `public` （这也符合绝大多数方法都使用 `public` 定义的原则）。

```java
class A {
	void fun() {				// 在父类中定义的方法
		System.out.println("A类中的fun()方法。") ;
	}
}
class B extends A {			// 定义子类，此时没有覆写任何方法
	// 父类中的fun()方法权限为public，此时子类中的方法权限与父类相比更加宽松
	public void fun() {		// 此处为覆写
		System.out.println("B类中的fun()方法。") ;
	}
}
```

本程序 A 类中的 `fun()` 方法使用了 `default` 权限声明，所以子类如果要覆写 `fun()` 方法只能使用 `default` 或 `public`
权限，在本程序中子类使用了 `public` 权限进行覆写。

```java
class A {
	public void fun() {
		System.out.println("A类中的fun()方法。") ;
	}
}
class B extends A {
	void fun() {	// 此处不能覆写，因为权限更加严格
		System.out.println("B类中的fun()方法。") ;
	}
}
```

本程序子类中的 `fun()` 方法使用了 `default` 权限，相对于父类中的 `public` 权限更加严格，所以 **无法进行覆写** 。

:::tip 父类方法使用 `private` 声明可以覆写吗？

**回答：不能覆写。**

从概念上来讲，父类的方法是 `private` ，属于小范围权限，而 `public`
属于扩大范围的权限。权限上符合覆写要求。但从实际上讲，`private` 是私有的，既然是私有的就无法被外部看见，所以子类是不能覆写的。

下面抛开 `private` 权限不看，先编写一个正常的覆写操作。

```java
class A {
	public void fun() {
		this.print() ;		// 调用print()方法
	}
	public void print() {
		System.out.println("更多课程请访问：www.mldn.cn") ;
	}
}
class B extends A {
	public void print() {		// 覆写的是print()方法
		System.out.println("更多课程请访问：www.yootk.com") ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		B b = new B() ;		// 实例化子类对象
		b.fun() ;			// 调用父类继承来的fun()方法
	}
}
```

本程序子类成功覆写了父类中的 `print()` 方法，所以当利用子类对象调用 `fun()` 方法时，里面调用的 `print()`
为子类覆写过的方法。下面将以上代码修改，使用 `private` 声明父类中的 `print()` 方法。

```java
class A {
	public void print() {
		System.out.println("更多课程请访问：www.mldn.cn") ;
	}
}
class B extends A {
	public void print() {			// 覆写的是print()方法
		super.print();			// 访问父类中的print()方法
		System.out.println("更多课程请访问：www.yootk.com") ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		B b = new B() ;			// 实例化子类对象
		b.print() ;
	}
}
```

从概念上来讲，本程序子类符合覆写父类方法的要求。但是从本质上讲，由于父类 `print()` 方法使用的是 `private`
权限，所以此方法不能够被子类覆写，即对子类而言，就相当于定义了一个新的 `print()` 方法，而这一方法与父类方法无关。

不过大部分情况下开发者并不需要过多地关注 `private` 的关键，因为在实际的开发中，`private` 主要用于声明属性，而 `public`
主要用于声明方法。

:::

一旦有了覆写后会发现，默认情况下子类所能调用的一定是被覆写过的方法。为了能够明确地由子类调用父类中已经被覆写的方法，可以使用 `super.方法()`
来进行访问。

```java
class A {
	public void print() {
		System.out.println("更多课程请访问：www.mldn.cn") ;
	}
}
class B extends A {
	public void print() {			// 覆写的是print()方法
		super.print();			// 访问父类中的print()方法
		System.out.println("更多课程请访问：www.yootk.com") ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		B b = new B() ;			// 实例化子类对象
		b.print() ;
	}
}
```

本程序在子类的 `print()` 方法里编写了 `super.print()` 语句，表示在执行子类 `print()` 方法时会先调用父类中的 `print()`
方法，同时利用 `super.方法()` 的形式主要是子类调用父类指定方法的操作，`super.方法()` 可以放在子类方法的任意位置。

:::tip 重载和覆写

在发生重载关系时，返回值可以不同，但是考虑到程序设计的统一性，重载时应尽量保证方法的返回值类型相同。

<img src="http://niu.ochiamalu.fun/image-20240928125732976.png" alt="image-20240928125732976" style="zoom:80%;" />

:::

## 属性的覆盖

如果子类定义了和父类完全相同的属性名称时，就称为属性的覆盖

```java
class A {
	String info = "Hello";			// 定义属性，暂不封装
}
class B extends A {
	int info = 100; 					// 名称相同，发生属性覆盖
	public void print() {
		System.out.println(super.info);
		System.out.println(this.info);
	}
}
public class TestDemo {
	public static void main(String args[]) {
		B b = new B();				// 实例化子类对象
		b.print();
	}
}
```

本程序在子类中定义了一个与父类同名的 `info` 属性，这样就发生了属性的覆盖，所以在子类中直接访间 `info` 属性时(this.info)
会自动找到被覆盖的属性内容，也可以使用 `super.属性` 的形式调用父类中的指定属性（super.info)。

:::tip `this` 和 `super`

通过一系列对比可以发现，`this` 与 `super` 在使用形式上很相似，下面通过表来进行两个关键字的操作对比。

<img src="http://niu.ochiamalu.fun/image-20240928125643890.png" alt="image-20240928125643890" style="zoom:80%;" />

在开发中，对于本类或父类中的操作，强烈建议加上 `this.` 或者是 `super.` 的标记，这样便于代码维护

:::

