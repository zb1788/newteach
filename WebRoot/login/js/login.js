var _loginObj = new LoginObj();
_loginObj.rtime = new Date().getTime() + "" + Math.round(Math.random(10));
if (window.location.href.lastIndexOf("newteach/login/") > 0) {
    _loginObj.basePath = window.location.href.substring(0, window.location.href.lastIndexOf("newteach/login/") - 1);
}
LoginObj.prototype.getBasePath = function () {
    if ("undefined" == typeof (_loginObj.basePath) || null == _loginObj.basePath || "" == _loginObj.basePath) {
        _loginObj.basePath = tProtocol + _config["PLS"];
    }
    return _loginObj.basePath;
}
//���������ʾ
//����http://pls��ͷ�ĵ�ַ���������
LoginObj.prototype.checkUpdate = function () {
    $.ajax({
        url: tProtocol + _config["PORTAL"] + "/dataconfigs/showSkUpdate.action?t=" + new Date().getTime(),
        type: "get",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        scriptCharset: "utf-8",
        success: function (rdata) {
            if (typeof (rdata) != "undefined") {
                if (rdata.showSkUpdate == "1" || rdata.showSkUpdate == "2") {
                    var content = decodeURIComponent(rdata.skTip);
                    //����java������js����ո����
                    var esccount = 0;
                    while (content.indexOf("+") > -1) {
                        content = content.replace("+", "&nbsp;");
                        esccount++;
                        if (esccount > 50) {
                            break;
                        }
                    }
                    $("#upcontent").html(content);
                    if (rdata.showSkUpdate == "1") {
                        //���Ե�½
                        $("#up_login").hide();
                    }
                    $("#updiv").show();
                    $("#upmask").show();
                    //$("#mask").show();
                }
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
        }
    });
}
//����������ʾ������½
LoginObj.prototype.hideUpDiv = function () {
    $("#updiv").hide();
    $("#upmask").hide();
}

//��½�������
function LoginObj() {
    this.actInputObj;
    this.maxAccounts = 10;//�����ʾ���û����� _loginObj.maxAccounts
    this.del_account;
    this.errTop = 5;//_loginObj
    this.errLeft = -25;
    this.schoolNO = "";//ѧУ��� _loginObj.schoolNO
    this.schoolName = "";//ѧУ���� _loginObj.schoolName
    this.gradeName = "";// _loginObj.className �༶����
    this.userList = new Array();
    this.historyUserCount = 0;
    this.ssoAuth = "";//sso��֤  ���ssoAuthΪ����ΪУ����¼,��Ϊ1��Ϊsso��¼
}

LoginObj.prototype.setActInputObj = function (obj) {
    this.actInputObj = obj;
}
LoginObj.prototype.createKeyBoard = function () {
    var h = '';
    for (var i = 0; i < 10; i++) {
        var js = 'javascript:_loginObj.softKey(\'' + i + '\')';
        h += '<a href="' + js + '">' + i + '</a>';
    }
    //�˸��
    var js = 'javascript:_loginObj.backspace();';
    //h+='<li onclick="'+js+'" class="bs">'+'��'+'</li>';
    h += '<a href="' + js + '" class="bs">' + '��' + '</a>'
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
            this.actInputObj.onfocus();
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
        var url = _loginObj.getBasePath() + '/newteach/AccessQueLog.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.count=' + _loginObj.maxAccounts;
        ;//���Ƹ���
        url += '&current.c1=1';//�û���
        url += '&ajaxdate=' + new Date().getTime();
        //prompt('',url);
        document.getElementById("waithtml2").innerHTML = '���ڻ�ȡ�û������Ժ�....';
        document.getElementById("waithtml2").style.display = "";
        //sendRequest(this.parseHistoryUserData,url);
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',//������Բ�д����ǧ���дtext����html!!! 
            timeout: 60000,
            error: function (e) {
                document.getElementById("waithtml2").innerHTML = '<IMG src="images/error.png" WIDTH=10; HEIGHT=10> ��ȡ�û�ʧ�ܣ�����������ڿ�IP��windowsʱ�����á�';
            },
            success: function (data) {
                if (typeof (xml) == "string") {
                    document.getElementById("waithtml2").innerHTML = '<IMG src="images/error.png" WIDTH=10; HEIGHT=10> ��ȡ�û�ʧ�ܣ�����������ڿ�IP��windowsʱ�����á�';
                    return;
                }
                document.getElementById("waithtml2").style.display = "none";
                _loginObj.createHistoryUserHtml(data);
            }
        });
    }
}
LoginObj.prototype.parseHistoryUserData = function (data) {
    _loginObj.createHistoryUserHtml(data);
}//end of parseHistoryUserData
LoginObj.prototype.nothing = function () {
}
var userversion = "";
//��ʾɾ����ť
LoginObj.prototype.showDelButton = function (currObj) {
    var id = currObj.id.substr(8);
    _loginObj.del_account = id;
    document.getElementById("del_icon").style.display = "";
    /**
     alert("left:"+currObj.getBoundingClientRect().left)
     alert("top:"+currObj.getBoundingClientRect().top)
     alert("right:"+currObj.getBoundingClientRect().right)
     alert("bottom:"+currObj.getBoundingClientRect().bottom)*/
    var right = currObj.getBoundingClientRect().right;
    var top = currObj.getBoundingClientRect().top;
    /*
     _loginObj.errTop=100;//_loginObj
    _loginObj.errLeft=-22;
    **/
    document.getElementById("del_icon").style.top = top + _loginObj.errTop + "px";
    document.getElementById("del_icon").style.left = right + _loginObj.errLeft + "px";

}
//����ɾ����ť
LoginObj.prototype.hideDelButton = function (currObj, account, pwd, versionid) {
    document.getElementById("del_icon").style.display = "none";
}
//ɾ����ʷ�û� _loginObj.delHistoryUser
LoginObj.prototype.delHistoryUser = function () {
    /******�����¼��Ϣ begin*******/
    if (_macUtil.isReady()) {//�������ȡmac��ַ���Ŀؼ����سɹ�
        var url = _loginObj.getBasePath() + '/newteach/historyUserDel.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.account=' + _loginObj.del_account;//�˺�

        //���������ε�ַ
        if ('error' != getMainTeachSeverPath()) {
            //alert();
            url += '&current.ip=' + getMainTeachSeverPath();//����������ip��ַ
        }

        url += '&ajaxdate=' + new Date().getTime();
        // prompt('',url);
        //  alert(url);


        sendJsonRequest(_loginObj.parseDelHistoryUser, url);
    }
    /******�����¼��Ϣ end*******/

}
LoginObj.prototype.parseDelHistoryUser = function (xmldoc) {
    var status = xmldoc.status;
    if (status == "error") {
        alert("��ʷ�û�ɾ�����ɹ�!");
    } else {
        var idStr = "history_" + _loginObj.del_account;
        document.getElementById(idStr).style.display = "none";
        document.getElementById("del_icon").style.display = "none";
    }
}
LoginObj.prototype.createHistoryUserHtml = function (data) {
    //���ð汾
    sysVersion = data.version;
    _common.setVersion(sysVersion);
    var plsUserLoginLogNode = data.userAccount;
    var h = '';
    if (plsUserLoginLogNode.length == 0) {
        h += '<div class="doublelist3Ul">';
        h += '���޷��ʼ�¼��';
        h += '</div>';
    } else {
        _loginObj.historyUserCount = plsUserLoginLogNode.length;
        for (var i = 0; i < plsUserLoginLogNode.length && i < _loginObj.maxAccounts; i++) {

            var userNode = plsUserLoginLogNode[i];
            if (null != userNode.c5 && _loginObj.schoolNO.length < 1) {
                _loginObj.schoolNO = userNode.c5;
                //alert(_loginObj.schoolNO);
            }
            if (null != userNode.c6 && _loginObj.schoolName.length < 1) {
                _loginObj.schoolName = userNode.c6;
            }
            if (null != userNode.c4 && _loginObj.gradeName.length < 1) {
                _loginObj.gradeName = userNode.c4;
                //alert(_loginObj.schoolNO);
            }
            //
            var realname = "";
            if (null != userNode.userName)
                realname = userNode.userName;

            //
            var account = "";
            if (null != userNode.account)
                account = userNode.account;

            //
            var pwd = "";
            if (null != userNode.pwd)
                pwd = userNode.pwd;
            var versionid = "";//�û��ڵ�ǰ��������ѡ��İ汾id
            if (null != userNode.c2) {
                versionid = userNode.c2;
                window.status = '�û��ڵ�ǰ��������ѡ��İ汾idΪ' + versionid;
            }
            userversion = userversion + account + "_" + versionid + ",";
            var logItem = {"id": account, "pwd": pwd, "versionid": versionid};
            this.userList.push(logItem);
            var js = ' _loginObj.fillLoginInfo(this);';
            var maxLength = 5;
            if (realname.length > 3) realname = realname.substring(0, 3) + "..";
            var liJs = '_loginObj.showDelButton(this);';
            var mouseout_js = '_loginObj.hideDelButton();';
            var idStr = "history_" + account;
            h += '<a href="#" name="history_user" id="' + idStr + '" onmouseover="' + liJs + '" onclick="' + js + '" >' + realname + '</a>';
        }//end of for
    }
    try {
        document.getElementById("userName").innerHTML = h;
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
    document.getElementById("login.pwd2").onfocus();
    if (isBlank(pwdObj)) {
        this.setActInputObj(pwdObj);
        this.error("���������룡");

        return false;
    }


    // alert(usernameObj.length);
    return true;
}
/*******��֤��¼����   end*******/

LoginObj.prototype.error = function (msg, show) {

    var loginTip = document.getElementById("login.tip");
    loginTip.style.display = "block";
    if (msg == "") {
        if (document.getElementById("error")) {
            loginTip.innerHTML = "<div id=error2></div>"
        }
    } else {
        var message = "<div id=error style='top:" + (445 + _common.loginMarginHeight) + "px'><span>" + msg + "</span></div>";
        document.getElementById("login.tip").innerHTML = message;
    }
    if (1 != show) {
        setTimeout(function () {
            loginTip.innerHTML = ""
            loginTip.style.display = "none";
        }, 3000);
    }
}

LoginObj.prototype.login = function () {
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

    //�м���¼��֤
    _loginObj.loginBySSO();
}
LoginObj.prototype.loginBySSO = function () {
    //var sso = "http://sso.youjiaotong.com/sso/verifyAuthInfo?appFlg=PLS&loginUsertype=teacher";
    ssoUrl = tProtocol + _config["SSO"] + "/sso/verifyAuthInfo?appFlg=PLS&loginUsertype=teacher&encodeP=4";
    var pwd = document.getElementById("login.pwd").value;
    if (pwd != null) {
        pwd = pwd.trim();
    }

    var pwdMD5 = hex_md5(pwd);
    //var pwdBASE64 = BASE64.encoder(pwd);//���ر������ַ�  
    var modulus = "10001";
    var publicExponent = "ca56aa9d90e438b659c4d8da8d586687eabe1ba7bd90463981ea5397aab90020387e0a541020eddaa746f982a30115c54b04d5d1f823345f8d16ebffe647c986be3692158fc08413854ab3123b48c9ff486b12905ab21dd2dcfbbab9a2afac89953d86582bd13392c8fbbba0795fb00ebfffe3b0eb6a9cc372ee84635984807f";
    var pubkey = new RSAUtils.getKeyPair(modulus, "", publicExponent);
    RSAUtils.setMaxDigits(130);
    var pwdRSA = RSAUtils.encryptedString(pubkey, pwd);


    ssoUrl += "&pwd=" + pwdMD5;
    ssoUrl += "&pwdRsa=" + pwdRSA;
    //ssoUrl +="&encodeP=1";//�� md5�㷨 ,1 rsa�㷨 2 base64�㷨 3 3des�㷨
    ssoUrl += "&mac=" + _macUtil.getMACAdd();

    var username = document.getElementById("login.username").value;
    //url+='&rememberPwd='+document.getElementById("rememberFlag").checked;
    //des����
    var url = _loginObj.getBasePath() + "/newteach/getUsername.do?userid=" + document.getElementById("login.username").value + "&r=" + Math.round(Math.random() * 1000);

    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
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
                        if (rdata.authFlg && "100" == rdata.authFlg) {
                            //ǿ���޸�����
                            //��ַ��/tms/clientInterface/editSelfPwdSafeI.do?ut=&tmpToken=&userName=39aeb23cd44bf6a0ca3dc8ec8e442cf735fa4e8095b22fe70c387be2b3b41615&oldpwd=e10adc3949ba59abbe56e057f20f883e&newpwd=e10adc3949ba59abbe56e057f20f883e
                            //oldpwd������  md5����
                            //newpwd ������  md5����
                            //userName���ʺ�  �û��ʺ�|ʱ���(yyyyMMddhhmmss)    3des���� 60������Ч
                            pwdConfig.tmpToken = rdata.tmpToken;
                            pwdConfig.show();
                            maskAllall.style.display = "block";
                        } else if (rdata.authFlg && rdata.authFlg == 0) {
                            //��֤�ɹ�
                            /******�����¼��Ϣ begin****��Ϊ�������˼�¼
                             if( _macUtil.isReady()){//�������ȡmac��ַ���Ŀؼ����سɹ�
							  
									var url='AccessAddLog.do?1=1';
									url+='&current.mac='+ _macUtil.getMACAdd();//mac��ַ
									
									url+='&current.account='+rdata.user.username;//�˺�
									
									//�Ƿ��ס����
									var rememberFlag=document.getElementById("rememberFlag").checked;
									if(rememberFlag){
									  url+='&current.pwd='+document.getElementById("login.pwd").value;//����
									}else{
									  url+='&current.pwd=null';
									}
									url+='&current.userName='+encodeURI(encodeURI(rdata.user.truename));//�û�����
									url+='&current.c1=1';//�û���				    				    					  
									url+='&ajaxdate='+new Date();
														sendJsonRequest(new LoginObj().nothing,url);
							  }
                             ****�����¼��Ϣ end*******/

                                //'+userSetFlag
                            var url = _loginObj.getBasePath() + '/newteach/index.do?userSetFlag=1';
                            url += "&rtime=" + _loginObj.rtime;
                            url += "&templateId=1";
                            url += "&cssName=" + _common.cssName;
                            url += "&currVersionid=" + _loginObj.currVersionid;//this.currVersionid=versionid;//��¼��ǰ�û���ѡ��İ汾id
                            url += '&whiteBoardFlag=';//�װ����� tianshibo =1
                            url += '&mac=' + _macUtil.getMACAdd();//mac��ַ;
                            url += '&pwd=' + pwd;
                            url += '&rememberPwd=' + document.getElementById("rememberFlag").checked;
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
    url += '&ajaxdate=' + new Date().getTime();

    $.ajax({
        url: url,
        type: 'get',
        datatype: 'xml',//������Բ�д����ǧ���дtext����html!!! 
        timeout: 30000,
        error: function (xml) {
            maskAllall.style.display = "none";
            _loginObj.error('<span id="loginstyle">�����쳣��<a href="javascript:_loginObj.login()" style="color:#9c143c;text-decoration:underline">����</a> !</span>', 1);
        },
        success: function (xml) {
            if (typeof (xml) == "string") {
                maskAllall.style.display = "none";
                _loginObj.error('<span id="loginstyle">�����쳣��<a href="javascript:_loginObj.login()" style="color:#9c143c;text-decoration:underline">����</a> !</span>', 1);
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
                    //cssname=xmldoc.selectNodes("//auth/auth-user/pls-css-name")[0].text;
                    cssname = _common.cssName;
                } catch (e) {
                    //_loginObj.error('���û�û��Ȩ�޵�¼��');//���������Ϣ
                    // maskAllall.style.display="none";
                    //return;var _common.cssName="tongyong";
                    cssname = _common.cssName;
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
                url += "&rtime=" + _loginObj.rtime;
                url += "&templateId=" + templateid;
                url += "&cssName=" + cssname;
                url += "&currVersionid=" + _loginObj.currVersionid;//this.currVersionid=versionid;//��¼��ǰ�û���ѡ��İ汾id
                url += '&whiteBoardFlag=' + _tUtil.getWhiteBoardFlag();//�װ����� tianshibo =1
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

//��д�û���¼��Ϣ
LoginObj.prototype.fillLoginInfo = function (obj) {
    var username = document.getElementById("login.username");
    var pwd = document.getElementById("login.pwd");
    var pwd2 = document.getElementById("login.pwd2");
    var rememberFlag = document.getElementById("rememberFlag");
    var currId = obj.id.substr(8);
    for (var i = 0; i < this.userList.length; i++) {
        var user = this.userList[i];
        if (user.id == currId) {
            username.value = user.id;
            username.onblur();

            pwd.value = user.pwd;
            if (user.pwd == '') {
                pwd.value = "";
                pwd2.onfocus();
                rememberFlag.checked = "";
                _loginObj.actInputObj = pwd;
            } else {
                pwd2.focus();
                pwd.blur();
                rememberFlag.checked = "checked"
            }
        }
    }
}
LoginObj.prototype.setUserNamePlaceHolder = function () {
    var self = document.getElementById("login.username");
    self.value = "";
    var placeholder = "�û���";
    self.onfocus = function () {
        if (self.value == placeholder) {
            self.value = '';
            self.style.color = "";
        }
    }
    self.onblur = function () {
        if (self.value == '' || self.value == placeholder) {
            self.value = placeholder;
            self.style.color = "#666";
        } else {
            self.style.color = "";
        }
    }
    self.onblur();
}
LoginObj.prototype.setPassWordPlaceHolder = function () {
    var pwd1 = document.getElementById("login.pwd");
    pwd1.value = "";
    pwd1.style.display = "none";

    var pwd2 = document.getElementById("login.pwd2");
    pwd2.style.color = "#666";
    pwd2.value = "����";
    pwd2.style.display = "";

    pwd1.onblur = function () {
        if (pwd1.value == '') {
            pwd2.style.display = "block";
            pwd1.style.display = "none";
        } else {
            pwd1.style.display = "block";
            pwd2.style.display = "none";
        }
    }
    pwd1.onfocus = function () {
        pwd2.style.display = "none";
        pwd1.style.display = "block";
        _loginObj.actInputObj = pwd1;

    }
    pwd2.onfocus = function () {
        pwd2.style.display = "none";
        pwd1.style.display = "block";
        pwd1.focus();
    }
}
