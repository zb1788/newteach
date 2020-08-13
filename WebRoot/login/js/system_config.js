var _sysConfg = new SysConfigObj();

function SysConfigObj() {
}

//_sysConfg.closePasswdWindow(); �ر����봰��
SysConfigObj.prototype.closePasswdWindow = function (flag) {
    if (undefined == flag)//��ʾu�̱���
        _usbObj.visible();


    void (document.getElementById('sysConfig.passwdWindow').style.display = 'none');

    if (isAllowSimpleHotKey) _simpleHotKey.pid = null; //ȡ���Ըò���ȼ�֧��

    maskAll.style.display = 'none';

};

//_sysConfg.validatePasswd(); ��֤���봰
SysConfigObj.prototype.validatePasswd = function () {
    var pwd = document.getElementById('sysConfig.passwd').value;

    if (pwd == '') {
        document.getElementById('sysConfig.tip').className = "tipsInfo";
        document.getElementById('sysConfig.tip').innerHTML = '���������룡';
        return;
    } else if (pwd != '888888') {
        document.getElementById('sysConfig.tip').className = "tipsInfo";
        document.getElementById('sysConfig.tip').innerHTML = '����������������룡';
        return;
    } else {
        _sysConfg.closePasswdWindow(true);
        this.openSystemConfigWindow();
    }

};//end of validatePasswd

//_sysConfg.openPasswdWindow(); �����봰��
SysConfigObj.prototype.openPasswdWindow = function () {
    document.getElementById('sysConfig.passwd').value = '';
    document.getElementById('sysConfig.tip').innerHTML = '';
    document.getElementById('sysConfig.passwdWindow').style.display = "block";
    document.getElementById('sysConfig.passwd').focus();
    if (isAllowSimpleHotKey) _simpleHotKey.pid = 'sysConfig.passwdWindow'; //ʹ�øò�֧�ּ��ȼ�


    maskAll.style.display = 'block';
}
SysConfigObj.prototype.openWindow = function () {
    try {
        document.getElementById('SysConfig.teachipbutton').focus();
    } catch (e) {
    }
    //_mask.isVisible()�Ƿ�ɼ��� true �ɼ���false���ɼ�
    if (_mask.isVisible()) return;
    _usbObj.invisible();

    maskAll.style.display = 'block';

    showAlladdress();

    this.openPasswdWindow();
    //document.getElementById('sysConfig.window').style.display="block" ;
    //document.getElementById('sysConfig.ipbutton').focus();
    //if(isAllowSimpleHotKey) _simpleHotKey.pid='sysConfig.window'; //ʹ�øò�֧�ּ��ȼ�
}

//_sysConfg.openSystemConfigWindow(); ��ϵͳ���ô���
SysConfigObj.prototype.openSystemConfigWindow = function () {
    //alert("cc+");
    //  alert(_tUtil.getWhiteBoardFlag());
    maskAll.style.display = 'block';

    document.getElementById('sysConfig.window').style.display = "block";
    document.getElementById('sysConfig.teachToolConfigButton').focus();
    //document.getElementById('sysConfig.ipbutton').focus();
    if (isAllowSimpleHotKey) _simpleHotKey.pid = 'sysConfig.window'; //ʹ�øò�֧�ּ��ȼ�

    //�ɰ汾����ʾ��ѧ����

    //alert(_tUtil.getWhiteBoardFlag());
    if (2 != _tUtil.getWhiteBoardFlag()) {

        //document.getElementById('sysConfig.teachToolConfigButton').style.display="none" ;

        document.getElementById('btnCss').className = "for1Btn"
        //alert(document.getElementById('btnCss').className="space3");
    } else {
        // space4Btn
        //alert();
        document.getElementById('btnCss').className = "for2Btn"
    }
    document.getElementById('SysConfig.teachipbutton').focus();
}//end of function


SysConfigObj.prototype.closeWindow = function () {
    _usbObj.visible();
    void (document.getElementById('sysConfig.window').style.display = 'none');

    if (isAllowSimpleHotKey) _simpleHotKey.pid = null; //ȡ���Ըò���ȼ�֧��

    maskAll.style.display = 'none';

};
