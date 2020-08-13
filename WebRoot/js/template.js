var _tUtil = new TemplateUtilObj();

function TemplateUtilObj() {
    //this.configParamName='pls.template.defaultId';
    this.templateId = "";
    this.whiteBoardFlag = "";
}

TemplateUtilObj.prototype.setTemplateId = function (templateId) {
    this.templateId = templateId;
}
TemplateUtilObj.prototype.getTemplateInfo = function () {

    if (_macUtil.isReady()) {
        var url = transferProtocol_web + _config["PLS"] + '/loginLog/AccessQueLog.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.c1=2';//��ȡģ����Ϣ
        url += '&ajaxdate=' + new Date();
        //  prompt('',url);
        sendRequest(this.parseTemplateInfoData, url);
        //alert();
    } else {
        var url = 'toLoginPage.do?default=true&templateId=1';//Ĭ��Ϊ���Ӱװ�
        // url+='&whiteBoardFlag=2';

        location.href = url;
    }
}
TemplateUtilObj.prototype.parseTemplateInfoData = function (xmldoc) {
    //alert();
    // if (4==xmlHttp.readyState)//4:���
    //if (200==xmlHttp.status){
    //alert(xmlHttp.responseText);
    // var xmldoc=xmlHttp.responseXML;
    var plsUserLoginLogNode = xmldoc.selectNodes("//list/plsUserLoginLog");
    var templateId = _tUtil.templateId;
    try {
        templateId = plsUserLoginLogNode[0].selectNodes("templateId")[0].text;

    } catch (e) {
        // alert( plsUserLoginLogNode[0].selectNodes("templateId")[0].text);
        //alert('��ȡģ��id�쳣��');
    }
    var url = "toLoginPage.do?templateId=" + templateId;
    // url+='&whiteBoardFlag='+_tUtil.getWhiteBoardFlag();
    //  alert(url);
    location.href = url;
    //}

}//end of parseTemplateInfoData
//(��ע�Ͳ�֪����ʵ�꼶ʲô��˼)��õ��Ӱװ����� 1-��ʾ�꼶����;
//whiteBoardFlag �жϣ�1���/2�°���ע����cuurType����/3������
TemplateUtilObj.prototype.getWhiteBoardFlag = function () {
    var urledu = "";
    var urlbook = "";
    //��ͬ�Ǻ�ӡ�����ͬ����ʿ��
    _teachToolConfigObj.read();
    try {
        urlbook = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
        //alert("urlbook="+urlbook);
        urledu = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
        //alert(whiteBoardPath.length);
    } catch (e) {
        window.status = '���ע�����Ϣʧ�ܣ�';
    }
    if (urlbook.length > 0 && urledu.length > 0) {
        if (urlbook == urledu) whiteBoardFlag = 1;
        else whiteBoardFlag = 3;

    } else {
        whiteBoardFlag = 2;
        if (1 == _teachToolConfigObj.currType)
            whiteBoardFlag = 1;//2-û���ã���Ϊ���°汾�� 1-��ͬ��� 3-����ͬ

    }
    _tUtil.whiteBoardFlag = whiteBoardFlag;
    return whiteBoardFlag;

}

//�����û����߲˵���ʾ
TemplateUtilObj.prototype.initBtn = function () {
    var toolList = new Array();
    for (var ti = 0; ti < _teachToolConfigObj.maxToolSize; ti++) {
        var classIndex = (ti + 3) % 4;
        if (classIndex == 0) {
            classIndex = 4;
        }
        toolList.push(new userTool("�Զ���" + (ti + 1), "_teachToolConfigObj.openExe(" + ti + ")", "teachToolConfigs.name" + ti, "bgc" + classIndex));
    }
    toolList.push(new userTool("�װ嶨λ", "_footTools.toolposition();", "toolposition", "bgc1"));
    toolList.push(new userTool("��ѧ����", "location.href=\"myexe://TRACEEdu\"", "tools.teach", "bgc4"));
    toolList.push(new userTool("�װ幤��", "location.href=\"myexe://TRACEBook\"", "newTool", "bgc4"));

    toolList.push(new userTool("���鹤��", "location.href=\"myexe://TRACEBook\"", "tools.whiteBoard", "bgc3"));
    toolList.push(new userTool("�����¼", "_footTools.clearImgCache()", "clearImgCache", "bgc3"));

    toolList.push(new userTool("�����", "_footTools.SysOsk();", "tools.softkeyborard", "bgc2"));
    toolList.push(new userTool("U����Դ", "_usbObj.openUSBWindow(540,280)", "tools.usb", "bgc1"));
    var whiteBoardFlag = this.getWhiteBoardFlag();
    //var c=0;
    for (var i = 0; i < toolList.length; i++) {

        var tool = toolList[i];
        //Ĭ����ʾU�̹��ߣ�ϵͳ���ã������
        if (tool.id == "tools.sysConfig") tool.show = "";//��ʾϵͳ����
        if (tool.id == "tools.usb") tool.show = "";		//��ʾU����Դ
        if (tool.id == "tools.softkeyborard") tool.show = "";	//��ʾ�����		
        //�û��Զ�������ʾ����
        //��һ���û��Զ����֧��ʵ��վ̨
        if (tool.id.length > 21 && tool.id.substring(0, 21) == "teachToolConfigs.name") {
            var tollIndex = parseInt(tool.id.substring(21, tool.id.length));
            if (tollIndex != NaN && typeof (_teachToolConfigObj.name[tollIndex]) != "undefined" && _teachToolConfigObj.name[tollIndex].length > 0) {
                tool.name = _teachToolConfigObj.name[tollIndex];
                tool.show = "";
            }
        }

        //whiteBoardFlag 1,2 ��ͨ,3
        if (whiteBoardFlag == null) {
            return;
        } else if (1 == whiteBoardFlag) {
            //���
            if (tool.id == "newTool") tool.show = "";						//��ʾ�װ幤��
            if (tool.id == "clearImgCache") tool.show = "";              //��ʾ�����¼

            if (tool.id == "toolposition") tool.show = "";               //��ʾ�װ嶨λ
            if (tool.id == "tools.softkeyborard") tool.show = "none";   //���������
        } else if (3 == whiteBoardFlag) {
            //������
            if (tool.id == "tools.teach") tool.show = "";					//��ʾ��ѧ����
            if (tool.id == "tools.whiteBoard") tool.show = "";			//��ʾ�װ幤��

            if (tool.id == "toolposition") tool.show = "";				//��ʾ�װ嶨λ
            if (tool.id == "tools.softkeyborard") tool.show = "none";		//���������
        } else if (2 == whiteBoardFlag) {
            //����

        }
    }
    var str = "";
    for (var k = 0, j = 0; k < toolList.length; k++) {
        var tool = toolList[k];
        if (tool.show == "none") {
            continue;
        }
        str += "<li class=" + tool.className + "><a href='javascript:" + tool.method + "'>" + tool.name + "</a></li>";
    }
    str += "<li class=toolClose><a href='javascript:void(0)' onclick = 'showOrHide(2)'></a></li>";
    if (loginStyle == "0") document.getElementById("tools").innerHTML = str;
    else document.getElementById("toolIcon").style.display = "none";
}

//�û����幤�߶���
function userTool(name, method, id) {
    this.show = "none";
    this.className = null;
    if (name != null) this.name = name;
    if (method != null) this.method = method
    this.href = "#";
    if (id != null) this.id = id;
}

var _footTools = new FootTools();

// 
function FootTools() {
}

//_footTools.getwhiteBoardFlag();
FootTools.prototype.getwhiteBoardFlag = function () {
    var whiteBoardFlag = 2;
    // alert();
    var urledu = "";
    var urlbook = "";
    //��ͬ�Ǻ�ӡ�����ͬ����ʿ��
    try {
        urlbook = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
        //alert("urlbook="+urlbook);
        urledu = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
        //alert(whiteBoardPath.length);
    } catch (e) {
        window.status = '��õ��Ӱװ�����ʧ�ܣ�';
        //alert('��õ��Ӱװ�����ʧ�ܣ�');
        //return whiteBoardFlag;
    }
    // alert();
    // alert("urlbook="+urlbook);
    // alert("urledu="+urledu);
    if (urlbook.length > 0 && urledu.length > 0) {
        if (urlbook == urledu) whiteBoardFlag = 1;
        else whiteBoardFlag = 3;

    } else {
        whiteBoardFlag = 2;//2-û���ã���Ϊ���°汾�� 1-��ͬ��� 3-����ͬ
    }


    return whiteBoardFlag;
}//end of footTools.getwhiteBoardFlag(str);


//_footTools.logout();
FootTools.prototype.logout = function () {
    try {
        IInformationOcx.FileNew(true);
    } catch (e) {
    }//end of try/catch
    //location.href='<%=path%>/newteach/index.html'
    location.href = "gobackmy://";
}
//_footTools.clearImgCache();
FootTools.prototype.clearImgCache = function () {
    var stauts = 0;
    try {
        // �½�
        if (IInformationOcx.IsEnvironmentStart() == 1) {
            if (window.confirm("ȷ��Ҫ��������¼��")) {
                stauts = 1;
                IInformationOcx.FileNew(true);
            }
        } else {
            alert("���������װ幤�ߣ�");
        }

    } catch (e) {
        try {
            if (stauts == 0) {
                if (window.confirm("ȷ��Ҫ��������¼��")) {
                    IInformationOcx.FileNew(true);
                }
            } else {
                alert("�����¼����");
            }
        } catch (ee) {
            alert("�����¼����");
        }
    }
}
FootTools.prototype.toolposition = function () {
    if (1 == _tUtil.getWhiteBoardFlag()) {
        try {
            IInformationOcx.DeviceLocate();
        } catch (e) {
        }
    } else if (3 == whiteBoardFlag) {
        try {
            var urlbook = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
            var ret = ocx.playFile(urlbook.substring(0, urlbook.lastIndexOf("\\") + 1) + "SetPoint.EXE");
            switch (ret) {
                case -1:
                    alert("����ʧ��!");
                    break;
                case -2:
                    alert("����ʧ��!");
                    break;
                case -3:
                    alert("����ʧ��!");
                    break;
            }
        } catch (e) {
        }
    }
}
//_footTools.createFootTools(str);
FootTools.prototype.createFootTools = function (str) {

    if (2 == '<s:property value="#parameters.templateId"/>') {
        //2 -tv
        document.getElementById("softkeyborard").style.display = "";
        document.getElementById("softkeyborarddiv").style.display = "";
        return;
    } else {//PC

        // 2-û���ã���Ϊ���°汾�� 1-��ͬ��� 3-����ͬ
        var whiteBoardFlag = _footTools.getwhiteBoardFlag();
        ;
        // alert(whiteBoardFlag);
        _tUtil.whiteBoardFlag = whiteBoardFlag;
        /************/
        _teachToolConfigObj.read();
        var c = 0;
        //�����ǲ��Ǻ�Ͼ���ʾ��һ����ť
        if (_teachToolConfigObj.name0 && _teachToolConfigObj.name0.length > 0) {
            c++;
            document.getElementById("teachToolConfigs.name0").style.display = '';
            document.getElementById("teachToolConfigs.name0_id").innerHTML = _teachToolConfigObj.name0;
        }
        if (2 == whiteBoardFlag) {//�°汾���������ļ��л�ȡ
            if (2 == _teachToolConfigObj.currType) {
                //document.getElementById("tools.softkeyborard").style.display='';
                //document.getElementById("tools.softkeyborard_float").style.display='';
                if (_teachToolConfigObj.name1 && _teachToolConfigObj.name1.length > 0) {
                    c++;
                    document.getElementById("teachToolConfigs.name1").style.display = '';
                    document.getElementById("teachToolConfigs.name1_id").innerHTML = _teachToolConfigObj.name1;
                }
                if (_teachToolConfigObj.name2 && _teachToolConfigObj.name2.length > 0) {
                    c++;
                    document.getElementById("teachToolConfigs.name2").style.display = '';
                    document.getElementById("teachToolConfigs.name2_id").innerHTML = _teachToolConfigObj.name2;
                }
                if (c == 0) {
                    document.getElementById("softkeyborard").style.display = "";
                    document.getElementById("softkeyborarddiv").style.display = "";
                }
            } else if (1 == _teachToolConfigObj.currType) {//���
                document.getElementById("newTool").style.display = "";
                document.getElementById("clearImgCache").style.display = "";
            } else {
                //��ʾ�����
                document.getElementById("softkeyborard").style.display = "";
                document.getElementById("softkeyborarddiv").style.display = "";
            }//end of if-else if -else
            return;

        } else {
            //alert('old');//�ɷ���
            if (3 == whiteBoardFlag) {
                document.getElementById("urlbook").style.display = "";
                document.getElementById("urledu").style.display = "";
                return;
                //}else if(1=='<s:property value="#parameters.whiteBoardFlag"/>'){
            } else if (1 == whiteBoardFlag) {
                document.getElementById("newTool").style.display = "";
                document.getElementById("clearImgCache").style.display = "";
                return;
            }
        }
    }//end of if-else(ģ��)
    return;
    /***
     var js=""
     var name="����"
     //alert(str);
     var flag=true;
     var subjects=new Array("����","��ѧ","����","��ѧ","Ӣ��");
     for(var i=0;i<subjects.length;i++){
        if(str.indexOf(subjects[i])>=0){
           name=subjects[i]+name;
           flag=false;
           //��ѧ:1������:2����ѧ:4������:8��Ӣ��:16
           var param;
           if(0==i){
             param=8;//����
           }else if(1==i){
             param=1;//��ѧ
           }else if(2==i){
             param=2;//����
           }else if(3==i){
              param=4;//��ѧ
           }else if(4==i){
               param=16;//Ӣ��
           }
           js='javascript:_footTools.createFootTool( '+param+' );';
           break;
        }
     }// end of for


     var h='<a href="'+js+'">'+name+'</a>';
     //alert(h);
     //alert(h+"  "+document.getElementById("navTool").innerHTML);
     document.getElementById("newTool").innerHTML=h;
     if(flag)
     document.getElementById("newTool").style.display="none";
     else
     document.getElementById("newTool").style.display="";
     */
}//end of 

//_footTools.createFootTool(str);
FootTools.prototype.createFootTool = function (param) {
    var status = '';
    try {
        IInformationOcx.ShowSubjectToolbars(false, 31);
        status = IInformationOcx.ShowSubjectToolbars(1, param);
    } catch (e) {
        alert("��������HiteBoard���ߣ�");
        window.status = status;
    }
    //alert(status);
}//end of footTools.createFootTool(str);
//����̴�����
FootTools.prototype.SysOsk = function () {
    ocx.playFile("C:\\WINDOWS\\system32\\osk.exe");
}
var _wb = new WhiteBoardObj();

//�װ����
function WhiteBoardObj() {
}

//�򿪰װ�
WhiteBoardObj.prototype.openWhiteBoard = function () {
    maskAll.style.display = 'block';
    location.href = "mybank://zzvcom";
    setTimeout(function () {
        maskAll.style.display = 'none';
    }, 1000);//��������������ڸǲ�
}

function userTool(name, method, id, className) {
    this.show = "none";
    this.className = className;
    if (name != null) this.name = name;
    if (method != null) this.method = method
    this.href = "#";
    if (id != null) this.id = id;
}