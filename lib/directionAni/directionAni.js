/**
 * Created by Administrator on 2016/9/13.
 */
/**
 * 鼠标移入移出
 * @param  {event} e     事件对象
 * @param  {element} _this 当前作用的元素（dom对象）
 * @param  {string} type  鼠标类型是over还是out
 * @param  {num} time  动画时间 默认 200毫秒
 */
function ani(e, _this, type, time /*option time=200 */) {
    //鼠标离开的地方和原点比较
    //然后记住到当前的li中
    time = time || 200;
    var a_width = $(_this).width(),
        a_height = $(_this).height(),
        a_offset = $(_this).offset(),
        cur_ani = {},
        dani = {};

    var lastdiv = $(_this).children(".slide_box");//要移动的div

    //over还是out
    if (type == 'over') {
        cur_ani = {
            "display": "block",
            'left': 0,
            'top': 0
        };

        var direction = returnDirection(e, _this);

        switch (direction) { //'上方','右侧','下方','左侧';
            case 0 :
            {
                dani.display = "block",
                    dani.left = 0;
                dani.top = -a_height;
                break;
            }
            case 1 :
            {
                dani.display = "block",
                    dani.left = a_width;
                dani.top = 0;
                break;
            }
            case 2 :
            {
                dani.display = "block",
                    dani.left = 0;
                dani.top = a_height;
                break;
            }
            case 3 :
            {
                dani.display = "block",
                    dani.left = -a_width;
                dani.top = 0;
                break;
            }
        }

        lastdiv.css(dani); //重置位置

    } else if (type == 'out') {//out
        //上下
        if (a_offset.top >= e.pageY) {
            dani = {
                'top': -a_height,
                "display": "none"
            };
        } else if (( a_offset.top + a_height ) <= e.pageY) {
            dani = {
                'top': a_height,
                "display": "none"
            };
        }

        //左右
        if (a_offset.left >= e.pageX) {
            dani = {
                'left': -a_width,
                "display": "none"
            };

        } else if (( a_offset.left + a_width ) <= e.pageX + 1) {
            dani = {
                'left': a_width,
                "display": "none"
            };
        }

        cur_ani = dani;
    } else {
        console.log('this type is undefined');
        return;
    }

    lastdiv.finish().animate(cur_ani, time);
}

/**
 * 关于计算鼠标移入方向
 * 原点：O( offsetLeft + width/2, offsetTop + height/2 );
 * x点：e.pageX - (offsetLeft + width/2)
 * y点：e.pageY - (offsetTop + height/2)
 * 函数atan2(y,x)中参数的顺序是倒置的，atan2(y,x)计算的值相当于点(x,y)的角度值。
 * 所有算出其的角度 再和 45，135，-135，-45。的范围
 * 弧度=角度乘以π后再除以180
 * 角度=弧度除以π再乘以180
 */

/**
 * 返回鼠标移入元素的方向
 * @param  {event} e       事件
 * @param  {element} element 节点
 * @return {num}         [0,1,2,3] 中之一 分别对应上右下左
 */
function returnDirection(e, element) {
    var ele_offset = $(element).offset(),

        ele_width = $(element).width(),
        ele_height = $(element).height();

    //计算移入的方向                                     将xy补偿成一个正方形。
    var x = (e.pageX - ele_offset.left - (ele_width / 2)) * (ele_width > ele_height ? (ele_height / ele_width) : 1),
        y = (e.pageY - ele_offset.top - (ele_height / 2)) * (ele_height > ele_width ? (ele_width / ele_height) : 1);

    //              恰到好处的四舍五入
    //console.log((Math.atan2(y, x) * (180 / Math.PI)));
    return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
}