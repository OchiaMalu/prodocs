# 构造方法

如果要实例化新的对象，需要使用关键字 `new` 来完成，但是除了 `new`
这个关键字之外，还有可能在对象实例化时为其进行一些初始化的准备操作，这个时候就需要构造方法的支持。构造方法本身是一种特殊的方法，它只在新对象实例化的时候调用，其定义原则是：<u>
方法名称与类名称相同， **没有返回值类型** 声明，同时构造方法也可以进行重载</u>。

:::tip 构造方法一直存在

实际上在对象实例化的格式中就存在构造方法的使用，下面通过对象的实例化格式来分析。

①类名称 ②对象名称 = ③new ④<u>类名称()</u>；

- ①类名称：规定了对象的类型，即对象可以使用哪些属性与方法，都是由类定义的；
- ②对象名称：如果要想使用对象，需要有一个名字，这是一个唯一的标记；
- ③new:开辟新的堆内存空间，如果没有此语句，对象无法实例化；
- ④类名称()：调用了一个和类名称一样的方法，这就是构造方法。

通过以上的简短分析可以发现，所有的构造方法实际上一直在被我们调用。但是我们从来没有去定义一个构造方法，之所以能够使用构造方法，是因为在整个
Java 类中，为了保证程序可以正常的执行 <u>
即使用户没有定义任何构造方法，也会在程序编译之后自动地为类增加一个没有参数、没有方法名称、类名称相同、没有返回值的构造方法</u>。

:::

```java
class Book { 							// 定义一个新的类
    /**
     * Book类无参构造方法
     */
    public Book() {						// 构造方法
        System.out.println("************************");
    }
} 
public class TestDemo {
    public static void main(String args[]) {
        Book book = null ;					// 声明对象不调用构造
        book = new Book() ;				// 实例化对象调用构造
    }
}
```

本程序在 `Book` 类中定义了一个构造方法，可以发现构造方法的名称与 `Book`
类名称相同，没有返回值声明，并且构造方法只有在使用关键字 `new` 实例化对象时才会被调用一次。

:::tip 构造方法与普通方法的区别？

既然构造方法没有返回值，那么为什么不使用 `void` 来声明构造方法呢？普通方法不是也可以完成一些初始化操作吗？

**构造方法与普通方法的调用时机不同。**

首先在一个类中可以定义构造方法与普通方法两种类型的方法，但是这两种方法在调用时有明显的区别：

- 构造方法是在**实例化新对象**（new）的时候只调用一次；
- 普通方法是在实例化对象产生之后，通过 `对象方法` 调用多次。

如果在构造方法上使用了 `void` ，其定义的结构与普通方法就完全一样，而程序的编译是依靠定义结构来解析的，所以不能有返回值声明。

另外，类中构造方法与普通方法的最大区别在于：构造方法是在使用关键字 `new`
的时候直接调用的，是与对象创建一起执行的操作；要通过普通方法进行初始化，就表示要先调用无参构造方法实例化对象，再利用对象调用初始化方法就比较啰唆了。

:::

构造方法的主要功能是进行对象初始化操作，所以要是希望在对象实例化时进行属性的赋值操作，则可以使用构造方法完成。

```java
class Book { 							// 定义一个新的类
    private String title; 					// 书的名字
    private double price; 					// 书的价格
    /**
     * Book类构造方法，用于设置title与price属性的内容
     * @param t title属性内容
     * @param p price属性内容
     */
    public Book(String t,double p) {				// 定义构造方法
        setTitle(t) ;							// 调用本类方法
        setPrice(p) ;							// 调用本类方法
    }
    public void setTitle(String t) {				// 设置title属性内容
        title = t;
    }
    public void setPrice(double p) {				// 设置price属性内容
        price = p ;
    }
    public String getTitle() {					// 取得title属性内容
        return title;
    }
    public double getPrice() {					// 取得price属性内容
        return price;
    }
    public void getInfo() { 						// 此方法将由对象调用
        System.out.println("图书名称：" + title + "，价格：" + price);
    }
} 
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book("Java开发", 69.8); 	// 声明并实例化对象
        book.getInfo();						// 调用方法
    }
}
```

本程序在 `Book` 类中首先定义了一个两个参数的构造方法，这两个参数主要是接收 `title` 与 `price`
属性的内容，然后分别调用类中的`setter` 方法为属性赋值（也可以直接调用属性，不通过 `setter` 方法赋值)。

:::tip 构造方法的核心作用

在实际的工作中，构造方法的核心作用是，在类对象实例化时设置属性的初始化内容。构造方法是为属性初始化准备的。在本程序中由于已经明确地定义了一个有参构造方法，就不会再自动生成默认的构造方法，即一个类中至少保留有一个构造方法。

另外还需要提醒读者的是，此时类中的结构包含属性、构造方法、普通方法，而编写的时候一定要注意顺序：首先编写属性（必须封装，同时提供 `setter` 、 `getter`
的普通方法)，然后编写构造方法，最后编写普通方法。虽然这些与语法无关，但是每一个程序员都需要养成良好的编码习惯。

:::

构造方法本身也属于方法，所以可以针对构造方法进行重载。由于构造方法定义的特殊性，所以在构造方法重载时，要求只注意参数的类型及个数即可。

```java
class Book { 							// 定义一个新的类
    private String title; 					// 书的名字
    private double price; 					// 书的价格
    /**
     * Book类无参构造方法
     */
    public Book() {						// 无参的，无返回值的构造方法
        System.out.println("无参构造") ;
    }
    /**
     * Book类构造方法，用于设置title属性的内容
     * @param t title属性内容
     */
    public Book(String t) {					// 有一个参数的构造
        title = t ;						// 直接为属性赋值
        System.out.println("有一个参数的构造") ;
    }
    /**
     * Book类构造方法，用于设置title与price属性的内容
     * @param t title属性内容
     * @param p price属性内容
     */
    public Book(String t,double p) {			// 有两个参数的构造
        title = t ;						// 直接为属性赋值
        price = p ;						// 直接为属性赋值
        System.out.println("有两个参数的构造") ;
    }
    // setter、getter略
    public void getInfo() { 					// 此方法将由对象调用
        System.out.println("图书名称：" + title + "，价格：" + price);
    }
} 
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book("Java开发");	// 声明并实例化对象
        book.getInfo();					// 调用方法
    }
}
```

本程序首先在 `Book` 类中将构造方法重载了3次，然后在主类中将调用有一个参数的构造，这样只会为 `title` 属性赋值，而 `price`
属性为其对应数据类型的默认值。

:::warning 注意编写顺序

在一个类中对构造方法重载时，所有的重载的方法按照参数的个数由多到少，或者是由少到多排列。以下两种排列方式都是规范的。

```java
public Book(){}
public Book(String t){}
public Book(String t,price p){}

public Book(String t,price p){}
public Book(String t){}
public Book(){}
```

以上两种写法都是按照参数的个数进行排列的，但是以下写法就属于不规范定义。

```java
public Book(String t){}
public Book(String t,price p){}
public Book(){}
```

当然，编写不规范并不表示是语法错误，上面的 3 种定义全部都是正确的，但是考虑到程序阅读的方便，请严格遵守按照编写顺序排列的规定

:::

:::tip 关于属性默认值的问题

在定义一个类时，可以为属性直接设置默认值，但是这个默认值只有在构造执行完才会设置，否则不会设置。而构造方法属于整个对象构造过程的最后一步，即是留给用户处理的步骤。

在对象实例化的过程中，一定会经历 `类的加载` 、 `内存的分配` 、 `默认值的设置` 、 `构造方法` 。

```java
class Book{
	private String title = "Java 开发";
	public Book(){}
}
```

在本程序中，只有在整个构造都完成后，才会真正将 `Java开发` 这个字符串的内容设置给 `title`
属性。构造完成之前（在没有构造之前，而不是指的构造方法） `title`
都是其对应数据类型的默认值。对于这一点现在还无法验证，但是在后续讲解 `抽象类` 时读者将会看到与之对应的解答。

:::
