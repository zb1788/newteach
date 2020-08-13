
package vcom.util;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.*;
import javax.servlet.ServletContext;
import javax.servlet.http.*;


public final class RequestUtil {
    private static int urlPrefixIdx = 0;

    /**
     * ���cookie
     *
     * @param response
     * @param cookie
     * @param path
     */
    public static void deleteCookie(HttpServletResponse response,
                                    Cookie cookie, String path) {
        if (cookie != null) {
            cookie.setMaxAge(0);
            cookie.setPath(path);
            response.addCookie(cookie);
        }
    }

    /**
     * �õ�webӦ�õ�·������http://www.vcom.com:8080/webapp
     *
     * @param request
     * @return
     */
    public static String getAppURL(HttpServletRequest request) {
        StringBuffer url = new StringBuffer();
        int port = request.getServerPort();
        if (port < 0)
            port = 80;
        String scheme = request.getScheme();
        url.append(scheme);
        url.append("://");
        url.append(request.getServerName());
        if (scheme.equals("http") && port != 80 || scheme.equals("https")
                && port != 443) {
            url.append(':');
            url.append(port);
        }
        url.append(request.getContextPath());
        return url.toString();
    }

    /**
     * �õ�ָ����cookie
     *
     * @param request
     * @param name    cookie����
     * @return
     */
    public static Cookie getCookie(HttpServletRequest request, String name) {
        Cookie cookies[] = request.getCookies();
        Cookie returnCookie = null;
        if (cookies == null)
            return returnCookie;
        int i = 0;
        do {
            if (i >= cookies.length)
                break;
            Cookie thisCookie = cookies[i];
            if (thisCookie.getName().equals(name)
                    && !thisCookie.getValue().equals("")) {
                returnCookie = thisCookie;
                break;
            }
            i++;
        } while (true);
        return returnCookie;
    }

    /**
     * �õ�������Ϣ
     *
     * @param request
     * @param isInfoEnabled
     * @return
     */
    public static final StringBuilder getErrorInfoFromRequest(
            HttpServletRequest request, boolean isInfoEnabled) {
        StringBuilder sb = new StringBuilder();
        String errorUrl = getErrorUrl(request);

        sb.append(formatStr("Error processing url: %1, Referrer: %2, Error message: %3.\n",
                true,
                new Object[]{errorUrl, request.getHeader("REFERER"),
                        request.getAttribute("javax.servlet.error.message")}));
        Throwable ex = (Throwable) request.getAttribute("exception");
        if (ex == null)
            ex = (Throwable) request
                    .getAttribute("javax.servlet.error.exception");
        if (ex != null)
            sb.append(formatStr("Exception stack trace: \n",
                    true,
                    new Object[]{ex}));
        if (isInfoEnabled)
            sb.append(getRequestInfo(request));
        return sb;
    }

    /**
     * �õ������url
     *
     * @param request
     * @return
     */
    public static final String getErrorUrl(HttpServletRequest request) {
        String errorUrl = (String) request
                .getAttribute("javax.servlet.error.request_uri");
        if (errorUrl == null)
            errorUrl = (String) request
                    .getAttribute("javax.servlet.forward.request_uri");
        if (errorUrl == null)
            errorUrl = (String) request
                    .getAttribute("javax.servlet.include.request_uri");
        if (errorUrl == null)
            errorUrl = request.getRequestURL().toString();
        return errorUrl;
    }

    /**
     * �õ���ΪeStore��cookie
     *
     * @param request
     * @return
     */
    public static Cookie getEStoreCookie(HttpServletRequest request) {
        return getCookie(request, "eStore");
    }

    public static final String getFullRequestUrl(HttpServletRequest req) {
        return (req.getQueryString() != null ? req.getRequestURL().append("?")
                .append(req.getQueryString()) : req.getRequestURL()).toString();
    }

    public static Integer getInteger(HttpServletRequest request,
                                     String paramName) {
        String id = request.getParameter(paramName);
        if (id != null && !id.equals(""))
            try {
                return new Integer(id);
            } catch (Exception e) {
                return null;
            }
        else
            return null;
    }

    public static Integer[] getIntegerArray(HttpServletRequest request,
                                            String paramName) {
        Integer iIds[] = null;
        String strIds[] = request.getParameterValues(paramName);
        if (strIds != null && strIds.length > 0) {
            iIds = new Integer[strIds.length];
            for (int i = 0; i < strIds.length; i++)
                iIds[i] = new Integer(strIds[i]);

        }
        return iIds;
    }

    public static String getParameterNullSafe(HttpServletRequest request,
                                              String paramName) {
        String ret = request.getParameter(paramName);
        if (ret == null)
            ret = "";
        return ret;
    }

    public static String getRequestedPageName(HttpServletRequest req, String defaultViewName) {
        int idx2 = req.getRequestURI().lastIndexOf(".");
        if (idx2 > 0)
            return req.getRequestURI().substring(getUrlPrefixIdx(req), idx2);
        String uri = req.getRequestURI().substring(getUrlPrefixIdx(req));
        if (!uri.endsWith("/"))
            uri = (new StringBuilder()).append(uri).append("/").append(
                    defaultViewName).toString();
        else
            uri = (new StringBuilder()).append(uri).append(defaultViewName)
                    .toString();
        return uri;
    }

    public static final StringBuilder getRequestInfo(HttpServletRequest request) {
        StringBuilder sb = new StringBuilder();
        String requestUrl = request.getRequestURL().toString();
        sb.append(formatStr("##########Start of debuging request and session data for url: %1.\n", true,
                new Object[]{requestUrl}));
        sb.append("!!!!!!!!!!Debuging request.getParameterNames()!!!!!!!!!!\n");
        Enumeration enumeration;
        String paramName;
        for (enumeration = request.getParameterNames(); enumeration
                .hasMoreElements(); sb.append(formatStr("Request Parameter - %1 = %2.\n", true, new Object[]{paramName, request.getParameter(paramName)})))
            paramName = (String) enumeration.nextElement();

        sb.append("!!!!!!!!!!Debuging request.getAttributeNames()!!!!!!!!!!\n");
        enumeration = request.getAttributeNames();
        do {
            if (!enumeration.hasMoreElements())
                break;
            String attrName = (String) enumeration.nextElement();
            if (!attrName.endsWith("exception"))
                sb.append(formatStr("Request Attribute - %1 = %2.\n", true, new Object[]{
                        attrName, request.getAttribute(attrName)}));
        } while (true);
        sb.append("!!!!!!!!!!Debuging request.getHeaderNames()!!!!!!!!!!\n");
        String headerName;
        for (enumeration = request.getHeaderNames();
             enumeration.hasMoreElements();
             sb.append(formatStr("Request Header - %1 = %2.\n", true, new Object[]{headerName, request.getHeader(headerName)}))
        ) {
            headerName = (String) enumeration.nextElement();
        }

        HttpSession session = request.getSession(false);
        if (session != null) {
            sb.append("!!!!!!!!!!Debuging session.getAttributeNames()!!!!!!!!!!\n");
            String attrName;
            for (enumeration = session.getAttributeNames(); enumeration
                    .hasMoreElements(); sb.append(formatStr(
                    "Session Attribute - %1 = %2.\n", true, new Object[]{attrName,
                            session.getAttribute(attrName)}))) {
                attrName = (String) enumeration.nextElement();
            }

            sb.append(formatStr("##########End of debuging request and session data for url: %1.\n", true,
                    new Object[]{requestUrl}));
        }
        return sb;
    }

    public static Map getRequestMap(HttpServletRequest req) {
        Map params = new HashMap();
        Enumeration emu = req.getParameterNames();
        do {
            if (!emu.hasMoreElements())
                break;
            String key = (String) emu.nextElement();
            String values[] = req.getParameterValues(key);
            if (values != null)
                if (values.length == 1)
                    params.put(key, values[0]);
                else
                    params.put(key, values);
        } while (true);
        return Collections.unmodifiableMap(params);
    }

    public static int getUrlPrefixIdx(HttpServletRequest req) {
        if (urlPrefixIdx == 0) {
            String contextPath = req.getContextPath();
            int idx1 = req.getRequestURI().indexOf(contextPath);
            urlPrefixIdx = idx1 + contextPath.length();
        }
        return urlPrefixIdx;
    }

    public static String getUserLocaleCode(HttpServletRequest request) {
        return (String) request.getAttribute("CUR_LOCALE_CODE");
    }

    /**
     * ���û�cookie��Ϊ-2���������û�
     *
     * @param response
     * @param ctxPath
     */
    public static void removeUserCookies(HttpServletResponse response,
                                         String ctxPath) {
        setCookie(response, "UID", "-2", ctxPath);
    }

    /**
     * ������ر�cookieʧЧ
     *
     * @param response
     * @param name     cookie����
     * @param value    cookie����
     * @param path     webapp·��
     */
    public static void setCookie(HttpServletResponse response, String name,
                                 String value, String path) {
        Cookie cookie = new Cookie(name, value);
        cookie.setSecure(false);
        cookie.setPath(path);
        response.addCookie(cookie);
    }

    /**
     * ����ָ���ı�����������cookie
     *
     * @param response
     * @param name     cookie����
     * @param value    cookie����
     * @param path     webapp·��
     * @param maxAge   ��������
     */
    public static void setCookie(HttpServletResponse response, String name,
                                 String value, String path, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setSecure(false);
        cookie.setPath(path);
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    /**
     * �����û�Id��cookie
     *
     * @param response
     * @param userId   �û�Id
     * @param ctxPath  webӦ������
     */
    public static void setUserIdCookie(HttpServletResponse response,
                                       Integer userId, String ctxPath) {
        Cookie cookie = new Cookie("UID", String.valueOf(userId));
        cookie.setPath(ctxPath);
        response.addCookie(cookie);
    }

    /**
     * �����û�����cookie
     *
     * @param response
     * @param userName �û���
     * @param ctxPath  webӦ������
     */
    public static void setUserNameCookie(HttpServletResponse response,
                                         String userName, String ctxPath) {
        setCookie(response, "UNAME", userName, ctxPath);
    }

    private RequestUtil() {
    }


    //ת���ַ�������
    private static StringBuilder formatStr(CharSequence msgWithFormat, boolean autoQuote, Object args[]) {
        StringBuilder sb = new StringBuilder(msgWithFormat);
        int argsLen = args.length;
        if (argsLen > 0) {
            boolean markFound = false;
            for (int i = 0; i < argsLen; i++) {
                String flag = (new StringBuilder()).append("%").append(i + 1)
                        .toString();
                String tmp;
                for (int idx = sb.indexOf(flag); idx >= 0; idx = sb.indexOf(
                        flag, idx + tmp.length())) {
                    markFound = true;
                    tmp = toString(args[i], autoQuote);
                    sb.replace(idx, idx + 2, tmp);
                }

            }

            if (args[argsLen - 1] instanceof Throwable) {
                StringWriter sw = new StringWriter();
                ((Throwable) args[argsLen - 1])
                        .printStackTrace(new PrintWriter(sw));
                sb.append("\n").append(sw.toString());
            } else if (argsLen == 1 && !markFound)
                sb.append(args[argsLen - 1].toString());
        }
        return sb;
    }

    public static String toString(Object obj, boolean autoQuote) {
        StringBuilder sb = new StringBuilder();
        if (obj == null)
            sb.append("NULL");
        else if (obj instanceof Object[]) {
            for (int i = 0; i < ((Object[]) (Object[]) obj).length; i++)
                sb.append(((Object[]) (Object[]) obj)[i]).append(", ");

            if (sb.length() > 0)
                sb.delete(sb.length() - 2, sb.length());
        } else {
            sb.append(obj.toString());
        }
        if (autoQuote && sb.length() > 0
                && (sb.charAt(0) != '[' || sb.charAt(sb.length() - 1) != ']')
                && (sb.charAt(0) != '{' || sb.charAt(sb.length() - 1) != '}'))
            sb.insert(0, "[").append("]");
        return sb.toString();
    }
}
