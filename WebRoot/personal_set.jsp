<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>

<!--课程设置-开始-->
<div class="floatDiv" id="divid_gradediv">
    <div class="divTop">
        <div class="divClose"
             onclick="_usbObj.visible(); void(divid_gradediv.style.display=maskAll.style.display='none');"></div>
        <div class="divTitle">课程设置！</div>
        <div class="divContent">
            <h3>年级设置：请选择您所在的年级！</h3>
            <div id="grade_div">
                <ul class="classSet">
                    <li>小学：</li>
                    <li><input name="" type="checkbox" value=""/>一年级</li>
                    <li><input name="" type="checkbox" value=""/>二年级</li>
                    <li><input name="" type="checkbox" value=""/>三年级</li>
                    <li><input name="" type="checkbox" value=""/>四年级</li>
                    <li><input name="" type="checkbox" value=""/>五年级</li>
                    <li><input name="" type="checkbox" value=""/>六年级</li>
                </ul>
                <span class="clearfix"></span>
                <ul class="classSet">
                    <li>初中：</li>
                    <li><input name="" type="checkbox" value=""/>七年级</li>
                    <li><input name="" type="checkbox" value=""/>八年级</li>
                    <li><input name="" type="checkbox" value=""/>九年级</li>
                </ul>
                <span class="clearfix"></span>
                <ul class="classSet">
                    <li>高中：</li>
                    <li><input name="" type="checkbox" value=""/>高一啊</li>
                    <li><input name="" type="checkbox" value=""/>高二</li>
                </ul>
                <span class="clearfix"></span>
            </div>
            <div class="tipsInfo" id="grade_set_tip">提示：如果您要更换年级，请于上方重新选择;<br/>如果您需要……</div>
            <div class="page">
                <div class="pageNext">
                    <a href="javascript:_usbObj.visible(); void(divid_gradediv.style.display=maskAll.style.display='none');"
                       title="返回">返回</a>
                </div>
                <div class="pageNext"><a href="javascript:checkGradeInput();" title="下一步">下一步</a></div>
            </div>
        </div>
    </div>
    <div class="divBottom"></div>
</div>
<div id="gradech_div"></div>