<%@ page contentType="text/html; charset=utf-8" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
//获取相应参数
    String flist = (String) request.getAttribute("flist");
    String filename = (String) request.getParameter("filename");
    String teachernumber = (String) request.getParameter("teachernumber");
    String rcode = (String) request.getParameter("rcode");
    String loginStyle = request.getParameter("loginStyle");
    if (!"1".equals(loginStyle)) {
        loginStyle = "0";
    }
%>
<HTML>
<HEAD>
    <TITLE>音频播放器</TITLE>
    <META NAME="Generator" CONTENT="EditPlus">
    <META NAME="Author" CONTENT="">
    <META NAME="Keywords" CONTENT="">
    <META NAME="Description" CONTENT="">
    <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>
    <link href="<%=path %>/style/style.css" rel="stylesheet" type="text/css"/>
    <jsp:include page="/js/config_pls_include.jsp"/>
    <script language="javascript" src="<%=path%>/js/ajax_common.js"></script>
    <jsp:include page="/play/play.jsp"/>

    <style>
        BODY {
            MARGIN: 0px;
            BACKGROUND-REPEAT: repeat-x;
            BACKGROUND-POSITION: 50% top;
            FONT-SIZE: 12px
        }

        H1 {
            PADDING-BOTTOM: 0px;
            MARGIN: 0px;
            PADDING-LEFT: 0px;
            PADDING-RIGHT: 0px;
            FONT-SIZE: 14px;
            PADDING-TOP: 0px
        }

        H3 {
            PADDING-BOTTOM: 0px;
            MARGIN: 0px;
            PADDING-LEFT: 0px;
            PADDING-RIGHT: 0px;
            FONT-SIZE: 14px;
            PADDING-TOP: 0px
        }

        DIV {
            PADDING-BOTTOM: 0px;
            MARGIN: 0px;
            PADDING-LEFT: 0px;
            PADDING-RIGHT: 0px;
            PADDING-TOP: 0px
        }

        UL {
            PADDING-BOTTOM: 0px;
            MARGIN: 0px;
            PADDING-LEFT: 0px;
            PADDING-RIGHT: 0px;
            PADDING-TOP: 0px
        }

        LI {
            PADDING-BOTTOM: 0px;
            MARGIN: 0px;
            PADDING-LEFT: 0px;
            PADDING-RIGHT: 0px;
            PADDING-TOP: 0px
        }

        DL {
            PADDING-BOTTOM: 0px;
            MARGIN: 0px;
            PADDING-LEFT: 0px;
            PADDING-RIGHT: 0px;
            PADDING-TOP: 0px
        }

        .left {
            FLOAT: left
        }

        .right {
            FLOAT: right
        }

        .p_centent {
            PADDING-BOTTOM: 0px;
            PADDING-LEFT: 35px;
            WIDTH: 458px;
            PADDING-RIGHT: 0px;
            BACKGROUND: url(../images/p_01.gif);
            HEIGHT: 20px;
            MARGIN-LEFT: 8px;
            FONT-WEIGHT: bold;
            PADDING-TOP: 12px
        }

        .p_centent LI {
            LIST-STYLE-TYPE: none
        }

        .p_c1 {
            WIDTH: 458px;
            HEIGHT: 63px;
            MARGIN-LEFT: 8px
        }

        .p_c2 {
            PADDING-BOTTOM: 2px;
            BACKGROUND-COLOR: #e9f3ff;
            PADDING-LEFT: 2px;
            WIDTH: 454px;
            PADDING-RIGHT: 2px;
            HEIGHT: 19px;
            MARGIN-LEFT: 8px;
            PADDING-TOP: 10px
        }

        .p_c2 LI {
            LIST-STYLE-TYPE: none
        }
    </style>
</HEAD>

<BODY leftmargin="0" topmargin="0" scroll="no" style="background-image: url('<%=path %>/images/mp3bg.jpg')">
<!--播放器（close）-开始-->
<div class="player" id="playDiv">
    <script>
        var ww = document.body.clientWidth;
        var wh = document.body.clientHeight;
        var playdiv = document.getElementById("playDiv");
        playdiv.style.height = (wh - 48) + "px";
        playdiv.style.width = ww + "px";
    </script>
    <OBJECT ID="media" CLASSID="CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6" width="100%" height="80px">
        <param NAME=AutoStart VALUE=1>
        <param NAME=PlayCount VALUE=1>
        <param name=invokeURLs value=0>
        <param name=volume value=100>
        <param name=EnableContextMenu value=0>
        <PARAM NAME=URL value="">
        <PARAM NAME=ShowPositionControls value=0>
    </OBJECT>
    <!-- 歌名 begin 10个为好 -->
    <ul class="mp3List">
        <div id="musicName"></div>
        <div id="pageBar"></div>
    </ul>
</div>
<div class="btn">
    <%if ("0".equals(loginStyle)) {%>
    <p id="padHiddenButton" class="playClose" onclick="tocloseorbg(this,2);" onmousemove="tochangebg(this,1)"
       onmouseout="tochangebg(this,2)"></p>
    <h3 id="_mp3">音频浏览</h3>
    <%} %>
</div>
<!--播放器（close）-结束-->
<script>
    //var flist=<%=flist%>;
    function tocloseorbg(obj, type) {
        window.location.href = "close://";
    }

    function tochangebg(obj, type) {
        if (type == 1) {
            obj.className = "playCloseH";
        } else {
            obj.className = "playClose";
        }
    }
</script>
<script type="text/javascript">
    /********  音乐对象 begin*********/
    var _musUtil = new MusicUtilObj();

    function MusicObj(id, name, playUrl) {
        this.id = id;
        this.name = name;//音乐名称
        this.playUrl = playUrl;//播放地址
    }

    function MusicUtilObj() {
        this.currPlayId = 0;
        this.currPage = 1;//当前页
        this.titleId = '_mp3';
        this.musicNameId = 'musicName';
        this.pageBarId = 'pageBar';
        this.pageSize = 5;
        this.musList = new Array();
    }

    //_musUtil.showTitle(name)//显示歌名标题
    MusicUtilObj.prototype.showTitle = function (name) {
        try {
            if (name.length > 25)
                name = name.substring(0, 24) + "……";
            document.getElementById(this.titleId).innerHTML = name;
        } catch (e) {
            //
        }
    };
    //设置选中状态
    MusicUtilObj.prototype.setSelectStatus = function (currObj) {
        if (undefined == currObj || null == currObj) return;

        var objs = document.getElementById(this.musicNameId).children;
        for (var i = 0; i < objs.length; i++) {
            objs[i].className = "";//修改样式
        }
        /****/
        currObj.className = "sel";
    };

    //_musUtil.play()//
    MusicUtilObj.prototype.play = function (i) {
        if (media.playState == 6 || media.playState == 9) return;
        //alert(typeof(i));
        this.currPlayId = parseInt(i);
        //alert(this.currPlayId);
        var obj = this.musList[i];

        this.showTitle(obj.name);
        media.URL = obj.playUrl;
        this.setSelectStatus(document.getElementById(obj.id));
        //window.status='正在播放第'+this.currPlayId+'首歌曲'
    };
    //下一首 //_musUtil.playNextMusic()//  playPreMusic
    MusicUtilObj.prototype.playNextMusic = function () {
        if (this.currPlayId >= this.musList.length - 1) {
            window.status = '当前是最后一首歌';
            return;
        }


        var lastMusicId = (this.pageSize) * (this.currPage - 1) + this.pageSize - 1;
        //alert(lastMusicId +'=='+this.currPlayId);
        if (this.currPlayId == lastMusicId) {
            //alert(this.currPage);
            this.showMusicNameList(this.currPage + 1);
            return;
        } else {

            this.play(this.currPlayId + 1);
        }
    };//下一首
    //上一首 //_musUtil.playNextMusic()//  playPreMusic
    MusicUtilObj.prototype.playPreMusic = function () {
        //alert(this.currPlayId);
        if (this.currPlayId == 0) {
            window.status = '第一首歌';
            return;
        }


        var headMusicId = (this.pageSize) * (this.currPage - 1);
        //alert(lastMusicId +'=='+this.currPlayId);
        if (this.currPlayId == headMusicId) {
            //alert(this.currPage);
            this.showMusicNameList(this.currPage - 1, this.currPlayId - 1);
            return;
        } else {

            this.play(this.currPlayId - 1);
        }
    };//上一首

    //_musUtil.showMusicNameList//显示歌名列表
    MusicUtilObj.prototype.showMusicNameList = function (currPageNum, playId) {
        this.currPage = currPageNum;
        var pageSize = this.pageSize;
        var pageNum = 0;


        if (this.musList.length / (pageSize) > parseInt(this.musList.length / pageSize))
            pageNum = parseInt(this.musList.length / pageSize) + 1;
        else
            pageNum = parseInt(this.musList.length / pageSize);


        var h = '';
        var start = (pageSize) * (currPageNum - 1);
        var end = start + pageSize;

        var count = 0;
        for (var i = start; i < end && i < this.musList.length; i++) {
            //<li><span>暖乐团</span>1.堪培拉的风</li>
            var musicName = this.musList[i].name;
            var playUrl = this.musList[i].playUrl;
            var id = this.musList[i].id;
            var idStr = this.musList[i].id;
            // alert(i+ '  '+musicName);
            var jsStr = '_musUtil.play(\'' + idStr + '\');';
            jsStr += '_musUtil.setSelectStatus(this);';
            var sortStr = (1 + id) + '. ';

            if (musicName.length > 25)
                musicName = musicName.substring(0, 24) + "……";
            h += '<li class="mp3" id="' + idStr + '" onclick=' + jsStr + '>' + sortStr + musicName + '</li>';
            count++;
        }

        //alert(count);
        if (this.pageSize - count != 0) {
            var height = 33 * (this.pageSize - count);
            var styleStr = 'height:' + height + 'px;';
            h += '<div style="' + styleStr + '">' + '' + '</div>';
        }


        //显示分页
        var pageStr = "";
        //<li class="page"><a href="#">上页</a><a href="#">下页</a></li>
        //显示下一页
        if (currPageNum < pageNum) {
            var next = currPageNum + 1;
            var jsStr = '_musUtil.showMusicNameList(' + next + ')';
            pageStr += '<a  onclick="' + jsStr + '">下页</a>';
            //alert(pageStr);
        }
        //显示上一页
        if (1 != currPageNum) {
            var up = currPageNum - 1;
            var jsStr = '_musUtil.showMusicNameList(' + up + ')';
            pageStr += '<a  onclick="' + jsStr + '">上页</a>';
            //alert(pageStr);
        }


        document.getElementById(this.musicNameId).innerHTML = h;
        document.getElementById(this.pageBarId).innerHTML = '<li class="page">' + pageStr + '</li>';


        if (undefined == playId)
            _musUtil.play(start);//播放本页的第一首歌
        else {
            // prompt(playId);
            _musUtil.play(playId);//播放歌曲
        }
    };
    ///_musUtil.nextPage()下一页
    MusicUtilObj.prototype.nextPage = function () {

        var obj = document.getElementById(this.pageBarId).getElementsByTagName('a');
        for (var i = 0; i < obj.length; i++) {
            var currObj = obj[i];
            var text = currObj.innerHTML.replace(/\s/g, '');
            //alert(obj[i].src +'  '+obj[i].innerHTML+'  '+text);
            if (text == '下页' || text == '下一页') {
                currObj.click();
                break;
            }

        }//end of for


    }//下一页
    ///_musUtil.nextPage()下一页
    MusicUtilObj.prototype.upPage = function () {

        var obj = document.getElementById(this.pageBarId).getElementsByTagName('a');
        for (var i = 0; i < obj.length; i++) {
            var currObj = obj[i];
            var text = currObj.innerHTML.replace(/\s/g, '');
            //alert(obj[i].src +'  '+obj[i].innerHTML+'  '+text);
            if (text == '上页' || text == '上一页') {
                currObj.click();
                break;
            }

        }//end of for


    }//下一页
    //_musUtil.addMusic()
    MusicUtilObj.prototype.addMusic = function (musObj) {
        this.musList[this.musList.length] = musObj;
    };
</script>
<script type="text/javascript">
    var basePath = "<%=basePath%>";
    var teachernumber = "<%=teachernumber%>";
    var rcode = "<%=rcode%>";
    var types = ",MP3,WMA,WAV,MIDI,";
    //playRes(flist);
    //负载地址
    var url = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?";
    url += "rcode=" + rcode;
    url += "&userName=" + teachernumber;
    url += "&filterType=0&allowPcMain=1";
    url += "&outType=1";//1为json 2 xml

    //设置图片列表
    getLoadAddress(url, playRes);

    function playRes(data) {
        if (data == null || data == undefined || data.length == 0) {
            try {
                _mp3.innerHTML = "没有可播放的资源!";
            } catch (e) {
                alert("没有可播放的资源!");
            }
            return;
        } else if (typeof (data) == 'string') {
            try {
                _mp3.innerHTML = data;
            } catch (e) {
                alert("没有可播放的资源!");
            }
            return;
        }
        var _url = data[0].path;
        var linkType = data[0].linkType;
        var clicktype = 0;
        for (var i = 0; i < data.length; i++) {
            var temp = data[i];
            var file_type = temp.format;
            if (types.indexOf(file_type.toUpperCase() + ",") > 0) {
                var filename = temp.file_name;
                var path = temp.path;
                var musObj = new MusicObj(i, filename, path);
                _musUtil.addMusic(musObj);
            }
        }
        _musUtil.showMusicNameList(1);//显示歌名列表（第一页）
    }

    var playtype = 0, playvolume = 100;

    function keyDown(e) {
        var keyval = event.keyCode;
        //alert(keyval);
        if (keyval == 32) {
            //fullsc();
        } else if (keyval == 27) {//esc退出
            //window.close();
        } else if (keyval == 33) {//上箭头
            _musUtil.upPage();
            /**
             if(playurl.length<1)return;
             if(clicktype>0){
					clicktype--;
				}else{
					clicktype=playurl.length-1;
				}
             var _playrul=playurl[clicktype].split(",,");
             //_name.innerHTML=_playrul[0];
             media.URL=_playrul[1];    */
        } else if (keyval == 34) {//下箭头
            _musUtil.nextPage();
            /**
             if(playurl.length<1)return;
             if(clicktype<playurl.length-1){
					clicktype++;
				}else{
					clicktype=0;
				}
             var _playrul=playurl[clicktype].split(",,");
             //_name.innerHTML=_playrul[0];
             media.URL=_playrul[1];*/
        } else if (event.ctrlKey && event.shiftKey && keyval == 53) {//静音
            if (media.settings.mute)
                media.settings.mute = false;
            else
                media.settings.mute = true;

        } else if ((keyval == 13) || (event.ctrlKey && event.shiftKey && keyval == 48)) {//暂停播放
            //alert('暂停'+keyval);
            //&&keyval==13
            if (playtype == 0) {
                playtype = 1;
                media.controls.pause();
            } else {
                playtype = 0;
                media.controls.play();
            }
        } else if (event.ctrlKey && event.shiftKey && keyval == 51) {//音量减
            if (playvolume >= 10) {
                playvolume = playvolume - 10;
                media.settings.volume = playvolume;
            }

        } else if (event.ctrlKey && event.shiftKey && keyval == 52) {//音量加
            if (playvolume <= 90) {
                playvolume = playvolume + 10;
                media.settings.volume = playvolume;
            }
        } else if (39 == keyval) {//下
            if (media.playState == 6 || media.playState == 9) return;
            _musUtil.playNextMusic();

        } else if (37 == keyval) {//上
            if (media.playState == 6 || media.playState == 9) return;
            _musUtil.playPreMusic();
        } else if (40 == keyval) {//zuo
            if (playvolume >= 10) {
                playvolume = playvolume - 10;
                media.settings.volume = playvolume;
            }

        } else if (38 == keyval) {//you
            if (playvolume <= 90) {
                playvolume = playvolume + 10;
                media.settings.volume = playvolume;
            }
        }
    }

    document.onkeydown = keyDown;
    window.setTimeout(function () {
        window.focus();
    }, 300);
</script>

<script type="text/javascript">


    //141105PAD隐藏视频、图片下部菜单按钮，由客户端展示
    function readCookie(name) {
        var cookieValue = null;
        var search = name + "=";
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = document.cookie.indexOf(";", offset);
                if (end == -1) end = document.cookie.length;
                cookieValue = unescape(document.cookie.substring(offset, end))
            }
        }
        return cookieValue;
    }

    if (readCookie("terminal") != null && readCookie("terminal") == "pad") {
        //是PAD客户端
        document.getElementById("padHiddenButton").style.display = "none";
    }


</script>
</BODY>
</HTML>
 