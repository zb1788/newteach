<%@ page contentType="text/html; charset=gbk" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
//��ȡ��Ӧ����
    String rcode = (String) request.getParameter("rcode");
    String teachernumber = (String) request.getParameter("teachernumber");
    String loadUrl = (String) request.getParameter("loadUrl");
    String type = (String) request.getParameter("type");//��Դ����
    String channelid = (String) request.getParameter("channelid");
    String loginStyle = (String) request.getParameter("loginStyle");
    if (!"1".equals(loginStyle)) {
        loginStyle = "0";
    }
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk">
    <title id="__title">ͼƬ������</title>
    <link href="<%=path %>/play/img/style.css" rel="stylesheet" type="text/css"/>
    <jsp:include page="/js/config_pls_include.jsp"/>
    <jsp:include page="/play/img/imagejs.jsp"/>
    <jsp:include page="/play/play.jsp"/>
</head>
<body bgcolor="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" scroll="no">
<!--Ч��html��ʼ-->
<div class="mod18">
    <div id="picBox" class="picBox">
        <span style="display: none;" id="prevTop" class="btn prev"></span>
        <div id="bigImgDiv"><img id="bigImg" src=""/></div>
        <span style="display: none;" id="nextTop" class="btn next"></span>
    </div>
    <div id="listBox" class="listBox">
        <span style="display: none;" id="prev" class="btn prev"></span>
        <ul class="cf"></ul>
        <span style="display: none;" id="next" class="btn next"></span>
    </div>
</div>
<div class="btn"><%-- &&"0".equals(linkType)--%>
    <%if ("0".equals(loginStyle) && 1 == 1) {%>
    <span id="padHiddenButton">
		<div id="bigwindow" class="btnA" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
             onclick="tocloseorbg(this,2);"></div>
		<div class="btnC" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
             onclick="tocloseorbg(this,1);"></div>
	</span>
    <% } else if ("0".equals(loginStyle)) {%>
    <span style="width:53px;">
	    <div class="btnC" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
             onclick="tocloseorbg(this,1);"></div>
	</span>
    <%}%>
    <dd id="_title" style="margin-left: 0px;">ͼƬ���</dd>
</div>
<!--Ч��html����-->


<script type="text/javascript">
    var path = '<%=path%>';
    var basePath = "<%=basePath%>";
    var rcode = "<%=rcode%>";
    var teachernumber = "<%=teachernumber%>";
    var loadUrl = "<%=loadUrl%>";
    var type = "<%=type%>";
    var channelid = "<%=channelid%>";

    //var flist = readCookie("flist");
    //flist = eval('('+flist+')');
    //���ص�ַ
    var url = transferProtocol_web + _config["PLS"] + "/youjiao2/doMutiplePlay.do?";
    url += "rcode=" + rcode;
    url += "&userName=" + teachernumber;
    url += "&filterType=0&allowPcMain=1";
    url += "&outType=1";//1Ϊjson 2 xml


    //����ͼƬ�б�
    var errorImg = basePath + "images/icon/res/png.png";
    var errorBigImg = basePath + "play/img/image/errorbig.png";
    if (loadUrl && loadUrl != "" && loadUrl != null && loadUrl != "null") {
        var url = loadUrl;
    } else {
        type = 1;
    }
    //1 ��Դ 2��ʦ�ļ��� 3��ʦ΢��
    getLoadAddress(url, setListByJson, type);

    function setListByJson(flist) {
        errorImg = basePath + "images/icon/res/png.png";
        errorBigImg = basePath + "play/img/image/errorbig.png";
        init();
        if (flist == null) {
            document.getElementById("_title").innerHTML = "û�пɲ��ŵ�ͼƬ";
            document.getElementById("bigImg").src = errorBigImg;
            return;
        } else if (typeof (flist) == 'string') {
            document.getElementById("_title").innerHTML = flist;
            document.getElementById("bigImg").src = errorBigImg;
            return;
        }

        if (flist && flist.length > 0) {
            //������һ����һ����ť
            if (flist.length > 1) {
                document.getElementById("prevTop").style.display = "block";
                document.getElementById("nextTop").style.display = "block";
                document.getElementById("prev").style.display = "block";
                document.getElementById("next").style.display = "block";
            }

            imgPlay.setListByJson(flist);

        } else {
            document.getElementById("_title").innerHTML = "û�пɲ��ŵ�ͼƬ";
            document.getElementById("bigImg").src = errorBigImg;
        }
    }

</script>
</body>
</html>