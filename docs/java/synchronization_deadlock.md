# 线程的同步与死锁

程序利用线程可以进行更为高效的程序处理，如果在没有多线程的程序中，一个程序在处理某些资源时会有主方法（主线程全部进行处理），但是这样的处理速度一定会比较慢，如图所示。如果采用了多线程的处理机制，利用主线程创建出许多子线程（相当于多了许多帮手），一起进行资源的操作，那么执行效率一定会比只使用一个主线程更高。

<img src="http://niu.ochiamalu.top/image-20240926111836594.png" alt="image-20240926111836594" style="zoom:80%;margin:0 auto" />

:::tip 关于子线程

在程序开发中，所有程序都是通过主方法执行的，而主方法本身就属于一个主线程，所以通过主方法创建的新的线程对象都是子线程。在Android
开发中，默认运行的 Activity 就可以理解为主线程，当移动设备需要读取网络信息时往往会启动新的子线程读取，而不会在主线程中操作。

利用子线程可以进行异步的操作处理，这样可以在不影响主线程运行的前提下进行其他操作，程序的执行速度不仅变快了，并且操作起来也不会产生太多的延迟。对于此部分读者理解起来可能会有些困难，希望随着读者的开发经验提升，自己慢慢可以领会的更多。

:::

## 同步问题的引出

同步是多线程开发中的一个重要概念，既然有同步，就一定会存在不同步的操作。所以本节将为读者分析线程不同步所带来的影响。

多个线程操作同一资源就有可能出现不同步的问题，例如：现在产生 N 个线程对象实现卖票操作，同时为了更加明显地观察不同步所带来的问题，所以本程序将使用线程的休眠操作。

```java
package com.yootk.demo;
class MyThread implements Runnable {
	private int ticket = 5; 						// 一共有5张票
	@Override
	public void run() {
		for (int x = 0; x < 20; x++) {
			if (this.ticket > 0) {					// 判断当前是否还有剩余票
				try {
					Thread.sleep(100);			// 休眠1s，模拟延迟
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				System.out.println(Thread.currentThread().getName()
						+ " 卖票，ticket = " + this.ticket--);
			}
		}
	}
}
public class TestDemo { 
	public static void main(String[] args) throws Exception {
		MyThread mt = new MyThread();
		new Thread(mt, "票贩子A").start();		// 启动多线程
		new Thread(mt, "票贩子B").start();			// 启动多线程
		new Thread(mt, "票贩子C").start();			// 启动多线程
		new Thread(mt, "票贩子D").start();			// 启动多线程
	}
}
```

本程序模拟了一个卖票程序的实现，其中将有 4
个线程对象共同完成卖票的任务，为了保证每次在有剩余票数时实现卖票操作，在卖票前增加了一个判断条件 `if(this.ticket>0)`
，满足此条件的线程对象才可以卖票，不过根据最终的结果却发现，这个判断条件的作用并不明显。从范例的操作代码可以发现，对于票数的操作有如下步骤。

(1)判断票数是否大于0，大于0表示还有票可以卖；

(2)如果票数大于0，则卖票出去。

但是，在范例的操作代码中，在第 1 步和第 2 步之间加入了 **延迟操作** ，那么一个线程就有可能在还没有对票数进行减操作之前，其他线程就已经将票数减少了，这样一来就会出现
**票数为负** 的情况，如图所示。

<img src="http://niu.ochiamalu.top/image-20240926112115493.png" alt="image-20240926112115493" style="zoom:80%;margin:0 auto" />

## 同步操作

如果想解决范例程序的问题，就必须使用 **同步操作** 。所谓同步操作就是一个代码块中的多个操作在同一个时间段内只能有一个线程进行，其他线程要
**等待** 此线程完成后才可以继续执行，如图所示。

<img src="http://niu.ochiamalu.top/image-20240926112202302.png" alt="image-20240926112202302" style="zoom:80%;margin:0 auto" />

在 Java 里面如果要想实现线程的同步，操作可以使用 `synchronized` 关键字。`synchronized` 关键字可以通过以下两种方式进行使用。

- 同步代码块：利用 `synchronized` 包装的代码块，但是需要指定同步对象，一般设置为 `this` 。
- 同步方法：利用 `synchronized` 定义的方法。

:::tip 关于代码块

Java中有 4 种代码块：<u>普通代码块、构造块、静态块、同步块</u>。对于前面 3 种代码块已经为读者讲解过了，所以本节只讲解同步块的使用。

:::

```java
package com.yootk.demo;
class MyThread implements Runnable {
	private int ticket = 5; 						// 一共有5张票
	@Override
	public void run() {
		for (int x = 0; x < 20; x++) {
			synchronized(this) {					// 定义同步代码块
				if (this.ticket > 0) {					// 判断当前是否还有剩余票
					try {
						Thread.sleep(100);			// 休眠1s，模拟延迟
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					System.out.println(Thread.currentThread().getName()
							+ " 卖票，ticket = " + this.ticket--);
				}
			}
		}
	}
}
public class TestDemo { 
	public static void main(String[] args) throws Exception {
		MyThread mt = new MyThread();
		new Thread(mt, "票贩子A").start();		// 启动多线程
		new Thread(mt, "票贩子B").start();			// 启动多线程
		new Thread(mt, "票贩子C").start();			// 启动多线程
		new Thread(mt, "票贩子D").start();			// 启动多线程
	}
}
```

本程序将判断是否有票以及卖票的两个操作都统一放到了同步代码块中，这样当某一个线程操作时，其他线程无法进入到方法中进行操作，从而实现了线程的同步操作。

```java
package com.yootk.demo;
class MyThread implements Runnable {
	private int ticket = 5; 						// 一共有5张票
	@Override
	public void run() {
		for (int x = 0; x < 20; x++) {
			this.sale();							// 卖票操作
		}
	}
	public synchronized void sale() {			// 同步方法
		if (this.ticket > 0) {						// 判断当前是否还有剩余票
			try {
				Thread.sleep(100);				// 休眠1s，模拟延迟
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println(Thread.currentThread().getName()
					+ " 卖票，ticket = " + this.ticket--);
		}
	}
}
public class TestDemo { 
	public static void main(String[] args) throws Exception {
		MyThread mt = new MyThread();
		new Thread(mt, "票贩子A").start();	// 启动多线程
		new Thread(mt, "票贩子B").start();		// 启动多线程
		new Thread(mt, "票贩子C").start();		// 启动多线程
		new Thread(mt, "票贩子D").start();		// 启动多线程
	}
}
```

此时利用同步方法同样解决了同步操作的问题。但是在此处需要说明一个问题：<u>
加入同步后明显比不加入同步慢许多，所以同步的代码性能会很低，但是数据的安全性会高，或者可以称为线程安全性高</u>。

:::tip 关于方法的完整定义格式

Java 中方法的完整定义格式如下。

> [public | protected | private] [static] [final] [native] [synchronized] 方法返回值类型 方法名称(参数列表 |
> 可变参数) [throws 异常,异常...] {
>
> ​    [return [返回值];]
>
> }

在定义方法时都可以参照以上格式实现，考虑到 Java 方法定义的相关概念较为复杂，所以在一开始并没有给出完整格式。

:::

:::tip 同步和异步有什么区别，在什么情况下分别使用它们？

如果一块数据要在多个线程间进行共享。例如，正在写的数据以后可能被另一个线程读到，或者正在读的数据可能已经被另一个线程写过了，那么这些数据就是共享数据，必须进行同步存取。当应用程序在对象上调用了一个需要花费很长时间来执行的方法，并且不希望让程序等待方法的返回时，就应该使用异步编程，在很多情况下采用异步途径往往更有效率。

:::

:::tip abstract 的 method 是否可以同时是 static ，是否可以同时是 native ，是否可以同时是 synchronized ?

static、native、synchronized 都不能和 `abstract` 同时声明方法。

:::

:::tip 当一个线程进入一个对象的 synchronized 方法后，其他线程是否可访问此对象的其他方法？

不能访问，一个对象操作一个 synchronized 方法只能由一个线程访问。

:::

## 死锁

同步就是指一个线程要等待另外一个线程执行完毕才会继续执行的一种操作形式，虽然在一个程序中，使用同步可以保证资源共享操作的正确性，但是过多同步也会产生问题。例如：张三想要李四的画，李死想要张三的书，那么张三对李四说了：“把你的画给我，我就给你书”，李四也对张三说了：“把你的书给我，我就给你画”，此时，张三在等着李四的答复，而李四也在等着张三的答复，这样下去最终结果可想而知，张三得不到李四的画，李四也得不到张三的书，这实际上就是死锁的概念，如图所示。

<img src="http://niu.ochiamalu.top/image-20240926113019430.png" alt="image-20240926113019430" style="zoom:80%;margin:0 auto" />

所谓死锁就是指两个线程都在等待彼此先完成，造成了程序的停滞状态，一般程序的死锁都是在程序运行时出现的，下面通过一个简单的范例来观察一下出现死锁的情况。

```java
package com.yootk.demo;
class A {
	public synchronized void say(B b) {
		System.out.println("A先生说：把你的本给我，我给你笔，否则不给！");
		b.get();
	}
	public synchronized void get() {
		System.out.println("A先生：得到了本，付出了笔，还是什么都干不了！");
	}
}
class B {
	public synchronized void say(A a) {
		System.out.println("B先生说：把你的笔给我，我给你本，否则不给！");
		a.get();
	}
	public synchronized void get() {
		System.out.println("B先生：得到了笔，付出了本，还是什么都干不了！");
	}
}
public class TestDemo implements Runnable {
	private static A a = new A();				// 定义类对象
	private static B b = new B();				// 定义类对象
	public static void main(String[] args) throws Exception {
		new TestDemo();						// 实例化本类对象
	}
	public TestDemo() {						// 构造方法
		new Thread(this).start();				// 启动线程
		b.say(a);								// 互相引用
	}
	@Override
	public void run() {
		a.say(b);								// 互相引用
	}
}
```

本程序由于两个类的都使用了同步方法定义，<u>就会造成 a 对象等待 b 对象执行完毕，而 b 对象等待 a
对象执行完毕，这样就会出现死锁现象</u>。

:::tip 请解释多个线程访问同一资源时需要考虑到哪些情况？有可能带来哪些问题？

- 多个线程访问同一资源时，考虑到数据操作的安全性问题，一定要使用同步操作。同步有以下两种操作模式：

|—同步代码块：synchronized(锁定对象){代码}；

|—同步方法：public synchronized 返回值 方法名称(){代码}。

- 过多的同步操作有可能会带来死锁问题，导致程序进入停滞状态。

:::

