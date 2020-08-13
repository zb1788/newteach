var wkzy = new WKZY();

//΢��ģ�����
function WKZY() {
    this.resflag = null;          //��Դ���ͱ�ʶ  all :ȫ����Դ    fav : ��ʦ�ղ���Դ
    this.currResTypeName = null;  //��ǰ��Ŀ����
    this.currentKsid = null;      //��ǰ��Ŀ���
    this.threeMenu = null;        //�����˵�
    this.pagesize = null;//�Ҳ�����Դ��ʾ����
    this.pageRightNavIdName = null;
}

//У��΢��
WKZY.prototype.getRes = function (ksId, _currResTypeName) {
    this.pageRightNavIdName = '#pageRightNav';
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+_treeVersion.currentCourseName+"<span class=\"bgImg\"></span></div>");
    var data = "schoolId=" + schoolId + "&chapterId=" + ksId + "&start=0&limit=" + (this.pagesize * 15);
    var url = transferProtocol_web + _config["MICRO"] + "/interface/getResByChapterId.action";
    ajaxJson(url, data, "utf-8", wkzy.parseResList);
    /*
    var rdata={"countSql":"pk.ResourceInfo.getWkResourceCount",
    			"items":[
	    				{"activityid":"1.1.1","addCommentnum":null,"addLooknum":null,"addVotenum":null,"areaCode":"1.1.1","areaName":"��Ͻ��","awardid":null,"awardname":null,"chapterId":"00010203030517","chapterName":"1. 1��5����ʶ","commentList":[],"commentnum":0,"coursename":"aaaaaaaaaaaaaaaaa","describe":"aaaaaaaaaaaaaaaaaa","duplicateRecord":"7bafae0e46ec4a3d8f3ed2a88756edb7","evaluate":null,"fromSystem":null,"greadid":"0001","greadname":"һ�꼶","id":"9b6582f8d0374320a34de6faa87b4c17","ifactivity":"0","isVote":0,"judgeAccount":null,"judgeScore":null,"judgescoreList":[],"liveid":null,"livelen":null,"livetime":null,"looknum":0,"p1":"1","p2":null,"p3":null,"p4":null,"paperId":null,"papername":null,"playstatus":1,"pointLikeList":null,"pointsId":"26.1.1.1.","pointsName":"��������ʶ�����","posterurl":null,"publishtime":"20160408112445","schoolId":"4101010001","schoolName":"����ѧУ","scorenum":0,"sharestatus":0,"showLevel":1,"showlevel":null,"singleflag":0,"sortId":null,"sortnum":1460085885796,"subject":null,"subjectid":"0002","subjectname":"��ѧ","termid":"0001","termname":"��ѧ��","trueName":"δͨ��1","type":0,"userInfo":null,"username":"41010100010022","verifycontent":null,"verifystatus":null,"versionid":"0003","versionname":"�ս̰�","votenum":0,rcode:"20141020161401583879838181986"},
	    				{"activityid":"1.1.1","addCommentnum":null,"addLooknum":null,"addVotenum":null,"areaCode":"1.1.1","areaName":"��Ͻ��","awardid":null,"awardname":null,"chapterId":"00010203030517","chapterName":"1. 1��5����ʶ","commentList":[],"commentnum":0,"coursename":"�γ�����","describe":"aaaaaaaaaaaaaaaaaa","duplicateRecord":"7bafae0e46ec4a3d8f3ed2a88756edb7","evaluate":null,"fromSystem":null,"greadid":"0001","greadname":"һ�꼶","id":"9b6582f8d0374320a34de6faa87b4c17","ifactivity":"0","isVote":0,"judgeAccount":null,"judgeScore":null,"judgescoreList":[],"liveid":null,"livelen":null,"livetime":null,"looknum":0,"p1":"1","p2":null,"p3":null,"p4":null,"paperId":null,"papername":null,"playstatus":1,"pointLikeList":null,"pointsId":"26.1.1.1.","pointsName":"��������ʶ�����","posterurl":null,"publishtime":"20160408112445","schoolId":"4101010001","schoolName":"����ѧУ","scorenum":0,"sharestatus":0,"showLevel":1,"showlevel":null,"singleflag":0,"sortId":null,"sortnum":1460085885796,"subject":null,"subjectid":"0002","subjectname":"��ѧ","termid":"0001","termname":"��ѧ��","trueName":"δͨ��1","type":0,"userInfo":null,"username":"41010100010022","verifycontent":null,"verifystatus":null,"versionid":"0003","versionname":"�ս̰�","votenum":0,rcode:"20141218090858771606742222839"}
    				],
    				"limit":10,"params":{"order":"desc","showlevel":"1","areaCode":"1.1.1","orderby":"publishtime"},"querySql":"pk.ResourceInfo.getWkResource","start":0,"total":1,"totalPage":1};
    wkzy.parseResList(rdata);
    */
}
//����΢��
WKZY.prototype.getBDRes = function (ksId, _currResTypeName) {
    this.pageRightNavIdName = '#pageRightNavbar';
    this.currResTypeName = _currResTypeName;
    this.currentKsid = ksId;
    this.pagesize = _pMain.newcontentpagesize;//�Ҳ�����Դ��ʾ����
    $(_pMain.getMainRight()).html("");
    if (this.currResTypeName.length > 25) this.currResTypeName = this.currResTypeName.substring(0, 24) + "��";
    //$(_pMain.getMainRight()).html("<div class=\"courseTitle\">"+this.currResTypeName+"-΢����Դ"+"<span class=\"bgImg\"></span></div>");
    var data = "schoolId=" + schoolId + "&areacode=" + ksId + "&start=0&limit=" + (this.pagesize * 15);
    var url = transferProtocol_web + _config["MICRO"] + "/interface/getResByArea.action";
    ajaxJson(url, data, "utf-8", wkzy.parseResList);
}
//����΢���б�����
WKZY.prototype.parseResList = function (rdata) {
    var temphtml = new Array();
    temphtml.push("<ul class=\"testList\">");
    if (rdata && rdata.items && rdata.items.length > 0) {
        for (var i = 0; i < rdata.items.length; i++) {
            //�ڿ���Դ����������һ��
            var temp = rdata.items[i];
            var RCode = temp.id;
            var RTitle = temp.coursename;
            var playjs = "wkzy.wkplay('" + RCode + "','" + convertHtml(RTitle) + "')";
            var imagepic = "<img width='20' height='20' src=\"" + transferProtocol_web + _config["PLS"] + "/newteach/images/icon/res/mp4.png\"  />";
            temphtml.push("<li><span><a href=\"javascript:wkzy.sendWKRecommend('" + RCode + "')\">����</a></span>" + imagepic + "<a title=\"" + RTitle + "\" onclick=\"" + playjs + "\" id=\"" + RCode + "\" ><p class=\"zy-tm\">" + RTitle + "</p></a></li>");
        }
    } else {
        temphtml.push("<li><center>" + _common.hasNoRes + "</center></li>");
    }
    temphtml.push("</ul>");
    $(_pMain.getMainRight()).html(temphtml.join(""));
    temphtml = null;
    _common.splitpage(".testList li", 1, wkzy.pagesize, wkzy.pageRightNavIdName);
}
//΢�η����Ƽ�
WKZY.prototype.sendWKRecommend = function (rcode) {
    //�˽ӿ�encodeURIComponent����һ��
    _commonDiv.openWindow(1, "������Դ", "��ѡ��༶��", function (selclassArray) {
        var sendToClass = new Array();
        for (var i = 0; i < selclassArray.length; i++) {
            sendToClass.push(selclassArray[i].classId);
        }
        var tdata = "resourceId=" + rcode + "&fromUsername=" + teachernumber + "&fromTruename=" + encodeURIComponent(teachername) + "&stuClassId=" + sendToClass.join(",");
        ajaxJson(transferProtocol_web + _config["MICRO"] + "/interface/shareToStudent.action", tdata, "utf-8", function (rdata) {
            if (rdata.success) {
                _commonDiv.tip("���ͳɹ���");
                //�Ƽ�+U��
                _common.addUb("u_tuijianziyuan", "�ڿζ˷����Ƽ���Դ", rcode);
                _commonDiv.closeWindow(2000);
            } else {
                if (rdata.text) {
                    _commonDiv.tip(rdata.text);
                } else {
                    _commonDiv.tip("����ʧ�ܣ�");
                }

                _commonDiv.closeWindow(2500);
            }
        });
    }, true, null, null);
}
//����΢����Դ
WKZY.prototype.wkplay = function (rcode, RTitle) {
    var url = transferProtocol_web + _config["MICRO"] + '/user/resource/play/gotoTeachingPlay.action?data={"username":"' + teachernumber + '","usertype":"2","rcode":"' + rcode + '"}' + "&ut=" + sso_ut;
    _common.openByIE(url);
    //openResPageWithClose(url,RTitle);
}