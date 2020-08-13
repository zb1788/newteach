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
    document.getElementById('sysConfig.tip').className = '';
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
    if (_mask.isVisible()) return;
    try {
        _usbObj.invisible();
    } catch (e) {
        alert("usb�ؼ������쳣!");
    }
    maskAll.style.display = 'block';
    this.openPasswdWindow();
}
//_sysConfg.openSystemConfigWindow(); ��ϵͳ���ô���
SysConfigObj.prototype.openSystemConfigWindow = function () {
    maskAll.style.display = 'block';
    document.getElementById('sysConfig.window').style.display = "block";
    //�ɰ汾����ʾ��ѧ����
    if (2 != whiteBoardFlag) {
        document.getElementById('btnCss').className = "space3"
    } else {
    }
    if (isAllowSimpleHotKey) _simpleHotKey.pid = 'sysConfig.window'; //ʹ�øò�֧�ּ��ȼ�
    document.getElementById('SysConfig.teachipbutton').focus();
}
//_sysConfg.closeWindow(); �ر�ϵͳ���ô���
SysConfigObj.prototype.closeWindow = function () {
    _usbObj.visible();
    void (document.getElementById('sysConfig.window').style.display = 'none');
    if (isAllowSimpleHotKey) _simpleHotKey.pid = null; //ȡ���Ըò���ȼ�֧��     
    maskAll.style.display = 'none';
};	 