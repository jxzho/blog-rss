---
title: 'ECMAScript6（ES6）'
desc: ''
tag: ['JavaScript', 'Date']
updateAt: '2020-10-07'
---

> JS 新语法规范 ECMAScript6（ES6）基础知识及核心原理

1. 下载安装 Babel
   环境：需要电脑上安装 node（node 中一般都会自带 npm 包管理器）

- `npm install babel-cli -g` , 把模块安装在全局环境下（在任何的项目中，都可以使用命令来编译我们的代码）

- `npm uninstall babel-cli -g` , 把全局下安装的 babel 模块卸载掉

  观看安装目录发现一些细节需要了解的知识点：

  - 我们后期之所以可以使用 babel 的命令，是因为安装在全局环境下之后，会生产一些 xxx.cmd 的文件，而这里的 xxx 就是可以在 DOC 窗口执行的命令
    `babel.cmd`以后可以使用 babel 命令了
    `babel-node.cmd`
    ...

  - 执行 babel 命令 后我们可以完成一些编译或者其他的任务，主要原因是执行 babel 命令后，会自动加载一些处理任务的文件

2. 配置.babelrc 文件，安装一些语言解析包

   - 我们需要把 .babelrc 文件配置在当前项目的根目录下（这个文件没有文件名，后缀名是 `babelrc`）

     - 在电脑上不能直接创建没有文件名的文件，我们需要使用 WS 中的 new -> file 来创建，或者使用命令创建

     - `babelrc` 这个后缀名在某些 WS 中是不识别的，它其实是一个 json 文件，我们需要在 WS 文件中配置一下（让它隶属于 json 文件）

   - 在文件中编写一些内容

     ```json
     {
       "presets": [], //=> 存放的是，我们编译代码时候需要依赖的语言解析包
       "plugins": [] //=> 存放的是，我们编译代码时候需要依赖的插件信息
     }
     ```

3. 安装依赖的语言解析包

   在当前项目的根目录下安装（不是安装在全局），需要特殊注意的是：要在当前跟目中打开 DOC 命令才可以

   - `npm install babel-preset-latest` , 安装最新的已经发布的语言标准解析模块
   - `npm install babel-preset-stage-2` , 安装当前还没有发布但是已经进入草案的语言解析模块（如果你的代码中用到了发布非标准的语法，我们需要安装它）

   安装成功后在自己的当前项目根目录下，会存在一个 `node_modules` 文件夹，在这个文件夹中有我们安装的模块

4. 完成最后 .babelrc 文件 的配置

   ```json
   {
     "presets": ["latest"],
     "plugins": []
   }
   ```

   使用命令来编译 JS 代码

   基本上所有支持命令操作的模块都有一个命令

   - `babel --help / babel -h`，查看帮助

   - `babel --verson / babel -V`，查看版本号

   - `babel --out-file / babel -o`，把某一个 JS 文件中的 ES6 代码进行编译

   - `babel --out-dir / babel -d`，把某一个文件夹中所有的 JS 文件中的 ES6 代码进行编译

   - `babel --watch / babel -w`，监听文件中代码的改变，当代码改变后，会自动进行编译 ，结束监听：`ctrl + c`

     - 例如：

       - `babel ES6 -d ES5 -w`

       - `babel ES6/1.js -o ES5/1.js`

### ES6 中的 let 和 const

#### let 基础语法

> let 变量名 = 值

使用 **let** 创建变量和使用 **var** 创建变量的区别

1. **let** 不存在 **变量提升** 机制

   ```javascript
   console.log(str); // undefined
   console.log(num); // Uncaught ReferenceError: num is not defined
   console.log(fn); // ƒ fn() {}
   console.log(f1); // undefined
   console.log(f2); //  f2 is not defined
   //--------------------
   var str = 'zjx';
   let num = 12;
   function fn() {}
   var f1 = function () {};
   let f2 = function () {};

   //=> ES6中只提供了创建变量的新语法标准（let），创建函数还是沿用ES5中的function（还是存在变量提升），如果想让函数也不存在变量提升，都是用函数表达式赋值的方式操作：let fn = function(){}

   //=> 创建变量
   let xxx = xxx;

   //=> 创建函数
   let xxx = function () {};

   //=> 自执行函数
   (function () {})();

   //=> 好处：此处代码中就不要再考虑变量提升了，只要这样处理，没有所谓的变量提升
   ```

2. 使用 **let** 定义的变量不允许在`同一个作用域中`重复声明

   ```javascript
   var num = 12;
   var num = 13;
   console.log(num);

   let str = 'a';
   let str = 'b';
   console.log(str);

   // 直接输出：Uncaught SyntaxError: Identifier 'str' has already been declared
   // JS代码在执行之前就已经知道有重复声明的了，也就是浏览器依然存在类似于变量提升的机制：在JS代码之前先把所有LET声明的变量过一遍，发现有重复的直接报错
   ```

   ```javascript
   let num = 12;
   num = 13;
   console.log(num); //let不允许重复声明，允许重复赋值
   ```

   ```javascript
   var attr = 200;
   let attr = 100;
   //Uncaught SyntaxError: Identifier 'attr' has already been declared
   ```

   ```javascript
   function fn() {}
   console.log(fn);
   let fn;
   //Uncaught SyntaxError: Identifier 'fn' has already been declared
   ```

   ```javascript
   let attr = 12,
     fn = function () {
       let attr = 14;
     };
   console.log(attr); //12
   //当前作用域下不要重复声明即可

   let att = 13,
     fn1 = function () {
       att = 15;
     };
   fn1();
   console.log(att); //15
   ```

3. 关于暂时性死区

   使用 `typeof` 检测一个未被声明过的变量

   - ES5 中返回的结果是 `undefined` 但是不报错
   - ES6 中直接报错

   **临时死区**(Temporal Dead Zone)，简写为 TDZ。

   `let` 和 `const` 声明的变量不会被提升到作用域顶部，如果在声明之前访问这些变量，会导致报错：

   ```javascript
   console.log(typeof value); // Uncaught ReferenceError: value is not defined
   let value = 1;
   ```

   这是因为 JavaScript 引擎在扫描代码发现变量声明时，要么将它们提升到作用域顶部(遇到 `var` 声明)，要么将声明放在 TDZ 中(遇到 `let` 和 `const` 声明)。

   访问 TDZ 中的变量会触发运行时错误。

   只有执行过变量声明语句后，变量才会从 TDZ 中移出，然后方可访问。

   ```javascript
   var value = 'global';

   // 例子1
   (function () {
     console.log(value);

     let value = 'local';
   })();

   // 例子2
   {
     console.log(value);

     const value = 'local';
   }

   // => 由于暂时性死区缘故，两者都会报错 value is not defined
   ```

4. ES6 语法创建的变量 **let** 存在块级作用域，ES5 语法创建变量 **var / function** 没有块级作用域

   - **ES5**
     > window 全局作用域
     > 函数执行形成的私有作用域
   - **ES6**

     > 除了有 ES5 中的两个作用域;
     >
     > ES6 中新增块级作用域（我们可以把块级作用域理解为之前学习的私有作用域：存在私有变量和作用域的一些机制）
     >
     > **ES6 语法，大部分用大括号包起来都称之为块级作用域**

     - 严格模式下，形参和 `arguments` 无映射关系

     - 一般模式下，形参和 `arguments` 存在映射关系

     - 大部分我们遇到的大括号都是块级作用域

   块级作用域的作用？

   ```javascript
   let tempList = document.getElementsByName('temp');

   // 方法1
   for (var i = 0; i < tempList.length; i++) {
     tempList[i].onclick = function () {
       console.log(i);
     };
     //=> 5
   }

   // 方法2
   for (var i = 0; i < tempList.length; i++) {
     ~(function () {
       var index = i;
       tempList[i].onclick = function () {
         console.log(index);
       };
     })();
   }

   // 方法3
   for (var i = 0; i < tempList.length; i++) {
     ~(function (i) {
       tempList[i].onclick = function () {
         console.log(i);
       };
     })(i);
   }

   // 方法4
   for (var i = 0; i < tempList.length; i++) {
     ~(function () {
       tempList[i].myIndex = i;
       tempList[i].onclick = function () {
         console.log(this.myIndex);
       };
     })();
   }

   // 方法5
   for (var i = 0; i < tempList.length; i++) {
     tempList[i].onclick = (function () {
       var index = i;
       return function () {
         console.log(index);
       };
     })();
   }

   // 方法6，利用ES6的块级作用域
   for (let i = 0; i < tempList.length; i++) {
     tempList[i].onclick = function () {
       console.log(i);
     };
   }
   ```

#### const 的基础语法

> const 的细节知识点和 let 一样，和 let 的主要区别在于：let 是创建变量，const 是创建常量

```javascript
const a = 1;
a = 2; //Uncaught TypeError: Assignment to constant variable.赋值给常量变量
console.log(a);
```

#### JS 中创建变量方式汇总

> `var`: ES5 中创建变量
> `function`：ES5 中创建函数
> ES5 中创建变量或者函数存在：变量提升、重复声明等特征，但是没有块级作用域的机制
>
> `let`:ES6 中创建变量
> `const`：ES6 中创建常量
> ES6 中创建的变量或者常量都不可以变量提升，也不可以重复声明，而且还存在块级作用域
>
> `class`：ES6 中创建类的方式
> `impot`：ES6 中模块导入的方式

```javascript
class Parent {
  constructor() {
    //=> this.xxx = xxx
  }
  //=> Parent.prototype
  aa() {}

  //=> Parent own property
  static bb() {}
}
```

#### ES6 中的解构赋值

> 按照原有值的结构，把原有值中的某一部分内容快速获取到（快速赋值给一个变量）

- 数组的解构赋值

  解构赋值本身是 ES6 的语法规范，使用声明关键字来声明这些变量是无所谓的

  ```javascript
  let [a, b, c] = [1, 2, 3];
  //=> a:12 b:23 c:34

  var [d, e, f] = [12, 23, 34];
  //=> d:12 e:23 f:34

  [g, h, f] = [4, 5, 6];
  //=> 此处相当于给window增加的全局属性
  // g:12 h:23 i:34
  //=> 但是这个操作在JS的严格模式下是不允许的，因为严格模式下不允许出现非使用 var / let 等声明的变量
  ```

- 多维数组的解构赋值

  可以让我们快速获取到需要的结果

  ```javascript
  let [, [, A], [, B, [, C]]] = [1, [2, 3], [4, 5, [6, 7]]];
  console.log(A, B, C); // 3 5 7
  ```

  > 如果只想获取数组中前面的某几项内容，后面的结构不需要补全

  ```javascript
  let [D] = [12,23,34];
  console.log(D); //=> 12

  let [,E] = [12,23,34];
  console.log(E); //=> 23

  let [,,,F] = [12,23,34];
  console.log(F); //=>undefined

  let [,,,A=0] = [1,2,3];
  console.log(A); //=>0

  let [,,,A=0] = [1,2,3,4];
  console.log(A); //=>4

  let [A,...B] = [1,2,3,4,5,6];
  console.log(A, B); //=> 1 (5) [2, 3, 4, 5, 6] B为数组

  let[...C] = [1,2,3,4,5,6];
  console.log(C);//=> (6) [1, 2, 3, 4, 5, 6] 数组克隆

  let[D,...E,F] = [1,2,3,4,5];
  console.log(D, E, F);//=> Uncaught SyntaxError: Rest element must be last element 拓展运算符只能出现在解构赋值中的末尾一项

  let[A,,,...B] = [1,2,3,4,5,6,7];
  console.log(A, B);//=> 1  (4) [4, 5, 6, 7]
  ```

- 对象的解构赋值

  ```javascript
  let {name,age} = {name:"JOHNSON",age:12};
  console.log(name, age);//=> "JOHNSON" 12]

  let {A,B} = {name:"JOHNSON",age:12};
  console.log(A, B);//=> undefined undefined 在对象的

  let {C = 0} = {name:'zjx',age:13};
  console.log(C); //=> 0

  let{name} = {name:'zjx',age:13};
  console.log(name); //=> 'zjx'

  let{,age} = {name:'zjx',age:13};//Uncaught SyntaxError: Identifier 'name' has already been declared

  let {age} = {name: 'zjx', age: 13};
  console.log(age); //=> 13

  let {name, ...arg} = {name: 'zjx', age: 13, type: 'student'};
  console.log(name, arg);//=> zjx {age: 13, type: "student"} 支持拓展运算符

  //=>把对象进行浅克隆（只把第一级克隆）
  let {...obj} = {name: 'xxx', age: 10, score: [100, 90, 80]};
  let {...x} = obj;
  console.log(obj);//=> {name: "xxx", age: 10, score: Array(3)}
  console.log(x);
  console.log(x === obj); //=> false
  console.log(x.name === obj.name);//=> true

  let {name: A, age: B} = {name: "xxx", age: 10};
  console.log(A, B);//=> xxx 10

  let data = [
      {
          "name": "张三",
          "age": 15,
          "score": {
              "english": [100, 90, 96],
              "math": [120, 111, 126],
              "chinese": [98, 99, 100]
          }
      },
      {
          "name": "李四",
          "age": 13,
          "score": {
              "english": [45, 65, 54],
              "math": [145, 123, 134],
              "chinese": [123, 110, 120]
          }
      }
  ];

  let [
    {
        name,
        age,
        score: {
            english: [, A],
            math: [, , B],
            chinese: [C]
        }
    }
  ] = data;
  console.log(A, B, C); //=> 90 126 98
  ```

#### 解构赋值的作用

链接：[阮一峰 ES6 结构赋值](http://es6.ruanyifeng.com/#docs/destructuring)

```javascript
// 快速交换两个变量值
let a = 12;
let b = 13;
[a, b] = [b, a];
console.log(a, b); //=> 13 12

// 函数返回多个变量值
let fn = function () {
  let a = 12,
    b = 13,
    c = 4;
  return [a, b, c];
};
let [a, b, c] = fn();

// 函数参数解构和默认值赋值
let fn = function ([a, b, c, d = 0]) {
  console.log(a, b, c, d);
};
let ary = [1, 2, 3];
fn(ary); // 1 2 3 0

// 快速处理options默认值初始化
```

> 在 ES6 中支持给函数设置默认值

### ES6 中的箭头函数

- 基础语法

  ```javascript
  let fn = function (x, y) {
    return x + y;
  };
  console.log(fn(1, 2)); //=> 3

  // 改写箭头函数
  let fn = (x, y) => x + y;
  console.log(fn(1, 2)); //=> 3
  ```

  ```javascript
  let fn = (...arg) => {
    console.log(arguments); // Uncaught ReferenceError: arguments is not defined
    // 不支持arguments，我们使用ES6中的剩余运算符...来获取传递的进来的所有参数值（优势：使用剩余运算符接收到的结果本身就是一个数组，不需要在转换了）
    console.log(arg instanceof Array); //=> true
  };
  fn(1, 2, 3, 4);
  // ES5中 [].join.call(arguments,'+');
  let fn = (...arg) => {
    return eval(arg.join('+'));
  };
  ```

- 箭头函数 this 问题

  箭头函数中没有自己的 this 指向，用到的 this 都是所在宿主环境（它的上级作用域）中的 this

  ```javascript
  let obj = {
    name: 'obj',
    fn: () => {
      console.log(this);
      //=> 不管我们怎么去操作，最后this都指向window：箭头函数中没有自己的this指向，用到的this都是所在宿主环境的this
    },
  };
  obj.fn();
  document.body.onclick = obj.fn;
  setTimeout(obj.fn, 1000);
  obj.fn.call(12);
  // 以上的输出都为： Window
  ```

  实战项目中，不是要把所有的函数都改为箭头函数

  根据自身需要来修改即可（例如：我们需要让函数中的 this 是宿主环境中的 this，我们才来使用箭头函数；

  或者不涉及 this 问题，我们想让代码写起来简便一些也可以使用箭头函数

  ```javascript
  let obj = {
    name: 'obj',
    fn() {
      //=> this:obj
      // setTimeout(function () {
      //     //=> this:window
      // },1000);

      // setTimeout(function () {
      //     //=> this:obj
      // }.bind(obj),1000);

      // var _this = this
      // setTimeout(function () {
      //     _this => obj
      // },1000);

      setTimeout(() => {
        //=>this:obj
      }, 1000);
    },
  };
  obj.fn();
  ```

- 箭头函数的一点扩充

  ```javascript
  let fn = () => {
    console.log(this);
  };

  let obj = {
    name: 'obj',
    sum: function () {
      //=> this:obj
      fn(); //=> this: Window
      //宿主环境：不是执行的环境而是定义的环境，FN虽然是在这执行的，但是它是在Window下定义的，所以它的宿主环境还是Window
    },
  };
  obj.sum(); // Window
  ```

  层级嵌套的箭头函数

  ```javascript
  // let fn = function(i){
  //     return function (n) {
  //         return n + (++i);
  //     }
  // };

  let fn = (i) => (n) => n + ++i;
  ```

### ES6 中的类和继承

`ES5` 中创建类和实例

以及如何禁止用户把类当做普通函数执行：`new.target`

```javascript
function Person(name, age) {
  //console.log(new.target); //=> ES6新增加的语法，如果是通过new执行的，返回的结果是当前创建的类，如果是当做普通函数执行的，返回的是undefined
  if (typeof new.target === 'undefined') {
    throw new SyntaxError(
      `当前${arguments.callee.name}不能作为一个普通函数执行，请使用new Person来执行~~`
    );
  }

  //=> new 执行的时候，this是当前类的实例
  this.name = name;
  this.age = age;
}
//=> 原型上存放的是公有的属性和方法：给创建的实例使用
Person.prototype = {
  constructor: Person,
  say: function () {
    console.log(`my name is ${this.name},i am ${this.age} years old`);
  },
};
//=> 把Person当做一个普通的对象，给对象设置的私有属性
Person.study = function () {
  console.log(`good good study,day day up!`);
};

/*
var p1 = new Person('钟俊雄',100);
p1.say();
Person.study();
*/

Person('zjx', 10); // Uncaught SyntaxError: 当前Person不能作为一个普通函数执行，请使用new Person来执行~~
```

`ES6` 中创建类和实例

```javascript
console.log(Person); // Uncaught ReferenceError: Person is not defined => class 不存在变量提升

class Person {
  constructor(name = '钟俊雄', age = 9) {
    this.name = name;
    this.age = age;
  }

  // 直接在大括号中编写的方法都设置在类的原型上:ES6默认把constructor的问题解决了，此时原型上的constructor指向的就是Person
  say() {
    console.log(`my name is ${this.name},i am ${this.age} years old`);
  }

  // 把Person当做普通对象设置属性和方法，只需要在设置的方法前面加 static即可
  static study() {
    console.log(`good good study,day day up!`);
  }
}
let p1 = new Person();
console.log(p1.name); // 钟俊雄
console.log(p1.age); // 9
p1.say(); // my name is 钟俊雄,i am 9 years old
Person.study(); // good good study,day day up!

Person(); // Uncaught TypeError: Class constructor Person cannot be invoked without 'new' => ES6中使用CLASS创建的类，天生自带new.target的验证，不允许把创建的类当做普通函数执行
```

`ES6` 类的继承

```javascript
class Person {
  constructor(...arg) {
    let [x = 0, y = 0] = arg;
    this.x = x;
    this.y = y;
  }

  sum() {
    return this.x + this.y;
  }
}

// 创建Child类，并且让Child类继承Person类:
// 1. 把Person中的私有属性继承过来设置给了子类实例的私有属性
// 2. 让子类实例的原型链上能够找到Person父类的原型（这样子类的实例能够调用父类原型上的方法）
class Child extends Person {
  // 我们可以不写constructor，浏览器会默创建它，而且默认就把父类私有的属性继承过来了（而且把传给子类的参数值也传递给父类了）
  /*constructor(x = 0, y = 0, z = 0) {
        super(x, y); //=> super must be first
        this.z = z;
    }*/

  //--------------------
  // 很多时候我们不仅要继承父类私有的，还需要给子类增加一些额外私有的，此时就必须写constructor，但是一定要在constructor中的第一行上写super，否则会报错
  constructor(...arg) {
    super(arg); // Person.prototype.constructor.call(this,arg);
    let [, , z] = arg;
    this.z = z;
  }

  fn() {}
}

let c = new Child(10, 20, 30);
```

### Symbol

> ES6 引入的新的原始数据类型，表示独一无二的值

- `Symbol` 值通过 `Symbol` 函数生成

- `typeof`

    ```javascript
    typeof symbolValue === 'symbol';
    ```

- 不能使用 `new`
- 接受字符串维为参数，表示对 Symbol 值的描述，为了在控制台显示便于区分，如果参数是 **对象** ，调用 **对象.toString()** 转为字符串，然后再生成 Symbol，相同参数会返回不同的值，所以参数只是作为 描述值

- 不能和其他值进行运算
- 可以显式转为字符串

- `Symbol` 值 作为属性名 不会出现在 `for in`、`for of` 循环中，也不会被 `Object.keys`()、`Object.getOwnPropertyNames`()、`JSON.stringify`() 返回。但是，它也不是私有属性，有一个 `Object.getOwnPropertySymbols` 方法，可以获取指定对象的所有 `Symbol` 属性名。

- 使用同一个 `Symbol` 值，`Symbol.for(desc)` 获取，如果存在则返回，不存在则创建一个再返回
- 获取 `Symbol` 的 desc，`Symbol.keyFor(symbol)`

#### 如何模拟 Symbol？
