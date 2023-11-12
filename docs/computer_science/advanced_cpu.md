<script setup>
import CustomLink from '../.vitepress/components/CustomLink.vue'
</script>

# 计算机科学入门

从 1 秒 1 次运算，到现在有千赫甚至兆赫的CPU，早期计算机的提速方式是 **减少晶体管的切换时间** 。晶体管组成了逻辑门，ALU
以及其他组件，但这种提速方法最终会碰到瓶颈，所以处理器厂商，发明各种新技术来提升性能，不但让简单指令运行更快，也让它能进行更复杂的运算。

## 复杂度

上次我们写了个做除法的程序，给 CPU 执行。

方法是做一连串减法，比如 16 除 4 会变成 16 - 4 - 4 - 4 - 4 ，碰到 0 或负数才停下。

但这种方法要多个时钟周期，很低效，所以现代 CPU 直接在硬件层面设计了除法可以直接给 ALU 除法指令，这让 ALU 更大也更复杂一些。

现代处理器有专门电路来处理图形操作， 解码压缩视频，
加密文档等等。如果用标准操作来实现，要很多个时钟周期。你可能听过某些处理器有 `MMX` 、`3DNOW` 、`SSE`
，它们有额外电路做更复杂的操作，用于游戏和加密等场景。

指令不断增加，人们一旦习惯了它的便利就很难删掉，所以为了 **兼容** 旧指令集，指令数量越来越多。

<img src="http://niu.ochiamalu.xyz/image-20231007152600011.png" alt="image-20231007152600011" style="zoom:100%;margin:0 auto" />

## 缓存

现代处理器有上千条指令，有各种巧妙复杂的电路，超高的时钟速度带来另一个问题—— **如何快速传递数据给 CPU** 。

RAM 成了瓶颈，RAM 是 CPU 之外的独立组件，意味着数据要用线来传递，叫 `总线` （bus）。

<img src="http://niu.ochiamalu.xyz/image-20231007170207265.png" alt="image-20231007170207265" style="zoom:80%;margin:0 auto" />

总线可能只有几厘米，但 CPU 每秒可以处理上亿条指令，很小的延迟也会造成问题。RAM 还需要时间找地址取数据，配置，输出数据，一条 "
从内存读数据" 的指令可能要多个时钟周期。

解决延迟的方法之一是给 CPU **内部** 加一点 RAM ，也就是 **缓存** （cache）。

<img src="http://niu.ochiamalu.xyz/image-20231007170414734.png" alt="image-20231007170414734" style="zoom:80%;margin:0 auto" />

RAM 不再每次只传 1 条数据，而是 **一批** 数据。当 CPU 需要取下一条数据时，缓存中已经有了，因此不需要再从 RAM 中取。因为缓存离
CPU 近，一个时钟周期就能给数据 —— CPU 不用空等！这比反复去 RAM 拿数据快得多。

<img src="http://niu.ochiamalu.xyz/image-20231007170519728.png" alt="image-20231007170519728" style="zoom:80%;margin:0 auto" />

如果想要的数据已经在缓存，叫 `缓存命中`（hit），如果想要的数据不在缓存，叫 `缓存未命中` （miss）。缓存也可以当临时空间，存一些中间值，适合长/复杂的运算。

### 脏位

当 CPU 完成计算的时候，数据不是直接存到 RAM ，而是存在缓存，这样不但存起来快一些，如果还要接着算，取值也快一些。

但这样带来了一个有趣的问题，<u>缓存和 RAM 不一致了</u>。

<img src="http://niu.ochiamalu.xyz/image-20231007170935823.png" alt="image-20231007170935823" style="zoom:80%;margin:0 auto" />

这种不一致必须记录下来，之后要 **同步** 。

因此缓存里每块空间有一个 **特殊标记** ，叫 `脏位` （dirty bit）。

### 同步

同步一般发生在 **当缓存满了而 CPU 又要缓存时** 。

在清理缓存腾出空间之前，会先检查 **脏位** 。

如果是脏的，在加载新内容之前，会把数据 **写回** RAM 。

## 指令流水线

如果你要做饭并烧一壶水，当然不需要等水烧开再开始做饭，只需要按下开关就可以去做别的事情了。

CPU 也是如此。

之前我们的 CPU 按序处理，`取值` → `解码` → `执行` ，不断重复，这种设计，**三个时钟周期** 执行 1 条指令。

<img src="http://niu.ochiamalu.xyz/image-20231007172204407.png" alt="image-20231007172204407" style="zoom:80%;margin:0 auto" />

但因为每个阶段用的是 CPU 的不同部分，意味着可以并行处理！ `执行` 一个指令时，同时 `解码` 下一个指令，`读取`
下下个指令，不同任务重叠进行，同时用上 CPU 里所有部分，这样的流水线 **每个时钟周期执行 1 个指令** 。效率 x3 ！

<img src="http://niu.ochiamalu.xyz/image-20231007172235321.png" alt="image-20231007172235321" style="zoom:80%;margin:0 auto" />

### 动态排序

和缓存一样，这也会带来一些问题。

第一个问题是 **指令之间的依赖关系** ，你在读某个数据而正在执行的指令会改这个数据，也就是说 **拿的是旧数据** 。

因此流水线处理器要先弄清数据依赖性，必要时 **停止** 流水线，避免出问题。

早期的处理器 **依次** 顺序执行既定的处理器指令，高端 CPU 会更进一步，**动态排序** 有依赖关系的指令，最小化流水线的停工时间，这叫
**乱序执行** ，和你猜的一样，这种电路非常复杂。

现代处理器为了提高性能并不严格按照指令的顺序串行执行，而是对执行进行 **相关性分析**
后并行处理乱序执行。比如当处理器中的某些指令需要等待某些资源，处理器不会真的在这里等待而停止指令的执行，而是利用等待资源的时间继续执行后续的指令。

在支持乱序执行的 CPU 中，后面的指令可能在前面指令执行结束前就开始执行了。

<img src="http://niu.ochiamalu.xyz/image-20231007172720756.png" alt="image-20231007172720756" style="zoom: 67%;margin:0 auto" />

### 推测执行

第二个问题是 **条件跳转** ，比如上集的 ` JUMP NEGATIVE` ，这些指令会改变程序的执行流。

简单的流水线处理器，看到 JUMP 指令会停一会儿 **等待** 条件值确定下来，一旦 JUMP 的结果出了，处理器就继续流水线。

因为空等会造成延迟，所以高端处理器会用一些技巧。

可以把 JUMP 想成是 **岔路口** ，高端 CPU 会猜哪条路的可能性大一些，然后提前把指令放进流水线，这叫 **推测执行** 。

<img src="http://niu.ochiamalu.xyz/image-20231007173226318.png" alt="image-20231007173226318" style="zoom:80%;margin:0 auto" />

当 JUMP 的结果出了，如果 CPU 猜对了，流水线已经塞满正确指令，可以马上运行，如果 CPU 猜错了，就要 **清空** 流水线（pipeline
flush），<u>处理器会将状态恢复到预测执行前的状态</u>，再重新跳转到正确执行的分支或指令中运行。

为了尽可能减少清空流水线的次数，CPU 厂商开发了复杂的方法，来猜测哪条分支更有可能，叫 **分支预测** ，现代 CPU 的正确率超过
90% 。

### 融毁和幽灵漏洞

2018 年 1 月 3 日，Google Project Zero（GPZ）团队安全研究员 Jann Horn 在其团队博客中爆出CPU芯片的两组漏洞，分别是Meltdown与
Spectre 。

<CustomLink href='https://googleprojectzero.blogspot.com/2018/01/reading-privileged-memory-with-side.html' title='reading-privileged-memory-with-side'/>

为了保证程序运行的正确性，处理器会对指令执行安全检查，只有当前用户 **权限** 符合指令权限时才能被执行。

然而安全检查这个操作只有 **当它的执行的结果真正被提交并对系统可见时** （指令退休）才会进行。

也就是说，如果在乱序执行中，指令并没有真正执行完成而只是 <u>加载到缓存中</u> 是 **不会** 执行安全检查的。

而此时由于乱序执行而被提前执行的指令会被处理器丢弃，但由于<u>乱序执行的指令对缓存的操作在这些指令被丢弃时 **不会**
被重置</u>。

乱序执行缓存污染即 Meltdown （融毁）漏洞，边界检查绕过即 Spectre （幽灵）漏洞。 Meltdown 与 Spectre 利用 **侧信道攻击** 可以进行
**越权内存访问** ，甚至读取整个内核的内存数据。

微软在 2018 年 3 月 13 日 发布包含修复CPU漏洞功能的 3 月安全补丁 KB4088878 。

<img src="http://niu.ochiamalu.xyz/image-20231007175303137.png" alt="image-20231007175303137" style="zoom: 67%;margin:0 auto" />

## 超标量处理器

理想情况下，流水线一个时钟周期完成 1 个指令，然后 **超标量处理器** （superscalar processors）出现了，一个时钟周期完成多个指令。

即便有流水线设计，在指令执行阶段，处理器里 **有些区域** 还是可能会空闲。比如，执行一个 `从内存取值` 指令期间，**ALU** 会闲置。

所以一次性处理多条指令（取指令+解码） 会更好，这样就可以知道 **接下来** 的指令要用到哪些部分。

如果多条指令要 ALU 的 **不同部分** ，就多条 **同时** 执行。

我们可以再进一步，加多几个相同的电路执行出现频次很高的指令，很多 CPU 有四个、八个甚至更多完全相同的 ALU ，可以同时执行多个数学运算。

<img src="http://niu.ochiamalu.xyz/image-20231007180644150.png" alt="image-20231007180644150" style="zoom: 50%;margin:0 auto" />

## 多核处理器

之前说过的方法，都是优化 **1 个指令流** 的吞吐量。

另一个提升性能的方法是 **同时** 运行多个指令流，用 `多核处理器` （multi-core processors）。

<img src="http://niu.ochiamalu.xyz/image-20231007180940942.png" alt="image-20231007180940942" style="zoom: 67%;margin:0 auto" />

意思是一个 CPU 芯片里，有 **多个** 独立处理单元，很像是有多个独立 CPU ，但因为它们整合紧密，可以共享一些资源，比如缓存，使得多核可以合作运算。

<img src="http://niu.ochiamalu.xyz/image-20231007181004414.png" alt="image-20231007181004414" style="zoom: 67%;margin:0 auto" />

## 多个 CPU

多核不够时，可以用多个 CPU ，一般来说，只有服务器主板上才有多个 CPU 插槽，这使得一张主板上可以插 2 个、 4 个，甚至 8 个
CPU。但是更多的 CPU 会带来更高的 **故障率** ，而且就性能来说 1 + 1 并不等于 2 。

<img src="http://niu.ochiamalu.xyz/image-20231007181242962.png" alt="image-20231007181242962" style="zoom:67%;margin:0 auto" />

## 超级计算机

有时人们有更高的性能要求，所以造了超级计算机！

如果要做怪兽级运算，比如模拟宇宙形成，你需要强大的计算能力，给普通台式机加几个 CPU 没什么用，需要很多处理器！

截止到目前，世界上最快的超级计算机是 *美国橡树岭国家实验室* 的 **Frontier** ，也是是地球上唯一的百亿亿级超算。

<img src="http://niu.ochiamalu.xyz/image-20231007193005290.png" alt="image-20231007193005290" style="zoom:80%;margin:0 auto" />