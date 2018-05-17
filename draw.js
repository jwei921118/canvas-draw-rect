
var draw = {
    initDraw : function (target) {
        var index = 0; // 用于计数 
        var ctx = target.getContext('2d');
        var pointArr = [];
        var that = this;
        function moveCallback(e) {
            var toX = e.offsetX;
            var toY = e.offsetY;
            pointArr.push([toX , toY]);
            that.drawLine(target, pointArr);
            pointArr.pop();
        }
        // 添加单击事件
        target.addEventListener('click' , function (e) {
            index++;
            var x = e.offsetX;
            var y = e.offsetY;
            if ( that.distance < 6 && index > 3) {
                // 当距离小于6 并且点位大于3个时候闭合 才可触发闭合方法
                pointArr.push(pointArr[0]);
                pointArr.pop();
                that.drawRect(target, pointArr);
                target.removeEventListener('mousemove' , moveCallback , false );
                index = 0;
                that.pointArr = pointArr;
                pointArr = [];
                that.distance = 0;
            } else {
                pointArr.push([x,y]);
                target.addEventListener('mousemove' , moveCallback , false )
            }
        });
        // 添加双击事件 
        target.addEventListener('dblclick' , function (e) {
            if ( index > 3 ) {
                pointArr.push(pointArr[0]);
                pointArr.pop();
                that.drawRect(target, pointArr);
                target.removeEventListener('mousemove' , moveCallback , false );
                index = 0;
                that.pointArr = pointArr;
                pointArr = [];
                that.distance = 0;
            }
        })
    },
    drawRect : function(target , arr ) {
        var ctx = target.getContext('2d');
        ctx.clearRect(0, 0, target.width, target.height);
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.strokeStyle = '#fb5533';
        ctx.fillStyle = 'rgba(243,81,48, 0.68)';
        ctx.moveTo(arr[0][0], arr[0][1]);
        for (var i = 1; i < arr.length; i++) {
            // 画线
            ctx.lineTo(arr[i][0], arr[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    },
    drawLine: function (target , arr ) {
        var xD = Math.abs(arr[0][0] - arr[arr.length - 1][0]);
        var yD = Math.abs(arr[0][1] - arr[arr.length - 1][1]);
        this.distance = Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2));
        var ctx = target.getContext('2d');
        ctx.clearRect(0, 0, target.width, target.height);
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        if (this.distance < 6) {
            arr.pop();
            arr.push(arr[0]);
        }
        for (var i = 0; i < arr.length - 1; i++) {
            // 画线
            ctx.beginPath();
            ctx.strokeStyle = '#1c7dfa';
            ctx.moveTo(arr[i][0], arr[i][1]);
            ctx.lineTo(arr[i + 1][0], arr[i + 1][1]);
            ctx.stroke();
        }
        for (var i = 0; i < arr.length; i++) {
            // 画圆
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.arc(arr[i][0], arr[i][1], 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
    },
    clearRect: function (target) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    distance: 0, // 用于判断闭合点直接的距离是否达到
    pointArr: []
}