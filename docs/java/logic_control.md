# 程序逻辑控制

一般来说程序的结构包含顺序结构、选择结构、循环结构 3 种。这 3 种不同的结构有一个共同点，就是它们都只有**一个入口**
，也只有一个出口。程序中使用了上面这些结构到底有什么好处呢？这些单一入口和出口可以让程序易读、好维护，也可以减少调试的时间。现在以流程图的方式来让读者了解这
3 种结构的不同。

**1. 顺序结构**

本书前面所讲的例子采用的都是顺序结构，程序至上而下逐行执行，一条语句执行完后继续执行下一条语句，一直到程序的末尾。顺序结构在程序设计中是最常使用的结构，在程序中扮演了非常重要的角色，因为大部分程序基本上都是依照这种由上而下的流程来设计的，由于之前一直都是按照顺序结构编写程序，所以本节只针对于选择或循环结构进行讲解。

**2.选择（分支)结构**

选择（分支）结构是根据条件的成立与否，再决定要执行哪些语句的一种结构。

<img src="http://niu.ochiamalu.top/image-20240921163957845.png" alt="image-20240921163957845" style="zoom:80%;margin:0 auto" />

这种结构可以依据判断条件的结构，来决定要执行的语句。当判断条件的值为真时，就运行 `语句1`
；当判断条件的值为假时，则执行 `语句2` 。不论执行哪一个语句，最后都会回到 `语句3` 继续执行。

**3.循环结构**

循环结构是根据判断条件的成立与否，决定程序段落的执行次数，而这个程序段落就称为循环主体。循环结构的流程图如图所示。

<img src="http://niu.ochiamalu.top/image-20240921164126787.png" alt="image-20240921164126787" style="zoom:80%;margin:0 auto" />

## 分支结构

分支结构为程序增加了选择的逻辑结构，就像做人生块择一样，不同的抉择有不同的结果。对于分支结构有两类语法支持：<u>
if、switch</u>。

### if-else

<img src="http://niu.ochiamalu.top/image-20240921164249338.png" alt="image-20240921164249338" style="zoom:80%;margin:0 auto" />

这 3 种语句的执行流程如图所示。

<img src="http://niu.ochiamalu.top/image-20240921164338141.png" alt="image-20240921164338141" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.top/image-20240921164348486.png" alt="image-20240921164348486" style="zoom:80%;margin:0 auto" />

下面分别针对以上 3 种选择结构进行代码的验证。

```java
public class TestDemo {
    public static void main(String args[]) {
        double score = 30.0; 				// 定义变量
        if (score > 60.0) { 					// 条件判断满足
           System.out.println("及格了！");
        } else { 						// 条件判断不满足
           System.out.println("小白的成绩！");
        }
    }
}
```

本程序首先定义了一个 `score` 的 `double` 类型变量，然后使用 `if` 语句判断此变量的内容是否大于 `60.0` ，如果条件满足，则执行输出操作。

:::tip 关于`{}` 的出现与否问题

实际上针对上述程序，由于 `if` 语句中只有 **一行代码** ，所以也可以 **忽略** 。

```java
public class TestDemo {
    public static void main(String args[]) {
        double score = 30.0; 				// 定义变量
        if (score > 60.0) 					// 条件判断满足
           System.out.println("及格了！");
         else  						// 条件判断不满足
           System.out.println("小白的成绩！");
    }
}
```

:::

```java
public class TestDemo {
    public static void main(String args[]) {
        double score = 30.0; 				// 定义变量
        if (score > 60.0) { 					// 条件判断满足
           System.out.println("及格了！");
        } else { 						// 条件判断不满足
           System.out.println("小白的成绩！");
        }
    }
}
```

本程序使用了 `if..else` 结构，如果在 `if` 语句中的判断条件不满足，那么将执行 `else` 中的代码。

```java
public class TestDemo {
    public static void main(String args[]) {
        double score = 91.0; 					// 定义变量
        if (score < 60.0) {						// 条件判断
           System.out.println("小白的成绩！") ;
        } else if (score >= 60 && score <= 90) {		// 条件判断
           System.out.println("中等成绩") ;
        } else if (score > 90 && score <= 100) {		// 条件判断
           System.out.println("优秀成绩") ;
        } else {								// 条件判断都不满足
           System.out.println("你家的考试成绩这么怪异！") ;
        }
    }
}
```

本程序使用了多个判断条件判断给定的 `score` 变量的内容，如果满足条件，则执行相应的信息输出。

### switch

对于多条件判断使用 `if..else if...else` 是可以判断 **布尔条件** 的。如果是多数值判断，可以通过 `switch` 完成，其语法如下，流程如图所示。

<img src="http://niu.ochiamalu.top/image-20240921164833540.png" alt="image-20240921164833540" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.top/image-20240921165430549.png" alt="image-20240921165430549" style="zoom:80%;margin:0 auto" />

:::warning `if` 可以判断布尔表达式，而 `switch` 只能够判断内容

在分支结构中，使用 `if` 语句结构可以判断指定布尔表达式的结果。但是 `switch`
的判断不能使用布尔表达式，它最早的时候只能进行整数或字符的判断，但是从 `JDK1.5` 开始支持了枚举判断，在 `JDK1.7`
的时候支持了 `String` 的判断。

另外还需要提醒读者的是，很多开发工具对于 `switch` 的支持仍然没有考虑到所以最稳妥的做法不是在 `switch` 上使用数字或字符进行判断。

:::

在每一个 `case` 里出现的 `break` 语句，表示停止 `case` 的执行，因为 `switch` 语句默认情况下会从第一个满足的 `case`
语句开始执行全部的语句代码，一直到整个 `switch` 执行完毕或者遇见 `break` 。

```java
public class TestDemo {
    public static void main(String args[]) {
        int ch = 1;
        switch (ch) { 			// 判断的是数字
            case 2: {			// 判断内容是否是2
                System.out.println("内容是2");
                break;
            }
            case 1: {			// 判断内容是否是1
                System.out.println("内容是1");
                break;
            }
            case 3: {			// 判断内容是否是3
                System.out.println("内容是3");
                break;
            }
            default: {			// 判断都不满足
                System.out.println("没有匹配内容");
                break;
            }
        }
    }
}
```

本程序使用了 `switch` 语句判断 `ch` 变量的内容，如果某一个 `ch` 变量符合于 `case(“case1”判断满足)`
中定义的比较内容，则执行相应的 `case` 语句。

:::tip break 语句的作用

从上述程序，读者可以发现，在每一个 `case` 语句后都加上了一个 `break` ”语句，如果不加入此语句的话，则 `switch`
语句会从第一个满足条件的 `case` 语句开始依次执行操作。

```java
public class TestDemo {
    public static void main(String args[]) {
        int ch = 1;
        switch (ch) { 			// 判断的是数字
            case 2: {			// 判断内容是否是2
                System.out.println("内容是2");
            }
            case 1: {			// 判断内容是否是1
                System.out.println("内容是1");
            }
            case 3: {			// 判断内容是否是3
                System.out.println("内容是3");
            }
            default: {			// 判断都不满足
                System.out.println("没有匹配内容");
            }
        }
    }
}
```

从运行结果可以发现，程序在第一个条件满足之后，由于没有设置相应的 `break` 语句，则从第一个满足条件开始就依次向下继续执行了

:::

从 `JDK1.7` 开始 `switch` 支持字符串的直接判断，即可以利用 `switch` 判断是否是某一个字符串内容。但是在字符串的判断中是严格区分字母大小写的。

```java
public class TestDemo {
    public static void main(String args[]) {
        String str = "HELLO";
        switch (str) { 			// 判断的是字符串
            case "HELLO": {
                System.out.println("内容是HELLO");
                break;
            }
            case "hello": {
                System.out.println("内容是hello");
                break;
            }
            case "mldn": {
                System.out.println("内容是mldn");
                break;
            }
            default: {
                System.out.println("没有匹配内容");
                break;
            }
        }
    }
}
```

本程序采用了字符串的方式进行判断，如果判断的内容是 `case` 中定义的内容，则执行对应的代码。

## 循环结构

当某段代码需要一直重复执行时，可以使用循环结构来实现控制，对于循环结构有两种循环： `while` 循环和 `for` 循环。

**1.while 循环**

`while` 循环分为 `while` 循环和 `do...while` 循环两种语法形式，如表所示。

<img src="http://niu.ochiamalu.top/image-20240921165717386.png" alt="image-20240921165717386" style="zoom:80%;margin:0 auto" />

通过 `while` 循环语法可以发现，实际上 `do...while` 表示先执行后判断，而 `while`
循环表示先判断后执行。如果循环条件都不满足的情况下， `do...while` 至少执行一次，而 `while` 一次都不会执行，这两种操作语法的流程如图所示。

<img src="http://niu.ochiamalu.top/image-20240921165803928.png" alt="image-20240921165803928" style="zoom:80%;margin:0 auto" />

:::tip 循环的基本特点

通过以上给出的两个格式，可以发现循环结构具有以下特点。

- 循环的结束判断；
- 每次循环体执行的时候，循环条件要求修改。

:::

所有的循环语句里面都必须有循环的初始化条件，每次循环的时候都要去修改这个条件，以判断循环是否结束。

:::warning 避免死循环

对于许多初学者而言，循环是需要面对的第一道程序学习的关口，相信不少读者也遇见过死循环的问题，而造成死循环的原因也很好容易理解，就是循环条件一直都满足，每次循环执行时没有修改循环的结束条件，所以循环体一直都会被执行。

:::

```java
public class TestDemo {
    public static void main(String args[]) {
        int sum = 0; 				// 保存总和
        int current = 1; 				// 循环的初始化条件
        while (current <= 100) { 		// 循环结束条件
            sum += current; 			// 累加
            current++;				// 改变循环条件
        }
        System.out.println(sum);
    }
}
```

本程序首先定义了一个 `sum` 的变量用于保存累加的结果，然后声明了一个 `current`
变量作为当前计算数值的保存变量（如果计算到1，则 `current` 值为 1 ；如果计算到 2，则 `current` 的值为 2）。同时 `current`
也作为循环结束的判断条件，在每次执行循环体之前都会进行 `current` 变量的判断 `(while(current<=100))` ，如果该变量的内容小于等于
100，则表示判断通过，执行循环体，在循环体中会进行累加的计算 `sum+=current` ，同时也会修改当前的操作数值 `current++`
。本程序的执行流程图如图所示。

<img src="http://niu.ochiamalu.top/image-20240921170047893.png" alt="image-20240921170047893" style="zoom:80%;margin:0 auto" />

```java
public class TestDemo {
    public static void main(String args[]) {
        int sum = 0; 				// 保存总和
        int current = 1; 				// 循环的初始化条件
        do { 						// 循环结束条件
           sum += current; 			// 累加
           current++;				// 改变循环条件
        } while (current <= 100); 		// 循环结束判断
        System.out.println(sum);
    }
}
```

本程序同样实现了累加操作，而与上述程序最大的不同在于，在第一次执行循环体时并不会进行循环条件的判断 `while(current<=1OO`)
,而执行完一次循环体之后才会进行循环条件的判断，以判断是否还要继续执行该循环。本程序的执行流程如图所示。

<img src="http://niu.ochiamalu.top/image-20240921170153697.png" alt="image-20240921170153697" style="zoom:80%;margin:0 auto" />

:::tip 循环的选择

通过以上对比相信读者已经清楚， `while` 循环采用的是先判断后执行循环体的形式处理，而 `do...while`
循环采用的是先执行一次循环体再判断循环条件的形式处理，即不管循环条件是否满足，一定会执行至少一次。

而在实际的开发中，`do...while` 循环的使用要比 `while` 循环使用的频率低，所以推荐更多的是 `while` 循环，而不是 `do...while`
循环

:::

**2.for 循环**

for 循环的最大特点是已经明确地知道 **循环次数** ，for 循环的语法如下。

> for(循环初始化条件;循环判断;循环条件变更){
>
> ​ 循环语句;
>
> }

通过给定的格式可以发现，for 循环在定义时，将循环初始化条件、循环判断、循环条件变更操作都放在一行语句中，而在执行的时候循环初始化条件
**只会执行一次** ，而后循环判断在每次执行循环体前都会判断，并且每当循环体执行完毕后都会自动执行循环条件变更。for循环结构图如图所示。

<img src="http://niu.ochiamalu.top/image-20240921170444913.png" alt="image-20240921170444913" style="zoom:80%;margin:0 auto" />

```java
public class TestDemo {
    public static void main(String args[]) {
        int sum = 0; 			// 保存总和
        // 设置循环初始化条件current，同时此变量作为累加操作使用
        // 每次执行循环体前都要进行循环判断（current <= 100）
        // 循环体执行完毕后会自动执行“current++”改变循环条件
        for (int current = 1; current <= 100; current++) {
            sum += current;		// 循环体中实现累加操作
        }
        System.out.println(sum);
    }
}
```

本程序直接在 for 语句中初始化循环条件、循环判断以及循环条件变更的操作，而在循环体中只是实现核心的累加操作。

:::warning for 循环编写的时候尽量不要按照如下方式编写

对于循环的初始值和循环条件的变更，在正常情况下可以由 for 语句自动进行控制，但是根据不同的需要也可以将其分开定义，如下代码所示。

```java
public class TestDemo {
    public static void main(String args[]) {
        int sum = 0; 				// 保存累加的结果
        int current = 1; 				// 初始值
        for (; current <= 100;) {		// for循环
            sum += current;			// 累加计算
            current ++; 				// 循环条件修改
        }
        System.out.println(sum);
    }
}
```

这两种方式最终所实现的效果完全一样，但是除非有特殊的需要，否则本书不推荐这种写法。

:::

以上给出的循环实际上是最为基础的 **单层循环** ，但是很多时候考虑到业务的需求可能会出现循环的嵌套操作，下述的代码是进行乘法口决表的输出，采用的就是双层循环。

```java
public class TestDemo {
    public static void main(String args[]) {
        for (int x = 1; x <= 9; x++) { 		// 控制循环的行数
            for (int y = 1; y <= x; y++) { 		// 控制列数
               System.out.print(x + "*" + y + "=" + (x * y) + "\t");
            }
               System.out.println();			// 换行
        }
    }
}
```

本程序使用了两层循环控制输出，其中第一层循环是控制输出行，即乘法口诀表中左边的数字 (7*
3=21,x控制的是这个数字7，而y控制的是数字3) ；而另外一层循环是控制输出的列，并且为了防止不出现重复数据（例如：“1\*2” 和 “2*
1”计算结果重复），让 y 每次的循环次数受到 x 的限制，每次里面的循环执行完毕后就输出一个换行。本程序执行流程如图所示。

<img src="http://niu.ochiamalu.top/image-20240921170901495.png" alt="image-20240921170901495" style="zoom:80%;margin:0 auto" />

## 循环控制

正常情况下只要执行了循环，且满足循环条件，循环体的代码就会一直执行，但是在程序中也提供有两个循环停止的控制语句：<u>
continue（退出本次循环)、 break（退出整个循环)</u>。此类语句在使用时往往要结合分支语句进行判断。

```java
public class TestDemo {
    public static void main(String args[]) {
        for (int x = 0; x < 10; x++) {
            if (x == 3) {
               continue; // 之后的代码不执行，直接结束本次循环
            }
            System.out.print("x = " + x + "、");
        }
    }
}
```

本程序使用了 `continue` 语句，而结果中可以发现缺少了 `x=3` 的内容打印，这是因为使用 `continue`
表示当前一次循环结束执行，而直接进行下一次循环的操作，本操作的流程如图所示。

<img src="http://niu.ochiamalu.top/image-20240921171026622.png" alt="image-20240921171026622" style="zoom:80%;margin:0 auto" />

```java
public class TestDemo {
    public static void main(String args[]) {
        for (int x = 0; x < 10; x++) {
            if (x == 3) {
              break; // 退出整个循环
            } 
           System.out.print("x = " + x + "、");
        }
    }
}
```

本程序在 `for` 循环中使用了一个分支语句 `x==3` 判断是否需要结束循环，而通过运行结果可以发现，当 x 的内容为 2
后，循环不再执行，本操作的流程如图所示。

<img src="http://niu.ochiamalu.top/image-20240921171114604.png" alt="image-20240921171114604" style="zoom:80%;margin:0 auto" />
