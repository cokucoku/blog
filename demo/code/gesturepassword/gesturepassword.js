/*
 *  手势密码插件.
 *  
 *  
 *  * Copyright 2019 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2019.10.4
 */

let GesturePassword = function(el, option) {
    let _this = this
    let setoption = {
        check: function(result) {}
    }
    const myoption = Object.assign(setoption, option)
    let dotpo = []
    let pass = []
    //建立骨骼
    if (typeof(el) == 'string') {
        let ell = el.split('#')[1]
        el = document.getElementById(ell);
    } else {
        el = el
    }
    let leeGesturePassword = createdom('div', 'lee-gesture-password')
    for (let i = 0; i < 9; i++) {
        let dot = createdom('div', 'dot')
        let i = document.createElement('i')
        appendAll(dot, [i])
        appendAll(leeGesturePassword, [dot])
    }
    appendAll(el, [leeGesturePassword])
    let dots = leeGesturePassword.children
    Array.from(dots).map(function(elem, inx) {
        dotpo.push({ xh: inx, left: elem.offsetLeft, top: elem.offsetTop })
    })
    //动作
    let down = false
    document.addEventListener('mousedown', function(e) {
        down = true
        let index = xh(e.pageX - el.offsetLeft, e.pageY - el.offsetTop)
        if (index != 'null') {
            light(index)
        }
    })
    document.addEventListener('mouseup', function(e) {
        down = false
        let result
        if (JSON.stringify(myoption.password) == JSON.stringify(pass)) {
            let tipdiv = createdom('div', 'tips')
            tipdiv.innerText = '验证成功'
            appendAll(leeGesturePassword, [tipdiv])
            setTimeout(() => tipdiv.style.opacity = 1, 1)
            setTimeout(function() {
                tipdiv.style.opacity = 0
                setTimeout(() => leeGesturePassword.removeChild(tipdiv), 500)
                Array.from(dots).map(function(elem) {
                    if (elem.children.length > 0) {
                        elem.children[0].style.cssText = ''
                    }
                })
            }, 1500)
            result = 'ok'

        } else {
            if (pass.length > 0) {
                result = 'err'
                leeGesturePassword.classList.add('error')
                let tipdiv = createdom('div', 'tips')
                tipdiv.innerText = '密碼錯誤'
                appendAll(leeGesturePassword, [tipdiv])
                setTimeout(() => tipdiv.style.opacity = 1, 1)
                setTimeout(function() {
                    tipdiv.style.opacity = 0
                    setTimeout(() => leeGesturePassword.removeChild(tipdiv), 500)
                    leeGesturePassword.classList.remove('error')
                    Array.from(dots).map(function(elem) {
                        if (elem.children.length > 0) {
                            elem.children[0].style.cssText = ''
                        }
                    })
                }, 1500)
            } else {
                result = 'no'
            }
        }
        pass = []
        myoption.check.call(_this, result)
    })
    document.addEventListener('mousemove', function(e) {
        e.preventDefault()
        if (down) {
            let index = xh(e.pageX - el.offsetLeft, e.pageY - el.offsetTop)
            if (index != 'null') {
                light(index)
            }
        }
    })
    document.addEventListener('touchstart', function(e) {
        down = true
        let index = xh(e.targetTouches[0].clientX - el.offsetLeft, e.targetTouches[0].clientY - el.offsetTop)
        if (index != 'null') {
            light(index)
        }
    }, { passive: true })
    document.addEventListener('touchend', function(e) {
        down = false
        let result
        if (JSON.stringify(myoption.password) == JSON.stringify(pass)) {
            let tipdiv = createdom('div', 'tips')
            tipdiv.innerText = '验证成功'
            appendAll(leeGesturePassword, [tipdiv])
            setTimeout(() => tipdiv.style.opacity = 1, 1)
            setTimeout(function() {
                tipdiv.style.opacity = 0
                setTimeout(() => leeGesturePassword.removeChild(tipdiv), 500)
                Array.from(dots).map(function(elem) {
                    if (elem.children.length > 0) {
                        elem.children[0].style.cssText = ''
                    }
                })
            }, 1500)
            result = 'ok'

        } else {
            if (pass.length > 0) {
                result = 'err'
                leeGesturePassword.classList.add('error')
                let tipdiv = createdom('div', 'tips')
                tipdiv.innerText = '密碼錯誤'
                appendAll(leeGesturePassword, [tipdiv])
                setTimeout(() => tipdiv.style.opacity = 1, 1)
                setTimeout(function() {
                    tipdiv.style.opacity = 0
                    setTimeout(() => leeGesturePassword.removeChild(tipdiv), 500)
                    leeGesturePassword.classList.remove('error')
                    Array.from(dots).map(function(elem) {
                        if (elem.children.length > 0) {
                            elem.children[0].style.cssText = ''
                        }
                    })
                }, 1500)
            } else {
                result = 'no'
            }
        }
        pass = []
        myoption.check.call(_this, result)
    }, { passive: true })
    document.addEventListener('touchmove', function(e) {
        e.preventDefault()
        if (down) {
            let index = xh(e.targetTouches[0].clientX - el.offsetLeft, e.targetTouches[0].clientY - el.offsetTop)
            if (index != 'null') {
                light(index)
            }
        }
    }, { passive: false })

    function light(xh) {
        dots[xh].children[0].style.opacity = '1'
        if (pass.includes(xh + 1)) {
            return
        } else {
            pass.push(xh + 1)
        }
        //myoption.check.call(_this,pass)
    }

    function xh(x, y) {
        let fi = dotpo.filter(function(elem) {
            return x - elem.left >= 0 && x - elem.left <= 80 && y - elem.top >= 0 && y - elem.top <= 80
        })
        let index
        if (fi.length < 1) {
            index = 'null'
        } else {
            index = fi[0].xh
        }
        return index
    }

    //創建DOM函數
    function createdom(tagname, classlist) {
        var dom = document.createElement(tagname)
        var clist = classlist.split(',')
        for (var i = 0; i < clist.length; i++) {
            dom.classList.add(clist[i])
        }
        return dom
    }
    //批量Append函數
    function appendAll(where, array) {
        if (where != null) {
            array.map(function(elem) {
                where.appendChild(elem)
            })
        }
    }
    //查找DOM xh
    function index(target) {
        let xh = 0;
        let all = target.parentNode.children
        all = Array.from(all)
        xh = all.indexOf(target)
        return xh;
    }

}