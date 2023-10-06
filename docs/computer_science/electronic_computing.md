# 计算机科学入门

## 电子计算机

20 世纪初当时的早期计算设备都针对特定用途 比如 **制表机** 大大推进了政府和企业，然而人们需要处理的数据越来越多，对性能的要求越来越大，人们需要更强的算力。

最大的机电计算机之一是**马克一号**，IBM 在 1944 完成建造，采用全继电器，长51英尺、高8英尺，看上去像一节列车，有750000个零部件，里面的各种导线加起来总长500英里。

<img src="http://niu.ochiamalu.xyz/image-20231003213639421.png" alt="image-20231003213639421" style="zoom:80%;margin:0 auto" />

<u>什么是继电器？</u>

继电器是：用电控制的机械开关，继电器里，有根"控制线路"，控制电路是开还是关，"控制线路" 连着一个线圈，当电流流过线圈，线圈产生电磁场，吸引金属臂，从而闭合电路。

<img src="http://niu.ochiamalu.xyz/image-20231003213800704.png" alt="image-20231003213800704" style="zoom:80%;margin:0 auto" />

相信大家在初中都做过这个题目，这就是电磁继电器。

> 以右手握住线圈，四指指向导线上电流的方向，则大拇指所指即为磁力线方向。——右手定则

它同时也存在很多问题：

- 继电器内的机械臂**有质量**，因此无法快速开关

- 齿轮磨损

1947年9月，哈佛马克2型的操作员从故障继电器中，拔出一只死虫。

> 从那时起，每当电脑出了问题，我们就说它出了 **bug**（虫子）。——Grace Hopper

我们需要一个新的东西来代替继电器。

## 电子管

### 真空二极管

在 1904 年，英国物理学家 "约翰·安布罗斯·弗莱明"，开发了一种新的电子组件，叫"热电子管"
，把两个电极装在一个气密的玻璃灯泡里，这是世界上第一个真空管。其中一个电极可以加热，从而发射电子，这叫 "热电子发射"
，另一个电极会吸引电子，形成"电龙头"
的电流，但只有带正电才行，如果带负电荷或中性电荷，电子就没办法被吸引，越过真空区域，因此没有电流。<u>
电流只能单向流动的电子部件叫 "**二极管**"</u>。

<img src="http://niu.ochiamalu.xyz/image-20231003223144834.png" alt="image-20231003223144834" style="zoom:50%;margin:0 auto" />

### 真空三极管

但我们需要的是，一个能开关电流的东西。幸运的是，不久之后在 1906 年，美国发明家 "李·德富雷斯特"，他在"弗莱明"
设计的两个电极之间，加入了<u>第三个 "控制" 电极</u>，向"控制"电极施加正电荷，它会允许电子流动；但如果施加负电荷，它会阻止电子流动。因此通过控制线路，可以断开或闭合电路。

虽然和继电器的功能一样，但他的好处更多：

- 快速开关，每秒上千次
- 没有会动的组件，更少的磨损

自从1904年弗莱明发明*真空二极管*，1906年德福雷斯特发明*真空三极管*以来，电子学作为一门新兴学科迅速发展起来。

计算机进入**电子管计算机时代**。

<img src="http://niu.ochiamalu.xyz/image-20231003223209769.png" alt="image-20231003223209769" style="zoom:50%;margin:0 auto" />

## 第一台通用计算机

阿塔纳索夫-贝瑞计算机（Atanasoff–Berry Computer，通常简称**ABC计算机**），不可编程，仅仅设计用于求解线性方程组。莫齐利和艾克特借鉴并发展了他的思想制成了第一台数字电子计算机
**ENIAC**。但ENIAC的设计思想实际上是来源于阿塔纳索夫在此之前的设计：可重复使用的内存、逻辑电路、基于二进制运、用电容作存储器。

1973年，美国联邦地方法院判决撤销了ENIAC的专利，并得出结论：ENIAC的发明者是从阿塔纳索夫那里继承了电子数字计算机的主要设计构想。因此，ABC被认定为世界上第一台计算机。

<img src="http://niu.ochiamalu.xyz/image-20231003221505092.png" alt="image-20231003221505092" style="zoom:50%;" />

Electronic Numerical Integrator and Calculator简称ENIAC， 1946 年，在"宾夕法尼亚大学"完成建造。ENIAC 每秒可执行 5000
次十位数加减法，因为真空管很多，所以故障很常见。

<img src="http://niu.ochiamalu.xyz/image-20231003221708478.png" alt="image-20231003221708478" style="zoom:50%;" />

## 晶体管

为了降低成本和大小，同时提高可靠性和速度，我们需要一种新的电子开关，1947 年，贝尔实验室科学家发明了晶体管。

晶体管有两个电极，电极之间有一种材料隔开它们，这种材料有时候导电，有时候不导电，这叫"**半导体**"。控制线连到一个 "门"
电极，通过  <u>改变 "门" 的电荷</u> ，我们可以控制半导体材料的导电性。

- 响应速度快
- 准确性高
- 可量产
- 可小型化
- 低成本

计算机进入**晶体管计算机时代**。

很多晶体管和半导体的开发在"圣克拉拉**谷**"，而生产半导体最常见的材料是 "**硅**"，所以这个地区被称为 "**硅谷**"。

2023年，荷兰科学家研制出了首个由单元素组成的二维（2D）拓扑绝缘体锗烯，这些晶体管可以取代电子设备中的传统晶体管，使电子设备*
*不再发热**。
