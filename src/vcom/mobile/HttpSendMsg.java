package vcom.mobile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * http post������������
 *
 * @author zengfanxin
 */
public class HttpSendMsg {
    /**
     * ��ָ��URL����POST����������
     *
     * @param requestUrl     �����URL
     * @param requestHeadMap ����ͷ����Map����
     * @return msg �ύ������
     * @author zengfanxin
     */
    @SuppressWarnings(
            {"unchecked", "unused"})
    public String sendPost(String requestUrl, Map<String, Object> requestHeadMap, String msg) {

        PrintWriter printWriter = null;
        BufferedReader bufferedReader = null;
        StringBuffer responseResult = new StringBuffer();
        HttpURLConnection httpURLConnection = null;

        try {
            URL realUrl = new URL(requestUrl);

            // �򿪺�URL֮�������
            httpURLConnection = (HttpURLConnection) realUrl.openConnection();

            // ������������
            httpURLConnection.setRequestProperty("content-type", "text/xml;utf-8");
            httpURLConnection.setRequestProperty("accept", "*/*");
            httpURLConnection.setRequestProperty("connection", "Keep-Alive");
            httpURLConnection.setRequestProperty("Content-Length", String.valueOf(msg.length()));
            httpURLConnection.setRequestProperty("Accept-Charset", "utf-8");
            httpURLConnection.setRequestProperty("contentType", "utf-8");
            if (requestHeadMap != null && requestHeadMap.size() > 0) {
                Iterator it = requestHeadMap.entrySet().iterator();
                while (it.hasNext()) {
                    Map.Entry element = (Map.Entry) it.next();
                    httpURLConnection.setRequestProperty((String) element.getKey(), (String) element.getValue());
                }
            }

            // ����POST�������������������
            httpURLConnection.setRequestMethod("POST");
            httpURLConnection.setDoOutput(true);
            httpURLConnection.setDoInput(true);
            //httpURLConnection.

            // ���ӷ�����
            httpURLConnection.connect();

            // ��ȡURLConnection�����Ӧ�������
            printWriter = new PrintWriter(httpURLConnection.getOutputStream());

            // �����������
            if (msg != null && msg.length() > 0) {
                printWriter.write(msg);
            }

            // flush������Ļ���
            printWriter.flush();

            // ����ResponseCode�ж������Ƿ�ɹ�
            int responseCode = httpURLConnection.getResponseCode();
            System.out.println("responseCode:" + responseCode);
            if (responseCode != 200) {
                System.out.println("failure");
            }

            // ����BufferedReader����������ȡURL��ResponseData
            bufferedReader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream(), "UTF-8"));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                responseResult.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        } finally {
            try {
                if (printWriter != null) {
                    printWriter.close();
                }
                if (bufferedReader != null) {
                    bufferedReader.close();
                }

                httpURLConnection.disconnect();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return responseResult.toString();
    }

    public static String readURL(String url, Map<String, String> map, String mess, String command, String service,
                                 String myUrl, int outtime) throws Exception {
        String sTotalString;
        sTotalString = "";
        URL httpurl = new URL(url);
        HttpURLConnection httpConn = (HttpURLConnection) httpurl.openConnection();
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
            for (String key : set) {

                httpConn.setRequestProperty(key, map.get(key));
            }
        }
        if (mess != null) {
            httpConn.setRequestProperty("Content-Length", String.valueOf(mess.length()));
            PrintWriter out = new PrintWriter(httpConn.getOutputStream());
            out.print(mess);
            out.flush();
            out.close();
        }
        BufferedReader in = new BufferedReader(new InputStreamReader(httpConn.getInputStream()));
        String line;
        while ((line = in.readLine()) != null) {
            sTotalString += line;
        }
        in.close();
        httpConn.disconnect();
        return sTotalString;

    }

    /*
     * ʹ��ʵ������
     */
    public static void main(String args[]) throws IOException {
        // Map map = new HashMap();
        // HttpSendMsg sm = new HttpSendMsg();
        // String s =
        // sm.sendPost("http://192.168.15.125:8888/pls/interfaces/sourceMenuServer.do",null,"");
        // System.out.println(s);
    }

}
