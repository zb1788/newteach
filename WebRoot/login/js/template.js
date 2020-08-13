var _tUtil = new TemplateUtilObj();

function TemplateUtilObj() {
    //this.configParamName='pls.template.defaultId';
    this.templateId = "";
    this.whiteBoardFlag = "";

}

TemplateUtilObj.prototype.setTemplateId = function (templateId) {
    this.templateId = templateId;
}
TemplateUtilObj.prototype.getTemplateInfo = function () {

    if (_macUtil.isReady()) {
        var url = _common.getCurrServerPath() + '/loginLog/AccessQueLog.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.c1=2';//��ȡģ����Ϣ
        url += '&ajaxdate=' + new Date();
        //prompt('',url);
        sendRequest(this.parseTemplateInfoData, url);
        //alert();
    } else {
        var url = 'toLoginPage.do?default=true&templateId=1';//Ĭ��Ϊ���Ӱװ�
        url += '&whiteBoardFlag=2';
        location.href = url;
    }
}

TemplateUtilObj.prototype.parseTemplateInfoData = function (xmldoc) {
    //alert();
    // if (4==xmlHttp.readyState)//4:���
    //if (200==xmlHttp.status){
    //alert(xmlHttp.responseText);
    // var xmldoc=xmlHttp.responseXML;
    var plsUserLoginLogNode = xmldoc.selectNodes("//list/plsUserLoginLog");
    var templateId = _tUtil.templateId;
    try {
        templateId = plsUserLoginLogNode[0].selectNodes("templateId")[0].text;

    } catch (e) {
        // alert( plsUserLoginLogNode[0].selectNodes("templateId")[0].text);
        //alert('��ȡģ��id�쳣��');
    }
    var url = "toLoginPage.do?templateId=" + templateId;
    url += '&whiteBoardFlag=' + _tUtil.getWhiteBoardFlag();
    location.href = url;
    //}

}//end of parseTemplateInfoData

//��õ��Ӱװ����� 1-��ʾ�꼶����;
TemplateUtilObj.prototype.getWhiteBoardFlag = function () {
    return _tUtil.whiteBoardFlag;
    /******
     var whiteBoardFlag=2;

     var urledu="";
     var urlbook="";
     try{
	  urlbook=document.getElementById(_macUtil.id).GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
	  urledu=document.getElementById(_macUtil.id).GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
	  //alert(whiteBoardPath.length);
  }catch(e){
     window.status='��õ��Ӱװ�����ʧ�ܣ�';
     //alert('��õ��Ӱװ�����ʧ�ܣ�');
     return whiteBoardFlag;
  }



     if(urlbook.length>0&&urledu.length>0){
    if(urlbook==urledu) whiteBoardFlag=1;
    else  whiteBoardFlag=3;
  
  }else{
    whiteBoardFlag=2;//2-������ʾ 1-��ʾ��ѧ���� 3-��ʾ����
  }


     // alert(' whiteBoardFlag='+whiteBoardFlag);

     return whiteBoardFlag;***/
}
TemplateUtilObj.prototype.openWindow = function () {

    document.getElementById('template.window').style.display = "block";
    /*************/
    if (1 == this.templateId)
        document.getElementById('template.board').focus();
    else
        document.getElementById('template.tv').focus();

    if (isAllowSimpleHotKey) _simpleHotKey.pid = 'template.window'; //ʹ�øò�֧�ּ��ȼ�
}
TemplateUtilObj.prototype.closeWindow = function () {

    document.getElementById('template.window').style.display = "none";

    if (isAllowSimpleHotKey) _simpleHotKey.pid = "sysConfig.window"; // 

    _sysConfg.openWindow();

};


TemplateUtilObj.prototype.saveTemplateInfo = function (templateId) {

    if (_macUtil.isReady()) {
        var url = _common.getCurrServerPath() + '/loginLog/AccessQueLog.do?1=1';

        url += '&current.c1=2';//��ȡģ����Ϣ
        url += '&ajaxdate=' + new Date();

        var url = _common.getCurrServerPath() + '/loginLog/externalAccessAddLog.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.c1=2';//��ȡģ����Ϣ
        url += '&current.templateId=' + templateId;//����ģ����Ϣ


        //���������ε�ַ
        if ('error' != getMainTeachSeverPath()) {
            //alert();
            url += '&current.ip=' + getMainTeachSeverPath();//����������ip��ַ
        }
        url += '&ajaxdate=' + new Date();
        //prompt('',url); 
        //alert();
        sendRequest(null, url);


        //
        url = '';
        url += _common.getCurrServerPath() + "/newteach/index.do?userSetFlag=1&templateId=" + templateId;
        url += '&cssName=' + _common.getCssName();
        url += '&whiteBoardFlag=' + _tUtil.getWhiteBoardFlag();
        try {
            var currVersionid = _vsp.currKsId;
            url += '&currVersionid=' + _vsp.currKsId;

            //location.href=_common.getCurrServerPath()+"/newteach/index.do?userSetFlag=1&templateId="+templateId+'&currVersionid='+_vsp.currKsId+'&cssName='+ _common.getCssName();
            location.href = url;
        } catch (e) {

            //location.href=_common.getCurrServerPath()+"/newteach/index.do?userSetFlag=1&templateId="+templateId+'&cssName='+ _common.getCssName();
            location.href = url;
        }


        //alert();
    }
}