# 异常的处理流程

通过上一节的分析，相信读者已经清楚如何进行异常处理，以及异常处理对于程序正常执行完整的重要性。但是此时会出现这样一个问题：如果每次处理异常时都要去考虑所有的异常种类，那么直接使用判断来进行处理不是更好吗？所以为了能够正确地处理异常，就必须清楚异常的继承结构以及处理流程。

为了解释异常的继承结构，首先来观察以下两个异常类的继承关系。

<img src="http://niu.ochiamalu.fun/image-20240925164034257.png" alt="image-20240925164034257" style="zoom:80%;margin:0 auto" />

通过这两个异常类可以发现所有的异常类型最高的继承类是 `Throwable` ，并且在 `Throwable` 下有两个子类。

- Error：指的是 JVM 错误，这时的程序并没有执行，无法处理；
- Exception：指的是程序运行中产生的异常，用户可以使用异常处理格式处理。

:::tip 注意 Java 中的命名

读者可以发现，在 Java 进行异常类子类命名时都会使用 `XxxError` 或 `XxxException` 的形式，这样也是为了从名称上帮助开发者区分。

:::

清楚了类的继承关系后，下面了解一下 Java 中异常的处理完整流程（如图所示）。

<img src="http://niu.ochiamalu.fun/image-20240925164208262.png" alt="image-20240925164208262" style="zoom:80%;margin:0 auto" />

(1)当程序在运行的过程中出现了异常，会由 JVM 自动根据异常的类型实例化一个与之类型匹配的异常类对象（此处用户不用去关心如何实例化对象，由
JVM 负责处理）。

(2)产生异常对象后会判断当前的语句是否存在异常处理，如果现在没有异常处理，就交给 JVM 进行默认的异常处理，处理的方式：输出异常信息，而后结束程序的调用。

(3)如果此时存在异常的捕获操作，那么会先由 `try` 语句来捕获产生的异常类实例化对象，再与 `try` 语句后的每一个 `catch`
进行比较，如果有符合的捕获类型，则使用当前 `catch` 的语句来进行异常的处理，如果不匹配，则向下继续匹配其他 `catch` 。

(4)不管最后异常处理是否能够匹配，都要向后执行，如果此时程序中存在 `finally` 语句，就先执行 `finally`
中的代码。执行完 `finally` 语句后需要根据之前的 `catch`
匹配结果来决定如何执行，如果之前已经成功地捕获了异常，就继续执行 `finally` 之后的代码，如果之前没有成功地捕获异常，就将此异常交给
JVM 进行默认处理（输出异常信息，而后结束程序执行)。

整个过程就好比方法传递参数一样，只是根据 `catch` 后面的参数类型进行匹配。既然异常捕获只是一个异常类对象的传递过程，那么依据
Java 中对象自动向上转型的概念来讲，所有异常类对象都可以向父类对象转型，也就证明所有的异常类对象都可以使用 `Exception`
来接收，这样就可以简单地实现异常处理了。

:::tip 为什么不使用 `Throwable` ?

**回答：Throwable 表示的范围要比 Exception 大。**

实际上本程序使用 `Throwable`
来进行处理，没有任何语法问题，但是却会存在逻辑问题。因为此时出现的（或者说用户能够处理的）只有 `Exception`
类型，而如果使用 `Throwable` 接收，还会表示可以处理 `Error` 的错误，而用户是处理不了 `Error`
错误的，所以在开发中用户可以处理的异常都要求以 `Exception` 类为主。

:::

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
		} catch (Exception e) {								// 处理所有异常类型
			e.printStackTrace();
		} finally {
			System.out.println("### 不管是否出现异常我都执行！") ;
		} 
		System.out.println("3. 除法计算结束。");
	}
}
```

本程序的异常统一使用了 `Exception` 进行处理，这样不管程序中出现了何种异常问题，程序都可以捕获并处理。

:::tip 异常是一起处理好还是分开处理好？

**回答：根据实际的开发要求是否严格来决定。**

在实际的项目开发工作中，所有的异常是统一使用 `Exception`
处理还是分开处理，完全由开发者的项目开发标准来决定。如果项目开发环境严谨，基本上都会要求针对每一种异常分别进行处理，并且要详细纪录下异常产生的时间以及产生的位置，这样就可以方便程序维护人员进行代码的维护。而在本书讲解时考虑到篇幅问题，所有的异常会统一使用 `Exception`
来进行处理。

同时，读者还可能有一种疑问：“怎么知道会产生哪些异常？”，实际上用户所能够处理的大部分异常，Java 都已经记录好，在本章的`throws`
关键字讲解时读者会清楚如何声明已知异常的问题，并且在后续的讲解中也会了解更多的异常。

:::

:::warning 处理多个异常时，捕获范围小的异常要放在捕获范围大的异常之前处理

如果说项目代码中既要处理：`ArithmeticException` 异常，也要处理 `Exception`
异常，那么按照继承的关系来讲，`ArithmeticException` 一定是 `Exception` 的子类，所以在编写异常处理时，`Exception`
的处理一定要写在 `ArithmeticException` 处理之后，否则将出现语法错误。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String args[]) {
		System.out.println("1. 除法计算开始。");
		try {
			int x = Integer.parseInt(args[0]);			// 接收参数并且转型
			int y = Integer.parseInt(args[1]);			// 接收参数并且转型
			System.out.println("2. 除法计算：" + (x / y));	// 此处产生异常
			// 异常产生之后的语句将不再执行，此处在try中产生异常，所以下面输出不会执行 
			System.out.println("更多课程请访问：www.yootk.com");
		} catch (Exception e) {							// 处理所有异常类型
			e.printStackTrace();
		} catch (ArithmeticException e) {		// 此处无法处理，Exception已处理完
			e.printStackTrace();
		} finally {
			System.out.println("### 不管是否出现异常我都执行！") ;
		} 
		System.out.println("3. 除法计算结束。");
	}
}
```

本程序 `Exception` 的捕获范围一定大于 `ArithmeticException` ，所以编写的 `catch(ArithmeticException e)`
语句永远不可能被执行到，那么编译就会出现错误。

:::

