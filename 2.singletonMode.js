/*
* 单例模式
* 单例模式提供了一种将组织代码组织为一个逻辑单元的手段，这个逻辑单元中的代码可以通过单一变量进行访问
* 单例模式的优点是;
* 1.可以用来划分命名空间，减少全局变量的数量。
* 2.使用单例模式可以使代码组织的更为一致，使代码容易阅读和维护。
* 3.可以被实例化，且实例化一次。
* 什么是单例模式？单例模式是一个用来划分命名空间并将一批属性和方法组织在一起的对象，如果它可以被实例化，那么它只能被实例化一次。
* 并非所有的对象字面量都是单体，比如说模拟数组或容纳数据的话，那么它就不是单例，如果是组织一批相关的属性和方法在一起的话，那么它有可能是单例模式，所以这需要看开发者编写代码的意图。
*
* */
/*
* 下面我们来看看定义一个对象字面量（结构类似于单例模式）的基本结构如下
* */
var singletonLiteral={
    attr1:1,
    attr2:2,
    method1:function () {
        return this.attr1;
    },
    method2:function () {
        return this.attr2;
    }
};
/*
* 如上面只是简单的字面量结构，上面的所有成员变量都是通过singleton来访问的，但是它并不是单例模式；因为单例模式还有一个更重要的特定，就是可以仅被实例化一次。上面只是不能被实例化的一个类。
* 对象字面量是用来创建单例模式的方法之一。
* */

/*
* 单例模式如果有实例化的话，那么只实例化一次，要实现一个单例模式的话，我们无非就是使用一个变量来标识该类是否被实例化，如果未被实例化的话，那么我们可实例化一次，否则的话，直接返回已经被实例化的对象
* */

//单例模式
let singleton = function (name) {
    this.name = name;
    this.instance = null;
}
singleton.prototype.getName = function () {
    return this.name;
}
function getInstance(name) {
    if(!this.instance){
        this.instance = new singleton(name);
    }
    return this.instance;
}
let a = getInstance('aa');
let b = getInstance('bb');
console.log(a === b);

console.log(a.name);
console.log(b.name);

/*
* 因为单例模式是只实例化一次，所以下面的实例是相等的
* 由于单例模式只实例化一次，因此第一次调用，返回的是a实例对象，当我们继续调用的时候，b实例就是a的实例
* */

/*
* 理解使用单例模式的好处
* 比如我现在页面上需要创建一个div的元素，那么我们肯定需要有一个创建div元素，其他的它不想管，也就是想实现单一职责原则，就好比淘宝的
* kissy一样，一开始的时候他们定义kissy只做一件事，并且把这件事做好，具体的单例模式中的实例化类的事情交给代理函数去处理，这样做的好处是具体业务逻辑分开了，代理只管代理的业务逻辑，在这里戴代理的作用只是实例化对象，并且只实例化一次，创建div代码只管创建div，其他的不管。
* */

let createDiv = function (html) {
    this.html=html;
    this.init();
}
createDiv.prototype.init = function () {
    let div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}

//代理实现单例模式
let proxyMode=(function () {
    let instance;
    return function (html) {
        if(!instance){
            instance = new createDiv('我来测试下');
        }
        return instance;
    }
})();

let c = new proxyMode('aaa');
let d = new proxyMode('bbb');

console.log(c === d);

/*
* 传统弹窗频繁的创建div删除div，频繁的操作dom影响性能
* */


