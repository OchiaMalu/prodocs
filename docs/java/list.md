# List 子接口

`List` 子接口最大的功能是里面所保存的数据可以存在重复内容，并且在 `Collection` 子接口中 `List`
子接口是最为常用的一个子接口，在 `List` 接口中对 `Collection` 接口的功能进行了扩充。`List` 子接口扩充的方法如表所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240928095323281.png" alt="image-20240928095323281" style="zoom:80%;" />

在使用 `List` 接口时可以利用 `ArrayList` 或 `Vector` 两个子接口来进行接口对象的实例化操作。

## 新的子类：ArrayList

`ArrayList` 子类是List子接口中最为常用的一个子类，下面通过 `ArrayList` 类来实现 `List` 接口的操作。

```java
package com.yootk.demo;
import java.util.ArrayList;
import java.util.List;
public class TestDemo {
    public static void main(String[] args) { 
        // 从JDK 1.5开始应用了泛型，从而保证集合中所有的数据类型都一致
        List<String> all = new ArrayList<String>() ;		// 实例化List集合
        System.out.println("长度：" + all.size() + "，是否为空：" + all.isEmpty());
        all.add("Hello");							// 保存数据
        all.add("Hello"); 							// 保存重复元素
        all.add("World");							// 保存数据
        System.out.println("长度：" + all.size() + "，是否为空：" + all.isEmpty());
        // Collection接口定义size()方法取得了集合长度，List子接口扩充get()方法根据索引取得了数据
        for (int x = 0; x < all.size(); x++) {
            String str = all.get(x); 					// 取得索引数据
            System.out.println(str);					// 直接输出内容
        }
    }
}
```

本程序通过 `ArrayList` 子类实例化了 `List` 接口对象，这样就可以使用 `List` 接口中定义的方法（包括 `Collection`
接口定义的方法），由于 `List` 接口相对于 `Collection` 接口中扩充了 `get()` 方法，所以可以利用循环的方式依次取出集合中的每一个保存数据。

:::tip 数组（Array）与数组列表（ArrayList）有什么区别？什么时候应该使用 `Array` 而不使用 `ArrayList` ？

数组（Array）中保存的内容是固定的，而数组列表（ArrayList）中保存的内容是可变的。在很多时候，数组列表（ArrayList）进行数据保存与取得时需要一系列的判断，而如果是数组（Array）只需要操作索引即可。

如果在已经确定好长度的前提下，完全可以使用数组（Array）来替代数组列表（ArrayList），但是如果集合保存数据的内容长度是不固定的，那么就使用 `ArrayList` 。

另外，在许多开发框架中会将数组与 `List` 集合作为同一种形式。例如，在 Hibernate 容器映射湖是 Spring
中注入的配置如果是数组或者是 `List` 集合，其最终的结果是完全相同的。关于此点读者可以随着技术的深入而有更深的体会。

:::

:::tip 也可以利用 `ArrayList` 为 `Collection` 接口实例化

`ArrayList` 是 `List` 接口的子类，所以也就是 `Collection` 接口的子类，这样就可以利用 `ArrayList` 为 `Collection`
接口实例化（大部分情况下这样的操作不会出现），但是如果直接使用 `Collection` 接口对象将不具备 `get()`
方法，只能将全部集合转化为对象数组后才可以使用循环进行输出。

```java
package com.yootk.demo;
import java.util.ArrayList;
import java.util.Collection;
public class TestDemo {
    public static void main(String[] args) { 
        Collection<String> all = new ArrayList<String>();
        all.add("Hello");							// 保存数据
        all.add("Hello"); 							// 重复元素
        all.add("World");							// 保存数据
        // Collection不具备List接口的get()方法，所以必须将其转化为对象数组
        Object obj[] = all.toArray(); 					// 变为对象数组取得
        for (int x = 0; x < obj.length; x++) {			// 采用循环输出
            String str = (String) obj[x] ;				// 强制向下转型
            System.out.println(str);					// 输出数据
        }
    }
}
```

通过本程序可以发现，`Collection` 与 `List` 接口的最大区别在于，`List` 提供了 `get()`
方法，这样就可以根据索引取得内容，在实际的开发中，此方法使用较多。但是需要提醒读者的是，范例的输出操作并不是集合的标准输出操作，具体的输出操作将在后续为读者讲解。

:::

范例的操作是在集合中保存了 `String`
类的对象，然而对于集合的操作，也可以保存自定义对象。而如果要正确地操作集合中的`remove()` 或 `contains()`
方法，则必须保证自定义类中明确地覆写了 `equals()` 方法。

```java
package com.yootk.demo;
import java.util.ArrayList;
import java.util.List;
class Book {						// 创建一个自定义类
    private String title;
    private double price;
    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
    @Override
    public boolean equals(Object obj) {		// 必须覆写此方法，否则remove()、contains()无法使用
        if (this == obj) {
           return true;
        }
        if (obj == null) {
           return false;
        }
        if (!(obj instanceof Book)) {
           return false;
        }
        Book book = (Book) obj;
        if (this.title.equals(book.title) && this.price == book.price) {
           return true;
        }
        return false;
    }
    @Override
    public String toString() {
        return "书名：" + this.title + "，价格：" + this.price + "\n";
    }
}
public class TestDemo {
    public static void main(String[] args) {
        List<Book> all = new ArrayList<Book>();			// List接口对象
        all.add(new Book("Java开发实战经典", 79.8));			// 保存自定义类对象	
        all.add(new Book("Java Web开发实战经典", 69.8)); 		// 保存自定义类对象
        all.add(new Book("Oracle开发实战经典", 89.8));		// 保存自定义类对象
        all.remove(new Book("Oracle开发实战经典", 89.8));		// 需要使用equals()方法
        System.out.println(all);
    }
}
```

本程序实现了自定义类对象的保存，由于设置的泛型限制，所以在集合保存数据操作中只允许保存 `Book`
类对象，同时为了可以使用集合中的 `remove()` 方法，在 `Book` 类中必须明确覆写 `equals()` 方法。

:::tip 链表为其操作原理

通过以上几个核心操作的讲解，相信读者已经清楚了集合的基本使用。而对于之前讲解链表熟悉的读者也可以轻松掌握其实现原理，也就是说利用 `List`
接口可以轻松实现与原始链表完全相同的功能，实现横向替代。

:::

:::tip `ArrayList` 和 `LinkedList` 的区别

实际上在 `List` 子接口中还存在一个 `LinkedList` 子类，而使用时大部分情况下都是利用子类为父接口实例化。`ArrayList`
和`LinkedList` 的区别如下。

- `ArrayList` 中采用顺序式的结果进行数据的保存，并且可以自动生成相应的索信息；
- `LinkedList`
  集合保存的是前后元素，也就是说，它每一个节点中保存的是两个元素对象，一个它对应的下一个节点，以及另外一个它对应的上一个节点，所以 `LinkedList`
  要占用比 `ArrayList` 更多的内存空间。同时 `LinkedList` 比 `ArrayList` 多实现了一个`Queue` 队列数据接口。

:::

## 旧的子类：Vector

在 JDK1.0 时就已经提供了 `Vector` 类（当时称为向量类)，同时由于其提供的较早，这个类被大量使用。但是到了 JDK1.2
时由于类集框架的引入，对于整个集合的操作就有了新的标准，为了可以继续保留 `Vector` 类，就让这个类多实现了一个 `List` 接口。

```java
package com.yootk.demo;
import java.util.List;
import java.util.Vector;
public class TestDemo {
    public static void main(String[] args) { 
        // 由于都是利用子类为父类实例化，所以不管使用哪个子类，List接口功能不变
        List<String> all = new Vector<String>() ;			// 实例化List集合 
        System.out.println("长度：" + all.size() + "，是否为空：" + all.isEmpty());
        all.add("Hello");								// 保存数据
        all.add("Hello"); 								// 保存重复元素
        all.add("World");								// 保存数据
        System.out.println("长度：" + all.size() + "，是否为空：" + all.isEmpty());
        // Collection接口定义了size()方法取得集合长度，List子接口扩充了get()方法，根据索引取得数据
        for (int x = 0; x < all.size(); x++) {
            String str = all.get(x); 						// 取得索引数据
            System.out.println(str);						// 直接输出内容
        }
    }
}
```

本程序只是将 `ArrayList` 子类替换为 `Vector` 子类，由于最终都是利用子类实例化 `List`
接口对象所以最终的操作结果并没有区别，而两个操作子类最大的区别在于 `Vector` 类中的部分方法使用 `synchronized`
关键字声明（同步操作）。

:::tip `ArrayList` 与 `Vector` 子类的区别

`ArrayList` 与 `Vector` 子类的区别如表所示。

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240928100319588.png" alt="image-20240928100319588" style="zoom:80%;" />

在实际的使用中，往往会优先考虑 `ArrayList` 子类。`Vector` 中支持的输出操作在随后的部分会为读者讲解。

:::

## Set 子接口

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

### 关于数据排序的说明

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

### 关于重复元素的说明

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
