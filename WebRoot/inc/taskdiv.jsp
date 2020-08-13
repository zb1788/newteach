<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!-- 班级选择div begin -->
<div id="class_taskWindow" class="floatDiv" style="display: none;">
    <div class="divTop">
        <div class="divClose" onclick="_commonDiv.closeTaskWindow();"></div>
        <div class="divTitle">发送</div>
        <div class="divContent">
            <h3>请选择您要发送的任务</h3>
            <div id="task_div">
                <ul class="classSet" id="taskDivSet">
                </ul>
                <span class="clearfix"></span>
            </div>
        </div>
        <span class="clearfix"></span>
        <div class="" id="tasktip" style="color:red"></div>
        <div class="page marR2">
            <div class="pageNext"><a href="javascript:_commonDiv.closeTaskWindow();">关 闭</a></div>
            <div class="pageNext"><a href="#" onclick="kqyx.sendByGroup();">确 定</a></div>
            <input type="hidden" value="" id="taskrcode"/>
        </div>
    </div>
    <div class="divBottom"></div>
</div>