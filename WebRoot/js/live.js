/********  �γ�ֱ������ begin*********/
function LiveObj() {
    this.LiveRange = "";
    this.pagesize = null;
}

var live = new LiveObj();
LiveObj.prototype.getRes = function () {
    var title = "��Уֱ��";
    if (this.LiveRange == "1") {
        title = "ƽֱ̨��";
    }
    $("#main").html("<div id=\"liveCon\" class=\"liveCon\"><div class=\"courseTitle\" style='text-align:center'>" + title + "</div><ul class=\"liveList\" ><li><span class=\"none\">����</span><i class=\"i1\">ѧ��</i><i class=\"i2\">�γ�����</i><i class=\"i3\">��ʼʱ��</i><i class=\"i4\">ʱ��</i><i class=\"i5\">��ʦ</i></li></ul><ul class=\"liveList\" id='liveList' ></ul></div>");
    $(".liveCon").css("height", _pMain.height + 40);
    this.pagesize = _pMain.contentpagesize - 3;
    var backCounter = 0;
    if (this.LiveRange == "1") {
        //��ѧ��һ�μ���ƽֱ̨��
        $.getScript(transferProtocol_web + _config["CMS"] + "/A01/A01074/A01074021/list.json", function () {
            try {
                var rdata = infolistA01074021;
                if (rdata.infosList[0] != null) {
                    var temp = rdata.infosList[0];
                    var Rtitle = temp.topic;
                    var RMarkType = temp.a11;//��Դ��ʽ(mp4����264avi,��)
                    if (RMarkType == null || RMarkType == "null" && RMarkType.length == 0) {
                        RMarkType = "MP4";
                    }
                    var playflag = "������ʼ";
                    var rcode = temp.a12;//��Դcode
                    var starttime = temp.a13;//��ʼʱ��
                    //ʱ���ʽyyyy-MM-ddHH:mm:ss ת yyyy-MM-dd HH:mm:ss
                    if (starttime != null && starttime != "null" && starttime.length > 10 && starttime.substring(10, 11) != " ") {
                        starttime = starttime.substring(0, 10) + " " + starttime.substring(10, starttime.length);
                    }
                    var playtime = Number(temp.a14);//����ʱ��(��)
                    if (playtime == NaN) {
                        playtime = 0;
                    }
                    var playtimes = playtime * 1000;//ʱ��������
                    var passtimes = compareTime(starttime);//��ʼʱ���Ѿ�����ǰʱ�������

                    //ֱ��״̬����,(��������ʼʱ�䣬����Ϊ�Ѿ���ʼ,���ͬʱ����ʱ������Ϊ�Ѿ�����)
                    var playclass = "";
                    var playcode = "";
                    if (passtimes >= 0) {
                        playflag = "����ֱ��";
                        playclass = "ing";
                        playcode = " onclick=\"playLive('" + temp.id + "','" + temp.name + "')\" ";
                        //�����ʼ��ʱ����������ʱ�������ѽ���
                        if (passtimes > playtimes) {
                            playflag = "ֱ������";
                            playclass = "";
                        }
                    } else {
                        playflag = "������ʼ";
                    }
                    if ("ֱ������" != playflag) {
                        var playjs = " onclick=\"playImitateLive('" + rcode + "','" + RMarkType + "','" + Rtitle + "','" + starttime + "','" + playtimes + "');\" ";
                        var startTime = passtimes;//��ʼʱ��
                        if ("����ֱ��" != playflag) {
                            playjs = "";
                        }
                        var timetemp = "";
                        if (playtime % 60 > 0) {
                            timetemp = (playtime % 60) + "��";
                        }
                        playtime = Math.floor(playtime / 60);
                        playtime = playtime + "��" + timetemp;
                        $("#liveCon #liveList").prepend("<li ><span class=\"" + playclass + "\" " + playjs + " >" + playflag + "</span><i class=\"i1\">����</i><i class=\"i2\" title='" + temp.topic + "' >" + temp.topic + "</i><i class=\"i3\">" + starttime.substring(0, 16) + "</i><i class=\"i4\">" + playtime + "</i><i class=\"i5\">�Ž���ʦ</i></li>");
                        _common.splitpage("#liveCon li", 1, tv.pagesize, "#pageRightNav");
                    }
                } else {
                    if (backCounter > 0 && $("#liveList li").length == 0) {
                        codeArr.push("<li><center>�������ֱ��</center></li>");
                    }
                }
                backCounter++;
            } catch (e) {
            }
        });
    } else {
        //�޿�ѧ��һ�����
        backCounter = 1;
    }
    //liveType 1ֱ������  0����̨
    //orderType=2 ���չ�ע/ʱ������,Ĭ��Ϊʱ��/��ע����
    var data = "userName=" + teachernumber + "&liveType=1&liveRange=" + this.LiveRange + "&areaId=" + areaId + "&schoolId=" + schoolId + "&orderType=2&page=1&pageCount=" + (this.pagesize * 20);
    ajaxJson(transferProtocol_web + _config["RLMS"] + "/rlms/interface/queryLiveClass.jsp", data, "gbk", function (rdata) {
        var codeArr = new Array();
        if (rdata && rdata != null && rdata.list && rdata.list != null && rdata.list.length > 0) {
            for (var i = 0; i < rdata.list.length; i++) {
                var temp = rdata.list[i];
                var playflag = "������ʼ";
                var playtimes = temp.duration * 60000;
                var passtimes = compareTime(temp.start);
                //��Ŀ����
                var kmstr = "����";
                //�ǿ��򽫿�Ŀ����ת��Ϊ��Ŀ��
                if (!_common.isBlank(temp.kmcode)) {
                    var km = _common.getSection(temp.kmcode);
                }
                if (km && km != null) {
                    kmstr = km.name;
                }
                //ֱ��״̬����,(��������ʼʱ�䣬����Ϊ�Ѿ���ʼ,���ͬʱ����ʱ������Ϊ�Ѿ�����)
                var playclass = "";
                var playcode = "";
                if (passtimes >= 0) {
                    playflag = "����ֱ��";
                    playclass = "ing";
                    playcode = " onclick=\"javascript:playLive('" + temp.id + "','" + temp.name + "')\" ";
                    //�����ʼ��ʱ����������ʱ�������ѽ���
                    if (passtimes > playtimes) {
                        playflag = "ֱ������";
                        playclass = "";
                    }
                } else {
                    playflag = "������ʼ";
                }
                //��עЧ��
                var gzclass = "";
                if ("1" == temp.gzflag) {
                    gzclass = "class=\"active\" title='�ѹ�ע' "
                }
                codeArr.push("<li " + gzclass + " ><span class=\"" + playclass + "\" " + playcode + " >" + playflag + "</span><i class=\"i1\">" + kmstr + "</i><i class=\"i2\" title='" + temp.name + "' >" + temp.name + "</i><i class=\"i3\">" + temp.start.substring(0, 16) + "</i><i class=\"i4\">" + temp.duration + "����</i><i class=\"i5\">" + temp.teacher + "</i></li>");
            }
        } else {
            if (backCounter > 0 && $("#liveList li").length == 0) {
                codeArr.push("<li><center>�������ֱ��</center></li>");
            }
        }
        backCounter++;
        $("#liveCon #liveList").html(codeArr.join(""));
        codeArr = null;
        _common.splitpage("#liveList li", 1, live.pagesize, "#pageRightNav");
    });
}

/********  ����ת������ begin*********/
function TvObj() {
    this.pagesize = null;
    this.pagesize = null;
}

var tv = new TvObj();
TvObj.prototype.getRes = function () {
    this.pagesize = Math.floor(((_pMain.height - 50) / 90) * 5);
    //document.getElementById("main").innerHTML="<ul><li><img src='test.jpg' > ����һ��</li><li><img src='test.jpg' > ����2��</li></ul>";
    $("#main").html("<div id=\"liveCon\" class=\"liveCon\"><div class=\"courseTitle\" style='text-align:center'>����ת��</div><ul class=\"liveTv\" ></ul></div>");
    $(".liveCon").css("height", _pMain.height + 40);
    this.pagesize = _pMain.pagefontsize;
    //liveType 1ֱ������  0����̨
    var data = "userName=" + teachernumber + "&liveType=0&areaId=" + areaId + "&schoolId=" + schoolId + "&page=1&pageCount=" + (this.pagesize * 20);
    ajaxJson(transferProtocol_web + _config["RLMS"] + "/rlms/interface/queryLiveClass.jsp", data, "gbk", function (rdata) {
        var codeArr = new Array();
        if (rdata && rdata != null && rdata.list && rdata.list != null && rdata.list.length > 0) {
            for (var i = 0; i < rdata.list.length; i++) {
                var temp = rdata.list[i];
                var name = temp.name;
                if (name.length > 10) name = name.substring(0, 10) + "��";
                //<li><a href=\"#\"><img src='' >����һ��</a></li>
                codeArr.push("<li title='" + temp.name + "' ><a href=\"#\" onclick=\"playLive('" + temp.id + "','" + temp.name + "')\" ><img src='" + transferProtocol_web + _config["RLMS"] + "/rlms/" + temp.logo + "' >" + name + "</a></li>");
            }
        } else {
            codeArr.push("<center>������ص���ת��</center>");
        }
        $("#liveCon .liveTv").html(codeArr.join(""));
        codeArr = null;
        _common.splitpage("#liveCon li", 1, tv.pagesize, "#pageRightNav");
    });
}

//αֱ������
function playImitateLive(rcode, RMarkType, Rtitle, start, playtimes) {
    //���㿪ʼʱ��,�Ƿ����
    var passtimes = compareTime(start);//��ʼʱ���Ѿ�����ǰʱ�������
    //ֱ��״̬����,(��������ʼʱ�䣬����Ϊ�Ѿ���ʼ,���ͬʱ����ʱ������Ϊ�Ѿ�����)
    var playflag = null;
    if (passtimes >= 0) {
        playflag = "����ֱ��";
        //�����ʼ��ʱ����������ʱ�������ѽ���
        if (passtimes > playtimes) {
            playflag = "ֱ������";
        }
    } else {
        playflag = "������ʼ";
    }
    if ("����ֱ��" == playflag) {
        player.playResource(rcode, '2', RMarkType, passtimes);
    } else {
        alert(playflag + "!");
    }
}

//ֱ������
function playLive(id, title) {

    // ��ȡ���Ŵ򿪷�ʽ
    var data = "userName=" + teachernumber + "&lveid=" + id + "&clientip=" + ip + "&sk=" + sk;
    ajaxJson(transferProtocol_web + _config["RLMS"] + "/rlms/interface/playlve.jsp", data, "gbk", function (rdata) {
        if (rdata != null && rdata.url != null && rdata.url != "") {
            //������
            if (typeof (rdata.isNeedCdn) != "undefined" && rdata.isNeedCdn == 0) {
                //IE��_url������
                window.open(rdata.url);
                return;
            }
        }
        //�ɴ򿪷�ʽ
        _pm.putActMainPage(9);
        _usbObj.invisible();
        maskAll.style.display = 'block';
        var width = 620, height = 551;
        var opentype = '1-1';
        var url = transferProtocol_web + _config["PLS"] + "/newteach/play/bcPlayLive.jsp?opentype=" + opentype + "&liveid=" + id + "&username=" + teachernumber + "&infoTitle=" + encodeURIComponent(encodeURIComponent(title));
        _common.openResPage(width, height, url);
        setTimeout(function () {
            maskAll.style.display = 'none';
        }, 800);//������������ص�ǰ�˵�
    });


}