# throw 关键字

之前的所有异常类对象都是由 JVM 自动进行实例化操作的，而现在用户也可以自己 **手工地抛出一个实例化对象**
（手工调用异常类的构造方法)，就需要通过 `throw` 完成。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String args[]) {
		try {				// 直接抛出一个自定义的异常类对象
			throw new Exception("自己定义的异常！");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```

本程序首先实例化了一个 `Exception` 异常类对象，然后利用 `throw` 进行抛出，这时就必须明确进行异常处理。

:::tip 需要结合标准处理结构来使用

实际上 `throw` 操作很少像范例的代码那样，直接抛出一个手工创建异常类的实例化对象（对于异常还是要尽可能回避)
，而其要想使用，<u>必须结合try、catch、 finally、throws一起完成</u>。

:::

