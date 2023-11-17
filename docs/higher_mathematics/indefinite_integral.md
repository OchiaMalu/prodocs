# 不定积分

## 不定积分的概念与性质

**1）原函数与不定积分的概念**

**原函数定义：**  如果在区间 $I$ 上，可导函数 $F(x)$ 的导函数为 $f(x)$ ，即对任一 $x\in I$ ，都有 $F'(x)=f(x)$ 或 $dF(x)=f(
x)dx$ ，那么函数 $F(x)$ 就称为 $f(x)$ 在区间 $I$ 上的一个 **原函数**

【例如】因 $(\sin x)'=\cos x$ ，故 $\sin x$ 是 $\cos x$ 的一个原函数

**原函数存在定理：** 如果函数 $f(x)$ 在区间 $I$ 上连续，那么在区间 $I$ 上存在可导函数 $F(x)$ ，使对任一 $x\in I$ ，都有 $F'(
x)=f(x)$

【例如】因为 $(x^2)'=2x$ ，所以 $x^2$ 是 $2x$ 的一个原函数，同理 $x^2+1,x^2-3,x^2+5$ 都是 $2x$ 的原函数

**不定积分定义：** 若函数 $F(x)$ 是 $f(x)$ 在某区间上的一个原函数，则 $f(x)$ 的全体原函数 $F(x)+C$ 称为 $f(x)$ 在该区间上的
**不定积分** ，记作 $\int f(x)dx$ ，即 $\int f(x)dx=F(x)+C$ ，其中 $\int$ 称为积分号， $f(x)$ 为被积函数， $f(x)dx$ 为被积表达式，
$x$ 为积分变量， $C$ 为积分常量。

因此 **求 $f(x)$ 的不定积分，只需求 $f(x)$ 的一个原函数，再加上任意常数 $C$ 即可**

**导数（或微分）与积分的关系（重点）：**

（1）$\frac{d}{dx}[\int f(x)dx]=f(x)$ （2）$d[\int f(x)dx]=f(x)dx$

（3）$\int F'(x)dx=F(x)+C$ （4）$\int dF(x)=F(x)+C$

## 不定积分的性质

**性质 1** 设函数 $f(x)$ 及 $g(x)$ 的原函数存在，则
$$
\int [f(x)\pm g(x)]dx=\int f(x)dx\pm \int g(x)dx
$$
**性质 2** 设函数 $f(x)$ 的原函数存在， $k$ 是非零常数，则 $\int kf(x)dx=k\int f(x)dx$

**基本积分表**

（1）$\int kdx=kx+C$ （2）$\int x^udx=\frac{1}{u+1}x^{u+1}+C$ （$u\ne -1$）

（3）$\int \frac{1}{x}dx=\ln |x|+C$ （4）$\int e^xdx=e^x+C$

（5）$\int a^xdx=\frac{a^x}{\ln a}+C$ （6）$\int \cos xdx=\sin x +C$

（7）$\int \sin xdx=-\cos x +C$ （8）$\int \frac{1}{\cos ^2x}dx=\int \sec ^2xdx=\tan x +C$

（9）$\int \frac{1}{\sin ^2x}dx=\int \csc ^2xdx=-\cot x +C$ （10）$\int \frac{1}{1+x^2}dx=\arctan x +C$

（11）$\int \frac{1}{\sqrt{1-x^2}}dx=\arcsin x + C$ （12）$\int \sec x \tan xdx=\sec x +C$

（13）$\int \csc x\cot xdx=-\csc x+C$ （14）$\int \sec xdx=\ln |\sec x+\tan x|+C$

（15）$\int \csc xdx=\ln |\csc x-\cot x|+C $ （16）$\int \tan xdx=-\ln |\cos x|+C$

（17）$\int \cot xdx=\ln |\sin x|+C$ （18）$\int \frac{1}{a^2+x^2}dx=\frac{1}{a}\arctan \frac{x}{a}+C$

（19）$\int \frac{1}{x^2-a^2}dx=\frac{1}{2a}\ln |\frac{x-a}{x+a}|+C$ （20）$\int \frac{1}{\sqrt{a^2-x^2}}dx=\arcsin
\frac{x}{a}+C$

（21）$\int \frac{1}{\sqrt{x^2+a^2}}dx=\ln (x+\sqrt{x^2+a^2})+C$ （22）$\int \frac{1}{\sqrt{x^2-a^2}}dx=\ln
|x+\sqrt{x^2-a^2}|+C$

## 换元积分法

利用基本积分表与积分的性质，所能计算的不定积分是有限的，本节把复合函数的求导法反过来用于求不定积分，利用中间变量的代换，得到复合函数的积分法，称为
**换元积分法** ，简称 **换元法**

**1）第一类换元法**

（1）$\int f[\phi(x)]\phi'(x)dx=\int[f[\phi(x)]d\phi (x)] \begin{matrix} u=\phi(x)\\= \end{matrix}\int f(u)du$

（2）计算不定积分 $\int f(u)du$ ，再将 $u=\phi(x)$ 回代

**常见的凑微分法形式**

（1）$kdx=d(kx)$ （2）$dx=d(x+C)$

（3）$e^xdx=de^x$ （4）$\frac{1}{x}=d\ln x$

（5）$\cos xdx=d\sin x$ （6）$-\frac{1}{x^2}dx=d\frac{1}{x}$

（7）$\frac{1}{2\sqrt{x}}dx=d\sqrt{x}$ （8）$\sec ^2xdx=d\tan x$

（9）$\frac{1}{\sqrt{1-x^2}}dx=d\arcsin x$ （10）$\frac{x}{\sqrt{1+x^2}}dx=d\sqrt{1+x^2}$

（11）$-\frac{x}{\sqrt{1-x^2}}dx=d\sqrt{1-x^2}$

**2）第二类换元法（整体换元和三角函数换元法）**

设 $x=\phi(t)$ 单调的、可导的函数，并且 $\phi'(t)\ne 0$ ，又设 $f[\phi(t)]\phi'(t)$ 具有原函数 $F(t)$ ，则有换元公式
$$
\int f(X)dx \begin{matrix}x=\phi(t)\\=\end{matrix}\int f[\phi(t)]\phi'(t)dt=F(t)+C=F[\phi^{-1}(x)]+C
$$
其中 $t=\phi^{-1}(x)$ 是 $x=\phi(t)$ 的反函数

**（1）整体换元法**

类似 $\sqrt[n]{ax+b}$ ，令 $ax+b=t^n$ ，比如 $\sqrt{x}+\sqrt[3]{x}(x=t^6)$

类似 $\sqrt{e^x-1}$ 或 $\sqrt{e^x+1}$ ，令 $t=\sqrt{e^x-1}$ 或 $t=\sqrt{e^x+1}$

类似 $\sqrt\ln x \pm 1$ ，令 $t=\sqrt{\ln x \pm 1}$

**（2）三角换元法**

$\sqrt{a^2-x^2}$ ，令 $x=a\sin t$

$\sqrt{a^2+x^2}$ ，令 $x=a\tan t$

$\sqrt{x^2-a^2}$ ，令 $x=a\sec t$

### 三角函数有理式的积分

型如 $\int R(\sin x,\cos x)dx$

万能代换：令 $t=\tan \frac{x}{2}$ ，则 $x=2\arctan t$ ， $dx=\frac{2}{1+t^2}dt$

​ $\sin x=\frac{2t}{1+t^2}$ ，$\cos x =\frac{1-t^2}{1+t^2}$

【例】求不定积分 $\int \frac{1}{3+5\cos x}dx$

## 分部积分法

前面在复合函数求导法则的基础上，得到了换元积分法。现在我们利用两个函数乘积的求导法则，来推得另一个求积分的基本方法—— **
分部积分法 **

**分部积分公式**
$$
\int uv'dx=uv-\int u'vdx或\int udv=uv-\int vdu
$$

## 有理函数的积分

1. **有理函数** 是指由两个多项式的商所表示的函数，即具有如下形式的函数：

$$
R(x)=\frac{P_m(x)}{Q_n(x)}=\frac{a_0x^{m}+a_1x^{m-1}+\cdots+a_{m-1}x+a_m}{b_0x^{n}+b_1x^{n-1}+\cdots+b_{n-1}x+b_n},m\in
N^+,n\in N^+
$$

​ $a_i(i=0,1,2\cdots,m)$ 和 $b_i(i=0,1,2\cdots,n)$ 都是实数，并且 $a_0\ne 0,b_0\ne 0$

2. 当 $n>m$ 时，有理函数 $R(x)$ 是 **真** 分式，而当 $n\le m$ 时，称有理函数 $R(x)$ 是 **假** 分式
3. **假分式** 通过 **多项式的除法** 总可以化成一个 **整式** 与一个 **真分式** 之和的形式

即 $R(x)=\frac{P_m(x)}{Q_n(x)}=S(x)+\frac{R(x)}{Q_n(x)}$ ，其中 $S(x)$ 为商， $R(x)$ 为余式

4. 对于真分式 $R(x)=\frac{P_m(x)}{Q_n(x)}$ 的情形，即 $m<n$ ，此时有理式可按照如下方式拆分：

第一步：按照多项式分解定理可知，分母 $Q_n(x)$ 的因式分解只能由一次式和二次式组成，其中二次式的判别式小于零，无法进一步分解

第二步：设待定系数

1）若 $Q_n(x)$ 含有 $k$ 重实根 $a$ ，即包含因子 $(x-a)^k$ ，则 $\frac{P_m(x)}{Q_n(x)}$ 的分解必含有以下分式：

$\frac{A_1}{(x-a)^1}+\frac{A_2}{(x-a)^2}+\cdots+\frac{A_k}{(x-a)^k}$ ，其中 $A_1,A_2\cdots,A_k$ 为待定系数

2）若 $Q_n(x)$ 含有 $k$ 重因式 $(x^2+px+q)^k$ ， $p^2-4q<0$ ，则 $\frac{P_m(x)}{Q_n(x)}$ 的分解必含有分式：

$\frac{B_1x+C_1}{(x^2+px+q)^1}+\frac{B_2x+C_2}{(x^2+px+q)^2}+\cdots+\frac{B_kx+C_k}{(x^2+px+q)^k}$
