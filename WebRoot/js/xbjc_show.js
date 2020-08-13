//У����Դ - �̲���Դ
function XBJC() {
    this.restype = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.stageCode = null;		//��ǰѧ��
    this.subjectCode = null;      //��ǰ��Ŀ
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
}

var xbjc = new XBJC();
//������Ŀ,���������˵���
XBJC.prototype.getRes = function (ksId, _currResTypeName) {
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.contentpagesize - 4;//�Ҳ�����Դ��ʾ����
    //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+_treeVersion.currentCourseName+"<span class=\"bgImg\"></span></div>");

    //��ʾ�����˵�
    xbjc.showQuickTeachThredMenu();

}
//��ʾ�����˵���Ŀ
XBJC.prototype.showQuickTeachThredMenu = function () {
    var tMenuCode = new Array();
    //RT001�̰�(����)��RT002�زġ�RT003�μ���RT004ϰ�⡢RT104��ѧ����RT105��չ��RT106���ӽ̲ġ�RT107΢��
    tMenuCode.push("<a href='#' id='xbjc_all' onclick='xbjc.clickQuickTeach(\"all\");' >ȫ��</a>");
    tMenuCode.push("<a href='#' id='xbjc_RT003' onclick='xbjc.clickQuickTeach(\"RT003\");' >�μ�</a>");
    tMenuCode.push("<a href='#' id='xbjc_RT002' onclick='xbjc.clickQuickTeach(\"RT002\");' >�ز�</a>");
    tMenuCode.push("<a href='#' id='xbjc_RT004' onclick='xbjc.clickQuickTeach(\"RT004\");' >ϰ��</a>");
    tMenuCode.push("<a href='#' id='xbjc_RT105' onclick='xbjc.clickQuickTeach(\"RT105\");' >��չ</a>");
    tMenuCode.push("<a href='#' id='xbjc_RT106' onclick='xbjc.clickQuickTeach(\"RT106\");' >���ӽ̲�</a>");
    //tMenuCode.push("<a href='#' id='xbjc_RT107' onclick='_naUtil.XBwkzy();' >΢��</a>");
    //$(_pMain.getMainRight()).append("<div class='subMenu' id='xbjc_tmDiv'>"+tMenuCode.join("")+"</div>");
    //$(".subMenu").html("");
    $(".subMenu").html(tMenuCode.join(""));
    $(".subMenu").show();
    tMenuCode = null;
    //������
    $("#xbjc_all").click();
}

//�����˵������¼�
XBJC.prototype.clickQuickTeach = function (restype) {
    //��¼��ǰѡ�в˵�
    this.restype = restype;
    //�޸Ĳ˵�ѡ��Ч��
    $(".testList").remove();
    $(".subMenu a").each(function () {
        $(this).removeClass("cur");
    });
    $("#xbjc_" + restype).addClass("cur");
    if (restype == 'all') {
        restype = "";
    }
    //�̲���Դ����ʽ: orderby":"4
    var data = 'data={"menuCode":"' + xbjc.currentKsid + '","cpCode":"' + schoolId + '","listType":"1","typeCode":"' + restype + '","pageNum":0,"userName":"' + teachernumber + '","orderby":"4","userObj":"OBJ002","yun":"1","hashcode":"1","deleteState":"0"}';
    ajaxJson(pls_config_all["PLS.110"], data, "gbk", xbjc.showGroupList);
}

//��Դ����չʾ
XBJC.prototype.showGroupList = function (tdata) {
    var aCode = new Array();
    if (tdata && tdata.ResInfo) {
        tdata = tdata.ResInfo;
    }
    aCode.push("<ul class=\"testList\">");
    if (tdata && tdata != null && tdata.length > 0) {
        $(tdata).each(function () {
            var RTypecode = $(this).attr("RTypecode");//RT001�̰���RT0002�زġ�RT003�μ���RT004ϰ�⡢RT105��չ��RT104��ѧ��
            //�����̰�
            if (RTypecode != "RT001") {
                var RTitle = $(this).attr("RTitle");
                var RCode = $(this).attr("RCode");
                //var imagepic=$(this).attr("tishiPic");
                var RFormatMark = $(this).attr("RFormatMark");
                var KRType = $(this).attr("KRType");
                var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\" alt=\"\" />";
                var needPwd = $(this).attr("wordFlag");//�Ƿ���Ҫ���� wordFlag 0 ������1 ��Ҫ��������
                var playjs = "";
                var jing = "";
                //��Ʒ��ԴͼƬ
                if ($(this).attr("ext6") == "ZYHOT") {
                    jing = "<i class='red'>(��)</i>";
                }
                playjs = "player.playResource('" + RCode + "','2','" + RFormatMark + "')";
                var addIcon = "";
                var buttoncode = "<span><a href=\"javascript:sendRecommend(1,'" + RCode + "')\">�Ƽ�</a></span>";
                if (needPwd == "1") {
                    playjs = "bdzy.showbdPwd('" + RCode + "')";
                    addIcon = '<img src="images/icon/jm.gif" width="22" height="22" />';
                    buttoncode = "";
                }
                aCode.push("<li>" + buttoncode + imagepic + addIcon + "<a move=\"right\" id=index_1 href=\"javascript:" + playjs + "\" title=\"" + RTitle + "\"><p class=\"zy-tm\">" + jing + RTitle + "</p></a></li>");
            }
        });
    }
    //�ж��Ƿ�������
    if (aCode.length == 1) {
        aCode.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    //��ҳdiv
    aCode.push("</ul>");
    $(_pMain.getMainRight()).html(aCode.join(""));
    aCode = null;
    //��ҳ
    _common.splitpage(".testList li", 1, xbjc.pagesize, "#pageRightNav");

}