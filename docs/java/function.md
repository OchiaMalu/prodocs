# 方法的定义及使用

`方法` 在很多地方又被称为 `函数` （在 Java 中的英文单词是 `Method` ，而在其他语言中的英文单词是 `Function`
），方法是一段可以被重复调用的代码块。

## 方法的基本概念

方法的主要功能是封装可以执行的一段代码，这样不仅可以进行重复调用，更可以方便地实现代码的维护，而本次使用的方法定义语法如下。

> public static 返回值类型 方法名称(参数类型 参数变量,...){
>
> ​ 方法体(本方法要执行的若干操作);
>
> ​    [return [返回值];]
>
> }

在方法的定义格式中，发现其有一个返回值类型，指的是这个方法的返回结果。对于此返回值的类型可以有以下两种。

- 直接设置 Java 中的数据类型（基本数据类型、引用数据类型），如果方法设置了返回值，那么 **必须** 使用 `return` 语句返回与数据类型对应的数据；

- 方法没有返回值 void ，可以不使用 `return` 返回内容，但是可以使用 `return` 结束方法调用。

:::warning 请注意以上格式的使用限制

在 Java 中定义方法的要求很多，并且随着课程的深入，也都会为读者一一讲解。而在本次所给出的方法定义格式有一个使用限制：<u>
定义在主类中，并且由主方法直接调用。</u>

:::

```java
public class TestDemo {
    public static void main(String args[]) {
        printInfo(); 				// 直接调用方法
        printInfo(); 				// 直接调用方法
    }
    /**
     * 信息输出操作
     */
    public static void printInfo() {	// 定义没有参数，没有返回值的方法
        System.out.println("*********************");
        System.out.println("*  www.prodocs.site *");
        System.out.println("*********************");
    }
}
```

本程序首先在 `TestDemo` 主类中定义了一个 `printInfo()`  方法，此方法主要是进行内容的输出，所以在方法声明返回值时使用了
void ，然后在主方法之中调用了两次 `printInfo()` 方法。

:::tip 方法命名规范

如果要在程序中定义方法，Java 的命名规范为：<u>
第一个单词的首字母小写，之后每个单词的首字母大写，例如： `printInfo()` 、`getMessage()` </u>。

同时为了读者理解方便，在本书的编写方法过程中将使用文档注释，而对于文档注释读者可以在学习完开发工具后利用工具的自动提示编写。

:::

```java
public class TestDemo {
    public static void main(String args[]) {
        pay(10.0);							// 调用方法
        pay(-10.0);							// 调用方法
    }
    /**
     * 定义一个支付的操作方法，如果支付金额大于0则正常支付，否则会输出错误提示信息
     * @param money 要支付的金额
     */
    public static void pay(double money) { 			// 购买支付操作
        if (money > 0.0) { 						// 现在已经给钱
           System.out.println("可以进行支付！");
        } else {								// 不能够支付
           System.out.println("你穷疯了，没钱还买东西！");
        }
    }
}
```

本程序定义了一个 `py()` 方法，而后在此方法中定义了一个参数，并在方法中针对传入的内容进行判断后输出。

```java
public class TestDemo {
    public static void main(String args[]) {
        int result = add(10, 20);					// 方法的返回值可以进行接收
        System.out.println("计算结果：" + result);
        System.out.println("计算结果：" + add(50, 60));	// 也可以直接将方法返回值进行输出
    }
    /**
     * 实现数据的加法操作
     * @param x 操作数字一
     * @param y 操作数字二
     * @return 返回两个数字的加法计算结果
     */
    public static int add(int x, int y) {					// 有参数有返回值的方法
        return x + y;							// 返回加法计算结果
    }
}
```

本程序在主类中定义了一个 `add()` 方法，而后此方法接收两个 `int`
型的变量，执行加法计算后会将计算的结果返回给方法的调用处，由于方法本身存在返回值，所以可以接收返回值，或者直接进行返回值的输出。

以上是方法在实际开发中的 3 种基本定义形式，但是在这里需要提醒读者的是，如果在方法中执行 `return`
语句，那么就表示其之后的代码不再执行而直接结束方法调用。如果此时方法有返回值声明，那么必须返回相应类型的数据：如果没有返回值声明，则可以直接编写return
。而此类操作一般都会结合分支判断一起使用。

```java
Public class TestDemo {
    public static void main(String args[]) {
        set(100);					// 正常执行输出
        set(3);						// 满足方法判断条件，会中断输出操作
        set(10);						// 正常执行输出
    }
    /**
     * 定义一个设置数据的操作方法，如果该数据为3将无法设置
     * @param x 要设置的数据内容
     */
    public static void set(int x) {	// 方法声明为void
        if (x == 3) {					// 判断语句
           return; 					// 方法后面的内容不执行了
        }
        System.out.println("x = " + x);
    }
}
```

本程序定义的 `set()` 方法上使用了 `void` 声明，所以在此类方法中如果想要结束调用，可以直接编写 `return` 语句，当传入的参数内容为
3 时，符合方法结束调用的条件，所以后面的输出将不再执行。

## 方法的重载

方法的重载是指方法 **名称相同** ，参数的 **类型或个数不同** ，调用的时候将会按照传递的参数类型和个数完成不同方法体的执行。

如果有一个方法名称，有可能要执行多项操作，例如：一个 `add()` 方法，它可能执行两个整数的相加，也可能执行 3
个整数的相加，或者可能执行两个小数的相加，那么在这样的情况下，很明显，一个方法体肯定无法满足要求，需要为 `add()`
方法定义多个不同的功能实现，所以此时就需要方法重载概念的支持。

```java
public class TestDemo {
    public static void main(String args[]) {
        // 方法重载之后执行语句时会根据传入参数的类型或个数的不同调用不同的方法体
        System.out.println("两个整型参数：" + add(10, 20)); 
        System.out.println("三个整型参数：" + add(10, 20, 30)); 
        System.out.println("两个浮点型参数：" + add(10.2, 20.3)); 
    }
    /**
     * 实现两个整型数字的加法计算操作
     * @param x 操作数字一
     * @param y 操作数字二
     * @return 两个整型数据的加法计算结果
     */
    public static int add(int x, int y) { 			// add()方法一共被重载三次
        return x + y;
    }
    /**
     * 实现三个整型数字的加法计算操作
     * @param x 操作数字一
     * @param y 操作数字二
     * @param z 操作数字三
     * @return 三个整型数据的加法计算结果
     */
    public static int add(int x, int y, int z) { 		// 与之前的add()方法的参数个数不一样
        return x + y + z;
    }
    /**
     * 实现两个小数的加法计算操作
     * @param x 操作数字一
     * @param y 操作数字二
     * @return 两个小数的加法计算结果
     */
    public static double add(double x, double y) {		// 与之前的add()方法的参数类型不一样
        return x + y;
    }
}
```

本程序在主类中一共定义了 3 个 `add()` 方法，但是这 3 个 `add()` 方法的参数个数以及数量完全不同，所以就证明此时 `add()`
方法已经被 **重载** 了。而在调用方法时，虽然方法的调用名称相同，但是会根据其声明的参数个数或类型执行不同的方法体，调用过程如图所示。

<img src="http://niu.ochiamalu.fun/image-20240921230722106.png" alt="image-20240921230722106" style="zoom:80%;margin:0 auto" />

:::tip `System.out.println()` 、`System.out.print()` 也属于方法的重载

在之前一直使用的系统输出操作，实际上也属于方法的重载。

```java
public class TestDemo {
    public static void main(String args[]) {
        System.out.println("hello"); 	// 输出String
        System.out.println(1); 		// 输出int
        System.out.println(10.2); 	// 输出double
        System.out.println('A'); 		// 输出char
        System.out.println(false); 		// 输出boolean
    }
}
```

在本程序中，可以发现，现在 `println()` 方法可以输出各种数据类型，所以此方法为重载方法。而关于此方法的更多内容将在后续进行讲解。

:::

方法重载的概念本身很容易理解，但是对于方法重载有以下两点说明。

- 在进行方法重载时一定要考虑到参数类型的统一，虽然可以实现重载方法返回不同类型的操作，但是从标准的开发来讲，建议所有重载后的方法使用
  **同一种** 返回值类型；
- 方法重载的时候重点是根据参数类型及个数来区分不同的方法，而不是依靠返回值的不同来确定的。

## 方法的递归调用

递归调用是一种特殊的调用形式，指的是方法自己调用自己的形式，如图所示。在进行递归操作时必须满足以下两个条件。

- 必须有结束条件；
- 每次调用时都需要改变传递的参数。

<img src="http://niu.ochiamalu.fun/image-20240921230957483.png" alt="image-20240921230957483" style="zoom:80%;margin:0 auto" />

::: 关于递归的学习

递归调用是我们迈向数据结构开发的第一步，但是如果读者想把递归操作掌握熟练，需要大量的代码积累才可能写出合理的代码。换个角度，如果在标准的项目应用开发里面，是很难写上递归操作的。

之所以在开发中避免过多的使用递归是因为如果处理不得当，就有可能出现 **内存的溢出** 问题。

:::

```java
public class TestDemo {
    public static void main(String args[]) {
        System.out.println(sum(100)); 	// 1 - 100累加
    }
    /**
     * 数据的累加操作，传入一个数据累加操作的最大值，而后每次进行数据的递减，一直累加到计算数据为1
     * @param num 要进行累加的操作
     * @return 数据的累加结果
     */
    public static int sum(int num) { 			// 最大的内容
        if (num == 1) { 					// 递归的结束调用
           return 1; 						// 最终的结果返回了1
        }
        return num + sum(num - 1); 			// 递归调用
    }
}
```

本程序使用递归操作进行了数字的累加操作，并且当传递的参数为 1 时，直接返回为数字 1。本程字的操作流程简单分析如下。

- 第1次调用： `return 100+sum(99);`

- 第2次调用： `return 100+99+sum(98);`
- 倒数第2次调用：`return100+99+...+3+sum(2);`
- 最后一次调用：`return100+99+...+3+2+1;`
