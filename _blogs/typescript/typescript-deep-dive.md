---
title: TypeScript Deep Dive
desc: --
tag: ['typescript']
updateAt: '2023-08-026'
---

## `Enum` 结构

Enum 结构既是「类型」又是「值」，其他 TS 类型编译后会去除，而 Enum 结构编译后成为 JavaScript 对象，留在代码中。

## `.d.ts` 文件

三斜杠引用类型声明文件

## `extends` 条件运算符

常见用法： `T extends U ? X : Y`

```ts
type TypeValues<T> = T extends Function ? ReturnType<T> : T

function getComponent(val: T): TypeValues<T> {
  return typeof val === 'function' ? val() : val
}
```

## `infer` 关键字

用来定义从泛型参数里面推断出来的类型

```ts
type Flatten<T> = T extends Array<infer Item> ? Item : T    

// string
type Str = Flatten<string[]>

// number
type Num = Flatten<number>
```

## `is` 关键词

当函数返回布尔值，`is` 可以限定函数 **返回值** 和 **参数** 的关系

```ts
function isFn (val: any): val is Function {
  return typeof val === 'function'
}

// 类型保护
if (isFn(a)) {
  a()
}
```

## `satisfies` 关键词

对变量实行类型约束，但不改变它的类型。

希望变量符合某个类型匹配，但依然保留其具体的类型推断。

开发中 ts 常见的问题：

![img](https://junxio-static.oss-cn-shenzhen.aliyuncs.com/blogs/ts4.9_satisfies_demo0.png)

`obj.name` 无法使用 String 对象实例的方法，因为其被推导出 `string | number` 两种类型。

__使用 `satisfies` 后__

![img](https://junxio-static.oss-cn-shenzhen.aliyuncs.com/blogs/ts4.9_satisfies_demo2.png)

`obj.name` 被推导出是一个 `string` 类型

同时也能检测出 `obj.gendar` 单词拼写错误

---

### 参考

- [TypeScript 教程](https://wangdoc.com/typescript)
- [TS 类型挑战](https://github.com/type-challenges/type-challenges)
