# 计算机科学入门

我们多次谈到内存（Memory），一般来说，电脑内存是 **非永久性** ，如果电源线不小心拔掉了，内存里所有数据都会丢失。

所以内存叫 **易失性** 存储器，我们还没谈过的话题是 `存储器`
（Storage），存储器（Storage）和内存（Memory）有点不同，任何写入 `存储器` 的数据，比如你的硬盘数据会一直存着，直到被覆盖或删除，断电也不会丢失，存储器是
**非易失性** 的。

以前是 **易失性** 的速度快， **非易失性** 的速度慢，但随着技术发展，两者的差异越来越小，如今我们认为稀松平常的技术，比如这个
U 盘，能低成本+可靠+长时间 存储上 GB 的数据。

## 打孔纸卡

最早的存储介质是 **打孔纸卡** 以及纸卡的亲戚 **打孔纸带** ，到1940年代，纸卡标准是 80列x12行，一张卡能存 960 位数据 (
80x12=960)。

<img src="http://niu.ochiamalu.top/image-20231020213923297.png" alt="image-20231020213923297" style="zoom:67%;margin:0 auto" />

最大纸卡程序是美国军方的 `半自动地面防空系统` 简称 SAGE，一个在 1958 年投入使用的防空系统，主程序存储在 62,500 个纸卡上，大小
5MB 左右，相当如今手机拍张照。

<img src="http://niu.ochiamalu.top/image-20231020214020325.png" alt="image-20231020214020325" style="zoom:33%;margin:0 auto" />

纸卡用了十几年，因为不用电而且便宜耐用，然而坏处是 **读取慢** ，只能写入 **一次** ，打的孔无法轻易补上，对于存临时值，纸卡不好用，我们需要更快更大更灵活的存储方式。

## 延迟线存储器

J. Presper Eckert 在 1944 年建造 **ENIAC** 时发明了一种方法，叫 `延迟线存储器`（Delay Line Memory）原理如下：

拿一个管子装满液体，如水银，管子一端放 `扬声器` （speaker），另一端放 `麦克风`（microphone） ，扬声器发出脉冲时会产生 **压力波
** 。

<img src="http://niu.ochiamalu.top/image-20231020214135772.png" alt="image-20231020214135772" style="zoom:80%;margin:0 auto" />

压力波需要时间，传播到另一端的麦克风，麦克风将压力波 **转换** 回电信号，我们可以用压力波的传播延迟来存储数据！

假设有压力波代表 1，没有代表 0 ，扬声器可以输出 1010 0111 。压力波沿管子传播，过了一会儿，撞上麦克风，将信号转换回 1 和 0 。

<img src="http://niu.ochiamalu.top/image-20231020214232118.png" alt="image-20231020214232118" style="zoom: 67%;margin:0 auto" />

如果加一个电路，连接麦克风和扬声器，再加一个 `放大器`（Amplifier）来弥补 **信号衰弱** ，就能做一个存储数据的循环。信号沿电线传播几乎是瞬时的，所以任何时间点只显示
1 bit 数据，但管子中可以存储多个位(bit)。

<img src="http://niu.ochiamalu.top/image-20231020214300535.png" alt="image-20231020214300535" style="zoom:67%;margin:0 auto" />

### EDVAC

忙完 ENIAC 后，Eckert 和同事 John Mauchly，着手做一个更大更好的计算机叫 `EDVAC` ，使用了延迟线存储器，总共有 128 条延迟线，每条能存
352 位（bits），总共能存 45,000 位(bit)。

<img src="http://niu.ochiamalu.top/image-20231020214350965.png" alt="image-20231020214350965" style="zoom:80%;margin:0 auto" />

这使得 EDVAC 成为最早的 `存储程序计算机` 之一，但 `延迟线存储器` 的一大缺点是 <u>每一个时刻只能读一位 (bit) 数据</u> 。

如果想访问一个特定的 bit，比如第 112 位(bit) 你得等待它从 **循环** 中出现，所以又叫 `顺序存储器` 或 `循环存储器` 。

<img src="http://niu.ochiamalu.top/image-20231020214423516.png" alt="image-20231020214423516" style="zoom:80%;margin:0 auto" />

## 磁芯存储器

而我们想要的是 `随机存取存储器`  可以随时访问 **任何** 位置，增加 **内存密度** 也是一个挑战。

把压力波变得更紧密意味着更容易混在一起，所以出现了其他类型的 `延迟线存储器` ，如 `磁致伸缩延迟存储器` （magnetostrictive
delay lines）。

用金属线的振动来代表数据，通过把线卷成 **线圈** ，1英尺×1英尺的面积能存储大概 1000位(bit)。

<img src="http://niu.ochiamalu.top/image-20231020214456476.png" alt="image-20231020214456476" style="zoom:80%;margin:0 auto" />

然而，延迟线存储器在 1950 年代中期就基本过时了，因为出现了新技术，性能、可靠性和成本都更好。

`磁芯存储器` （magnetic core memory），用了像甜甜圈的 **小型磁圈** （core）。

如果给磁芯绕上电线，并施加电流，可以将磁化在一个方向。

<img src="http://niu.ochiamalu.top/image-20231020214532086.png" alt="image-20231020214532086" style="zoom:80%;margin:0 auto" />

如果关掉电流，磁芯保持 **磁化** 。

<img src="http://niu.ochiamalu.top/image-20231020214702934.png" alt="image-20231020214702934" style="zoom:80%;margin:0 auto" />

如果沿相反方向施加电流，磁化的方向（极性）会翻转，这样就可以存 1 和 0 ！

<img src="http://niu.ochiamalu.top/image-20231020214733609.png" alt="image-20231020214733609" style="zoom:80%;margin:0 auto" />

如果只存 1 位不够有用，所以把小甜甜圈排列成网格，有 `电线` 负责选 **行和列** ，也有 `电线` 贯穿每个磁芯, 用于 **读写**
一位(bit)。

<img src="http://niu.ochiamalu.top/image-20231020214830237.png" alt="image-20231020214830237" style="zoom:80%;margin:0 auto" />

### Whirlwind 1 计算机

磁芯内存的第一次大规模运用是 1953 年麻省理工学院的 `Whirlwind 1 计算机` ，磁芯排列是 32×32 ，用了 16 块板子，能存储大约
16000 位(bit)。

<img src="http://niu.ochiamalu.top/image-20231020214954079.png" alt="image-20231020214954079" style="zoom:80%;margin:0 auto" />

更重要的是，不像 `延迟线存储器`  磁芯存储器能随时访问 **任何** 一位(bit)。

`磁芯存储器` 从 1950 年代中期开始成为主流，流行了 20 多年，而且一般还是 **手工编织** 的！

<img src="http://niu.ochiamalu.top/image-20231020215049030.png" alt="image-20231020215049030" style="zoom:80%;margin:0 auto" />

刚开始时 存储成本大约 1 美元 1 位(bit) ，到1970年代，下降到 1 美分左右，不幸的是，即使每位 1 美分也不够便宜。

之前提过，现代手机随便拍张照片都有 5 MB ，5MB 约等于 4000 万 bit，你愿意花 40 万美元在 `磁芯存储器` 上存照片吗？

## 磁带

当时对存储技术进行了大量的研究，到 1951 年，Eckert 和 Mauchly 创立了自己的公司，设计了一台叫 `UNIVAC`
的新电脑，最早进行商业销售的电脑之一，它推出了一种新存储：**磁带** （magnetic tape）。

<img src="http://niu.ochiamalu.top/image-20231020215148812.png" alt="image-20231020215148812" style="zoom:80%;margin:0 auto" />

磁带是纤薄柔软的一长条磁性带子卷在轴上，磁带可以在 `磁带驱动器` 内前后移动。

里面有一个 `写头` 绕了电线，电流通过产生磁场，导致磁带的 **一小部分** 被磁化，电流方向决定了极性，代表 1 和 0 。

还有一个 `读头` ，可以 **非破坏性** 地检测极性。

<img src="http://niu.ochiamalu.top/image-20231020215243252.png" alt="image-20231020215243252" style="zoom:80%;margin:0 auto" />

UNIVAC 用了半英寸宽，8 条并行的磁带，磁带每英寸可存 128 位数据，每卷有 1200 英尺长，意味着一共可以存 1500 万位左右，接近2兆字节！（2
MB）。

<img src="http://niu.ochiamalu.top/image-20231020215319525.png" alt="image-20231020215319525" style="zoom:80%;margin:0 auto" />

虽然磁带驱动器很贵，但磁带又便宜又小，因此磁带 <u>至今仍用于存档</u> 。

磁带的主要缺点是 **访问速度** ，磁带是连续的，必须倒带或快进到达特定位置，可能要几百英尺才能得到某个字节(byte)，这很慢。

<img src="http://niu.ochiamalu.top/image-20231020215347109.png" alt="image-20231020215347109" style="zoom:80%;margin:0 auto" />

## 磁鼓存储器

1950、60年代，有个类似技术是 `磁鼓存储器` ，有金属圆筒，盖满了磁性材料以记录数据，滚筒会持续旋转，周围有数十个读写头，等滚筒转到正确的位置读写头会读或写
1 位(bit) 数据，为了尽可能缩短延迟, 鼓轮每分钟上千转！

<img src="http://niu.ochiamalu.top/image-20231020215409131.png" alt="image-20231020215409131" style="zoom:80%;margin:0 auto" />

到 1953 年，磁鼓技术飞速发展，可以买到存 80,000 位的 `磁鼓存储器` ，也就是 10 KB，但到 1970 年代 `磁鼓存储器` 不再生产。

## 硬盘

然而，磁鼓导致了 `硬盘` （hard disk）的发展，硬盘和磁鼓很相似，不过硬盘用的是盘，不像磁鼓用圆柱体，因此得名。

原理是一样的，磁盘表面有 **磁性** ，写入头和读取头 可以处理上面的 1 和 0，硬盘的好处是薄，可以 **叠在一起** ，提供更多表面积来存数据。

<img src="http://niu.ochiamalu.top/image-20231020215923691.png" alt="image-20231020215923691" style="zoom:67%;margin:0 auto" />

:::danger

不要把磁铁放在硬盘附近！

:::

IBM 对世上第一台磁盘计算机 `RAMAC 305` 就是这样做的。

它有 50 张 24 英寸直径的磁盘，总共能存 5 MB 左右。太棒啦！终于能存一张现代手机的照片了！这年是 1956 年。

要访问某个特定 bit，一个读/写磁头会向上或向下移动，找到正确的磁盘，然后磁头会滑进去，就像磁鼓存储器一样，磁盘也会 **高速旋转
** ，所以读写头要等到正确的部分转过来，`RAMAC 305` 访问任意数据，平均只要六分之一秒左右，也叫 `寻道时间` （seek time）。

<img src="http://niu.ochiamalu.top/image-20231020215523755.png" alt="image-20231020215523755" style="zoom:80%;margin:0 auto" />

虽然六分之一秒对存储器来说算不错，但对内存来说还不够快，所以 `RAMAC 305` 还有 `磁鼓存储器` 和 `磁芯存储器` 。

### 内存层次结构

这是 `内存层次结构` 的一个例子：一小部分高速 + 昂贵的内存，一部分稍慢 + 相对便宜些的内存，还有更慢 +
更便宜的内存，这种混合在成本和速度间取得平衡。

<img src="http://niu.ochiamalu.top/image-20231020215642741.png" alt="image-20231020215642741" style="zoom:80%;margin:0 auto" />

1970 年代，硬盘大幅度改进并变得普遍，如今的硬盘可以轻易容纳 1TB 的数据，每 bit 成本 0.0000000005 美分，比磁芯内存 1 美分 1
bit 好多了，另外，现代硬盘的平均寻道时间低于 1/100 秒。

## 软盘

简单地提一下硬盘的亲戚，`软盘` （floppy disk），除了磁盘是软的，其他基本一样，你可能见过某些程序的保存图标是一个软盘，软盘曾经是真实存在的东西！

<img src="http://niu.ochiamalu.top/image-20231020215959570.png" alt="image-20231020215959570" style="zoom:80%;margin:0 auto" />

软盘是为了便携，在 1970~1990 非常流行，密度更高的软盘，如 `Zip Disks` ，在90年代中期流行起来，但十年内就消失了。

<img src="http://niu.ochiamalu.top/image-20231020215728714.png" alt="image-20231020215728714" style="zoom:80%;margin:0 auto" />

## CD 和 DVD

光学存储器于 1972 年出现，12 英寸的 `激光盘` （laser disc），你可能对后来的产品更熟：`光盘` （Compact Disk），简称 **CD** ，以及
90 年代流行的 DVD 。

<img src="http://niu.ochiamalu.top/image-20231020220023895.png" alt="image-20231020220023895" style="zoom:50%;margin:0 auto" />

:::tip CD 和 DVD 的区别

1. 记录模式不同。CD和DVD是两种技术标准，从碟片的生产到刻录是不同的系统模式和工具。

2. 记录用的激光波长不同，不能通用。

3. 记录密度不同。普通CD的容量为700M，普通DVD的容量为4.7G。

4. 用途不同。CD用于VCD、SVCD等视频和音乐CD以及数据记录，DVD用于DVD、MP3等视频和数据记录。

5. 价格不同。普通CD的价格在1元左右，普通DVD的价格在2元左右。

6. 刻录工具不同。刻录CD碟用CD-RW刻录机。刻录DVD碟和CD碟用DVD-RW刻录机。但CD-RW刻录机不能刻DVD碟。

:::

功能和硬盘软盘一样，都是存数据，但用的不是磁性，光盘表面有很多小坑，造成光的 **不同反射** ，光学传感器会捕获到，并解码为 1 和
0 。

<img src="http://niu.ochiamalu.top/image-20231020215754797.png" alt="image-20231020215754797" style="zoom:80%;margin:0 auto" />

## 固态硬盘

如今，存储技术在朝 **固态** 前进，没有机械活动部件，比如这个硬盘，以及 U 盘，里面是 **集成电路** 。

<img src="http://niu.ochiamalu.top/image-20231020220156917.png" alt="image-20231020220156917" style="zoom: 50%;margin:0 auto" />

第一个 RAM 集成电路出现于 1972 年成本每比特 1 美分，使 `磁芯存储器` 迅速过时，如今成本下降了更多机械硬盘 被 `固态硬盘`
（Solid State Drives） 逐渐替代，简称 **SSD** 。

由于 SSD 没有移动部件，磁头不用等磁盘转，所以 SSD 访问时间低于 1/1000 秒，但还是比 RAM
慢很多倍，所以现代计算机仍然用 `存储层次结构` 。

我们从 1940 年代到现在进步巨大，内存和存储技术也有类似 **摩尔定律** 的趋势，从早期每 MB 成本上百万美元，下滑到 2000
年只要几分钱，如今远远低于 1 分钱。

::: tip

目前 m.2 固态硬盘 1TB 仅需 200 人民币。

:::
