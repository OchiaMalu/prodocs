# 认识异常

异常是程序中导致程序中断的一种指令流，为了帮助读者更好地理解异常出现时所带来的问题，将通过两个程序来进行异常产生问题的对比。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String args[]) {
		System.out.println("1. 除法计算开始。");
		System.out.println("2. 除法计算：" + (10 / 2));
		System.out.println("3. 除法计算结束。");
	}
}
```

本程序中并没有产生任何异常，所以代码将从头到尾顺序执行完毕。下面对本程序进行编写，观察程序中产生异常会带来的问题。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String args[]) {
		System.out.println("1. 除法计算开始。") ;
		System.out.println("2. 除法计算：" + (10 / 0)) ; 	// → 此处产生异常
		// 出现异常并且没有正确处理后，异常之后的语句将不再执行
		System.out.println("3. 除法计算结束。") ; 
	}
}
```

在本程序中产生了数学异常（ `10/0` 将产生 `ArithmeticException` 异常)，由于程序没有进行异常的任何处理，所以默认情况下，会进行异常信息打印，同时将终止执行异常产生之后的代码。

通过观察可以发现，如果没有正确地处理异常，程序会出现中断执行的情况为了让程序在出现异常后依然可以正常执行完毕，必须引入异常处理语句来完善代码编写。