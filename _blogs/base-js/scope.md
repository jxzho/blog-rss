---
title: '关于闭包'
desc: '闭包是JavaScript的显著特征'
tag: ['JavaScript', 'Scope']
updateAt: '2020-10-05'
---

> 函数执行，形成一个私有作用域，保护里面的私有变量不收外界干扰，这种保护机制叫做**闭包**

但是现在市面上，99%的 IT 开发者认为：函数执行，形成一个不销毁的私有作用域，除了保护私有变量以外，还可以存储一些内容，这样的模式才是闭包

```javascript
var utils = (function () {
  return {
    // code
  };
})();
```

### 闭包作用

1. **保护**

   团队协作开发，每个开发者把自己的代码存放在一个私有作用域里中，防止相互之间的冲突；把需要供别人使用的方法，通过 `return` 或者 `window.xx` 暴露在全局下即可；

   jQuery 源码中也是利用保护机制实现的

   ```javascript
   ~function(){
     var jQuery = function(){
       ...
     }
     ...
     window.$ = window.jQuery = jQuery;

   }();
   ```

2. **保存**

   选项卡闭包解决办法

   单例魔术（JS 高阶编程技巧：惰性思想/颗粒化函数思想...）

#### 延伸

- 执行上下文（execution context - EC）
  - 执行 `JavaScript` 代码的环境
  - 执行上下文的三种类型
    - 全局执行上下文（唯一）
    - 函数执行上下文
    - `Eval` 内部执行环境
  - 变量对象
- 词法环境（lexical environment - 作用域）
  > 词法环境 lexical environment 是 `JavaScript` 引擎内部用来跟踪标识符与特定变量之间的映射关系
  >
  > **注意**：词法环境是 `JavaScript` 作用域的内部实现机制，人们通常称之为**作用域**
- 无论何时调用函数
  - 都会创建一个新的执行环境，被推入执行上下栈
  - 都会创建一个与之相关的词法环境

    重要的部分：`JavaScript` 引擎将调用函数的内置[[Environment]]属性与创建函数时的环境进行关联
