<%@ page language="java" pageEncoding="GBK" %>
<script type="text/javascript">

    //插件效果start
    var oPic = null;//大图外框
    var oList = null;//小图外框
    var oPrev = null;//小图上一页
    var oNext = null;//小图下一页
    var oPrevTop = null;//大图上一页
    var oNextTop = null;//大图下一页
    var oPicLi = null;//大图列表项
    var oListLi = null;//小图列表项
    var len2 = null;//小图列表长度
    var oListUl = null;//小图列表
    var w2 = 70;//小图宽度
    var bigImg = null;  //大图
    var bigImgDiv = null; //大图图层
    var index = 0;	//当前图片
    var num = 0;//最多显示小图个数
    var num2 = Math.ceil(num / 2);//多少时移动
    var arr = new Array();//图片数组
    var title = null;

    function init() {//图片加载之前
        oPic = G("picBox");//大图外框
        bigImg = G("bigImg");//大图图层
        bigImgDiv = G("bigImgDiv");//大图
        oList = G("listBox");//小图外框
        oPrev = G("prev");//小图上一页
        oNext = G("next");//小图下一页
        oPrevTop = G("prevTop");//大图上一页
        oNextTop = G("nextTop");//大图下一页
        title = G("_title");
        oListUl = oList.getElementsByTagName("ul")[0];//小图列表
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
        reSize();//自适应大小
        //bigImg.onerror=onBigError;
        bigImg.onreadystatechange = onReadyStateChange;
        //IE 10 11
        bigImg.onload = onReadyStateChange;
    }

    function G(s) {//获取组件
        return document.getElementById(s);
    }

    function getStyle(obj, attr) {//获取组件样式属性
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

    function Animate(obj, json) {//变换
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

    //插件效果end
    var imgPlay = new ImgPlay();

    function ImgPlay() {
    }

    //设置图片列表
    //根据json数据设置列表
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
    //展示图片
    ImgPlay.prototype.showImgList = function () {
        var small = "";
        if (arr.length == 0) {
            small = '<li class="on"><i class="arr2"></i><img src="" onerror="onSmallError(this)" alt="暂无图片" /></li>';
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
        //初始化播放页面
        oListUl.innerHTML = small;
        oListLi = oList.getElementsByTagName("li");//小图列表项

        len2 = arr.length;
        oListUl.style.width = len2 * 70 + "px";
    }

    //调整播放器
    function reSize() {
        var h = document.body.clientHeight - 115;
        var w = bigImgDiv.offsetWidth - 30;

        num = Math.ceil(w / 70);
        num2 = Math.ceil(w / 140);

        bigImgDiv.style.height = h;
        oPrevTop.style.top = h / 2;
        oNextTop.style.top = h / 2;
    }

    //图片加载失败
    function onSmallError(obj) {
        obj.src = errorImg;
    }

    //大图加载失败
    function onBigError() {
        bigImg.src = errorBigImg;
    }

    //图片加载完成后调整图片大小
    function onReadyStateChange() {
        var obj = bigImg;
        var width = bigImgDiv.scrollWidth;
        var height = bigImgDiv.scrollHeight;
        if (obj.complete == true || obj.readyState == "complete" || obj.readyState == "loaded") {
            AutoResizeImage(obj, width, height);
        }
    }

    //
    //小图点击事件、
    function onSmallImageClicked(i) {
        index = i;
        Change();
    }

    //大图的等比缩放
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
//设置图片居中显示
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

    //当esc快捷键触发缩放的处理
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