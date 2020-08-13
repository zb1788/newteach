var footTools = new FootTools();

function FootTools() {//�ײ�������
    this.templateId = "1";//ģ������Ĭ��ֵΪ1���Ӱװ�
    this.whiteBoardFlag = "2";//Ĭ��ֵΪ2
}

//���ðװ�����
FootTools.prototype.setWhiteBoardFlag = function () {
    this.whiteBoardFlag = "2";//Ĭ��ֵΪ2
    var urledu = "", urlbook = "";
    try {
        urlbook = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
        urledu = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
    } catch (e) {
        window.status = '���ע�����Ϣʧ�ܣ�';
    }
    if (urlbook.length > 0 && urledu.length > 0) {
        if (urlbook == urledu)
            this.whiteBoardFlag = 1;
        else
            this.whiteBoardFlag = 3;
    } else {
        this.whiteBoardFlag = 2;
    }
}
//��ʼ���ײ��������
FootTools.prototype.initFootTool = function () {
    document.getElementById("toolIcon").style.display = "block";
    this.setWhiteBoardFlag();
    _teachToolConfigObj.read();
    var toolList = new Array();
    for (var ti = 0; ti < _teachToolConfigObj.maxToolSize; ti++) {
        var classIndex = (ti + 3) % 4;
        if (classIndex == 0) {
            classIndex = 4;
        }
        toolList.push(new userTool("�Զ���" + (ti + 1), "_teachToolConfigObj.openExe(" + ti + ")", "teachToolConfigs.name" + ti, "bgc" + classIndex));
    }
    toolList.push(new userTool("�װ嶨λ", "footTools.toolposition();", "toolposition", "bgc1"));
    toolList.push(new userTool("�����¼", "footTools.clearImgCache()", "clearImgCache", "bgc2"));
    toolList.push(new userTool("���鹤��", "location.href=\"myexe://TRACEBook\"", "tools.whiteBoard", "bgc2"));
    toolList.push(new userTool("��ѧ����", "location.href=\"myexe://TRACEEdu\"", "tools.teach", "bgc4"));
    toolList.push(new userTool("�װ幤��", "location.href=\"myexe://TRACEBook\"", "newTool", "bgc4"));
    toolList.push(new userTool("�����", "footTools.SysOsk();", "tools.softkeyborard", "bgc3"));
    toolList.push(new userTool("U����Դ", "_usbObj.openUSBWindow(540,280)", "tools.usb", "bgc1"));
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
        if (1 == this.whiteBoardFlag) {
            //���
            if (tool.id == "newTool") tool.show = "";						//��ʾ�װ幤��
            if (tool.id == "clearImgCache") tool.show = "";              //��ʾ�����¼

            if (tool.id == "toolposition") tool.show = "";               //��ʾ�װ嶨λ
            if (tool.id == "tools.softkeyborard") tool.show = "none";   //���������
        } else if (3 == this.whiteBoardFlag) {
            //������
            if (tool.id == "tools.teach") tool.show = "";					//��ʾ��ѧ����
            if (tool.id == "tools.whiteBoard") tool.show = "";			//��ʾ�װ幤��

            if (tool.id == "toolposition") tool.show = "";				//��ʾ�װ嶨λ
            if (tool.id == "tools.softkeyborard") tool.show = "none";		//���������
        } else if (2 == this.whiteBoardFlag) {
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
    document.getElementById("tools").innerHTML = str;
}
//_footTools.clearImgCache();��������¼
FootTools.prototype.clearImgCache = function () {
    var stauts = 0;
    try {	 // �½�
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
    if (1 == this.whiteBoardFlag) {
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
//����̴�����
FootTools.prototype.SysOsk = function () {
    ocx.playFile("C:\\WINDOWS\\system32\\osk.exe");
}
//�ƴ�Ѷ�ɶԽӣ�������Դ
FootTools.prototype.LocalRes = function () {
    document.getElementById('localResDiv').style.display = 'block';
}
//_footTools.logout();
FootTools.prototype.logout = function () {
    try {
        IInformationOcx.FileNew(true);
    } catch (e) {
    }//end of try/catch
    location.href = "gobackmy://";
}
//�򿪰װ�
FootTools.prototype.openWhiteBoard = function () {
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