//<script type="text/javascript" src="hdkt/praise/js/layer.js"></script>
//<script type="text/javascript" src="pad/js/artDialog.js" ></script>
//<script type="text/javascript" src="pad/js/iframeTools.js" ></script>
var _naUtil = new NavUtilObj();

/*
 * �˵�������󣬸���һ�������˵���ҵ����
 */
function NavUtilObj() {
    this.currPos;//1-�Ϸ� 2-�·� _naUtil.currPos
    this.mainMenuList = new Array();//һ���˵��б�
    this.secendMainMenuList = new Array();//�����˵��б�
    this.mainMoreMenuPosFlag = 0;//1-��ʾ��More���˵� _naUtil.mainMoreMenuPosFlag
    this.navlength = 6;//1807����֮ǰ�汾��̬������ʾ��Ŀ����
    this.selectMenu = null;//��ǰѡ�в˵�
    this.menulength = 6;//��ʼ��չʾ��ǰ����Ӧ�ã��������ڸ�������
    this.selectMenuName = '��ǰԤϰ';//��ǰѡ�еĲ˵�����
    this.isFirstLoad = true;//�Ƿ��״μ���
    //150318��ͬ�ֱ�����Ӧ����Ϊ������Ļ����Զ���Ӧ
    //���ֱ��ʱ���С��4:3ʱ����4:3����
    if (screen.width > 1024 && screen.width / screen.height >= 4 / 3) {
        var baseWidth = screen.width / screen.height * 768;
        this.navlength = Math.floor((baseWidth - 1024) / 91) + 9;
    }

}

/*
 * �˵��࣬
 */
function Menu() {
    this.name;//�˵�����
    this.menuid;//�˵�id
    this.method;//�˵���Ӧʱ��
}

//���˵�����뵽һ���˵��б�
NavUtilObj.prototype.addMainMenuList = function (menuObj) {
    this.mainMenuList[this.mainMenuList.length] = menuObj;
}
//���˵�����뵽�����˵��б���
NavUtilObj.prototype.addSecendMainMenuList = function (menuObj) {
//��ð�ݷ�ʽ�Զ����˵�����˳���������
    try {
        if (this.secendMainMenuList.length == 0) {
            this.secendMainMenuList[0] = menuObj;
            return;
        }
        for (var i = this.secendMainMenuList.length; i >= 0; i--) {
            if (i == 0) {
                this.secendMainMenuList[0] = menuObj;
            } else if (Number(this.secendMainMenuList[i - 1].orderid) <= Number(menuObj.orderid)) {
                this.secendMainMenuList[i] = menuObj;
                break;
            } else {
                this.secendMainMenuList[i] = this.secendMainMenuList[i - 1];
            }
        }
    } catch (e) {
        this.secendMainMenuList[this.secendMainMenuList.length] = menuObj;
    }
}
//���õ�����ѡ��״̬
NavUtilObj.prototype.setMenuSelectStatus = function (currObj) {
    if (undefined == currObj || null == currObj) return;
    try {
        if ($(currObj).parent().parent().attr("id") == "menuNew") {//�����һ������
            $("#menuNew a").each(function () {
                $(this).removeClass("sel");
            });
            $(currObj).addClass("sel");
        } else if ($(currObj).parent().parent().attr("id") == "secendmenu") {//������Ƕ�������
            $("#secendmenu li").each(function () {
                $(this).removeClass("sel");
                $(this).removeClass("on");
            });
            $(currObj).parent().addClass("sel");
            $(currObj).parent().addClass("on");
        } else if ($(currObj).parent().parent().attr("id") == "menuNewMore") {
            $("#menuNewMore a").each(function () {
                $(this).removeClass("sel");
            });
            $(currObj).addClass("sel");
        }
    } catch (e) {
        alert("���󣡣�" + e);
    }
}
//����һ���˵���
NavUtilObj.prototype.createMenuHtml = function () {
    //CHL  2019.02.28       ����ƽ̨       ����̩��ʵ���׶�԰  ��������ȫ�汾����ʾ
    if ("320205001015" == schoolId) {
        $("#userVersionInfo").hide();
    }
    var url = "getSKCustomMenuXml.do";
    //var data="1=test&ajaxdate="+new Date();
    ajaxJson(url, null, "gbk", this.createMenuHtmlByJson);

}
///����json���ݴ����˵���
NavUtilObj.prototype.createMenuHtmlByJson = function (rjson) {

    if (rjson && rjson.length > 0) ;
    else return;
    var grantStr = "";
    //��ƷȨ�޹���
    if (!_common.isBlank(prductGrant) && prductGrant.appNumbersNoGrant != null && prductGrant.appNumbersNoGrant.length > 0) {
        for (var i = 0; i < prductGrant.appNumbersNoGrant.length; i++) {
            grantStr = grantStr + "," + prductGrant.appNumbersNoGrant[i].replace("tls_menu", "");
        }
        grantStr = grantStr + ",";
    }
    for (var i = 0; i < rjson.length; i++) {
        var m = rjson[i];
        //��ƷȨ�޹���
        if (grantStr.indexOf(m.menuid) == -1) {
            //ѧ�ι���
            var showStage = m.c2;
            if (!_common.isBlank(schoolStage)) {
                if (!_common.isBlank(showStage)) {
                    var passStageFilt = false;
                    if (schoolStage.indexOf(",") > -1) {
                        var stageArr = schoolStage.split(",");
                        for (var si = 0; si < stageArr.length; si++) {
                            if (showStage.indexOf(stageArr[si]) > -1) {
                                passStageFilt = true;
                                break;
                            }
                        }
                    } else if (showStage.indexOf(schoolStage) > -1) {
                        passStageFilt = true;
                    }
                    if (!passStageFilt) {
                        continue;
                    }
                }
            }
            try {
                var menuObj = new Menu();
                menuObj.name = m.name;
                menuObj.menuid = m.menuid;
                menuObj.method = m.jsFunction;
                menuObj.orderid = m.sortnum;
                menuObj.c3 = m.c3;
                var class_id_array = menuObj.menuid.split(".");
                //�������һ��������Ŀ�б�
                if (class_id_array.length > 2) {
                    _naUtil.addSecendMainMenuList(menuObj);
                    continue;
                } else {
                    _naUtil.addMainMenuList(menuObj);
                }
            } catch (e) {
                alert('addMainMenuList' + e.message);
            }
        }
    }//for rjson

    $("#menuNew").html("");
    $("#menuNewMore").html("");
    for (var mi = 1; mi <= _naUtil.mainMenuList.length; mi++) {
        var h = "";
        var menuObj = _naUtil.mainMenuList[mi - 1];
        if (mi <= _naUtil.menulength) {
            var iconClass = '';
            if (_common.isBlank(menuObj.c3)) {
                iconClass = 'ktbg';
            } else {
                iconClass = menuObj.c3;
            }
            h = '<li><a menuid="' + menuObj.menuid + '" move="top" id="index_' + mi + '" href="#" onclick=' + menuObj.method + '><i class="icont ' + iconClass + '"></i>' + menuObj.name + '</a></li>';
            $("#menuNew").append(h);
            if (mi == _naUtil.menulength) {
                h = '<li id="index_' + _naUtil.menulength + '" style="cursor:pointer;" class="more-click" onclick="_naUtil.openMoreWindow(this,event);"><a>����Ӧ��</a></li>';
                $("#menuNew").append(h);
            }
        } else {
            var method = '_naUtil.closeMoreWindow(\'index_' + _naUtil.menulength + '\');' + menuObj.method;
            h = '<li><a menuid="' + menuObj.menuid + '" ismore="true" href="#" onclick=' + method + '>' + menuObj.name + '</a></li>';
            $("#menuNewMore").append(h);
        }
    }
    if (loginStyle == "0") {
        $(".closeBtn").show();
    }
    //document.getElementById("menu").style.display="";

    //������YD�޸Ľ�ѧ���̲˵�Ϊ�ҵ�����
    if (_common.cssName == "yidonghei") {
        $("#menuNew").html($("#menuNew").html().replace("��ѧ����", "�ҵ�����"));
    }
    //�ж��û��༶ѡ��
    _commonDiv.showUserClassName();
}
//�رո���Ӧ�õ���
NavUtilObj.prototype.closeMoreWindow = function (mid) {
    document.getElementById('menuNewMore').style.display = "none";
    /*
    //20180727ȡ����Ŀѡ��Ч��
    if(mid){
        $("#menuNewMore .sel").removeClass("sel");
        document.getElementById(mid).className = "sel";
    }
    */
}


//�򿪸���Ӧ��
NavUtilObj.prototype.openMoreWindow = function (obj, event) {
    stopPropagation(event);
    try {
        var moreMenu = document.getElementById('menuNewMore');
        //�������Ӧ�ð�ť������˵��б���������ʾ�������ʾ�������ز˵��б�
        if (moreMenu.style.display == "block") {
            moreMenu.style.display = "none";
            return;
        }
        //var h='<ul class="menuMore" id="menuMore">';

        //end of for

        moreMenu.style.display = "block";
        //moreMenu.style.zoom=myZoom.zoom ;

        if (_naUtil.currPos == 1) {
            //moreMenu.style.top=obj.getBoundingClientRect().bottom*myZoom.zoom;
        } else {//_naUtil.currPos 1-�Ϸ� 2-�·� 
            //moreMenu.style.top=obj.getBoundingClientRect().top- moreMenu.offsetHeight*myZoom.zoom;
        }
        moreMenu.style.zIndex = 1000;//��߲����ȼ������ⱻ�������ڵ���
        if (isAllowSimpleHotKey) _simpleHotKey.pid = 'menuMore_window'; //ʹ�øò�֧�ּ��ȼ�
    } catch (e) {
        //console.log(e);
    }
}//end of function
//(һ����Ŀͨ�÷���)Ĭ��ѡ���һ��������Ŀ
NavUtilObj.prototype.defaultChildren = function (currObj) {
    var thismenuid = $(currObj).attr("menuid");
    _treeVersion.showMenuInfo();
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle(thismenuid);
    _common.channelid = $(currObj).attr("menuid");
    var secondmenus = $("#secendmenu li a");
    if (secondmenus.length > 0 && secondmenus[0].menuid) {
        if (secondmenus[0].menuid.indexOf(thismenuid) > -1) {
            secondmenus[0].click();
            return;
        }
    }
}

//��Ӧ��
NavUtilObj.prototype.openYY = function (obj) {
    var ul = $(obj).children('ul.pos-list');
    var ulmore = $(obj).children('ul.pos-list-more');
    if ($(ul).is(':hidden')) {
        $(ul).show();
        $(obj).children('a').addClass('cur');
        $('.bgNew').show();
    } else {
        $(ul).hide();
        $(ulmore).hide();
        $(obj).children('a').removeClass('cur');
        $('.bgNew').hide();
    }
    $(obj).next('div').children('a').removeClass('cur');
    $(obj).next('div').children('ul').eq(0).hide();

    if ($(".more-xxk").height() != 0) {
        $('.more-xxk').animate({'height': '0'});
    }
}

//��ѡ��
NavUtilObj.prototype.openXk = function (obj) {
    var ul = $(obj).children('ul.pos-list02');
    if ($(ul).is(':hidden')) {
        $(ul).show();
        $(obj).children('a').eq(0).addClass('cur');
        $('.bgNew').show();
    } else {
        $(ul).hide();
        $(obj).children('a').eq(0).removeClass('cur');
        $('.bgNew').hide();
    }
    $(obj).prev('div').children('a').removeClass('cur');
    $(obj).prev('div').children('ul').hide();

    if ($(".more-xxk").height() != 0) {
        $('.more-xxk').animate({'height': '0'});
    }
}

NavUtilObj.prototype.hideBg = function () {
    $('.bgNew').hide();
    $('#menuNew').hide();
    $('#menuNewMore').hide();
    $('.pos-list02').hide();
    $('.more-xxk').stop().animate({'height': '0'});
    $('#menu').find('a').eq(0).removeClass('cur');
    $('#openXk').find('a').eq(0).removeClass('cur');
    $('.zd-more').children('i').attr('class', 'ico-up');
}

//�ı���Ŀ
NavUtilObj.prototype.changeMenu = function () {
    if (_naUtil.isFirstLoad) {
        //�״μ���ҳ��
        _treeVersion.getUserAllVersionList();
    } else {
        _treeVersion.getUserVersion();
    }
}


//�γ�����
NavUtilObj.prototype.kcsz = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('�γ�����')");
    }

    var sel = $("#menu").children().find(".sel");
    if (sel.length == 0) {
        _pMain.keStyle($(currObj).attr("menuid"));
    }
    //_pMain.keStyle($(currObj).attr("menuid"));
    //_common.channelid=$(currObj).attr("menuid");
    _treeVersion.showSubMenu("kcsz");
}
//��ǰԤϰ
NavUtilObj.prototype.kqyx = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('Ԥϰ̽��')");
    }
    _naUtil.selectMenuName = 'Ԥϰ̽��';
    _naUtil.selectMenu = currObj;
    //currObj.hide();
    _pm.putActMainPage(0);
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _common.channelid = $(currObj).attr("menuid");
    //_treeVersion.showSubMenu("kqyx");
    //if(_common.isBlank(_treeVersion.currentModel)){
    //}
    _treeVersion.currentModel = 'kqyx';
    //_treeVersion.getUserAllVersionList();
    _naUtil.changeMenu();
}
//���ý�ѧ
NavUtilObj.prototype.ktjx = function (currObj) {
    if (null == currObj) {
        currObj = $("ul#menuNew a:contains('���ý�ѧ')");
        currObj = $('ul#menuNew').find('a').eq(1);
    }
    _naUtil.selectMenuName = '���ý�ѧ';
    _naUtil.selectMenu = currObj;
    //currObj.hide();
    _pm.putActMainPage(0);
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _common.channelid = $(currObj).attr("menuid");
    //_treeVersion.showSubMenu("ktjx");
    _treeVersion.currentModel = 'ktjx';
    _naUtil.changeMenu();
}
//��չ����
NavUtilObj.prototype.tzts = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('��չ����')");
    }
    _naUtil.selectMenuName = '��չ����';
    _naUtil.selectMenu = currObj;
    //currObj.hide();
    _pm.putActMainPage(0);
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _common.channelid = $(currObj).attr("menuid");
    //_treeVersion.showSubMenu("tzts");
    _treeVersion.currentModel = 'tzts';
    _naUtil.changeMenu();
}
//���ӽ̲�
NavUtilObj.prototype.dzjc = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('���ӽ̲�')");
    }
    _naUtil.selectMenuName = '���ӽ̲�';
    _naUtil.selectMenu = currObj;
    //currObj.hide();
    _pm.putActMainPage(0);
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _common.channelid = $(currObj).attr("menuid");
    //_treeVersion.showSubMenu("dzjc");
    _treeVersion.currentModel = 'dzjc';
    _naUtil.changeMenu();
}
//��ѧ����
NavUtilObj.prototype.ypzy = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('��ѧ����')");
    }
    _naUtil.selectMenuName = '��ѧ����';
    _naUtil.selectMenu = currObj;
    //currObj.hide();
    _pm.putActMainPage(0);
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _common.channelid = $(currObj).attr("menuid");
    //_treeVersion.showSubMenu("ypzy");
    _treeVersion.currentModel = 'ypzy';
    _naUtil.changeMenu();
}

//��ʦ΢��
NavUtilObj.prototype.mswk = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('��ʦ΢��')");
    }
    _naUtil.selectMenuName = '��ʦ΢��';
    _naUtil.selectMenu = currObj;

    //currObj.hide();
    _pm.putActMainPage(0);
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _pMain.setSplitePageHeight(40);

    _common.channelid = $(currObj).attr("menuid");
    $(".mainLeft").css("width", 350);
    $(".mainRight").css("width", $(".main").width() - 350);
    //alert($(".main").width()-350);
    //$(".rightCon").css("margin-left",351);
    _treeVersion.currentModel = null;
    mswk.createLeftHtml();
    _naUtil.changeMenu();
}
//����ѵ��
NavUtilObj.prototype.zjxl = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('����ѵ��')")
    }
    _naUtil.selectMenuName = '����ѵ��';
    _pm.putActMainPage(0);
    _naUtil.selectMenu = currObj;
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _common.channelid = $(currObj).attr("menuid");
    //_treeVersion.showSubMenu("zjxl");
    _treeVersion.currentModel = 'zjxl';
    _naUtil.changeMenu();
}
//�½���ҵ �κ���ҵ
NavUtilObj.prototype.zy = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('�κ���ҵ')")
    }
    _naUtil.selectMenuName = '�κ���ҵ';
    _naUtil.selectMenu = currObj;
    //currObj.hide();
    _pm.putActMainPage(0);
    //�޸�ѡ��Ч��
    _naUtil.setMenuSelectStatus(currObj);
    //��ȡ�����˵�����ʾ
    _pMain.keStyle($(currObj).attr("menuid"));
    _common.channelid = $(currObj).attr("menuid");
    //�ж��û��Ƿ������˰༶,���δ�����򵯳�����
    if (_commonDiv.getUserClassId() != null) {
        //_treeVersion.showSubMenu("zy");
        _treeVersion.currentModel = 'zy';
        _naUtil.changeMenu();
    }
}

//��ѧ����
NavUtilObj.prototype.jxfx = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('��ѧ����')")
    }
    _naUtil.selectMenuName = '��ѧ����';
    _naUtil.selectMenu = currObj;
    //currObj.hide();
    _pm.putActMainPage(0);
    //�޸�ѡ��Ч��
    _naUtil.setMenuSelectStatus(currObj);
    //��ȡ�����˵�����ʾ
    _pMain.keStyle($(currObj).attr("menuid"));
    _common.channelid = $(currObj).attr("menuid");
    //�ж��û��Ƿ������˰༶,���δ�����򵯳�����
    if (_commonDiv.getUserClassId() != null) {
        //_treeVersion.showSubMenu("jxfx");
        _treeVersion.currentModel = 'jxfx';
        _naUtil.changeMenu();
    }
}
//У����Դ-�̲���Դ
NavUtilObj.prototype.xbjc = function (currObj) {
    _naUtil.selectMenuName = 'У����Դ';
    _pm.putActMainPage(0);
    _naUtil.selectMenu = currObj;
    //�޸�ѡ��Ч��
    _naUtil.setMenuSelectStatus(currObj);
    //��ȡ�����˵�����ʾ
    _pMain.keStyle($(currObj).attr("menuid"));
    _common.channelid = $(currObj).attr("menuid");
    //�ж��û��Ƿ������˰༶,���δ�����򵯳�����
    //_treeVersion.showSubMenu("xbjc");
    _treeVersion.currentModel = 'xbjc';
    _naUtil.changeMenu();
}
//У����Դ-ר����Դ
NavUtilObj.prototype.xbzy = function (currObj) {
    _naUtil.selectMenuName = 'У����Դ';
    var title = currObj.innerHTML;
    _naUtil.selectMenu = currObj;
    this.defaultChildren();
    this.setMenuSelectStatus(currObj, title);
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _pMain.setSplitePageHeight(40);
    _common.channelid = $(currObj).attr("menuid");
    _pm.putActMainPage(6);
    //xbzy.createLeftHtml();
    _treeVersion.currentModel = 'xbzy';
    _treeVersion.showSubMenu("xbzy");
}
//У����Դ-΢����Դ
NavUtilObj.prototype.wkzy = function (currObj) {
    if (null == currObj) {
        currObj = $("#menu a:contains('΢����Դ')");
    }
    _naUtil.selectMenuName = 'У����Դ';
    _pm.putActMainPage(0);
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _common.channelid = $(currObj).attr("menuid");
    _treeVersion.currentModel = 'wkzy';
    _treeVersion.showSubMenu("wkzy");

}
//��չ��Դ
NavUtilObj.prototype.tzzy = function (currObj, id) {
    _naUtil.selectMenuName = '�����Ķ�';

    var title = currObj.innerHTML;
    _naUtil.selectMenu = currObj;
    this.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _pMain.setSplitePageHeight(40);
    $(".mainLeft").css("width", 350);
    $(".mainRight").css("width", $(".main").width() - 350);

    _common.channelid = $(currObj).attr("menuid");
    _pm.putActMainPage(2);
    _treeVersion.currentModel = null;
    var url = transferProtocol_web + _config["PLS"] + "/interfaces/sourceMenuSchool.do?menuType=0:2&bcode=" + id;
    tzzy.createLeftHtml(url);
    _naUtil.changeMenu();
}
//������Դ
NavUtilObj.prototype.bdzy = function (currObj) {
    _naUtil.selectMenuName = '������Դ';

    this.setMenuSelectStatus(currObj);
    _naUtil.selectMenu = currObj;
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _pMain.setSplitePageHeight(40);
    $(".mainLeft").css("width", 350);
    $(".mainRight").css("width", $(".main").width() - 350);
    _treeVersion.currentModel = null;
    _common.channelid = $(currObj).attr("menuid");
    _pm.putActMainPage(6);
    bdzy.createLeftHtml();
    _naUtil.changeMenu();
}
//�γ�ֱ��  ƽֱ̨�� 
NavUtilObj.prototype.kczb = function (currObj) {
    _naUtil.selectMenuName = 'ƽֱ̨��';
    _naUtil.selectMenu = currObj;
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _common.channelid = $(currObj).attr("menuid");
    //_common.count("");//���PV��־
    _pMain.liveStyle();
    //_liveUtil.createLiveArray();

    live.LiveRange = "1";
    live.getRes();
    _treeVersion.currentModel = null;
    _naUtil.changeMenu();
}
//У��ֱ�� 
NavUtilObj.prototype.bxzb = function (currObj) {
    _naUtil.selectMenuName = '�γ�ֱ��';
    _naUtil.selectMenu = currObj;
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _common.channelid = $(currObj).attr("menuid");
    //_common.count("");//���PV��־
    _pMain.liveStyle();
    //_liveUtil.createLiveArray();
    live.LiveRange = "0";
    live.getRes();
    _treeVersion.currentModel = null;
    _naUtil.changeMenu();
}
//����ֱ�� 
NavUtilObj.prototype.tvzb = function (currObj) {
    _naUtil.selectMenuName = 'ֱ���γ�';
    _naUtil.selectMenu = currObj;
    _treeVersion.showMenuInfo();
    _naUtil.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _common.channelid = $(currObj).attr("menuid");
    //_common.count("");//���PV��־
    _pMain.liveStyle();
    //_liveUtil.createLiveArray();
    tv.getRes();
    _treeVersion.currentModel = null;
    _naUtil.changeMenu();
}
//����ר��
NavUtilObj.prototype.kszt = function (currObj, pid) {
    _naUtil.selectMenuName = '����ר��';
    _naUtil.selectMenu = currObj;
    this.setMenuSelectStatus(currObj);
    _pMain.keStyle($(currObj).attr("menuid"));
    _pMain.hideSubMenu();
    _pMain.setSplitePageHeight(40);

    $('#pageRightNav').hide();

    $(".mainLeft").css("width", 350);
    $(".mainRight").css("width", $(".main").width() - 350);

    _common.channelid = $(currObj).attr("menuid");
    _ssp.createSubjectPanel(pid);
    _ssp.refreshSubjectTree();

    _treeVersion.currentModel = null;
    _naUtil.changeMenu();
}
//�༶����
NavUtilObj.prototype.bjsz = function (currObj, pid) {
    _usbObj.invisible();
    _commonDiv.openWindow();
}
//���ñ���
NavUtilObj.prototype.ktbg = function (currObj) {
    //var url = "http://report.youjiaotong.com/classReport/action/teaching/view/classReport/142837598751731139/0001";
    var url = transferProtocol_web + _config["CLASSREPORT"] + "/classReport/action/teaching/view/classReport/" + userclass + "/" + _treeVersion.currentSubject + "?username=" + teachernumber + "&channelid=" + $(currObj).attr("menuid");
    //_common.openByIE(url);//openResPageWithClose(url);
    _common.openResPage(screen.width, screen.height, url);
    //_common.addTjPv("ktbg",teachernumber,userclass);//pvͳ��

}
//�󶨴�����
NavUtilObj.prototype.bandDTQ = function () {
    if (loginStyle != 0) {
        alert("Ԥ��ģʽ�²�֧�����ô�����,�뵽�������Ľ�������!");
        return;
    }
    if (_commonDiv.getUserClassId() == null) {
        alert("����δ���õ�ǰ�༶�����������ð༶��");
        return;
    }

    // var padStatus = getIsUsingPad();
    var padStatus;
    try {
        padStatus = LessionOcx.ReadSchoolbag(1);
    } catch (e) {

    }
    if (padStatus != 0 && typeof padStatus != 'undefined') {
        //�ж��Ƿ��б��ƽ��ҳ���Ѵ�
        var warn = "���ȹر�" + padStatus + "���ܣ�";
        alert(warn);
        return;
    } else {
        //�޸������ļ�ƽ������ʹ��
        setIsUsingPad(15);
    }


    var width = screen.width;
    var heights = screen.height;
    _common.openResPage(width, heights, transferProtocol_web + _config["TMS"] + "/tms/uc/teacher/bindAnswerToolClass.do?classId=" + _commonDiv.getUserClassId());
}
//notebook�Խ�
NavUtilObj.prototype.notebook = function () {
    var url = transferProtocol_web + _config["NOTEBOOK"] + "/experiment/index/wuli?sso=" + des_sso_domain + "&sso_ip=" + des_sso_ip + "&ut=" + sso_ut;
    _common.openByIE(url);
}

//�˳���½
NavUtilObj.prototype.logout = function () {
    //�������˳�
    try {
        IInformationOcx.FileNew(true);
    } catch (e) {
    }//end of try/catch
    //�Ž̹��ߵ�½/�˳�
    //�˳����
    //�ر�
    if (isUseClientAnswer) {
        try {
            ClientAnswer.CloseOcxWindow();
        } catch (err) {

        }
    }

    initDTQ(0);
    //���cookie
    writeCookie("UID", "", 0);
    writeCookie("c2", "", 0);
    writeCookie("c3", "", 0);
    writeCookie("c6", "", 0);
    writeCookie("loginStyle", "", 0);
    //�ȴ�0.5���ǿ���˳�
    setTimeout('location.href="gobackmy://"', 500);
}

//�ڿι�����Ϣ
NavUtilObj.prototype.getNotice = function () {
    var url = transferProtocol_web + _config["CMS"] + '/A01/A01045/A01045008/A01045008001/list.json';
    _common.getCMSData(url, function () {
        if (infolistA01045008001 != 'undefined' && infolistA01045008001 != null && infolistA01045008001.infosList && infolistA01045008001.infosList.length > 0) {
            var tmp = infolistA01045008001.infosList[0];
            if (tmp.contenttype == 'HTML') {
                var linkUrl = transferProtocol_web + _config["CMS"] + tmp.filepath;
            } else if (tmp.contenttype == 'SURL') {
                var linkUrl = tmp.infourl;
            }
            var html = '<img src="images/ktjx/tongzhi.png">' + tmp.topic;
            $('#gonggao').html(html);
            $('#gonggao').click(function () {
                //window.open(linkUrl);
                _common.openByIE(linkUrl);
            })
        }
    });
}