// const arr = [1, [2, 3, [4, 5]], 6, [7, 8]];

const res = [];
const flat = (arr, depth = 1) => {
  if (!arr.length) return null;
  for (let num of arr) {
    if (Array.isArray(num) && depth > 0) {
      flat(num, depth - 1);
    } else {
      res.push(num);
    }
  }
  return res;
};

// console.log(flat(arr));
// ES6 的新特性   let const var   解构赋值  promise  proxy  箭头函数  模板字符串  拓展运算符
// var let const 区别
// var 声明的变量是window对象的属性，可以被多次声明，会有变量提升
// const 声明的变量必须赋予初值并且不可改变，
// let 声明的变量可以不赋予初值，后续不可重复声明，并且和const一样只在当前作用域内有效在不同作用域可以被多次声明

// 箭头函数和普通函数的区别
// 语法上不一致，普通函数的this指向可以被动态指定，箭头函数没有自己的this指向，它的this指向在书写时就被指定为上下文，
// 箭头函数不允许作为构造函数，不允许使用new

// new 手写
function myNew(constructor, ...args) {
  const obj = {};
  // 将构造函数的 this 指向新构建的对象，以及传入相关的参数
  const res = constructor.call(obj, ...args);
  // 修改 obj 的原型为 传入的构造函数的原型
  Object.setPrototypeOf(obj, constructor.prototype);
  return typeof res === "object" && res !== null ? res : obj;
}

// function Person(name) {
//   this.name = name;
// }

// Person.prototype.sayName = function () {
//   console.log(this.name);
// };

// const p = myNew(Person, "zs");
// p.sayName();

// promise
// 是处理异步操作的一种机制，代表了未来可能完成或者失败的操作以及结果值。提供了更加可读的方式处理异步操作，避免了回调地狱问题
// 三种状态 pending fullfill reject，状态一经改变不可修改
// async 和 await 关键字

// 栈内存（存放的基础类型的值和函数调用）
// 堆内存（存放复杂类型如object、map、set等，对象在堆内存中通过引用的方式进行存储，变量中的值指向堆内存中的地址）

// const arr = [1];
// console.log(arr instanceof Object);

function _instanceof(target, origin) {
  if (typeof origin !== "function") {
    throw new Error("not a function");
  }
  if (typeof target === "object" && origin !== null) {
    while (target.__proto__) {
      if (target.__proto__ === origin.prototype) return true;
      target = target.__proto__;
    }
  }
  return false;
}

// console.log(_instanceof(arr, Array));
// visibility display opacity 2 1 3
// 1 不占空间，但是在DOM树中存在，2 3 占空间
// 1 触发回流 2 3 触发重绘
// 1  3 不具有继承属性，2，继承属性 子属性设置visiable会显示 3
// 1 2绑定的事件不触发 3 会触发

// flex 布局，是css里的响应式布局的一种，可以通过display flex来设置flex布局。常见属性 align-self 单个项目在交叉轴上的排列  align content多行

// BFC 块级格式化上下文，是一个独立的渲染区域，定义了内部的box如何布局，并且这个区域内的子元素不会影响到外面的元素。
// box会在垂直方向上一个接一个的放置，并且垂直方向上的距离由box之间的垂直margin决定，会发生重叠问题
// 可以通过设置浮动 绝对定位和固定定位overflow

// 垂直居中- 父元素，display flex-center-center ， grid-place-items:center absolute-left 50%-right 50% transform translate(-50%, -50%)

// 伪元素 用于选择特定元素 ::before ::after ::first-line
// 伪类 用于选择特定状态 :hover :active :focus

// position static relative absolute stity fixed

// 标准盒模型 width = content，怪异盒模型 width = border + padding + content ， 盒子大小为margin + border + padding + content
// 三栏布局 height 先设置为 100% float left right 定宽，中间width固定   flex布局，左右定宽，中间flex1

// hash--location.hash.href  即可获取hash值，监听hashchange事件来观测路由变化 #隔开
// history history.pushState replaceState popState 监听这三个事件监听history路由的变化 没有隔开符，每次切换都相当于加载新页面

const a = {};
const b = { key: "b" };
const c = { key: "c" };
const d = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a);
