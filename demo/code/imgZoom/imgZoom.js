/*
 *  图片放大插件.
 *  
 *  
 *  * Copyright 2016 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2016.6.16
 */
var $mark = $("<div>", {
    "class": "mark"
});
var $myprogress = $('<div>', {
            'class': 'myprogress',
            'html':'<div class=jd></div>'
});
var $imgk = $("<div>", {
    "class": "zoomimg",
    'html': "<div class=close><span></span><span></span></div><div class=imgsrc><div class=imgsrcn><div class='imgslide-action imgslide-prev'></div><div class=img></div><div class='imgslide-action imgslide-next'></div></div></div><div class=ms><span class=cur>1</span>/<span class=total>1</span><p>myzoom.js</p></div>"
});
var imgZoom = function myzoom(el, opt) {
    var $img = $(el).find("img");
    var $total = $img.size();
    var $idx; //当前第几张
    $img.bind('click', function(event) {
        $idx = $(this).index();
        $("body").append($mark);
        $("body").append($imgk);
        $mark.fadeIn(300);
        $imgk.fadeIn(300);
        show($idx);
    });

    if (!opt.nextpre) {
        $imgk.find('.imgslide-action').remove();


    }
    $("body").delegate('.close', 'click', function(event) {
        $imgk.fadeOut(300);
        $myprogress.fadeOut(300);
        $mark.fadeOut(300, function() {
            $mark.remove();
            $imgk.remove();
            $myprogress.remove();
        });
    });
    $("body").delegate('.imgslide-next', 'click touchstart', function(event) {
        $idx = $idx + 1;
        if ($idx > $total - 1) {
            if (opt.loop == true) { $idx = 0 } else { $idx = $total - 1; }
        }
        show($idx)
    });
    $("body").delegate('.imgslide-prev', 'click touchstart', function(event) {
        $idx = $idx - 1;
        if ($idx < 0) {
            if (opt.loop == true) { $idx = $total - 1 } else { $idx = 0; }
        }
        show($idx)
    });
    this.go = function(index) {
        $idx = index;
        if ($idx >= $total) {
            $idx = $total - 1;
        }
        $("body").append($mark);
        $("body").append($imgk);
        $mark.fadeIn(300);
        $imgk.fadeIn(300);
        show($idx)
    }

    function show(index) {
        if (opt.progress && opt.nextpre) {
            $("body").append($myprogress);
            $myprogress.fadeIn(300);
            var jdw=((index+1)/$total)*100+'%';
            $('.myprogress .jd').css('width',jdw);
        }
        var xg = opt.effect;
        $img.eq(index).addClass('cur').siblings().removeClass('cur');
        var $src = $img.eq(index).attr("src");
        var img = new Image();
        var iw, ih;
        var sw = $(window).width();
        var sh = $(window).height();
        img.src = $src;
        var $text = $img.eq(index).attr("alt");
        var $ms = $img.eq(index).attr("data-html");
        $imgk.find('.imgsrcn .img').html(img);
        if (xg == 'fade') {
            $imgk.find('img').addClass('effect-fade');
        } else if (xg == 'left') {
            $imgk.find('img').addClass('effect-left');
        } else if (xg == 'right') {
            $imgk.find('img').addClass('effect-right');

        } else if (xg == 'up') {
            $imgk.find('img').addClass('effect-up');
        } else if (xg == 'down') {
            $imgk.find('img').addClass('effect-down');
        } else if (xg == 'rotation') {
            $imgk.find('img').addClass('effect-rotation');
        } else if (xg == 'scale') {
            $imgk.find('img').addClass('effect-scale');
        }
        $imgk.find('.ms p').html($text + "<br>" + '<div style="font-size:16px;">' + $ms + '</div>');
        //$imgk.find('.ms p').html('');
        $imgk.find('.ms .cur').html(index + 1);
        $imgk.find('.ms .total').html($total);
        img.onload = function() {
            iw = img.width;
            ih = img.height;
            if (iw < sw && ih < sh) {
                console.log("长宽多比屏幕小")
                $imgk.find('.imgsrcn').css({
                    'position': 'absolute',
                    'left': '50%',
                    'top': '50%',
                    'margin-left': '-' + iw / 2 + 'px',
                    'margin-top': '-' + ih / 2 + 'px'
                });
            } else if (iw < sw) {
                console.log("高度比屏幕高")
                $imgk.find('.imgsrcn').css({
                    'position': 'absolute',
                    'left': '50%',
                    'top': '0',
                    'margin-left': '-' + iw / 2 + 'px',
                    'margin-top': 0
                });
            } else if (ih < sh) {
                console.log("宽度比屏幕宽")
                $imgk.find('.imgsrcn').css({
                    'position': 'absolute',
                    'left': '0',
                    'top': '50%',
                    'margin-left': '0',
                    'margin-top': '-' + ih / 2 + 'px',
                });
            } else {
                console.log("都比屏幕大")
                $imgk.find('.imgsrcn').css({
                    'position': 'absolute',
                    'left': '0',
                    'top': '0',
                    'margin-left': 0,
                    'margin-top': 0
                });
            }

        }

    }
}