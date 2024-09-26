# 内建函数式接口

在方法引用的操作过程中，读者可以发现，不管如何进行操作，对于可能出现的函数式接口的方法也最多只有 4 类：<u>
有参数有返回值、有参数无返回值、无参数有返回值、判断真假</u>。为了简化开发者的定义以及实现操作的统一，从 JDK1.8
开始提供了一个新的开发包：`java.util.function` ，并且在这个包中提供了以下 4 个核心的函数式接口。

**1.功能型接口(Function)**

|—接口定义如下。

> @FunctionalInterface
>
> public interface Function<T,R> {
>
> ​ public R apply(T t);
>
> }

|— 主要作用：此接口需要接收一个参数，并且返回一个处理结果。

**2.消费型接口（Consumer)**

|—接口定义如下。

> @FunctionalInterface
>
> public interface Consumer<T> {
>
> ​ public void accept(T t);
>
> }

|一 主要作用：此接口只是负责接收数据（引用数据时不需要返回），并且不返回处理结果。

**3.供给型接口（Supplier)**

|—接口定义如下。

> @FunctionalInterface
>
> public interface Supplier<T> {
>
> ​ public T get();
>
> }

|一 主要作用：此接口不接收参数，但是可以返回结果。

**4.断言型接口(Predicate)**

|—接口定义如下。

> @FunctionalInterface
>
> public interface Predicate<T> {
>
> ​ public boolean test(T t);
>
> }

:::tip java.util.function 包中存在大量类似功能的其他接口

在以上给出的 4 个函数式接口内部除了指定的抽象方法外，还提供了一些 `default` 或 `static` 方法，这些方法不在讨论范围之内。另外，需要提醒读者的是，以上
4 个接口是 `java.util.function` 包中的核心接口，而在这 4 个接口上也定义了接收更多参数的函数式接口，有兴趣的读者可以自己查阅。

:::

```java
package com.yootk.demo;
import java.util.function.Function;
public class TestDemo {
	public static void main(String[] args) {
		Function<String, Boolean> fun = "##yootk"::startsWith;
		System.out.println(fun.apply("##"));	// 相当于利用对象调用startsWith()
	}
}
```

如果要使用功能型接口，就必须保证有一个输入参数并且有返回值，由于映射的是 `String` 类的 `startsWith()`
方法，所以使用此方法时必须传入参数（String型），同时要返回一个判断结果（boolean 型）。

```java
package com.yootk.demo;
import java.util.function.Consumer;
public class TestDemo {
	public static void main(String[] args) {
		Consumer<String> cons = System.out::print;
		cons.accept("更多课程，请访问：www.yootk.com");
	}
}
```

本程序利用消费性接口接收了 `System.out.println()` 方法的引用，此方法定义中需要接收一个 `String` 型数据，但是不会返回任何结果。

```java
package com.yootk.demo;
import java.util.function.Supplier;
public class TestDemo {
	public static void main(String[] args) {
		Supplier<String> sup = "yootk"::toUpperCase;
		System.out.println(sup.get());
	}
}
```

本程序使用供给型函数式接口，此接口上不需要接收参数，所以直接利用 `String` 类的实例化对象引用了 `toUpperCase()`
方法，当调用`get()` 方法后可以实现大写转换操作。

```java
package com.yootk.demo;
import java.util.function.Predicate;
public class TestDemo {
	public static void main(String[] args) {
		Predicate<String> pre = "yootk"::equalsIgnoreCase;
		System.out.println(pre.test("YOOTK"));
	}
}
```

本程序直接将 `String` 类的 `equalsIgnoreCase()` 普通方法利用断言型接口进行引用，然后进行忽略大小写比较。
