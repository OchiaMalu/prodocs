# Collections 工具类

Java 提供类库时考虑到用户的使用方便性，专门提供了一个集合的工具类 `Collections` ，这个工具类可以实现<u>List、Set、Map</u>
集合的操作。`Collections` 类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928105819356.png" alt="image-20240928105819356" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.fun/image-20240928105828242.png" alt="image-20240928105828242" style="zoom:80%;margin:0 auto" />

通过表列出的方法可以发现，`Collections` 提供了一些更为方便的辅助功能操作。下面通过一个简单的范例来进行 `Collections`
工具类的使用验证。

```java
package com.yootk.demo;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        List<String> all = new ArrayList<String>();		// 实例化集合对象
        // 利用Collections类的方法向集合保存多个数据
        Collections.addAll(all, "jixianit", "mldn", "yootk", "mldnjava", "lixinghua");
        Collections.reverse(all);						// 集合反转
        System.out.println(all);						// 直接输出集合对象
    }
}
```

本程序首先实例化了一个空的集合对象，然后利用 `Collections` 类的 `addAll()`
方法一次性向集合中追加了多条数据，最后又利用`reverse()` 方法实现了集合数据的反转操作。

:::tip `Collection` 与 `Collections` 的区别

- `Collection` 是集合操作的接口，包含 `List` 子接口和 `t` 子接口；
- `Collections` 是集合操作的工具类，可以直接利用类中提供的方法，进行<u>List、 Set、Map</u>等集合的数据操作。

:::

