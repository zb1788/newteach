var templateId="1";//模板id
/********  工具 begin*********/

function CommonObj() {
	this.currServerPath;
	this.cssName;
	this.teacherId;
	this.statUrl;//统计地址
	this.iePath;//ie地址
	this.loginMarginHeight=0;//登陆框下移高度
}
var _common = new CommonObj();
CommonObj.prototype.openByIE=function(url){
	if(null==this.iePath||""==this.iePath){
		this.iePath=this.getIEPath();
		if(""==this.iePath){
			alert("请检查ie浏览器设置");
			return;
		}
	}
	var path='\"'+this.iePath+'\"'+" "+url;
	var ret=ocx.playFile(path);
}
CommonObj.prototype.getIEPath=function(){
	return document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\IEXPLORE.EXE\\");
}
//_common.count(channelCode) 
CommonObj.prototype.count = function (channelCode) {
   // http://192.168.104.196:3129/stat/a.html?c=pls&rc=&mc=0001110101
   //  http://192.168.104.196:3129/stat/a.html?c=用户帐号&rc=资源code&mc=栏目编号
	var url=this.statUrl+'?'
	url+='c='+this.teacherId;//用户帐号
	url+='&rc=';//资源
	url+='&mc'+channelCode;//栏目编号
	//alert(url);
	//alert(document.getElementById('iframe_count').src);
	
	document.getElementById('iframe_count').src=url;
// alert(document.getElementById('iframe_count').src);
};

//_common.setTeacherId() 
CommonObj.prototype.setTeacherId = function (teacherId) {
	this.teacherId = teacherId;
};
//_common.getTeacherId() 
CommonObj.prototype.getTeacherId = function () {
	return this.teacherId ;
};
//设置版本_common.setVersion(sysVersion) 
CommonObj.prototype.setVersion = function (sysVersion) {
	//版本层显示在客户区右上角		  
	 var versionshow=document.getElementById("versionshow");	 
	 versionshow.innerHTML="当前客户端版本：V"+_common.loadversionxml();
	 var cVersion=versionshow.innerText;
	 //versionshow.style.left=document.documentElement.clientWidth-cVersion.length*13;
	 //versionshow.style.top=20;
	 versionshow.innerHTML+="<br>当前系统版本："+sysVersion;
	 versionshow.innerHTML+="<br>控件版本："+ocx.GetVersion();
};

CommonObj.prototype.initPage=function(){
         setMainTeachSeverPath('null');
         //_common.setCurrServerPath('');
		 _loginObj.maxAccounts=10; 
		 
		 _loginObj.getHistoryUser();       
         _tUtil.templateId="1";//模板id
		 		  
         document.onselectstart   =   function()   
         {   
             return   false;   
         }		 		 
		 document.onkeydown = tokeyDown;	
		 function tokeyDown(e){
	         var keyval=event.keyCode; 
	         if(keyval==8){
		         if(document.activeElement){
			         if(document.activeElement.tagName!="INPUT"){
				         return false;//如果按后退键， 暂时屏蔽掉
			         }
		         }
	         }
         }		 
		 document.onmouseover = function() {
		     var obj=event.srcElement;
             if(obj.name!='history_user'&&obj.id!='del_icon'&&obj.id!='del_icon_img'){
                 _loginObj.hideDelButton();
             }
		 };
		 _loginObj.setActInputObj(document.getElementById("login.username"));
         _common.initPageStyle();
}
//_common.initPageStyle() 调整页面各内容高度
CommonObj.prototype.initPageStyle = function (){
	 //关闭按钮显示在客户区右下角
	 document.getElementById("closePC").style.top=document.documentElement.clientHeight-50;
	  //当页面过高增加各层间距
	 if(document.documentElement.clientHeight>810){
		if(document.documentElement.clientHeight>1300){
			document.getElementById("loginBox").style.marginBottom = 20;
		}
		_common.loginMarginHeight=Math.round((document.documentElement.clientHeight-800)/4);		
		document.getElementById("loginBox").style.marginTop= _common.loginMarginHeight;
		var login=document.getElementById("loginBox").getBoundingClientRect();
		var username=document.getElementById("userName").getBoundingClientRect();
		var userTools=document.getElementById("tools").getBoundingClientRect();
		var copyRight=document.getElementById("copyright").getBoundingClientRect();

		var clientH=document.documentElement.clientHeight-login.bottom;
		clientH-=(username.bottom-username.top);
		clientH-=(userTools.bottom-userTools.top);
		clientH-=(copyRight.bottom-copyRight.top);
		clientH=clientH/3+1;
		document.getElementById("userName").style.marginTop=clientH;
//		document.getElementById("tools").style.marginTop=clientH;
		document.getElementById("copyright").style.marginTop=clientH;

		//document.getElementById("copyright").style.marginTop= Math.round((document.documentElement.clientHeight-700)/2);			
	}
	window.setTimeout('document.getElementById("closePC").style.top=document.documentElement.clientHeight-50',500);
    _loginObj.setUserNamePlaceHolder();
    _loginObj.setPassWordPlaceHolder();
    //南通计算二维码位置并显示
    window.setTimeout(_common.setQRcodePostion,500);
}
//南通计算二维码位置并显示
 CommonObj.prototype.setQRcodePostion = function () {
     var top = $('#tools').offset().top-10;
     var left = (window.screen.width-420)/2-180;

     $("#wei").css('top',top);
     $("#wei").css('left',left);
 }
//_common.getCurrServerPath() 获得服务器路径
CommonObj.prototype.getCurrServerPath = function () {
	//return this.getCurrServerPath2();
	  var  url='';
	var eFlag=false;
    var url;
    var url2;
    var config_str;
    try{
        config_str =config_str=VCOMPlayer.ReadInfo("","showkeip.ini");
        if('-1'==config_str)   eFlag=true;
    }catch(e){
           //alert(eFlag);
         eFlag=true;
    }//end of try-catch
     try{
      //alert(config_str);
       if(config_str.length<=1){
          //alert(config_str.length);
          eFlag=true;
       }else{
           var configs=config_str.split(";");
           for(var i=0;i<configs.length;i++){
		   // alert(configs[i]);
		   var config_pair= configs[i].split("=");
		   var name=config_pair[0];
		   //alert(name);
		   var value=config_pair[1];
		   
		   if("showke.school_url"==name){
		      //  alert(value);
		      //school_url=value;
		      url=value;
		      
		   }else if("showke.city_url"==name){
		     url2=value;
		      
		   }
          }//end of for
       }
     }catch(e){
       
     }//end of try-catch
	        
      if(eFlag){
		  try{
			  url=document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL");
			  
		  }catch(e){
			 window.status='授课IP控件有误！！';
			 alert('授课IP控件有误！');
			 //return whiteBoardFlag;
		  }
	  }
	var endI=url.lastIndexOf('newteach');
	if(endI<0){
        endI=url.lastIndexOf('teach');
	}

    url=url.substring(0,endI);
    return url;
	 
};
//设置服务器路径
CommonObj.prototype.setCurrServerPath = function (path) {
    var  url='';
	try{
	    url=document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL");
	}catch(e){}
	//alert(url);

	var endI=url.lastIndexOf('newteach');
	if(endI<0){
        endI=url.lastIndexOf('teach');
	}

    url=url.substring(0,endI);
	this.currServerPath =url;
	//alert(url);
	
	
};
//设置服务器路径
CommonObj.prototype.getCurrServerPath2 = function () {
	  var  url='';
	var eFlag=false;
    var url;
    var url2;
    var config_str;
    try{
        config_str =config_str=VCOMPlayer.ReadInfo("","showkeip.ini");
        if('-1'==config_str)   eFlag=true;
    }catch(e){
           //alert(eFlag);
         eFlag=true;
    }//end of try-catch
     try{
      //alert(config_str);
       if(config_str.length<=1){
          //alert(config_str.length);
          eFlag=true;
       }else{
           var configs=config_str.split(";");
           for(var i=0;i<configs.length;i++){
		   // alert(configs[i]);
		   var config_pair= configs[i].split("=");
		   var name=config_pair[0];
		   //alert(name);
		   var value=config_pair[1];
		   
		   if("showke.school_url"==name){
		      //  alert(value);
		      //school_url=value;
		      url=value;
		      
		   }else if("showke.city_url"==name){
		     url2=value;
		      
		   }
          }//end of for
       }
     }catch(e){
       
     }//end of try-catch
	        
      if(eFlag){
		  try{
			 
			  url2=document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL2");
			 
			  // alert(url2);
		  }catch(e){
			 window.status='授课IP控件有误！！';
			 alert('授课IP控件有误！');
			 //return whiteBoardFlag;
		  }
	  }
    url=url2;
	var endI=url.lastIndexOf('newteach');
	if(endI<0){
        endI=url.lastIndexOf('teach');
	}

    url=url.substring(0,endI);
  //  alert(url);
	return url;
	//
	
};
CommonObj.prototype.setCssName = function (cssName) {
	this.cssName = cssName;
};
//_common.getCssName() 
CommonObj.prototype.getCssName = function () {
	return this.cssName;
};


//主服务器路径 _common.getMainTeachSeverPath();
CommonObj.prototype.getMainTeachSeverPath = function () {
    if("error"==main_teach_path) return '';
    else  return main_teach_path;
};

function getMainTeachSeverPath(){
    
   
}

//退出系统 _common.exitSystem();
CommonObj.prototype.exitSystem = function () {
	 location.href="close://";	
};
//系统超时 _common.timeout(xmlHttp);
CommonObj.prototype.timeout = function (req) {
      if(req!=null&&req!="undefined"){
         //alert(xmlHttp.responseText=="");
       
         if(req.responseText=="")   {    
			  // location.href="index.html?timeout=true";
		}//超时
      }else{
        
	     //location.href="index.html?timeout=true";//超时
	  }
};
//_common.createId();
CommonObj.prototype.createId = function (row,line) {
	  return "index_"+row+"_"+line;
};
//_common.loadversionxml();
CommonObj.prototype.loadversionxml=function(){
	var str = "";
    try{
    	str = VCOMPlayer.ReadInfo("","../ClientInfo.xml");
        var reg=/<softver>(.*?)<\/softver>/g;
        var arr=reg.exec(str);
        return arr[1];
    }catch(e){
    	return -1;
    }
}
/*********  工具 end*********/


/********  页面记忆对象 begin*********/
var _pm = new PagMemoryObj();
function PagMemoryObj() {
	 this.pageFlag=0;
}
//放入当前正在运行的活动页面 0-教师资源 1-教师收藏 2-知识扩展 3-U盘资源 4-教师文件夹 5-校本资源 6-均衡资源   _pm.putActMainPage(1)
PagMemoryObj.prototype.putActMainPage = function (pageFlag) {
	 this.pageFlag=pageFlag;
};
//取出当前正在运行的活动页面 0-教师资源 1-教师收藏 2-知识扩展 3-U盘资源 4-教师文件夹 5-校本资源 6-均衡资源 
PagMemoryObj.prototype.getActMainPage = function ( ) {
	return this.pageFlag;
};
/*********  页面记忆对象 end*********/




/********  遮罩 begin*********/
var _mask = new MaskObj();
function MaskObj() {
	this.id = "maskAll";
}

//打开遮罩层 _mask.openMask()
MaskObj.prototype.openMask = function () {
     //alert("style:"+ document.getElementById(this.id).style.display);
	document.getElementById(this.id).style.display = "block";
};

//关闭遮罩层
MaskObj.prototype.closeMask = function () {
	document.getElementById(this.id).style.display = "none";
};

//_mask.isVisible()是否可见， true 可见，false不可见
MaskObj.prototype.isVisible = function () {
   //alert("style:"+ document.getElementById(this.id).style.display);
	if ("block" != document.getElementById(this.id).style.display) {
	     //alert("style:"+ document.getElementById(this.id).style.display);
		return false;
	} else {
		return true;
	}
	alert();
};
/*********  遮罩  end*********/







/********  页面主体 begin*********/
var _pMain = new PageMainObj();
function PageMainObj() {
   this.id="bg";
}

//_pMain.resStyle()
PageMainObj.prototype.resStyle = function () {
	var h = "<div class=\"mainLeft\" id=\"mainLeft\"></div><div class=\"mainRight\" id=\"mainRight\"></div>";
	 
	 //<!-- 1-电子2-TV -->
   
   /****修改样式 begin*******/
   var  css="containers setBg1";
   if( _tUtil.templateId==2)
      css="containers setBg2";
     
   	document.getElementById(this.id).className = css;
   /****修改样式 end*******/
	this.getMain().innerHTML = h;
};

//教师拓展样式即相关div _pMain.keStyle()
PageMainObj.prototype.keStyle = function () {
   //<!-- 1-电子2-TV -->
   
   /****修改样式 begin*******/
   var  css="containers setBg1";
   if( _tUtil.templateId==2)
      css="containers setBg2";
     
   	document.getElementById(this.id).className = css;
   /****修改样式 end*******/
   	

	var h = "<div class=\"mainLeft\" id=\"mainLeft\"></div><div class=\"mainRight\" id=\"mainRight\" ></div>";
	h += "<div class=\"clearfix\"></div>";

	this.getMain().innerHTML = h;
    //if(isAllowSimpleHotKey) _simpleHotKey.pid='main'; 
};

//_pMain.usbStyle()
PageMainObj.prototype.usbStyle = function () {
   //<!-- 1-电子2-TV -->
   /****修改样式 begin*******/
   var  css="containers setBg3";
   if( _tUtil.templateId==2)
      css="containers setBg4";
     
   	document.getElementById(this.id).className = css;
   /****修改样式 end*******/
};

//_pMain.folderStyle()
PageMainObj.prototype.folderStyle = function () {
   //<!-- 1-电子2-TV -->
   /****修改样式 begin*******/
   var  css="containers setBg5";
   if( _tUtil.templateId==2)
      css="containers setBg6";
     
   	document.getElementById(this.id).className = css;
   /****修改样式 end*******/
};
//_pMain.netToolsStyle()
PageMainObj.prototype.netToolsStyle = function () {
   //<!-- 1-电子2-TV -->
   /****修改样式 begin*******/
   var  css="containers setBg5";
   if( _tUtil.templateId==2)
      css="containers setBg6";
     
   	document.getElementById(this.id).className = css;
   /****修改样式 end*******/
};





//_pMain.liveStyle() 直播样式
PageMainObj.prototype.liveStyle = function () {
   //<!-- 1-电子2-TV -->
   /****修改样式 begin*******/
   var  css="containers setBg7";
   if( _tUtil.templateId==2)
      css="containers setBg8";
     
   	document.getElementById(this.id).className = css;
   /****修改样式 end*******/
};





//_pMain.getMain()
PageMainObj.prototype.getMain = function () {
	return document.getElementById("main");
};

//_pMain.getMainLeft()
PageMainObj.prototype.getMainLeft = function () {
	return document.getElementById("mainLeft");
};



//_pMain.getMainRight()
PageMainObj.prototype.getMainRight = function () {
	return document.getElementById("mainRight");
};
PageMainObj.prototype.getRightMenu = function () {
	return document.getElementById("mainRight");
};

//_pMain.getRightMenu()   <ul class="rightMenu" id="rightMenu"></ul>  
PageMainObj.prototype.getRightMenu = function () {
	return document.getElementById("rightMenu");
};

//_pMain.getRightResList()   <ul class="resList" id="resList"></ul>//右侧资源
PageMainObj.prototype.getRightResList = function () {
	return document.getElementById("resList");
};

// _pMain.getRightResPage()   <div class="page" id="resPage"></div>//资源分页
PageMainObj.prototype.getRightResPage = function () {
	return document.getElementById("resPage");
};
/********* 页面主体 end*********/
String.prototype.trim = function() 
{
	return this.replace(/(^\s*)|(\s*$)/g, "");
}