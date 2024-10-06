# 对象序列化

Java 允许用户在程序运行中进行对象的创建，但是这些创建的对象都只保存在内存中，所以这些对象的生命周期都不会超过 JVM
进程。但是在很多时候可能需要在 JVM 进程结束后对象依然可以被保存下来，或者在不同的 JVM
进程中要进行对象传输，那么在这样的情况下就可以采用对象序列化的方式进行处理。

## 序列化接口：Serializable

对象序列化的本质实际上就是将内存中所保存的对象数据转换为二进制数据流进行传输的操作。但是并不是所有类的对象都可以直接进行序列化操作，要被序列化的对象所在的类一定要实现 `java.io.Serializable`
接口。而通过文档观察可以发现，序列化接口里面并没有任何操作方法存在，因为它是一个标识接口，表示一种能力。

```java
package com.yootk.demo;
import java.io.Serializable;
@SuppressWarnings("serial")				// 压制序列化版本号警告信息
class Book implements Serializable { 			// 此类对象可以被序列化
    private String title;
    private double price;
    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
    @Override
    public String toString() {
        return "书名：" + this.title + "，价格：" + this.price;
    }
}
```

本程序的 `Book` 类由于实现了 `Serializable` 接口，所以 `Book` 类的对象就可以进行二进制传输以及文件保存的操作。

## 实现序列化与反序列化

实现了 `Serializable` 接口后并不意味着对象可以实现序列化操作。实际上在对象序列化与反序列化的操作中，还需要以下两个类的支持。

- 序列化操作类：`java.io.ObjectOutputStream` ，将对象序列化为指定格式的二进制数据；
- 反序列化操作类：`java.io.ObjectInputStream` ，将序列化的二进制对象信息转换回对象内容。

`ObjectOutputStream` 类的常用方法如表所示，`ObjectInputStream` 类的常用方法如表所示。

<img src="http://niu.ochiamalu.top/image-20240928001953267.png" alt="image-20240928001953267" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.top/image-20240928002007635.png" alt="image-20240928002007635" style="zoom:80%;margin:0 auto" />

通过 `ObjectOutputStream` 与 `ObjectInputStream` 类的方法定义可以发现，序列化对象时(writeObject())
接收的参数统一为 `Object` ，而反序列化对象时(readObject())返回的类型也为 `Object` ，所以这两个类可以序列化或反序列化 Java
中的所有数据类型(Object 可以接收所有引用类型，将基本类型自动装箱为包装类后接收）。

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        ser();
    }
    public static void ser() throws Exception {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(
                new File("D:" + File.separator + "book.ser")));
        oos.writeObject(new Book("Java开发实战经典", 79.8)); 	// 序列化对象
        oos.close();
    }
}
```

本程序实现了 `Book` 类对象序列化的操作，在实例化 `ObjectOutputStream` 类对象时需要设置一个 `OutputStream`
类对象，此时设置的为 `FileOutputStream` 子类，表示对象将被序列化到文件中。 `book.ser` 文件保存内容如图所示。

<img src="http://niu.ochiamalu.top/image-20240928002143292.png" alt="image-20240928002143292" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        dser();
    }
    public static void dser() throws Exception {
        ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream(new File("D:" + File.separator + "book.ser")));
        Object obj = ois.readObject() ;					// 反序列化对象
        Book book = (Book) obj ;						// 转型
        System.out.println(book);
        ois.close();
    }
}
```

本程序首先利用 `ObjectInputStream` 类通过指定 `InputStream` 子类对象确定对象读取的输入流为文件，然后利用 `readObject()`
方法可以将被序列化的对象反序列化回来。由于返回的对象类型都是 `Object` ，所以如果有需要可以利用向下转型的操作，将返回对象转化为具体的子类类型。

:::tip 能否不进行对象的向下转型？

在之前讲解对象转型的概念中，一直强调对象的向下转型是不安全的操作，那么如果在开发中像范例那样执行对象的向下转型操作就会存在安全隐患，能不能不转型操作呢？

**回答：利用反射就可以不转型操作子类方法。**

因为在范例中给出的 `Book` 类的功能有限，如果假设 `Book` 类中有许多自己的功能（不单单只是覆写 `Object` 类的方法)
，这时采用强制性的向下转型就变得非常有意义了，但是会存在安全隐患。所以最好的做法是，此处不进行对象的强制转型，而是利用反射机制来进行操作。

:::

## transient 关键字

Java
中对象最有意义的内容就是对象的属性信息，所以在默认情况下，如果要进行对象的序列化操作，所序列化的一定是对象的属性信息，并且该对象中的所有属性信息都将被序列化。如果某些属性的内容不需要被保存，就可以通过 `transient`
关键字来定义。

```java
package com.yootk.demo;
import java.io.Serializable;
@SuppressWarnings("serial")
class Book implements Serializable { 			// 此类对象可以被序列化
    private transient String title;			// 此属性无法被序列化
    private double price;
    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
    @Override
    public String toString() {
        return "书名：" + this.title + "，价格：" + this.price;
    }
}
```

本程序中 `Book` 类的 `title` 属性上使用了 `transient` 关键字进行定义，这样当进行对象序列化操作时，此属性的内容将不能被保存。

:::tip 什么时候需要序列化操作？

既然 `java.io.Serializable` 接口中没有定义任何抽象方法，那么是不是意味着，开发中所有的类都实现 `Serializable` 接口会比较好？

**回答：只在需要的类上实现 `Serializable` 接口。**

在实际的开发中，并不是所有的类都要求去实现序列化接口，只有需要传输对象所在的类时才需要实现 `Serializable` 接口，而这样的类最主要的就是简单
Java 类。由于简单 Java 类的实际定义与数据表结构相似，所以在很多情况下，很少会使用 `transient` 关键字。

:::
