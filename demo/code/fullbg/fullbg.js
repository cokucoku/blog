/*
 *	jQuery fullbg.
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
	$.fn.fullbg = function(options) {
		defaulst = {};
		myopt = $.extend({}, defaulst, options);
		$this = $(this);
		var oiw = $this.width();
		var oih = $this.height();
		var cw = $(window).width();
		var ch = $(window).height();
		if (oiw / oih < cw / ch) {
			var niw = cw;
			var nih = niw * (oih / oiw);
			$this.css({
				width: niw,
				height: nih,
				top: -((nih - ch) / 2)
			});
		} else {
			var nih = ch;
			var niw = nih * (oiw / oih);
			$this.css({
				width: niw,
				height: nih,
				left: -((niw - cw) / 2)
			});
		}
		$(window).resize(function() {
			var oiw = $this.width();
			var oih = $this.height();
			var cw = $(window).width();
			var ch = $(window).height();
			if (oiw / oih < cw / ch) {
				var niw = cw;
				var nih = niw * (oih / oiw);
				$this.css({
					width: niw,
					height: nih,
					top: -((nih - ch) / 2),
					left: ""
				});
			} else {
				var nih = ch;
				var niw = nih * (oiw / oih);
				$this.css({
					width: niw,
					height: nih,
					left: -((niw - cw) / 2),
					top: ""
				});
			}

		});

		return this;
	}
})(jQuery);