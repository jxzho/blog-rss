---
title: import模块代码
desc: import module
tag: ['typescript-import-module']
updateAt: '2022-04-08'
---

```json
// tsconfig.json
{
	"compilerOptions: {
		...
		"module": "amd" // require()
	}
}
```

使用 tsc 指令打包模块代码后，通过 require.js 库引入相关模块

```jsx
require(['page'], function (page) {
  new page.default();
});
```
