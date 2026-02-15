# 服务器名称指示（SNI）

SNI 是 TLS 协议的扩展，它允许在握手阶段由客户端指定要访问的域名，服务器再根据这个域名选择正确的证书返回
。这样，多个HTTPS网站就可以共享同一个IP和端口。

## 配置步骤

1. 准备证书：准备好每个域名的证书和私钥

keytool 是 Java 自带的证书管理工具，用于创建和管理密钥库（keystore）和证书。

```bash
# 查看 Java 版本（确保 Java 已安装）
java -version

# 查看 keytool 帮助
keytool -help
```

2. 将已有的证书文件放置在同一目录下，如 domain.com.pfx、domain.cn.pfx，并记录好各自的密码，如 domain.com.pfx 密码为
   123456，domain.cn.pfx 密码为 654321
3. 将第一个证书添加到 keystore 中，注意，PKCS12 格式的密钥库强制要求 -deststorepass 和 -destkeypass
   必须相同，destkeypass可以理解为一个 store 中每个证书可以设置不同的密码，但是PKCS12不支持destkeypass，如果设置了
   -destkeypass 也会忽略，强制使用 -deststorepass，但是 keytool 不指定会报错。

```bash
keytool -importkeystore -srckeystore domain.com.pfx -srcstoretype PKCS12 -destkeystore all-domains.p12 -deststoretype PKCS12 -srcstorepass 123456 -deststorepass mypwd! -destkeypass mypwd! -alias domain.com

keytool -importkeystore -srckeystore domain.cn.pfx -srcstoretype PKCS12 -destkeystore all-domains.p12 -deststoretype PKCS12 -srcstorepass 654321 -deststorepass mypwd! -destkeypass mypwd! -alias domain.cn
```

4. 此时在同一目录会生成 all-domains.p12，将其放置在 resources 目录下(生产环境推荐放置在其他目录并使用环境变量)，并修改
   application.yml 文件。

```yaml
server:
  port: 443  # HTTPS 端口

  # 直接在 yml 中配置 SSL（最简单的方式）
  ssl:
    key-store: classpath:all-domains.p12
    key-store-type: PKCS12
    key-store-password: mypwd!
    enabled: true
```

##  