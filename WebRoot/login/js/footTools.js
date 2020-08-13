var _footTools = new FootTools();
var whiteBoardFlag = 2;

function FootTools() {
}

//_footTools.clearImgCache();
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

//����̴�����
FootTools.prototype.SysOsk = function () {
    ocx.playFile("C:\\WINDOWS\\system32\\osk.exe");
}
FootTools.prototype.showqrcode = function () {

    var width = 270;
    var height = 352;
    var url = ocx.GetSpecialFolderPath(100) + "/plugins/showQRcode.html";
    var newUrl = "mybrowser://width:" + width + "&&height:" + height + "@@" + url;
    window.location.href = newUrl;
}
FootTools.prototype.qrcodeLogin = function () {

    var url = "qrcodeLogin.jsp";
    url = url + "?sso=" + encodeURIComponent(transferProtocol_web + _config["SSO"]);
    art.dialog.open(url, {
        esc: false,
        lock: true,
        title: false,
        cancel: false,
        width: '460px',
        height: '420px',
        id: 'qrcodeLogin',
        close: function () {
            if (art.dialog.data("result") == 1) {

                var url = transferProtocol_web + _config["PLS"] + "/newteach/index.do?userSetFlag=1";
                url += "&templateId=1";
                url += "&cssName=" + _common.cssName;
                url += "&currVersionid=";//this.currVersionid=versionid;//��¼��ǰ�û���ѡ��İ汾id
                url += "&whiteBoardFlag=";//�װ����� tianshibo =1
                url += '&mac=' + _macUtil.getMACAdd();//mac��ַ;
                url += "&pwd=";
                url += "&rememberPwd=";

                location.href = url;
                return;
            }
        }


    });
    return;
    var width = 410;
    var height = 410;
    var url = ocx.GetSpecialFolderPath(100) + "/qrcodeLogin.html";
    var newUrl = "mybrowser://width:" + width + "&&height:" + height + "@@" + url;
    window.location.href = newUrl;
}

//�����Ƿ���ʾ�Ž̹���
FootTools.prototype.youjiaoTool = function () {
    //�ж��Ž̹����Ƿ������� 1��������0δ����
    var youjiaoTool = 1;
    try {
        youjiaoTool = ocx.GetFileExists("ClientTools.exe");
    } catch (err) {
    }

    if (youjiaoTool == 0) {
        ocx.playFile(ocx.GetSpecialFolderPath(100) + "/plugins/ClientTools.exe");
    }
    //��ʾ�������Ž̹���
    var url = "http://127.0.0.1:" + getSocketPort() + "?showYoujiaoTool=true";
    $.ajax({
        url: url,
        type: "get",
        async: true,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        scriptCharset: "gbk",
        success: function (rdata) {

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {

        }
    });


}

//��ȡsocket�˿�
function getSocketPort() {
    var port = "9000";
    var config_str = "";
    try {
        config_str = ocx.ReadInfo("", "clientport.ini");
    } catch (err) {
    }
    if (config_str != "-1" && config_str.length > 1) {
        var configs = config_str.split(":");
        if (configs.length == 2) {
            if (configs[0] == "socketport") {
                //�ж�port�Ƿ�Ϊ����
                port = configs[1];
            }

        }
    }
    return port;
}

//�ƴ�Ѷ�ɶԽӣ�������Դ
FootTools.prototype.LocalRes = function () {
    document.getElementById('localResDiv').style.display = 'block';
}
//�ֻ��ļ���
FootTools.prototype.openPhoneFile = function () {
    try {
        ocx.OpenDirectory(JudgeWirelessNetworkCard1.GetFilePath());
    } catch (e) {
        //�ؼ��쳣
    }
}

//�򿪹���ҳ��
FootTools.prototype.openAbout = function () {
    //var windowsVersion = getWindowsVersion();
    try {
        //��ȡwindowsϵͳ�汾
        var windowsVersion = LessionOcx.GetOSType();
        //��ȡ�ڿζ˰汾
        var clientVersion = LessionOcx.GetClientVer();
        var devVersion = getDevVersion();
        //�Ƿ����°汾
        var hasNewVersion = false;
        var newVersionInfo = LessionOcx.GetNewVerInfo();
        //���°汾��
        var newVersionCode = "";
        //���°汾����·��
        var newVersionPath = "";
        //�ж��Ƿ����°汾
        if (newVersionInfo == '') {
            hasNewVersion = false;
        } else {
            hasNewVersion = true;
            var arr = newVersionInfo.split(",");
            newVersionCode = arr[0];
            newVersionPath = arr[1];
        }

        var aboutHtml = '<ul>';
        aboutHtml += '<li>�Ž��ڿΰ汾��' + clientVersion + '</li>';

        if (hasNewVersion) {
            newVersionPath = newVersionPath.replace(/\\/g, '\\\\');
            aboutHtml += '<li>���°汾' + '<a class="versionButton" onclick="updateVersion(\'' + newVersionCode + '\',\'' + newVersionPath + '\')">��������</a></li>';
        } else {
            aboutHtml += '<li>�����°汾</li>';
        }


        var devName = "";
        if (devVersion.indexOf('0') != -1) {
            devName = 'һ��������';
        } else if (devVersion == "1" || devVersion == "1,1") {
            devName = '��������������';
        } else if (devVersion.indexOf('2') != -1) {
            devName = '���ֽ�����';
        } else if (devVersion.indexOf('4') != -1) {
            devName = '�����豸';
        }
        aboutHtml += '<li>����ѧϰ���������ͺţ�' + devName + '</li>';

        if (devVersion.indexOf(',1') != -1) {
            //ֽ���豸
            aboutHtml += '<li>ֽ�ʿ��ý������ͺţ�������������AP</li>';
        }

        aboutHtml += '<li>windows�汾��' + windowsVersion + '</li>';
        aboutHtml += '<li><a style="color:#00008B;text-decoration:underline" href="#" onclick="openTheTool()">��˴��쳣��⹤��</a></li>';
        aboutHtml += '<li>��ѯ�绰��400-699-3111</li>';
        document.getElementById("aboutInfo").innerHTML = aboutHtml;

    } catch (e) {
        document.getElementById("aboutInfo").innerHTML = '���ؿؼ�ʧ��';
    }
    document.getElementById('aboutWindow').style.display = 'block';
}

//�����ڿζ˰汾
function updateVersion(newVer, strpath) {
    var flag = $(".versionButton").attr('disabled');
    if (flag == 'disabled') {
        return false;
    }
    $(".versionButton").attr('disabled', 'disabled');

    alert('��������������...�������!');
    try {
        LessionOcx.StartNewUpdate(newVer, strpath);
    } catch (e) {

    }
}

//��ȡ����������
function getDevVersion() {
    //0����һ����������1�Ƕ������������ޣ�2�����ֽ�����
    var deviceType = 0;//1���豸(֧�ֶ����׾����豸ʱĬ��ֵ); 0���豸(����); 2���ִ��⿨(֧�����ּ�);
    var config_str = "";
    try {
        config_str = ocx.ReadInfo("", "clientversion.ini");
    } catch (err) {
    }

    if (config_str != "-1" && config_str.length > 1) {
        var configs = config_str.split(":");
        if (configs.length == 2) {
            if (configs[0] == "devversion") {
                deviceType = configs[1];
            }

        }
    }
    return deviceType;
}

//��ȡwindows�汾
function getWindowsVersion() {
    var userAgentInfor = navigator.userAgent.toLowerCase(),
        windowsVersion = userAgentInfor.substr(userAgentInfor.indexOf('windows nt ') + 11, 4),
        nameVersion;
    windowsVersion = windowsVersion.replace(/\)/, '');
    if ("10.0" != windowsVersion && windowsVersion.length > 3) {
        windowsVersion = windowsVersion.substr(0, 3);
    }
    switch (windowsVersion) {
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
            nameVersion = '����';

    }
    return nameVersion;
}

FootTools.prototype.initBtn = function () {
    //ȷ���װ�����
    var urledu = "";
    var urlbook = "";
    try {
        urlbook = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
        //alert(urlbook);
        urledu = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
        //alert(whiteBoardPath.length);
    } catch (e) {
        window.status = '��õ��Ӱװ�����ʧ�ܣ�';
        alert('��õ��Ӱװ�����ʧ�ܣ�');
        //return whiteBoardFlag;
    }
    if (urlbook.length > 0 && urledu.length > 0) {
        if (urlbook == urledu)
            whiteBoardFlag = 1;
        else
            whiteBoardFlag = 3;
    } else {
        whiteBoardFlag = 2;//2-������ʾ 1-��ʾ��ѧ���� 3-��ʾ����
    }

    //��ʼ����ѧ������ 
    _teachToolConfigObj.read();
    //�������鹤�����
    //t1-8��ʽ(1U��,2���ֺ��ӣ�3Ǧ�ʣ�4Ƥ��,5�ֱʼ⣬6�鱾,7����,8�ı�����)
    var toolList = new Array();
    toolList.push(new userTool("��ά���½", "_footTools.qrcodeLogin()", "tools.qrcodeLogin", "t10"));
    toolList.push(new userTool("�ڿ�����", "_footTools.showqrcode()", "tools.qrcode", "t10"));
    toolList.push(new userTool("U����Դ", "_usbObj.openUSBWindow(540,280)", "tools.usb", "t1"));
    toolList.push(new userTool("������Դ", "_footTools.LocalRes();", "tools.bjzy", "t1"));
    toolList.push(new userTool("ϵͳ����", "_sysConfg.openWindow();", "tools.sysConfig", "t2"));
    toolList.push(new userTool("�����", "_footTools.SysOsk();", "tools.softkeyborard", "t3"));
    toolList.push(new userTool("�Ž̹���", "_footTools.youjiaoTool();", "tools.youjiaoTool", "t9"));
    toolList.push(new userTool("�Ž̿�ע��", "_common.openByIE(\"http://jyk.yjt361.com/index_te.jsp\");", "tools.ucardReg", "t6"));
    //toolList.push(new userTool("�쳣���","_teachToolConfigObj.openLocalExe(\"\\\\CheckPluginTools\\\\CheckPluginWin7.exe\");","tools.checktool","t9"));
    //toolList.push(new userTool("����WIFI","_teachToolConfigObj.openLocalExe(\"\\\\plugins\\\\vcomlink\\\\WifiInfo.exe\");","tools.wifi","t4"));
    toolList.push(new userTool("�ֻ��ȵ�", "_teachToolConfigObj.openLocalExe(\"\\\\plugins\\\\vcomlink\\\\connectphone.exe\");", "tools.phoneAp", "t5"));
    toolList.push(new userTool("�ֻ��ļ�", "_footTools.openPhoneFile();", "tools.phoneFile", "t6"));
    toolList.push(new userTool("����", "_footTools.openAbout();", "tools.about", "t2"));

    //toolList.push(new userTool("��ѧ����","location.href=\"myexe://TRACEEdu\"","tools.teach","t8"));
    //toolList.push(new userTool("�װ幤��","location.href=\"myexe://TRACEBook\"","newTool","t7"));

    //toolList.push(new userTool("���鹤��","location.href=\"myexe://TRACEBook\"","tools.whiteBoard","t8"));
    //toolList.push(new userTool("�����¼","_footTools.clearImgCache()","clearImgCache","t9"));

    //toolList.push(new userTool("�װ嶨λ","_footTools.toolposition();","toolposition","t8"));
    //toolList.push(new userTool("�װ嶨λ","_footTools.toolposition();","toolposition","t8"));

    for (var ti = 0; ti < _teachToolConfigObj.maxToolSize; ti++) {
        var classIndex = (ti + 3) % 4;//��4��ѭ����t9��ʼ
        classIndex = classIndex + 6;
        toolList.push(new userTool("�Զ���" + (ti + 1), "_teachToolConfigObj.openExe(" + ti + ")", "teachToolConfigs.name" + ti, "t" + classIndex));
    }
    //ͨ���ؼ���鱾���Ƿ���wifi,�Ƿ���ʾ�ֻ�wifi��������ť
    var ifwifi = false;

    try {
        ifwifi = JudgeWirelessNetworkCard1.IsHaveWirelessCard();
    } catch (e) {
        //δ��װ���wifi�ؼ�
    }


    for (var i = 0; i < toolList.length; i++) {
        var tool = toolList[i];
        //Ĭ����ʾU�̹��ߣ�ϵͳ���ã������
        if (tool.id == "tools.qrcode") {
            try {
                if (LessionOcx.IsSchoolbag() == 1) {
                    tool.show = "";//��������ڿζ� ��ʾ��ά��
                }
            } catch (e) {
            }
        }
        if (tool.id == "tools.checktool") tool.show = "";
        if (tool.id == "tools.qrcodeLogin") tool.show = "";//��ʾ��ά���½
        if (tool.id == "tools.sysConfig") tool.show = "";//��ʾϵͳ����
        if (tool.id == "tools.usb") tool.show = "";		//��ʾU����Դ
        if (tool.id == "tools.softkeyborard") tool.show = "";	//��ʾ�����
        if (tool.id == "tools.youjiaoTool") tool.show = "";	//�Ž̹����Ƿ���ʾ
        if (tool.id == "tools.ucardReg") tool.show = "";	//�Ž̿�ע��
        //����жԽӿƴ�Ѷ�ɣ�����ʾ������Դ����U����Դ
        if (_teachToolConfigObj.dzjc != null && _teachToolConfigObj.dzjc != "null" && _teachToolConfigObj.dzjc != "") {
            if (tool.id == "tools.usb") tool.show = "none";
            if (tool.id == "tools.bjzy") tool.show = "";
        } else {
            if (tool.id == "tools.usb") tool.show = "";
            if (tool.id == "tools.bjzy") tool.show = "none";
        }

        //�ֻ�wifi��ť����
        if (tool.id == "tools.wifi" || tool.id == "tools.phoneAp" || tool.id == "tools.phoneFile") {
            if (ifwifi) {
                tool.show = "";
            } else {
                tool.show = "none";
            }
        }

        if (tool.id == "tools.about") {
            tool.show = "";
        }

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
        str += "<a href='javascript:" + tool.method + "'><span class=" + tool.className + "></span>" + tool.name + "</a>";
    }
    document.getElementById("tools").innerHTML = str;
    _tUtil.whiteBoardFlag = whiteBoardFlag;
}//end of initBtn
 //�û����幤�߶���
function userTool(name, method, id, className) {
    this.show = "none";
    this.className = className;
    if (name != null) this.name = name;
    if (method != null) this.method = method
    this.href = "#";
    if (id != null) this.id = id;
}

//�򿪼�⹤��
function openTheTool() {
    if ("window xp" == getWindowsVersion()) {
        _teachToolConfigObj.openLocalExe("\\CheckPluginToolsXP\\CheckPluginXP.exe");
    } else {
        _teachToolConfigObj.openLocalExe("\\CheckPluginTools\\CheckPluginWin7.exe");
    }
}