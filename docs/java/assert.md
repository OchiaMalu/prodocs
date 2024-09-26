# assert 关键字

assert 关键字是在 JDK1.4 的时候引入的，其主要的功能是进行断言。断言指的是程序执行到某行之后，其结果一定是预期的结果。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String args[]) {
		int num = 10;
		// 假设中间可能经过了20行代码来操作num的内容，期望的内容应该是20
		assert num == 20 : "num的内容不是20";		// 进行断言操作
		System.out.println("num = " + num);
	}
}
```

本程序使用断言进行操作，很明显程序中断言的判断条件并不满足，但是依然没有任何错误产生，这是因为 Java
默认情况下是不开启断言的。如果要想启用断言，则应该增加如下一些选项。

> java -ea com.yootk.demo.TestDemo

增加 `-ea` 参数之后，本程序就会出现如下错误信息。

> Exception in thread "main" java.lang.AssertionError: num 的内容不是20
>
> ​ at com.tootk.demo.TestDemo.main(TestDemo.java:7)

如果在运行时不增加 `-ea` 的选项，则不会出现错误，换言之，断言并不是自动启动的，需要由用户控制启动，但是这种技术在 Java
中并非重点知识，读者了解即可。
