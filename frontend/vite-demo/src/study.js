const arr = [];
for (let i = 0; i < 3; i++) {
  arr.push(parseInt(Math.random() * 100));
}
// console.log(arr);
// const list = arr.map((item) => item * 2);
// console.log(arr, list);

// const flag = arr.every((item) => item > 3);
// console.log(flag);

// every 方法判断内部数据是否每一个都满足某一条件，返回一个boolean值，不返回false则为true，可以退出循环，不改变原数组
// foreach 和 map 还有调用回调函数的开销（源码里是这样写的，哈哈），但是for循环是没有这样的情况的
// foreach方法有几个执行几次，不可以退出循环，不改变原数组，只是通过这个数据做一些事情，性能上比普通循环效率低
// map 方法的话也是不可以退出循环，不改变原数组，但是他返回一个新数组，性能上要有创建数组的开销。同时因为有箭头函数，所以还需要有一个ES6语法到ES5语法的babel编译。（Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。）
// filter 不改变原数组，也是创建一个新的数组，返回满足条件的所有元素。
// find 不改变原数组，返回第一个满足的数组，没有满足则返回 undefined
// findIndex 和上面的差不多，返回第一个满足的下标，没有返回-1；

const num = arr.find((item) => item > 50);
const index = arr.findIndex((item) => item > 50);
console.log(arr, num, index);
// let start = Date.now();
// for (let i = 0; i < arr.length; i++) {}
// console.log("for", Date.now() - start);

// start = Date.now();
// arr.forEach((item) => item);
// console.log("forEach", Date.now() - start);

// start = Date.now();
// arr.map((item) => item);
// console.log("map", Date.now() - start);
