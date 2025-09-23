# 集合输出

由于集合中往往会保存多个对象数据，所以一般进行集合输出时都会采用循环的方式完成。而在 Java 中，集合的输出操作有 4
种形式：`Iterator` 输出、`Listlterator` 输出、`foreach` (加强型 for 循环)输出、`Enumeration` 输出。

## 迭代输出：Iterator

`Iterator` (迭代器)是集合输出操作中最为常用的接口，而在 `Collection` 接口中也提供了直接为 `Iterator`
接口实例化的方法( `iterator()` ),所以任何集合类型都可以转换为 `Iterator` 接口输出。

:::tip 关于 iterator() 方法

在 JDK1.5 之前，`Collection` 接口会直接提供 `iterator()` 方法，但是到了 JDK1.5 之后，为了可以让更多的操作支持 `Iterator`
迭代输出，单独建立了 `Iterable` 接口，同时在这个接口里只定义了一个 `iterator()`
的抽象方法。所谓迭代器就好比排队点名一样，从前向后开始，一边判断是否有人，一边进行操作。

:::

在 `Iterator` 接口中一共定义了两个抽象方法，如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928101259153.png" alt="image-20240928101259153" style="zoom:80%;margin:0 auto" />

当使用 `Iterator` 接口输出时，往往都先利用 `hasNext()`
改变指针位置，同时判断是否有数据，如果当前指针所在位置存在数据，则利用 `next()` 取出数据，这两个方法的作用如图所示。

<img src="http://niu.ochiamalu.fun/image-20240928101326631.png" alt="image-20240928101326631" style="zoom:80%;margin:0 auto" />

:::tip `Scanner` 类与 `Iterator` 接口

在本书讲解 IO 操作中曾经讲解过一个 `java.util.Scanner` 的类，实际上 `Scanner` 就是 `Iterator` 接口的子类，所以在 `Scanner`
使用时才要求先利用 `hasNextXxx()` ）判断是否有数据，再利用 `nextXxx()` 取得数据。

:::

```java
package com.yootk.demo;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
public class TestDemo {
    public static void main(String[] args) { 
        List<String> all = new ArrayList<String>() ;		// 实例化List集合
        all.add("Hello");							// 保存数据
        all.add("Hello"); 							// 保存重复元素
        all.add("World");							// 保存数据
        Iterator<String> iter = all.iterator() ;			// 实例化Iterator接口
        while (iter.hasNext()) {						// 判断是否有数据
            String str = iter.next() ;					// 取出当前数据
            System.out.println(str);					// 输出数据
        }
    }
}
```

本程序利用 `List` 接口的 `iterator()` 方法( `Collection` 接口继承而来)将全部集合转变为 `Iterator`
输出，由于不确定循环次数，所以使用 `while` 循环进行迭代输出。

:::tip 关于 Iterator 接口中的 remove() 方法

在 `Iterator` 接口定义了一个删除数据的操作方法，但是对不同的版本，此方法也存在以下两种定义。

- JDK1.8 以前：`public void remove()` ；
- JDK1.8 之后：`default void remove()` 。

也就是说在 JDK1.8 之前 `remove()` 属于一个普通的删除方法，而 JDK1.8 之后将其定义为一个接口的 `default`
方法。而之所以提供这个方法，是因为在使用 `Iterator` 输出数据时，如果利用集合类(Collection、List、Set）提供的 `remove()`
方法会导致程序中断执行的问题，而如果非要进行集合元素的删除，只能利用 `Iterator` 接口提供的 `remove()` 方法才可以正常完成。

```java
package com.yootk.demo;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
public class TestDemo {
    public static void main(String[] args) { 
        List<String> all = new ArrayList<String>() ;	// 实例化List集合
        all.add("Hello"); 						// 保存重复元素
        all.add("mldn");						// 保存数据
        all.add("World");						// 保存数据
        all.add("Yootk");						// 保存数据
        Iterator<String> iter = all.iterator() ;		// 实例化Iterator接口
        while (iter.hasNext()) {					// 判断是否有数据
            String str = iter.next() ;				// 取出当前数据
            if ("mldn".equals(str)) {
               all.remove(str) ;					// 此代码一执行，输出将中断
            }
            System.out.println(str);				// 输出数据
        }
    }
}
```

本程序并没有完成正常输出，这是因为在迭代输出时进行了集合数据的错误删除操作，而要避免此类问题，只能利用 `Iterator`
接口提供的 `remove()`
。但是需要提醒读者的是，从实际的开发来讲，集合输出中几乎不会出现删除数据的操作，所以对此概念了解即可。同时也希望读者一定要记住，在集合的操作中，增加数据（add()
）以及迭代输出操作是最为核心的部分，对于此操作模式一定要熟练掌握。

:::

## 双向迭代：Listlterator

虽然利用 `Iterator` 接口可以实现集合的迭代输出操作，但是 `Iterator` 本身却存在一个问题：<u>只能进行由前向后的输出</u>
。所以为了让输出变得更加灵活，在类集框架中就提供了一个 `ListIterator` 接口，利用此接口可以实现双向迭代。`Listlterator`
属于 `Iterator` 的子接口，此接口常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928101758450.png" alt="image-20240928101758450" style="zoom:80%;margin:0 auto" />

在 `Listlterator` 接口中除了可以继续使用 `Iterator` 接口的 `hasNext` 与 `next()`
方法，也具备了向前迭代的操作( `hasPrevious()` 、`previous()` ），同时还提供了向集合追加数据和修改数据的支持。

:::tip Listlterator 接口并不常用

从实际的开发来讲，绝大多数情况如果要进行集合的输出都会使用 `Iterator` 接口，相比较而言 `ListIterator`
接口在实际使用中并不常见。同时通过 `Listlterator`
接口的定义可以发现，该接口除了支持输出之外，还可以进行集合更新（增加、修改、删除），但是这些操作在实际开发中使用得非常有限，所以对于迭代输出重点还是要放在 `Iterator`
接口的使用上。

:::

`Listlterator` 是专门为 `List` 子接口定义的输出接口，所以 `Listlterator` 接口对象的实例化可以依靠 `List`
接口提供的方法： `public Listlterator<E>listIterator()`

:::tip Listlterator 接口需要注意迭代顺序

实际上迭代器本质上就是一个 **指针的移动操作** ，而 `Listlterator` 与 `Iterator` 的迭代处理原理类似。所以如果要进行由后向前迭代，必须先进行由前向后迭代。

:::

```java
package com.yootk.demo;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
public class TestDemo {
    public static void main(String[] args) {
        List<String> all = new ArrayList<String>() ;		// 实例化List接口对象
        all.add("www.jixianit.com") ;					// 向集合保存数据
        all.add("www.yootk.com") ;					// 向集合保存数据
        all.add("www.mldn.cn") ; 					// 向集合保存数据
        System.out.print("由前向后输出：");			// 向集合保存数据
        ListIterator<String> iter = all.listIterator() ;	// 实例化ListIterator接口
        while (iter.hasNext()) {						// 由前向后迭代
            String str = iter.next() ;					// 取出当前数据
            System.out.print(str + "、");				// 输出数据
        }
        System.out.print("\n由后向前输出：");
        while (iter.hasPrevious()) {					// 由后向前迭代
            String str = iter.previous() ;				// 取出当前数据
            System.out.print(str + "、");				// 输出数据
        }
    }
}
```

本程序利用 `ListIterator` 接口实现了 `List` 集合的双向迭代输出，首先利用 `hasNext()` 与 `next()` (
实现由前向后的数据迭代，然后使用 `hasPrevious()` 与 `previous()` 两个方法实现了数据的由后向前迭代。

## foreach 输出

JDK1.5 之后为了简化数组以及集合的输出操作，专门提供了 `foreach` (增强型 for 循环)输出，所以也可以利用 `foreach`
语法实现所有集合数据的输出操作。

```java
package com.yootk.demo;
import java.util.ArrayList;
import java.util.List;
public class TestDemo {
    public static void main(String[] args) {
        List<String> all = new ArrayList<String>() ;	// 实例化List接口对象
        all.add("www.jixianit.com") ;				// 向集合保存数据
        all.add("www.yootk.com") ;				// 向集合保存数据
        all.add("www.mldn.cn") ; 				// 向集合保存数据
        // 集合中包含的数据都是String型，所以需要使用String接收集合中的每一个数据
        for (String str : all) {					// for循环输出
            System.out.println(str);
        }
    }
}
```

本程序利用 `foreach` 循环实现了集合输出，由于集合中保存的都是 `String` 型数据，所以每次执行 `foreach`
循环时，都会将当前对象内容赋值给 `str` 对象，而后就可以在循环体中利用 `str`
对象进行操作。但是如果读者还处于初学阶段，不建议使用 `foreach` ，最好还是使用 `Iterator` 操作。

## Enumeration 输出

`Enumeration` (枚举输出)是与 `Vector` 类一起在 JDK1.0 时推出的输出接口，即最早的 `Vector`
如果要输出数据，就需要使用`Enumeration` 接口完成，此接口定义如下。

> public interface Enumeration\<E> {
>
> ​ public boolean hasMoreElements(); //等同于 hasNext()
>
> ​ public E nextElement(); //等同于 next()
>
> }

通过定义可以发现在 `Enumeration` 接口中一共定义了两个方法，`hasMoreElements()`
方法用于操作指针并且判断是否有数据，而`nextElement()` 方法用于取得当前数据。

因为 `Enuemration` 出现较早，所以在 `Collection` 接口中并没有定义取得 `Enumeration`
接口对象的方法。所以Enumeration接口对象的取得只在 `Vector` 类中有所定义：`public Enumeration<E> elements()` 。

```java
package com.yootk.demo;
import java.util.Enumeration;
import java.util.Vector;
public class TestDemo {
    public static void main(String[] args) {
        Vector<String> all = new Vector<String>() ;		// 实例化Vector子类对象
        all.add("www.jixianit.com") ;					// 向集合保存数据
        all.add("www.yootk.com") ;					// 向集合保存数据
        all.add("www.mldn.cn") ;					// 向集合保存数据
        Enumeration<String> enu = all.elements() ;		// 取得Enumeration接口对象
        while(enu.hasMoreElements()) {				// 判断是否有数据
            String str = enu.nextElement() ;			// 取出当前数据
            System.out.println(str);					// 输出数据
        }
    }
}
```

本程序与 `Iterator` 接口输出实现的最终效果是完全一致的，唯一的区别就是，如果要利用集合类为 `Enuemration`
接口实例化，就必须依靠 `Vector` 子类完成。

:::tip JSP 中会使用到此接口

如果读者要进行类集的操作，大部分情况下都会使用 `List` 或 `Set` 子接口，很少会直接操作 `Vector` 子类，所以对于 `Enumeration`
接口而言使用情况有限，大部分都以 `Iterator` 输出为主。但这并不意味着 `Enumeration`
接口不需要掌握，实际上在一些古老的操作中依然只支持 `Enumeration` 输出，例如：JSP 中 `request` 内置对象取得全部参数方法(
public Enumeration getParameterNames())以及取得全部头信息方法(public Enumeration getHeaderNames())
都还在继续使用 `Enumeration` 。同时利用 `Enumeration` 也可以实现一些自动化的操作功能，关于这一点读者可以通过 JSP
与开发框架的学习掌握。

:::

