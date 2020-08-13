//��ѧ���߶���
var _teachToolConfigObj = new TeachToolConfigObj();

function TeachToolConfigObj() {
    this.length;//�û������ù�����
    this.maxToolSize = 5;//�������ù�����
    this.currType;//1-��� 2-����
    this.name = null;//Ӧ����
    this.path = null;//Ӧ��·��
    this.dzjc = "";//���ӽ̲�����
}

//_teachToolConfigObj.selectFolder(0);ѡ��Ӧ�ó���·��
TeachToolConfigObj.prototype.selectFolder = function (index) {
    var path = ocx.SelectPath("1");
    if ('' != path) document.getElementsByName("teachToolConfig_inputPanel_path")[index].value = path;
}//end of function 
 //_teachToolConfigObj.tip();
TeachToolConfigObj.prototype.tip = function (tip) {
    if ('' == tip || undefined) {
        document.getElementById('teachToolConfig.tip').className = "";
        document.getElementById('teachToolConfig.tip').innerHTML = '';
    } else {
        document.getElementById('teachToolConfig.tip').className = "tipsInfo";
        document.getElementById('teachToolConfig.tip').innerHTML = tip;
    }
};
//��ʾ��ѧ����ѡ�����
TeachToolConfigObj.prototype.openWindow = function () {
    document.getElementById('sysConfig.window').style.display = "none";
    document.getElementById('teachToolConfig.configWindow').style.display = "block";
    if (isAllowSimpleHotKey) _simpleHotKey.pid = 'teachToolConfig.configWindow';
    document.getElementById('teachToolConfig.tip').className = "";
    document.getElementById('teachToolConfig.tip').innerHTML = '';
    _teachToolConfigObj.updatePageByObject();//���ݽ�ѧ���߶���ˢ�½�ѧ�����������
}
//�رս�ѧ�������
TeachToolConfigObj.prototype.closeWindow = function () {
    document.getElementById('sysConfig.window').style.display = "block";
    void (document.getElementById('teachToolConfig.configWindow').style.display = 'none');
    if (isAllowSimpleHotKey) _simpleHotKey.pid = "sysConfig.window"; // 
    _sysConfg.openWindow();
};
//_teachToolConfigObj.updatePageByObject();����������ӳ�䵽ҳ��
TeachToolConfigObj.prototype.updatePageByObject = function () {
    var names = document.getElementsByName("teachToolConfig_inputPanel_name");
    var paths = document.getElementsByName("teachToolConfig_inputPanel_path");
    for (var i = 0; i < names.length; i++) {
        if (_teachToolConfigObj.name[i] && _teachToolConfigObj.name[i].length > 0) {
            names[i].value = _teachToolConfigObj.name[i];
            paths[i].value = _teachToolConfigObj.path[i];
        }
    }
}//end of function 
//_teachToolConfigObj.read(url);   �������ļ�������û�����
TeachToolConfigObj.prototype.read = function () {
    var url = "config.ini";
    _teachToolConfigObj.name = new Array();
    _teachToolConfigObj.name.length = 0;
    _teachToolConfigObj.path = new Array();
    _teachToolConfigObj.path.length = 0;
    var config_str = "";
    try {
        config_str = ocx.ReadInfo("", url);
    } catch (e) {
    }
    var configs = config_str.split(";");
    for (var i = 0; i < configs.length; i++) {
        var config_pair = configs[i].split("=");
        var name = config_pair[0];
        name = name.replace("\r\n", "");
        var value = config_pair[1];
        //�װ�����  1-honghe 2,����
        if ("teachToolConfigs.currType" == name) {
            _teachToolConfigObj.currType = value;
        }
        if ("teachToolConfigs.dzjc" == name && value != null && value != "null") {
            _teachToolConfigObj.dzjc = value;
        }
        if (name.indexOf("teachToolConfigs.name") > -1) {
            if (value.length > 0) _teachToolConfigObj.length++;//���������ù�����
            var tollIndex = Number(name.substring(21, name.length));//��ȡ���ù��߱��
            if (tollIndex != NaN) {
                _teachToolConfigObj.name[tollIndex] = value;
            }
        } else if (name.indexOf("teachToolConfigs.path") > -1) {
            var tollIndex = parseInt(name.substring(21, name.length));//��ȡ���ù��߱��
            if (tollIndex != NaN) {
                _teachToolConfigObj.path[tollIndex] = value;
            }
        }
    }//end of for 
};

//_teachToolConfigObj.updatePage();����������ӳ�䵽ҳ��
TeachToolConfigObj.prototype.updateObjectByPage = function () {
    var names = document.getElementsByName("teachToolConfig_inputPanel_name");
    var paths = document.getElementsByName("teachToolConfig_inputPanel_path");

    for (var ti = 0; ti < _teachToolConfigObj.maxToolSize; ti++) {

        if (names[ti].value != null && typeof (names[ti].value) != "undefined") {
            _teachToolConfigObj.name[ti] = names[ti].value;
            _teachToolConfigObj.path[ti] = paths[ti].value;
        } else {
            _teachToolConfigObj.name[ti] = "";
            _teachToolConfigObj.path[ti] = "";
        }
    }
    _teachToolConfigObj.write();
}//end of function 
TeachToolConfigObj.prototype.write = function (url) {
    if (typeof (url) == "undefined" || url == null) {
        url = "config.ini";
    }
    var flag = _teachToolConfigObj.check();
    //alert("flag"+flag);
    if (!flag) {
        return;
    }
    _teachToolConfigObj.tip("");
    var content = "teachToolConfigs.currType=" + this.currType + ";";
    content += "teachToolConfigs.dzjc=" + this.dzjc + ";";
    for (var i = 0; i < this.maxToolSize; i++) {
        if (_teachToolConfigObj.name[i] == null) {
            _teachToolConfigObj.name[i] = "";
        }
        if (_teachToolConfigObj.path[i] == null) {
            _teachToolConfigObj.path[i] = "";
        }
        content += "teachToolConfigs.name" + i + "=" + _teachToolConfigObj.name[i] + ";";
        content += "teachToolConfigs.path" + i + "=" + _teachToolConfigObj.path[i] + ";";
    }//end of for	
    try {
        ocx.WriteInfo("", url, content, 0);
    } catch (e) {
        alert("�����ļ�д��ؼ�����ʧ��" + e);
    }
    _teachToolConfigObj.tip("����ɹ���");
    top.location.reload();
}//end of function  
TeachToolConfigObj.prototype.isNotEmpty = function (str) {
    if (str.length > 0) {
        return true;
    } else {
        return false;
    }
};
TeachToolConfigObj.prototype.isEmpty = function (str) {
    if (str.length > 0) {
        return false;

    } else {
        return true;
    }
};
//_teachToolConfigObj.check();//����û������Ƿ�Ϸ�
TeachToolConfigObj.prototype.check = function () {
    if (1 == _teachToolConfigObj.currType) {//1-��� 2-����
        // 
        if (_teachTools.isInstallHongHeTool()) {
            //return true;// this.currType;
        } else {
            _teachToolConfigObj.tip("���Ȱ�װ��ϰװ壡");
            return false;

        }
    }//end of if   
    var names = document.getElementsByName("teachToolConfig_inputPanel_name");
    var paths = document.getElementsByName("teachToolConfig_inputPanel_path");
    var hasValue = 0;
    for (var i = 0; i < names.length; i++) {
        if (this.isNotEmpty(paths[i].value)) {
            hasValue++;
        }
        if (this.isNotEmpty(names[i].value)) {
            //alert('fd');
            hasValue++;
        }
        if (0 != (hasValue % 2)) {
            _teachToolConfigObj.tip("������Ϸ���ѧ��������");
            return false;
        }
    }//end of for		
    for (var i = 0; i < names.length; i++) {
        if (this.isEmpty(names[i].value)) {
            if (this.isNotEmpty(paths[i].value)) {
                return false;
            }
        }
        if (this.isNotEmpty(names[i].value)) {
            //alert('sb');
            //alert('sb'+this.isEmpty(paths[i].value));
            if (this.isEmpty(paths[i].value)) {
                return false;
            }
        }
        _teachToolConfigObj.tip();
    }//end of for	
    return true;
};
//�򿪽�ѧ����
TeachToolConfigObj.prototype.openExe = function (index) {
    //alert("index="+index );
    if (index < 0 || index > this.path.length - 1) {
        alert("�򿪽�ѧ���߳���" + index);
        return;
    } else {
        url = _teachToolConfigObj.path[index];
    }
    _teachTools.openExe(url);
};
//_teachToolConfigObj.load(); 
/*****��ѧ���� begin*******/
var _teachTools = new TeachTools();

function TeachTools() {
}

//�򿪽�ѧ���� _teachTools.openTeachTool();
TeachTools.prototype.openTeachTool = function () {
    var showmessage = "�����ɹ�,���ڴ�.......";
    try {
        waithtml.innerHTML = "<img src='" + transferProtocol_web + _config["PLS"] + "/images/extanim32.gif' /><span>�����������ߣ����Ժ�....</span>"
        maskAllall.style.display = "";
        waithtml.style.display = "";
        var urlbook = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
        var ret = ocx.playFile(urlbook);
        switch (ret) {
            case -1:
                showmessage = "����ʧ��....";
                break;
            case -2:
                showmessage = "����ʧ��....";
                break;
            case -3:
                showmessage = "����ʧ��....";
                break;
        }
    } catch (e) {
    }
    waithtml.innerHTML = "<img src='" + transferProtocol_web + _config["PLS"] + "/images/extanim32.gif' /><span>" + showmessage + "</span>";
    window.setTimeout(function () {
        maskAllall.style.display = "none";
        waithtml.style.display = "none";
    }, 5000);

}


//�򿪰��鹤�� ���
TeachTools.prototype.openBoardTool = function () {
    try {

        //1. OpenOrCloseEnvironment������ ������1Ϊ���ļ���2Ϊ�ر��ļ�������ֵ1Ϊ �ɹ���0Ϊʧ�ܡ����⣬�ڴ��ļ��ɹ����ȵ��������������˲ŷ���1�����ڼ�ҳ �治���������������κβ����������������ڼ���ģ��򿪽�������
        //2. IsEnvironmentStart�����жϳ����Ƿ����������������������1�����򷵻�0	
        //���
        if (IInformationOcx.IsEnvironmentStart() == 0) {
            waithtml.innerHTML = "<img src='" + transferProtocol_web + _config["PLS"] + "/images/extanim32.gif' /><span>�����������ߣ����Ժ�....</span>"
            waithtml.style.display = "";
            maskAllall.style.display = "";
            var back = IInformationOcx.OpenOrCloseEnvironment(1);
            if (back == 0) {
                messagebox.innerHTML = "�������ʧ��..."
            }
            window.setTimeout(function () {
                waithtml.style.display = "none";
                maskAllall.style.display = "none";
            }, 1000);
        } else {

        }
    } catch (e) {
        var showmessage = "�����ɹ�,���ڴ�.......";
        //��ʿ��
        try {
            waithtml.innerHTML = "<img src='" + transferProtocol_web + _config["PLS"] + "/images/extanim32.gif' /><span>�����������ߣ����Ժ�....</span>"
            maskAllall.style.display = "";
            waithtml.style.display = "";
            var urlbook = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
            var ret = ocx.playFile(urlbook);
            switch (ret) {
                case -1:
                    showmessage = "����ʧ��....";
                    break;
                case -2:
                    showmessage = "����ʧ��....";
                    break;
                case -3:
                    showmessage = "����ʧ��....";
                    break;
            }
        } catch (e) {
        }
        waithtml.innerHTML = "<img src='" + transferProtocol_web + _config["PLS"] + "/images/extanim32.gif' /><span>" + showmessage + "</span>";
        window.setTimeout(function () {
            maskAllall.style.display = "none";
            waithtml.style.display = "none";
        }, 5000);
        //location.href="myexe://TRACEBook";
    }
};
//�򿪽�ѧ����
TeachTools.prototype.openExe = function (url) {
    //alert("openExeurl="+url);
    var showmessage = "�����ɹ�,���ڴ�.......";
    try {
        waithtml.innerHTML = "<img src='" + transferProtocol_web + _config["PLS"] + "/images/extanim32.gif' /><span>�����������ߣ����Ժ�....</span>"
        maskAllall.style.display = "";
        waithtml.style.display = "";
        var ret = ocx.playFile(url);
        switch (ret) {
            case -1:
                showmessage = "����ʧ��....";
                break;
            case -2:
                showmessage = "����ʧ��....";
                break;
            case -3:
                showmessage = "����ʧ��....";
                break;
        }
    } catch (e) {
    }
    waithtml.innerHTML = "<img src='" + transferProtocol_web + _config["PLS"] + "/images/extanim32.gif' /><span>" + showmessage + "</span>";
    window.setTimeout(function () {
        maskAllall.style.display = "none";
        waithtml.style.display = "none";
    }, 5000);

};
//�Ƿ�װ�˺�Ϲ��� _teachTools.isInstallHongHeTool();
TeachTools.prototype.isInstallHongHeTool = function () {
    try {
        // �½�
        if (IInformationOcx.IsEnvironmentStart() == 1) {
            return true;
        } else {
            //alert("���������װ幤�ߣ�");
            return true;
        }

    } catch (e) {
        return false;
    }
};
/*****��ѧ���� end*******/