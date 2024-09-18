## 数据类型划分

任何程序严格来讲都属于一个数据的处理游戏，所以对于数据的保存就必须有严格的限制，这些限制就体现在了数据类型的划分上，即：<u>
不同的数据类型可数据类型划分以保存不同的数据内容</u>。Java 的数据类型可分为**基本数据类型**与**引用数据类型**。

其中基本数据类型包括最基本的 **byte、short、int、long、float、double、char、boolean** 等类型。

引用数据类型（类似于C/C++的指针）在操作的时候必须要进行内存的开辟，数据类型的划分如图所示。

<u>基本数据类型不牵扯内存分配问题，而引用数据类型需要由开发者为其分配空间，而后进行关系的匹配。</u>

<img src="http://niu.ochiamalu.top/image-20240917162155156.png" alt="image-20240917162155156" style="zoom:80%;margin:0 auto" />

Java 的基本数据类型主要以数值的方式进行定义，这些基本数据类型的保存数据范围与默认值如表

<img src="http://niu.ochiamalu.top/image-20240917162249520.png" alt="image-20240917162249520" style="zoom:80%;margin:0 auto" />

:::tip 记下各个基本数据类型

表给出的各个基本数据类型，都有其数据的默认值，为了日后的开发方便，读者一定要将这些数据类型的默认值记住，同时还需要记住byte表示的范围是-128~
127,double保存的数据长度最大。

:::

### 数据类型的选择

实际上在编程初期许多人会犹豫选择哪种基本数据类型，也会思考是否要记住这些数据类型所表示的数据范围，而最终的结果会发现可能根本就记不下来。考虑到这样的原因，与大家分享一下基本数据类型选择经验。

- 如果要想表示整数就使用 `int` (例如，表示一个人的年龄)，表示小数就使用 `double`（例如，表示一个人的成绩或者是工资)：
- 如果要描述日期时间数字或者表示文件或内存大小（程序中是以字节为单元统计大小的)就用 `long` ;
- 如果要实现内容传递(IO操作、网络编程)或者是编码转换（JSP开发中使
  用UTF-8编码)就用 `byte` ;
- 如果要想实现逻辑的控制，就用 `boolean` 描述(boolean 只有 true 和 false 两种值)；
- 如果要想处理中文，使用 `char` 可以避免乱码问题。

而且由于现在的计算机硬件价格（CPU、内存、磁盘)逐步走低，这样对于数据类型的选择也不像最早编程那样需要严格的限制其大小，所以像short、float
等数据类型已经很少出现了。

## 整型

任何一个 **数字常量** （如30、100），在Java中都属于 `int` 数据类型。即：在 Java 中所有设置的整数内容默认情况下都是 `int` 型数据。

```java
public class Main{
    public static void main(String[] args) {
        // 为变量设置内容使用如下格式：数据类型变量名称=常量
        int num=10;
        int result=num*2;
        System.out.println(result);
    }
}
```

本程序首先定义了一个 `num` 的变量，并在定义变量时为其赋值为 10，随后利用 `num` 变量的内容乘以一个整型常量
2，并且将其计算结果（20) 赋值给 `result` 变量，最后进行了 `result` 变量的输出，所以最终的输出结果就是 “20”
。本程序实际上只实现了一个简单的乘法运算，如果用户有需要也可以使用 “+”（加法)、“-”（减法）、“*”（乘法）、“/”（除法）实现基本的四则运算操作。

:::tip 变量和常量

实际上变量与常量最大的区别只有一个：<u>常量的内容是固定的，而变量的内容是可以改变的。</u>

变量是利用声明的方式，将内存中某个内存块保留下来以供程序使用。可以声明的数据类型为 `整型` 、`字符型` 、 `浮点型` 或是其他数据类型，

作为变量的保存使用。变量在程序语言中扮演最基本的角色。变量可以用来存放数据，而使用变量之前必须先声明它的数据类型。
常量顾名思义就是一个固定的数值，是不可改变的，例如：数字 1、2 就是一个整型的常量。

```java
public class Main{
    public static void main(String[] args) {
        // 所有的变量名称在同一块代码中只允许声明一次
        int num=10; //10是常量，常量的默认类型是int
        int result=num*2;
        System.out.println(result);
    }
}
```

本程序首先定义了一个 `num` 的变量，并且为其赋值为 10，然后利用 `num` 变量的内容乘以数字 2，最后将计算结果又赋值给变量`num`
（此时 `num` 的内容已经发生了改变，因为其内容可变所以称其为变量)，最终 `num` 变量的内容就是 20。

:::

:::warning

以上程序实际上是一个相对比较容易理解的代码，但是在实际的开发中，除了保证代码的正确性外，良好的编程习惯也同样重要。细心的读者可以发现在编写代码 `int num=10;`
时，每一个操作中都加上一个“ ”（空格)，如图所示，这样做的目的是避免由于编译器 bug 所造成的非正常性语法的编译错误。

<img src="http://niu.ochiamalu.top/image-20240918165937060.png" alt="image-20240918165937060" style="zoom:80%;margin:0 auto" />

:::

在上述内容中已经为读者列出了每种数据类型的保存范围，如果计算已经超过了其保存的最大范围会如何呢？下面通过一个具体的程序来观察此类问题。

```java
public class Main {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;
        int min = Integer.MIN_VALUE;
        System.out.println(max);
        System.out.println(min);

        // int 变量 +(-) int 型常量 = int 型数据
        System.out.println(max + 1);
        System.out.println(min - 1);
        System.out.println(min - 2);
    }
    /*
         程序执行结果
         2147483647
        -2147483648
        -2147483648
         2147483647
         2147483646
     */

}
```

本程序首先利用 `Integer.MAX_VALUE` 和 `Integer.MIN_VALUE` 取得 `int` 数据类型的**最大值**与**最小值**
，然后分别进行超过数据保存范围的数学计算。由于 max 或 min 变量都属于 int 型变量，而当 int 型变量与 int 型常量进行计算后其结果依然是
int 型。但是此时由于计算<u>超过了其保存的范围</u>，就会出现一个循环的操作，最大值如果继续增加就变为最小值，随后一直向其次的最小值进行循环，反之最小值减
1 就变为最大值，此种现象称为数据的溢出。

<img src="http://niu.ochiamalu.top/image-20240918170556400.png" alt="image-20240918170556400" style="zoom:80%;margin:0 auto" />

:::tip 关于数据溢出问题的解释

如果学习过汇编语言的读者应该知道，在计算机中二进制是基本的组成单元，而 int 型数据一共占 32 位长度，也就是说第一位是符号位，其余的
31 位都是数据位。当数据已经是该数据类型保存的最大值时，如果继续进行 “+1” 的操作就会造成符号位的变更，最终就会形成这种数据溢出的问题。

:::

如果要想解决溢出问题，就只能通过扩大数据范围的方式来实现。比 `int` 范围更大的是 `long` 数据类型，而要将 `int`
型的变量或常量变为 `long` 数据类型有如下两种形式。

- `int` 型常量转换为 `long` 型常量，使用 “数字L” 或 “数字l"（小写的字母L）完成；
- `int` 型变量转换为 `long` 型变量，使用 “(long)变量名称” 。实际上可以用此类方式实现各种数据类型的转换，例如：如果将 `int`
  型变量变为 `double` 型变量，可以使用 “(double)变量名称” ，即通用转换格式“**（目标数据类型）变量**”。

```java
public class Main {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;
        int min = Integer.MIN_VALUE;

        // int +(-) long = long
        System.out.println(max + 1L);
        System.out.println(min - (long) 1);

        // long +(-) int = long
        System.out.println((long) min - 2);
    }
    //运行结果
    //2147483648
    //-2147483649
    //-2147483650
}
```

本程序首先取得了 `int` 数据类型的最大值与最小值，但是在进行计算时将两个 `int` 型的常量(“1L" “（long） 1”)与一个 `int`
型变量(“(long)min”)转换为了 `long` 类型，由于 `long` 类型保存的数据范围较大，所以在计算时 `int`
数据类型将统一自动转型为 `long` 数据类型后再进行计算，此时就可以得出正确的计算结果。

以上代码利用数据的转型解决了数据的操作错误。但是对于程序而言，除了可以将范围小的数据类型变为范围大的数据类型之外，也可以将范围大的数据类型变为范围小的数据类型，必须使用
**“（数据类型）”** 的格式完成。通过下面的代码来为读者验证这一概念。

```java
public class Main {
    public static void main(String[] args) {
        long num = 1000;
        int x = (int) num;
        System.out.println(x);
    }

    //运行结果
    //1000
}
```

本程序首先将一个 `int` 型常量 1000 赋值给 `long` 数据类型，由于 `long` 数据类型保存的数据范围要大于 `int`
数据类型，所以此处为自动转型，而后为了验证数据类型的向下转型，又将 `long` 数据类型强制变为 `int` 数据类型 `((int)num)` 。

:::warning 要注意数据溢出问题

虽然程序支持强制类型转换，但是在<u>将范围大的数据类型强制转换为范围小的数据类型</u>时，依然要考虑该数据是否会发生溢出。

```java
public class Main {
    public static void main(String[] args) {
        long num = 2147483650L; //该数据已经超过了 int 数据范围
        int x = (int) num;
        System.out.println(x);
    }

    //运行结果
    //-2147483646
}
```

本程序首先定义了一个 `long` 数据类型的变量，并在变量声明时对其进行赋值 `long num 1= 2147483650L`
，由于此时设置的数据 `2147483650` 已经超过了 `int` 范围，所以加上了 `L` 表示将此数值变为了 `long` 型。然后将 `long`
类型变量强制转换为 `int` 类型变量，但由于已经超过了 `int` 的数据保存范围，所以最终发生了数据的溢出。

:::

在开发中数据类型的转换是经常使用到的概念，而数据类型的转换一般有以下规律。

- 数据范围小的数据与数据范围大的数据进行数学计算时，自动向大范围的数据类型转换后计算（例如：int类型和long类型计算，由于int类型保存范围小则自动变为
  long类型)；
- 数据范围大的数据要变为数据范围小的数据，必须采用强制转换，例如：1og数据类型转换为int数据类型，由于int数据类型保存的范围要小于long数据类型，所以必须强制转换；
- 如果要强制性地将某一数据类型变为其他类型，则必须采用强制类型转换，例如：“(double)long型变量”，表示将long类型变量转换为double类型变量。

虽然在 Java 中提供了这样的转换原则，但从实际的开发来讲，笔者建议读者尽量少去使用强制类型转换，以免造成数据精度的丢失以及数据功能性的破坏。这一点读者可以随着自己开发经验的提升而有更多的领悟。

在整型数据类型中，除了 `int` 与 `long` 这两个常用数据类型外，最为常用的就是 `byte`
数据类型了。但是读者必须首先要记住一个概念，即 `byte` 数据类型的取值范围：**-128~127**。

```java
public class Main {
    public static void main(String[] args) {
        int num = 130;
        byte x = (byte) num;
        System.out.println(x);
    }

    //运行结果
    //-126
}
```

本程序首先定义了一个 `int` 型的变量，随后将此变量强制转型为 `byte` 型，由于此时 `num` 变量保存的数据值超过了 `byte`
的保存范围，那么最终会造成 **数据溢出** 问题。

另外，考虑到 `byte` 数据类型较为常用，如果每次使用时都采用强制转换的方式比较麻烦，所以 Java 对其有一些很好的改善。

```java
public class Main {
    public static void main(String[] args) {
        int num = 100;
        System.out.println(num);
    }

    //运行结果
    //100
}
```

虽然任何一个整数都属于 `int` 型，但是 Java 编译时，如果发现使用的数据变量类型为 `byte` ,并且设置的内容在 `byte`
数据范围之内，就会自动帮助用户实现数据类型的转换。反之，如果超过了 `byte` 数据范围，则依然会以 `int` 型进行操作，此时就需要进行强制类型转换了。

:::warning 声明变量时要指派具体内容

虽然在 Java
中每个变量都有其默认值，但是这些默认值并不是在任何时候都可以使用（例如：方法中必须设置变量内容，而类中可以使用各个数据类型的默认值，这一点读者需要慢慢摸索)
，所以声明变量时最好的选择就是 **为其指派默认值** 。这是在 JDK1.5 之前的开发要求，在 JDK1.5 之后，Java 考虑到程序的开发方便，允许在声明变量时
**不设置内容** ，但是要求在使用前必须设置内容。

```java
public class Main {
    public static void main(String[] args) {
        int num;
        num = 0
        System.out.println(num);
    }

    //运行结果
    //0
}
```

以上操作形式属于首先定义了一个变量 `num` ,但是此变量 **没有设置内容** ，然后设置了 `num` 变量的内容，最后再使用此变量。但是以上代码如果在
JDK1.4 及以前的版本是不可能编译通过的。因此最标准的做法是在定义变量的时候直接设置好默认值（ `int num=0;` )

:::

## 浮点数

浮点数就是 **小数** ，Java 中只要是小数，对应的默认数据类型就是 `double` 型数据(double 是保存范围最广的数据类型)。

```java
public class Main {
    public static void main(String[] args) {
        double num=10.2; // 10.2 是一个小数所以属于 double 型
        System.out.println(num*2);
    }

    //运行结果
    //20.4
}
```

本程序首先声明了一个 `num` 的 `double` 型变量，然后利用此 `double` 型变量乘以一个 2 的 `int` 型常量，由于 `int`
数据类型保存的数据范围要 **小于** `double` 数据类型，所以 `int` 类型会自动转型为 `double` 类型，最后再参与计算。

由于默认的小数类型是 `double` ，所以如果使用 `float` 表示需要将 `double` 型变为 `float` 型，这时需要采用强制转换。转换的方式有两种：使用字母
“F” 或 “f” ；在变量或常量前使用 “(float)” 声明。

```java
public class Main {
    public static void main(String[] args) {
        float f1 = 10.2F;
        float f2 = (float) 10.2;
        System.out.println(f1 * f2);
    }

    //运行结果
    //104.03999
}
```

本程序声明了两个 `float` 型变量，在声明变量时为其进行赋值，由于所有的小数默认类型都是 `double`
，需要进行强制类型转换，随后利用两个 `float` 型变量进行乘法计算。

:::tip 关于 Java 计算的 BUG（缺陷）

细心的读者可以发现，本程序的最终计算结果并不是期待的 `104.04` ，而是 `104.03999` ，这一问题本身属于 Java 的
Bug（从JDK1.0开始的)，只依靠计算本身无法解决，但是可以通过学习 `Math` 或 `BigDecimal` 两个工具类来选择，读者可以学习后面的知识后再来解决此类问题。

:::

:::warning 使用小数操作都使用 double 型

实际上最早开发的时候，考虑到内存问题，往往能使用 `float` 就不使用 `double` ,例如： J2ME
开发时，由于内存苛刻，所以往往会压缩数据范围，以节约空间。现在随着硬件成本的降低，是否使用 `double` 和 `float`
区别意义就不大了，可以直接使用 `double` 数据。

:::

<u>需要注意的时候，所有的数据类型只有 `double` 或 `float` 才可以保存小数。</u>

```java
public class Main {
    public static void main(String[] args) {
        int x = 9;
        int y = 5;
        System.out.println(x / y);
    }

    //运行结果
    //1
}
```

本程序分别声明了两个 `int` 型变量（整型不能保存小数)，而在进行除法计算时，根据两个 `int` 类型的变量计算后还是 `int`
类型这一定律，所以最终的计算结果是 1，而不是正确的 `1.8` 。要想得出正确的计算结果，则可以 **将其中一个整型变为浮点类型** 。

```java
public class Main {
    public static void main(String[] args) {
        int x = 9;
        int y = 5;
        System.out.println(x / (double) y);
    }

    //运行结果
    //1.8
}
```

本程序在进行除法计算时，将变量 `y` 由 `int` 类型变为 `double` 类型，所以最终计算时变量 `x` 的类型也将自动转换为 `double`
类型，计算的结果就会包含小数数据。

## 字符型

`byte` 属于字节，按照传统的概念来讲，一个字符= 2 个字节，对于字符除了与字节有一些关系外，最主要的关系在于与 `int`
型变量的转换。在计算机的世界里一切都是以编码的形式出现的，Java 使用的是十六进制的 `UNICODE`
编码，此类编码可以保存任意的文字，但是这个编码在设计的过程中，考虑到与其他语言的结合问题(C/C++)，此编码里包含了 `ASCⅡ`
码的部分编码，所以如果读者之前有过类似开发，此处就可以完全无缝衔接。

:::tip 关于 int 和 char 转换

学习过C语言的读者，应该清楚在C语言中转换的编码是 `ASCⅡ` 码，当时的编码范围如下。

- 大写字母范围：65~90；
- 小写字母范围：97~122

大写字母和小写字母之间差了 32，而 Java 的编码很好地继承了这一特性，即也可以按照此范围的编码表示常见的英文字母。

:::

在程序中使用单引号 “” 声明的内容称为字符。<u>每一个单引号里面只能够保存一位字符</u>。

```java
public class Main {
    public static void main(String[] args) {
        char c='A';
        int num=c;
        System.out.println(c);
        System.out.println(num);
    }

    //运行结果
    //A
    //65
}
```

本程序首先定义了一个 `char` 型的变量 `c` ,而后将此字符型变量转换为 `int` 型变量，经过计算发现字母 `A` 的编码数值为 `65` 。

实际上字母 `A` 的编码值（65)要小于字母 `a` 的编码值(97)，两者的编码值相差 32，所以可以利用简单的数学计算来实现 **大小写转换
** 。

```java
public class Main {
    public static void main(String[] args) {
        char c='A';
        int num=c;
        num=num+32;
        c=(char)num;
        System.out.println(c);
    }

    //运行结果
    //a
}
```

本程序首先定义了一个字符变量 `C` ,内容为字母 `A` ,然后为了可以实现大写变为小写的功能，将 `char` 型变量设置给 `int`
型变量，最后针对 `int` 变量 `num` 执行了加 32 的操作('A'与'a'的编码值相差32)，随后将 `int` 型转换为 `char`
型，所以最终的输出结果就是小写的字母 `a`。

在传统的编程语言中，字符里面只能够保存一些英文字母的标记，但是在 Java 中，由于使用了 `UNICODE`
编码，这种十六进制的编码可以保存任意的文字，因此可以设置一个中文字符。

```java
public class Main {
    public static void main(String[] args) {
        char c='王';
        int num=c;
        System.out.println(num);
    }

    //运行结果
    //29579
}
```

本程序直接为字符设置了一个中文数据（只能是一个汉字)，随后将其转换为 `int` 型数据，可以发现每一个中文在 Java
中都存在对应的`UNICODE` 编码。

:::tip 关于中文处理的提升

在最早的编程语言中，由于中文与英文字母所占的字节位数不同，在进行断句信息处理的时候，为了避免产生乱码问题（例如，在进行切割时将一个汉字拆成了两半，编码就会造成错误)
，往往需要进行编码范围的判断，操作过程会比较麻烦，但是在 Java 中由于英文与中文都使用了统一的 `UNICODE`
编码，所以此类问题也不再需要开发者做过多考虑。

:::

布尔型是一种逻辑结果，主要保存true、false两类数据，这类数据主要用于一些程序的逻辑使用。

:::tip 布尔是一位数学家的名字

乔治·布尔(George Boole,1815一1864)，1815年11月2日生于英格兰的林肯，是19世纪最重要的数学家之一。

:::

```java
public class Main {
    public static void main(String[] args) {
        boolean flag=false;
        if (!flag){
            System.out.println("hello world");
        }
    }

    //运行结果
    //hello world
}
```

布尔型数据在大多数情况下都是用于程序逻辑控制的，所以在本程序中使用 `if` 分支结构来操作，在 `if`
分支结构中，如果判断的结果为`true` ，则表示执行相应语句，如果为 `false` ，则表示不执行。

:::tip 关于 0 与非 0 描述布尔型的问题

在许多的语言之中，由于设计的初期没有考虑到布尔型的间题，那么就使用了数字 0 表示 false ，而非数字 0 表示
true（例如：1、2、3都表示true),但是这样的设计对于代码开发比较混乱，Java 里面不允许使用 0 或 1 来填充布尔型的变量内容

:::

## String 型数据

只要是项目开发，100% 会使用 `String` 。但是与其他的几种基本数据类型相比， `String` 属于**引用数据类型**（它属于一个类，在
Java 里面只要是类名称，每一个单词的首字母都是大写的），但是这个类的使用比较特殊。 `String` 表示的是一个 **字符串** ，即：<u>
多个字符的集合</u>，String 要求使用双引号 `""` 声明其内容。

```java
public class Main {
    public static void main(String[] args) {
        String str="Hello World";
        System.out.println(str);
        System.out.println("Hello World");
    }

    //运行结果
    //Hello World
    //Hello World
}
```

本程序定义了一个 `String` 型的变量 `str`
，随后将此变量进行输出，而为了进行对比，也同时输出了一个常量，通过本程序可以清楚，使用 `“”` 声明的内容就表示是一个 `String`
型的常量。

在字符串的操作中，如果要改变内容，则可以使用 `+` 进行字符串的连接操作。

```java
public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        str = str + " World";
        str += "!!!";
        System.out.println(str);
    }

    //运行结果
    //Hello World!!!
}
```

本程序首先定义了一个 `str` 的 `String` 型变量，然后为其赋值为 `Hello` ，最后使用 `+`
进行字符串的连接操作 `str=str+”World"` ，并且演示了如何利用简化操作  `str+=""` 实现字符串的连接。
