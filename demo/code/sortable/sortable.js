/*
 *  拖动排序插件.
 *  
 *  
 *  * Copyright 2016 (c) liguangfa
 *  * https://github.com/cokucoku/myplugin
 *  * 
 *  
 *  Date: 2016.6.16
 */

var sortable = function mysortable(el) {
    let draging;
    let clonetarget;
    let abs_x, abs_y;
    let tops = [];
    let all = Array.from(el.children)
    all.forEach(function(el) {
        tops.push(el.offsetTop)
    });
    el.addEventListener('mousedown', function(e) {
        draging = e.target;
        if (draging.nodeName === "LI") {
            draging.setAttribute('draggable', true)
        }
    })
    el.addEventListener('dragstart', function(e) {
        draging = e.target;
    })
    el.addEventListener('touchstart', function(e) {
        let target = e.target;
        if (target.nodeName === "LI") {
            clonetarget = target.cloneNode(true)
            let w = target.scrollWidth
            abs_x = e.targetTouches[0].clientX - target.offsetLeft
            abs_y = e.targetTouches[0].clientY - target.offsetTop
            //设置克隆后的物体CSS属性
            clonetarget.style.cssText = "position:fixed;z-index:1000;opacity:.8;width:" + w + "px;left:" + target.offsetLeft + "px;top:" + target.offsetTop + "px"
            el.appendChild(clonetarget)
            all.forEach(function(el) {
                el.classList.remove('ghost')
            });
            target.classList.add('ghost')
        }
    })
    el.addEventListener('dragover', function(e) {
        e.preventDefault()
        let target = e.target;
        if (target.nodeName === "LI" && target !==draging) {
            all.forEach(function(el) {
                el.classList.remove('ghost')
            });
            target.classList.add('ghost')
            //这段一定要放在元素改变位置前 begin
            var targetRect = target.getBoundingClientRect();
            var dragingRect = draging.getBoundingClientRect();
            if (target) {
                if (target.animated) {
                    return;
                }
            }
            //这段一定要放在元素改变位置前 end
            if (index(draging) < index(target)) {
                inAfter(draging, target);
            } else {
                inBefore(draging, target);
            }
            //元素运动
            _animate(dragingRect, draging);
            _animate(targetRect, target);
        }
    })
    el.addEventListener('touchmove', function(e) {
        e.preventDefault()
        let target = e.target;
        if (target.nodeName === "LI") {
            let w = target.scrollWidth
            let halfh = target.offsetHeight / 2
            let left = e.targetTouches[0].clientX - abs_x
            let top = e.targetTouches[0].clientY - abs_y
            clonetarget.style.cssText = "position:fixed;z-index:1000;opacity:.8;width:" + w + "px;left:" + left + "px;top:" + top + "px"

            //根据位置来insert
            //console.log(tops,top)
            let rs = tops.filter(function(el, index) {
                return top + halfh > el
            });
            //console.log(tops,rs)
            let all = Array.from(el.children)
            var targetRect = target.getBoundingClientRect();
            var dragingRect;
            if (rs.length > 0) {
               dragingRect = all[rs.length-1].getBoundingClientRect();
            } else {
               dragingRect = all[0].getBoundingClientRect();
            }
            if (target) {
                if (target.animated) {
                    return;
                }
            }
            if (rs.length > 0) {
                inAfter(target, all[rs.length - 1]);
            } else {
                inBefore(target, all[0]);
            }
            //元素运动            
            if (rs.length > 0) {
               _animate(dragingRect, all[rs.length-1]);
            } else {
               _animate(dragingRect, all[0]);
            }
            _animate(targetRect, target);

        }
    })
    el.addEventListener('dragend', function(e) {
        let target = e.target;
        if (target.nodeName === "LI") {
            //target.setAttribute('draggable', false)
            target.removeAttribute('draggable')
            target.classList.remove('ghost')
        }
    })
    el.addEventListener('touchend', function(e) {
        let target = e.target;
        if (target.nodeName === "LI") {
            target.removeAttribute('draggable')
            target.classList.remove('ghost')
            el.removeChild(clonetarget)
        }
    })

    function index(target) {
        let xh = 0;
        let all = target.parentNode.children
        all = Array.from(all)
        xh = all.indexOf(target)
        return xh;
    }

    function inAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        parent.insertBefore(newElement, targetElement.nextElementSibling);
    }

    function inBefore(newElement, targetElement) {
        var parent = targetElement.parentNode;
        parent.insertBefore(newElement, targetElement);
    }

    function _animate(prevRect, target) {
        var ms = 300;
        var currentRect = target.getBoundingClientRect();
        //我们先让元素立即回复之前拖动状态（insertAfter了，要先回到初始状态）
        target.style.cssText="transition: none;transform: translate3D(" + (prevRect.left - currentRect.left) + "px," + (prevRect.top - currentRect.top) + "px,0)";
        target.offsetHeight; // 触发重绘
        //回到初始状态后开始变动拖动后位置动画
        target.style.cssText="transition: all " + ms + "ms;transform: translateY(0px)";
        if (target.animated) { //如果元素在运动中，就不执行了
            return
        } else { //否者元素就给他运动属性，然后一段时间后再重新设置为false
            target.animated = true;
            setTimeout(function() {
                target.style.cssText="transition: '';transform: ''";
                target.animated = false;
            }, ms);
        }
    }

}