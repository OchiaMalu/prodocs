# RuntimeException 类

在 Java 中为了方便用户代码的编写，专门提供了一种 `RuntimeException`
类。这种异常类的最大特征在于：程序在编译时不会强制性地要求用户处理异常，用户可以根据自己的需要有选择性地进行处理，但是如果没有处理又发生了异常了，将交给
JVM 默认处理。也就是说 `RuntimeException` 的子异常类，可以由用户根据需要有选择性地进行处理。

如果要将字符串转换为 `int` 数据类型，可以利用 `Integer` 类进行处理，因为在 `Integer` 类中定义了如下方法。

> 字符串转换为 int ： public static int parseInt(String s) throws NumberFormatException;

此时 `parseInt()` 方法上抛出了一个 `NumberFormatException` ，而这个异常类就属于 `Runtime Exception` 子类。

> java.lang.Object
>
> ​ |—java.lang.Throwable
>
> ​ |—java.lang.Exception
>
> ​ |—java.lang.RuntimeException
>
> ​ |—java.lang.IllegalArgumentException
>
> ​ |—java.lang.NumberFormatException

所有的 `RuntimeException` 子类对象都可以根据用户的需要进行有选择性的处理，所以调用时不处理也不会有任何编译语法错误。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String args[]) {
		int temp = Integer.parseInt("100");			// 直接将字符串变为int型
		System.out.println(temp);
	}
}
```

本程序在没有处理 `parselnt()` 异常的情况下依然实现了正常的编译与运行，但此时一旦出现异常，就将交由 JVM 进行默认处理。
