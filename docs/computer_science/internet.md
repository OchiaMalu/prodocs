# 计算机科学入门

上次讲到，你的计算机和一个巨大的分布式网络连在一起，这个网络叫 `互联网` （Internet）。

互联网由无数互联设备组成，而且日益增多，计算机为了获取这个视频，首先要连到 `局域网` （local area network），也叫 **LAN** ，你家
WIFI 路由器连着的所有设备，组成了局域网。

局域网再连到 `广域网` （Wide Area Network），广域网也叫 **WAN** 。

<img src="http://niu.ochiamalu.top/image-20231031163549501.png" alt="image-20231031163549501" style="zoom:80%;margin:0 auto" />

## ISP

WAN 的路由器一般属于你的 `互联网服务提供商` （Internet Service Provider），简称 **ISP** ，比如 `中国电信` ， `中国移动`
和 `中国联通` 这样的公司。

<img src="http://niu.ochiamalu.top/image-20231031163655601.png" alt="image-20231031163655601" style="zoom:80%;margin:0 auto" />

广域网里，先连到一个区域性路由器，这路由器可能覆盖一个街区，然后连到一个更大的 WAN ，可能覆盖整个城市。

可能再跳几次，但最终会到达 `互联网主干` ，互联网主干由一群超大型、带宽超高路由器组成。

为了从 YouTube 获得这个视频，数据包（packet）要先到互联网主干。

数据包从你的计算机跳到 Youtube 服务器，可能要跳个 10 次，先跳 4 次到互联网主干，2 次穿过主干，主干出来可能再跳 4 次，然后到
Youtube 服务器。

如果你在用 Windows ， MacOS 或 Linux 系统，可以用 `traceroute` 来看跳了几次，在 Windows 系统中，该命令为 `tracert` 。

我们在 `印第安纳波利斯` 的 **Chad&StacyEmigholz 工作室** ，访问加州的 `DFTBA` 服务器，经历了 11 次中转。

从 `192.168.0.1` 出发，这是我的电脑在局域网（LAN）里的 IP 地址，然后到工作室的 WIFI 路由器，然后穿过一个个地区路由器，到达主干。

<img src="http://niu.ochiamalu.top/image-20231031164353682.png" alt="image-20231031164353682" style="zoom:80%;margin:0 auto" />

然后从主干出来，又跳了几次，到达 `DFTBA.com` 的服务器，IP地址是 `104.24.109.186` 。

<img src="http://niu.ochiamalu.top/image-20231031164414020.png" alt="image-20231031164414020" style="zoom:80%;margin:0 auto" />

但数据包到底是怎么过去的？如果传输时数据包被弄丢了，会发生什么？

如果在浏览器里输 `DFTBA.com` ，浏览器怎么知道服务器的地址多少？

上次说过，互联网是一个巨型分布式网络，会把数据拆成一个个数据包来传输。

<img src="http://niu.ochiamalu.top/image-20231031164452047.png" alt="image-20231031164452047" style="zoom:80%;margin:0 auto" />

如果要发的数据很大，比如邮件附件，数据会被拆成多个小数据包。

举例，你现在看的这个视频，就是一个个到达你电脑的数据包，而不是一整个大文件发过来。

数据包（packet）想在互联网上传输，要符合 `互联网协议` （Internet Protocol）的标准，简称 **IP**
，就像邮寄手写信一样，邮寄是有标准的，每封信需要一个地址，而且地址必须是独特的，并且大小和重量是有限制的，违反这些规定，信件就无法送达，IP
数据包也是如此。

## UDP

因为 IP 是一个非常底层的协议，数据包的头部（或者说前面）只有目标地址，头部存 **关于数据的数据** ，也叫 `元数据` (metadata)
，这意味着当数据包到达对方电脑，对方不知道把包交给哪个程序，是交给 Skype 还是使命召唤？

<img src="http://niu.ochiamalu.top/image-20231031164524197.png" alt="image-20231031164524197" style="zoom:80%;margin:0 auto" />

因此需要在IP之上，开发更高级的协议，这些协议里，最简单最常见的叫 `用户数据报协议` （User Datagram Protocol），简称 **UDP** 。

<img src="http://niu.ochiamalu.top/image-20231031164548925.png" alt="image-20231031164548925" style="zoom:80%;margin:0 auto" />

UDP 也有头部，这个头部位于数据前面，头部里包含有用的信息，信息之一是 **端口号** 。

<img src="http://niu.ochiamalu.top/image-20231031164605464.png" alt="image-20231031164605464" style="zoom:80%;margin:0 auto" />

每个想访问网络的程序，都要向操作系统申请一个端口号，比如 Skype 会申请端口3478，当一个数据包到达时，接收方的操作系统会读 UDP
头部，读里面的端口号，如果看到端口号是 3478 ，就把数据包交给 Skype 。

总结：IP 负责把数据包送到正确的 **计算机** ，UDP 负责把数据包送到正确的 **程序** 。

### 校验和

UDP头部里还有 `校验和` （checksum），用于检查数据是否正确。

<img src="http://niu.ochiamalu.top/image-20231031164638332.png" alt="image-20231031164638332" style="zoom:80%;margin:0 auto" />

正如"校验和"这个名字所暗示的，检查方式是把数据求和来对比，以下是个简单例子。

假设 UDP 数据包里，原始数据是 8911133325841 。

<img src="http://niu.ochiamalu.top/image-20231031164655027.png" alt="image-20231031164655027" style="zoom:80%;margin:0 auto" />

在发送数据包前，电脑会把所有数据加在一起，算出 `校验和` ，89+111+33+... 以此类推，得到 364 ，这就是 `校验和` 。

<img src="http://niu.ochiamalu.top/image-20231031164717256.png" alt="image-20231031164717256" style="zoom:80%;margin:0 auto" />

UDP中， `校验和` 以 16 位形式存储(就是16个0或1)，如果算出来的和，超过了16位能表示的最大值，高位数会被 **扔掉** ，保留低位。

当接收方电脑收到这个数据包，它会重复这个步骤，把所有数据加在一起，89+111+33... 以此类推，如果结果和头部中的校验和一致，代表一切正常。

<img src="http://niu.ochiamalu.top/image-20231031164740609.png" alt="image-20231031164740609" style="zoom:80%;margin:0 auto" />

如果不一致，数据肯定坏掉了，也许传输时碰到了功率波动，或电缆出故障了。

<img src="http://niu.ochiamalu.top/image-20231031164756339.png" alt="image-20231031164756339" style="zoom:80%;margin:0 auto" />

不幸的是，UDP **不提供** 数据修复或数据重发的机制，接收方知道数据损坏后，一般只是扔掉，而且，UDP无法得知数据包是否到达，发送方发了之后，无法知道数据包是否到达目的地。

这些特性听起来很糟糕，但是有些程序不在意这些问题，因为 UDP 又简单又快。

拿 Skype 举例，它用 UDP 来做视频通话，能处理坏数据或缺失数据，所以网速慢的时候 Skype 卡卡的，因为只有一部分数据包到了你的电脑。

## TCP

但对于其他一些数据，这个方法不适用，比如发邮件，邮件不能只有开头和结尾没有中间，邮件要完整到达收件方。

如果所有数据必须到达，就用 `传输控制协议` （Transmission Control Protocol），简称 **TCP** 。

TCP 和 UDP 一样，头部也在存数据前面，因此，人们叫这个组合 **TCP/IP** 。

<img src="http://niu.ochiamalu.top/image-20231031164819945.png" alt="image-20231031164819945" style="zoom:80%;margin:0 auto" />

就像UDP，TCP头部也有 `端口号` 和 `校验和` ，但TCP有更高级的功能，我们这里只介绍重要的几个。

1. TCP数据包有 `序号` ，15号之后是16号，16号之后是17号，以此类推，发上百万个数据包也是有可能的，序号使接收方可以把数据包排成正确顺序，即使到达时间不同，哪怕到达顺序是乱的，TCP协议也能把顺序排对。
2. TCP要求接收方的电脑收到数据包，并且 `校验和` 检查无误后（数据没有损坏），给发送方发一个确认码，代表收到了， `确认码`
   （acknowledgement）简称ACK，得知上一个数据包成功抵达后，发送方会发下一个数据包，假设这次发出去之后，没收到确认码，那么肯定哪里错了，如果过了一定时间还没收到确认码，发送方会再发一次。

<img src="http://niu.ochiamalu.top/image-20231031164908099.png" alt="image-20231031164908099" style="zoom:80%;margin:0 auto" />

注意数据包可能的确到了，只是确认码延误了很久，或传输中丢失了，但这不碍事，因为收件方有序列号，如果收到重复的数据包就删掉。

还有，TCP 不是只能一个包一个包发，可以同时发 **多个** 数据包，收多个确认码，这大大增加了效率，不用浪费时间等确认码。

<img src="http://niu.ochiamalu.top/image-20231031164935444.png" alt="image-20231031164935444" style="zoom:80%;margin:0 auto" />

有趣的是，确认码的成功率和来回时间，可以推测网络的拥堵程度，TCP 用这个信息，调整同时发包数量，解决拥堵问题。

简单说，TCP 可以处理 **乱序** 和 **丢失** 数据包，丢了就重发，还可以根据拥挤情况自动调整传输率。

你可能会奇怪，既然 TCP 那么厉害，还有人用 UDP 吗？

TCP最大的缺点是，那些 `确认码` 数据包把数量翻了一倍，但并没有传输更多信息，有时候这种代价是不值得的，特别是对时间要求很高的程序，比如在线射击游戏，如果你玩游戏很卡，你也会觉得这样不值。

## DNS

当计算机访问一个网站时，需要两个东西：

1. IP地址
2. 端口号

例如 172.217.7.238 的 80 端口，这是谷歌的 IP 地址和端口号。

事实上，你可以输到浏览器里，然后你会进入谷歌首页，有了这两个东西就能访问正确的网站，但记一长串数字很讨厌。

`google.com` 比一长串数字好记，所以互联网有个特殊服务，负责把域名和IP地址一一对应。

就像专为互联网的电话簿，它叫 `域名系统` （Domain Name System），简称 **DNS**
，它的运作原理你可能猜到了，在浏览器里输 `youtube.com` ，浏览器会去问 DNS 服务器，它的 IP 地址是多少。

<img src="http://niu.ochiamalu.top/image-20231031165014454.png" alt="image-20231031165014454" style="zoom:80%;margin:0 auto" />

一般DNS服务器，是互联网供应商提供的，DNS 会查表，如果域名存在，就返回对应 IP 地址。

如果你乱敲键盘加个 `.com` 然后按回车，你很可能会看到 DNS 错误，因为那个网站不存在，所以 DNS 无法返回给你一个地址。

如果你输的是有效地址，比如 `youtube.com` ，DNS 按理会返回一个地址，然后浏览器会给这个 IP 地址，发 TCP 请求。

### 域名

如今有三千万个注册域名，所以为了更好管理，DNS 不是存成一个超长超长的列表，而是存成 **树状结构** 。

`顶级域名` （Top Level Domains），简称 **TLD** ，在最顶部，比如 .com 和 .gov 。

下一层是 `二级域名` ，比如 .com 下面有，google.com 和 dftba.com。

再下一层叫 `子域名` ，比如 images.google.com，store.dftba.com。

因此，这些数据散布在很多 DNS 服务器上，不同服务器负责树的不同部分。

<img src="http://niu.ochiamalu.top/image-20231031165035303.png" alt="image-20231031165035303" style="zoom:80%;margin:0 auto" />

## OSI

过去我们讲了线路里的电信号，以及无线网络里的无线信号，这些叫 `物理层` （Physical Layer）。

而 `数据链路层` （Data Link Layer）负责操控 `物理层` ，数据链路层有：媒体访问控制地址（MAC），碰撞检测，指数退避，以及其他一些底层协议。

再上一层是 `网络层` （Network Layer），负责各种报文交换和路由。

而今天，我们讲了 `传输层` （Transport layer）里一大部分，比如 UDP 和 TCP 这些协议，负责在计算机之间进行点到点的传输，而且还会检测和修复错误。

我们还讲了一点点 `会话层` （Session Layer），它会使用 TCP 和 UDP 来创建连接，传递信息，然后关掉连接，这一整套叫 `会话`
（Session）。

查询 DNS 或看网页时，就会发生这一套流程，这是 `开放式系统互联通信参考模型` （Open System Interconnection），简称 **OSI** 的底下
5 层，这个概念性框架把网络通信划分成多层，每一层处理各自的问题。

如果不分层，直接从上到下捏在一起实现网络通信，是完全不可能的。

抽象使得科学家和工程师能分工同时改进多个层，不被整体复杂度难倒。

OSI模型还有两层，`表示层` （Presentation Layer）和 `应用程序层` （Application Layer），其中有浏览器，Skype，HTML解码，在线看电影等。

<img src="http://niu.ochiamalu.top/image-20231031165103503.png" alt="image-20231031165103503" style="zoom:80%;margin:0 auto" />
