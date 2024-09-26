# 包的导入

使用包可以将一个完整的程序拆分为不同的文件进行分别保存，这样就会造成一个问题，不同包之间有可能要进行互相访问，此时就需要使用包的导入（ `import`
语句）操作。

:::tip 语句的定义顺序

如果一个程序定义在包中，并且需要引入其他程序类，那么 `import` 语句必须写在 `package` 语句之后，同时 `import` 应该编写在类的定义之前。

:::

```java
package com.yootk.util;
public class Message {
	public void print() {
		System.out.println("Hello World !");
	}
}
```

本程序定义了一个 `Message` 类，并且在类中定义了一个 `print()` 打印信息的方法。

```java
package com.yootk.test;
import com.yootk.util.Message;			// 导入所需要的类
public class TestMessage {
	public static void main(String args[]) {
		Message msg = new Message();		// 实例化对象
		msg.print();						// 调用方法
	}
}
```

本程序由于要使用到 `Message` 类，所以首先使用了 `import` 语句根据类的名称（包.类）进行导入，导入后直接实例化 `Message`
类对象，然后调用 `print()` 方法。

Java 编译器考虑到作为大型程序开发时有可能会存在多个 `*java`
文件中的类互相引用的情况，为了解决编译顺序的问题，提供了通配符 `“*”` 操作：`javac -d . *java` ，这样就会自动根据代码的调用顺序进行程序编译。

:::tip 如果不使用 `“*”` ，就需要按照顺序编译

如果现在使用纯粹的手工方式进行开发，最好用的编译方式一定是 `*.java` 。如果说不想这样自动顺序进行编译，以范例为例可以按照以下顺序完成。

- 第一步：首先编译 `Message.java` 文件，执行： `javac -d . Message.java` ；
- 第二步：编译 `TestMessage.java` 文件，执行：`javac -d . TestMessage.java` 。

当然，在实际的开发中往往都会利用开发工具编写代码，例如：Eclipse、IDEA等工具。而在开发工具中都会存在自动编译的功能，所以在实际的开发中，很少会考虑到编译顺序或者是导包（有自动提示）等操作。

:::

:::warning 关于 `public class` 与 `class` 声明类的区别

实际上这个问题早在第一章中就已经为读者初步解释过，下面通过一个代码来观察。在本程序中将范例中的 `Message` 类的定义修改。

```java
package com.yootk.util;
class Message {			// 此处没有使用public class定义	
	public void print() {
		System.out.println("Hello World !");
	}
}
```

本程序定义 `Message` 类时使用的是 `class` 声明，而再次编译 `Message.java` 与 `TestMessage.java`
程序类时，会在编译`TestMessage.java` 文件时出现如下错误提示。

> TestMessage.java:2: 错误 Message 在 com.yootk.util 中不是公共的；无法从外部程序包中对其进行访问
>
> import com.tootk.util.Message; //导入要使用的类

该错误信息非常明确的表示，由于 `Message` 类没有使用 `public class` 声明，所以 `Message`
类只能在一个包中访问，而外包无法进行访问。所以，现在就可以完整地总结出关于 `public class` 与 `class` 声明类的如下区别。

- public class：文件名称必须与类名称保持一致，在一个 `*java` 文件里面只能有一个 `public class`
  声明，如果一个类需要被不同的包访问，那么一定要定义为 `public class` ；
- class：文件名称可以与类名称不一致，并且一个 `*java` 文件里面可以有多个 `class` 定义，编译后会形成多个 `*.class`
  文件，如果一个类使用的是 `class` 定义，那么表示这个类只能被本包所访问。

另外，请读者一定要记住，在以后实际的项目开发中，绝大多数情况下都只会在一个 `*.java`
文件里面定义一个类，并且类的声明绝大多数使用的都是 `public class` 完成的。

:::

范例的程序由于要在 `TestMessage` 程序类中使用其他包中的类，所以在进行包导入操作时要编写 `import包.类`
的语句，但是如果要在一个类中导入同一个包中许多类时，则这样每次都重复编写 `import包.类` 语句会很麻烦，所以可以使用 `包.*`
的方式来代替一个包中多个类的导入操作。

```java
package com.yootk.test;
import com.yootk.util.*; 				// 自动导入指定包中所需要的类
public class TestMessage {
	public static void main(String args[]) {
		Message msg = new Message();	// 实例化对象
		msg.print();					// 调用方法
	}
}
```

本程序假设需要导入 `com.yootk.util` 包中的多个类，所以使用 `import com.yootk.uti1.*` 语句简化导入操作。

:::tip 以上做法是否会存在性能问题？

如果写上 `import com.yootk.util.*` 这样的语句会不会将包中的所有类（假设本包中定义有 100
个类）都导入进来，那么是不是直接写上 `import com.yootk.util.Message` 准确地导入某一个类性能会更好？

**回答：使用 `包.*` 与 `包.类` 性能是一样的。**

实际上即便代码中使用了 `import包.*` 的操作，也不会将本包中的所有类都导入进来，类加载时也只是加载所需要的类，不使用的类不会被加载，所以两种写法的性能是一样的。

:::

既然出现了导包操作，那么就必须有一个重要的问题需要注意，有可能同一个代码里面会同时导入不同的包，并且不同的包里面有可能会存在同名类。例如，现在有两个类：

- com.yootk.util.Message，此类继续使用之前的代码。
- org.lxh.Message，其定义如下。

```java
package org.lxh;
public class Message {
	public void get() {
		System.out.println("世界，你好！");
	}
}
```

本程序由于某种需要，要同时导入以上两个包，而为了方便，一定会在代码中编写两个导入操作。

```java
package com.yootk.test;
import org.lxh.*;							// 包中存在Message类
import com.yootk.util.*; 					// 包中存在Message类
public class TestMessage {
	public static void main(String args[]) {
		Message msg = new Message();	// 实例化对象，出现错误
		msg.print();						// 调用方法
	}
}
```

此时，编译结果明确地告诉用户，现在两个包中都有同样的类名称，所以不确定该使用哪一个类那么在这种情况下为了可以明确地找到所需要的类，就可以在使用类时加上包名称。

```java
package com.yootk.test;
import org.lxh.*;
import com.yootk.util.*;
public class TestMessage {
	com.yootk.util.Message msg = new com.yootk.util.Message();
	msg.print();
}
```

此时已经不再需要关心包的导入操作了，而是在实例化 `Message` 类对象时，明确地给出了类的完整名称。所以在以后发生类名称冲突时，一定要写上类的完整名称。
