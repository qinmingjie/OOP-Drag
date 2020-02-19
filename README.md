#### 利用Class类封装拖拽
- 抽取相似的功能
    - 鼠标点击跟随移动
- 封装
    - 要考虑哪些是公共部分(原型prototype)
        - 鼠标点击事件
        - 鼠标移动事件
        - 鼠标抬起事件
        以上为公共事件
    - 考虑哪些是调用时需要传入的
        - 操作节点需要传入(外部接口)

定义变量来存放公共部分都需要的参数

    ```javascript
    this.startLocation = {} //记录点击时鼠标的位置
    this.startElLocation = {} //记录点击时元素的位置
    
    ```
    
将属性放在实例化对象中，将公共方法放在原型中

    ```javascript
    Class OpDrag{
        constructor(el){   //constructor指向实例化对象
            this.el = el,
            this.startLocation = {},
            this.startElLocation = {}
        }
        start(){
            //点击时执行函数
        }
        move(){
            //移动式执行函数
        }
        getOffset(){
            //获取元素样式
        }
        setOffset(){
            //设置元素样式
        }
    }
    ```
    
遇到的问题：
    - 在使用document事件监听mousemove并执行move函数，此时move的this指向了document，因为函数的this是谁调用指向谁，匿名函数是声明是在谁的作用域中指向谁
        - 解决方法：在指向实例化对象中声明一个匿名函数来执行move，此时move的this指向实例化对象，再将该匿名函数交给document来调用
        
        ```javascript
        start(){
            //改变this指向
            let newmove = (event)=>{
                this.move(event)
            }
            
            document.addEventListener("mousemove",newmove);   
            document.addEventListener("mouseup",()=>{
                document.removeEventListener("mousemove",newmove)
            })
        }
        ```
        
小结：
> 在使用Class类中，Class相当于构造函数类，constructor相当于构造函数使用new运算符时自动生成的对象，其他的方法则是在原型上在Class中原型上的方法和constructor的this都指向实例化的对象
