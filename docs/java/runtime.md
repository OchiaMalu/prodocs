# Runtime 类

在每一个 JVM 进程中，都会存在一个运行时的操作类的对象，而这个对象所属的类型就是 `Runtime` 类。利用 `Runtime`
类可以启动新的进程或进行相关运行时环境的操作，例如：<u>取得内存空间以及释放垃圾空间</u>。`Runtime` 类中的常用方法如表所示。

:::tip `Runtime` 类使用了单例设计模式

在学习面向对象概念时曾经强调过一个概念，一个类中至少会存在一个构造方法如果本类没有定义任何构造方法，那么会自动生成一个无参的什么都不做的构造方法。但是当用户打开 `Runtime`
类时会发现一个问题，在这个类中并没有构造方法的定义说明，可是这个类的构造方法却是真实存在的，因为其在声明时对构造方法进行了封装，所以 `Runtime`
类是一个典型的单例设计模式。

单例设计模式所属的类一定会提供一个 `static` 型的方法，用于取得本类的实例化对象，所以在 `Runtime`
类中也提供了一个`getRuntime()` 方法用于取得本类实例化对象。取得 `Runtime`
类实例化对象的方法为：`public static Runtime getRuntime()` 。

:::

| No. | 方法                                                     | 类型 | 描述              |
|-----|--------------------------------------------------------|----|-----------------|
| 1   | public static Runtime getRuntime()                     | 普通 | 取得Runtime类实例化对象 |
| 2   | public long maxMemory()                                | 普通 | 返回最大可用内存大小      |
| 3   | public long totalMemory()                              | 普通 | 返回所有可用内存大小      |
| 4   | public long freeMemory()                               | 普通 | 返回所有空余内存大小      |
| 5   | public void gc()                                       | 普通 | 执行垃圾回收操作        |
| 6   | public Process exec(String command) throws IOException | 普通 | 创建新的进程          |

在 `Runtime` 类有一个非常重要的方法：`public void gc()` ，用于运行垃圾收集器，释放垃圾空间，即调用此方法后所产生的垃圾空间将被释放。

:::warning 取得内存信息时，返回的数据为 long

在 `Runtime` 类中的 `maxMemory()` 、`totalMemory()` 、`freeMemory()` 3 个方法可以取得 JVM 的内存信息，而这 3
个方法的返回数据类型都是 `long` 。在之前讲解基本数据类型时强调 `long` 型数据在两种情况下使用：表示文件可用内存大小；表示日期时间数字。

:::

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		Runtime run = Runtime.getRuntime(); 				// 取得Runtime类的实例化对象
		System.out.println("MAX = " + run.maxMemory());	// 取得最大可用内存
		System.out.println("TOTAL = " + run.totalMemory());// 取得全部可用内存
		System.out.println("FREE = " + run.freeMemory());	// 取得空闲内存
	}
}
```

本程序动态取得当前系统中的各个内存空间信息，返回的结果单元是 **字节** (Byte)。

:::tip 这些可用内存是固定的吗？

**回答：利用启动参数可以调整内存空间。**

首先，需要明确地告诉读者，Java 中可用内存空间是可以调整的，但是在调整之前，需要介绍 Java 中的内存划分，如图所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926151103814.png" alt="image-20240926151103814" style="zoom:80%;" />

每一块内存空间都会存在一个内存伸缩区，当内存空间不足时就会动态开辟。所以为了提高性能，在实际应用中可能会开辟尽量大一些的内存空间，可以使用如下参数。

- `-Xms` ：初始分配内存，默认大小为 1/64 物理内存大小，但小于1G；
- `-Xmx` ：最大分配内存，默认大小为 1/4 物理内存大小，但小于1G；

- `-Xmn` ：设置年轻代堆内存大小。一般都会将 `-Xms` 与 `-Xmx` 两个参数的数值设为相同，以减少申请内存空间的时间。

:::

在 `Runtime` 类中存在一个 `gc()` 方法，利用此方法可以实现垃圾内存的释放处理操作。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		Runtime run = Runtime.getRuntime();	// 取得Runtime类的实例化对象
		String str = "";
		for (int x = 0; x < 2000; x++) {
			str += x; 							// 产生大量垃圾
		}
		System.out.println("【垃圾处理前内存量】MAX = " + run.maxMemory());
		System.out.println("【垃圾处理前内存量】TOTAL = " + run.totalMemory());
		System.out.println("【垃圾处理前内存量】FREE = " + run.freeMemory());
		run.gc(); 							// 释放垃圾空间
		System.out.println("〖垃圾处理后内存量〗MAX = " + run.maxMemory());
		System.out.println("〖垃圾处理后内存量〗TOTAL = " + run.totalMemory());
		System.out.println("〖垃圾处理后内存量〗FREE = " + run.freeMemory());
	}
}
```

本程序利用 `for` 循环产生了许多垃圾空间，通过输出可以发现，垃圾产生后的空闲空间已经明显减少，而调用了 `gc()` 方法后空间将得到释放。

:::tip 垃圾回收处理与对象创建

虽然垃圾收集只通过一个 `gc()` 方法就可以实现，但是垃圾回收与 Java 的内存划分也是有关系的。因为垃圾回收主要是对年轻代（Young
Generation）与I旧生代（Old Generation）的内存进行回收。

年轻代内存空间用于存放新产生的对象，而经过若干次回收还没有被回收掉的对象向I旧生代内存空间移动。对年轻代进行垃圾回收称为MinorGC（从垃圾收集），对旧生代垃圾回收称为MajorGC（主垃圾收集），并且两块内存回收互不干涉。在
JVM 中的对象回收机制会使用分代回收（Generational Collection）的策略，用较高的频率对年轻代对象进行扫描和回收，而对旧生代对象则用较低的频率进行回收，这样就不需要在每次执行
GC 时将内存中的所有对象都检查一遍。

对于 GC 的执行可以用文字描述为：当 JVM 剩余内存空间不足时会触发 GC ，如果 Eden 内存空间不足就要进行从回收（Minro
Collection），旧生代空间不足时要进行主回收（Major Collection），永久代空间不足时会进行完全垃圾收集（Full Collection）。

清楚了 JVM 的内存空间分配，读者就可以进一步理解对象创建流程，如图所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926151559885.png" alt="image-20240926151559885" style="zoom:80%;" />

(1）当使用关键字 `new` 创建一个新对象时，JVM 会将新对象保存在 `Eden` 区，但是此时需要判断 `Eden`
区是否有空余空间，如果有，则直接将新对象保存在 `Eden` 区内，如果没有，则会执行 `Minor GC` （年轻代 GC ）。

(2)在执行完 `Minor GC` 后会清除掉不活跃的对象，从而释放 `Eden` 区的内存空间，随后会对 `Eden`
空间进行再次判断。如果此时剩余空间可以直接容纳新对象，则会直接为新对象申请内存空间；如果此时 `Eden`
区的空间依然不足，则会将部分活跃对象保存在 `Survivor` 区。

(3)由于 `Survivor` 区也有对象会存储在内，所以在保存 `Eden` 区发送来的对象前首先需要判断其空间是否充足，如果 `Survivor`
有足够的空余空间，则直接保存 `Eden` 区晋升来的对象，那么此时 `Eden` 区将得到空间释放，随后可以在 `Eden`
区为新的对象申请内存空间的开辟；如果 `Survivor` 区空间不足，就需要将 `Survivor` 区的部分活跃对象保存到 `Tenured` 区。

(4) `Tenured` 区如果有足够的内存空间，则会将 `Survivor` 区发送来的对象进行保存，如果此时 `Tenured`
区的内存空间也已经满了，则将执行 `Full GC` （完全 GC 或称为 `Major GC`
，包括年轻代和老年代，相当于使用 `Runtime.getRuntime().gc()`
处理）以释放老年代中保存的不活跃对象。如果在释放后有足够的内存空间，则会保存 `Survivor` 发送来的对象，从而 `Survivor`
将保存 `Eden` 发送来的对象，这样就可以在 `Eden` 区内有足够的内存保存新的对象。

(5)如果此时老年代的内存区也已经被占满，则会抛出 `OutOfMemoryError` （OOM错误），程序将中断运行。

:::

实际上 `Runtime` 类还有一个更加有意思的功能，就是说它可以调用本机的可执行程序，并且创建进程。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) throws Exception {
		Runtime run = Runtime.getRuntime(); 			// 取得Runtime类的实例化对象
		Process pro = run.exec("mspaint.exe"); 		// 调用本机可执行程序
		Thread.sleep(2000);							// 运行2s后自动关闭
		pro.destroy(); 									// 销毁进程
	}
}
```

本程序运行后会立刻在系统中增加一个画板程序的进程，过 2s 后将自动销毁此进程。
