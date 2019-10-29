/*
 *  getcolor插件.
 *  
 *  
 *  * Copyright 2019 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2019.10.4
 */

let Getcolor = function(el) {
    let _this = this

    //建立骨骼
    if (typeof(el) == 'string') {
        let ell = el.split('#')[1]
        el = document.getElementById(ell);
    } else {
        el = el
    }
    let image = new Image()
    image.src = el.src
    image.onload = function() {
        //创建画布
        let c = document.createElement("canvas");
        c.width = this.width
        c.height = this.height
        let ctx = c.getContext("2d");
        ctx.drawImage(el, 0, 0);
        //document.body.appendChild(c)
        let imgData = ctx.getImageData(0, 0, c.width, c.height);
        let ida = imgData.data
        let r = [],
            g = [],
            b = []
        for (var i = 0; i < ida.length; i += 4) {
            r.push(ida[i])
            g.push(ida[i + 1])
            b.push(ida[i + 2])
        }
        let rr = pj(r) * 0.945,
            gg = pj(g) * 1.025,
            bb = pj(b) * 0.98
        document.body.style.cssText = "background-color:rgb(" + rr + "," + gg + "," + bb + ")"

    }
    let bgimg = document.createElement('div')
    bgimg.className = "bgimg"
    bgimg.style.cssText = "background-image:url(" + el.src + ")"
    let bgmark = document.createElement('div')
    bgmark.className = "bgmark"
    if (document.getElementsByClassName('bgimg').length > 0) {
        document.body.removeChild(document.getElementsByClassName('bgimg')[0])
        document.body.removeChild(document.getElementsByClassName('bgmark')[0])
        document.body.appendChild(bgimg)
        document.body.appendChild(bgmark)
    } else {
        document.body.appendChild(bgimg)
        document.body.appendChild(bgmark)
    }

    //动作
    function pj(array) {
        var rs = []
        array.map(function(elem) {
            if (rs.length == 0) {
                rs.push(array[0])
            } else {
                rs[0] = rs[0] + elem
            }
        })
        return Math.floor(rs[0] / array.length)
    }



}
//background-color: rgb(223, 199, 150);