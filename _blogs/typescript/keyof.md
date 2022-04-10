---
title: keyof语法
desc: 泛型中的keyof
tag: ['typescript-keyof']
updateAt: '2022-04-09'
---

```tsx
interface Person {
	name: string;
	age: string;
	gender: string;
}

class Teacher {
	constructor (private info: Person) {}
	getInfo(key: string) {
		return this.info[key] // <- 警告: key 可能是其他值
	}
}

const teacher = new Teacher({
	name: 'dellzhong',
	age: 26,
	gender: 'male'
})

// 使用 keyof
class Teacher {
	constructor (private info: Person) {}
	getInfo<T extends keyof Person>(key: T): Person[T] {
		return this.info[key] // <- 警告: key 可能是其他值
	}
}

keyof Person === 'name' | 'age' | 'gender'
T extends 'name' === type T = 'name'
```

## 类和接口

```tsx
// 类
class Person {
	name: 'dellzhong'
}

type result = keyof Person // <- 'name'

// 接口
interface Person {
	name: string
}

keyof Person // <- 'name'
```

## 比较 K extends keyof T 和使用 keyof T

- [stackoverflow](https://www.notion.so/keyof-2a8bfab08d2e44999b6f32189e405d82)
- [yayu](https://ts.yayujs.com/handbook/KeyofTypeOperator.html#%E7%B1%BB%E5%92%8C%E6%8E%A5%E5%8F%A3)

## 实战

```tsx
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a');
getProperty(x, 'm'); // <- error

// Key === '"a" | "b" | "c" | "d"'
```
