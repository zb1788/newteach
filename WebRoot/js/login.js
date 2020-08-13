var _loginObj = new LoginObj();

function LoginObj() {
    this.actInputObj;
    this.maxAccounts = 10;//�����ʾ���û����� _loginObj.maxAccounts
    this.del_account;
    this.errTop = 5;//_loginObj
    this.errLeft = -22;
    this.schoolNO = "";//ѧУ��� _loginObj.schoolNO
    this.schoolName = "";//ѧУ���� _loginObj.schoolName
    this.gradeName = "";// _loginObj.className �༶����
    this.historyUserCount = 0;
}

LoginObj.prototype.setActInputObj = function (obj) {
    this.actInputObj = obj;
}
LoginObj.prototype.createKeyBoard = function () {
    var h = '';
    for (var i = 0; i < 10; i++) {
        var js = 'javascript:_loginObj.softKey(\'' + i + '\')';
        //h+='<li ><a onclick="'+js+'">'+i+'</a></li>';
        h += '<a href="' + js + '"><li >' + i + '</li></a>';
    }
    //�˸��
    var js = 'javascript:_loginObj.backspace();';
    //h+='<li onclick="'+js+'">'+'��'+'</li>';
    h += '<a href="' + js + '"><li >' + '��' + '</li></a>'

    document.getElementById("keyboard").innerHTML = h;
}
LoginObj.prototype.backspace = function () {

    if (null != _loginObj.actInputObj) {
        var value = _loginObj.actInputObj.value;
        _loginObj.actInputObj.value = value.substring(0, value.length - 1);
        esrc = _loginObj.actInputObj;
        var rtextRange = esrc.createTextRange();
        rtextRange.moveStart('character', esrc.value.length);
        rtextRange.collapse(true);
        rtextRange.select();

    }
}// end of function
LoginObj.prototype.softKey = function (value) {
    if (null != this.actInputObj) {
        try {
            var maxLength = parseInt(this.actInputObj.maxLength);
            if (this.actInputObj.value.length < maxLength) {
                this.actInputObj.value += value;
                esrc = this.actInputObj;
                var rtextRange = esrc.createTextRange();
                rtextRange.moveStart('character', esrc.value.length);
                rtextRange.collapse(true);
                rtextRange.select();
            }
        } catch (e) {
        }
    }
}// end of function

LoginObj.prototype.getHistoryUser = function () {
    //document.getElementById("login.username").value="sb";
    // document.getElementById("login.username").focus();
    this.createKeyBoard();
    if (_macUtil.isReady()) {

        if (!_macUtil.isMAC(_macUtil.getMACAdd())) {
            window.status = "MAC��ַ��ʽ����" + _macUtil.getMACAdd();
            return false;

        }
        var url = _common.getCurrServerPath() + '/loginLog/AccessQueLog.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.count=12';//���Ƹ���
        url += '&current.c1=1';//�û���
        url += '&ajaxdate=' + new Date();
        //prompt('',url);
        sendRequest(this.parseHistoryUserData, url);
    }
}

LoginObj.prototype.parseHistoryUserData = function (xmldoc) {
    // if (4==xmlHttp.readyState)//4:���
    //if (200==xmlHttp.status){
    //alert(xmlHttp.responseText);
    // var xmldoc=xmlHttp.responseXML;
    _loginObj.createHistoryUserHtml(xmldoc);
    // }

}//end of parseHistoryUserData

LoginObj.prototype.nothing = function () {
}
var userversion = "";
//��ʾɾ����ť
LoginObj.prototype.showDelButton = function (currObj, account, pwd, versionid) {
    //alert(account);
    _loginObj.del_account = account;
    document.getElementById("del_icon").style.display = "";
    /**
     alert("left:"+currObj.getBoundingClientRect().left)
     alert("top:"+currObj.getBoundingClientRect().top)
     alert("right:"+currObj.getBoundingClientRect().right)
     alert("bottom:"+currObj.getBoundingClientRect().bottom)*/
    var right = currObj.getBoundingClientRect().right;
    var top = currObj.getBoundingClientRect().top;
    /*
     _loginObj.errTop=5;//_loginObj
    _loginObj.errLeft=-22;
    **/
    document.getElementById("del_icon").style.top = top + _loginObj.errTop + "px";
    document.getElementById("del_icon").style.left = right + _loginObj.errLeft + "px";

}
//��ʾɾ����ť
LoginObj.prototype.hideDelButton = function (currObj, account, pwd, versionid) {
    //alert(account);
    //_loginObj.del_account='';
    //alert(event.srcElement.outerHTML)
    document.getElementById("del_icon").style.display = "none";


}
//ɾ����ʷ�û� _loginObj.delHistoryUser
LoginObj.prototype.delHistoryUser = function () {
    /******�����¼��Ϣ begin*******/
    if (_macUtil.isReady()) {//�������ȡmac��ַ���Ŀؼ����سɹ�
        var url = _common.getCurrServerPath() + '/loginLog/externalHistoryUserDel.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.account=' + _loginObj.del_account;//�˺�

        //���������ε�ַ
        if ('error' != getMainTeachSeverPath()) {
            //alert();
            url += '&current.ip=' + getMainTeachSeverPath();//����������ip��ַ
        }


        url += '&ajaxdate=' + new Date();
        // prompt('',url);
        //  alert(url);


        sendRequest(_loginObj.parseDelHistoryUser, url);
    }
    /******�����¼��Ϣ end*******/

}
LoginObj.prototype.parseDelHistoryUser = function (xmldoc) {

    var idStr = "history_" + _loginObj.del_account;
    document.getElementById(idStr).style.display = "none";
    document.getElementById("del_icon").style.display = "none";
}
LoginObj.prototype.createHistoryUserHtml = function (xmldoc) {
    //alert(xmldoc);
    //prompt('',xmlHttp.responseText);
    var plsUserLoginLogNode = xmldoc.selectNodes("//list/plsUserLoginLog");
    var h = '';
    if (plsUserLoginLogNode.length == 0) {
        h += '<div class="doublelist3Ul">';
        h += '<ul class="doublelist3Ul_s">';
        h += '���޷��ʼ�¼��';
        h += '</ul>';
        h += '</div>';
    } else {
        h += '<div class="doublelist2Ul">';
        h += '<ul class="doublelist2Ul_s">';
        _loginObj.historyUserCount = plsUserLoginLogNode.length;
        for (var i = 0; i < plsUserLoginLogNode.length && i < _loginObj.maxAccounts; i++) {
            var userNode = plsUserLoginLogNode[i];
            if (null != userNode.selectNodes("c5")[0] && _loginObj.schoolNO.length < 1) {
                _loginObj.schoolNO = userNode.selectNodes("c5")[0].text;
            }
            if (null != userNode.selectNodes("c6")[0] && _loginObj.schoolName.length < 1) {
                _loginObj.schoolName = userNode.selectNodes("c6")[0].text;
            }
            if (null != userNode.selectNodes("c4")[0] && _loginObj.gradeName.length < 1) {
                _loginObj.gradeName = userNode.selectNodes("c4")[0].text;
                //alert(_loginObj.schoolNO);
            }


            //
            var realname = "";
            if (null != userNode.selectNodes("userName")[0])
                realname = userNode.selectNodes("userName")[0].text;

            //
            var account = "";
            if (null != userNode.selectNodes("account")[0])
                account = userNode.selectNodes("account")[0].text;

            //
            var pwd = "";
            if (null != userNode.selectNodes("pwd")[0])
                pwd = userNode.selectNodes("pwd")[0].text;
            //<li><a href="#" tyle="display: none" >00000000  �Ż���</a></li>

            var versionid = "";//�û��ڵ�ǰ��������ѡ��İ汾id
            if (null != userNode.selectNodes("c2")[0]) {
                versionid = userNode.selectNodes("c2")[0].text;
                window.status = '�û��ڵ�ǰ��������ѡ��İ汾idΪ' + versionid;
            }
            userversion = userversion + account + "_" + versionid + ",";
            var js = ' _loginObj.fillLoginInfo(\'' + account + '\',\'' + pwd + '\',\'' + versionid + '\');';


            var maxLength = 5;
            if (realname.length > 3) realname = realname.substring(0, 3) + "..";


            var liJs = ' _loginObj.showDelButton(this,\'' + account + '\',\'' + pwd + '\',\'' + versionid + '\');';
            var mouseout_js = ' _loginObj.hideDelButton();';

            var idStr = "history_" + account;
            //  h+='<li id="'+idStr+'" onmouseover="'+liJs+'" onclick="'+js+'" onmouseout="'+mouseout_js+'">'+realname+'</li>';
            h += '<li name="history_user" id="' + idStr + '" onmouseover="' + liJs + '" onclick="' + js + '" >' + realname + '</li>';
            //alert(realname);

        }//end of for
        h += '</ul>';
        h += '</div>';
    }

    try {
        document.getElementById("userName2").innerHTML = h;
    } catch (e) {
        document.getElementById("userName").innerHTML = h;
    }

} //end of createHistoryUserHtml


/*******��֤��¼����   begin*******/
LoginObj.prototype.checkLoginInput = function () {
    var usernameObj = document.getElementById("login.username");
    var pwdObj = document.getElementById("login.pwd");
    var outputObj = document.getElementById("login.tip");

    usernameObj.value = usernameObj.value.replace(/[\W]/g, '');
    pwdObj.value = pwdObj.value.replace(/[\W]/g, '');


    if (isBlank(usernameObj)) {
        this.setActInputObj(usernameObj);

        this.error("�������û�����");
        window.status = '�������û�����';
        return false;
    }
    if (isBlank(pwdObj)) {
        this.setActInputObj(pwdObj);
        this.error("���������룡");

        return false;
    }


    // alert(usernameObj.length);
    return true;
}
/*******��֤��¼����   end*******/

LoginObj.prototype.error = function (msg) {
    if (msg == "") {
        if (document.getElementById("error")) {
            document.getElementById("login.tip").innerHTML = "<div id=error2></div>"
        }
        //document.getElementById("login.tip").innerHTML="  ";
    } else {
        var message = "<div id=error><span>" + msg + "</span></div>";
        document.getElementById("login.tip").innerHTML = message;
    }

}

LoginObj.prototype.login = function () {
    if (!this.checkLoginInput()) return;
    this.error("");
    if (!this.currVersionid) {
        var _userversion = userversion.split(",");
        for (var n = 0; n < _userversion.length; n++) {
            if (_userversion[n] != "") {
                var _user = _userversion[n].split("_");
                if (_user[0] == document.getElementById("login.username").value) this.currVersionid = _user[1];
            }
        }
    }

    if (document.getElementById("loginType").checked) {
        //У����¼��֤
        _loginObj.loginByPwd();
    } else {
        //�м���¼��֤
        _loginObj.loginBySSO();
    }

}

LoginObj.prototype.loginBySSO = function () {

    //var sso = "https://sso.youjiaotong.com/sso/verifyAuthInfo?appFlg=PLS&loginUsertype=teacher";
    var ssoUrl = transferProtocol_web + _config["SSO"] + "/sso/verifyAuthInfo?appFlg=PLS&loginUsertype=teacher";
    var pwd = document.getElementById("login.pwd").value;
    if (pwd != null) {
        pwd = pwd.trim();
    }
    var pwdMD5 = hex_md5(pwd);
    ssoUrl += "&pwd=" + pwdMD5;
    ssoUrl += "&mac=" + _macUtil.getMACAdd();

    var username = document.getElementById("login.username").value;
    //url+='&rememberPwd='+document.getElementById("rememberFlag").checked;

    var url = transferProtocol_web + _config["PLS"] + "/newteach/getUsername.do?userid=" + document.getElementById("login.username").value;


    $.ajax({
        url: url,
        type: "get",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        scriptCharset: "utf-8",
        timeout: 30000,
        error: function (result) {
            maskAllall.style.display = "none";
            _loginObj.error('��¼��ʱ��');
        },
        success: function (result) {
            if (result.username && result.username.length > 0) {
                ssoUrl += "&username=" + result.username;
                $.ajax({
                    url: ssoUrl,
                    type: "get",
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    scriptCharset: "utf-8",
                    timeout: 30000,
                    error: function (rdata) {
                        maskAllall.style.display = "none";

                        _loginObj.error('��¼��ʱ��');
                    },
                    success: function (rdata) {
                        if (rdata.authFlg && rdata.authFlg == 0) {
                            //��֤�ɹ�
                            /******�����¼��Ϣ begin*******/
                            if (_macUtil.isReady()) {//�������ȡmac��ַ���Ŀؼ����سɹ�

                                var url = _common.getCurrServerPath() + '/loginLog/externalAccessAddLog.do?1=1';
                                url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ

                                url += '&current.account=' + rdata.user.username;//�˺�

                                //�Ƿ��ס����
                                var rememberFlag = document.getElementById("rememberFlag").checked;
                                if (rememberFlag) {
                                    url += '&current.pwd=' + document.getElementById("login.pwd").value;//����
                                } else {
                                    url += '&current.pwd=null';
                                }
                                url += '&current.userName=' + encodeURI(encodeURI(rdata.user.truename));//�û�����
                                url += '&current.c1=1';//�û���
                                url += '&ajaxdate=' + new Date();
                                sendRequest(new LoginObj().nothing, url);
                            }
                            /******�����¼��Ϣ end*******/

                                //'+userSetFlag
                            var url = 'index.do?userSetFlag=1';
                            url += "&templateId=1";
                            url += "&cssName=" + _common.getCssName();
                            url += "&currVersionid=" + _loginObj.currVersionid;//this.currVersionid=versionid;//��¼��ǰ�û���ѡ��İ汾id
                            url += '&whiteBoardFlag=';//�װ����� tianshibo =1
                            url += '&mac=' + _macUtil.getMACAdd();//mac��ַ;
                            url += '&pwd=' + pwd;
                            url += '&rememberPwd=' + document.getElementById("rememberFlag").checked;
                            url += '&ieBrowser=true';
                            location.href = url;
                            return;
                        } else {
                            maskAllall.style.display = "none";
                            document.getElementById("login.login").disabled = false;//�򿪵�½��ť
                            _loginObj.setActInputObj(document.getElementById("login.username"));
                            _loginObj.error(rdata.authInfo);//���������Ϣ
                            return;
                        }
                    }
                })
            }
        }
    });
}
LoginObj.prototype.loginByPwd = function (baseurl) {

    var url = "";
    if (baseurl) {
        url = baseurl + '/interfaces/login.do';
    } else {
        url = _common.getCurrServerPath() + '/interfaces/login.do';
    }

    var username = document.getElementById("login.username").value;
    var pwd = document.getElementById("login.pwd").value;
    url += '?userid=' + username;
    url += '&pwd=' + pwd;
    url += '&rememberPwd=' + document.getElementById("rememberFlag").checked;
    url += '&schoolId=' + _loginObj.schoolNO;
    url += '&mac=' + _macUtil.getMACAdd();//mac��ַ
    url += '&ajaxdate=' + new Date();

    $.ajax({
        url: url,
        type: 'get',
        datatype: 'xml',//������Բ�д����ǧ���дtext����html!!!
        timeout: 30000,
        error: function (xml) {
            maskAllall.style.display = "none";
            _loginObj.error('<span id="loginstyle">�����쳣��<a href="javascript:_loginObj.login()" style="color:#9c143c;text-decoration:underline">����</a>��<a href="javascript:_loginObj.login2()" style="color:#000;text-decoration:underline">�л����м�ƽ̨</a>!</span>', 1);
        },
        success: function (xml) {
            if (typeof (xml) == "string") {
                maskAllall.style.display = "none";
                _loginObj.error('<span id="loginstyle">�����쳣��<a href="javascript:_loginObj.login()" style="color:#9c143c;text-decoration:underline">����</a>��<a href="javascript:_loginObj.login2()" style="color:#000;text-decoration:underline">�л����м�ƽ̨</a>!</span>', 1);
                return;
            }
            var xmldoc = xml;
            //alert(xml);
            if (xmldoc.selectNodes("//auth/auth-flag").length <= 0)
                alert('��̨����xml���ܳ��ִ���,���¼�¸������Թ��Ų飺' + xmlHttp.responseText);


            var authflag = xmldoc.selectNodes("//auth/auth-flag")[0].text;
            if ('0' == authflag) {//��¼�ɹ�
                var realname = xmldoc.selectNodes("//auth/auth-user/realname")[0].text;
                var schoolId = '';
                var userType = '';
                var cssname = '';
                var templateid = '';
                try {
                    schoolId = xmldoc.selectNodes("//auth/auth-user/schoolId")[0].text;
                } catch (e) {
                    _loginObj.error('���û�û��Ȩ�޵�¼��');//���������Ϣ
                    maskAllall.style.display = "none";
                    return;
                }
                try {
                    userType = xmldoc.selectNodes("//auth/auth-user/user-type")[0].text;
                } catch (e) {
                    return;
                }

                try {
                    templateid = xmldoc.selectNodes("//auth/auth-user/pls-templateid")[0].text;
                } catch (e) {
                    templateid = "1";
                }

                var userSetFlag = 1;
                //�ж��û�
                if (null != xmldoc.selectNodes("//auth/auth-user/user-set")[0])
                    userSetFlag = xmldoc.selectNodes("//auth/auth-user/user-set")[0].text;

                //��֤�ɹ�
                var url = "";
                if (baseurl) {
                    url = baseurl + '/newteach/index.do?userSetFlag=' + userSetFlag;
                } else {
                    url = _common.getCurrServerPath() + '/newteach/index.do?userSetFlag=' + userSetFlag;
                }
                url += "&templateId=" + templateid;
                url += "&cssName=" + _common.getCssName();
                url += "&currVersionid=" + _loginObj.currVersionid;//this.currVersionid=versionid;//��¼��ǰ�û���ѡ��İ汾id
                url += '&whiteBoardFlag=';//�װ����� tianshibo =1
                url += '&mac=' + _macUtil.getMACAdd();//mac��ַ
                url += '&pwd=' + pwd;
                url += '&rememberPwd=' + document.getElementById("rememberFlag").checked;
                location.href = url;
                return;

            } else {
                maskAllall.style.display = "none";
                document.getElementById("login.login").disabled = false;//�򿪵�½��ť
                _loginObj.setActInputObj(document.getElementById("login.username"));
                _loginObj.error(xmldoc.selectNodes("//auth/auth-info")[0].text);//���������Ϣ
                return;
            }
            // alert(authflag);
            alert('��̨����xml���ܳ��ִ���,���¼�¸������Թ��Ų飺' + xmlHttp.responseText);
            //*****������ʼ****/
            maskAllall.style.display = "none";
            // alert();
        }
    });
}

LoginObj.prototype.login3 = function () {
    if (!this.checkLoginInput()) return;
    this.error("");
    maskAllall.style.display = "";
    if (!this.currVersionid) {
        var _userversion = userversion.split(",");
        for (var n = 0; n < _userversion.length; n++) {
            if (_userversion[n] != "") {
                var _user = _userversion[n].split("_");
                if (_user[0] == document.getElementById("login.username").value) this.currVersionid = _user[1];
            }
        }
    }
    var url = _common.getCurrServerPath() + '/interfaces/login.do';

    var username = document.getElementById("login.username").value;
    //_loginObj.schoolNO
    url += '?userid=' + username;
    url += '&pwd=' + document.getElementById("login.pwd").value;
    url += '&rememberPwd=' + document.getElementById("rememberFlag").checked;
    url += '&schoolId=' + _loginObj.schoolNO;
    url += '&mac=' + _macUtil.getMACAdd();//mac��ַ;
    url += '&ajaxdate=' + new Date();
    //sendRequest(parseLoginData,url);
    $.ajax({
        url: url,
        type: 'get',
        datatype: 'xml',//������Բ�д����ǧ���дtext����html!!! 
        timeout: 30000,
        error: function (xml) {
            maskAllall.style.display = "none";
            _loginObj.error('��¼��ʱ��');
        },
        success: function (xml) {
            var xmldoc = xml;
            //alert("xmldoc"+xmldoc);
            if (xmldoc.selectNodes("//auth/auth-flag").length <= 0)
                alert('��̨����xml���ܳ��ִ���,���¼�¸������Թ��Ų飺' + xmlHttp.responseText);


            var authflag = xmldoc.selectNodes("//auth/auth-flag")[0].text;
            if ('0' == authflag) {//��¼�ɹ�
                var realname = xmldoc.selectNodes("//auth/auth-user/realname")[0].text;
                var schoolId = '';
                var userType = '';
                try {
                    schoolId = xmldoc.selectNodes("//auth/auth-user/schoolId")[0].text;
                } catch (e) {
                    _loginObj.error('���û�û��Ȩ�޵�¼��');//���������Ϣ
                    maskAllall.style.display = "none";
                    return;
                }
                try {
                    userType = xmldoc.selectNodes("//auth/auth-user/user-type")[0].text;
                } catch (e) {

                    return;
                }
                //alert(userType);
                //if(''==schoolId)

                var userSetFlag = 1;
                //�ж��û�
                if (null != xmldoc.selectNodes("//auth/auth-user/user-set")[0])
                    userSetFlag = xmldoc.selectNodes("//auth/auth-user/user-set")[0].text;

                var url = _common.getCurrServerPath() + '/newteach/index.do?userSetFlag=' + userSetFlag;
                url += "&templateId=1";
                url += "&cssName=" + _common.getCssName();
                url += "&currVersionid=" + _loginObj.currVersionid;//this.currVersionid=versionid;//��¼��ǰ�û���ѡ��İ汾id
                url += '&whiteBoardFlag=';//�װ����� tianshibo =1
                url += '&mac=' + _macUtil.getMACAdd();//mac��ַ;
                location.href = url;
                return;


            } else {
                maskAllall.style.display = "none";
                document.getElementById("login.login").disabled = false;//�򿪵�½��ť 
                _loginObj.setActInputObj(document.getElementById("login.username"));
                _loginObj.error(xmldoc.selectNodes("//auth/auth-info")[0].text);//���������Ϣ
                //alert("sss");
                return;
            }
            // alert(authflag);
            alert('��̨����xml���ܳ��ִ���,���¼�¸������Թ��Ų飺' + xmlHttp.responseText);
            //*****������ʼ****/
            maskAllall.style.display = "none";
            // alert();
        }
    });
}
//��д�û���¼��Ϣ
LoginObj.prototype.fillLoginInfo = function (username, pwd, versionid) {
    this.currVersionid = versionid;//��¼��ǰ�û���ѡ��İ汾id
    //alert(this.currVersionid);
    //alert(versionid);
    document.getElementById("login.username").value = username;
    document.getElementById("login.pwd").value = pwd;
    if (pwd == '') {
        document.getElementById("login.pwd").focus();
        _loginObj.actInputObj = document.getElementById("login.pwd")
        document.getElementById("rememberFlag").checked = "";
    } else {
        document.getElementById("rememberFlag").checked = "checked"
    }
}
LoginObj.prototype.loginByIEForTest = function () {
    var url = null;//Ĭ�ϵ�½����session�����authResult����
    url = _common.getCurrServerPath() + '/newteach/readyforlogin.do';
    url += '?userid=4101011111110009&pwd=123456';
    url += '&schoolId=' + _loginObj.schoolNO;
    url += '&className=' + _loginObj.schoolName;
    url += '&ajaxdate=' + new Date();
    sendRequest(new LoginObj().nothing, url);
    //��sso��½
    url = _common.getCurrServerPath() + '/newteach/loginBySSO.do?';
    window.open(url);
}