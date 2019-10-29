/*
 *  jQuery mypage.js
 *  
 *  
 *  * Copyright 2018 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2018.7.10
 */
var Page = function mypage(el, arr) {
    this.vesion = "1.0.1";
    var tpg = arr.len;
    var page=1;
    var ul = $("<ul class=mypage>")
    var li = "<li class=first>首页</li><li class=prev>上一页</li>";
    for (var i = 1; i <= tpg; i++) {
        li += "<li>" + i + "</li>"
    }
    li += "<li class=next>下一页</li><li class=last>末页</li>";
    ul.append(li);
    $(el).append(ul).addClass(arr.sizes+" "+ arr.themes);
    var $li = $(el).find("li:not([class])");
    $li.eq(0).addClass("on");
    $li.bind('click', function(event) {
        page = $(this).text();
        gotopage(page);
    });
    $(".first").bind('click', function(event) {
        page = 1;
        gotopage(page);
    });
    $(".last").bind('click', function(event) {
        page = tpg;
        gotopage(page);
    });
    $(".prev").bind('click', function(event) {
        if (page > 1) page--;
        gotopage(page);
    });
    $(".next").bind('click', function(event) {
        if (page < tpg) page++;
        gotopage(page);
    });

    function gotopage(page) {
        arr.clickback.call(this, page);
        $li.eq(page - 1).addClass("on").siblings().removeClass('on');
    }
    this.go = function(i) {
        $li.eq(i - 1).addClass("on").siblings().removeClass('on');
        page = i;
        return page;
    };


}