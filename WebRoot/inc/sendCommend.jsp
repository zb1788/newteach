<%@ page language="java" import="java.net.*,java.io.*,vcom.util.InterfaceCfg" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String para = request.getQueryString();
    HttpURLConnection urlcon = null;
    java.io.BufferedReader breader = null;
    java.io.InputStream in = null;
    StringBuffer sb = new StringBuffer();
    String emessage = null;
    System.out.println(para);
    try {
        String weburl = InterfaceCfg.getSysPath("WEBMAIL_IP");
        URL url = new URL(weburl + "/src/msgInterFace.php");
        urlcon = (HttpURLConnection) url.openConnection();
        urlcon.setRequestMethod("POST");
        urlcon.setDoOutput(true);
        urlcon.setConnectTimeout(6000);
        urlcon.setReadTimeout(6000);
        urlcon.setFollowRedirects(true);
        urlcon.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3");
        urlcon.setRequestProperty("Connection", "keep-alive");
        // 装置参数
        if (para != null && para.trim().length() > 0) {
            urlcon.getOutputStream().write(para.getBytes());
            urlcon.getOutputStream().flush();
            urlcon.getOutputStream().close();
        }
        // 获取响应代码
        int code = urlcon.getResponseCode();
        // 获取页面内容
        in = urlcon.getInputStream();
        breader = new BufferedReader(new InputStreamReader(in, "GBK"));
        String str = breader.readLine();
        while (str != null) {
            sb.append(str.trim());
            str = breader.readLine();
        }
    } catch (FileNotFoundException e1) {
        emessage = "FilenotfoundException:" + e1.getMessage();
    } catch (ConnectException e2) {
        emessage = "ConnectException:" + e2.getMessage();
    } catch (Exception e3) {
        emessage = "Exception:" + e3.getMessage();
        e3.printStackTrace();
    } finally {
        if (urlcon != null) {
            urlcon.disconnect();
            urlcon = null;
        }
        if (breader != null) {
            try {
                breader.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            breader = null;
        }
        if (in != null) {
            try {
                in.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            in = null;
        }
    }
    String r = sb.toString();
    if (emessage != null && (r == null || r.trim().length() == 0)) {
        r = "eMessage:'" + emessage + "'";
    }
    out.print(r);
%>