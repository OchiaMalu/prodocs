# 多线程

在 Java 中，如果要想实现多线程的程序，就必须依靠一个线程的主体类（就好比主类的概念一样，表示的是一个线程的主类)
。但是这个线程的主体类在定义时也需要有一些特殊的要求，即此**类需要继承 `Thread` 类或实现 `Runnable` (Callable)接口**
来完成定义。

:::tip 关于接口问题

JDK 从最早开始定义多线程支持时，只有两种实现要求：要么继承 `Thread` 类，要么实现 `Runnable` 接口，而在 JDK1.5
开始又提供了一个新的线程接口：`Callable` 。

从实际的开发角度而言，很明显，使用接口定义的线程类会更加合理，因为使用继承 `Thread` 类的方式实现会带来单继承局限。

:::

## 继承 Thread 类

`java.lang.Thread` 是一个负责线程操作的类，任何类只需要继承 `Thread`
类就可以成为一个线程的主类。但是既然是主类就必须有它的使用方法，而线程启动的主方法需要覆写 `Thread` 类中的 `run()`
方法实现，线程主体类的定义格式如下。

> class 类名称 extends Thread { //继承 Thread 类
>
> ​ 属性...;
>
> ​ 方法...;
>
> ​ public void run() {
>
> ​ 线程主体方法;
>
> ​ }
>
> }

```java
class MyThread extends Thread {			// 这就是一个多线程的操作类
	private String name ;					// 定义类中的属性
	public MyThread(String name) {		// 定义构造方法
		this.name = name ;
	}
	@Override
	public void run() {						// 覆写run()方法，作为线程的主操作方法
		for (int x = 0 ; x < 200 ; x ++) {
			System.out.println(this.name + " --> " + x);
		}
	}
}
```

本程序线程类的功能是进行循环的输出操作，所有的线程与进程是一样的，都必须轮流去抢占资源，所以多线程的执行应该是多个线程彼此交替执行。也就是说，如果直接调用 `run()`
方法，并不能启动多线程，多线程启动的唯一方法就是 `Thread` 类中的 `start()` 方法：`public void start()`
（调用此方法执行的方法体是 `run()` 方法定义的代码）。

```java
public class TestDemo {								// 主类
	public static void main(String[] args) {
		MyThread mt1 = new MyThread("线程A") ;	// 实例化多线程类对象
		MyThread mt2 = new MyThread("线程B") ;	// 实例化多线程类对象
		MyThread mt3 = new MyThread("线程C") ;	// 实例化多线程类对象
		mt1.start();										// 启动多线程
		mt2.start();										// 启动多线程
		mt3.start();										// 启动多线程
	}
}
```

本程序首先实例化了 3 个线程类对象，然后调用了通过 `Thread` 类继承而来的 `start()` 方法，进行多线程的启动。通过本程序可以发现所有的线程都是交替运行的。

:::tip 为什么多线程启动不是调用run()而必须调用start()?

**回答：多线程的操作需要操作系统支持。**

为了解释多线程启动调用的问题，下面可以打开 `java.lang.Thread` 类的 `start()` 源代码来进行观察。

```java
public synchronized void start() {
    if (threadStatus != 0)
      throw new IllegalThreadStateException();
    group.add(this);
    boolean started = false;
    try {
        start0();
        started = true;
    } finally {
      try {
          if (!started) {
            group.threadStartFailed(this);
          }
      } catch (Throwable ignore) {
      }
   }
}
private native void start0();
```

通过本程序可以发现在 `start()` 方法里面要调用一个 `start()` 方法，而且此方法的结构与抽象方法类似，使用了 `native` 声明。在Java
的开发里面有一门技术称为 Java 本地接口（Java Native Interface,JNI）技术，这门技术的特点是使用 Java
调用本机操作系统提供的函数。但是此技术有一个缺点，<u>不能离开特定的操作系统</u>。如果要想能够执行线程，需要操作系统来进行资源分配，所以此操作严格来讲主要是由
JVM 负责根据不同的操作系统而实现的。即使用 `Thread` 类的 `start()` 方法不仅要启动多线程的执行代码，还要根据不同的操作系统进行资源的分配。

另外，需要提醒读者的是，通过本程序可以发现在 `Thread` 类的 `start()` 方法里面存在一个 `IllegalThreadStateException`
异常抛出。本方法里面使用了 `throw` 抛出异常，按照道理讲应该使用 `try...catch` 处理，或者在` start()`
方法声明上使用 `throws` 声明，但是此处并没有这样的代码，如果要想清楚原因则可以打开 `IllegalThreadStateException` 异常的继承结构。

> java.lang.Object
>
> ​ |—java.lang.Throwable
>
> ​ |—java.lang.Exception
>
> ​ |—java.lang.RuntimeException
>
> ​ |—java.lang.IllegalArgumentException
>
> ​ |—java.lang.IllegalThreadStateException

通过继承结构可以发现此异常属于 `RuntimeException`
的子类，这样就可以由用户选择性进行处理。如果某一个线程对象重复进行了启动（同一个线程对象调用多次 `stat()` 方法)，就会抛出此异常。

:::

## 实现 Runnable 接口

使用 `Thread` 类的确可以方便地进行多线程的实现，但是这种方式最大的缺点就是 **单继承** 的问题，为此，在 Java
中也可以利用`Runnable` 接口来实现多线程，而这个接口的定义如下。

> @FunctionalInterface
>
> public interface Runnable {
>
> ​ public void run();
>
> }

在 `Runnable` 接口中也定义了 `run()` 方法，所以线程的主类只需要覆写此方法即可。

```java
class MyThread implements Runnable { 		// 定义线程主体类
	private String name; 						// 定义类中的属性
	public MyThread(String name) { 			// 定义构造方法
		this.name = name;
	}
	@Override
	public void run() { 							// 覆写run()方法
		for (int x = 0; x < 200; x++) {
			System.out.println(this.name + " --> " + x);
		}
	}
}
```

本程序实现了 `Runnable` 接口并且正常覆写了 `run()` 方法，但是却会存在一个新的问题：要启动多线程，一定需要通过 `Thread`
类中的`start()` 方法才可以完成。如果继承了 `Thread` 类，那么可以直接将 `Thread` 父类中的 `start()`
方法继承下来继续使用，而`Runnable` 接口并没有提供可以被继承的 `start()` 方法，这时该如何启动多线程呢？此时可以观察 `Thread`
类中提供的一个有参构造方法：`public Thread(Runnable target)` ，本方法可以接收一个 `Runnable` 接口对象。

```java
public class TestDemo { 
	public static void main(String[] args) {
		MyThread mt1 = new MyThread("线程A") ;	// 实例化多线程类对象
		MyThread mt2 = new MyThread("线程B") ;	// 实例化多线程类对象
		MyThread mt3 = new MyThread("线程C") ;	// 实例化多线程类对象
		new Thread(mt1).start();						// 利用Thread启动多线程
		new Thread(mt2).start();						// 利用Thread启动多线程
		new Thread(mt3).start();						// 利用Thread启动多线程
	}
}
```

本程序首先利用 `Thread` 类的对象包装了 `Runnable` 接口对象实例 `new Thread(mt1).start()` ，然后利用 `Thread`
类的 `start()` 方法就可以实现多线程的启动。

:::tip 使用 `Lambda` 表达式操作

细心的读者可以发现，在 `Runnable` 接口声明处使用了 `@FunctionalInterface` 的注解，证明 `Runnable`
是一个函数式接口，所以对于范例的操作也可以使用 `Lambda` 表达式的风格编写。

```java
public class TestDemo { 
	public static void main(String[] args) {
		String name = "线程对象" ;
		new Thread(() -> {
			for (int x = 0; x < 200; x++) {
				System.out.println(name + " --> " + x);
			}
		}).start();;
	}
}
```

本程序利用 `Lambda` 表达式直接定义的线程主体实现操作，并且依然依靠 `Thread` 类的 `start()`
方法进行启动，这样的做法要比直接使用 `Runnable` 接口的匿名内部类更加方便。

但是考虑到实际的应用操作，所以讲解时依然以传统类继承的方式讲解多线程的具体操作。

:::

## 多线程两种实现方式的区别

`Thread` 类和 `Runnable` 接口都可以作为同一功能的方式来实现多线程，但从 Java 的实际开发角度来讲，肯定使用 `Runnable`
接口，因为它可以有效避免单继承的局限。那么除了这些，这两种方式是否还有其他联系呢？

为了解释这两种方式的联系，下面可以观察 `Thread` 类的定义。

> public class Thread extends Object implements Runnable

通过定义可以发现 `Thread` 类也是 `Runnable` 接口的子类，这样对于之前利用 `Runnable` 接口实现的多线程，其类图结构如图所示。图所表现出来的代码模式非常类似于
**代理设计模式**
，但是它并不是严格意义上的代理设计模式，因为严格来讲代理设计模式中，代理主题能够使用的方法依然是接口中定义的 `run()`
方法，而此处代理主题调用的是 `start()` 方法，所以只能说形式上 **类似** 于代理设计模式，但本质上还是有差别的。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926104435828.png" alt="image-20240926104435828" style="zoom:80%;" />

除了以上联系外，对于 `Runnable` 接口和 `Thread` 类还有一个不太好区分的特点：使用 `Runnable`
接口可以更加方便地表示出数据共享的概念（但不是说 `Thread` 类不能实现数据共享）。

```java
package com.yootk.demo;
class MyThread extends Thread { 				// 线程的主体类
	private int ticket = 5; 						// 一共5张票
	@Override
	public void run() { 							// 线程的主方法
		for (int x = 0; x < 50; x++) {			// 循环50次
			if (this.ticket > 0) {
				System.out.println("卖票，ticket = " + this.ticket --);
			}
		}
	}
}
public class TestDemo {
	public static void main(String[] args) throws Exception {
		MyThread mt1 = new MyThread() ;		// 创建线程对象
		MyThread mt2 = new MyThread() ;		// 创建线程对象
		MyThread mt3 = new MyThread() ;		// 创建线程对象
		mt1.start() ;								// 启动线程
		mt2.start() ;							// 启动线程
		mt3.start() ;							// 启动线程
	}
}
```

本程序定义了 3 个线程对象，希望 3 个线程对象同时卖 5 张车票，而最终的结果是一共买出了 15 张票，等于每一个线程对象各自卖各自的
5 张票，这时的内存关系如图所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926104544071.png" alt="image-20240926104544071" style="zoom:80%;" />

```java
package com.yootk.demo;
class MyThread implements Runnable { 		// 线程的主体类
	private int ticket = 5; 						// 一共5张票
	@Override
	public void run() { 							// 线程的主方法
		for (int x = 0; x < 50; x++) {			// 循环50次
			if (this.ticket > 0) {
				System.out.println("卖票，ticket = " + this.ticket --);
			}
		}
	}
}
public class TestDemo {
	public static void main(String[] args) throws Exception {
		MyThread mt = new MyThread();		// 创建线程对象
		new Thread(mt).start() ;				// 启动线程
		new Thread(mt).start() ;				// 启动线程
		new Thread(mt).start() ;				// 启动线程
	}
}
```

本程序使用 `Runnable` 实现了多线程，同时启动了 3 个线程对象，但是与使用 `Thread` 操作的卖票范例不同的是，这 3
个线程对象都占着同一个 `Runnable` 接口对象的引用，所以实现了数据共享的操作。本程序的内存关系如图所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926104631009.png" alt="image-20240926104631009" style="zoom:80%;" />

:::tip 使用 `Thread` 类同样可以实现此功能

由于 `Thread` 类是 `Runnable` 接口的子类，所以范例的程序 `MyThread` 类继承 `Thread` 类也可以实现同样的功能。

```java
package com.yootk.demo;
class MyThread extends Thread { 			// 线程的主体类
	private int ticket = 5; 					// 一共5张票
	@Override
	public void run() { 						// 线程的主方法
		for (int x = 0; x < 50; x++) {		// 循环50次
			if (this.ticket > 0) {
				System.out.println("卖票，ticket = " + this.ticket --);
			}
		}
	}
}
public class TestDemo {
	public static void main(String[] args) throws Exception {
		MyThread mt = new MyThread();	// 创建线程对象
		new Thread(mt).start() ;			// 启动线程
		new Thread(mt).start() ;			// 启动线程
		new Thread(mt).start() ;			// 启动线程
	}
}
```

本程序可以实现与范例同样的功能，但是这种实现方式往往不被采用，原因是：如果要想启动多线程肯定要依靠 `Thread` 类的 `start()`
方法，但是依靠 `Runnable` 接口实现的线程主体类没有 `start()` 方法的定义，而继承了 `Thread` 实现的线程主体类存在 `start()`
方法的定义，如果通过 `Thread` 类继承的多线程主体类，再利用 `Thread` 类去实现多线程，这样明显不合适。这就好比两个人在沙漠里走，都只剩下最后一口水，结果
A 对 B 说，把你的水给我喝，我的不喝了，明显是不合适的。所以只能说 `Runnable` 接口要比 `Thread` 类更好地实现数据共享，而不是唯一。

:::

:::tip 多线程的两种实现方式及区别

- 多线程的两种实现方式都需要一个线程的主类，而这个类可以实现 `Runnable` 接口或继承 `Thread`
  类，不管使用何种方式都必须在子类中覆写 `run()` 方法，此方法为线程的主方法；
- `Thread` 类是 `Runnable` 接口的子类，而且使用 `Runnable` 接口可以避免单继承局限，并且可以更加方便地实现数据共享的概念。

程序实现结构如下。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926104959361.png" alt="image-20240926104959361" style="zoom:80%;" />

:::

## 利用 Callable 接口实现多线程

使用 `Runnable` 接口实现的多线程可以避免单继承局限，但是 `Runnable` 接口实现的多线程会存在一个问题：<u>`Runnable`
接口里面的`run()` 方法不能返回操作结果</u>。所以为了解决这样的问题，从 JDK1.5 开始，Java
对于多线程的实现提供了一个新的接口：`java.util.concurrent.Callable` ，此接口定义如下。

> @FunctionalInterface
>
> public interface Callable<V> {
>
> ​ public V call() throws Exception;
>
> }

在本接口中存在一个 `call()` 方法，而在 `call()` 方法上可以实现线程操作数据的返回，而返回的数据类型由 `Callable`
接口上的泛型类型动态决定。

```java
import java.util.concurrent.Callable;
class MyThread implements Callable<String> { 		// 多线程主体类
	private int ticket = 10;								// 卖票
	@Override
	public String call() throws Exception {
		for (int x = 0; x < 100; x++) {
			if (this.ticket > 0) {							// 还有票可以出售
				System.out.println("卖票，ticket = " + this.ticket--);
			}
		}
		return "票已卖光！";						// 返回结果
	}
}
```

本程序中定义的 `call()` 方法在操作完成后可以直接返回一个具体的操作数据，本次返回的是一个 `String` 型数据。

当多线程的主体类定义完成后，要利用 `Thread` 类启动多线程，但是在 `Thread`
类中并没有定义任何构造方法可以直接接收 `Callable` 接口对象实例，并且由于需要接收 `call()` 方法返回值的问题，从 JDK 1.5
开始，Java 提供了一个 `java.util.concurrent.FutureTask<V>` 类，此类定义如下。

> public class FutureTask<V>
>
> extends Object
>
> implements RunnableFuture<V>

通过定义可以发现此类实现了 `RunnableFuture` 接口，而 `RunnableFuture` 接口又同时实现了 `Future` 与 `Runnable`
接口。`FutureTask` 类继承结构如图所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926105454388.png" alt="image-20240926105454388" style="zoom:80%;" />

清楚了 `FutureTask` 类的继承结构之后，下面再来研究 `FutureTask` 类的常用方法，如表所示。

| No. | 方法                                                             | 类型 | 描述                         |
|-----|----------------------------------------------------------------|----|----------------------------|
| 1   | public FutureTask(Callable callable)                           | 构造 | 接收Callable接口实例             |
| 2   | public FutureTask(Runnable runnable, V result)                 | 构造 | 接收Runnable 接口实例，并指定返回 结果类型 |
| 3   | public V get() throws Interrupted Exception,ExecutionException | 普通 | 取得线程操作结果，此方法为Future 接口定义   |

通过 `FutureTask` 类继承结构可以发现它是 `Runnable` 接口的子类，并且 `FutureTask` 类可以接收 `Callable`
接口实例，这样依然可以利用 `Thread` 类来实现多线程的启动，而如果要想接收返回结果，利用 `Future` 接口中的 `get()` 方法即可。

```java
public class TestDemo {
	public static void main(String[] args) throws Exception {
		MyThread mt1 = new MyThread();		// 实例化多线程对象
		MyThread mt2 = new MyThread();		// 实例化多线程对象
		FutureTask<String> task1 = new FutureTask<String>(mt1) ;
		FutureTask<String> task2 = new FutureTask<String>(mt2) ;
		// FutureTask是Runnable接口子类，所以可以使用Thread类的构造来接收task对象
		new Thread(task1).start();			// 启动第一个线程 
		new Thread(task2).start(); 			// 启动第二个线程
		// 多线程执行完毕后可以取得内容，依靠FutureTask的父接口Future中的get()方法实现
		System.out.println("A线程的返回结果：" + task1.get());
		System.out.println("B线程的返回结果：" + task2.get());
	}
}
```

本程序利用 `FutureTask` 类实现 `Callable` 接口的子类包装，由于 `FutureTask` 是 `Runnable`
接口的子类，所以可以利用 `Thread` 类的`start()` 方法启动多线程，当线程执行完毕后，可以利用 `Future` 接口中的 `get()`
方法返回线程的执行结果。

:::tip 如果实现多线程，建议使用 `Runnable` 接口完成

通过 `Callable` 接口与 `Runnable` 接口实现的比较，读者可以发现，`Callable` 接口只是胜在有返回值上。但是 `Runnable` 接口是
Java 最早提供的，也是使用最广泛的接口，所以在进行多线程实现时还是建议优先考虑使用 `Runnable` 接口。

:::

## 线程的操作状态

要想实现多线程，必须在主线程中创建新的线程对象。任何线程一般都具有 5 种状态，即<u>创建、就绪、运行、堵塞和终止</u>。线程转换状态如图所示。

### 创建状态

在程序中用构造方法创建一个线程对象后，新的线程对象便处于新建状态，此时，它已经有相应的内存空间和其他资源，但还处于不可运行状态。新建一个线程对象可采用 `Thread`
类的构造方法来实现，例如：`Thread thread = new Thread()` 。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926105923788.png" alt="image-20240926105923788" style="zoom:80%;" />

### 就绪状态

新建线程对象后，调用该线程的 `start()` 方法就可以启动线程。当线程启动时，线程进入就绪状态。此时，线程将进入线程队列排队，等待
CPU 服务，这表明它已经具备了运行条件。

### 运行状态

当就绪状态的线程被调用并获得处理器资源时，线程就进入了运行状态。此时，自动调用该线程对象的 `run()` 方法。`run()`
方法定义了该线程的操作和功能。

### 堵塞状态

一个正在执行的线程在某些特殊情况下，如被人为挂起或需要执行耗时的输入输出操作时，将让出 CPU
并暂时中止自己的执行，进入堵塞状态。在可执行状态下，如果调用 `sleep()` 、`suspend()` 、`wait()`
等方法，线程都将进入堵塞状态。堵塞时，线程不能进入排队队列，只有当引起堵塞的原因被消除后，线程才可以转入就绪状态。

### 终止状态

线程调用 `stop()` 方法时或 `run()` 方法执行结束后，就处于终止状态。处于终止状态的线程不具有继续运行的能力。
