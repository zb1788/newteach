<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!--系统设置-开始-->
<div class="floatDiv" id="live.window">
    <div class="btn">
        <p class="playClose" onclick="_liveUtil.closeWindow();"
           onmousemove="tochangebg(this,1)" onmouseout="tochangebg(this,2)"></p>
        <h3 id="live.title">
            MP3浏览
        </h3>
    </div>
    <object id=media classid=clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95 width=608 height=526>
        <param name=filename value="">
        <param name=UIMode value=none>
        <param name=AutoStart value=-1>
        <param name=Enabled value=true>
        <param name=ShowStatusBar value=1>
        <param name=ShowControls value=1>
        <param name=EnableFullScreenControls value=1>
        <param name=EnablePositionControls value=1>
        <param name=Volume value=-60>
        <param name=DisplaySize value=1>
        <param name=SendErrorEvents value=0>
        <param name=enableContextMenu value=1>
        <param name=EnableStretchToFit value=1>
        <param name=EnableTracker value=1>
        <embed width=352 height=359 uimode=none autostart=1 enabled=true showcontrols=1 volume=-60>
        </embed>
    </object>

</div>
<!--系统设置-结束-->

<script>
    function tocloseorbg(obj, type) {
        //window.location.href="close://";
        _liveUtil.closeVideo();
        _liveUtil.closeWindow();

    }

    function tochangebg(obj, type) {
        if (type == 1) {
            obj.className = "playCloseH";
        } else {
            obj.className = "playClose";
        }
    }
</script>

<SCRIPT LANGUAGE="JavaScript">
    //_liveUtil.playVideo()//
    LiveUtilObj.prototype.playVideo = function (i) {
        var obj = _liveUtil.liveList[parseInt(i)];
        obj.playStatus = 1;// 1-正在播放 0未播放
        _liveUtil.currPlayId = parseInt(i);

        document.getElementById('live.title').innerHTML = obj.title;
        //alert(obj.title);
        //alert(obj.playUrl);
        //obj.playUrl='http://192.168.15.220:8080/pls/1234.wmv';
        // obj.playUrl='mms://192.168.104.156/bbt';
        window.status = '播放地址是：' + obj.playUrl;
        media.filename = obj.playUrl;

    };
    LiveUtilObj.prototype.setVolume = function (num) {
        //alert(num);
        //alert('音量'+media.Volume);

        var tnum = media.Volume + num;
        if (tnum > 0) {
            tnum = 0
        }
        if (tnum < -10000) {
            tnum = -10000
        }

        media.Volume = tnum;
        //alert(media.Volume);

    };


    //_liveUtil.closeVideo();
    LiveUtilObj.prototype.closeVideo = function () {

        media.filename = '';
        _liveUtil.liveList[_liveUtil.currPlayId].playStatus = 0;// 1-正在播放 0未播放
        window.status = '';
    };
    //_liveUtil.openWindow
    LiveUtilObj.prototype.openWindow = function (i) {
        //_pm.putActMainPage(1) 活动页面 0-教师资源 1-教师收藏 2-专题活动(知识扩展)3-U盘资源 4-教师文件夹 5-校本资源 6-均衡资源  7-课程直播 8-详细页面 9-直播播放页面
        _pm.putActMainPage(9);
        _usbObj.invisible();
        maskAll.style.display = 'block';

        document.getElementById('live.window').style.display = "block";

        _liveUtil.playVideo(i);
        //document.getElementById('live.ipbutton').focus();
        //if(isAllowSimpleHotKey) _simpleHotKey.pid='live.window'; //使得该层支持简单热键


    }


    //liveUtil.closeWindow()
    LiveUtilObj.prototype.closeWindow = function () {
        //_pm.putActMainPage(1) 活动页面 0-教师资源 1-教师收藏 2-专题活动(知识扩展)3-U盘资源 4-教师文件夹 5-校本资源 6-均衡资源  7-课程直播 8-详细页面 9-直播播放页面
        _pm.putActMainPage(8);
        _usbObj.visible();
        _liveUtil.closeVideo();

        maskAll.style.display = 'none';//若干秒后亦隐藏当前菜单
        void (document.getElementById('live.window').style.display = 'none');

        if (isAllowSimpleHotKey) _simpleHotKey.pid = null; //取消对该层简单热键支持

        maskAll.style.display = 'none';


    };
    //直播页面快捷键liveUtil.livePageHotkey()
    LiveUtilObj.prototype.livePageHotkey = function () {
        var keyval = event.keyCode;
        //alert('直播页面快捷键'+  keyval);
        if (keyval == 27) {//esc退出
            this.closeWindow();
            return;
        }

        var currLiveObj = _liveUtil.liveList[_liveUtil.currPlayId];
        var playStatus = currLiveObj.playStatus;

        if (event.ctrlKey && event.shiftKey && keyval == 48) {//暂停播放
            //alert(playStatus);

            //alert(media.Volume);
            if (playStatus == 0) {
                currLiveObj.playStatus = 1;//
                //media.controls.pause();
                media.Play();
                //Stop
            } else {
                currLiveObj.playStatus = 0;
                media.Stop();
            }
        }

        //音量-	CTRL+SHIFT+3（大键盘）
        if (event.ctrlKey && event.shiftKey && keyval == 51) {//音量减
            _liveUtil.setVolume(-200)
        }
        //音量+	CTRL+SHIFT+4（大键盘）
        if (event.ctrlKey && event.shiftKey && keyval == 52) {//音量加
            _liveUtil.setVolume(200)
        }
    };
</SCRIPT>



