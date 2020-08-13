<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>


<!--新文件夹 开始-- -->
<div class="floatDiv" id="recommendwindow" style="display:none;width:800px;height:350px">
    <div class="title">
        <a href="javascript:void(0);" onclick="hiderecommendwindow();"><img src="images/x.gif"/> </a>
        <span id="plsRmsRecommmedTitle">资源推荐</span>
    </div>
    <span class="clearfix"></span>
    <iframe name="recommendpage" id="recommendpage" src="<%=path%>/teacher/recommend/default.jsp" width="100%"
            frameborder="0" height="100%"></iframe>

</div>
<script type="text/javascript">
    <!--
    function recommendwindow(url, title) {
        $("#mask").css("display", "");
        //var ifwindow=document.getElementById("recommendpage");
        //ifwindow.contentWindow.document.open();
        //ifwindow.contentWindow.document.write("<head><link rel=\"stylesheet\" type=\"text/css\" href=\"<%=path %>/teacher/style/main.css\"/></head><div id=\"loading-mask\"></div><div id=\"loading\"><div class=\"loading-indicator\"><img src=\"<%=path %>/teacher/images/extanim32.gif\" width=\"32\" height=\"32\"style=\"margin-right:8px;\" align=\"absmiddle\" />页面加载中，请稍后...</div></div>");
        //ifwindow.contentWindow.document.close();
        document.getElementById("recommendwindow").style.display = "";
        //document.getElementById("recommendpage").src="<%=path %>/teacherrecommend/recommendedFilesPage.do";
        document.getElementById("plsRmsRecommmedTitle").innerHTML = title;
        document.getElementById("recommendpage").src = url;
        //$("#recommendwindow").css("display","inherit");
    }

    function hiderecommendwindow() {
        var ifwindow = document.getElementById("recommendpage");
        //ifwindow.contentWindow.document.open();
        //ifwindow.contentWindow.document.write("<head><link rel=\"stylesheet\" type=\"text/css\" href=\"<%=path %>/teacher/style/main.css\"/></head><div id=\"loading-mask\"></div><div id=\"loading\"><div class=\"loading-indicator\"><img src=\"<%=path %>/teacher/images/extanim32.gif\" width=\"32\" height=\"32\"style=\"margin-right:8px;\" align=\"absmiddle\" />页面加载中，请稍后...</div></div>");
        //ifwindow.contentWindow.document.close();
        $("#recommendwindow").hide();
        _fileUtil.createFileArray(_fileUtil.currParentFcode);
        $("#mask").css("display", "none");

    }

    //-->
</script>
