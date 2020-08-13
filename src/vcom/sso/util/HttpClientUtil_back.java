package vcom.sso.util;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import org.apache.log4j.Logger;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.StringPart;

public class HttpClientUtil_back {

    static Logger logger = Logger.getLogger(HttpClientUtil_back.class.getName());
    //˽�б�����httpЭ������
    private static final String HTTP_PROTOCOL = "http://";
    //�����Ͷ˿ڼ�ָ���
    private static final String HTTP_COLON = ":";
    private static final String CHARACTER_SET_VALUE = "ISO-8859-1";

    private String servIp = null;
    private String servPort = "80";
    private String appName = null;
    private String reqUri = null;
    private String[] responseInfo = new String[2];

    public String get() throws Exception {
        Part[] parts = new Part[0];

        String url = "http://" + servIp + ":" + servPort;
        if (appName != null) {
            url += "/" + appName;
        }
        if (reqUri != null) {
            url += "/" + reqUri;
        }
        logger.info(url);
        //���http�ͻ���
        HttpClient httpclient = new HttpClient();

        GetMethod get = new GetMethod(url);

        int statusCode = httpclient.executeMethod(get);

        logger.info(statusCode);

        String resultbody = getPostGetValue(get, null);

        logger.info(resultbody);
        //�ͷ�����
        get.releaseConnection();

        //������Ӧ���
        return resultbody;
    }

    public String get(String url) throws Exception {
        Part[] parts = new Part[0];
        logger.info(url);
        //���http�ͻ���
        HttpClient httpclient = new HttpClient();

        GetMethod get = new GetMethod(url);

        int statusCode = httpclient.executeMethod(get);

        logger.info(statusCode);

        String resultbody = getPostGetValue(get, null);

        logger.info(resultbody);
        //�ͷ�����
        get.releaseConnection();

        //������Ӧ���
        return resultbody;
    }

    private String getPostGetValue(GetMethod get, PostMethod post) throws Exception {
        String a = "";
        int c = 0;
        Reader reader = null;
        char b[] = new char[1024];
        if (get != null) {
            reader = new InputStreamReader(
                    get.getResponseBodyAsStream(), get.getResponseCharSet());
            while ((c = reader.read(b)) > 0) {
                a += String.valueOf(b, 0, c);
            }
        } else if (post != null) {
            reader = new InputStreamReader(
                    post.getResponseBodyAsStream(), post.getResponseCharSet());
            while ((c = reader.read(b)) > 0) {
                a += String.valueOf(b, 0, c);
            }
        }
        return a;
    }

    public String[] post(HashMap hm) throws Exception {
        //ȡ��һ��set�༯���������key
        Set set = hm.keySet();
        //��ȡһ��set�༯��ָ��
        Iterator it = set.iterator();
        //ʵ����һ��part�������󣬳���Ϊ������������
        Part[] parts = new Part[set.size()];
        //ѭ��������
        int i = 0;
        while (it.hasNext()) {
            String key = (String) it.next();
            if (key != null) {
                //����������ֵ��������
                parts[i] = new StringPart(key, (String) hm.get(key), CHARACTER_SET_VALUE);
                logger.info("key:value:" + key + "," + (String) hm.get(key));
            }
            i++;
        }

        HttpClient httpclient = new HttpClient();
        String url = "http://" + servIp + ":" + servPort;
        if (appName != null) {
            url += "/" + appName;
        }
        if (reqUri != null) {
            url += "/" + reqUri;
        }

        logger.info(url);
        PostMethod post = new PostMethod(url);

        NameValuePair simcard = new NameValuePair("simcard", "1330227");
        post.setRequestBody(new NameValuePair[]{simcard});

        //ִ��http post����
        int statusCode = httpclient.executeMethod(post);

        logger.info(statusCode);

        String resultbody = getPostGetValue(null, post);

        logger.info(resultbody);
        //�ͷ�����
        post.releaseConnection();

        responseInfo[0] = String.valueOf(statusCode);
        responseInfo[1] = resultbody;
        return responseInfo;
    }

    public String getServIp() {
        return servIp;
    }

    public void setServIp(String servIp) {
        this.servIp = servIp;
    }

    public String getServPort() {
        return servPort;
    }

    public void setServPort(String servPort) {
        this.servPort = servPort;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }


    public String getReqUri() {
        return reqUri;
    }

    public void setReqUri(String reqUri) {
        this.reqUri = reqUri;
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        HttpClientUtil_back util = new HttpClientUtil_back();
        util.servIp = "192.168.15.122";
        util.setAppName("app2");
        util.setReqUri("index.jsp");
        HashMap params = new HashMap();
        params.put("utg", "sdffdfd");
        try {
            //util.get();
            util.post(params);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
