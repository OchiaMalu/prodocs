# 单对象保存父接口：**Collection**

`java.util.Collection` 是进行单对象保存的最大父接口，即每次利用 `Collection` 接口都只能保存一个对象信息。单对象保存父接口定义如下。

> public interface Collection\<E>extends Iterable\<E>

通过定义可以发现 `Collection` 接口中使用了泛型，这样可以保证集合中操作数据类型的统一，同时 `Collection`
接口属于 `Iterable` 的子接口。

:::tip 关于 `Collection` 接口定义的说明

随着 Java 版本的不断提升，`Collection` 接口经历从无到有的使用以及定义结构的不断加强，需要对 `Collection` 接口的发展进行以下
3 点说明。

- `Collection` 接口是从 JDK1.2 开始定义的，最初所有的操作数据都会使用 `Object` 进行接收（这样就会存在向下转型的安全隐患）；
- JDK 1.5 之后为了解决 `Object` 所带来的安全隐患，使用泛型重新定义了 `Collection`
  接口，同时为了进一步定义迭代操作的标准，增加了 `Iterable` 接口（JDK 1.5 时增加），使得 `Collection` 接口又多了一个父接口；
- JDK1.8 之后引入了 `static` 与 `default` 定义接口方法的定义，所以在 `Collection` 接口中的方法又得到了进一步扩充（主要是为了进行数据流操作）。

:::

在 `Collection` 接口里面定义了 9 个常用操作方法，如表所示。

<img src="http://niu.ochiamalu.fun/image-20240928094955987.png" alt="image-20240928094955987" style="zoom:80%;margin:0 auto" />

<img src="http://niu.ochiamalu.fun/image-20240928095009580.png" alt="image-20240928095009580" style="zoom:80%;margin:0 auto" />

对于表所列出的方法，读者一定要记住 `add()` 与 `iterator()`
两个方法，因为这两个方法几乎所有的项目都会使用到，同时在进行`contains()` 与 `remove()`
两个方法的操作时，必须保证类中已经成功地覆写了 `Object` 类中的 `equals()` 方法，否则将无法正常完成操作。

虽然 `Collection` 是单对象集合操作的最大父接口，但是 `Collection`
接口本身却存在一个问题：无法区分保存的数据是否重复。所以在实际的开发中，往往会使用 `Collection` 的两个子接口：<u>
List子接口（数据允许重复）、Set子接口（数据不允许重复）</u>，继承关系如图所示。

<img src="http://niu.ochiamalu.fun/image-20240928095139577.png" alt="image-20240928095139577" style="zoom:80%;margin:0 auto" />
