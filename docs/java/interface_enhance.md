# 接口定义加强

在 Java 中，接口是解决多继承的主要手段，并且接口是由抽象方法和全局常量组成。而这样的设计从 JDK1.8 后开始发生改变，即从JDK1.8
开始可以在接口中定义普通方法（使用 `default` 声明）与静态方法（使用 `static` 声明）。

:::tip 关于接口定义加强的产生背景

实际上 JDK1.8 提供的接口加强定义操作也是为了解决设计上的困境。从 JDK 1.0 （约1995年）开始到 JDK1.7
（约2013年）期间，接口里面就只能定义抽象方法与全局常量，于是就产生了一个问题：某一个接口使用非常广泛，并且这个接口已经产生了至少
30 万个子类，可是如果突然有一天发现，这个接口设计的功能不足，需要扩充一些新的操作方法，并且这些操作方法对于所有的子类实现都是完全相同的。很明显，如果按照已有的习惯，那么该方法肯定要在所有的子类中重复覆写
30 万次，这样的设计就显得非常糟槽糕。所以从 JDK1.8 开始对于接口的定义要求开始放宽，接口里面<u>
可以定义抽象方法与静态方法</u>，并且这些方法可以根据子类继承的原则被所有的接口子类继承，那么之前的方法扩充问题也就得到了很好的解决。

:::

如果要在接口中定义普通方法，那么该方法上必须使用 `default` 来进行定义。

```java
package com.yootk.demo;
interface IMessage { 				// 定义接口
	public void print(); 			// 这是一个接口里面原本定义的方法
	default void fun() { 			// 在接口里面定义了一个普通的方法
		System.out.println("更多课程请访问：www.yootk.com");
	}
}
class MessageImpl implements IMessage {
	@Override
	public void print() {			// 覆写print()方法
		System.out.println("魔乐科技软件学院：www.mldn.cn");
	}
}
public class TestDemo {
	public static void main(String[] args) {
		IMessage msg = new MessageImpl();
		msg.print(); 			// 子类已覆写接口方法
		msg.fun(); 				// 此方法是在接口里面直接定义的
	}
}
```

本程序在 `IMessage` 接口中定义了一个 `fun()` 方法，由于此方法是一个普通方法，所以必须使用 `default`
进行声明，同时该方法会自动被 `Messagelmpl` 子类继承。

使用 `default` 定义普通方法，需要利用实例化对象明确调用。如果用户有需要还可以使用 `static` 定义方法，这样该方法就可以由接口名称直接调用。

```java
package com.yootk.demo;
interface IMessage { 			// 定义接口
	public void print(); 		// 这是一个接口里面原本定义的方法
	static void get() {
		System.out.println("更多课程请访问：www.yootk.com");
	}
}
public class TestDemo {
	public static void main(String[] args) {
		IMessage.get(); 		// 直接利用接口调用静态方法
	}
}
```

本程序在 `IMessage` 接口中定义了 `static` 方法，这样即使在没有 `IMessage` 接口实例化对象时也可以直接通过接口名称进行调用。

:::tip 开发初期不要考虑定义 `static` 方法设计

对于接口的定义与开发，从笔者的角度来讲，开发初期并不建议这样编写，还是应该按照传统的方式，在接口中只定义抽象方法或全局常量，如果开发中确有需要，再考虑使用 `default`
或 `static` 定义方法。

:::
