FootTools.prototype.initBtn = function(){
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