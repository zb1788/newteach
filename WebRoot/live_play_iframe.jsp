<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!--ϵͳ����-��ʼ-->
<div class="floatDiv" id="live.window">
    <iframe src="" width="" id="live.iframe"></iframe>

</div>
<!--ϵͳ����-����-->

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
        obj.playStatus = 1;// 1-���ڲ��� 0δ����
        _liveUtil.currPlayId = parseInt(i);

        document.getElementById('live.title').innerHTML = obj.title;
        //alert(obj.title);
        //alert(obj.playUrl);
        //obj.playUrl='http://192.168.15.220:8080/pls/1234.wmv';
        // obj.playUrl='mms://192.168.104.156/bbt';
        window.status = '���ŵ�ַ�ǣ�' + obj.playUrl;
        media.filename = obj.playUrl;

    };
    LiveUtilObj.prototype.setVolume = function (num) {
        //alert(num);
        //alert('����'+media.Volume);

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
        _liveUtil.liveList[_liveUtil.currPlayId].playStatus = 0;// 1-���ڲ��� 0δ����
        window.status = '';
    };
    //_liveUtil.openWindow
    LiveUtilObj.prototype.openWindow = function (i) {
        _pm.putActMainPage(9);
        _usbObj.invisible();
        var obj = _liveUtil.liveList[parseInt(i)];
        //ֱ�������Ƿ�֧��https
        _common.openResPage(900, 520, "http://" + obj.vodIp);
//  window.location.href="mybrowser://width:"+900+"&&height:"+520+"@@"+'http://'+obj.vodIp;
    }


    //liveUtil.closeWindow()
    LiveUtilObj.prototype.closeWindow = function () {
        //_pm.putActMainPage(1) �ҳ�� 0-��ʦ��Դ 1-��ʦ�ղ� 2-ר��(֪ʶ��չ)3-U����Դ 4-��ʦ�ļ��� 5-У����Դ 6-������Դ  7-�γ�ֱ�� 8-��ϸҳ�� 9-ֱ������ҳ��
        _pm.putActMainPage(8);
        _usbObj.visible();
        _liveUtil.closeVideo();


        void (document.getElementById('live.window').style.display = 'none');

        if (isAllowSimpleHotKey) _simpleHotKey.pid = null; //ȡ���Ըò���ȼ�֧��

        maskAll.style.display = 'none';


    };
    //ֱ��ҳ���ݼ�liveUtil.livePageHotkey()
    LiveUtilObj.prototype.livePageHotkey = function () {
        var keyval = event.keyCode;
        //alert('ֱ��ҳ���ݼ�'+  keyval);
        if (keyval == 27) {//esc�˳�
            this.closeWindow();
            return;
        }

        var currLiveObj = _liveUtil.liveList[_liveUtil.currPlayId];
        var playStatus = currLiveObj.playStatus;

        if (event.ctrlKey && event.shiftKey && keyval == 48) {//��ͣ����
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

        //����-	CTRL+SHIFT+3������̣�
        if (event.ctrlKey && event.shiftKey && keyval == 51) {//������
            _liveUtil.setVolume(-200)
        }
        //����+	CTRL+SHIFT+4������̣�
        if (event.ctrlKey && event.shiftKey && keyval == 52) {//������
            _liveUtil.setVolume(200)
        }
    };
</SCRIPT>



