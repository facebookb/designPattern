/*
* https://www.cnblogs.com/tugenhua0707/p/5198407.html
* 工厂模式类似于现实生活中的工厂可以产生大量相似的商品，去做同样的事情，实现同样的效果。这时候需要使用工厂模式
* 简单的工厂模式可以理解为解决多个相似的问题，这也是它的优点之一。
* */
function createPerson(name,age,sex) {
    let obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = function () {
        return this.name;
    }
    return obj;
}
let p1 = new createPerson('liyang','27','男');
let p2 = new createPerson('hanmeimei','27','女');

console.log(p1.name);
console.log(p1.age);
console.log(p1.sex);
console.log(p1.sayName());

console.log(p2.name);
console.log(p2.age);
console.log(p2.sex);
console.log(p2.sayName());

//返回的都是object，无法识别对象的类型，不知道他们是哪个对象的势力实例。

console.log(typeof p1);
console.log(typeof p2);
console.log(p1 instanceof Object);

/*
* 如上所述，函数createPerson能接受三个参数name age sex等参数，可以无数次调用这个函数，每次返回都会包含三个属性和一个方法的对象
* 工厂模式是为了解决多个类似对象声明的问题，也就是为了解决实例化对象产生重复的问题。
* */

/*
* 优点：能解决多个相似的问题。
* 缺点：不能知道对象识别的问题（不知道对象的类型）
* */

/*
* 复杂的工厂模式定义是：将其成员对象的实例化推迟到子类中，子类可以重写父类接口方法以便创建的时候指定自己的对象类型
* 父类只对创建过程中的一般性问题进行处理，这些处理会被子类集成，子类之间是相互对立的，具体的业务逻辑会放在子类中进行编写。
* 父类就变成了一个抽象类，但是父类可以执行子类中相同类似的方法，具体的业务逻辑需要放在子类中去实现。
* 比如我现在开几个自行车店，那么每个店都有几种型号的自行车出售，我们现在来使用工厂模式来编写这些代码。
* */

/*定义自行车的构造函数*/
let bicycleShop = function (name) {
  this.name = name;
  this.method = function () {
      return this.name;
  }
};
bicycleShop.prototype={
    constructor:bicycleShop,
    sellBicycle:function (model) {
        let bicycle = this.createBicycle(mode);
        /*执行A业务逻辑*/
        bicycle.A();
        /*执行B业务逻辑*/
        bicycle.B();
        return bicycle;
    },
    createBicycle:function (model) {
        throw new Error("父类是抽象类不能直接调用，需要子类重写该方法");
    }
};
//实现原型继承
function extend(sub,sup) {
    let F = function () {

    };
    F.prototype = sup.prototype;
    sub.prototype = new F();
    sub.prototype.constructor=sub;
    sub.sup=sup.prototype;
    if(sup.prototype.constructor === Object.prototype.constructor){
        sup.prototype.constructor = sup;
    }
}

let bicycleChild = function (name) {
    this.name = name;
    bicycleShop.call(this,name);
};

extend(bicycleChild,bicycleShop);

bicycleChild.prototype.createBicycle = function () {
    let A = function () {
        console.log("执行A业务操作");
    }
    let B = function () {
        console.log("执行B业务操作");
    };
    return {
        A: A,
        B: B
    }
}
let childClass = new bicycleChild("liyang");
console.log(childClass);