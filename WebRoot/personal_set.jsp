<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>

<!--�γ�����-��ʼ-->
<div class="floatDiv" id="divid_gradediv">
    <div class="divTop">
        <div class="divClose"
             onclick="_usbObj.visible(); void(divid_gradediv.style.display=maskAll.style.display='none');"></div>
        <div class="divTitle">�γ����ã�</div>
        <div class="divContent">
            <h3>�꼶���ã���ѡ�������ڵ��꼶��</h3>
            <div id="grade_div">
                <ul class="classSet">
                    <li>Сѧ��</li>
                    <li><input name="" type="checkbox" value=""/>һ�꼶</li>
                    <li><input name="" type="checkbox" value=""/>���꼶</li>
                    <li><input name="" type="checkbox" value=""/>���꼶</li>
                    <li><input name="" type="checkbox" value=""/>���꼶</li>
                    <li><input name="" type="checkbox" value=""/>���꼶</li>
                    <li><input name="" type="checkbox" value=""/>���꼶</li>
                </ul>
                <span class="clearfix"></span>
                <ul class="classSet">
                    <li>���У�</li>
                    <li><input name="" type="checkbox" value=""/>���꼶</li>
                    <li><input name="" type="checkbox" value=""/>���꼶</li>
                    <li><input name="" type="checkbox" value=""/>���꼶</li>
                </ul>
                <span class="clearfix"></span>
                <ul class="classSet">
                    <li>���У�</li>
                    <li><input name="" type="checkbox" value=""/>��һ��</li>
                    <li><input name="" type="checkbox" value=""/>�߶�</li>
                </ul>
                <span class="clearfix"></span>
            </div>
            <div class="tipsInfo" id="grade_set_tip">��ʾ�������Ҫ�����꼶�������Ϸ�����ѡ��;<br/>�������Ҫ����</div>
            <div class="page">
                <div class="pageNext">
                    <a href="javascript:_usbObj.visible(); void(divid_gradediv.style.display=maskAll.style.display='none');"
                       title="����">����</a>
                </div>
                <div class="pageNext"><a href="javascript:checkGradeInput();" title="��һ��">��һ��</a></div>
            </div>
        </div>
    </div>
    <div class="divBottom"></div>
</div>
<div id="gradech_div"></div>