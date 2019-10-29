/*
 *  微信朋友圈图片效果插件.
 *  
 *  
 *  * Copyright 2019 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2019.10.4
 */

let ImgEffect = function(el, option) {
    let _this = this
    let setoption = {
        style: 1 //1，普通图片，2广告图
    }
    const myoption = Object.assign(setoption, option)

    //建立骨骼
    let sw = window.innerWidth
    let sh = window.innerHeight
    let ell = el.split('.')[1]
    let ells = Array.from(document.getElementsByClassName(ell))
    if (ells.length > 0) {
        ells.map(function(elm) {
            var imgs = Array.from(elm.getElementsByTagName('img'))
            if (imgs.length > 0) {
                imgs.map(function(item, xh) {
                    var nw, nh
                    if (imgs.length > 1) {
                        nw = item.parentNode.offsetWidth
                        nh = item.parentNode.offsetHeight
                        item.style.cssText = "width:" + nw + "px;height:" + nh + "px;"
                    } else {
                        getImgInfo(item, function(info) {
                            nw=info.nw
                            nh=info.nh
                            item.style.cssText = "width:" + info.nw + "px;height:" + info.nh + "px;"
                            item.parentNode.style.cssText = "width:" + info.nw + "px;height:" + info.nh + "px;"
                        })
                    }
                    item.onclick = function() {
                        _this.xh = xh
                        var sct=window.scrollY
                        if (myoption.style == 1) {
                            moveImgInfo(item, function(info) {
                                item.style.cssText = "max-height:inherit;transition: all .3s;object-fit: inherit;width:auto;height:auto;z-index:2;width:" + info.nw + "px;margin-left:" + info.ml + "px;margin-top:" + (info.mt+sct) + "px"
                                setTimeout(function() {
                                    item.style.opacity = 0
                                    item.style.zIndex = 1
                                }, 400)
                            })
                            //畫廊
                            var gallery = document.createElement('div')
                            gallery.id = 'gallery'
                            var dot = document.createElement('ul')
                            dot.id = 'dot'
                            var pics = document.createElement('ul')
                            pics.id = 'pics'
                            pics.style.width = sw * imgs.length + 'px'
                            pics.style.marginLeft = -(sw * _this.xh) + 'px'
                            var dotli = []
                            var picsli = []
                            for (var i = 0; i < imgs.length; i++) {
                                var dli = document.createElement('li')
                                var pli = document.createElement('li')
                                var img = document.createElement('img')
                                img.src = imgs[i].src
                                dotli.push(dli)
                                pli.appendChild(img)
                                picsli.push(pli)
                            }
                            Array.from(dotli).map(function(el, inx) {
                                if (_this.xh == inx) {
                                    el.classList.add('cur')
                                }
                                dot.appendChild(el)
                            })

                            Array.from(picsli).map(function(el) {
                                pics.appendChild(el)
                            })

                            gallery.appendChild(dot)
                            setTimeout(function() {
                                gallery.appendChild(pics) //0.3秒后才出现可以滑动的图片代替
                            }, 300)

                            document.body.appendChild(gallery)
                            setTimeout(function() {
                                gallery.style.opacity = 1
                            }, 1)
                            //動作
                            var old_x, new_x, ox, nx;
                            var down = false
                            gallery.addEventListener('click', function(e) {
                                gallery.style.opacity = 0
                                var st = setTimeout(function() {
                                    document.body.removeChild(gallery)
                                }, 300)
                                //让原来的ITEM开始从大变小变化
                                //這邊圖片的position由於從FIXED變成absolute,這個時候就要考慮
                                //滾動條，所以圖片的margin-top要加上滾動條的高度
                                var sct=window.scrollY
                                var curimg = imgs[_this.xh]
                                moveImgInfo(curimg, function(info) {
                                    curimg.style.cssText = "max-height:inherit;object-fit: inherit;width:auto;height:auto;z-index:2;width:" + info.nw + "px;margin-left:" + info.ml + "px;margin-top:" + (info.mt+sct) + "px"
                                    setTimeout(function() {
                                        curimg.style.cssText = "z-index:2;transition: all .5s;width:" + nw + "px;height:" + nh + "px"
                                        setTimeout(function() {
                                            curimg.style.cssText = "z-index:1;width:" + nw + "px;height:" + nh + "px"
                                        }, 500)

                                    }, 100)
                                })
                            })
                            gallery.addEventListener('touchstart', function(e) {
                                down = true
                                ox = e.targetTouches[0].clientX * 0.2
                                old_x = e.targetTouches[0].clientX * 0.2 - pics.offsetLeft
                            }, { passive: true })
                            gallery.addEventListener('touchend', function(e) {
                                down = false
                                chuli()
                                nx = 0 //一定要清除，不然NX再次只要点击他还存在（很重要）
                            }, { passive: true })
                            gallery.addEventListener('touchmove', function(e) {
                                if (down) {
                                    nx = e.targetTouches[0].clientX * 0.2 - ox
                                    new_x = e.targetTouches[0].clientX * 0.2 - old_x
                                    pics.style.marginLeft = (new_x) + 'px'
                                }
                            }, { passive: true })

                            gallery.addEventListener('mousedown', function(e) {
                                e.preventDefault()
                                down = true
                                ox = e.pageX * 0.2
                                old_x = e.pageX * 0.2 - pics.offsetLeft
                            })
                            gallery.addEventListener('mouseup', function(e) {
                                down = false
                                chuli()
                                nx = 0 //一定要清除，不然NX再次只要点击他还存在（很重要）
                            })
                            gallery.addEventListener('mousemove', function(e) {
                                e.preventDefault()
                                if (down) {
                                    nx = e.pageX * 0.2 - ox
                                    new_x = e.pageX * 0.2 - old_x
                                    pics.style.marginLeft = (new_x) + 'px'
                                }
                            })

                            function chuli() {
                                if (nx >= 10) {
                                    _this.xh--
                                }
                                if (nx <= -10) {
                                    _this.xh++
                                }
                                if (_this.xh <= 0) {
                                    _this.xh = 0
                                }
                                if (_this.xh >= imgs.length) {
                                    _this.xh = imgs.length - 1
                                }
                                var dotli = Array.from(dot.getElementsByTagName('li'))
                                dotli.map(function(elem, inx) {
                                    elem.classList.remove('cur')
                                    if (inx === _this.xh) {
                                        elem.classList.add('cur')
                                    }
                                })
                                pics.style.marginLeft = -(sw * _this.xh) + 'px'
                                pics.style.transition = 'all .1s'
                                setTimeout(function() {
                                    pics.style.transition = ''
                                }, 100)
                                //改变IMG 的CSSTEXT
                                imgs.map(function(elem, inx) {
                                    elem.style.cssText = "width:" + nw + "px;height:" + nh + "px;"
                                })
                            }
                        }
                    }
                })
            }
        })
    }
    //這個函數是為了只有一個圖片項目的時候圖片信息
    function getImgInfo(item, callback) {
        var image = new Image()
        image.src = item.src
        image.onload = function() {
            var imgInfo = {}
            var bl = this.width / this.height
            if (this.height >= 160) {
                var nh = 160
                var nw = bl * nh
            }
            imgInfo['nw'] = nw
            imgInfo['nh'] = nh
            callback(imgInfo)
        }
    }
    //為了點擊圖片後圖片放大後的圖片需要的信息
    function moveImgInfo(item, callback) {
        var ofl = item.parentNode.offsetLeft
        var oft = item.parentNode.offsetTop
        var image = new Image()
        image.src = item.src
        image.onload = function() {
            var imgInfo = {}
            var bl = this.width / this.height
            var mow //最終展示的圖片寬度
            var ml //最終展示的圖片左邊距離
            if (this.width > sw) {
                mow = sw
                ml = -ofl
            } else {
                mow = this.width
                ml = -(ofl - sw / 2 + this.width / 2)
            }
            var mt = (sh / 2 - oft - mow / bl / 2)
            imgInfo['nw'] = mow
            imgInfo['ml'] = ml
            imgInfo['mt'] = mt
            callback(imgInfo)
        }
    }
}