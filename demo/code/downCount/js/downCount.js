/*
 *  倒计时插件.
 *  
 *  
 *  * Copyright 2019 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2019.10.4
 */
class DownCount {
    constructor(el, option) {
        var _this = this
        var setoption = {
            endDate: "2019/10/08 00:00:00",
            theme: 'black', //red,yellow,black,green,
            size: 'm', //s,m,l
        }
        var settheme = 'red,yellow,black,green,blue'
        var setsize = 's,m,l'
        this.option = Object.assign(setoption, option)
        var theme = this.option.theme
        var size = this.option.size
        if (settheme.indexOf(theme) == -1) {
            theme = 'black'
        }
        if (setsize.indexOf(size) == -1) {
            size = 'm'
        }

        //建立骨骼
        if (typeof(el) == 'string') {
            var ell = el.split('#')[1]
            el = document.getElementById(ell);
        } else {
            el = el
        }
        var DownCount = document.createElement('div')
        DownCount.classList.add('DownCount', theme, size)
        this.timehtml(el, DownCount)
        setInterval(function() {
            var datas1 = [];
            _this.diff--;
            _this.diffDay = Math.floor(_this.diff / (60 * 60 * 24));
            _this.diffHou = Math.floor((_this.diff / (60 * 60))) - (_this.diffDay * 24);
            _this.diffMin = Math.floor(_this.diff / (60)) - (_this.diffDay * 24 * 60) - (_this.diffHou * 60);
            _this.diffSec = Math.floor(_this.diff) - (_this.diffDay * 24 * 60 * 60) - (_this.diffHou * 60 * 60) - (_this.diffMin * 60);
            if (_this.diffDay < 10) _this.diffDay = "0" + _this.diffDay;
            if (_this.diffHou < 10) _this.diffHou = "0" + _this.diffHou;
            if (_this.diffMin < 10) _this.diffMin = "0" + _this.diffMin;
            if (_this.diffSec < 10) _this.diffSec = "0" + _this.diffSec;
            _this.lenDay = _this.lens(_this.diffDay);
            _this.lenHou = _this.lens(_this.diffHou);
            _this.lenMin = _this.lens(_this.diffMin);
            _this.lenSec = _this.lens(_this.diffSec);
            _this.lastdate = (_this.diffDay.toString()) + (_this.diffHou.toString()) + (_this.diffMin.toString()) + (_this.diffSec.toString());
            var position=el.getElementsByClassName('DownCount')[0].getElementsByClassName('pai')

            for (var i = 0; i < position.length; i++) {
                datas1.push(position[i].innerText);
            }

            for (var i = 0; i < position.length; i++) { //判断初始值与跳动的值
                if (datas1[i] == _this.lastdate.substr(i, 1)) {} else {
                    _this.dong(i,position);
                }
            }

        }, 1000)

    }
    dong(i,position){
        var digit = position[i].getElementsByClassName('num')[0];
        var number = this.lastdate.substr(i, 1);
        digit.classList.add('down')
        var span=document.createElement('span')
        span.classList.add('num','up')
        span.innerText=number
        setTimeout(function(){
             digit.parentNode.insertBefore(span,digit)
             setTimeout(function(){
                span.classList.remove('up')
            },50)
            digit.parentNode.removeChild(digit);
        },300)

    }
    timehtml(el, DownCount) {
        var endDate = new Date(this.option.endDate).getTime();
        var beginDate = new Date().getTime();
        this.diff = Math.floor((endDate - beginDate) / 1000);

        this.diffDay = Math.floor(this.diff / (60 * 60 * 24));
        this.diffHou = Math.floor((this.diff / (60 * 60))) - (this.diffDay * 24);
        this.diffMin = Math.floor(this.diff / (60)) - (this.diffDay * 24 * 60) - (this.diffHou * 60);
        this.diffSec = Math.floor(this.diff) - (this.diffDay * 24 * 60 * 60) - (this.diffHou * 60 * 60) - (this.diffMin * 60);
        if (this.diffDay < 10) this.diffDay = "0" + this.diffDay;
        if (this.diffHou < 10) this.diffHou = "0" + this.diffHou;
        if (this.diffMin < 10) this.diffMin = "0" + this.diffMin;
        if (this.diffSec < 10) this.diffSec = "0" + this.diffSec;
        this.lenDay = this.lens(this.diffDay);
        this.lenHou = this.lens(this.diffHou);
        this.lenMin = this.lens(this.diffMin);
        this.lenSec = this.lens(this.diffSec);
        var dayspan = [],
            houspan = [],
            minspan = [],
            secspan = []
        for (var i = 0; i < this.lenDay; i++) {
            var div = document.createElement('div')
            var span = document.createElement('span')
            div.classList.add('pai')
            span.classList.add('num')
            span.innerText = this.diffDay.toString().substr(i, 1)
            div.appendChild(span)
            dayspan.push(div)
        }
        for (var i = 0; i < this.lenHou; i++) {
            var div = document.createElement('div')
            var span = document.createElement('span')
            div.classList.add('pai')
            span.classList.add('num')
            span.innerText = this.diffHou.toString().substr(i, 1)
            div.appendChild(span)
            houspan.push(div)
        }
        for (var i = 0; i < this.lenMin; i++) {
            var div = document.createElement('div')
            var span = document.createElement('span')
            div.classList.add('pai')
            span.classList.add('num')
            span.innerText = this.diffMin.toString().substr(i, 1)
            div.appendChild(span)
            minspan.push(div)
        }
        for (var i = 0; i < this.lenSec; i++) {
            var div = document.createElement('div')
            var span = document.createElement('span')
            div.classList.add('pai')
            span.classList.add('num')
            span.innerText = this.diffSec.toString().substr(i, 1)
            div.appendChild(span)
            secspan.push(div)
        }
        var ziday = document.createElement('span')
        var zihou = document.createElement('span')
        var zimin = document.createElement('span')
        var zisec = document.createElement('span')
        ziday.classList.add('zi')
        zihou.classList.add('zi')
        zimin.classList.add('zi')
        zisec.classList.add('zi')
        ziday.innerText = '天'
        zihou.innerText = '时'
        zimin.innerText = '分'
        zisec.innerText = '秒'


        dayspan.map(function(item) {
            DownCount.appendChild(item)
        });
        DownCount.appendChild(ziday)
        houspan.map(function(item) {
            DownCount.appendChild(item)
        });
        DownCount.appendChild(zihou)
        minspan.map(function(item) {
            DownCount.appendChild(item)
        });
        DownCount.appendChild(zimin)
        secspan.map(function(item) {
            DownCount.appendChild(item)
        });
        DownCount.appendChild(zisec)
        el.appendChild(DownCount)
    }
    lens(strs) {
        var strss = strs.toString();
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
}