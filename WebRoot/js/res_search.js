//��Դ��������
function ResSearch() {
    this.pagesize = null;
    this.searchkey = null;
    this.typeMap = [{id: "F100", name: "�ĵ�"}, {id: "F200", name: "ͼƬ"}, {id: "F300", name: "��Ƶ"}, {
        id: "F400",
        name: "��Ƶ"
    }, {id: "F500", name: "����"}];
}

var resSearch = new ResSearch();
ResSearch.prototype.search = function (skey, stype) {
    if (_common.isBlank(skey)) {
        alert("�������ѯ�ؼ��ʣ�");
        return;
    } else {
        this.searchkey = skey;
    }
    //ȡ�������˵�ѡ��
    _pMain.keStyle("03.58");
    //���ݵ�ǰ�߶�ȷ��ÿҳ����
    this.pagesize = _pMain.newcontentpagesize;
    //Ĭ�ϲ�ѯ�ĵ�
    if (_common.isBlank(stype)) {
        stype = "F100";
    }
    var MenuArr = new Array();
    for (var i = 0; i < this.typeMap.length; i++) {
        var classstr = "";
        var temp = resSearch.typeMap[i];
        if (stype == temp.id) {
            classstr = " class='cur' ";
        }
        MenuArr.push("<a " + classstr + " href='javascript:resSearch.search(\"" + skey + "\",\"" + temp.id + "\");' >" + temp.name + "</a>");
    }
    //$(".subMenu").html("");
    $(".subMenu").html(MenuArr.join(""));
    $(".subMenu").show();
    $("#pageRightNav").show();
    $(".main").html("<div id='searchContent' class='' style='background-color:#fff;' ><div class=\"courseTitle\" style='text-align:center'>��Դ����</div></div>");
    MenuArr = null;
    $("#searchContent").css("height", _pMain.height + 40);
    var maxsize = this.pagesize * 20;
    //listType0������1����
    var data = "title=" + encodeURIComponent(encodeURIComponent(this.searchkey)) + "&listType=1&fromat=" + stype + "&page=1&pageNum=" + maxsize;
    //�رղ�ѯ��
    _netTools.closeWindow();
    ajaxJson(transferProtocol_web + _config["PLS"] + "/youjiao/publicResInfo.do", data, "gbk", function (tdata) {
        var aCode = new Array();
        aCode.push("<ul class=\"testList\">");
        var resList = null;
        if (tdata) resList = tdata.ResInfo;
        if (resList && resList.length != 0 && resList != "undifined") {
            //if(kjsk.resflag=="all")resList=kjsk.sort(resList);//�����ȫ����Դ
            for (var i = 0; i < resList.length; i++) {
                var resItem = resList[i];
                var RTitle = resItem.RTitle;
                var RCode = resItem.RCode;
                var RFormatMark = resItem.RFormatMark;
                var KRType = resItem.shaoCangType;
                var RTypecode = resItem.RTypecode;//RT001�̰���RT0002�زġ�RT003�μ���RT004ϰ�⡢RT104��ѧ��
                if (RTypecode == "RT001") continue;
                var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\" alt=\"\" />";
                var playjs = "";
                var j_pic = "";
                //��Ʒ��ԴͼƬ
                if ($(this).attr("ext6") == "ZYHOT") {
                    j_pic = "<img width='20' height='20' src='" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/jing2.gif' >";
                }
                playjs = "player.playResource('" + RCode + "','2','" + RFormatMark + "')";
                aCode.push("<li><span><a href=\"javascript:sendRecommend(1,'" + RCode + "')\">�Ƽ�</a></span>" + imagepic + "<a move=\"right\" id=index_1 href=\"javascript:" + playjs + "\" title=\"" + RTitle + "\"><p class=\"zy-tm\">" + RTitle + "</p></a></li>");
            }
        }
        if (aCode.length < 2) {
            aCode.push("<li><h3><center>�������Դ</center></h3></li>");
        }
        aCode.push("</ul>");
        $("#searchContent").html(aCode.join(""));
        aCode = null;
        _common.splitpage(".testList li", 1, resSearch.pagesize, "#pageRightNav");
    });
}