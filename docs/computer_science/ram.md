# 计算机科学入门

计算机中存储分为两种： **随机存取存储器** （Random Access Memory），简称"RAM"，它只能在有电的情况下存储东西； **持久存储**
，电源关闭时数据也不会丢失。

## 寄存器

### 利用 OR 门记录 True

我们试试将逻辑门的输出 **连回** 输入。

<img src="http://niu.ochiamalu.fun/image-20231006160919738.png" alt="image-20231006160919738" style="zoom:80%;margin:0 auto" />

我们将或门的输出连回输出，这时输入一个 True ，输出结果 True 会使得另一个输入也变成 True 。

<img src="http://niu.ochiamalu.fun/image-20231006161048151.png" alt="image-20231006161048151" style="zoom:80%;margin:0 auto" />

True OR True结果还是 True 。

<img src="http://niu.ochiamalu.fun/image-20231006161133894.png" alt="image-20231006161133894" style="zoom:80%;margin:0 auto" />

即使我们将原来的 True 改为 False ，另一条仍然是 True ，因此结果还是 True ，这里很像 PLC 中的自锁电路，我们 **锁住** 了 True
。但这里有个问题：<u>无法将结果重新改为 False 。</u>

### 利用 AND 门记录 False

接下来看看 `与门` 。

<img src="http://niu.ochiamalu.fun/image-20231006161527549.png" alt="image-20231006161527549" style="zoom:80%;margin:0 auto" />

不管我们将 A 设为 True 还是 False 结果都是 False，<u>这时我们锁住了 False</u>。

<img src="http://niu.ochiamalu.fun/image-20231006161835638.png" alt="image-20231006161835638" style="zoom:80%;margin:0 auto" />

### AND-OR 锁存器

让我们将两个结合起来，这样就成了 **AND-OR 锁存器** 。

<img src="http://niu.ochiamalu.fun/image-20231006161933308.png" alt="image-20231006161933308" style="zoom:80%;margin:0 auto" />

它有两个输入：

- SET 将输出变成 True
- RESET 将输出变成 False

<img src="http://niu.ochiamalu.fun/image-20231006162317217.png" alt="image-20231006162317217" style="zoom:80%;margin:0 auto" />

<br/>

<img src="http://niu.ochiamalu.fun/image-20231006162351264.png" alt="image-20231006162351264" style="zoom:80%;margin:0 auto" />

当 SET 和 RESET 都为 False 的时候，它会显示 **最后** 输入的值。

<img src="http://niu.ochiamalu.fun/image-20231006162521746.png" alt="image-20231006162521746" style="zoom:80%;margin:0 auto" />

这样，这段电路就能够保存 **1 bit** 的数据了。

### 门锁

AND-OR 锁存器看起来很难用，它需要两条线进行输入。

让我们加一些逻辑门，使它只需要 **一个输入** 就可以储存数据，而另外一条线控制 “启用” 和 “禁用” ，当启用时输入可以修改数据，当禁用时输入无法改变输出。

<img src="http://niu.ochiamalu.fun/image-20231006164916000.png" alt="image-20231006164916000" style="zoom: 50%;margin:0 auto" />

当允许输入启用时，通过数据输入可以改变输出。

<img src="http://niu.ochiamalu.fun/image-20231006165230052.png" alt="image-20231006165230052" style="zoom: 50%;margin:0 auto" />

<img src="http://niu.ochiamalu.fun/image-20231006165254591.png" alt="image-20231006165254591" style="zoom: 50%;margin:0 auto" />

而当允许输入关闭后，数据输入将无法再改变输出。

<img src="http://niu.ochiamalu.fun/image-20231006165340520.png" alt="image-20231006165340520" style="zoom:50%;margin:0 auto" />

<img src="http://niu.ochiamalu.fun/image-20231006165355923.png" alt="image-20231006165355923" style="zoom:50%;margin:0 auto" />

我们将这个装置称为 **门锁** （Gated Latch）。

让我们将这个电路封装起来。

<img src="http://niu.ochiamalu.fun/image-20231006165944486.png" alt="image-20231006165944486" style="zoom: 67%;margin:0 auto" />

这和上面的功能完全相同，只是你无法看到内部的构造。

### 8 位寄存器

当然，只能存 1 bit 没什么大用，如果我们并排放 8 个锁存器，可以存 8 位信息，比如一个 8 bit 数字。一组这样的锁存器叫 **寄存器**
（register），寄存器能存一个数字，这个数字有多少位，叫"位宽"，早期电脑用 8 位寄存器，然后是 16 位，32 位，如今许多计算机都有 64
位宽的寄存器。

我们用一根线连接所有的锁存器。

<img src="http://niu.ochiamalu.fun/image-20231006170347219.png" alt="image-20231006170347219" style="zoom:67%;margin:0 auto" />

当我们要写入数据的时候，将允许写入设为 True。

<img src="http://niu.ochiamalu.fun/image-20231006170432031.png" alt="image-20231006170432031" style="zoom:67%;margin:0 auto" />

然后就可以将数据写入。

<img src="http://niu.ochiamalu.fun/image-20231006170456251.png" alt="image-20231006170456251" style="zoom:67%;margin:0 auto" />

最后我们关闭允许写入，我们写入的数据就被保存下来了。

<img src="http://niu.ochiamalu.fun/image-20231006170543147.png" alt="image-20231006170543147" style="zoom:67%;margin:0 auto" />

### 寄存器矩阵

如果只有很少的位，把锁存器并排放置，也勉强够用了，64 位寄存器要 64 根数据线，64 根连到输出端，幸运的是，我们只要 1
根线启用所有锁存器但加起来也有 129 条线了，如果存 256 位要 513 条线！

解决方法是 **矩阵** ！

在矩阵中，我们不并列排放锁存器，而是做成网格，存 256 位，我们用 16x16 网格的锁存器，有 16 行 16 列。

<img src="http://niu.ochiamalu.fun/image-20231006171059457.png" alt="image-20231006171059457" style="zoom:67%;margin:0 auto" />

要启用某个锁存器，就打开相应的 `行线` 和 `列线` ，但是这样的话会打开这两条路上的所有锁存器。

<img src="http://niu.ochiamalu.fun/image-20231006171203814.png" alt="image-20231006171203814" style="zoom:67%;margin:0 auto" />

因此我们要在每个锁存器的入口加一个 AND 门，<u>只有当行纵两条线同时被打开时，才打开允许写入</u>。

<img src="http://niu.ochiamalu.fun/image-20231006171747189.png" alt="image-20231006171747189" style="zoom:67%;margin:0 auto" />

这样做还有一个好处，<u>我们只需要一根线连接所有的锁存器来写入数据</u>
，如果允许写入没有被打开，那么数据不会被写入，而每次只有一个锁存器的允许写入会被打开，其他的锁存器会“忽略”这时输入的数据。

<img src="http://niu.ochiamalu.fun/image-20231006172256011.png" alt="image-20231006172256011" style="zoom:67%;margin:0 auto" />

我们可以用类似的技巧, 做"允许读取线"来读数据。

<img src="http://niu.ochiamalu.fun/image-20231006172313543.png" alt="image-20231006172313543" style="zoom:67%;margin:0 auto" />

所以对于 256 位的存储，只要 35 条线 ：1条"数据线", 1条"允许写入线", 1条"允许读取线"，还有16行16列的线用于选择锁存器。

### 多路复用器

我们如何告诉寄存器我们需要打开哪一个锁存器？

如果只是 16x16 的锁存器，我们只需要 4 位的二进制数即可，因为 1111 表示 15，再加上一个 0000 表示的 0 正好 16 位。

<img src="http://niu.ochiamalu.fun/image-20231006173205310.png" alt="image-20231006173205310" style="zoom:67%;margin:0 auto" />

如果我们输入 0000 ，那么多路复用器就会选择第一个。

我们需要两个多路复用器来选择行和列。

因此，00101100 表示第二行第十二列（或者第二列第十二行）。

我们需要 8 条地址线来输入地址，再加上允许写入线、允许读取线、数据写入线，这样就组装成了一个 256 位的内存。

<img src="http://niu.ochiamalu.fun/image-20231006173640566.png" alt="image-20231006173640566" style="zoom:80%;margin:0 auto" />

接下来，我们将 8 个 256 位内存连在一起，因为 8 位正好是 1 字节。

<img src="http://niu.ochiamalu.fun/image-20231006174001732.png" alt="image-20231006174001732" style="zoom:80%;margin:0 auto" />

我们用 **统一** 的地址线来同时选取 8 个内存的 **同一个位置** 。

<img src="http://niu.ochiamalu.fun/image-20231006174127178.png" alt="image-20231006174127178" style="zoom:80%;margin:0 auto" />

例如，8 个内存的 00000000 号锁存器共同组成 1 个字节，这样做可以减少错误。

这样一来，我们就可以存 256 字节的数据，让我们将它看作一个整体。

<img src="http://niu.ochiamalu.fun/image-20231006174430077.png" alt="image-20231006174430077" style="zoom:80%;margin:0 auto" />

这就是一个 256 字节的内存。

### RAM

现代计算机的内存扩展到上兆字节（MB）和千兆字节（GB）的方式，就是不断把内存打包到更大规模。8 位最多能代表 256
个内存地址，要给千兆或十亿字节的内存寻址，需要 32 位的地址。

内存的一个重要特性是：可以随时访问任何位置，因此叫 "随机存取存储器" ，简称 RAM。

还有其他类型的 RAM，如 DRAM，闪存和 NVRAM，它们在功能上与 SRAM
相似，但用不同的电路存单个位，比如用不同的逻辑门，电容器，电荷捕获或忆阻器，<u>
但根本上，这些技术都是矩阵层层嵌套，来存储大量信息</u>。
