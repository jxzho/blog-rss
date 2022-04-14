---
title: '数据类型'
desc: ''
tag: ['JavaScript']
updateAt: '2020-10-06'
---

### 数据类型

> `ECMAScript(ES)`: 规定了 JS 的一些基础核心的知识（变量、数据类型、语法规范、操作语句等）3/5 == 6/7
>
> `DOM`: document object model (文档对象模型)
>
> `BOM`: browser object model （浏览器对象模型）

### 变量和常量

变量值是可以改变的，常量值是不可变的

```javascript
// js中定义变量的方式
// var 变量名 = 值；（ES6中定义变量使用let）
var num = 12;
var str = 'zhufeng';

const c = 12; //定义一个常量c 存储了12
c = 13; // 报错：常量存储的值不能修改
```

### JS 命名规范

1. 严格区分大小写

2. 遵循国际命名规则**驼峰命名法**

   ```javascript
   var studentInfo;
   ```

3. 命名的时候可以使用 $、\_、数字、字母，但是数字不能作为名字的第一位

   ```javascript
   var student_info;
   var $xxx; // 一般是应用 Jquery 获取到的值
   var _xxx; // 一般这样的情况代表变量是一个全局或公用的变量
   ```

4. JS 中很多的词都是有特殊含义的，我们这些词叫做**关键字**；
   现在没有特殊含义，以后可能会作为关键词的，我们叫做**保留字**；

### JS 中的数据类型

- **基本数据类型（值类型）**

  - `number`: 数字
  - `string`: 字符串
  - `boolean`: 布尔
  - `null`: 空对象指针
  - `undefined`: 未定义
  - `symbol`: 标识
  - `bigint`: 任意大的整数

- **引用数据类型**
  - `object` 对象数据类型
    - {} 普通对象
    - [] 数组
    - /^$/ 正则
    - ...
  - `function` 函数数据类型

这么多数据类型如何去检测呢？

- `typeof`：检测数据类型的运算
- `instanceof`：检测某个实例是否属于这个类
- `constructor`：获取当前实例的构造器
  ```javascript
  str.constructor === String; // true
  ```
- `Object.prototype.toString.call`：获取当前实例的所属类信息
  ```javascript
  Object.prototype.toString.call(str) === '[object String]'; // true
  ```

#### typeof

> 使用 typeof 检测，返回的结构是一个字符串，字符中中包含的内容证明了值是属于什么类型的

**[局限性]**

1. **typeof null** 不是 `'null'` 而是 `'object'` ：因为 `null` 虽然是单独的一个数据类型，但是它原本的意思是空对象指针，浏览器使用 `typeof` 检测的时候回把它按照**对象**来检测

2. 使用 **typeof** 无法具体细分出到底是数组还是正则，因为返回的结构都是 `object`

```javascript
typeof 12; // "number"

var num = 13;
typeof num; // "number"

typeof null; // "object"
typeof und; // "undefined"
```

#### 腾讯面试题：

```javascript
console.log(typeof typeof []); // string
```

### 布尔

**`Boolean()`**

> 把其他数据类型的值转换为布尔类型
>
> 只有`0、NaN、空字符串、null、undefined`这五个数据值转换为布尔类型的 false，其余的都会变成 true

- `!`

  - `!=`：不等于
  - 叹号在 JS 中还有一个作用：**取反**，先把值转为布尔类型，再进行取反

- `!!`
  - 在一个叹号取反的基础上再取反，取两次反相当于没有操作，但是却已经把其他类型值转换为布尔类型了
    和 `Boolean(Foo)` 是相同的的效果

### 字符串

> 在 JS 中 单引号 和双引号 包起来的都是字符串

```javascript
12; //number
('12'); //string
('[12, 23]'); //string
```

常用方法：

charAt charCodeAt

substr substring slice

toUpperCode toLowerCase

indexOf lastIndexOf

split

replace

match

...

### number 数字

> 0, 12, -12, -12.5
>
> **JS**中多增加了一个 `number` 类型的数据 `NaN`

```javascript
typeof NaN; // "number"
```

**NaN**

> Not A Number：不是一个数字，但是属于 `number` 类型
>
> NaN == NaN 结果为 `false`, `NaN` 和任何其他值都不相等

**isNaN()**

> 用来检测当前这个值是否是非有效数字
> 不是有效数字检测的结果是 `true`
> 反之有效数字则为 `false`

```javascript
isNaN(0) // false
isNaN(NaN) // true

// 当我们使用 `isNaN` 检测值的时候，检测的值不是 `number` 类型的
// 浏览器会默认的把值先转换为 `number` 类型，然后再去检测
isNaN('12') -> false
```

**Number()**

> 把其他数据类型值转化为 number 类型的值

```javascript
Number('12') -> 12
Number('12px') -> NaN

Number(null) -> 0
Number(undefined) -> NaN

Number([]) -> 把引用数据类型转换为number，首先需要把引用数据类型转为字符串（toString）,再把字符串转换为number即可 例如：
[]->'' ''->0
Number([12]) => [12]->'12' '12'->12
Number([12,23]) => [12,23] -> "12,23" "12,23"->NaN

Number({name:'zho'}) => NaN
Number({}) => NaN
Number([]) => 0
```

**parseInt()**

> 也是把其他数据类型值转换为 number，和 Number 方法在处理字符串的时候有所区别

```javascript
Number('12px') ->NaN
parseInt('12px') ->12
parseInt('12px13') ->12 提取规则：从左到右依次查找有效数字字符，直到遇见非有效数字字符为止（不管后面是否还有，都不找了），把找到的转换为数字
parseInt('px12') ->NaN


//第二个参数是将第一个参数当成几进制来转为十进制
parseInt("10");            //返回 10

parseInt("19",10);        //返回 19 (10+9)
//把19当做十进制转为十进制
parseInt("11",2);        //返回 3 (2+1)
//把11当做二进制转为十进制
parseInt("17",8);        //返回 15 (8+7)

parseInt("1f",16);        //返回 31 (16+15) f -> 1, 2, 3 ... 9, 10(a), 11(b), 12(c), 13(d), 14(e), 15(f)

parseInt("010");        //未定：返回 10 或 8
```

**parseFloat()**

> 在 parseInt 的基础上可以识别小数点

```javascript
parseInt('12.5px') ->12
parseFloat('12.5px') ->12.5
```

### null & undefined

> null：空，没有
> undefined： 未定义，没有
>
> ''：空字符串，没有
> 0：也可以理解为没有

**空字符串** 和 `null` 的区别

> 都是去种树
> 空字符串属于挖了个坑，但是没有种任何东西
> null 连坑都没挖
>
> 空字符串相对于 null 来说开辟了内存，消耗了那么一丢丢的性能

`null` 和 `undefined` 的区别

> null 一般都是暂时没有，预期中以后会有的（可能以后也没有到预期）：在 JS 中 null 一般都是手动赋值为 null，后期我们再给其赋具体值

> undefined：完全没有预料之内的
>
> 我是个帅气的男孩子
> 我的女朋友是 null
> 我的男朋友是 undefined

---

#### 基本包装类型（高程 3 拓展）

```javascript
var s1 = "some text";
var s2 = s1.substring(2);

// 当第二行访问s1时，访问的过程处于一种读取模式
// 也就是要从内存中读取这个字符串的值。而在读取模式中访问字符串时，后台都会自动完成以下处理。
1. 创建String类型的一个实例
2. 在这个实例上调用指定方法
3. 销毁这个实例

// 以上三个步骤可以想象成执行了下列ECMAScript代码：
1. var s = new String("some text");
2. var s2 = s.substring(2);
3. s = null;
```

> 所有基本包装类型的对象在转换为布尔类型值都为 true（所有对象在转换为布尔类型值都为 true）

#### Boolean 类型

`Boolean` 类型的实例重写了 `valueOf()` 方法，返回基本类型值 `true` 或 `false`，重写了 `toString()`，返回字符串 `"true" `或 ` "false"`

若是 `Object` 对象实例 `obj`，`obj.toString()` => `"[object Object]"`

`Boolean` 对象在 ECMAScript 中用处不大，经常造成误解，常见问题就是在布尔表达式中使用 `Boolean` 对象，例如：

```javascript
var falseObject = new Boolean(false);
var result = falseObject && '123';
console.log(result); // "123"
```

布尔表达式中 `false && "123"` => `false`，在第二行代码中是对 **falseObject 对象**

而不是对它的值（false）进行求值，**布尔表达式中的所有对象都会被转换为 `true`**

因此 `falseObject` 对象在布尔表达式中代表的是 `true`。

`true && "123"` => `"123"`

> \* 建议永远不要使用 `Boolean` 对象

#### Number 类型

重写了 valueOf()、toLocaleString()、toString()方法。

`valueOf` 返回 `Number` 实例对象表示的基本类型值

```javascript
var num = new Number(123);

console.log(num); // Number {123}
console.log(num.valueOf()); // 123
console.log(num.toString()); // "123"
console.log(Object.prototype.toString.call(num)); // "[object Number]"
console.log(Object.prototype.valueOf.call(num)); // Number {123}
```

**toString 返回 n 进制的字符串**

```javascript
var num = 123;
num.toString(2); // "1111011"
num.toString(4); // "1323"
num.toString(8); // "173"
num.toString(16); // "7b"
```
