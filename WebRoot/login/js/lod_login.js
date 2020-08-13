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
        var url = _common.getCurrServerPath() + '/loginLog/AccessQueLog.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.count=12';//���Ƹ���
        url += '&current.c1=1';//�û���
        url += '&ajaxdate=' + new Date();
        //prompt('',url);
        waithtml2.innerHTML = '<IMG src="images/a_send.gif"> ���ڻ�ȡ�û������Ժ�....';
        waithtml2.style.display = "";
        //sendRequest(this.parseHistoryUserData,url);
        $.ajax({
            url: url,
            type: 'get',
            datatype: 'xml',//������Բ�д����ǧ���дtext����html!!! 
            timeout: 60000,
            error: function (xml) {
                waithtml2.innerHTML = '<IMG src="images/error.png" WIDTH=10; HEIGHT=10> ��ȡ�û���¼��ʷʧ�ܡ�';
            },
            success: function (xml) {
                waithtml2.style.display = "none";
                _loginObj.createHistoryUserHtml(xml);
            }
        });


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

    if (xmldoc == "1") alert("��ʷ�û���ʱ������ɾ��!");
    else if (xmldoc == "2") alert("��ʷ�û�ɾ�����ɹ�!");
    else {
        var idStr = "history_" + _loginObj.del_account;
        document.getElementById(idStr).style.display = "none";
        document.getElementById("del_icon").style.display = "none";
    }

}
LoginObj.prototype.createHistoryUserHtml = function (xmldoc) {
    //alert(xmldoc);
    //prompt('',xmlHttp.responseText);
    var plsUserLoginLogNode = xmldoc.selectNodes("//list/plsUserLoginLog");
    try {
        var version = xmldoc.selectNodes("//version");
        if (version) {
            var versionnum = version[0].text;
            versionshow.innerHTML = versionshow.innerHTML + "<br>��ǰϵͳ�汾�ţ�" + versionnum
        }
    } catch (e) {
    }
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

            //

            if (null != userNode.selectNodes("c5")[0] && _loginObj.schoolNO.length < 1) {
                _loginObj.schoolNO = userNode.selectNodes("c5")[0].text;
                //alert(_loginObj.schoolNO);
            }
            if (null != userNode.selectNodes("c6")[0] && _loginObj.schoolName.length < 1) {
                _loginObj.schoolName = userNode.selectNodes("c6")[0].text;
                //alert(_loginObj.schoolNO);
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
LoginObj.prototype.login2 = function () {
    this.login(_common.getCurrServerPath2());
}

LoginObj.prototype.login = function (baseurl) {

    if (!this.checkLoginInput())
        return;
    this.error("");
    waithtml.innerHTML = "<img src='images/extanim32.gif' /><span>����Ϊ���½�����Ժ�....</span>"
    maskAllall.style.display = "";
    //login.login
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
    if (baseurl) url = baseurl + '/interfaces/login.do';

    var username = document.getElementById("login.username").value;
    //_loginObj.schoolNO
    url += '?userid=' + username;
    url += '&pwd=' + document.getElementById("login.pwd").value;
    url += '&schoolId=' + _loginObj.schoolNO;
    url += '&mac=' + _macUtil.getMACAdd();//mac��ַ
    url += '&ajaxdate=' + new Date();
    //prompt('',url);
    //sendRequest(parseLoginData,url);
    $.ajax({
        url: url,
        type: 'get',
        datatype: 'xml',//������Բ�д����ǧ���дtext����html!!! 
        timeout: 30000,
        error: function (xml) {
            maskAllall.style.display = "none";
            _loginObj.error('<span id="loginstyle">�����쳣��<a href="javascript:_loginObj.login()">����</a>��<a href="javascript:_loginObj.login2()">�л����м�ƽ̨</a>!</span>');
        },
        success: function (xml) {
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
                    cssname = defaultcssname;
                } catch (e) {
                    //_loginObj.error('���û�û��Ȩ�޵�¼��');//���������Ϣ
                    // maskAllall.style.display="none";
                    //return;var defaultcssname="tongyong";
                    cssname = defaultcssname;
                }

                try {
                    templateid = xmldoc.selectNodes("//auth/auth-user/pls-templateid")[0].text;
                } catch (e) {
                    templateid = "1";
                }
                //alert(userType);
                //if(''==schoolId)

                var userSetFlag = 1;
                //�ж��û�
                if (null != xmldoc.selectNodes("//auth/auth-user/user-set")[0])
                    userSetFlag = xmldoc.selectNodes("//auth/auth-user/user-set")[0].text;

                /******�����¼��Ϣ begin*******/
                if (_macUtil.isReady()) {//�������ȡmac��ַ���Ŀؼ����سɹ�

                    var url = _common.getCurrServerPath() + '/loginLog/externalAccessAddLog.do?1=1';
                    if (baseurl) url = baseurl + '/loginLog/externalAccessAddLog.do?1=1';
                    url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ

                    if (username.length < 5) username = schoolId + username;
                    url += '&current.account=' + username;//�˺�

                    //�Ƿ��ס����
                    var rememberFlag = document.getElementById("rememberFlag").checked;
                    if (rememberFlag) {
                        url += '&current.pwd=' + document.getElementById("login.pwd").value;//����
                    } else {
                        url += '&current.pwd=';
                    }

                    url += '&current.userName=' + encodeURI(encodeURI(realname));//�û���
                    url += '&current.c1=1';//�û���


                    url += '&current.c6=' + encodeURI(encodeURI(_loginObj.schoolName));//
                    url += '&current.c5=' + schoolId;//
                    url += '&current.c4=' + encodeURI(encodeURI(_loginObj.gradeName));//

                    url += '&ajaxdate=' + new Date();
                    // prompt('',url);
                    //alert(_loginObj.historyUserCount);
                    if ((schoolId.indexOf(_loginObj.schoolNO) >= 0) || (_loginObj.historyUserCount == 0)) {//��У�ʻ�
                        if ((2 == userType) || (3 == userType) || (4 == userType))
                            sendRequest(new LoginObj().nothing, url);
                        else
                            window.status = "�ǽ�ʦ�û���";
                    } else {
                        window.status = "�Ǳ�У�ʻ���";
                    }
                }
                /******�����¼��Ϣ end*******/
                var url = _common.getCurrServerPath() + '/newteach/index.do?userSetFlag=' + userSetFlag;
                if (baseurl) url = baseurl + '/newteach/index.do?userSetFlag=' + userSetFlag;
                url += "&templateId=" + templateid;
                url += "&cssName=" + cssname;
                url += "&currVersionid=" + _loginObj.currVersionid;//this.currVersionid=versionid;//��¼��ǰ�û���ѡ��İ汾id
                url += '&whiteBoardFlag=' + _tUtil.getWhiteBoardFlag();//�װ����� tianshibo =1
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
    // this.login();
}
 