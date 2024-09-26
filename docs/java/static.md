# static 关键字

读者对于 `static` 关键字应该并不陌生，从第一个 Java
程序，到现在一直都可以见到该关键字 `public static void main(String args)` 。在 Java 中， `static`
关键字可以用于定义属性及方法，下面来为读者讲解这个关键字的使用。

## static 定义属性

一个类的主要组成就是属性和方法（分为构造方法与普通方法两种），而每一个对象都分别拥有各自的属性内容（不同对象的属性保存在不同的堆内存中)
，如果类中的某个属性希望定义为 **公共属性** （所有对象都可以使用的属性），则可以在声明属性前加上 `static` 关键字。

```java
class Book {							// 描述的是同一个出版社的信息
    private String title ;					// 普通属性
    private double price ;					// 普通属性
    static String pub = "清华大学出版社" ;	 	// 定义一个描述出版社信息的属性，为操作方便，暂不封装
    public Book(String title,double price) {
        this.title = title ;
        this.price = price ;
    }
    public String getInfo() {
        return "图书名称：" + this.title + "，价格：" + this.price + "，出版社：" + this.pub ;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book ba = new Book("Java开发",10.2) ;		// 实例化Book类对象
        Book bb = new Book("Android开发",11.2) ;	// 实例化Book类对象
        Book bc = new Book("Oracle开发",12.2) ;	// 实例化Book类对象
        ba.pub = "北京大学出版社" ;				// 修改了一个属性的内容
        System.out.println(ba.getInfo()) ;
        System.out.println(bb.getInfo()) ;
        System.out.println(bc.getInfo()) ;
    }
}
```

本程序在定义 `Book` 类的时候提供了一个 `static`
属性，而这个属性将成为公共属性，也就是说有任何一个对象修改了此属性的内容都将影响其他对象。本程序在主方法中利用 `ba`
对象修改了 `pub` 属性，所以其他两个对象的 `pub` 内容都发生了改变。本程序的内存关系如图所示。

<img src="http://niu.ochiamalu.top/image-20240924152612804.png" alt="image-20240924152612804" style="zoom:80%;margin:0 auto" />

:::tip 常用内存区域

在 Java 中主要存在 4 块内存空间，这些内存空间的名称及作用如下。

- 栈内存空间：保存所有的对象名称（更准确的说是保存引用的堆内存空间的地址）；
- 堆内存空间：保存每个对象的具体属性内容；
- 全局数据区：保存 `static` 类型的属性；
- 全局代码区：保存所有的方法定义。

:::

既然 `static` 是一个公共属性的概念，那么如果只是简单地由一个对象去修改 `static`
属性的做法很不合适，最好的做法是由所有对象的公共代表来进行访问，这个公共代表就是类。所以利用 `static` 定义的属性是 *
*可以由类名称直接调用** 的。

> Book.pub = "北京大学出版社";

此时 `Book` 类中定义了 `pub` 的 `static` 属性（没有封装），所以可以利用 `Book` 类直接调用 `static` 的 `pub` 属性。

`static` 属性与非 `static` 属性还有一个最大的区别，所有的非 `static` 属性必须产生实例化对象才可以访问，但是 `static`
属性不受实例化对象的控制，也就是说，在没有实例化对象产生的情况下，依然可以使用 `static` 属性。

```java
public class TestDemo {
    public static void main(String args[]) {
        System.out.println(Book.pub) ;			// 在没有实例化对象的情况下直接输出属性内容
        Book.pub = "北京大学出版社" ;			// 修改static属性内容
        Book ba = new Book("Java开发",10.9) ;		// 实例化Book类对象
        System.out.println(ba.getInfo()) ;			// 输出Book类对象信息
    }
}
```

通过本程序可以发现，在没有实例化对象产生时，依然可以直接利用 `Book` 类输出或设置 `static`
属性的内容，并且此修改的结果将影响以后的 `Book` 类对象。

:::tip 什么时候使用 `static` 定义属性？

在一个类中存在 `static` 属性和非 `static` 属性，如果要定义属于自己的类，那么该如何选择？

**优先考虑非 `static` 属性。**

在编写的代码中，`static`
定义的属性出现几率并不是很高，一般只有在描述共享属性概念或者是不受实例化对象限制的属性时才会使用`static`
定义属性，而大部分情况下依然都使用非 `static` 属性。

:::

## static 定义方法

在定义类的普通方法时可以使用 `static` 进行定义，很明显，使用 `static` 定义的方法也可以在没有实例化对象产生的情况下由类名称直接进行调用。

```java
class Book {								// 描述的是同一个出版社的信息
    private String title ;
    private double price ;
    private static String pub = "清华大学出版社" ;	 // 定义一个描述出版社信息的属性
    public Book(String title,double price) {
        this.title = title ;
        this.price = price ;
    }
    public static void setPub(String p) {			// 定义static方法可以由类名称直接调用
        pub = p ;
    }
    public String getInfo() {
        return "图书名称：" + this.title + "，价格：" + this.price + "，出版社：" + this.pub ;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book.setPub("北京大学出版社") ;			// 在没有对象产生的时候进行调用
        Book ba = new Book("Java开发",10.2) ;		// 实例化Book类对象
        Book bb = new Book("Android开发",11.2) ;	// 实例化Book类对象
        Book bc = new Book("Oracle开发",12.2) ;	// 实例化Book类对象
        System.out.println(ba.getInfo()) ;
        System.out.println(bb.getInfo()) ;
        System.out.println(bc.getInfo()) ;
    }
}
```

本程序对 `Book` 类中的 `pub` 属性继续封装，所以专门定义了一个 `setPub()` 的 `static`
方法，这样就可以通过类名称直接调用 `setPub()` 方法来修改 `pub` 属性内容。

可以发现 `static`
定义的属性和方法都不受实例化对象的控制，也就是说都属于独立类的功能。但是这个时候会出现一个特别麻烦的问题：此时类中的方法就变为 `static`
方法和非 `static` 方法两组。这两组方法间的访问也将受到如下限制。

- `static` 方法不能直接访问非 `static` 属性或方法，只能调用 `static` 属性或方法；
- 非 `static` 方法可以访间 `static` 的属性或方法，不受任何的限制。

:::tip 关于 `static` 方法访问限制的说明

之所以会存在上述操作限制，原因有以下两点。

- 所有的非 `static` 定义的结构，必须在类已经明确产生实例化对象时才会分配堆空间，才可以使用；
- 所有的 `static` 定义的结构，不受实例化对象的控制，即可以在没有实例化对象的时候访问。

:::

:::tip 关于主方法的操作问题

在最早讲解方法的时候曾经讲解过：如果一个方法定义在主类中，并且由主方法直接进行调用的话，方法语法如下：

> public static 返回值类型 方法名称 (参数类型 参数，...){
>
> ​    [return [返回值];]
>
> }

后来到了编写类的时候，发现方法的定义格式改变（方法由对象调用）。

> public 返回值类型 方法名称 (参数类型 参数，...){
>
> ​    [return [返回值];]
>
> }

```java
public class TestDemo {
    public static void main(String args[]) {		// static定义的方法
        fun();							// static方法调用static方法
    }
    public static void fun() {				// static定义的方法
        System.out.println("Hello World !");
    }
}
```

由于主方法存在 `static` 声明，所以主方法就是一个 `static` 方法，而 `static` 方法只能调用 `static`
声明的方法，这样在定义 `fun()` 方法时就必须使用 `static` 关键字。

如果此时 `fun()` 方法取消了 `static` ，就变为一个非 `static` 方法。所有的非 `static`
方法必须由对象调用，也就是说此时 `static` 方法如果要想使用非 `static` 操作，就必须产生对象才可以调用。

```java
public class TestDemo {
    public static void main(String args[]) {	// static定义的方法
        new TestDemo().fun();			// 对象调用方法
    }
    public void fun() {				// 非static定义的方法
        System.out.println("Hello World !");
    }
}
```

此时在 `TestDemo` 类中定义的是一个非 `static` 的 `fun()` 方法，所以主方法如果想访问，就必须通过实例化对象进行调用。

:::

:::tip 类中什么时候定义 `static` 方法？

产生实例化对象是因为在堆内存中可以保存属性信息，所以如果一个类中没有属性产生，就自然也没有必要去开辟堆内存保存属性内容了，所以这个时候就可以考虑类中的方法全部使用 `static`
声明。

```java
class MyMath {					// 数学操作类，类中没有属性
    public static int add(int x, int y) {	// 只是一个加法操作
        return x + y;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        System.out.println(MyMath.add(10, 20));	// 直接调用
    }
}
```

此时 `MyMath` 类没有属性，产生对象完全没有任何意义，所以就使用 `static`
关键字定义方法。而这样的情况出现较少，所以在开发中读者在定义类中的方法时应该以非 `static` 方法为优先考虑。

:::

## 主方法

Java 语言最大的特点就在于主方法，因为在 Java 中的主方法的组成单元很多。下面介绍每一个组成单元的含义。

- public：主方法是程序的开始，所以这个方法对任何操作都一定是可见的，既然是可见的就必须使用public（公共)。
- static：证明此方法由类名称调用；
- void：主方法是一切执行的开始点，既然是所有的开头，就不能够回头，直到执行完毕为止；
- main：是一个系统规定好的方法名称，不能修改；
- String args[]：指的程序运行时传递的参数，格式为：`java 类名称 参数 参数 参数`。

```java
public class TestDemo {
    public static void main(String args[]) {
        for (int x = 0; x < args.length; x++) {	// 循环输出参数
            System.out.println(args[x]);
        }
    }
}
```

通过本程序可以发现，如果要为程序运行输入参数，只需要在执行时配置即可，不同的参数之间使用空格分隔，而如果配置的参数本身就包含空格，则可以使用 `" "`
声明，例如： `java TestDemo "Hello yootk" "Hello mldn"` 。

## static 的实际应用

通过之前的讲解，可以发现 `static` 关键字具备如下特点。

- 不管有多少个对象，都使用同一个 `static` 属性；
- 使用 `static` 方法可以避免实例化对象调用方法的限制。

下面依照这两个特点来研究 `static` 的实际作用

**功能一：** 实现类实例化对象个数的统计。

希望每当实例化一个类对象时都可以打印一个信息：产生第 x 个实例化对象。

因为只要是新的实例化对象产生了，就一定会去调用类中的构造方法，所以可以在构造方法里面增加一个统计数据的操作，每当新对象产生后统计的内容就自增一个。

```java
class Book{
    private static int num=0;
    public Book() {
        num++;
        System.out.println("这是第"+num+"个产生的对象!");
    }
}

public class TestDemo {
    public static void main(String[] args) {
        new Book();new Book();new Book();
        new Book();new Book();new Book();
    }
}
```

本程序在构造方法中进行了实例化对象个数的统计操作，所以每当调用构造方法时都会相应地进行统计个数的修改。

:::tip 此处只能够实现个数增加

在本程序中构造方法主要是创建新对象时调用的，所以可以通过构造方法实现对象个数的统计，但是当某一个对象不再使用时，应该进行实例化对象个数的减少，而这一执行操作，读者可以通过学习 `finalize()`
方法后实现。

:::

**功能二：** 实现属性的自动设置。

例如，某一个类有一个无参构造方法，一个有参构造方法。有参构造的主要目的是传递一个 `title`
属性，但是希望不管调用的是无参的还是有参的构造方法，都可以为 `title` 设置内容（尽量不使用重复的内容设置)。

```java
class Book {
    private String title;
    private static int num = 0;

    public Book() {
        this("NOTITLE - " + num++);
    }

    public Book(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}

public class TestDemo {
    public static void main(String[] args) {
        System.out.println(new Book("Java").getTitle());
        System.out.println(new Book().getTitle());
        System.out.println(new Book().getTitle());

    }
}
```

本程序提供了两个构造方法，如果调用有参构造方法则会将指定的内容赋值给 `title` 属性，而如果调用的是无参构造， `title`
属性会采用自动命名的方式配置，所以就算是没有设置 `title` 属性的内容，最终的结果也不会是 `null` 。
