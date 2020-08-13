var _footTools=new FootTools();
var whiteBoardFlag=2;

function FootTools(){
 }
 //_footTools.clearImgCache();
FootTools.prototype.clearImgCache = function() 
{
	var stauts=0;
	try
	{	 // 新建
		 if(IInformationOcx.IsEnvironmentStart()==1)
		{
			 if(window.confirm("确定要清除板书记录？")){
				 stauts=1;
				 IInformationOcx.FileNew(true);
			 }
		 }else{
			alert("请先启动白板工具！");
		}
	}catch(e){
		 try{
		     if(stauts==0)
			 {
				if(window.confirm("确定要清除板书记录？")){
					IInformationOcx.FileNew(true);
				}
			 }else{ 
			     alert("清除记录出错！");
		     }	         
		 }catch(ee){
			 alert("清除记录出错！"); 
		 }
	 }
 }
  FootTools.prototype.toolposition = function() {
		if(1==_tUtil.getWhiteBoardFlag()){
  			try{
				IInformationOcx.DeviceLocate();
			}catch(e){}
  		}else if(3==whiteBoardFlag){
  			try{
	  			var urlbook=document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
				var ret=ocx.playFile(urlbook.substring(0,urlbook.lastIndexOf("\\")+1)+"SetPoint.EXE");
				switch(ret)
					{
						case -1:
							alert("启动失败!");
						break;
						case -2:
							alert("启动失败!");
						break;
						case -3:
							alert("启动失败!");
						break;
					}
  			}catch(e){}
  		}
 }

//软键盘处理方法
FootTools.prototype.SysOsk=function(){
	ocx.playFile("C:\\WINDOWS\\system32\\osk.exe");
}
FootTools.prototype.showqrcode=function(){
	
	var width = 270;
    var height = 352;
	var url = ocx.GetSpecialFolderPath(100)+"/plugins/showQRcode.html";
	var newUrl="mybrowser://width:"+width+"&&height:"+height+"@@"+url;
    window.location.href=newUrl;
}
FootTools.prototype.qrcodeLogin=function(){
	
	var url = ocx.GetSpecialFolderPath(100)+"/qrcodeLogin.html";
	url = url + "?sso="+_config["SSO"];
	art.dialog.open(url, {
        esc : false,
        lock : true,
        title :false,
        cancel:false,
        width : '280px',
        height : '230px',
        id:'qrcodeLogin',
        close : function() {
            if(art.dialog.data("result")==1)
            {
                
				var url="http://"+_config["PLS"]+"/newteach/index.do?userSetFlag=1";							
					url+="&templateId=1";
					url+="&cssName="+defaultcssname;
					url+="&currVersionid=";//this.currVersionid=versionid;//记录当前用户所选择的版本id
					url+="&whiteBoardFlag=";//白板类型 tianshibo =1
					url+="&mac=";//mac地址;
					url+="&pwd=";
					url+="&rememberPwd=";
				location.href=url;
                return;
            }
        }


    });
	return;
	var width = 270;
    var height = 352;
	var url = ocx.GetSpecialFolderPath(100)+"/qrcodeLogin.html";
	var newUrl="mybrowser://width:"+width+"&&height:"+height+"@@"+url;
    window.location.href=newUrl;
}

//设置是否显示优教工具
FootTools.prototype.youjiaoTool=function(){
	//判断优教工具是否已启动 1已启动，0未启动
	var youjiaoTool = 1;
	try {
        youjiaoTool = ocx.GetFileExists("ClientTools.exe");
    }
    catch (err) {
    }
	
	if(youjiaoTool==0)
	{				
		ocx.playFile(ocx.GetSpecialFolderPath(100)+"/plugins/ClientTools.exe");
	}
	//显示或隐藏优教工具
	var url = "http://127.0.0.1:"+getSocketPort()+"?showYoujiaoTool=true";
	$.ajax({
		url:url,
		type:"get",
		async:true,
		dataType:"jsonp",
		jsonp:"jsoncallback",
		scriptCharset:"gbk",
		success:function(rdata){
			
		},
		error:function(xmlHttpRequest,textStatus,errorThrown) {
		
		}
	});
	
		
	
	
}

//获取socket端口
function getSocketPort(){
    var port="9000";
    var config_str="";
    try {
        config_str=ocx.ReadInfo("","clientport.ini");
    }
    catch (err) {
    }
    if(config_str!="-1" && config_str.length>1){
        var configs=config_str.split(":");
        if(configs.length==2){
            if(configs[0]=="socketport")
            {
                //判断port是否为数字
                port = configs[1];
            }

        }
    }
    return port;
}
//科大讯飞对接，本机资源
FootTools.prototype.LocalRes=function(){
	document.getElementById('localResDiv').style.display='block';
}
//手机文件打开
FootTools.prototype.openPhoneFile=function(){
	try{
		ocx.OpenDirectory(JudgeWirelessNetworkCard1.GetFilePath());
	}catch(e){
		//控件异常
	}
}

//打开关于页面
FootTools.prototype.openAbout=function(){
	//var windowsVersion = getWindowsVersion();
	try {
		//获取windows系统版本
		var windowsVersion = LessionOcx.GetOSType();
		//获取授课端版本
		var clientVersion = LessionOcx.GetClientVer();
		var devVersion = getDevVersion();
		//是否有新版本
		var hasNewVersion = false;
		var newVersionInfo = LessionOcx.GetNewVerInfo();
		//最新版本号
		var newVersionCode = "";
		//最新版本升级路径
		var newVersionPath = "";
		//判断是否有新版本
		if(newVersionInfo == ''){
			hasNewVersion = false;
		}else{
			hasNewVersion = true;
			var arr = newVersionInfo.split(",");
			newVersionCode = arr[0];
			newVersionPath = arr[1];
		}

		var aboutHtml = '<ul>';
		aboutHtml += '<li>优教授课版本：'+clientVersion+'</li>';

		if (hasNewVersion) {
			newVersionPath = newVersionPath.replace(/\\/g, '\\\\');
			aboutHtml += '<li>有新版本' + '<a class="versionButton" onclick="updateVersion(\'' + newVersionCode + '\',\'' + newVersionPath + '\')">立即更新</a></li>';
		} else {
			aboutHtml += '<li>暂无新版本</li>';
		}


		var devName = "";
		if(devVersion.indexOf('0')){
			devName = '一代接收器';
		}else if(devVersion.indexOf('1')){
			devName = '二代接收器或无';
		}else if(devVersion.indexOf('2')){
			devName = '数字接收器';
		}else if(devVersion.indexOf('4')){
			devName = '暂无设备';
		}
		aboutHtml += '<li>互动学习卡接收器型号：'+devName+'</li>';

		if(devVersion.indexOf(',1')){
			//纸笔设备
			aboutHtml += '<li>纸笔课堂接收器型号：无线蓝牙互动AP</li>';
		}

		aboutHtml += '<li>windows版本：'+ windowsVersion +'</li>';
		aboutHtml += '<li>咨询电话：400-637-1319</li>';
		document.getElementById("aboutInfo").innerHTML = aboutHtml;

	}catch(e){
		document.getElementById("aboutInfo").innerHTML = '加载控件失败';
	}
	document.getElementById('aboutWindow').style.display='block';
}

//更新授课端版本
function updateVersion(newVer,strpath){
	var flag = $(".versionButton").attr('disabled');
	if(flag == 'disabled'){
		return false;
	}
	$(".versionButton").attr('disabled','disabled');

	alert('升级程序启动中...请勿操作!');
	try {
		LessionOcx.StartNewUpdate(newVer,strpath);
	}catch(e){

	}
}
//获取答题器类型
function getDevVersion(){
	//0，是一代接收器，1是二代接收器或无，2是数字接收器
	var deviceType=0;//1新设备(支持多题套卷，无设备时默认值); 0老设备(单题); 2数字答题卡(支持数字键);
	var config_str="";
	try {
		config_str=ocx.ReadInfo("","clientversion.ini");
	}catch (err) {}

	if(config_str!="-1" && config_str.length>1){
		var configs=config_str.split(":");
		if(configs.length==2){
			if(configs[0]=="devversion")
			{
				deviceType = configs[1];
			}

		}
	}
	return deviceType;
}

//获取windows版本
function getWindowsVersion(){
	var userAgentInfor = navigator.userAgent.toLowerCase(),
		windowsVersion = userAgentInfor.substr(userAgentInfor.indexOf('windows nt ') + 11,4),
		nameVersion;
	windowsVersion = windowsVersion.replace(/\)/,'');
	switch(windowsVersion){
		case '5.1':
			nameVersion = 'window xp';
			break;
		case '6.1':
			nameVersion = 'window 7';
			break;
		case '6.3':
			nameVersion = 'window 8';
			break;
		case '10.0':
			nameVersion = 'window 10';
			break;

		default:
			nameVersion = '其他';

	}
	return nameVersion;
}


 FootTools.prototype.initBtn = function()
 {  
	//确定白板类型
	var urledu="";
	var urlbook="";
	 try{
		  urlbook=document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
		  //alert(urlbook);
		  urledu=document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
		  //alert(whiteBoardPath.length);
	 }catch(e){
		 window.status='获得电子白板类型失败！';
		 alert('获得电子白板类型失败！');
		 //return whiteBoardFlag;
	 }
	 if(urlbook.length>0&&urledu.length>0){
		 if(urlbook==urledu) 
			 whiteBoardFlag=1;
		 else  
			 whiteBoardFlag=3; 
	  }else
	  {
		 whiteBoardFlag=2;//2-都不显示 1-显示教学工具 3-显示两个
	  }
	  
	 //初始化教学工具类 
	 _teachToolConfigObj.read();
	  //创建板书工具面板
	  //t1-8样式(1U盘,2齿轮盒子，3铅笔，4皮包,5钢笔尖，6书本,7扳手,8文本窗口)
     var toolList=new Array();
	 //toolList.push(new userTool("二维码登陆","_footTools.qrcodeLogin()","tools.qrcodeLogin","t10"));
	 toolList.push(new userTool("授课助手","_footTools.showqrcode()","tools.qrcode","t10"));
	 toolList.push(new userTool("U盘资源","_usbObj.openUSBWindow(540,280)","tools.usb","t1"));
	 toolList.push(new userTool("本机资源","_footTools.LocalRes();","tools.bjzy","t1"));
	 toolList.push(new userTool("系统设置","_sysConfg.openWindow();","tools.sysConfig","t2"));
	 toolList.push(new userTool("软键盘","_footTools.SysOsk();","tools.softkeyborard","t3"));
	 toolList.push(new userTool("优教工具","_footTools.youjiaoTool();","tools.youjiaoTool","t9"));
	 //toolList.push(new userTool("优教卡注册","_common.openByIE(\"http://jyk.yjt361.com/index_te.jsp\");","tools.ucardReg","t6"));
	 //toolList.push(new userTool("本机WIFI","_teachToolConfigObj.openLocalExe(\"\\\\plugins\\\\vcomlink\\\\WifiInfo.exe\");","tools.wifi","t4"));
	 toolList.push(new userTool("手机热点","_teachToolConfigObj.openLocalExe(\"\\\\plugins\\\\vcomlink\\\\connectphone.exe\");","tools.phoneAp","t5"));
	 toolList.push(new userTool("手机文件","_footTools.openPhoneFile();","tools.phoneFile","t6"));
	 //toolList.push(new userTool("关于","_footTools.openAbout();","tools.about","t2"));

	 //toolList.push(new userTool("教学工具","location.href=\"myexe://TRACEEdu\"","tools.teach","t8"));
	 //toolList.push(new userTool("白板工具","location.href=\"myexe://TRACEBook\"","newTool","t7"));

	 //toolList.push(new userTool("板书工具","location.href=\"myexe://TRACEBook\"","tools.whiteBoard","t8"));
	 //toolList.push(new userTool("清除记录","_footTools.clearImgCache()","clearImgCache","t9"));

	 //toolList.push(new userTool("白板定位","_footTools.toolposition();","toolposition","t8"));
	 //toolList.push(new userTool("白板定位","_footTools.toolposition();","toolposition","t8"));

	 for(var ti=0;ti<_teachToolConfigObj.maxToolSize;ti++){
		var classIndex=(ti+3)%4;//后4个循环，t9开始
		classIndex=classIndex+6;
		toolList.push(new userTool("自定义"+(ti+1),"_teachToolConfigObj.openExe("+ti+")","teachToolConfigs.name"+ti,"t"+classIndex));
	 }
	//通过控件检查本机是否有wifi,是否显示手机wifi那三个按钮
	 var ifwifi=false;
	 
	 try{
		ifwifi=JudgeWirelessNetworkCard1.IsHaveWirelessCard();
	 }catch(e){
		//未安装检测wifi控件
	 }
	 

     for(var i=0;i<toolList.length;i++)
	 {
		 var tool=toolList[i];
		 //默认显示U盘工具，系统设置，软键盘
		 if(tool.id=="tools.qrcode")
		 {
			 try
			 {		 
				 if(LessionOcx.IsSchoolbag()==1)
				 {
					tool.show="";//电子书包授课端 显示二维码
				 }
			 }catch(e){}
		 }
		 
		 if(tool.id=="tools.qrcodeLogin")tool.show="";//显示二维码登陆
		 if(tool.id=="tools.sysConfig")tool.show="";//显示系统设置
		 if(tool.id=="tools.usb")tool.show="";		//显示U盘资源
		 if(tool.id=="tools.softkeyborard")tool.show="";	//显示软键盘
		 if(tool.id=="tools.youjiaoTool")tool.show="";	//优教工具是否显示
		 if(tool.id=="tools.ucardReg")tool.show="";	//优教卡注册
		 //如果有对接科大讯飞，则显示本机资源屏蔽U盘资源
		 if(_teachToolConfigObj.dzjc!=null && _teachToolConfigObj.dzjc!="null" && _teachToolConfigObj.dzjc!=""){
			if(tool.id=="tools.usb")tool.show="none";
			if(tool.id=="tools.bjzy")tool.show="";
		}else{
			if(tool.id=="tools.usb")tool.show="";
			if(tool.id=="tools.bjzy")tool.show="none";
		}

		//手机wifi按钮处理
		if(tool.id=="tools.wifi" || tool.id=="tools.phoneAp" || tool.id=="tools.phoneFile"){
			if(ifwifi){
				tool.show="";
			}else{
				tool.show="none";
			}
		}

		if(tool.id == "tools.about"){
			tool.show="";
		}

		//用户自定义项显示控制
		//第一个用户自定义项，支持实物站台
		if(tool.id.length>21 && tool.id.substring(0,21)=="teachToolConfigs.name"){
			var tollIndex=parseInt(tool.id.substring(21,tool.id.length));
			if(tollIndex!=NaN && typeof(_teachToolConfigObj.name[tollIndex])!="undefined" && _teachToolConfigObj.name[tollIndex].length>0 ){
				tool.name=_teachToolConfigObj.name[tollIndex];
				tool.show="";
			}
		}

		//whiteBoardFlag 1,2 普通,3
	    if(whiteBoardFlag==null){
			return;
	    }else if(1==whiteBoardFlag){
			//鸿合
			if(tool.id=="newTool")tool.show="";						//显示白板工具
			if(tool.id=="clearImgCache")tool.show="";              //显示清除记录

			if(tool.id=="toolposition")tool.show="";               //显示白板定位
			if(tool.id=="tools.softkeyborard")tool.show="none";   //隐藏软键盘
	    }else if(3==whiteBoardFlag){
			//天世博
			if(tool.id=="tools.teach")tool.show="";					//显示教学工具
			if(tool.id=="tools.whiteBoard")tool.show="";			//显示白板工具

			if(tool.id=="toolposition")tool.show="";				//显示白板定位
			if(tool.id=="tools.softkeyborard")tool.show="none";		//隐藏软键盘
	    }else if(2==whiteBoardFlag){
			//其他

	    }
	}	
	var str="";
	for(var k=0,j=0;k<toolList.length;k++){
		var tool=toolList[k];
		if(tool.show=="none"){
			continue;
		}
		str+="<a href='javascript:"+tool.method+"'><span class="+tool.className+"></span>"+tool.name+"</a>";
	}
    document.getElementById("tools").innerHTML=str;
	 _tUtil.whiteBoardFlag=whiteBoardFlag;
	}//end of initBtn
	 //用户定义工具对象
function userTool(name,method,id,className)
{
     this.show="none";
     this.className=className;
     if(name!=null)this.name=name;
     if(method!=null)this.method=method
     this.href="#";
     if(id!=null)this.id=id;
}