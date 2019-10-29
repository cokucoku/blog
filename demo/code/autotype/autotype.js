/*
 *	jQuery typetext打字机.
 *	
 *	
 *	* Copyright 2016 (c) liguangfa
 *	* https://github.com/cokucoku/myplugin
 *	* 
 *	
 *	Date: 2016.9.1
 */
;
(function($) {
	$.fn.autotype = function(options) {
		var $this = $(this);
		var index=0;
		defaulst = {};
		myopt = $.extend({}, defaulst, options);
		var thehtml=$this.html();
		//console.log(thehtml);
		var timer=setInterval(function () {
			var current = thehtml.substr(index, 1);			
			if(current=="<"){
              //indexOf() 方法返回">"在字符串中首次出现的位置。
				index = thehtml.indexOf('p', index) + 1;
			
			}else{
				index++;
			}		
			if(index>=thehtml.length){
              clearInterval(timer);
			}
			$this.html(thehtml.substring(0,index)+(index & 1 ? '_': ''));

		},100);
		
		return this;
	}
})(jQuery);