# 反射机制

反射是 Java 中最为重要的特性，几乎所有的开发框架以及应用技术中都是基于反射技术的应用。本节主要讲解反射机制的作用，以及如何利用反射实现类结构的操作。

## 认识反射

在正常的类操作过程中，一定是要先确定使用的类，再利用关键字 `new`
产生实例化对象后使用。但是在如果要通过对象取得此对象所在类的信息，那么就可以通过 `Object` 类中的 `getClass()`
方法 `public final Class<?> getClass()` 实现。

```java
package com.yootk.demo;
import java.util.Date; 						// 导入所需要的类
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Date date = new Date(); 				// 产生实例化对象
        System.out.println(date.getClass());		// 直接反射输出
    }
}
```

本程序首先导入了要产生实例化对象的类，然后利用关键字 `new`
进行对象实例化，而要想通过对象找到对应类的完整信息，则可以利用`getClass()` 方法完成。本程序直接将 `getClass()`
方法的返回类型进行了输出，输出的内容就是对象的类名称。

## Class 类对象实例化

当使用 `getClass()` 方法时，返回的类型为 `java.lang.Class` ，这是反射操作的源头类，即所有的反射操作都需要通过此类开始，而最关键的是这个类有以下
3 种实例化方式。

- 第一种：调用 `Object` 类中的 `getClass()` 方法，但是如果要使用此类操作则必须有实例化对象。

```java
import java.util.Date;

public class TestDemo {
    public static void main(String[] args) {
        Date date = new Date();
        Class<?> cls = date.getClass();
        // Class类中有 "public String getName()" 方法可以取得类的完整名称
        System.out.println(cls.getName());
    }
}
```

本程序通过 `Date` 类的实例化对象，调用了从 `Object` 类中继承来的 `getClass()` 方法，这样就取得了 `java.util.Date`
类型的反射操作类对象，通过调用 `getName()` 方法可以直接输出要操作类型的完整名称。

- 第二种：使用 `类.class` 取得，此时可以不需要通过指定类的实例化对象取得。

```java
import java.util.Date;

public class TestDemo {
    public static void main(String[] args) {
        Class<?> cls = Date.class;
        System.out.println(cls.getName());
    }
}
```

本程序利用Date类调用了 `class` 属性，利用这样特殊的格式就可以取得 `java.util.Date`
类的反射操作类对象，此时可以不需要`Date` 类的实例化对象。

- 第三种：调用 `Class` 类提供的方法：`public static Class<?> forName(String className) throws ClassNotFoundException` 。

```java
public class TestDemo {
    public static void main(String[] args) throws ClassNotFoundException {
        Class<?> cls = Class.forName("java.util.Date");
        System.out.println(cls.getName());
    }
}
```

本程序使用 `Class` 类中的 `forName()`
方法，这样要进行反射操作的类，只需要定义一个具体的名称就可以取得反射操作类对象，但是前提是此类的确存在，如果不存在则会抛出 `ClassNotFoundException`
异常。

:::tip 几乎所有的开发框架都会使用到以上 3 种实例化方式

对于此时给出的 3 种 `Class` 类的实例化对象操作，实际上很难分辨出到底哪种模式使用较多，因为从实际的开发来讲，三种模式都有可能使用到。

- 利用 `getClass()` 方法操作往往出现在简单 Java 类与提交参数的自动赋值操作中，像 Struts、Spring MVC 都会提供表单参数与简单
  Java 类的自动转换；
- 利用 `类.class` 的方式往往是将反射操作的类型设置交由用户使用，像 Hibernate 中进行数据保存以及根据 ID 查询中会使用到此类操作；
- 利用 `Class.forName()` 方法可以实现配置文件以及 Annotation 配置的反射操作，几乎所有的开发框架都是依靠此方式实现的。

:::

## 反射实例化对象

掌握了 `Class` 类对象实例化的三种操作形式，就可以利用 `Class` 类来进行类的反射控制了。在 `Class` 类中提供有如下 10
个常用方法，如表所示。

<img src="http://niu.ochiamalu.top/image-20240927111317752.png" alt="image-20240927111317752" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.top/image-20240927111336733.png" alt="image-20240927111336733" style="zoom:80%;margin:0 auto" />

通过 `Class` 类的常用方法可以发现，在反射操作中类或接口都是利用 `Class` 来进行包装的，同时利用 `Class`
类可以表示任意类、枚举、接口、数组等引用类型的操作。

在 `Class` 类中最为重要的一个方法就是 `newInstance()`
方法，通过此方法可以利用反射实现Class类包装类型的对象实例化操作，也就是说即使不使用关键字 `new` 也可以进行对象的实例化操作。

:::warning 默认要使用无参构造方法

任何类都至少会存在一个构造方法，如果利用 `Class` 类中的 `newInstance()`
方法反射实例化类对象，则类中一定要提供无参构造方法，否则会出现语法错误。当然也可以进步深入利用反射调用指定的构造方法。

:::

```java
package com.yootk.demo;
class Book {
    public Book() {
        System.out.println("********** Book类的无参构造方法 ***********");
    }
    @Override
    public String toString() {
        return "《名师讲坛——Java开发实战经典》";
    }
}
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("com.yootk.demo.Book");		// 设置要操作对象的类名称
        // 反射实例化后的对象返回的结果都是Object类型
        Object obj = cls.newInstance(); 						// 相当于使用new调用无参构造
        Book book = (Book) obj;								// 向下转型
        System.out.println(book);
    }
}
```

本程序没有使用关键字 `new` 进行 `Book` 类对象的实例化操作，而是通过 `Class`
类定义了要操作的类名称，并且利用 `newInstance()` 方法进行对象实例化，此时默认会调用类中的无参构造方法。但是 `newlnstance()`
方法返回的类型为 `Object` ，如果有需要则可以利用对象的向下转型将其强制变为子类实例进行操作。

:::tip 这样做有什么意义？

**回答：利用反射机制实例化对象可以实现更好的解耦合操作。**

利用关键字 `new` 进行对象的实例化操作是最正统的做法，也是实际开发中使用最多的操作。但是关键字 `new`
实例化对象时需要明确地指定类的构造方法，所以 `new`
是造成耦合的最大元凶，而要想解决代码的耦合问题，首先要解决的就是关键字 `new` 实例化对象的操作。

曾经为读者讲解过工厂设计模式，但当时的工厂设计模式有一个缺陷：每次在增加新的接口子类时都需要修改工厂类，这就是使用关键字`new`
而带来的问题，而现在就可以利用反射来解决此设计缺陷。

```java
package com.yootk.test;
interface Fruit {
    public void eat() ;
}
class Apple implements Fruit {
    @Override
    public void eat() {
        System.out.println("** 吃苹果！");
    }
}
class Orange implements Fruit {
    @Override
    public void eat() {
        System.out.println("** 吃橘子！");
    }
}
class Factory {
    public static Fruit getInstance(String className) {
        Fruit f = null;
        try {	// 反射实例化，子类对象可以使用Fruit接收
            f = (Fruit) Class.forName(className).newInstance();
        } catch (Exception e) {}		// 此处为了方便不处理异常
        return f;
    }
}
public class TestFactory {
    public static void main(String[] args) {	// 直接传递类名称
        Fruit fa = Factory.getInstance("com.yootk.test.Apple") ;
        Fruit fb = Factory.getInstance("com.yootk.test.Orange") ;
        fa.eat();
        fb.eat();
    }
}
```

本程序在工厂类中使用了反射机制，这样只需要传递完整的类名称就可以取得实例化对象，由于此时传递的 `Apple` 与 `Orange`
都是 `Fruit` 接口的子类，所以在利用反射实例化对象后都统一使用Fruit接口进行接收，而如果此时传递的类名称有错误，则 `Factory`
工厂类的 `getInstance()` 方法将返回 `null` 。

在实际的开发中，如果将以上工厂设计模式再结合一些配置文件（例如：XML格式的文件)，就可以利用配置文件来动态定义项目中所需的操作类，此时的程序将变得非常灵活。

有了反射后，进行对象实例化的操作不再只是单独的依靠关键字 `new` 完成了，反射也同样可以完成，但是这并不表示 `new`
就被完全取代，在应用开发中（不是架构层次的开发）大部分都会利用 `new` 实现对象的实例化操作。

:::

## 使用反射调用构造

利用 `Class` 类的 `newInstance()`
方法可以实现反射实例化对象的操作，但是这样的操作本身有一个限制，就是类中必须提供无参构造方法。所以当类中只提供有参构造方法时，就必须通过 `java.lang.reflect.Constructor`
类来实现对象的反射实例化操作。

:::tip 错误的反射实例化操作

如果一个类中没有提供无参构造方法，则执行时会出现 `InstantiationException` 异常信息。

```java
package com.yootk.demo;
class Book {
    private String title ;
    private double price ;
    public Book(String title, double price) {
        this.title = title ;
        this.price = price ;
    }
    @Override
    public String toString() {
        return "图书名称：" + this.title + "，价格：" + this.price ;
    }
}
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("com.yootk.demo.Book") ;
        Object obj = cls.newInstance() ;		// 相当于使用new调用无参构造实例化
        System.out.println(obj);
    }
}
```

此时在输出的异常信息中已经明确地告诉用户，因为 `Book` 类中没有无参构造，所以无法进行对象的实例化操作。虽然 Java
中针对此问题有解决方案，但是每一个类的构造方法中的参数数量都很有可能不一样多，此时如果要编写一个公共的反射实例化对象的工具类就会比较麻烦。所以本书还是建议读者在实际开发中尽量使用无参构造进行反射操作，这也与之前讲解的简单
Java 类的开发原则类似。

另外，`java.lang.reflect`
是所有反射操作类的程序包，类中的每一个结构都有相应的类进行操作定义，例如：构造方法会使用`Constructor` 类描述。

:::

类的反射操作都是通过 `java.lang.Class` 类展开的，所以在 `Class` 类中定义了取得类中的构造方法的操作，如表所示。

<img src="http://niu.ochiamalu.top/image-20240927111401594.png" alt="image-20240927111401594" style="zoom:80%;margin:0 auto" />

利用表所示的两个方法可以取得 `java.lang.reflect.Constructor` ，而 `Constructor` 类的常用方法如表所示。

<img src="http://niu.ochiamalu.top/image-20240927111416431.png" alt="image-20240927111416431" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.top/image-20240927111428005.png" alt="image-20240927111428005" style="zoom:80%;margin:0 auto" />

通过表可以发现，在 `Constructor` 类中也存在 `newInstance()` 方法，并且此方法定义时使用了可变参数的形式，这样先通过 `Class`
类找到指定参数类型的构造方法，再利用 `Constructor` 类的 `newlnstance()` 方法传入实例化对象所需要的参数就可以实现指定参数的构造方法调用。

:::tip 为什么取得修饰符的方法返回的是 `int` 类型？

**回答：修饰符利用数字描述。**

所有修饰符都是一个数字，修饰符的组成就是一个数字的加法操作。假设：`public` 使用 1 表示，`final` 使用 16 表示，`static` 使用
8表示，如果是 `public final` 那么就使用 17 表示(1+16)，而如果是 `public static final` 那么就使用 25 表示(1+8+16)
，所以所有的修饰符本质上都是数字的加法操作。

在 `java.lang.reflect.Modifer`
类中明确地定义了各个修饰符对应的常量操作，同时也提供了将数字转换为指定修饰符的方法：`public static String toString(int mod)` 。

:::

```java
package com.yootk.demo;
import java.lang.reflect.Constructor;
class Book {
    private String title ;
    private double price ;
    public Book(String title, double price) {
        this.title = title ;
        this.price = price ;
    }
    @Override
    public String toString() {
        return "图书名称：" + this.title + "，价格：" + this.price ;
    }
}
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("com.yootk.demo.Book") ;
        // 明确地找到Book类中两个参数的构造，第一个参数类型是String，第二个是double
        Constructor<?> con = cls.getConstructor(String.class,double.class) ;
        Object obj = con.newInstance("Java开发实战经典",79.8) ;		// 实例化对象，传递参数内容
        System.out.println(obj);
    }
}
```

本程序中由于 `Book` 类只提供两个参数的有参构造方法，所以首先要利用 `Class` 类对象取得此构造方法（返回 `Constructor`
类对象），然后利用 `Constructor` 类中的 `newInstance()` 方法传递指定的数据，就可以调用有参构造进行对象的反射实例化。

## 反射调用方法

在类的组成中，方法是类的主要操作手段，以往的做法都是利用 `对象.方法()`
的形式进行方法调用，而现在也可以利用反射机制实现类方法的操作。如果要取得操作类的方法对象，可以利用 `Class` 类完成，常用方法如表所示。

<img src="http://niu.ochiamalu.top/image-20240927111447296.png" alt="image-20240927111447296" style="zoom:80%;margin:0 auto" />

在反射操作中，每一个方法都通过 `java.lang.reflect.Method` 类表示，`Method` 类的常用方法如表所示。

<img src="http://niu.ochiamalu.top/image-20240927111500889.png" alt="image-20240927111500889" style="zoom:80%;margin:0 auto" />

通过表可以发现，在 `Method` 类中定义的方法与方法的基本格式是完全匹配的，例如：返回值(getReturnType())、参数(
getParameterTypes())、抛出异常(getExceptionTypes())。其中最为重要的方法就是 `invoke()` ，此方法是实现方法反射调用的核心操作。

:::warning 需要实例化对象

在任何情况下，只要是调用类中的普通方法，就必须产生类的实例化对象才可以正常完成，这一原则在反射操作中同样适用。

在 `Method` 类的 `invoke()`
方法调用时要接收的第一个参数就是类的实例化对象，但是读者需要注意的是，此时的类型使用的是 `Object`
，也就是用反射实现的方法调用，不需要具体的对象类型，这一点操作要比直接使用对象调用方法更加灵活。同时读者对于 `Class`
类中的 `newInstance()` 方法应该并不陌生，此方法会反射实例化对象，而返回的结果就是 `Object` 类型（无需向下转型）。

:::

```java
package com.yootk.demo;
import java.lang.reflect.Method;
class Book {
    private String title ;
    public void setTitle(String title) {
        this.title = title;
    }
    public String getTitle() {
        return title;
    }
}
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String fieldName = "title" ;						// 要操作的成员名称
        Class<?> cls = Class.forName("com.yootk.demo.Book") ;	// 取得要操作类的反射对象
        Object obj = cls.newInstance() ;					// 必须实例化对象
        // 取得类中的setTitle()方法，由于title需要首字母大写，所以调用init()处理，参数类型为String
        Method setMet = cls.getMethod("set" + initcap(fieldName), String.class) ;
        // 取得类中的getTitle()方法，本方法不接收参数并且没有返回值类型声明
        Method getMet = cls.getMethod("get" + initcap(fieldName)) ;
        setMet.invoke(obj, "Java开发实战经典") ; 	// 等价于：Book类对象.setTitle("Java开发实战经典")
        System.out.println(getMet.invoke(obj));		// 等价于：Book类对象.getTitle()
    }
    public static String initcap(String str) {			// 首字母大写操作
        return str.substring(0, 1).toUpperCase() + str.substring(1) ;
    }
}
```

本程序利用反射调用了 `Book` 类中的 `setter` 与 `getter`
方法，同时本程序考虑到实际开发应用问题，所以只给出了要操作的 `Book` 类的属性名字（属性名字为`title`
，定义的方法必须是 `setTitle()` 与 `getTitle()` ）。在取得相应方法时，由于 `title`
需要进行首字母大写的操作，所以定义一个 `initcap()` 方法来完成此功能。当取得了对应方法的 `Method`
对象后就可以利用 `invoke()` 指定方法所在类的实例化对象以及相应的参数实现方法的反射调用。

:::tip 范例与简单 Java 类的关联

读者应该已经注意到，在本程序中给出的是一个简单 Java 类，而简单 Java 类的定义规则之前已经明确强调过，所以在实际的开发中，反射的使用与简单
Java 类的联系是非常紧密的。

在学习完本程序后，读者也应该对 `setter` 及 `getter`
方法的定义要求有了更深层次的认识，因为在实际的开发中，属性的名字往往都需要动态设置，只有所有的 `setter` 、 `getter`
方法按照严格的语法要求定义，才可以正确使用反射调用。

如果要设计高可用、易扩展的程序框架，那么反射就是读者首先要通过的第一道难关。

:::

## 反射调用成员

除了构造方法、普通方法外，类中最为重要的组成就是成员（变量、常量的总称）。反射也可以进行成员的操作，而成员的取得依然需要通过 `Class`
类方法，相关方法如表所示。

<img src="http://niu.ochiamalu.top/image-20240927111525600.png" alt="image-20240927111525600" style="zoom:80%;margin:0 auto" />

表中的方法返回的类型都是 `java.lang.reflect.Field` ，此类可以描述类中的成员信息。在 `Field` 类中也定义了一些常用方法，如表所示。

<img src="http://niu.ochiamalu.top/image-20240927111617967.png" alt="image-20240927111617967" style="zoom:80%;margin:0 auto" />

实际上在 `java.lang.reflect.Field` 类中还定义了许多 `setXxx()` 、`getXxx()`
方法，例如：`setInt()` 、 `setDouble()` 、`getInt()` 、`getDouble()` 等，可以直接设置这些方法或方法具体的类型。

:::tip 需要实例化对象

不管使用反射调用普通方法还是调用类中的成员，都必须存在实例化对象（可以依靠反射取得实例化对象），因为类中的属性必须在类产生实例化对象（有堆内存空间）后才可以正常使用。

:::

```java
package com.yootk.demo;
import java.lang.reflect.Field;
class Book {										// 为了演示，所以使用非标准简单Java类
    private String title ;								// 私有属性，并没有定义setter、getter方法
}
public class TestDemo {
    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("com.yootk.demo.Book");	// 取得反射对象
        Object obj = cls.newInstance(); 					// 必须给出实例化对象
        Field titleField = cls.getDeclaredField("title");			// 取得类中的title属性
        titleField.setAccessible(true);						// 取消封装
        titleField.set(obj, "Java开发实战经典");				// 相当于：Book类对象.title = "数据"
        System.out.println(titleField.get(obj)); 				// 相当于：Book类对象.title
    }
}
```

本程序首先直接取得了本类声明的 `title` 属性，由于 `title` 属性使用了 `private`
封装无法被外部直接访问，则利用了 `setAccessible()` 方法取消封装，然后传入指定的类的实例化对象，就可以直接进行属性内容的设置与取得。

:::tip 封装操作的解除

在范例的程序代码中，如果缺少 `titleField.setAccessible(true);`
代码，则程序执行时将会出现如下异常信息（造成的原因就是`title` 使用了 `private` 封装）。

> Exception in thread "main"java.lang.IllegalAccessException:Class com.yootk.demo.Test Demo can not access a member of
> class com.yootk.demo.Book with modifiers "private"

按照实际的开发规范来讲，类中的所有属性都必须使用 `private`
进行封装，而封装的属性不能使用对象直接进行访问，所以此时才需要使用 `public void setAccessible(boolean flag)throws SecurityException`
方法，如果设置为 `true` 表示此内容可以被直接操作。但是最为重要的是这个方法并不是 `Field` 类定义的，而是在 `Field`
的父类 `AccessibleObject` 类中定义的。`AccessibleObject` 类的继承结构关系，如图所示。

<img src="http://niu.ochiamalu.top/image-20240927111939738.png" alt="image-20240927111939738" style="zoom:80%;margin:0 auto" />

通过上图可以发现，Field、Constructor、Method 三个类都是 `AccessibleObject`
类的子类，所以这三个类都可以使用 `setAccessible()` 方法取消封装。

另外需要为读者说明的是，在 JDK1.8 之前，Constructor、Method 都直接继承 `AccessibleObject` 父类，而从 JDK1.8
开始加入了 `Executeable` 类，并且将 `Constructor` 与 `Method` 类定义为 `Executeable` 子类。

虽然在反射操作中可以直接进行成员的访问，但是严格意义上讲这样的代码是非常不标准的，所以如果没有特殊需要尽量不要采用此类模式，所有属性的访问还是要通过 `setter` 、 `getter`
方法操作。

:::

