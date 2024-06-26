# 计算机科学入门

为了脱离底层细节，开发了编程语言，让程序员专心解决问题，不用管硬件细节。

今天我们讨论大多数编程语言都有的基本元素。

就像口语一样，编程语言有 "语句" ，规定句子结构的一系列规则叫 **语法** 。英语有语法，所有编程语言也都有语法。

## 赋值语句

`a=5` 是一个编程语言语句，意思是创建一个叫 `a` 的 **变量** ，把数字 5 放里面。

为了表达更复杂的含义，需要更多语句。

```python
a = 5
b = 10
c = a + b
```

意思是，变量 a 设为5，变量 b 设为10，把 a 和 b 加起来，把结果 15 放进变量 c，注意，变量名可以随意取。

计算机不在乎你取什么名，只要 **不重名** 就行。

当然取名最好还是有点意义，方便别人读懂。

你可能会看到类似于这样的语句： `a = a + 1` ，看起来有点怪，变量的赋值用到了自己。

因为 `= ` 的优先级比 `+` 低，因此它会先算出 `a + 1` ，然后再将算出来的值赋值给 `a` ，`a = a + 1`就是将 `a` 自增 1 。

这样做的好处是可以减少变量数。

```python
a = 1
b = a + 1
a = c
```

```python
a = 1
a = a + 1
```

这两个的效果都是一样的，最后 `a` 的值都是 `2` ，但是第二个更简略，而且占用的空间也更少。

我们知道如 `a` 、`b` 本质都是一段内存地址，第一段代码开辟了 **两个** 空间：`a` 、`b` ，而第二段代码只开辟了 **一个**
空间 `a` 。

<u>我们需要写出更优质的代码。</u>

## 控制流语句

为了让程序更加灵活，不只是从上到下运行，因此使用 **控制流语句** ，我们之前提到过的 JUMP 就是其中之一。

控制流语句有好几种，最常见的是 **if** 语句。可以想成是 "如果 X 为真，那么执行 Y"，这其中的 `X为真` 就是 **条件** ，也叫做 *
*表达式** 。

if 语句就像岔路口，走哪条路 取决于 `表达式` 的真假，因此这些表达式又叫 `条件语句` 。

大多数编程语言中，if 语句长这样：

<img src="http://niu.ochiamalu.top/image-20231011140139099.png" alt="image-20231011140139099" style="zoom:80%;margin: 0 auto" />

当然各个语言都是大同小异，有些有圆括号，有些有花括号，但基本都是 `if + 表达式 + 要做的事` 。

除了 if 还有 else，如果当 表达式 为 False，那么就会执行 else 中的语句。

<img src="http://niu.ochiamalu.top/image-20231011140413665.png" alt="image-20231011140413665" style="zoom:80%;margin: 0 auto" />

这里列了一些热门编程语言 if-then-else 的具体语法，具体语法略有不同，但主体结构一样。

::: code-group

```pascal [pascal]
if a>0 then
  writeln("yes")
else
  writeln("no");
```

```ada [ada]
if a>0 then
    Put_Line("yes");
else
    Put_Line("no");
end if;
```

```c [c]
if (a>0){
    printf("yes");
}else{
    printf("no");
}
```

```shell [shell]
if [$a -gt 0]; then
    echo "yes"
else 
	echo "no"
fi
```

```python [python]
if a>0:
	print "yes"
else:
	print "no"
```

:::

## 条件循环

### while 循环

if 语句 根据条件执行 **一次** ，如果希望根据条件执行 **多次** ，需要 **条件循环** ，比如 while 语句，也叫 `while 循环` 。当
while 条件为真，代码会重复执行。

<img src="http://niu.ochiamalu.top/image-20231011141337880.png" alt="image-20231011141337880" style="zoom:80%;margin: 0 auto" />

::: tip

根据需求，有时也会使用没有条件的无穷循环。

:::

### for 循环

还有一种常见的循环是 `for循环` ，一般的用法是以 **计步** 的方式判断是否进行下一次循环，如 `for(i = 0;i < 10;i++)`
，它的意思是设 `i` 的初始值为 `0` ，每次循环后将 `i + 1`，只要 `i < 10` 就不断循环。

::: tip

for 循环本质还是判断表达式是否为真，没有规定必须使用 **计步** 的方式。

:::



<img src="http://niu.ochiamalu.top/image-20231011141441431.png" alt="image-20231011141441431" style="zoom:80%;margin: 0 auto" />

## 函数

让我们来看看这段代码。

```python
ans = 1
i = 1
n = 6
while i < n:                                              
	ans = ans * i                                            
	i = i + 1
```

在每次循环后，`i` 都会 `+1` ，直到 `i =n` ，在循环中，`ans` 都会跟 `i` 相乘最后赋值给 `ans`，也就是 1*1 ，1\*2 ，2\*3 ，6\*4……

如果在一个程序中有很多地方都需要使用这段代码，我们需要将它复制粘贴很多次。

如果这时候我需要将 n = 6 修改为 n = 7，那么我需要改很多地方……这很麻烦。

因此我们可以将这段代码包装成一个 **函数** 。

```python
def fun1():
	ans = 1
	i = 1
	n = 6
	while i < n:                                              
		ans = ans * i                                            
		i = i + 1
```

::: tip

不同的编程语言有不同的写法。

:::

这样以来，之后想使用这段代码只需要写上 `fun1()` ，运行到 `fun1()` 的时候就会执行 `fun1()` 中的代码，而如果这时候我需要将
n = 6 修改为 n = 7 ，只需要修改 **一个** 地方。

### 参数和返回值

函数就像一个盒子，我启动它，它就会运行一段代码，而我不需要管代码具体是怎么样的，只需要知道它的功能就可以。

当然，我们可以给这个盒子一个东西，它经过一顿操作之后把结果还给我，这时候我们给它的东西叫做 **参数**  ，它还给我们的东西就叫
**返回值** 。

像刚才那段代码，我们可以在函数外面生成一个数字，然后将这个数字传给函数，函数执行完成之后再将结果还给我们，在这之后我们可以用
**返回值** 做其他的工作。

```python
def fun1(n): //[!code hl]
	ans = 1
	i = 1
	while i < n:                                              
		ans = ans * i                                            
		i = i + 1
    return ans //[!code hl]

n = 6
ans = fun1(n)
……
```

## 库

现代编程语言 有很多预先写好的函数集合，叫 `库` ，由专业人员编写，不仅效率高，而且经过了仔细检查。

我们在使用的时候不需要知道具体是怎么实现的，我们也不需要自己写实现的代码，我们只需要写出函数名，就可以直接使用别人写好的功能，大大减少了开发时间。
