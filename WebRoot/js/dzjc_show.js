var dzjc = new DZJC();

//ͬ���ڿ�ģ�����
function DZJC() {
    this.resflag = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.stageCode = null;		//��ǰѧ��
    this.subjectCode = null;      //��ǰ��Ŀ
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
    this.allList = []; //ȫ����Դ

}

//������Ŀ,���������˵���
DZJC.prototype.getRes = function (ksId, _currResTypeName) {
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.newcontentpagesize + 1;//�Ҳ�����Դ��ʾ����
    if (this.currResTypeName.length > _pMain.newpagefontsize) this.currResTypeName = this.currResTypeName.substring(0, _pMain.newpagefontsize) + "��";
    $(_pMain.getMainRight()).html("<div class=\"courseTitle\">" + this.currResTypeName + "<span class=\"bgImg\"></span></div>");
    $(".subMenu").hide();
    var data = 'data={"menuCode":"' + dzjc.currentKsid + '","listType":"1","rsflag":"","pageNum":0,"orderby":6,"userObj":"OBJ002"}';
    ajaxJson(pls_config_all["PLS.110"], data, "gbk", dzjc.parseResList);
}

//������Դ�б�
DZJC.prototype.parseResList = function (rdata) {
    //���ͳɹ���ʧ�ܣ�
    var aCode = new Array();
    aCode.push("<ul class=\"testList\">");
    if (rdata && rdata.ResInfo && rdata.ResInfo.length > 0) {
        for (var i = 0; i < rdata.ResInfo.length; i++) {
            //�ڿ���Դ����������һ��
            var temp = rdata.ResInfo[i];
            var RTypecode = temp.RTypecode;//RT001�̰���RT0002�زġ�RT003�μ���RT004ϰ�⡢RT105��չ��RT106���ӽ̲ġ�RT104��ѧ��
            //���ӽ̲�
            if (RTypecode == "RT106") {
                var RTitle = temp.RTitle;
                var RCode = temp.RCode;
                var RFormatMark = temp.RFormatMark;
                var KRType = temp.KRType;
                var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png\" alt=\"\" />";
                var playjs = "";
                if ("RT106" == RTypecode && "xml" == RFormatMark) {
                    playjs = "player.getDZJC('" + RCode + "')";
                    //var imagepic="<img width='20' height='20' src=\""+transferProtocol_web+_config["PLS"]+"/newteach/images/icon/res/swf.png\" alt=\"\" />";
                } else {
                    playjs = "player.playResource('" + RCode + "','2','" + RFormatMark + "')";
                }

                aCode.push("<li>" + imagepic + "<a move=\"right\" id=\"index_1\" href=\"javascript:" + playjs + "\" title=\"" + RTitle + "\"><p class=\"zy-tm\">" + RTitle + "</p></a></li>");
                /*if(playjs!="")
                {
                    eval(playjs);
                    break;
                }*/
            }
        }
    }
    if (aCode.length == 1) {
        aCode.push("<li><center>" + _common.hasNoRes + "</center></li>");
        //alert("���޵��ӽ̲���Դ��");
    }

    aCode.push("</ul>");
    $(_pMain.getMainRight()).append(aCode.join(""));
    _common.splitpage(".testList li", 1, dzjc.pagesize, "#pageRightNav");
    //Ĭ�ϵ����һ�����ӽ̲�
    //document.getElementById("index_1").click();
}
