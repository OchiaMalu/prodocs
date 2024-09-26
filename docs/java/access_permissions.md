# 访问控制权限

对于封装性，实际上之前只讲解了 `private` ，而封装性如果要想讲解完整，必须结合 4 种访问权限来看，这 4 种访问权限的定义如表所示。

| No. | 范围       | private | default | protected | public |
|-----|----------|---------|---------|-----------|--------|
| 1   | 在同一包的同一类 | √       | √       | √         | √      |
| 2   | 同一包的不同类  |         | √       | √         | √      |
| 3   | 不同包的子类   |         |         | √         | √      |
| 4   | 不同包的非子类  |         |         |           | √      |

对于表，可以简单理解为：`private` 只能在一个类中访问；`default` 只能在一个包中访问；`protected`
在不同包的子类中访问；`public` 为所有都可以。

现在对于 `private` 、`default` 、`public` 都已经有所讲解，所以本节重点来学习 `protected` ，通过下面代码进行学习。

```java
package com.yootk.demoa ;
public class A {
	protected String info = "Hello" ;	// 使用protected权限定义
}
```

```java
package com.yootk.demob;
import com.yootk.demoa.A;
public class B extends A { 		// 是A不同包的子类 
	public void print() {			// 直接访问父类中的protected属性
		System.out.println("A类的info = " + super.info);
	}
}
```

由于 B 类是 A 的子类，所以在 B 类中可以直接访问父类中的 `protected` 权限属性

```java
package com.yootk.test;
import com.yootk.demob.B;
public class Test {
	public static void main(String args[]) {
		new B().print();
	}
}
```

本程序直接导入了 B 类，而后实例化对象调用 `print()` 方法，而在 `print()` 方法中利用 `super.info`
直接访问了父类中的 `protected` 权限属性。

:::tip 错误的 `protected` 访问

如果要在 `com.yootk.test` 包中直接利用 `Test` 主类访问 A 中的属性，由于其不是一个包，也不存在继承关系，所以将无法访问。

```java
package com.yootk.test;
import com.yootk.demoa.A;
public class Test {
	public static void main(String args[]) {
		A a = new A();
		System.out.println(a.info);			// 错误：无法访问
	}
}
```

本程序在进行编译时会直接提示用户，`info` 是 `protected` 权限，所以被直接访问。

:::

:::tip 如何选择权限？

**回答：根据结构选择。**

实际上，给出的 4 种权限中，有 3
种权限（private、default、protected）都是对封装的描述，也就是说面向对象的封装性现在才算是真正讲解完整。从实际的开发使用来讲，几乎不会使用到 `default`
权限，所以真正会使用到的封装概念只有两个权限： private、protected。对于访问权限，初学者要把握以下两个基本使用原则即可。

- 属性声明主要使用 `private` 权限；
- 方法声明主要使用 `public` 权限。
