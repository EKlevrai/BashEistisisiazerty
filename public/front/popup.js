 if(typeof document.getElementsByClassName("popup") !='undefined'){
	for(var i=0;i<document.getElementsByClassName("popup").length;i++){
		document.getElementsByClassName("popup")[i].onclick=function() {
			var width  = 575,
				height = 400,
				left   = 400,
				top    = 575,
				url    = this.href,
				opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
			window.open(url, '', opts);
			return false;
		};
	}
}
	