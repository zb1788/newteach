<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<form action="" name="ipform">
    <div id="teachToolConfig.configWindow" class="floatDiv" style="display: none;">
        <div class="divTop">
            <div class="divClose" onclick="_teachToolConfigObj.closeWindow();"></div>
            <div class="divTitle">��ѧ��������</div>
            <div class="divContent">
                <dl class="ipSet" id="teachToolConfig.inputPanel">
                    <dt id="teachToolConfig_input_name1">
                        ���ƣ�<input type="text" " name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                        onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path1">&nbsp;&nbsp;&nbsp;&nbsp;
                        ·����<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(0); ">ѡ ��</a>
                    </dd>

                    <dt id="teachToolConfig_input_name2">
                        ���ƣ�<input type="text" name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                                  onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path2">&nbsp;&nbsp;&nbsp;&nbsp;
                        ·����<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(1);">ѡ ��</a>
                    </dd>

                    <dt id="teachToolConfig_input_name3">
                        ���ƣ�<input type="text" " name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                        onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path3">&nbsp;&nbsp;&nbsp;&nbsp;
                        ·����<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(2); ">ѡ ��</a>
                    </dd>

                    <dt id="teachToolConfig_input_name3">
                        ���ƣ�<input type="text" " name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                        onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path3">&nbsp;&nbsp;&nbsp;&nbsp;
                        ·����<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(3); ">ѡ ��</a>
                    </dd>

                    <dt id="teachToolConfig_input_name4">
                        ���ƣ�<input type="text" " name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                        onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path4">&nbsp;&nbsp;&nbsp;&nbsp;
                        ·����<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(4); ">ѡ ��</a>
                    </dd>
                </dl>
                <span class="clearfix"></span>
            </div>
            <span class="clearfix"></span>
            <!-- ��ʾ��Ϣ -->
            <div class="" id="teachToolConfig.tip"></div>
            <div class="page marR2">
                <div class="pageNext"><a href="javascript:_teachToolConfigObj.closeWindow();">�� ��</a></div>
                <div class="pageNext"><a href="#" onclick="_teachToolConfigObj.updateObjectByPage();"
                                         id="teachToolConfig.confirm">ȷ ��</a></div>
            </div>
        </div>
        <div class="divBottom"></div>
    </div>
</form>