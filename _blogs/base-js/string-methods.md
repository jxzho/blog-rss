---
title: '字符串中的常用方法'
desc: ''
tag: ['JavaScript', 'String']
updateAt: '2020-10-07'
---

> 在 JS 中用单双引号包裹起来的都是字符串

```javascript
var str = 'good good study';
var str = "good good study";
//字符串就是由0到多个字符组成的
//第一个字符索引0
//第二个字符索引1
//...

str[0] -> "g"
//有一个叫做length的属性，存储的是当前字符串中字符的个数（字符串的长度）
str.length
```

真实项目中，我们经常操作字符串

此时我们需要掌握常用的一些字符串操作方法

控制台查看：`console.dir(String.prototype)`;

#### charAt && charCodeAt

- `str.charAt`(索引 index)：

  返回指定索引位置的字符，和 str[索引]的区别在于

  当指定的索引不存在的时候，中括号的方式获取的是**undefined**，而 `charAt` 获取的是**空字符串**

- `str.charCodeAt`(索引 index)：

  在 `str.charAt` 的基础上，把基础的字符变为 `unicode` 编码值（对应 ASCII 码表）

  > 48~57：0-9
  >
  > 65~90：A-Z
  >
  > 97~122：a-z

- `String.fromCharCode`(十进制的 `unicode` 值)：

  把 unicode 值按照 ASCII 码表中的信息，转换为原有的字符，和 charCodeAt 正好对应

  ```javascript
  String.fromCharCode(65); // => "A"
  ```

#### substr & substring & slice

> 实现字符串截取的三个办法

- `str.substr`(n, m)：从索引 n 开始，截取 m 个字符

- `str.substring`(n, m)：从索引 n 开始，截取到索引到 m 处（不包含 m），把找到的部分截取

- `str.slice`(n, m)：和 substring 语法一样，区别在于 slice 支持以**负数**做索引
  当索引是负数的时候，浏览器在处理的时候，是用字符串的总长度加上那个负数索引，然后按照正数处理。

  ```javascript
  var str = 'abc';
  str.substr(0, 1); // => 'a'
  str.substring(0, 2); // => 'ab'
  str.slice(0, -1); // => 'ab' 支持负数索引
  ```

> **细节**：
>
> 1. 如果只传递 n，相当于从索引 n 开始一直截取到字符串的末尾
>
> 2. 如果传递的索引超出最大限制，也是把能截取的部分截取掉即可
>
> 3. 如果一个参数都不传递：相当于把整个字符串都截取到（字符串的克隆）
>
> 4. ...

#### toUpperCase & toLowerCase

- `str.toUpperCase`：把字母全部大写
- `str.toLowerCase`：把字母全部小写

#### indexOf & lastIndexOf

- `str.indexOf`：获取当前字符在字符串中第一次出现的位置的索引
- `str.lastIndexOf`：获取的是最后一次字符串出现的位置的索引

  > 如果当前字符在字符串中没有出现过，结果是-1；
  > 
  > 我们根据这个规律可以验证一下当前字符串中是否包含某个字符

  ```javascript
  if (str.indexOf('?') === -1) {
    // => 如果str中 没有出现过'?' 则为true
  }
  if (str.indexOf('?') >= 0) {
    // => 如果str中 出现过'?' 则为true
  }
  ```

#### split

`str.split`：按照某一个字符把字符串拆分成数组中的某一项，和数组中的 `join` 方法是对应的

#### replace

- `str.replace`：实现字符的替换
  > 执行一次 `replace` 只能替换一次，如果有好几个都需要替换，在不适用正则的情况下我们需要执行很多次

- `str.replace`(/o/g,'O');

  > 有些需求即使执行很多次 `replace` 也实现不了，此时需要使用正则处理，真实项目中 `replace` 一般都是和正则搭配使用的

#### trim && trimLeft &&trimRight

- `str.trimLeft`：去除字符串开始的空格
- `str.trimRight`：去除字符串结尾的空额
- `str.trim`：去除字符串首尾空格

#### 案例：queryURLParameter

> 获取地址栏中 URL 地址问号传递的参数值

- 普通：

  ```javascript
  var str =
    'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=js&oq=js%2520replace&rsv_pq=ba5dac70000075e30f8%2FmP%2Fb3G4X2ZyQay7Fc8gzN%24&rsv_t=F4TxABN5BramXucaCILodOczu';

  function queryURLParameter(url) {
    var index = url.indexOf('?');
    if (index == -1) {
      return {};
    } else {
      var ary = url.slice(index + 1).split('&');
      var obj = {};
      for (var i = 0; i < ary.length; i++) {
        var curAry = ary[i].split('=');
        obj[curAry[0]] = curAry[1];
      }

      return obj;
    }
  }

  console.log(queryURLParameter(str));
  ```

- 正则：

  ```javascript
  String.prototype.myQueryURLParameter = function myQueryURLParameter() {
    var obj = {},
      reg = /([^=?&]+)=([^=?&+]+)/g;
    this.replace(reg, function () {
      var arg = arguments;
      obj[arg[1]] = arg[2];
    });
    return obj;
  };

  console.log(str.myQueryURLParameter());
  ```
