---
title: '数组的基础结构'
desc: ''
tag: ['JavaScript', 'Array']
updateAt: '2021-01-25'
---

> 数组也是对象数据类型的 `typeof []`: `'object'`
>
> 数组也有属性名，只不过属性名是数字，我们把数字属性名称称之为它的索引：数组是以数字作为索引，索引从零开始，有一个length属性代表数组的长度
![](https://static.junxio.com/assets/image-20220125174415098.png) 

> **类数组**：类似于数组，但是不是数组
> - 通过getElementsByTagName获取的元素集合是类数组
> - 函数中的实参集合arguments也是类数组
> - ...

## 循环数组中的每一项
- 用 `for` 或者 `for in` 循环
- `for` 循环只能遍历到数组私有的一些属性，而 `for in` 循环可以把一些自定义的公共属性也能遍历到

## 数组中的常用方法
> 数组中有很多常用的方法，使用这段代码 `console.dir(Array.prototype)` 查看具体方法

1. 方法的意义和作用
2. 方法的形参
3. 方法的返回值
4. 通过此方法，原来的数组是否发生了改变

- ### 实现数组的增加、修改、删除
    ```javascript
    var ary = [1,2,3];

    //增加
    //1、push：向数组的末尾追加一个新的内容
    ·参数：一到多个、任何数据类型都可以，想要给数组末尾追加什么，直接传递到push方法中即可，传递多个用逗号隔开
    ·返回值：新增后数组的长度
    ·原来数组改变了

    //2、unshift:向数组开头追加新内容
    ·参数：需要追加的内容（可以使多个任何数据类型的值）
    ·返回值：新增后数组长度
    ·原来数组改变了

    //3、把数组当做一个普通的对象，使用对象键值对的操作，给其设置新的属性（索引）
    ary[ary.length]=xxx 向数组的末尾追加了新的内容
    ```
    ```javascript
    //删除
    //1、pop：删除数组最后一项
    ·参数：无
    ·返回值：被删除的那一项内容
    ·原来数组改变了

    //2、shift：删除数组第一项
    ·参数：无
    ·返回值：被删除的那一项内容
    ·原来数组改变了
    ·使用shift删除第一项之后，后面每一项的索引都要向前进一位（导致后面项的索引发生改变）

    //3、把数组当做普通的对象操作
    ·delete：`delete ary[索引]`删除指定索引这一项（当前项被删除后，原有数组其他项的索引不会改变；当前数组的length也不会改变；）
    ·ary.length--:删除数组最后一项
    ```
    ```javascript
    //splice：数组中内置的方法，可以实现数组的增加、修改、删除
    splice实现删除:
    splice(n,m):从索引n开始删除m个（m不写是删除到数组的末尾）
    ·返回值：被删除的内容（以一个新数组保存）
    ·原来的数组改变了
    splice(0): 清空数组
    splice():一项都不删除，返回一个新的空数组
    splice(0,1):删除数组开头一项
    splice(ary.length-1,1):删除数组末尾一项

    splice实现修改:
    splice(n,m,x):在原有删除的基础上，用x代替删除的内容

    splice实现增加
    splice(n,0,x):在修改的基础上，我们一项都不删除，把x插入到索引n的前面
    splice(0,0,x):向数组开头追加x
    splice(ary.length,0,x):向数组末尾追加x
    ```
    ```javascript
    //slice:数组的查询
    ·参数：slice(n,m) 从索引n开始找到索引为m处（不包含m）
    ·返回值：把找到的部分以一个新数组返回
    原来的数组不变

    slice(n) 从索引n开始找到末尾
    slice(0) || slice() 数组克隆，克隆一份和原来数组一模一样的新数组
    slice支持负数索引，如果传递的索引为负数，浏览器解析的时候是按照 总长度+负数索引 来处理的
    ```
    ```javascript
    concat:将多个数组拼接在一起
    ·参数：要拼接的内容（内容放在原数组的后面），可以是一个数组，也可以是一些数据值
    ·返回：拼接后的新数组
    ·原来的数组不变

    concat()什么都没有凭借，相当于把原有的数组克隆一份一模一样的新数组出来
    ```

- ### 把数组转换为字符串
    ```javascript
    1、toString:实现把数组转化为字符串（转换后的字符串以逗号分隔每一项）
    ·参数：无
    ·返回值：转换的字符串
    ·原有数组不变

    2、join：把数组按照指定的分隔符转换为字符串，和`字符串中的split方法`相反
    ·参数：指定的链接符
    ·返回值：链接后的字符串
    ·原有数组不变
    ```
    ```javascript
    //=>已知数组中的每一项都是数字，想实现数组求和，我们如何实现？
    //1、循环实现
    //2、利用join
    var total=eval(ary.join('+')); //->eval：把字符串变为JS表达式执行
    ```

- ### 实现数组中每一项的排序和排列
    ```javascript
    1、reverse:把数组中的每一项倒过来排列
    ·参数：无
    ·返回值：排序号的数组
    ·原来数组改变

    2、sort:
    ·参数:无或者回调函数
    ·返回值：排序后的数组
    ·原有数组的改变

    不传递参数的情况下:可以给10以内的数字进行排列，但是超过10的就无法处理了（多位数只识别第一位）

    ary.sort(function(a,b){
        return a-b;//升序
        return b-a;//降序
    });
    ```

- ### 验证数组中是否包含某一项
    ```javascript
    indexOf/lastIndexOf:获取当前项在数组中第一次或者最好一次出现位置的索引
    · 数组中的这两个方法在IE6~8下不兼容
    · 字符串中的这两个方法兼容所有的浏览器

    ·如果当前数组中并没有这一项吗，返回的索引是-1，我们根据这一点可以验证数组中是否包含这一项

    if(ary.indexOf(12)>-1){
        //->数组中包含12
    }
    ```

- ### 遍历数组中每一项的方法
    ```javascript
    //=>以下方法在IE6~8下都不兼容

    · forEach:遍历数组中的每一项
    ary.forEach(function(value,index,ary){
        //=>数组中有多少项，当前回调函数执行多少次；每一次传递进来的value就是当前遍历数组对象的值，index就是遍历对象这一项的索引
    });

    · map:遍历数组中的每一项
    ary.map(function(value,index,ary){
        //=>数组中有多少项，当前回调函数执行多少次；每一次传递进来的value就是当前遍历数组对象的值，index就是遍历对象这一项的索引
        return xxx; //=>return后面返回的结果就是把当前遍历的这一项修改为xxx
    });

    filter
    find
    reduce
    every
    ```

- ### 数组去重
    ```javascript
    //双循环遍历
    var ary = [1,1,3,2,4,2,6,3];
    for(var i=0;i<ary.length;i++){
        var item = ary[i];
        for(var j=i+1;j<ary.length;j++){
            if(item == ary[j]){
                ary.splice(j,1);
                j--;
            }
        }
    }
    ```

    ```javascript
    //indexOf处理
    var ary = [1,1,3,2,4,2,6,3];
    for(var i=0;i<ary.length;i++){
        var cur = ary[i]; 
        var curNextAry = ary.slice(i+1);

        if(curNextAry.indexOf(cur) >-1){
            ary.splice(i,1);
            i--;
        }
    }
    ```
    ```javascript
    //对象键值对处理
    Array.prototype.myUnique = function () {
        var obj = {};
        for(var i=0;i<this.length;i++){
            var cur = this[i];
            if(typeof obj[cur] === 'undefined'){
                obj[cur] = cur;
            }else{
                // ary.splice(i,1);
                // i--;  //ie6~8不兼容
                this[i] = this[this.length-1];
                this.length--;
                i--;
                continue;
            }
        }
        obj = null;
        return this;
    }

    var ary = [1,1,3,2,4,2,6,3];
    ary.myUnique().sort(function (a,b) {
        return a-b;
    });
    ```

    > 扩展思路：
    > 相邻比较法：首先给数组进行排序，然后相邻两项比较，相同的话，把最后一项在数组中去掉
    > ...

- ### 冒泡排序法
    ```javascript
    var ary = [12, 13, 23, 14, 21, 2];

    for (var i = 0; i < ary.length - 1; i++) {
        //外层控制的是比较的轮数
        for (var j = 0; j < ary.length - 1 - i; j++) {
            //里层控制的是每一轮的比较次数
            if (ary[j]>ary[j+1]) { 
                //若当前这一项比后一项大，让两者交换
                var item = ary[j];
                ary[j] = ary[j+1];
                ary[j+1] = item;
            }
        }
    }
    ```

- ### 递归
    ```js
    ...
    ```

- ### 快速排序
    ```javascript
    var ary = [1,1,5,2,3,6,8,4];

    function quick(ary) {
        if(ary.length<=1)return ary;
        //若数组长度为1时，返回原数组
        var centerIndex = Math.floor(ary.length/2),
            //取基准数下标
            centerValue = ary.splice(centerIndex,1)[0];
            //取基准数
        var leftAry=[],
            rightAry=[];
        for(var i =0;i<ary.length;i++){
            var cur = ary[i];
            if(cur<centerValue)leftAry.push(cur);
            else rightAry.push(cur);
        }
        
        return quick(leftAry).concat(centerValue,quick(rightAry)); 
        //返回排序后的新数组
    }

    console.log(quick(ary));
    ```

- ### 插入排序
    ```javascript
    var ary = [1,13,2,5,4,12,32,3,2];

    function insertSort(ary) {
        for(var i=1;i<=ary.length-1;i++){
            //控制比较的轮数
            var inseValue = ary[i];
            //用来比较的数
            for(var j=0;j<i;j++){
                //将比较的数和前面每一项相比
                if(inseValue<ary[j]){
                    //若小于这一项，则插入这一项的前面
                    ary.splice(i,1); 
                    ary.splice(j,0,inseValue);
                    break;//跳出进入第一轮循环
                }
            }
        }
    }
    insertSort(ary);
    ```

- ### reduce
    1. 求和
    2. 多维数组变成一维数组
    3. 数组去重
    4. 计算数组中每个元素出现的次数
