/**
 * Created by MrGao on 2016/9/13.
 */
(function (window) {
    function Tab(config) {
        this._init(config);
    }

    Tab.prototype = {
        //初始化页面结构
        _init:function(config){
            //事件类型，默认为点击事件
            this.type = config.type || "click";
            //自动轮播，默认为false
            if (config.auto == true){
                this.auto();
            }
            this.tabMenus = config.tabMenu.children;
            this.tabMains = config.tabMain.children;
            var i = 0,
                len = this.tabMenus.length,
                that = this;
            for (; i < len; i++) {
                this.tabMenus[i].index = i;
                this.tabMenus[i].addEventListener(this.type,function(){
                    that.change(this.index);
                });
            }
        },
        //tab
        change:function(index){
            var i = 0,
                len = this.tabMenus.length;
            for (; i < len; i++) {
                this.tabMenus[i].classList.remove("active");
                this.tabMains[i].style.display = "none";
            }
            this.tabMenus[index].classList.add("active");
            this.tabMains[index].style.display = "block";
        },
        //自动轮播
        auto:function (){
            var index = 0,
                that = this,
                len = this.tabMenus.length;
            setInterval(function(){
                index++;
                if (index > len) {
                    index = 0;
                }
                that.change(index);
            },1000);
        }
    };
    window.Tab = Tab;
})(window);