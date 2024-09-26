# 对象比较

如果有两个数字要判断是否相等，可以使用 `==` 完成，如果是字符串要判断是否相等可以使用 `equals()`
，但是如果有一个自定义的类，要想判断它的两个对象是否相等，那么必须要<u>实现类对象中所有属性内容的比较</u>。

```java
class Book {
    private String title;
    private double price;
    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
    public String getTitle() {
        return this.title;
    }
    public double getPrice() {
        return this.price;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book b1 = new Book("Java开发", 79.8);				// 实例化Book类对象
        Book b2 = new Book("Java开发", 79.8);				// 实例化Book类对象
        if (b1.getTitle().equals(b2.getTitle())
              && b1.getPrice() == b2.getPrice()) {			// 属性比较
           System.out.println("是同一个对象！");
        } else {
           System.out.println("不是同一个对象！");
        }
    }
}
```

本程序在主方法中产生了两个 `Book` 类对象，同时这两个 `Book`
类对象的属性都完全一样，但是要想判断这两个对象是否相等，则依然需要取出对象中的每一个属性进行比较，如果所有属性的内容相同则认为是同一个对象，否则认为是不同的对象。

:::warning String 类中的 `equals()` 方法也属于对象比较操作

在 `String` 类中定义的 `equals()` 方法虽然讲解的功能是在进行对象比较操作时使用，但是严格意义上来讲 `String`
是一个类，所以`equals()` 完成的就是对象比较操作，可以发现在 `equals()` 方法中具备 `null` 的验证，如果判断数据为 `null`
则直接返回 `false` 。

:::

本程序的确实现了两个对象的比较操作，但是程序代码在进行对象比较的过程中，采用了客户端（第三方，主方法或主类可以理解为客户端）完成的判断，很明显不适合，因为这种比较的操作应该是每一个对象自己所应该具备的功能，应该由本类完成。

:::tip 关于封装属性在类内部的直接访问问题

如果一个类中的属性使用了 `private` 封装，那么在类的外部不能通过对象直接调用属性。

但是如果将一个对象传递回类的方法里，就相当于取消了封装的形式，可以直接通过对象访问属性。

```java
class Info {
    private String msg = "Hello";
    public void print() {
        System.out.println("msg = " + msg);
    }
    public void fun(Info temp) {		// 本类接收本类对象
        temp.msg = "修改内容";		// 在类的内部直接利用对象访问私有属性
    }
}
public class Demo {
    public static void main(String args[]) {
        Info x = new Info();
        x.fun(x); 				// 没有意义，只是一个语法验证
        x.print();
    }
}
```

本程序直接在 `Info` 类的 `fun()` 方法中接收了一个 `Info` 类的属性（接收本类引用)，由于 `fun()` 方法属于 `Info`
类的内部方法，所以在这个方法中可以直接利用对象访问类中的属性。不过范例的代码没有什么实际的意义，主要是为了验证 `private`
属性封装以及引用传递的问题，目的也是为范例讲解的对象比较进行铺垫。

:::

```java
class Book {
    private String title ;
    private double price ;
    public Book(String title,double price) {
        this.title = title ;
        this.price = price ;
    }
    /**
     * 进行本类对象的比较操作，在比较过程中首先会判断传入的对象是否为null，然后判断地址是否相同
     * 如果都不相同则进行对象内容的判断，由于compare()方法接收了本类引用，所以可以直接访问私有属性
     * @param book 要进行判断的数据
     * @return 内存地址相同或者属性完全相同返回true，否则返回false
     */
    public boolean compare(Book book) {
        if (book == null) {						// 传入数据为null
           return false ;						// 没有必要进行具体的判断
        }
        // 执行“b1.compare(b2)”代码时会有两个对象
        // 当前对象this（调用方法对象，就是b1引用）
        // 传递的对象book（引用传递，就是b2引用）
        if (this == book) {						// 内存地址相同
           return true ;						// 避免进行具体细节的比较，节约时间
        }
        if (this.title.equals(book.title)
           && this.price == book.price) {		// 属性判断
           return true ;
        } else {
           return false ;
        }
    }
    // setter、getter略
}
public class TestDemo {
    public static void main(String args[]) {
        Book b1 = new Book("Java开发",79.8) ;		// 实例化Book类对象
        Book b2 = new Book("Java开发",79.8) ;		// 实例化Book类对象
        if (b1.compare(b2)) {					// 对象比较 
           System.out.println("是同一个对象！") ;
        } else {
           System.out.println("不是同一个对象！") ;
        }
    }
}
```

本程序直接在 `Book` 类的内部定义了一个 `compare()`
方法，而此方法完成的功能就是进行比较，而且当一个类接收了本类对象的引用后，可以直接调用本类中的私有化操作。所以这个时候对于 `compare()`
方法就有了两个实例化对象，一个为传入的 `Book` 类对象，另一个为当前对象 `this` 。通过本程序，读者也可以发现对象比较的操作有如下
4 个特点。

- 本类接收自己的引用，再与本类当前对象(this)进行比较；
- 为了避免 `NullPointerException` 的产生，应该增加一个 `null` 的判断；
- 为了防止浪费性能的情况出现（要判断的属性会多），可以增加地址数值的判断，因为相同的对象地址相同；
- 进行属性的依次比较，如果属性全部相同，则返回 `true` ，否则返回 `false` 。

:::tip 对象比较操作很重要

对象比较操作，可以说是开发中最为重要的一种操作概念，虽然代码本身不难，但是在对象比较中，可以清楚地发现 `this`
表示当前对象这一概念的使用，关于对象比较操作的具体完善，将在 `Object` 一节中为读者讲解。

:::

