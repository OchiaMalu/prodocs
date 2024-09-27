# Lambda 表达式

`Lambda` 表达式是 JDK1.8 引入的重要技术特征。所谓 `Lambda` 表达式指的是应用在单一抽象方法（Single Abstract
Method,SAM）接口环境下的一种简化定义形式，可以用于解决匿名内部类的定义复杂问题。

```java
package com.yootk.demo;
interface IMessage {
	public void print() ;
}
public class TestDemo {
	public static void main(String[] args) {
		// 此处为Lamda表达式，没有任何输入参数，只是进行输出操作
		fun(() -> System.out.println("更多课程请访问：www.yootk.com"));
	}
	public static void fun(IMessage msg) {
		msg.print() ;
	}
}
```

在本程序中所使用的 `()->System.out.printIn("更多课程请访问：www.yootk.com")` 就属于 `Lambda`
表达式的定义格式，其目的是覆写`IMessage` 接口中的 `print()` 方法，相当于匿名内部类的操作形式。

:::tip Lambda 表达式与匿名内部类进行对比

```java
package com.yootk.demo;
interface IMessage {
	public void print() ;
}
public class TestDemo {
	public static void main(String[] args) {
		fun(new IMessage() {		// 等价于Lamda表达式定义
			@Override
			public void print() {
				System.out.println("更多课程请访问：www.yootk.com") ;
			}
		});
	}
	public static void fun(IMessage msg) {
		msg.print() ;
	}
}
```

本程序利用匿名内部类实现了与 `Lambda` 表达式完全一样的功能，当然，从最终的代码来看，使用 `Lambda` 表达式的确要比使用匿名内部类简洁。

:::

清楚了 `Lambda` 表达式的基本作用后，下面来观察 `Lambda` 表达式的语法。

> (参数) -> 方法体

对于范例的代码 `()->System.outprintln("更多课程请访问：www.yootk.com")` 实际上就可以根据如图所对应的关系来进行描述。

<img src="http://niu.ochiamalu.top/image-20240925230552385.png" alt="image-20240925230552385" style="zoom:80%;margin:0 auto" />

:::tip 关于 `@Functionallnterface` 注解的使用

在 `Lambda`
表达式中已经明确要求是在接口上进行的一种操作，并且接口中只允许定义一个抽象方法。但是在一个项目开发中往往会定义大量的接口，而为了分辨出 `Lambda`
表达式的使用接口，可以在接口上使用 `@FunctionalInterface` 注解声明，这样就表示此为函数式接口，里面只允许定义一个抽象方法。

```java
@FunctionalInterface 
interface IMessage {
	public void print() ;
}
```

从理论上讲，如果一个接口只有一个抽象方法，写与不写 `@Functionallnter face`
注解是没有区别的，但是从标准上讲，还是建议读者写上此注解。同时需要注意的是，在函数式接口中依然可以定义普通方法与静态方法。

:::

范例的代码属于没有接收参数并且方法体只有一行执行语句的情况，但是很多时候，方法需要定义参数，并且方法体可能会有多行语句，所以对于 `Lambda`
表达式的使用有如下 3 种形式。

- 方法主体为一个表达式：`(params) -> expression;`
- 方法主体为一行执行代码：`(params) -> statement;`
- 方法主体需要编写多行代码：`(params)->{statements}` 。

```java
package com.yootk.demo;
@FunctionalInterface 
interface IMessage {
	public void print() ;
}
public class TestDemo {
	public static void main(String[] args) {
		String info = "魔乐科技软件学院：www.mldn.cn" ;
		fun(() -> { 
			System.out.println("更多课程请访问：www.yootk.com") ;
			System.out.println(info) ;		// 输出方法中的变量
		});
	}
	public static void fun(IMessage msg) {
		msg.print() ;
	}
}
```

本程序在定义 `Lambda` 表达式方法体时由于存在多行执行语句，所以使用 `{}` 进行声明。

:::tip 关于匿名内部类 `final` 的使用问题

在本书前面讲解内部类概念时曾经为读者强调过，在 JDK1.8 以前如果内部类要访问方法的参数或方法中定义的变量，需要使用 `final`
进行定义，而 JDK1.8 之后将此限制取消了。这样做有很大程度上是为了 `Lambda` 表达式准备的。

:::

```java
package com.yootk.demo;
@FunctionalInterface 
interface IMessage {
	public int add(int x, int y);
}
public class TestDemo {
	public static void main(String[] args) {
		fun((s1, s2) -> {			// 传递两个参数，此处只是一个参数标记
			return s1 + s2;
		});
	}
	public static void fun(IMessage msg) {
		System.out.println(msg.add(10, 20));
	}
}
```

本程序首先在 `IMessage` 接口中定义了一个 `add()` 方法，这个方法上要接收两个 `int` 型参数。然后要在相应的 `Lambda`
表达式中定义同样个数的参数（此处为 `s1` 和 `s2` ，只是一个标记），这样就可以在 `Lambda` 表达式中使用参数数据进行计算了。

:::tip 如果只是简单计算并返回，则可以省略return,直接编写表达式

在范例程序中方法体中只编写了一行返回语句，对于这样的操作，`Lambda` 表达式可以简化处理，即取消“}”声明，直接编写数学计算表达式。

```java
	public static void main(String[] args) {
		// 直接返回两个参数的计算结果，省略return
		fun((s1, s2) -> s1 + s2);
	}
```

本程序的计算结果与范例8-46的结果一样，但是其结构更加简短。

:::

```java
package com.yootk.demo;
@FunctionalInterface 
interface IMessage {
	public int add(int ... args);
	static int sum(int ... args) {					// 此方法可以由接口名称直接调用
		int sum = 0;
		for (int temp : args) {
			sum += temp;
		}
		return sum;
	}
}
public class TestDemo {
	public static void main(String[] args) {
		// 在Lamda表达式中直接调用接口里定义的静态方法
		fun((int... param) -> IMessage.sum(param));
	}
	public static void fun(IMessage msg) {
		System.out.println(msg.add(10, 20, 30));	// 传递可变参数
	}
}
```

本程序首先在接口中定义了一个 `sum()` 的静态方法，然后在使用 `Lambda` 表达式时直接传递了可变参数，并且调用 `sum()` 进行求和计算。
