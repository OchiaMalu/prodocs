# 处理异常

Java 针对异常的处理提供了 3 个核心的关键字：try、catch、finally，利用这 3 个关键字就可以组成以下异常处理格式。

> try{
>
> ​ // 有可能出现异常的语句
>
> }[catch(异常类型 对象){
>
> ​ //异常处理；
>
> }catch(异常类型 对象){
>
> ​ //异常处理；
>
> }catch(异常类型 对象){
>
> ​ //异常处理；
>
> }...][finally{
>
> ​ //不管是否出现异常，都执行统一的代码
>
> }]

在格式中已经明确地表示，在 `try` 语句中捕获可能出现的异常代码。如果在 `try` 中产生了异常，则程序会自动跳转到 `catch`
语句中找到匹配的异常类型进行相应的处理。最后不管程序是否会产生异常，都会执行到 `finally` 语句，`finally`
语句就作为异常的统一出口。需要提醒读者的是，`finally` 块是可以省略的，如果省略了 `finally` 块不写，则在 `catch`
块运行结束后，程序将继续向下执行。异常的基本处理流程如图所示。

:::tip 异常的格式组合

在以上格式中发现 `catch` 与 `finally` 都是可选的。实际上这并不是表示这两个语句可以同时消失，异常格式的组合，往往有3种：try..catch、try.catch.finally、
try...finally

:::

<img src="http://niu.ochiamalu.fun/image-20240925163533307.png" alt="image-20240925163533307" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String args[]) {
		System.out.println("1. 除法计算开始。");
		try {
			System.out.println("2. 除法计算：" + (10 / 0));		// 此处产生异常
			// 异常产生之后的语句将不再执行，此处在try中产生异常，所以下面的输出不会执行 
			System.out.println("更多课程请访问：www.yootk.com");
		} catch (ArithmeticException e) {						// 处理算术异常
			System.out.println("******** 出现异常了 *********");
		}
		System.out.println("3. 除法计算结束。");
	}
}
```

本程序使用了异常处理语句格式，当程序中的数学计算出现异常后，异常会被y语句捕获，而后交给 `catch`
进行处理，这时程序会正常结束，而不会出现中断执行的情况。

在出现异常后，是采用输出提示信息的方式进行处理的，但是这样的处理方式不能够明确地描述出异常类型，而且出现异常的目的是解决异常。所以为了能够进行异常的处理，可以使用异常类中提供的 `printStackTrace()`
方法进行异常信息的完整输出。

```java
package com.yootk.demo;
public class TestDemo {
	 public static void main(String args[]) {
		System.out.println("1. 除法计算开始。");
		try {
			System.out.println("2. 除法计算：" + (10 / 0));	// 此处产生异常
			// 异常产生之后的语句将不再执行，此处在try中产生异常，所以下面的输出不会执行 
			System.out.println("更多课程请访问：www.yootk.com");
		} catch (ArithmeticException e) {					// 处理算术异常
			e.printStackTrace();							// 输出异常的完整信息
		}
		System.out.println("3. 除法计算结束。");
	}
}
```

所有的异常类中都会提供 `printStackTrace()`
方法，而利用这个方法输出的异常信息，会明确地告诉用户是代码中的第几行出现了异常，这样非常方便用户进行代码的调试。范例的代码演示了 `try...catch`
语句结构，而除了这样的搭配，也可以使用 `try… catch..finally` 结构进行处理。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String args[]) {
		System.out.println("1. 除法计算开始。");
		try {
			System.out.println("2. 除法计算：" + (10 / 0));		// 此处产生异常
			// 异常产生之后的语句将不再执行，此处在try中产生异常，所以下面的输出不会执行 
			System.out.println("更多课程请访问：www.yootk.com");
		} catch (ArithmeticException e) {						// 处理算术异常
			e.printStackTrace();								// 输出异常的完整信息
		} finally {
			System.out.println("### 不管是否出现异常我都执行！") ;
		}
		System.out.println("3. 除法计算结束。");
	}
}
```

本程序增加了一个 `finally` 语句，这样在异常处理过程中，不管是否出现异常实际上最终都会执行 `finally` 语句块中的代码。

在异常捕获时发现一个 `try` 语句也可以与多个 `catch` 语句使用，这样就可以捕获更多的异常种类。为了让读者更加清楚捕获多个异常的作用以及问题，下面首先对原程序进行部分修改。

```java
package com.yootk.demo;

public class TestDemo {
	public static void main(String args[]) {
		System.out.println("1. 除法计算开始。");
		try {
			int x = Integer.parseInt(args[0]);				// 接收参数并且转型
			int y = Integer.parseInt(args[1]);				// 接收参数并且转型
			System.out.println("2. 除法计算：" + (x / y));	// 此处产生异常
			// 异常产生之后的语句将不再执行，此处在try中产生异常，所以下面的输出不会执行 
			System.out.println("更多课程请访问：www.yootk.com");
		} catch (ArithmeticException e) {					// 处理算术异常
			e.printStackTrace();							// 输出异常的完整信息
		} finally {
			System.out.println("### 不管是否出现异常我都执行！") ;
		}
		System.out.println("3. 除法计算结束。");
	}
}
```

在本程序中由于只处理了算术异常 `catch(ArithmeticException e)`
，所以当出现其他异常后，程序依然无法处理，会直接中断执行，但是通过执行也可以发现，此时即使没有处理的异常，`finally`
也会正常执行，而其他语句将不再执行。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String args[]) {
		System.out.println("1. 除法计算开始。");
		try {
			int x = Integer.parseInt(args[0]);				// 接收参数并且转型
			int y = Integer.parseInt(args[1]);				// 接收参数并且转型
			System.out.println("2. 除法计算：" + (x / y));	// 此处产生异常
			// 异常产生后的语句将不再执行，此处在try中产生异常，所以下面的输出不会执行 
			System.out.println("更多课程请访问：www.yootk.com");
		} catch (ArrayIndexOutOfBoundsException e) {		// 处理参数不足异常
			e.printStackTrace();
		} catch (NumberFormatException e) {				// 处理数字转换异常
			e.printStackTrace();
		} catch (ArithmeticException e) { 					// 处理算术异常
			e.printStackTrace();							// 输出异常的完整信息
		} finally {
			System.out.println("### 不管是否出现异常我都执行！") ;
		}
		System.out.println("3. 除法计算结束。");
	}
}
```

本程序在异常处理中加入了多个 `catch` 语句，这样就可以处理 3 种异常，并且这 3 种异常的处理形式完全相同，都是打印异常信息。
