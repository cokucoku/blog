/*
 *  翻页插件.
 *  
 *  
 *  * Copyright 2019 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2019.10.4
 */

let Page = function(el, option) {
    let _this = this
    let setoption = {
        curpage: 1,
        totalpage: 10, //总页数,
        theme: 'black', //red,yellow,black,green,
        size: 'm', //s,m,l
        layout: 'pager', //total,prevnext,pager,jumpr
        clickback: function(page) {

        }
    }
    let settheme = 'red,yellow,black,green,blue'
    let setsize = 's,m,l'
    const myoption = Object.assign(setoption, option)
    let theme = myoption.theme
    let size = myoption.size
    let layout = myoption.layout.replace(/\s+/g,'')
    if (settheme.indexOf(theme) == -1) {
        theme = 'blue'
    }
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

    this.curpage = myoption.curpage //初始当前页
    let totalpage = myoption.totalpage
    let total = [] //放置變動的分頁效果html
    if (this.curpage <= 1) {
        this.curpage = 1
    }
    if (this.curpage >= totalpage) {
        this.curpage = totalpage
    }


    const page = document.createElement('div')

    //统计页数块
    const tjpage = document.createElement('i')
    page.classList.add('LeePage', theme, size)
    tjpage.innerText = `总共${totalpage}页`
    //首页末页上页下页块
    const pageindex = document.createElement('span')
    const pageprev = document.createElement('span')
    const pagenext = document.createElement('span')
    const pagelast = document.createElement('span')
    pageindex.innerText = '首'
    pageprev.innerText = '<'
    pagenext.innerText = '>'
    pagelast.innerText = '末'
    //转到页码块
    const gopage = document.createElement('div')
    const goinput = document.createElement('input')
    const zdspan = document.createElement('i')
    const ye = document.createElement('i')
    zdspan.innerText = "转到"
    ye.innerText = "页"
    gopage.classList.add('gopage')

    var uiwhich = layout.split(',')
    if (uiwhich.indexOf('total') > -1) {
        page.appendChild(tjpage)
    }

    if (uiwhich.indexOf('prevnext') > -1) {
        page.appendChild(pageindex)
        page.appendChild(pageprev)
        page.appendChild(pagenext)
        page.appendChild(pagelast)
    }

    if (uiwhich.indexOf('jumpr') > -1) {
        gopage.appendChild(zdspan)
        gopage.appendChild(goinput)
        gopage.appendChild(ye)
        page.appendChild(gopage)
    }



    el.appendChild(page)

    document.body.onload = function() {
        _this.go(_this.curpage)
    }
    //各动作
    pagenext.onclick = function() {
        _this.curpage++
        if (_this.curpage >= totalpage) {
            _this.curpage = totalpage
        }
        _this.go(_this.curpage)
    }
    pagelast.onclick = function() {
        _this.curpage = totalpage
        _this.go(_this.curpage)
    }
    pageindex.onclick = function() {
        _this.curpage = 1
        _this.go(_this.curpage)
    }
    pageprev.onclick = function() {
        _this.curpage--
        if (_this.curpage <= 1) {
            _this.curpage = 1
        }
        _this.go(_this.curpage)
    }
    goinput.onchange = function(e) {
        _this.curpage = Number(e.target.value)
        if (_this.curpage >= totalpage) {
            _this.curpage = totalpage
        }
        if (_this.curpage <= 1) {
            _this.curpage = 1
        }
        _this.go(_this.curpage)
    }
    //函数
    this.go = function(curpage) {
        //存在处理的页码就先删除再添加
        if (total.length > 0) {
            total.map(function(item) {
                page.removeChild(item)
            });
            if (uiwhich.indexOf('pager') > -1) {
                this.clpage(curpage)
            }
            //改变其它相关
            myoption.clickback.call(this, curpage);
            this.chuliui(curpage)
            goinput.value = curpage
        } else {
            if (uiwhich.indexOf('pager') > -1) {
                this.clpage(curpage)
            }
            //改变其它相关
            myoption.clickback.call(this, curpage);
            this.chuliui(curpage)
            goinput.value = this.curpage
        }
    }
    this.chuliui = function(curpage) {
        if (curpage == 1) {
            pageindex.classList.add('disabled')
            pageprev.classList.add('disabled')
        } else {
            pageindex.classList.remove('disabled')
            pageprev.classList.remove('disabled')
        }
        if (curpage == totalpage) {
            pagenext.classList.add('disabled')
            pagelast.classList.add('disabled')
        } else {
            pagenext.classList.remove('disabled')
            pagelast.classList.remove('disabled')
        }
    }
    this.clpage = function(curpage) {
        total = []
        let moreprev = document.createElement('span')
        moreprev.classList.add('moreprev')
        //moreprev.innerText = '...'

        let morenext = document.createElement('span')
        morenext.classList.add('morenext')
        //morenext.innerText = '...'

        let fnum = document.createElement('span')
        fnum.classList.add('num')
        fnum.innerText = 1
        let lastnum = document.createElement('span')
        lastnum.classList.add('num')
        lastnum.innerText = totalpage
        //处理页码
        let pcount = 7 //超过这个数页面...
        let pergo = pcount - 2
        let hpc = Math.ceil(pcount / 2)
        if (curpage <= hpc) {
            for (let i = 1; i < pcount; i++) {
                let num = document.createElement('span')
                num.classList.add('num')
                num.innerText = i
                total.push(num)
            }
            total.push(morenext)
            total.push(lastnum)
        } else if (curpage > totalpage - hpc) {
            total.push(fnum)
            total.push(moreprev)
            for (let i = totalpage - pergo; i <= totalpage; i++) {
                let num = document.createElement('span')
                num.classList.add('num')
                num.innerText = i
                total.push(num)
            }

        } else {
            total.push(fnum)
            total.push(moreprev)
            for (let i = curpage - (pcount - hpc - 1); i <= curpage + (pcount - hpc - 1); i++) {
                let num = document.createElement('span')
                num.classList.add('num')
                num.innerText = i
                total.push(num)
            }
            total.push(morenext)
            total.push(lastnum)
        }
        //处理页码end
        total.map(function(item) {
            // 分页加入到界面中
            if (uiwhich.indexOf('pager') > -1) {
                if (uiwhich.indexOf('prevnext') > -1) {
                    page.insertBefore(item, pagenext)
                } else {
                    if (uiwhich.indexOf('jumpr') > -1) {
                        page.insertBefore(item, gopage)
                    } else {
                        page.appendChild(item)
                    }
                }
            }
            item.onclick = function() {
                var iclass = item.classList[0]
                if (item.innerText == '') {
                    if (iclass == 'moreprev') {
                        curpage -= pergo
                        if (curpage <= 1) {
                            curpage = 1
                        }
                    } else {
                        curpage += pergo
                        if (curpage >= totalpage) {
                            curpage = totalpage
                        }
                    }
                    _this.go(curpage)
                } else {
                    curpage = Number(item.innerText)
                    _this.go(curpage)
                }
                _this.curpage = curpage
            }
            item.onmouseenter = function() {
                if (item.innerText == '') {
                    item.classList.add('ico')
                }
            }
            item.onmouseleave = function() {
                if (item.innerText == '') {
                    item.classList.remove('ico')
                }
            }
        });
        //当前页加亮
        let spans = Array.from(page.getElementsByClassName('num'))
        if (spans.length > 0) {
            var fi = spans.filter(function(el) {
                return el.innerText == curpage;
            });
            spans.map(function(item) {
                item.classList.remove('cur')
            });
            fi[0].classList.add('cur')
        }
    }
}