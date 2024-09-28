# 线程的生命周期

在 Java 中，一个线程对象也有自己的生命周期，如果要控制好线程的生命周期，首先应该认识其生命周期。线程的生命周期如图所示。

从图中可以发现，大部分线程生命周期的方法基本上都已经学过了，只有以下 3 个属于新方法。

- suspend() 方法：暂时挂起线程；
- resume() 方法：恢复挂起的线程；
- stop() 方法：停止线程。

但是对于线程中 `suspend()` 、`resume()` 、`stop()` 3 个方法并不推荐使用，它们也已经被慢慢废除掉了，主要原因是这 3 个方法在操作时会
**产生死锁** 的问题。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926114450716.png" alt="image-20240926114450716" style="zoom:80%;" />

:::tip suspend()、resume()、stop()方法使用 @Deprecated 声明

有兴趣的读者可以打开 `Thread` 类的源代码，从中可以发现suspend()、resume()、 stop()方法的声明上都加入了一条 `@Deprecated`
的注释，这属于 `Annotation` 的语法，表示此操作不建议使用。所以一旦使用了这些方法将出现警告信息。

:::

既然以上 3 个方法不推荐使用，那么该如何停止一个线程的执行呢？在多线程的开发中可以通过设置 **标志位** 的方式停止一个线程的运行。

```java
package com.yootk.demo;
class MyThread implements Runnable {
	private boolean flag = true; 					// 定义标志位属性
	public void run() {								// 覆写run()方法
		int i = 0;
		while (this.flag) {							// 循环输出
			while (true) {
				System.out.println(Thread.currentThread().getName() + "运行，i = "
						+ (i++));					// 输出当前线程名称
			}
		}
	}
	public void stop() { 								// 编写停止方法
		this.flag = false;							// 修改标志位
	}
}
public class StopDemo {
	public static void main(String[] args) {
		MyThread my = new MyThread();			// 实例化Runnable接口对象
		Thread t = new Thread(my, "线程");		// 建立线程对象
		t.start() ;									// 启动线程
		my.stop() ;									// 线程停止，修改标志位
	}
}
```

本程序一旦调用 `stop()` 方法就会将 `MyThread` 类中的flag变量设置为 `false` ，这样 `run()` 方法就会停止运行，这种停止方式是开发中比较推荐的。
