# 极限

## 极限的定义与性质

**数列极限的精准定义** ：

如果对任给的 $\varepsilon>0$ 形式，存在正整数 $N$ ，当 $n>N$ 时，有 $|x_n-a|<\varepsilon$ 成立，则称常数 $a$ 是数列
$\{x_n\}$ 的极限，或者称数列 $\{x_n\}$ 收敛于 $a$ ，记为 $\lim\limits_{n \to \infty} x_n = a$ ；否则，就称数列极限不存在，或者说数列是发散的。

**数列极限的通俗定义** ：

当项数 $n$ 无限变大时，有通项 $x_n$ 无限地接近某一确定的常数 $a$ ，则称常数 $a$ 是数列 $\{x_n\}$ 的极限，或者称数列
$\{x_n\}$ 收敛于 $a$ ，记为 $\lim\limits_{n \to \infty} x_n = a$ ；否则，就称数列极限不存在，或者说数列是发散的。

**数列极限的几何解释：**

即对于数列 $\{x_n\}$ 而言，从 $N$ 项开始后面所有的项都在 $a$ 的 $\varepsilon$ 邻域里面。

**数列与函数的关系** ：数列是项数 $n$ 与通项 $x_{n}$ 之间的对应关系。

### 函数极限定义

1. 自变量趋于无穷大时函数的极限

**精确定义** ：设函数 $f(x)$ ，当 $|x|$ 大于某一正数时有定义，如果存在常数 $A$ ，对于任意给定的正数 $\varepsilon$
（无论它多么的小），总存在正数 $M$ ，使得当 $x$ 满足不等式 $|x|>M$ 时，对应的函数值 $f(x)$ 都满足不等式 $|f(x)-A|<
\varepsilon$ ，那么常数 $A$ 就叫做函数 $f(x)$ 当 $x \to \infty$ 时的极限，记为$\lim\limits_{x \to \infty} f(x) = A$ 或 $f(
x)\to A$ （当 $x \to \infty$ ）。

**通俗定义** ：如果当 $|x|$ 无限接近于很大的正数 $M$ ，函数 $f(x)$ 的值无限接近于常数 $A$ ，那么常数 $A$ 就叫做函数 $f(x)$
当 $x \to \infty$ 时的极限，记为$\lim\limits_{x \to \infty} f(x) = A$ 或 $f(x)\to A$ （当 $x \to \infty$ ）。

**结论** ：$\lim\limits_{x \to \infty} f(x) = A \Leftrightarrow \lim\limits_{x \to +\infty} f(x) = A 且\lim\limits_{x \to
-\infty} f(x) = A$

**几何意义** ：

即当 $x \to \infty$ 时，函数 $f(x)$ 的图像逐渐靠近水平线 $y=A$ 。

2. 自变量趋于有限值时函数的极限

**精确定义** ：设 $f(x)$ 为定义在 $x_0$ 的某个去心邻域 $\mathring{U}(x_0)$ 内的函数，如果存在 $A$ ，对于任意给定的正数
$\varepsilon$ （无论他多么小），总存在正数 $\delta$ ，使得当 $x$ 满足不等式 $0<|x-x_0|<\delta$ 时，对应的函数值 $f(x)$ 都满足不等式
$|f(x)-A|<\varepsilon$ ，那么常数 $A$ 就叫做函数 $f(x)$ 当 $x \to x_0$ 时的极限，记为$\lim\limits_{x \to x_0} f(x) = A$ 或
$f(x)\to A$ （当 $x \to x_0$ ）。

我们指出，定义中的 $0<|x-x_0|$ 表示 $x\neq x_0$ ，<u>**所以 $x \to x_0$ 时 $f(x)$ 有没有极限，与 $f(x)$ 在点 $x_0$
是否有定义并无关系**</u>。

**通俗定义** ：如果当自变量 $x$ 无限接近于 $x_0$ ，函数 $f(x)$ 的值无限接近于常数 $A$ ，则称当 $x$ 趋于 $x_0$ 时，$f(x)$ 以
$A$ 为极限，记作$\lim\limits_{x \to x_0} f(x) = A$ 。

#### 单侧极限

若当自变量 $x$ 从 $x_0$ 左侧无限接近于 $x$ 时，函数 $f(x)$ 的值无限接近于常数 $A$ ，则常数 $A$ 叫做函数 $f(x)$ 当 $x \to
x_0$ 时的左极限，记作$\lim\limits_{x \to {x_0}^-} f(x) = A$ 。

若当自变量 $x$ 从 $x_0$ 右侧无限接近于 $x$ 时，函数 $f(x)$ 的值无限接近于常数 $A$ ，则常数 $A$ 叫做函数 $f(x)$ 当 $x \to
x_0$ 时的右极限，记作$\lim\limits_{x \to {x_0}^+} f(x) = A$ 。

**函数极限存在的充要条件** ：
$$
\lim\limits_{x \to x_0} f(x) = A \Leftrightarrow \lim\limits_{x \to {x_0}^-} f(x)= \lim\limits_{x \to {x_0}^+} f(x) = A
$$

### 极限的性质

1. 收敛数列的基本性质

**极限唯一性** ：收敛函数的极限唯一，即若 $\lim\limits_{n \to \infty} x_n = a$ ，则极限 $a$ 唯一。

**有界性** ：收敛数列必定有界，即若 $\lim\limits_{n \to \infty} x_n = a$ ，则数列 $\{x_n\}$ 有界。

**保号性** ：若 $\lim\limits_{n \to \infty} x_n = a$ 且 $a>0$ （或 $a<0$ ），则存在正整数 $N$ ，当 $n>N$ 时，有$x_n>0$ （或
$x_n<0$）。

**推论** ：如果数列 $\{x_n\}$ 从某项起有 $x_n \ge 0$ （或 $x_n \le 0$ ）且 $\lim\limits_{n \to \infty} x_n = a$ ，那么 $a
\ge 0$ （或 $a \le 0$ ）。

**定理（收敛数列与其子数列的关系）** ：如果数列 $\{x_n\}$ 收敛于 $a$ ，那么它的任意子列也收敛且极限也是 $a$ 。

2. 函数极限的性质

极限唯一性：若极限 $\lim\limits_{x \to x_0} f(x)$ 存在，则极限唯一，即若 $\lim\limits_{x \to x_0} f(x) = A$ ，则极限值 $A$
唯一。

局部有界性：若 $\lim\limits_{x \to x_0} f(x) = A$ ，则存在常数 $M>0$ 和 $\delta >0$ ，使 $0<|x-x_0|<\delta$ 时，有 $|f(x)
|\le M$ 。

局部保号性：若$\lim\limits_{x \to x_0} f(x) = A$ 且 $A>0$ （或 $A<0$ ），则存在常数 $\delta >0 $，使得当$0<|x-x_0|<\delta$
时，有 $f(x)>0$ （或 $f(x)<0$）。

## 极限的四则运算

**定理 1** ：若 $\lim\limits_{n \to \infty} x_n = A$ ， $\lim\limits_{n \to \infty} y_n = B$

则 （1） $\lim\limits_{n \to \infty}(x_n \pm y_n)=\lim\limits_{n \to \infty}x_n \pm \lim\limits_{n \to \infty}y_n$

​ （2）$\lim\limits_{n \to \infty}(x_n \cdot y_n)=\lim\limits_{n \to \infty}x_n \cdot \lim\limits_{n \to \infty}y_n$

​ （3）当 $B \ne 0$ 时， $\lim\limits_{n \to \infty}(\frac{x_n}{y_n})=\frac{\lim\limits_{n \to \infty}x_n}{\lim\limits_{n
\to \infty}y_n}$

**定理 2** ：如果 $\lim f(x) = A$ ， $\lim g(x) = B$

则 （1）$\lim[f(x) \pm g(x)]=\lim f(x) \pm \lim g(x)$

​ （2）$\lim f(x) \cdot g(x)=\lim f(x) \cdot \lim g(x)$

​ （3）当 $B \ne 0$ 时，$\lim \frac{f(x)}{g(x)}=\frac{\lim f(x)}{\lim g(x)}$

注：**<u>无论是数列极限还是函数极限，运用四则运算的前提是各部分极限值存在。</u>**

**推论 1** ：如果 $\lim f(x) = A$ ，而 $C$ 为常数，则 $\lim Cf(x)= CA$

**推论 2** ：如果 $\lim f(x) = A$ ，而 $n$ 为正整数，$\lim [f(x)]^n=A^n$

## 抓大头准则

$$
\lim\limits_{x \to \infty} \frac{a_mx^m+a_{m-1}x^{m-1}+\cdots+a_1x+a_0}{b_mx^m+b_
{m-1}x^{m-1}+\cdots+b_1x+b_0}=\begin{cases}
\frac{a_m}{b_n},m=n\\
0,m<n\\
\infty,m>n
\end{cases}
$$

### 几个重要公式

（1）$\lim\limits_{n \to \infty}q^n=0,|q|=1$

（2）$\lim\limits_{n \to \infty}\frac{1}{n^k},k>0$

（3）$\lim\limits_{n \to \infty}\sqrt[n]{a}=1,a>0$

（4）$\lim\limits_{n \to \infty}\sqrt[n]{n}=1$

## 极限存在准则

**准则 1 ：夹逼准则（迫敛性）**

如果数列 $\{x_n\}、\{y_n\}、\{z_n\}$ ，满足下列条件：

（1）$y_n \le x_n \le z_n (n=1,2,3\cdots)$

（2）$\lim\limits_{n \to \infty}y_n=a,\lim\limits_{n \to \infty}z_n=a$ ，那么数列 $\{x_n\}$ 的极限存在，且 $\lim\limits_{n
\to \infty}x_n=a$

**准则 2：单调有界定理**

单调递增有上界的函数（数列）或单调递增有下界的函数（数列）必有极限。

## 两个重要极限

**重要极限 1：**

$\lim\limits_{x \to 0}\frac{sinx}{x}=1$，$\lim\limits_{x \to 0}xsin\frac{1}{x}=1$

**重要极限 2：**

$\lim\limits_{x \to \infty}(1+\frac{1}{x})^x=e$，$\lim\limits_{x \to \infty}(1+x)^\frac{1}{x}=e$

## 无穷小量与无穷大量

**（1）无穷小量**

如果 $\lim\limits_{x \to x_0}f(x)=0$ ，则称函数 $f(x)$ 为当 $x \to x_0$ 时的无穷小量，特别的，以零为极限的数列 $\{x_n\}$ 称为
$n\to \infty$ 时的无穷小量。

**定理** 有限个无穷小量的和也是无穷小量

**定理** **有界函数** 与 **无穷小量** 的乘积是无穷小量

**推论** 常数与无穷小的乘积是无穷小

**推论** 有限个无穷小的乘积也是无穷小

**（2）无穷大量**

如果 $\lim\limits_{x \to x_0}f(x)=\infty$，则称函数 $f(x)$ 为当 $x \to x_0$ 时的无穷大量。

**定理**（无穷大与无穷小之间的关系）

在自变量的同一变化过程中，如果 $f(x)$ 为无穷大，则 $\frac{1}{f(x)}$ 为无穷小；

反之，如果 $f(x)$ 为无穷小，且 $f(x)\ne 0$ ，则 $\frac{1}{f(x)}$ 为无穷大。

**（3）无穷小阶的比较**

**定理** 设 $\alpha,\beta$ 是某极限过程中的无穷小，即 $\lim \alpha=\lim \beta=0$ ，

如果 $\lim \frac{\beta}{\alpha}=\infty$ ，则称 $\beta$ 是 $\alpha$ 的低阶无穷小；

如果 $\lim \frac{\beta}{\alpha}=0$ ，则称 $\beta$ 是 $\alpha$ 的高阶无穷小；

如果 $\lim \frac{\beta}{\alpha}=c \ne 0$ ，则称 $\beta$ 是 $\alpha$ 的同阶无穷小；

特别地，如果 $\lim \frac{\beta}{\alpha}=1$ ，则称 $\beta$ 是 $\alpha$ 的等价无穷小，记作 $\beta \sim \alpha$；

**（4）常用等价无穷小代换**

当 $x \to 0$ 时，

（1）$\sin x \sim x$ （2）$\arcsin x \sim x$ （3）$\tan x \sim x$

（4）$\arctan x \sim x$ （5）$e^x-1 \sim x$ （6）$\ln (1+x) \sim x$

（7）$(1+x)^a-1 \sim ax$ （8）$\sqrt[n]{1+x}-1 \sim \frac{1}{n}x$ （9）$1-\cos x \sim \frac{1}{2}x^2$

（10）$a^x-1 \sim x\ln a$

特别地，

（11）$\tan x-\sin x=\tan x(1-\cos x) \sim x \cdot\frac{1}{2}x^2 = \frac{1}{2}x^3$

（12）$x-\sin x \sim \frac{1}{6}x^3$ （13）$\tan x-x \sim \frac{1}{3}x^3$ （14）$x-\ln(1+x)\sim \frac{1}{2}x^2$
