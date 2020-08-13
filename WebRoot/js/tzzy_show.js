/*********  �����Ķ� begin*********/

//_bendiDirUtil.clearNav();
//У��Ŀ¼  Util
function XiaobenDirObj(ksid, name, showWay, menu_type) {
    this.ksid = ksid;
    this.name = name;
    this.showWay = showWay;
    this.menu_type = menu_type;

}//end of У��Ŀ¼ �ṹ
/**֪ʶ��ϵ���ݶ��� end**/
/**************************��չ��Դ������*************************/
var tzzy = new TZZY();

function TZZY() {
    this.resList = new Array();
    this.flag = 1;
    this.url = null;
    this.menutype = null;
    this.selNode = null;
    this.paperSize = null;
}

TZZY.prototype.createLeftHtml = function (url) {
    this.paperSize = _pMain.menupagesize;
    var typeparent = 0;
    var url1 = url;
    url1 += '&typeparent=' + typeparent + '&type=json';
    ajaxJson(url1, null, "gbk", this.createLeftHtmlByJson);
}
TZZY.prototype.createLeftHtmlByJson = function (rdata) {
    tzzy.resList.length = 0;
    var h = "";
    if (rdata && rdata.classes && rdata.classes.menu && rdata.classes.menu.length > 0) {
        var menuNodes = rdata.classes.menu;//��ȡ
        var row = 0;//�к�
        for (i = 0; i < menuNodes.length; i++) {
            tzzy.resList.push("<dl id='tzzy_tree' class='course2'>");
            tzzy.resList.push();
            var menuNode = menuNodes[i];
            var class_name = "";//һ����Ŀ����
            var class_id = "";//һ����Ŀid
            var menu_type = "";// 0����1У��
            var showWay = 0;// 
            try {
                class_name = menuNode.class_name; //һ����Ŀ����
                class_id = menuNode.class_id; //һ����Ŀid
                showWay = menuNode.showWay;
                if (menuNode.menu_type[0]) {
                    menu_type = menuNode.menu_type[0];
                } else {
                    menu_type = 0;
                }//alert('һ����Ŀ����='+class_name);
                var subjectNodes = menuNode.subject;
                if (subjectNodes.length != 0) {
                    var p_classid = '\'' + class_id + '\'';
                    var p_classname = '\'' + class_name + '\'';
                    var p_menuType = '\'' + menu_type + '\'';
                    var p_showWay = '\'' + showWay + '\'';
                    row++;
                    var idstr = _common.createId(row, 0);
                    var js_temp = '';
                    tzzy.resList.push();
                    js_temp += 'tzzy.clickNode(this);_bendi.createRightHtml(' + p_classid + ',' + p_classname + ',' + p_menuType + ',' + p_showWay + ',' + p_classid + ');';
                    tzzy.resList.push('<dt  class="dtt" ><li><a  href=#  onclick="' + js_temp + '">' + class_name + '</a></li></dt>');
                } else {
                    tzzy.resList.push('<li><dt>' + class_name + '</dt></li>');
                    continue;
                }
                /**************����������Ŀ begin**************/
                for (j = 0; j < subjectNodes.length; j++) {

                    if ((j + 1) % 2) {
                        h = "";
                        h += "<li>";
                    }
                    if (j == subjectNodes.length - 1 || j == subjectNodes.length - 2) h += '<dd class="end">';
                    else h += '<dd>';
                    var subjectNode = subjectNodes[j];
                    var subjectname = subjectNode.subject_name;
                    subjectname = subjectname.replace(/\'/g, "��").replace(/\"/g, "��").replace(/</g, "��").replace(/>/g, "��");
                    var subjectid = subjectNode.subject_id;
                    var versionid = subjectid;

                    var p_subjectid = '\'' + subjectid + '\'';
                    var p_versionid = '\'' + versionid + '\'';
                    var p_subjectname = '\'' + subjectname + '\'';
                    var p_menu_type = '\'' + menu_type + '\'';
                    var showWay = subjectNode.showWay;
                    var p_showWay = '\'' + showWay + '\'';
                    var js = '';
                    js += 'tzzy.clickNode(this);_bendi.createRightHtml(' + p_versionid + ',' + p_subjectname + ',' + p_menu_type + ',' + p_showWay + ',' + p_subjectid + ');';
                    var subjectname_fit = subjectname;
                    if (subjectname_fit.length > 5) {
                        subjectname_fit = subjectname.substring(0, 4) + "��";
                    }
                    if ("1" == subjectNode.isUnit) {
                        h += '<span title="' + subjectname + '" style="color:#515151">' + '' + subjectname_fit + '</span>';
                    } else {
                        h += '<a id="' + idstr + '"href="#" onclick="' + js + '" title="' + subjectname + '">' + '' + subjectname_fit + '</a>';
                    }
                    h += '</dd>';
                    if ((j + 1) % 2 == 0 || j == subjectNodes.length - 1) {
                        h += '</li>'
                        tzzy.resList.push(h);
                    }

                }//end of inner for
            } catch (e) {
                alert(e.message);
            }
            tzzy.resList.push("</dl><span class='clearfix'></span>");
        }// end of for
        h = "<div class='courseName'>�����Ķ�</div>" + tzzy.resList.join("");
        h += '<div class=\"page pageLeft\" id=\"pageLeft\" ></div>'
        _pMain.getMainLeft().innerHTML = h;
        //$("#tzzy_tree").css("height",_pMain.height-110);
        _common.splitpage(".course2 li", 1, tzzy.paperSize, "#pageLeft", null, true);
        /**************����������Ŀ end**************/

    }


}

TZZY.prototype.createLeftHtmlByXml = function (xmldoc) {
    tzzy.resList.length = 0;
    var h = "";
    var menuNodes = xmldoc.selectNodes("//VCOM/classes/menu");//��ȡ
    var row = 0;//�к�
    for (i = 0; i < menuNodes.length; i++) {
        tzzy.resList.push("<dl id='tzzy_tree' class='course2'>");
        tzzy.resList.push();
        var menuNode = menuNodes[i];
        var class_name = "";//һ����Ŀ����
        var class_id = "";//һ����Ŀid
        var menu_type = "";// 0����1У��
        var showWay = 0;// 
        try {
            class_name = menuNode.selectNodes("class_name")[0].text; //һ����Ŀ����
            class_id = menuNode.selectNodes("class_id")[0].text; //һ����Ŀid
            showWay = menuNode.selectNodes("showWay")[0].text;
            if (menuNode.selectNodes("menu_type")[0]) {
                menu_type = menuNode.selectNodes("menu_type")[0].text;
            } else {
                menu_type = 0;
            }//alert('һ����Ŀ����='+class_name);
            var subjectNodes = menuNode.selectNodes("subject");
            if (subjectNodes.length != 0) {
                var p_classid = '\'' + class_id + '\'';
                var p_classname = '\'' + class_name + '\'';
                var p_menuType = '\'' + menu_type + '\'';
                var p_showWay = '\'' + showWay + '\'';
                row++;
                var idstr = _common.createId(row, 0);
                var js_temp = '';
                tzzy.resList.push();
                js_temp += 'tzzy.clickNode(this);_bendi.createRightHtml(' + p_classid + ',' + p_classname + ',' + p_menuType + ',' + p_showWay + ',' + p_classid + ');';
                tzzy.resList.push('<dt  class="dtt" ><li><a  href=#  onclick="' + js_temp + '">' + class_name + '</a></li></dt>');
            } else {
                tzzy.resList.push('<li><dt>' + class_name + '</dt></li>');
                continue;
            }
            /**************����������Ŀ begin**************/
            for (j = 0; j < subjectNodes.length; j++) {

                if ((j + 1) % 2) {
                    h = "";
                    h += "<li>";
                }
                if (j == subjectNodes.length - 1 || j == subjectNodes.length - 2) h += '<dd class="end">';
                else h += '<dd>';
                var subjectNode = subjectNodes[j];
                var subjectname = subjectNode.selectNodes("subject_name")[0].text;
                subjectname = subjectname.replace(/\'/g, "��").replace(/\"/g, "��").replace(/</g, "��").replace(/>/g, "��");
                var subjectid = subjectNode.selectNodes("subject_id")[0].text;
                var versionid = subjectid;

                var p_subjectid = '\'' + subjectid + '\'';
                var p_versionid = '\'' + versionid + '\'';
                var p_subjectname = '\'' + subjectname + '\'';
                var p_menu_type = '\'' + menu_type + '\'';
                var showWay = subjectNode.selectNodes("showWay")[0].text;
                var p_showWay = '\'' + showWay + '\'';
                var js = '';
                js += 'tzzy.clickNode(this);_bendi.createRightHtml(' + p_versionid + ',' + p_subjectname + ',' + p_menu_type + ',' + p_showWay + ',' + p_subjectid + ');';
                var subjectname_fit = subjectname;
                if (subjectname_fit.length > 5) {
                    subjectname_fit = subjectname.substring(0, 4) + "��";
                }
                if ("1" == subjectNode.selectNodes("isUnit")[0].text) {
                    h += '<span title="' + subjectname + '" style="color:#515151">' + '' + subjectname_fit + '</span>';
                } else {
                    h += '<a id="' + idstr + '"href="#" onclick="' + js + '" title="' + subjectname + '">' + '' + subjectname_fit + '</a>';
                }
                h += '</dd>';
                if ((j + 1) % 2 == 0 || j == subjectNodes.length - 1) {
                    h += '</li>'
                    tzzy.resList.push(h);
                }

            }//end of inner for
        } catch (e) {
            alert(e.message);
        }
        tzzy.resList.push("</dl><span class='clearfix'></span>");
    }// end of for
    h = "<div class='courseName'>�����Ķ�</div>" + tzzy.resList.join("");
    h += '<div class=\"page pageLeft\" id=\"pageLeft\" ></div>'
    _pMain.getMainLeft().innerHTML = h;
    //$("#tzzy_tree").css("height",_pMain.height-110);
    _common.splitpage(".course2 li", 1, tzzy.paperSize, "#pageLeft", null, true);
    /**************����������Ŀ end**************/
}
TZZY.prototype.clickNode = function (obj) {
    this.selNode = obj;
    _bendi.navList.length = 0;
}
/**************************��չ��Դ������*************************/


var _bendi = new BenDiRes();

function BenDiRes() {
    this.keList = new Array();//֪ʶ��ϵ���ݶ�������
    this.navList = new Array();
    this.dirList = new Array();

    this.flag = 1;//1-��ʾ����Դ�����з��� 2-���з���  
    this.id = null;
    this.name = null;
    this.menutype = null;
    this.showway = null;
    this.resid = null;
}

//����������Ŀ��������Ŀ(���)
/*BenDiRes.prototype.createNavBar = function(){
   var h='';
   var navList=_bendi.navList;
    for(var i=0;i<navList.length;i++)
    {
       var navObj=navList[i];
       var js_temp='_bendi.createRightHtmlByNav('+i+');';
       var start='<a href="javascript:'+js_temp+'">';
       var end='</a>';
       var navUtil=start+=navObj.name+end;
       h+=navUtil+'>>';
    }//end of for
    return h;
}//end of createNavBar
//ͨ���������
BenDiRes.prototype.createRightHtmlByNav = function(index){
     var i=parseInt(index);
     var navList=_bendi.navList;
     var navObj=navList[i];    	 
     this.navList.length=i;
     this.getResList(navObj.ksid,navObj.name,navObj.menu_type,navObj.showWay);          
}
*/
/*****************begin**********************/
//ͨ���������
BenDiRes.prototype.getResList = function (versionid, leftMenuName, menu_type, showWay, resId) {
    if (this.navList.length == 0) {
        $("#prove").hide();
    } else {
        $("#prove").show();
    }
    this.id = versionid;
    this.name = leftMenuName;
    this.resid = resId;
    this.menutype = menu_type;
    this.showway = showWay;
    this.navList.push(new XiaobenDirObj(versionid, leftMenuName, showWay, menu_type));

    var url = transferProtocol_web + _config["PLS"] + "/interfaces/sourceMenuSchool.do";
    url += '?menuType=' + menu_type + ':1&bcode=' + versionid + '&type=json';
    //sendRequest(this.createRightHtmlByXml,url);
    ajaxJson(url, null, "gbk", _bendi.createRightHtmlByJson);
}

//������һ��
BenDiRes.prototype.proveFolder = function () {

    //�Ƴ���ǰĿ¼�㼶����
    this.navList[this.navList.length - 1] = null;
    this.navList.length = this.navList.length - 1;
    //�Ƴ���ǰĩβ�㼶���Ǹ���
    ksid = this.navList[this.navList.length - 1].ksid;
    name = this.navList[this.navList.length - 1].name;
    showWay = this.navList[this.navList.length - 1].showWay;
    menu_type = this.navList[this.navList.length - 1].menu_type;

    this.navList[this.navList.length - 1] = null;
    this.navList.length = this.navList.length - 1;
    this.getResList(ksid, name, menu_type, showWay, ksid);
}

//�����ļ���Ŀ(�ұ߲�)
BenDiRes.prototype.createRightHtml = function (versionid, leftMenuName, menu_type, showWay, resId) {
    this.paperSize = (_pMain.contentpagesize);
    var h = '<ul class="rightMenu" id="rightMenu" style="display=none"></ul>';//�Ҳ�˵�
    h += '<div class="courseTitle">' + leftMenuName + '<span class=\"bgImg\"></span></div>'//������
    h += '<ul class="resList" id="resList"></ul>';//�Ҳ���Դ
    if (null != _pMain.getMainRight()) _pMain.getMainRight().innerHTML = h;

    //var previous = transferProtocol_web+_config["PLS"]+"/newteach/images/previous.png";
    $("#pageRightNav").hide();
    $(".mainRight").append('<DIV id=pageRightNavbar class="page pageRight" style="margin: 0 0px;"><DIV class=pageNext><A id="prove" onclick="_bendi.proveFolder()"></A></DIV><DIV class=pageNow></DIV></DIV>');

    this.getResList(versionid, leftMenuName, menu_type, showWay, resId);
}// end of 
//�����ļ���Ŀ(�ұ߲�)
BenDiRes.prototype.createRightHtmlByXml = function (xmldoc) {
    var classesNodes = xmldoc.selectNodes("//VCOM/classes/class");//��ȡ
    if (0 == classesNodes.length) {
        if (null != _pMain.getRightMenu()) {
            _pMain.getRightMenu().innerHTML = "";
            _pMain.getRightMenu().style.display = "none";
        }
        _bendi.createContentHtml(_bendi.id, _bendi.name);
        return;
    } else {//������Ŀ¼
        _bendi.createRightDirArrayByXml(xmldoc);
    }
}//end of createLeftHtmlByXml

BenDiRes.prototype.createRightHtmlByJson = function (rdata) {
    if (rdata && rdata.classes && rdata.classes.length >= 0) {
        //var classesNodes = ;//��ȡ
        if (rdata.classes.length == 0) {
            if (null != _pMain.getRightMenu()) {
                _pMain.getRightMenu().innerHTML = "";
                _pMain.getRightMenu().style.display = "none";
            }
            _bendi.createContentHtml(_bendi.id, _bendi.name);
            return;
        } else {//������Ŀ¼
            _bendi.createRightDirArrayByJson(rdata);
        }
    }
}//end of createLeftHtmlByXml


//�����ļ���Ŀ(�ұ߲�)���������Ҳ���Ŀ����
BenDiRes.prototype.createRightDirArrayByJson = function (rdata) {
    var h = "";
    _bendi.dirList.length = 0;
    var classesNodes = rdata.classes;//��ȡ
    for (i = 0; i < classesNodes.length; i++) {
        h = "";
        var classesNode = classesNodes[i];
        var ksid = '';
        if (classesNode.ksid.length > 0)
            ksid = classesNode.ksid;
        var name = '';
        if (classesNode.name.length > 0)
            name = classesNode.name;
        var showWay = '';
        if (classesNode.showWay.length > 0)
            showWay = classesNode.showWay;
        var menu_type = '';
        if (classesNode.menu_type.length > 0)
            menu_type = classesNode.menu_type;
        var p_ksid = '\'' + ksid + '\'';
        var p_name = '\'' + name + '\'';
        var p_menu_type = '\'' + menu_type + '\'';
        var p_showWay = '\'' + showWay + '\'';
        var js_function = '_bendi.getResList(' + p_ksid + ',' + p_name + ',' + p_menu_type + ',' + p_showWay + ');';
        h += '<li><nobr> ';
        h += '<img src="images/folder.png" width="18" height="18"= alt="" /> ';
        h += '<a posName="right" href="javascript:' + js_function + '">' + name + '</a>';
        h += '</nobr></li>';
        _bendi.dirList.push(h);
    }//end of for
    if (_bendi.dirList.length == 0)
        _bendi.dirList.push("<li><h3><center>" + _common.hasNoRes + "</center></h3></li>");

    _pMain.getRightResList().innerHTML = _bendi.dirList.join("");
    var pagesize = _pMain.contentpagesize;
    _common.splitpage(".resList li", 1, pagesize, "#pageRightNavbar .pageNow");
    _pMain.changePageHeight();//������ҳ��ťλ��
}//end od createRightDirArrayByJson
BenDiRes.prototype.createRightDirArrayByXml = function (xmldoc) {
    var h = "";
    _bendi.dirList.length = 0;
    var classesNodes = xmldoc.selectNodes("//VCOM/classes/class");//��ȡ
    for (i = 0; i < classesNodes.length; i++) {
        h = "";
        var classesNode = classesNodes[i];
        var ksid = '';
        if (classesNode.selectNodes("ksid").length > 0)
            ksid = classesNode.selectNodes("ksid")[0].text;
        var name = '';
        if (classesNode.selectNodes("name").length > 0)
            name = classesNode.selectNodes("name")[0].text;
        var showWay = '';
        if (classesNode.selectNodes("showWay").length > 0)
            showWay = classesNode.selectNodes("showWay")[0].text;
        var menu_type = '';
        if (classesNode.selectNodes("menu_type").length > 0)
            menu_type = classesNode.selectNodes("menu_type")[0].text;
        var p_ksid = '\'' + ksid + '\'';
        var p_name = '\'' + name + '\'';
        var p_menu_type = '\'' + menu_type + '\'';
        var p_showWay = '\'' + showWay + '\'';
        var js_function = '_bendi.getResList(' + p_ksid + ',' + p_name + ',' + p_menu_type + ',' + p_showWay + ');';
        h += '<li><nobr> ';
        h += '<img src="images/folder.png" width="18" height="18"= alt="" /> ';
        h += '<a posName="right" href="javascript:' + js_function + '">' + name + '</a>';
        h += '</nobr></li>';
        _bendi.dirList.push(h);
    }//end of for
    if (_bendi.dirList.length == 0)
        _bendi.dirList.push("<li><h3><center>" + _common.hasNoRes + "</center></h3></li>");

    _pMain.getRightResList().innerHTML = _bendi.dirList.join("");
    var pagesize = _pMain.contentpagesize;
    _common.splitpage(".resList li", 1, pagesize, "#pageRightNavbar .pageNow");
    _pMain.changePageHeight();//������ҳ��ťλ��
}//end od createRightDirArrayByXml

// �����Ҳ���Ŀҳ��
/***************end ************************/
/*****************begin**********************/
BenDiRes.prototype.createContentHtml = function (ksId, rightMenuName) {
    _common.count(ksId);
    var url = '';
    if ('0' == _bendi.menutype) {
        url = transferProtocol_web + _config["PLS"] + "/interfaces/baseresources.do?ks_id=" + ksId;
        url += '&type=json';
    } else {
        url = transferProtocol_web + _config["PLS"] + "/interfaces/basereSourcesSchool.do?ks_id=" + ksId;
        url += '&type=json';
    }
    //sendRequest(_bendi.createContentHtmlByXml,url);   
    ajaxJson(url, null, "gbk", _bendi.createContentHtmlByJson);
}// end of 
BenDiRes.prototype.createContentHtmlByJson = function (rdata) {
    var resourceNodes = rdata.resources;//��ȡ
    _bendi.keList.length = 0;//�������
    var resTypeNameList = new Array();
    for (i = 0; i < resourceNodes.length; i++) {
        var h = "";
        var resourceNode = resourceNodes[i];
        var resCode = resourceNode.res_code;
        var resFomat = resourceNode.res_format;
        var resName = 'resNameΪnull';
        if (resourceNode.res_name.length > 0)
            resName = resourceNode.res_name;
        resTypeId = resourceNode.res_type;
        resTypeName = resourceNode.res_type_name; //��Դ����
        iconPath = resourceNode.imagepic; //ͼƬ·��

        var RFormatMark = resourceNode.res_format; //ͼƬ·��
        try {
            RFormatMark = RFormatMark.toLowerCase();
        } catch (e) {
        }
        var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
        if (RFormatMark != "null" && RFormatMark != "") {
            imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\"  />";
        }

        var resPublisher = '';
        try {
            resPublisher = resourceNode.selectNodes("res_publisher")[0].text;//������
        } catch (e) {
        }
        var res_savepath = '';
        try {
            res_savepath = resourceNode.selectNodes("res_savepath")[0].text;// 
        } catch (e) {
        }
        var res_imgs = '';
        try {
            res_imgs = resourceNode.selectNodes("res_imgs")[0].text;// 
        } catch (e) {
        }

        var _resPublisher = "";
        if ('' != resPublisher && resPublishertype) {
            _resPublisher = " <span class='resPublisher'>(" + resPublisher + ")</span>";
        }
        var resTypeId_p = '\'' + resTypeId + '\'';
        var resCode_p = '\'' + resCode + '\'';
        var resFomat_p = '\'' + resFomat + '\'';
        var resName_p = '\'' + resName + '\'';
        var js = ' player.playResource(' + resCode_p + ',2,' + resFomat_p + ');';
        h += '<li>' + imagepic;
        h += '<a href="#"  posName="right"  onclick="' + js + '" title="' + resName + '">';
        h += '<nobr> ' + resName + '</nobr></a>' + _resPublisher + '</li>';
        _bendi.keList.push(h);
    }// end of for
    if (_bendi.keList.length == 0)
        _bendi.keList.push("<li><h3><center>" + _common.hasNoRes + "</center></h3></li>");
    _pMain.getRightResList().innerHTML = _bendi.keList.join("");
    var pagesize = _pMain.contentpagesize;
    _common.splitpage(".resList li", 1, pagesize, "#pageRightNavbar .pageNow");
}
BenDiRes.prototype.createContentHtmlByXml = function (xmldoc) {
    var resourceNodes = xmldoc.selectNodes("//VCOM/resources/resource");//��ȡ
    _bendi.keList.length = 0;//�������
    var resTypeNameList = new Array();
    for (i = 0; i < resourceNodes.length; i++) {
        var h = "";
        var resourceNode = resourceNodes[i];
        var resCode = resourceNode.selectNodes("res_code")[0].text;
        var resFomat = resourceNode.selectNodes("res_format")[0].text;
        var resName = 'resNameΪnull';
        if (resourceNode.selectNodes("res_name").length > 0)
            resName = resourceNode.selectNodes("res_name")[0].text;
        resTypeId = resourceNode.selectNodes("res_type")[0].text;
        resTypeName = resourceNode.selectNodes("res_type_name")[0].text; //��Դ����
        iconPath = resourceNode.selectNodes("imagepic")[0].text; //ͼƬ·��

        var RFormatMark = resourceNode.selectNodes("res_format")[0].text; //ͼƬ·��
        try {
            RFormatMark = RFormatMark.toLowerCase();
        } catch (e) {
        }
        var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png\"  />";
        if (RFormatMark != "null" && RFormatMark != "") {
            imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\"  />";
        }

        var resPublisher = '';
        try {
            resPublisher = resourceNode.selectNodes("res_publisher")[0].text;//������
        } catch (e) {
        }
        var res_savepath = '';
        try {
            res_savepath = resourceNode.selectNodes("res_savepath")[0].text;// 
        } catch (e) {
        }
        var res_imgs = '';
        try {
            res_imgs = resourceNode.selectNodes("res_imgs")[0].text;// 
        } catch (e) {
        }

        var _resPublisher = "";
        if ('' != resPublisher && resPublishertype) {
            _resPublisher = " <span class='resPublisher'>(" + resPublisher + ")</span>";
        }
        var resTypeId_p = '\'' + resTypeId + '\'';
        var resCode_p = '\'' + resCode + '\'';
        var resFomat_p = '\'' + resFomat + '\'';
        var resName_p = '\'' + resName + '\'';
        var js = ' player.playResource(' + resCode_p + ',2,' + resFomat_p + ');';
        h += '<li>' + imagepic;
        h += '<a href="#"  posName="right"  onclick="' + js + '" title="' + resName + '">';
        h += '<nobr> ' + resName + '</nobr></a>' + _resPublisher + '</li>';
        _bendi.keList.push(h);
    }// end of for
    if (_bendi.keList.length == 0)
        _bendi.keList.push("<li><h3><center>" + _common.hasNoRes + "</center></h3></li>");
    _pMain.getRightResList().innerHTML = _bendi.keList.join("");
    var pagesize = _pMain.contentpagesize;
    _common.splitpage(".resList li", 1, pagesize, "#pageRightNavbar .pageNow");
}//end of createContentHtmlByXml
