/*
 *	jQuery prettfyform.js
 *	
 *	
 *	* Copyright 2016 (c) liguangfa
 *	* https://github.com/cokucoku/myplugin
 *	* 
 *	
 *	Date: 2016.6.16
 */
var Prettfyform = function myform(el, arr) {
    var $el = $(el);
    var $input = $el.find("input[type!=text]");
    var h=$el.height();
    $el[0].style.setProperty('--h', h-2 + 'px')
    $el[0].style.setProperty('--hf', -(h-2)/2 + 'px')
    $el[0].style.setProperty('--lf', -(h-2) + 'px')
    $el[0].style.setProperty('--color',arr.theme)
    //var type=$input.attr("type");
    $input.each(function(index, elm) {
        var type = $(elm).attr("type");
        var dis = $(elm).attr("disabled");
        var che = $(elm).attr("checked");
        $(elm).parent().addClass(type).addClass(dis).addClass(che);
        //console.log($(elm)[0].checked)
    });
    $el.addClass("prettfyform");
    $el.addClass(arr.style);
    $el.find("input[type=checkbox]").bind('click', function(event) {
        var checked = $(this)[0].checked;
        if (checked==true) {
            $(this).parent('.checkbox').addClass("checked");
        }else{
        	$(this).parent('.checkbox').removeClass("checked");
        }

    });
    $el.find("input[type=radio]").bind('click', function(event) {
        var checked = $(this)[0].checked;
        if (checked==true) {
            $(this).parent('.radio').addClass("checked").siblings('.radio').removeClass('checked');
        }else{
        	$(this).parent('.radio').removeClass("checked");
        }

    });

}