/**���ݶ��� begin**/
var _yingyongContentObj = new yingyongContentObj();

function yingyongContentObj(path, name, imgpath) {
    this.path = path;
    this.name = name;
    this.imgpath = imgpath;
    this.cmsurl = null;
    this.pageId = "ke.page";
    this.menu_type;// 0����1У�� _yingyongContentObj.menu_type
    this.showWay;//1  9����ͼƬչʾ

}//end of ֪ʶ��ϵ���ݶ���


//��һҳ
yingyongContentObj.prototype.nextPage = function () {
    //alert(this.pageId.innerHTML);
    //alert(document.getElementById(divid).getElementsByTagName('a').length);
    //alert(document.activeElement.innerHTML);
    //alert(document.activeElement.posName);

    var isStr = this.pageId;//�Ҳ����¼�
    //alert(document.activeElement.posName);
    try {
        if ('right' != document.activeElement.posName) {
            isStr = 'id_leftPage';//������¼�
        }

    } catch (e) {
    }

    //id_leftPage
    var obj = document.getElementById(isStr).getElementsByTagName('a');
    for (var i = 0; i < obj.length; i++) {
        var currObj = obj[i];
        var text = currObj.innerHTML.replace(/\s/g, '');
        //alert(obj[i].src +'  '+obj[i].innerHTML+'  '+text);
        if (text == '��һҳ') {
            currObj.click();
            break;
        }

    }//end of for


}//��һҳ

//��һҳ
yingyongContentObj.prototype.upPage = function () {
    var isStr = this.pageId;//�Ҳ����¼�
    try {
        if ('right' != document.activeElement.posName) {
            isStr = 'id_leftPage';//������¼�
        }

    } catch (e) {
    }

    //
    var obj = document.getElementById(isStr).getElementsByTagName('a');
    for (var i = 0; i < obj.length; i++) {
        var currObj = obj[i];
        var text = currObj.innerHTML.replace(/\s/g, '');
        // alert(obj[i].src +'  '+obj[i].innerHTML+'  '+text);
        if ('��һҳ' == text) {
            currObj.click();
            break;
        }

    }//end of for

}//��һҳ


/**֪ʶ��ϵ���ݶ��� end**/




//��ѧӦ��
var _yingyongRes = new yingyongRes();

function yingyongRes(flag, url, menu_type) {

    this.leftChannelList = new Array();//һ����Ŀ��������Ŀ

    this.keList = new Array();//֪ʶ��ϵ���ݶ�������
    this.rightMenuName = '';
    this.leftMenuName = '';
    this.leftMenuid = '';
    this.title = "";
    this.flag = flag;//1-��ʾ����Դ�����з��� 2-���з���
    this.url = url;

    this.menu_type;// 0����1У��
    //this.showWay;//1-ͼƬչʾ

}

//����������Ŀ��������Ŀ(���)
//typeparentΪ0������ʾһ�����࣬1��ʾһ������
yingyongRes.prototype.createLeftHtml = function (title, typeparent) {
    this.title = title;
    typeparent = 0;
    //
    var h = '<ul class="rightMenu" id="rightMenu" style="display=none"></ul>';//�Ҳ�˵�
    h += '<ul class="resList" id="resList"></ul>';//�Ҳ���Դ
    h += '<div class="page" id="resPage"></div>';//��Դ��ҳ
    if (null != _pMain.getMainRight()) _pMain.getMainRight().innerHTML = h;

    //var data="data={\"areaId\":\""+areaId+"\",\"schoolCode\":\""+teacherjyjg+"\"}"; 
    ajaxJson(pls_config_all["CMS.LM.A01008001"], "", "utf-8", this.createLeftHtmlByJSON);
}
//����������Ŀ��������Ŀ(���)
yingyongRes.prototype.createLeftHtmlByJSON = function (xmldoc) {
    _common.count("");
    var rowCount = 0;
    var rowC = 0;
    var row = 0;//�к�
    var mainLefthtmlbody = "<dl class=\"course\"><dt>Ӧ����Ŀ</dt>", typecount = 0;
    var indextype = 0;
    var jsonarray = new Array();
    $(xmldoc.channelList).each(function (j) {//��������治����ʾ����Ŀ
        if ($(this).attr("isshow") == 1) {
            jsonarray.push($(this));
        }
    })
    $(jsonarray).each(function (j) {
        var js_function = '_bendiDirUtil.setRightClickFrom();currentsubject.createContentHtml(\'' + $(this).attr("channelcode") + '\',\'' + $(this).attr("channelname") + '\');';
        if (j == jsonarray.length) {
            mainLefthtmlbody += "<dd class=\"end\"><li><a move=\"left\" id=index_" + (++indextype) + "_0 href=\"#\" onclick=\"" + js_function + "\" title=\"" + $(this).attr("channelname") + "\">" + $(this).attr("channelname") + "</a></li></dd>";
        } else {
            mainLefthtmlbody += "<dd><li><a move=\"left\" id=index_" + (++indextype) + "_0 href=\"#\" onclick=\"" + js_function + "\" title=\"" + $(this).attr("channelname") + "\">" + $(this).attr("channelname") + "</a></li></dd>";
        }
        if (j != 0 && j % _pMain.menupagesize == 0) {
            currentsubject.leftChannelList[currentsubject.leftChannelList.length] = mainLefthtmlbody;
            mainLefthtmlbody = "";
        } else if ((j + 1) == jsonarray.length) {
            currentsubject.leftChannelList[currentsubject.leftChannelList.length] = mainLefthtmlbody;
        }
    })
    currentsubject.createLeftHtmlByPageIndex(1, true);
}
yingyongRes.prototype.createLeftHtmlByPageIndex = function (pageIndex, clickFlag) {
    var h = '';
    h += '<div class="courseName">' + currentsubject.title + '</div>';
    //h+='<DT>dfds</DT>';
    var hD = currentsubject.leftChannelList[pageIndex - 1];

    //alert(hD);
    /**ǰ����� begin*/
    var hStart = '<dl class="course">';
    if (false == hD.startWith(hStart)) {
        hD = hStart + hD;
    }
    var hEnd = '</dl><span class="clearfix"></span>';
    if (false == hD.endWith(hEnd)) {
        hD += hEnd;
    }
    /**ǰ����� end*/


    // alert(hD.startWith('<dl class="course2">'));
    //'<dl class="course2">'
    h += hD;
    h += currentsubject.createLeftHtmlByPageBar(pageIndex);
    if (null != _pMain.getMainLeft()) _pMain.getMainLeft().innerHTML = h;
    _pMain.changePageHeight();//������ҳ��ťλ��

    //���ý���
    try {
        var idStr = "index_1_0";
        document.getElementById(idStr).focus();
        document.getElementById(idStr).click();
        _yingyongDirUtil.clickFrom = 'left';
    } catch (e) {
    }

}
yingyongRes.prototype.createLeftHtmlByPageBar = function (pageIndex) {
    var h = '';
    h += '<DIV class="page pageLeft" id="id_leftPage" posName="left">';

    /******ҳ�밴ť begin******/
    h += '<DIV class=pageNext >';
    /******��ʾ��һҳ begin******/
    if (pageIndex < currentsubject.leftChannelList.length) {
        var nextPage = pageIndex + 1;
        var jsStr = 'currentsubject.createLeftHtmlByPageIndex(' + nextPage + ');';
        h += '<A  title=��һҳ onclick=' + jsStr + ' href="#">��һҳ</A>';
    }
    /*****��ʾ��һҳ end*******/

    /******��ʾ��һҳ begin******/
    if (pageIndex > 1) {
        var upPage = pageIndex - 1;
        var jsStr = 'currentsubject.createLeftHtmlByPageIndex(' + upPage + ');';
        h += '<A  title=��һҳ onclick=' + jsStr + ' href="#">��һҳ</A>';
    }
    /*****��ʾ��һҳ end*******/
    h += '</DIV>';
    /******ҳ�밴ť end******/
    h += '';

    //
    if (currentsubject.leftChannelList.length == 0) {
        h += '<DIV class=pageNow>1/1</DIV>';
    } else {
        h += '<DIV class=pageNow>' + pageIndex + '/' + currentsubject.leftChannelList.length + '</DIV>';
    }
    h += '';
    h += '</DIV>';
    return h;

}

//���������б�
yingyongRes.prototype.createRightHtmlByJSON = function (xmldoc) {
    if (null != _pMain.getRightMenu()) {
        _pMain.getRightMenu().innerHTML = "";
        _pMain.getRightMenu().style.display = "none";
    }
    currentsubject.createContentHtml(currentsubject.leftMenuid, currentsubject.leftMenuName);

}//end of createLeftHtmlByXml


/*****************begin**********************/
//��������(����)
yingyongRes.prototype.createContentHtml = function (areaid, rightMenuName) {

    this.rightMenuName = rightMenuName;

    var datfile = "";
    for (var i = areaid.length; i >= 0; i -= 3) {
        datfile = areaid.substring(0, i) + "/" + datfile;
    }
    _yingyongContentObj.showWay = 0;
    var data = "readfile=" + datfile + "list.json&aa=";
    ajaxJson(pls_config_all["CMS.COMMONCMS"], data, "utf-8", this.createContentHtmlByJSON);


}// end of 
yingyongRes.prototype.createContentHtmlByJSON = function (xmldoc) {
    /******����Ϊ���� begin*******/
    currentsubject.keList.length = 0;//�������

    var resTypeNameList = new Array();
    $(xmldoc.infosList).each(function () {
        currentsubject.keList[currentsubject.keList.length] = new yingyongContentObj($(this).attr("filepath"), $(this).attr("title"), $(this).attr("abbrevpic"));
    });
    //1-��ʾ9����
    if ('1' == _yingyongContentObj.showWay) {
        //alert("createImgContentHtmlByPageIndex");
        currentsubject.createImgContentHtmlByPageIndex(1);//���ʵ�һҳ
    } else {
        // alert("createContentHtmlByPageIndex");
        currentsubject.createContentHtmlByPageIndex(1);//���ʵ�һҳ
    }

    //}else{
    //  _common.timeout(null);//��ʱ
    //}
}//end of createContentHtmlByXml
yingyongRes.prototype.playcontent = function (path, title) {
    var heights = screen.height;
    var width = screen.width;
    if (currentsubject.cmsurl == null) {
        currentsubject.cmsurl = transferProtocol_web + _config["CMS"];//ȡcmsϵͳ��ַ
    }
    title = encodeURIComponent(encodeURIComponent(title));
    path = encodeURIComponent(currentsubject.cmsurl + path + "?bbt=true");

    var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/playcms.jsp?filepath=" + path + "&title=" + title;
    _common.openResPage(width, heights, url);
}

/******��ҳҳ�洴�� html begin***/
yingyongRes.prototype.createContentHtmlByPageIndex = function (pageIndex, focusFlag) {
    var row = 0;
    var h = '';
    var rightMenuName = currentsubject.rightMenuName;
    h += '<h4><nobr>' + rightMenuName + '</nobr></h4>';

    var pageSize = _pMain.contentpagesize;
    var start = (pageIndex - 1) * pageSize;
    for (i = start; i < currentsubject.keList.length && i < (start + pageSize); i++) {
        var keObj = currentsubject.keList[i];
        var resName = keObj.name;
        var playpath = keObj.path;
        var iconPath = "newImages/res/html.png";
        var content = resName;

        var line = 3;
        if (null != _pMain.getRightMenu() && _pMain.getRightMenu().style.display == "none") line = 2;
        var idstr = _common.createId(++row, line);
        h += '<li><img src="../' + iconPath + '" alt="" /><a href="javascript:currentsubject.playcontent(\'' + playpath + '\',\'' + resName + '\');"  posName="right" id="' + idstr + '" title="' + resName + '"><nobr> ' + content + '</nobr></a></li>';

        h += '</ul>';


    }// end of for


    if (null != _pMain.getRightResList()) {
        _pMain.getRightResList().className = 'resList';
        _pMain.getRightResList().innerHTML = h;
    }

    /******������ҳ��ť begin*****/
    var maxPageNum;
    if (currentsubject.keList.length / pageSize > parseInt(currentsubject.keList.length / pageSize))
        maxPageNum = parseInt(currentsubject.keList.length / pageSize) + 1;
    else
        maxPageNum = parseInt(currentsubject.keList.length / pageSize);


    var upPageIndex = pageIndex - 1;//��һҳ��ť
    var downPageIndex = pageIndex + 1;//��һҳ��ť

    var js = '';
    var tip = pageIndex + '/' + maxPageNum;
    if (maxPageNum == 0) {
        tip = "1/1";
    }

    var bHtml = '';
    bHtml += '<div posName="right" class="page pageRight" id="' + _yingyongContentObj.pageId + '" >';


    if (downPageIndex <= maxPageNum) {
        //�����һҳ��ť
        js = "currentsubject.createContentHtmlByPageIndex(" + downPageIndex + ",1)";//alert(js);
        bHtml += '<div class="pageNext"><a href="#"  onclick="' + js + '" title="��һҳ">��һҳ</a></div>';

    }

    if (upPageIndex > 0) {
        //�����һҳ��ť
        js = "currentsubject.createContentHtmlByPageIndex(" + upPageIndex + ",1)";//alert(js);

        bHtml += '<div class="pageNext"><a href="#"  onclick="' + js + '" title="��һҳ">��һҳ</a></div>';
    }
    bHtml += '<div class="pageNow">' + tip + '</div>';

    bHtml += '</div>';
    // alert(js);
    if (null !== _pMain.getRightResPage()) {
        _pMain.getRightResPage().innerHTML = bHtml;
        _pMain.changePageHeight();//������ҳ��ťλ��
    }

    if (null != _pMain.getMainRight()) {
        _pMain.getMainRight().style.display = "";
    }
    /******������ҳ��ť end*****/
}
/******��ҳҳ�洴�� html end***/


/******��ҳ������ÿ����������Դҳ�� html begin***/
yingyongRes.prototype.createImgContentHtmlByPageIndex = function (pageIndex, focusFlag) {
    //alert('��ҳ����У����Դҳ�� ');
    var row = 0;
    var h = '';
    h += '';
    var rightMenuName = currentsubject.rightMenuName;

    h += '<h4><nobr>' + rightMenuName + '</nobr></h4>';


    var pageSize = 9;
    var rowNumLimit = 3;//ÿ����ʾ��Դ����
    var line = 3;


    var start = (pageIndex - 1) * pageSize;
    var resCount = 0;
    for (i = start; i < currentsubject.keList.length && i < (start + pageSize); i++) {

        var keObj = currentsubject.keList[i];
        var resName = keObj.name;
        //
        var iconPath = keObj.imgpath;
        var playpath = keObj.path;
        var content = resName;

        row = parseInt(resCount / rowNumLimit);
        row++
        var idstr = _common.createId(row, (line + (resCount % rowNumLimit - 1)));

        var remark = '';


        //end of if-else


        h += '<li >';
        h += '<a href="javascript:currentsubject.playcontent(\'' + playpath + '\',\'' + resName + '\');"  posName="right" id="' + idstr + '" title="' + resName + '">';
        h += '<p><img  remark="' + resName + '" name="yingyongResImg" src="' + iconPath + '" "/></p>';
        h += '';
        //content=    'Birthdays Around the World';
        h += content + '</a></li>';


        //h+='</ul>';

        resCount++;
    }// end of for


    if (null != _pMain.getRightResList()) {
        _pMain.getRightResList().className = 'resList';
        _pMain.getRightResList().innerHTML = h;
    }


    /******������ҳ��ť begin*****/
    var maxPageNum;
    if (currentsubject.keList.length / pageSize > parseInt(currentsubject.keList.length / pageSize))
        maxPageNum = parseInt(currentsubject.keList.length / pageSize) + 1;
    else
        maxPageNum = parseInt(currentsubject.keList.length / pageSize);


    var upPageIndex = pageIndex - 1;//��һҳ��ť
    var downPageIndex = pageIndex + 1;//��һҳ��ť

    var js = '';
    var tip = pageIndex + '/' + maxPageNum;
    if (maxPageNum == 0) {
        tip = "1/1";
    }
    var bHtml = '';
    bHtml += '<div posName="right" class="page pageRight" id="' + _yingyongContentObj.pageId + '" >';


    if (downPageIndex <= maxPageNum) {
        //�����һҳ��ť
        js = "currentsubject.createImgContentHtmlByPageIndex(" + downPageIndex + ",1)";//alert(js);
        bHtml += '<div class="pageNext"><a href="#"  onclick="' + js + '" title="��һҳ">��һҳ</a></div>';

    }

    if (upPageIndex > 0) {
        //�����һҳ��ť
        js = "currentsubject.createImgContentHtmlByPageIndex(" + upPageIndex + ",1)";//alert(js);

        bHtml += '<div class="pageNext"><a href="#"  onclick="' + js + '" title="��һҳ">��һҳ</a></div>';
    }
    bHtml += '<div class="pageNow">' + tip + '</div>';

    bHtml += '</div>';
    // alert(js);
    if (null !== _pMain.getRightResPage()) {
        _pMain.getRightResPage().innerHTML = bHtml;
        //alert(focusFlag);
        if (1 == focusFlag || 'left' != _yingyongDirUtil.clickFrom) {
            try {
                document.getElementById("index_1_2").focus();//��һ����Դ����ѡ�У����2�����
                //alert('??');
            } catch (e) {
                try {
                    document.getElementById("index_1_2").focus();//��һ����Դ����ѡ�У����3�����
                } catch (e) {
                }
            }
        }//end of if
    }

    if (null != _pMain.getMainRight()) {
        _pMain.getMainRight().style.display = "";
    }
    /******������ҳ��ť end*****/

}

