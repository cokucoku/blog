/*
 *  长文字图弹窗浏览效果.
 *
 *
 *  * Copyright 2016 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  *
 *
 *  Date: 2016.6.16
 */
var Longpic = function myzoom(opt) {
    var $mark = $("<div>", {
        "class": "mark"
    });
    var $imgk = $("<div>", {
        "class": "zoomimg",
        'html': "<div class=close><span></span><span></span></div><div class='img'></div>"
    });
    var $body = $("body");
    $body.append($mark).append($imgk);
    $mark.fadeIn()
    $imgk.fadeIn(function() {
        $imgk.find(".img").append('<img src=' + opt.url + '>');
        $imgk.find("img").fadeIn();
    });
    var $src = opt.url;
    var img = new Image();
    var iw, ih;
    var moup = 0,
        moleft = 0;
    var sw = $(window).width();
    var sh = $(window).height();
    img.src = $src;
    img.onload = function() {
        iw = img.width;
        ih = img.height;
        if (iw < sw && ih < sh) {
            console.log("长宽多比屏幕小")
            $imgk.find(".img").css({
                left: '50%',
                top: '50%',
                'margin-left': -(iw / 2) + 'px',
                'margin-top': -(ih / 2) + 'px'
            });
        } else if (iw < sw) {
            console.log("高度比屏幕高")
            moup = sh - ih;
            $imgk.find(".img").css({
                left: '50%',
                'margin-left': -(iw / 2) + 'px'
            });
            setTimeout(moveup, 3000)
        } else if (ih < sh) {
            console.log("宽度比屏幕宽")
            moleft = sw - iw;
            $imgk.find(".img").css({
                top: '50%',
                'margin-top': -(ih / 2) + 'px'
            });
            setTimeout(moveleft, 3000)
        } else {
            console.log("都比屏幕大")
        }
    }


    $("body").delegate('.close', 'click', function(event) {
        $imgk.fadeOut();
        $mark.fadeOut(300, function() {
            $mark.remove();
            $imgk.remove();
        });
    });
    //运动函数
    var $ydup = 0,$ydleft = 0;

    function moveup() {
        setInterval(ydup, 50)
    }
    function ydup() {
        $ydup -= 2;
        if ($ydup <= moup) {
            $ydup = moup;
        }
        $imgk.find(".img").css({
            'top': $ydup + 'px'
        });
    }
    function moveleft() {
        setInterval(ydleft, 50)
    }
    function ydleft() {
        $ydleft -= 2;
        if ($ydleft <= moleft) {
            $ydleft = moleft;
        }
        $imgk.find(".img").css({
            'left': $ydleft + 'px'
        });
    }

}