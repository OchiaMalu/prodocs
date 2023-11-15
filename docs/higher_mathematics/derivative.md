# 导数与微分

## 导数的概念

### 导数的定义

**（1）在某点 $x_0$ 的导数**

·设函数 $y=f(x)$ 在点 $x_0$ 的某个邻域内有定义，如果极限 $\lim\limits_{\Delta x \to 0}\frac{\Delta y}{\Delta x}$ 存在，则称函数
$y=f(x)$ 在点 $x_0$ 处可导，并称这个极限为函数 $y=f(x)$ 在点 $x_0$ 处的导数，记为 $f'(x_0)$ ，即 $f'(x_0)=\lim\limits_
{\Delta x \to 0}\frac{\Delta y}{\Delta x}=\lim\limits_{\Delta x \to 0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$ ，也可以记为
$y'|_{x=x_0}$ 或 $\frac{df(x)}{dx}|_{x=x_0}$

导数定义的其他形式，常见的有：
$$
f'(x_0)=\lim\limits_{h \to 0}\frac{f(x_0+h)-f(x_0)}{h},f'(x_0)=\lim\limits_{x \to x_0}\frac{f(x)-f(x_0)}{x-x_0}
$$

**（2）导函数**

​ 导函数：$f'(x)=\lim\limits_{\Delta x \to 0}\frac{\Delta y}{\Delta x}=\lim\limits_{\Delta x \to 0}\frac{f(x+\Delta x)-f(
x)}{\Delta x}$，可记为 $y'=f'(x)$ 或 $\frac{dy}{dx}$

**（3）左右导数及可导的充要条件**

左导数：$f'_-(x_0)=\lim\limits_{x\to x_0^-}\frac{f(x)-f(x_0)}{x-x_0}$ ；右导数：$f'_+(x_0)=\lim\limits_{x\to x_0^+}\frac{f(
x)-f(x_0)}{x-x_0}$

$f(x)$ 在 $x=x_0$ 处可导的充要条件为： $f'_-(x_0)=f'_+(x_0)$

**（4）函数在一点可导与连续的关系：** 可到一定连续，连续不一定可导。

### 导数的几何意义

函数 $y=f(x)$ 在点 $x_0$ 处的导数 $f'(x_0)$ 在几何上表示曲线 $y=f(x)$ 在点 $M(x_0,f(x_0))$ 处的切线的斜率，即 $f'(x_0)
=\tan \alpha$ ，其中 $\alpha$ 是切线的倾角。

切线方程：

（1）若 $y=f(x)$ 在点 $x_0$ 处可导，则曲线 $y=f(x)$ 在点 $M(x_0,f(x_0))$ 处的切线方程
$$
y-y_0=f'(x_0)(x-x_0)
$$
（2）若 $f'(x_0)=0$ ，切线垂直于 $y$ 轴，此时的切线方程： $y=f(x_0)$

（3）若 $f'(x_0)=\infty$ ，切线垂直于 $x$ 轴，此时的切线方程： $x=x_0$

法线方程：

（1）当 $f'(x_0)\ne 0$ 时，则曲线在点 $(x_0,f(x_0))$ 处的法线方程： $y-y_0=-\frac{1}{f'(x_0)}(x-x_0)$

（2）当 $f'(x_0)= 0$ 时，切线垂直于 $y$ 轴，此时的法线方程：$x=x_0$

（3）当 $f'(x_0)= \infty$ 时，切线垂直于 $x$ 轴，此时的法线方程：$y=f(x_0)$

## 求导法则与求导方法

### 基本求导法则与求导公式

**1）基本初等函数的导数**

（1）$(c)'=0$ （2）$(x^u)'=\mu x^{\mu -1}$ （3）$(a^x)'=a^x\ln a$ （4）$(e^x)'=e^x$

（5）$(\log _a x)'=\frac{1}{x\ln a}$ （6）$(\ln x)'=\frac{1}{x}$ （7）$(\sin x)'=\cos x$ （8）$(\cos x)'=-\sin x$

（9）$(\tan x)'=\sec ^2 x$ （10）$(\cot x)'=-\csc ^2 x$ （11）$(\sec x)'=\sec x \cdot \tan x$ （12）$(\csc x)'=-\csc x \cdot
\cot x$

（13）$(\arcsin x)'=\frac{1}{\sqrt{1-x^2}}$ （14）$(\arccos x)'=-\frac{1}{\sqrt{1-x^2}}$ （15）$(\arctan x)'=\frac{1}{1+x^2}$
（16）$(arccotx)'=-\frac{1}{1+x^2}$

**2）函数的和、差、积、商的求导法则**

设 $u=u(x),v=v(x)$ 都可导，则

（1）$(u \pm v)'=u' \pm v'$ （2）$(Cu)'=Cu'$

（3）$(uv)'=u'v+uv'$ （4）$(\frac{u}{v})'=\frac{u'v-uv'}{v^2}$

**3）反函数的求导法则**

设 $x=f(y)$ 在区间 $I_y$ 内单调、可导且 $f'(y)\ne 0$ ，则它的反函数 $y=f^{-1}(x)$ 在 $I_x =\{x|x=f(y),y\in I(y)\}$
内也可导，并且 $[f^{-1}(x)]'=\frac{1}{f'(y)}$ ，或 $\frac{dy}{dx}=\frac{1}{dx/dy}$

​ 方法：求 $y=f(x)$ 的反函数 $x=f^{-1}(y)$ 的导数步骤：

​ （1）求出 $f'(x)$

​ （2）反函数 $x=f^{-1}(y)$ 的导数为 $\frac{1}{f'(x)}$

​ （3）将 $\frac{1}{f'(x)}$ 中的 $x$ 用 $x=f^{-1}(y)$ 替换，或将所有关于 $x$ 的式子用 $y$ 代替即可

**4）复合函数的求导法则 —— 链式法则**

已知复合函数 $y=f[g(x)]$ ，且 $y=f(u),u=g(x)$ 都可导，则复合函数 $y=f[g(x)]$ 的导数为 $\frac{dy}{dx}=\frac{dy}{du}\cdot
\frac{du}{dx}$ ，或 $y'=f'(u)\cdot g'(x)$

## 高阶导数

一般地，函数 $y=f(x)$ 的导数 $y'=f'(x)$ 仍然是 $x$ 的函数，我们把 $y'=f'(x)$ 的导数叫做函数 $y=f(x)$ 的二阶导数，记作 $y''
,f''(x)$ 或 $\frac{d^2y}{dx^2}$

类似地，二阶导数的导数，叫做三阶导数，一般地，$n-1$ 阶导数的导数叫做 $n$ 阶导数，分别记作 $y''',y^{(4)},\cdots y^{(n)}$ 或
$\frac{d^3y}{dx^3},\frac{d^4y}{dx^4},\cdots\frac{d^ny}{dx^n}$，二阶及二阶以上的导数统称为高阶导数

### 高阶导的运算法则

设 $u=u(x),v=v(x)$ 都可导，则

（1）$(u \pm v)^{(n)}=u^{(n)} \pm v^{(n)}$ （2）$(Cu)^{(n)}=Cu^{(n)}$

**莱布尼茨公式**
$$
(uv)^{(n)}=\sum_{k=0}^nC_n^ku^{(n-k)}v^{(k)}=C_n^0u^{(n)}v^{(0)}+C_n^1u^{(n-1)}v'+\cdots+C_n^{n-1}u'v^{(n-1)
}+C_n^{n}u^{(0)}v^{(n)}
$$

## 求导方法

**1）隐函数求导**

隐函数 $y=y(x)$ 求导方法：

（1）方程两端同时对自变量 $x$ 求导，注意把 $y$ 当作复合函数求导的中间变量来看待

（2）从求导后的方程中解出 $y'$

（3）隐函数求导允许其结果中含有 $y'$

**2）对数求导法**

​ 先在 $y=f(x)$ 两边取对数，然后再求出 $y$ 的导数

设 $y=f(x)$ ，两边取对数，得 $\ln y=\ln f(x)$ ，两边对 $x$ 求导，得 $\frac{1}{y}\cdot y'=[\ln f(x)]'$，故 $y'=f(x)
\cdot [\ln f(x)]'$

**3）参数方程求导**

设 $y$ 与 $x$ 的函数关系式由参数方程 $\begin{cases}x=\varphi(t)\\y=\psi(t)\end{cases}$ 所确定的，则称此函数关系所表达的函数为由参数方程所确定的函数，若
$x=\varphi(t)$ 和 $y=\psi(t)$ 都可导，则

（1）一阶导： $\frac{dy}{dx}=\frac{(\frac{dy}{dt})}{(\frac{dx}{dt})}=\frac{\psi'(t)}{\varphi'(t)}$

（2）二阶导：$\frac{d^2y}{dx^2}=\frac{d}{dx}(\frac{dy}{dx})=\frac{\frac{d}{dt}(\frac{dy}{dx})}{\frac{dx}{dt}}$

## 微分

定义 设函数 $y=f(x)$ 在某区间内有定义， $x_0$ 及 $x_0+\Delta x$ 在该区间内，如果函数的增量 $\Delta y = f(x_0+\Delta x)-f(
x_0)$ 可表示为 $\Delta y = A\Delta x + o(\Delta x)$ ，其中 $A$ 是不依赖于 $\Delta x$ 的常数，而 $o(\Delta x)$ 是比 $\Delta
x $高阶的无穷小，那么称函数 $y=f(x)$ 在点 $x_0$ 处是可微的，而 $A\Delta x$ 叫做函数 $y=f(x)$ 在点 $x_0$ 相应于自变量增量
$\Delta x$ 的微分，记作 $dy$ ，即 $dy=A\Delta x$

**函数可微的条件：**

函数 $f(x)$ 在点 $x_0$ 可微的充分必要条件是函数 $f(x)$ 在点 $x_0$ 可导，且当函数 $f(x)$ 在点 $x_0$ 可微时，其微分一定是
$dy|_{x=x_0}f'(x_0)\Delta x$

**微分法则**

（1）$d(u \pm v)=du \pm dv$ （2）$d(Cu)=Cdu$

（3）$d(uv)=vdu+udv$ （4）$d(\frac{u}{v})=\frac{vdu-udv}{v^2}$

**微分的几何意义**

当 $\Delta y$ 是曲线 $y=f(x)$ 上点的纵坐标的增量时， $dy$ 就是曲线的切线上点的纵坐标的相应增量，当 $|\Delta x|$
很小时，$|\Delta y -dy|$ 比 $|\Delta x|$ 小得多，因此在点 $M$ 的附近，我们可以用切线段来近似代替曲线段。
