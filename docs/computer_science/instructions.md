# 计算机科学入门

上次我们把 `ALU` ,  `控制单元` ,  `RAM` ,  `时钟`  结合在一起，做了个基本，但可用的 `中央处理单元` , 简称 **CPU**
。它是计算机的核心，CPU 之所以强大，是因为它是 **可编程的** （programmable），如果写入不同指令，就会执行不同任务，CPU
是一块硬件，<u>可以被软件控制</u>。

<img src="http://niu.ochiamalu.fun/image-20231007140654539.png" alt="image-20231007140654539" style="zoom: 67%;" />

## 指令和程序

上一次我们自定义了 4 条程序。

<img src="http://niu.ochiamalu.fun/image-20231006193959598.png" alt="image-20231006193959598" style="zoom:80%;margin:0 auto" />

内存里有一些值，在这里前 4 位是操作码，后 4 位是 **一个地址** 或者 **两个寄存器 ID** 。

<img src="http://niu.ochiamalu.fun/image-20231007141826329.png" alt="image-20231007141826329" style="zoom: 80%;" />

### 循环

让我们先增加一些 **新的指令** 。

<img src="http://niu.ochiamalu.fun/image-20231007142127110.png" alt="image-20231007142127110" style="zoom:80%;margin:0 auto" />

- SUB ：减法，将两个寄存器中的数值相减。
- JUMP：跳跃，比如 JUMP 2 是第五个指令，它的作用是跳回第二条指令。实现方法也很简单，只需要把指令后 4 位代表的内存地址的值， *
  *覆盖** 掉 `指令地址寄存器` 里的值 。
- JUMP_NEG：当数值是负数的时候跳跃，还记得 ALU 的负数标志吗？只需要用 AND 门连接就可以了。
- HALT：结束，当遇到这个时程序就会结束，否则 `指令地址寄存器` +1
  执行后面的无用二进制数会引发一些不可预料的错误。我还想指出一点，指令和数据都是存在同一个内存里的，它们在根本层面上毫无区别都是二进制数，HALT
  能区分指令和数据。

接下来我们 **简化** 一下 RAM，从现在开始 RAM 的 DATA 中不再显示二进制数而是 `指令 + 位置`
，当然了它的本质还是二进制数，还需要经过取指令阶段和解码阶段，这样只是让我们好看一些。

<img src="http://niu.ochiamalu.fun/image-20231007143208528.png" alt="image-20231007143208528" style="zoom:80%;margin:0 auto" />

让我们来看看这个程序，前四步跟上次的一样。

1. 将 14 号位置的数据放入寄存器 A 。
2. 将 15 号位置的数据放入寄存器 B 。
3. 将 A 和 B 相加并放入 A 。
4. 将寄存器 A 的值放入 RAM 的13 号位置。

<img src="http://niu.ochiamalu.fun/image-20231007143849835.png" alt="image-20231007143849835" style="zoom: 80%;margin:0 auto" />

接下来遇到 JUMP 指令。这时会将 `指令地址寄存器` 中的数据 **覆盖** ，因此会跳回到第 2 步。

<img src="http://niu.ochiamalu.fun/image-20231007144121043.png" alt="image-20231007144121043" style="zoom: 80%;margin:0 auto" />

将寄存器 A 和 寄存器 B 相加，并将数据存入寄存器 A 。

<img src="http://niu.ochiamalu.fun/image-20231007144259819.png" alt="image-20231007144259819" style="zoom:80%;margin:0 auto" />

将寄存器 A 中的数据放入 RAM 的 13 号位置。

<img src="http://niu.ochiamalu.fun/image-20231007144425800.png" alt="image-20231007144425800" style="zoom:80%;margin:0 auto" />

接着我们又遇到了 JUMP ，这时又从 2 号位置重新执行 。

<img src="http://niu.ochiamalu.fun/image-20231007144526739.png" alt="image-20231007144526739" style="zoom:80%;margin:0 auto" />

我们发现如此一来，这个程序永远结束不了，它会在 2 号指令到 3 号指令不断往复，这个叫做 **循环** ，而它没有出口，会一直循环下去，因此这个循环又叫
**无限循环** （infinite loop）。

在这个程序中，循环的作用是将 RAM 的 13 号位置的数据不断 +1 。

### 条件

为了停下来，我们需要有条件的 JUMP ，<u>只有特定条件满足了，才执行 JUMP</u>。比如 JUMP NEGATIVE 就是条件跳转的一个例子。

还有其他类型的条件跳转，比如 JUMP IF EQUAL（如果相等）， JUMP IF GREATER（如果更大），还记得怎么实现吗？没错就是 ALU 的标识，不过是多加几个
AND 门而已。

让我们看看这个程序。

1. 将 14 号位置的数据放入寄存器 A 。
2. 将 15 号位置的数据放入寄存器 B 。
3. 将寄存器 A 和 寄存器 B 中的数据相减并放入寄存器 A 。

<img src="http://niu.ochiamalu.fun/image-20231007145243351.png" alt="image-20231007145243351" style="zoom:80%;margin:0 auto" />

这时寄存器 A 中的数据是 6 ，并来到了 JUMP_NEG 。

<img src="http://niu.ochiamalu.fun/image-20231007145627898.png" alt="image-20231007145627898" style="zoom:80%;margin:0 auto" />

因为上一次 ALU 的计算结果是 6 ，而 6 是正数，ALU 的负数标识为 False ，因此无法跳转。

<img src="http://niu.ochiamalu.fun/image-20231007145803454.png" alt="image-20231007145803454" style="zoom:150%;margin:0 auto" />

来到第五条指令 JUMP ，这个 JUMP 没有条件，因此直接跳转到 2 号位置。

<img src="http://niu.ochiamalu.fun/image-20231007145921937.png" alt="image-20231007145921937" style="zoom:80%;margin:0 auto" />

下一次循环是 `6 - 5 = 1` ，依旧是正数，因此还会 **继续循环** 。

再下一次就是 `1 - 5` 了，这时候结果是 `-4` ，结果为负数，ALU 的负数标识为 True 。因此这一次循环中 JUMP_NEG 命令将被执行，也就是跳转到
5 号位置，我们 **跳出了循环** ！

<img src="http://niu.ochiamalu.fun/image-20231007150134274.png" alt="image-20231007150134274" style="zoom:80%;margin:0 auto" />

5 号命令是 ADD ，将寄存器 A 和寄存器 B 中的数据相加，并放入寄存器 A 。

<img src="http://niu.ochiamalu.fun/image-20231007150406549.png" alt="image-20231007150406549" style="zoom:80%;margin:0 auto" />

接下来，将寄存器 A 中的数据放入 RAM 的 13 号位置。

<img src="http://niu.ochiamalu.fun/image-20231007150614677.png" alt="image-20231007150614677" style="zoom:80%;margin:0 auto" />

最后，遇到 HALT 指令，程序结束。

<img src="http://niu.ochiamalu.fun/image-20231007150659349.png" alt="image-20231007150659349" style="zoom:80%;margin:0 auto" />

虽然程序只有 7 个指令，但 CPU 执行了 13 个指令，因为在内部循环了 2 次，循环的好处就是可以 **减少我们的代码量** 。

这些代码其实是算余数的，11 除 5 余 1 。

当然，我们可以用任意 2 个数， 7 和 81 ，18 和 54 ，什么都行，这就是软件的强大之处。

软件还让我们做到硬件做不到的事，ALU 可没有除法功能，是 **程序** 给了我们这个功能。

## 现代 CPU

我们这里假设的 CPU 很基础，所有指令都是 8 位，操作码只占了前面 4 位，即便用尽 4 位，也只能代表 16 个指令，而且我们有几条指令，是用后
4 位来指定内存地址，因为 4 位最多只能表示 16 个值，所以我们只能操作 16 个地址，这可不多，我们甚至不能 JUMP 17，因为 4
位二进制无法表示数字 17 。

因此，真正的现代 CPU 用两种策略，最直接的方法是用更多位来代表指令，比如 32 位或 64 位，这叫 **指令长度** ，简单粗暴。

第二个策略是 `可变指令长度` （variable length instructions），还记得 Unicode 和 UTF-8 吗？举个例子，比如某个 CPU 用 8
位长度的操作码，如果看到 HALT 指令，HALT 不需要额外数据，那么会马上执行，因此 HALT **只** 需要 8 位。如果看到 JUMP，它得知道位置值，因此
**至少** 需要 8 位，这个值在 JUMP 的后面，这叫 **立即值** （Immediate Value），这样设计，指令可以是任意长度，但会让读取阶段复杂一点点。

我们来看个真的 CPU 例子，1971年，英特尔发布了 `Intel 4004 处理器` ，片内集成了 2250 个晶体管，晶体管之间的距离是 10 微米，能够处理
4bit 的数据，每秒运算 6 万次，频率为 108KHz 。

这是第一次把 CPU 做成一个芯片，给后来的英特尔处理器打下了基础。

<img src="http://niu.ochiamalu.fun/image-20231007152452845.png" alt="image-20231007152452845" style="zoom:80%;margin:0 auto" />

它支持 46 个指令，足够做一台能用的电脑，它用了很多我们说过的指令，比如 JUMP ADD SUB LOAD，它也用 8 位的"立即值"来执行 JUMP,
以表示更多内存地址。

<img src="http://niu.ochiamalu.fun/image-20231007152600011.png" alt="image-20231007152600011" style="zoom:100%;margin:0 auto" />

现代 CPU, 比如 `英特尔酷睿 i7` , 有上千个指令和指令变种，长度从 1 到 15 个字节，光 ADD 指令就有很多变种，指令越来越多，是因为给
CPU 设计了越来越多功能。
