<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<form action="" name="ipform">
    <div id="teachToolConfig.configWindow" class="floatDiv" style="display: none;">
        <div class="divTop">
            <div class="divClose" onclick="_teachToolConfigObj.closeWindow();"></div>
            <div class="divTitle">教学工具配置</div>
            <div class="divContent">
                <dl class="ipSet" id="teachToolConfig.inputPanel">
                    <dt id="teachToolConfig_input_name1">
                        名称：<input type="text" " name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                        onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path1">&nbsp;&nbsp;&nbsp;&nbsp;
                        路径：<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(0); ">选 择</a>
                    </dd>

                    <dt id="teachToolConfig_input_name2">
                        名称：<input type="text" name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                                  onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path2">&nbsp;&nbsp;&nbsp;&nbsp;
                        路径：<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(1);">选 择</a>
                    </dd>

                    <dt id="teachToolConfig_input_name3">
                        名称：<input type="text" " name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                        onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path3">&nbsp;&nbsp;&nbsp;&nbsp;
                        路径：<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(2); ">选 择</a>
                    </dd>

                    <dt id="teachToolConfig_input_name3">
                        名称：<input type="text" " name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                        onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path3">&nbsp;&nbsp;&nbsp;&nbsp;
                        路径：<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(3); ">选 择</a>
                    </dd>

                    <dt id="teachToolConfig_input_name4">
                        名称：<input type="text" " name="teachToolConfig_inputPanel_name" maxlength="4" style="width:90px;"
                        onchange="this.value=this.value.trim();"/>
                    </dt>
                    <dd id="teachToolConfig_input_path4">&nbsp;&nbsp;&nbsp;&nbsp;
                        路径：<input type="text" name="teachToolConfig_inputPanel_path" style="width:160px;"/><a
                                href="javascript:_teachToolConfigObj.selectFolder(4); ">选 择</a>
                    </dd>
                </dl>
                <span class="clearfix"></span>
            </div>
            <span class="clearfix"></span>
            <!-- 提示信息 -->
            <div class="" id="teachToolConfig.tip"></div>
            <div class="page marR2">
                <div class="pageNext"><a href="javascript:_teachToolConfigObj.closeWindow();">返 回</a></div>
                <div class="pageNext"><a href="#" onclick="_teachToolConfigObj.updateObjectByPage();"
                                         id="teachToolConfig.confirm">确 定</a></div>
            </div>
        </div>
        <div class="divBottom"></div>
    </div>
</form>