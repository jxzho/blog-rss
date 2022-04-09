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