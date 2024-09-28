# System 类

`System` 类是本书一直使用的一个操作类，这个操作类提供一些系统的支持操作，常用方法如表所示。

| No. | 方法                                                                                         | 类型 | 描述                    |
|-----|--------------------------------------------------------------------------------------------|----|-----------------------|
| 1   | public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length) | 普通 | 数组复制操作                |
| 2   | public static long currentTimeMillis()                                                     | 普通 | 取得当前的日期时间，以long型数据 返回 |
| 3   | public static void gc()                                                                    | 普通 | 垃圾收集                  |

:::tip 关于数组复制

数组复制在讲解数组操作的时候讲解过，而当时考虑到学习的层次性问题，给出的方法定义格式和表有所不同。

- `System.arraycopy(源数组名称，源数组开始点，目标数组名称目标数组开始点，长度)` ；
- `System` 类定义：`public static void arraycopy(Object src,int srcPos,Object dest,int destPos,int length)` 。

因为 `Object` 类可以接收数组引用，所以在最初讲解数组时，考虑到知识学习层次问题并没有按照标准给出定义格式，从此处读者就需要记住正确的定义格式了。

:::

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		long start = System.currentTimeMillis(); 		// 取得开始时间
		String str = "";
		for (int x = 0; x < 30000; x++) {
			str += x;
		}
		long end = System.currentTimeMillis();		// 取得结束时间
		System.out.println("本次操作所花费的时间：" + (end - start));
	}
}
```

本程序首先在循环执行前取得了一次当前日期时间数，然后在操作完成后重复取得了一次当前日期时间数，经过减法操作可以计算出本次操作所花费的时间（单位为毫秒）。

在 `System` 类中还存在一个很有意思的方法：`public static void gc()` ，但是这个 `gc()`
方法并不是一个新的操作方法，而是间接调用了 `Runtime` 类中的 `gc()` 方法，不表示一个重写的方法。所以调用 `System.gc()`
和调用 `Runtime.getRuntime().gc()` 最终的效果是完全一样的。

如果要产生一个对象，可以通过构造方法处理一些对象产生时的操作，但是当一个对象被回收呢？可以发现 Java 中没有像 C++
那样的析构函数（对象回收前的收尾）。如果希望在一个对象收尾时执行一些收尾工作，则对象所在的类可以通过 `finalize()`
方法实现，此方法由 `Object` 类定义。对象回收方法如下。

> protected void finalize() throws Throwable

:::tip 为什么 `finalize()` 方法上抛出的是 `Throwable` ?

**回答：出现异常或错误都不会导致程序中断。**

在进行对象回收前，有可能代码会产生异常(Exception)，或者由于 JVM 的一些问题而产生错误（Error)
，但是不管出现任何异常或错误，都不会导致程序中断执行，这样写只是为了强调 `finalize()` 方法的完善性。

:::

```java
package com.yootk.demo;
class Human {
	public Human() {
		System.out.println("欢天喜地，一个健康的孩子诞生了。");
	}
	@Override
	protected void finalize() throws Throwable {		// 覆写Object类方法
		System.out.println("活了250年，到时候了！");
		throw new Exception("此处即使抛出异常对象也不会产生任何影响！");
	}
}
public class TestDemo {
	public static void main(String[] args) {
		Human mem = new Human(); 					// 实例化新的对象
		mem = null; 									// 产生垃圾
		System.gc(); 									// 手工处理垃圾收集
	}
}
```

本程序实现了一个完整的对象声明周期监控，可以发现，当使用关键字 `new`
实例化新对象时将调用构造方法，而当一个对象的堆内存空间被回收后将自动调用 `finalize()`
方法，这样就可以进行一些对象回收前的收尾操作。并且此方法即使产生任何异常或错误，也不会影响程序的正常执行。
