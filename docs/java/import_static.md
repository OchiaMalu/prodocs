# 静态导入

如果某一个类中定义的方法全部都属于 `static` 型的方法，那么其他类要引用此类时必须先使用 `import`
导入所需要的包，再使用 `类名称.方法()` 进行调用。

```java
package com.yootk.util;
public class MyMath {
	public static int add(int x,int y) {
		return x + y ;
	}
	public static int div(int x,int y) {
		return x / y ;
	}
}
```

本程序 `MyMath` 类中的两个方法全部使用了 `static` 进行定义，而后在不同包中的类实现调用。

```java
package com.yootk.demo;
import com.yootk.util.MyMath;
public class TestDemo {
	public static void main(String[] args) {
		System.out.println("加法操作：" + MyMath.add(10, 20));
		System.out.println("除法操作：" + MyMath.div(10, 2));
	}
}
```

本程序 `MyMath` 类中的方法全部都是 `static` 方法，所以调用时使用 `类名称.static方法()`
的形式就可以直接进行调用。但是在最早的时候曾经在主类中进行过 `static`
方法的定义，而定义后方法可以在主方法中直接进行调用。如果在调用这些方法时不希望出现类名称，即直接在主方法中就可以调用不同包中的 `static`
方法，那么就可以使用静态导入操作完成，语法格式如下。

> import static 包.类.*;

```java
package com.yootk.demo;
// 将MyMath类中的全部static方法导入，这些方法就好比在主类中定义的static方法一样
import static com.yootk.util.MyMath.*;
public class TestDemo {
	public static void main(String[] args) {
		// 直接使用方法名称访问
		System.out.println("加法操作：" + add(10, 20));
		System.out.println("除法操作：" + div(10, 2));
	}
}
```

本程序在导入语句时使用了 `import static com.yootk.util.MyMath.*` ，就表示将 `MyMath` 类中的全部 `static`
方法导入到本程序中，这样主方法就可以 **不使用类名称** 进行调用了。
