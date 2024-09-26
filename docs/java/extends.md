# 继承性

继承是面向对象的 **第二大主要特性** ，而继承性要解决的就是代码重用的问题，利用继承性可以从已有的类继续派生出新的子类，也可以利用子类扩展出更多的操作功能。

```java
class Person {
    private String name ;
    private int age ;
    public void setName(String name) {
        this.name = name ;
    }
    public void setAge(int age) {
        this.age = age ;
    }
    public String getName() {
        return this.name ;
    }
    public int getAge() {
        return this.age ;
    }
}
```

```java
class Student {
    private String name;
    private int age;
    private String school;
    public void setName(String name) {
        this.name = name;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public void setSchool(String school) {
        this.school = school;
    }
    public String getSchool() {
        return this.school;
    }
    public String getName() {
        return this.name;
    }
    public int getAge() {
        return this.age;
    }
}
```

通过以上两段代码的比较，相信读者可以清楚地发现，如果按照之前学习的概念进行开发，程序中会出现 **重复代码**
。通过分析也可以发现，从现实生活角度来讲，学生本来就属于人，但是学生所表示的范围要比人表示的范围更小，也更加具体。所以要想解决类似问题，只能依靠
**继承** 的概念来完成。

## 继承的实现

继承性严格来讲就是指 **扩充一个类已有的功能** 。在 Java 中，如果要实现继承的关系，可以使用如下语法完成。

> class 子类 extends {}

对于继承的格式有以下 3 点说明。

- 对于 `extends` 而言，应该翻译为扩充，但是为了理解方便，统一将其称为继承；
- 子类又被称为 **派生类** ；
- 父类又被称为 **超类** （Super Class）

```java
class Person {
    private String name;
    private int age;
    public void setName(String name) {
        this.name = name;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getName() {
        return this.name;
    }
    public int getAge() {
        return this.age;
    }
}
class Student extends Person { 			// Student类继承了Person类
    // 此类没有定义任何的操作方法
}
public class TestDemo {
    public static void main(String args[]) {
        Student stu = new Student(); 	// 实例化的是子类
        stu.setName("张三"); 			// Person类定义
        stu.setAge(20); 				// Person类定义
        System.out.println("姓名：" + stu.getName() + "，年龄：" + stu.getAge());
    }
}
```

通过范例的代码就可以发现，子类（Student）并没有定义任何操作，而在主类中使用的全部操作都是由 `Person`
类定义的，因此可以证明，子类即使不扩充父类，也属于维持功能的状态。

```java
class Person {
    private String name;
    private int age;
    public void setName(String name) {
        this.name = name;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getName() {
        return this.name;
    }
    public int getAge() {
        return this.age;
    }
}
class Student extends Person { 			// Student类继承了Person类
    private String school ;				// 子类扩充的属性	
    public void setSchool(String school) {	// 扩充的方法
        this.school = school ;
    }
    public String getSchool() {			// 扩充的方法
        return this.school ;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Student stu = new Student(); 	// 实例化的是子类
        stu.setName("张三"); 			// Person类定义
        stu.setAge(20); 				// Person类定义
        stu.setSchool("清华大学") ;	 	// Student类扩充方法
        System.out.println("姓名：" + stu.getName() + "，年龄：" + stu.getAge()
                + "，学校：" + stu.getSchool()); 
    }
}
```

在本程序代码中，子类对父类的功能进行了扩充（扩充了一个属性和两个方法，如图所示）。子类从外表上看是扩充了父类的功能，但是对于本程序的代码，子类还有一个特点，即
**子类实际上是将父类定义得更加具体化的一种手段** 。父类表示的范围大，而子类表示的范围小。

<img src="http://niu.ochiamalu.top/image-20240925082220880.png" alt="image-20240925082220880" style="zoom:80%;margin:0 auto" />

## 继承的限制

虽然继承可以进行类功能的扩充，但是其在定义的时候也会存在若干种操作的限制。

**限制一：** Java 不允许多重继承，但是允许 **多层继承** 。

在 C++ 语言中具备一种概念——多继承，即一个子类可以同时继承多个父类。

```java
class A {}
class B {}
class C extends A,B {}	  // 一个子类继承了两个父类
```

本程序编写的目的是希望 C 类可以同时继承 A 和 B 两个类的操作。但是在 Java 中是 **不允许**
存在多重继承的，所以这样的代码在编译时不能通过。而之所以会存在多重继承的概念实际上是因为希望一个子类可以同时继承多个父类的操作，这样就可以使用多层继承了。

```java
class A {}
class B extends A {}		// B类继承A类
class C extends B {}		// C类继承B类
```

C实际上属于（孙）子类，这样一来就相当于 B 类继承了 A 类的全部方法，而 C 类又继承了 A 和 B 类的方法，这种操作称为 **多层继承**
。所以 Java 中 **只允许多层继承** ，不允许多重继承，Java 存在单继承局限。

:::warning 继承层次不要过多

虽然 Java 语言从自身讲并没有继承层数的限定，但从实际的开发角度讲，类之间的继承关系最多 **不要超过三层**
。也就是说开发人员所编写的代码如果出现了继承关系，三层就够了，如果太多层的继承关系会比较复杂

:::

**限制二：** 子类在继承父类时，严格来讲会继承父类中的全部操作，但是对于所有的私有操作属于 **隐式继承** ，而所有的非私有操作属于显式继承。

```java
class A {
	private String msg;
	public void setMsg(String msg) {
	    this.msg = msg;
	}
	public String getMsg() {
	    return this.msg;
	}
}
class B extends A {							// 继承自A类
}
public class Demo {
public static void main(String args[]) {
	    B b = new B();
	    b.setMsg("Hello");					// 设置msg属性，属性通过A类继承
	    System.out.println(b.getMsg());	// 通过子类对象取得msg属性
}
}
```

通过本程序可以发现，利用子类对象设置的 `msg` 属性可以正常取得，那么也就可以得出结论：在 B 类里面一定存在 `msg`
属性，并且此属性是通过父类继承而来的。

但是在 B 类里面不能针对 `msg` 属性进行直接访问，因为它在 A 类中属于 **私有声明** ，只能利用 `setter` 或 `getter`
方法间接地进行私有属性的访问。

**限制三：** 在子类对象构造前一定会默认调用父类的构造（默认使用无参构造），以保证父类的对象先实例化，子类对象后实例化。

```java
class A {
    public A() {            // 父类提供的无参构造方法
        System.out.println("A、A类的构造方法！");
    }
}

class B extends A {        // B是子类继承父类A
    public B() {            // 定义子类的构造方法
        System.out.println("B、B类的构造方法！");
    }
}

public class Demo {
    public static void main(String args[]) {
        new B();        // 实例化子类对象
    }
}
```

本程度虽然实例化的是子类对象，但是发现它会默认先执行父类构造，调用父类构造的方法体执行，再实例化子类对象并且调用子类的构造方法。而这时，对于子类的构造而言，就相当于隐含了 `super()`
的语句调用，由于 `super()` 主要是调用父类的构造方法，所以必须放在子类构造方法的首行。

```java
class B extends A {			// B是子类继承父类A
    public B() {				// 定义子类的构造方法
        super() ;			// 父类中有无参构造时加与不加无区别，如果编写则必须出现在首行
        System.out.println("B、B类的构造方法！");
    }
}
```

从本程序中可以发现，当父类中提供有无参构造方法时，是否编写 `super()`
没有区别。但是如果父类中没有无参构造方法，则必须明确地使用 `super()` 调用父类指定参数的构造方法。

```java
class A {
    public A(String title) {		// 父类提供的有参构造方法
		System.out.println("A、A类的构造方法，title = " + title);   
   }
}
class B extends A {				// 定义子类B
    public B(String title) {		// 子类提供有参构造
        super(title);			// 明确调用父类构造，否则将出现编译错误
        System.out.println("B、B类的构造方法！");
   }
}
public class Demo {
    public static void main(String args[]) {
        new B("Hello"); 		// 实例化子类对象
    }
}
```

本程序在父类中由于没有提供无参构造方法，所以在子类中就必须明确地使用 `super()` 调用指定参数的构造方法，否则将出现语法错误。

:::tip 有没有可能性，不让子类去调用父类构造？

既然 `super()` 和 `this()` 都是调用构造方法，而且都要放在构造方法的首行，那么如果 `this()` 出现了，则默认的 `super()`
应该就不会出现，所以编写了如下程序。

```java
class A {
    public A(String msg) { 	// 父类无参构造
        System.out.println("msg = " + msg);
    }
}
class B extends A {
    public B(String msg) { 	// 子类构造
        this("MLDN", 30);	// 调用本类构造，无法使用“super()”
    }
    public B(String msg,int age) {// 子类构造
        this(msg) ;			// 调用本类构造，无法使用“super()”
    }
}
public class TestDemo {
    public static void main(String args[]) {
        B b = new B("HELLO",20); // 实例化子类对象
    }
}
```

在本程序中，子类 B 的每一个构造方法，都使用了 `this()` 调用本类构造方法，这样是不是就表示子类无法调用父类构造呢？

**回答：本程序有编译错误。**

在之前讲解 `this` 关键字时强调过一句话：如果一个类中有多个构造方法之间使用 `this()` 互相调用，那么 **至少要保留一个**
构造方法作为出口，而这个出口一定会去调用父类构造。

或者换一种更为现实的表达方式：“我们每一个人都一定会有自己的父母，在正常情况下，父母一定都要比我们先出生。在程序中，实例化就表示对象的出生，所以子类出生前（实例化前）父类对象一定要先出生（默认调用父类构造，实例化父类对象”。

此时在某种程度上讲，有一个问题解释了一半——一个简单 Java 类一定要保留一个无参构造方法。而关于此问题的另外一部分要等待讲解完反射机制才可以为读者解释

:::

