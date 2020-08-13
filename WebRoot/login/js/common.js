var templateId = "1";//ģ��id
/********  ���� begin*********/

function CommonObj() {
    this.currServerPath;
    this.cssName;
    this.teacherId;
    this.statUrl;//ͳ�Ƶ�ַ
    this.iePath;//ie��ַ
    this.loginMarginHeight = 0;//��½�����Ƹ߶�
}

var _common = new CommonObj();
CommonObj.prototype.openByIE = function (url) {
    if (null == this.iePath || "" == this.iePath) {
        this.iePath = this.getIEPath();
        if ("" == this.iePath) {
            alert("����ie���������");
            return;
        }
    }
    var path = '\"' + this.iePath + '\"' + " " + url;
    var ret = ocx.playFile(path);
}
CommonObj.prototype.getIEPath = function () {
    return document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\IEXPLORE.EXE\\");
}
//_common.count(channelCode) 
CommonObj.prototype.count = function (channelCode) {
    // http://192.168.104.196:3129/stat/a.html?c=pls&rc=&mc=0001110101
    //  http://192.168.104.196:3129/stat/a.html?c=�û��ʺ�&rc=��Դcode&mc=��Ŀ���
    var url = this.statUrl + '?'
    url += 'c=' + this.teacherId;//�û��ʺ�
    url += '&rc=';//��Դ
    url += '&mc' + channelCode;//��Ŀ���
    //alert(url);
    //alert(document.getElementById('iframe_count').src);

    document.getElementById('iframe_count').src = url;
// alert(document.getElementById('iframe_count').src);
};

//_common.setTeacherId() 
CommonObj.prototype.setTeacherId = function (teacherId) {
    this.teacherId = teacherId;
};
//_common.getTeacherId() 
CommonObj.prototype.getTeacherId = function () {
    return this.teacherId;
};
//���ð汾_common.setVersion(sysVersion) 
CommonObj.prototype.setVersion = function (sysVersion) {
    //�汾����ʾ�ڿͻ������Ͻ�		  
    var versionshow = document.getElementById("versionshow");
    versionshow.innerHTML = "��ǰ�ͻ��˰汾��V" + _common.loadversionxml();
    var cVersion = versionshow.innerText;
    //versionshow.style.left=document.documentElement.clientWidth-cVersion.length*13;
    //versionshow.style.top=20;
    versionshow.innerHTML += "<br>��ǰϵͳ�汾��" + sysVersion;
    versionshow.innerHTML += "<br>�ؼ��汾��" + ocx.GetVersion();
};

CommonObj.prototype.initPage = function () {
    setMainTeachSeverPath('null');
    //_common.setCurrServerPath('');
    _loginObj.maxAccounts = 10;

    _tUtil.templateId = "1";//ģ��id

    document.onselectstart = function () {
        return false;
    }
    document.onkeydown = tokeyDown;

    function tokeyDown(e) {
        var keyval = event.keyCode;
        if (keyval == 8) {
            if (document.activeElement) {
                if (document.activeElement.tagName != "INPUT") {
                    return false;//��������˼��� ��ʱ���ε�
                }
            }
        }
    }

    document.onmouseover = function () {
        var obj = event.srcElement;
        if (obj.name != 'history_user' && obj.id != 'del_icon' && obj.id != 'del_icon_img') {
            _loginObj.hideDelButton();
        }
    };
    _loginObj.setActInputObj(document.getElementById("login.username"));
    _common.initPageStyle();
    _loginObj.getHistoryUser();
}
//_common.initPageStyle() ����ҳ������ݸ߶�
CommonObj.prototype.initPageStyle = function () {

    //�رհ�ť��ʾ�ڿͻ������½�
    document.getElementById("closePC").style.top = $(window).height() - 65;

    var zoomSize = window.screen.height / 768;
    $(".picBox").css("zoom", zoomSize);
    $(".loginBox").css("zoom", zoomSize);
    $(".tools").css("height", zoomSize * 90 + "px");
    $(".tools a").css("zoom", zoomSize);
    $("#userName").css("zoom", zoomSize);
    $("#copyrightimg").css("zoom", zoomSize);

    //��ҳ��������Ӹ�����
    /*
 if(document.documentElement.clientHeight>810){
     _common.loginMarginHeight=Math.round((document.documentElement.clientHeight-800)/8)-20;

     $(".loginBox").css("marginTop",_common.loginMarginHeight);
     $(".tools").css("marginTop",_common.loginMarginHeight);
     $("#copyrightimg").css("marginTop",_common.loginMarginHeight);
     
    //document.getElementById("loginBox").style.marginTop= _common.loginMarginHeight;
    //document.getElementById("tools").style.marginTop= _common.loginMarginHeight;

    
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
    */
    window.setTimeout('document.getElementById("closePC").style.top=document.documentElement.clientHeight-50', 500);

    //$(".loginBox").css("zoom",window.screen.height/1024);
    _loginObj.setUserNamePlaceHolder();
    _loginObj.setPassWordPlaceHolder();
}
//_common.getCurrServerPath() ��÷�����·��
CommonObj.prototype.getCurrServerPath = function () {
    //return this.getCurrServerPath2();
    var url = '';
    var eFlag = false;
    var url;
    var url2;
    var config_str;
    try {
        config_str = config_str = VCOMPlayer.ReadInfo("", "showkeip.ini");
        if ('-1' == config_str) eFlag = true;
    } catch (e) {
        //alert(eFlag);
        eFlag = true;
    }//end of try-catch
    try {
        //alert(config_str);
        if (config_str.length <= 1) {
            //alert(config_str.length);
            eFlag = true;
        } else {
            var configs = config_str.split(";");
            for (var i = 0; i < configs.length; i++) {
                // alert(configs[i]);
                var config_pair = configs[i].split("=");
                var name = config_pair[0];
                //alert(name);
                var value = config_pair[1];

                if ("showke.school_url" == name) {
                    //  alert(value);
                    //school_url=value;
                    url = value;

                } else if ("showke.city_url" == name) {
                    url2 = value;

                }
            }//end of for
        }
    } catch (e) {

    }//end of try-catch

    if (eFlag) {
        try {
            url = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL");

        } catch (e) {
            window.status = '�ڿ�IP�ؼ����󣡣�';
            alert('�ڿ�IP�ؼ�����');
            //return whiteBoardFlag;
        }
    }
    var endI = url.lastIndexOf('newteach');
    if (endI < 0) {
        endI = url.lastIndexOf('teach');
    }

    url = url.substring(0, endI);
    return url;

};
//���÷�����·��
CommonObj.prototype.setCurrServerPath = function (path) {
    var url = '';
    try {
        url = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL");
    } catch (e) {
    }
    //alert(url);

    var endI = url.lastIndexOf('newteach');
    if (endI < 0) {
        endI = url.lastIndexOf('teach');
    }

    url = url.substring(0, endI);
    this.currServerPath = url;
    //alert(url);


};
//���÷�����·��
CommonObj.prototype.getCurrServerPath2 = function () {
    var url = '';
    var eFlag = false;
    var url;
    var url2;
    var config_str;
    try {
        config_str = config_str = VCOMPlayer.ReadInfo("", "showkeip.ini");
        if ('-1' == config_str) eFlag = true;
    } catch (e) {
        //alert(eFlag);
        eFlag = true;
    }//end of try-catch
    try {
        //alert(config_str);
        if (config_str.length <= 1) {
            //alert(config_str.length);
            eFlag = true;
        } else {
            var configs = config_str.split(";");
            for (var i = 0; i < configs.length; i++) {
                // alert(configs[i]);
                var config_pair = configs[i].split("=");
                var name = config_pair[0];
                //alert(name);
                var value = config_pair[1];

                if ("showke.school_url" == name) {
                    //  alert(value);
                    //school_url=value;
                    url = value;

                } else if ("showke.city_url" == name) {
                    url2 = value;

                }
            }//end of for
        }
    } catch (e) {

    }//end of try-catch

    if (eFlag) {
        try {

            url2 = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL2");

            // alert(url2);
        } catch (e) {
            window.status = '�ڿ�IP�ؼ����󣡣�';
            alert('�ڿ�IP�ؼ�����');
            //return whiteBoardFlag;
        }
    }
    url = url2;
    var endI = url.lastIndexOf('newteach');
    if (endI < 0) {
        endI = url.lastIndexOf('teach');
    }

    url = url.substring(0, endI);
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


//��������·�� _common.getMainTeachSeverPath();
CommonObj.prototype.getMainTeachSeverPath = function () {
    if ("error" == main_teach_path) return '';
    else return main_teach_path;
};

function getMainTeachSeverPath() {


}

//�˳�ϵͳ _common.exitSystem();
CommonObj.prototype.exitSystem = function () {
    location.href = "close://";
};
//ϵͳ��ʱ _common.timeout(xmlHttp);
CommonObj.prototype.timeout = function (req) {
    if (req != null && req != "undefined") {
        //alert(xmlHttp.responseText=="");

        if (req.responseText == "") {
            // location.href="index.html?timeout=true";
        }//��ʱ
    } else {

        //location.href="index.html?timeout=true";//��ʱ
    }
};
//_common.createId();
CommonObj.prototype.createId = function (row, line) {
    return "index_" + row + "_" + line;
};
//_common.loadversionxml();
CommonObj.prototype.loadversionxml = function () {
    var str = "";
    try {
        str = VCOMPlayer.ReadInfo("", "../ClientInfo.xml");
        var reg = /<softver>(.*?)<\/softver>/g;
        var arr = reg.exec(str);
        return arr[1];
    } catch (e) {
        return -1;
    }
}
/*********  ���� end*********/


/********  ҳ�������� begin*********/
var _pm = new PagMemoryObj();

function PagMemoryObj() {
    this.pageFlag = 0;
}

//���뵱ǰ�������еĻҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-֪ʶ��չ 3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ   _pm.putActMainPage(1)
PagMemoryObj.prototype.putActMainPage = function (pageFlag) {
    this.pageFlag = pageFlag;
};
//ȡ����ǰ�������еĻҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-֪ʶ��չ 3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ 
PagMemoryObj.prototype.getActMainPage = function () {
    return this.pageFlag;
};
/*********  ҳ�������� end*********/


/********  ���� begin*********/
var _mask = new MaskObj();

function MaskObj() {
    this.id = "maskAll";
}

//�����ֲ� _mask.openMask()
MaskObj.prototype.openMask = function () {
    //alert("style:"+ document.getElementById(this.id).style.display);
    document.getElementById(this.id).style.display = "block";
};

//�ر����ֲ�
MaskObj.prototype.closeMask = function () {
    document.getElementById(this.id).style.display = "none";
};

//_mask.isVisible()�Ƿ�ɼ��� true �ɼ���false���ɼ�
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
/*********  ����  end*********/


/********  ҳ������ begin*********/
var _pMain = new PageMainObj();

function PageMainObj() {
    this.id = "bg";
}

//_pMain.resStyle()
PageMainObj.prototype.resStyle = function () {
    var h = "<div class=\"mainLeft\" id=\"mainLeft\"></div><div class=\"mainRight\" id=\"mainRight\"></div>";

    //<!-- 1-����2-TV -->

    /****�޸���ʽ begin*******/
    var css = "containers setBg1";
    if (_tUtil.templateId == 2)
        css = "containers setBg2";

    document.getElementById(this.id).className = css;
    /****�޸���ʽ end*******/
    this.getMain().innerHTML = h;
};

//��ʦ��չ��ʽ�����div _pMain.keStyle()
PageMainObj.prototype.keStyle = function () {
    //<!-- 1-����2-TV -->

    /****�޸���ʽ begin*******/
    var css = "containers setBg1";
    if (_tUtil.templateId == 2)
        css = "containers setBg2";

    document.getElementById(this.id).className = css;
    /****�޸���ʽ end*******/


    var h = "<div class=\"mainLeft\" id=\"mainLeft\"></div><div class=\"mainRight\" id=\"mainRight\" ></div>";
    h += "<div class=\"clearfix\"></div>";

    this.getMain().innerHTML = h;
    //if(isAllowSimpleHotKey) _simpleHotKey.pid='main'; 
};

//_pMain.usbStyle()
PageMainObj.prototype.usbStyle = function () {
    //<!-- 1-����2-TV -->
    /****�޸���ʽ begin*******/
    var css = "containers setBg3";
    if (_tUtil.templateId == 2)
        css = "containers setBg4";

    document.getElementById(this.id).className = css;
    /****�޸���ʽ end*******/
};

//_pMain.folderStyle()
PageMainObj.prototype.folderStyle = function () {
    //<!-- 1-����2-TV -->
    /****�޸���ʽ begin*******/
    var css = "containers setBg5";
    if (_tUtil.templateId == 2)
        css = "containers setBg6";

    document.getElementById(this.id).className = css;
    /****�޸���ʽ end*******/
};
//_pMain.netToolsStyle()
PageMainObj.prototype.netToolsStyle = function () {
    //<!-- 1-����2-TV -->
    /****�޸���ʽ begin*******/
    var css = "containers setBg5";
    if (_tUtil.templateId == 2)
        css = "containers setBg6";

    document.getElementById(this.id).className = css;
    /****�޸���ʽ end*******/
};


//_pMain.liveStyle() ֱ����ʽ
PageMainObj.prototype.liveStyle = function () {
    //<!-- 1-����2-TV -->
    /****�޸���ʽ begin*******/
    var css = "containers setBg7";
    if (_tUtil.templateId == 2)
        css = "containers setBg8";

    document.getElementById(this.id).className = css;
    /****�޸���ʽ end*******/
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

//_pMain.getRightResList()   <ul class="resList" id="resList"></ul>//�Ҳ���Դ
PageMainObj.prototype.getRightResList = function () {
    return document.getElementById("resList");
};

// _pMain.getRightResPage()   <div class="page" id="resPage"></div>//��Դ��ҳ
PageMainObj.prototype.getRightResPage = function () {
    return document.getElementById("resPage");
};
/********* ҳ������ end*********/
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/* 
cssName  ����֧�ִ��� 
type:����ʽ1�滻ͼƬ��2�滻ͼƬ��footTool.js��3 ����js��4�ض���

*/
var areaConfigMap = {
    "cq9xt": {type: 1, url: "area/cq9xt/", imgs: "copy,logo"},//����FootTool,img:
    "hhht": {type: 1, url: "area/hhht/", imgs: "copy,logo"},//����FootTool,img:copy,logo
    "jzzzq": {type: 2, url: "area/jzzzq/", imgs: "copy,logo"},//����img:copy,logo
    "lingwu": {type: 1, url: "area/lingwu/", imgs: "logo"},//����FootTool,img:logo
    "nantong": {type: 4, url: "area/nantong/index.html"},//������ҳ
    "nanwei": {type: 1, url: "area/nanwei/", imgs: "copy,logo"},//����FootTool,img:copy,logo
    "yongcheng": {type: 2, url: "area/yongcheng/", imgs: "copy,logo"},//����FootTool,img:copy,logo
    "yunxiao": {type: 1, url: "area/yunxiao/", imgs: "logo"},//����FootTool,img:logo
    "zhengzhou": {type: 2, url: "area/zhengzhou/", imgs: "copy,logo"},//����img:copy,logo
    "tongyong": {type: 2, url: "area/tongyong/", imgs: "copy,logo"}//Ĭ��img:copy,logo
};
//��ȡ����cssName,��д��_common.cssName,Ĭ��tongyong
try {
    _common.cssName = "tongyong";
    if (window.location.href.indexOf("cssName=") > 0) {
        var css = window.location.href.substring(window.location.href.indexOf("cssName=") + 8);
        if (css.indexOf("&") > 0) {
            css = css.substring(0, css.indexOf("&"));
        }
        _common.cssName = css;
    }
} catch (e) {
    alert("չʾ���������쳣��" + e);
}
//����cssName������
try {
    if (areaConfigMap[_common.cssName]) {
        if (1 == areaConfigMap[_common.cssName].type) {
            $(function () {
                if (areaConfigMap[_common.cssName].imgs.indexOf("copy") > -1) {
                    $("#copyrightimg").attr("src", "area/" + _common.cssName + "/images/copyright.png?mr=" + Math.round(Math.random() * 10000));
                }
                if (areaConfigMap[_common.cssName].imgs.indexOf("logo") > -1) {
                    $("#logoimg").attr("src", "area/" + _common.cssName + "/images/logo.png?mr=" + Math.round(Math.random() * 10000));
                }
                //���¼��ض��ư�ť
                $.getScript("area/" + _common.cssName + "/js/footTools.js", function () {
                    _footTools.initBtn();
                });
            });
        } else if (2 == areaConfigMap[_common.cssName].type) {
            $(function () {
                if (areaConfigMap[_common.cssName].imgs.indexOf("copy") > -1) {
                    $("#copyrightimg").attr("src", "area/" + _common.cssName + "/images/copyright.png?mr=" + Math.round(Math.random() * 10000));
                }
                if (areaConfigMap[_common.cssName].imgs.indexOf("logo") > -1) {
                    $("#logoimg").attr("src", "area/" + _common.cssName + "/images/logo.png?mr=" + Math.round(Math.random() * 10000));
                }
            });
        } else if (3 == areaConfigMap[_common.cssName].type) {
            $.getScript(areaConfigMap[_common.cssName].url + "?mr=" + Math.round(math.random() * 10000));
        } else {
            window.location.href = areaConfigMap[_common.cssName].url;
        }
    }
} catch (e) {
    alert("չʾ���ƴ����쳣��" + e);
}