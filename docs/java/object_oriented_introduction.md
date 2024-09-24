# 面向对象简介

程序就是数据与逻辑的代码段封装，而说到代码段封装，很多读者一定会首先想到方法，而<u>在 Java
中方法是不可以单独存在的，必须将其放在一个类中才可以</u>，而本章开始就将进入到 Java 的核心部分面向对象。

利用面向对象设计的程序可以很好地实现代码的重用操作，同时也利于开发者进行项目的维护。而面向对象的核心概念组成就是类与对象，所以本章将首先为读者讲解类与对象的定义、区别以及使用。然后通过各个实际的分析，为读者讲解
**封装性的作用**、**构造方法的作用**、**this 关键字**、**static 关键字**、**内部类**等核心概念。

本章为了加深读者对各个面向对象概念的理解，将深入讲解简单 **Java 类的使用**、**引用实例分析**、**数组操作**、**String
类的特点与常用方法**以及**链表数据结构的实现**。通过本章的学习可以让读者清晰建立出完整的面向对象编程的基本编程模型。

<img src="http://niu.ochiamalu.top/image-20240921232539581.png" alt="image-20240921232539581" style="zoom:80%;margin:0 auto" />

面向对象是现在最为流行的程序设计方法，现代的程序开发几乎都是以面向对象为基础。面向对象的编程思想最早是在 20 世纪 70 年代的时候由
IBM 的 Smalltalk 语言推广的，而后又发展到了 C++ 编程语言，最后由 C++ 衍生出了 Java 编程语言。

在面向对象设计广泛流行之前，软件行业中使用最广泛的开发模式是面向过程方式。面向过程的操作是以程序的基本功能实现为主，开发的过程中只是针对问题本身的实现，并没有很好的模块化的设计，所以在进行代码维护的时候较为麻烦。而面向对象，采用的更多的是进行子模块化的设计，每一个模块都需要单独存在，并且可以被重复利用。所以，面向对象的开发更像是一个具备标准模式的编程开发，每一个设计的子模块都可以单独存在，需要时只要通过简单的组装即可使用。

:::tip 面向过程与面向对象的区别

考虑到读者暂时还没有掌握面向对象的概念，所以本书先使用一些较为直白的方式帮助读者理解面向过程与面向对象的区别。例如，如果说现在要制造一把手枪，则可以有以下两种做法。

-
做法一（面向过程）：将制造手枪所需的材料准备好，由个人负责指定手枪的标准，例如：枪杆长度、扳机设置等，但是这样做出来的手枪，完全只是为一把手枪的规格服务，如果某个零件（例如：扳机坏了）需要更换的时候，就必须去首先清楚这把手枪的制造规格，才可以进行生产，所以这种做法不具备标准化和通用性；
-
做法二（面向对象）：首先由一个设计人员，设计出手枪中各个零件的标准，并且将不同的零件交给不同的制造部门，各个部门按照标准生产，最后统一由一个部门进行组装，这样即使某一个零件坏掉，也可以轻易地进行维修，这样的设计更加具备通用性与标准模块化设计要求。

:::

对于面向对象的程序设计有 **封装性** 、 **继承性** 、**多态性** 3 个主要特性。下面为读者简单介绍一下这 3 种特性，在后面的内容中会对此3
个方面特性进行完整的阐述。

**1.封装性**

封装是面向对象的方法所应遵循的一个重要原则。它有两个含义：一层含义是指把对象的属性和行为看成一个密不可分的整体，将这两者 `封装`
在一个不可分割的独立单位（即对象）中；另一层含义指 `信息隐蔽`
，把不需要让外界知道的信息隐藏起来，有些对象的属性及行为允许外界用户知道或使用，但不允许更改，而另一些属性或行为，则不允许外界知晓，或只允许使用对象的功能，而尽可能隐蔽对象的功能实现细节。

封装机制在程序设计中的表现是，把描述对象属性的变量及实现对象功能的方法合在一起，定义为一个程序单位，并保证外界不能任意更改其内部的属性值，也不能任意调动其内部的功能方法。封装机制的另一个特点是，为封装在一个整体内的变量及方法规定了不同级别的 `可见性`
或访问权限。

**2.继承性**

继承是面向对象方法中的重要概念，并且是提高软件开发效率的重要手段。

首先拥有反映事物一般特性的类，然后在其基础上派生出反映特殊事物的类。例如，已有的汽车的类，该类中描述了汽车的普遍属性和行为，进一步再产生轿车的类，轿车的类继承于汽车的类，轿车类不但拥有汽车类的全部属性和行为，还增加轿车特有的属性和行为。

在 Java 程序设计中，已有的类可以是 Java
开发环境所提供的一批最基本的程序类库。用户开发的程序类继承了这些已有的类，这样，类所描述过的属性及行为，即已定义的变量和方法，在继承产生的类中完全可以使用。被继承的类称为父类或超类，而经继承产生的类称为子类或派生类。根据继承机制，派生类继承了超类的所有成员，并相应地增加了自己的一些新的成员。

面向对象程序设计中的继承机制，大大增强了程序代码的可复用性，提高了软件的开发效率，降低了程序产生错误的可能性，也为程序的修改扩充提供了便利。

若一个子类只允许继承一个父类，称为 **单继承** ；若允许继承多个父类，称为 **多继承** 。目前许多面向对象程序设计语言 **不支持
** 多继承。而 Java 语言通过 `接口`  (interface) 的方式来弥补由于 Java 不支持多继承而带来的子类不能享用多个父类的成员的缺憾。

**3.多态性**

多态是面向对象程序设计的又一个重要特征。多态是指允许程序中出现重名现象。Java 语言中含有方法重载与对象多态两种形式的多态。

**方法重载：** 在一个类中，允许多个方法使用同一个名字，但方法的参数不同，完成的功能也不同。

**对象多态：** 子类对象可以与父类对象进行 **相互转换** ，而且根据其使用的子类不同完成的功能也不同。多态的特性使程序的抽象程度和简捷程度更高，有助于程序设计人员对程序的分组协同开发。