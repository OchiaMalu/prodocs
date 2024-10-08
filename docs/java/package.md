# 包的定义

在 Java 程序中的包主要用于将不同功能的文件进行分割。在之前的代码开发中，所有编译后的 `*.class`
文件都保存在同一个目录中，这样一来就会带来一个问题：<u>如果出现了同名文件，就会发生文件的覆盖问题</u>
，因为在同一个目录中不允许有重名文件。而要想解决同名文件冲突的问题，就必须设置不同的目录，因为在不同的目录下可以有重名文件。所谓的包实际上指的就是文件夹。在
Java 中使用 `package` 关键字来定义包，此语句必须写在 `*java` 文件的首行。

:::tip 利用包可以更方便地组织多人开发

读者可以试想这样的一种情景，如果有多个开发人员共同开发同一个项目时，肯定会出现类名称相同的情况，这样一来就会比较麻烦，如图所示。此时就可以利用 `package`
关键字来解决此问题。

<img src="http://niu.ochiamalu.top/image-20240925123514753.png" alt="image-20240925123514753" style="zoom:80%;margin:0 auto" />

在实际的开发中，所有的开发者都会将程序提交到一个统一的服务器上进行保存，实际上如果要对程序进行管理，仅使用包是不够的，还要对程序的更新、上传进行统一的控制。这样在实际开发中通常会配置一个版本控制工具（如SVN），帮助管理代码。

:::

```java
package com.yootk.demo ;				// 定义程序所在包，此语句必须放在首行
public class Hello {
	public static void main(String args[]) {
		System.out.println("Hello World !") ;
	}
}
```

本程序代码的功能就是在屏幕上输出一个字符串信息，但是唯一的区别是将 `Hello` 程序类定义在了一个 `com.yootk.demo`
的包中（在定义包时出现 `“.”` ，就表示子目录）。当程序中出现包的定义后，如果在编译程序时，就必须使生成的 `Hello.class`
保存在指定的目录下（此时应该保存在 `com\yootk\demo` 目录下，与包名称结构相同)。在 JDK 中提供了以下两种自动的打包编译指令。

- 打包编译：`javac -d . Hello.java` ;

|— `-d` ：生成目录，根据 `package` 的定义生成；

|—`.` ：设置保存的路径，如果为 `“.”` 表示在当前所在路径下生成。

- 在解释程序的时候不要进入到包里面，应该在包外面输入类的完整名称（包.类）。

|—输入：`java com.yootk.Hello` 。

:::tip 开发中的程序都要求有包

为了方便程序的管理，在以后实际的项目开发中，所有的类都一定要放在一个包中，而完整的类名称永远都是 `包.类` ，同时没有包的类不应该在开发中出现。

:::

