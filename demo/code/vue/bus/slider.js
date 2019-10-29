/*
 *  滑块插件.
 *  
 *  
 *  * Copyright 2016 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2016.6.16
 */
class Slider {
    constructor(el, option) {
        var _this = this
        var setoption = {
            theme: 'blue', //red,yellow,black,green,
            size: 'm', //s,m,l
            initvalue: 0,
            showtip: true,
            step: 1,
            showstop: false,
            slideend: function(val) {}
        }
        var settheme = 'red,yellow,black,green,blue'
        var setsize = 's,m,l'
        this.option = Object.assign(setoption, option)
        var theme = this.option.theme
        var size = this.option.size
        var showtip = this.option.showtip
        var initvalue = this.option.initvalue
        this.step = this.option.step
        var showstop = this.option.showstop
        if (settheme.indexOf(theme) == -1) {
            theme = 'blue'
        }
        if (setsize.indexOf(size) == -1) {
            size = 'm'
        }

        //建立骨骼
        var runway = document.createElement("div")
        var bar = document.createElement("div")
        var wrap = document.createElement("div")
        var tooltip = document.createElement("div")
        if (showstop && this.step != 1) {
            var stops = []
            for (var i = 1; i <= Math.floor(100 / this.step) - 1; i++) {
                var stop = document.createElement("div")
                stop.classList.add('stop')
                stops.push(stop)
            }
            stops.map(function(item, index) {
                item.style.left = (index + 1) * _this.step + "%"
                runway.appendChild(item)
            });
        }
        var button = document.createElement("div")
        runway.classList.add('slider-runway', theme, size)
        bar.classList.add('slider-bar')
        wrap.classList.add('slider-wrap')
        button.classList.add('slider-button')
        tooltip.classList.add('slider-tooltip')
        wrap.appendChild(button)
        wrap.appendChild(tooltip)
        runway.appendChild(bar)
        runway.appendChild(wrap)
        if (typeof(el) == 'string') {
            var ell = el.split('#')[1]
            el = document.getElementById(ell);
        } else {
            el = el
        }
        el.appendChild(runway)
        if (!showtip) {
            tooltip.style.display = 'none'
        }
        //console.log(document.getElementsByClassName('slider-wrap')[0].getBoundingClientRect())
        var down = false,
            ov = false
        //因為軌道的總寬度，滑塊位置會隨著窗口變動，所以我們要把他保存為全局可以獲取的變量
        this.fullw = runway.offsetWidth //轨道总长度
        var old_x,
            new_x = initvalue * this.fullw * 0.01;
        this.chuli(tooltip, wrap, bar, new_x, this.fullw)
        this.wrapleft = wrap.offsetLeft //滑塊的位置
        wrap.addEventListener('mouseenter', function(e) {
            ov = true
        })
        wrap.addEventListener('mouseleave', function(e) {
            ov = false
        })
        wrap.addEventListener('mousedown', function(e) {
            //e.stopPropagation()
            down = true
            old_x = e.pageX - _this.wrapleft;
        })
        wrap.addEventListener('mouseup', function(e) {
            //e.stopPropagation()
            down = false
            _this.wrapleft = wrap.offsetLeft
        })
        wrap.addEventListener('touchstart', function(e) {
            //e.stopPropagation()
            down = true
            old_x = e.targetTouches[0].clientX - _this.wrapleft;
        }, { passive: true })
        wrap.addEventListener('touchend', function(e) {
            //e.stopPropagation()
            down = false
            _this.wrapleft = wrap.offsetLeft
        }, { passive: true })
        runway.addEventListener('mouseup', function(e) {
            //e.stopPropagation()
            down = false
            new_x = e.pageX - runway.offsetLeft
            _this.chuli(tooltip, wrap, bar, new_x, _this.fullw)
            _this.wrapleft = wrap.offsetLeft
        })
        document.addEventListener('mouseup', function(e) {
            e.preventDefault()
            down = false
            _this.wrapleft = wrap.offsetLeft
        })
        document.addEventListener('mousemove', function(e) {
            e.preventDefault()
            if (down) {
                tooltip.style.opacity = '1'
                new_x = e.pageX - old_x
                _this.chuli(tooltip, wrap, bar, new_x, _this.fullw)
                _this.wrapleft = wrap.offsetLeft
            } else if (ov) {
                tooltip.style.opacity = '1'
            } else {
                tooltip.style.opacity = ''
            }
        })
        document.addEventListener('touchend', function(e) {
            //e.preventDefault()
            down = false
            _this.wrapleft = wrap.offsetLeft
        }, { passive: true })
        document.addEventListener('touchmove', function(e) {
            //e.preventDefault()
            if (down) {
                wrap.classList.add('hover')
                new_x = e.targetTouches[0].clientX - old_x
                _this.chuli(tooltip, wrap, bar, new_x, _this.fullw)
                _this.wrapleft = wrap.offsetLeft
            } else {
                wrap.classList.remove('hover')
            }
        }, { passive: true })

        window.addEventListener('resize', function(e) {
            _this.fullw = runway.offsetWidth
            _this.wrapleft = wrap.offsetLeft
        })
    }
    chuli(tooltip, wrap, bar, x, w) {
        if (x <= 0) {
            x = 0
        } else if (x >= w) {
            x = w
        }
        var po = Math.floor((x / w) * 100)
        if (po % this.step == 0) {
            po = po
        } else {
            if (po % this.step >= this.step * 0.5) {
                po = po - (po % this.step) + this.step
            } else {
                po = po - (po % this.step)

            }

        }
        this.option.slideend.call(this, po);
        wrap.style.left = po + '%'
        bar.style.width = po + '%'
        tooltip.innerText = po
    }
}