<script setup>
import CustomLink from '../.vitepress/components/CustomLink.vue'
</script>

# 环境安装

几乎所有的编程语言都需要依赖环境才能编译和运行，这些环境不是系统自带的，我们需要自己安装。

比如想写 C 语言我们需要安装 `GCC` ，想写 Java 需要安装 `JDK`  ……

安装完成后我们需要配置 `环境变量` 来让系统知道新增了一些命令，如果没有配置或者输入了错误的命令，就会出现这样的提示。

<img src="http://niu.ochiamalu.fun/image-20231111150806203.png" alt="image-20231111150806203" style="zoom:80%;margin:0 auto" />

## 编辑器和集成开发环境

编辑器和集成开发环境（IDE）的区别主要在于其所提供的功能和用途。

**编辑器是一个用于编辑文本文件的工具**，主要用于编辑纯文本文件，例如代码文件、配置文件等。它通常只提供基本的文本编辑功能，如复制、粘贴、查找和替换等，不提供编译、调试等高级功能。

**IDE则是一种集成了多种工具和功能的软件，用于开发软件和应用程序**
。它不仅提供基本的文本编辑功能，还提供了编译、调试、代码补全、自动格式化、版本控制、项目管理等一系列高级功能，可以大大提高开发效率。

总得来说，编辑器可以看作 `记事本` ，所占内存非常小，但是要自行安装编译器并配置环境才可以运行代码；而 IDE
虽然体积很大，但是包含了很多东西，开箱即用，对于新手更加推荐使用 IDE 也就是集成开发环境。

常见的编辑器：Microsoft Visual Code、Sublime……

常见的 IDE ：Microsoft Visual Studio、CLion……

对于新手，推荐使用 `CLion` ，它是 `Jetbrain` 开发的一款 IDE，他们的产品拥有几乎一样的 UI ，本教程将使用 CLion 。

## MinGW

MinGW 的全称是：**Minimalist GNU on Windows**  ，是 C 语言编译器 GCC 移植到 Windows 的产物。

而 MinGW 已经停止更新，它也仅能编译生成 32 位的程序，而 **MinGW-w64** 则可以编译生成 64位 或 32位 可执行程序。

为什么使用 **MinGW-w64** ？

1. MinGW-w64 是 **开源** 软件，可以免费使用。
2. MinGW-w64 由一个活跃的开源社区在持续维护，因此不会过时。
3. MinGW-w64 支持 **最新** 的 C 语言 标准。
4. MinGW-w64 使用 Windows 的 C 语言运行库，因此编译出的程序不需要第三方 DLL ，可以直接在 Windows 下运行。

### 安装

:::tip

如果使用 IDE 编写代码，可以不自行安装。

:::

可以通过国内的第三方链接下载，也可以通过官网下载。

<CustomLink href='https://sourceforge.net/projects/mingw-w64/files/mingw-w64/mingw-w64-release/mingw-w64-v6.0.1.zip/download' title='MinGW 下载'/>

要注意的是，官方将托管存储在 `SourceForge` 上，这个服务器在国外，因此下载速度会非常慢。

解压后其中有很多的文件夹，我们只需要复制其中 `bin` 文件的路径。

<img src="http://niu.ochiamalu.fun/image-20231111152102526.png" alt="image-20231111152102526" style="zoom:80%;margin:0 auto" />

在 `此电脑` 上右键，并找到 `属性` 。

<img src="http://niu.ochiamalu.fun/image-20231111152227182.png" alt="image-20231111152227182" style="zoom:80%;margin:0 auto" />

在右侧找到 `高级系统设置` 。

<img src="http://niu.ochiamalu.fun/image-20231111152302162.png" alt="image-20231111152302162" style="zoom:80%;margin:0 auto" />

在打开的页面中找到 `环境变量` 。

<img src="http://niu.ochiamalu.fun/image-20231111152348653.png" alt="image-20231111152348653" style="zoom:80%;margin:0 auto" />

在 `系统变量` 中找到 `Path` 并双击。

<img src="http://niu.ochiamalu.fun/image-20231111152517626.png" alt="image-20231111152517626" style="zoom:80%;margin:0 auto" />

点击 `新建` 并粘贴之前复制的 `bin` 文件夹路径。

<img src="http://niu.ochiamalu.fun/image-20231111152556560.png" alt="image-20231111152556560" style="zoom:80%;margin:0 auto" />

点击所有的 `确定` 保存。

使用 `Win + R` 输入 `cmd` 或搜索 `命令提示符` 打开 Windows 终端。

<img src="http://niu.ochiamalu.fun/image-20231111152747201.png" alt="image-20231111152747201" style="zoom:80%;margin:0 auto" />

输入 `gcc -v -E -x c++ -` 。

只要出现东西就说明配置正确。

<img src="http://niu.ochiamalu.fun/image-20231111152915879.png" alt="image-20231111152915879" style="zoom: 50%;margin:0 auto" />

否则将提示 `xxx不是内部命令或外部命令,也不是可运行程序` 。

## CLion

在 Jetbrain 官网下载 CLion 安装包。

<CustomLink href='https://www.jetbrains.com.cn/clion/download/#section=windows' title='CLion 安装'/>

安装过程非常简单，只需要一直点击下一步即可。

<img src="http://niu.ochiamalu.fun/image-20231111154133284.png" alt="image-20231111154133284" style="zoom:50%;margin:0 auto" />

:::danger

安装路径不要出现任何中文，否则将出现无法预料的错误。

:::

可以试用 30 天，如果是高校学生可以在官网申请免费使用，破解版请自行搜索。

<img src="http://niu.ochiamalu.fun/image-20231111154355872.png" alt="image-20231111154355872" style="zoom:67%;margin:0 auto" />

打开 CLion 后选择 `New Project` 。

<img src="http://niu.ochiamalu.fun/image-20231111154534430.png" alt="image-20231111154534430" style="zoom:67%;margin:0 auto" />

在右侧选择 `C Executable` ，并选择 C 标准为 C11 ，新建文件路径自行选择。

<img src="http://niu.ochiamalu.fun/image-20231111154708453.png" alt="image-20231111154708453" style="zoom: 67%;margin:0 auto" />

接着会弹出一个窗口让你设置环境，我们可以发现存在 `Bundled MinGW` ，这是 CLion 自带的 C 编译器，也可以选择自己下载的 MinGW。

<img src="http://niu.ochiamalu.fun/image-20231111154959135.png" alt="image-20231111154959135" style="zoom:67%;margin:0 auto" />

我们需要等待下方 IDE 处理完后才能看见运行程序的标志。

<img src="http://niu.ochiamalu.fun/image-20231111155155256.png" alt="image-20231111155155256" style="zoom: 50%;margin:0 auto" />

### hello world

我们可以发现创建文件时，IDE 帮我们生成了一段程序，这是最简单的 C 程序，也是 **所有**
编程语言入门的第一个程序 `hello world` 。

> 当然了这没有明文规定，算是一种风俗吧。

你现在还不需要理解这段程序，之后我们会详细讲解。

在下方的进度条跑完后我们可以看见一个 **绿色的箭头** ，这就是运行程序的按钮。

<img src="http://niu.ochiamalu.fun/image-20231111155633899.png" alt="image-20231111155633899" style="zoom:80%;margin:0 auto" />

我们可以选择 `Run`  ，点击之后 IDE 会使用之前选择的 MinGW 进行编译、链接，并将程序运行的结果输出。

<img src="http://niu.ochiamalu.fun/image-20231111155811079.png" alt="image-20231111155811079" style="zoom:80%;margin:0 auto" />

如果一切顺利，IDE 将输出程序运行的结果。

<img src="http://niu.ochiamalu.fun/image-20231111155912499.png" alt="image-20231111155912499" style="zoom: 50%;margin:0 auto" />
