# 数字操作类

Java 中为了方便进行基础的数学计算，专门提供了 `java.lang.Math` 类，但是 `Math` 类所能完成的操作有限。同时在程序开发中大数字的操作也是经常要使用的，为此
Java 提供了一个 `java.math` 包专门负责大数字的操作。本节将为读者讲解 Java 中与数字有关的 3 个程序类。

## Math 类

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		System.out.println(Math.round(15.5)); 		// 16
		System.out.println(Math.round(-15.5)); 		// -15
		System.out.println(Math.round(-15.51)); 	// -16
	}
}
```

本程序只是完成了一个简单的四舍五入操作，在这里唯一需要注意的是，当四舍五入的数据为 -10 时，操作数据小数位大于 0.5 才进位，小于或等于
0.5 则不进位。

:::tip `Math.round()`不保留小数位？

回答：可以通过算法实现或者利用 `BigDecimal` 大数字操作类完成。

首先 `Math.round()` 设计的原则就是 **不保留任何小数位** ，而如果要保存并非不可能，但是需要进行一些处理操作。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		System.out.println(round(-15.678139,2)); // -15.68
	}
	/**
	 * 四舍五入操作，可以保留指定长度的小数位数
	 * @param num 要进行四舍五入操作的数字
	 * @param scale 保留的小数位
	 * @return 四舍五入之后的数据
	 */
	public static double round(double num , int scale) {
		// Math.pow()的方法作用是进行10的N次方的计算
		return Math.round(num * Math.pow(10.0, scale)) / Math.pow(10.0, scale);
	}
}
```

:::

## Random 类

`java.util.Random` 是一个专门负责产生 **随机数** 的操作类，此类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928115447582.png" alt="image-20240928115447582" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.util.Random;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		Random rand = new Random() ;
		for (int x = 0 ; x < 10 ; x ++) {
			System.out.print(rand.nextInt(100) + "、");
		}
	}
}
```

本程序利用 `Random` 产生了 10 个不大于 100 的正整数，而且由于没有设置种子数，每次执行的结果将会随机生成。

:::tip 编写 36 选 7 的彩票程序，我们都可以成为百万富翁。

既然 `Random` 可以产生随机数，下面就利用其来实现一个 36 选 7 的功能。最大值到 36，所以设置边界的数值就是37，并且里面不能有0或重复的数据。

```java
package com.yootk.demo;
import java.util.Random;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		Random rand = new Random();
		int data[] = new int[7]; 			// 开辟一个7个元素的数组，保存生成数字
		int foot = 0; 					// 此为数组操作脚标
		while (foot < 7) { 				// 不确定循环次数，所以使用while循环
			int t = rand.nextInt(37); 	// 生成一个不大于37的随机数
			if (!isRepeat(data, t)) { 		// 重复
				data[foot++] = t; 		// 保存数据
			}
		}
		java.util.Arrays.sort(data); 	// 排序
		for (int x = 0; x < data.length; x++) {
			System.out.print(data[x] + "、");
		}
	}
	/**
	 * 此方法主要是判断是否存在重复的内容，但是不允许保存0
	 * @param temp 指的是已经保存的数据
	 * @param num 新生成的数据
	 * @return 如果存在返回true，否则返回false
	 */
	public static boolean isRepeat(int temp[], int num) {
		if (num == 0) { 		// 没有必要判断了
			return true; 		// 直接返回，随后的代码都不再执行
		}
		for (int x = 0; x < temp.length; x++) {
			if (temp[x] == num) {
				return true; 	// 表示后面的数据不再进行判断
			}
		}
		return false;
	}
}
```

由于 36 选 7 的操作不能是数字 0 或重复的数据，这样每当产生一个随机数后都需要进行重复判断，如果数组中没有重复数据则向数组中保存。

:::

## 大数字操作类

如果有两个非常大的数字要进行数学操作（这时数字已经超过了 `double` 的范围)
，那么只能利用字符串来表示，取出每一位字符变为数字后进行数学计算，但是这种方式的难度较高，为了解决这样的问题，Java
提供了两个大数字操作类：`java.math.BigInteger` 和`java.math.BigDecimal` ，而这两个类都属于 `Number` 的子类。

:::tip 超过数据范围的计算

在整个 Java 数据类型划分中，`double` 型数据允许保存的数据范围是最大的。下面以 `double` 数据类型为例，来观察如果数据大会出现什么结果。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		System.out.println(Double.MAX_VALUE * Double.MAX_VALUE);// Infinity
	}
}
```

本程序直接返回了 `Infinity` 标记，表示一个无穷的数据，这也是一种错误表示。如果真的超过了 `double`
的范围，肯定无法使用`double` 进行保存，因为只有 `String`
才可以准确地保存好这个数据。如果是数据很大的数字要进行数学计算，只能将其变为 `String` 型，然后按位取出每一个字符保存的数据，进行手工计算。

:::

### 大整数操作类：BigInteger

大整数可以操作无限大的整型数据，其基本操作方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928115527083.png" alt="image-20240928115527083" style="zoom:80%;margin:0 auto" />

通过上表可以发现，在实例化 `BigInteger` 类对象时接收的数据类型为 `String` 型。下面来观察如何使用 `BigInteger` 完成基本的四则运算。

```java
package cn.mldn.demo;
import java.math.BigInteger;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		BigInteger bigA = new BigInteger("234809234801");	// 大数字A
		BigInteger bigB = new BigInteger("8939834789");		// 大数字B
		System.out.println("加法结果：" + bigA.add(bigB));
		System.out.println("减法结果：" + bigA.subtract(bigB));
		System.out.println("乘法结果：" + bigA.multiply(bigB));
		System.out.println("除法结果：" + bigA.divide(bigB));
		BigInteger result[] = bigA.divideAndRemainder(bigB);
		System.out.println("商：" + result[0] + "，余数：" + result[1]);
	}
}
```

本程序由于演示的需要没有设置过大的数据。通过程序执行读者可以发现，为了方便大数字操作首先使用字符串进行数字的定义，然后分别使用 `BigInteger`
类中的方法实现四则运算操作。

### 大小数操作类：BigDecimal

`BigDecimal` 类表示的是大小数操作类，但是这个类也具备与 `BigInteger`
同样的基本计算方式。而在实际的工作中，使用 `BigDecimal`
类最方便的操作就是进行准确位数的四舍五入计算，如果要完成这一操作需要了解 `BigDecimal` 类中的定义，如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928115552804.png" alt="image-20240928115552804" style="zoom:80%;margin:0 auto" />

```java
package cn.mldn.demo;
import java.math.BigDecimal;
class MyMath { 
    public static double round(double num, int scale) {
        BigDecimal big = new BigDecimal(num);					// 将数据封装在BigDecimal类中
        BigDecimal result = big.divide(new BigDecimal(1), scale,
                BigDecimal.ROUND_HALF_UP);				// 除法计算
        return result.doubleValue(); 							// Number类的方法
    }
}
public class TestDemo {
    public static void main(String[] args) throws Exception {
        System.out.println(MyMath.round(15.5, 0)); 				// 计算结果：16
        System.out.println(MyMath.round(-15.5, 0)); 			// 计算结果：-15
        System.out.println(MyMath.round(168.98765, 2)); 			// 计算结果：168.99
    }
}
```

本程序采用 `BigDecimal` 类中的除法计算完成了四舍五入的操作，而这一代码在开发中，将作为工具类出现，读者只要会使用即可。
