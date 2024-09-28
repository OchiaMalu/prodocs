# Object 类

利用继承与对象多态性的概念可以解决子类对象与父类对象的自动转型操作，但是如果要想统一开发中的参数类型，就必须有一种类可以成为
**所有类的父类** ，而这个类就是 `Object` 类。下面来介绍 `Object` 类的具体使用。

## Object 类的基本定义

`Object` 类是所有类的父类，也就是说任何一个类在定义时如果没有明确地继承一个父类，那它就是 `Object`
类的子类，也就是说以下两种类定义的最终效果是完全相同的。

```java
class Book {
    
}
```

```java
class Book extends Object {

}
```

既然 `Object` 类是所有类的父类，那么最大的一个好处就在于：<u>利用 `Object`
类可以接收全部类的对象，因为可以向上自动转型</u>。

```java
class Book extends Object {
}
public class TestDemo {
	public static void main(String args[]) {
		Object obja = new Book(); 			// 向上转型，接收Book子类对象
		Object objb = "hello"; 				// 向上转型，接收String子类对象
		Book b = (Book) obja;				// 测试向下转型
		String s = (String) objb;			// 测试向下转型
	}
}
```

本程序为了测试 `Object` 可以接收任意类对象，使用 `Book` 类与 `String`
类实现了向上与向下转型操作。所以在设计代码时，如果在不确定参数类型时，使用 `Object` 类应该是最好的选择。

:::tip `Object` 类提供无参构造方法

通过 `JavaDoc` 文档读者可以发现，在 `Object` 类中提供了一个无参构造方法 `public Object()`
，之所以提供这样的无参构造，是因为在子类对象实例化时都会默认调用父类中的无参构造方法，这样在定义类时即使没有明确定义父类为 `Object`
，读者也不会感觉到代码的强制性要求。

:::

除此之外，对于任意一个简单的 Java 类而言，理论上应该覆写 `Object` 类中的 3 个方法，如表所示。

<img src="http://niu.ochiamalu.top/image-20240928130215057.png" alt="image-20240928130215057" style="zoom:80%;margin:0 auto" />

表中所定义的方法都将默认在 `Object` 的子类继承（所有类都继承），但是要根据具体的情祝来选择覆写哪个方法。

## 取得对象信息：toString()

在之前讲解时曾经给读者讲解过这样的概念，如果现在要直接输出一个对象那么<u>默认情况下将会输出这个对象的编码</u>
，但是不知道读者是否思考过这样一个问题，`String` 也是一个类，但是 `String` 类对象输出的却是内容，下面进行分析。

```java
class Book extends Object {					// 子类可以继承Object类中的方法
}
public class TestDemo {
	public static void main(String args[]) {
		Object obja = new Book(); 				// 向上转型，接收Book子类对象
		Object objb = "yootk"; 					// 向上转型，接收String子类对象
		System.out.println(obja);
		System.out.println(obja.toString());		// 直接调用toString()方法输出
		System.out.println(objb);				// 输出String对象
	}
}
```

通过本程序的执行读者可以发现，在输出一个对象时不管是否调用 `toString()` ，其最终都是调用 `toString()`
将对象信息转换为`String` 进行输出，而在 `Object` 类中的 `toString()`
方法设计时，由于要考虑其可以满足所有对象的输出信息，所以默认返回的是对象的编码。而之所以 `String`
类对象输出的时候没有输出编码，是因为在 `String` 类中已经明确地覆写了 `toString()`
方法，依照这个思路，读者也可以根据自己的情况来选择覆写 `toString()` 方法。

```java
class Book {									// 此类为Object子类
	private String title;
	private double price;
	public Book(String title, double price) {
		this.title = title;
		this.price = price;
	}
	public String toString() { 				// 替代了getInfo()，并且toString()可以自动调用
		return "书名：" + this.title + "，价格：" + this.price;
	}
	// setter、getter、无参构造略
}
public class TestDemo {
	public static void main(String args[]) {
		Book b = new Book("Java开发", 79.9);	// 实例化对象
		System.out.println(b);					// 直接输出对象，默认调用toString()
	}
}
```

本程序在 `Book` 类中覆写了 `toString()` 方法（最早为了方便使用 `getInfo()` 方法代替)
，而在进行对象输出时，就可以发现会自动调用对象所在类的 `toString()` 方法将对象变为字符串后输出。

## 对象比较：equals()

实际上对于 `equals()` 方法读者应该并不陌生，这个方法在 `String` 类中使用过，而 `String` 也是 `Object`
类的子类，所以 `String` 类的 `equals()` 方法就是覆写 `Object` 类中的 `equals()` 方法。在 `Object` 类中，默认的 `equals()`
方法实现比较的是两个对象的内存地址数值，但是并不符合真正的对象比较需要（按照之前讲解的对象比较操作而言，还需要比较对象内容)
。而在之前使用了一个自定义名的 `compare()` 方法作为对象比较方法的名称，但是这个名称不标准，标准的做法是使用 `equals()`
方法完成。

```java
class Book {
	private String title;
	private double price;
	public Book(String title, double price) {
		this.title = title;
		this.price = price;
	}
	public boolean equals(Object obj) {
		if (this == obj) { 					// 地址相同
			return true;
		}
		if (obj == null) {					// 对象内容为null
			return false;
		}
		if (!(obj instanceof Book)) { 		// 不是本类实例
			return false;
		}
		Book book = (Book) obj;
		if (this.title.equals(book.title) && this.price == book.price) {
			return true;
		}
		return false;
	}
	public String toString() { 					// 替代了getInfo()，并且toString()可以自动调用
		return "书名：" + this.title + "，价格：" + this.price;
	}
	// setter、getter、无参构造略
}
public class TestDemo {
	public static void main(String args[]) {
		Book b1 = new Book("Java开发", 79.9);	// 实例化对象
		Book b2 = new Book("Java开发", 79.9);	// 实例化对象
		System.out.println(b1.equals(b2));		// 对象比较
	}
}
```

本程代码与第 3 章讲解的对象比较操作实现完全相同，唯一的区别在于方法名称上，而本程序的代码就是对象比较的标准操作。

## Object 类与引用数据类型

`Object` 是所有类的父类，因此 `Object` 类可以接收所有类的对象。但是在 Java 设计时，考虑到引用数据类型的特殊性，所以 `Object`
类实际上是<u>可以接收所有引用数据类型的数据</u>，这就包括数组、接口、类。

```java
public class TestDemo {
	public static void main(String args[]) {
		Object obj = new int[] { 1, 2, 3 }; 			// 向上转型
		System.out.println(obj); 					// 数组编码：[I@1db9742
		if (obj instanceof int[]) { 					// 谁否是int数组
			int data[] = (int[]) obj; 					// 向下转型
			for (int x = 0; x < data.length; x++) {	
				System.out.print(data[x] + "、");
			}
		}
	}
}
```

本程序首先将数组对象向上转型为 `Object` 类型，然后利用 `instanceof` 关键字判断当前的 `Object` 对象是否为 `int`
型数组，如果条件判断满足，则进行输出。在本程序中特别需要提醒读者的是，数组直接输出的对象信息，都会带有一个 `“[”`
的标记，第二位是数组类型的标记。

:::warning 关于数组对象的编码问题

读者可以发现在本程序中直接打印数组时的输出信息为 `[I@1db9742` ，只要是数组对象的直接输出，第一位都是 `“[”`
，第二位是数组类型的简短标记，例如：`int` 型数组是 `I` ，`double` 型数组是 `D` ，而后就是数组对象的编码。

:::

`Object` 除了可以接收数组对象外，接口对象也同样可以利用 `Object` 接收。但是一定要记住一点，<u>
接口不会继承任何类，所以也不会继承 `Object`</u> ，而之所以可以使用 `Object` 接收，是因为接口属于引用数据类型。

```java
interface A {
	public void fun();
}
class B extends Object implements A {	// 所有类一定继承Object类，所以此处只是强调说明
	public void fun() {
		System.out.println("更多课程请访问：www.yootk.com");
	}
	public String toString() {
		return "魔乐科技：www.mldn.cn" ;
	}
}
public class TestDemo {
	public static void main(String args[]) {
		A a = new B(); 			// 实例化接口对象
		Object obj = a; 			// 接收接口对象
		A t = (A) obj; 				// 向下转型
		t.fun();						// 调用接口方法
		System.out.println(t);		// 直接调用toString()输出
	}
}
```

本程序首先定义了一个 A 接口的子类 B 并且覆写了 A 接口的 `fun()`
方法，然后主方法为了测试转型，先将接口对象向上转型为 `Object` 类型，再将其向下转型为 A 接口实例，最后调用 `fun()`
方法以及直接输出接口对象（调用 `toString()` 方法)。

## 修改链表

在之前讲解链表程序的开发过程中，一直存在这样的一个设计问题：<u>链表不能实现操作数据的统一</u>
，所以就造成了每一次使用链表时都需要进行重复开发。但是由于 `Object`
类型可以接收所有引用数据类型，利用这样的特性就可以弥补之前链表设计中的参数不统一问题，也就可以开发出真正的可重用链表操作。但是在链表中需要依靠对象比较的操作支持（在链表中的 `contains()`
与 `remove()` 两个方法），所以就要求在操作类中覆写 `equals()` 方法。

```java
class Link { 								// 链表类，外部能够看见的只有这一个类
	private class Node { 					// 定义的内部节点类
		private Object data; 				// 要保存的数据
		private Node next; 				// 下一个节点引用
		public Node(Object data) {			// 每一个Node类对象都必须保存相应的数据
			this.data = data;
		}
		/**
		 * 设置新节点的保存，所有的新节点保存在最后一个节点之后
		 * @param newNode 新节点对象
		 */
		public void addNode(Node newNode) {
			if (this.next == null) {			// 当前的下一个节点为null
				this.next = newNode ; 		// 保存节点
			} else {							// 向后继续保存
				this.next.addNode(newNode) ;
			}
		}
		/**
		 * 数据检索操作，判断指定数据是否存在
		 * 第一次调用（Link）：this = Link.root
		 * 第二次调用（Node）：this = Link.root.next
		 * @param data 要查询的数据
		 * @return 如果数据存在返回true，否则返回false
		 */
		public boolean containsNode(Object data) {
			if (data.equals(this.data)) { 			// 当前节点数据为要查询的数据
				return true; 					// 后面不再查询了
			} else { 							// 当前节点数据不满足查询要求
				if (this.next != null) { 			// 有后续节点
					return this.next.containsNode(data);	// 递归调用继续查询
				} else { 						// 没有后续节点
					return false; 				// 没有查询到，返回false
				}
			}
		}
		/**
		 * 根据索引取出数据，此时该索引一定是存在的
		 * @param index 要取得数据的索引编号
		 * @return 返回指定索引节点包含的数据
		 */
		public Object getNode(int index) {
			// 使用当前的foot内容与要查询的索引进行比较，随后将foot的内容自增，目的是下次查询方便
			if (Link.this.foot++ == index) {			// 当前为要查询的索引
				return this.data; 					// 返回当前节点数据
			} else { 								// 继续向后查询
				return this.next.getNode(index);	// 进行下一个节点的判断
			}
		}
		/**
		 * 修改指定索引节点包含的数据
		 * @param index 要修改的索引编号
		 * @param data 新数据
		 */
		public void setNode(int index, Object data) {
			// 使用当前的foot内容与要查询的索引进行比较，随后将foot的内容自增，目的是下次查询方便
			if (Link.this.foot++ == index) {		// 当前为要修改的索引
				this.data = data; 				// 进行内容的修改
			} else {
				this.next.setNode(index, data);	// 继续下一个节点的索引判断
			}
		}
		/**
		 * 节点的删除操作，匹配每一个节点的数据，如果当前节点数据符合删除数据
		 * 则使用“当前节点上一节点.next = 当前节点.next”方式空出当前节点
		 * 第一次调用（Link），previous = Link.root、this = Link.root.next
		 * 第二次调用（Node）,previous = Link.root.next、this = Link.root.next.next
		 * @param previous 当前节点的上一个节点
		 * @param data 要删除的数据
		 */
		public void removeNode(Node previous, Object data) {
			if (data.equals(this.data)) { 				// 当前节点为要删除节点
				previous.next = this.next; 			// 空出当前节点
			} else { 									// 应该向后继续查询
				this.next.removeNode(this, data);	// 继续下一个判断
			}
		}
		/**
		 * 将节点中保存的内容转化为对象数组
		 * 第一次调用（Link）：this = Link.root；
		 * 第二次调用（Node）：this = Link.root.next；
		 */
		public void toArrayNode() {
			Link.this.retArray[Link.this.foot++] = this.data;	// 取出数据并保存在数组中
			if (this.next != null) { 							// 有后续元素
				this.next.toArrayNode();						// 继续下一个数据的取得
			}
		}
	}
	// ===================== 以上为内部类 ===================
	private Node root; 							// 根节点定义
	private int count = 0 ;						// 保存元素的个数
	private int foot = 0 ;							// 节点索引
	private Object [] retArray ;					// 返回的数组
	/**
	 * 用户向链表增加新的数据，在增加时要将数据封装为Node类，这样才可以匹配节点顺序
	 * @param data 要保存的数据
	 */
	public void add(Object data) { 				// 假设不允许有null
		if (data == null) {						// 判断数据是否为空
			return;								// 结束方法调用
		}
		Node newNode = new Node(data); 		// 要保存的数据
		if (this.root == null) { 					// 当前没有根节点
			this.root = newNode; 				// 保存根节点
		} else { 								// 根节点存在
			this.root.addNode(newNode);		// 交给Node类处理节点的保存
		}
		this.count ++ ;							// 数据保存成功后保存个数加一
	}
	/**
	 * 取得链表中保存的数据个数
	 * @return 保存的个数，通过count属性取得
	 */
	public int size() { 							// 取得保存的数据量
		return this.count;
	}
	/**
	 * 判断是否是空链表，表示长度为0，不是null
	 * @return 如果链表中没有保存任何数据则返回true，否则返回false
	 */
	public boolean isEmpty() {
		return this.count == 0;
	}
	/**
	 * 数据查询操作，判断指定数据是否存在，如果链表没有数据直接返回false
	 * @param data 要判断的数据
	 * @return 数据存在返回true，否则返回false
	 */
	public boolean contains(Object data) {
		if (data == null || this.root == null) {	// 现在没有要查询的数据，根节点也不保存数据
			return false ;						// 没有查询结果
		}
		return this.root.containsNode(data) ;	// 交由Node类查询
	}
	/**
	 * 根据索引取得保存的节点数据
	 * @param index 索引数据
	 * @return 如果要取得的索引内容不存在或者大于保存个数，返回null，反之返回数据
	 */
	public Object get(int index) {
		if (index > this.count) {					// 超过了查询范围
			return null ;						// 没有数据
		}
		this.foot = 0 ;							// 表示从前向后查询
		return this.root.getNode(index) ;		// 查询过程交给Node类
	}
	/**
	 * 根据索引修改数据
	 * @param index 要修改数据的索引编号
	 * @param data 新的数据内容
	 */
	public void set(int index, Object data) {
		if (index > this.count) {					// 判断是否超过了保存范围
			return; 							// 结束方法调用
		}
		this.foot = 0; 							// 重新设置foot属性的内容，作为索引出现
		this.root.setNode(index, data); 		// 交给Node类设置数据内容
	}
	/**
	 * 链表数据的删除操作，在删除前要先使用contains()判断链表中是否存在指定数据
	 * 如果要删除的数据存在，则首先判断根节点的数据是否为要删除数据
	 * 如果是，则将根节点的下一个节点作为新的根节点
	 * 如果要删除的数据不是根节点数据，则将删除操作交由Node类的removeNode()方法完成
	 * @param data 要删除的数据
	 */
	public void remove(Object data) {
		if (this.contains(data)) { 					// 主要功能是判断数据是否存在
			// 要删除数据是否是根节点数据，root是Node类的对象，此处直接访问内部类的私有操作
			if (data.equals(this.root.data)) { 		// 根节点数据为要删除数据
				this.root = this.root.next; 			// 空出当前根节点
			} else { 								// 根节点数据不是要删除数据
				// 此时根元素已经判断过了，从第二个元素开始判断，即第二个元素的上一个元素为根节点
				this.root.next.removeNode(this.root, data);
			}
			this.count--; 							// 删除成功后个数要减少
		}
	}
	/**
	 * 将链表中的数据转换为对象数组输出
	 * @return 如果链表没有数据，返回null，如果有数据，则将数据变为对象数组后返回
	 */
	public Object[] toArray() {
		if (this.root == null) {						// 判断链表是否有数据
			return null;							// 没有数据，返回null
		}
		this.foot = 0; 								// 脚标清零操作
		this.retArray = new Object[this.count];		// 根据保存内容开辟数组
		this.root.toArrayNode(); 					// 交给Node类处理
		return this.retArray;						// 返回数组对象
	}
	/**
	 * 清空链表数据
	 */
	public void clear() {
		this.root = null;							// 清空链表
		this.count = 0;								// 元素个数为0
	}
}
```

本程序主要针对链表中操作的数据类型进行了更改，考虑其可以保存任意的数据类型，所以将保存类型更换为 `Object`
。而在进行数据查询以及删除的操作时也统一使用 `equals()` 方法完成。

```java
public class LinkDemo {
	public static void main(String args[]) {
		Link all = new Link() ;					// 实例化链表对象
		all.add("A") ;							// String转为Object
		all.add("B") ;							// String转为Object
		all.add("C") ;							// String转为Object
		all.remove("A") ;						// String覆写了equals()
		Object data [] = all.toArray() ;			// 将链表转化为对象数组
		for (int x = 0 ; x < data.length ; x ++) {
			String str = (String) data[x] ;		// Object变为String
			System.out.print(str + "、") ;
		}
	}
}
```

本程序并没有对链表中的全部方法进行测试，只测试了增加、删除、数据返回 3 个基本操作。而在实际的开发中，链表的这 3
个功能也是最具有代表性的功能。
