# 计算机科学入门

上次我们讲了 `数据存储` ， `磁带` 和 `硬盘`
这样的技术，可以在断电状态长时间存上万亿个位，非常合适存一整块有关系的数据，或者说 `文件` （file）。

你肯定见过很多种文件比如 `文本文件` ， `音乐文件` ， `照片` 和 `视频` ，今天，我们要讨论文件到底是什么，以及计算机怎么管理文件。

随意排列文件数据完全没问题，但按格式排会更好，这叫 `文件格式` （file format）。

你可以发明自己的文件格式，程序员偶尔会这样做，但最好用现成标准，比如 **JPEG** 和 **MP3** 。

## 文本文件

来看一些简单文件格式，最简单的是文本文件，也叫 TXT 文件, 里面包含的是 **文字** ，就像所有其它文件，文本文件只是一长串二进制数，原始值看起来会像这样：

<img src="http://niu.ochiamalu.fun/image-20231021175153566.png" alt="image-20231021175153566" style="zoom:80%;margin:0 auto" />

可以转成十进制看，但帮助不大，解码数据的关键是 **ASCII** 编码，一种字符编码标准。

<img src="http://niu.ochiamalu.fun/image-20231021175204039.png" alt="image-20231021175204039" style="zoom:80%;margin:0 auto" />

第一个值 72 在 ASCII 中是大写字母 H ，以此类推解码其他数字。

## 音频

来看一个更复杂的例子： `波形` (Wave)文件，也叫 **WAV** 它存音频数据，比如 `码率` (bit rate)，以及是 **单声道** 还是 **立体声
** ，关于数据的数据，叫 `元数据`  (meta data)。

元数据存在文件开头，在实际数据前面，因此也叫 `文件头` (Header)，WAV 文件的前 44 个字节长这样。

<img src="http://niu.ochiamalu.fun/image-20231021175256039.png" alt="image-20231021175256039" style="zoom:80%;margin:0 auto" />

有的部分总是一样的，比如写着 WAVE 的部分，其他部分的内容，会根据数据变化， **音频数据** 紧跟在 **元数据**
后面，是一长串数字，数字代表 <u>每秒捕获多次的声音幅度</u> 。

<img src="http://niu.ochiamalu.fun/image-20231021175325720.png" alt="image-20231021175325720" style="zoom:80%;margin:0 auto" />

> 扬声器通过震动发出声音。

举个例子，看一下 `你好` 的波形。

<img src="http://niu.ochiamalu.fun/image-20231021175359544.png" alt="image-20231021175359544" style="zoom:80%;margin:0 auto" />

现在捕获到了一些声音，我们放大看一下，电脑和手机麦克风，每秒可以对声音进行上千次采样，每次采样可以用一个数字表示，声压越高数字越大，也叫 `振幅`
（amplitude）。

<img src="http://niu.ochiamalu.fun/image-20231021175432484.png" alt="image-20231021175432484" style="zoom:80%;margin:0 auto" />

WAVE 文件里存的就是这些数据，每秒上千次的振幅！

<img src="http://niu.ochiamalu.fun/image-20231021175521850.png" alt="image-20231021175521850" style="zoom:80%;margin:0 auto" />

播放声音文件时，扬声器会产生相同的波形。

## 图片

现在来谈谈 `位图` (Bitmap)，后缀 **.bmp** , 它存图片，计算机上，图片由很多个叫 `像素` 的方块组成。

每个像素由三种颜色组成：<u>红，绿，蓝</u> ，叫 `加色三原色` ，混在一起可以创造其它颜色。

就像 WAV 文件一样，BMP 文件开头也是元数据，有 `图片宽度` ，`图片高度` ，`颜色深度` 。

<img src="http://niu.ochiamalu.fun/image-20231021175543063.png" alt="image-20231021175543063" style="zoom: 80%;margin:0 auto" />

举例，假设元数据说图是 4像素宽 x 4像素高，颜色深度 24 位， 8 位红色，8 位绿色，8 位蓝色，8位 (bit) 和 1字节(byte)
是一回事，一个字节能表示的最小数是 0，最大 255。

图像数据看起来会类似这样。

<img src="http://niu.ochiamalu.fun/image-20231021175655407.png" alt="image-20231021175655407" style="zoom:80%;margin:0 auto" />

来看看第一个像素的颜色，红色是 255 ，绿色是 255 ，蓝色也是 255 ，这等同于全强度红色，全强度绿色和全强度蓝色。

<img src="http://niu.ochiamalu.fun/image-20231021175732134.png" alt="image-20231021175732134" style="zoom:150%;margin:0 auto" />

混合在一起变成白色，所以第一个像素是白色！

<img src="http://niu.ochiamalu.fun/image-20231021175744981.png" alt="image-20231021175744981" style="zoom:150%;margin:0 auto" />

下一个像素的红绿蓝值，或 **RGB** 值 255,255,0 是黄色！

下一个像素是 0,0,0 ，黑色。

下一个是黄色。

<img src="http://niu.ochiamalu.fun/image-20231021175808240.png" alt="image-20231021175808240" style="zoom:80%;margin:0 auto" />

因为元数据说图片是 4x4 我们知道现在到了第一行结尾，所以换一行。

下一个 RGB 值是 255,255,0，又是黄色。

好，我们读完剩下的像素，一个低像素的吃豆人。

<img src="http://niu.ochiamalu.fun/image-20231021175828549.png" alt="image-20231021175828549" style="zoom:80%;margin:0 auto" />

## 文件系统

### 平面文件系统

再次强调，不管是文本文件，WAV，BMP，或是我们没时间讨论的其他格式，文件在底层全是一样的： <u>一长串二进制</u> 。

为了知道文件是什么，文件格式至关重要，现在你对文件更了解了，我们接下来讨论计算机怎么存文件。

虽然硬件可能是磁带，磁鼓，磁盘或集成电路，通过软硬件抽象后，可以看成一排能存数据的桶。

<img src="http://niu.ochiamalu.fun/image-20231021175951225.png" alt="image-20231021175951225" style="zoom:80%;margin:0 auto" />

在很早期时，计算机只做一件事，比如算火炮射程表，整个储存器就像一整个文件，数据从头存到尾，直到占满。

<img src="http://niu.ochiamalu.fun/image-20231021175937206.png" alt="image-20231021175937206" style="zoom:80%;margin:0 auto" />

但随着计算能力和存储容量的提高，存多个文件变得非常有用，最简单的方法是把文件 **连续存储** 。

<img src="http://niu.ochiamalu.fun/image-20231021180015569.png" alt="image-20231021180015569" style="zoom:80%;margin:0 auto" />

这样能用，但怎么知道文件开头和结尾在哪里？储存器没有文件的概念，只是存储大量 **位** ，所以为了存多个文件，需要一个 **特殊文件
** ，记录其他文件的位置，这个特殊文件有很多名字，这里泛称 `目录文件` （Directory File）。

<img src="http://niu.ochiamalu.fun/image-20231021180037718.png" alt="image-20231021180037718" style="zoom:80%;margin:0 auto" />

这个文件经常存在最开头，方便找，位置 0！

目录文件里，存所有其他文件的名字，格式是 `文件名 + 一个句号 + 扩展名` ，比如 **BMP** 或 **WAV** 。

<img src="http://niu.ochiamalu.fun/image-20231021180056096.png" alt="image-20231021180056096" style="zoom:80%;margin:0 auto" />

扩展名帮助得知文件类型，目录文件还存文件的 **元数据** ，比如`创建时间`，`最后修改时间`，`文件所有者是谁`，是否能 `读/写`
或 `读写都行` 。

最重要的是，目录文件有文件 **起始位置** 和 **长度** 。

<img src="http://niu.ochiamalu.fun/image-20231021180123064.png" alt="image-20231021180123064" style="zoom:80%;margin:0 auto" />

如果要添加文件，删除文件，更改文件名等，必须 **更新** 目录文件。

就像书的目录，如果缩短或移动了一个章节，要更新目录，不然页码对不上。

目录文件，以及对目录文件的管理，是一个非常简单的 **文件系统** 例子，文件系统专门负责管理文件，刚刚的例子叫 `平面文件系统`
（Flat File System），因为文件都在 **同一个层次** 。

当然，把文件前后排在一起有个 **问题** ，如果给 todo.txt 加一点数据会 **覆盖** 掉后面 carrie.bmp 的一部分，所以现代文件系统会做两件事。

<img src="http://niu.ochiamalu.fun/image-20231021180213329.png" alt="image-20231021180213329" style="zoom:80%;margin:0 auto" />

1. 把空间划分成一块块，导致有一些 `预留空间` 可以方便改动，同时也方便管理。用这样的方案，目录文件要记录文件在哪些块里。

<img src="http://niu.ochiamalu.fun/image-20231021180228983.png" alt="image-20231021180228983" style="zoom:80%;margin:0 auto" />

1. 拆分文件，存在多个块里。假设打开 todo.txt 加了些内容，文件太大存不进一块里，我们不想覆盖掉隔壁的块，所以文件系统会分配 一个
   **没使用的块** ，容纳额外的数据。

目录文件会记录不止一个块，而是多个块，只要分配块，文件可以轻松增大缩小，这听起来很像 `虚拟内存` （Virtual Memory）。

<img src="http://niu.ochiamalu.fun/image-20231021180337080.png" alt="image-20231021180337080" style="zoom:80%;margin:0 auto" />

假设想删掉 carrie.bmp ，只需要在目录文件删掉那条记录，让一块空间变成了可用。

<img src="http://niu.ochiamalu.fun/image-20231021180403730.png" alt="image-20231021180403730" style="zoom:80%;margin:0 auto" />

注意这里没有 **擦除数据** ，只是把记录删了，之后某个时候，那些块会被新数据 **覆盖** ，但在此之前，数据还在原处。

::: tip

这也是为什么有些文件删除可以被 **恢复** 。

:::

### 碎片整理

假设往 todo.txt 加了更多数据，所以操作系统分配了一个新块，用了刚刚 carrie.bmp 的块，现在 todo.txt 在 3
个块里，隔开了，顺序也是乱的，这叫 `碎片` （fragmentation）。

碎片是增/删/改文件导致的，不可避免，对很多存储技术来说，碎片是坏事，如果 todo.txt 存在磁带上，读取文件要先读块 1 ， 然后快进到块
5 ，然后往回转到块 2 ，来回转个半天。

现实世界中，大文件可能存在数百个块里，你可不想等五分钟才打开文件，答案是 `碎片整理` （defragmentation）。

这个词听起来好像很复杂，但实际过程很简单，计算机会把数据来回移动，排列成正确的顺序，整理后 todo.txt 在 1 2 3，方便读取。

<img src="http://niu.ochiamalu.fun/image-20231021180612986.png" alt="image-20231021180612986" style="zoom:80%;margin:0 auto" />

<br/>

<img src="http://niu.ochiamalu.fun/image-20231021180632616.png" alt="image-20231021180632616" style="zoom:80%;margin:0 auto" />

### 分层文件系统

目前只说了平面文件系统，文件都在同一个目录里，如果存储空间不多，这可能就够用了，因为只有十几个文件。

但内存容量爆炸式增长，文件数量也飞速增长，很快，所有文件都存在同一层变得不切实际，就像现实世界相关文件放在同一个文件夹会方便很多，然后文件夹套文件夹。

<img src="http://niu.ochiamalu.fun/image-20231021180744151.png" alt="image-20231021180744151" style="zoom:80%;margin:0 auto" />

这叫 `分层文件系统` （Hierarchical File System），实现方法有很多种，最大的变化是 <u>目录文件不仅要指向文件,
还要区分目录</u> 。

<img src="http://niu.ochiamalu.fun/image-20231021180807666.png" alt="image-20231021180807666" style="zoom:80%;margin:0 auto" />

我们需要额外 **元数据**  来区分开 `文件` 和 `目录` 。

这个目录文件在最顶层，因此叫 `根目录` （Root Directory），所有其他文件和文件夹，都在根目录下，图中可以看到根目录文件有 3 个文件，2
个子文件夹：`音乐` 和 `照片` 。

如果想知道 `音乐` 文件夹里有什么，必须去那边读取目录文件（格式和根目录文件一样）。

<img src="http://niu.ochiamalu.fun/image-20231021180854696.png" alt="image-20231021180854696" style="zoom:80%;margin:0 auto" />

除了能做无限深度的文件夹，这个方法也让我们可以轻松移动文件，如果想把 theme.wav 从根目录移到音乐目录，不用移动任何数据块，只需要改两个目录文件，一个文件里
**删一条记录** ，另一个文件里 **加一条记录** ，theme.wav **依然** 在块 5 。

<img src="http://niu.ochiamalu.fun/image-20231021180922681.png" alt="image-20231021180922681" style="zoom:80%;margin:0 auto" />

文件系统使我们不必关心文件在磁带或磁盘的 **具体位置** ，整理和访问文件更加方便。
