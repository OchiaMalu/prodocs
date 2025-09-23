# 偶对象保存：Map 接口

`Collection` 每次只能保存一个对象，所以属于单值保存父接口。而在类集中又提供了保存偶对象的集合：`Map` 集合，利用 `Map`
结合可以保存一对关联数据（按照 `key=value` 的形式），如图所示，这样就可以实现根据 `key` 取得 `value` 的操作。在 `Map`
接口中的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928102728907.png" alt="image-20240928102728907" style="zoom: 80%;margin:0 auto" />

<img src="http://niu.ochiamalu.fun/image-20240928102742094.png" alt="image-20240928102742094" style="zoom:80%;margin:0 auto" />

在 `Map` 接口中存在两个常用的子类：`HashMap` 、`Hashtable` ，下面分别介绍这两个子类的使用。

```java
package com.yootk.demo;
import java.util.HashMap;
import java.util.Map;
public class TestDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<String, Integer>();	// 定义Map集合
        map.put("壹", 1);										// 保存数据
        map.put("贰", 2);										// 保存数据
        map.put("叄", 3);										// 保存数据
        map.put("叄", 33); 									// key数据重复
        map.put("空", null);									// value为null
        map.put(null, 0) ;										// key为null
        System.out.println(map);								// 输出全部map集合
    }
}
```

本程序实现了 `Map` 最为基础的数据保存操作，在实例化 `Map` 接口对象时首先需要明确地指定泛型类型，此处指定 `key`
的类型为`String` ，`value` 的类型为 `Integer` ，然后利用 `put()`
方法进行数据的保存。特别需要注意的是，在进行数据保存时，如果出现了 `key`
重复的情况，就会使用新的数据替换已有数据。通过范例的操作可以发现 `Map` 如下特点。

- 使用 `HashMap` 定义的 `Map` 集合是无序存放的（顺序无用）；
- 如果发现了重复的 `key` 会进行覆盖，使用新的内容替换旧的内容。
- 使用 `HashMap` 子类保存数据时 `key` 或 `value` 可以保存为 `null` 。

但是需要注意的是，范例的代码只是演示了 `Map` 的基本使用，然而 `Map`
保存数据的目的并不是进行输出操作，而是为了进行查找，即利用 `get()` 方法通过 `key` 找到对应的 `value` 数据。

```java
package com.yootk.demo;
import java.util.HashMap;
import java.util.Map;
public class TestDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<String, Integer>();	// 定义Map集合
        map.put("壹", 1);										// 保存数据
        map.put("贰", 2);										// 保存数据
        map.put("叄", 3);										// 保存数据
        map.put("叄", 33); 									// key数据重复
        map.put("空", null);									// value为null
        map.put(null, 0) ;										// key为null 
        System.out.println(map.get("壹"));							// key存在返回value
        System.out.println(map.get("陸"));							// 如果key不存在，返回null
        System.out.println(map.get(null));							// key存在
    }
}
```

本程序利用 `Map` 接口中的 `get()` 方法根据 `key` 取得了其对应的 `value` 内容，通过执行结果可以发现，如果指定的 `key`
存在则会返回与之对应的 `value` ，而如果 `key` 不存在则返回 `null` 。

:::tip `Map` 与 `Collection` 的区别是什么？

通过范例的代码可以发现，`Map` 接口在使用中依然只是保存数据与输出数据，这样直接使用 `Collection`
不就好了，为什么还需要 `Map` 接口？

**回答：`Collection` 接口数据是为了输出，`Map` 接口数据是为了查询。**

首先 `Collection` 与 `Map` 接口都可以保存动态长短的数据，然而两者本质的区别在于其使用的环境。`Collection`
接口保存数据的主要目的是输出（利用 `Iterator` 接口），而 `Map` 保存数据的目的是实现 `key` 查找 `value`
的字典功能，虽然 `Map` 也可以进行输出操作，但是这样的操作在开发中出现较少。

:::

在 `Map` 接口下还有一个 `Hashtable` 的子类，此类是在 JDK1.0 时提供的，属于最早的 `Map` 集合的实现操作。在 JDK1.2
时 `Hashtable` 的子类多实现了一个 `Map` 接口，从而得以保存下来继续使用。

:::tip Hashtable 使用注意事项

`Hashtable` 与 `HashMap` 都属于 `Map` 接口的子类，所以从本质上讲，它们最终都会利用子类向上转型为 `Map`
接口对象实例化。但是在使用 `Hashtable` 子类实例化的 `Map` 集合中，保存的 `key` 或 `value` 都不允许出现 `null`
，否则会出现 `NullPointerException` 异常。

:::

```java
package com.yootk.demo;
import java.util.Hashtable;
import java.util.Map;
public class TestDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new Hashtable<String, Integer>();	// 定义Map集合
        map.put("壹", 1);										// 保存数据
        map.put("贰", 2);										// 保存数据
        map.put("叄", 3);										// 保存数据
        map.put("叄", 33); 									// key数据重复
        System.out.println(map.get("壹"));							// key存在返回value
        System.out.println(map.get("陸"));							// key不存在，返回null
    }
}
```

本程序利用 `Hashtable` 子类实例化了 `Map` 接口，由于接口操作标准统一，所以 `put()` 与 `get()`
方法都可以正常使用，在使用 `get()` 方法进行数据查找时，如果数据不存在则返回 `null` 。

:::tip `HashMap` 与 `Hashtable` 的区别

`HashMap` 与 `Hashtable` 的区别如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928103347285.png" alt="image-20240928103347285" style="zoom:80%;margin:0 auto" />

在实际开发中，由于 `HashMap` 保存数据不受 `null` 的限制，所以建议读者优先考虑使用 `HashMap` 子类。

:::

## 利用 Iterator 输出 Map 集合

首先读者必须明确一个开发原则：集合的输出要利用 `Iterator` 接口完成。但是 `Map` 接口与 `Collection`
接口在定义上有所不同，`Map` 接口并没有提供直接取得 `Iterator` 接口对象的方法。所以如果要使用 `Iterator` 输出 `Map`
接口数据，就必须要清楚 `Collection` 接口与 `Map` 接口在数据保存形式上的区别，如图所示。

<img src="http://niu.ochiamalu.fun/image-20240928103503116.png" alt="image-20240928103503116" style="zoom:80%;margin:0 auto" />

通过图的分析可以发现，当用 `Collection` 集合保存数据时所有的对象都是直接保存的。而用 `Map` 集合保存数据时，所保存的 `key`
与`value` 会自动包装为 `Map.Entry` 接口对象，也就是说如果利用 `Iterator` 进行迭代，那么每当使用 `next()`
方法读取数据时返回的都是一个 `Map.Entry` 接口对象，此接口定义如下。

> public static interface Map.Entry<K,V>{}

通过定义可以发现，`Map.Entry` 接口属于 `Map` 接口中定义的一个 `static` 内部接口（相当于外部接口)。`Map.Entry`
接口定义的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928103611747.png" alt="image-20240928103611747" style="zoom:80%;margin:0 auto" />

清楚了 `Map.Entry` 接口作用后就可以来研究如何利用 `Iteartor` 接口输出 `Map` 集合了，在 `Map`
接口中定义了一个 `entrySet()` 方法( `public Set<Map.Entry<K,V>>entrySet()` ），而实现 `Map` 接口输出的关键就在于此方法的使用上。

`Iterator` 输出 `Map` 集合的操作步骤如下。

(1)利用 `entrySet()` 方法将 `Map` 接口数据中的数据转换为 `Set` 接口实例进行保存，此时 `Set`
接口中所使用的泛型类型为 `Map.Entry` ，而 `Map.Entry` 中的 `K` 与 `V` 的泛型类型则与 `Map` 集合定义的 `K` 与 `V` 类型相同；

(2)利用 `Set` 接口中的 `iterator()` 方法将 `Set` 集合转化为 `Iterator` 接口实例；

(3)利用 `Iterator` 接口进行迭代输出，每一次迭代取得的都是 `Map.Entry` 接口实例，利用此接口实例可以进行 `key` 与 `value`
的分离。

```java
package com.yootk.demo;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
public class TestDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new Hashtable<String, Integer>();	// 定义Map集合
        map.put("壹", 1);										// 保存数据
        map.put("贰", 2);										// 保存数据
        map.put("叄", 3);										// 保存数据
        map.put("叄", 33); 									// key数据重复
        // 将Map集合变为Set集合，目的是使用iterator()方法，注意泛型的统一
        Set<Map.Entry<String,Integer>> set = map.entrySet() ;
        Iterator<Map.Entry<String,Integer>> iter = set.iterator() ;	// 取得Iterator实例
        while (iter.hasNext()) {								// 迭代输出
            Map.Entry<String, Integer> me = iter.next() ;			// 取出Map.Entry
            System.out.println(me.getKey() + " = " + me.getValue());	// 输出数据
        }
    }
}
```

本程序按照给出的步骤实现了 `Iterator` 接口输出 `Map` 集合的操作，其中最为关键的就是 `Iterator`
每次迭代返回的类型是`Map.Entry` (注意泛型类型的设置)，而后利用 `getKey()` 与 `getValue()` 方法才可以取得所保存的 `key`
与 `value` 数据。

## 自定义 Map 集合的 key 类型

在使用 `Map` 接口时可以发现，几乎可以使用任意的类型来作为 `key` 或 `value` 的存在，也就表示可以使用自定义的类型作为 `key`
。作为`key` 的自定义的类必须要覆写 `Object` 类中的 `hashCode()` 与 `equals()`
两个方法，因为只有靠这两个方法才能确定元素是否重复（在`Map` 中指的是能否够找到）。

```java
package com.yootk.demo;
import java.util.HashMap;
import java.util.Map;
class Book {										// 此类为要保存的key类型
    private String title ;								// 只定义一个属性
    public Book(String title) {							// 构造方法接收数据
        this.title = title ;
    }
    @Override
    public String toString() {
        return "书名：" + this.title ;
    }
    @Override
    public int hashCode() {								// 取得对象编码
        final int prime = 31;
        int result = 1;
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {						// 进行对象比较
        if (this == obj)
           return true;
        if (obj == null)
           return false;
        if (getClass() != obj.getClass())
           return false;
        Book other = (Book) obj;
        if (title == null) {
           if (other.title != null)
              return false;
        } else if (!title.equals(other.title))
           return false;
        return true;
    }
}
public class TestDemo {
    public static void main(String[] args) {
        Map<Book,String> map = new HashMap<Book,String>() ;	// 实例化Map接口集合
        map.put(new Book("Java开发"),new String("Java")) ;		// 向Map接口保存数据
        System.out.println(map.get(new Book("Java开发")));			// 根据key取得value
    }
}
```

本程序使用一个自定义的 `Book` 类作为 `Map` 集合中的 `key` 类型，由于已经正确地覆写了 `hashCode()` 与 `equals()`
方法，因此可以在`Map` 集合中根据 `key` 找到对应的 `value` 数据。

:::tip 尽量不要使用自定义数据类型作为 key

虽然 `Map` 集合中可以将各种数据类型作为 `key` 进行设置，但是从实际的开发来讲，不建议使用自定义类作为 `key` ，建议使用 Java
中提供的系统类作为 `key` ，如String、 Integer等，其中 `String` 作为 `key` 的情况是最为常见的。

:::
