<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!-- �༶ѡ��div begin -->
<div id="class_taskWindow" class="floatDiv" style="display: none;">
    <div class="divTop">
        <div class="divClose" onclick="_commonDiv.closeTaskWindow();"></div>
        <div class="divTitle">����</div>
        <div class="divContent">
            <h3>��ѡ����Ҫ���͵�����</h3>
            <div id="task_div">
                <ul class="classSet" id="taskDivSet">
                </ul>
                <span class="clearfix"></span>
            </div>
        </div>
        <span class="clearfix"></span>
        <div class="" id="tasktip" style="color:red"></div>
        <div class="page marR2">
            <div class="pageNext"><a href="javascript:_commonDiv.closeTaskWindow();">�� ��</a></div>
            <div class="pageNext"><a href="#" onclick="kqyx.sendByGroup();">ȷ ��</a></div>
            <input type="hidden" value="" id="taskrcode"/>
        </div>
    </div>
    <div class="divBottom"></div>
</div>