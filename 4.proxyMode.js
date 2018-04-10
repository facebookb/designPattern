/*
* 代理模式
* 代理是一个对象,它可以用来控制对本体对象的访问,它与本体对象实现了同样的接口,代理对象会把所有的调用方法传递给本体对象的.
* 代理模式最基本的形式是对访问进行控制,而本体对象则负责执行所派发的那个对象的函数或者类,简单的来讲本地对象注重的去执行页面上的代码,代理则控制本地对象何时被实例化,何时被使用..
* 我们在上面的单例模式中使用过一些代理模式,就是使用代理模式实现打你模式的实例化,其他的事情交给本体对象去处理.
* */
/*
* 代理的优点:
* 1.代理对象可以代替本体被实例化,并使其可以被远程访问.
* 2.它还可以把本体实例化推迟到真正需要的时候.对于实例化比较费时的本体对象,或者因为尺寸比较大以至于不用时不适于保存在内存中的本体,我们可推迟实例化gia该对象.
* */

/*
* 我们先来理解代理对象代替本体对象被实例化的例子,比如京东ceo想送给奶茶妹妹一个礼物，但是该ceo不好意思送，或者由于工作服忙没时间送，那么这个时候他就想委托他的经纪人去做这件事情，
*
* */

//先申明一个奶茶妹对象
let teaAndMilkGirl = function (name) {
    this.name = name;
}
//这是京东ceo先生
let ceo = function (girl) {
    this.girl=girl;
    //送结婚礼物 给奶茶妹
    this.sendMarriageRing=function (ring) {
        console.log("hi" + this.girl.name + ",ceo,送你一个礼物：" + ring);
    }
}
//京东ceo的经纪人是代理，来代替送
let proxyObj = function (girl) {
    this.girl=girl;
    //经纪人代理送礼物给奶茶妹
    this.sendGift=function (gift) {
        //代理模式负责本体对象实例化
        (new ceo(this.girl)).sendMarriageRing(gift);
    }
}
//初始化
let proxy= new proxyObj(new teaAndMilkGirl('奶茶妹'));
proxy.sendGift('结婚戒指');

/*
* 虚拟代理，虚拟代理用于控制对那种创建开销很大的本体访问，它会把本体的实例化推迟到方法被调用的时候，比如说现在有一个对象的实例化很慢的话，不能再网页加载的时候立即完成，我们可以为其创建一个虚拟代理，让他把该对象的实例推迟到需要的时候。
* */

/*
* 理解使用虚拟代理实现图片的预加载
* 在网页开发中，图片的预加载是一种常用的技术，如果直接给img标签节点设置src属性的话，如果图片比较大的话，或者网速相对比较慢的话，那么在图片未加载完之前，图片会有一段时间是空白的场景，这样对于用户体验来讲并不好，那么这个时候我们可以在图片未加载完之前我们使用一个loading加载图来做为一个占位符，来提示用户该推图片正在加载，等图片加载完后我们可以对该图直接进行赋值即可；
* */

/*
* 第一种方案：不使用代理的预加载图片函数如下
* 首先创建imgNode元素，然后调用myImage.setSrc该方法的时候，先给图片一个预加载图片，当图片加载完的时候，再给img
* 元素赋值。
* */

let myImage= (function () {
    let imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    let img = new Image();
    img.onload = function () {
        imgNode.src=this.src;
    }
    return{
        setSrc:function (src) {
            imgNode.src="http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif";
            img.src=src;
        }
    }
})()
//调用方式
myImage.setSrc("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png");

/*
* 理解缓存代理
* 缓存代理的含义是对第一次运行时候进行缓存，当再一次运行相同的时候，直接从缓存里取，这样做的好处是避免重复一次运算功能，如果运算非常复杂的话，对性能很耗费，俺么使用缓存对象可以提高性能
*
* */