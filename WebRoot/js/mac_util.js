/*********MAC ���� begin*********/
var _macUtil = new MACObj();

function MACObj() {
    this.id = "mac_ocx";
}

//�жϿؼ��Ƿ����  _macUtil.isReady()
MACObj.prototype.isReady = function () {
    //alert('mac'+document.getElementById("mac_ocx").readyState);
    try {
        if (document.getElementById(this.id).GetMacInfo) {//�������ȡmac��ַ���Ŀؼ����سɹ�
            //alert('MAC�ؼ�������');
            window.status = 'MAC�ؼ�������';
            return true;
        } else {
            //alert('��ȡMac��ַʧ�ܣ������Ȱ�װMAC��ؿؼ���');
            window.status = '��ȡMac��ַʧ�ܣ������Ȱ�װMAC��ؿؼ���';
            return false;

        }
    } catch (e) {
        //alert('��ȡMac��ַʧ�ܣ������Ȱ�װMAC��ؿؼ���');
        window.status = '��ȡMac��ַʧ�ܣ������Ȱ�װMAC��ؿؼ���';
        return false;
    }

}
//���mac��ַ _macUtil.getMACAdd()
MACObj.prototype.getMACAdd = function () {
    if (this.isReady()) {
        return document.getElementById(this.id).GetMacInfo();//mac��ַ
    }

}
MACObj.prototype.isMAC = function (str) {
    if (str.length != 17) {
        //alert("��������"+str.length);
        return false;
    }
    var regExp = /^[0-9a-zA-Z-]+$/;
    return regExp.test(str);

}

/*********MAC ���� end*********/