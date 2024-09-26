# 简单 Java 类

简单 Java 类是一种在实际开发中使用最多的类的定义形式，在简单 Java 类中包含 `类` 、 `对象` 、 `构造方法` 、 `private`
封装等核心概念的使用。对于简单 Java 类有如下基本开发要求。

- 类名称必须存在意义，例如：Book、Emp；
- 类中所有的属性必须 `private` 封装，封装后的属性必须提供setter、getter；
- 类中可以提供任意 **多个** 构造方法，但是必须保留一个 **无参** 构造方法；
- 类中不允许出现任何输出语句，所有信息输出必须交给被调用处输出；

- 类中需要提供有一个取得对象完整信息的方法，暂定为 `getInfo()` ,而且返回 `String` 型数据。

:::tip 简单 Java 类的开发很重要

学习简单 Java 类不仅仅是对之前概念的总结，更是以后项目开发中的重要组成部分，每一个读者都必须清楚地记下简单 Java
类的开发要求，在随后的章节中也将对此概念进行进一步的延伸与扩展。

同时对于简单 Java 类也有许多名称，例如：普通的 Java 对象（Plain Ordinary Java Object,.POJO)、`价值对象` (Value
Object,VO)、 `持久对象` (Persistent Object,PO)、 `传输对象` （Transfer Object,TO)，这些定义结构类似，概念上只有些许的区别，读者先有个印象即可。

:::

为了更好地巩固简单 Java 类的使用，下面利用以上概念定义一个雇员类，包含雇员编号、姓名、职位、基本工资、佣金。

```java
class Emp { 							// 定义一个雇员类
    private int empno;					// 雇员编号
    private String ename;					// 雇员姓名
    private String job;					// 雇员职位
    private double sal;					// 基本工资
    private double comm;					// 佣金
    public Emp() {						// 明确定义一个无参构造方法
    }
    public Emp(int eno, String ena, String j, double s, double c) {	// 有参构造
        empno = eno;					// 为属性赋值
        ename = ena;					// 为属性赋值
        job = j;							// 为属性赋值
        sal = s;							// 为属性赋值
        comm = c;						// 为属性赋值
    }
    public void setEmpno(int e) {				// 设置empno属性内容
        empno = e;
    }
    public void setEname(String e) {			// 设置ename属性内容
        ename = e;
    }
    public void setJob(String j) {				// 设置job属性内容
        job = j;
    }
    public void setSal(double s) {				// 设置sal属性内容
        sal = s;
    }
    public void setComm(double c) {			// 设置comm属性内容
        comm = c;
    }
    public int getEmpno() {					// 取得empno属性内容
        return empno;
    }
    public String getEname() {				// 取得ename属性内容
        return ename;
    }
    public String getJob() {					// 取得job属性内容
        return job;
    }
    public double getSal() {					// 取得sal属性内容
        return sal;
    }
    public double getComm() {				// 取得comm属性内容
        return comm;
    }
    /**
     * 取得简单Java类的基本信息，信息在被调用处输出
     * @return 包含对象完整信息的字符串数据
     */
    public String getInfo() {			// 取得完整信息
        Return "雇员编号：" + empno + "\n" +
               "雇员姓名：" + ename + "\n" + 
               "雇员职位：" + job + "\n" + 
               "基本工资：" + sal + "\n" + 
               "佣    金：" + comm ;
    }
}
```

本程序使用简单 Java 类的基本原则，明确地定义了 Emp
程序类，对属性进行明确的封装，同时提供两个构造方法（一个无参构造，一个有参构造)，而 `getInfo()` 取得信息的操作是将内容返回给调用处。

```java
public class TestDemo {
    public static void main(String args[]) {
        Emp e = new Emp(7369, "SMITH", "CLERK", 800.0, 1.0);	// 实例化对象
        System.out.println(e.getInfo());						// 取得对象信息
    }
}
```

本程序首先调用了 Emp 类的参构造方法进行 Emp 类对象的 **实例化**
，然后直接输出信息。如果要修改某一位雇员的姓名，则可以调用`setName()` 方法完成，例如：`e.setEname("ALLEN");` 就表示将名字修改为
ALLEN ，所以 `setter` 方法除了具备设置属性内容外，还具备修改属性内容的功能。
