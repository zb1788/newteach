<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@ page import="interfaces.util.HttpClient" %>
<%@ page import="com.opensymphony.xwork2.ActionContext" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ page import="vcom.sso.vo.AuthResult" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="vcom.youjiao.InterfaceCfg" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.regex.Matcher" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    String uid = request.getParameter("uid");
    String cssName = request.getParameter("cssName");

    Date currentTime = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHH");
    String verifyStr = formatter.format(currentTime);

    String url = InterfaceCfg.getSysPath("SSO_IP");

    String data = "{'userId':'" + uid + "','verifyStr':'" + verifyStr + "'}";
    url += "/ssoLnyd/AppGetAuthCode?data=" + java.net.URLEncoder.encode(data, "UTF-8");

    String jsonp = HttpClient.readURL(url, 3000, null, "", "command", "service", "");
    System.out.println("jsonp=" + jsonp);
    ActionContext ctx = ActionContext.getContext();
    String errorMessage = "认证失败！";
    if (StringUtils.isNotBlank(jsonp)) {
        JSONObject js = JSONObject.fromObject(jsonp);
        AuthResult authResult = (AuthResult) js.toBean(js, AuthResult.class);
        System.out.println("ut=" + authResult.getUt());
        //log.info(" authFlg:" + authResult.getAuthFlg() + " authInfo:" + authResult.getAuthInfo());
        if (!"0".equals(authResult.getAuthFlg()))//认证失败
        {
            errorMessage = authResult.getAuthInfo();
        } else {
            errorMessage = "";
            String domain = getDomain(request);
            System.out.println(domain);
            Cookie utCk = new Cookie("ut", authResult.getUt());
            utCk.setPath("/");
            utCk.setDomain(domain);
            response.addCookie(utCk);
            String indexUrl = "/newteach/index.do?cssName=" + cssName;
            response.sendRedirect(indexUrl);
            //response.setStatus(302);
            //response.setHeader("Location","gobackmy://");
        }
    }


%>
<%!
    private String getDomain(HttpServletRequest request) {
        String url2DomainRegular = "(?<=(http|https)://|\\.)[^.]*?\\.(com.cn|net.cn|org.cn|com|cn|net|org|biz|info|cc|tv)";
        String domainRegular = "^([\\w-]+\\.)+((com)|(net)|(org)|(gov\\.cn)|(info)|(cc)|(com\\.cn)|(net\\.cn)|(org\\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\\.tw)|(hk)|(com\\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\\.uk)|(org\\.uk)|(ltd\\.uk)|(plc\\.uk)|(in)|(eu)|(it)|(jp))$";
        String domain = "";

        Pattern domainPattern = Pattern.compile(domainRegular);
        Matcher domainMatcher = domainPattern.matcher(request.getServerName());
        boolean isDomain = domainMatcher.matches();
        String myDomain = request.getServerName();

        if (isDomain) {
            String requestUrl = request.getRequestURL().toString();
            Pattern url2DomainPattern = Pattern.compile(url2DomainRegular, Pattern.CASE_INSENSITIVE);//根据url提取域名复合节点bug已修复

            Matcher url2DomainMatcher = url2DomainPattern.matcher(requestUrl);
            url2DomainMatcher.find();
            domain = url2DomainMatcher.group();
        }
        return domain;
    }
%>
<html>
<head>
    <jsp:include page="/script/jquery172min.jsp"/>
    <jsp:include page="/js/config_pls_include.jsp" ></jsp:include><!-- config_pls.js -->
</head>
<body>


<script>
    if ("<%=errorMessage%>" != "") {
        alert("<%=errorMessage%>");
    }
</script>


</body>
</html>