# 匿名对象

按照之前的内存关系来讲，对象的名字可以解释为在 `栈内存` 中保存，而对象的具体内容（属性）在 `堆内存`
中保存，这样一来，没有栈内存指向堆内存空间，就是一个 `匿名对象` ，如图所示。

<img src="http://niu.ochiamalu.top/image-20240922204745487.png" alt="image-20240922204745487" style="zoom:80%;margin:0 auto" />

```java
class Book { 									// 定义一个新的类
    private String title; 							// 书的名字
    private double price; 							// 书的价格
    public Book(String t,double p) {					// 有两个参数的构造
        title = t ;								// 直接为属性赋值
        price = p ;								// 直接为属性赋值
    }
    // setter、getter略
    public void getInfo() { 							// 此方法将由对象调用
        System.out.println("图书名称：" + title + "，价格：" + price);
    }
} 
public class TestDemo {
    public static void main(String args[]) {
        new Book("Java开发", 69.8).getInfo();			// 匿名对象
    }
}
```

本程序通过匿名对象调用了类中的方法，但由于匿名对象没有对应的栈内存指向，所以只能使用一次，一次之后就将成为垃圾，并且等待被
GC 回收释放。

:::tip 什么时候使用匿名对象？

**是否使用匿名对象要看用户需求。**

有些读者可能并不习惯于这种匿名对象的使用，并且会觉得通过匿名对象调用方法的操作有些难以理解，所以并没有强制性地向读者推荐一定要使用匿名对象，不习惯的读者可以继续像之前那样声明并实例化对象进行操作，但是对于匿名对象的定义读者必须清楚，<u>
开辟了堆内存空间的实例化对象，只能使用一次，使用一次之后就将被 GC 回收</u>。

:::

