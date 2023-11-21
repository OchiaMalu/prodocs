# 幂级数

## 函数项级数的概念及收敛性

函数项级数 $\displaystyle\sum_{n=1}^\infty u_n(x)=u_1(x)+u_2(x)+\cdots+u_n(x)+\cdots$ ，其中 $u_i(x)(i=1,2,\ldots)$
均为定义在区间 $I$ 上的函数

**收敛点与发散点：** 对于区间 $I$ 内一定点 $x_0$ ，若常数项级数 $\displaystyle\sum_{n=1}^\infty u_n(x_0)$ 收敛，则称点
$x_0$ 是函数项级数 $\displaystyle\sum_{n=1}^\infty u_n(x)$ 的收敛点；若常数项级数 $\displaystyle\sum_{n=1}^\infty u_n(
x_0)$ 发散，则称点 $x_0$ 是 $\displaystyle\sum_{n=1}^\infty u_n(x)$ 级数的发散点

**收敛域与发散域：**

函数项级数 $\displaystyle\sum_{n=1}^\infty u_n(x)$ 的所有收敛点的全体称为它的 **收敛域** ；所有发散点的全体称为它的 **发散域
**

在收敛域上，函数项级数 $\displaystyle\sum_{n=1}^\infty u_n(x)$ 的和是 $x$ 的函数 $s(x)$ ， $s(x)$ 称为函数项级数
$\displaystyle\sum_{n=1}^\infty u_n(x)$ 的和函数，即 $s(x)=\displaystyle\sum_{n=1}^\infty u_n(x)$

**幂级数：**

函数项级数中简单而常见的一类级数就是各项都是幂函数的函数项级数，这种形式的级数称为幂级数，它的形式是 $a_0+a_1(x-x_0)
+\cdots+a_n(x-x_0)^n$ 或 $a_0+a_1x+\cdots+a_nx^n+\cdots$ ，其中常数 $a_0,a_1,a_2,\ldots,a_n$ 叫做幂级数的系数

**阿贝尔定理**

如果级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 当 $x=x_0$ （$x_0\ne 0$） 时收敛，则适合不等式 $|x|<|x_0|$ 的一切 $x$
使这幂级数绝对收敛；反之，如果级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 当 $x=x_0$ 时发散，则适合不等式 $|x|>|x_0|$ 的一切
$x$ 使这幂级数发散

**收敛半径与收敛区间**

正数 $R$ 通常叫做幂级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 的收敛半径，开区间 $(-R,R)$ 叫做幂级数
$\displaystyle\sum_{n=0}^\infty a_nx^n$ 的收敛区间，再由幂级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 在 $x=\pm R$
处的收敛性就可以决定它的收敛域，幂级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 的收敛域是 $(-R,R)、[-R,R)、(-R,R]、[-R、R]$
之一

**规定：** 若幂级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 只在 $x=0$ 处收敛，则规定收敛半径 $R=0$ ，若对一切 $x$
都收敛，则规定收敛 $R=+\infty$ ，这时收敛域为 $(-\infty,+\infty)$

**定理：** 对于幂级数 $\displaystyle\sum_{n=1}^\infty u_n(x)$ ，若 $\lim\limits_{n\to \infty}|\frac{u_{n+1}(x)}{u_n(x)
}|=\lambda (x)$ ，则不等式 $\lambda(x)<1$ 的解即为幂级数的收敛区间

## 幂级数的运算

设幂级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 的收敛区间 $(-R_1,R_1)$ ，幂级数 $\displaystyle\sum_{n=0}^\infty b_nx^n$
的收敛区间为 $(-R_2,R_2)$ ，则有

**加法：**  $\displaystyle\sum_{n=0}^\infty a_nx^n+\displaystyle\sum_{n=0}^\infty b_nx^n=\displaystyle\sum_{n=0}^\infty (
a_n+b_n)x^n$ ，收敛区间为 $(-R_1,R_1)\cap (-R_2,R_2)$

**减法：**  $\displaystyle\sum_{n=0}^\infty a_nx^n-\displaystyle\sum_{n=0}^\infty b_nx^n=\displaystyle\sum_{n=0}^\infty (
a_n-b_n)x^n$ ，收敛区间为 $(-R_1,R_1)\cap (-R_2,R_2)$

**性质 1** 幂级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 的和函数 $s(x)$ 在其收敛域 $I$ 上连续

**性质 2** 幂级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 的和函数 $s(x)$ 在其收敛域 $I$ 上可积，并且有逐项积分公式
$$
\int_0^xs(x)dx=\int_0^x(\displaystyle\sum_{n=0}^\infty a_nx^n)dx=\displaystyle\sum_{n=0}^\infty \int_0^x(a_nx_n)
dx=\displaystyle\sum_{n=0}^\infty \frac{a_n}{n+1}x^{n+1},x\in I
$$
<u>逐项积分后所得的幂级数和原级数有相同的收敛半径</u>

**性质 3** 幂级数 $\displaystyle\sum_{n=0}^\infty a_nx^n$ 的和函数 $s(x)$ 在其收敛区间 $(-R,R)$ 内可导，并且有逐项求导公式
$$
s'(x)=(\displaystyle\sum_{n=0}^\infty a_nx^n)'=\displaystyle\sum_{n=0}^\infty (a_nx^n)'=\displaystyle\sum_{n=1}^\infty
na_nx^{n-1},x\in (-R,R)
$$
<u>逐项求导后所得的幂级数和原级数有相同的收敛半径</u>

## 函数展开成幂级数

**泰勒公式：** 如果 $f(x)$ 在点 $x_0$ 的某邻域内具有各阶导数，则在该邻域内 $f(x)$ 近似等于 $f(x)=f(x_0)+f'(x_0)(x-x_0)
+\frac{f''(x_0)}{2!}(x-x_0)^2+\cdots+\frac{f^{(n)}(x_0)}{n!}(x-x_0)^{n}+R_n(x)$ ，其中拉格朗日型余项 $R_n(x)=\frac{f^{(
n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$ （$\xi$ 介于 $x$ 与 $x_0$ 之间）

**泰勒级数：**

如果 $f(x)$ 在点 $x_0$ 的某邻域内具有各阶导数，得 $f(x)$ 在点 $x_0$ 的泰勒多项式 $f(x)=f(x_0)+f'(x_0)(x-x_0)+\frac{f''(
x_0)}{2!}(x-x_0)^2+\cdots+\frac{f^{(n)}(x_0)}{n!}(x-x_0)^{n}+\cdots$ ，这一幂级数称为函数 $f(x)$ 的泰勒级数

**麦克劳林级数：**

在泰勒级数中取 $x_0=0$ ，如果 $f(x)$ 在点 $x_0$ 的某邻域内具有各阶导数，则当 $n\to \infty$ 时， $f(x)$ 在 $x_0=0$ 的泰勒多项式
$P_n(x)=f(0)+f'(0)x+\frac{f''(0)}{2!}x^2+\cdots+\frac{f^{(n)}(0)}{n!}x^{n}+\cdots$ ，此级数称为函数 $f(x)$ 的麦克劳林级数

### 常用的麦克劳林展开式

（1）$\frac{1}{1-x}=\displaystyle\sum_{n=0}^{\infty}x^n=1+x+x^2+x^3+\cdots+x^n+\cdots,x\in(-1,1)$

（2）$e^x=\displaystyle\sum_{n=0}^{\infty} \frac{1}{n!}x^n=1+x+\frac{1}{2!}x^2+\frac{1}{3!}x^3+\cdots+\frac{1}{n!
}x^n+\cdots,x\in(-\infty,+\infty)$

（3）$\sin x=\displaystyle\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n+1}}{(2n+1)!}=x-\frac{x^3}{3!}+\cdots+(-1)
^n\frac{x^{2n+1}}{(2n+1)!}+\cdots,x\in (-\infty,+\infty)$

（4）$\cos x=\displaystyle\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n}}{(2n)!}=x-\frac{x^2}{2!}+\cdots+(-1)^n\frac{x^{2n}}{(2n)!
}+\cdots,x\in (-\infty,+\infty)$

（5）$\ln (1+x)=\displaystyle\sum_{n=1}^{\infty}(-1)^{n-1}\frac{x^n}{n}=x-\frac{x^2}{2}+\frac{x^3}{3}+\cdots+(-1)
^{n-1}\frac{x^n}{n}+\cdots,x\in (-1,1]$

