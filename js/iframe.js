var ifm = document.querySelectorAll("iframe");
if (ifm != null) {
    for (var i = 0; i < ifm.length; i++) {
        ifm[i].addEventListener('load', function() {
            var subWeb = document.frames ? document.frames.document : this.contentDocument;
            if (subWeb != null) {
                //ifm.style.height = 'auto'; //关键这一句，先取消掉之前iframe设置的高度
                this.style.height = (subWeb.body.scrollHeight + 4) + 'px';
                this.style.border = "solid 2px #ddd"
                this.style.backgroundColor = "#fcfcfc"
            }
        })

    }
}