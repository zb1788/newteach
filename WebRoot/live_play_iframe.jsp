<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!--系统设置-开始-->
<div class="floatDiv" id="live.window">
    <iframe src="" width="" id="live.iframe"></iframe>

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
        _pm.putActMainPage(9);
        _usbObj.invisible();
        var obj = _liveUtil.liveList[parseInt(i)];
        //直播？？是否支持https
        _common.openResPage(900, 520, "http://" + obj.vodIp);
//  window.location.href="mybrowser://width:"+900+"&&height:"+520+"@@"+'http://'+obj.vodIp;
    }


    //liveUtil.closeWindow()
    LiveUtilObj.prototype.closeWindow = function () {
        //_pm.putActMainPage(1) 活动页面 0-教师资源 1-教师收藏 2-专题活动(知识扩展)3-U盘资源 4-教师文件夹 5-校本资源 6-均衡资源  7-课程直播 8-详细页面 9-直播播放页面
        _pm.putActMainPage(8);
        _usbObj.visible();
        _liveUtil.closeVideo();


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



