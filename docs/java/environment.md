<script setup>
import CustomLink from '../.vitepress/components/CustomLink.vue'
</script>

# 环境安装

本文以 Windows 系统，JDK1.8 版本作为示例，其他版本的操作步骤类似。

若安装了 `集成开发环境` ，如 `IDEA、Eclipse` 则无需手动安装 JDK，关于 `编辑器` 和 `集成开发环境` 的区别可查看：

<CustomLink href='../combined_language/environment.html#编辑器和集成开发环境' title='编辑器和集成开发环境'/>

## JDK 和 JRE

`JDK`（Java Development Kit）和 `JRE` （Java Runtime Environment）是 Java 开发和运行环境中的两个重要组件，它们有以下区别：

1. JDK（Java Development Kit）：

> - 功能：JDK是Java开发工具包，用于开发Java应用程序。它包含了 **Java 编译器**（javac）、**Java虚拟机**（JVM）、**开发工具**
    （如调试器和监视器）、**类库**、**示例代码**和其他一些开发工具。
>  - 作用：JDK 提供了开发 Java 应用程序所需的所有工具和库。通过 JDK，开发人员可以编写、编译和调试 Java 代码，并将其转换为可在
     JRE 上运行的字节码。

2. JRE（Java Runtime Environment）：

> - 功能：JRE 是 Java 运行时环境，用于运行已编译的 Java 应用程序。它包含了 **Java 虚拟机**（JVM）、**类加载器**、**运行时类库**
    和其他支持文件。
    >
- 作用：JRE 是 Java 应用程序的**运行环境**，当用户想要执行 Java 程序时，需要安装 JRE。JRE 负责将 Java字节码翻译成机器语言并执行。

简而言之，JDK 是用于开发 Java 应用程序的工具包，它包含了编译器、虚拟机等工具，可以将 Java 源代码编译成字节码。而 JRE
是用于运行Java应用程序的环境，它包含了虚拟机和运行时类库，可以执行已经编译的Java字节码。

::: tip

在 **开发** Java 应用程序时，需要先安装 JDK，而在用户端 **运行** Java应用程序时，只需要安装 JRE 即可。

:::

<img src="http://niu.ochiamalu.top/image-20240917151208010.png" alt="image-20240917151208010" style="zoom: 67%; margin: 0px auto;" />

## 下载 JDK

<CustomLink href='https://www.oracle.com/java/technologies/downloads/' title='官网地址'/>



进入官网后往下翻，找到 JAVA8 ，然后点击 Windows

<img src="http://niu.ochiamalu.top/image-20240917151454385.png" alt="image-20240917151454385" style="zoom:67%;margin:0 auto" />

然后选择对应的版本（X64代表32位系统的，X86代表64位系统）

<img src="C:\Users\OchiaMalu\AppData\Roaming\Typora\typora-user-images\image-20240917151550195.png" alt="image-20240917151550195" style="zoom:67%;margin:0 auto" />

## 安装 JDK

点击下载下来的安装包进行安装，可更改安装目录。

<img src="http://niu.ochiamalu.top/image-20240917151716469.png" alt="image-20240917151716469" style="zoom: 67%;margin:0 auto" />

等待进度完成，然后出现关于 JRE 的安装。

<img src="http://niu.ochiamalu.top/image-20240917151817301.png" alt="image-20240917151817301" style="zoom:67%;margin:0 auto" />

## 配置 JDK

在 `此电脑` 上右键，并找到 `属性` 。

<img src="http://niu.ochiamalu.top/image-20231111152227182.png" alt="image-20231111152227182" style="zoom:80%;margin:0 auto" />

在右侧找到 `高级系统设置` 。

<img src="http://niu.ochiamalu.top/image-20231111152302162.png" alt="image-20231111152302162" style="zoom:80%;margin:0 auto" />

在打开的页面中找到 `环境变量` 。

<img src="http://niu.ochiamalu.top/image-20231111152348653.png" alt="image-20231111152348653" style="zoom:80%;margin:0 auto" />

接着在系统变量这选择 `新建` 。

<img src="http://niu.ochiamalu.top/image-20240917152349680.png" alt="image-20240917152349680" style="zoom:67%;margin:0 auto" />

新增 `JAVA_HOME` ，变量值为刚刚安装的 JDK 目录路径。

<img src="http://niu.ochiamalu.top/image-20240917152550817.png" alt="image-20240917152550817" style="zoom:80%;margin:0 auto" />

再次新增系统变量，变量名为 `classpath` ，变量值为 `.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar ` 。

<img src="http://niu.ochiamalu.top/image-20240917152711159.png" alt="image-20240917152711159" style="zoom:67%;margin:0 auto" />

在 `系统变量` 中找到 `Path` 并双击。

<img src="http://niu.ochiamalu.top/image-20231111152517626.png" alt="image-20231111152517626" style="zoom:80%;margin:0 auto" />

依次新增 `%JAVA_HOME%\bin` 和 `%JAVA_HOME%\jre\bin` 。

<img src="http://niu.ochiamalu.top/image-20240917152837042.png" alt="image-20240917152837042" style="zoom: 80%;margin:0 auto" />

最后按住键盘 `win+r` 输入 `cmd` ，然后输入

```
java -version
```

<img src="http://niu.ochiamalu.top/image-20240917152925143.png" alt="image-20240917152925143" style="zoom:80%;margin:0 auto" />

只要出现内容则配置成功。

## IDEA

在 Jetbrain 官网下载 IDEA 安装包。

<CustomLink href='https://www.jetbrains.com.cn/idea/download/?section=windows#section=windows' title='IDEA 下载'/>

安装过程非常简单，只需要一直点击下一步即可。

<img src="http://niu.ochiamalu.top/image-20240917153938484.png" alt="image-20240917153938484" style="zoom: 67%;margin:0 auto" />

可以试用 30 天，如果是高校学生可以在官网申请免费使用，破解版请自行搜索。
