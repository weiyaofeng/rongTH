//首页动画轮播
$(function(){slider.init()});
var imgs=[
	{"i":0,"img":"images/index-banner(1).png"},	
	{"i":1,"img":"images/index-banner(2).png"},	
	{"i":2,"img":"images/index-banner(3).png"},	
	{"i":3,"img":"images/index-banner(4).png"}	
];
var slider={
	LIWIDTH:1920,//保存每张图片的宽度
	distance:0,//保存每次移动的总距离
	DURATION:1000,//保存每次移动的总时间
	STEPS:200,//保存每次移动的总步数
	interval:0,//保存每一步的时间
	step:0,//保存每一步的长度
	moved:0,//保存左移的步数
	timer:null,//保存动画的序号
	canAuto:true,//保存能否自动轮播
	WAIT:3000,//保存自动轮播等待时间

	init:function(){
		$('#imgs')[0].style.width=this.LIWIDTH*imgs.length+"px";
		this.updateView();
		this.interval=this.DURATION/this.STEPS;
		var me=this;
		$('#idxs').mouseover(function(e){
			var target=e.target;
			if(target.nodeName=="LI"&&target.className!='hover'){
				var starti=$('#idxs>li.hover').attr('data-num');
				var endi=$(target).attr('data-num');
				me.move(endi-starti);
			}
		});
		$('#banner').hover(function(){
			me.canAuto=false;
		},function(){
			me.canAuto=true;
		});
		this.autoMove();
	},
	autoMove:function(){
		var me=this;
		setTimeout(function(){
			if(me.canAuto){
				me.move(1);
			}
			else{
				me.autoMove();
			}
		},this.WAIT);
	},
	move:function(n){
		if(this.timer!==null){
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			$('#imgs')[0].style.left=0+"px";
		}
		this.distance=this.LIWIDTH*n;
		this.step=this.distance/this.STEPS;
		if(n<0){
			var dels=imgs.splice(imgs.length+n,-n);
			Array.prototype.unshift.apply(imgs,dels);
			$('#imgs')[0].style.left=this.LIWIDTH*n+"px";
			this.updateView();
		}
		this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
	},
	moveStep:function(n){
		var left=parseFloat(getComputedStyle($('#imgs')[0]).left);
		$('#imgs')[0].style.left=left-this.step+"px";
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
		}
		else{
			clearTimeout(this.timer);
			this.moved=0;
			this.timer=null;
			if(n>0){
				var dels=imgs.splice(0,n);
				Array.prototype.push.apply(imgs,dels);
				$('#imgs')[0].style.left=0+"px";
			}
			this.updateView();
			this.autoMove();
		}
	},
	updateView:function(){
		for(var i=0,imgList="",numList="";i<imgs.length;i++){
			imgList+='<li><img src="'+imgs[i].img+'"></li>';
			numList+='<li data-num="'+(i+1)+'"></li>';
			$('#imgs').html(imgList);
			$('#idxs').html(numList);
			$($('#idxs>li')[imgs[0].i]).addClass('hover');
		}
	},
}
//首页底部动画轮播
$(function(){minSlider.init()});
var minImgs=[
	{"i":0,"img":"images/news-3.png"},	
	{"i":1,"img":"images/news-4.png"},	
	{"i":2,"img":"images/news-5.png"},	
	{"i":3,"img":"images/news-6.png"}	
];
var minSlider={
	LIWIDTH:1920,//保存每张图片的宽度
	DURATION:4000,//保存每次移动的总时间
	STEPS:60,//保存总步数
	interval:0,//保存每次移动的时间
	timer:null,//保存动画的序号
	moved:0,
	canAuto:true,//保存能否自动轮播
	WAIT:3000,//每次自动轮播之间的间隔时间

	init:function(){
		$('#news-img')[0].style.width=minImgs.length*this.LIWIDTH+"px";
		this.upDateview();
		this.interval=this.DURATION/this.STEPS;
		var me=this;
		$('#news-idx').mouseover(function(e){
			var target=e.target;
			if(target.nodeName=="LI"&&target.className!="hover"){
				var starti=$('#news-idx>li.hover').attr('data-minNum');
				var endi=$(target).attr('data-minNum');
				me.move(endi-starti);
			}
		});
		$('#news-img-auto').hover(function(){me.canAuto=false},function(){me.canAuto=true});
		this.moveAuto();
	},
	moveAuto:function(){
		var me=this;
		setTimeout(function(){
			if(me.canAuto){
				me.move(1);
			}
			else{
				me.moveAuto();
			}
		},this.WAIT)
	},
	move:function(n){
		if(this.timer!=null){
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			$('#news-img')[0].style.opacity=1;
		}
		this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
	},
	moveStep:function(n){
		var opa=parseFloat(getComputedStyle($('#news-img')[0]).opacity);
		$('#news-img')[0].style.opacity=opa-0.05;
		this.moved++;
		if(this.moved<=18){
			this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
		}
		else{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			if(n>0){
				var dels=minImgs.splice(0,n);
				Array.prototype.push.apply(minImgs,dels);
			}
			else{
				var dels=minImgs.splice(minImgs.length+n,-n);
				Array.prototype.unshift.apply(minImgs,dels);
			}
			this.upDateview();
			$('#news-img')[0].style.opacity=0;
			this.tmoveStep();
			
		}

	},
	tmoveStep:function(n){
		var opa=parseFloat(getComputedStyle($('#news-img')[0]).opacity);
		$('#news-img')[0].style.opacity=opa+0.05;
		this.moved++;
		if(this.moved<=18){
			this.timer=setTimeout(this.tmoveStep.bind(this,n),this.interval);
		}
		else{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			this.moveAuto();
		}
	},
	upDateview:function(){
		for(var i=0,imgList="",numList="";i<minImgs.length;i++){
			imgList+='<li><img src="'+minImgs[i].img+'"></li>';
			numList+='<li data-minNum="'+(i+1)+'"></li>';
		}
		$('#news-img').html(imgList);
		$('#news-idx').html(numList);
		$($('#news-idx>li')[minImgs[0].i]).addClass('hover');
	},
}


//首页倒计时
$(function(){
	cacl();
	setInterval(cacl,1000);
})
var endDate=new Date();
endDate.setMinutes(endDate.getMinutes()+5);
function cacl(){
	var nowDate=new Date();
	var s=parseInt((endDate-nowDate)/1000);
	if(s>0){
		var h=parseInt(s/3600);
		h<10&&(h="0"+h);
		var m=parseInt(s%3600/60);
		m<10&&(m="0"+m);
		var s=parseInt(s%60);
		s<10&&(s="0"+s);
		$('#count-down').html(h+":"+m+":"+s);
		$('#count-down1').html(h+":"+m+":"+s);
	}
	else{
		$("#time-down").removeClass('prepare');
		$("#time-down").addClass('purchase');
		$("#time-down>.right>p").empty();
		$("#time-down>.right>p").removeClass('circle-times');
		$("#time-down>.right>p").addClass('circle-img');
		$("#time-down1").removeClass('prepare');
		$("#time-down1").addClass('purchase');
		$("#time-down1>.right>p").empty();
		$("#time-down1>.right>p").removeClass('circle-times');
		$("#time-down1>.right>p").addClass('circle-img');
	}
}
//侧边栏
$('#foot-aside').hover(function(){$(this).addClass('hover');},function(){$(this).removeClass('hover');})


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//关于我们页面
$('#link-main').delegate('[data-abus="abus"]','click',function(e){
	e.preventDefault();
	$(this).parent().addClass('abus-hover').siblings('.abus-hover').removeClass();
	var id=$(this).attr('href');
	$(id).addClass('hover').siblings('.hover').removeClass('hover');
	$("#abus-article-inner").html($(this).html());
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//登陆注册页面
$('#link-main').delegate('[data-regi="register-toggle"]','click',function(e){
	e.preventDefault();
	$(this).addClass('hover').parent().siblings().children().removeClass();
	var id=$(this).attr('href');
	$(id).addClass('hover').siblings('.hover').removeClass('hover');
})
$('#link-main').delegate('[data-register="register-dl"]','click',function(e){
	e.preventDefault();
	$(this).parent().parent().removeClass('hover').next().addClass('hover');
	$('#register>.register-right>.register-right-head>li:first-child>a').removeClass('hover');
	$('#register>.register-right>.register-right-head>li:first-child+li>a').addClass('hover');
})
$('#link-main').delegate('[data-register="register-zc"]','click',function(e){
	e.preventDefault();
	$(this).parent().parent().removeClass('hover').prev().addClass('hover');
	$('#register>.register-right>.register-right-head>li:first-child>a').addClass('hover');
	$('#register>.register-right>.register-right-head>li:first-child+li>a').removeClass('hover');
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//引入页面
$('[data-ausPage="aus"]').click(function(e){
	e.preventDefault();
	$('#main').addClass('main-hidden');
	var hname=$(this).attr('href');
	$('#link-main').html('');
	$('#link-main').load(hname+'.html');
	$('nav>.nav-all>ul>li.on').removeClass('on');
})

$('[data-linkPage="link-page"]').click(function(e){
	e.preventDefault();
	$(this).parent().addClass('on').siblings('.on').removeClass('on');
	$('#link-main').html('');
	var hname=$(this).attr('href');
	if(hname=='index'){
		$('#main').removeClass('main-hidden');
		if($('header>div>ul>li:first-child+li+li>a').text()!="注册"){
			$('#banner-input-hid').addClass('main-hidden');
		}
		else{
			$('#banner-input-hid').removeClass('main-hidden');
		}
	}
	else if(hname=='myCount'){
		if($('header>div>ul>li:first-child+li+li>a').text()=="注册"){
			$('#main').addClass('main-hidden');
			$('#link-main').load('input.html',function(){
				registerSlider.init();
				code();
				$("#change-code").click(function(){code();$(this).next().html('');});
			});
			$(this).parent().removeClass('on');
		}
		else{
			$('#main').addClass('main-hidden');
			$('#link-main').load(hname+'.html',function(){
				$.get('data/count-state.php',function(data){
					//console.log("开始处理");
					//console.log(data);
					drawBuyState(data);
				})
				myCountDetails();
			});
		}
	}
	else{
		$('#main').addClass('main-hidden');
		$('#link-main').load(hname+'.html');
	}
})

$('[data-nusPage="nuser"]').click(function(e){
	e.preventDefault();
	$('#main').addClass('main-hidden');
	var hname=$(this).attr('href');
	$('#link-main').html('');
	$('#link-main').load(hname+'.html');
	$('nav>.nav-all>ul>li.on').removeClass('on');
	$('nav>.nav-all>ul>li:first-child+li+li').addClass('on');
});

$('[data-input="inputPage"]').click(function(e){
	e.preventDefault();
	$('#main').addClass('main-hidden');
	$('#link-main').html('');
	var text=$(this).text();
	$('#link-main').load('input.html',function(){
		str='';
		if(text=="登录"){
			$('#register .register-right-head>li:first-child>a').addClass('hover');
			$('#register .register-right-head>li:first-child+li>a').removeClass('hover');
			$('#register .register-right-dl').addClass('hover');
			$('#register .register-right-zc').removeClass('hover');
		}
		else if(text=="安全退出"){
			$('#user-out>a').text('登录');
			$('#user-phone').html('<a href="" data-input="inputPage">注册</a>');
		}
		registerSlider.init();
		code();
		$("#change-code").click(function(){
			str='';
			code();
			//console.log($('#registe-dl-veri input+input').val());
			$(this).next().html('');
		});
	});
	$('nav>.nav-all>ul>li.on').removeClass('on');
})
var registerImgs=[
	{"i":0,"img":"images/input-img-1.png"},	
	{"i":1,"img":"images/input-img-3.png"},	
	{"i":2,"img":"images/input-img-4.png"},	
	{"i":3,"img":"images/input-img-5.png"},	
	{"i":4,"img":"images/input-img-6.png"}	
];
var registerSlider={
	LIWIDTH:680,
	DURATION:4000,
	STEPS:60,
	interval:0,
	timer:null,
	moved:0,
	canAuto:true,
	WAIT:3000,
		
	init:function(){
		$('#register_imgs')[0].style.width=this.LIWIDTH*registerImgs.length+"px";
		this.updataview();
		this.interval=this.DURATION/this.STEPS;
		var me=this;
		$('#register_idexs').mouseover(function(e){
			var target=e.target;
			if(target.nodeName=='LI'&&target.className!='hover'){
				var starti=$('#register_idexs>li.hover').attr('data-regidexs');
				var endi=$(target).attr('data-regidexs');
				me.move(endi-starti);
			}
		});
		$('#register_banner').hover(function(){me.canAuto=false},function(){me.canAuto=true});
		this.moveAuto();
	},
	moveAuto:function(){
		var me=this;
		this.timer=setTimeout(function(){
			if(me.canAuto){
				me.move(1);
			}
			else{
				me.moveAuto();
			}
		},this.WAIT)
	},
	move:function(n){
		if(this.timer!=null){
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			$('#register_imgs')[0].style.opacity=1;
		}
		this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
	},
	moveStep:function(n){
		var opc=parseFloat(getComputedStyle($('#register_imgs')[0]).opacity);
		$('#register_imgs')[0].style.opacity=opc-0.05;
		this.moved++;
		if(this.moved<=19){
			this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
		}
		else{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			if(n>0){
				var dels=registerImgs.splice(0,n);
				Array.prototype.push.apply(registerImgs,dels);
			}
			else{
				var dels=registerImgs.splice(registerImgs.length+n,-n);
				Array.prototype.unshift.apply(registerImgs,dels);
			}
			$('#register_imgs')[0].style.opacity=0.05;
			this.updataview();
			this.tmoveStep(n);
		}
	},
	tmoveStep:function(n){
		var opc=parseFloat(getComputedStyle($('#register_imgs')[0]).opacity);
		$('#register_imgs')[0].style.opacity=opc+0.05;
		this.moved++;
		if(this.moved<=19){
			this.timer=setTimeout(this.tmoveStep.bind(this,n),this.interval);
		}
		else{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			this.moveAuto();
		}
	},
	updataview:function(){
		for(var i=0,imgList="",numList="";i<registerImgs.length;i++){
			imgList+='<li><img src="'+registerImgs[i].img+'"></li>';
			numList+='<li data-regidexs="'+(i+1)+'"></li>';
		}
		$('#register_imgs').html(imgList);
		$('#register_idexs').html(numList);
		$($('#register_idexs>li')[registerImgs[0].i]).addClass('hover');
	},
}
////////canvas走势图
function drawBuyState(data){
	var w=$("#count_canvas").parent().width();
	var h=450;
	var canvas=$("#count_canvas")[0];
	canvas.width=w;
	canvas.height=h;
	var endSpase=30;//最后一个点距离坐标系箭头的距离
	var padding=40;
	var origin={x:padding,y:h-padding};
	var xorigin={x:(canvas.width-padding)*0.8,y:h-padding};
	var yorigin={x:padding,y:padding};

	var ctx=canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(origin.x,origin.y);
	ctx.lineTo(xorigin.x,xorigin.y);
	ctx.lineTo(xorigin.x-25,xorigin.y-15);
	ctx.moveTo(xorigin.x,xorigin.y);
	ctx.lineTo(xorigin.x-25,xorigin.y+15);

	ctx.moveTo(origin.x,origin.y);
	ctx.lineTo(yorigin.x,yorigin.y);
	ctx.lineTo(yorigin.x+15,yorigin.y+25);
	ctx.moveTo(yorigin.x,yorigin.y);
	ctx.lineTo(yorigin.x-15,yorigin.y+25);

	var xWidth=xorigin.x-endSpase;
	var yWidth=origin.y-endSpase;
	var xSpace=xWidth/data.length;
	console.log(data);

	var startX=origin.x;
	for(var i=0;i<data.length;i++){
		ctx.moveTo(startX,origin.y);
		ctx.lineTo(startX,origin.y-10);
		
		var txt=data[i].name;
		ctx.font="16px simHei";
		var txtWidth=ctx.measureText(txt).width;
		ctx.fillText(txt,startX-txtWidth/2,origin.y+20);

		startX+=xSpace;
	}
	
	var maxNum=0;
	for(var i=0;i<data.length;i++){
		if(maxNum<data[i].valueT){
			maxNum=data[i].valueT;
		}
	}
	maxNum=(Math.ceil(maxNum/100))*100;
	var ySpace=yWidth/(maxNum/50+1);
	console.log(ySpace);
	var startY=origin.y;
	var txt=0;
	for(var i=0;i<(maxNum/50+1);i++){
		ctx.moveTo(origin.x,startY);
		ctx.lineTo(origin.x+10,startY);
		ctx.font="16px simHei";
		var txtWidth=ctx.measureText(txt).width;
		ctx.fillText(txt,origin.x-10-txtWidth,startY+5);
		
		txt+=50;
		startY-=ySpace;
	}
	ctx.closePath();
	ctx.stroke();
	
	var yLineO=origin.y-(data[0].valueO/50)*ySpace;
	//console.log(origin.y);
	//console.log(yLineO);
	ctx.beginPath();
	var lineStartX=origin.x;
	ctx.moveTo(lineStartX,yLineO);
	for(var i=0;i<data.length;i++){
		ctx.lineTo(lineStartX,origin.y-(data[i].valueO/50)*ySpace);
		var txt=data[i].valueO;
		var txtWidth=ctx.measureText(txt).width;
		ctx.fillStyle="#305E8D";
		ctx.fillText(txt,lineStartX+1,origin.y-(data[i].valueO/50)*ySpace+16);
		lineStartX+=xSpace;
	}
	ctx.strokeStyle="#305E8D";
	ctx.lineWidth=3;
	ctx.stroke();

	var yLineT=origin.y-(data[0].valueT/50)*ySpace;
	ctx.beginPath();
	var lineStartT=origin.x;
	ctx.moveTo(lineStartT,yLineT);
	for(var i=0;i<data.length;i++){
		ctx.lineTo(lineStartT,origin.y-(data[i].valueT/50)*ySpace);
		var txt=data[i].valueT;
		var txtWidth=ctx.measureText(txt).width;
		ctx.fillStyle="#803C39";
		ctx.fillText(txt,lineStartT+1,origin.y-(data[i].valueT/50)*ySpace+16);
		lineStartT+=xSpace;
	}
	ctx.strokeStyle="#803C39";
	ctx.lineWidth=3;
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xorigin.x+15,xorigin.y-yWidth/2-15);
	ctx.lineTo(xorigin.x+105,xorigin.y-yWidth/2-15);
	ctx.strokeStyle="#803C39";
	ctx.lineWidth=3;
	var text="成交量";
	ctx.font="20px simHei";
	ctx.fillStyle="#803C39";
	ctx.fillText(text,xorigin.x+110,xorigin.y-yWidth/2-10);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xorigin.x+15,xorigin.y-yWidth/2+15);
	ctx.lineTo(xorigin.x+105,xorigin.y-yWidth/2+15);
	ctx.strokeStyle="#305E8D";
	ctx.lineWidth=3;
	var text="预定量";
	ctx.fillStyle="#305E8D";
	ctx.fillText(text,xorigin.x+110,xorigin.y-yWidth/2+20);
	ctx.stroke();
}
/////////验证码生成
var str="";
function code(){
	var rect=document.createElementNS("http://www.w3.org/2000/svg","rect");
	$(rect).attr('x',0);
	$(rect).attr('y',0);
	$(rect).attr('width',90);
	$(rect).attr('height',30);
	$(rect).attr('fill',color(180,255));
	$('#input_svg').append(rect);
	for(var i=0;i<20;i++){
		var x1=size(0,90);
		var x2=size(0,90);
		var y1=size(0,30);
		var y2=size(0,30);
		var line=document.createElementNS("http://www.w3.org/2000/svg","line");
		$(line).attr('x1',x1);
		$(line).attr('y1',y1);
		$(line).attr('x2',x2);
		$(line).attr('y2',y2);
		$(line).attr('stroke',color(100,255));
		$('#input_svg').append(line);
	}
	var db="abcdefghjkmnpqrstwxyzABCDEFGHJKLMNPQRSTWXYZ23456789";
	var xi=5;
	for(var i=0;i<4;i++){
		var txt=document.createElementNS("http://www.w3.org/2000/svg","text");
		var num=text();
		$(txt).html(db[num]);
		str+=db[num];
		$(txt).attr("x",xi+size(-5,5));
		$(txt).attr("y",25+size(-5,5));
		$(txt).attr("font-size",size(15,25)+"px");
		$(txt).attr("fill",color(0,180));
		$(txt).attr("rotate",size(-30,30));
		$('#input_svg').append(txt);
		xi+=18;
	}
	function text(){
		var n=parseInt(Math.random()*(db.length));
		return n;
	}
	$('#registe-dl-veri input+input').val(str);
}
function color(min,max){
	var r=parseInt(Math.random()*(max-min+1)+min);
	var g=parseInt(Math.random()*(max-min+1)+min);
	var b=parseInt(Math.random()*(max-min+1)+min);
	var rgb="rgb("+r+","+g+","+b+")";
	return rgb;
}
function size(min,max){
	var si=parseInt(Math.random()*(max-min+1)+min);
	return si;
}
//注册
$('#link-main').delegate('#registe-zc-phone input','blur',function(){
	//console.log('可以设置');
	var phone=$('#registe-zc-phone input').val();
	//console.log(phone);
	$.post('data/registerZcy.php',{'phone':phone},function(data){
		//console.log("开始处理数据");
		//console.log(data);
		if(data.status>0){
			$('#registe-zc-phone span').html('<s></s><b>该手机号已被注册</b>');
		}
	});
	var reg=/^1[345789]{1}\d{9}$/;
	if(reg.test(phone)){
		$('#registe-zc-phone span').html('<i></i>');
	}
	else{
		$('#registe-zc-phone span').html('<s></s><b>请输入有效手机号</b>');
	}
})
$('#link-main').delegate('#registe-zc-pwds input','blur',function(){
	var pwd=$('#registe-zc-pwd input').val();
	var pwds=$('#registe-zc-pwds input').val();
	if(pwd!==pwds){
		$('#registe-zc-pwds span').html('<s></s><b>两次输入的密码不一致</b>');
		$('#registe-zc-pwds input').val('');
		$('#link-main').delegate('#registe-zc-pwds input','focus',function(){
			$('#registe-zc-pwds span').html('');
		})
	}
	else{
		var reg=/^(\d{8,16}|\w{8,16})$/;
		if(reg.test(pwd)){
			$('#registe-zc-pwd span').html('<i></i>');
		}
		else{
			$('#registe-zc-pwd span').html('<s></s><b>密码不符合要求</b>');
			$('#registe-zc-pwd input').val('');
			$('#registe-zc-pwds input').val('');
			$('#link-main').delegate('#registe-zc-pwd input','focus',function(){
				$('#registe-zc-pwd span').html('密码为至少8位数字或字母下划线组合');
			})
		}
	}
})

$('#link-main').delegate('#registe-zc-check input','click',function(){
	$('#registe-zc-btn input')[0].disabled=(!this.checked);
})
$('#link-main').delegate('#registe-zc-btn input','click',function(){
	var uname=$('#registe-zc-phone span').html();
	var pwd=$('#registe-zc-pwd span').html();
	var pwds=$('#registe-zc-pwds span').html();
	//console.log(uname+"-"+pwd+"-"+pwds);
	if((uname=='<i></i>')&&(pwd=='<i></i>')&&(pwds=='')){
		//console.log("123");
		var phone=$('#registe-zc-phone input').val();
		var pwd=$('#registe-zc-pwd input').val();
		$.post('data/registerZC.php',{'phone':phone,'pwd':pwd},function(data){
			console.log(data);
			$("#index-register-model").addClass('active');
			$("#index-register-model p").html(data.msg+' 恭喜您，注册成功');
		})
	}
})
$("#index-register-model button").click(function(){
	$("#index-register-model").removeClass('active');
	$('#link-main').html('');
	$('#link-main').load('input.html',function(){
		$('.register-right-head>li:first-child>a').addClass('hover');
		$('.register-right-head>li:first-child+li>a').removeClass('hover');
		$('#registe-dl').addClass('hover');
		$('#registe-zc').removeClass('hover');
		registerSlider.init();
		code();
		$("#change-code").click(function(){code();$(this).next().html('');});
	});
})
//登录
$('#link-main').delegate('#registe-dl-phone input','blur',function(){
	//console.log('可以设置');
	var phone=$('#registe-dl-phone input').val();
	//console.log(phone);
	$.post('data/registerZcy.php',{'phone':phone},function(data){
		//console.log("开始处理数据");
		//console.log(data);
		if(data.status>0){
			$('#registe-dl-phone span').html('<i></i>');
			$('#registe-dl-btn')[0].disabled=false;
		}
		else{
			$('#registe-dl-phone span').html('<s></s><b>该用户名不存在</b>');
			$('#registe-dl-btn')[0].disabled=true;
		}
	});
})
$('#link-main').delegate('#registe-dl-phone input','focus',function(){
	$('#registe-dl-phone span').html('');
})
$('#link-main').delegate('#registe-dl-veri input:first-child','focus',function(){
	var reg=/^(\s*|验证码)$/;
	var val=$('#registe-dl-veri input:first-child').val();
	if(!(reg.test(val.trim()))){
		$('#registe-dl-veri input:first-child').val('');
		str='';
		$('#registe-dl-veri span').html('');
		code();	
	}
})
$('#link-main').delegate('#registe-dl-btn','click',function(){
	var yam=$('#registe-dl-veri input:first-child').val();
	var autoYz=$('#registe-dl-veri input+input').val();
	autoYz=autoYz.toUpperCase();
	yam=yam.toUpperCase();
	console.log(autoYz+"=="+yam);
	if(autoYz!==yam){
		$('#registe-dl-veri span').html('<a></a>验证码错误');
	}
	else{
		$('#registe-dl-veri span').html('<i></i>');

		var phone=$('#registe-dl-phone input').val();
		var pwd=$('#registe-dl-pwd input').val();
		$.post('data/registerDL.php',{'phone':phone,'pwd':pwd},function(data){
			//console.log("开始处理数据");
			if(data.status>0){
				$('#user-out>a').text('安全退出');
				$('#user-phone').html('欢迎您:<span>'+data.msg+'</span>');
				$('#link-main').html('');
				$('nav .nav-all ul>li:nth-child(4)').addClass('on');
				$('#link-main').load('myCount.html',function(){
					$.get('data/count-state.php',function(data){
						//console.log("开始处理");
						//console.log(data);
						drawBuyState(data);
					})
					/*请求账户信息php*/
					myCountDetails();
				});
				$('#index-count-model').addClass('active');
			}
			else{
				$('#registe-dl-pwd>span').html('<s></s>密码错误');
				$('#link-main').delegate('#registe-dl-pwd','focus',function(){
					$('#registe-dl-pwd>span').html('');
				})
			}
		})
	}
})
function myCountDetails(){
	var phone=$('#user-phone span').html();
	//console.log(phone);
	$.get('data/countDetails.php',{'phone':phone},function(data){
		//console.log(data);
		$('#countDetails-phone').text(data.msg);
		$('#countDetails-balance').text(data.balance);
		$('#countDetails-sum').text(data.sum);
		$('#countDetails-total').text(data.total);
		$('#countDetails-interest').text(data.interest);
	})
}
$('#index-count-model button').click(function(){
	$('#index-count-model').removeClass('active');
})
/*充值按钮中心*/
$('#link-main').delegate('#countDetails-chong','click',function(){
	$('#index-chong-model').addClass('active');
	$('#index-chong-model input').val('');
})
$('#index-chong-model .chong-yes').click(function(){
	var money=$('#index-chong-model input').val();
	money=parseFloat(money).toFixed(2);
	var phone=$('#user-phone span').html();
	console.log(money);
	if(!(isNaN(money))){
		$('#index-chong-model').removeClass('active');
		$.post('data/countChong.php',{'phone':phone,'money':money},function(data){
			console.log("开始处理数据");
			$('#countDetails-balance').text(data.balance);
		})
	}
})
$('#index-chong-model .chong-no').click(function(){
	$('#index-chong-model').removeClass('active');
})
/*滚动弹出框*/
$("#msg-box-input").click(function(){
	if($('#user-phone').html()=='<a href="" data-input="inputPage">注册</a>'){
		$('#main').addClass('main-hidden');
		$('#link-main').html('');
		$('#link-main').load('input.html',function(){
			$('#register .register-right-head>li:first-child>a').addClass('hover');
			$('#register .register-right-head>li:first-child+li>a').removeClass('hover');
			$('#register .register-right-dl').addClass('hover');
			$('#register .register-right-zc').removeClass('hover');
			$('#registe-dl-phone input').val('18710111062');
			$('#registe-dl-pwd input').val('12345678');
			$('nav>.nav-all>ul>li.on').removeClass('on');
			registerSlider.init();
			code();
			$("#change-code").click(function(){code();$(this).next().html('');});
		})
	}
	else{
		$('#index-msg-box>div').addClass('hover');
		$('#index-msg-box>h2+p+p').removeClass();
	}
})
$(function(){boxSlider.init()});
var boxSlider={
	distance:0,
	DURATION:1000,
	STEPS:100,
	interval:0,
	step:0,
	timer:null,
	moved:0,
	WAIT:10000,

	init:function(){
		this.distance=parseFloat(getComputedStyle($('.index-msg')[0]).height);
		this.interval=this.DURATION/this.STEPS;
		this.step=this.distance/this.STEPS;
		this.timer=setTimeout(this.move.bind(this,1),this.interval)
	},
	move:function(n){
		var bottom=parseFloat(getComputedStyle($('.index-msg')[0]).bottom);
		//console.log(bottom);
		$('#index-msg-box')[0].style.bottom=bottom+n*this.step+"px";
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.move.bind(this,n),this.interval);
		}
		else{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			if(n==-1){
				$('#index-msg-box>h2+p+p').addClass('hover');
				if($('#user-phone').html()!=='<a href="" data-input="inputPage">注册</a>'){
					$('#index-msg-box>div').addClass('hover');
					$('#index-msg-box>h2+p').removeClass('hover');
				}
				else{
					$('#index-msg-box>div').removeClass('hover');
					$('#index-msg-box>h2+p').addClass('hover');
				}
				this.timer=setTimeout(this.move.bind(this,1),this.WAIT);
			}
		}
	},
	moveDown:function(){
		if(this.timer===null){
			this.move(-1);
		}
	},
}
$('#msg-box-close').click(function(){
	boxSlider.moveDown();
})