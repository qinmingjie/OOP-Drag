//面向过程
{
    let box = document.querySelector("#box");
    let startLoction = {};
    let moveLoction = {};
    let endLoction = {};
    let elStart = {};
    function setCss(el,attr,location){
       if(location === undefined){
           return parseFloat(getComputedStyle(el)[attr])
       }else{
            el.style[attr] = location + "px";
       }
       console.log(el.style.top,el.style.left)
    }
    function move(event){
        // console.log("move")
        //记录鼠标移动的位置
        moveLoction.x = event.clientX;
        moveLoction.y = event.clientY;
        //记录鼠标移动的距离
        endLoction.x = moveLoction.x - startLoction.x;
        endLoction.y = moveLoction.y - startLoction.y;

        // console.log(endLoction)
        //设置样式
        setCss(box,"left",(endLoction.x + elStart.x))
        setCss(box,"top",(endLoction.y + elStart.y))
    }
    function Drag(obj){
        obj.addEventListener("mousedown",function(event){
            //取元素起始位置
            elStart.x = setCss(obj,"left");
            elStart.y = setCss(obj,"top");

            //获取鼠标点击的位置
            startLoction.x = event.clientX;
            startLoction.y = event.clientY;
            //鼠标移动事件
            document.addEventListener("mousemove",move)
            //鼠标抬起事件
            document.addEventListener("mouseup",function(){
                document.removeEventListener("mousemove",move);
            },{once:true});
            event.preventDefault()
        })
    }
}