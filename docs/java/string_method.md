# String 类的常用方法

String 类在所有的项目开发里面都一定会使用到，因此 String
类提供了一系列的功能操作方法。除了之前所介绍的两个方法（ `equals()` 、 `intern()` )
之外，还提供了大量的其他操作方法。这些方法可以通过 `Java Doc` 文档查阅。考虑到 `String`
类在实际的工作中使用得非常广泛，笔者就建议读者尽可能将所有讲解过的方法都背下来，并且希望读者将以下所讲解的每一个方法的<u>
名称、返回值类型、参数的类型及个数、方法的作用全部记下来</u>。

## 字符与字符串

在很多语言中都强调 **字符串由字符数组** 组成，这一概念在 Java 的 String 类也有体现，其对应的操作方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240923183456662.png" alt="image-20240923183456662" style="zoom:80%;margin:0 auto" />

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "hello";		// 定义字符串对象
        char c = str.charAt(0);		// 截取第一个字符
        System.out.println(c);		// 输出字符
    }
}
```

`charAt()` 方法的主要作用是从一个字符串中截取 **指定索引** 的字符，由于 Java 中的字符串的索引下标从 0
开始，所以截取的第一个字符为 `h` 。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "hello";					// 定义字符串
        char[] data = str.toCharArray(); 			// 将字符串变为字符数组
        for (int x = 0; x < data.length; x++) {		// 循环输出每一个字符
            System.out.print(data[x] + "、");
        }
    }
}
```

本程序主要实现了字符串的拆分操作，利用 `toCharArray()` 方法可以将一个 **字符串拆分为字符数组** ，而拆分后的字符数组长度就是字符串的长度。

当利用 `toCharArray()` 方法将字符串拆分为字符数组后，实际上就可以针对每一个字符进行操作。下面为读者演示一个字符串小写字母转换为大写字母的操作（利用编码值来处理）。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "hello";							// 字符串由小写字母组成
        char[] data = str.toCharArray(); 					// 将字符串变为字符数组
        for (int x = 0; x < data.length; x++) {				// 改变每一个字符的编码值
            data[x] -= 32;
        }
        System.out.println(new String(data)); 				// 将全部字符数组变为String
        System.out.println(new String(data, 1, 2)); 			// 将部分字符数组变为String
    }
}
```

本程序首先将字符串（为了操作方便，此时的字符串全部由小写字母组成）拆分为 **字符数组**
，然后使用循环分别处理数组中每一个字符的内容，最后使用 `String` 类的构造方法，将字符数组变为字符串对象。

例：**给定一个字符串，要求判断其是否由数字组成**

**思路：**
如果整个字符串要判断是不是数字是无法实现的，但是可以将字符串变为字符数组，然后判新每一个字符的内容是否是数字，如果该字符的范围在('
0'~'9')指定的范畴之内，那么就是数字。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "123423432";
        if (isNumber(str)) {
          System.out.println("字符串由数字组成！");
        } else {
          System.out.println("字符串由非数字组成！");
        }
    }
    /**
     * 判断字符串是否由数字所组成
     * @param temp 要判断的字符串数据
     * @return 如果字符串由数字组成返回true，否则返回false
     */
    public static boolean isNumber(String temp) {
        char[] data = temp.toCharArray();	// 将字符串变为字符数组，可以取出每一位字符进行判断
        for (int x = 0; x < data.length; x++) {		// 循环判断
            if (data[x] > '9' || data[x] < '0') {		// 不是数字字符范围
              return false;					// 后续不再判断
            }
        }
        return true; 						// 如果全部验证通过返回true
    }
}
```

本程序在主类中定义了一个 `isNumber()` 方法，所以此方法可以在主方法中直接调用。在 `isNumber()`
方法中为了实现判断，首先将字符串转换为字符数组，然后采用循环的方式判断每一个字符是否是数字(例如：'9'是字符不是数字 9 )
，如果有一位不是则返回 `false` （结束判断)，如果全部是数字则返回 `true` 。

:::tip 方法命名的习惯

读者可以发现在本程序中，`isNumber()` 方法返回的是 `boolean` 数据类型，这是一种真或假的判断，而在 Java
开发中，针对返回`boolean` 值的方法习惯性的命名是以 `isXxx0()` 的形式命名。

:::

## 字节与字符串

字节使用 `byte` 描述，字节一般主要用于数据的传输或编码的转换，而在 `String`
类里面提供了将字符串变为字节数组的操作，就是为了传输以及编码转换。字符串与字节转换方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240923184252779.png" alt="image-20240923184252779" style="zoom:80%;margin:0 auto" />

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "helloworld";				// 定义字符串
        byte[] data = str.getBytes(); 				// 将字符串变为字节数组
        for (int x = 0; x < data.length; x++) {
            data[x] -= 32; 					// 将小写字母变为大写形式
        }
        System.out.println(new String(data)); 		// 全部转换
        System.out.println(new String(data, 5, 5)); 	// 部分转换
    }
}
```

本程序利用字节数据类型实现了字符串小写字母转为大写字母的操作，首先将字符串利用 `getBytes()`
方法变为字节数组，然后修改数组中每个元素的内容，最后利用 `String` 的字符串将修改后的字节数组全部或部分变为字符串。

## 字符串的比较 2

如果要进行字符串内容相等的判断需要使用 `equals()` 方法，而在 `String` 类中针对字符串内容的比较方法也提了多种，这些方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240923184404833.png" alt="image-20240923184404833" style="zoom:80%;margin:0 auto" />

```java
public class StringDemo {
    public static void main(String args[]) {
        String stra = "Hello";							// 实例化字符串对象
        String strb = "hELLO";							// 实例化字符串对象
        System.out.println(stra.equals(strb)); 				// 比较结果：false
        System.out.println(stra.equalsIgnoreCase(strb)); 		// 比较结果：true
    }
}
```

本程序首先定义了两个 `String` 类对象，但是这两个字符串对象中的数据大小写不同，然后利用 `equals()`
方法比较时可以发现需要区分大小写字母，所以判断结果为 `false` 。而使用 `equalslgnoreCase()` 方法比较是 **不区分大小写**
的，所以结果为 `true` 。 `equals()` 和 `equalsIgnoreCase()` 两个方法 **只适合判断内容是否相等**
，如果要比较两个字符串的大小关系，就必须使用 `compareTo()` 方法完成。 `compareTo()` 方法返回 `int` 型数据，这个 `int` 型数据有
3 种结果：**大于（返回结果大于0）、小于（返回结果小于0）、等于（返回结果为0）。**

```java
public class StringDemo {
    public static void main(String args[]) {
        String stra = "Hello";						// 定义字符串对象
        String strb = "HEllo";						// 定义字符串对象
        System.out.println(stra.compareTo(strb)); 		// 32，大于0
        if (stra.compareTo(strb) > 0) {				// 可以利用大小等于0的方式来判断大小
           System.out.println("大于");
        }
    }
}
```

本程序使用 `compareTo()` 方法来判断两个字符串的大小关系，通过结果的执行可以发现， `compareTo()` 方法在比较字符串大小时，根据字符串数据的
**编码差值** 的方式来判断（如果第一个相同则继续判断后续内容)。如果要结合分支或循环语句来操作则可以利用`compareTo()`
的返回结果数值来作为判断条件。

## 字符串的查找

一个字符串往往有许多字符组成，而如果要从一个完整的字符串中判断某一个子字符串是否存在，可以使用表所示的方法。

<img src="http://niu.ochiamalu.fun/image-20240923184648639.png" alt="image-20240923184648639" style="zoom:80%;margin:0 auto" />

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "helloworld";				// 实例化字符串对象
        System.out.println(str.indexOf("world"));		// 返回满足条件单词的第一个字母的索引
        System.out.println(str.indexOf("l"));		// 返回的是第一个查找到的子字符串位置
        System.out.println(str.indexOf("l", 5));		// 从第6个元素开始查找子字符串位置
        System.out.println(str.lastIndexOf("l"));		// 从后向前开始查找指定字符串的位置
    }
}
```

本程序利用 `indexOf()` 方法进行子字符串的位置查找，可以发现 `indexOf()` 方法默认情况下是采用 **由前向后**
的顺序进行查找，也可以利用 `indexOf()` 重载的方法由指定位置开始查找，或者利用 `lastIndexOf()` 方法 **由后向前**
查找。下述代码只是利用 `indexOf()` 方法返回了要查找的子字符串位置。但是在一些程序中也可以利用 `indexOf()`
方法来判断是否有指定的子字符串，最早的做法是通过判断查询结果是否是 `-1` 来实现。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "helloworld";				// 字符串对象
        if (str.indexOf("world") != -1) { 			// 能找到子字符串
          System.out.println("可以查询到数据。");
        }
    }
}
```

本程序利用 `indexOf()` 方法查询不到返回 `-1` 结果这一特性继续判断，如果在查找子字符串时返回的结果不是 `-1`
，那么就表示可以查询到内容。但是此种判断方式现在已经很少使用了，因为从 `JDK1.5` 开始 `String` 类扩充了一个 `contains()`
方法，利用此方法可以直接返回 `boolean` （如果查询到则返回 `true` ，否则返回 `false` ）。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "helloworld";				// 字符串对象
        if (str.contains("world")) { 				// 子字符串存在
            System.out.println("可以查询到数据。");
        }
    }
}
```

本程序直接利用 `String` 类的 `contains()` 方法来判断子字符串是否存在，`contains()` 方法直接可以返回 `boolean`
值，这样作为判断条件会比较方便。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "##@@hello**";					// 字符串对象
        System.out.println(str.startsWith("##"));			// 是否以“##”开头
        System.out.println(str.startsWith("@@", 2));		// 从第2个索引开始是否以“@@”开头
        System.out.println(str.endsWith("**"));			// 是否以“**”结尾
    }
}
```

本程序分别利用 `startsWith()` 与 `endsWith()` 两个方法来判断指定的字符串数据是否以指定的内容开头。

## 字符串的替换

在 `String` 类中提供了字符串的替换操作，即可以将指定的字符串内容进行整体替换。字符串替换的方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240923185302468.png" alt="image-20240923185302468" style="zoom:80%;margin:0 auto" />

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "helloworld" ;				// 定义字符串
        String resultA = str.replaceAll("l","_") ;		// 全部替换
        String resultB = str.replaceFirst("l","_") ;	// 替换首个
        System.out.println(resultA) ;
        System.out.println(resultB) ;
    }
}
```

本程序利用 `replaceAll()` 与 `replaceFirst()` 两个方法实现了全部以及首个内容的替换，特别需要注意的是，这两个方法都会返回替换完成后的新字符串内容。

## 字符串的截取

从一个字符串中，可以取出指定的子字符串，称为字符串的截取操作。字符串截取操作的方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240923185751265.png" alt="image-20240923185751265" style="zoom:80%;margin:0 auto" />

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "helloworld"; 				// 定义字符串
        String resultA = str.substring(5); 			// 从指定索引截取到结尾
        String resultB = str.substring(0, 5);		// 截取部分子字符串
        System.out.println(resultA);
        System.out.println(resultB);
    }
}
```

`substring()`
方法存在重载操作，所以它可以返回两种截取结果，一种是从指定位置截取到结尾，另外一种是设置截取的开始索引与结束索引。截取完成后 `substring()`
方法会将截取的结果返回。

:::tip 关于截取的参数设置

在 `String` 类中 `substring()` 方法传递的参数只能是正整数，不能是负数，而且一定要记住 Java 中的字符串索引都是从 0
开始，这一点与数据库的函数设计上是有差别的。

:::

## 字符串的拆分

所谓的拆分操作指的就是按照一个指定的字符串标记，将一个完整的字符串分割为字符串数组。如果要完成拆分操作，可以使用表所示的方法。

<img src="http://niu.ochiamalu.fun/image-20240923190036823.png" alt="image-20240923190036823" style="zoom:80%;margin:0 auto" />

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "hello yootk nihao mldn";	// 定义字符串，中间使用空格作为间隔
        String result[] = str.split(" ");			// 字符串拆分
        for (int x = 0; x < result.length; x++) {	// 循环输出
            System.out.print(result[x] + "、");
        }
    }
}
```

本程序是将一个字符串按照空格进行全部拆分，所以最后将一个完整的字符串拆为 4 个，并且将其保存在 String 类的对象数组中。

:::tip 如果使用空字符串则表示根据每个字符拆分

在进行字符串拆分时，如果 `split()` 方法中设置的是一个空字符串，那么就表示全部拆分，即将整个字符串变为一个字符串数组，而数组的长度就是字符串的长度。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "hello yootk";				// 定义字符串
        String result[] = str.split("");				// 字符串全部拆分
        for (int x = 0; x < result.length; x++) {		// 循环输出
            System.out.print(result[x] + "、");
        }
    }
}
```

此时可以发现，使用 `split()` 方法时只设置了一个空字符串（不是 `null` ，如果是 `null` 执行则会出现 `NullPointerException`
异常），这样就表示按照每一个字符进行拆分。

:::

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "hello yootk nihao mldn";	// 定义字符串，中间使用空格作为间隔
        String result[] = str.split(" ",2);		// 字符串拆分
        for (int x = 0; x < result.length; x++) {	// 循环输出
            System.out.println(result[x]);
        }
    }
}
```

本程序在进行拆分时设置了拆分的个数，所以只将全部的内容拆分为两个长度的字符串对象数组。

:::warning 要避免正则表达式的影响，可以进行转义操作

实际上 `split()`
方法的字符串拆分能否正常进行，与正则表达式的操作有关，所以有些时候会出现无法拆分的情况，例如：给出一个IP地址（192.168.1.2)
，那么肯定首先想到的是根据 `“.”` 拆分，而如果直接使用 `"."` 是不可能正常拆分的。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "192.168.1.2";			// 定义字符串
        String result[] = str.split(".");			// 字符串拆分
        for (int x = 0; x < result.length; x++) {	// 循环输出
            System.out.print(result[x] + "、");
        }
    }
}
```

此时操作是不能正常执行的，而要想正常执行，就必须对要拆分的 `“.”` 进行转义，在Java中转义要使用 `\\` ( `\` 表示一个 `“\”` )
描述。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "192.168.1.2";			// 定义字符串
        String result[] = str.split("\\.");		// 字符串拆分
        for (int x = 0; x < result.length; x++) {	// 循环输出
            System.out.print(result[x] + "、");
        }
    }
}
```

在实际的开发中，拆分的操作是非常常见的，因为很多时候会传递一组数据到程序中进行处理。例如，现在有如下的一个字符串：`张三：20李四：21|王五：221 `
（姓名：年龄姓名：年龄…)，当接收到此数据时必须要对数据进行拆分。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "张三:20|李四:21|王五:22";	// 定义字符串
        String result[] = str.split("\\|");			// 第一次拆分
        for (int x = 0; x < result.length; x++) {
           String temp[] = result[x].split(":");		// 第二次拆分
           System.out.println("姓名：" + temp[0] + "，年龄：" + temp[1]);
        }
    }
}
```

本程序首先使用 `“|”` 进行了拆分，然后在每次循环中又使用 `“：”` 继续拆分，最终取得了姓名与年龄数据。在实际开发中，这样的数据传递形式也是非常常见的，所以一定要重点掌握。

:::

## 其他方法

除了以上给出的多组字符串操作方法，在 String 类中也提供了一些其他辅助操作方法，这些方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240923190620330.png" alt="image-20240923190620330" style="zoom:80%;margin:0 auto" />

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "hello".concat("world") ;		// 等价于“+”
        System.out.println(str) ;
    }
}
```

本程序利用 `concat()` 方法实现了字符串的连接操作，但是大部分情况下都会使用 `“+”` 来取代 `concat()` 方法。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "(*(*Hello(*(*" ;			// 定义字符串
        System.out.println(str.toUpperCase()) ;	// 转大写后输出
        System.out.println(str.toLowerCase()) ;	// 转小写后输出
    }
}
```

在 String 类中提供的 `toUpperCase()` 与 `toLowerCase()` 两个方法的好处在于，<u>对于非字母的部分不会进行转换</u>。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "   hello   world  ";			// 定义字符串，包含空格
        System.out.println("【" + str + "】");		// 原始字符串
        System.out.println("【" + str.trim() + "】");	// 去掉空格后的字符串
    }
}
```

本程序为了对比方便，输出了原始字符串以及使用 `trim()`
方法去掉空格后的字符串，通过执行可以发现，对于字符串左右两边的空格是可以使用 `trim()` 方法取消的，但是 **中间的空格则无法消除
** 。

:::tip 可以使用 `replaceAll()` 来实现空格删除

`trim()` 方法只能删除左右空格，无法删除中间的空格。如果现在要想取消字符串中的全部空格，用户也可以使用 `replaceAll()`
方法将空格替换为空字符串(""不是null)的方法实现。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "   hello   world  ";			// 定义字符串，包含空格
        System.out.println(str.replaceAll(" ",""));		// 去掉空格后的字符串
    }
}
```

本程序已经将字符串中的全部空格都删除了，在这里笔者要提醒读者的是，在开发中各种方法都需要 **混合搭配** 使用，所以对于常用方法的使用一定要灵活。

:::

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "helloworld";			// 定义字符串
        System.out.println(str.length());		// 取得字符串长度
    }
}
```

本程序直接使用 `length()` 方法取得字符串长度后进行输出。

:::tip 关于 `length` 的说明

有许多初学者在学习完 String 类中的 `length()` 方法 `String对象.length()` 后，容易与数组中的 `length`
（数组对象.length）属性混淆，在这里一定要提醒读者的是，String 中取得长度使用的是  `length()`
方法，只要是方法后面都要有 `“()”` ，而数组中没有 `length()` 方法只有 `length` 属性。

:::

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "helloworld";			// 定义字符串
        System.out.println(str.isEmpty()); 		// 判断字符串对象的内容是否为空字符串（不是null）
        System.out.println("".isEmpty());	 	// 判断字符串常量的内容是否为空字符串（不是null）
    }
}
```

空字符串（不是null）指的是长度为 0 的字符串数据，利用 `isEmpty()` 方法可以实现判断，如果觉得 `isEmpty()`
方法不方便，还可以使用 `“".equals(str)”` 操作代替。 String
类虽然提供了大量的支持方法，但是却少了一个重要的方法一 `initcap()` 功能，首字母大写，其余字母小写，而这样的功能只能够自己实现。

```java
public class StringDemo {
    public static void main(String args[]) {
        String str = "yootk";				// 定义字符串
        System.out.println(initcap(str));		// 调用initcap()方法
    }
    /**
     * 实现首字母大写的操作
     * @param temp 要转换的字符串数据
     * @return 将首字母大写后返回
     */
    public static String initcap(String temp) {
        // 利用substring(0,1)取出字符串的第一位后将其变为大写，再连接剩余的字符串
        return temp.substring(0, 1).toUpperCase() + temp.substring(1);
    }
}
```

本程序利用 `substring()` 方法首先截取了要转换字符串的第一个字符，然后利用 `toUpperCase()`
方法将其变为大写字母，最后与其他剩余的字符串连接，就可以实现首字母大写的功能了。
