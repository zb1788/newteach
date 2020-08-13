//����usbչʾҳ��
var _usbObj = new USBObj();

function USBObj() {
    this.ocxId = "usb_ocx";
    this.divid = "usb.window";
}

//_usbObj.closeUSBWindow();
USBObj.prototype.closeUSBWindow = function () {

    document.getElementById("usb.ocx").innerHTML = "";
    document.getElementById(this.divid).style.display = "none";
    if (_mask.isVisible()) _mask.closeMask();//�ر����ֲ�
}
USBObj.prototype.openUSBWindow = function (width, height) {
    document.getElementById("usb.ocx").innerHTML = this.createUSBHtml(width, height);
    if (!_mask.isVisible()) _mask.openMask();//�����ֲ�  
    document.getElementById(this.divid).style.display = "block";
}
USBObj.prototype.openUSBPage = function (width, height) {
    _pMain.getMain().innerHTML = this.createUSBHtml(width, height);
}
USBObj.prototype.createUSBHtml = function (width, height) {
    if (undefined == width) width = screen.width - 30;
    if (undefined == height) height = 554;
    var h = '';
    h += '<OBJECT ';
    h += 'CLASSID = "clsid:B4490376-83CE-4dc9-ADD4-05287993DDE6" ';
    h += 'ID = usb_ocx ';
    h += 'Name = usb_ocx ';
    h += ' WIDTH=' + width;
    h += ' HEIGHT =' + height;
    h += '>';
    h += '</OBJECT> ';
    return h;
};
//���ɼ� _usbObj.invisible();
USBObj.prototype.invisible = function () {
    if (null != document.getElementById(this.ocxId))
        document.getElementById(this.ocxId).style.display = "none";
};
//�ɼ���
USBObj.prototype.visible = function () {
    if (null != document.getElementById(this.ocxId))
        document.getElementById(this.ocxId).style.display = "";
};