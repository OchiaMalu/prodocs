# 泛型

在面向对象的开发中，利用对象的多态性可以解决方法参数的统一问题，但是随之而来的是一个新问题： **向下转型会存在类转换异常**
（ClassCastException)，所以向下转型的操作并不是安全的，为了解决这样的问题，从 JDK1.5 开始便提供了泛型技术。本节将为读者分析泛型技术的产生原因以及相关定义。

## 泛型的引出

假设要开发一个地理信息系统（Geographic Information System,GIS），肯定需要一个可以描述坐标的类（Point），同时在这个类里面要求保存有以下
3 种类型的坐标。

- 保存数字：x=10、y=20；
- 保存小数：x=10.2、y=20.3；
- 保存字符串：×=东经20度、y=北纬15度。

这个 `Point` 类设计的关键就在于 x 与 y
这两个变量的数据类型的选择上，必须有一种数据类型可以保存这三类数据，那么首先想到的一定是 `Object` 类型，因为此时会存在如下转换关系。

- `int` 数据类型：`int` 自动装箱为 `Integer` ，`Integer` 向上转型为 `Object` ；
- `double` 数据类型：`double` 自动装箱为 `Double` ，`Double` 向上转型为 `Object` ；
- `String` 数据类型：直接向上转型为 `Object` 。

```java
class Point {							// 定义坐标
	private Object x ; 					// 可以保存任意数据
	private Object y ; 					// 可以保存任意数据
	public void setX(Object x) {
		this.x = x;
	}
	public void setY(Object y) {
		this.y = y;
	}
	public Object getX() {
		return x;
	}
	public Object getY() {
		return y;
	}
}
```

本程序 `Point` 类中的两个属性全部定义为 `Object` ，这样就可以接收任意的数据类型了。为了更好地说明问题，下面分别设置不同的数据类型，以测试程序。

```java
public class TestDemo {
	public static void main(String[] args) {
		// 第一步：根据需要设置数据，假设此时的作用是传递坐标
		Point p = new Point() ;					// 实例化Point类数据
		p.setX(10);								// 设置坐标数据
		p.setY(20);								// 设置坐标数据
		// 第二步：根据设置好的坐标取出数据进行操作
		int x = (Integer) p.getX();				// 取出坐标数据
		int y = (Integer) p.getY();				// 取出坐标数据
		System.out.println("x坐标：" + x + "，y坐标：" + y);
	}
}
```

```java
public class TestDemo {
	public static void main(String[] args) {
		// 第一步：根据需要设置数据，假设此时的作用是传递坐标
		Point p = new Point() ;						// 实例化Point类数据
		p.setX(10.2);								// 设置坐标数据
		p.setY(20.3);								// 设置坐标数据
		// 第二步：根据设置好的坐标取出数据进行操作
		double x = (Double) p.getX(); 				// 取出坐标数据
		double y = (Double) p.getY(); 				// 取出坐标数据
		System.out.println("x坐标：" + x + "，y坐标：" + y);
	}
}
```

上述两段代码的两个程序都是利用基本数据类型自动装箱与自动拆箱的特性实现数据传递。在这里读者一定要记住，调用 `setter`
方法设置坐标时，所有的数据类型都发生了向上转型，而在取得数据时都发生了强制性的向下转型。

```java
public class TestDemo {
	public static void main(String[] args) {
		// 第一步：根据需要设置数据，假设此时的作用是传递坐标
		Point p = new Point() ;						// 实例化Point类数据
		p.setX("东经100度");						// 设置坐标数据
		p.setY("北纬20度");							// 设置坐标数据
		// 第二步：根据设置好的坐标取出数据进行操作
		String x = (String) p.getX(); 				// 取出坐标数据
		String y = (String) p.getY(); 				// 取出坐标数据
		System.out.println("x坐标：" + x + "，y坐标：" + y);
	}
}
```

本程序对于设计的基本要求已经成功地实现了，而整个设计的关键就在于 `Object` 类的使用。但是由于 `Object`
类型可以描述所有的数据类型，所以这时会带来一个严重的后果：一旦设置的内容出现错误，在程序编译时是无法检查出来的。

```java
public class TestDemo {
	public static void main(String[] args) {
		// 第一步：根据需要设置数据，假设此时的作用是传递坐标
		Point p = new Point() ;						// 实例化Point类数据
		p.setX("东经100度");						// 设置坐标数据
		p.setY(10) ;									// 设置坐标数据，数据错误
		// 第二步：根据设置好的坐标取出数据进行操作
		String x = (String) p.getX(); 				// 取出坐标数据
		String y = (String) p.getY(); 				// 取出坐标数据
		System.out.println("x坐标：" + x + "，y坐标：" + y);
	}
}
```

本程序原本打算设置的坐标数据类型是字符串数据，但是在设置数据时出现了错误，将 Y 坐标数据设置为了一个数字 `p.setY(10)`
而不是字符串。由于 `int` 型可以通过自动装箱使用 `Object` 接收，所以这样的问题在程序编译时不会有任何语法错误。而在程序执行过程中当需要将
Y 坐标数据取出时，一定会按照预定的模式将 Y 坐标以 `String` 的形式进行强制向下转型，这时就会发生 `ClassCastException`
（这样就带来了安全隐患)
。可是整个异常并不是在程序编译时出现的，而是在运行中出现的，这样就会为开发带来很大的困扰，实际上这就证明利用 `Object`
接收参数会存在安全隐患，面对这样的问题如果可以在编译时就能够排查出来才是最合理的。

在 JDK1.5 以前对于以上错误只能在程序中利用一系列的判断进行检测，而从 JDK1.5 之后增加了泛型技术，此技术的核心意义在于：<u>
类属性或方法的参数在定义数据类型时，可以直接使用一个标记进行占位，在具体使用时才设置其对应的实际数据类型</u>
，这样当设置的数据类型出现错误后，就可以在程序编译时检测出来。

```java
package com.yootk.demo;
// 此时设置的T在Point类定义上只表示一个标记，在使用时需要为其设置具体的类型
class Point<T> {						// 定义坐标，Type = 简写T，是一个类型标记
	private T x ;						// 此属性的类型不知道，由Point类使用时动态决定	
	private T y ;						// 此属性的类型不知道，由Point类使用时动态决定
	public void setX(T x) {
		this.x = x;
	}
	public void setY(T y) {
		this.y = y;
	}
	public T getX() {
		return x;
	}
	public T getY() {
		return y;
	}
}
```

本程序在 `Point` 类声明时采用了泛型 `class Point<T>` 支持，同时在属性声明中所采用的也是泛型标记
T，那么这就表示在定义 `Point` 类对象时需要明确地设置 x 与 y 属性的数据类型。

:::tip 可以定义多个泛型标记

在开发中一个类上可能会定义多种泛型声明。下面的代码除了定义参数类型外，也定义了返回值类型。

```java
class Point<P, R> {
	public R fun(P p) {
		return null ; 
	}
}
```

本程序设置了两个泛型标记，其中 P 表示方法参数类型标记，而 R 表示方法返回值类型标记。随着开发的深入，读者会发现许多 Java
提供的类上都会大量使用泛型操作。

:::

```java
public class TestDemo {
	public static void main(String[] args) {
		// 第一步：根据需要设置数据，假设此时的作用是传递坐标
		Point<String> p = new Point<String>()  ;		// 实例化Point类数据，设置泛型类型为String
		p.setX("东经100度");							// 设置坐标数据
		p.setY("北纬20度") ;							// 设置坐标数据
		// 第二步：根据设置好的坐标取出数据进行操作
		String x = p.getX(); 							// 取出坐标数据，不再需要强制转换
		String y = p.getY(); 							// 取出坐标数据，不再需要强制转换
		System.out.println("x坐标：" + x + "，y坐标：" + y);
	}
}
```

本程序在定义 `Point` 类对象时使用了 `String` 作为泛型标记，这就表示在 `Point` 类中的 x 与 y 属性、 `setter`
参数类型以及 `getter` 返回值类型都是 `String` ，从而就避免了数据设置错误（如果设置为非 `String`
类型，会造成语法错误）以及强制向下转型操作，这样的操作才属于安全的操作。

使用泛型后，所有类中属性的类型都是动态设置的，而所有使用泛型标记的方法参数类型也都发生了改变，这样就相当于避免了向下转型的问题，从而解决了类对象转换的安全隐患。但是需要特别说明的是，<u>
如果要想使用泛型，那么它能够采用的类型只能够是类，即不能是基本类型，只能是引用类型</u>。

```java
public class TestDemo {
	public static void main(String[] args) {
		// 第一步：根据需要设置数据，假设此时的作用是传递坐标
		Point<Integer> p = new Point<Integer>()  ;	// 实例化Point类数据，设置泛型类型为String
		p.setX(10);										// 设置坐标数据
		p.setY(20) ;										// 设置坐标数据
		// 第二步：根据设置好的坐标取出数据进行操作
		int x = p.getX(); 								// 取出坐标数据，不再需要强制转换
		int y = p.getY(); 								// 取出坐标数据，不再需要强制转换
		System.out.println("x坐标：" + x + "，y坐标：" + y);
	}
}
```

本程序由于泛型数据类型的要求，在实例化 `Point` 类对象时使用了 `Integer` ，而在取出数据时直接利用自动拆箱技术将包装类的内容自动转化为基本数据类型。

:::tip 如果不设置泛型会怎样？

**回答：为了保证设计的合理性，如果不设置泛型会使用Object类型。**

首先，读者必须明确一个概念：泛型是从 2005 年之后才开始提供的特性（从 1995 年 Java 开始的十年内都没有泛型)，所以在 2005
年之前的许多 Java 程序为了解决参数的统一问题都大量采用了 `Object` 类（包括大量的系统类设计）。而从 2005
年开始推出泛型技术后，为了保证已有代码可以正常使用（相当于不设置泛型），就继续延用最初的设计，依然使用 `Object`
作为默认类型，也就是说不设置泛型，就默认表示使用 `Object` 类型。

```java
public class TestDemo {
	public static void main(String[] args) {
		// 第一步：根据需要设置数据，假设此时的作用是传递坐标
		Point p = new Point() ;	// 将使用Object类型描述泛型
		p.setX(10);		// 设置坐标数据，向上转型为Object
		p.setY(20) ;		// 设置坐标数据，向上转型为Object
		// 第二步：根据设置好的坐标取出数据进行操作
		Integer x = (Integer) p.getX();
		Integer y = (Integer) p.getY();
		System.out.println("x坐标：" + x + "，y坐标：" + y);
	}
}
```

本程序在实例化 `Point` 类对象时并没有设置具体的泛型类型，按照 Java 的默认设计，此时会使用 `Object`
作为默认类型，所以在进行数据取出时，必须进行强制类型转换，很明显，这样的操作具有安全隐患。由于没有正确使用泛型类，在程序编译时也会出现警告信息。

但是在这里还需要提醒读者的是，从 JDK1.7 开始，Java 对泛型的操作也进行了一些简化，只要在类对象声明时使用了泛型，那么实例化对象时就可以不再重复设置泛型类型，如下所示：

> Point\<Integer> p = new Point<>();

本程序只在声明对象时使用了泛型，而在对象实例化时并没有设置具体的泛型类型，这样就表示延用声明时的泛型类型，可以达到简化代码的目的。

从实际开发来讲，希望读者在使用泛型声明类时，可以明确地设置泛型类型，如果不是必须的限制，尽量不要直接使用 `Object`
类作为统一的数据类型。

:::

## 通配符

利用泛型技术虽然解决了向下转型所带来的安全隐患问题，但同时又会产生一个新的问题：<u>
即便是同一个类，由于设置泛型类型不同，其对象表示的含义也不同，因此不能够直接进行引用操作</u> 。

```java
package com.yootk.demo;
class Message<T> {						// 类上使用泛型
	private T msg;
	public void setMsg(T msg) {
		this.msg = msg;
	}
	public T getMsg() {
		return msg;
	}
}
```

本程序在给出的 `Message` 类上由于存在泛型定义，所以如果定义 `Message<String>` 和 `Message<Integer>` 虽然都是 `Message`
类的对象，但是这两个对象之间是不能够进行直接的引用传递操作的，那么这样就会在方法的参数传递上造成新的问题，此时就可以利用通配符 `“？”`
来进行描述。

:::tip 参数传递的问题分析

为了帮助读者更好地理解通配符 `“？”` 的使用意义，下面通过实际的代码来为读者进行具体分析。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) {
		Message<String> m = new Message<String>();
		m.setMsg("www.yootk.com");		// 设置内容
		fun(m); 							// 引用传递
	}
	/**
	 * 接收Message类对象，并且调用getter方法输出类中的msg属性内容 
	 * @param temp 接收Message类对象的引用传递，此处设置的泛型类型为String
	 */
	public static void fun(Message<String> temp) {
		System.out.println(temp.getMsg());
	}
}
```

本程序的主要功能就是实现一个 `Message` 类对象的引用传递，而在定义 `fun()` 方法时也设置了接收的参数 `Message<String>temp`
，这样就表示只要泛型类型是 `String` 的 `Message` 对象，此方法都可以接收。但是，一旦程序这样定义，`fun()`
方法就不能再接收泛型类型非 `String` 的 `Message` 类对象了。

```java
public class TestDemo {
	public static void main(String[] args) {
		Message<Integer> m = new Message<Integer>();
		m.setMsg(30);					// 设置内容
		fun(m); 						// 程序错误，因为参数的泛型类型是String
	}
	public static void fun(Message<String> temp) {
		System.out.println(temp.getMsg());
	}
}
```

本程序主要目的是希望可以将 `Message-<Integer>` 类型的对象传递到 `fun()`
方法中，但是由于参数的类型不一致（虽然都是 `Message` 类，但是泛型类型不同），所以此时不可能成功调用。

同时还需要提醒读者的是，此时即便想重载 `fun()` 函数（例如：`public static void fun(Message<Integer>temp){}`
，使用 `Message<Integer>` 作为参数类型会产生语法错误，在程序编译时会直接告诉用户 `fun()`
方法已经被定义过了。因为方法重载时只要求参数类型不同，并没有对泛型类型有任何的要求，所以最终不可能使用重载来解决此类问题的。

:::

```java
public class TestDemo {
	public static void main(String[] args) {
		Message<Integer> m1 = new Message<Integer>();
		Message<String> m2 = new Message<String>();
		m1.setMsg(100);							// 设置属性内容
		m2.setMsg("www.yootk.com");				// 设置属性内容
		fun(m1); 									// 引用传递
		fun(m2); 									// 引用传递
	}
	public static void fun(Message<?> temp) {		// 不能设置，但是可以取出
		System.out.println(temp.getMsg());
	}
}
```

本程序在定义 `fun()` 方法时采用了通配符 `“？”` 作为使用的泛型类型 `public static void fun(Message<?>temp)`
，这样一来，只要是 `Message` 类的对象，不管何种泛型类型 `fun()` 方法都可以接收。

:::tip 能否使用 `Object` 作为泛型类型，或者不设置类型？

回答：使用通配符 `“？”` 的意义在于可以接收类对象，但是不能修改对象属性。

首先需要跟读者解释的一个核心问题是：在明确设置一个类为泛型类型时没有继承的概念范畴，也就是说虽然 `Object` 类与 `String`
类在类定义关系中属于父类与子类的关系，但换到泛型中 `Message-<Object>` 与 `Message<String>` 就属于两个完全独立的概念。

如果在定义 `fun()`
方法时不设置泛型类型，也可以实现任意泛型类型对象的接收，但是此时就会出现一个问题：如果不指派具体的泛型类型，则默认为 `Object`
类型，也就是说方法里面可以随意修改属性内容。下面来观察如下代码。

```java
public class TestDemo {
	public static void main(String[] args) {
		Message<Integer> m1 = new Message<Integer>();
		Message<String> m2 = new Message<String>();
		m1.setMsg(100); 
		m2.setMsg("www.yootk.com"); 
		fun(m1); 
		fun(m2); 
	}
	public static void fun(Message temp) {	
		// 随意修改属性内容，逻辑错误
		temp.setMsg("魔乐科技软件学院：www.mldn.cn"); 
		System.out.println(temp.getMsg());
	}
}
```

本程序在定义 `fun()` 方法参数时并没有设置泛型，这样就会默认使用 `Object`
作为泛型类型（程序编译时会出现警告信息，但是不会出错），那么也就可以在方法中随意修改对象内容（即使类型不符合）。很明显这样的做法是不严谨的，必须要使用通配符 `“？”`
来制约这种任意修改数据问题的操作。所以 `“？”` 设置的泛型类型只表示可以取出，但是不能设置，一旦设置了内容，程序编译时就会出现错误提示。

:::

在 `“？”` 通配符基础上还会有以下两个子的通配符。

- `? extends 类` ：设置泛型上限，可以在声明和方法参数上使用；

|—`?extends Number` ：意味着可以设置 `Number` 或者是 `Number` 的子类（Integer、Double、...）

- `? super 类` ：设置泛型下限，方法参数上使用；

|— `? super String` ：意味着只能设置 `String` 或它的父类 `Object` 。

```java
package com.yootk.demo;
class Message<T extends Number> {				// 设置泛型上限，只能够是Number或Number子类
	private T msg;
	public void setMsg(T msg) {
		this.msg = msg;
	}
	public T getMsg() {
		return msg;
	}
}
public class TestDemo {
	public static void main(String[] args) {
		Message<Integer> m1 = new Message<Integer>();		// Integer是Number子类
		m1.setMsg(100);
		fun(m1); 										// 引用传递
	}
	public static void fun(Message<? extends Number> temp) { // 定义泛型上限
		System.out.println(temp.getMsg());
	}
}
```

本程序在定义 `Message` 类泛型类型时定义了允许设置的泛型类型上限，这样在实例化 `Message` 类对象时只能设置 `Number`
或 `Number` 的子类，而在定义 `fun()` 方法时也可以设置同样的泛型上限。这样当遇见了非 `Number` 的泛型类型对象时，就会出现语法错误。

```java
package com.yootk.demo;
class Message<T> {											// 定义泛型
	private T msg;
	public void setMsg(T msg) {
		this.msg = msg;
	}
	public T getMsg() {
		return msg;
	}
}
public class TestDemo {
	public static void main(String[] args) {
		Message<String> m1 = new Message<String>();
		m1.setMsg("更多课程请访问：www.yootk.com");				// 设置属性内容
		fun(m1); 											// 引用传递
	}
	public static void fun(Message<? super String> temp) { 		// 定义泛型下限
		System.out.println(temp.getMsg());
	}
}
```

本程序在定义 `fun()` 方法时设置了泛型的下限类型，因此必须传递符合要求的泛型类型对象，才可以正常调用。

## 泛型接口

泛型不仅可以定义在类中，也可以定义在接口上。定义在接口上的泛型被称为 **泛型接口** 。

```java
package com.yootk.demo;
/**
 * 定义泛型接口，由于类与接口命名标准相同，为了区分出类与接口，在接口前加上字母“I”，例如：IMessage
 * 如果定义抽象类，则可以在前面加上Abstract，例如：AbstractMessage
 * @author YOOTK
 * @param <T> print()方法使用的泛型类型
 */
interface IMessage<T> { 				// 定义泛型接口
	public void print(T t);
}
```

本程序在 `IMessage` 接口上定义了泛型，同时设置的泛型类型将在 `print()`
上使用。任何情况下如果要使用接口，就必须定义相应的子类，而对于使用了泛型的接口子类而言，有以下两种实现方式。

- **实现方式一：** 在子类继续设置泛型标记。

```java
interface IMessage<T>{                        //定义泛型接口
    public void print(T t);
}
class MessageImpl<S> implements IMessage<S>{  //在子类继续设置泛型，此泛型也作为接口中的泛型类型
    public void print(S t) {
        System.out.println(t);
    }
}
public class TestDemo{
    public static void main(String[] args) {
        MessageImpl<String> msg = new MessageImpl<>();
        msg.print("Hello");
    }
}
```

本程序在定义 `IMessage` 接口子类时继续设置了泛型，在实例化接口子类对象时所设置的泛型类型，也就是 `IMessage` 父接口中使用的泛型类型。

- **实现方式二：** 在子类不设置泛型，而为父接口明确地定义一个泛型类型。

```java
interface IMessage<T>{                        //定义泛型接口
    public void print(T t);
}
class MessageImpl<S> implements IMessage<String>{
    @Override
    public void print(String t) {
        System.out.println(t);
    }  //子类为父接口设置具体泛型类型
    
}
public class TestDemo{
    public static void main(String[] args) {
        MessageImpl<String> msg = new MessageImpl<>();
        msg.print("Hello");
    }
}
```

本程序在定义子类实现接口时已经明确设置了 `IMessage` 接口在 `Messagelmpl` 子类中使用的泛型类型为 `String`
，这样子类在实例化对象时就不再需要设置泛型类型了。

## 泛型方法

对于泛型除了可以定义在类上外，也可以在方法上进行定义，而在方法上定义泛型时，这个方法不一定非要在泛型类中定义。

```java
package com.yootk.demo;
public class TestDemo {
	public static void main(String[] args) {
		String str = fun("www.yootk.com");	// 泛型类型为String
		System.out.println(str.length());		// 计算长度
	} 
	/**
	 * 此方法为泛型方法，T的类型由传入的参数类型决定
	 * 必须在方法返回值类型前明确定义泛型标记
	 * @param t 参数类型，同时也决定了返回值类型
	 * @return 直接返回设置进来的内容
	 */
	public static <T> T fun(T t) {
		return t;
	}
}
```

本程序并没有在类上使用泛型标记，而是在定义 `fun()` 方法时在方法的返回值前定义了泛型标记，这样就可以在方法的返回值或参数类型上使用泛型标记进行声明。
