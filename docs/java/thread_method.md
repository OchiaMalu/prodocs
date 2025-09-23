# 多线程常用操作方法

Java 除了支持多线程的定义外，也提供了许多多线程操作方法，其中大部分方法都是在 `Thread` 类中定义的，下面介绍 3 个主要方法的使用。

## 线程的命名与取得

所有线程程序的执行，每一次都是不同的运行结果，因为它会根据自己的情况进行资源抢占，所以要想区分每一个线程，就必须依靠线程的名字。对于线程名字一般而言会在其启动之前进行定义，不建议对已经启动的线程更改名称，或者是为不同的线程设置重名的情况。

如果要想进行线程命名的操作，可以使用 `Thread` 类的方法，如表所示。

由于多线程的状态不确定，所以线程的名字就成为了唯一的分辨标记，则在定义线程名称时一定要在线程启动前设置名字，而尽量不要重名，且量不要为已经启动的线程修改名字。

由于线程的状态不确定，所以每次可以操作的都是正在执行 `run()`
方法的线程，那么取得当前线程对象的方法为：`public static Thread currentThread()` 。

<img src="http://niu.ochiamalu.fun/image-20240928120124257.png" alt="image-20240928120124257" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
class MyThread implements Runnable {
	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName());
	}
}
public class TestDemo {
	public static void main(String[] args) throws Exception {
		MyThread mt = new MyThread();
		new Thread(mt, "自己的线程A").start();
		new Thread(mt).start();
		new Thread(mt, "自己的线程B").start();
		new Thread(mt).start();
		new Thread(mt).start();
	}
}
```

通过本程序可以发现，当实例化 `Thread` 类对象时可以自己定义线程名称，也可以采用默认名称进行操作。在 `run()`
方法中可以使用`currentThread()` 取得当前线程对象后再取得具体的线程名字。

```java
package com.yootk.demo;
class MyThread implements Runnable {
	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName());
	}
}
public class TestDemo {
	public static void main(String[] args) throws Exception {
		MyThread mt = new MyThread();
		new Thread(mt, "自己的线程对象").start();
		mt.run(); 				// 直接调用run()方法，main
	}
}
```

本程序首先实例化了 `Thread` 类对象，然后利用多线程启动 `start()` 间接调用了 `run()`
方法，同时又在主类中直接利用对象调用了`MyThread` 类中的 `run()` 方法，这样就可以发现主方法本身也属于一个线程。

:::tip 进程在哪里？

所有的线程都是在进程的基础上划分的，如果说主方法是一个线程，那么进程在哪里？

**回答：每一个JVM运行就是进程。**

当用户使用 Java 命令执行一个类时就表示启动了一个 JVM
的进程，而主方法只是这个进程上的一个线程而已，当一个类执行完毕后，此进程会自动消失（在视频中已有验证)。而且每一个 JVM
进程都至少启动以下两个线程。

- main 线程：程序的主要执行，以及启动子线程；
- gc 线程：负责垃圾收集

:::

## 线程的休眠

线程的休眠指的是让程序的执行速度变慢一些，在 `Thread`
类中线程休眠操作方法为：`public static void sleep(long millis) throws  InterruptedException` ，设置的休眠单位是毫秒（ms）。

```java
package com.yootk.demo;
class MyThread implements Runnable {
	@Override
	public void run() {
		for (int x = 0; x < 10000; x++) {
			try {
				Thread.sleep(1000);				// 每次执行休眠1s
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println(Thread.currentThread().getName() + "，x = " + x);
		}
	}
}
public class TestDemo {
	public static void main(String[] args) throws Exception {
		MyThread mt = new MyThread();
		new Thread(mt, "自己的线程对象A").start();
	}
}
```

本程序在每一次线程执行 `run()` 方法时都会产生 1 s左右的延迟后才会进行内容的输出，所以整体代码执行速度有所降低。

## 线程优先级

在 Java 的线程操作中，所有的线程在运行前都会保持就绪状态，此时哪个线程的优先级高，哪个线程就有可能会先被执行。线程的优先级如图所示。

如果要想进行线程优先级的设置，在 `Thread` 类中提供了支持的方法及常量，如表所示。

<img src="http://niu.ochiamalu.fun/image-20240926111322738.png" alt="image-20240926111322738" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.fun/image-20240928120153502.png" alt="image-20240928120153502" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.fun/image-20240928120200971.png" alt="image-20240928120200971" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
class MyThread implements Runnable {
	@Override
	public void run() {
		for (int x = 0; x < 20; x++) {
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println(Thread.currentThread().getName() + "，x = " + x);
		}
	}
}
public class TestDemo { 
	public static void main(String[] args) throws Exception {
		MyThread mt = new MyThread();
		Thread t1 = new Thread(mt, "自己的线程对象A");
		Thread t2 = new Thread(mt, "自己的线程对象B");
		Thread t3 = new Thread(mt, "自己的线程对象C");
		T3.setPriority(Thread.MAX_PRIORITY);			// 修改一个线程对象的优先级
		t1.start();
		t2.start();
		t3.start();
	}
}
```

本程序定义了 3 个线程对象，并在线程对象启动前，利用 `setPriority()` 方法修改了一个线程的优先级。

:::warning 主线程的优先级

主方法也是一个线程，那么主方法的优先级是多少呢？下面编写一段代码来观察。

```java
public class TestDemo {
	public static void main(String[] args) throws Exception {
		System.out.println(Thread.currentThread().getPriority());
	}
}
```

根据表所列出的优先级常量，可以发现数值为 5 的优先级，其对应的是中等优先级。

:::

