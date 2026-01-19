# CentOS 环境

## MySQL

### MySQL 安装

1. 下载wget命令

```shell
yum -y install wget
```

2. 在线下载mysql安装包

```shell
wget https://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
```

3. 安装 MySQL

```shell
rpm -ivh mysql57-community-release-el7-8.noarch.rpm
```

4. 安装服务

- 首先进入`cd /etc/yum.repos.d/`目录。

```shell
cd /etc/yum.repos.d/
```

- 安装MySQL服务

```shell
yum -y install mysql-server
```

> mysql安装mysql-community-server时出现Failing package is: mysql-community-client-5.7.38--1.el7.x86_64”

解决方法：需要禁掉 GPG验证 检查

```shell
yum -y install mysql-community-server --nogpgcheck
```

- 启动MySQL

```shell
systemctl start mysqld
```

### 修改MySQL临时密码

MySQL安装成功后会有一个临时密码，我们可以使用`grep`命令查看临时密码先登录进去MySQL，然后修改MySQL密码。

1. 获取MySQL临时密码

```shell
grep 'temporary password' /var/log/mysqld.log
```

![image-20260119121001885](https://niu.ochiamalu.fun/image-20260119121001885.png)

2. 使用临时密码先登录

```shell
mysql -uroot -p
```

3. 把MySQL的密码校验强度改为低风险

```shell
set global validate_password_policy=LOW;
```

4. 修改MySQL的密码长度

```shell
set global validate_password_length=5;
```

5. 修改MySQL密码

```shell
ALTER USER 'root'@'localhost' IDENTIFIED BY 'admin'; 
```

6. 退出mysql

```shell
exit;
```

### 允许远程访问

1. 登录MySQL

```shell
mysql -uroot -padmin
```

2. 切换到mysql数据

```shell
use mysql;
```

3. 查看user表

```shell
select Host,User from user;
```

4. 修改为允许任何地址访问

```shell
update user set Host='%' where User='root';
```

5. 刷新权限

```shell
flush privileges;
```

6. 关闭Cenots的防火墙

```shell
sudo systemctl disable firewalld
```

## Redis

### Redis安装

1. 安装 scl 源

```shell
yum install centos-release-scl-rh
```

2. 安装 redis

```shell
yum install rh-redis5-redis
```

### 创建符号链接

默认安装的目录为：/opt/rh/rh-redis5/root/usr/bin/，藏的太深了，不方便我们使用。可以通过符号链接，把需要用到的关键内容设置到方便使用的目录中。

1. 针对可执行程序设置符号链接

```shell
cd /usr/bin
ln -s /opt/rh/rh-redis5/root/usr/bin/redis-server ./redis-server
ln -s /opt/rh/rh-redis5/root/usr/bin/redis-sentinel ./redis-sentinel
ln -s /opt/rh/rh-redis5/root/usr/bin/redis-cli ./redis-cli
```

2. 针对配置文件设置符号链接

```shell
cd /etc/
ln -s /etc/opt/rh/rh-redis5/ ./redis
```

### 修改配置文件

1. 设置 ip 地址

> bind 0.0.0.0

<img src="https://niu.ochiamalu.fun/image-20260119121844573.png" alt="image-20260119121844573" style="zoom:80%;" />

2. 关闭保护模式

> protected-mode no

<img src="https://niu.ochiamalu.fun/image-20260119121910325.png" alt="image-20260119121910325" style="zoom:80%;" />

3. 启动守护进程

> daemonize yes

<img src="https://niu.ochiamalu.fun/image-20260119121932995.png" alt="image-20260119121932995" style="zoom:80%;" />

4. 设置工作目录

- 先创建工作目录

```shell
mkdir -p /var/lib/redis
```

- 再在配置文件中，设置工作目录

> dir /var/lib/redis

<img src="https://niu.ochiamalu.fun/image-20260119122051754.png" alt="image-20260119122051754" style="zoom:80%;" />

5. 设置日志目录

- 先创建日志目录

```shell
mkdir -p /var/log/redis/
```

- 再在配置文件中，设置日志目录

> logfile /var/log/redis/redis-server.log

<img src="https://niu.ochiamalu.fun/image-20260119122147441.png" alt="image-20260119122147441" style="zoom:80%;" />

### 启动 redis

```shell
redis-server /etc/redis/redis.conf
```

> WARNING Memory overcommit must be enabled! Without it..问题处理

redis容器方式启动报错

```
WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. 
 Being disabled, it can can also cause failures without low memory condition, 
 see https://github.com/jemalloc/jemalloc/issues/1328. 
 To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot 
 or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
```

解决方式很明显已经提示 但是容器没有/etc/sysctl.conf文件，无法处理。

容器启动后进入容器执行一下操作处理警告 完成并重启服务即可

```
echo "1" > /proc/sys/vm/overcommit_memory
```

#### 补充其它

```shell
	apt install redis-tools
	执行恢复

 	redis-check-aof --fix appendonly.aof.10.incr.aof 
	cp appendonly.aof appendonly.aof.bak
	redis-check-aof --fix appendonly.aof
	redis-check-aof --fix appendonly.aof.776.incr.ao
```

### 停止 redis

1. 先查看到 redis-server 的 pid

```shell
ps aux | grep redis
```

2. 然后通过 kill 命令直接杀死 redis 进程

```shell
kill 进程id
```