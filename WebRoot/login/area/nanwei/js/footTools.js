FootTools.prototype.initBtn = function(){
	//ȷ���װ�����
	var urledu="";
	var urlbook="";
	 try{
		  urlbook=document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
		  //alert(urlbook);
		  urledu=document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
		  //alert(whiteBoardPath.length);
	 }catch(e){
		 window.status='��õ��Ӱװ�����ʧ�ܣ�';
		 alert('��õ��Ӱװ�����ʧ�ܣ�');
		 //return whiteBoardFlag;
	 }
	 if(urlbook.length>0&&urledu.length>0){
		 if(urlbook==urledu) 
			 whiteBoardFlag=1;
		 else  
			 whiteBoardFlag=3; 
	  }else
	  {
		 whiteBoardFlag=2;//2-������ʾ 1-��ʾ��ѧ���� 3-��ʾ����
	  }
	  
	 //��ʼ����ѧ������ 
	 _teachToolConfigObj.read();
	  //�������鹤�����
	  //t1-8��ʽ(1U��,2���ֺ��ӣ�3Ǧ�ʣ�4Ƥ��,5�ֱʼ⣬6�鱾,7����,8�ı�����)
     var toolList=new Array();
	 toolList.push(new userTool("�ڿ�����","_footTools.showqrcode()","tools.qrcode","t10"));
	 toolList.push(new userTool("U����Դ","_usbObj.openUSBWindow(540,280)","tools.usb","t1"));
	 toolList.push(new userTool("������Դ","_footTools.LocalRes();","tools.bjzy","t1"));
	 toolList.push(new userTool("ϵͳ����","_sysConfg.openWindow();","tools.sysConfig","t2"));
	 toolList.push(new userTool("�����","_footTools.SysOsk();","tools.softkeyborard","t3"));
	 toolList.push(new userTool("�Ž̹���","_footTools.youjiaoTool();","tools.youjiaoTool","t9"));
	 //toolList.push(new userTool("�Ž̿�ע��","_common.openByIE(\"http://jyk.yjt361.com/index_te.jsp\");","tools.ucardReg","t6"));
	 //toolList.push(new userTool("����WIFI","_teachToolConfigObj.openLocalExe(\"\\\\plugins\\\\vcomlink\\\\WifiInfo.exe\");","tools.wifi","t4"));
	 toolList.push(new userTool("�ֻ��ȵ�","_teachToolConfigObj.openLocalExe(\"\\\\plugins\\\\vcomlink\\\\connectphone.exe\");","tools.phoneAp","t5"));
	 toolList.push(new userTool("�ֻ��ļ�","_footTools.openPhoneFile();","tools.phoneFile","t6"));

	 //toolList.push(new userTool("��ѧ����","location.href=\"myexe://TRACEEdu\"","tools.teach","t8"));
	 //toolList.push(new userTool("�װ幤��","location.href=\"myexe://TRACEBook\"","newTool","t7"));

	 //toolList.push(new userTool("���鹤��","location.href=\"myexe://TRACEBook\"","tools.whiteBoard","t8"));
	 //toolList.push(new userTool("�����¼","_footTools.clearImgCache()","clearImgCache","t9"));

	 //toolList.push(new userTool("�װ嶨λ","_footTools.toolposition();","toolposition","t8"));
	 //toolList.push(new userTool("�װ嶨λ","_footTools.toolposition();","toolposition","t8"));

	 for(var ti=0;ti<_teachToolConfigObj.maxToolSize;ti++){
		var classIndex=(ti+3)%4;//��4��ѭ����t9��ʼ
		classIndex=classIndex+6;
		toolList.push(new userTool("�Զ���"+(ti+1),"_teachToolConfigObj.openExe("+ti+")","teachToolConfigs.name"+ti,"t"+classIndex));
	 }
	//ͨ���ؼ���鱾���Ƿ���wifi,�Ƿ���ʾ�ֻ�wifi��������ť
	 var ifwifi=false;
	 
	 try{
		ifwifi=JudgeWirelessNetworkCard1.IsHaveWirelessCard();
	 }catch(e){
		//δ��װ���wifi�ؼ�
	 }
	 

     for(var i=0;i<toolList.length;i++)
	 {
		 var tool=toolList[i];
		 //Ĭ����ʾU�̹��ߣ�ϵͳ���ã������
		 if(tool.id=="tools.qrcode")
		 {
			 try
			 {		 
				 if(LessionOcx.IsSchoolbag()==1)
				 {
					tool.show="";//��������ڿζ� ��ʾ��ά��
				 }
			 }catch(e){}
		 }
		 
		 if(tool.id=="tools.sysConfig")tool.show="";//��ʾϵͳ����
		 if(tool.id=="tools.usb")tool.show="";		//��ʾU����Դ
		 if(tool.id=="tools.softkeyborard")tool.show="";	//��ʾ�����
		 if(tool.id=="tools.youjiaoTool")tool.show="";	//�Ž̹����Ƿ���ʾ
		 if(tool.id=="tools.ucardReg")tool.show="";	//�Ž̿�ע��
		 //����жԽӿƴ�Ѷ�ɣ�����ʾ������Դ����U����Դ
		 if(_teachToolConfigObj.dzjc!=null && _teachToolConfigObj.dzjc!="null" && _teachToolConfigObj.dzjc!=""){
			if(tool.id=="tools.usb")tool.show="none";
			if(tool.id=="tools.bjzy")tool.show="";
		}else{
			if(tool.id=="tools.usb")tool.show="";
			if(tool.id=="tools.bjzy")tool.show="none";
		}

		//�ֻ�wifi��ť����
		if(tool.id=="tools.wifi" || tool.id=="tools.phoneAp" || tool.id=="tools.phoneFile"){
			if(ifwifi){
				tool.show="";
			}else{
				tool.show="none";
			}
		}

		//�û��Զ�������ʾ����
		//��һ���û��Զ����֧��ʵ��վ̨
		if(tool.id.length>21 && tool.id.substring(0,21)=="teachToolConfigs.name"){
			var tollIndex=parseInt(tool.id.substring(21,tool.id.length));
			if(tollIndex!=NaN && typeof(_teachToolConfigObj.name[tollIndex])!="undefined" && _teachToolConfigObj.name[tollIndex].length>0 ){
				tool.name=_teachToolConfigObj.name[tollIndex];
				tool.show="";
			}
		}

		//whiteBoardFlag 1,2 ��ͨ,3
	    if(whiteBoardFlag==null){
			return;
	    }else if(1==whiteBoardFlag){
			//���
			if(tool.id=="newTool")tool.show="";						//��ʾ�װ幤��
			if(tool.id=="clearImgCache")tool.show="";              //��ʾ�����¼

			if(tool.id=="toolposition")tool.show="";               //��ʾ�װ嶨λ
			if(tool.id=="tools.softkeyborard")tool.show="none";   //���������
	    }else if(3==whiteBoardFlag){
			//������
			if(tool.id=="tools.teach")tool.show="";					//��ʾ��ѧ����
			if(tool.id=="tools.whiteBoard")tool.show="";			//��ʾ�װ幤��

			if(tool.id=="toolposition")tool.show="";				//��ʾ�װ嶨λ
			if(tool.id=="tools.softkeyborard")tool.show="none";		//���������
	    }else if(2==whiteBoardFlag){
			//����

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