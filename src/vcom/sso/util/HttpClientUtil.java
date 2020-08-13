package vcom.sso.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import org.apache.log4j.Logger;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;

import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.StringPart;

public class HttpClientUtil {

    static Logger logger = Logger.getLogger(HttpClientUtil.class.getName());
    //˽�б�����httpЭ������
    private static final String HTTP_PROTOCOL = "http://";
    //�����Ͷ˿ڼ�ָ���
    private static final String HTTP_COLON = ":";
    private static final String CHARACTER_SET_VALUE = "ISO-8859-1";

    private String servIp = null;
    private String servPort = "80";
    private String appName = null;
    private String reqUri = null;
    private String url;
    private String[] responseInfo = new String[2];


    public String convertStreamToString(InputStream is) {
        /*
         * To convert the InputStream to String we use the BufferedReader.readLine()
         * method. We iterate until the BufferedReader return null which means
         * there's no more data to read. Each line will appended to a StringBuilder
         * and returned as String.
         */
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();

        String line = null;
        try {
            while ((line = reader.readLine()) != null) {
                sb.append(line + "\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                is.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return sb.toString();
    }

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

        String resultbody = this.convertStreamToString(get.getResponseBodyAsStream());

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

        String resultbody = this.convertStreamToString(get.getResponseBodyAsStream());

        logger.info(resultbody);
        //�ͷ�����
        get.releaseConnection();

        //������Ӧ���
        return resultbody;
    }

    public String[] post(HashMap hm) throws Exception {
        //ȡ��һ��set�༯���������key
        Set set = hm.keySet();
        //��ȡһ��set�༯��ָ��
        Iterator it = set.iterator();
        //ʵ����һ��part�������󣬳���Ϊ������������
        NameValuePair[] paramsArray = new NameValuePair[set.size()];
        Part[] parts = new Part[set.size()];
        //ѭ��������
        int i = 0;
        while (it.hasNext()) {
            String key = (String) it.next();
            if (key != null) {
                //����������ֵ��������
                parts[i] = new StringPart(key, (String) hm.get(key), CHARACTER_SET_VALUE);
                logger.info("key:value:" + key + "," + (String) hm.get(key));
                paramsArray[i] = new NameValuePair(key, (String) hm.get(key));
            }
            i++;
        }

        HttpClient httpclient = new HttpClient();
        httpclient.setConnectionTimeout(3000);
        httpclient.setTimeout(12000);

        String url = "http://" + servIp + ":" + servPort;
        if (appName != null) {
            url += "/" + appName;
        }
        if (reqUri != null) {
            url += "/" + reqUri;
        }

        logger.info(url);
        PostMethod post = new PostMethod(url);
        post.addParameters(paramsArray);
        post.setRequestBody(paramsArray);

        //ִ��http post����
        int statusCode = httpclient.executeMethod(post);

        logger.info(statusCode);

        String resultbody = this.convertStreamToString(post.getResponseBodyAsStream());

        logger.info(resultbody);
        //�ͷ�����
        post.releaseConnection();

        responseInfo[0] = String.valueOf(statusCode);
        responseInfo[1] = resultbody;
        return responseInfo;
    }

    public String[] post2(HashMap hm) throws Exception {
        //ȡ��һ��set�༯���������key
        Set set = hm.keySet();
        //��ȡһ��set�༯��ָ��
        Iterator it = set.iterator();
        //ʵ����һ��part�������󣬳���Ϊ������������
        NameValuePair[] paramsArray = new NameValuePair[set.size()];
        Part[] parts = new Part[set.size()];
        //ѭ��������
        int i = 0;
        while (it.hasNext()) {
            String key = (String) it.next();
            if (key != null) {
                //����������ֵ��������
                parts[i] = new StringPart(key, (String) hm.get(key), "GBK");
                logger.info("key:value:" + key + "," + (String) hm.get(key));
                paramsArray[i] = new NameValuePair(key, (String) hm.get(key));
            }
            i++;
        }

        HttpClient httpclient = new HttpClient();
        httpclient.setConnectionTimeout(3000);
        httpclient.setTimeout(12000);


        logger.info(url);
        PostMethod post = new PostMethod(url);
        post.addParameters(paramsArray);
        post.setRequestBody(paramsArray);

        //ִ��http post����
        int statusCode = httpclient.executeMethod(post);

        logger.info(statusCode);

        String resultbody = this.convertStreamToString(post.getResponseBodyAsStream());

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
        HttpClientUtil util = new HttpClientUtil();
		/*
		util.servIp="192.168.15.122";
		util.setAppName("ehcacheClaster");
		util.setReqUri("/servlet/PutCache");
		HashMap params=new HashMap();
		params.put("key", "key1");
		params.put("value", "value1");
		try
		{
			//util.get();
			String[] rtn=util.post(params);
			logger.info(rtn[0]);
			logger.info(rtn[1]);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		*/
        try {
            //String url1="http://192.168.104.191/tms/interface/querySchool.jsp?data={\"lastLogId\":0,\"queryType\":\"schoolCount\"}";
            String url2 = "http://192.168.104.191/tms/interface/querySchoolClass.jsp?data={\"lastLogId\":0,\"queryType\":\"schoolClassCount\"}";
            String url3 = "http://192.168.104.191/tms/interface/queryStudent.jsp?data={\"lastLogId\":0,\"queryType\":\"studentCount\"}";
            //util.get(url1);
            util.get(url2);
            util.get(url3);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
