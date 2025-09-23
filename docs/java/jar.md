# jar 命令

在任何一个项目里一定会存在大量的 `*.class` 文件，如果将这些 `*.class`
文件直接交给用户使用，就会造成文件过多，并且会导致程序没有结构。所以在交付用户使用之前，会使用 `jar` 命令针对 `*.class`
文件进行压缩，最终交付用户使用的往往是 Java 归档（Java Archive,jar）文件。

JDK 已经为用户默认提供了生成 `jar` 文件的工具（jar.exe），直接在命令行方式下就可以看见这个命令的使用。

> jar命令格式: jar {ctxui} [vfmn0PMe] [jar-file] [manifest-file]
> [entry-point] [-C dir] files … 其中{ctxu}这四个参数必须选选其一。
> [v f m e 0 M i ]是可选参数，文件名也是必须的。
>
> ```
>     -c 创建新档案
>     -t 列出档案目录
>     -x 从档案中提取指定的 (或所有) 文件
>     -u 更新现有档案
>     -v 在标准输出中生成详细输出
>     -f 指定档案文件名
>     -m 包含指定清单文件中的清单信息
>     -n 创建新档案后执行 Pack200 规范化
>     -e 为捆绑到可执行 jar 文件的独立应用程序
>   指定应用程序入口点
>     -0 仅存储; 不使用任何 ZIP 压缩
>     -P 保留文件名中的前导 '/' (绝对路径) 和 ".." (父目录) 组件
>     -M 不创建条目的清单文件
>     -i 为指定的 jar 文件生成索引信息
>     -C 更改为指定的目录并包含以下文件
> ```
>
> > 如果任何文件为目录, 则对其进行递归处理。
> > 清单文件名, 档案文件名和入口点名称的指定顺序与 ‘m’, ‘f’ 和 ‘e’ 标记的指定顺序相同。
>
> > 示例 1:
> > 将两个类文件归档到一个名为 classes.jar 的档案中:
> > jar cvf classes.jar Foo.class Bar.class
>
> > 示例 2:
> > 使用现有的清单文件 ‘mymanifest’ 并 将 foo/ 目录中的所有文件归档到 ‘classes.jar’ 中:
> > jar cvfm classes.jar mymanifest -C foo/ .

在所示的操作之中，往往只使用以下 3 个参数。

- -c：创建一个新的文件；
- -V：生成标准的压缩信息；
- -f：由用户自己指定一个 `*.jar` 的文件名称。

```java
package com.yootk.util;
public class Message {
	public void print() {
		System.out.println("Hello World !");
	}
}
```

定义完程序类后，打包编译此文件：`javac -d . Message.java` 。此时会形成 `包.类` 的形式。随后假设这里面有很多 `*.class`
文件，并且要交付用户使用，那么将这个包的代码压缩，输入：`jar-cvf my.jar com` ，这样就会将生成的 `com`
目录（包的根名称）打包成一个压缩的 `jar` 文件。生成的 `my.jar` 文件并不能直接使用，必须配置 `CLASSPATH` 才可以正常被其他程序类加载。

> SET CLASSPATH = .;E:\mydemo\my.jar

此时就可以直接使用 `import` 语句导入 `com.yootk.util.*` 包中的类，并且实例化 `Message`
类对象调用方法。在以后的开发中需要大量使用第三方的 `jar` 文件，那么所有的 `jar` 文件必须配置 `CLASSPATH`
，否则就不能使用。但是如果每次都在命令行中配置会比较麻烦，所以最简单的配置方式就是直接在环境属性中完成，如图所示。

<img src="http://niu.ochiamalu.fun/image-20240925130707162.png" alt="image-20240925130707162" style="zoom:80%;margin:0 auto" />
