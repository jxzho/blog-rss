---
title: HTTP
desc: 简介
tag: ['http', 'https']
updateAt: '2022-05-10'
---

## http 历程

- 1990 年，**HTTP/0.9** 诞生
  1. 只支持 GET 请求
  2. 没有请求头
  3. 服务器响应完，马上关闭 TCP 连接
- 1996 年，**HTTP/1.0** 作为正式标准
  1. 完善了请求方式，POST PUT DELETE HEADER 等
  2. 增加请求头和响应头，以及元信息的补充（状态码、权限、缓存、内容编码）
  3. 完善了传输内容格式
- 1997 年，**HTTP/1.1** 是主流的 HTTP 协议版本
  1. 长连接，Connection 字段 keep-alive
  2. 管道化，可以不等上一个请求响应同时发出下一个请求
  3. 缓存，新增属性 Cache-Control
  4. 断点传输
- 2015 年，**HTTP/2** 正式发表， 大幅度提高 HTTP 的性能
  1. http2 将传输的信息分割成更小的消息和帧，并采取二进制编码，提高传输效率，基于二进制分帧层，而 http 传输的是文本
  2. 多路复用，基于二进制分帧，http 消息分解独立的帧，服务器根据标识符和首部连接
  3. 头部压缩，维护了头部字典，差量更新头信息（复用）
  4. 服务器推送，向服务器获取 a 资源，服务器可以预判你要获取的 b 资源，并发送给浏览器端

## http 和 https 区别

不同点，优缺点比较，[阅读](https://vue3js.cn/interview/http/HTTP_HTTPS.html#%E4%B8%80%E3%80%81http)

1. **传输内容**：http 是**明文**，https 做了一层[加密](https://www.bilibili.com/video/BV1M44y1175D?spm_id_from=333.880.my_history.page.click)，传输的**密文**（混合加密，[非对称+对称加密](https://www.bilibili.com/video/BV1M44y1175D?spm_id_from=333.880.my_history.page.click)）
2. **连接方式**：https 需要先建立**SSL 连接**
3. **端口**：http **80**端口，https **443**端口
4. **证书**：http 需要在 ca 申请**ca 证书**，需要钱
5. **性能**：https 性能不如 http，https 多了**ssl 连接**，消耗一些时间和性能
6. **SEO**：https 的网站更可靠

- https 加密怎么做的？
  1. 混合加密，对称和非对称加密
  2. ca 颁布 ca 证书，https 证书
- http 和 https 传输性能比较？
