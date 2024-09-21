# 运算符

Java 中的语句有很多种形式，表达式就是其中一种形式。表达式由 `操作数` 与 `运算符`
组成，操作数可以是常量，变量可以是方法，而运算符就是数学中的运算符号，如 `+` 、 `-` 、 `*` 、 `/` 等。以下面的表达式 ``
z+100` 为例， `z` 与 `100` 都是操作数，而 `+` 就是运算符。

<img src="http://niu.ochiamalu.top/image-20240921133348087.png" alt="image-20240921133348087" style="zoom:80%;margin:0 auto" />

Java
提供了许多运算符，这些运算符除了可以处理一般的数学运算外，还可以做逻辑运算、地址运算等。根据其使用的类不同，运算符可分为<u>
赋值运算符、算术运算符、关系运算符、逻辑运算符、条件运算符、括号运算符</u>等，这些常见的运算符及其基本的操作范例如表所示。

<img src="http://niu.ochiamalu.top/image-20240921134130513.png" alt="image-20240921134130513" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.top/image-20240921134147188.png" alt="image-20240921134147188" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.top/image-20240921134201748.png" alt="image-20240921134201748" style="zoom:80%;margin:0 auto" />

除了表给出的运算符之外，各个运算符之间也存在着 **不同的运算优先级** ，这些优先级如下表所示。

<img src="http://niu.ochiamalu.top/image-20240921134346686.png" alt="image-20240921134346686" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.top/image-20240921134356666.png" alt="image-20240921134356666" style="zoom:80%;margin:0 auto" />

:::tip 没有必要去记住这些优先级

从实际的工作来讲，这些运算符的优先级没有必要专门去记（应试教育考试除外），而且就算勉强记住了，使用起来也很麻烦，所以建议多使用 `( )`
去改变优先级才是最好的方式。

:::

:::warning 不要写复杂的运算操作

在使用运算符编写语句的时候，读者一定不要写出以下的类似代码

```java
public class Main {
    public static void main(String[] args) {
        int numA = 10;
        int numB = 20;
        int result = numA * 2 - --numB * numA++ + numB - numA-- + numB;
        System.out.println(result);
    }

    //运行结果
    //-143
}
```

虽然以上程序可以出现最终的计算结果，但是面对如此复杂的运算，相信大部分人都没有太大的兴趣去看，所以在编写程序的时候，读者应该本着编写
**简单代码** 的原而像本程序这样的代码尽量不要去编写。

:::

## 关系运算符

关系运算符的主要功能是进行数据的大小关系比较，返回的结果是boolean型数据（只有true、 false两种取值)，常用的关系运算符有：<u>
大于（>)、大于等于（>=）、小于（<）、小于等于（<=）、等于（==）、不等于（!=）。</u>

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("3 > 1 = " + (3 > 1));
        System.out.println("3 < 1 = " + (3 < 1));
        System.out.println("3 >= 1 = " + (3 >= 1));
        System.out.println("3 <= 1 = " + (3 <= 1));
        System.out.println("3 == 1 = " + (3 == 1));
        System.out.println("3 != 1 = " + (3 != 1));
    }

    //运行结果
    //3 > 1 = true
    //3 < 1 = false
    //3 >= 1 = true
    //3 <= 1 = false
    //3 == 1 = false
    //3 != 1 = true
}
```

本程序集中演示了 6 种关系运算符的使用，考虑到了运算符的优先级问题，使用了 `()`
运算符先进行关系运算。而对于关系运算符的使用往往是结合后续的分支、循环等程序逻辑控制语句使用。

## 数学运算符

数学运算符在开发中经常使用到，例如，<u>进行四则运算、球模、自增</u>等操作。

```java
public class TestDemo {
    public static void main(String args[]) {
        int numA = 10;
        int numB = 20;
        System.out.println("加法计算：" + (numA + numB));
        System.out.println("减法计算：" + (numA - numB));
        System.out.println("乘法计算：" + (numA * numB));
        System.out.println("除法计算：" + (numA / (double) numB));
    }
}

```

四则运算符的基本操作就是 `+` 、`-` 、 `*` 、 `/` 在本程序计算除法时，考虑到了计算的精度问题，所以将其中一个 `int`
型变量强制转换为了 `double` 型变量。`模` 也是在开发之中较为常见的计算，所谓的 `模` 实际上就是余数的概念，例如：10 ÷ 3 的结果是商
3 余 1 ，其中余数 1 就是 `模`    ，对于求模，可以使用 `%` 运算符。

```java
public class TestDemo {
    public static void main(String args[]) {
        int numA = 10;
        int numB = 3;
        System.out.println(numA % numB);
    }
}
```

:::tip 可以利用模来判断数字是奇数还是偶数

如果日后有这样一个需求，要求你判断给定的数字是偶数还是奇数？偶数模2结果为 0,奇数模2为1，可以利用这样的结果来进行判断。

```java
public class TestDemo {
    public static void main(String args[]) {
        int numA = 10;
        int numB = 3;
        System.out.println(numA % 2);
        System.out.println(numB % 2);
    }
}
```

依据以上方式再结合迁分支判断语句，就可以轻松实现。例如，现在做出如下改变

```java
public class TestDemo {
    public static void main(String args[]) {
        int num = 10;		// 声明变量保存数字
        if (num % 2 == 0) {	// 判断该数字是奇数还是偶数
           System.out.println(num + "是偶数。");
        } else {
           System.out.println(num + "是奇数。");
        }
    }
```

本程序所使用的 `if`
分支语句在随后部分将为读者讲解，事实上通过本程序笔者想告诉大家，对于程序的开发，最麻烦的地方就在于所有知识点的混合应用，就好比做数学的证明题一样，<u>
多写才是唯一的出路</u>，不要只看概念，多写代码才是学会编程的王道。

:::

虽然 Java 提供了四则运算操作，但是为了简化用户的编写，在运算符里面又提供了一些简化运算符：<u>*=、/=、+=、一=、%=</u>
，这些运算符表示参与运算后直接进行赋值操作，下面来看一个具体的代码。

```java
public class TestDemo {
    public static void main(String args[]) {
        int num = 10;
        num *= 2; 			// 等价：num = num * 2 ;
        System.out.println(num);
    }
}
```

本程序使用了 `num*=2` 语句替代了 `num = num*2` 的语句，相比较后者，代码的长度更加简短。还有一类运算符是 `++` （自增)、 `--`
（自减)，它根据位置不同，执行的顺序也不同。

- ++变量、-- 变量：先在前面表示的是先进行变量内容的自增 1 或自减 1，再使用变量进行数学计算；

- 变量++、变量--：先使用变量内容进行计算，而后再实现自增或自减的操作。

```java
public class TestDemo {
    public static void main(String args[]) {
        int numA = 10;			// 定义整型变量
        int numB = 20;			// 定义整型变量
        // “++”写在变量前面，表示先对numA的变量内容加1
        // 使用处理后的numA变量的内容 + numB变量的内容
        int result = ++numA + numB;
        System.out.println("numA = " + numA);
        System.out.println("result = " + result);
    }
}
```

本程序中最为麻烦的语句就在于 `int result = ++numA + numB;` ，该语句使用了 `++numA`  ，表示在与 `numB`
进行加法计算时，首先先对`numA` 的变量内容进行自增 1 的操作，即执行完 `++numA` 之后，`numA` 的内容首先变为 11，然后利用 11
这个值与 `numB` 变量的 20 进行计算，最终的结果就是 31。

```java
public class TestDemo {
    public static void main(String args[]) {
        int numA = 10; 			// 定义整型变量
        int numB = 20; 			// 定义整型变量
        // “++”写在后面，表示先使用numA的内容进行加法计算
        // 加法计算完成之后在对numA的内容进行自增
        int result = numA++ + numB;
        System.out.println("numA = " + numA);
        System.out.println("result = " + result);
    }
}
```

本程序与上一程序的区别在于 `++` 出现的位置，在计算中由于 `++` 出现在 `numA` 的后面  `numA++ +numB` ，所以表示先使用 `numA`
当前的内容与 `numB` 进行加法计算，再进行自己的自增 1 操作，所以最终的计算结果为 30。

:::tip 不要过于在意 `++` 或 `--` 的位置。

实际上在开发中，笔者并不建议广大读者使用这些混合的操作，因为我们考虑的不是 `考证` 这样的形式主义应用，一切还要落实在代码功能的实现上。在开发中如果真出现了这种自增
1 或自减 1 的操作，那么直接编写 `numA 1` 或 `numA-=1`
可能会更好理解，之所以在本书强调这样的语法，是因为在循环中往往会单独编写 `numA++` 这种形式的代码，在本章随后讲解的循环操作中读者可以清楚地看到此类用法。

:::

## 三目运算

三目是一种赋值运算的形式，执行三目时可以以一个布尔表达式的结果进行赋值，基本的语法结构如下。

> 数据类型变量 = 布尔表达式？满足此表达式时设置的内容 : 不满足此表达式时设置的内容

```java
public class TestDemo {
    public static void main(String args[]) {
        int numA = 10;		// 定义int型变量
        int numB = 20;		// 定义int型变量
        // 如果numA大于numB，返回true，则将numA的内容赋值给max
        // 如果numA小于numB，返回false，则将numB的内容赋值给max
        int max = numA > numB ? numA : numB;
        System.out.println(max);
    }
}
```

本程序的执行结果很容易理解，主要是判断 `numA` 与 `numB` 哪个变量的内容较大 `numA> numB`
，如果此时的判断条件成立，则表示使用`numA` 的变量内容为 `max` 变量赋值，反之，则使用 `numB` 的变量内容为 `max` 变量赋值。

对于上述操作，实际上读者也可以不使用三目运算符完成，可以通过编写如下形式的判断语句完成。

```java
public class TestDemo {
    public static void main(String args[]) {
        int numA = 10;		// 定义int型变量
        int numB = 20;		// 定义int型变量
        int max = 0 ;
        // 用if语句替代：int max = numA > numB ? numA : numB;
        if (numA > numB) {	// 如果numA的内容大于numB
           max = numA ;		// max变量的内容为numA的内容
        } else {				// 如果numA的内容小于numB
           max = numB ;		// max变量的内容为numB的内容
        } 
        System.out.println(max);
    }
}
```

本程序使用一个分支语句的形式替代了三目运算符的使用，但此时读者可以发现，使用三目运算的赋值操作要明显比 `if.else`
分支语句的判断赋值代码更简单。

## 逻辑运算

逻辑运算一共包含 3 种：与（多个条件一起满足)、或（多个条件有一个满足）、非（使用 `!` 操作，可以实现 true 变 false 以及 false 变
true 的结果转换），而与和或操作的真值表，如下表所示。

<img src="http://niu.ochiamalu.top/image-20240921150936133.png" alt="image-20240921150936133" style="zoom:80%;margin:0 auto" />

读者可以发现，在定义逻辑运算时 `与` 和 `或` 操作分别定义了两种不同的符号，而这两种不同的操作解释如下。

```java
public class TestDemo {
    public static void main(String args[]) {
        boolean flag = true;			// 定义布尔型变量
        System.out.println(!flag);		// 对变量结果进行非操作
    }
}
```

非操作的主要功能是进行布尔结果的转换，由于本程序中定义的 `flag` 变量的内容为 `true`
，所以经过非处理之后其结果变为 `false` 。

### 与操作

与操作表示将若干个条件一起进行连接判断，同时满足返回 true ，有一个不满足返回 false ，对于与操作有两种运算符：&（普通与）、&&（短路与）。

```java
public class TestDemo {
    public static void main(String args[]) {
        if ((1 == 2) & (10 / 0 == 0)) {		// 使用普通与判断多个条件
           System.out.println("Hello World !");
        }
    }
}
```

此程序出现了错误，而这个错误是由 `10/0==0` 造成的，即：第一个条件（1=2）不满足之后又继续判断第二个条件，所以可以证明所有的条件都进行了验证，如图所示。

<img src="http://niu.ochiamalu.top/image-20240921151305166.png" alt="image-20240921151305166" style="zoom:80%;margin:0 auto" />

:::tip `ArithmeticException` 需要异常处理

本书只是为读者讲解逻辑运算符的区别，所以使用了一个 `10/0` 的操作，而这种操作一旦执行，在 Java 程序里面一定会产生异常，而异常将在后续讲解。

:::

上述使用的是一个 `&` ，发现当前面的判断结果返回 false 之后其余的判断 `（(10/0==0))` 继续执行，而现在的问题是，如果前面的条件已经返回了
false ，后面不管有多少个 true ，按照与操作的定义，最终的结果还是 false ，那么完全没有必要进行后续的判断，所以可以使用短路与进行操作。

```java
public class TestDemo {
    public static void main(String args[]) {
        if ((1 == 2) && (10 / 0 == 0)) {
           System.out.println("Hello World !");
        }
    }
}
```

此程序没有出错，因为前面的条件返回了 false（ `1==2` 的结果为 false )，所以后面的所有判断都没有继续执行的意义，因为最终的结果只会是
false ，这一操作如图所示。

<img src="http://niu.ochiamalu.top/image-20240921152005678.png" alt="image-20240921152005678" style="zoom:80%;margin:0 auto" />

### 或操作

或操作是若干个条件一起判断，其中只要有一个返回 true ，结果就是 true ，只有都返回 false 的时候结果才是 false
，或操作有两种运算：`|` 和 `||` 。

```java
public class TestDemo {
    public static void main(String args[]) {
        if ((1 == 1) | (10 / 0 == 0)) {
           System.out.println("Hello World !");
        }
    }
}
```

在本程序中使用普通 `|` 完成了操作，但是在程序运行的时候依然出现了异常，即程序中给出的两个判断条件都执行了，如图所示。

<img src="http://niu.ochiamalu.top/image-20240921152222926.png" alt="image-20240921152222926" style="zoom:80%;margin:0 auto" />

通过程序发现，使用普通或操作的过程之中，发现即使前面的条件满足了，后面的也会进行正常的判断，而或运算中，只要有一个为 true
，那么最终的结果就一定是 true ，所以对于后面的判断似乎没有任何意义，因为不管返回是何种结果都不会影响最终的结果—— true
，下面使用短路或 `||` 修改程序。

```java
public class TestDemo {
    public static void main(String args[]) {
        if ((1 == 1) || (10 / 0 == 0)) {
           System.out.println("Hello World !") ;
        }
    }
}
```

通过上述代码可以发现，前面的条件 `1==1` 满足了就会返回 true ，不管后面是何条件最终的结果都是 true
，所以后面的表达式不再执行，如图所示，程序也没有任何异常产生。

<img src="http://niu.ochiamalu.top/image-20240921152459450.png" alt="image-20240921152459450" style="zoom:80%;margin:0 auto" />

在以后编写代码的过程中考虑到性能问题，请优先考虑 **短路与和短路或** 操作。

### 位运算

位运算在Java中有：<u>&、I、·、~、>>、<<、>>></u> ，而所有的位运算都是采用二进制数据进行操作的，基本的二进制数据操作结果如表所示。

:::tip 十进制转二进制

十进制数据变为二进制数据的原则为：数据除 2 取余，随后倒着排列。例如：25 的二进值为 11001 ，但是由于 Java 的 `int` 型数据为 32
位，所以实际上最终的数据为：`0000000000000000000000000011001` ，如图所示。

<img src="http://niu.ochiamalu.top/image-20240921152759130.png" alt="image-20240921152759130" style="zoom:80%;" />

:::

<img src="http://niu.ochiamalu.top/image-20240921152845192.png" alt="image-20240921152845192" style="zoom:80%;margin:0 auto" />

```java
public class TestDemo {
    public static void main(String args[]) {
        int numA = 9;						// 定义整型变量
        int numB = 11;						// 定义整型变量
        System.out.println(numA & numB);			// 位与操作 
    }
}
```

计算分析：

9 的二进制： 00000000000000000000000000001001

11 的二进制： 00000000000000000000000000001011

“&” 结果： 00000000000000000000000000001001 转换为十进制是：9

```java
public class TestDemo {
    public static void main(String args[]) {
        int x = 2;
        System.out.println(x << 2);	// 向左移2位
    }
}
```

计算分析：

9 的二进制：00000000000000000000000000001001

11 的二进制： 00000000000000000000000000001011

“|” 结果： 00000000000000000000000000001011 转换为十进制是：11

:::tip 常见面试题分析：请解释&和&&、和的区别？

(1)逻辑运算

1. 与运算分为普通与( `&` )和短路与( `&&` )两种。

&emsp;&emsp;|一普通与：所有的判断条件都要判断；

&emsp;&emsp;|一短路与：如果前面的判断返回了 false，后面不再判断，最终结果就是 false;

2. 或运算分为普通或( `|` )和短路或（ `||` )两种。

&emsp;&emsp;|-普通或：所有的判断条件都要判断；

&emsp;&emsp;|-短路或：如果前面的判断返回了 true，后面不再判断，最终结果就是 true。

(2)位运算

位运算包括位与运算（&)、位或运算(|)，其中“&&”和“|”不能应用在位运算上。

:::

