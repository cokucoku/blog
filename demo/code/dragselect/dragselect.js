/*
 *	jQuery dragselect.
 *	
 *	
 *	* Copyright 2016 (c) liguangfa
 *	* https://github.com/cokucoku/myplugin
 *	* 
 *	
 *	Date: 2016.6.16
 */
;
(function($) {
	$.fn.dragselect = function(options) {
		var $ele = this;
		defaulst = {
			num: 5,
			style: "#000"
		};
		myopt = $.extend({}, defaulst, options);
		//生成tandiv,mt_mark,
		var mt_mask = "";
		var tandiv = "";
		mt_mask = "<div class='mt_mask'></div>";
		okdiv = "<div class='okdiv'>确定</div>";
		tandiv += "<div class='tandiv'>";
		tandiv += okdiv;
		tandiv += "<div class='myk'><div class='tit'>年</div><ul></ul><div class='cus'></div></div>";
		tandiv += "<div class='myk'><div class='tit'>月</div><ul></ul><div class='cus'></div></div>";
		tandiv += "<div class='myk'><div class='tit'>日</div><ul></ul><div class='cus'></div></div>";
		tandiv += "</div>";
		$("body").append(mt_mask)
		$("body").append(tandiv);

		//listt();////生成列表    
		var result = ""; //存储选择时间信息
		this.bind('click', function(event) {
			$(".tandiv").addClass("show");
			$(".mt_mask").addClass("show");
			$(".okdiv").show();
			listt(); ////生成列表    	
		});
		$(".mt_mask").bind("click", function() {
			$(".tandiv").removeClass("show");
			$(".mt_mask").removeClass("show");
			$(".okdiv").hide(200);
			getresult();
		});
		$(".okdiv").bind("click", function() {
			$(".tandiv").removeClass("show");
			$(".mt_mask").removeClass("show");
			$(".okdiv").hide(200);
			getresult();
		});
		//时间重置与提交result
		function getresult() {
			result = $(".myk").eq(0).find("li[class=on]").html() + "-" + $(".myk").eq(1).find("li[class=on]").html() + "-" + $(".myk").eq(2).find("li[class=on]").html();
			$($ele).find("input").val(result);

			// body...
		}
        $(".myk").bind('mousedown;', function(event) {
        	event.preventDefault();
        	/* Act on the event */
        });
		//生成列表
		function listt() {
			var bgyear = 1980;
			var bgmonth = 1;
			var bgday = 1;
			var j = 12;
			var k = 30;
			var yearlist = "";
			var monlist = "";
			var daylist = "";
			//今天时间
			var date = new Date();
			var myyear = date.getFullYear();
			var mymonth = date.getMonth() + 1;
			var myday = date.getDate();
			for (i = 0; i < 50; i++) {
				if (bgyear == myyear) {
					yearlist += "<li class='on' dataValue=" + bgyear + ">" + bgyear + "</li>";
				} else {
					yearlist += "<li dataValue=" + bgyear + ">" + bgyear + "</li>";
				}

				bgyear++;
			}
			for (i = 0; i < j; i++) {
				if (bgmonth == mymonth) {
					monlist += "<li class='on' dataValue=" + bgmonth + ">" + bgmonth + "</li>";
				} else {
					monlist += "<li dataValue=" + bgmonth + ">" + bgmonth + "</li>";
				}
				bgmonth++;
			}
			for (i = 0; i < k; i++) {
				if (bgday == myday) {
					daylist += "<li class='on' dataValue=" + bgday + ">" + bgday + "</li>";
				} else {
					daylist += "<li dataValue=" + bgday + ">" + bgday + "</li>";
				}
				bgday++;
			}
			$(".myk").eq(0).find("ul").html(yearlist); //.find("li[dataValue="+myyear+"]").addClass('on');
			$(".myk").eq(1).find("ul").html(monlist); //.find("li[dataValue="+mymonth+"]").addClass('on');
			$(".myk").eq(2).find("ul").html(daylist); //.find("li[dataValue="+myday+"]").addClass('on');
			//负责皮肤
			$(".tandiv .okdiv").css({
				"background": myopt.style
			});
			$(".myk").find("li[class=on]").css({
				"color": myopt.style
			});
			$(".myk").find(".tit").css({
				"color": myopt.style
			});
			var tops = parseInt((myopt.num) / 2) + 1;
			var topsh = tops * 35;
			$(".myk").find(".cus").css({
				top: topsh
			});
			var num = myopt.num + 1;
			var lihei = $('.myk li').height();
			var maxhei = num * lihei;
			$('.myk').css({
				"height": maxhei,
				"overflow": "hidden"
			});
			$('.myk ul').css({
				// "transform": "translateY(0)",
				//"height": maxhei - 35

			});
			var posy="";
			var lastxh;
		    var lastposy;		  
			//滑动，拖动选择动作开始			
			$('.myk ul').mousedown(function(event) {
				var $ele=this;
				var maxnum=$($ele).find('li').size();//myopt.num;
				var maxpos=-(maxnum-tops)*35;
				var isMove = true;
				var $ele = this;
				var ttop = parseInt($($ele).css('top'));
				var abs_y = event.pageY; // - $($ele).offset().top;
				event.preventDefault();
				$(document).mousemove(function(event) {
					if (isMove) {						
						var obj = $($ele);
						var movy = event.pageY - abs_y;
						posy = ttop + movy;
						// if(posy>=0){
						// 	posy=0;							
						// }else if(posy<=maxpos){
						// 	posy=maxpos;
						// }else{

						// }
						console.log(posy);
						obj.animate({
							'top': posy
						}, 1);
						
					}
				}).mouseup(
					function() {
						isMove = false;

					});
			});
			$('.myk ul').mouseup(function(event) {
				var $ele=this;
				var maxnum=$($ele).find('li').size();//myopt.num;
				var maxpos=-(maxnum-tops)*35;				
                //console.log(maxpos);
				if(posy>=0){
					lastposy=0;
				}else if(posy<=maxpos){
                    lastposy=maxpos;
				}else{
					posy=posy;
					if (posy % 35 == 0) {
						posy = posy;					
					} else {						
						if ((Math.abs(posy) % 35) > 12) {
							lastxh = (parseInt(posy / 35)) - 1;
							lastposy = lastxh * 35
						} else {
							lastxh = (parseInt(posy / 35));
							lastposy = lastxh * 35
						}					
					}
				}				
                $($ele).animate({
						'top': lastposy
					},100,function () {
						//"top": (tops - yindex - 1) * 35
						var whichon;
						whichon=tops-1-(lastposy/35);
						//console.log(whichon);						
						$($ele).find("li").eq(whichon).addClass('on').css({"color": myopt.style});
						$($ele).find("li").eq(whichon).siblings().removeClass('on').removeAttr('style');
				});
				

				
			});
      //       $('.myk ul').mouseleave(function(event){     
      //               return false;       	
		    //          console.log(posy);  
		    //          if (posy % 35 == 0) {
						// 	posy = posy;					
						// } else {						
						// 	if ((Math.abs(posy) % 35) > 12) {
						// 		lastxh = (parseInt(posy / 35)) - 1;
						// 		lastposy = lastxh * 35
						// 	} else {
						// 		lastxh = (parseInt(posy / 35));
						// 		lastposy = lastxh * 35
						// 	}					
						// }
		    //          $(this).animate({
						// 	'top': lastposy
						// });
	             
	     //    });
			//滑动，拖动选择动作结束
			// $(".myk li").bind('click2', function(event) {
			// 	var $ele = this;
			// 	var tindex = $($ele).index() + 1;
			// 	$($ele).siblings().removeClass('on');
			// 	$($ele).addClass('on');
			// 	$($ele).parents("ul").animate({
			// 		"top": (tops - tindex) * 35
			// 	});
			// 	$($ele).css({
			// 		"color": myopt.style
			// 	});
			// 	$($ele).siblings('li').removeAttr('style');
			// 	/* Act on the event */
			// });		
			var yindex = $(".myk").eq(0).find("li[class=on]").index();
			var mindex = $(".myk").eq(1).find("li[class=on]").index();
			var dindex = $(".myk").eq(2).find("li[class=on]").index();
			$(".myk").eq(0).find("ul").animate({
				"top": (tops - yindex - 1) * 35
			});
			$(".myk").eq(1).find('ul').animate({
				"top": (tops - mindex - 1) * 35
			});
			$(".myk").eq(2).find('ul').animate({
				"top": (tops - dindex - 1) * 35
			});
		}
		return this;
	}
})(jQuery);