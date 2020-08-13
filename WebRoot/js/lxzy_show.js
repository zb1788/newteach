//������ҵ
function LXZY() {
    this.pagesize = _pMain.newcontentpagesize;
}

var lxzy = new LXZY();
//������Դ�б�
LXZY.prototype.parseResList = function (rdata) {
    //
    //rdata='{"result":1,"errmsg":"","data":[{"id":100,"title":"����","time":"2014-11-22 08:30:10","subject":"1","class_info":[{"id":"1439454502442752632"}]}]}';
    //rdata=eval('('+rdata+')');
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");
    if (rdata.result == 1 && rdata.data && rdata.data.length > 0) {
        for (var i = 0; i < rdata.data.length; i++) {
            //�ڿ���Դ����������һ��
            var temp = rdata.data[i];
            var RTitle = temp.title;
            var RCode = temp.id;
            var time = temp.time; //
            var subject = temp.subject;
            var class_info = temp.class_info;

            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/lixian.png\"  />";

            var button = "<span><a style='BACKGROUND: #ccc; disabled=true'>����</a><a href=\"javascript:lxzy.SendRecommend(1,'" + RCode + "')\">����</a></span>";
            //���class_info������ǰ�༶1439454502442752632

            for (var j = 0; j < class_info.length; j++) {
                var id = class_info[j].id;
                if (id.indexOf(userclass) != -1) {
                    button = "<span><a onclick=\"lxzy.View('" + RCode + "',2);\">����</a><a href=\"javascript:lxzy.SendRecommend(1,'" + RCode + "')\">����</a></span>";
                    break;
                }
            }

            temphtml.push("<li>" + button + "" + imagepic + "<a move=\"right\" id=index_1 href=\"javascript:lxzy.View('" + RCode + "',1);\"  title=\"" + RTitle + "\"><p class=\"zy-tm\">" + RTitle + "</p></a></li>");
        }

    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).append(temphtml.join(""));
    temphtml = null;
    lxzy.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    _common.splitpage(".testList li", 1, lxzy.pagesize, "#pageRightNav");
}
//������ҵԤ��
LXZY.prototype.View = function (rcode, buttonType) {
    document.getElementById("maskAll").style.display = 'block';
    $("#lxzyContent").html("");
    $("#lxzyPage").html("");
    var temphtml = new Array();
    var fankui = new Array();
    var data = "command=jobInfo&id=" + rcode + "&classid=" + userclass;
    ajaxJson(transferProtocol_web + _config["WEBMAIL"] + "/src/msgInterFace.php", data, "GBK", function (rdata) {
        //rdata = '{"result":1,"errmsg":"", "data":{ "title":"ͬѧ�ǣ���۲����м���ͼƬ�����ܷ���Щʲô�����ܶԹ۲쵽��ͼƬ���й����ܽ������ܶԹ۲쵽��ͼƬ���й����ܽ���","content":"����","url":[{"source_url":"https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/solution/css/img/wx/fw-pic.png"},{"source_url":"/cache/upload/2017/01/04/1483492942126.amr"}], "classid":"201083010","classname":"���꼶��2����", "users":[ {"username":"4101","truename":"�Ŵ�","good":1}, {"username":"4102","truename":"����ϼ","good":0}, {"username":"4103","truename":"�ɻ���","good":-1} ] } }';
        //rdata = eval('(' + rdata + ')');
        if (rdata.result == 1) {
            var data = rdata.data;
            var RTitle = data.title;
            var content = data.content;
            var url = data.url;
            var classid = data.classid;
            var classname = data.classname;
            var users = data.users;

            if (RTitle.length > 24) {
                RTitle = RTitle.substring(0, 24) + "��";
            }
            $("#lxzyPanelTitle").html(RTitle);

            //����
            temphtml.push("<h4 style='height:30px;color:#ba0505'>�ѷ��ͣ�" + classname + "</h4>");
            temphtml.push("<h4 style='border-bottom:0px'>" + content + "</h4>");
            temphtml.push("<UL class=lxzyList >");
            //url
            for (var i = 0; i < url.length; i++) {
                var link = url[i].source_url;
                //temphtml.push("<li><p><img src='" + link + "' /></p></li>");
                var RFormatMark = "";
                if (link != null) {
                    RFormatMark = link.substring(link.lastIndexOf(".") + 1);
                }
                var imagepic = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png";
                if (RFormatMark != "null" && RFormatMark != "") {
                    imagepic = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png";
                }
                //�����ͼƬ��ʽ��ֱ��չʾ
                if (",JPG,GIF,PNG,BMP,JPEG,".indexOf("," + RFormatMark.toUpperCase() + ",") >= 0) {
                    imagepic = link;
                }
                temphtml.push("<li onclick=_common.openByIE('" + link + "');><p><img style='float: left' src='" + imagepic + "' /></p></li>");

            }
            temphtml.push("</ul>");

            $("#lxzyContent").append(temphtml.join(""));
            //����
            //fankui.push('<DIV class=pageNext style="position:absolute; right:10px; top:-40px;"><A onclick=($("#studentSet").show());>����</A></DIV>');
            fankui.push('<UL id=studentSet class=classSet style="display:block;">');
            for (var i = 0; i < users.length; i++) {
                var username = users[i].username;
                var truename = users[i].truename;
                if (truename.length > 4) {
                    truename = truename.substring(0, 4) + "...";
                }
                var good = users[i].good;

                if (good != -1) {
                    fankui.push("<li style='width:9.95%;  float:left; display:inline;'> <a id='" + username + "' href='#' onclick=lxzy.personInfo(\'" + rcode + "\',\'" + username + "\',\'" + truename + "\') style='background-color:#5cc767; color:#fff;'>" + truename + "</a> </li>")
                } else {
                    fankui.push("<li style='width:9.95%;  float:left; display:inline;'> <a id='" + username + "' style='background-color:#ccc; color:#fff;'>" + truename + "</a> </li>")
                }

            }
            fankui.push('</UL>');
            $("#lxzyPage").append(fankui.join(""));
            //buttonType 1Ԥ�� 2����
            if (buttonType == 1) {
                $("#studentSet").hide();
            } else {
                $("#studentSet").show();
            }
        }
    });
    $("#lxzyView").show();

}
//������ҵ����
LXZY.prototype.SendRecommend = function (type, rcode) {

    _commonDiv.openWindow(1, "������ҵ", "��ѡ��༶��", function (selectclass) {
        var sendToClass = new Array();
        var allclass = new Array();
        for (var i = 0; i < selectclass.length; i++) {
            sendToClass.push(selectclass[i].classId);
        }

        var data = "command=job2send&id=" + rcode + "&classid=" + sendToClass.join(",");
        ajaxJson(transferProtocol_web + _config["WEBMAIL"] + "/src/msgInterFace.php", data, "GBK", function (result) {
            if (result.result == 1 || result.result == 0) {
                _commonDiv.tip("�ѷ���!");
                zy.clickQuickTeach("zy_RT004");
            } else {
                _commonDiv.tip("����ʧ��!" + result.errmsg);
            }
            _commonDiv.closeWindow(2000);
        })
    }, true, null);

}
LXZY.prototype.personInfo = function (rcode, username, truename) {

    if (truename != "") {
        $("#lxzyInfoTitle").html(truename);
    }
    $("#lxzyInfoContent").html("");
    var temphtml = new Array();
    var data = "command=jobInfo&id=" + rcode + "&username=" + username;
    ajaxJson(transferProtocol_web + _config["WEBMAIL"] + "/src/msgInterFace.php", data, "GBK", function (rdata) {
        //rdata = '{"result":1,"errmsg":"","data":{"content":"���Ҷ����������ʲô���㻹����Щ����֤�����Ҷ������Ҷ�������ЩӦ�ã�","url":[{"source_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Frauenkirche_Munich_March_2013.JPG/1024px-Frauenkirche_Munich_March_2013.JPG"},{"source_url":"/cache/upload/2017/01/04/1483492942126.amr"}]}  }';
        //rdata = eval('(' + rdata + ')');
        if (rdata.result == 1) {
            var data = rdata.data;
            var content = data.content;
            var url = data.url;
            //content
            temphtml.push("<h3 style='text-align: left'>" + content + "</h3>");

            //url
            temphtml.push(" <div style='float: left' >");
            temphtml.push("<UL class=lxzyList >");
            for (var i = 0; url && i < url.length; i++) {
                var link = url[i].source_url;
                var RFormatMark = "";
                if (link != null) {
                    RFormatMark = link.substring(link.lastIndexOf(".") + 1);
                }
                var imagepic = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/blank.png";
                if (RFormatMark != "null" && RFormatMark != "") {
                    imagepic = transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/" + _common.getIconName(RFormatMark) + ".png";
                }
                //�����ͼƬ��ʽ��ֱ��չʾ
                if (",JPG,GIF,PNG,BMP,JPEG,".indexOf("," + RFormatMark.toUpperCase() + ",") >= 0) {
                    imagepic = link;
                }
                temphtml.push("<li onclick=_common.openByIE('" + link + "');><p><img style='float: left' src='" + imagepic + "' /></p></li>");
            }
            temphtml.push("</UL>");
            $("#lxzyInfoContent").append(temphtml.join(""));
        }
    });
    $("#lxzyInfo").show();
    $("#lxzyView").hide();

}
