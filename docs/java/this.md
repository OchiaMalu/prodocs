# this 关键字

对于 Java 而言，`this` 可以说是最麻烦一个关键字，但只要是代码开发，几乎都离不开 `this` 。在 Java 中 `this` 可以完成 3
件事情：<u>调用本类属性，调用本类方法，表示当前对象</u>。下面为读者分别讲解 `this` 的 3 种应用。

## 调用本类属性

在一个类的定义的方法中可以直接访问类中的属性，但是很多时候有可能会出现方法参数名称与属性名称重复的情况，所以此时就需要利用 `this.属性`
的形式明确地指明要调用的是类中的属性而不是方法的参数。下面通过代码来为读者验证这一问题。

```java
class Book {
    private String title;
    private double price;
    public Book(String title, double price) {
        title = title;			// 原本的目的是希望将构造方法中的title变量内容设置给title属性
        price = price;		// 原本的目的是希望将构造方法中的price变量内容设置给price属性
    }
    // setter、getter略
    public String getInfo() {
        return "书名：" + title + "，价格：" + price;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book("Java开发", 89.2);
        System.out.println(book.getInfo());
    }
}
```

本程序在 `Book` 类中直接定义了一个构造方法，其目的是希望通过构造方法为 `title` 和 `price` 两个属性进行赋值，但最终的结果发现并没有成功赋值，这是因为在
Java 中的变量使用具备 **就近取用** 的原则，在构造方法中已经存在 `title` 或 `price` 变量名称，所以如果直接调用 `title`
或 `price` 变量将不会使用类中的属性，只会使用方法中的参数，如图所示，所以此时 `Book` 类的构造方法是无法为 `title`或 `price`
属性赋值的。

<img src="http://niu.ochiamalu.fun/image-20240924130739922.png" alt="image-20240924130739922" style="zoom:80%;margin:0 auto" />

在这种情况下为了可以明确地找到要访问的变量属于类中的属性，需要在变量前加上 `this` ，这样就可以准确地进行属性的标记。

:::warning 访问类属性都要加上 `this`

很多初学者在编写代码时大部分都是以实现代码功能为主，并没有考虑过多的编写习惯。而笔者在这里需要提醒读者的是，为了减少不必要的麻烦，在类中访问属性时不管是否有重名的变量，一定要加上 `this` 。

:::

```java
class Book {
    private String title;
    private double price;
    public Book(String title, double price) {
        this.title = title;	// this.属性表示的是本类属性，这样即使与方法中的参数重名也可以明确定位
        this.price = price;	// this.属性表示的是本类属性，这样即使与方法中的参数重名也可以明确定位
    }
    // setter、getter略
    public String getInfo() {
        return "书名：" + title + "，价格：" + price;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book("Java开发", 89.2);
        System.out.println(book.getInfo());
    }
}
```

本程序由于构造方法中访问属性时增加了 `this` 关键字，所以可以在变量名称相同的情况下，明确地区分属性或参数，传递的内容也可以正常赋值。

## 调用本类方法

通过上一节的讲解，读者应该建立起这样一个概念， `this` 本质上指的就是明确进行本类结构的标记，而除了访问类中的属性外，也可以进行类中方法的调用。

在一个类中，主要就是两种方法（普通方法、构造方法），而要调用本类方法也就分为以下两种形式。

- 调用本类普通方法：在之前强调过，如果要调用本类方法，则可以使用 `this.方法()` 调用；
- 调用本类构造方法：在一个构造中要调用其他构造，可以使用 `this()` 调用。

```java
class Book {
    private String title;
    private double price;
    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
    public void print() {
        System.out.println("更多课程请访问：www.yootk.com") ;
    }
    // setter、getter略
    public String getInfo() {
        this.print() ;				// 调用本类方法
        return "书名：" + title + "，价格：" + price;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book("Java开发", 89.2);
        System.out.println(book.getInfo());
    }
}
```

本程序在 `getInfo()` 方法进行对象信息取得前，调用了本类中定义的 `print()`
方法，由于是在本类定义的，所以可以直接利用 `this.方法()` 的形式进行访问。

:::tip 可以直接访问本类方法

从代码的严格角度来讲，利用 `this.方法()`
调用本类中其他普通方法的做法是非常标准的，由于是在一个类中，也可以直接使用 `方法()`
的形式调用。但是从本书的编写习惯来讲都会使用 `this` 调用本类属性或本类方法。

:::

除了可以调用本类方法，在一个类中也可以利用 `this()` 的形式实现一个类中多个构造方法的互相调用。例如：一个类中存在 3
个构造方法<u>（无参，有一个参数，有两个参数）</u>，但是不管使用何种构造方法，都要求在实例化对象产生的时候输出一行提示信息： *
*一个新的Book 类对象产生** 。（假设这个信息等于 50 行代码），按照之前的学习，代码编写如下。

```java
class Book {
    private String title;
    private double price;
    public Book() {
        System.out.println("一个新的Book类对象产生。");	// 把这行语句想象成50行代码
    }
    public Book(String title) {
        System.out.println("一个新的Book类对象产生。");	// 把这行语句想象成50行代码
        this.title = title;
    }
    public Book(String title, double price) {
        System.out.println("一个新的Book类对象产生。");	// 把这行语句想象成50行代码
        this.title = title;
        this.price = price;
    }
    // setter、getter略
    public String getInfo() {
        return "书名：" + this.title + "，价格：" + this.price;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book("Java开发", 89.2);
        System.out.println(book.getInfo());
    }
}
```

本程序定义了 3 个构造方法，并且每一个构造方法上都会出现相应的信息提示。此时，不管调用哪一个构造方法，都可以完成指定的信息输出。如果假设将这一行输出的代码想象为
50
行代码的量，那么现在按照之前所学习到的知识来讲，程序中会出现大量的重复代码，而程序的设计目标是减少重复代码，则此时就可以利用 `this`
来完成。

```java
class Book {
    private String title;
    private double price;
    public Book() {
        System.out.println("一个新的Book类对象产生。");	// 把这行语句想象成50行代码
    }
    public Book(String title) {
        this() ;									// 调用本类无参构造方法
        this.title = title;
    }
    public Book(String title, double price) {
        this(title) ;								// 调用本类有一个参数的构造方法
        this.price = price;
    }
    // setter、getter略
    public String getInfo() {
        return "书名：" + this.title + "，价格：" + this.price;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book("Java开发", 89.2);
        System.out.println(book.getInfo());
    }
}
```

本程序在两个参数的构造方法中 `public Book(String title,double price){}` 使用 `this(title)`
调用了有一个参数的构造方法 `public Book(String title){}`
，而在一个参数的构造中调用了无参构造，这样不管调用哪个构造，都会执行特定功能（本次为输出操作)。

:::warning 关于 `this` 调用构造的限制

在使用`this` 调用构造方法时，存在两个重要的限制（这些都可以在程序编译时检查出来)：

- 使用 `this()` 调用构造方法形式的代码只能够放在构造方法的首行；
- 进行构造方法互相调用时，一定要保留调用的出口。

对于第一个限制相对而言比较好理解，因为构造方法是在类对象实例化时调用的，所以构造方法间的互相调用，就只能放在构造方法中编写。而第二个限制理解起来比较麻烦，下面通过代码来验证。

```java
class Book {
    private String title;
    private double price;
    public Book() {
        this("HELLO", 1.1);				 // 调用双参构造
        System.out.println("一个新的Book类对象产生。");
    }
    public Book(String title) {
        this(); 							// 调用本类的无参构造
        this.title = title;
    }
    public Book(String title, double price) {
        this(title); 						// 调用本类的单参构造
        this.price = price;
    }
    // setter、getter略
    public String getInfo() {
        return "书名：" + this.title + "，价格：" + this.price;
    }
}
```

此时调用的语句的确是放在了构造方法的首行，但是读者可以发现，此时会形成一个构造方法调用的死循环状态。所以在编译时就会出现错误提示 `构造方法递归调用`
，也就是说在使用 `this` 调用构造方法时，一定要留有出口，不允许出现循环调用的情况。

:::

实例：定义一个雇员类（编号、姓名、工资、部门），在这个类里提供了以下4个构造方法。

- 无参构造：编号为0，姓名为无名氏，工资为0.0，部门设置为“未定”；
- 单参构造（传递编号）：姓名为“临时工”，工资为800.0，部门为后勤；
- 双参构造（传递编号、姓名)：工资为2000.0，部门为技术部；
- 四参构造。

**实现方式一：** 按照传统的风格实现。

```java
class Emp {
    private int empno;
    private String enname;
    private double sal;
    private String dept;

    public Emp() {
        this.empno = 0;
        this.enname = "无名氏";
        this.sal = 0.0;
        this.dept = "未定";
    }

    public Emp(int empno) {
        this.empno = empno;
        this.enname = "临时工";
        this.sal = 800.0;
        this.dept = "后勤部";
    }

    public Emp(int empno, String enname) {
        this.empno = empno;
        this.enname = enname;
        this.sal = 2000.0;
        this.dept = "技术部";
    }

    public Emp(int empno, String enname, double sal, String dept) {
        this.empno = empno;
        this.enname = enname;
        this.sal = sal;
        this.dept = dept;
    }

    public String getInfo() {
        return "雇员编号:" + this.empno + ",姓名:" + this.enname
                + ",工资:" + this.sal + ",部门:" + this.dept;
    }
}

public class TestDemo {
    public static void main(String[] args) {
        Emp ea = new Emp();
        Emp eb = new Emp(7379);
        Emp ec = new Emp(7566, "ALLEN");
        Emp ed = new Emp(7839, "KING", 5000.0, "财务部");
        System.out.println(ea.getInfo());
        System.out.println(eb.getInfo());
        System.out.println(ec.getInfo());
        System.out.println(ed.getInfo());
    }
}
```

本程序首先分别利用不同的构造方法产生了 4 个实例化对象，然后分别调用 `getInfo()`
方法进行输出。虽然这个时候已经完成了开发的要求，但是却可以发现程序中存在重复的代码，很明显，这种包含重复代码的程序一定不符合实际的开发要求。

**实现方式二：** 利用构造方法互调用简化代码

```java
class Emp {
    private int empno;
    private String enname;
    private double sal;
    private String dept;

    public Emp() {
        this(0,"无名氏",0.0,"未定");
    }

    public Emp(int empno) {
        this(empno,"临时工",800.0,"后勤部");
    }

    public Emp(int empno, String enname) {
        this(empno,enname,2000.0,"技术部");
    }

    public Emp(int empno, String enname, double sal, String dept) {
        this.empno = empno;
        this.enname = enname;
        this.sal = sal;
        this.dept = dept;
    }

    public String getInfo() {
        return "雇员编号:" + this.empno + ",姓名:" + this.enname
                + ",工资:" + this.sal + ",部门:" + this.dept;
    }
}

public class TestDemo {
    public static void main(String[] args) {
        Emp ea = new Emp();
        Emp eb = new Emp(7379);
        Emp ec = new Emp(7566, "ALLEN");
        Emp ed = new Emp(7839, "KING", 5000.0, "财务部");
        System.out.println(ea.getInfo());
        System.out.println(eb.getInfo());
        System.out.println(ec.getInfo());
        System.out.println(ed.getInfo());
    }
}
```

此时通过 `this()` 语法的形式，很好地解决了构造方法中代码重复的问题。

## 表示当前对象

`this` 关键字在应用的过程中有一个最为重要的概念一当前对象，而所谓的当前对象指的就是当前正在调用类中方法的实例化对象，下面直接通过一个代码来观察。

:::tip 对象输出问题

实际上所有的引用数据类型都是可以打印输出的，默认情况下输出会出现一个对象的编码信息，这一点在范例中读者可以看见，而在本书第
4 章中会为读者详细解释对象打印输出问题。

:::

```java
class Book {
    public void print() {	// 调用print()方法的对象就是当前对象，this就自动与此对象指向同一块内存地址
        System.out.println("this = " + this);	// this就是当前调用方法的对象
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book booka = new Book();			// 实例化新的Book类对象
        System.out.println("booka = " + booka);	// 主方法中输出Book类对象
        booka.print();					// 调用Book类的print()方法输出，此时booka为当前对象
        System.out.println("---------------------------");
        Book bookb = new Book();			// 实例化新的Book类对象
        System.out.println("bookb = " + bookb);	// 主方法中输出Book类对象
        bookb.print();					// 调用Book类的print()方法输出，此时bookb为当前对象
    }
}
```

本程序首先实例化了两个 `Book`
类对象，然后在主方法中直接进行对象信息的输出。可以发现每个对象都有一个独立的对象编码，而在使用不同的对象调用 `print()`
方法时，`this` 的引用也会发生改变，即 `this` 为当前对象。

清楚了 `this` 表示当前对象这一基本特征后，实际上在之前出现的 `this.属性` 就属于当前对象中的属性，也就是 **堆内存** 中保存的内容。
