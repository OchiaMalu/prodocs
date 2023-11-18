# 定积分

**定积分定义**

设函数 $f(x)$ 在 $[a,b]$ 上有界，在 $[a,b]$ 中任意插入若干个分点，把区间 $[a,b]$ 分隔成 $n$ 个小区间 $[x_{i-1},x_i]$
（$i=1,2,\cdots,n$） ，记 $\Delta x_i=x_i-x_{i-1}$ （$i=1,2,\cdots,n$），$\lambda=\max\{\Delta x_1,\Delta x_2,\cdots,\Delta
x_n\}$ ，记分割为 $T:a=x_0<x_1<x_2<\cdots<x_{n-1}<x_n=b$ ，当 $\lambda \to 0$ 时，极限值 $\lim\limits_{\lambda\to
0}\displaystyle\sum_{i=1}^{n}f(\xi_i)\Delta x_i$ 与区间 $[a,b]$ 的分法和 $\xi_i$ 的取法无关，称这个极限为函数 $f(x)$
在区间 $[a,b]$ 上的定积分，记作 $\int_a^bf(x)dx$，即 $\int_a^bf(x)dx=\lim\limits_{\lambda\to 0}\displaystyle\sum_
{i=1}^{n}f(\xi_i)\Delta x_i,\xi_i\in[x_{i-1,x_i}]$

**说明：**

（1）若取特殊分割，$n$ 等分，$\xi _i$ 取每个小区间的右端点，则有
$$
\int_0^1f(x)dx=\lim\limits_{n\to \infty}\displaystyle\sum_{i=1}^nf(\frac{i}{n})\frac{1}{n}（重点）
$$
（2）定积分的值只与被积函数及积分区间有关，而与被积变量的记法无关，即
$$
\int_a^bf(x)dx=\int_a^bf(t)dt=\int_a^bf(u)du
$$
（3）如果函数 $f(x)$ 在区间 $[a,b]$ 上定积分存在，则称 $f(x)$ 在区间 $[a,b]$ 上可积

（4）定积分的物理意义：设某物体做变速直线运动，已知速度 $v(t)$ 在 $[T_1,T_2]$ 连续且 $v(t)>\ge0$ ，则在运动期间内物体所经过的路程
$s=\int_{T_1}^{T_2}v(t)dt$

**函数可积的充分条件、必要条件：**

**定理 1** 若 $f(x)$ 在区间 $[a,b]$ 上连续，则 $f(x)$ 在 $[a,b]$ 上可积

**定理 2** 若 $f(x)$ 在区间 $[a,b]$ 上有界，且只有有限个间断点，则 $f(x)$ 在 $[a,b]$ 上可积

**定理 3 （必要条件）** 若 $f(x)$ 在 $[a,b]$ 上可积，则 $f(x)$ 在 $[a,b]$ 上有界

## 定积分的性质

**两点规定：**

（1）$\int_a^af(x)dx=0$ （2）$\int_a^bf(x)dx=-\int_b^af(x)dx$

**性质 1** $\int_a^b[f(x)\pm g(x)]dx=\int_a^bf(x)dx\pm\int_a^bg(x)dx$

**性质 2** $\int_a^bkf(x)dx=k\int_a^bf(x)dx$

**性质 3** 设 $a<c<b$ ，则 $\int_a^bf(x)dx=\int_a^cf(x)dx+\int_c^bf(x)dx$

**性质 4** 如果在区间 $[a,b]$ 上 $f(x)=1$ ，则 $\int_a^b1dx=\int_a^bdx=b-a$

**性质 5** 如果在区间 $[a,b]$ 上 $f(x)\ge0$ ，则 $\int_a^bf(x)dx \ge 0$（$a<b$）

**推论 1** 如果在区间 $[a,b]$ 上 $f(x)\le g(x)$ ，则 $\int_a^bf(x)dx \le \int_a^bg(x)dx$（$a<b$）

**推论 2** $|\int_a^bf(x)dx|\le\int_a^b|f(x)|dx$ （$a<b$）

**性质 6** 设 $M$ 及 $m$ 分别是函数 $f(x)$ 在区间 $[a,b]$ 的最大值与最小值，则 $m(b-a)\le\int_a^bf(x)dx\le M(b-a)$ （$a<
b$）

**性质 7** （积分中值定理） 如果函数 $f(x)$ 在区间 $[a,b]$ 上连续，则至少存在 $\xi\in[a,b]$ ，使得 $\int_a^bf(x)dx=f(\xi)(
b-a)$

## 积分上限函数及其导数

设函数 $f(x)$ 在区间 $[a,b]$ 上连续，且设 $x$ 为 $[a,b]$ 上的一点，把函数 $f(x)$ 在部分区间 $[a,x]$ 上的定积分 $\int_a^xf(
t)dt$ 称为积分上限函数，记为 $\varphi(x)=\int_a^xf(t)dt$

**定理** 如果函数 $f(x)$ 在区间 $[a,b]$ 上连续，那么积分上限函数 $\varphi(x)=\int_a^xf(t)dt$ 在 $[a,b]$ 上是可导函数，且
$\varphi'(x)=\frac{d}{dx}\int_a^xf(t)dt=f(x)(a\le x\le b)$

**推论** 如果函数 $f(x)$ 在区间 $[a,b]$ 上连续，则函数 $\varphi(x)=\int_a^xf(t)dt$ 是 $f(x)$ 在区间 $[a,b]$ 上的一个 *
*原函数**

**推论** 设函数 $f(x)$ 为连续函数，$u(x),v(x)$ 均为可导函数，且可进行复合 $f\circ u$ 与 $f\circ v$ ，则
$$
\frac{d}{dx}\int_{v(x)}^{u(x)}f(t)dt=f[u(x)]u'(x)-f[v(x)]v'(x)
$$

## 牛顿-莱布尼兹公式

**定理 5 （微积分基本公式）** 如果函数 $F(x)$ 是连续函数 $f(x)$ 在区间 $[a,b]$ 上的一个原函数，则 $\int_a^bf(x)dx=F(b)-F(
a)$

## 定积分的换元法和分部积分法

**1）换元积分法**

设函数 $f(x)$ 在区间 $[a,b]$ 上连续，函数 $x=\varphi(t)$ 满足条件：

（1）$\varphi(\alpha)=a,\varphi(\beta)=b$

（2）$\varphi(t)$ 在 $[\alpha,\beta]$ （或 $[\beta,\alpha]$）上具有连续函数，且其值域不超出 $[a,b]$ ，则有
$$
\int_a^bf(x)dx=\int_{\alpha}^{\beta}f[\varphi(t)]\varphi'(t)dt
$$
​ 这个公式叫做定积分的换元公式

**2）分部积分法**
$$
\int_a^buv'dx=uv|_a^b+\int_a^bu'vdx或\int_a^budv=uv|_a^b+\int_a^bvdu
$$

## 几个重要结论

**1）定积分在对称区间上的奇偶性**

（1）若 $f(x)$ 在 $[-a,a]$ 上连续且为偶函数，则 $\int_{-a}^af(x)dx=2\int_0^af(x)dx$

（2）若 $f(x)$ 在 $[-a,a]$ 上连续且为奇函数，则 $\int_{-a}^af(x)dx=0$

**2）定积分的周期性**

若 $f(x)$ 是连续的周期函数，周期为 $T$ ，则：

（1）$\int_a^{a+T}f(x)dx=\int_0^Tf(x)dx$

（2）$\int_a^{a+nT}f(x)dx=n\int_0^Tf(x)dx$ （$n\in N^+$）

**3）分段函数的定积分**

利用 $\int_a^bf(x)dx=\int_a^cf(x)dx+\int_c^bf(x)dx$

## 广义积分

**1）无穷区间广义积分**

**定义** 设函数 $f(x)$ 在区间 $[a,+\infty)$ 上连续， 取 $u>a$ ，如果极限 $\lim\limits_{u\to+\infty}\int_a^uf(x)dx$
存在，则称反常积分 $\int_a^{+\infty}f(x)dx$ 收敛，且 $\int_a^{+\infty}f(x)dx=\lim\limits_{u\to+\infty}\int_a^uf(x)dx$

​ 如果极限 $\lim\limits_{u\to+\infty}\int_a^uf(x)dx$ 不存在，则称反常积分 $\int_a^{+\infty}f(x)dx$ 发散

​ 类似地，设函数 $f(x)$ 在区间 $(-\infty,b]$ 上连续， 取 $u<b$ ，如果极限 $\lim\limits_{u\to-\infty}\int_u^bf(x)dx$
存在，则称反常积分 $\int_{-\infty}^{b}f(x)dx$ 收敛，且 $\int_{-\infty}^{b}f(x)dx=\lim\limits_{u\to-\infty}\int_u^bf(x)dx$

​ 如果极限 $\lim\limits_{u\to-\infty}\int_u^bf(x)dx$ 不存在，则称反常积分 $\int_{-\infty}^{b}f(x)dx$ 发散

​ 设函数 $f(x)$ 在区间 $(-\infty,+\infty)$ 上连续，如果反常积分 $\int_{-\infty}^{0}f(x)dx$ 和 $\int_0^{+\infty}f(x)dx$
都收敛，则称反常积分 $\int_{-\infty}^{+\infty}f(x)dx$ 收敛，且 $\int_{-\infty}^{+\infty}f(x)dx=\int_{-\infty}^{0}f(x)
dx+\int_0^{+\infty}f(x)dx$

​ 如果上式有一个反常积分发散，则称反常积分 $\int_{-\infty}^{+\infty}f(x)dx$ 发散

**反常积分的计算：** 如果函数 $F(x)$ 是 $f(x)$ 的原函数，则
$$
\int_a^{+\infty}f(x)dx=\lim\limits_{u\to+\infty}\int_a^uf(x)dx=\lim\limits_{x\to +\infty}F(x)|_a^u=\lim\limits_{u\to
+\infty}F(u)-F(a)
$$
也可采用以下简记形式：
$$
\int_a^{+\infty}f(x)dx=F(x)|_a^{+\infty}=\lim\limits_{x\to +\infty}F(x)-F(a)
$$
类似地：
$$
\int_{-\infty}^{b}f(x)dx=F(x)|_{-\infty}^{b}=F(b)-\lim\limits_{x\to -\infty}F(x)
$$
$$
\int_{-\infty}^{+\infty}f(x)dx=F(x)|_{-\infty}^{+\infty}=\lim\limits_{x\to +\infty}F(x)-\lim\limits_{x\to -\infty}F(x)
$$

**2）无界函数的广义积分（瑕积分）**

**瑕点** 如果函数 $f(x)$ 在点 $a$ 的任一邻域内都无界，那么点 $a$ 称为函数 $f(x)$ 的瑕点，也称为 **无穷间断点**

**定义** 设函数 $f(x)$ 在区间 $(a,b]$ 上连续，而在点 $a$ 的右邻域内无界，取 $t>a$ ，如果极限 $\lim\limits_{t\to
a^+}\int_t^bf(x)dx$ 存在，则称瑕积分 $\int_a^bf(x)dx$ 收敛，且
$$
\int_a^bf(x)dx=\lim\limits_{t\to a^+}\int_t^bf(x)dx
$$
如果极限 $\lim\limits_{t\to a^+}\int_t^bf(x)dx$ 不存在，则称瑕积分 $\int_a^bf(x)dx$ 发散

​ 类似地，设函数 $f(x)$ 在区间 $[a,b)$ 上连续，而在点 $a$ 的右邻域内无界，取 $t<b$ ，如果极限 $\lim\limits_{t\to
b^-}\int_a^tf(x)dx$ 存在，则称瑕积分 $\int_a^bf(x)dx$ 收敛，且
$$
\int_a^bf(x)dx=\lim\limits_{t\to b^-}\int_a^tf(x)dx
$$
如果极限 $\lim\limits_{t\to b^-}\int_a^tf(x)dx$ 不存在，则称瑕积分 $\int_a^bf(x)dx$ 发散

​ 设函数 $f(x)$ 在区间 $[a,b]$ 上除点 $c(a<c<b)$ 外处处连续，而在点 $c$ 的邻域内无界，如果两个反常积分 $\int_a^cf(x)
dx,\int_c^bf(x)dx$ 都收敛，则称 $\int_a^bf(x)dx$ 收敛，且
$$
\int_a^bf(x)dx=\int_a^cf(x)dx+\int_c^bf(x)dx
$$
如果上式右侧有一个瑕积分发散，则称瑕积分 $\int_a^bf(x)dx$ 发散

## 面积、旋转体体积的计算

**1）定积分计算面积**

**直角坐标情形**

（1）设平面图形由上下两条曲线 $y=f_上(x)$ 与 $y=f_下(x)$ 及左右两条直线 $x=a$ 与 $x=b$ 所围成，则平面图形的面积为
$s=\int_a^b[f_上(x)-f_下(x)]dx$

（2）设平面图形由左右两条曲线 $x=\varphi_左(y)$ 和 $x=\varphi_右(y)$ 及上下两条直线 $y=d$ 与 $y=c$ 所围成，则平面图形的面积为
$s=\int_c^d[\varphi_右(x)-\varphi_左(x)]dy$

**2）旋转体的体积**

**旋转体** 是由一个平面图形绕这个平面内一条直线旋转一周而成的立体，这条直线叫做旋转轴

常见的旋转体：圆柱、圆锥、圆台、球体

（1）由连续曲线 $y=f(x)$ ，直线 $x=a,x=b$ 及 $x$ 轴所围成的曲边梯形

​ Ⅰ. 绕 $x$ 轴旋转一周而成的立方体体积为： $V_x=\int_a^b \pi[f(x)]^2dx$

<img src="http://niu.ochiamalu.xyz/3904606ad2a0ee05f6a85656606f40f.jpg" alt="3904606ad2a0ee05f6a85656606f40f" style="zoom:25%;margin:0 auto" />

​ Ⅱ. 绕 $y$ 轴旋转一周而成的立体体积为： （柱壳法）
$$
V_y=\int_a^b 2\pi xf(x)dx（假设 f(x)\ge 0,0\le a\le x\le b）
$$
（2）由连续曲线 $x=g(y)$ ，直线 $y=c,y=d$ 及 $y$ 轴所围成的曲边梯形

​ Ⅰ. 绕 $x$ 轴旋转一周而成的立体体积为：（柱壳法）
$$
V_x=\int_c^d 2\pi yg(y)dy（假设 g(y)\ge 0,0\le a\le y\le b）
$$
​ Ⅱ. 绕 $y$ 轴旋转一周而成的立方体体积为： $V_y=\int_c^d \pi[g(y)]^2dy$

<img src="http://niu.ochiamalu.xyz/5626dbafb6b8a31c649200d76109a61.jpg" alt="5626dbafb6b8a31c649200d76109a61" style="zoom:25%;margin:0 auto" />
