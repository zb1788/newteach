/******����ר���ȡ������Դ��Ϣ begin*****/
function kszt_getRes(ksId, _currResTypeName) {
    currResTypeName = _currResTypeName;

    var currResTypeName_fit = currResTypeName;
    if (currResTypeName_fit.length > 25) {
        currResTypeName_fit = currResTypeName_fit.substring(0, 24) + "��";
    }
    $(_pMain.getMainRight()).html("<div class=\"courseTitle\">" + currResTypeName_fit + "<span class=\"bgImg\"></span></div>");

    var url = transferProtocol_web + _config["PLS"] + "/interfaces/baseresources.do?ks_id=" + ksId;
    url += '&ajaxdate=' + new Date();
    sendRequest(kszt_showRes, url);
}

function kszt_showRes(xmldoc) {
    var aCode = new Array();
    var resourceNodes = xmldoc.selectNodes("//VCOM/resources/resource");//��ȡ
    aCode.push("<ul class=\"resList\">");
    for (var i = 0; i < resourceNodes.length; i++) {
        var resourceNode = resourceNodes[i];
        var restypename = resourceNode.selectNodes("res_type_name")[0].text;
        var resCode = resourceNode.selectNodes("res_code")[0].text;
        var resName = resourceNode.selectNodes("res_name")[0].text;
        var resformat = resourceNode.selectNodes("res_format")[0].text;
        var restype = resourceNode.selectNodes("res_type")[0].text;
        var imagepic = resourceNode.selectNodes("imagepic")[0].text;
        var ks_id = resourceNode.selectNodes("ks_id")[0].text;
        var rsflag = resourceNode.selectNodes("res_rsflag")[0].text;
        var savepath = resourceNode.selectNodes("res_savepath")[0].text;
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
        aCode.push("<li >" + imagepic + "<a move=\"right\" id=index_0_1 href=\"javascript:player.playResource('" + resCode + "','2','" + resformat + "')\" title=\"" + convertHtml(resName) + "\">" + convertHtml(resName) + "</a>" + resPublisher + "</li>");
    }
    if (aCode.length < 2) {
        aCode.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    aCode.push("</ul>");
    $(_pMain.getMainRight()).html(aCode.join(""));

    $("#pageRightNav").hide();

    $(".mainRight").append(' <DIV id=pageRightNavbar class="page pageRight" style="margin: 0 0px;"><DIV class=pages><A class=disabled title=��һҳ href="#">&lt;</A><A id=_perpage title=��һҳ onclick="" href="#">&gt;</A></DIV></DIV>');

    _common.splitpage(".resList li", 1, _pMain.newcontentpagesize + 1, "#pageRightNavbar");
}