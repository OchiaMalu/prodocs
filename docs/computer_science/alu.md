<script setup>
import CustomLink from '../.vitepress/components/CustomLink.vue'
</script>

# 计算机科学入门

## 算术逻辑单元

计算机发明的初衷正是算数，而计算机的算数模块我们称为 **算术逻辑单元** （Arithmetic and Logic Unit），简称 ALU 。

ALU 是计算机的数学大脑，计算机里负责运算的组件基本其他所有部件都用到了它。

<img src="http://niu.ochiamalu.xyz/image-20231005194945570.png" alt="image-20231005194945570" style="zoom: 80%;margin:0 auto" />

上图为第一个封装在单个芯片内的完整 ALU —— 英特尔 74181。

ALU 有 2 个单元，1 个算术单元和 1 个逻辑单元，为了实现它用了大约 70 个逻辑门，但不能进行乘除，但它向 **小型化**
迈出了一大步，让计算机可以更强大更便宜。

<img src="http://niu.ochiamalu.xyz/image-20231005204640192.png" alt="image-20231005204640192" style="zoom:50%;margin:0 auto" />

## 算术单元

### 半加器

它负责计算机里的所有数字操作，比如加减法。

它还做很多其他事情，比如给某个数字 +1 ，这叫 **增量运算** （increment operation）。

如果我们要将两个二进制相加，也就是 0+0=0 ， 1+0=1 ， 1+1=10 。这里有个逻辑门跟我们的要求很像。

| 输入A             | 输入B             | 输出Y              |
|-----------------|-----------------|------------------|
| False           | False           | False            |
| False           | True            | True             |
| True            | False           | True             |
| <u>**True**</u> | <u>**True**</u> | **<u>False</u>** |

没错就是 **异或门** 。

<img src="http://niu.ochiamalu.xyz/image-20231005180746567.png" alt="image-20231005180746567" style="zoom:80%;margin:0 auto" />

但是当 1+1 时我们需要 **进位** ，因此我们还需要另一个输出。

<img src="http://niu.ochiamalu.xyz/image-20231005195835962.png" alt="image-20231005195835962" style="zoom:80%;margin:0 auto" />

很好，这样就能表示 1+1=10 了，一个异或门+与门这样的结构我们称之为 **半加器** （half adder），是实现两个一位二进制数的加法运算电路。

<img src="http://niu.ochiamalu.xyz/image-20231005200045053.png" alt="image-20231005200045053" style="zoom: 80%;margin:0 auto" />

### 全加器

半加器是实现两个 **一位** 二进制数的加法，那如果我们需要一位以上的二进制数相加呢？

一个半加器可以输出一个结果和一个余数。

我们只需要将第一个半加器的结果作为第二个半加器的其中一个输入即可。

<img src="http://niu.ochiamalu.xyz/image-20231005200449567.png" alt="image-20231005200449567" style="zoom:50%;margin:0 auto" />

这时候我们需要一个或门来判断是剩下的余数是 1 还是 0 。

<img src="http://niu.ochiamalu.xyz/image-20231005200645543.png" alt="image-20231005200645543" style="zoom:50%;margin:0 auto" />

像这样的结构，我们称之为 **全加器** （full adder）。

<img src="http://niu.ochiamalu.xyz/image-20231005200815694.png" alt="image-20231005200815694" style="zoom:50%;margin:0 auto" />

### 八位行波进位加法器

当我们将两个 8 位二进制数相加时，前两位只需要用 **半加器** 就可以做到，后面的我们需要使用 **全加器** 。

<img src="http://niu.ochiamalu.xyz/image-20231005201401260.png" alt="image-20231005201401260" style="zoom:50%;margin:0 auto" />

横向的图不是很好看，我们将它翻转 90° 。

<img src="http://niu.ochiamalu.xyz/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-10-05%20201521.jpg" alt="屏幕截图 2023-10-05 201521" style="zoom:50%;margin:0 auto" />

你想到了什么？

这不就是小学老师教的 **竖式** 吗？

<img src="http://niu.ochiamalu.xyz/image-20231005202006019.png" alt="image-20231005202006019" style="zoom:50%;margin:0 auto" />

只不过将逢十进一的规则改成了 **逢二进一** 。

像这样两个 8 位二进制数相加的设备，我们叫它 **8 位行波进位加法器** 。

> 英特尔 74181 只能进行 4 位运算。

#### Logisim

可以使用 *Logisim* 来设计和仿真电路。

<CustomLink href='https://github.com/logisim-evolution/logisim-evolution' title='Logisim'/>

可以用它来搭一个 **八位行波进位加法器** 。

<img src="http://niu.ochiamalu.xyz/image-20231005204351446.png" alt="image-20231005204351446" style="zoom:80%;margin:0 auto" />

### 溢出

两个数字的和太大了，超过了用来表示的位数，这就叫 **溢出** （overflow）。

> 吃豆人用 8 位存当前关卡数，如果你玩到了第 256 关，ALU 会溢出，造成一连串错误和乱码，使得该关卡无法进行。

我们可以加更多全加器，可以操作 16 或 32 位数字，让溢出更难发生，但代价是更多逻辑门。

另外一个缺点是，每次进位都要一点时间，当然时间不久，因为电子移动的很快，但如今的量级是每秒几十亿次运算，所以会造成影响，所以，现代计算机用的加法电路有点不同，叫  "
**超前进位加法器**" 。

### ALU的其他运算

ALU的算术单元一般支持 8 种操作。

- 加法
- 带进位的加法
- 减法
- 带借位的减法
- 翻转符号
- 增量
- 减量
- 无改变

这其中没有 `乘法` 和 `除法`，因为乘法就是 **多次相加** ，除法就是 **多次相减**  ，简单的处理器没有专门处理的算术单元。

## 逻辑单元

ALU 还可以做一些逻辑操作，比如测试一些数字中有没有 1 。

<img src="http://niu.ochiamalu.xyz/image-20231005203542545.png" alt="image-20231005203542545" style="zoom:50%;margin:0 auto" />

在这个系统中，只有当所有的输入全为 0 ，最后的输出才是 0 。

## 抽象化

英特尔 74181 需要大约 70 个逻辑门，它仅支持 4 位运算，而 8 位运算则需要数百个逻辑门，这太复杂了，因此人们用一个符号代表
ALU 。

<img src="http://niu.ochiamalu.xyz/image-20231005205330702.png" alt="image-20231005205330702" style="zoom:50%;margin:0 auto" />

它分为四个部分： <u>输入、输出、操作码、标志</u> 。

操作码是用来告诉 ALU 进行什么操作，如：加法、减法。它是 4 位的数字，可以是 1000 ，也可以是 1100 等。

标志用来 **校对** ：

如果在最后一位还有进位，那么 **溢出标志** 就会显示 True。

计算 1-1 ，其结果是 0 ，那么 **零标志** 就会显示 Ture。

如果计算结果小于 0 ，那么 负标志 就会显示 True。

高级的 ALU 还会有其他标志，但这三个是 ALU 普遍使用的。

