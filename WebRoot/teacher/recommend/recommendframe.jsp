<%@ page language="java" import="java.util.*" pageEncoding="gbk" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>推荐资源到校本目录</title>
    <meta http-equiv="content-type" content="text/html; charset=gbk">
    <link rel="stylesheet" type="text/css" href="../style/main.css"/>
    <link rel="stylesheet" type="text/css" href="<%= path%>/teacher/style/common.css"/>
    <link rel="stylesheet" id="ext-all-css" type="text/css" href="<%=path%>/ext/resources/css/ext-all.css"/>
</head>

<body>

<script type="text/javascript" src="<%=path%>/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=path%>/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/ext/tree.js"></script>
<script type="text/javascript" src="<%=path%>/ext/tree-expend-checkbox.js"></script>
<script type="text/javascript" src="<%=path%>/ext/ComboBox.js"></script>
<script type="text/javascript" src="<%=path%>/ext/windows.js"></script>
<script type="text/javascript">
    var west = null;
    Ext.onReady(function () {
        west = new Ext.Panel({
            id: "leftTreeId",
            region: "west",
            width: 200,
            minSize: 0,
            maxSize: 200,
            split: true,
            collapsible: true,
            title: "我的资源",
            autoScroll: true,
            html: '<div id="menuTree" style="padding:5px 3px"></div>',
            collapsed: false
        });
        var center = new Ext.Panel({
            region: 'center',
            title: '内容区域',
            collapsible: true,
            split: true,
            layout: 'fit',
            items: new Ext.BoxComponent({
                el: 'center',
                height: '100%'
            })
        });
        var viewport = new Ext.Viewport({
            layout: "border",
            items: [center, west]
        });
        //west.collapse(true);
        //west.hide();
        //west.setVisible(false);

    });
    var treejson =<s:property value="treejson" escape="false"/>;
    //带checkbox的树，不支持右键添加删除，支持异步加载和延迟加载
    var nodes;
    var checkboxtree = new checkboxtree('menuTree', 2, treejson, "<%=path%>/teacherrecommend/getteacherfilenext.do?id=<s:property value="teacherRecommened.id"/>&selectfilecodes=<s:property value="selectfilecodes"/>", toclick, 'cascade', false, tocheckclick);

    //点击触发的事件
    function toclick(node, event) {
        //event.stopEvent();
        //alert(node.attributes.leaf);
    }

    function tocheckclick(node) {
        //alert(node.attributes.checked);
        //alert(node.id);
        var object = recommendpage.form1.selectfilecodes;
        var objecthtml = recommendpage.document.getElementById("selectfile");
        if (node.attributes.checked == true) {
            if (object.value.indexOf(node.id) < 0) {
                if (node.leaf) objecthtml.innerHTML = objecthtml.innerHTML.replace("请在左侧选择待推荐的资源", "") + "<input type=\"radio\" class=\"radio\" name=\"rbMainflag\" value='" + node.id + "'>" + node.text;
                if (object.value == "") object.value = node.id;
                else object.value = object.value + "," + node.id;
            }
        } else {
            objecthtml.innerHTML = objecthtml.innerHTML.replace(eval("/<[^>]+value=" + node.id + "[^>]+>[^<]+/ig"), "");
            if (objecthtml.innerHTML == "") objecthtml.innerHTML = "请在左侧选择待推荐的资源";
            object.value = (object.value).replace(eval("/" + node.id + ",*/ig"), "").replace(/,$/, "");
            ;
        }
    }

    function hiderecommendwindow() {
        parent.hiderecommendwindow();
    }
</script>
<div id="center">
    <iframe name="recommendpage" id="recommendpage"
            src="<%=path %>/teacherrecommend/recommendedFilesPage.do?id=<s:property value="teacherRecommened.id"/>&selectfilecodes=<s:property value="selectfilecodes"/>&onlyAreaRes=${onlyAreaRes}"
            width="100%" frameborder="0" height="300"></iframe>
</div>
<div id="east">

</div>
</body>
</html>
