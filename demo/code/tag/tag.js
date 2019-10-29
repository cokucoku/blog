/*
 *  tag标签插件.
 *  
 *  
 *  * Copyright 2019 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2019.10.4
 */

let Tag = function(el, option) {
    let _this = this
    let setoption = {
        tags: ['标签1'],
        color: '#46bd87',
        size: 'm',
    }
    let setsize = 's,m,l'
    const myoption = Object.assign(setoption, option)
    let size = myoption.size.toLowerCase()
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
    let leeTags = createdom('div', 'lee-tags,' + size)
    leeTags.style.color = myoption.color
    chuli(myoption.tags)
    appendAll(el, [leeTags])
    //动作
    //渲染列表
    function chuli(array) {
        if (leeTags.children.length > 0) {
            let children = leeTags.children
            let achildren = Array.from(children)
            achildren.map(function(elem) {
                leeTags.removeChild(elem)
            })
            add(array)
        } else {
            add(array)
        }
    }

    function add(array) {
        for (let t = 0; t < array.length; t++) {
            let leeTag = createdom('div', 'lee-tag')
            let bgcolor = bg(myoption.color)
            let borcolor = bor(myoption.color)
            leeTag.style.borderColor = borcolor
            leeTag.style.backgroundColor = bgcolor
            let i = createdom('i', 'mhicon,icon-error')
            leeTag.innerText = myoption.tags[t]
            appendAll(leeTag, [i])
            appendAll(leeTags, [leeTag])
            i.onclick = function() {
                let xh = index(this.parentNode)
                let children = leeTags.children
                children[xh].style.cssText = "transform: scale(0);position:relative"
                setTimeout(function() {
                    array.splice(xh, 1)
                    chuli(array)
                }, 200)
            }
        }
    }
    //颜色转换
    function bg(color) {
        let R = torgb(color).R
        let G = torgb(color).G
        let B = torgb(color).B
        return 'rgba(' + R + ',' + G + ',' + B + ',.1)'
    }

    function bor(color) {
        let R = torgb(color).R
        let G = torgb(color).G
        let B = torgb(color).B
        return 'rgba(' + R + ',' + G + ',' + B + ',.2)'
    }

    function torgb(color) {
        let colors = color.split('#')[1]
        let r = colors.slice(0, 2)
        let r1 = r.slice(0, 1)
        let r2 = r.slice(1, 2)
        let g = colors.slice(2, 4)
        let g1 = g.slice(0, 1)
        let g2 = g.slice(1, 2)
        let b = colors.slice(4, 6)
        let b1 = b.slice(0, 1)
        let b2 = b.slice(1, 2)
        let R = Number(tonum(r1) * 16) + Number(tonum(r2))
        let G = Number(tonum(g1) * 16) + Number(tonum(g2))
        let B = Number(tonum(b1) * 16) + Number(tonum(b2))
        return { R: R, G: G, B: B }
    }

    function tonum(str) {
        switch (str) {
            case 'a':
            case 'A':
                str = 10
                break;
            case 'b':
            case 'B':
                str = 11
                break;
            case 'c':
            case 'C':
                str = 12
                break;
            case 'd':
            case 'D':
                str = 13
                break;
            case 'e':
            case 'E':
                str = 14
                break;
            case 'f':
            case 'F':
                str = 15
                break;
        }
        return str
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