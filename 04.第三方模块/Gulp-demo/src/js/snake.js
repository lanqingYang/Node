

//获取变量
    var pingmu=document.getElementById('pingmu');
    var btn=document.getElementById('btn');
    var snakeMove=null;
    var scoreBox=document.getElementById("score");
//游戏初始化
init();
//初始化方法
function init(){
    //获取地图高度宽度
    this.mapW=parseInt(getComputedStyle(pingmu).width);       //获取到屏幕这个对象的css样式
    this.mapH=parseInt(getComputedStyle(pingmu).height);
    console.log(this.mapW);
    console.log(this.mapH);

    //食物的宽度和高度
    this.foodW=20;
    this.foodH=20;

    //初始化蛇的高度和宽度
    this.snakeW=20;
    this.snakeH=20;

    //初始化食物位置
    this.foodX=0;
    this.foodY=0;

    //初始化蛇身
    this.snakeBody=[[2,0,'head'],[1,0,'body'],[0,0,'body']];
    //第一个参数 代表水平位置，
    //第二个参数 代表垂直的位置，
    //第三个参数 代表位置

    //初始化方向
    this.fangxiang="right";
    this.left=false;
    this.right=false; //按右键无意义
    this.up=true;
    this.down=true;

    //初始成绩变量
    this.score=0;

    //初始化速度
    this.speed=100;

    //生成一个食物
    food();

    //生成蛇身
    snake();
}

//点击按钮操作游戏开始和暂停
btn.onclick=function () {
    // console.log(this.innerHTML);  看一看点击时，会获取到什么内容
    //判断
    if(this.innerHTML=="开始"){
        //开始游戏
        startGame();
        //修改内容
        this.innerHTML="暂停";
    }else if(this.innerHTML=="暂停"){
        //暂停游戏
        pauseGame();
        //修改内容
        this.innerHTML="开始";
    }
}

//开始游戏的方法
function startGame() {

    //定时器
    snakeMove=setInterval(move,this.speed);

    //绑定按键事件
    bindKeyDown();
}

//键盘按下的事件
function bindKeyDown() {
    window.onkeydown=function (event) {
        code=event.keyCode;       //左上右下依次37，38,39，40
    //根据不同的按键进行不同的处理

        switch (code) {
            case 37:
                if(this.left){
                this.fangxiang="left";
                this.left=false;
                this.right=false;
                this.up=true;
                this.down=true;
                }
                break;
            case 38:
                if(this.up){
                    this.fangxiang="up";
                    this.left=true;
                    this.right=true;
                    this.up=false;
                    this.down=false;
                }
                break;
            case 39:
                if(this.right){
                    this.fangxiang="right";
                    this.left=false;
                    this.right=false;
                    this.up=true;
                    this.down=true;
                }
                break;
            case 40:
                if(this.down){
                    this.fangxiang="down";
                    this.left=true;
                    this.right=true;
                    this.up=false;
                    this.down=false;
                }
                break;
        }
    }
}

//暂停与游戏的方法
function pauseGame() {
    clearInterval(snakeMove);

}

//蛇移动的方法
function move() {

    //修改snakebody中的数据
    for (var i=this.snakeBody.length-1;i>0;i--){
        this.snakeBody[i][0]=this.snakeBody[i-1][0];
        this.snakeBody[i][1]=this.snakeBody[i-1][1];
    }

    //根据方向进行操作
    //改变蛇头的位置
    switch (this.fangxiang) {
        //左
        case 'left':
            //设置蛇头的值 第一个数据的X轴反向-1
            this.snakeBody[0][0]-=1;
            break;
        //右
        case 'right':
            //设置蛇头的值
            this.snakeBody[0][0]+=1;
            break;
        //上
        case 'up':
            this.snakeBody[0][1]-=1;
            break;
        //下
        case 'down':
            this.snakeBody[0][1]+=1;
            break;
    }



    //移除原有的蛇身
    clearBox("snake");

    // 绘制新的蛇身
    snake();

    //进行吃食物
    if(this.snakeBody[0][0]==this.foodX&&this.snakeBody[0][1]==this.foodY){
        //移除被吃掉的食物
        clearBox("food");
        //生成新的食物
        food();
        //成绩增加
        this.score+=10;
        //速度加快

        console.log(speed);
        if(this.speed!=10){
            this.speed-=10;
            clearInterval(snakeMove);
            snakeMove=setInterval(move,this.speed);
        }

        //设置成绩
        scoreBox.innerHTML=this.score;

        //增加蛇的长度
        //获取最后一个值的x和y
        var snakeEndX=this.snakeBody[this.snakeBody.length-1][0];
        var snakeEndY=this.snakeBody[this.snakeBody.length-1][1];

        //根据不同的方向，增加最后一个值
        switch (this.fangxiang) {
            //左
            case 'left':
                this.snakeBody.push([snakeEndX+1,snakeEndY,'body'])
                break;
            //右
            case 'right':
                this.snakeBody.push([snakeEndX-1,snakeEndY,'body'])
                break;
            //上
            case 'up':
                this.snakeBody.push([snakeEndX,snakeEndY+1,'body'])
                break;
            //下
            case 'down':
                this.snakeBody.push([snakeEndX,snakeEndY-1,'body'])
                break;
        }


        }

    //判断蛇是否超出左右边界
    if(this.snakeBody[0][0]<0||this.snakeBody[0][0]>=this.mapW/this.foodW){
        //调用游戏结束的方法
        gameOver();
    }

    //判断蛇是否超出上下边界
    if(this.snakeBody[0][1]<0||this.snakeBody[0][1]>=this.mapH/this.foodH){
        gameOver();
    }

    //判断蛇是否碰到自身
    for(var i=1;i<this.snakeBody.length;i++){
        if(this.snakeBody[i][0]==this.snakeBody[0][0] && this.snakeBody[i][1]==this.snakeBody[0][1]){
            gameOver();
        }
    }



}

//游戏结束的方法
function gameOver(){
    alert("游戏结束,当前得分："+this.score);

    //清空定时器
    clearInterval(snakeMove);
    //移除蛇
    clearBox("snake");

    //初始化数据，全部还原

    //初始化蛇身
    this.snakeBody=[[2,0,'head'],[1,0,'body'],[0,0,'body']];
    //第一个参数 代表水平位置，
    //第二个参数 代表垂直的位置，
    //第三个参数 代表位置

    //初始化方向
    this.fangxiang="right";
    this.left=false;
    this.right=false; //按右键无意义
    this.up=true;
    this.down=true;

    //初始成绩变量
    this.score=0;

    //初始化速度
    this.speed=100;

    //生成蛇身
    snake();

    //开始的按钮文字
    btn.innerHTML="开始";
    //分数清零
    scoreBox.innerHTML=this.score;

}

//清除盒子
function clearBox(className){
    //获取类名为snake的所有
    var snakes=document.getElementsByClassName(className);

    //移除蛇身
    while(snakes.length){
        snakes[0].parentNode.removeChild(snakes[0]);
    }
}

//生成蛇身方法
function snake() {
    //for循环遍历数组，将其编程单个数据
    for(var i=0;i<this.snakeBody.length;i++){
        //创建蛇身
        var snakeBox=document.createElement("div");
        //设置宽度和高度
        snakeBox.style.width=snakeW+"px";
        snakeBox.style.height=snakeH+"px";
        //定位
        snakeBox.style.position="absolute";
        //位置计算
        snakeBox.style.top=this.snakeBody[i][1]*this.snakeW+"px";
        snakeBox.style.left=this.snakeBody[i][0]*this.snakeH+"px";

        //设置类名
        snakeBox.className="snake";

        //追加到屏幕中
        pingmu.appendChild(snakeBox);
    }
}

//生成食物方法
function food(){
    //计算随机的位置
    this.foodX=Math.floor(Math.random()*this.mapW/this.foodW);  //随机向下取整，取x的值
    this.foodY=Math.floor(Math.random()*this.mapH/this.foodH);  //随机向下取整，取x的值

    //创建一个div盒子
    var foodBox=document.createElement("div");
    foodBox.style.width=this.foodW+"px";
    foodBox.style.height=this.foodH+"px";

    //需要设置绝对定位
    foodBox.style.position="absolute";
    foodBox.style.top=this.foodY*this.foodH+"px";
    foodBox.style.left=this.foodX*this.foodW+"px";

    //给盒子设置类名
    foodBox.className="food";            //通过css给出样式

    //将食物追加到屏幕中
    pingmu.appendChild(foodBox);
}

