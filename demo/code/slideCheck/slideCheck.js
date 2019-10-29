/*
 *	jQuery drag验证.
 *	
 *	
 *	* Copyright 2016 (c) liguangfa
 *	* https://github.com/cokucoku/myplugin
 *	* 
 *	
 *	Date: 2016.6.16
 */
;
(function($) {
    $.fn.slideCheck = function(options) {
        var $this = $(this);
        $this.addClass('slideCheck')
        var draghtml = "<div class='drag_bg'></div><div class='drag_text'>拖动滑块验证</div><div class='handler handler_bg'></div>";
        defaulst = {
            fsize: "14",
            width: "300",
            height: "34",
            bgcolor: "#7ac23c"
        };
        myopt = $.extend({}, defaulst, options);
        console.log(myopt.width);
        $this.css({
            "font-size": myopt.fsize,
            "width": myopt.width + "px",
            "height": myopt.height + "px",
            "line-height": myopt.height + "px"
        });
        $this.html(draghtml);
        $this.find(".drag_bg").css({
            "height": myopt.height + "px",
            "background": myopt.bgcolor
        });
        $this.find(".drag_text").css({
            "width": myopt.width + "px",
            "height": myopt.height + "px"
        });
        $this.find(".handler").css({
            "height": myopt.height - 2
        });
        var totalw = $this.width();
        var handlerw = $this.find(".handler").width();
        var aim = totalw - handlerw - 2;
        var isok = false,
            isMove = false,
            abs_x, abs_y;
        var obj = $('.handler');
        var obj1 = $('.drag_bg');
        var obj2 = $('.drag_text');
        //console.log(aim);
        //PC端
        $(".handler").bind('mousedown', function(event) {
            isMove = true;
            abs_x = event.pageX - $(this).offset().left;
            abs_y = event.pageY - $(this).offset().top;
        });
        $(document).mousemove(function(event) {
            if (isMove && !isok) {
                if (event.pageX - abs_x < 0 || event.pageX - abs_x > aim) {
                    return false;
                } else {
                    obj.css({
                        'left': event.pageX - abs_x
                    });
                    obj1.css({
                        'width': event.pageX - abs_x
                    });
                    if (parseInt(obj.css('left')) == aim) {
                        obj.removeClass('handler_bg').addClass('handler_ok_bg');
                        obj2.html("验证通过").css({ "color": "#fff" });
                        isMove = false;
                        isok = true;
                    }
                }


            }
        })
        $(document).mouseup(function(event) {
            isMove = false;
            var theleft = $(".handler").css("left");
            if (parseInt(theleft) < aim) {
                $(".handler").css({ "left": 0 });
                $(".drag_bg").css({ "width": 0 });
            }
        });
        //移动端
        $(".handler").bind('touchstart', function(event) {
            isMove = true;
            abs_x = event.originalEvent.targetTouches[0].clientX - $(this).offset().left;
            abs_y = event.originalEvent.targetTouches[0].clientY - $(this).offset().top;
        });
        $(document).bind('touchmove', function(event) {
            if (isMove && !isok) {
                if (event.pageX - abs_x < 0 || event.pageX - abs_x > aim) {
                    return false;
                } else {
                    obj.css({
                        'left': event.originalEvent.targetTouches[0].clientX- abs_x
                    });
                    obj1.css({
                        'width': event.originalEvent.targetTouches[0].clientX - abs_x
                    });
                    if (parseInt(obj.css('left')) == aim) {
                        obj.removeClass('handler_bg').addClass('handler_ok_bg');
                        obj2.html("验证通过").css({ "color": "#fff" });
                        isMove = false;
                        isok = true;
                    }
                }
            }
        })
        $(document).bind('touchend',function(event) {
            isMove = false;
            var theleft = $(".handler").css("left");
            if (parseInt(theleft) < aim) {
                $(".handler").css({ "left": 0 });
                $(".drag_bg").css({ "width": 0 });
            }
        });
        return this;
    }
})(jQuery);