//���һ������ks_type��������"��ѧ"����"ר��"Ŀ¼   lzz  2012-09-26�����������Դһ��֮��Ŀ¼����ʾ�����⣩
var xbzy = new XBZY();

function dirObj(ksid, name, ks_type) {
    this.ksid = ksid;//�ļ��б��
    this.name = name;//�ļ�������
    this.kstype = ks_type; //��Դ����0����ѧ��Դ 1��ר����Դ
}//end of У��Ŀ¼ �ṹ
/*******************************У����ԴĿ¼start**************************/
function XBZY() {
    this.selNode = null;
    this.title = null;
    this.type = null;
    this.id = null;
}

XBZY.prototype.getRes = function () {
    xbzy.createLeftHtml();

}

XBZY.prototype.createLeftHtml = function () {
    $(_pMain.getMainLeft()).remove();
    _pMain.getMainRight().style.marginLeft = "0px";
    _pMain.getMainRight().style.width = "100%";
    _xbRes.flag = 1;
    _xbRes.createRightHtml(teacherjyjg, "", 1);//У����Դ-ר����Դ
}
/*******************************У����ԴĿ¼end****************************/

/*******************************У����Դ����start**************************/
var _xbRes = new XBObj();

function XBObj(flag) {
    this.flag = 2;//1-��ʾ����Դ�����з��� 2-���з���
    this.dirList = new Array();//�ļ����б�
    this.navList = new Array();//�������б�  
    this.clickFrom; //left�� ������� 1 �������Ҳ�  
    this.keList = new Array();//֪ʶ��ϵ���ݶ�������    
    this.pagesize = _pMain.contentpagesize;
    this.areaId = null;//��ǰ����id
    this.schoolId = null;
}

/*****************begin**********************/
/*XBObj.prototype.createNavBar = function(){
   var h='';
   var navList=this.navList;
    for(var i=0;i<navList.length;i++){
       var navObj=navList[i];
       var js_temp='_xbRes.createRightHtmlByNav('+i+');';
       var start='<a href="javascript:'+js_temp+'">';
       var end='</a>';
       var navUtil=start+=navObj.name+end;
       h+=navUtil+'>>';   
    }//end of for
    return h;
}//end of createNavBar
//ͨ���������
XBObj.prototype.createRightHtmlByNav = function(index){
     var i=parseInt(index);
     var navObj=_xbRes.navList[i];
     _xbRes.navList.length=i;
     _xbRes.getResList(navObj.ksid,navObj.name,navObj.kstype);     
}

*/

XBObj.prototype.createRightHtml = function (versionid, leftMenuName, kstype) {


    var h = '<ul class="rightMenu" id="rightMenu" style="display=none"></ul>';//�Ҳ�˵�
    if (leftMenuName != "") {
        // h+='<div class="courseTitle">'+leftMenuName+'<span class=\"bgImg\"></span></div>'//������
    }
    h += '<ul class="resList" id="resList">'
    h += '</ul>';//�Ҳ���Դ

    //var previous = transferProtocol_web+_config["PLS"]+"/newteach/images/previous.png";
    $("#pageRightNav").hide();
    $(".mainRight").append('<DIV id=pageRightNavbar class="page pageRight" style="margin: 0 0px;"><DIV class=pageNext><A id="prove" onclick="_xbRes.proveFolder()"></A></DIV><DIV class=pageNow></DIV></DIV>');

    if (null != _pMain.getMainRight()) _pMain.getMainRight().innerHTML = h;
    this.navList.length = 0;
    if (versionid == teacherjyjg) versionid += "00";
    this.areaId = versionid;
    this.pagesize = _pMain.contentpagesize;
    this.getResList(versionid, leftMenuName, kstype);
    $('#rightMenu').hide();

}// end of 

//������һ��
XBObj.prototype.proveFolder = function () {
    //�Ƴ���ǰĿ¼�㼶����
    this.navList[this.navList.length - 1] = null;
    this.navList.length = this.navList.length - 1;
    //�Ƴ���ǰĩβ�㼶���Ǹ���
    areaid = this.navList[this.navList.length - 1].ksid;
    name = this.navList[this.navList.length - 1].name;
    kstype = this.navList[this.navList.length - 1].kstype;

    this.navList[this.navList.length - 1] = null;
    this.navList.length = this.navList.length - 1;
    _xbRes.getResList(areaid, name, kstype);
}

XBObj.prototype.getResList = function (areaid, name, type) {
    if (this.navList.length == 0) {
        $("#prove").hide();
    } else {
        $("#prove").show();
    }
    this.navList.push(new dirObj(areaid, name, type));

    //var data="pid="+areaid+"&c7="+type;
    var data = "pid=" + areaid;//150810У����Դ�İ�,ԭУ����Դȫ���Ͳ���ר����Դ��ʾ
    if (_xbRes.flag != 1) {
        data = data + "&c7=" + type;
    }
    ajaxJson(pls_config_all["PLS.192"], data, "gbk", function (xmldoc) {
        if (xmldoc && xmldoc != undefined && xmldoc.classes.length > 0) {
            _xbRes.createResDirList(xmldoc);
        } else {
            if (null != _pMain.getRightMenu()) {
                _pMain.getRightMenu().innerHTML = "";
                _pMain.getRightMenu().style.display = "none";
            }
            _xbRes.createContentHtml(areaid, name);
            return;
        }
    });
}

XBObj.prototype.createResDirList = function (xmldoc) {

    _xbRes.dirList.length = 0;
    var h = "";
    var resList = xmldoc.classes;
    for (var i = 0; i < resList.length; i++) {
        h = "";
        var resItem = resList[i]
        var code = resItem.code;
        var codes = '\'' + code + '\'';
        var name = resItem.name;
        var names = '\'' + name + '\'';
        var showway = resItem.view_type;
        var endflag = resItem.endflag;
        var menutype = "1";
        var kstype = resItem.ks_type;
        var kstypes = '\'' + kstype + '\'';
        var js = "_xbRes.getResList(" + codes + "," + names + "," + kstypes + ");";
        h = "<li><nobr><img src='images/folder.png' width=18 height=18  />";
        h += "<a posName='right' href=\"javascript:" + js + "\" >" + name + "</a>";
        h += '</nobr></li>';
        _xbRes.dirList.push(h);
    }
    if (_xbRes.dirList.length == 0)
        _xbRes.dirList.push("<li><center>" + _common.hasNoRes + "</center></li>");
    //var nav='<h4><nobr>'+_xbRes.createNavBar()+'</nobr></h4>';

    _pMain.getRightResList().innerHTML = _xbRes.dirList.join("");

    _common.splitpage(".resList li", 1, _xbRes.pagesize, "#pageRightNavbar .pageNow");
    _pMain.changePageHeight();//������ҳ��ťλ��
}//end od createRightDirArrayByXml


/*****************begin**********************/
//��������(����)
XBObj.prototype.createContentHtml = function (ksId, rightMenuName) {
    _common.count(ksId);
    var url = '';
    _xbRes.keList.length = 0;
    if (_xbRes.areaId == ksId) {//������Դ��ʾ
        _xbRes.createContentHtmlByJson();
    } else {
        url += transferProtocol_web + _config["PLS"] + "/youjiao/schoolResInfo.do";
        var data = "";
        if (_xbRes.areaId == teacherjyjg + "00") data = "schoolCode=" + teacherjyjg;
        //ר����Դ����ʽorderType=3
        data += "&listType=1&menuCode=" + ksId + "&deleteState=0&pageNum=150&page=1&orderType=3";
        ajaxJson(url, data, "gbk", _xbRes.createContentHtmlByJson);
    }
}// end of 
XBObj.prototype.createContentHtmlByJson = function (rjson) {
    if (rjson && rjson.ResInfo && rjson.ResInfo.length > 0) {
        for (i = 0; i < rjson.ResInfo.length; i++) {
            var h = "";
            var resourceNode = rjson.ResInfo[i];
            var resCode = resourceNode.RCode;
            var resFomat = resourceNode.RFormatMark;
            var resName = resourceNode.RTitle;
            var resTypeId = resourceNode.RTypecode;
            var resTypeName = resourceNode.RTypecodeName; //��Դ����
            var needPwd = resourceNode.wordFlag;//wordFlag 0 ������1 ��Ҫ��������
            var iconPath = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(resFomat) + ".png";
            var contentType = 1;
            var resPublisher = resourceNode.RPublisher;
            var res_savepath = '';
            var _resPublisher = "";
            if ('' != resPublisher && resPublishertype) {
                _resPublisher = " <span class='resPublisher'>(" + resPublisher + ")</span>";
            }
            var js = "player.playResource(\'" + resCode + "\',2,\'" + resFomat + "\');";
            var addIcon = "";
            if (needPwd == "1") {
                js = "bdzy.showbdPwd('" + resCode + "');";
                addIcon = '<img src="images/icon/jm.gif" width="22" height="22" />';
            }
            h = '<li><img width="22" height="22" src="' + iconPath + '" alt="" />' + addIcon + '<a href="#"  posName="right" onclick="' + js + '" title="' + resName + '"><nobr> ' + resName + '</nobr></a>' + _resPublisher + '</li>';
            _xbRes.keList.push(h);
        }// end of for
    }//end of if
    if (_xbRes.keList.length == 0) {
        _xbRes.keList.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    _pMain.getRightResList().innerHTML = _xbRes.keList.join("");
    _common.splitpage(".resList li", 1, _xbRes.pagesize, "#pageRightNavbar .pageNow");
    _pMain.changePageHeight();//������ҳ��ťλ��
}//end of createContentHtmlByXml