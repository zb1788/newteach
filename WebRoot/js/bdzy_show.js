var bdzy = new BDZY();

/*******************************У����ԴĿ¼start**************************/
function BDZY() {
    this.selNode = null;
    this.title = null;
    this.type = null;
    this.codeid = null;
}

BDZY.prototype.createLeftHtml = function () {
    var typeparent = 0;
    _xbRes.pagesize = (_pMain.contentpagesize + 1);
    var h = '<ul class="rightMenu" id="rightMenu" style="display=none"></ul>';//�Ҳ�˵�
    h += '<ul class="resList" id="resList"></ul>';//�Ҳ���Դ
    //h+='<div class="page" id="resPage"></div>';//��Դ��ҳ
    if (null != _pMain.getMainRight()) _pMain.getMainRight().innerHTML = h;
    var data = "areaId=" + areaId + "\&schoolCode=" + teacherjyjg;
    if (typeparent != null) data += '&typeparent=' + typeparent;
    data += '&ajaxdate=' + new Date();
    ajaxJson(pls_config_all["PLS.190"], data, "gbk", this.createLeftHtmlByJSON);
}
BDZY.prototype.createLeftHtmlByJSON = function (rdata) {
    if (rdata && rdata.SchoolSelf && rdata.SchoolSelf.length > 0) {
        var code = new Array();
        code.length = 0;
        var schoolId = teacherjyjg + "00";//��УID
        for (var i = 0; i < rdata.SchoolSelf.length; i++) {
            var h = "";
            var item = rdata.SchoolSelf[i];
            var codeId = item.codeId;
            var codeName = item.codeName;
            var pathCode = item.pathCode;
            var sahreType = item.sahreType;
            var selfType = item.selfType;
            if (selfType == 4) codeId += "00";
            if (codeId == schoolId) continue;//����У����Դ
            var jxzy = codeName + "-��ѧ��Դ";
            var ztzy = codeName + "-ר����Դ";
            h += '<dl class="course"><dt>' + codeName + '</dt><dd class="end">';
            h += '<a id="index_' + (i + 1) + '_0"  onclick="bdzy.clickNode(\'' + codeId + '\',\'' + jxzy + '\',0);" title="��ѧ��Դ">��ѧ��Դ</a></dd>';
            h += '<dd class="end">';
            h += '<a id="index_' + (i + 1) + '_1"  onclick="bdzy.clickNode(\'' + codeId + '\',\'' + ztzy + '\',1);" title="ר����Դ">ר����Դ</a></dd>';
            if (codeId.indexOf(".") > 0) {
                h += '<dd class="end">';
                h += '<a id="index_' + (i + 1) + '_2"  onclick="wkzy.getBDRes(\'' + codeId + '\',\'' + codeName + '\');" title="΢����Դ">΢����Դ</a></dd>';
            }
            h += '</dl><span class="clearfix"></span>';
            code.push(h);
        }
        _pMain.getMainLeft().innerHTML = '<DIV id=subjectBarDiv class=courseName>������Դ</DIV><dl class="course2">' + code.join("") + '</dl><span class="clearfix"></span>';
        var targetobj = document.getElementById("index_1_0");
        if (targetobj != null) {
            targetobj.focus();
            targetobj.click();
        }
    }
}
BDZY.prototype.clickNode = function (codeid, title, type) {
    this.codeid = codeid;
    this.title = title;
    this.type = type;
    _xbRes.flag = 2;//���� ר��/�̲� ����
    _xbRes.createRightHtml(codeid, title, type);
}
//��������
BDZY.prototype.showbdPwd = function (rcode) {
    $("#panelTitle").html("������Դ����");
    $("#panelContent").html("<h3>������֤</h3><div id='panelContentInput' style='text-align:left;padding-left:20px' >��������Դ���룺<input style='width:380px;height:30px;font-weight:bold;line-height:28px' type='password' id='bdpwd' value='' /></div><div style='text-align:left;padding-left:20px' ><input type='checkbox' onclick='bdzy.showPwd(this.checked)' />&nbsp;��ʾ����<div id='bdpwd_msg' style='color:red;height:30px'></div></div>");
    document.getElementById("panelOk").href = "javascript:void(bdzy.pwdDownload(\'" + rcode + "\'));";
    $("#commonPanel").show();
}
//������֤������
BDZY.prototype.pwdDownload = function (rcode) {
    var pwd = $("#panelContent #bdpwd").val();
    if (pwd != null && pwd.trim().length > 0) {
        var data = "resPassword=" + BASE64.encoder(pwd) + "&rcode=" + rcode + "&userName=" + teachernumber + "&schoolId=" + schoolId + "&areaId=" + areaId + "&userTrueName=" + encodeURIComponent(encodeURIComponent(teachername));
        ajaxJson(transferProtocol_web + _config["PLS"] + "/youjiaoplay/validateResPassword.do", data, "gbk", function (rd) {
            //0�ɹ���1ʧ��
            if (rd.status == 0) {
                $("#commonPanel").hide();
                _common.openByIE(transferProtocol_web + _config["PLS"] + "/servlet/DownloadFileServlet?restmpcert=" + rd.restmpcert + "&loginStyle=0&userName=" + teachernumber + "&schoolId=" + schoolId + "&areaId=" + areaId + "&userTrueName=" + encodeURIComponent(encodeURIComponent(teachername)));
            } else {
                $("#bdpwd_msg").html(rd.msg);
            }
        });
    } else {
        $("#bdpwd_msg").html("���������룡");
    }
}
//��ʾ����
BDZY.prototype.showPwd = function (ifshow) {
    var tempval = $("#panelContent #bdpwd").val();
    if (ifshow) {
        $("#panelContentInput").html("��������Դ���룺<input style='width:380px;height:30px;font-weight:bold;line-height:28px' type='text' id='bdpwd' value='' />");
        $("#panelContent #bdpwd").val(tempval);
    } else {
        $("#panelContentInput").html("��������Դ���룺<input style='width:380px;height:30px;font-weight:bold;line-height:28px' type='password' id='bdpwd' value='' />");
        $("#panelContent #bdpwd").val(tempval);
    }
}
/*******************************У����ԴĿ¼end****************************/