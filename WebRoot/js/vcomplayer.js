var playerObj = new Object();
playerObj.MyInterval;
playerObj.MediaDuration;//������ʱ��(��λ����)
playerObj.Position;//��ǰ���Ž���(��λ����)
playerObj.URL = 'E:\\mp3\\sha36.264avi';
playerObj.startPlayTime = 0;//��ʼ����ʱ��(��λ����)
playerObj.endPlayTime = 4000;//��ʼ����ʱ��(��λ����)
playerObj.name = '';
playerObj.movieId = '';
playerObj.movieName = '';
playerObj.AudioVolumeTmp = 50;
playerObj.vhTmp = 0;
playerObj.playerUrl = '';
playerObj.initPlayInfo = function () {
    try {
//		alert(VCOMPlayer.GetVersion());
        if (opentupe == "") {
            if (VCOMPlayer.GetVersion() < playversion) {
                insertplayerobject();
                return;
            }
        }
        VCOMPlayer.ShowControlBar = true;//��ʼ��������:�Ƿ���ʾ������
        if (playerObj.startPlayTime >= 0 && playerObj.endPlayTime > 0) {
            VCOMPlayer.OpenFileClips(playerObj.URL, parseInt(playerObj.startPlayTime), parseInt(playerObj.endPlayTime));
        } else if (playerObj.startPlayTime >= 0 && playerObj.endPlayTime <= 0) {
            VCOMPlayer.OpenFile(playerObj.URL, parseInt(playerObj.startPlayTime));
        } else {
            VCOMPlayer.OpenFile(playerObj.URL);
        }
        playerObj.setSound(VCOMPlayer.AudioVolume);//����
        playerObj.MyInterval = setInterval("playerObj.getPosition()", 1000);
    } catch (e) {
        //alert(e);
        insertplayerobject();
    }
}

//��������ز����ʾ!
function insertplayerobject(type) {
    if (type) {
        uploadlist.innerHTML = "<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\"" + globalpath + "/teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">��Ĳ��ſؼ�û�а�װ����û������������ϵ����Ա��<br/><font color=\"yellow\">ע�⣺����IE�Լ�IE�ں˵�������а�װʹ�á�</font></td></tr><tr><td height=\"43\"></td></tr></table></div>";
    } else {
        uploadlist.innerHTML = "<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\"" + globalpath + "/teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">��Ĳ��ſؼ�û�а�װ�����Ѿ�����������ҳ���Ϸ���ϵͳ��ʾ����װ��<br/><font color=\"yellow\">ע�⣺����IE�Լ�IE�ں˵�������а�װʹ�á�</font></td></tr><tr><td height=\"43\"><input type=\"button\" value=\"���û����ʾ�����߼��ز��ɹ������������ֹ���װ!\" onclick=\"window.location.href='" + playerObj.playerUrl + "'\"/></td></tr></table></div>";
    }
}

//��ȡ��ǰ���ŵ�ʱ�����ʱ��
playerObj.getPosition = function () {
    //alert(VCOMPlayer.GetCurrentMediaState());
    if (VCOMPlayer.GetCurrentMediaState() == 3) {
        //clearInterval(playerObj.MyInterval);
        playerObj.Position = 0;
        playerObj.MediaDuration = 0;
    } else {
        playerObj.MediaDuration = VCOMPlayer.GetCurrentMediaDuration();//������ʱ��
        if (playerObj.MediaDuration <= 0)
            playerObj.MediaDuration = 0;
        playerObj.Position = VCOMPlayer.GetCurrentPosition();//��ǰ���Ž���
        if (playerObj.Position <= 0)
            playerObj.Position = 0;
    }
    playerObj.changeStateTime();
    playerObj.GetCurrentMediaState();
}
playerObj.changeStateTime = function () {
    var Position = Number(playerObj.Position);
    var MediaDuration = Number(playerObj.MediaDuration);
    switch (VCOMPlayer.GetCurrentMediaState()) {
        case 1://״̬:��������
            playerObj.vhTmp = parseInt(Math.ceil(Position * 100 / playerObj.MediaDuration));
            break;
        case 2://״̬:��ͣ
            Position = parseInt(Math.ceil(playerObj.vhTmp * playerObj.MediaDuration / 100));
            break;
        case 3://״̬:ֹͣ
            break;
        case 26://״̬:����
            break;
        case 27://״̬:����
            break;
    }
    document.getElementById("stateTime_ID").innerHTML = playerObj.formatTime(Position * 1000) + "/" + playerObj.formatTime(MediaDuration * 1000);
    if (MediaDuration > 0)
        document.getElementById("Slider_Image_ID").style.width = Math.ceil(Position * 100 / MediaDuration) + "%";
    else
        document.getElementById("Slider_Image_ID").style.width = "0%";
}
playerObj.playOrPause = function () {
    switch (VCOMPlayer.GetCurrentMediaState()) {
        case 1://״̬:��������
            VCOMPlayer.Pause()
            break;
        case 2://״̬:��ͣ
            VCOMPlayer.SetPosition(parseInt(Math.ceil(playerObj.vhTmp * playerObj.MediaDuration / 100)));
            VCOMPlayer.Play()
            break;
        case 3://״̬:ֹͣ
            VCOMPlayer.Play()
            playerObj.MyInterval = setInterval("playerObj.getPosition()", 1000);
            break;
        case 26://״̬:����
            VCOMPlayer.Play()
            break;
        case 27://״̬:����
            VCOMPlayer.Play()
            break;
    }
}
playerObj.Stop = function () {
    if (!VCOMPlayer.Stop()) {
        alert("����ʧ��");
    }
}
//����
playerObj.doPlaySlower = function () {
    VCOMPlayer.FastBackward();
}
//���
playerObj.doPlayFaster = function () {
    VCOMPlayer.FastForward();
}
//����
playerObj.changeSound = function (obj) {
    if (!VCOMPlayer.Mute) {//������ת��Ϊ����
        VCOMPlayer.Mute = true;
        obj.src = "lessons/images/sound_close.gif";
    } else {//�ɾ���ת��Ϊ����
        VCOMPlayer.Mute = false;
        VCOMPlayer.AudioVolume = parseInt(playerObj.AudioVolumeTmp);
        obj.src = "lessons/images/sound.gif";
    }
}
//��������������
playerObj.isChangeSound = false;
playerObj.initX;//�¼�����Ԫ�ص�X����
playerObj.eX;//�¼�X����
playerObj.initW;//�¼�����Ԫ�صĿ��
playerObj.isChangeSlider = false;
playerObj.startChangeSound = function () {
    if (event.button == 1 && (event.srcElement.tagName.toUpperCase() == "TD" || event.srcElement.parentNode.tagName.toUpperCase() == "TD")) {
        playerObj.isChangeSlider = false;//���ò��Ž���������
        playerObj.isChangeSound = true;
        playerObj.eX = event.clientX;
        var pos = playerObj.getElementPos('Sound_Slider_Id');
        if (event.srcElement.tagName.toUpperCase() == "TD")
            playerObj.initW = event.srcElement.clientWidth;
        else
            playerObj.initW = event.srcElement.parentNode.clientWidth;
        playerObj.initX = pos.x;
        var v_h = Math.ceil((playerObj.eX - playerObj.initX) * 100 / playerObj.initW);
        if (v_h > 5) {
            document.getElementById("Sound_Slider_Image_Id").style.width = Math.ceil((playerObj.eX - playerObj.initX) * 100 / playerObj.initW) + "%";
            playerObj.setSound(Math.ceil((playerObj.eX - playerObj.initX) * 200 / playerObj.initW));
        }
    }
}
playerObj.setSound = function (nAudioVolume) {
    if (nAudioVolume >= 0 && nAudioVolume <= 200) {
        var mute = VCOMPlayer.Mute;
        if (mute == true) {//�����ر�
            playerObj.AudioVolumeTmp = parseInt(nAudioVolume);
        } else {
            VCOMPlayer.AudioVolume = parseInt(nAudioVolume);
        }
    }
}
//����������
playerObj.startChangeSlider = function () {
    if (event.button == 1 && (event.srcElement.tagName.toUpperCase() == "TD" || event.srcElement.parentNode.tagName.toUpperCase() == "TD")) {
        var state = VCOMPlayer.GetCurrentMediaState();
        if (state != 0) {
            playerObj.isChangeSound = false;//������������
            playerObj.isChangeSlider = true;
            playerObj.eX = event.clientX;
            var pos = playerObj.getElementPos('Slider_ID');
            if (event.srcElement.tagName.toUpperCase() == "TD")
                playerObj.initW = event.srcElement.clientWidth;
            else
                playerObj.initW = event.srcElement.parentNode.clientWidth;
            playerObj.initX = pos.x;
            var v_h = Math.ceil((playerObj.eX - playerObj.initX) * 100 / playerObj.initW);
            if (v_h > 5) {
                document.getElementById("Slider_Image_ID").style.width = Math.ceil((playerObj.eX - playerObj.initX) * 100 / playerObj.initW) + "%";
                playerObj.setSpeedSlide(Math.ceil((playerObj.eX - playerObj.initX) * 100 / playerObj.initW));
            }
        }
    }
}
playerObj.setSpeedSlide = function (vh) {
    switch (VCOMPlayer.GetCurrentMediaState()) {
        case 0://״̬δ����
            break;
        case 1://״̬:��������
            VCOMPlayer.SetPosition(parseInt(Math.ceil(vh * playerObj.MediaDuration / 100)));
            break;
        case 2://״̬:��ͣ
            playerObj.vhTmp = vh;
            break;
        case 3://״̬:ֹͣ
            break;
        case 4://״̬:������
            break;
        case 26://״̬:����

            break;
        case 27://״̬:����
            break;
        default://����״̬
            break;
    }

}
document.onmousemove = function () {
    if (playerObj.isChangeSound == true) {
        playerObj.eX = event.clientX;
        var v_h = Math.ceil((playerObj.eX - playerObj.initX) * 100 / playerObj.initW);
        if (v_h > 5) {
            document.getElementById("Sound_Slider_Image_Id").style.width = v_h + "%";
            playerObj.setSound(Math.ceil((playerObj.eX - playerObj.initX) * 200 / playerObj.initW));
        }
    } else if (playerObj.isChangeSlider == true) {
        playerObj.eX = event.clientX;
        var v_h = Math.ceil((playerObj.eX - playerObj.initX) * 100 / playerObj.initW);
        if (v_h > 5) {
            document.getElementById("Slider_Image_ID").style.width = v_h + "%";
            playerObj.setSpeedSlide(v_h);
        }
    }
}
document.onmouseup = function () {
    if (playerObj.isChangeSound == true) {
        playerObj.isChangeSound = false;
        delete playerObj.initX;
        delete playerObj.eX;
        delete playerObj.initW;
    } else if (playerObj.isChangeSlider == true) {
        playerObj.isChangeSlider = false;
        delete playerObj.initX;
        delete playerObj.eX;
        delete playerObj.initW;
    }
}
//ȫ��
playerObj.fullScreen = function () {
    VCOMPlayer.FullScreen = true;
}
playerObj.operState = "START";
playerObj.startTime = 0;
playerObj.endTime = 0;
playerObj.StartEndElection = function (obj) {//��ʼ/����ѡʱ
    try {
        if (playerObj.operState == "START") {
            playerObj.operState = "END";
            obj.value = "����ѡʱ";
            playerObj.startTime = playerObj.Position;
            playerObj.endTime = 0;
        } else if (playerObj.operState == "END") {
            playerObj.operState = "START";
            obj.value = "��ʼѡʱ";
            playerObj.endTime = playerObj.Position;
        }
    } catch (e) {
        playerObj.operState = "START";
        obj.value = "��ʼѡʱ";
    }
}
//ȷ��
playerObj.decideElection = function () {
    if (playerObj.startTime < 0) {
        alert("��ѡ��ʼʱ��");
    } else if (playerObj.endTime == 0) {
        alert("��ѡ�����ʱ��");
    } else if (playerObj.endTime <= playerObj.startTime) {
        alert("����ʱ�������ڿ�ʼʱ��");
    } else {
        playerObj.startTime = playerObj.startTime;
        playerObj.endTime = playerObj.endTime;
        if (confirm("��ѡ���ʱ�����£���ʼʱ��(" + playerObj.startTime + "��)������ʱ��(" + playerObj.endTime + "��)��ȷ��Ҫ������")) {
            try {
                //alert(playerObj.formatTime(playerObj.startTime*1000));
                window.opener.course(playerObj.movieId, playerObj.RTypecode, playerObj.RFormat, playerObj.movieName, playerObj.startTime, playerObj.endTime);
            } catch (e) {
            }
            playerObj.Stop();
            window.close();
        }
    }
}
//�ղ�
playerObj.decideElectionSC = function () {
    if (playerObj.startTime == undefined) playerObj.startTime = 0;
    if (playerObj.startTime > 0 && playerObj.endTime == 0) {
        alert("��ѡ���ղؽ���ʱ��");
        return;
    }
    if (playerObj.endTime < playerObj.startTime) {
        alert("����ʱ�������ڿ�ʼʱ��");
        return;
    }
    playerObj.startTime = playerObj.startTime;
    playerObj.endTime = playerObj.endTime;
    if (playerObj.startTime == 0 && playerObj.endTime == 0) {
        try {
            var url = globalpath + "/lessons/shoucang.jsp?plsref.catalogId=" + playerObj.catalogId;
            var ids = '&plsref.resId=' + playerObj.movieId + "&plsref.startLength=" + (playerObj.startTime * 1000) + "&plsref.endLength=" + (playerObj.endTime * 1000) + "&plsref.resourceType=" + playerObj.RFormat;
            url += ids;
            url += '&ajaxdate=' + new Date();
            window.open(url, '', 'height=500,width=300,top=100,left=200,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
            //sendRequest(parseHeadXml,url);
        } catch (e) {
        }
    } else {
        if (confirm("��ѡ���ʱ�����£���ʼʱ��(" + playerObj.startTime + "��)������ʱ��(" + playerObj.endTime + "��)����ѡ���ղ�Ŀ¼��")) {
            try {
                var url = globalpath + "/lessons/shoucang.jsp?plsref.catalogId=" + playerObj.catalogId;
                var ids = '&plsref.resId=' + playerObj.movieId + "&plsref.startLength=" + (playerObj.startTime * 1000) + "&plsref.endLength=" + (playerObj.endTime * 1000) + "&plsref.resourceType=" + playerObj.RFormat;
                url += ids;
                url += '&ajaxdate=' + new Date();
                window.open(url, '', 'height=500,width=300,top=100,left=200,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
                //sendRequest(parseHeadXml,url);
            } catch (e) {
            }
        }
    }

}

function parseHeadXml() {
    if (4 == xmlHttp.readyState)//4:���
        if (200 == xmlHttp.status) {
            var xmldoc = xmlHttp.responseText;
            try {
                if (eval("(" + xmldoc + ")").auth_flag == 0) {
                    alert("�Ѿ��ղأ��޷��ظ��ղ�!");
                } else {
                    alert("�ղسɹ�!");
                }
            } catch (e) {
            }
        }// ajax �������
}

playerObj.GetCurrentMediaState = function () {
    switch (VCOMPlayer.GetCurrentMediaState()) {
        case 0://״̬δ����
            break;
        case 1://״̬:��������
            document.getElementById("PlayOrPause_id").src = "lessons/images/zt.gif";//��ͣ
            break;
        case 2://״̬:��ͣ
            document.getElementById("PlayOrPause_id").src = "lessons/images/play.gif";//����
            break;
        case 3://״̬:ֹͣ
            document.getElementById("PlayOrPause_id").src = "lessons/images/play.gif";//����
            break;
        case 4://״̬:������
            break;
        case 26://״̬:����
            document.getElementById("PlayOrPause_id").src = "lessons/images/play.gif";//����
            break;
        case 27://״̬:����
            document.getElementById("PlayOrPause_id").src = "lessons/images/play.gif";//����
            break;
        default://����״̬
            break;
    }
}
playerObj.formatTime = function (timeVal) {
    var timeHour = Math.round(timeVal / 1000);
    var timeSec = timeHour % 60;
    if (timeSec < 10)
        timeSec = '0' + timeSec;
    timeHour = (timeHour - timeSec) / 60;
    var timeMin = timeHour % 60;
    if (timeMin < 10)
        timeMin = '0' + timeMin;
    timeHour = (timeHour - timeMin) / 60;
    if (timeHour > 0)
        return timeHour + ":" + timeMin + ":" + timeSec;
    else
        return timeMin + ":" + timeSec;
}
playerObj.getElementPos = function (elementId) {
    var ua = navigator.userAgent.toLowerCase();
    var isOpera = (ua.indexOf('opera') != -1);
    var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof

    var el = document.getElementById(elementId);

    if (el.parentNode === null || el.style.display == 'none') {
        return false;
    }

    var parent = null;
    var pos = [];
    var box;

    if (el.getBoundingClientRect)	//IE
    {
        box = el.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);

        return {x: box.left + scrollLeft, y: box.top + scrollTop};
    } else if (document.getBoxObjectFor)	// gecko
    {
        box = document.getBoxObjectFor(el);

        var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
        var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;

        pos = [box.x - borderLeft, box.y - borderTop];
    } else	// safari & opera
    {
        pos = [el.offsetLeft, el.offsetTop];
        parent = el.offsetParent;
        if (parent != el) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        if (ua.indexOf('opera') != -1
            || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
            pos[0] -= document.body.offsetLeft;
            pos[1] -= document.body.offsetTop;
        }
    }

    if (el.parentNode) {
        parent = el.parentNode;
    } else {
        parent = null;
    }

    while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
        pos[0] -= parent.scrollLeft;
        pos[1] -= parent.scrollTop;

        if (parent.parentNode) {
            parent = parent.parentNode;
        } else {
            parent = null;
        }
    }
    return {x: pos[0], y: pos[1]};
}