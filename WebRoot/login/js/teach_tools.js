//�û��Զ��幤��
var _teachToolConfigObj = new TeachToolConfigObj();

function TeachToolConfigObj() {
    this.length;//�û������ù�����
    this.maxToolSize = 5;//�������ù�����
    this.currType = null;//1-��� 2-����
    this.name = null;//Ӧ����
    this.path = null;//Ӧ��·��
    this.dzjc = "";//���ӽ̲�����
}//end of function
 //_teachToolConfigObj.checkLen(this);���Ӧ��������
TeachToolConfigObj.prototype.checkLen = function (obj, len) {
    obj.value = obj.value.trim();
    if (undefined == len) len = 4
    if (obj.value.length > len) {
        obj.value = obj.value.substring(0, len);
        _teachToolConfigObj.tip("�����������4���֣�");
    } else {
        _teachToolConfigObj.tip("");
    }
};//end of function 

//_teachToolConfigObj.selectFolder(0);  �û�ѡ��Ӧ�õ�·��
TeachToolConfigObj.prototype.selectFolder = function (index) {
    var path = ocx.SelectPath("1");
    //alert(path);
    if ('' != path) {
        document.getElementsByName("teachToolConfig_inputPanel_path")[index].value = path;
    }
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
};//end of function 
//_teachToolConfigObj.openWindow();
TeachToolConfigObj.prototype.openWindow = function () {
    document.getElementById('teachToolConfig.configWindow').style.display = "block";
    document.getElementById('teachToolConfig.tip').className = "";
    document.getElementById('teachToolConfig.tip').innerHTML = '';
    _teachToolConfigObj.updatePageByObject();
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
TeachToolConfigObj.prototype.closeWindow = function () {
    void (document.getElementById('teachToolConfig.configWindow').style.display = 'none');
    _sysConfg.openWindow();
}//end of function 


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
TeachToolConfigObj.prototype.read = function (url) {
    _teachToolConfigObj.currType = 2;//Ĭ��Ϊ2
    if (typeof (url) == "undefined" || url == null) {
        url = "config.ini";
    }
    _teachToolConfigObj.name = new Array();
    _teachToolConfigObj.name.length = 0;
    _teachToolConfigObj.path = new Array();
    _teachToolConfigObj.path.length = 0;
    var config_str = "";
    try {
        config_str = VCOMPlayer.ReadInfo("", url);
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
        if (names[ti].value != null && typeof (names[ti].value) != "undefined" && names[ti].value.length > 0) {
            _teachToolConfigObj.name[ti] = names[ti].value;
            _teachToolConfigObj.path[ti] = paths[ti].value;
        }
        //���������·����Ϊ�գ������
        if (names[ti].value == "", paths[ti].value == "") {
            _teachToolConfigObj.name[ti] = "";
            _teachToolConfigObj.path[ti] = "";
        }
    }
    _teachToolConfigObj.write();
}//end of function 
//_teachToolConfigObj.write();
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
        VCOMPlayer.WriteInfo("", url, content, 0);
    } catch (e) {
        alert("�����ļ�д��ؼ�����ʧ��" + e);
    }
    _teachToolConfigObj.tip("����ɹ���");
    top.location.reload();
}//end of function 
//_teachToolConfigObj.check();
TeachToolConfigObj.prototype.check = function () {
    if (1 == _teachToolConfigObj.currType) {//1-��� 2-����
        if (_teachTools.isInstallHongHeTool()) {
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
    var url = "";
    if (index >= 0 && index < 6) {
//		  url="\""+_teachToolConfigObj.path[index]+"\"";
        url = _teachToolConfigObj.path[index];
    } else {
        alert("�򿪽�ѧ���߳���" + index);
        return;
    }
    _teachTools.openExe(url);

};

//�򿪰�װĿ¼������ļ�
TeachToolConfigObj.prototype.openLocalExe = function (name) {
    //ocx.GetSpecialFolderPath(100) �ڿΰ�װĿ¼
    var url = ocx.GetSpecialFolderPath(100) + "/" + name;
    _teachTools.openExe(url);

};

//_teachToolConfigObj.load();
/*****��ѧ���� begin*******/
var _teachTools = new TeachTools();

function TeachTools() {

}

//�򿪽�ѧ����
TeachTools.prototype.openTeachTool = function () {
    var showmessage = "�����ɹ�,���ڴ�.......";
    try {
        waithtml.innerHTML = "<img src='images/extanim32.gif' /><span>�����������ߣ����Ժ�....</span>"
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
    waithtml.innerHTML = "<img src='images/extanim32.gif' /><span>" + showmessage + "</span>";
    window.setTimeout(function () {
        maskAllall.style.display = "none";
        waithtml.style.display = "none";
    }, 5000);
}


//�򿪰��鹤��
TeachTools.prototype.openBoardTool = function () {
    var showmessage = "�����ɹ�,���ڴ�.......";
    try {
        if (IInformationOcx.IsEnvironmentStart() == 0) {
            waithtml.innerHTML = "<img src='images/extanim32.gif' /><span>�����������ߣ����Ժ�....</span>"
            maskAllall.style.display = "";
            waithtml.style.display = "";
            var back = IInformationOcx.OpenOrCloseEnvironment(1);
            if (back == 0) {
                messagebox.innerHTML = "�������ʧ��..."
            }
            window.setTimeout(function () {
                maskAllall.style.display = "none";
            }, 1000);
        } else {

        }
    } catch (e) {
        try {
            waithtml.innerHTML = "<img src='images/extanim32.gif' /><span>�����������ߣ����Ժ�....</span>"
            maskAllall.style.display = "";
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
        waithtml.innerHTML = "<img src='images/extanim32.gif' /><span>" + showmessage + "</span>";
        window.setTimeout(function () {
            maskAllall.style.display = "none";
            waithtml.style.display = "none";
        }, 5000);
    }
};


//�򿪽�ѧ����
TeachTools.prototype.openExe = function (url) {
    url = "\"" + url + "\"";
    var showmessage = "�����ɹ�,���ڴ�.......";
    try {
        waithtml.innerHTML = "<img src='images/extanim32.gif' /><span>�����������ߣ����Ժ�....</span>"
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
    waithtml.innerHTML = "<img src='images/extanim32.gif' /><span>" + showmessage + "</span>";
    window.setTimeout(function () {
        maskAllall.style.display = "none";
        waithtml.style.display = "none";
    }, 2000);

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