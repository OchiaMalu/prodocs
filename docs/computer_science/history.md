# 计算机科学入门

## 计算机的早期历史

### 算盘

公认最早的计算设备是**算盘**，发明于“美索不达尼亚”，大约公元前2500年。

> 现在是伊拉克、土耳其、伊朗等国的地盘。

当时人们在泥板上挖出几条沟，沟和沟之间放上石头，不同沟里的石头代表不同的数量级，比如第一行的石头
一就是是一，二就是二，第二行的石头一个代表十，第三行的石头一个代表一百……

<img src="http://niu.ochiamalu.xyz/image-20231003174013717.png" alt="image-20231003174013717" style="zoom:80%;margin:0 auto" />

但是有人认为这种 “算盘” **只能记不能算**，不能算是 “算盘” 。而中国算盘有 “**珠算口诀**” ，所以中国算盘才算是第一个算盘。

> 加法口诀：
>
>一：一上一 一下五去四 一去九进一
>
>二：二上二 二下五去三 二去八进一
>
>三：三上三 三下五去二 三去七进一
>
>四：四上四 四下五去一 四去六进一
>
>五：五上五 五去五进一
>
>六：六上六 六去四进一 六上一去五进一
>
>七：七上七 七去三进一 七上二去五进一
>
>八：八上八 八去二进一 八上三去五进一
>
>九：九上九 九去一进一 九上四去五进一

在接下来的4000年，人类发明了各种各样的计算设备，如：<u>星盘、计算尺、时钟</u>。

<img src="http://niu.ochiamalu.xyz/image-20231003175405450.png" alt="image-20231003175405450" style="zoom:50%;" /><img src="http://niu.ochiamalu.xyz/image-20231003175431557.png" alt="image-20231003175431557" style="zoom: 67%;" />、

这些设备让原先很费力的事变得更快、更简单、更精确，降低了门槛，加强了我们的能力。

> 随着知识的增长和新工具的诞生，人工劳力会越来越少。——Charles Babbage

最早出现“计算机”一词的文献是来自1613年的一本书《The Yong Mans Gleaning》，作者是Richard
Braithwait。但它指的并不是计算机，而是负责计算的人，这个职业一直到1800年还存在。

### 步进计算器

步进计算器的发明者是**戈特弗里德·威廉·莱布尼茨**，没错就是那个求高阶导，莱布尼兹公式的莱布尼兹。
$$
(uv)^{(n)}=\sum_{k=0}^nC_n^ku^{(n-k)}v^{(k)}
$$

> 他7岁就开始学习大学课程——哲学，以及神学，
> 13岁可以一天作诗300首，还是拉丁文，
> 15岁时，莱布尼茨进入德国莱比锡大学，
> 然后一年半拿下哲学学士学位，14个月斩获硕士学位，
> 紧接着又攻读法学，
> 19岁便成为了哲学教授，同时申请法学博士。

见识了帕斯卡的“加法器”之后他发现加法器还有很大的改进空间，完全可以四则运算。

于是他设计出了这个东西：

<img src="http://niu.ochiamalu.xyz/image-20231003181708870.png" alt="image-20231003181708870" style="zoom:80%;margin:0 auto" />

有了“阶梯滚轮”的加持， 可以实现加法运算的不断叠加， 从而实现乘法运算；

> 比如：5*3 = 5 + 5 + 5

反之，不断地减也能实现除法运算。

> 比如：16÷5 = 16 - 5 - 5 - 5……
> 直到减不动了，剩个1，
> 就得到了16=5×3+1

不断地加，步步递进，称之为“步进”，所以他把新版设备被称为“步进计算器”，俗称“乘法器”。

> “阶梯滚轮”也被称为“莱布尼茨轮”，影响了机械计算设备的发展达3个世纪，一直用到1970年代，被电子计算器取代。

但是这种办法遇到大数字的时候就很慢，这时候出现了**计算表**（pre-computed table）。

你可以直接查出你想要的答案。

<img src="http://niu.ochiamalu.xyz/image-20231003182520783.png" alt="image-20231003182520783" style="zoom:80%;margin:0 auto" />

这种方法就相当于我们计算机中不变的真理：<u>空间换时间，时间换空间</u>。

### 差分机

1819年，英国科学家 Charles Babbage 设计“差分机”,并于 1822 年制造出可动模型。这台机器能提高乘法速度和改进对数表等数字表的精确度，但是
**并没有完成**。

1991年，为纪念巴贝奇诞辰200周年，伦敦科学博物馆制作了完整差分机，它包含4000多个零件，重2.5吨。

<img src="http://niu.ochiamalu.xyz/image-20231003183037218.png" alt="image-20231003183037218" style="zoom:80%;margin:0 auto" />

### 分析机

Charles Babbage 在设计差分机时发现差分机不好用，于是便开始设计分析机，它区别于以前的任何计算设备，你可以给它数据，让它进行一系列操作，但是它依旧
**没有完成**。但是，“机器可以自动完成一系列操作”这一概念时跨时代的，预示着计算机程序的诞生。

分析机采用的一些计算机思想延用至今。分析机包括的存储和碾磨，就非常类似于今天计算机中采用的内存和处理器。输入和输出都采用*
*打孔卡**（十九世纪Jacquard发明的一种卡片）进行。Charles Babbage 在1834年开始进行分析机的研究工作。当时，分析机的出现并没有带来石破天惊的震撼，也没有被广泛的接受。

一直要到1890年，同样利用打洞卡为基础，美国统计学家赫曼·霍勒瑞斯（HermanHollerith）因应**美国人口普查局**
的需要所发明的电动制表机（Electric Tabulating Machine），在这之后他创立了制表机器公司，这家公司后来在1924年与其他机械制造商合并，成为了人称
**蓝色巨人**的传奇公司，也就是国际商业机器公司或万国商业机器公司，简称**IBM**。

<img src="http://niu.ochiamalu.xyz/image-20231003184432034.png" alt="image-20231003184432034" style="zoom:80%;margin:0 auto" />
