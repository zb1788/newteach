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
        <div class="divTitle">�ڿ�IP���ã�</div>
        <div class="divContent pr">
            <h3 style="height:53px;">
                <ul class="divButton selBtn aBtn">
                    <li id="btnCss">
                        <a id="SysConfig.teachToolConfigButton" href=" javascript:new AddressConfigObj().openWindow();">
                            <p style="font-size:18px;">����ѡ���ַ</p></a>
                    </li>
                    <li id="btnCss">
                        <a id="SysConfig.teachToolConfigButton"
                           href=" javascript:new TeachUrlConfigObj().openWindow1();"><p style="font-size:18px;">
                            �ֹ������ַ</p></a>
                    </li>
                </ul>
            </h3>
            <dl class="ipSet2">
                <dt>У���ڿε�ַ��</dt>
                <dd><input type="text" id="school_url" style="width: 350px;"/></dd>
                <dt>�м��ڿε�ַ��</dt>
                <dd><input type="text" id="city_url" value="" style="width: 350px;"/></dd>
            </dl>
            <span class="clearfix"></span>
            <div class="tipsInfo">ʾ�����£�http://plsxx.czbanbantong.com/teach �� https://plsxx.czbanbantong.com/teach<br/>
            </div>
            <br/>
            <br>
            <!-- ��ʾ��Ϣ -->
            <div class="" id="teachUrlConfig.tip"></div>
            <div class="page marR2">
                <div class="pageNext"><a href="javascript:new TeachUrlConfigObj().closeWindow();">�� ��</a></div>
                <div class="pageNext"><a onclick="_tuConfig.setURL();" href="#">ȷ ��</a></div>
            </div>
        </div>
    </div>
    <div class="divBottom" style="height: 50px;"></div>
</div>
<div id="Address_ConfigWindow" class="floatDiv" style="display: none;">
    <div class="divTop">
        <div class="divClose" onclick="new AddressConfigObj().closeWindow1();"></div>
        <div class="divTitle">�ڿ�IP���ã�</div>
        <div class="divContent">
            <h3 style="height:53px;">
                <ul class="divButton selBtn aBtn">
                    <li id="btnCss">
                        <a id="SysConfig.teachToolConfigButton" href=" javascript:new AddressConfigObj().openWindow();">
                            <p style="font-size:18px;">����ѡ���ַ</p></a>
                    </li>
                    <li id="btnCss">
                        <a id="SysConfig.teachToolConfigButton"
                           href=" javascript:new TeachUrlConfigObj().openWindow1();"><p style="font-size:18px;">
                            �ֹ������ַ</p></a>
                    </li>
                </ul>
                <span style="display:inline-block; line-height:53px; font-size:20px;">��ѡ��ѧУ��������</span>
            </h3>
            <div class="areaCon">
                <table border="1" geted="false" id="Address_ipSet2">
                    <tbody>
                    <tr>
                        <td colspan=4 style="width:550px;color:#ba0505;">
                            �޷��ӷ�������ȡ������Ϣ�����������Ƿ������򲦴�ͷ��绰400-637-1319��ѯ��Ҳ��ѡ���ֹ����롱��ֱ����д��������ַ�������á�
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="page marR2" id="address_mark_N">
                <div class="pageNext"><a href="javascript:new NextAddress_ConfigWindow().openWindow();">��һ��</a></div>
            </div>
        </div>
    </div>
    <div class="divBottom" style="height: 50px;"></div>
</div>
<div id="nextAddUrl_ConfigWindow" class="floatDiv" style="display: none;height:350px">
    <div class="divTop">
        <div class="divClose" onclick="new NextAddress_ConfigWindow().closeWindow();"></div>
        <div class="divTitle">�ڿ�IP���ã�</div>
        <div class="divContent">
            <h3>��ѡ��ƽ̨����</h3>
            <div class="" id="teachUrlConfig.tip" style="margin:22px;5px;180px;5px;">
                <p style="font-size: 18px;">ѧУ�����Ƿ���Уƽ̨��
                    <input type="radio" id="teachUrlConfig_id" name="teachUrlConfig_name" value="2" checked="true"/>δ����
                    <input type="radio" id="teachUrlConfig_id" name="teachUrlConfig_name" value="1"/>�Ѳ���
                </p>
            </div>
            <div class="tipsInfo" style="font-size:14px;text-align:left; line-height:20px; padding:10px 20px;">
                1�����δ����Уƽ̨��У�����м��ڿε�ַһ�£���ѡ��ѧУ���������������;<br/>
                2�����������Уƽ̨������ϵѧУ�����ʦ��ȡУ���ڿ�IP��ַ����ʾ��˵���ֶ����ã��м��ڿε�ַ��ѡ��ѧУ��������������á�
            </div>
            <div class="page marR2" id="address_mark">
                <div class="pageNext"><a href="javascript:new NextAddress_ConfigWindow().closeWindow();">����</a></div>
                <div class="pageNext"><a href="javascript:new AddressConfigObj().confirmAddress();">ȷ��</a></div>
            </div>
        </div>
    </div>
    <div class="divBottom" style="height: 50px;"></div>
</div>