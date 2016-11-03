/**
 * Created by MrGao on 2016/8/26.
 * javascript中未分离的css样式：
 * 1.给topBar中的简体中文下的下拉列表动态设置前面的小图标
 * 2.动态设置脚部小图标
 */
$("img.lazy").lazyload();
window.onload = function () {
    topBar();
    banner();
    main();
    footer();
}
//topBar部分
function topBar() {
    //给topBar中的简体中文下的下拉列表动态设置前面的小图标
    var iconArr = ["lang-en", "lang-zh-hant", "lang-zh-hans", "lang-ja", "lang-ko"];
    $(".yl_dropdown-menu .icon_lang").each(function (k, v) {
        $(this).css("backgroundImage", "url('images/" + iconArr[k] + ".jpg')");
    });
    $(".mob_topbar_lang .icon_lang").each(function (k, v) {
        $(this).css("backgroundImage", "url('images/" + iconArr[k] + ".jpg')");
    });

    //设置topBar中简体中文的点击事件
    $(".dropdown").on("click", ".dropdown-toggle", function () {
        $(this).find(".arrow").stop();
        $(".myDropDown").stop();
        $(this).find(".arrow").toggleClass("arrowActive");
        $(".myDropDown").slideToggle("slow");
    });

    //预定住宿的点击事件
    $(".yl_topbar .topbar_right .topbar_book").click(function () {
        $(this).find(".arrow").stop();
        $(".topbar_form").stop();
        $(this).find(".arrow").toggleClass("arrowActive");
        $(".topbar_form").fadeToggle(500);
    });

    //设置手机端时topbar_toggle的点击事件（显示与隐藏）
    $(".topbar_toggle").click(function () {
        $(".mask").fadeIn();
        $(".mob_topbar").fadeIn(500);
        //这个iscroll的引用语句必须放在这儿(必须得在#mob_topbar加载出来)
        var myScroll = new IScroll("#mob_topbar", {
            mouseWheel: true
        });
    });

    $(".mask").click(function () {
        if ($(".mob_topbar").css("display") == "block") {
            $(".mask").fadeOut();
            $(".mob_topbar").fadeOut(500);
        }
    });

    //给icon_info设置点击事件
    $(".icon_info").on("click", function () {
        $(".mask").show();
        $(".map_image").show(400);
    });
    $(".map_image_close").click(function () {
        $(".mask").hide();
        $(this).parent().hide(400);
    });

    //设置topbar_introduce中的鼠标经过事件
    var tab1 = new Tab({
        "tabMenu": $("#tabMenu")[0],
        "tabMain": $("#tabMain")[0],
        "type": "mouseover"
    });
    var i = 0,
        len = $("#tabMain .content").length;
    for (; i < len; i++) {
        var tab2 = new Tab({
            "tabMenu": $("#tabMain .content")[i],
            "tabMain": $("#tabMain .thumb")[i],
            "type": "mouseover"
        });
    }


    //设置topbar_introduce_info中的鼠标划过事件
    $("#tabMenu li").each(function (k, v) {
        if (!$(v).hasClass("haveInfo")) {
            $(v).mouseover(function(){
                $("#tabMain").css("display","none");
            });
            return ;
        }
        $(v).mouseover(function () {
            //li标签相对于document的left值
            var parentLeft = $(this).position().left;
            //溢出时的右边距值
            var parentRight = $(".topbar_introduce_box").width() - 3 - parentLeft - $(this).width();
            //显示隐藏盒子的宽度
            var parentWidth = $("#tabMain").width();
            var bodyWidth = $("body").width();
            if (parentLeft + parentWidth > bodyWidth) {
                $("#tabMain").removeAttr("style");
                $("#tabMain").css("right", parentRight);
            } else {
                $("#tabMain").css("left", parentLeft);
            }
        });
        $(v).mouseout(function (e) {
            if (e.offsetY < $(this).height()) {
                $(".topbar_introduce_info .introduce_content").css("display","none");
            }
        })
    });
    $(".topbar_introduce_info .introduce_content").mouseleave(function () {
        $(".topbar_introduce_info .introduce_content").css("display","none");
    })

    /*
     日历
     设定开始日期，为当天日期
     start1为网页中四个日历的起始日期，start2为第二个日历的起始日期，start4为第四个日历的起始日期
     */
    var start1 = new Date().toLocaleString().split(" ")[0].split("/").join("-");
    var start2, start4;
    $('.mytimepicker .span2').datetimepicker({
        format: "dd/mm/yy",
        autoclose: 1,
        startView: 2,
        maxView: 2,
        forceParse: 0,
        showMeridian: 1,
        language: "zh-CN",
        minView: 2,
        startDate: start1,
    });
    $('.mytimepicker .span2:eq(0)').on("change", function () {
        start2 = $('.mytimepicker .span2:eq(0)').val();
        //z设置默认显示高亮的日期
        $('.mytimepicker .span2:eq(1)').datetimepicker('setInitialDate', start2);
        //设置起始日期
        $('.mytimepicker .span2:eq(1)').datetimepicker('setStartDate', start2);
    });
    $('.mytimepicker .span2:eq(2)').on("change", function () {
        start4 = $('.mytimepicker .span2:eq(2)').val();
        $('.mytimepicker .span2:eq(3)').datetimepicker('setInitialDate', start4);
        $('.mytimepicker .span2:eq(3)').datetimepicker('setStartDate', start4);
    });

    //移除左右箭头的类名（awesomefont的字体）
    $(".datetimepicker-days .icon-arrow-left,.datetimepicker-days .icon-arrow-right").removeClass("glyphicon ");
}

//banner部分
function banner() {
    //动态渲染轮播图（在html代码中执行，防止白屏现象的出现）
    //1.自动轮播
    //2.让下面的数字跟随变化
    //3.点击左右箭头改变轮播
    var $images = $(".banner_images li");
    var currentIndex = 0;
    var timer = null;
    var timerOut = null;
    timer = setInterval(function () {
        currentIndex++;
        slide();
    }, 5000);

    $(".banner_more .arrow_left").on("click", function () {
        stopAnimate();
        clearInterval(timer);
        currentIndex--;
        slide();
        setTimeOut();
    });

    $(".banner_more .arrow_right").on("click", function () {
        stopAnimate();
        clearInterval(timer);
        currentIndex++;
        slide();
        setTimeOut();
    });

    function stopAnimate() {
        $images.stop();
        $images.eq(currentIndex).stop();
        $images.find(".banner_mask").stop();
        $images.eq(currentIndex).find(".banner_mask").stop();
    }

    function setTimeOut() {
        clearTimeout(timerOut);
        timerOut = setTimeout(function () {
            currentIndex++;
            slide();
            timer = setInterval(function () {
                currentIndex++;
                slide();
            }, 5000);
        }, 5000);
    }

    function slide() {
        if (currentIndex >= $images.length) {
            currentIndex = 0;
        }
        if (currentIndex < 0) {
            currentIndex = $images.length - 1;
        }
        $images.eq(currentIndex).animate({"opacity": 1}, 1000, function () {
            $images.each(function (k, v) {
                if (k != currentIndex) {
                    $(this).animate({"opacity": 0});
                    $(this).find(".banner_mask").animate({"opacity": 0});
                }
            });
            if (currentIndex > 0) {
                $(this).find(".banner_mask").animate({"opacity": 1}, 1500);
            }
            $(".banner_more .arrow_num span").html(currentIndex + 1);
        });
    }

    $(window).on("resize", function () {
        renderHtml();
        //在重新渲染页面之后需要重新找$image元素
        $images = $(".banner_images li");
        clearInterval(timer);
        currentIndex = 0;
        $(".banner_more .arrow_num span").html(currentIndex + 1);
        setTimeOut();
    });

    //设置banner_more>a的查看更多的点击事件
    $(".banner_more > a").on("click", function () {
        //$("body").css("transition","all 0.5s");
        var top = $("body").height() - 80;
        $("body").scrollTop(top);
    });
}

//main部分
function main() {
    //监听滚动事件，让.yl_topbar .topbar_header .topbar_brand跟随滚动事件变化
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= 40) {
            $(".yl_topbar .topbar_header .topbar_brand").addClass("topbar_brand_md");
        } else if ($(window).scrollTop() <= 0) {
            $(".yl_topbar .topbar_header .topbar_brand").removeClass("topbar_brand_md");
        }
    });

    //设置几大内容区块的鼠标滑过事件
    $(".yl_main_content li > a").hover(function (e) {
        ani(e, this, 'over');
    }, function (e) {
        ani(e, this, 'out');
    });


}

//footer部分
function footer() {
    //动态设置脚部小图标
    var imgArr = ["icon-fb.jpg", "icon-ins.jpg", "icon-wb.jpg", "icon-wechat.jpg", "icon-youku.jpg", "icon-youtube.jpg"];
    $(".yl_footer > div > a").each(function (k, v) {
        if (k >= 7) {
            $(this).css("background-image", "url(images/" + imgArr[k - 7] + ")");
        }
    });
}