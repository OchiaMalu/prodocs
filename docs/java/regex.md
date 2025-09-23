# 正则表达式

正则表达式（Regular Expression,在代码中常简写为regex、regexp或RE)是从 JDK1.4 引入到 Java
中的。正则表达式在本质上是一种字符串操作的语法规则，利用此语法规可以更加灵活地实现字符串的匹配、拆分、替换等操作。

## 问题引出

正则表达式是一组规范的应用，那么这样的规范有什么实际意义呢？为了帮助读者更好地理解正则表达式的作用，下面通过一个实际的程序进行说明。要求判断某一个字符串是否由数字所组成。实际上这样的问题在之前已经为读者讲解过了，而实现的基本过程如下。

- 为了能够判断每一位字符数据，需要将字符串转换为字符数组，这样可以便于循环判断：
- 判断字符数组中的每一个字符是否在“0'~'9”范围内。

```java
package com.yootk.demo;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "123yootk";
        System.out.println(isNumber(str));
    }
    /**
     * 判断字符串是否由数字所组成，在本操作中首先将字符串转换为字符数组，然后循环判断每一位字符
     * @param temp 要判断的字符串数据
     * @return 如果字符串有非数字、为null、没有数据则返回false，正确返回true
     */
    public static boolean isNumber(String temp) {
        if (temp == null || "".equals(temp)) {		// 字符串数据为空
           return false ;
        }
        char data[] = temp.toCharArray();			// 字符串变为字符数组
        for (int x = 0; x < data.length; x++) {
           if (data[x] > '9' || data[x] < '0') {	// 有一位字符不是数字
              return false;					// 有则返回false，结束判断
           }
        }
        return true;
    }
}
```

本程序为了方便验证，特别定义了一个 `isNumber()`
方法，在本方法中根据既定的要求实现了字符串的组成验证，由于要验证的字符串中包含非数字的内容，所以最终的返回结果是 `false` 。

实际上判断某一个字符串是否由数字组成是一个很容易实现的功能，但是读者是否思考过这样一个问题：对于一个这样简单的验证操作，却需要开发者编写
11 行代码，那么如果再复杂一些的验证（例如：验证 `email`
格式）呢？那是不是需要编写的验证代码就会变得非常麻烦，这时正则表达式就可以帮助用户简化此类代码的编写难度。下面利用正则表达式实现与范例程序完全相同的功能。

```java
package com.yootk.demo;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "123yootk";
        System.out.println(str.matches("\\d+"));
    }
}
```

本程序实现了同样的验证操作，而最为重要的是，编写的代码非常有限，在程序中现的 `d+`
就是正则表达式。相信通过这样一个简单的例子，读者不难发现，利用正则表达式可以用简单的编写实现更加复杂的字符串操作。

## 常用的正则表达式

**手机号码的校验**

```
^[1][3,4,5,6,7,8,9][0-9]{9}$
```

**身份证的校验**

```
^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$
```

**邮箱的校验**

```
^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$
```

**URL的校验**

```
^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$
```

**IPv4的校验**

```
^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
```

**16进制颜色的校验**

```
^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
```

**日期 YYYY-MM-DD**

```
^\d{4}(\-)\d{1,2}\1\d{1,2}$
```

**日期 YYYY-MM-DD hh:mm:ss**

```
^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$
```

**邮政编号的校验**

```
^\d{6}$
```

**QQ号的校验**

```
^[1-9][0-9]{4,10}$
```

**微信号的校验**

说明：6至20位，以字母开头，字母，数字，减号，下划线

```
^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$
```

**车牌号的校验**

```
^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$
```

**帐号是否合法**

说明：字母开头，允许5-16字节，允许字母数字下划线

```
^[a-zA-Z][a-zA-Z0-9_]{4,15}$
```

**密码**

说明：以字母开头，长度在6~18之间，只能包含字母、数字和下划线

```
^[a-zA-Z]\w{5,17}$
```

**强密码**

说明：必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间

```
^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
```

## String 类对正则的支持

虽然 Java 本身提供的正则支持类都在 `java.util.regex`
包中，但是从实际的使用来讲，只有很少的情况才会利用这个包中的 `Pattern` 或 `Matcher`
类操作正则，大部分情况下都会考虑使用 `java.lang.String` 类中提供的方法来直接简化正则的操作。下表定义了 `String` 类与正则有关的
5 个操作方法。

<img src="http://niu.ochiamalu.fun/image-20240928114450482.png" alt="image-20240928114450482" style="zoom:80%;margin:0 auto" />

以上列出的 5 个方法包含字符串替换、拆分、验证操作，其中验证操作较为复杂，也是读者需要重点掌握的部分。

```java
package com.yootk.demo;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "hello*)(*()yootk(*#mldn*";
        String regex = "[^a-z]"; 						// 此处编写正则
        System.out.println(str.replaceAll(regex, ""));			// 字符串替换
    }
}
```

本程序在字符串中定义了许多非字母操作（存在的字母以小写字母为主），所以为了将所有的非字母数据清除干净，这时编写了一个正则 `[^a-z]`
（匹配所有的非小写字母)，这样会针对字符串的每一位进行判断，发现其内容不是小写字母，就将其使用空字符串替换（删除)。

```java
package com.yootk.demo;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "yootk9mldnyo8798o5555tk";
        String regex = "\\d+"; 					// [0-9]一位以上
        String result[] = str.split(regex);
        for (int x = 0; x < result.length; x++) {
            System.out.println(result[x]);
        }
    }
}
```

本程序提供的字符串中存在许多数字，有的是一位有的是多位，所以在匹配数字时应该使用 `“+”` 作为量词，这样就表示对一位或多位数字进行拆分。

验证一个字符串是否是数字，如果是则将其变为 `double` 型。

提示：要转换的数字可能是整数(10)也可能是小数(10.2)，但是绝对不允许出现非数字，并且小数点出现时应该有对应的小数位，正则规则分析如图所示。

<img src="http://niu.ochiamalu.fun/image-20240926165858748.png" alt="image-20240926165858748" style="zoom:80%;margin:0 auto" />

:::tip 为什么使用 `“\\d”` ?

**回答：转义字符操作。**

之前为读者讲解过转义字符的概念，其中 `“\\”` 描述的是 `“\”` ，所以如果要在字符串中定义 `“\”` 则必须使用 `“\\”`
，这也就是使用 `“\\d”` （本质是 `“\d”` )的原因了。

另外由于 `“.”` 可以描述所有的任务，所以也需要为其转义，而 `“\\.”` 描述的是 `“\.”` 的字符，实际上也属于转义操作。

:::

在上图描述的正则规则中，整数位使用 `“\d+”` 描述，表示一位以上的整数位。但是在设计小数位时由于存在小数点( `“.”`
在正则中表示任意字符，所以必须使用 `“\\.”` 转义)的问题，而且小数点与小数位应该作为整体出现，所以使用了 `“()”`
进行声明，而整个小数部分应该出现 0 次或 1 次，则使用 `“?”` 量词修饰。

```java
package com.yootk.demo;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "10.10";
        String regex = "\\d+(\\.\\d+)?"; 
        if (str.matches(regex)) { 				// 转型之前要进行验证
           System.out.println(Double.parseDouble(str));
        }
    }
}
```

本程序给出的正则可以进行整数和小数数据的判断，如果正则匹配成功则将其转换为 `Double` 型数据。

范例：判断给定的字符串是否是一个IP地址(IPV4)

提示：以“192.168.1.1” IP地址为例，每一个段可以包含的数字长度为 13 位。

```java
package com.yootk.demo;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "192.168.1.1";
        String regex = "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}";
        System.out.println(str.matches(regex));
    }
}
```

本程序由于存在 4 组数据（但是 `“.”` 只有3个)，并且每组数据都是由 13 位的数字组成，所以每组数字的正则验证格式为 `“\\d{1,3}”`
。同时在进行 `“.”` 匹配时必须进行转义，所以使用 `"\\.”` 表示。

:::tip 也可以简化正则操作

在范例所编写的代码中实际上只是按照结构简单地进行了编写，但是既然有重复，就可以把重复的部分作为一个整体，使用 `“()”`
声明，再使用量词标记即可。所以范例的正则可以修改为：

> String regex ="(\d(1,3)\\.)(3)\\d(1,3)";

由于 `“.”` 只能出现3次，所以将前三组数据放在一起描述(`(\\d{1,3}\\.)` )，并且规定这些内容必须出现 3 次，而最后一组数字需要单独编写验证规则。

但是需要读者注意一个问题，以上正则本身是存在缺陷的，因为按照以上编写 “999.999.999.999”
也可以成为一个合法的IP地址，当然这样的操作可以进行准确验证，但是并不符合于实际的业务需求。所以在使用正则时希望读者记住，正则只是格式的检查，而具体的内容是否有意义则就属于程序的检测范畴，不要把两者混为一谈。

:::

## java.util.regex 包支持

在大多数情况下使用正则表达式时都会采用 `String` 类完成，但是正则表达式最原始的开发包是 `java.util.regex`
，利用本包中提供的`Pattern` 与 `Matcher` 类也同样可以实现正则表达式的操作。

:::tip 在 `String` 类中提供的方法在 `Pattern` 或 `Matcher` 类中也提供了相同的功能

(1)Pattern类中存在的方法

- 字符串全拆分：`public String[] split(CharSequence input)` ;
- 字符串部分拆分：`public String[] split(CharSequence input,int limit)。

(2)Matcher类中存在的方法

- 字符串匹配：`public boolean matches()` ;
- 字符串全替换：`public String replaceAll(String replacement)` ;
- 字符串替换首个：`public String replaceFirst(String replacement)` 。

在实际开发中，由于 `String` 使用较多，所以往往会利用 `String`
类中提供的方法直接进行正则的操作，对于基础的部分就很少使用`Pattern` 或 `Matcher` 类。

:::

`java.util.regex.Pattern` 类的主要功能是进行数据的拆分以及为 `Matcher` 类对象实例化，该类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928114527170.png" alt="image-20240928114527170" style="zoom:80%;margin:0 auto" />

在 `Pattern` 类中没有定义构造方法，所以如果要想取得 `Pattern` 类对象，必须利用 `compile()`
方法进行指定正则表达式的编译操作。同时在 `Pattern` 类中定义的方法，在进行参数接收时接收的都是 `CharSequence`
接口对象，这样就表示只要是 `CharSequence` 接口的子类对象都可以进行正则操作。

```java
package com.yootk.demo;
import java.util.Arrays;
import java.util.regex.Pattern;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "hello1yootk22mldn333lixinghua";
        String regex = "\\d+";
        Pattern pattern = Pattern.compile(regex); 		// 编译正则
        String result[] = pattern.split(str); 				// 拆分字符串
        System.out.println(Arrays.toString(result));
    }
}
```

本程序利用 `Pattern` 类直接进行了字符串的拆分操作，首先将需要使用到的正则表达式利用 `compile()`
进行编译，然后直接调用`Pattern` 类的 `split()` 方法实现拆分操作。

如果要想实现数据的验证与替换操作，就需要通过 `Matcher` 类实现操作，此类的常用方法如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928114557105.png" alt="image-20240928114557105" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class TestDemo {
    public static void main(String[] args) throws Exception {
        String str = "100";
        String regex = "\\d+";
        Pattern pattern = Pattern.compile(regex); 		// 编译正则
        Matcher mat = pattern.matcher(str); 			// 进行正则匹配
        System.out.println(mat.matches()); 			// 匹配结果
    }
}
```

本程序首先利用 `Pattern` 类的 `matcher()` 方法取得 `Matcher` 类对象，然后利用 `matches()` 方法判断指定的字符串是否符合指定的正则规范。
