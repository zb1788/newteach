<%@ page language="java"
         import="java.util.* ,vcom.util.InterfaceCfg,net.sf.json.JSONArray,net.sf.json.JSONObject,java.io.*,java.net.*"
         pageEncoding="GBK" %>
<%!
    /**
     * <p>
     * ����:java ����Http����
     * </p>
     *
     * @param weburl ��ַ
     * @param para   post����:��&�ָ�Ĳ����ַ���
     * @param mothed ����ʽ:1 post ����get
     * @param encoding ����Ĭ��GBK
     * @return
     */
    public String getPostUrl(String weburl, String para, int mothed, String encoding) {
        weburl = weburl.replace(" ", "%20");
        if (weburl == null || weburl.trim().length() <= 0) {
            return null;
        }
        if (mothed < 0 && mothed > 1) {
            mothed = 0;
        }
        if (encoding == null || encoding.trim().length() == 0) {
            encoding = "GBK";
        }
        URL url = null;
        HttpURLConnection urlcon = null;
        java.io.BufferedReader breader = null;
        java.io.InputStream in = null;
        StringBuffer sb = new StringBuffer();
        sb.append("");
        try {
            url = new URL(weburl);
            urlcon = (HttpURLConnection) url.openConnection();
            urlcon.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3");
            urlcon.setRequestProperty("Connection", "keep-alive");
            urlcon.setDoOutput(true);

            if (mothed == 1) {
                // ��post��ʽ����
                urlcon.setRequestMethod("POST");
                // װ�ò���
                if (para != null && para.trim().length() > 0) {
                    urlcon.getOutputStream().write(para.getBytes());
                    urlcon.getOutputStream().flush();
                    urlcon.getOutputStream().close();
                }
            } else {
                // ��wget��ʽ����
                urlcon.setRequestMethod("GET");
            }
            //urlcon.setConnectTimeout(timeout * 1000);
            //urlcon.setReadTimeout(timeout * 1000);
            urlcon.setFollowRedirects(true);

            String aen = urlcon.getContentEncoding();

            String text_e = urlcon.getHeaderField("Content-Type");

            // ��ȡ��Ӧ����
            int code = urlcon.getResponseCode();

            // ��ȡҳ������
            in = urlcon.getInputStream();

            // gzipѹ�������ʽ֧��
            //breader = new BufferedReader(new InputStreamReader(new GZIPInputStream(in), encoding));

            breader = new BufferedReader(new InputStreamReader(in, encoding));
            String str = breader.readLine();

            while (str != null) {
                sb.append(str + "\n");
                str = breader.readLine();
            }
        } catch (ConnectException e) {
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;

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
        return sb.toString();
    }
%>
<%
    /*
    ��ת ajax���� post��ʽ ����ӿ�
    V1.2 ֧�� sys+path / code ��ʽ
    V1.3 150727 ����version�������жϸ��£�֧�� path / sys+path / code 3�ַ�ʽ
    */
//String path = request.getContextPath();
//String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

//��ʾ��ҳ�汾�ж��Ƿ����
    if ("version".equals(request.getParameter("version"))) {
        out.print("V1.3 150727");
        return;
    }

    String code = request.getParameter("code");
    String sys = request.getParameter("sys");
    String path = request.getParameter("path");
    String encode = request.getParameter("encode");
    String url = null;
    if (encode != null && encode.trim().length() > 0) {
        encode = "GBK";
    }
    if (sys == null || sys.trim().length() == 0) {
        out.print("sys is null!");
    } else {
        if (code == null || code.trim().length() == 0) {
            if (path != null && path.trim().length() > 0) {
                if (sys != null && sys.trim().length() > 0) {
                    url = InterfaceCfg.getSysPath(sys) + path;
                } else {
                    url = path;
                }
            }
        } else {
            url = InterfaceCfg.getIpUrlByICode(code, sys);
        }
    }
    System.out.println("url:" + url);
    if (url != null && url.length() > 0) {
        if ("UB".equals(sys)) {
            Random rand = new Random();
            int randNumber = rand.nextInt(99999 - 10000 + 1) + 10000;
            Map map = new HashMap();
            map.put("a", request.getParameter("a"));
            map.put("ac", request.getParameter("ac"));
            map.put("ad", String.valueOf(randNumber));
            map.put("at", request.getParameter("at"));
            map.put("c", request.getParameter("c"));
            map.put("n", request.getParameter("n"));
            map.put("ut", request.getParameter("ut"));
            map.put("i", request.getParameter("i"));

            JSONObject jsObject = JSONObject.fromObject(map);
            //System.out.println("papram:"+jsObject.toString());
            url = url + "?p=" + jsObject.toString();
            System.out.println("url:" + url);
            out.print(getPostUrl(url, "", 0, encode));
        } else {
            Map paramap = new HashMap();
            Enumeration enu = request.getParameterNames();
            int ci = 0;
            StringBuffer paramStr = new StringBuffer();
            while (enu.hasMoreElements()) {
                String paraName = (String) enu.nextElement();
                ci++;
                if (!paraName.equals("path") && !paraName.equals("code") && !paraName.equals("sys") && !paraName.equals("encode")) {
                    paramap.put(paraName, request.getParameter(paraName));
                    if (ci > 1) {
                        paramStr.append("&");
                    }
                    paramStr.append(paraName + "=" + request.getParameter(paraName));
                }
            }
            System.out.println("param:" + paramStr.toString());
            out.print(getPostUrl(url, paramStr.toString(), 1, encode));
        }
        //out.print(HttpClient.readURL(url, 3000, null, "", "", "", ""));
    }
%>