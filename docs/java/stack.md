# Stack 子类

栈也是一种动态对象数组，采用的是一种先进后出的数据结构形式，即在栈中最早保存的数据最后才会取出，而最后保存的数据可以最先取出，如图所示。

:::tip 栈的实际作用

实际上栈的数据结构在计算机操作中也是存在的，例如：Word
本身的撤销功能一定是最后操作的最先撤销；或者在进行网页浏览时进行页面回退操作中，每一次回退都是返回到最近浏览的页面，而最早打开的页面只能回退到最后再显示。

:::

<img src="http://niu.ochiamalu.top/image-20240928104252255.png" alt="image-20240928104252255" style="zoom:80%;margin:0 auto" />

在 `java.util` 包中可以利用 `Stack` 类实现栈的功能，此类定义如下。

> public class Stack\<E> extends Vector\<E>

通过定义可以发现，`Stack` 类属于 `Vector` 子类，但是需要注意的是，在进行 `Stack` 类操作时不会使用 `Vector`
类定义的方法，主要使用 `Stack` 自己定义的方法。`Stack` 类的常用方法如表所示。

<img src="http://niu.ochiamalu.top/image-20240928104347662.png" alt="image-20240928104347662" style="zoom:80%;margin:0 auto" />

```java
package com.yootk.demo;
import java.util.Stack;
public class TestDemo {
    public static void main(String[] args) {
        Stack<String> all = new Stack<String>();
        all.push("www.jixianit.com") ;
        all.push("www.yootk.com") ;
        all.push("www.mldn.cn") ;
        System.out.println(all.pop());
        System.out.println(all.pop());
        System.out.println(all.pop());
        System.out.println(all.pop());				// EmptyStackException
    }
}
```

本程序利用 `Stack` 类的 `push()` 方法向栈中保存数据，而取得数据时只需要利用 `pop()`
方法即可实现出栈操作，如果栈中没有任何数据，进行出栈操作时则将抛出 `EmptyStackException` 异常。
