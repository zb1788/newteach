<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!-- 班级选择div begin -->
<div id="class_commondivWindow" class="floatDiv" style="display: none;">
    <div class="divTop">
        <div class="divClose" onclick="_commonDiv.closeWindow();"></div>
        <div class="divTitle" id="_commontitle">班级设置！</div>
        <div class="divContent">
            <h3 id="_commonmessage">班级设置：请选择您所在的班级！</h3>
            <div id="classselBtn">
                <h3 style="height:53px;">

                    <ul class="divClassButton">
                        <li>
                            <a id="userClass" class="selButton"
                               href="javascript:_commonDiv.showUserClass()">
                                <p style="font-size:18px;">教师班级</p>
                            </a>
                        </li>
                        <li>
                            <a id="allClass" class="unselButton"
                               href="javascript:_commonDiv.showAllClass()">
                                <p style="font-size:18px;">全部班级</p>
                            </a>
                        </li>
                    </ul>


                </h3>
            </div>
            <div id="grade_div">
                <ul class="classSet" id="classSet"></ul>
                <span class="clearfix"></span>
            </div>
        </div>
        <span class="clearfix"></span>
        <div class="" id="net.tip" style="color:red"></div>
        <div class="page marR2">
            <div class="pageNext"><a id="classConfig.close" href="javascript:_commonDiv.closeWindow();">关 闭</a></div>
            <div class="pageNext"><a href="#" onclick="_commonDiv.selectClass();" id="classConfig.confirm">确 定</a></div>
        </div>
    </div>
    <div class="divBottom"></div>
</div>
<script>

</script>