<%@ page contentType="text/html; charset=gbk" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>
    <title>无标题文档</title>
    <script type="text/javascript" src="../js/swfupload.js"></script>
    <script type="text/javascript" src="../js/handlers.js"></script>
    <script type="text/javascript" src="../js/Progress.js"></script>
    <script type="text/javascript" src="../js/swfupload.queue.js"></script>
    <script type="text/javascript">
        var swfu;
        window.onload = function () {
            swfu = new SWFUpload({
                // Backend Settings
                upload_url: "/pls/teacherupload/uploadfile.do",	// Relative to the SWF file or absolute

                file_size_limit: "2000MB",	// 2MB
                file_types: "*.jpg;*.gif;*.png;*.exe",
                file_types_description: "图片(jpg,gif,png)",
                file_upload_limit: 100,

                custom_settings: {
                    progressTarget: "fsUploadProgress",
                    cancelButtonId: "btnCancel"
                },

                // Event Handler Settings - these functions as defined in Handlers.js
                //  The handlers are not part of SWFUpload but are part of my website and control how
                //  my website reacts to the SWFUpload events.
                file_queued_handler: fileQueued,
                file_queue_error_handler: fileQueueError,
                file_dialog_complete_handler: fileDialogComplete,
                upload_start_handler: uploadStart,
                upload_progress_handler: uploadProgress,
                upload_error_handler: uploadError,
                upload_success_handler: uploadSuccess,
                upload_complete_handler: uploadComplete,

                // Button Settings
                button_image_url: "../images/XPButtonNoText_65x22.png",	// Relative to the SWF file
                button_placeholder_id: "spanButtonPlaceholder",
                button_width: 65,
                button_height: 22,
                button_text: '浏览',
                //button_text_style : '.button { font-family: Helvetica, Arial, sans-serif; font-size: 14pt; } .buttonSmall { font-size: 18spt; }',
                button_text_left_padding: 18,
                button_text_top_padding: 1,


                // Flash Settings
                flash_url: "swfupload.swf",

                // Debug Settings
                debug: false
            });
        };

    </script>
</head>
<body>
<div id="content">
    <form style="clear:both;padding-top:5px;padding-left:15px;" id="subForm">
        <span id="spanButtonPlaceholder"></span> &nbsp;
        <input id="startUpload" type="button" value="上传" onclick="imgUpoload()" disabled="disabled"
               style=" border:0px;width:65px;height:22px;background-image:url(swfupload/images/XPButtonNoText_65x22.png)"/>
        &nbsp;
        <input id="btnComplete" type="button" value="完成" onclick="btmComplete()" disabled="disabled"
               style=" border:0px;width:65px;height:22px;background-image:url(swfupload/images/XPButtonNoText_65x22.png)"/>
        &nbsp;
        <input id="btnCancel" type="button" value="取消" onclick="swfu.cancelQueue()" disabled="disabled"
               style=" border:0px;width:65px;height:22px;background-image:url(swfupload/images/XPButtonNoText_65x22.png)"/>
    </form>
    <div class="fieldset flash" id="fsUploadProgress"><span class="legend">上传列表</span></div>
    <div id="thumbnails"></div>

</div>
<table>
    <tr>
        <td>
            <span id="_name" style="font-size:14px;"></span>
            <div id="pp1"></div>
            <span style="color:green;font-size:12px;">已上传: 8%    速度: 50.53KB/S    剩余: 00:00:21</span>
        </td>
        <td id="_size" style="font-size:14px;"></td>
    </tr>
</table>
</body>
</html>
</html>
