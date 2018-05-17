# canvas-draw-rect

## 遇到的问题

    项目中需要在实时流视频窗口画识别区域 , 显示出来同时记录下识别区域的坐标 给后端使用

## 解决办法

    使用canvas 轻松解决 画框流畅无卡顿（当然说的是相对于dom操作

    本方法直接使用定义一个对象 包含了初始化一个canvas对象的事件方法(initDraw) , 划线方法(drawLine) , 画多边形方法(drawRect) , 属性pointArr , distance , target

    在页面上回去一个canvas dom对象即可直接调用