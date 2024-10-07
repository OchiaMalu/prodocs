# Set 子接口

在 `Collection` 接口下又有另外一个比较常用的子接口为 `Set` 子接口，但是 `Set` 子接口并不像 `List`
子接口那样对 `Collection` 接口进行了大量的扩充，而是简单地继承了 `Collection` 接口。也就是说在 `Set`
子接口里面无法使用 `get()` 方法根据索引取得保存数据的操作。在 `Set` 子接口下有两个常用的子类：<u>HashSet、TreeSet</u>。.

:::tip 关于两个子类的选择

`HashSet` 是散列存放数据，而 `TreeSet` 是有序存放的子类。在实际的开发中，如果要使用 `TreeSet`
子类则必须同时使用比较器的概念，而 `HashSet` 子类相对于 `TreeSet`
子类更加容易一些，所以如果没有排序要求应优先考虑 `HashSet` 子类。

:::

```java
package com.yootk.demo;
import java.util.HashSet;
import java.util.Set;
public class TestDemo {
    public static void main(String[] args) {
        Set<String> all = new HashSet<String>();	// 实例化Set接口
        all.add("jixianit");						// 保存数据
        all.add("mldn");						// 保存数据
        all.add("yootk");						// 保存数据
        all.add("yootk"); 						// 重复数据
        System.out.println(all);					// 直接输出集合
    }
}
```

本程序利用 `HashSet` 子类实例化了 `Set` 接口对象，并且在 `Set` 集合中不允许保存重复数据。

:::tip 关于 “Hash” 的说明

本程序使用的是 `HashSet` 子类，并且根据名称可以发现，在这个子类上采用了 `Hash`
算法（一般称为散列、无序）。这种算法就是利用二进制的计算结果来设置保存的空间，根据数值的不同，最终保存空间的位置也不同，所以利用 `Hash`
算法保存的集合都是无序的，但是其查找速度较快。

:::

如果希望保存的数据有序，那么可以使用 `Set` 接口的另外一个子类：`TreeSet` 子类。

```java
package com.yootk.demo;
import java.util.Set;
import java.util.TreeSet;
public class TestDemo {
    public static void main(String[] args) {
        Set<String> all = new TreeSet<String>();	// 实例化Set接口
        all.add("jixianit");						// 保存数据
        all.add("mldn");						// 保存数据
        all.add("yootk");						// 保存数据
        all.add("yootk"); 						// 重复数据
        System.out.println(all);					// 直接输出集合
    }
}
```

`TreeSet` 子类属于排序的类集结构，所以当使用 `TreeSet` 子类实例化Set接口后，所保存的数据将会变为有序数据，默认情况下按照字母的升序排列。

## 关于数据排序的说明

`TreeSet` 子类保存的内容可以进行排序，但是其排序是依靠 **比较器接口** (Comparable)实现的，即如果要利用 `TreeSet`
子类保存任意类的对象，那么该对象所在的类必须要实现 `java.lang.Comparable` 接口。

:::tip 需要比较所有属性

在讲解常用类库时曾经讲解过比较器的使用，当时的操作是结合 `Arrays` 类一起实现的。但是在 `TreeSet`
子类中，由于其不允许保存重复元素( `compareTo()` 方法的比较结果返回0)，如果说此时类中存在 5 个属性，但是只比较了 3 个属性，并且这
3 个属性的内容完全相同（其余两个属性不同），那么 `TreeSet` 也会认为是相同内容，从而不会保存该数据，因此会出现数据丢失的情况。

:::

```java
package com.yootk.demo;
import java.util.Set;
import java.util.TreeSet;
class Book implements Comparable<Book> {				// 需要实现Comparable接口
    private String title;
    private double price;
    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
    @Override
    public String toString() {
        return "书名：" + this.title + "，价格：" + this.price + "\n";
    }
    @Override
    public int compareTo(Book o) {					// 排序方法，比较所有属性
        if (this.price > o.price) {
           return 1;
        } else if (this.price < o.price) {
           return -1;
        } else {
           return this.title.compareTo(o.title); 			// 调用String类的比较大小
        }
    }
}
public class TestDemo {
    public static void main(String[] args) {
        Set<Book> all = new TreeSet<Book>();			// 实例化Set接口
        all.add(new Book("Java开发实战经典", 79.8));		// 保存数据
        all.add(new Book("Java开发实战经典", 79.8)); 		// 全部信息重复
        all.add(new Book("JSP开发实战经典", 79.8)); 		// 价格信息重复
        all.add(new Book("Android开发实战经典", 89.8)); 	// 都不重复
        System.out.println(all);
    }
}
```

本程序首先利用 `TreeSet` 子类保存了若千个 `Book` 类对象，由于 `Book` 类实现了 `Comaprable`
接口，所以会自动将所有保存的 `Book` 类对象强制转换为 `Comparable` 接口对象，然后调用 `compareTo()` 方法进行排序，如果发现比较结果为
0 则认为是重复元素，将不再进行保存。因此 `TreeSet` 数据的排序以及重复元素的消除依靠的都是 `Comparable` 接口。

## 关于重复元素的说明

`TreeSet` 利用 `Comparable`
接口实现重复元素的判断，但是这样的操作只适合支持排序类集操作环境下；而其他子类（例如：HashSet）如果要消除重复元素，则必须依靠 `Object`
类中提供的两个方法。

- 取得哈希码：`public int hashCode()` ;

|—先判断对象的哈希码是否相同，依靠哈希码取得一个对象的内容；

- 对象比较：`public boolean equals(Object obj)` 。

|—再将对象的属性进行依次的比较。

```java
package com.yootk.demo;
import java.util.Set;
import java.util.HashSet;
class Book {
    private String title;
    private double price;
    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        long temp;
        temp = Double.doubleToLongBits(price);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
           return true;
        if (obj == null)
           return false;
        if (getClass() != obj.getClass())
           return false;
        Book other = (Book) obj;
        if (Double.doubleToLongBits(price) != Double.doubleToLongBits(other.price))
           return false;
        if (title == null) {
           if (other.title != null)
              return false;
        } else if (!title.equals(other.title))
           return false;
        return true;
    }
    @Override
    public String toString() {
        return "书名：" + this.title + "，价格：" + this.price + "\n";
    }
}
public class TestDemo {
    public static void main(String[] args) {
        Set<Book> all = new HashSet<Book>();			// 实例化Set接口
        all.add(new Book("Java开发实战经典", 79.8));		// 保存数据
        all.add(new Book("Java开发实战经典", 79.8)); 		// 全部信息重复
        all.add(new Book("JSP开发实战经典", 79.8)); 		// 价格信息重复
        all.add(new Book("Android开发实战经典", 89.8)); 	// 都不重复
        System.out.println(all);
    }
}
```

本程序实现了集合中重复元素的清除，利用的就是 `hashCode()` 与 `equals()`
两个方法，所以在进行非排序集合操作时，只要是判断重复元素依靠的永远都是 `hashCode()` 与 `equals()` 。