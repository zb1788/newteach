//�û�����
function ReadMeObj() {
    this.infoAllowUseNeed = null;//�Ƿ���Ҫ�û�ͬ�������Ϣ��Ȩ 0 ����Ҫ 1 ��Ҫ
    this.infoAllowUseNeedTip = "";//�û�ͬ�������Ϣ��Ȩ ��ʾ��Ϣ

}

var _read = new ReadMeObj();

ReadMeObj.prototype.showReadPage = function () {
    var url = _common.getCurrServerPath() + "/read.jsp?transferProtocol_web=" + transferProtocol_web + '&ut=' + sso_ut;
    document.getElementById('readPageUrl').src = url;
    art.dialog({
        id: 'readInfo',
        margin: 0,
        padding: 0,
        title: '',
        width: "100%",
        height: "100%",
        content: document.getElementById('readPage'),
        lock: true,
        cancel: false,
        opacity: 0.2
    });
}