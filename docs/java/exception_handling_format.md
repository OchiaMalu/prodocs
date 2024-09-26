# 异常处理的标准格式

异常处理除了最为常见的 `try...catch` 应用格式外，还存在一种结合 `try catch、finally、throw、throws`
一起使用的异常处理格式。在讲解这一应用之前，首先来看一个简单的开发要求：要求定义一个 `div()` 方法，而这个方法有以下一些要求。

- 在进行除法操作之前，输出一行提示信息；
- 在除法操作执行完毕后，输出一行提示信息；
- 如果中间产生了异常，则应该交给被调用处来进行处理。

在所有要求中，第 2 点和第 3 点最为麻烦，因此需要做到以下两点。

- 为了保证计算结束之后可以正常地输出信息，则应该使用finally进行操作；

- 为了保证异常可以交给被调用处使用，应该在方法声明上加上 `throws` ，而程序中也不应该处理异常。

```java
package com.yootk.demo;
class MyMath {
	public static int div(int x, int y) throws Exception {		// 出现异常要交给被调用处输出
		System.out.println("===== 计算开始 ====="); 		// 等价于：资源打开
		int result = 0;
		try {
			result = x / y; 										// 除法计算
		} catch (Exception e) {
			throw e; 											// 向上抛
		} finally {
			System.out.println("===== 计算结束 ====="); 	// 等价于：资源关闭
		}
		return result;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		try {
			System.out.println(MyMath.div(10, 0));			// 被调用处处理异常
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```

本程序的开发已经满足基本的要求，不管是否出现异常，都会将异常交被给调用处输出，同时每次操作都会指定固定的输出。

以上操作使用的是标准的异常处理结构来进行异常处理的，但是此时用户也可以进行简化方式处理，即：只使用 `try...finally` 进行处理。

```java
package com.yootk.demo;
class MyMath {
	public static int div(int x, int y) throws Exception {	// 出现异常要交给被调用处输出
		System.out.println("===== 计算开始 ====="); 		// 等价于：资源打开
		int result = 0;
		try {
			result = x / y; 								// 除法计算
		} finally {
			System.out.println("===== 计算结束 ====="); 	// 等价于：资源关闭
		}
		return result;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		try {
			System.out.println(MyMath.div(10, 0));			// 被调用处处理异常
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```

本程序在 `div()` 方法中取消了 `catch` 语句，这样当 `try` 语句捕获异常之后，会直接执行 `finally`
语句内容，捕获到的异常将通过`div()` 方法抛出给调用处进行处理。

:::tip 不建议使用简化格式

虽然范例的代码使用 `try..finally`
这样的简化格式可以完成与完整异常处理相同的功能，但是其本身却存在一个问题：一旦出现异常后 `div()`
方法将不具备任何异常处理能力就直接被抛出了。这就好比你外出办事，任何事情都不能够随机应变，凡事都要去问你的老板，那么要你有什么用呢？

:::

