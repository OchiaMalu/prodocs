# 数组

数组可以将多个变量进行统一的命名，这样相同类型的元素就可以按照一定的顺序进行排列。在 Java 中，数组属于 **引用型数据**
，所以在数组的操作过程中，也一定会牵扯到内存的分配问题，下面就来看一下 Java 中数组的基本使用。

## 数组的基本概念

数组指的就是一组相关变量的 **集合** 。例如，如果要定义 100 个整型变量，按照传统的思路，可能这样定义：

> int i1,i2,i3,i4,...,i100 一共写 100 个变量

以上形式的确可以满足技术要求，但是有一个问题，这 100
多个变量没有任何逻辑的控制关系，完全独立，就会出现对象不方便管理的情况。在这种情况下就可以利用数组来解决此类问题，而数组本身也属于引用数据类型，所以数组的定义语法如下。

- 声明并开辟数组

> 数据类型 数组名称 [] = new 数据类型 [长度];
>
> 数据类型 [] 数组名称 = new 数据类型 [长度];

- 分部完成

> 声明数组：数据类型 数组名称 [] = null;
>
> 开辟数组：**数组名称** = new 数据类型 [长度];

当数组开辟空间后，可以采用 `数组名称下标|索引` 的形式进行访问，但是 **所有数组的下标都是从 0 开始的** ，如果是 3
个长度的数组，下标的范围为：0~2 (0、1、2一共3个内容)。如果访问的时候超过了数组允许下标的长度，会出现 `数组越界异常` (Array
Index Out Of Bounds Exception) 。

以上给出的数组定义结构使用的是动态初始化的方式，即数组会首先开辟内存空间，但是数组中的内容都是其对应数据类型的默认值，如果现在声明的是 `int`
型数组，则数组里面的全部内容都是其 **默认值 0** 。

由于数组是一种顺序的结构，并且数组的长度都是固定的，所以可以使用循环的方式输出，很明显需要使用 for 循环，Java
为了方便数组的输出，提供了一个 `数组名称.length` 的属性，可以取得数组长度。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data[] = new int[3];					// 声明并开辟了一个3个长度的数组
        data[0] = 10;							// 设置数组内容
        data[1] = 20;							// 设置数组内容
        data[2] = 30;							// 设置数组内容
        for (int x = 0; x < data.length; x++) {		// 循环输出数组
            System.out.print(data[x] + "、");
        }
    }
}
```

本程序首先声明并开辟了一个 `int` 型数组 `data`
，然后采用下标的方式为数组中的元素进行赋值，由于数组属于有序的结构，所以可以直接使用 `for` 循环进行输出。

数组最基础的操作就是声明，而后根据索引进行访问。其最麻烦的问题在于，数组本身也属于引用数据类型，所以上述代码依然需要牵扯到 *
*内存分配** ，与对象保存唯一的区别在于：<u>对象中的堆内存保存的是属性，而数组中的堆内存保存的是一组信息</u>。本程序的内存划分如图所示。

<img src="http://niu.ochiamalu.top/image-20240922220736388.png" alt="image-20240922220736388" style="zoom:80%;margin:0 auto" />

:::warning 小心数组越界

本程序中定义的 `data` 数组长度只有 3 个大小，如果在使用的过程中，所设置的索引数值大于 2，例如： `data[10] = 100`
，则程序运行过程中将出现 `ArrayIndexOutOfBoundsException` 错误信息。

:::

上述代码使用声明并开辟数组空间的方式完成，而在数组定义中也采用先声明后开辟数组空间的方式完成。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data [] = null ;						// 声明数组
        data = new int [3] ;					// 开辟数组空间
        data[0] = 10;							// 设置数组内容
        data[1] = 20;							// 设置数组内容
        data[2] = 30;							// 设置数组内容
        for (int x = 0; x < data.length; x++) {		// 循环输出数组
            System.out.print(data[x] + "、");
        }
    }
}
```

本程序首先声明了一个数组变量 `data` ，然后使用关键字 `new` 为数组开辟空间，最后为了通过索引为数组里的元素设置相应的内容。本程序的内存关系如图所示。

<img src="http://niu.ochiamalu.top/image-20240922221017824.png" alt="image-20240922221017824" style="zoom:80%;margin:0 auto" />

:::warning 不能直接使用未开辟空间的数组

数组本身属于 **引用数据类型** ，如果用户现在直接使用未开辟空间的数组，一定会出现 `NullPointerException` (空指向异常）。

:::

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data[] = new int[3];					// 声明并开辟了一个3个长度的数组
        data[0] = 10;							// 设置数组内容
        data[1] = 20;							// 设置数组内容
        data[2] = 30;							// 设置数组内容
        int temp[] = data;						// 数组引用传递
        temp[0] = 99;							// 修改数组内容
        for (int x = 0; x < data.length; x++) {			// 循环输出数组
            System.out.print(data[x] + "、");
        }
    }
}
```

本程序首先定义了一个 `int` 型数组，然后为其元素赋值，接着又定义了一个 `temp` 数组，并且此数组将直接指向 `data`
数组的引用 `int temp[] = data` ，最后利用 `temp` 变量修改了数组中的数据。本程序的内存关系如图所示。

<img src="http://niu.ochiamalu.top/image-20240922221209957.png" alt="image-20240922221209957" style="zoom:80%;margin:0 auto" />

通过以上操作读者可以发现，在数组的使用过程中首先是开辟新的数组，然后为数组中的每一个元素进行赋值，这种形式的操作属于数组 *
*动态初始化** ，它的操作特点是：<u>先开辟数组空间，再为数组中的内容赋值</u>。而在数组定义中还提供了静态初始化的操作，即数组定义的同时就设置好了相应的数据内容，其格式如下。

- 格式一：简化格式

> 数据类型 数组名称 [] = { 值, 值};

- 格式二：完整格式

> 数据类型 数组名称 [] = new 数据类型 [] { 值, 值 };

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data[] = new int[] { 1, 2, 3, 4, 5 };	// 数组的静态初始化
        for (int x = 0; x < data.length; x++) {	// 循环输出数组
            System.out.print(data[x] + "、");
        }
    }
}
```

本程序采用静态初始化的方式实例化一个数组变量，而后采用循环的方式输出数组中的内容。

## 二维数组

在之前的数组操作中读者可以发现，数组所保存的数据实际上就像单行多列的结构那样，只需要通过一个索引就可以进行数据的访问，这样的数组可以将其称为
**一维数组** ，如图所示。

<img src="http://niu.ochiamalu.top/image-20240922221502862.png" alt="image-20240922221502862" style="zoom:80%;margin:0 auto" />

很多时候用户可能需要保存 **多行多列** 的数据，则可以使用 **二维数组**
来进行描述，而二维数组与一维数组最大的区别是在于，一维数组声明时只会有一个 `[]` ，二维数组会有两个 `[]` （即 `[][]`）。

二维数组就是一张数据表（多行多列），其基本结构如图所示。

<img src="http://niu.ochiamalu.top/image-20240922221605669.png" alt="image-20240922221605669" style="zoom:80%;margin:0 auto" />

如果要在二维数组里面确定一个数据，需要行和列一起定位，例如：数字 77 的索引位置：行 1 列 3 （ `[1][3]` ）。而对于二维数组的定义语法有如下两类：

- 动态初始化：`数据类型 数组名称 [][] = new 数据类型 [行的个数][列的个数]` ;
- 静态初始化： `数据类型 数组名称 [][] = new 数据类型 [][] { {1,2,3},{4,5,6} }` ；

通过定义结构可以发现，所谓的二维数组实际上就是将多个一维数组变为一个大的数组，并且为每一个一维数组设置一个行号。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data [][] = new int [][] {
           {1,2,3} ,{4,5,6} , {7,8,9}
        } ;									// 定义二维数组
        for (int x = 0; x < data.length; x++) {			// 外层循环是控制数组的数据行内容
           for (int y = 0; y < data[x].length; y++) {		// 内层循环是控制数组的数据列内容
               System.out.print(data[x][y] + "\t");
           }
           System.out.println();						// 换行
        }
    }
}
```

:::warning 不建议使用多维数组

从二维数组开始实际上就进入了一个多维数组的概念范畴，如果说一维数组表示的是一行数据，那么二维数组描述的就是一张表的数据，依此类推，三维数组就可以描述出一个
**三维图形** 的结构，也就是说数组的维数越多所描述的概念就越复杂。在开发中，只有很少的情况会涉及多维开发，所以只建议读者掌握一维数组的使用即可。

:::

## 数组与方法参数的传递

既然数组内容可以进行 **引用传递** ，那么就可以把数组给方法中的参数，而如果一个方法要想接收参数，则对应的参数类型 **必须**
是数组。下面首先通过一道简单的程序来进行说明。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data[] = new int[] { 1, 2, 3 };			// 开辟数组
        change(data); 						// 引用传递，等价于：int temp [] = data ;
        for (int x = 0; x < data.length; x++) {	
            System.out.print(data[x] + "、");
        }
    }
    /**
     * 此方法的主要功能是进行数组数据的改变操作，在本方法中会将数组中的每个元素内容乘2
     * @param temp 要进行改变内容的数组引用
     */
    public static void change(int temp[]) {			// 此方法定义在主类中，并且由主方法直接调用
        for (int x = 0; x < temp.length; x++) {
            temp[x] *= 2; 						// 将数组的内容乘2保存
        }
    }
}
```

本程序首先利用数组的静态初始化定义了包含 3 个元素大小的数组，然后利用 `change()` 方法接收此数组，实现了 **引用传递**
，相当于方法中定义的 `temp` 参数( `int` 数组类型)与主方法中的数组 `data` 指向了同一块内存空间，最后在 `changet()`
方法中修改了数组的内容（将数组保存的每一个内容乘以 2 后重新保存)。本程序的具体内存关系如图所示。

<img src="http://niu.ochiamalu.top/image-20240922222143246.png" alt="image-20240922222143246" style="zoom:80%;margin:0 auto" />

:::tip 上述程序的简单理解

很多读者在第一次接触到此类代码时会觉得不方便理解，这里笔者要告诉读者的是，不要把它想象为方法，实际上引用传递与是否是方法的接收参数
**没有任何关联** ，对于上述代码，如果将方法的内容定义在主方法中，就会变为如下代码形式。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data[] = new int[] { 1, 2, 3 };			// 开辟数组
        int temp [] = data ;					// 引用传递
        for (int x = 0 ; x < temp.length ; x ++) {		// 修改数组内容
            temp[x] *= 2 ;						// 将数组的内容乘2保存
        }
        for (int x = 0; x < data.length; x++) {		// 循环输出数据
            System.out.print(data[x] + "、");
        }
    }
}
```

此时的代码就是一个最基础的数组引用传递，而进行方法参数接收的时候只是改变了种调用的形式，但是本质并没有发生任何改变。

:::

数组的排序操作在笔试中经常被问到，下面给出（升序）排序的基本原理。

- 原始数据： 2、1、9、0、5、3、7、6、8；
- 第一次排序：1、2、0、5、3、7、6、8、9；
- 第二次排序：1、0、2、3、5、6、7、8、9；
- 第三次排序：0、1、2、3、5、6、7、8、9。

以上只是给出了排序的基础原理过程，根据数据的不同会出现不同的排序次数，但是不管有多少个数据，总的排序次数不会超过数组的长度。所以只要排序的次数达到 `长度*长度`
，那么所有的数据一定可以排序成功。

### 排序基础实现

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data[] = new int[] { 2, 1, 9, 0, 5, 3, 7, 6, 8 };
        System.out.print("排序前的数据：");
        print(data);									// 排序前输出数据
        for (int x = 0; x < data.length; x++) {				// 外层控制排序总体的次数
            for (int y = 0; y < data.length - 1; y++) {			// 内层控制每次的排序控制
               if (data[y] > data[y + 1]) { 					// 判断是否需要交换
                  int t = data[y];
                  data[y] = data[y + 1];
                  data[y + 1] = t;
               }
            }
        }
        System.out.print("排序后的数据：");
        print(data);									// 排序后的输出数据
    }
    /**
     * 此方法的主要功能是进行数组数据输出操作，在输出完成后会追加一个换行
     * @param temp 要进行改变内容的数组引用
     */
    public static void print(int temp[]) {					// 专门定义一个输出的功能的方法
        for (int x = 0; x < temp.length; x++) {
            System.out.print(temp[x] + "、");
        }
        System.out.println();
    }
}
```

本程序为了读者观察方便专门提供了一个 `print()` 方法用于进行数组数据的打印输出，在进行排序时，会依次判断相邻两个数据间的大小关系来决定数据是否要进行交换。

### 改善设计

在代码编写中主方法是作为程序的起点存在的，所有的程序起点都可以称为客户端。既然是客户端，所有的代码编写一定要简单，因此可以采用方法进行封装。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data [] = new int [] {2,1,9,0,5,3,7,6,8} ;
        sort(data) ;									// 实现排序
        print(data) ;
    }
    /**
     * 数组排序操作，将接收到的数组对象内容进行升序排列
     * @param arr 数组对象的引用
     */
    public static void sort(int arr[]) {					// 这个方法专门负责排序
        for (int x = 0 ; x < arr.length ; x ++) {			// 外层控制排序总体的次数
           for (int y = 0 ; y < arr.length - 1 ; y ++) {		// 内层控制每次的排序控制
               if (arr[y] > arr[y + 1]) {				// 判断需要交换
                 int t = arr[y] ;
                 arr[y] = arr[y + 1] ;
                 arr[y + 1] = t ;
               }
           }
        }
    }
    public static void print(int temp[]) {					// 专门定义一个输出的功能的方法
        for (int x = 0 ; x < temp.length ; x ++) {
            System.out.print(temp[x] + "、") ;
        }
        System.out.println() ;
        }
}
```

本程序为了减少主方法中（客户端)的代码数量，编写了一个 `sort()` 方法实现数组的排序，以及一个 `print()`
方法进行数组内容的输出，可以发现当在主方法中只需要在 `sort()` 方法中传递要排序的数组时，就可以利用引用数据类型的特点在方法中实现数组的排序操作。

下面首先来解释一下转置的概念（一维数组实现）

原始数组： 1、2、3、4、5、6、7、8；

转置后的数组：8、7、6、5、4、3、2、1。

如果要想实现转置的操作，有以下两个思路。

- 解决思路一：首先定义一个新的数组，然后将原始数组按照倒序的方式插入到新的数组中，最后改变原始数组引用，将其指向新的数组空间。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data [] = new int [] {1,2,3,4,5,6,7,8} ;
        int temp [] = new int [data.length] ;		// 首先定义一个新的数组，长度与原始数组一致
        int foot = data.length - 1;			// 控制data数组的索引
        for (int x = 0 ; x < temp.length ; x ++) {	// 对于新的数组按照索引由小到大的顺序循环
            temp[x] = data[foot] ;
            foot -- ;
        }	// 此时temp的内容就是转置后的结果
        data = temp ;					// 让data指向temp，而data的原始数据就称为垃圾
        print(data) ;						// 输出数组
    }
    public static void print(int temp[]) {		// 专门定义一个输出功能的方法
        for (int x = 0 ; x < temp.length ; x ++) {
            System.out.print(temp[x] + "、") ;
        }
        System.out.println() ;
    }
}
```

本程序首先为了实现数组的转置操作专门定义了一个 `temp` 的 `int` 型数组，然后采用倒序的方式将 `data`
数组中的内容依次设置到 `temp` 数组中，最后修改 `data` 的引用（会产生垃圾空间）就可以实现数组的转置操作。本操作的内存关系如图所示。

虽然以上代码实现了转置的操作，但是遗撼的是，<u>代码里面会产生垃圾</u>。而在进行程序开发的过程中应该尽可能少地产生垃圾空间，所以这样的实现思路并不是最合理的。

- 解决思路二：利用算法，在一个数组上完成转置操作，但是此时需要为读者 **分析数组长度是奇数还是偶数** 的情况。

|- 数组长度为偶数，转换次数计算公式：**数组长度÷2**

|- 原始数组：1、2、3、4、5、6 -> 转换次数为：6÷2=3

|- 第一次转置：<u>6</u>、2、3、4、5、<u>1</u>

|- 第二次转置：6、5、3、4、<u>2</u>、1

|- 第三次转置：6、5、<u>4</u>、<u>3</u>、2、1

|- 数组长度为奇数，转换次数计算公式：**数组长度÷2（不保留小数）**

|-原始数组：1、2、3、4、5、6、7 -> 转换次数为：7÷2=3 （`int` 型数据除法不保留小数）

<img src="http://niu.ochiamalu.top/image-20240922225825947.png" alt="image-20240922225825947" style="zoom:80%;margin:0 auto" />

|- 第一次转置：7、2、3、4、5、6、1；

|- 第二次转置：7、6、3、4、5、2、1；

|- 第三次转置：7、6、5、4、3、2、1。

通过分析可以发现，不管数组的长度是奇数的个数还是偶数的个数，转置的次数的计算方式是完全一样的，但是此时还需要有两个索引标记：
**头部索引标记** (head)、 **尾部索引标记** (tail)，共同作用才可以实现数据的交换，操作形式如图所示。

<img src="http://niu.ochiamalu.top/image-20240922230951084.png" alt="image-20240922230951084" style="zoom:80%;margin:0 auto" />

按照此思路编写一个专门用于转置的方法，代码实现如下。

```java
public class ArrayDemo {
    public static void main(String[] args) {
        int data[] = new int[]{1, 2, 3, 4, 5, 6, 7};
        reverse(data);          // 实现转置
        print(data);            // 输出数组内容
    }

    /**
     * 实现数组的转置操作，操作过程中会执行“数组长度÷2”次循环，以实现首尾依次交换
     *
     * @param arr arr 要进行转置的数组引用
     */
    public static void reverse(int arr[]) {     // 此方法专门实现数组的转置操作
        int len = arr.length / 2;               // 转置的次数
        int head = 0;                           // 头部索引
        int tail = arr.length - 1;              // 尾部索引
        for (int x = 0; x < len; x++) {         // 循环次数为数组长度/2
            int temp = arr[head];               // 数据交换
            arr[head] = arr[tail];
            arr[tail] = temp;
            head++;                             // 头部索引增加
            tail--;                             // 尾部索引减少
        }
    }

    public static void print(int temp[]) {
        for (int i = 0; i < temp.length; i++) {
            System.out.print(temp[i] + " ");
        }
    }
}
```

本程序为了实现转置，专门定义了一个 `reverse()` 方法，在本方法中首先计算要进行转置的次数，然后利用循环实现数据的交换，这样就可以实现在一个数组上的数据转置，也不会有垃圾空间产生。
以上实现的是一个一维数组的转置，但既然是数组的转置，也就有可能包含二维数组的转置操作，而二维数组的转置操作就需要进行行列数据的交换，具体分析如图所示。

<img src="http://niu.ochiamalu.top/image-20240922230902876.png" alt="image-20240922230902876" style="zoom:80%;margin:0 auto" />

:::tip 本思路只适合行数与列数相同时使用

本程序给出的二维数组的转换思路是在行数与列数相同的情况下使用的转换思路，这样的转换也是最方便的。但是如果此时给出的数组行数和列数不相同，就必须开辟一个新数组，而新数组的开辟原则是：
**新数组的行数为原始数组的列数，新数组的列数为原始数组的行数**，而后再进行数据的填充与引用的变更。但是这样的做法会产生垃圾空间，所以不再针对此进行讲解，有兴趣的读者可以单独实现。

:::

在上图给出的转置操作过程中，可以发现存在如下规律。

- 第一次转置（如图(b)所示)：4 的索引\[0][1]、2 的索引\[1][0]，行数和列数不同：
- 第二次转置（如图(c)所示）：7 的索引\[0][2]、3 的索引\[2][0]，行数和列数不同：
- 第三次转置（如图(d)所示）：8 的索引\[1][2、6 的索引\[2][1]，行数和列数不同。

通过分析可以发现，**只有当行数与列数相同的时候才可以发生数据的交换操作**，依据此思路代码实现如下。

```java
public class ArrayDemo {
    public static void main(String[] args) {
        int data[][] = new int[][]{
                {1,2,3},{4,5,6},{7,8,9}};       // 定义等比二维数组
        reverse(data);                          // 实现转置
        print(data);                            // 输出数组内容
    }

    /**
     * 此方法主要实现二维数组的转置操作，转换过程中只有当行数和列数相同时才进行交换
     *
     * @param arr arr 要进行转置的数组引用
     */
    public static void reverse(int arr[][]) {     // 此方法专门实现数组的转置操作
        for (int x=0;x<arr.length;x++) {
            for (int y=x;y<arr[x].length;y++) {
                if (x!=y){						// 行与列相同，进行交换
                    int temp = arr[x][y];
                    arr[x][y] = arr[y][x];
                    arr[y][x] = temp;
                }
            }
        }
    }


    /**
     * 此方法的主要功能是进行二维数组数据输出操作，会利用矩阵的形式进行输出数据排列
     *
     * @param temp 要进行转置的数组引用
     */
    public static void print(int temp[][]) {
        for (int x=0;x<temp.length;x++) {
            for (int y=0;y<temp[x].length;y++) {
                System.out.print(temp[x][y] + "、");
            }
            System.out.println();
        }
        System.out.println();
    }
}
```

以上一系列操作实现了方法接收数组的操作情况，而方法本身除了接收数组的引用外，也可以 **返回数组** 。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data[] = init() ;								// 接收数组
        print(data) ; 
        System.out.println("数组长度：" + init().length) ;		// 返回的数组可直接使用length取得长度
    }
    /**
     * 数组初始化的操作方法，此方法可以返回一个数组的引用
     * @return 包含3个元素的数组对象
     */
    public static int[] init() {							// 方法返回数组
        return new int [] {1,2,3} ;						// 直接返回匿名数组
    }
    public static void print(int temp[]) {					// 数组输出
        for (int x = 0 ; x < temp.length ; x ++) {
            System.out.print(temp[x] + "、") ;
        }
        System.out.println() ;
    }
}
```

本程序中 `int` 方法的功能是返回一个数组，可以发现如果方法要返回数组时，只需要 **将其返回值类型定义为数组**
即可，而返回的数组可以直接接收 `int data[] = init()` ，也可以直接调用 `length` 属性取得长度。

## 数组操作方法

Java 本身针对数组提供了类库的支持，下面来介绍两个与数组有关的操作方法。

### 数组复制

数组复制可以将一个数组的部分内容复制到另外一个数组之中。其语法如下。

> System.arraycopy(源数组名称，源数组复制开始索引，目标数组名称，目标数组复制开始索引，长度);

**实现数组复制。**

- 数组A：1、2、3、4、5、6、7、8;
- 数组B：11、22、33、44、55、66、77、88；
- 将数组 A 的部分内容替换到数组 B 中，数组 B 的最终结果为：11、22、5、6、7、66、77、88。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int dataA[] = new int[] { 1, 2, 3, 4, 5, 6, 7, 8 };		// 定义数组
        int dataB[] = new int[] { 11, 22, 33, 44, 55, 66, 77, 88 };// 定义数组
        System.arraycopy(dataA, 4, dataB, 2, 3);			// 数组复制
        print(dataB);
    }
    public static void print(int temp[]) {					// 打印数组内容
        for (int x = 0; x < temp.length; x++) {
            System.out.print(temp[x] + "、");
        }
        System.out.println();
    }
}
```

本程序直接利用 `System.arraycopy()` 方法实现了数组内容的部分复制。

### 数组排序

数组排序可以按照由小到大的顺序对基本数据类型的数组（例如：int 数组、double 数组都为基本类型数组）进行排序。其语法如下。

> java.util.Arrays.sort(数组名称);

```java
public class ArrayDemo {
    public static void main(String args[]) {
        int data[] = new int[] { 3, 6, 1, 2, 8, 0 };
        java.util.Arrays.sort(data);			// 数组排序
        print(data);
    }
    public static void print(int temp[]) {		// 数组输出
        for (int x = 0; x < temp.length; x++) {
            System.out.print(temp[x] + "、");
        }
        System.out.println();
    }
}
```

本程序直接使用 `java.util.Arrays.sort()` 方法实现了整型数组的排序操作，但是在现阶段使用的过程中，此类排序方式只适合*
*基本数据类型** ，如 `int[]` 、 `double[]` 、 `char[]` 等，而由于有其他的开发要求，引用数据的排序暂不适用。

## 对象数组

数组是引用类型，而类也同样是 **引用类型** ，所以如果是对象数组的话表示一个引用类型里面 **嵌套** 其他的引用类型。

在之前使用的数组都属于基本数据类型的数组，但是所有的引用数据类型也同样可以定义数组，这样的数组称为对象数组。如果要定义对象数组（以类为例），可以采用如下格式完成。

- 格式：对象数组的动态初始化

> 类名称 对象数组名称 [] = new 类名称[长度];

如果使用了对象数组的动态初始化，则默认情况下，数组的每一个元素都是其对应的默认值null，都需要分别进行对象的实例化操作。

- 格式：对象数组的静态初始化

> 类名称 对象数组名称 [] = new 类名称[]{实例化对象，实例化对象};

下面通过实际的代码分别验证两种实例化格式的使用。

```java
class Book {
    private String title ;
    private double price ;
    public Book(String t,double p) {
        title = t ;
        price = p ;
    }
    // setter、getter、无参构造略
    public String getInfo() {
        return "书名：" + title + "，价格：" + price ;
    }
}
public class ArrayDemo {
    public static void main(String args[]) {
        Book books [] = new Book[3] ;				// 开辟了一个3个长度的对象数组，内容为null
        books[0] = new Book("Java",79.8) ;				// 对象数组中的每个数据都需要分别实例化
        books[1] = new Book("JSP",69.8) ;				// 对象数组中的每个数据都需要分别实例化
        books[2] = new Book("Android",89.8) ;			// 对象数组中的每个数据都需要分别实例化
        for (int x = 0 ; x < books.length ; x ++) {		// 循环对象数组
            System.out.println(books[x].getInfo()) ;
        }
    }
}
```

本程序首先采用动态初始化的方式开辟了 3 个空间大小的 `Book` 对象数组，动态初始化后数组中的每个元素都是 `null`
，所以需要根据索引对数组中每一个元素的对象进行实例化操作。

```java
public class ArrayDemo {
    public static void main(String args[]) {
        Book books[] = new Book[] { 
                new Book("Java", 79.8),
                new Book("JSP", 69.8), 
                new Book("Android", 89.8) }; 		// 开辟了一个3个长度的对象数组
        for (int x = 0; x < books.length; x++) {		// 循环输出对象数组内容 
            System.out.println(books[x].getInfo());
        }
    }
}
```

本程序采用静态初始化的方式定义对象数组，这样数组在开辟之后每一个元素都会对应有一一个具体的实例化对象。

对象数组的最大好处是将多个对象统一进行管理，并且除了数据类型改变外，和之前的数组没有任何区别，而且数组本身就属于引用数据类型，因此对象数组就是在一个引用数据类型中
**嵌入** 其他引用数据类型。如果非要用内存图表示的话，可以简单地理解为图所示的结构。

<img src="http://niu.ochiamalu.top/image-20240922233644507.png" alt="image-20240922233644507" style="zoom:80%;margin:0 auto" />
