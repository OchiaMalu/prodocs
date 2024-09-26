# Annotation

JDK1.5 之后，最具有鲜明特点的莫过 **注解** 技术的提出与应用，利用注解技术可以回避面向对象中覆写方法名称固定的问题，并且其直观的描述也适合开发者进行程序的编写。

在 Java SE 里为了方便用户编写代码，提供了 3 种最为常用的基础 `Annotation` 定义，分别是：<u>@Override，@Deprecated， @Suppress
Warnings</u>。

## 准确的覆写：@Override

当进行方法覆写时，为了保证子类所覆写的方法的确是父类中定义过的方法，就可以加上 `@Override`
注解，这样即用户覆写方法时出现了错误，也可以在编译时直接检查出来。

```java
class Book {
	@Override					// 只要正确进行了覆写，就不会出现编译的语法错误 
	public String toString() {	// 原本打算覆写toString()
		return "《名师讲坛 —— Oracle开发实战经典》" ;
	}
}
```

本程序中 `Book` 类覆写了 `Object` 父类中的 `toString()` 方法，为了保证此方法覆写的正确性，在方法定义上使用了 `@Override`
注解。

:::tip 不写 `@Override` 在正确覆写时没有任何问题，但是一旦覆写错误将无法验证。

在开发中经常由于键入代码错误，而导致方法没有正确覆写。

```java
class Book {
	public String tostring() {	// 原本打算覆写toString()
		return "这是一本书！" ;
	}
}
```

本程序原本打算覆写 `Object` 类中的 `toString()`
方法，但是字母大小写输入错误，所以此时将无法正确覆写，而如果有了 `@Override` 注解后就可以在程序编译时检查出来。

## 声明过期操作：@Deprecated

如果有一个专门负责完成某些功能的工具包，里面有一个 `Hello` 类，在 `Book` 类里面有一个 `fun()`
方法，在所有项目最初的发展阶段，`fun()`
方法非常完善，并且已经在大量的项目代码中正常使用。但是后来随着开发技术的不断加强，发现 `fun()`
方法的功能不足，于是这时对于开发者有以下两个修改 `fun()` 方法的选择。

- **选择一：** 直接在新版本的工具包里面取消 `fun()` 方法，同时直接给出新的 `fun2()` 方法；
- **选择二：** 在新版本的开发包里面保存 `fun()` 方法，但是通过某种途径告诉新的开发者，此方法有问题，并且提供 `fun2()`
  这个新的方法供开发者使用。

很明显，这两种选择中第二种会比较合适，因为第二种做法可以兼顾已使用项目的情况。这时就可以使用 `@Deprecated`
注解来声明过期的不建议使用的方法。

```java
package com.yootk.demo;
class Book {
	@Deprecated							// 此方法为过期操作
	public void fun() {						// 使用会有警告，但是不会出错
	}
}
public class TestDemo {
	public static void main(String[] args) {
		Book book = new Book();
		book.fun();							// 此方法不建议使用
	}
}
```

本程序中 `Book` 类中的 `fun()` 方法上使用 `@Deprecated` 注解声明，这样就表示此方法不建议使用，如果在开发中继续使用此方法，就会出现警告信息。

## 压制警告：@SuppressWarnings

如果使用了不安全的操作，程序在编译时一定会出现安全警告（例如：使用实例化支持泛型类时，没有指定泛型类型），而如果很多情况下，开发者已经明确地知道这些警告信息却执意按照固定方式处理，那么这些警告信息的重复出现就有可能造成开发者的困扰，这时可以在有可能出现警告信息的代码上使用 `@Suppress Warnings`
压制所有出现的警告信息。

```java
package com.yootk.demo;
class Book<T> {
	private T title;	
	public void setTitle(T title) {
		this.title = title;
	}
	public T getTitle() {
		return title;
	}
}
public class TestDemo {
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String[] args) {
		Book book = new Book();		// 没有声明泛型，产生“rawtypes”警告信息
		book.setTitle("HELLO");		// 出现警告信息，产生“unchecked”警告信息
	}
}
```

本程序在主方法上使用了两个不安全的操作，一个是实例化 `Book` 类对象时没有设置泛型类型，另外一个是在调用 `setTitle()`
方法时由于没有设置正确的泛型，所以也会出现警告信息。而使用 `@Suppress Warnings` 就可以让这些警告信息消失，不再重复提示。
