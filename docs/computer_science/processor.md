# 计算机科学入门

计算机的心脏是 `中央处理单元` ，简称 " **CPU** "，CPU 负责执行程序，程序由一个个操作组成，这些操作叫 `指令` (Instruction)
因为它们 "指示" 计算机要做什么，如果是数学指令，比如加/减，CPU 会让 **ALU** 进行数学运算，也可能是内存指令，CPU 会和 **内存**
通信，然后读/写值。

## CPU

我们可以给 CPU 支持的所有指令分配一个 ID。

<img src="http://niu.ochiamalu.fun/image-20231006193959598.png" alt="image-20231006193959598" style="zoom:80%;margin:0 auto" />

这里的指令都是自定义的，接下来的所有线路都要根据这个来进行设置。

我们假设用前 4 位二进制数存 `操作代码` （operation code），后 4 位二进制数代表数据来自哪里，可以是寄存器或内存地址。

我们还需要两个寄存器：

1. 一个寄存器追踪程序运行到哪里了，我们叫它  `指令地址寄存器` （instruction address register），顾名思义，存当前指令的内存地址。
2. 另一个寄存器存当前指令，叫  `指令寄存器` （instruction register），

---

当启动计算机时，所有寄存器从 0 开始，CPU 指令会经过几个阶段

### 取指令阶段

取指令阶段，负责 **拿到指令** 。

首先，将 `指令地址寄存器` 连到 RAM，寄存器的值为 0，因此 RAM 返回地址 0 的值。

<img src="http://niu.ochiamalu.fun/image-20231006195016159.png" alt="image-20231006195016159" style="zoom: 67%;margin:0 auto" />

地址 0 中的 0010 1110 会复制到 `指令寄存器` 里。

<img src="http://niu.ochiamalu.fun/image-20231006195158536.png" alt="image-20231006195158536" style="zoom:67%;margin:0 auto" />

### 解码阶段

指令由 `控制单元` 进行解码，就像之前的所有东西，  `控制单元` 也是逻辑门组成的，我们需要一个电路，来识别 **操作码**
，比如，在这里操作码 0010 被识别到了。

<img src="http://niu.ochiamalu.fun/image-20231006195550017.png" alt="image-20231006195550017" style="zoom:67%;margin:0 auto" />

前 4 位 0010 是 LOAD A 指令，意思是，把 RAM 的值放入寄存器 A。

<img src="http://niu.ochiamalu.fun/image-20231006195429626.png" alt="image-20231006195429626" style="zoom:80%;margin:0 auto" />

现在知道了是什么指令，就可以开始执行了。

### 执行阶段

后 4 位 1110 是 RAM 的地址, 转成十进制是 14，因此要去 RAM 的 14 号地址。因为之前校验操作码 0010 通过了，因此结果是
True，可以用这个结果打开 RAM 的 `允许读取线` 。

<img src="http://niu.ochiamalu.fun/image-20231006200505427.png" alt="image-20231006200505427" style="zoom:80%;margin:0 auto" />

这时候我们拿到了 RAM 中的数据 0000 0011 ，根据指令 LOAD A ，它的要求是把 RAM 的值放入寄存器 A，也就是把 0000 0011 放入寄存器
A 。我们依旧可以用这条校验线打开寄存器 A 的 `允许写入线` ，然后把 0000 0011 放入，至此，我们就完成了操作码 0010 1110 的操作。

<img src="http://niu.ochiamalu.fun/image-20231006201213900.png" alt="image-20231006201213900" style="zoom:67%;margin:0 auto" />

既然指令完成了，我们可以关掉所有线路，去拿下一条指令，我们把 `指令地址寄存器` +1，"执行阶段"就此结束。

<img src="http://niu.ochiamalu.fun/image-20231006201927057.png" alt="image-20231006201927057" style="zoom: 80%;margin:0 auto" />

### 控制单元

当然了，其他指令可能会操作其他的寄存器，因此真正的线路要比这个复杂得多，我们将它包装起来。

<img src="http://niu.ochiamalu.fun/image-20231006202333211.png" alt="image-20231006202333211" style="zoom: 67%;margin:0 auto" />

接下来让我们看看第二个指令，将 RAM 中的 00000001 也就是 1 号数据放入 `指令寄存器` 。

<img src="http://niu.ochiamalu.fun/image-20231006203024060.png" alt="image-20231006203024060" style="zoom:67%;margin:0 auto" />

接着 **解码** 发现 0001 指令是 LOAD_B

<img src="http://niu.ochiamalu.fun/image-20231006202957605.png" alt="image-20231006202957605" style="zoom:80%;margin:0 auto" />

就像 LOAD_A 一样，将 RAM 中 1111 号位置，也就是 15 号位的数据放入寄存器 B。

<img src="http://niu.ochiamalu.fun/image-20231006203336505.png" alt="image-20231006203336505" style="zoom:67%;margin:0 auto" />

最后，将 `指令地址寄存器` 的数字 +1。

<img src="http://niu.ochiamalu.fun/image-20231006203401718.png" alt="image-20231006203401718" style="zoom:67%;margin:0 auto" />

### 计算

接下来让我们看看第二个指令，将 RAM 中的 00000010，也就是 2 号数据放入 `指令寄存器` 。

<img src="http://niu.ochiamalu.fun/image-20231006203646212.png" alt="image-20231006203646212" style="zoom:67%;margin:0 auto" />

通过 **解码** 发现这是 **ADD** 指令，这个和前面两个指令不同，它说后面 4 位分别是两个寄存器的 ID。

<img src="http://niu.ochiamalu.fun/image-20231006203724746.png" alt="image-20231006203724746" style="zoom:80%;margin:0 auto" />

0100 分为 01 和 00 ，也就是 0 号寄存器和 1 号寄存器。

<img src="http://niu.ochiamalu.fun/image-20231006204019320.png" alt="image-20231006204019320" style="zoom:67%;margin:0 auto" />

因为要进行计算，所以要加入以前学过的 **ALU** 。

<img src="http://niu.ochiamalu.fun/image-20231006204133889.png" alt="image-20231006204133889" style="zoom:67%;margin:0 auto" />

根据指示，将寄存器 A 和寄存器 B 的数据放入 ALU，并且放入加法的指令码。

<img src="http://niu.ochiamalu.fun/image-20231006204254710.png" alt="image-20231006204254710" style="zoom:67%;margin:0 auto" />

最后，结果应该存到寄存器 A，但不能直接写入寄存器 A，这样新值会进入 ALU ，不断和自己相加，因此，控制单元用一个自己的寄存器暂时保存结果。

<img src="http://niu.ochiamalu.fun/image-20231006204415901.png" alt="image-20231006204415901" style="zoom:67%;margin:0 auto" />

接着关闭 ALU ，将计算结果写入寄存器 A 。

<img src="http://niu.ochiamalu.fun/image-20231006204500275.png" alt="image-20231006204500275" style="zoom:67%;margin:0 auto" />

将 `指令地址寄存器` 的数字 +1，至此，就完成了一个计算过程。

### 储存

接下来让我们看看第三个指令，将 RAM 中的 00000011，也就是 3 号数据放入 `指令寄存器` 。

<img src="http://niu.ochiamalu.fun/image-20231006204721840.png" alt="image-20231006204721840" style="zoom:67%;margin:0 auto" />

通过 **解码** 发现这是 **STORE** 指令，把寄存器 A 的值放入 RAM 地址 1101 也就是 13 号 。

<img src="http://niu.ochiamalu.fun/image-20231006204837693.png" alt="image-20231006204837693" style="zoom:80%;margin:0 auto" />

这次不是 `允许读取` ，而是 `允许写入` ，同时，打开寄存器 A 的 `允许读取` ，这样就可以把寄存器 A 里的值，传给 RAM。

<img src="http://niu.ochiamalu.fun/image-20231006205054420.png" alt="image-20231006205054420" style="zoom:80%;margin:0 auto" />

将 `指令地址寄存器` 的数字 +1，当然，在这个例子中 RAM 的 4 号位已经没有指令了，因此会引发一些错误，我们需要一个 **结束标志**
让 `指令地址寄存器`  不再继续，这个我们下次再讲。

恭喜，我们刚运行了第一个电脑程序！它从内存中加载两个值，相加，然后把结果放回内存。

### 时钟

`取指令→解码→执行` 必须以一定的周期进行，因为就算是电也要一定时间来传输，如果过快上一个指令还没完成，下个指令就来了。

负责管理 CPU 的节奏的东西叫 `时钟` ，时钟以精确的间隔触发电信号，CPU `取指令→解码→执行` 的速度叫 **时钟速度** ，单位是赫兹
（赫兹是用来表示频率的单位），1 赫兹代表一秒 1 个周期。

第一个单芯片 CPU 是 `英特尔 4004` 1971 年发布的 4 位CPU。它的微架构 很像我们之前说的 CPU 。

<img src="http://niu.ochiamalu.fun/image-20231006210311551.png" alt="image-20231006210311551" style="zoom:67%;margin:0 auto" />

虽然是第一个单芯片的处理器，但它的时钟速度达到了 740 千赫兹，也就是 1 秒处理 74 万次。

但和现在的 CPU 相比不值一提，最新的 *英特尔i9-11900K* 的最大睿频频率是 6.00 GHz，也就是每秒 60 亿次运算。

<img src="http://niu.ochiamalu.fun/image-20231006210845885.png" alt="image-20231006210845885" style="zoom:80%;margin:0 auto" /> 

### 超频与降频

你可能听过有人会把计算机超频，意思是修改时钟速度，加快 CPU 的速度，芯片制造商经常给 CPU 留一点余地，可以接受一点超频。但超频太多会让
CPU 过热，或产生乱码，因为信号跟不上时钟。

<img src="http://niu.ochiamalu.fun/image-20231006211720568.png" alt="image-20231006211720568" style="zoom: 67%;margin:0 auto" />

你可能很少听说降频，但降频其实很有用，有时没必要让处理器全速运行，省电对用电池的设备很重要。
