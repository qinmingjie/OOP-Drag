

//面向对象
/* 
    抽象：
        抽取相似行为：
            鼠标点下跟随移动
    封装：
        封装成类：要想到哪些时通用的，哪些是变化的需要用户传入的
              
*/
class OpDrag{
    constructor(el){
        this.el = el;
        this.startLocation = {};
        this.startElLocation = {};
        this.start()
    }
    //按下时要做的
    start(){
        let startThis = this;
        let newmove = (event)=>{
            this.move(event)
        }
        this.el.addEventListener("mousedown",(event)=>{
            //记录点击时鼠标的位置
            this.startLocation = {
                x: event.clientX,
                y: event.clientY
            }
            //记录点击时元素的位置
           this.startElLocation = this.getOffset();
           document.addEventListener("mousemove",newmove);   //这一步的this指向document，因为this.move是一个函数，函数的this是谁调用指向谁所以this指向document
           document.addEventListener("mouseup",()=>{
               document.removeEventListener("mousemove",newmove)
            })
            event.preventDefault();
        });
    }
    //移动事件
    move(event){
        // console.log(this)
        //获取到移动时的鼠标距离
        this.moveLocation = {
            x: event.clientX,
            y: event.clientY
        };
        // //计算移动距离
        this.endLocation = {
            x: this.moveLocation.x - this.startLocation.x,
            y: this.moveLocation.y - this.startLocation.y
        }
        //设置元素样式
        this.setOffset(this.endLocation)
    }
    //抬起事件
    end(){

    }
    //获取元素的位置
    getOffset(){
        return {
            x: parseInt(getComputedStyle(this.el)["left"]),
            y: parseInt(getComputedStyle(this.el)["top"])
        }
    }
    //设置元素样式
    setOffset(chang){
        this.el.style.left = this.startElLocation.x + chang.x + "px";
        this.el.style.top = this.startElLocation.y + chang.y + "px";
    }
}
let box = document.querySelector("#box")
let obj = new OpDrag(box);
console.log(obj)