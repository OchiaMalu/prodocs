# final 关键字

在 Java 中 `final` 称为终结器，在 Java 里面可以使用 `final` 定义类、方法和属性。

(1)使用 `final` 定义的类 **不能再有子类** ，即：任何类都不能继承以 `final` 声明的父类。

```java
final class A {		 	// 此类不能够有子类
}
class B extends A { 		// 错误的继承
}
```

本程序中由于 A 类在定义时使用了 `final` 关键字，这样 A 就不能再有子类了，所以当 B 类继承 A 类时会在编译时出现语法错误。

(2)使用 `final` 定义的方法不能被子类所覆写。

在一些时候由于父类中的某些方法具备一些重要的特征，并且这些特征不希望被子类破坏（不能够覆写)
，就可以在方法的声明处加上`final` ，意思是子类不要去破坏这个方法的原本作用。

```java
class A {
	public final void fun() {}	// 此方法不允许子类覆写
}
class B extends A {
	public void fun() {}			// 错误：此处不允许覆写
}
```

本程序在 A 类中定义的 `fun()` 方法上使用了 `final` 进行定义，这就意味着子类在继承 A 类后将不允许覆写 `fun()` 方法。

(3)使用 `final` 定义的变量就成为了常量，常量必须在定义的时候设置好内容，并且不能修改。

```java
class A {
	final double GOOD = 100.0; 	// GOOD级别就是100.0
	public final void fun() {
		GOOD = 1.1; 				// 错误：不能够修改常量
	}
}
```

在定义常量中还有一个更为重要的概念—— **全局常量** ，所谓全局常量指的就是利用了 `public` 、 `static` 、 `final` 3
个关键字联合定义的常量，例如：

> public static final String STR = "hello";

`static` 的数据保存在公共数据区，所以此处的常量就是一个公共常量。同时读者一定要记住，在定义常量时 **必须对其进行初始化赋值
** ，否则将出现语法错误。
