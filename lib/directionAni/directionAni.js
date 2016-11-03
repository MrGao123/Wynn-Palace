/**
 * Created by Administrator on 2016/9/13.
 */
/**
 * ��������Ƴ�
 * @param  {event} e     �¼�����
 * @param  {element} _this ��ǰ���õ�Ԫ�أ�dom����
 * @param  {string} type  ���������over����out
 * @param  {num} time  ����ʱ�� Ĭ�� 200����
 */
function ani(e, _this, type, time /*option time=200 */) {
    //����뿪�ĵط���ԭ��Ƚ�
    //Ȼ���ס����ǰ��li��
    time = time || 200;
    var a_width = $(_this).width(),
        a_height = $(_this).height(),
        a_offset = $(_this).offset(),
        cur_ani = {},
        dani = {};

    var lastdiv = $(_this).children(".slide_box");//Ҫ�ƶ���div

    //over����out
    if (type == 'over') {
        cur_ani = {
            "display": "block",
            'left': 0,
            'top': 0
        };

        var direction = returnDirection(e, _this);

        switch (direction) { //'�Ϸ�','�Ҳ�','�·�','���';
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

        lastdiv.css(dani); //����λ��

    } else if (type == 'out') {//out
        //����
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

        //����
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
 * ���ڼ���������뷽��
 * ԭ�㣺O( offsetLeft + width/2, offsetTop + height/2 );
 * x�㣺e.pageX - (offsetLeft + width/2)
 * y�㣺e.pageY - (offsetTop + height/2)
 * ����atan2(y,x)�в�����˳���ǵ��õģ�atan2(y,x)�����ֵ�൱�ڵ�(x,y)�ĽǶ�ֵ��
 * ���������ĽǶ� �ٺ� 45��135��-135��-45���ķ�Χ
 * ����=�Ƕȳ��Ԧк��ٳ���180
 * �Ƕ�=���ȳ��Ԧ��ٳ���180
 */

/**
 * �����������Ԫ�صķ���
 * @param  {event} e       �¼�
 * @param  {element} element �ڵ�
 * @return {num}         [0,1,2,3] ��֮һ �ֱ��Ӧ��������
 */
function returnDirection(e, element) {
    var ele_offset = $(element).offset(),

        ele_width = $(element).width(),
        ele_height = $(element).height();

    //��������ķ���                                     ��xy������һ�������Ρ�
    var x = (e.pageX - ele_offset.left - (ele_width / 2)) * (ele_width > ele_height ? (ele_height / ele_width) : 1),
        y = (e.pageY - ele_offset.top - (ele_height / 2)) * (ele_height > ele_width ? (ele_width / ele_height) : 1);

    //              ǡ���ô�����������
    //console.log((Math.atan2(y, x) * (180 / Math.PI)));
    return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
}