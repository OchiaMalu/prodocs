# 常数项级数

## 级数的收敛与发散

**级数**  $\displaystyle\sum_{n=1}^\infty u_n=u_1+u_2+\cdots+u_n+\cdots$

级数 $\displaystyle\sum_{n=1}^\infty u_n$ 的部分和： $s_n=\displaystyle\sum_{i=1}^n u_i=u_1+u_2+\cdots+u_n$

**级数敛散性定义：**

如果极限 $\lim\limits_{n\to \infty}s_n=s$ ，则称无穷级数$\displaystyle\sum_{n=1}^\infty u_n$ 收敛，极限值 $s$ 称为级数
$\displaystyle\sum_{n=1}^\infty u_n$ 的和，记作 $s=\displaystyle\sum_{n=1}^\infty u_n=u_1+u_2+\cdots+u_n+\cdots$ ；如果极限
$\lim\limits_{n\to \infty}s_n$ 不存在，则称无穷级数 $\displaystyle\sum_{n=1}^\infty u_n$ 发散

### 两个重要级数

**（1）等比级数**

形如 $\displaystyle\sum_{n=0}^\infty aq^n(a\ne 0)$ ：如果 $|q|<1$ ，则级数 $\displaystyle\sum_{n=0}^\infty aq^n$ 收敛，其和为
$\frac{a}{1-q}$ ；如果 $|q|\ge 1$ ，则级数 $\displaystyle\sum_{n=0}^\infty aq^n$ 发散

**（2）P-级数**

形如 $\displaystyle\sum_{n=1}^\infty \frac{1}{n^p}=\frac{1}{1^p}+\frac{1}{2^p}+\cdots+\frac{1}{n^p}+\cdots$ ：当 $p>1$
时，则级数 $\displaystyle\sum_{n=1}^\infty \frac{1}{n^p}$ 收敛； 当 $p\le 1$ 时，则级数 $\displaystyle\sum_{n=1}^\infty
\frac{1}{n^p}$ 发散；特别地，当 $p=1$ 时，称级数 $\displaystyle\sum_{n=1}^\infty \frac{1}{n}$ 为 **调和级数**

## 收敛级数的基本性质

**性质 1** 如果 $\displaystyle\sum_{n=1}^\infty u_n=s$ ，则 $\displaystyle\sum_{n=1}^\infty ku_n=ks$

**性质 2** 如果 $\displaystyle\sum_{n=1}^\infty u_n=s$ ，$\displaystyle\sum_{n=1}^\infty v_n=t$ ，则 $\displaystyle\sum_
{n=1}^\infty (u_n\pm v_n)=s\pm t$

**性质 3** 在级数中去掉、加上或改变有限项，不会改变级数的收敛性

**性质 4** 若级数 $\displaystyle\sum_{n=1}^\infty u_n$ 收敛，则对级数的任意加括号后所称级数仍收敛，但其和不变

**推论：** 如果加括号后所成的级数发散，则原来级数也发散

**性质 5 （必要条件）** 如果 $\displaystyle\sum_{n=1}^\infty u_n$ 收敛，则 $\lim\limits_{n\to \infty}u_n=0$

## 正项级数及其判别法

**正项级数：** 各项都是正数或零的级数称为正项级数

**定理** 正项级数 $\displaystyle\sum_{n=1}^\infty u_n$ 收敛的充分必要条件为它的部分和数列 $\{s_n\}$ 有界

**比值判别法：**

设正项级数 $\displaystyle\sum_{n=1}^\infty u_n$ 满足 $\lim\limits_{n\to \infty}\frac{u_{n+1}}{u_n}=\rho$

（1）如果 $\rho <1$ ，则 $\displaystyle\sum_{n=1}^\infty u_n$ 收敛

（2）如果 $\rho >1$ ，则 $\displaystyle\sum_{n=1}^\infty u_n$ 发散

（3）如果 $\rho =1$ ，则 $\displaystyle\sum_{n=1}^\infty u_n$ 可能收敛也可能发散 （此判别法失效）

**比较判别法：**

设 $\displaystyle\sum_{n=1}^\infty u_n$ 、$\displaystyle\sum_{n=1}^\infty v_n$ 都是正项级数，且 $u_n\le v_n$
，$n=1,2,\ldots$

若 $\displaystyle\sum_{n=1}^\infty v_n$ 收敛，则 $\displaystyle\sum_{n=1}^\infty u_n$ 收敛；若 $\displaystyle\sum_
{n=1}^\infty u_n$ 发散，则 $\displaystyle\sum_{n=1}^\infty v_n$ 发散

**简称：大收则小收，小发则大发**

**比较判别法的极限形式：**

设 $\displaystyle\sum_{n=1}^\infty u_n$ 、$\displaystyle\sum_{n=1}^\infty v_n$ 都是正项级数，且 $\lim\limits_{n\to
\infty}\frac{u_n}{v_n}=l$

（1）如果 $0<l<+\infty$ ，则 $\displaystyle\sum_{n=1}^\infty u_n$ 、$\displaystyle\sum_{n=1}^\infty v_n$ 同敛散

（2）如果 $l=0$ 且 $\displaystyle\sum_{n=1}^\infty v_n$ 收敛，则 $\displaystyle\sum_{n=1}^\infty u_n$ 收敛

（3）如果 $l=+\infty$ 且 $\displaystyle\sum_{n=1}^\infty v_n$ 发散，则 $\displaystyle\sum_{n=1}^\infty u_n$ 发散

## 任意项级数

**1）交错级数及其判别法**

交错级数：交错级数的一般形式 $\displaystyle\sum_{n=1}^\infty (-1)^{n-1}u_n$ ，其中 $u_n>0$

【例如】$\displaystyle\sum_{n=1}^\infty (-1)^{n-1}\frac{1}{n}$ 是交错级数，$\displaystyle\sum_{n=1}^\infty (-1)
^{n-1}\frac{1-\cos n\pi}{n}$ 不是交错级数

**莱布尼茨定理：**

如果交错级数 $\displaystyle\sum_{n=1}^\infty (-1)^{n-1}u_n$ 满足

（1）$\lim\limits_{n\to \infty}u_n=0$

（2）$u_n\ge u_{n+1},(n=1,2,\ldots)$ ，则级数 $\displaystyle\sum_{n=1}^\infty (-1)^{n-1}u_n$ 收敛

**2）绝对收敛与条件收敛**

若级数 $\displaystyle\sum_{n=1}^\infty |u_n|$ 收敛，则称级数 $\displaystyle\sum_{n=1}^\infty u_n$ 绝对收敛

若级数 $\displaystyle\sum_{n=1}^\infty u_n$ 收敛，而级数 $\displaystyle\sum_{n=1}^\infty |u_n|$ 发散，则称级数
$\displaystyle\sum_{n=1}^\infty u_n$ 条件收敛

**定理** 如果级数 $\displaystyle\sum_{n=1}^\infty |u_n|$ 收敛，即绝对收敛，则级数 $\displaystyle\sum_{n=1}^\infty u_n$ 收敛
