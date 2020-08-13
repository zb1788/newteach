<%@ page language="java" pageEncoding="GBK" %>
<script type="text/javascript">
    //班级对象
    var classes = new ClassObj();

    function ClassObj() {
        this.classId = null;//班级编号
        this.teacherId = null;//教师编号
        this.stuList = null;//学生列表
        this.stuNum = 0;//班级总人数
        this.callback = null;//获取班级信息后的回调函数
        this.commentImgList = null;//表扬图片表
    }

    //初始化班级信息
    ClassObj.prototype.init = function (data, callback) {
        this.teachernumber = data.teachernumber;
        this.schoolId = data.schoolId;
        this.classId = data.classId;
        this.teachername = decodeURIComponent(decodeURIComponent(data.teachername));
        this.schoolName = decodeURIComponent(decodeURIComponent(data.schoolName));
        this.callback = callback;
        //this.commentImgList=["hdkt/image/chengzan.gif","hdkt/image/guli.gif", "hdkt/image/guzhang.gif","hdkt/image/sahua.gif"];
        this.commentImgList = ["hdkt/swf/guli.swf", "hdkt/swf/chengzhan.swf", "hdkt/swf/sahua.swf"];
        this.stuList = new Array();
        this.setStuList();
    }
    //设置当前班级学生列表信息
    ClassObj.prototype.setStuList = function () {
        this.stuList.length = 0;
        this.stuNum = 0;
        var url = transferProtocol_web + _config["TMS"] + "/tms/interface/queryStudent.jsp?";
        url += "queryType=answerToolByClass&schoolClassId=" + this.classId;
        ajaxJson(url, null, "gbk", this.getStuListByJson);
        //测试时使用
        //ajaxJson(url,null,"gbk",this.getStuListByJsonAndSetToolCode);
    }
    //设置学生列表
    ClassObj.prototype.getStuListByJson = function (data) {
        if (null == data || undefined == data || null == data.result) {
            return;
        }
        classes.stuList = data.rtnArray;
        classes.stuNum = data.result;
        if (null != classes.callback) {
            classes.callback();
        }
    }
    //设置学生列表
    ClassObj.prototype.getStuListByJsonAndSetToolCode = function (data) {
        if (null == data || undefined == data || null == data.result) {
            return;
        }
        classes.stuList = data.rtnArray;
        classes.stuNum = data.result;
        for (var i = 0; i < classes.stuNum; i++) {
            var istr = i;
            if (i < 10) {
                istr = "0" + i;
            }
            var id = "44A8BD" + istr;
            classes.stuList[i].answerToolCode = id;
        }
        classes.stuList[0].answerToolCode = "44A8BD52";
        if (null != classes.callback) {
            classes.callback();
        }
    }
    //根据答题器编号获取相应学生
    ClassObj.prototype.getStuById = function (id) {
        for (var i = 0; i < this.stuNum; i++) {
            var stu = this.stuList[i];
            //studentNumber
            if (id == stu.answerToolCode || id == stu.studentNumber) {
                return stu;
            }
        }
        return null;
    }
    //
    //根据id串获取学生列表
    ClassObj.prototype.getStuByIds = function (idlist) {
        var list = new Array();
        if ("" == idlist || null == idlist || undefined == idlist || idlist.length < 0) {
            return list;
        }
        for (var i = 0; i < idlist.length; i++) {
            var temp = idlist[i];
            var student = {"id": temp.id, "name": temp.id, "isTrueName": false};
            var stu = this.getStuById(temp.id);
            if (null != stu) {
                student.name = stu.realname;
                student.isTrueName = true;
            }
            list.push(student);
        }
        return list;
    }
    //发布表扬信息 到班级圈
    ClassObj.prototype.commends = function (content, callback) {
        if (0 == this.stuNum) {
            alert("当前班级内尚未添加学生");
            return;
        }
        if (null == content || content.length == 0 || "" == content || undefined == content) {
            alert("请选择要要表扬的学生");
            return;
        }
        classes.comments_show(callback);//显示表扬信息
        classes.sendMail(content);//发送站内信
        classes.sendClass(content);//发送到班级圈
    }
    //发送班级圈信息
    ClassObj.prototype.sendClass = function (content) {

        content += "同学课堂上表现很棒，为他点赞！";
        var url = transferProtocol_web + _config["ILEARN"] + "/exportInterface/share.action?";
        url += "says.content=" + encodeURIComponent(content);
        url += "&classidList=" + classes.classId;
        url += "&username=" + classes.teachernumber;
        url += "&truename=" + encodeURIComponent(classes.teachername);
        url += "&schoolId=" + classes.schoolId;
        url += "&schoolName=" + encodeURIComponent(classes.schoolName);
        ajaxJson(url, null, "gbk", function (data) {
            if (true == data.success) {
            }
        });
    }
    //发送站内信
    ClassObj.prototype.sendMail = function (content) {
        var timestamp = new Date().getTime();//时间戳毫秒
        var rnum = parseInt(Math.random() * 1000000);
        var opId = "6_" + timestamp + "_" + rnum;
        content += "同学课堂上表现很棒，为他点赞！";
        var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/sendCommend.jsp?";
        url += "command=sendMsg";
        url += "&username=" + classes.teachernumber;
        url += "&usertype=2";
        url += "&sendToClass=" + classes.classId;
        url += "&content=" + encodeURIComponent(encodeURIComponent(content));
        url += "&busId=4";
        url += "&msgType=1";
        url += "&opId=" + opId;
        url += "&sendType=1";
        ajaxJson(url, null, "gbk", function (data) {
            if (1 == data.result) {

            }
        });

    }
    //显示表扬图层
    ClassObj.prototype.comments_show = function (callback) {
        var num = parseInt(this.commentImgList.length * Math.random());
        var url = this.commentImgList[num];
        try {
            var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            document.getElementById("byimgdiv").style.marginTop = winScroll + "px";
        } catch (e) {
        }
        //$("#comments_img").attr("src",url);
        //flash播放
        var params = {};
        params.quality = "high";
        params.allowscriptaccess = "sameDomain";
        params.allowfullscreen = "true";
        params.WMode = "transparent";
        swfobject.embedSWF(url, "byimgdiv", "90%", "90%", "1.0", null, null, params);
        $("#comments").css("display", "");
        setTimeout(function () {
            swfobject.removeSWF("byimgdiv");
            $("#comments").html("<div id='byimgdiv'></div>");

            if (callback != null) {
                callback();
            }
        }, 3000);
    }
</script>