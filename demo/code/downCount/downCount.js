/*
 *  jQuery 翻牌倒计时.
 *  
 *  
 *  * Copyright 2016 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2016.6.16
 */
;
(function($) {
    $.fn.downCount = function(options) {
        var $this = $(this);
        defaulst = {
            endDate: "2016/10/01 00:00:00",
            size:"sm",
            // width: "16",
            // height: "22",
            bgcolor: "#444"
        };
        myopt = $.extend({}, defaulst, options);


        var diffDay, diffHou, diffMin, diffSec, beginDate, diff;
        var lenDay, lenHour, lenMin, lenSec;
        var datas = [];
        timehtml();
        var position = $this.find('.pai');
        var num = position.length;
        var lastdate;
        //var digit="",number="",replacement="";
        //console.log(num);
        setInterval(function() {
            var datas1 = [];
            diff--;
            if (diff <= 0) {
                diff = 0;
            }
            diffDay = Math.floor(diff / (60 * 60 * 24));
            diffHou = Math.floor((diff / (60 * 60))) - (diffDay * 24);
            diffMin = Math.floor(diff / (60)) - (diffDay * 24 * 60) - (diffHou * 60);
            diffSec = Math.floor(diff) - (diffDay * 24 * 60 * 60) - (diffHou * 60 * 60) - (diffMin * 60);
            if (diffDay < 10) diffDay = "0" + diffDay;
            if (diffHou < 10) diffHou = "0" + diffHou;
            if (diffMin < 10) diffMin = "0" + diffMin;
            if (diffSec < 10) diffSec = "0" + diffSec;
            lenDay = lens(diffDay);
            lenHou = lens(diffHou);
            lenMin = lens(diffMin);
            lenSec = lens(diffSec);
            lastdate = (diffDay.toString()) + (diffHou.toString()) + (diffMin.toString()) + (diffSec.toString());
            for (var i = 0; i < num; i++) {
                var sz = position.eq(i).find('.num').html();
                datas1.push(sz);
            }

            for (var i = 0; i < num; i++) { //判断初始值与跳动的值
                if (datas1[i] == lastdate.substr(i, 1)) {} else {
                    dong(i);
                }
            }



        }, 1000);


        //
        function dong(pos) {

            var digit = position.eq(pos).find('.num');
            var number = lastdate.substr(pos, 1);
            if (digit.is(':animated')) { //没有这句浏览器切换的时候有问题
                return false;
            }
            var replacement = $('<div>', {
                'class': 'num',
                css: {
                    top: '-22px',
                    opacity: 0,
                    background: myopt.bgcolor
                },
                html: number
            });
            digit
                .before(replacement)
                .removeClass('static')
                .animate({
                    top: '26px',
                    opacity: 0
                }, 'fast', function() {
                    digit.remove();
                });
            replacement
                .delay(100)
                .animate({
                    top: 0,
                    opacity: 1
                }, 'fast', function() {
                    replacement.addClass('clone');
                });
        }

        //timehtml形成
        function timehtml() {
            endDate = new Date(myopt.endDate).getTime();
            beginDate = new Date().getTime();
            diff = Math.floor((endDate - beginDate) / 1000);

            diffDay = Math.floor(diff / (60 * 60 * 24));
            diffHou = Math.floor((diff / (60 * 60))) - (diffDay * 24);
            diffMin = Math.floor(diff / (60)) - (diffDay * 24 * 60) - (diffHou * 60);
            diffSec = Math.floor(diff) - (diffDay * 24 * 60 * 60) - (diffHou * 60 * 60) - (diffMin * 60);
            if (diffDay < 10) diffDay = "0" + diffDay;
            if (diffHou < 10) diffHou = "0" + diffHou;
            if (diffMin < 10) diffMin = "0" + diffMin;
            if (diffSec < 10) diffSec = "0" + diffSec;
            lenDay = lens(diffDay);
            lenHou = lens(diffHou);
            lenMin = lens(diffMin);
            lenSec = lens(diffSec);
            var htmlday = "<div class='countDays k'>";
            for (i = 0; i < lenDay; i++) {
                htmlday += "<div class='pai'><div class='num static'>" + diffDay.toString().substr(i, 1) + "</div></div>";
            }
            htmlday += "</div><div class='k'>天</div>";
            var htmlhou = "<div class='countHou k'>";
            for (i = 0; i < lenHou; i++) {
                htmlhou += "<div class='pai'><div class='num static'>" + diffHou.toString().substr(i, 1) + "</div></div>";
            }
            htmlhou += "</div><div class='k'>时</div>"
            var htmlmin = "<div class='countMin k'>";
            for (i = 0; i < lenMin; i++) {
                htmlmin += "<div class='pai'><div class='num static'>" + diffMin.toString().substr(i, 1) + "</div></div>";
            }
            htmlmin += "</div><div class='k'>分</div>"
            var htmlsec = "<div class='countSec k'>";
            for (i = 0; i < lenSec; i++) {
                htmlsec += "<div class='pai'><div class='num static'>" + diffSec.toString().substr(i, 1) + "</div></div>";
            }
            htmlsec += "</div><div class='k'>秒</div>"
            $this.html(htmlday + htmlhou + htmlmin + htmlsec);

        }
        //设置皮肤
        var size=myopt.size;
        var thmew,thmeh;
        switch (size) {
            case "s":
                console.log("小尺寸");
                thmew="16";
                thmeh="22";
                break;
            case "m":
                console.log("中尺寸");
                thmew="26";
                thmeh="36";
                break;
            case "l":
                console.log("大尺寸");
                thmew="36";
                thmeh="50";
                break;
            case "xl":
                console.log("大大尺寸");
                thmew="46";
                thmeh="64";
                break;
        }
        //console.log(size);
        $this.find(".pai").css({
            "width": thmew+"px",
            "height":thmeh+"px",
            "line-height": thmeh+"px"
        });
        $this.find(".k").css({
            "height":thmeh+"px",
            "line-height": thmeh+"px",
            "font-size": (thmeh-6)+"px"
        });
        $this.find(".num").css({
            "background": myopt.bgcolor
        });



        //获取长度
        function lens(strs) {
            strss = strs.toString();
            var l = 0;
            var a = strss.split("");
            for (var i = 0; i < a.length; i++) {
                if (a[i].charCodeAt(0) < 299) {
                    l++;
                } else {
                    l += 2;
                }
            }
            return l;
        }



        return this;
    }
})(jQuery);