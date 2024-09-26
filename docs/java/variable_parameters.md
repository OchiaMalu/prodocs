# 可变参数

当在 Java
中调用一个方法时，必须严格的按照方法定义的变量进行参数传递，但是在开发中有可能会出现这样一种情况：不确定要传递的参数个数。例如：现在要求设计一个方法，此方法可以实现若干个整型变量的相加操作。最早的时候为了解决这个问题，往往需要将多个参数封装为数组。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) {
		System.out.println(add(new int[]{1,2,3}));	// 传递3个整型数据
		System.out.println(add(new int[]{10,20}));	// 传递2个整型数据
	}
	/**
	 * 实现任意多个整型数据的相加操作
	 * @param data 由于要接收多个整型数据，所以使用数组完成接收
	 * @return 多个整型数据的累加结果
	 */
	public static int add(int [] data) {
		int sum = 0 ; 
		for (int x = 0 ; x < data.length ; x ++) {
			sum += data[x] ;
		}
		return sum ;
	}
}
```

本程序利用数组概念实现了程序的基本要求，将要传递的若干个数据直接通过数组包装，这样就可以随意传递多个参数内容。但是从严格来讲这样的实现并不标准，因为开发要求是可以接收任意多个整型数据，而不是接收一个数组，对于 `add()`
方法，最理想的调用形式是：`add(1,2,3)` （传递三个参数）、 `add(10,20)` （传递两个参数）。

从 JDK1.5 开始，为了解决参数任意多个的问题，专门在方法定义上提供了可变参数的概念，语法形式如下。

> [public | protected | private] [static] [final] [abstract] 返回值类型 方法名称(参数类型 ... 变量){
>
> ​    [return [返回值];]
>
> }

此时开发者可以使用 `参数类型...变量` 的形式传递若干个参数，而有趣的是这多个参数变量传递到方法中都将以指定类型的数组进行保存，也就是说传递时传递的是多个参数，而接收后就变为了一个数组内容。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) {
		// 可变参数支持接收数组
		System.out.println(add(new int[]{1,2,3}));		// 传递3个整型数据
		System.out.println(add(new int[]{10,20}));		// 传递2个整型数据
		// 或者使用“,”区分不同的参数，接收的时候还是数组
		System.out.println(add(1,2,3));				// 传递3个参数
		System.out.println(add(10,20));				// 传递2个参数
		System.out.println(add());					// 不传递参数
	}
	/**
	 * 实现任意多个整型数据的相加操作
	 * @param data 由于要接收多个整型数据，所以使用数组完成接收
	 * @return 多个整型数据的累加结果
	 */
	public static int add(int ... data) {
		int sum = 0 ; 
		for (int x = 0 ; x < data.length ; x ++) {
			sum += data[x] ;
		}
		return sum ;
	}
}
```

通过本程序可以发现，方法在使用可变参数定义后，调用处可以任意传递多个参数，或者直接传递一个数组。而方法本身对于多个参数的处理都统一使用数组进行接收，也就是说这样的参数定义对于用户的使用是非常灵活的，但是又没有脱离最早的操作形式，这样既方便了新的开发者，又方便了那些已经习惯于数组传递多个参数的开发者。
