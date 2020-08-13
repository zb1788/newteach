package vcom.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

public class HttpClient {
    private static Logger log = Logger.getLogger(HttpClient.class);

    public static void main(String[] arg) throws Exception {
        Map map = new HashMap();
        map.put("dataType", "1");// 2����ϸ��Ϣ��1������
        map.put("service", "04");
        map.put("command", "desc1");
        map.put("startTime", "");
        map.put("endTime", "");
        map.put("func", "desc");
        String xml = "";
        String data = "{\"userpwd\":\"\",\"username\":\"76dc0da68c528ae6\",\"sendTo\":[{\"tel\":\"\",\"username\":\"555555\"}],\"busId\":\"7\",\"subject\":\"%25E5%2593%2588%25E5%2593%2588%253A%25E5%2590%2591%25E6%2582%25A8%25E6%258E%25A8%25E8%258D%2590%25E8%25B5%2584%25E6%25BA%2590%255B%25E3%2580%258A%25E5%2594%25B1%25E5%2593%258D%25E8%2587%25AA%25E4%25BF%25A1%25E4%25B9%258B%25E6%25AD%258C%25E3%2580%258B%25E5%258F%2582%25E8%2580%2583%25E6%2595%2599%25E6%25A1%2588%2B%255D\",\"command\":\"sendMsg\",\"sendType\":\"3\",\"isPush\":\"0\",\"msg\":\"%253CA%2Bhref%253D%2527http%253A%252F%252F192.168.141.129%252Fmypls%252Fyoujiaoplay%252FyouJiaoPlay.do%253Fdata%253D%25257B%252522schoolId%252522%253A%252522410101000001%252522%252C%252522username%252522%253A%252522555555%252522%252C%252522areaId%252522%253A%2525221.1.1%252522%252C%252522rcode%252522%253A%25252220100301150346113760563297774%252522%252C%252522type%252522%253A%2525221%252522%252C%252522bodyId%252522%253A%252522%252522%252C%252522cusip%252522%253A%252522192.168.141.129%252522%252C%252522filetype%252522%253A%2525221%252522%25257D%2527%2Btarget%253D_blank%253E%25E3%2580%258A%25E5%2594%25B1%25E5%2593%258D%25E8%2587%25AA%25E4%25BF%25A1%25E4%25B9%258B%25E6%25AD%258C%25E3%2580%258B%25E5%258F%2582%25E8%2580%2583%25E6%2595%2599%25E6%25A1%2588%2B%253C%252FA%253E%25E7%259A%2584%25E4%25BD%258D%25E7%25BD%25AE%25E5%259C%25A8%253A%25E7%258F%25AD%25E7%258F%25AD%25E9%2580%259A.%25E4%25B8%2583%25E5%25B9%25B4%25E7%25BA%25A7.%25E4%25B8%258A%25E5%25AD%25A6%25E6%259C%259F.%25E8%25AF%25AD%25E6%2596%2587.%25E4%25BA%25BA%25E6%2595%2599%25E7%2589%2588.1%2B%25E5%259C%25A8%25E5%25B1%25B1%25E7%259A%2584%25E9%2582%25A3%25E8%25BE%25B9-%253E%25E5%25B7%25A9%25E5%259B%25BA%25E5%25A4%258D%25E4%25B9%25A0-%253E%25E5%25B7%25A9%25E5%259B%25BA%25E5%25A4%258D%25E4%25B9%25A0\"}";
        // String
        // data="{\"userpwd\":\"\",\"username\":\"76dc0da68c528ae6\",\"sendTo\":[{\"tel\":\"\",\"username\":\"555555\"}],\"busId\":\"7\",\"subject\":\"xxx\",\"command\":\"sendMsg\",\"sendType\":\"3\",\"isPush\":\"0\",\"msg\":\"xxxxx\"}";
        data = "data=" + data;
        try {
            // xml =
            // HttpClient.readURL("http://192.168.144.246/viManage/VIHttpService?icode=MAIL.SENDMSG.01&reqEncoding=GBK",
            // 20000, null,"", data, "","");
            // HttpClient.readURL("http://192.168.144.205/src/mailInterFace.php",
            // 20000, null,"", data, "","");
            Map<String, String> mapx = new HashMap<String, String>();
            map.put("jsonMessage", "ss");
            xml = HttpClient
                    .readURLByParamEncode(
                            "http://192.168.163.53:80/interfaces/generateMultiResPack.do",
                            mapx, null, "gbk");

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println(xml);

    }

    public static String readURL(String url, int timeout,
                                 Map<String, String> map, String mess, String command,
                                 String service, String myUrl) {
        log.info("url=" + url);
        String sTotalString;
        sTotalString = "";
        HttpURLConnection httpConn = null;
        PrintWriter out = null;
        BufferedReader in = null;
        try {
            URL httpurl = new URL(url);
            httpConn = (HttpURLConnection) httpurl.openConnection();
            httpConn.setConnectTimeout(timeout);
            httpConn.setReadTimeout(timeout);

            httpConn.setRequestMethod("POST");

            // httpConn.setRequestProperty("content-type", "application/xml;");
            // httpConn.setRequestProperty("Content-type", "text/html");

            httpConn.setRequestProperty("accept", "*/*");
            httpConn.setRequestProperty("connection", "Keep-Alive");
            httpConn.setRequestProperty("command", command);
            httpConn.setRequestProperty("service", service);
            httpConn.setRequestProperty("url", myUrl);
            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            // httpConn.setRequestProperty("Accept-Encoding", "gzip");
            // // Object obj= httpConn.getRequestProperty("Accept-Encoding");
            // Object x2=httpConn.getRequestProperties();
            // System.out.println(obj);
            // System.out.println(x2);
            // ���÷��Ͳ���
            if (map != null) {
                String param = "";
                out = new PrintWriter(httpConn.getOutputStream());
                Set<String> set = map.keySet();
                for (String key : set)
                    param += "&" + key + "=" + URLEncoder.encode(map.get(key), "UTF-8");
                param = param.replaceFirst("^\\&", "");
                log.info("param=" + param);
                out.print(param);
                out.flush();

            }

            if (mess != null) {
                httpConn.setRequestProperty("Content-Length", String
                        .valueOf(mess.length()));
                out = new PrintWriter(httpConn.getOutputStream());
                out.print(mess);
                out.flush();

            }
            log.info(httpConn.getResponseCode());
            in = new BufferedReader(new InputStreamReader(httpConn
                    .getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                sTotalString += line;
            }
            return sTotalString;
        } catch (Exception e) {
            // e.printStackTrace();
            log.error(e + "url=" + url);
            return null;
        } finally {
            if (out != null)
                out.close();
            if (in != null)
                try {
                    in.close();
                } catch (IOException e) {

                }
            httpConn.disconnect();

        }
    }

    public static String readURL(String url, Map<String, String> map,
                                 String mess) {
        String sTotalString;
        sTotalString = "";
        HttpURLConnection httpConn = null;
        PrintWriter out = null;
        BufferedReader in = null;
        try {
            URL httpurl = new URL(url);
            httpConn = (HttpURLConnection) httpurl.openConnection();
            httpConn.setConnectTimeout(5000);
            httpConn.setReadTimeout(5000);
            // headers.add(new Header("User-Agent", "Mozilla/4.0 (compatible;
            // MSIE 7.0; Windows NT 5.1)"));

            httpConn.setRequestMethod("POST");
            httpConn.setUseCaches(false);
            httpConn.setRequestProperty("content-type", "text/xml;utf-8");
            httpConn.setRequestProperty("accept", "*/*");
            httpConn.setRequestProperty("connection", "Keep-Alive");
            // httpConn.setRequestProperty("User-Agent","Mozilla/4.0
            // (compatible; MSIE 7.0; Windows 5.1)");
            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            // ���÷��Ͳ���
            if (map != null) {
                Set<String> set = map.keySet();
                for (String key : set) {
                    httpConn.setRequestProperty(key, map.get(key));
                }
            }
            if (mess != null) {
                httpConn.setRequestProperty("Content-Length", String
                        .valueOf(mess.length()));
                out = new PrintWriter(httpConn.getOutputStream());
                out.print(mess);
                out.flush();
                // out.close();
            }
            in = new BufferedReader(new InputStreamReader(httpConn
                    .getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                sTotalString += line;
            }

            return sTotalString;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (out != null)
                out.close();
            if (in != null)
                try {
                    in.close();
                } catch (IOException e) {

                }
            httpConn.disconnect();

        }
    }

    public static String readURLByParamEncode(String url,
                                              Map<String, String> map, String mess, String paramEncode) {
        String sTotalString;
        sTotalString = "";
        HttpURLConnection httpConn = null;
        PrintWriter out = null;
        BufferedReader in = null;
        try {
            URL httpurl = new URL(url);
            httpConn = (HttpURLConnection) httpurl.openConnection();
            httpConn.setConnectTimeout(5000);
            httpConn.setReadTimeout(5000);

            httpConn.setRequestMethod("POST");

            // httpConn.setRequestProperty("content-type", "application/xml;");
            // httpConn.setRequestProperty("Content-type", "text/html");

            httpConn.setRequestProperty("accept", "*/*");
            httpConn.setRequestProperty("connection", "Keep-Alive");

            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            // ���÷��Ͳ���
            if (map != null) {
                String param = "";
                out = new PrintWriter(httpConn.getOutputStream());
                Set<String> set = map.keySet();
                for (String key : set)
                    param += "&" + key + "="
                            + URLEncoder.encode(map.get(key), paramEncode);
                param = param.replaceFirst("^\\&", "");
                log.info("param=" + param);
                out.print(param);
                out.flush();
                // out.close();
            }

            if (mess != null) {
                httpConn.setRequestProperty("Content-Length", String
                        .valueOf(mess.length()));
                out = new PrintWriter(httpConn.getOutputStream());
                out.print(mess);

                out.flush();
                // out.close();
            }
            log.info(httpConn.getResponseCode());
            in = new BufferedReader(new InputStreamReader(httpConn
                    .getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                sTotalString += line;
            }
            // in.close();
            // httpConn.disconnect();
            return sTotalString;
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e + "url=" + url);
            return null;
        } finally {
            if (out != null)
                out.close();
            if (in != null)
                try {
                    in.close();
                } catch (IOException e) {

                }
            httpConn.disconnect();

        }
    }

    public static String readURLByParamEncode(String url,
                                              Map<String, String> map, String mess, String paramEncode,
                                              int timeout) {
        String sTotalString;
        sTotalString = "";
        HttpURLConnection httpConn = null;
        BufferedReader in = null;
        PrintWriter out = null;
        try {
            URL httpurl = new URL(url);
            httpConn = (HttpURLConnection) httpurl.openConnection();
            httpConn.setConnectTimeout(timeout);
            httpConn.setReadTimeout(timeout);

            httpConn.setRequestMethod("POST");

            // httpConn.setRequestProperty("content-type", "application/xml;");
            // httpConn.setRequestProperty("Content-type", "text/html");

            httpConn.setRequestProperty("accept", "*/*");
            httpConn.setRequestProperty("connection", "Keep-Alive");

            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            log.info("url=" + url);
            // ���÷��Ͳ���
            if (map != null) {
                String param = "";
                out = new PrintWriter(httpConn.getOutputStream());
                Set<String> set = map.keySet();
                for (String key : set)
                    param += "&" + key + "="
                            + URLEncoder.encode(map.get(key), paramEncode);
                param = param.replaceFirst("^\\&", "");
                log.info("param=" + param);
                out.print(param);
                out.flush();

            }

            if (mess != null) {
                httpConn.setRequestProperty("Content-Length", String
                        .valueOf(mess.length()));
                out = new PrintWriter(httpConn.getOutputStream());
                out.print(mess);
                out.flush();

            }
            log.info(httpConn.getResponseCode());
            in = new BufferedReader(new InputStreamReader(httpConn
                    .getInputStream(), paramEncode));
            String line;
            while ((line = in.readLine()) != null) {
                sTotalString += line;
            }
            return sTotalString;
        } catch (Exception e) {
            //e.printStackTrace();
            log.error(e + "url=" + url);
            return null;
        } finally {
            if (out != null)
                out.close();
            if (in != null)
                try {
                    in.close();
                } catch (IOException e) {

                }
            httpConn.disconnect();
        }
    }

    public static String readURL(String url, Map<String, String> map,
                                 String mess, String command, String service, String myUrl,
                                 int outtime) throws Exception {
        String sTotalString;
        HttpURLConnection httpConn = null;
        BufferedReader in = null;
        PrintWriter out = null;
        try {
            sTotalString = "";
            URL httpurl = new URL(url);
            httpConn = (HttpURLConnection) httpurl
                    .openConnection();
            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            httpConn.setConnectTimeout(outtime);
            httpConn.setReadTimeout(outtime);

            httpConn.setRequestMethod("POST");
            httpConn.setRequestProperty("content-type", "application/xml;");
            httpConn.setRequestProperty("accept", "*/*");
            httpConn.setRequestProperty("connection", "Keep-Alive");
            // httpConn.setRequestProperty("command",command);
            // httpConn.setRequestProperty("service",service);
            // httpConn.setRequestProperty("url",myUrl);
            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            // ���÷��Ͳ���
            if (map != null) {
                Set<String> set = map.keySet();
                log.info("�������£�");
                for (String key : set) {

                    log.info(key + " =  " + map.get(key));
                    httpConn.setRequestProperty(key, map.get(key));
                }
            }
            if (mess != null) {
                httpConn.setRequestProperty("Content-Length", String
                        .valueOf(mess.length()));
                out = new PrintWriter(httpConn.getOutputStream());
                out.print(mess);
                out.flush();

            }
            in = new BufferedReader(new InputStreamReader(
                    httpConn.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                sTotalString += line;
            }
        } finally {
            if (out != null)
                out.close();
            if (in != null)
                try {
                    in.close();
                } catch (IOException e) {

                }
            httpConn.disconnect();

        }
        return sTotalString;

    }

}
