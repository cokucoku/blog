/*
 *  switch开关插件.
 *  
 *  
 *  * Copyright 2019 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2019.10.4
 */

let Switch = function(el, option) {
    let _this = this
    let setoption = {
        cur: 0,
        size:'m',//s,m,l
        name: 'power', //在form表单里的name名称
        start: {
            xm: '关闭',
            color: '#ccc'
        },
        end: {
            xm: '开启',
            color: '#46bd87'
        },
        switchback: function(sel) {}
    }
    let setsize = 's,m,l'
    const myoption = Object.assign(setoption, option)
    let size = myoption.size
    if (setsize.indexOf(size) == -1) {
        size = 'm'
    }
    //建立骨骼
    if (typeof(el) == 'string') {
        let ell = el.split('#')[1]
        el = document.getElementById(ell);
    } else {
        el = el
    }
    let leeSwitch = createdom('div', 'lee-switch,'+size)
    let leeWz = createdom('div', 'lee-wz')
    let leeQuan = createdom('div', 'lee-quan')
    let input = createdom('input', 'input')
    input.type = 'text'
    input.name = myoption.name
    input.value = myoption.cur
    if (myoption.cur > 1) {
        myoption.cur = 1
    }
    if (myoption.cur < 0) {
        myoption.cur = 0
    }
    chuli(myoption.cur)
    appendAll(leeSwitch, [leeWz, leeQuan, input])
    appendAll(el, [leeSwitch])
    //动作
    leeSwitch.onclick = function() {
        if (myoption.cur == 0) {
            myoption.cur = 1
        } else {
            myoption.cur = 0
        }
        chuli(myoption.cur)
    }

    function chuli(cur) {
        if (myoption.cur == 0) {
            leeSwitch.classList.remove('end')
            leeSwitch.classList.add('start')
            leeSwitch.style.color = myoption.start.color
            leeWz.innerText = myoption.start.xm
        } else {
            leeSwitch.classList.remove('start')
            leeSwitch.classList.add('end')
            leeSwitch.style.color = myoption.end.color
            leeWz.innerText = myoption.end.xm
        }
        myoption.switchback.call(_this, myoption.cur)
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