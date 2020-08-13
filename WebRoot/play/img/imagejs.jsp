<%@ page language="java" pageEncoding="GBK" %>
<script type="text/javascript">

    //���Ч��start
    var oPic = null;//��ͼ���
    var oList = null;//Сͼ���
    var oPrev = null;//Сͼ��һҳ
    var oNext = null;//Сͼ��һҳ
    var oPrevTop = null;//��ͼ��һҳ
    var oNextTop = null;//��ͼ��һҳ
    var oPicLi = null;//��ͼ�б���
    var oListLi = null;//Сͼ�б���
    var len2 = null;//Сͼ�б���
    var oListUl = null;//Сͼ�б�
    var w2 = 70;//Сͼ���
    var bigImg = null;  //��ͼ
    var bigImgDiv = null; //��ͼͼ��
    var index = 0;	//��ǰͼƬ
    var num = 0;//�����ʾСͼ����
    var num2 = Math.ceil(num / 2);//����ʱ�ƶ�
    var arr = new Array();//ͼƬ����
    var title = null;

    function init() {//ͼƬ����֮ǰ
        oPic = G("picBox");//��ͼ���
        bigImg = G("bigImg");//��ͼͼ��
        bigImgDiv = G("bigImgDiv");//��ͼ
        oList = G("listBox");//Сͼ���
        oPrev = G("prev");//Сͼ��һҳ
        oNext = G("next");//Сͼ��һҳ
        oPrevTop = G("prevTop");//��ͼ��һҳ
        oNextTop = G("nextTop");//��ͼ��һҳ
        title = G("_title");
        oListUl = oList.getElementsByTagName("ul")[0];//Сͼ�б�
        oNextTop.onclick = oNext.onclick = function () {
            index++;
            index = index == len2 ? 0 : index;
            Change();
        }
        oPrevTop.onclick = oPrev.onclick = function () {
            index--;
            index = index == -1 ? len2 - 1 : index;
            Change();
        }
        reSize();//����Ӧ��С
        //bigImg.onerror=onBigError;
        bigImg.onreadystatechange = onReadyStateChange;
        //IE 10 11
        bigImg.onload = onReadyStateChange;
    }

    function G(s) {//��ȡ���
        return document.getElementById(s);
    }

    function getStyle(obj, attr) {//��ȡ�����ʽ����
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

    function Animate(obj, json) {//�任
        if (obj.timer) {
            clearInterval(obj.timer);
        }
        obj.timer = setInterval(function () {
            for (var attr in json) {
                var iCur = parseInt(getStyle(obj, attr));
                iCur = iCur ? iCur : 0;
                var iSpeed = (json[attr] - iCur) / 5;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                obj.style[attr] = iCur + iSpeed + 'px';
                if (iCur == json[attr]) {
                    clearInterval(obj.timer);
                }
            }
        }, 30);
    }

    function Change() {
        if (num == 0) {
            return;
        }
        bigImg.src = arr[index].src;
        title.innerHTML = arr[index].title;
        if (index < num2) {
            Animate(oListUl, {left: 15});
        } else if (index <= num) {
            Animate(oListUl, {left: 15 - (index - num2 + 1) * w2});
        } else {
            Animate(oListUl, {left: 15 - (len2 - num) * w2});
        }
        for (var i = 0; i < len2; i++) {
            oListLi[i].className = "";
            if (i == index) {
                oListLi[i].className = "on";
            }
        }
    }

    //���Ч��end
    var imgPlay = new ImgPlay();

    function ImgPlay() {
    }

    //����ͼƬ�б�
    //����json���������б�
    ImgPlay.prototype.setListByJson = function (data) {
        arr.length = 0;
        if (data == null || data == "undefined" || data.length == 0) {
            num = 0;
            num2 = 0;
            return;
        }
        var _url = data[0].path;
        for (var i = 0; i < data.length; i++) {
            var imgItem = {'alt': '', 'src': '', 'smallSrc': '', 'title': ''};
            var temp = data[i];
            var file_name = temp.file_name;
            imgItem["alt"] = file_name;
            imgItem["src"] = temp.path;
            imgItem["smallSrc"] = temp.path;
            imgItem["title"] = file_name;
            arr.push(imgItem);
        }
        imgPlay.showImgList();
    }
    //չʾͼƬ
    ImgPlay.prototype.showImgList = function () {
        var small = "";
        if (arr.length == 0) {
            small = '<li class="on"><i class="arr2"></i><img src="" onerror="onSmallError(this)" alt="����ͼƬ" /></li>';
        } else {
            for (var i = 0; i < arr.length; i++) {
                if (i == 0) {
                    bigImg.src = arr[i].src;
                    title.innerHTML = arr[index].title;
                    small = '<li class="on"><img src="' + arr[i].smallSrc + '" onerror="onSmallError(this)" onclick="onSmallImageClicked(' + i + ')" alt="' + arr[i].alt + '" /></li>';
                } else {
                    small += '<li ></i><img src="' + arr[i].smallSrc + '" onerror="onSmallError(this)" onclick="onSmallImageClicked(' + i + ')" alt="' + arr[i].alt + '" /></li>';
                }

            }
        }
        //��ʼ������ҳ��
        oListUl.innerHTML = small;
        oListLi = oList.getElementsByTagName("li");//Сͼ�б���

        len2 = arr.length;
        oListUl.style.width = len2 * 70 + "px";
    }

    //����������
    function reSize() {
        var h = document.body.clientHeight - 115;
        var w = bigImgDiv.offsetWidth - 30;

        num = Math.ceil(w / 70);
        num2 = Math.ceil(w / 140);

        bigImgDiv.style.height = h;
        oPrevTop.style.top = h / 2;
        oNextTop.style.top = h / 2;
    }

    //ͼƬ����ʧ��
    function onSmallError(obj) {
        obj.src = errorImg;
    }

    //��ͼ����ʧ��
    function onBigError() {
        bigImg.src = errorBigImg;
    }

    //ͼƬ������ɺ����ͼƬ��С
    function onReadyStateChange() {
        var obj = bigImg;
        var width = bigImgDiv.scrollWidth;
        var height = bigImgDiv.scrollHeight;
        if (obj.complete == true || obj.readyState == "complete" || obj.readyState == "loaded") {
            AutoResizeImage(obj, width, height);
        }
    }

    //
    //Сͼ����¼���
    function onSmallImageClicked(i) {
        index = i;
        Change();
    }

    //��ͼ�ĵȱ�����
    function AutoResizeImage(objImg, maxWidth, maxHeight) {
        if (null == objImg || "unfineded" == objImg) return;
        var hRatio;
        var wRatio;
        var Ratio = 1;
        var img = new Image();
        img.src = objImg.src;
        var w = img.width;
        var h = img.height;
        wRatio = maxWidth / w;
        hRatio = maxHeight / h;
        if (maxWidth == 0 && maxHeight == 0) {
            Ratio = 1;
        } else if (maxWidth == 0) {//
            if (hRatio < 1) Ratio = hRatio;
        } else if (maxHeight == 0) {
            if (wRatio < 1) Ratio = wRatio;
        } else if (wRatio < 1 || hRatio < 1) {
            Ratio = (wRatio <= hRatio ? wRatio : hRatio);
        }
        if (Ratio < 1) {
            w = w * Ratio;
            h = h * Ratio;
        }
        objImg.style.height = h;
        objImg.style.width = w;
//����ͼƬ������ʾ
        objImg.style.top = (maxHeight - h) / 2;
        objImg.style.left = (maxWidth - w) / 2;
    }

    function tocloseorbg(obj, type) {
        if (type == 1) {
            var ostype = 0;
            try {
                var ua = window.navigator.userAgent;
                ua = ua.replace("(", "").replace(")", "");
                var osVersion = ua.split(";")[2];
                var osV = osVersion.substr(osVersion.length - 3, 3);
                if (osV == "5.1") ostype = 1;
            } catch (e) {
            }
            if (ostype == 0) {
                window.setTimeout(function () {
                    window.location.href = "close://";
                }, 500);
            } else {
                window.location.href = "close://";
            }
        } else {
            if (obj.className.indexOf("btnA") >= 0) {
                obj.className = "btnB";
                window.location.href = "max://";
                setTimeout(function () {
                    reSize();
                    if (arr.length > 0) bigImg.src = arr[index].src;
                }, 50);
                bigImg.src = bigImg.src;
            } else {
                obj.className = "btnA";
                window.location.href = "recover://";
                setTimeout(function () {
                    reSize();
                    bigImg.src = bigImg.src;
                }, 50);
            }
        }
    }

    function tochangebg(obj, type) {
        if (type == 1) {
            if (obj.className == "btnA") {
                obj.className = "btnAH";
            } else if (obj.className == "btnB") {
                obj.className = "btnBH";
            } else if (obj.className == "btnC") {
                obj.className = "btnCH";
            }
        } else {
            if (obj.className == "btnAH") {
                obj.className = "btnA";
            } else if (obj.className == "btnBH") {
                obj.className = "btnB";
            } else if (obj.className == "btnCH") {
                obj.className = "btnC";
            }
        }
    }

    //��esc��ݼ��������ŵĴ���
    window.onresize = function () {
        var obj = document.getElementById("bigwindow");
        if (obj.className.indexOf("btnA") >= 0) {
            obj.className = "btnB";
            setTimeout(function () {
                reSize();
                if (arr.length > 0) bigImg.src = arr[index].src;
            }, 50);
            bigImg.src = bigImg.src;

        } else {
            obj.className = "btnA";
            setTimeout(function () {
                reSize();
                bigImg.src = bigImg.src;
            }, 50);
        }

        if (arr.length == 1) {
            setTimeout(function () {
                onSmallImageClicked(0);
            }, 50);
        }

    }
</script>