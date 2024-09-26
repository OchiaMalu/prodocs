# throws 关键字

`throws` 关键字主要在方法定义上使用，表示此方法中不进行异常的处理，而是交给被调用处处理。

```java
class MyMath {
	public static int div(int x, int y) throws Exception { // 此方法不处理异常
		return x / y;
	}
}
```

本程序定义了一个除法计算操作，但是在 `div()` 方法上使用了 `throws`
关键字进行声明，这样就表示在本方法中所产生的任何异常本方法都可以不用处理（如果在方法中处理也可以)
，而是直接交给程序的被调用处进行处理。由于 `div()` 方法上存在 `throws` 抛出的` Exception` 异常，则当调用此方法时必须明确地处理可能会出现的异常。

```java
public class TestDemo {
	public static void main(String args[]) {
		try {			// div()方法抛出异常，必须明确进行异常处理
			System.out.println(MyMath.div(10, 2));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```

本程序由于 `MyMath` 类的 `div()` 方法定义上已经明确地抛出了异常，所以调用时必须写上异常处理语句，否则会在编译时出现语法错误。

:::tip 主方法上也可以使用 `throws` 抛出

主方法本身也属于一个 Java 中的方法，所以在主方法上如果使用了 `throws` 抛出，就表示在主方法里面可以不用强制性地进行异常处理，如果出现了异常，将交给
JVM 进行默认处理，则此时会导致程序中断执行。

```java
public class TestDemo {
	public static void main(String args[]) throws Exception {
		// 表示此异常产生后会直接通过主方法抛出，代码中可以不强制使用异常处理
		System.out.println(MyMath.div(10, 0));
	}
}
```

此时采用的是 JVM 中的默认方式对产生的异常进行处理。但是从实际开发来讲，主方法上不建议使用 `throws`
，因为如果程序出现了错误，也希望其可以正常结束调用。

:::

