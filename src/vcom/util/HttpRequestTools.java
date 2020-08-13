package vcom.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpRequestTools {

    /**
     * ��ָ��URL����GET����������
     *
     * @param url   ���������URL
     * @param param ����������������Ӧ���� name1=value1&name2=value2 ����ʽ��
     * @return URL ������Զ����Դ����Ӧ���
     */
    public static String sendGet(String url, String param, String encoding) {
        if (encoding == null || encoding.trim().length() == 0) {
            encoding = "UTF-8";
        } else if (encoding.toLowerCase() == "utf-8") {
            encoding = "UTF-8";
        } else if (encoding.toLowerCase() == "gbk") {
            encoding = "GBK";
        } else {
            encoding = "UTF-8";
        }
        String result = "";
        BufferedReader in = null;
        try {
            String urlNameString = "";
            if (!"".equals(param)) {
                urlNameString = url + "?" + param;
            } else {
                urlNameString = url;
            }
            URL realUrl = new URL(urlNameString);
            // �򿪺�URL֮�������
            HttpURLConnection connection = (HttpURLConnection) realUrl.openConnection();
            // ����ͨ�õ���������
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3");


            connection.setConnectTimeout(50000);
            connection.setReadTimeout(50000);
            // ����ʵ�ʵ�����
            connection.connect();
            /**
             // ��ȡ������Ӧͷ�ֶ�
             Map<String, List<String>> map = connection.getHeaderFields();
             // �������е���Ӧͷ�ֶ�
             for (String key : map.keySet()) {
             System.out.println(key + "--->" + map.get(key));
             }
             */
            // ���� BufferedReader����������ȡURL����Ӧ
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream(), encoding));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("����GET��������쳣��" + e);
            e.printStackTrace();
        }
        // ʹ��finally�����ر�������
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }

    /**
     * ��ָ�� URL ����POST����������
     *
     * @param url   ��������� URL
     * @param param ����������������Ӧ���� name1=value1&name2=value2 ����ʽ��
     * @return ������Զ����Դ����Ӧ���
     */
    public static String sendPost(String url, String param, String encoding) {
        PrintWriter out = null;
        BufferedReader in = null;
        String result = "";
        if (encoding == null || encoding.trim().length() == 0) {
            encoding = "UTF-8";
        } else if (encoding.toLowerCase() == "utf-8") {
            encoding = "UTF-8";
        } else if (encoding.toLowerCase() == "gbk") {
            encoding = "GBK";
        } else {
            encoding = "UTF-8";
        }
        try {
            URL realUrl = new URL(url);
            // �򿪺�URL֮�������
            HttpURLConnection conn = (HttpURLConnection) realUrl.openConnection();
            // ����ͨ�õ���������
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3");
            // ����POST�������������������
            conn.setDoOutput(true);
            conn.setDoInput(true);

            conn.setConnectTimeout(50000);
            conn.setReadTimeout(50000);
            // ��ȡURLConnection�����Ӧ�������
            out = new PrintWriter(conn.getOutputStream());
            // �����������
            out.print(param);
            // flush������Ļ���
            out.flush();
            // ����BufferedReader����������ȡURL����Ӧ
            in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), encoding));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("���� POST ��������쳣��" + e);
            e.printStackTrace();
        }
        //ʹ��finally�����ر��������������
        finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }

    public static void main(String[] args) {
//		String weburl = "http://192.168.151.126:8042/login/login";
//		String param = "username=admin&pwd=1111";
//    	String json= "";
//    	String weburl = "https:tmstest.yjt361.com/tms/interface/querySchoolClassGroup.jsp";
//    	String param = "data=";
//		
        //POST
//		String responsePost = HttpRequestTools.sendPost(weburl,param,"UTF-8");
//		System.out.println(responsePost);
//		JsonObject o = GsonTools.StringToJson(responsePost);
//		System.out.println(o.get("status").getAsString());
//		System.out.println(o.get("msg").getAsString());
    }

}
