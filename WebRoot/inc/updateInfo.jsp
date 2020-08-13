<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>

<div class="floatDiv" id="updateDiv" style="display:block">
    <div class="divTop">
        <div class="divClose" onclick="$('#updateDiv').css('display','none');"></div>
        <div class="divTitle" id="_commontitle">升级说明</div>
        <div class="divContent">
            <div style="font-size:14px;text-align:left">
                1、班班通教学系统全面升级，整体色调和功能全新设计，界面更加简洁美观，功能使用更加方便；<br/>
                2、原教师资源调整到授课资源下，名称改为课堂应用，使用方式与原教师资源保持一致；<br/> 3、课堂应用、名师课堂、拓展资源、教师文件夹、U盘资源五大功能统一到授课资源栏目下，使课堂授课更加便捷；<br/>
                4、原小升初、中考、高考专题统一归类到更多应用中，暂时去掉教师收藏功能、稍后将重新上线；<br/>
                5、新增课堂训练功能，包含同步练习和组题练习，与优教通备课端保持同步，单题练习、套卷练习轻松切换，让您的课堂试题训练一步实现；<br/>
                6、新增课后作业功能，备课授课作业同步，课堂作业当堂布置，错题统计课堂中直接查看。<br/>
                更多升级功能使用详情，请到优教通备课端查看，地址：www.czbanbantong.com
            </div>
        </div>
        <div class="page marR2">
            <div class="pageNext">
                <a onclick="$('#updateDiv').css('display','none');">关 闭</a>
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