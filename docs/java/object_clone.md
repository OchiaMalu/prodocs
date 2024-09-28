# 对象克隆

克隆就是对象的 **复制** 操作，在 `Object` 类中存在一个 `clone()` 方法用于对象的克隆。克隆方法如下。

> protected Object clone throws CloneNotSupportedException;

此方法是实现克隆的唯一方法，所有类的对象只有调用此方法才可以进行克隆，但是此方法本身使用了 `protected`
访问权限，这样当在不同的包产生对象时将无法调用 `Object` 类中的 `clone()` 方法，因此就需要子类来覆写 `clone()`
方法（但依然调用的是父类中的`clone()` 方法)，才可以正常完成克隆操作。

:::tip 标识性接口的特点

在 `clone()` 方法上抛出一个 `CloneNotSupportedException` (不支持的克隆异常)。这是因为不是所有类的对象都可以被克隆。在 Java
中为了区分出哪些类对象可以被克隆，专门提供一个 `Cloneable` 接口，也就是说要克隆对象的类必须实现 `Cloneable` 接口。

但是 `Cloneable` 接口没有任何方法，所以这个接口属于 **标识接口** ，用于 **表示一种能力** 。

:::

```java
package com.yootk.demo;
class Book implements Cloneable { 					// 此类的对象可以被克隆
	private String title;
	private double price;
	public Book(String title, double price) {
		this.title = title;
		this.price = price;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	@Override
	public String toString() {
		return "书名：" + this.title + "，价格：" + this.price;
	}
	// 由于此类需要对象克隆操作，所以才需要进行方法的覆写
	@Override
	public Object clone() throws CloneNotSupportedException {
		return super.clone(); 							// 调用父类的克隆方法
	}
}
public class TestDemo {
	public static void main(String[] args) throws Exception {
		Book bookA = new Book("Java开发", 79.8);		// 实例化新对象
		Book bookB = (Book) bookA.clone();			// 克隆对象，开辟新的堆内存空间
		bookB.setTitle("JSP开发");						// 修改克隆对象属性，不影响其他对象
		System.out.println(bookA);
		System.out.println(bookB);
	}
}
```

本程序由于 `Book` 类对象需要进行克隆操作，所以定义类时实现了 `Cloneable` 接口，同时在 `Book` 类中覆写了 `clone()`
方法（实际上还是调用了父类中的 `clone()` )。在主类中首先产生一个新的实例化对象 `bookA` ，然后利用 `bookA`
对象的内容克隆出一个新的 `Book` 类对象 `bookB` ，由于两个对象占据不同的堆内存空间，彼此间不会互相影响。
