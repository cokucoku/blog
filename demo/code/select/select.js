/*
 *  select下拉插件.
 *  
 *  
 *  * Copyright 2019 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2019.10.4
 */

let Select = function(el, option) {
    let _this = this
    let setoption = {
        sel: '',
        zindex: 1,
        name: 'select', //在form表单里的name名称
        option: ['黄金糕', '双皮奶', '蚵仔煎', '龙须面', '北京烤鸭'],
        selback: function(sel) {}
    }
    const myoption = Object.assign(setoption, option)
    //建立骨骼
    if (typeof(el) == 'string') {
        let ell = el.split('#')[1]
        el = document.getElementById(ell);
    } else {
        el = el
    }
    let leeSelect = createdom('div', 'lee-select')
    leeSelect.style.zIndex = myoption.zindex
    let leeInput = createdom('div', 'lee-input')
    let leeOption = createdom('div', 'lee-option')
    let input = document.createElement('input')
    input.type = "text"
    input.name = myoption.name
    if (myoption.sel) {
        if (myoption.sel >= myoption.option.length) {
            myoption.sel = myoption.option.length
        }
        input.value = myoption.option[myoption.sel - 1]
        input.placeholder = ''
    } else {
        input.value = ''
        input.placeholder = '请选择'
    }
    let i = createdom('i', 'mhicon,icon-jiantou_down')
    let ul = document.createElement('ul')
    for (let t = 0; t < myoption.option.length; t++) {
        let li = document.createElement('li')
        if(myoption.sel){
            if(myoption.sel-1==t){
                li.classList.add('cur')
            }
        }
        li.innerText = myoption.option[t]
        appendAll(ul, [li])
        li.onclick = function() {
            Array.from(ul.children).map(function(elem) {
                elem.classList.remove('cur')
            })
            this.classList.add('cur')
            input.value = myoption.option[t]
            myoption.selback.call(_this, myoption.option[t])
        }
    }
    appendAll(leeOption, [ul])
    appendAll(leeInput, [input, i])
    appendAll(leeSelect, [leeInput, leeOption])
    appendAll(el, [leeSelect])
    //动作
    let xh = []
    leeSelect.onclick = function(e) {
        let nxh = index(this.parentNode)
        e.stopPropagation()
        let allselect = document.getElementsByClassName('lee-select')
        let allexp = document.getElementsByClassName('exp')
        if (allexp.length >= 1) {
            allexp[0].classList.remove('exp')
            if (xh.includes(nxh)) {
                this.classList.remove('exp')
                xh = []
            } else {
                this.classList.add('exp')
                xh.push(index(this.parentNode))
            }
        } else {
            this.classList.add('exp')
            xh.push(index(this.parentNode))
        }
    }
    document.onclick = function() {
        let allselect = document.getElementsByClassName('lee-select')
        for (let i = 0; i < allselect.length; i++) {
            allselect[i].classList.remove('exp')
        }
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
        array.map(function(elem) {
            where.appendChild(elem)
        })
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