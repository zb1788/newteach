/*****���繤�� begin*******/
var _netTools = new NetTools();

function NetTools() {

}

//�򿪵�������
NetTools.prototype.openWindow = function () {

    //_mask.isVisible()�Ƿ�ɼ��� true �ɼ���false���ɼ�
    if (_mask.isVisible()) return;
    _usbObj.invisible();

    maskAll.style.display = 'block';
    document.getElementById('netTools.window').style.display = 'block';
    if (isAllowSimpleHotKey) _simpleHotKey.pid = 'netTools.window'; //ʹ�øò�֧�ּ��ȼ�
    document.getElementById('netTools.keyword').value = "";
    document.getElementById('netTools.keyword').focus();

}

NetTools.prototype.closeWindow = function () {
    _usbObj.visible();
    void (document.getElementById('netTools.window').style.display = 'none');

    if (isAllowSimpleHotKey) _simpleHotKey.pid = null; //ȡ���Ըò���ȼ�֧��

    maskAll.style.display = 'none';

};

//���±�ǩ  _common.openTab(url)
NetTools.prototype.openTab = function (url) {
    // alert(url);
    var vra = document.createElement('a');
    vra.target = '_blank';
    vra.href = url;
    document.body.appendChild(vra);
    vra.click();
}// end of openTab

// _netTools.baiduSearch()
NetTools.prototype.baiduSearch = function (keyword) {
    if ('������ؼ���' == keyword) keyword = '';


    var url = "http://www.baidu.com/s?";
    // url+="wd="+encodeURIComponent(document.getElementById('search').value);
    url += "wd=" + keyword;
    this.openTab(url);
    //document.getElementById('iframe_search').src=url;

}

// 
NetTools.prototype.googleSearch = function (keyword) {

    if ('������ؼ���' == keyword.replace(/\s/g, '')) {
        keyword = '';
    }


    var url = "http://www.google.com.hk/search?hl=zh-CN&newwindow=1&safe=strict&q=" + keyword + "&aq=f&aqi=&aql=&oq=&gs_rfai=";
    // url+="wd="+encodeURIComponent(document.getElementById('search').value);
    //url+="wd="+keyword;
    this.openTab(url);
    //document.getElementById('iframe_search').src=url;

}

// 
NetTools.prototype.icibaSearch = function (keyword) {
    if ('������ؼ���' == keyword) keyword = '';
    // alert(keyword);
    var url = "http://www.iciba.com/" + keyword;
    // url+="wd="+encodeURIComponent(document.getElementById('search').value);
    //url+="wd="+keyword;
    this.openTab(url);
    //document.getElementById('iframe_search').src=url;

}
/*****���繤�� end*******/