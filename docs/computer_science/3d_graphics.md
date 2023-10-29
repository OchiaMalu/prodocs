# 计算机科学入门

在过去我们从基于 `电传打字机` 的 **命令行界面** ，讲到图形怎么显示到屏幕上，再到 `图形用户界面` （GUI）。

之前的例子都是 2D ，但我们生活的世界是 3D 的，所以今天，我们讲 `3D 图形` 的基础知识，以及如何渲染 3D 图形到 2D 屏幕上。

## 3D 投影

以前说过，可以写一个 **函数** ，从 A 到 B 画一条线，通过控制 A 和 B 的 (X，Y) 坐标，可以控制一条线。

<img src="http://niu.ochiamalu.xyz/image-20231028194022824.png" alt="image-20231028194022824" style="zoom:80%;margin:0 auto" />

在 3D 图像中，点的坐标不再是两点，而是 **三点** ，X，Y，Z。

当然，2D 的电脑屏幕上，不可能有 XYZ 立体坐标轴，所以有图形算法，负责把 3D 坐标 "拍平" 显示到 2D 屏幕上，这叫 `3D投影` （3D
Projection）。

### 线框渲染

所有的点都从 3D 转成 2D 后，就可以用画 2D 线段的函数来连接这些点，这叫 `线框渲染` （Wireframe Rendering）。

想象一个立方体，然后用手电筒照它，墙上的影子就是投射，是平的，如果旋转立方体，投影看起来会像3D物体，尽管是投影面是平的，电脑也是这样
3D 转 2D ，只不过用大量数学。

<img src="http://niu.ochiamalu.xyz/image-20231028194237240.png" alt="image-20231028194237240" style="zoom:80%;margin:0 auto" />

#### 正交投影

3D 投影有好几种，你现在看到的，叫 `正交投影` （Orthographic Projection），立方体的各个边，在投影中 **互相平行** 。

<img src="http://niu.ochiamalu.xyz/image-20231028194257272.png" alt="image-20231028194257272" style="zoom:80%;margin:0 auto" />

在真实3D世界中，平行线段会在远处收敛于一点，就像远处的马路汇聚到一点，这叫 `透视投射` （Perspective Projection）。

<img src="http://niu.ochiamalu.xyz/image-20231028194315219.png" alt="image-20231028194315219" style="zoom:80%;margin:0 auto" />

过程是类似的，只是数学稍有不同，有时你想要透视投影，有时不想，具体取决于开发人员。

如果想画立方体这种简单图形，直线就够了。但想画更复杂的图形，用三角形更好，在3D图形学中，我们叫三角形 "多边形" (Polygons)。

<img src="http://niu.ochiamalu.xyz/image-20231028194355124.png" alt="image-20231028194355124" style="zoom: 150%;margin:0 auto" />

看看这个多边形组成的漂亮茶壶，一堆多边形的集合叫网格，网格越密，表面越光滑，细节越多，但意味着更多计算量。

<img src="http://niu.ochiamalu.xyz/image-20231028194415974.png" alt="image-20231028194415974" style="zoom:150%;margin:0 auto" />

游戏设计者要平衡角色的真实度，和多边形数量，如果数量太多，帧率会下降到肉眼可感知，用户会觉得卡，因此有算法用来简化网格。

之所以三角形更常用，而不是用正方形，或其它更复杂的图形，是因为三角形的 **简单性** ，空间中三点定义一个平面，如果给 3 个 3D
点，我能画出一个平面，而且只有这一个答案，4 个或多于 4 个点就不一定了，而 2 个点不够定义平面，只能定义线段，所以 3 是最完美的数字。

<img src="http://niu.ochiamalu.xyz/image-20231028194454725.png" alt="image-20231028194454725" style="zoom: 67%; margin: 0px auto;" />

### 扫描线渲染

线框渲染虽然很酷，但 3D 图像需要填充，填充图形的经典算法叫 `扫描线渲染` (Scanline Rendering)，于 1967 年诞生在犹他州大学。

为了例子简单，我们只看一个多边形，我们要思考，这个多边形如何转成一块填满像素的区域，我们先铺一层 **像素网格** 。

<img src="http://niu.ochiamalu.xyz/image-20231028194524405.png" alt="image-20231028194524405" style="zoom:80%;margin:0 auto" />

扫描线算法先读多边形的 3 个点，找最大和最小的 Y 值，只在这两点间工作。

<img src="http://niu.ochiamalu.xyz/image-20231028194635390.png" alt="image-20231028194635390" style="zoom:80%;margin:0 auto" />

计算每一行和多边形相交的 2 个点 ，因为是三角形，如果相交一条边，必然相交另一条，扫描线算法会填满 2 个相交点之间的像素。

来看个具体例子，第一行相交于这里和这里，算法把两点间填满颜色。

<img src="http://niu.ochiamalu.xyz/image-20231028194833014.png" alt="image-20231028194833014" style="zoom:80%;margin:0 auto" />

然后下一行，再下一行，所以叫 `扫描线渲染` ，扫到底部就完成了。

<img src="http://niu.ochiamalu.xyz/image-20231028194750032.png" alt="image-20231028194750032" style="zoom:80%;margin:0 auto" />

填充的速度叫 `fillrate`（填充速率），当然这样的三角形比较丑，边缘满是锯齿，当像素较小时就不那么明显。

<img src="http://niu.ochiamalu.xyz/image-20231028194924825.png" alt="image-20231028194924825" style="zoom:80%;margin:0 auto" />

但尽管如此，你肯定在游戏里见过这种效果，特别是低配电脑。

### 抗锯齿

一种减轻锯齿的方法叫，`抗锯齿`  (Antialiasing) ，与其每个像素都涂成一样的颜色，可以判断 <u>多边形切过像素的程度</u> ，来 *
*调整** 颜色，如果像素在多边形内部，就直接涂颜色.

<img src="http://niu.ochiamalu.xyz/image-20231028195015175.png" alt="image-20231028195015175" style="zoom:80%;margin:0 auto" />

如果多边形划过像素，颜色就浅一些。

<img src="http://niu.ochiamalu.xyz/image-20231028195036800.png" alt="image-20231028195036800" style="zoom:80%;margin:0 auto" />

这种边缘羽化的效果看着更舒服些，抗锯齿被广泛使用，比如字体和图标。

<img src="http://niu.ochiamalu.xyz/image-20231028195053159.png" alt="image-20231028195053159" style="zoom:80%;margin:0 auto" />

如果你把脸贴近屏幕，你能看到浏览器里字体是抗锯齿的，超平滑。

<img src="http://niu.ochiamalu.xyz/image-20231028195121670.png" alt="image-20231028195121670" style="zoom:80%;margin:0 auto" />

### 遮挡

在 3D 场景中，多边形到处都是，但只有一部分能看见，因为其它的被挡住了，这叫 `遮挡` （occlusion）。

#### 画家算法

最直接的处理办法是用排序算法， **从远到近** 排列，然后 **从远到近** 渲染，这叫 `画家算法` （Painter's Algorithm）
因为画家也是先画背景，然后再画更近的东西。

看这个例子，有 3 个重叠的多边形 ，为了简单，我们画成不同颜色。

<img src="http://niu.ochiamalu.xyz/image-20231028195203862.png" alt="image-20231028195203862" style="zoom:80%;margin:0 auto" />

同时，假设3个多边形都和屏幕平行，但在实际应用中，比如游戏里，多边形可能是 **倾斜** 的。

<img src="http://niu.ochiamalu.xyz/image-20231028195223371.png" alt="image-20231028195223371" style="zoom:80%;margin:0 auto" />

3 个多边形 A , B , C ，距离 20 , 12 , 14 ，画家算法的第一件事，是 **从远到近** 排序。

<img src="http://niu.ochiamalu.xyz/image-20231028195240938.png" alt="image-20231028195240938" style="zoom:80%;margin:0 auto" />

现在有序了，我们可以用扫描线算法填充多边形，一次填一个，我们从最远的 A 开始。

<img src="http://niu.ochiamalu.xyz/image-20231028195259530.png" alt="image-20231028195259530" style="zoom:80%;margin:0 auto" />

然后重复这个过程，填充第二远的C 。

<img src="http://niu.ochiamalu.xyz/image-20231028195312752.png" alt="image-20231028195312752" style="zoom:80%;margin:0 auto" />

然后是 B 。

现在完成了，可以看到顺序是对的，近的多边形在前面！

<img src="http://niu.ochiamalu.xyz/image-20231028195327925.png" alt="image-20231028195327925" style="zoom:80%;margin:0 auto" />

#### 深度缓冲

还有一种方法叫 `深度缓冲` （Z-Buffering），它和之前的算法做的事情一样，但方法不同。

我们回到之前的例子，回到排序前的状态。

因为这个算法不用排序，所以速度更快。

简而言之，Z-buffering 算法会记录场景中 <u>每个像素和摄像机的距离</u> ，在内存里存一个数字矩阵。

首先，每个像素的距离被初始化为 **无限大** ，然后 Z-buffering 从列表里第一个多边形开始处理，也就是A 。

<img src="http://niu.ochiamalu.xyz/image-20231028195442534.png" alt="image-20231028195442534" style="zoom:80%;margin:0 auto" />

它和扫描线算法逻辑相同，但不是给像素填充颜色，而是把多边形的距离，和 Z-Buffer 里的距离进行对比，它总是记录更低的值。

A 距离 20 ，20 小于 **无限大** ，所以缓冲区记录 20 。

<img src="http://niu.ochiamalu.xyz/image-20231028195525130.png" alt="image-20231028195525130" style="zoom:80%;margin:0 auto" />

算完 A 之后算下一个，以此类推。

<img src="http://niu.ochiamalu.xyz/image-20231028195609714.png" alt="image-20231028195609714" style="zoom:80%;margin:0 auto" />

因为没对多边形排序，所以后处理的多边形并不总会覆盖前面的。

对于多边形 C ，缓冲区里只有一部分值会被多边形 C 的距离值覆盖。

<img src="http://niu.ochiamalu.xyz/image-20231028195555176.png" alt="image-20231028195555176" style="zoom:80%;margin:0 auto" />

缓冲区完成后，会和 `扫描线算法` 的改进高级版配合使用，不仅可以勘测到线的交叉点，还可以知道某像素是否在最终场景中 **可见**
，如果不可见，扫描线算法会跳过那个部分。

<img src="http://niu.ochiamalu.xyz/image-20231028195716992.png" alt="image-20231028195716992" style="zoom:80%;margin:0 auto" />

#### Z-fighting

当两个多边形距离相同时，会出现一个有趣问题： <u>如果多边形A和B距离都是20，哪个画上面？</u>

<img src="http://niu.ochiamalu.xyz/image-20231028195751975.png" alt="image-20231028195751975" style="zoom:80%;margin:0 auto" />

多边形会在内存中移来移去，访问顺序会不断变化，另外，计算浮点数有舍入误差，所以哪一个画在上面，往往是不可预测的。

导致出现 `Z-fighting` 效果，如果你玩过 3D 游戏，肯定见过。

### 背面剔除

说起故障，3D 游戏中有个优化叫 `背面剔除` （Back-Face Culling）。

你想想，三角形有两面，正面和背面，游戏角色的头部或地面，只能看到朝外的一面，所以为了节省处理时间，会 **忽略** 多边形背面，减了一半多边形面数。

这很好，但有个 bug 是如果进入 **模型内部** 往外看，头部和地面会消失。

<img src="http://niu.ochiamalu.xyz/image-20231028195909346.png" alt="image-20231028195909346" style="zoom:80%;margin:0 auto" />

### 灯光

继续，我们讲 `灯光` ，也叫 **明暗处理** ，因为 3D 场景中，物体表面应该有明暗变化。

我们回到之前的茶壶网格，用 `扫描线算法` 渲染所有多边形后，茶壶看起来像这样，没什么 3D 感。

<img src="http://niu.ochiamalu.xyz/image-20231028195943406.png" alt="image-20231028195943406" style="zoom:80%;margin:0 auto" />

我们来加点灯光，提高真实感。

#### 平面着色

为了举例，我们从茶壶上挑 3 个 **不同位置** 的多边形，和之前的例子不同，这次要考虑这些多边形 **面对** 的方向。

<img src="http://niu.ochiamalu.xyz/image-20231028200000424.png" alt="image-20231028200000424" style="zoom:80%;margin:0 auto" />

它们不平行于屏幕，而是面对不同方向，他们面对的方向叫 `表面法线` （Surface Normal）。

我们可以用一个垂直于表面的小箭头，来显示这个方向。

<img src="http://niu.ochiamalu.xyz/image-20231028200027262.png" alt="image-20231028200027262" style="zoom:80%;margin:0 auto" />

现在加个光源，每个多边形被照亮的程度不同有的更亮，因为面对的角度，导致更多光线反射到观察者。

<img src="http://niu.ochiamalu.xyz/image-20231028200051118.png" alt="image-20231028200051118" style="zoom:80%;margin:0 auto" />

举个例子，底部的多边形向下倾斜，远离光源，所以更暗一些。

<img src="http://niu.ochiamalu.xyz/image-20231028200110712.png" alt="image-20231028200110712" style="zoom:80%;margin:0 auto" />

类似的，最右的多边形更背对光源，所以只有部分照亮。

<img src="http://niu.ochiamalu.xyz/image-20231028200122218.png" alt="image-20231028200122218" style="zoom:80%;margin:0 auto" />

最后是左上角的多边形，因为它面对的角度意味着会把光线反射到我们这里，所以会显得更亮。

<img src="http://niu.ochiamalu.xyz/image-20231028200137114.png" alt="image-20231028200137114" style="zoom:80%;margin:0 auto" />

如果对每个多边形执行同样的步骤，看上去会更真实！

<img src="http://niu.ochiamalu.xyz/image-20231028200155361.png" alt="image-20231028200155361" style="zoom:80%;margin:0 auto" />

这叫 `平面着色` （Flat Shading），是最基本的照明算法。

不幸的是，这使多边形的边界非常明显，看起来不光滑，因此开发了更多算法，比如 `高洛德着色` 和 `冯氏着色`
，不只用一种颜色给整个多边形上色，而是以巧妙的方式改变颜色，得到更好的效果。

### 纹理

我们还要说下 `纹理` ，纹理在图形学中指外观，而不是手感。

#### 纹理映射

就像照明算法一样，纹理也有多种算法，来做各种花哨效果，最简单的是 `纹理映射` （texture mapping）。

为了理解纹理映射，回到单个多边形，用 `扫描线算法` 填充时，可以看看内存内的纹理图像决定像素用什么颜色。

<img src="http://niu.ochiamalu.xyz/image-20231028200332584.png" alt="image-20231028200332584" style="zoom:80%;margin:0 auto" />

为了做到这点，需要把多边形坐标和纹理坐标对应起来。

我们来看看 `扫描线算法` 要填充的第一个像素，纹理算法会查询纹理，从相应区域取平均颜色，并填充多边形。

<img src="http://niu.ochiamalu.xyz/image-20231028200354859.png" alt="image-20231028200354859" style="zoom:80%;margin:0 auto" />

重复这个过程，就可以获得纹理。

<img src="http://niu.ochiamalu.xyz/image-20231028200410645.png" alt="image-20231028200410645" style="zoom:80%;margin:0 auto" />

如果结合所有技巧，会得到一个精美的小茶壶，这个茶壶可以放进更大的场景里，场景由上百万个多边形组成。

<img src="http://niu.ochiamalu.xyz/image-20231028200428251.png" alt="image-20231028200428251" style="zoom:80%;margin:0 auto" />

## 显卡

渲染这样的场景需要大量计算，但重要的是，再大的场景，过程都是一样的，一遍又一遍，处理所有多边形。

扫描线填充，抗锯齿，光照，纹理化。

首先，我们可以为这种特定运算，做 **专门的硬件** 来加快速度，让运算快如闪电。

其次，我们可以把 3D 场景分解成多个小部分，然后 **并行** 渲染，而不是按顺序渲染。

CPU 不是为此设计的，因此图形运算不快，所以，计算机工程师为图形做了专门的处理器叫 `GPU`  ，也就是 `图形处理单元` （Graphics
Processing Unit）。

<img src="http://niu.ochiamalu.xyz/image-20231028200456535.png" alt="image-20231028200456535" style="zoom:80%;margin:0 auto" />

GPU 在 **显卡** 上，周围有专用的RAM ，所有网格和纹理都在里面，让 GPU 的多个核心可以高速访问。

现代显卡，如GeForce GTX 1080TI 有3584个处理核心，提供大规模并行处理，每秒处理上亿个多边形！

