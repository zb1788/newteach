<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<div style="display: none;">
    <OBJECT ID="ipActiveX" WIDTH=350 HEIGHT=50
            CLASSID="CLSID:f7f17642-76a0-4824-97dc-bb623582c998">
        <PARAM NAME="_Version" VALUE="65536">
        <PARAM NAME="_ExtentX" VALUE="2646">
        <PARAM NAME="_ExtentY" VALUE="1323">
        <PARAM NAME="_StockProps" VALUE="0">
    </OBJECT>
</div>
<div id="net.teachUrlConfigWindow" class="floatDiv" style="display: none;">
    <div class="divTop">
        <div class="divClose" onclick="new TeachUrlConfigObj().closeWindow();"></div>
        <div class="divTitle">授课IP设置！</div>
        <div class="divContent pr">
            <h3 style="height:53px;">
                <ul class="divButton selBtn aBtn">
                    <li id="btnCss">
                        <a id="SysConfig.teachToolConfigButton" href=" javascript:new AddressConfigObj().openWindow();">
                            <p style="font-size:18px;">网络选择地址</p></a>
                    </li>
                    <li id="btnCss">
                        <a id="SysConfig.teachToolConfigButton"
                           href=" javascript:new TeachUrlConfigObj().openWindow1();"><p style="font-size:18px;">
                            手工输入地址</p></a>
                    </li>
                </ul>
            </h3>
            <dl class="ipSet2">
                <dt>校级授课地址：</dt>
                <dd><input type="text" id="school_url" style="width: 350px;"/></dd>
                <dt>市级授课地址：</dt>
                <dd><input type="text" id="city_url" value="" style="width: 350px;"/></dd>
            </dl>
            <span class="clearfix"></span>
            <div class="tipsInfo">示例如下：http://plsxx.czbanbantong.com/teach 或 https://plsxx.czbanbantong.com/teach<br/>
            </div>
            <br/>
            <br>
            <!-- 提示信息 -->
            <div class="" id="teachUrlConfig.tip"></div>
            <div class="page marR2">
                <div class="pageNext"><a href="javascript:new TeachUrlConfigObj().closeWindow();">返 回</a></div>
                <div class="pageNext"><a onclick="_tuConfig.setURL();" href="#">确 定</a></div>
            </div>
        </div>
    </div>
    <div class="divBottom" style="height: 50px;"></div>
</div>
<div id="Address_ConfigWindow" class="floatDiv" style="display: none;">
    <div class="divTop">
        <div class="divClose" onclick="new AddressConfigObj().closeWindow1();"></div>
        <div class="divTitle">授课IP设置！</div>
        <div class="divContent">
            <h3 style="height:53px;">
                <ul class="divButton selBtn aBtn">
                    <li id="btnCss">
                        <a id="SysConfig.teachToolConfigButton" href=" javascript:new AddressConfigObj().openWindow();">
                            <p style="font-size:18px;">网络选择地址</p></a>
                    </li>
                    <li id="btnCss">
                        <a id="SysConfig.teachToolConfigButton"
                           href=" javascript:new TeachUrlConfigObj().openWindow1();"><p style="font-size:18px;">
                            手工输入地址</p></a>
                    </li>
                </ul>
                <span style="display:inline-block; line-height:53px; font-size:20px;">请选择学校所在区域！</span>
            </h3>
            <div class="areaCon">
                <table border="1" geted="false" id="Address_ipSet2">
                    <tbody>
                    <tr>
                        <td colspan=4 style="width:550px;color:#ba0505;">
                            无法从服务器获取区域信息，请检查网络是否正常或拨打客服电话400-637-1319咨询。也可选择“手工输入”，直接填写服务器地址进行设置。
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="page marR2" id="address_mark_N">
                <div class="pageNext"><a href="javascript:new NextAddress_ConfigWindow().openWindow();">下一步</a></div>
            </div>
        </div>
    </div>
    <div class="divBottom" style="height: 50px;"></div>
</div>
<div id="nextAddUrl_ConfigWindow" class="floatDiv" style="display: none;height:350px">
    <div class="divTop">
        <div class="divClose" onclick="new NextAddress_ConfigWindow().closeWindow();"></div>
        <div class="divTitle">授课IP设置！</div>
        <div class="divContent">
            <h3>请选择平台类型</h3>
            <div class="" id="teachUrlConfig.tip" style="margin:22px;5px;180px;5px;">
                <p style="font-size: 18px;">学校本地是否部署校平台：
                    <input type="radio" id="teachUrlConfig_id" name="teachUrlConfig_name" value="2" checked="true"/>未部署
                    <input type="radio" id="teachUrlConfig_id" name="teachUrlConfig_name" value="1"/>已部署
                </p>
            </div>
            <div class="tipsInfo" style="font-size:14px;text-align:left; line-height:20px; padding:10px 20px;">
                1、如果未部署校平台，校级与市级授课地址一致，请选择学校所在区域完成设置;<br/>
                2、如果部署有校平台，请联系学校电教老师获取校级授课IP地址，按示例说明手动配置，市级授课地址请选择学校所在区域完成设置。
            </div>
            <div class="page marR2" id="address_mark">
                <div class="pageNext"><a href="javascript:new NextAddress_ConfigWindow().closeWindow();">返回</a></div>
                <div class="pageNext"><a href="javascript:new AddressConfigObj().confirmAddress();">确定</a></div>
            </div>
        </div>
    </div>
    <div class="divBottom" style="height: 50px;"></div>
</div>