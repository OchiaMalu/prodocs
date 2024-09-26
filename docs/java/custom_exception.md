# 自定义异常

Java 本身已经提供了大量的异常，但是这些异常在实际的工作中往往并不够使用，例如：当你要执行数据增加操作时，有可能会出现一些错误的数据，而这些错误的数据一旦出现就应该抛出异常（如AddException），但是这样的异常
Java 并没有，所以就需要由用户自己去开发一个自己的异常类。如果要想实现自定义异常类，只需要继承 `Exception`
（强制性异常处理）或 `RuntimeException` （选择性异常处理）父类即可。

```java
package com.yootk.demo;
class AddException extends Exception {			// 此异常类要强制处理
	public AddException(String msg) {
		super(msg);							// 调用父类构造
	}
}
public class TestDemo {
	public static void main(String args[]) {
		int num = 20;
		try {
			if (num > 10) { 					// 出现了错误，应该产生异常
				throw new AddException("数值传递的过大！");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```

本程序使用一个自定义的 `AddException` 类继承了 `Exception` ，所以此类为一个异常表示类，因此用户就可以在程序中使用 `throw`
进行异常对象的抛出。
