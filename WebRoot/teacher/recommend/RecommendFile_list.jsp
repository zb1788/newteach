<%@ page language="java" import="java.util.*" pageEncoding="gbk" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>
    <title></title>
    <link rel="stylesheet" type="text/css" href="<%= path%>/teacher/style/common.css"/>
    <link href="<%=path%>/teacher/style/style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%= path%>/teacher/js/common.js"></script>
    <script src="<%=path%>/TextEditorNew/ViewPPTs/playVideo.jsp" type="text/javascript" charset="GBK"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/Progress.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/download.js"></script>
    <link href="<%=path %>/teacher/style/bk_style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript">
        var bapath = "<%=basePath%>";
        var global_basePath = "<%=basePath%>";

        function addSysParam(type) {
            var value = getradiovalue(document.getElementsByName("checkboxId"));
            if (type == 1) {
                var window_parameter = "dialogWidth:750px;dialogHeight:450px;help:no;scroll:auto;status:no";
                var handle = showModalDialog("<%=path%>/teacherrecommend/changerecommendframe.do?", window, window_parameter);
                if (handle) {
                    window.location.href = "<%=path%>/teacherrecommend/getRecommendedList.do";
                }
            } else if (value != "" && type == 2) {
                var window_parameter = "dialogWidth:750px;dialogHeight:450px;help:no;scroll:auto;status:no";
                var handle = showModalDialog("<%=path%>/teacherrecommend/changerecommendframe.do?id=" + value, window, window_parameter);
                if (handle) {
                    window.location.href = "<%=path%>/teacherrecommend/getRecommendedList.do";
                }
            } else {
                alert("请选择待修改的记录!");
            }

        }

        function delateRecommend() {
            var value = getradiovalue(document.getElementsByName("checkboxId"));
            if (value != "") {
                if (window.confirm("你确定要删除该资源吗？"))
                    form1.action = "<%=path%>/teacherrecommend/delateRecommend.do?id=" + value;
                form1.submit();
            } else {
                alert("请选择待修改的记录!");
            }
        }

        function repeatRecommendFile() {
            var value = getradiovalue(document.getElementsByName("checkboxId"));
            if (value != "") {
                if (window.confirm("你确定要重新推荐资源吗？")) {
                    form1.action = "<%=path%>/teacherrecommend/repeatRecommendFile.do?id=" + value;
                    form1.submit();
                }

            } else {
                alert("请选择待推荐资源的记录!");
            }
        }
    </script>
</head>
<body scroll="auto">
<div class="fold">
    <!--<div class="posNow">当前目录：> 我的文件夹<span id="nav.dir">sdf</span>  </div>  -->

    <div class="posNow">
        <div style="float: left;clear: left;">当前目录：我推荐的资源</div>
    </div>
    <div id="nav">
        <h4>
        	<span>
        	<ul class="navTop">
                 <li><button onclick="addSysParam(1);">添加</button></li>
                <li><button onclick="addSysParam(2);">修改</button></li>
                <li><button onclick="repeatRecommendFile();">重新推荐</button></li>
                <li><button onclick="delateRecommend();">删除</button></li>
            </ul>
        	</span>
            <p id="friend.title">推荐资源列表</p>
        </h4>
    </div>
    <ul class="folderList" id="folderList">
        <form name="form1" action="<%=path%>/teacherrecommend/getRecommendedList.do"
              method="post">
            <table width="100%">
                <tr>
                    <td>
                        <table class="Table" width="70%" cellpadding="3" cellspacing="0"
                               align="center">

                            <!-- 每列所占的比例 -->
                            <colgroup>
                                <col width="6%"></col>
                                <col width="5%"></col>

                                <col width="25%"></col>
                                <col width="18%"></col>
                                <col width="10%"></col>
                                <col width="12%"></col>
                                <col width="10%"></col>
                                <col width="15%"></col>
                            </colgroup>
                            <tr>
                                <td class="head">
                                    序号
                                </td>
                                <td class="head">
                                    &nbsp;
                                </td>
                                <td class="head">
                                    资源包名称
                                </td>
                                <td class="head">
                                    校本资源目录
                                </td>
                                <td class="head">
                                    类型
                                <td class="head">
                                    状态
                                </td>
                                <td class="head">
                                    操作
                                </td>
                                <td class="head">
                                    添加时间
                                </td>
                            </tr>
                            <s:iterator value="list" id="roleList" status="st">
                                <tr onmouseover="changecolor(this,1);"
                                    onmouseout="changecolor(this,2);"
                                    <s:if test="!#st.odd">class="custom"</s:if>>
                                    <td class="changecol">
                                        <s:property value="#st.index+1"/>
                                    </td>
                                    <td class="changecol">
                                        <s:if test="successState!=1">
                                            <input name="checkboxId" success="<s:property value="successState" />"
                                                   type="radio" id="checkboxId" class="checkbox"
                                                   value="<s:property value="id" />">
                                        </s:if>
                                        <s:else>
                                            <input disabled="disabled" name="checkboxId"
                                                   success="<s:property value="successState" />" type="radio"
                                                   id="checkboxId" class="checkbox" value="<s:property value="id" />">
                                        </s:else>

                                    </td>
                                    <td class="changecol">
                                        <s:property value="RTitle"/>
                                    </td>
                                    <td class="changecol">
                                        <s:property value="RKsId_name"/>
                                    </td>
                                    <td class="changecol">
                                        <s:if test="RTypecode=='RT001'">教案</s:if>
                                        <s:elseif test="RTypecode=='RT002'">素材</s:elseif>
                                        <s:elseif test="RTypecode=='RT003'">课件</s:elseif>
                                        <s:elseif test="RTypecode=='RT004'">习题</s:elseif>
                                        <s:elseif test="RTypecode=='RT005'">课堂实录</s:elseif>
                                        <s:else>&nbsp;</s:else>
                                    </td>
                                    <td class="changecol">
                                        <s:if test="successState==0"><font color="blue">已提交</font></s:if>
                                        <s:elseif test="successState==1">
                                            <s:if test="RState==0"><font color="blue">未审核</font></s:if>
                                            <s:elseif test="RState==1">已审核</s:elseif>
                                            <s:elseif test="RState==3">未通过</s:elseif>
                                        </s:elseif>
                                        <s:elseif test="successState==2"><font color="red">推荐失败</font</s:elseif>
                                        <s:elseif test="successState==3"><font color="red">超时失败</font</s:elseif>
                                    </td>

                                    <td class="changecol">
                                        <a href="javascript:PlayVideo('<s:property value="RCode" />','-1','<s:property value="RFormatMark" />','2','<s:property value="RTitle" />',null,null,null,null,'');">预览</a>
                                    </td>
                                    <td class="changecol">
                                        <s:date name="RCreatedate" format="yyyy-MM-dd"/>
                                        &nbsp;
                                    </td>
                                </tr>
                            </s:iterator>
                            <tr>
                                <td colspan="9" align="right" class="head">
                                    <s:property value="#request.pageBar" escape="false"/>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>
        </form>
    </ul>
</div>
<jsp:include page="/teacher/frame/downloadfile.jsp"></jsp:include>
<script type="text/javascript">
    var message = "<%=request.getAttribute("message")%>";
    if (message != "null" && message != "") {
        alert(message);
    }
</script>
</body>
</html>