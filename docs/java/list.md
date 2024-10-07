# List 子接口

`List` 子接口最大的功能是里面所保存的数据可以存在重复内容，并且在 `Collection` 子接口中 `List`
子接口是最为常用的一个子接口，在 `List` 接口中对 `Collection` 接口的功能进行了扩充。`List` 子接口扩充的方法如表所示。

<img src="http://niu.ochiamalu.top/image-20240928095323281.png" alt="image-20240928095323281" style="zoom:80%;margin:0 auto" />

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

<img src="http://niu.ochiamalu.top/image-20240928100319588.png" alt="image-20240928100319588" style="zoom:80%;margin:0 auto" />

在实际的使用中，往往会优先考虑 `ArrayList` 子类。`Vector` 中支持的输出操作在随后的部分会为读者讲解。

:::

