<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>

<div class="floatDiv" id="updateDiv" style="display:block">
    <div class="divTop">
        <div class="divClose" onclick="$('#updateDiv').css('display','none');"></div>
        <div class="divTitle" id="_commontitle">����˵��</div>
        <div class="divContent">
            <div style="font-size:14px;text-align:left">
                1�����ͨ��ѧϵͳȫ������������ɫ���͹���ȫ����ƣ�������Ӽ�����ۣ�����ʹ�ø��ӷ��㣻<br/>
                2��ԭ��ʦ��Դ�������ڿ���Դ�£����Ƹ�Ϊ����Ӧ�ã�ʹ�÷�ʽ��ԭ��ʦ��Դ����һ�£�<br/> 3������Ӧ�á���ʦ���á���չ��Դ����ʦ�ļ��С�U����Դ�����ͳһ���ڿ���Դ��Ŀ�£�ʹ�����ڿθ��ӱ�ݣ�<br/>
                4��ԭС�������п����߿�ר��ͳһ���ൽ����Ӧ���У���ʱȥ����ʦ�ղع��ܡ��Ժ��������ߣ�<br/>
                5����������ѵ�����ܣ�����ͬ����ϰ��������ϰ�����Ž�ͨ���ζ˱���ͬ����������ϰ���׾���ϰ�����л��������Ŀ�������ѵ��һ��ʵ�֣�<br/>
                6�������κ���ҵ���ܣ������ڿ���ҵͬ����������ҵ���ò��ã�����ͳ�ƿ�����ֱ�Ӳ鿴��<br/>
                ������������ʹ�����飬�뵽�Ž�ͨ���ζ˲鿴����ַ��www.czbanbantong.com
            </div>
        </div>
        <div class="page marR2">
            <div class="pageNext">
                <a onclick="$('#updateDiv').css('display','none');">�� ��</a>
            </div>
        </div>
    </div>
    <div class="divBottom"></div>
</div>

<script type="text/javascript">
    function readCookie(name) {
        var cookieValue = "";
        var search = name + "=";
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = document.cookie.indexOf(";", offset);
                if (end == -1) end = document.cookie.length;
                cookieValue = unescape(document.cookie.substring(offset, end))
            }
        }
        return cookieValue;
    }

    function writeCookie(name, value, hours) {
        var expire = "";
        if (hours != null) {
            expire = new Date((new Date()).getTime() + hours * 3600000);
            expire = ";   expires=" + expire.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expire;
    }

    if (readCookie("uv_f") == "1") {
        $('#updateDiv').css('display', 'none');
        writeCookie("uv_f", "1", 1440);
    } else {
        writeCookie("uv_f", "1", 1440);
    }
</script>