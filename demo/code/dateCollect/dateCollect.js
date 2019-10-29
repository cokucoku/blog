/*
 *  jQuery datecollect
 *  
 *  
 *  * Copyright 2018 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2018.7.10
 */

var dateCollect = function mydate() {
    //时间戳处理
    this.timetrans = function(date) {
        var date = new Date(date * 1000); //如果date为10位需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    };
    //获取日期对应周几
    this.getweek = function(date) {
        var date = new Date(date);
        switch (date.getDay()) {
            case 0:
                return "周日"
                break;
            case 1:
                return "周一"
                break;
            case 2:
                return "周二"
                break;
            case 3:
                return "周三"
                break;
            case 4:
                return "周四"
                break;
            case 5:
                return "周五"
                break;
            case 6:
                return "周六"
                break;
        }
    };
    //两个日期差
    this.datediff = function(begindate, enddate) {
        var diff, diffSec, diffMin, diffHou, diffDay, diffMon, diffYear;
        var enddate = new Date(enddate);
        var begindate = new Date(begindate);
        diff = Math.floor((enddate - begindate) / 1000);
        diffDay = Math.floor(diff / (60 * 60 * 24));
        diffHou = Math.floor((diff / (60 * 60))) - (diffDay * 24);
        diffMin = Math.floor(diff / (60)) - (diffDay * 24 * 60) - (diffHou * 60);
        diffSec = Math.floor(diff) - (diffDay * 24 * 60 * 60) - (diffHou * 60 * 60) - (diffMin * 60);

        return "两个日期相差：" + diffDay + "天" + diffHou + "小时" + diffMin + "分" + diffSec + "秒";
    };
    //获取时间对应几天前，多少小时前
    this.dateago = function(date) {
        var diff, diffSec, diffMin, diffHou, diffDay;
        var now = new Date();
        var old = new Date(date)
        diff = Math.floor((now - old) / 1000); 
        diffDay = Math.floor(diff / (60 * 60 * 24));
        diffHou = Math.floor((diff / (60 * 60))) - (diffDay * 24);
        diffMin = Math.floor(diff / (60)) - (diffDay * 24 * 60) - (diffHou * 60);
        diffSec = Math.floor(diff) - (diffDay * 24 * 60 * 60) - (diffHou * 60 * 60) - (diffMin * 60);
        if (diffDay >= 1) {
            return diffDay + "天前"
        } else if (diffHou >= 1) {
            return diffHou + "小时前"
        } else if (diffMin >= 1) {
            return diffMin + "分钟前"
        } else if (diffSec >= 1) {
            return diffSec + "秒前"
        }

    };


}