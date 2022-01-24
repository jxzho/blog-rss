---
title: 'Date 日期操作基础讲解'
desc: 'desc'
tag: 'base-js'
updateAt: '2020-10-07'
---

> Date 是日期类，通过它可以对事件进行处理

## Usage

- `Date() === new Date().toString()`，Date构造器使用
- `var time = new Date()`，获取当前客户端本机时间(当前获取的时间不能作为重要的参考依据)
  ```js
  // => 获取的结果是一个日期格式的对象：Thu May 10 2018 19:56:29 GMT+0800 (中国标准时间)
  typeof time === 'object' // true

  time.getFullYear() // 获取四位整数年 2020
  time.getMonth() // 获取月 （0~11代表1~12月） 当前10月，输出：9 结果要+1
  time.getDate() // 获取日 27
  time.getDay() // 获取星期 2
  time.getHours() // 获取小时 18 24小时制
  time.getMinutes() // 获取分钟 50
  time.getSeconds() // 获取秒
  time.getMilliseconds() // 获取毫秒
  time.getTime() // 获取当前日期距离 '1970-01-01 00:00:00' 的毫秒差
  ```
- `var time = new Date('2018-05-10')`，当 `new Date()` 中传递一个时间格式的字符串，
  相当于把这个字符串转换为标准的时间**对象**格式，
  转换完成后，就可以调取上面我们讲的那些方法了 
  ```javascript
  // => 时间格式的字符串
  '2018-05-10'(IE下识别不了)
  '2018/05/10'
  '2018/05/10 20:18:14'
  '31293812'（如果传递的是距离1970年的那个毫秒差，也是可以识别转换的）
  ```

## 案例：抢购倒计时

```html
<div class="box">距离抢购：<span id="timeBox"></span></div>
```

```js
var timeBox = document.getElementById('timeBox');

function computed() {
  var nowTime = new Date(),
    targetTime = new Date('2018/5/10 22:00:00');

  var spanTime = targetTime - nowTime;
  if (spanTime <= 0) {
    // => 时间到
    window.clearInterval(timer);
    timeBox.innerHTML = '抢购！';
    return;
  }

  var hour = Math.floor(spanTime / (1000 * 60 * 60));
  spanTime -= hour * 60 * 60 * 1000;
  var minute = Math.floor(spanTime / (1000 * 60));
  spanTime -= minute * 60 * 1000;
  var second = Math.floor(spanTime / 1000);

  hour < 10 ? (hour = '0' + hour) : null;
  minute < 10 ? (minute = '0' + minute) : null;
  second < 10 ? (second = '0' + second) : null;

  timeBox.innerHTML = hour + ':' + minute + ':' + second;
}

var timer = window.setInterval(computed, 1000);
```

## 面试思考题：

- 如何用 `Date` 获取一个星期的第三天？
