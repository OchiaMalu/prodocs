# foreach 循环

`foreach` 是一种加强型的 `for` 循环操作，主要可以用于简化数组或集合数据的输出操作。下面首先来回顾一下传统数组输出的操作形式。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) {
		int data[] = new int[] { 1, 2, 3, 4, 5 };		// 定义数组
		for (int x = 0; x < data.length; x++) {		// 循环输出数组
			System.out.print(data[x] + "、");
		}
	}
}
```

在传统的数组输出操作中，往往会使用 `for` 循环来控制索引的下标，从而实现数据的输出操作。但是有一部分开发者会认为这样的输出方式需要控制索引，过于麻烦，更希望能够简化一些。所以从
JDK 1.5 开始对于 `for` 循环有了以下形式：

> for(数据类型 变量 : 数组 | 集合){
>
> ​ //每一次循环会自动的将数组的内容设置给变量
>
> }

此时的 `for` 循环操作在每次循环时会自动将当前数组（或集合）的内容依次取出，这样就可以避免索引问题。

```java
package com.yootk.demo;
public class TestDemo {	public static void main(String[] args) {
		int data[] = new int[] { 1, 2, 3, 4, 5 };	// 定义数组
		for (int x : data) { 						// 循环次数由数组长度决定
			// 每一次循环实际上都表示数组的角标增长，会取得每一个数组的内容，并且将其设置给x
			System.out.println(x + "、"); 		// x就是每一个数组元素的内容
		}
	}
}
```

本程序在每一次 `for` 循环时，都会将数组中的内容依次取出，并且设置到 `int` 型变量 x 中，这样程序代码中将不再需要进行索引的操作。

