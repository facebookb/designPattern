/*
* 模块模式
* 通过单例模式理解了是以对象字面量的方式来创建单体模式的。
* 模块模式的思路是为单例模式添加私有变量和私有方法能够减少全局变量的使用
* */

/*
* 如下就是一个模块模式的代码
* */

// let singleMode = (function () {
//     //创建私有变量
//     let privateNum = 112;
//     //创建私有函数
//     function privateFunc() {
//     //实现自己的业务逻辑代码
//     }
//     //返回一个对象包含公有方法和属性
//     return{
//         publicMethod1:publicMethod1,
//         publicMethod2:publicMethod2,
//     }
// })();

/*
* 模块模式使用了一个返回对象的匿名函数，在这个匿名函数内部，先定义了私有变量和函数，供内部函数使用，然后将一个对象字面量作为杉树的值返回，返回的对象字面量中只包含可以公开的属性和方法，
* 可以提供外部使用该方法，由于该返回对象中的公有方法是在匿名函数内部定义的，因此它可以访问内部的私有变量和函数。
* */

/*
* 什么时候使用模块模式？
* 我们必须创建一个对象并以某些数据进行初始化，同时还要公开一些能够访问这些私有数据的方法，。
* */

/*
* 理解增强的模块模式
* 适用场合：适合那些单列必须是某种类型的实例，同时还必须添加某些属性或方法对其加以增强的情况
* */

function customType() {
    this.name='custom';
}

customType.prototype.getName=function () {
    return this.name;
}

let application = (function () {
    //定义私有
    let privateA='aa';
    //定义私有函数
    function A() {

    };
    //实例化一个对象后，返回该实例，然后为该实例增加一些公有属性和方法
    let object = new customType();
    //添加公有属性
    object.A='aGongyou';
    object.B=function () {
        return privateA;
    }
    return object;
})();
console.log(application);
console.log(application.A);
console.log(application.B());