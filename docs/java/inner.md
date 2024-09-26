# 内部类

内部类是一种类的结构扩充，一个类的内部除了属性与方法外，还可以存在其他类的结构，并且内部类也可以定义在方法或代码块中。本节将为读者讲解内部类的相关概念。、

## 基本概念

所谓内部类指的就是在一个类的内部继续定义其他内部结构类的情况。

```java
class Outer { 						// 外部类
    private String msg = "Hello World !";
    class Inner { 					// 定义一个内部类
        public void print() {
            System.out.println(msg);
        }
    }
    public void fun() {
        new Inner().print();			// 实例化内部类对象，并且调用print()方法
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Outer out = new Outer(); 		// 实例化外部类对象
        out.fun(); 					// 调用外部类方法
    }
}
```

本程序首先在 `Outer` 类中定义了一个 `Inner` 的内部类，并且在 `Inner` 的内部类直接输出了 `Outer` 类的 `msg`
私有属性，然后在 `fun()` 方法中实例化 `Inner` 类的匿名对象以调用 `print()` 方法。

实际上内部类的基本定义形式并不难理解，就是将类的定义拿到类的内部，也就是说类中除了属性和方法外，也可以定义属于自己内部的结构体。这样做的最大缺点在于：<u>
破坏了类的结构性</u>。但是这种牺牲对开发者而言也是有帮助的，它最大的帮助就是<u>可以轻松地访问外部类中的私有属性</u>。

```java
class Outer {								// 外部类
    private String msg = "Hello World !" ;
    public void fun() {
        // this表示当前调用fun()方法的对象，在本程序中主方法由out对象调用，所以this就是out
        new Inner(this).print() ;					// 实例化内部类对象，并且调用print()方法
    }
    // 内部类需要访问msg属性，但是此属性属于Outer类，而在Outer类里面此属性使用private进行封装
    // 所以如果此时要得到这个属性的内容，需要定义一个getter方法
    public String getMsg() {
        return this.msg ;
    }
}
class Inner {								// 定义一个内部类
    private Outer out ;						// 必须依靠对象才可以调用getMsg()方法
    public Inner(Outer out) {					// 在构造方法中接收外部类对象
        this.out = out ;
    }
    public void print() {						// 利用Outer类对象调用方法
        System.out.println(this.out.getMsg()) ;
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Outer out = new Outer() ;				// 实例化外部类对象
        out.fun() ;							// 调用外部类方法
    }
}
```

本程序将内部类拆分为两个类，并且实现了同样的功能，读者可以发现整个代码过程中的引用传递非常复杂，而这些引用传递的目的就是访问 `Outer`
类中的 `msg` 私有属性。所以内部类的最大好处就是可以方便地访问外部类中的私有属性。

:::tip 在开发中优先考虑的不是内部类

实际上内部类之所以存在，是为了方便外部类的操作而准备的，这一点读者可以随着经验的增加而有更深的理解，所以不建议读者过多地考虑内部类。也就是说除非有特殊情况，否则还是建议编写普通的程序类，而不要选择内部类。

:::

需要注意的是，虽然内部类可以方便地访问外部类的私有属性，但是外部类也可以通过内部类对象轻松地访问内部类的私有属性。

```java
class Outer {								// 外部类
    private String msg = "Hello World !" ;
    class Inner {							// 定义一个内部类
        private String info = "世界，你好！" ;		// 内部类的私有属性
        public void print() {
            System.out.println(msg) ;			// 直接访问外部类的私有属性
        }
    }
    public void fun() {
        Inner in = new Inner() ;					// 内部类对象
        System.out.println(in.info) ;				// 直接利用内部类对象访问内部类中定义的私有属性
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Outer out = new Outer() ;				// 实例化外部类对象
        out.fun() ;							// 调用外部类方法
    }
}
```

本程序内部类中定义了一个 `info` 的属性，虽然此属性在内部类中进行了封装，但是由于内部类定义在外部类中，所以外部类可以直接利用内部类的对象使用
**对象属性** 的形式访问私有属性操作。

:::tip 关于 `this` 的使用

对于类中属性的访问，一直强调：<u>如果要访问属性，前面一定要加上 `this`</u> 。以本程序为例，如果要在 `print()`
方法里加上 `this` 来访问 `msg` 属性，则表示要找的是 `Inner` 类中的 `msg` 属性，而 `msg`
属于外部类中的属性，所以应该使用 `外部类.this.属性` 的形式。内部类的 `print()` 方法定义如下。

```java
class Outer {								// 外部类
    private String msg = "Hello World !" ;
    class Inner {							// 定义一个内部类
        public void print() {
            System.out.println(Outer.this.msg) ; 	// 外部类.this = 外部类当前对象
        }
    }
}
```

在编写代码过程中，应尽量保持这样标准的写法。

:::

本小节所有代码都有一个特点：通过外部类的一个 `fun()` 方法访问了内部类的操作。内部类能不能像普通对象那样直接在外部直接产生实例化对象调用呢？

如果要想解决此类问题，必须通过内部类的文件形式来观察。通过观察可以发现内部类 `Inner` 的
class文件的形式是：`Outers$Inner.class` (自动出现一个 `$` ，此为 Java 标示符组成)。所有的 `$`
是在文件中的命名，如果反映到程序中就变为 `.` ，也就是说内部类的名称就是 **外部类内部类** 。内部类对象的实例化语法如下。

> 外部类.内部类 对象 = new 外部类().new 内部类();

由于内部类需要使用外部类中的属性，而所有的属性只有在对象实例化之后才会分配空间，所以在实例化内部类对象时首先要实例化外部类对象。但是需要提醒读者的是，内部类对象的实例化语法格式只是一个基础，指的是在一个类内部只定义一个内部类的情况，而如果一个内部类中又定义了内部类，则类结构需要继续向下延伸，变为 `外部类.内部类 1.内部类 2 对象 = new 外部类().new内部类 1().new内部类2();` 。

```java
class Outer {										// 外部类
    private String msg = "Hello World !" ;
    class Inner {									// 定义一个内部类
        public void print() {
            System.out.println(Outer.this.msg) ;
        }
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Outer.Inner in = new Outer().new Inner() ;			// 实例化内部类对象
        in.print() ;
    }
}
```

本程序在主方法中依照给定的格式实例化了内部类对象，并且直接调用内部类的 `print()` 方法进行输出。

如果一个内部类只希望被一个外部类访问，不能被外部调用，那么可以使用 `private` 定义私有内部类。

```java
class Outer {								// 外部类
    private String msg = "Hello World !" ;
    private class Inner {						// 定义私有内部类
        public void print() {
            System.out.println(Outer.this.msg) ;
        }
    }
}
```

由于存在 `private` 声明，所以 `Inner` 类只能在 `Outer` 类的内部使用，这时将无法在外部实例化 `Inner`
类对象，而这个内部类只能为`Outer` 一个类服务。

## 使用static定义内部类

使用 `static` 定义的属性或方法是不受类实例化对象控制的，所以如果使用 `static` 定义内部类，它一定不可能受到外部类的实例化对象控制。

如果一个内部类使用 `static` 定义，那么这个内部类就变为一个 **外部类** ，并且只能访问外部类中定义的 `static` 操作。相当于定义一个外部类。

```java
class Outer { 									// 外部类
    private static String msg = "Hello World !";	// static属性
    static class Inner {							// static定义的内部类等同于外部类
        public void print() {
            System.out.println(Outer.msg);			// 直接访问static属性
        }
    }
}
```

本程序代码利用 `static` 定义了内部类，这个内部类相当于变为外部类，并且只能访问 `Outer` 类中的 `static`
属性或方法。但是此时如果要想取得内部类的实例化对象，其需要使用如下语法。

> 外部类.内部类 对象 = 外部类.内部类()

通过语法可以发现此时不再需要先产生外部类实例化对象，再产生内部类实例化对象的操作，内部类的名称直接变为 `外部类.内部类`
，仿佛变为了一个独立的类。

```java
class Outer { 									// 外部类
    private static String msg = "Hello World !";	// static属性
    static class Inner {							// static定义的内部类等同于外部类
        public void print() {
        System.out.println(Outer.msg);				// 直接访问static属性
        }
    }
}
public class TestDemo {
    public static void main(String args[]) {
        Outer.Inner in = new Outer.Inner() ;			// 实例化“外部类”对象
        in.print() ;								// 调用方法
    }
}
```

本程序首先直接利用 `Outer.Inner` 类可以表示内部类的名称，然后直接进行 `Inner` 类对象实例化并调用 `print()` 输出。

:::warning 实例化内部类的格式比较

实例化内部类的操作有如下两种格式。

- 格式一（非static定义内部类）：`外部类.内部类 内部类对象 = new 外部类().new 内部类()` ；
- 格式二（static定义内部类）：`外部类.内部类 内部类对象 = new 外部类.内部类()`

通过这两种格式可以发现，使用 `static` 定义的内部类，其完整的名称就是 `外部类.内部类`
，在实例化对象时也不再需要先实例化外部类再实例化内部类。在以后的学习中如果发现类名称上出现 `“.”` ，就应该首先想到本处使用了内部类的定义。

:::

## 在方法中定义内部类

内部类理论上可以在类的任意位置上进行定义，包括在代码块中，或在普通方法中。而在开发过程中，在普通方法里面定义内部类的情况是最多的。

```java
class Outer {							// 外部类
    private String msg = "Hello World !" ;
    public void fun() {					// 外部类普通方法
        class Inner {						// 方法中定义的内部类
            public void print() {
               System.out.println(Outer.this.msg) ;
            }
        }
        new Inner().print() ;				// 内部类实例化对象调用print()输出
    }
}
public class TestDemo {
    public static void main(String args[]) {
        new Outer().fun() ;
    }
}
```

本程序将内部类定义在 `Outer` 类的 `fun()` 方法中，在定义完成后直接实例化了内部类对象并调用了 `print()` 方法进行输出。

在方法中定义的内部类从 JDK1.8 开始也可以 **直接访问** 方法中的参数或变量了。

```java
class Outer {							// 外部类
    private String msg = "Hello World !" ;
    public void fun(int num) {				// 外部类普通方法
        double score = 99.9 ;				// 方法变量
        class Inner {						// 方法中定义的内部类
            public void print() {
               System.out.println("属性：" + Outer.this.msg) ;
               System.out.println("方法参数：" + num) ;
               System.out.println("方法变量：" + score) ;
            }
        }
        new Inner().print() ;				// 内部类实例化对象调用print()输出
    }
}
public class TestDemo {
    public static void main(String args[]) {
        new Outer().fun(100) ;
    }
}
```

本程序首先在 `fun()` 方法中定义了一个 `num` 的参数，然后又定义了一个 `score` 的变量，这些变量的内容在 `Inner`
类的 `print()` 方法中可以直接使用。

:::tip 定义在方法中的内类直接访问参数或变量是从JDK1.8开始的

上述代码的 `fun()` 方法中没有加入任何修饰描述，并且方法中的内部类可以访问方法的参数以及定义的变量，但是这种操作只适合于JDK1.8
之后的版本。在 JDK 1.7 及之前的版本有一个严格要求：<u>
方法中定义的内部类如果要想访问方法的参数或方法定义的变量，在参数或变量前一定要加上`final` 标记</u>。

```java
class Outer {							// 外部类
    private String msg = "Hello World !" ;
    public void fun(final int num) {			// 外部类普通方法
        final double score = 99.9 ;			// 方法变量
        class Inner {						// 方法中定义的内部类
            public void print() {
                System.out.println("属性：" + Outer.this.msg) ;
                System.out.println("方法参数：" + num) ;
                    System.out.println("方法变量：" + score) ;
            }
        }
        new Inner().print() ;				// 内部类实例化对象调用print()输出
    }
}
```

通过本程序可以发现在 `fun()` 方法的参数和变量上（这两个变量都需要被内部类访问）都使用了 `final` 进行声明，这是 JDK1.8
版本以前的做法，而之所以从 JDK1.8 开始取消了这一限制，主要是 `Lambda` 编写方便，关于 `Lambda` 表达式将在后续为读者讲解。同时考虑到
Java 的实际应用版本问题，希望每一位读者按照标准方式编写，即方法中定义的内部类要访问方法中参数或变量时，要在前面加上 `final`
关键字。

:::
