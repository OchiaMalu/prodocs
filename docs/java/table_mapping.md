# 数据表与简单 Java 类映射

简单 Java 类在实际的开发中都是根据其数据表的定义来实现的，在项目开发中有着无可替代的重要作用，在上一节讲解了一对一的关系映射操作，本节在之前程序的基础上将进一步讲解更加深入的转换操作。

假设有如下关系表，如图所示，现在要求实现如下的数据关联操作。

- 一个部门有多个雇员；
- 一个雇员有一个或零个领导。

<img src="http://niu.ochiamalu.fun/image-20240924143330773.png" alt="image-20240924143330773" style="zoom:80%;" />

给出的数据表中字段的名称及意义如下。

- 部门表（dept)：部门编号（deptno)、入部门名称(dname)、部门位置(loc)；
- 雇员表(emp)：雇员编号（empno)、姓名(ename)、职位(job)、工资(sal)、佣金(comm)、领导编号（mgr)、部门编号（deptno)。

```java
class Dept {
   private int deptno;					// 部门编号
   private String dname;					// 部门名称
   private String loc;						// 部门位置
   private Emp emps [] ;					// 多个雇员 
   public Dept(int deptno, String dname, String loc) {
      this.deptno = deptno;
      this.dname = dname;
      this.loc = loc;
   }
   // setter、getter、无参构造略
   public String getInfo() {
      return "部门编号：" + this.deptno + "，名称：" + this.dname + "，位置：" + this.loc;
   }
}
class Emp {
   private int empno;						// 雇员编号
   private String ename;					// 雇员姓名
   private String job;						// 雇员职位
   private double sal;					// 基本工资
   private double comm;					// 佣金
   private Dept dept ;
   private Emp mgr; 					// 表示雇员对应的领导
   public Emp(int empno, String ename, String job, double sal, double comm) {
      this.empno = empno;
      this.ename = ename;
      this.job = job;
      this.sal = sal;
      this.comm = comm;
   }
   // setter、getter、无参构造略
   public String getInfo() {
      return "雇员编号：" + this.empno + "，姓名：" + this.ename + "，职位：" + this.job
             + "，工资：" + this.sal + "，佣金：" + this.comm;
   }
}
```

在本程序中可以发现 `Emp` 与 `Dept` 类之间存在如下引用关系定义。

- 一个雇员属于一个部门，应该在雇员里面保存部门信息，所以在 `Emp` 类中定义了一个 `dept` 属性，如果有部门则设置一个 `Dept`
  类的实例化对象，否则设置为 `null` ；
- 一个部门有多个雇员，如果要描述多这个概念应该使用对象数组完成。所以在 `Dept` 类中增加一个 `Emp` 类的对象数组(Emp emps)；
- 一个雇员有一个领导，领导信息也就是雇员信息，应该在 `Emp` 类中增加领导的自身关联（Emp mgr），此时两个简单 Java
  类已经可以完整地描述出数据表的结构定义，随后将根据结构设置并取得数据，要求可以完成如下信息输出。
- 以根据一个雇员查询他所对应的领导信息和部门信息；
- 可以根据一个部门取出所有的雇员以及每个雇员的领导信息。

```java
public class TestDemo {
    public static void main(String args[]) {
        // 第一步：根据表结构描述设置数据
        // 1．产生各自的独立对象
        Dept dept = new Dept(10,"ACCOUNTING","New York") ;		// 部门信息
        Emp ea = new Emp(7369,"SMITH","CLERK",800.0,0.0) ;		// 雇员信息
        Emp eb = new Emp(7902,"FORD","MANAGER",2450.0,0.0) ;		// 雇员信息
        Emp ec = new Emp(7839,"KING","PRESIDENT",5000.0,0.0) ;	// 雇员信息
        // 2．设置雇员和领导关系
        ea.setMgr(eb) ;										// 设置雇员领导
        eb.setMgr(ec) ;										// 设置雇员领导
        // 3．设置雇员和部门关系
        ea.setDept(dept) ;										// 雇员与部门
        eb.setDept(dept) ;										// 雇员与部门
        ec.setDept(dept) ;										// 雇员与部门
        dept.setEmps(new Emp[]{ea,eb,ec}) ;						// 部门与雇员
        // 第二步：根据表结构描述取得设置的数据
        System.out.println(ea.getInfo()) ;							// 取得雇员信息
        System.out.println("\t|- " + ea.getMgr().getInfo()) ;				// 取得雇员领导信息
        System.out.println("\t|- " + ea.getDept().getInfo()) ;				// 取得雇员部门信息
        // 取得部门的完整信息，包括部门基础信息以及部门中的所有员工和每个员工的领导信息
        System.out.println(dept.getInfo()) ;							// 部门信息
        for (int x = 0 ; x < dept.getEmps().length ; x ++) {				// 所有雇员信息
            System.out.println("\t|- " + dept.getEmps()[x].getInfo()) ;		// 雇员信息
            if (dept.getEmps()[x].getMgr() != null) {					// 判断是否存在领导信息
              System.out.println("\t\t|- " + 
                       dept.getEmps()[x].getMgr().getInfo());			// 领导信息
            }
        }
    }
}
```

本程序首先根据表的结构进行数据以及数据关联的配置，然后在数据取出时会根据表的结构进行取出，例如：通过雇员可以找到对应的领导和所在部门，以及通过部门可以找到部门中的所有雇员。
