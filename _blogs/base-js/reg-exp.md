---
title: '正则的世界'
desc: 'regular expression'
tag: ['JavaScript', 'RegExp']
updateAt: '2021-09-20'
---

### 什么是正则？

> 正则就是一个规则，用来处理**字符串**的规则

1. 正则匹配

   编写一个规则，验证某个字符串是否符合这个规则，正则匹配使用的是 test 方法

2. 正则捕获

   编写一个规则，在一个字符串中把符合规则的内容都获取到，正则捕获使用的方法：正则的 exec 方法、字符串中的 split、replace、match 等都支持正则

   ```javascript
   var reg = /^$/; // 两个斜杠中间包含一些内容就是正则，两个斜杠之间包含的全部内容都是元字符
   ```

#### 正则的「元字符」和「修饰符」

> 任何一个正则都是由**元字符**和**修饰符**组成的

- **修饰符**

  `g(global)`：全局匹配

  `i(ignorecase)`：忽略大小写匹配

  `m(multiline)`：多行匹配

- **元字符**

  1. 量词元字符

     - `+`：让前面的元字符出现 1 到多次
     - `?`：出现 0 到 1 次
     - `*`：出现 0 到多次
     - `{n}`：出现 n 次
     - `{n,}`：出现 n 到多次
     - `{n,m}`：出现 n 到 m 次

  2. 特殊意义的元字符

     - `\`：转义字符（把一个普通字符转变为有特殊意义的字符，或者把一个有意义的字符转移为普通字符）

     - `.`：`除了\n` （换行符）以外的任意字符

     - `\d`：匹配一个`0~9`之间的数字

     - `\D`：匹配任意一个`非0~9`之间数字（大写字母和小写字母的组合正好是反向的）

     - `\w`：匹配一个 `0~9 或者 字母 或者 _ ` 之间的一个字符

     - `\s`：匹配一个任意空白字符（空格、制表符 Tab`\t`、换页符`\f`和换行符`\n`、回车符`\r`）

     - `\b`：匹配一个边界符

     - `x|y`：匹配 x 或者 y 中的一个

     - `[a-z]`：匹配 a-z 中的任意一个字符

     - `[^a-z]`：和上面的相反，匹配任意一个非 a-z 的字符

     - `[xyz]`：匹配 x 或者 y 或者 z 中的一个字符

     - `[^xyz]`：匹配除了 xyz 以外的任意字符

     - `()`：正则的小分组，匹配一个小分组（小分组可以理解为大正则中的一个小正则）

     - `^`：以某一个元字符**开始**

     - `$`：以某一个元字符**结束**

     - `?:` ：只匹配不捕获

     - `?=` ：正向预查

     - `?!` ：负向预查

     - `?<=` ：逆向匹配

     - `?<!` ：逆向不匹配

除了以上特殊元字符和量词元字符吗，其余的都叫做普通元字符：代表本身意义的元字符

- [正则文档](http://tool.oschina.net/uploads/apidocs/jquery/regexp.html)
- [例子 1](https://www.cnblogs.com/wjw-blog/p/7526994.html)
- [例子 2](https://www.cnblogs.com/dh-dh/p/5261044.html)
- [进阶：正反向预查](http://www.kkh86.com/it/regexp/guide-adv-pre-match.html)

#### 元字符详细解读

```javascript
var reg = /\d+/; // 包含某某即可，这里说明包含1个多个数字即可
var str = '钟俊雄520';
reg.test(str); // true

reg = /^\d+/;
reg.test(str); // false

reg = /^\d+$/; // 只能是某某某，这里说明只能是1到多个数字
reg.test('2017'); // true
reg.test('2018zjx123'); // false
reg.test('2'); // true ^或者$只是一个修饰或者声明，不会占据字符串的位置
```

`\`

```javascript
var reg = '^2.3$';
reg.test('2.3'); // true
reg.test('2+3'); // true 点在正则中的意思：匹配除了\n以外的任意字符，而不是单纯的小数点

reg = /^2\.3$/;
reg.test('2.3'); // true
reg.test('2+3'); // false 使用转义字符把点转换为本身小数点的意思

reg = /^\\d$/; 将第二个\变为普通字符\然后第一个也变为普通字符\
reg.test('\d'); // false
reg.test('\\d'); // true

reg = /^\\\d$/;
reg.test('\\9'); true
reg.test('\9'); false
```

`x | y`

```javascript
var reg = /^18|19$/; // 18 19 189 119 819 181 1819 ...很多 都符合这个规则

/*
 * 18或者19
 * 以1开头 以9结尾 中间8或者1
 * 以18开头或者以19结尾
 */

var reg = /^(18|19)$/; // 此时只有18或者19符合我们的规则了
```

> `()`:正则中的分组，也可以理解为一个大正则中的一个正则（包起来的部分是一个整体）；在正则中我们可以使用小括号`改变一些默认的优先级`；
>
> 小分组还有第二个作用：`分组引用`
> 小分组的第三个作用：`分组捕获`

```javascript
// 分组引用：\1 或者 \2 ...出现和第N个分组一模一样的内容
var reg = /^([a-z])([a-z])\2([a-z])$/; // 符合的字符串：
 foot 、 book、oppo、week、tool、attr
```

`[ ]`

> [xyz] [^xyz] [a-z] [^a-z]

```javascript
// \w：数字字母下划线的任意一个字符
var reg = /^[a-zA-Z0-9]$/; // 等价于\w

// 中括号中出现的元字符，一般都代表本身的含义
var reg = /^[.?+&]+$/; // 里面的四个元字符都是本身的含义，例如：点就是小数点了，不是所谓的任意字符 ...

// 需求：描述样式类名的规则（数字、字母、下划线、-），并且不能以-开头
//var reg = /^[\w-]+$/;
//var reg = /^[0-9a-zA-Z_-]+$/; // 没有处理以-开头的情况

var reg = /^\w[\w-]*$/;
```

```javascript
// 需求： 验证18~65之间的年龄
/^[18-65]$/; // 1或者8~6或者5中的任意一个字符，中括号中出现的18不是数字18，而是1或者8，当前正则非法，因为不能设置8~6这种降序范围

// 分三个阶段处理：18~19 20~59 60~65
var reg = /^((18|19)|([2-5]\d)|([6][0-5]))$/;
```

```javascript
var reg =  /^[\]$/; // 报错
```

### 常用的正则表达式编写

- 验证是否为有效数字

```javascript
/*
 * 可能是正数，可能是负数 12 -12
 * 整数或者小数 0 12 0.2 12.5 -12.3
 * 只要出现小数点，后面至少要跟一位数字
 * 小数点前面必须有数字
 */

var reg = /^-?(\d|([1-9]\d+))(\.\d+)?$/;
/*
 * -? 负号可有可无
 * (\d|([1-9]\d+)) 整数部分：多为数开头不能为0
 * (\.\d+)? 小数部分（可有可无）：小数点后必须有数字
 */

reg.test(-0.9); // true
reg.test('-.9'); // flase
```

- 手机号码

```javascript
/*
 * 11位数字
 * 1开头
 */
var reg = /^1\d{10}$/;
```

- 用户名：真实姓名

```javascript
// /^[\u4E00-\u9FA5]$/ 中文汉字的正则
var reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10})?$/;

var reg = /^$/;
```

- 邮箱

```javascript
var reg = /^/^\w+((-\w)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
/*
 * 以数字字母下划线开头
 * @前面可以是 数字、字母、下划线、-、.这些符号
 * 不能把- 和. 连续出现，出现一次后面必须跟数字字母下划线
 * /
 [A-Za-z0-9]+
 ((\.|-)[A-Za-z0-9]+)*
 \.[A-Za-z0-9]+

 @163.com.cn
 @zhong-jun-xiong.com.cn
```

- 身份证号码

```javascript
/*
 *  18位
 *  前17位必须是数字
 *  最后一位可以是数字或者X（X代表10）
 *  441481199602253851
 *  前六位：省市县 441481
 *  接下来八位 出生年+月+日
 *  倒数第二位数字：奇数代表男 偶数代表女
 */

var reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{2})\d(\d|X)$/;
// 这样写不仅可以匹配，而且以后再捕获的时候，不仅可以把大正则匹配的结果匹配到，里面每一个小分组（小正则）匹配的结果也可以单独的捕获到“分组捕获”

// 年 1950~2018
// 第一段 1950~1999
// 第二段 2000~2018
/^((19[5-9]\d) | (20((0\d)|(1[0-8]))))$/;
```

### 正则捕获

> 把当前字符串中符合正则的字符捕获到
> RegExp.prototype：`exec` 实现正则捕获的方法：

```javascript
var str = '钟俊雄20154140';
var reg = /\d+/;

reg.exec(str);

/*
 * 当正则捕获的时候：
 * 1、先去验证当前字符串和正则是否匹配，如果不匹配返回的结果是null(没有捕获到任何的内容)
 * 2、如果匹配，从字符串最左边开始，向右查找到匹配的内容，并且把匹配的内容返回
 * exec 捕获到的结果格式：
 * -> 获取的结果是一个数组
 * -> 数组中的第一项是当前本次大正则在字符串中匹配到的结果
 * -> index：记录了当前本次捕获到结果的起始索引
 * -> input:当前正则操作的原始字符串
 * —> 如果当前正则有分组，获取的分组中，从第二项开始都是每个小分组，本次匹配到的结果（通过exec可以把分组中的内容捕获到）
 *
 *  执行一次exec只能把符合正则规则条件中的一个内容捕获到，如果还有其他符合规则的，需要再次执行exec才有可能捕获到
 * /
```

- 正则捕获存在懒惰性

> 执行一次 exec 捕获到第一个符合规则的内容，第二次执行 exec，捕获到的依然是第一个匹配的内容，后面匹配的内容不管执行多少次 exec 都无法捕获到
>
> 解决正则捕获的懒惰性：
> 在正则的末尾加修饰符 g（全局匹配）

```javascript
// 正则为什么会存在懒惰性？
正则本身有一个属性： lastIndex（下一次正则在字符串中匹配查找的开始索引）
默认值：0，从字符串第一个字符开始查找匹配的内容
默认不管执行多少遍exec方法，正则的lastIndex值都不会变（也就是第二次以后查找的时候还是从第一个字符找，所以找到的结果永远都是第一个匹配的内容）

而且当我们手动把lastIndex进行修改的时候，不会起到任何的作用

// 为什么加修饰符g就解决了懒惰性？

加了修饰符g，每一次exec结束后，浏览器默认会把lastIndex值进行修改，下一次从上一次结束的位置开始查找，所以可以得到后面匹配的内容了

var reg = /\d+/g;

console.log(reg.exec('1a6'),reg.lastIndex);
VM693:1 ["1", index: 0, input: "1a6"] 1

console.log(reg.exec('1a6'),reg.lastIndex);
VM695:1 ["6", index: 2, input: "1a6"] 3

console.log(reg.exec('1a6'),reg.lastIndex);
VM697:1 null 0
```

exec 有自己的局限性：

执行一次 exec 只能捕获到一个和正则匹配的结果（即使加了修饰符 g）

如果需要都捕获的，我们需要执行 N 次 exec 方法才可以

```javascript
RegExp.prototype.myExec = function myExec() {
  // this: 当前要处理的正则
  // str: 当前要处理的字符串
  var str = arguments[0] || '',
    result = [];
  // 首先判断THIS是否加了全局修饰符G，如果没有加，防止下面出现
  // 死循环
  if (!this.global) {
    //若没有加G
    if (!this.exec(str)) return;
    else {
      result.push(this.exec(str)[0]);
      return result;
    }
  }

  var ary = this.exec(str);
  while (ary) {
    result.push(ary[0]);
    ary = this.exec(str);
  }
  return result;
};

var reg = /\d+/;
console.log(reg.myExec('a1x2c3v4'));
```

### 使用字符串方法 match 实现捕获

```javascript
var reg = /\d+/g;
var str = '123钟俊雄456';
str.match(reg);
```

> 使用字符串 match 捕获
> 1、如果正则加了修饰符 g，执行一次 match 会把所有正则匹配的内容捕获到
> 2、如果没有加修饰符 g，执行一次 match 只能把第一个匹配的结果捕获到
>
> 局限性：
> 在加了`修饰符g`的情况下，执行 match 方法只能把大正则匹配的内容捕获到，对于小分组捕获的内容方法给其自动忽略了

```javascript
var str = 'my name is {0},i am {1} years old~';
// 需求：把{n}整体捕获到，而且还要把括号中的数字也获取到
var reg = /\{(\d+)\}/g;

str.match(reg); // ["{0}","{1}"]

// 想要获取小分组中的内容，我们只能使用exec处理了
function fn(reg, str) {
  var ary = reg.exec(str),
    result = [];
  while (ary) {
    result.push(ary);
    ary = reg.exec(str);
  }
  return result;
}
```

### 使用 test 也可以实现正则的捕获

> 不管是正则的匹配还是正则的捕获，在处理时候的原理是没区别的：`从字符串的第一个字符向后查找，找到符合正则规则的字符`

> 如果正则设置了修饰符 g，不管使用 test 还是 exec 中的任何方法，都会修改 lastIndex 值（下一次查找是基于上一次匹配结果的末尾开始查找的）

```javascript
var reg = /\{(\d+)\}/g;
var str = 'my name is {0}~~';
if (reg.test(str)) {
  console.log(reg.lastIndex); // 14
  console.log(reg.exec(str)); // null
}

var reg = /\{(\d+)\}/;
var str = 'my name is {0}~~';
if (reg.test(str)) {
  console.log(reg.lastIndex); // 0
  console.log(reg.exec(str)); // [{0},0,...]
}
```

> 使用 test 不仅可以找打匹配的内容，也能像 exec 一样把找到的内容获取到
> test 返回结果是 true/fasle，所以靠返回结果肯定不行

```javascript
var reg = /\{(\d+)\}/g;
var str = 'my name is {0}~~,i am {1} years old';
reg.test(str); // true
console.log(RegExp.$1); // 0 获取本次匹配内容中的第一个小分组

reg.test(str); // true
console.log(RegExp.$1); // 1 TEST可以实现捕获，但是每一次只能获取到本次匹配结果中，第N个分组捕获的内容 $1 第一个分组 $2 第二个分组

var reg = /\{(\d+)\}/g;
var str = '{1}{23}{4}';

var result = [];
while (reg.test(str)) {
  result.push(RegExp.$1);
}

var result = [],
  ary = reg.exec(str);
while (ary) {
  result.push(ary[1]);
  ary = reg.exec(str);
}
```

- **`replace`**

> replace：字符串中原有字符的替换
> str.repalce(old,new);

```javascript
var str = '俊雄2018俊雄1996';
str = str.replace('俊雄', '俊雄挖哦');
str = str.replace('俊雄', '俊雄挖哦');
// 执行一次 '钟俊雄挖哦挖哦2018钟俊雄1996'

// 在不使用正则的情况下，执行一次replace只能替换一个原有字符，第二次执行replace，还是从字符串的开始位置开始，把最新找到的字符替换为新字符（类似于正则捕获时候的懒惰性：每一次执行都是从字符串最开始的位置查找）
```

> 真实项目中，replace 一般都是和正则搭配在一起使用的

```javascript
str = str.replace(/俊雄/g, 哇哦);
```

> replace 原理：
>
> 1. 当 replace 方法执行，第一项传递一个正则
>
> - 正则不加 g：把当前字符串中的第一个和正则匹配的结果捕获到，替换成新的字符
> - 正则加 g：把当前字符串中所有和正则匹配的内容都分别的捕获到，而且每一次捕获，都会当前捕获的内容替换成新字符
>
> 2. 当 replace 方法执行，第二个参数传递的是一个函数（回调函数）
>
> - 首先用正则到字符串中进行查找匹配，匹配到一个符合规则的，就把传递的函数执行一次
> - 不仅执行这个函数，而且还把正则本次捕获的结果（和执行 exec 捕获的结果一样：数组、大正则匹配、小分组匹配 都有）当做实参传递给这个函数（）

```javascript
var str = 'zjx123zjx';
str = str.replace(/zjx/g, function () {
  return '哇哦';
});
console.log(str);
```

### 所有支持正则的方法都可以实现正则的捕获（一般都是字符串方法）

> 字符串中常用的支持正则的方法：match / split / replace 等等

```javascript
var str = 'name=zjx&age=81&idt=student';
str.split(/&|=/); // ["name", "zjx", "age", "81", "idt", "student"]
str.split(/(&|=)/); // ["name", "=", "zjx", "&", "age", "=", "81", "&", "idt", "=", "student"]

// 在使用split进行字符串拆分的时候，如果正则中包含小分组，会把小分组中的内容都捕获到，放在最后的数组中

// 本案例中的小括号仅仅是为了实现 改变默认的优先级 问题，但是我们不想把分组中的内容捕获到 => "只想匹配不想捕获" 我们可以使用(?:)


// 只匹配不捕获：
// 在当前一个分组中加了 ？：，在正则检测匹配的时候，小分组可以起到自己应用的作用（例如：改变优先级），但是在捕获的时候，遇到带？：的小分组，浏览器不会把当前这个分组中匹配的内容，单独去捕获了
str.split(/(?:&|=)/);

var reg = /^(\d{6})(\d{4})(\d{2})(\d{2})
(\d{2})(\d)(\d|X)$/;
var str = '441481199602253851'
reg.exec(str);
// ["441481199602253851", "441481", "1996", "02", "25", "38", "5", "1", index: 0, input: "441481199602253851"]

var reg = /^(\d{6})(\d{4})(\d{2})(\d{2})
(?:\d{2})(\d)(\d|X)$/;
var str = '441481199602253851'
reg.exec(str);
// ["441481199602253851", "441481", "1996", "02", "25", "5", "1", index: 0, input: "441481199602253851"] => 未捕获"8"
```

### 面试题

单词首字母大写

```javascript
var str = 'my name is zhon-jun-xio,i am 20 years old,i am man!';
// var reg = /\b\w+\b/; // \b代表的是边界：单词作用两边是边界，-的左右两边也是边界，
// 所以这里会把'zhon-jun-xio'算作三个单词

// 1、先把混淆边界符的-替换成_
str = str.replace(/-/g, '_');

// 2、通过边界符匹配到每一个单词
str = str.replace(/\b(\w)(\w)*\b/, function () {
  return arguments[1].toUpperCase() + arguments[2];
});

// 3、在把之前替换的_重新替换为-
str = str.replace(/_/g, '-');
console.log(str);
```

```javascript
var str = 'my name is zhon-jun-xio,i am 20 years old,i am man!';
var reg = /\b([a-zA-Z-]+)\b/g;
str.replace(reg, function () {
  return arguments[0][0].toUpperCase() + arguments[0].slice(1);
});
// "My Name Is Zhon-jun-xio,I Am 20 Years Old,I Am Man!"
```
