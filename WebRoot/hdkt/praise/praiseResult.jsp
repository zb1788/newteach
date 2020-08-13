<%@ page import="net.sf.json.JSONObject" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new java.util.Date().getTime());

    boolean result = false;
    String message = "";
    String uid = "";
    String rdata = request.getParameter("rdata");

    if (rdata != null && rdata.trim().length() > 0) {
        JSONObject jsObject = JSONObject.fromObject(rdata);

        if ((Integer) jsObject.get("success") == 1) {
            //表扬消息发送成功
            result = true;
        } else {
            //表扬消息发送失败
            message = (String) jsObject.get("message");

        }
        if (jsObject.get("uid") != null) {
            uid = (String) jsObject.get("uid");
        }
    }


%>
<html>
<head>
    <script>
        try {
            parent.Praise.afterSendCallback("<%=uid%>", <%=result%>, "<%=message%>");
        } catch (e) {
        }
    </script>
</head>
<body>

</body>
</html>
