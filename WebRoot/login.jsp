<%@ page language="java" import="java.util.*,vcom.util.InterfaceCfg" pageEncoding="GBK" %>
<%

    String path = request.getContextPath();
    String basePath = InterfaceCfg.getSysCodeScheme("PLS") + "://"
            + request.getServerName()
            + path + "/";
//GET方式转发参数
    Map map = request.getParameterMap();
    Set keSet = map.entrySet();
    StringBuffer stb = new StringBuffer();
    for (Iterator itr = keSet.iterator(); itr.hasNext(); ) {
        Map.Entry me = (Map.Entry) itr.next();
        Object okey = me.getKey();
        Object ovalue = me.getValue();
        String[] value = new String[1];
        //判断是否数组
        if (ovalue instanceof String[]) {
            value = (String[]) ovalue;
        } else {
            value[0] = ovalue.toString();
        }
        for (int k = 0; k < value.length; k++) {
            if (stb.length() > 1) {
                stb.append("&");
            } else {
                stb.append("?");
            }
            stb.append(okey + "=" + value[k]);
        }
    }
    response.sendRedirect(basePath + "login/index.html" + stb.toString());
%>