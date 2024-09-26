# 引用传递

引用传递是 Java 中最让初学者费解的概念，而在实际的开发中，引用传递又有着非常重要的作用。为了让读者可以更好地理解引用传递的相关概念，本节将针对引用传递的使用进行完整分析，同时给读者讲解引用传递在实际开发中的操作意义。

## 引用传递的基本概念

```java
class Message {
    private int num = 10;						// 定义int基本类型的属性
    /**
     * 本类没有提供无参构造方法，而是提供有参构造，可以接收num属性的内容
     * @param num 接收num属性的内容
     */
    public Message(int num) {
        this.num = num;						// 为num属性赋值
    }
    public void setNum(int num) {
        this.num = num;
    }
    public int getNum() {
        return this.num;
    }
}

public class TestDemo {
    public static void main(String args[]) {
        Message msg = new Message(30);			// 实例化Message类对象同时传递num属性内容
        fun(msg); 							// 引用传递
        System.out.println(msg.getNum());			// 输出num属性内容
    }
    /**
     * 修改Message类中的num属性内容
     * @param temp Message类的引用
     */
    public static void fun(Message temp) {
        temp.setNum(100);					// 修改num属性内容
    }
}
```

本程序首先在 `Message` 类中只定义了一个 `num` 属性（ `int` 为基本数据类型)，然后利用 `Message` 类的构造方法进行 `num`
属性的赋值操作，最后在主方法中调用了 `fun()` 方法，在 `fun()` 方法的参数上接收了 `Message` 类对象的引用，以便可以修改 `num`
属性的内容。而当 `fun()` 方法执行完毕后 `temp` 断开与堆内存的引用，但是对于堆内存的修改却保存了下来，所以最终的结果是
100。本程序的内存关系如图所示。

<img src="http://niu.ochiamalu.top/image-20240924135941368.png" alt="image-20240924135941368" style="zoom:80%;margin:0 auto" />

第一道引用范例是一个标准的引用传递操作，即不同的栈内存指向了 **同一块**
堆内存空间，但是在进行引用分析中不得不去考虑一种特殊的类一 `String` 类。

```java
public class TestDemo {
    public static void main(String args[]) {
        String msg = "Hello";				// 定义String类对象
        fun(msg);						// 引用传递
        System.out.println(msg);			// 输出msg对象内容
    }
    public static void fun(String temp) {		// 接收字符串引用
        temp = "World";					// 改变字符串引用
    }
}
```

本程序首先定义了一个 `String` 类的对象，内容为 `Hello` ，然后将此对象的引用传递给 `fun()` 方法中的 `temp` ，即两个 `String`
类对象都指向着同一个堆内存空间，但是由于 `String` 对象内容的变化是通过引用的改变实现的，所以在 `fun()`
方法中所做的任何修改都不会影响到原本的 `msg` 对象内容，最终的结果依然是 `Hello` 。本程序的内存分析如图所示。

<img src="http://niu.ochiamalu.top/image-20240924140850678.png" alt="image-20240924140850678" style="zoom:80%;margin:0 auto" />

在本程序中主要的解决方案就是：字符串内容不可改变，`String`
类对象内容的改变是通过引用的变更实现的，但是所有的变更都是在`fun()` 方法中完成的，一旦 `fun()` 方法执行完毕 `temp`
将失效，其对应的堆内存也将成为垃圾。

:::tip 简单理解String的引用传递

很多读者学习到此处都会觉得理解起来有一些困难，在这里笔者分享一个简单的思考方法：不把 `String`
作为引用类型分析，而是作为基本类型分析，下面来看一个对比。

```java
public class TestDemo {
    public static void main(String args[]) {
        int msg = 10 ;						// 基本数据类型
        fun(msg);							// 数值传递
        System.out.println(msg);				// 输出msg变量内容
    }
    public static void fun(int temp) {				// 接收数据内容
        temp = 100;							// 改变变量内容
    }
}
```

基本数据类型在进行参数传递时使用的是值传递，所以在 `fun()` 方法中所做的任何修改都不会影响原始的 `msg`
变量内容。实际上 `String` 虽然是引用类型，但是其最终的实现效果与本程序是类似的（String对象修改时要改变引用关系)
，所以最简单的理解就是不把`String` 当成引用类型而是当成基本数据类型那样使用。

:::

以上两道范例的程序代码，第一道利用 `Message` 类的对象实现引用传递，而第二道直接利用 `String`
类对象实现引用，那么接下来将前两道范例结合在一起来观察引用传递。

```java
class Message {
    private String info = "此内容无用" ;				// 定义String类型属性		
    public Message(String info) {					// 利用构造方法设置info属性内容
        this.info = info ;
    }
    public void setInfo(String info) {
        this.info = info ;
    }
    public String getInfo() {
        return this.info ;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Message msg = new Message("Hello") ;			// 实例化Message类对象
        fun(msg) ;								// 引用传递
        System.out.println(msg.getInfo()) ;				// 输出info属性内容
    }
    public static void fun(Message temp) {				// 接收Message类引用
        temp.setInfo("World") ;						// 修改info属性内容
    }
}
```

本程序首先在Message类中定义了一个 `String` 类型的 `info` 属性，然后在主方法中实例化 `Message` 类对象 `msg`
，最后将此对象传递到 `fun()` 方法中。此时 `temp` 与 `msg` 将具备同一块堆内存空间的引用，而在 `fun()`
方法中修改了指定空间的 `info` 属性内容，所以最终的 `info` 的结果为 `World` 。本程序的内存关系如图所示。

<img src="http://niu.ochiamalu.top/image-20240924141425687.png" alt="image-20240924141425687" style="zoom:80%;margin:0 auto" />

实际所示的内存分析模式与第一道范例区别不大，唯一的区别是将 `int` 数据类型替换为 `String` 数据类型，由于此时 `info`
属性是定义在 `Message` 类中的，所以在 `fun()` 方法中对 `info` 的修改可以被保存下来。严格地讲，上述程序应该用下图所示的内存关系图来描述。

<img src="http://niu.ochiamalu.top/image-20240924141611705.png" alt="image-20240924141611705" style="zoom: 80%;margin:0 auto" />

## 引用传递的实际应用

面向对象是一种可以抽象化描述现实社会事物的编程思想，理论上现实生活中的一切都可以进行合理的抽象。下面实现这样一种类的设计：假如每一个人都有一辆汽车或都没有汽车。很明显，人应该是一个类，而车也应该是一个类，人应该包含一个车的属性，而反过来车也应该包含一个人的属性，面对这样的关系就可以采用图所示的引用方式来完成。

<img src="http://niu.ochiamalu.top/image-20240924142254637.png" alt="image-20240924142254637" style="zoom:80%;margin:0 auto" />

```java
class Member {
    private int mid;			// 人员编号
    private String name;		// 人员姓名
    private Car car; 			// 表示属于人的车，如果没有车则内容为null
    public Member(int mid, String name) {
        this.mid = mid;
        this.name = name;
    } 
    public void setCar(Car car) {
        this.car = car ;
    }
    public Car getCar() {
        return this.car ;
    }
    public String getInfo() {
        return "人员编号：" + this.mid + "，姓名：" + this.name;
    }
}
class Car {
    private Member member; 		// 车属于一个人，如果没有所属者，则为null
    private String pname;			// 车的名字
    public Car(String pname) {
        this.pname = pname;
    } 
    public void setMember(Member member) {
        this.member = member ;
    }
    public Member getMember() {
        return this.member ;
    }
    public String getInfo() {
        return "车的名字：" + this.pname;
    }
}
```

本程序类完成后，需要对程序进行测试，而程序的测试要求分为以下两步。

- 第一步：根据定义的结构关系设置数据；
- 第二步：根据定义的结构关系取出数据。

```java
public class TestDemo {
    public static void main(String args[]) {
        // 第一步：根据既定结构设置数据
        Member m = new Member(1,"李兴华") ;			// 独立对象
        Car c = new Car("八手奥拓100") ;				// 独立对象
        m.setCar(c) ;								// 一个人有一辆车
        c.setMember(m) ;							// 一辆车属于一个人
        // 第二步：根据既定结构取出关系
        System.out.println(m.getCar().getInfo()) ;		// 通过人找到车的信息
        System.out.println(c.getMember().getInfo()) ;		// 通过车找到人的信息
    }
}
```

本程序首先实例化了 `Member` 与 `Car` 各自的对象，然后分别利用各自类中的 `setter` 方法设置了对象间的引用关系。

:::tip 关于数据类型的问题

读者一定要清楚一件事情，类是引用数据类型，所以在范例的程序中 `Member` 类型或 `Car` 类型都表示的是类的定义，也就是说这些结构是
**由用户自己定义** 的。

:::

这种一对一关系是一种相对比较容易的操作。下面可以进一步设计，例如：每个人都有自己的孩子，孩子还可能有车，那么有如下两种设计方法。

- 方法一：设计一个表示孩子的类；

|一存在问题：如果有后代就需要设计一个类，按照这样的思路，如果有孙子，则应该再来个孙子类，如果有曾孙，再来个曾孙类，并且这些类的结构都是完全一样的，这样的设计有些糟糕。

- 方法二：一个人的孩子一定还是一个人，与人的类本质没区别，可以在 `Member` 类里面设计一个属性，表示孩子，其类型也是`Member` 。

```java
class Member {
    private int mid;				// 人员编号
    private String name;			// 人员姓名
    private Car car; 				// 表示属于人的车，如果没有车，则内容为null
    private Member child ;			// 表示人的孩子，如果没有，则为null
    public Member(int mid, String name) {
        this.mid = mid;
        this.name = name;
    }
    public void setCar(Car car) {
        this.car = car ;
    }
    public Car getCar() {
        return this.car ;
    }
    public void setChild(Member child) {
        this.child = child;
    }
    public Member getChild() {
        return child;
    }
    public String getInfo() {
        return "人员编号：" + this.mid + "，姓名：" + this.name;
    }
}
class Car {
    private Member member; 		// 车属于一个人，如果没有所属者，则为null
    private String pname;			// 车的名字
    public Car(String pname) {
        this.pname = pname;
    }
    public void setMember(Member member) {
        this.member = member ;
    }
    public Member getMember() {
        return this.member ;
    }
    public String getInfo() {
        return "车的名字：" + this.pname;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        // 第一步：根据既定结构设置数据
        Member m = new Member(1,"李兴华") ;				// 独立对象
        Member chd = new Member(2,"李闯") ;	 			// 独立对象
        Car c = new Car("八手奥拓100") ;					// 独立对象
        Car cc = new Car("法拉利M9") ;					// 一辆车
        m.setCar(c) ;									// 一个人有一辆车
        c.setMember(m) ;								// 一辆车属于一个人
        chd.setCar(cc) ;								// 一个孩子有一辆车
        cc.setMember(chd) ;							// 一个车属于一个孩子
        m.setChild(chd) ;								// 一个人有一个孩子
        // 第二步：根据既定结构取出关系
        System.out.println(m.getCar().getInfo()) ;			// 通过人找到车的信息
        System.out.println(c.getMember().getInfo()) ;			// 通过车找到人的信息
        System.out.println(m.getChild().getInfo()) ;			// 通过人找到他孩子的信息
        System.out.println(m.getChild().getCar().getInfo()) ;		// 通过人找到他孩子的车的信息
    }
}
```

本程序在 `Member` 类中增加了一个表示孩子的属性 `child` ，其类型为 `Member`
类型，如果一个人有孩子则为其设置一个实例化对象，如果没有则设置为 `null` 。特别需要注意的是，在通过人找到孩子所对应车的信息时使用了
**代码链** 的形式 `m.getChild().getCar().getInfo()` ，这类代码一定要观察每一个方法的返回值，如果返回的是一个类的引用，则可以继续调用这个类的方法，而此类代码在以后的开发中也一定会出现。
