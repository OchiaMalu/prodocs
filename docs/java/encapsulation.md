# 封装性初步分析

`封装` 属于面向对象的 **第一大特性**
，但是本节所讲解的封装只是针对其中的一点进行讲解，而对于封装操作由于涉及的内容过多，后面会有完整的介绍。在讲解封装操作之前，首先先要来解决一个问题：<u>
为什么要有封装</u>？

```java
class Book { 						// 定义一个新的类
    String title; 					// 书的名字
    double price; 					// 书的价格
    public void getInfo() { 				// 此方法将由对象调用
        System.out.println("图书名称：" + title + "，价格：" + price);
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book();		// 声明并实例化对象
        book.title = "Java开发";			// 设置属性内容
        book.price = -89.9;			// 设置属性内容
        book.getInfo();				// 调用方法
    }
}
```

本程序首先声明并实例化了一个 `book`
对象，然后分别设置属性的内容。但是这个时候读者可以发现，此时的代码没有任何语法错误，却存在业务逻辑上的错误，因为没有任何一本书的价钱是负数。造成这种错误的关键在于没有检查要设置的内容，就直接将内容赋予了属性，这样肯定是不合理的。

:::tip 关于 `业务` 的初步解释

刚刚接触到软件行业的读者可能会不理解 `业务`
的概念，而这一概念是进行商业化软件开发中最为重要的概念，所谓的业务就是指代码要做哪些事情以及怎么做的流程描述。例如：现在需要跟领导报销出差费用，就需要填写报销申请单、找领导签字、找财务领钱，这就是一个最基本的业务，而在现实的开发之中，业务的设计要比这复杂的多。读者随着技术经验的提升也会有更多的领悟。

在本书的后续将为读者详细讲解业务设计的问题。

:::

就好比银行，每一个储户不可能自己直接去操作金库，必须由银行业务人员依照业务标准才可以进行金钱的操作，并且每一步操作都需要进行检查，而检查的第一步是需要让用户看不见操作的东西，那么在这种情况下，就可以使用 `private`
关键字进行封装，将类中的属性进行私有化的操作。

```java
class Book { 						// 定义一个新的类
    private String title; 				// 书的名字
    private double price; 				// 书的价格
    public void getInfo() { 				// 此方法将由对象调用
        System.out.println("图书名称：" + title + "，价格：" + price);
    }
} 
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book();		// 声明并实例化对象
        book.title = "Java开发";			// 设置属性内容
        book.price = -89.9;			// 设置属性内容
        book.getInfo();				// 调用方法
    }
}
```

本程序在声明 `Book` 类的属性时使用了 `private` 关键字，这样就表示 `title` 与 `price` 两个属性只能够在 `Book`
类中被访问，而其他类不能直接进行访问，所以在主类中使用 `Book` 类对象直接调用 `title` 与 `price`
属性时就会在编译时出现语法错误。如果要想让程序可以正常使用，必须想办法让外部的程序可以操作类的属性。所以在开发中，针对属性有这样一种定义：
**所有在类中定义的属性都要求使用`private` 声明，如果属性需要被外部所使用，那么按照要求定义相应的 `setter` 、 `getter`
方法。下面以 `String title` 为例进行说明。**

- `setter` 方法主要是设置内容：`public void setTitle(String t)` ，有参；
- `getter` 方法主要是取得属性内容： `public String getTitle()` ，无参。

```java
class Book { 							// 定义一个新的类
    private String title; 					// 书的名字
    private double price; 					// 书的价格
    /**
     * 设置或修改title属性内容
     * @param t 接收要设置的数据
     */
    public void setTitle(String t) {			// 设置title属性内容
        title = t;
    }
    /**
     * 设置或修改price属性内容
     * @param p 接收要设置的数据
     */
    public void setPrice(double p) {			// 设置price属性内容
        if (p > 0.0) {						// 进行数据验证
           price = p ;
        }
    }
    /**
     * 取得title属性内容
     * @return title属性数据
     */
    public String getTitle() {				// 取得title属性内容
        return title;
    }
    /**
     * 取得price属性内容
     * @return price属性数据
     */
    public double getPrice() {				// 取得price属性内容
        return price;
    }
    /**
     * 输出对象完整信息
     */
    public void getInfo() { 					// 此方法将由对象调用
        System.out.println("图书名称：" + title + "，价格：" + price);
    }
} 
public class TestDemo {
    public static void main(String args[]) {
        Book book = new Book();			// 声明并实例化对象
        book.setTitle("Java开发");			// 设置属性内容
        book.setPrice(-89.9);				// 设置属性内容
        book.getInfo();					// 调用方法
    }
}
```

本程序在定义 `Book` 类时，为封装的 `title` 与 `price` 两个属性分别定义了各自的 `setter` 、`getter`
操作方法（可以在进行属性赋值时进行数据的检查），这样在主类访问属性时就可以利用 `Book`
类对象调用相应的方法进行设置。由于使用 `private` 封装的属性可以在`Book` 类中直接进行访问，所以 `Book` 类中的 `getInfo()`
方法并没有进行任何修改。

:::tip 本程序没有使用到 `getter` 方法，是否可以不定义？

**必须定义，不管当前是否使用。**

实际上属性使用 `private` 封装后的 `setter` 、 `getter` 是项目开发中的标准做法。在本程序中由于 `Book` 类提供有 `getInfo()`
方法，所以就直接利用此方法进行内容的输出。但是对于 `Book` 类的使用还可能出现单独取得属性的情况，所以 `getter` 、 `setter`
必须同时提供。

另外需要提醒读者的是，本书为了讲解方便，在 `setPrice()`
方法中增加了数据的验证功能，但是这样的验证严格来讲并不标准。对于数据的验证部分，在标准开发中应该由其他辅助代码完成。而在实际开发中， `setter`
往往是简单的设置数据， `getter` 只是简单的取得数据而已。

:::
