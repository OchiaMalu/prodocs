# 生产者与消费者案例

在开发中线程的运行状态并不固定，所以只能利用线程的名字以及当前执行的线程对象来进行区分。但是多个线程间也有可能会出现数据交互的情况。本次将利用一个线程的经典操作案例来为读者分析线程的交互中存在问题以及问题的解决方案。

## 问题的引出

在生产者和消费者模型中，生产者不断生产，消费者不断取走生产者生产的产品，如图所示

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926113559638.png" alt="image-20240926113559638" style="zoom:80%;" />

在图中非常清楚地表示出，生产者生产出信息后将其放到一个区域中，然后消费者从此区域里取出数据，但是在本程序中因为牵涉线程运行的不确定性，所以会存在以下两点问题。

(1)假设生产者线程向数据存储空间添加信息的名称，还没有加入该信息的内容，程序就切换到了消费者线程，消费者线程将把该信息的名称和上一个信息的内容联系到一起。

(2)生产者放了若干次的数据，消费者才开始取数据，或者是消费者取完一个数据后，还没等到生产者放入新的数据，又重复取出已取过的数据。

```java
package com.yootk.demo;
class Message {
	private String title ;							// 保存信息的标题
	private String content ;						// 保存信息的内容
	public void setTitle(String title) {
		this.title = title;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTitle() {
		return title;
	}
	public String getContent() {
		return content;
	}
}
class Producer implements Runnable {				// 定义生产者
	private Message msg = null ;
	public Producer(Message msg) {
		this.msg = msg ;
	}
	@Override
	public void run() {
		for (int x = 0; x < 50; x++) {				// 生产50次数据
			if (x % 2 == 0) {
				this.msg.setTitle("李兴华") ;		// 设置title属性
				try {
					Thread.sleep(100) ;			// 延迟操作
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				this.msg.setContent("Java讲师") ;	// 设置content属性
			} else {
				this.msg.setTitle("mldn") ;			// 设置title属性
				try {
					Thread.sleep(100) ;
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				this.msg.setContent("www.mldnjava.cn") ;	// 设置content属性
			}
		}
	}
}
class Consumer  implements Runnable {				// 定义消费者
	private Message msg = null ;
	public Consumer (Message msg) {
		this.msg = msg ;
	}
	@Override
	public void run() {
		for (int x = 0; x < 50; x++) {					// 取走50次数据
			try {
				Thread.sleep(100) ;					// 延迟
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println(this.msg.getTitle() + " --> " + this.msg.getContent());
		}
	}
}
public class TestDemo {
	public static void main(String[] args) throws Exception {
		Message msg = new Message() ;				// 定义Message对象，用于保存和取出数据
		new Thread(new Producer(msg)).start() ;		// 启动生产者线程
		new Thread(new Consumer(msg)).start() ;		// 取得消费者线程
	}
}
```

本程序只列出了部分输出内容，但是通过本程序的运行结果可以发现两个严重的问题：**设置的数据错位；数据会重复取出和重复设置**。

## 解决数据错乱问题

数据错位完全是因为非同步的操作，所以应该使用同步处理。因为取出和设置是两个不同的操作，所以要想进行同步控制，就需要将其定义在一个类里面完成。

```java
package com.yootk.demo;
class Message {
	private String title ;							// 保存信息的标题
	private String content ;						// 保存信息的内容
	public synchronized void set(String title, String content) {
		this.title = title;
		try {
			Thread.sleep(200);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		this.content = content;
	}
	public synchronized void get() {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(this.title + " --> " + this.content);
	}
	// setter、getter略
}
class Producer implements Runnable {						// 定义生产者
	private Message msg = null ;
	public Producer(Message msg) {
		this.msg = msg ;
	}
	@Override
	public void run() {
		for (int x = 0; x < 50; x++) {						// 生产50次数据
			if (x % 2 == 0) {
				this.msg.set("李兴华","Java讲师") ;			// 设置属性
			} else {
				this.msg.set("mldn","www.mldnjava.cn") ;	// 设置属性
			}
		}
	}
}
class Consumer  implements Runnable {					// 定义消费者
	private Message msg = null ;
	public Consumer (Message msg) {
		this.msg = msg ;
	}
	@Override
	public void run() {
		for (int x = 0; x < 50; x++) {						// 取走50次数据
			this.msg.get() ;									// 取得属性
		}
	}
}
public class TestDemo {
	public static void main(String[] args) throws Exception {
		Message msg = new Message() ;					// 定义Message对象，用于保存和取出数据
		new Thread(new Producer(msg)).start() ;			// 启动生产者线程
		new Thread(new Consumer(msg)).start() ;			// 取得消费者线程
	}
}
```

本程序利用同步方法解决了数据的错位问题，但是同时也可以发现，<u>重复取出与重复设置的问题更加严重了</u>。

## 解决数据重复问题

要想解决数据重复的问题，需要 **等待及唤醒机制** ，而这一机制的实现只能依靠 `Object` 类完成，在 `Object` 类中定义了 3
个方法完成线程的操作，如表所示。

| No. | 方法                                                   | 类型 | 描述        |
|-----|------------------------------------------------------|----|-----------|
| 1   | public final void wait() throws InterruptedException | 普通 | 线程的等待     |
| 2   | public final void notify()                           | 普通 | 唤醒第一个等待线程 |
| 3   | public final void notifyAll()                        | 普通 | 唤醒全部等待线程  |

从表中可以发现，一个线程可以为其设置等待状态，但是对于唤醒的操作却有两个：`notify()` 、 `notifyAll()`
。一般来说，所有等待的线程会按照顺序进行排列。如果使用了 `notify()`
方法，则会唤醒第一个等待的线程执行；如果使用了 `notifyAll()` 方法，则会唤醒所有的等待线程。哪个线程的优先级高，哪个线程就有可能先执行，如图所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926113946337.png" alt="image-20240926113946337" style="zoom:80%;" />

清楚了 `Object` 类中的 3
个方法作用后，下面就可以利用这些方法来解决程序中的问题。如果想让生产者不重复生产，消费者不重复取走，则可以增加一个标志位，假设标志位为 `boolean`
型变量。如果标志位的内容为 `true`
，则表示可以生产，但是不能取走，如果此时线程执行到了，消费者线程则应该等待；如果标志位的内容为 `false`
，则表示可以取走，但是不能生产，如果生产者线程运行，则应该等待。操作流程如图所示。

要想完成解决数据重复的功能，直接修改 `Message` 类即可。在 `Message` 类中加入标志位，并通过判断标志位完成等待与唤醒的操作。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240926114058797.png" alt="image-20240926114058797" style="zoom:80%;" />

```java
class Message {
	private String title;
	private String content;
	private boolean flag = true;
	// flag == true：表示可以生产，但是不能取走
	// flag == false：表示可以取走，但是不能生产
	public synchronized void set(String title, String content) {
		if (this.flag == false) { 					// 已经生产过了，不能生产
			try {
				super.wait();					// 等待
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		this.title = title;
		try {
			Thread.sleep(200);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		this.content = content;
		this.flag = false;						// 已经生产完成，修改标志位
		super.notify();							// 唤醒等待线程
	}
	public synchronized void get() {
		if (this.flag == true) { 					// 未生产，不能取走
			try {
				super.wait();					// 等待
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(this.title + " --> " + this.content);
		this.flag = true; 						// 已经取走了，可以继续生产
		super.notify();							// 唤醒等待线程
	}
	// setter、getter略
}
```

从本程序的运行结果中可以清楚地发现，生产者每生产一个信息就要等待消费者取走，消费者每取走一个信息就要等待生产者生产，这样就避免了重复生产和重复取走的问题。

:::tip 请解释 `sleep()` 和 `wait()` 的区别

- sleep() 是 `Thread` 类定义的 `static` 方法，表示线程休眠，将执行机会给其他线程，但是监控状态依然保持，会自动恢复；
- wait() 是 `Object` 类定义的方法，表示线程等待，一直到执行了 `notify()` 或 `notifyAll()` 后才结束等待。

:::

