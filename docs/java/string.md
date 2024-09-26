# String 类的基本概念

`String` 是 **字符串** 的描述类型，在实际的开发中也使用得非常广泛。虽然 `String`
本身不属于引用数据类型，但是其可以像基本数据类型那样直接赋值，针对这样一个特殊的类，本节将为读者详细地解释 `String` 类的完整特征。

## String类的两种实例化方式

在之前的程序使用过 `String` ，最早使用的时候是直接采用 `String变量 = "字符串”;` 语法形式完成的，这种形式称为 **直接赋值
** 。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "www.YOOTK.com"; 		// 直接赋值
        System.out.println(str);				// 输出字符串数据
    }
}
```

本程序首先定义了一个 `String` 类的对象，并且采用直接赋值的形式为其进行实例化操作。

以上就是 `String` 对象的 **直接赋值** ，代码并没有使用关键字 `new` 进行。在 `String` 类里面实际上也定义了一个 **构造方法**
，其语法如下。

> public String(String str)，在构造里面依然要接收一个 String 类对象

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = new String("www.YOOTK.com"); 	// 直接赋值
        System.out.println(str);						// 输出字符串数据
    }
}
```

本程序采用 `String` 类的构造方法实现了 `String` 类对象的实例化操作，其最终的结果与直接赋值结果相同。

面对 `String`
类对象的两种实例化方式，很多读者主观上会认为第二种构造方法的形式更加直观，因为按照类与对象的概念来解释，只要是类就要用关键字 `new`
，所以这样的做法似乎是很符合道理的，但是实际的情况却并非如此，请继续观察接下来的分析。

## 字符串的比较 1

在 Java 中如果要判断两个 `int` 型变量的内容是否相等，按照之前所学的内容，自然要使用 `==` 符号来完成。

```java
public class StringDemo {
    public static void main(String args[]) {
        int x = 10;					// 整型变量
        int y = 10;					// 整型变量
        System.out.println(x == y);		// 判断是否相等
    }
}
```

本程序直接定义了两个 `int` 型的变量，由于这两个变量的内容都是 10，所以使用 `==` 判断的最终结果也是 10。

而在 Java 中，`==` 可以应用在所有数据类型中（包括基本数据类型与引用数据类型），所以下面将在 `String`
类的对象比较中使用 `==` 。

```java
public class StringDemo {
    public static void main(String args[]) {
        String stra = "hello";				// 直接赋值定义字符串
        String strb = new String("hello");		// 构造方法定义字符串
        String strc = strb; 				// 引用传递
        System.out.println(stra == strb); 		// 比较结果：false
        System.out.println(stra == strc); 		// 比较结果：false
        System.out.println(strb == strc); 		// 比较结果：true
    }
}
```

本程序首先采用直接赋值的形式为 `String` 类对象实例化 `String stra="hello"` ，然后使用构造方法为 `String`
类对象实例化 `String strb = new String("hello")` ，而在定义 `strc` 这个`String` 类对象时采用了引用传递的方式，即将 `strb`
的引用地址赋给 `strc` （此时 `strb` 与 `strc` 指向 **同一内存** 空间)。虽然 3 个 `String`
类对象的内容是完全一样的，但最后的结果却出现 `false` ，所以 `==` 并不能够实现准确的字符串比较，分析过程如图所示。

<img src="http://niu.ochiamalu.top/image-20240923164314380.png" alt="image-20240923164314380" style="zoom:80%;margin:0 auto" />

通过图可以发现， `stra` 与 `strb` 虽然包含的内容是一样的，但是其所在的内存地址空间不同（因为 `strb` 使用关键字 `new`
开辟了新的堆内存空间），而在使用 `==` 比较时，比较的只是数值，所以只要地址数值不相同的 `String` 类对象在使用 `==`
比较相等时其结果一定返回的是 `false` ；而 `strc` 由于与 `strb`
指向了同一块内存空间，所以地址数值相同，那么返回的结果就是 `true` 。所以 `==` 在  `String` 比较时比较的只是内存地址的数值，并不是内容。

:::tip 引用类型都可以使用 `==` 比较

在整个 Java 中只要是引用数据类型一定会存在内存地址，而 `==`
可以用于所有的引用数据类型的比较，但比较的并不会是内容，永远都只是地址的数值内容，这样的操作往往只会出现在判断两个不同名的对象是否指向同一内存空间的操作上。

:::

通过以上的分析结果可以发现， `==`
的确是进行了比较，但是比较的并不是字符串对象包含的内容，而是它们所在的内存地址的数值，所以 `==` 属于数值比较，比较的是 *
*内存地址** 。

如果要比较字符串的内容，可以使用 `String` 类里面定义的方法，内容比较操作（区分大小写）语法如下。

> public boolean equals(String str);

```java
public class StringDemo {
    public static void main(String args[]) {
        String stra = "hello";					// 直接赋值定义字符串
        String strb = new String("hello");			// 构造方法定义字符串
        String strc = strb; 					// 引用传递
        System.out.println(stra.equals(strb)) ;		// 比较结果：true
        System.out.println(stra.equals(strc)) ;		// 比较结果：true
        System.out.println(strb.equals(strc)) ;		// 比较结果：true
    }
}
```

本程序与上述代码一样，依然采用不同的方式定义了相同内容的 3 个 `String`
类对象，唯一的区别是在进行比较时，使用的是 `equals()` 方法，此方法是 `String` 类内部提供的比较方法，专门判断内容是否相等，由于
3 个 `String` 类的对象内容完全一致，所以最终的判断结果全部都是 `true` 。

:::tip String类中 `==` 和 `equals()` 比较的区别

- `==` 是 Java 提供的关系运算符，主要的功能是进行数值相等判断，如果用在 `String` 对象上表示的是 **内存地址** 数值的比较；
- `equals()` 是由 `String` 提供的一个方法，此方法专门负责进行字符串 **内容** 的比较。

在实际的开发中，由于字符串的地址是不好确定的，所以不要使用 `==` 比较，所有的比较都要通过 `equals()` 方法完成。

:::

## 字符串常量就是 String 的匿名对象

任何编程语言都没有提供字符串数据类型的概念，很多编程语言里面都是使用字符数组来描述字符串的定义。同样在 Java
里面也没有字符串的概念，但由于所有的项目开发中都不可能离开字符串的应用，所以 Java 创造了属于自己的特殊类 `String` (字符串)
，同时也规定了所有的字符串要求使用 `"”` 声明，但是 `String` 依然不属于基本数据类型，所以字符串数据实际上是作为 `String` 类的
**匿名对象** 的形式存在的。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "hello";						// str是对象名称，而"hello"是内容
        System.out.println("hello".equals(str));			// 内容比较，由字符串直接调用
    }
}
```

本程序的最大特点在于直接利用字符串 `hello` 调用 `equals()` 方法 `"hello".equals(str) ` ，由于 `equals()` 方法是 `String`
类定义的，而类中的方法只有实例化对象才可以调用，那么就可以得出一个结论：字符串常量就是 `String` 类的匿名对象。

所谓的 `String` 类对象直接赋值的操作，实际上就相当于将一个匿名对象设置了一个名字，但是唯一的区别是， `String` 类的匿名对象是由
**系统自动生成** 的，不再由用户自己直接创建。

:::tip 实际开发中的字符串比较

在实际开发过程中，有可能会有这样的需求，由用户自己输入一个字符串，而后判断其是否与指定的内容相同，那么这个时候用户就有可能不输入数据，结果内容就为 `null` 。

```java
public class StringDemo {
    public static void main(String args[]) {
        String input = null; 			// 假设这个内容由用户输入
        if (input.equals("hello")) {		// 如果输入内容是hello，认为满足一个条件
           System.out.println("Hello World !!!");
        }
    }
}
```

此时由于没有输入数据，所以 `input` 的内容为 `null` ，而 `null` 对象调用方法的结果将直接导致 `NullPointerException`
，而这样的问题可以通过一些代码的变更来帮助用户回避。

```java
public class StringDemo {
    public static void main(String args[]) {
        String input = null; 			// 假设这个内容由用户输入
        if ("hello".equals(input)) {		// 如果输入内容是hello，认为满足一个条件
           System.out.println("Hello World !!!");
        }
    }
}
```

本程序直接利用字符串常量来调用 `equals()` 方法，因为字符串常量是一个 `String` 类的匿名对象，所以该对象永远不可能是 `null`
，所以将不会出现 `NullPointerException` ，特别需要提醒读者的是， `equals()` 方法内部实际上也存在 `null` 的检查，这一点有兴趣的读者可以打开
Java 类的源代码来观察，或者通过后续内容来学习。

:::

## 两种实例化方式的区别

清楚了 `String` 类的比较操作后，下面就需要解决一个最为重要的问题。对于 `String`
类的对象存在两种实例化的操作形式。那么这两种有什么区别，在开发中应该使用哪一种更好呢？

**1.分析直接赋值实例化String类对象的情况**

直接赋值就是将一个字符串的匿名对象设置了一个名字。其语法如下。

> String 变量 = 字符串常量(匿名对象)
>
> String str = "hello";

此时在内存中会开辟一块 **堆内存** ，内存空间中将保存 `hello` 字符串数据，并且 **栈内存** 将直接引用 **此堆内存**
空间，如图所示。通过图可以发现，使用直接赋值的方式为 `String` 类对象实例化 **只会开辟一块堆内存空间**
，而除了这一特点外，利用直接赋值还可以实现堆内存空间的重用，即采用直接赋值的方式，<u>
在相同内容的情况下不会开辟新的堆内存空间，而会直接指向已有的堆内存空间</u>。

<img src="http://niu.ochiamalu.top/image-20240923180735960.png" alt="image-20240923180735960" style="zoom:80%;margin:0 auto" />

```java
public class StringDemo {
    public static void main(String args[]) {
        String stra = "hello";				// 直接赋值实例化
        String strb = "hello";				// 直接赋值实例化
        String strc = "hello";				// 直接赋值实例化
        String strd = "yootk" ;				// 直接赋值实例化，内容不相同
        System.out.println(stra == strb); 		// 判断结果：true
        System.out.println(stra == strc); 		// 判断结果：true
        System.out.println(strb == strc); 		// 判断结果：true
        System.out.println(stra == strd); 		// 判断结果：false
    }
}
```

通过本程序的执行可以发现，由于使用了直接赋值的实例化操作方式，设置的内容相同，所以即使没有直接发生对象的引用操作，最终 3
个String对象 `stra、strb、strc`
也都自动指向了同一块堆内存空间，但是如果在直接赋值时内容与之前不一样，则会自动开辟新的堆内存空间 `String strd="yootk";`
。本程序的内存关系如图所示。

<img src="http://niu.ochiamalu.top/image-20240923180824345.png" alt="image-20240923180824345" style="zoom:80%;margin:0 auto" />

:::tip String 类采用的设计模式为 **共享设计模式**

在 JVM 的底层实际上会存在一个 **对象池** （不一定只保存 String 对象)，当代码中使用了直接赋值的方式定义一个 `String`
类对象时，会将此字符串对象所使用的匿名对象入池保存。如果后续还有其他 String
类对象也采用了直接赋值的方式，并且设置了同样的内容时，将不会开辟新的堆内存空间，而是使用已有的对象进行 **引用的分配**
，从而继续使用。

关于共享设计模式的简单解释：这就好比在家中准备的工具箱一样，如果有一天需要用到螺丝刀，发现家里没有，那么肯定要去买一把新的，但是使完不可能丢掉，会将其放到工具箱中以备下次需要时继续使用，而这个工具箱中的工具肯定可以为家庭中的每一个成员服务

:::

**2.分析构造方法实例化String类对象的情况**

如果要明确地调用 `String` 类中的构造方法进行 `String` 类对象的实例化操作，那么一定要使用关键字 `new`
，而每当使用关键字 `new` 就表示要 **开辟新的堆内存空间** ，这块堆内存空间的内容就是传入到构造方法中的字符串数据。

> String str = new String("hello");

通过之前的学习读者已经清楚，每一个字符串常量都是 `String` 类的匿名对象，所以本代码的含义是，根据 `hello`
这个匿名对象的内容创建一个新的 `String` 类对象，所以此时的内存关系如图所示。

<img src="http://niu.ochiamalu.top/image-20240923181049405.png" alt="image-20240923181049405" style="zoom:80%;margin:0 auto" />

因为每一个字符串都是一个 `String` 类的匿名对象，所以会首先在堆内存中开辟一块空间保存字符串 `hello` ，然后使用关键字 `new`
，开辟另一块堆内存空间。因此真正使用的是用关键字 `new` 开辟的堆内存，而之前定义的字符串常量的堆内存空间将不会有任何的栈内存指向，将成为垃圾，等待被
GC 回收。所以，使用构造方法的方式开辟的字符串对象，实际上会开辟两块空间，其中有一块空间将成为垃圾。

除了内存的浪费外，如果使用构造方法实例化 `String` 类对象，由于关键字 `new` 永远表示开辟新的堆内存空间，<u>
所以其内容不会保存在对象池中</u>。

```java
public class StringDemo {
    public static void main(String args[]) {
        String stra = new String("hello");		// 使用构造方法定义了新的内存空间，不会自动入池
        String strb = "hello";				// 直接赋值
        System.out.println(stra == strb);		// 判断结果：false
    }
}
```

本程序首先利用构造方法开辟了一个新的 `String`
类对象，由于此时不会自动保存到对象池中，所以在使用直接赋值的方式声明 `String`
类对象后将开辟新的堆内存空间，因为两个堆内存的地址不同，所以最终的地址判断结果为 `false`
。如果希望开辟的新内存数据也可以进行对象池的保存，那么可以采用 `String` 类定义的一个 **手工入池** 的操作。保存到对象池的语法如下。

> public String intern();

```java
public class StringDemo {
    public static void main(String args[]) {
        String stra = new String("hello").intern();		// 使用构造方法定义新的内存空间，手工入池
        String strb = "hello";						// 直接赋值
        System.out.println(stra == strb);				// 判断结果：true 
    }
}
```

本程序由于使用了 `String` 类的 `intern()`
方法，所以会将指定的字符串对象保存在对象池中，随后如果使用直接赋值的形式将会自动引用已有的堆内存空间，所以地址判断的结果为 `true` 。

:::tip String 类的两种对象实例化方式的区别

- 直接赋值 `String str="字符串";` ：只会开辟 **一块** 堆内存空间，并且会自动保存在对象池中以供下次重复使用；
- 构造方法 `String str=new String("字符串")` ：会开辟 **两块**
  堆内存空间，其中有一块空间将成为垃圾，并且不会自动入池，但是用户可以使用 `intern()` 方法手工入池。

在所有开发中，String 对象的实例化永远都采用 **直接赋值** 的方式完成。

:::

## 字符串一旦定义则不可改变

在使用 `String` 类进行操作时，还有一个特性是特别重要的，那就是字符串的内容一旦定义则不可改变，下面通过一段代码为读者讲解。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "Hello ";			// 直接赋值实例化String类对象
        str = str + "World ";			// 字符串连接，同时修改String类对象的引用关系
        str += "!!!";					// 字符串连接，同时修改String类对象的引用关系
        System.out.println(str);			// 输出当前的String类对象内容
    }
}
```

本程序首先声明了一个 `String` 类对象，然后修改了两次 `String` 类对象的内容（注意：实际上是发生了两次引用改变)
，所以最终`String` 类对象的内容就是 `Hello World!` 。但是在整个操作过程中，只是 `String`
类的对象引用发生了改变，而字符串的内容并没有发生改变。下面通过图进行说明。

<img src="http://niu.ochiamalu.top/image-20240923181632942.png" alt="image-20240923181632942" style="zoom:80%;margin:0 auto" />

通过上图可以发现，在进行 `String`
类对象内容修改时，实际上原始的字符串都没有发生变化（最终没有引用的堆内存空间将成为垃圾空间)，而改变的只是 `String`
类对象的引用关系。所以可以得出结论：字符串一旦定义则不可改变。正因为存在这样的特性，所以在开发中应该回避以下代码的编写。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "";					// 实例化字符串对象
        for (int x = 0; x < 1000; x++) {		// 循环1000次
            str += x;						// 修改字符串对象引用
        }
        System.out.println(str);
    }
}
```

代码修改了 `String` 对象的引用关系 1000 次（所有数据类型遇见 `String` 连接操作时都会 **自动** 向 `String` 类型转换)
，并且会产生大量的垃圾空间，所以此类代码在开发中是严格禁止的，`String` 的内容不要做过多频繁的修改。

:::tip 如果出现了频繁修改该如何解决？

**使用 StringBuffer 或 StringBuilder 类代替** 。

虽然 Java 提供了可以修改内容的字符串操作类，但是从笔者的实际使用经验来讲：开发中如果定义字符串，90%
的情况下使用的都会是String，而如果只是进行简单的字符串修改操作（可能只修改个一两次的情况)，那么对于产生的垃圾问题也就没有必要过于在意。

:::

