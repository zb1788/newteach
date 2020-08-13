/**
 * @��˾���ƣ�VCOM
 * @�ļ�����ReportAction.java
 * @���ߣ�������
 * @�汾�ţ�1.0
 * @�������ڣ�2017��12��8��
 * @����������
 */

package vcom.newteach.report;

import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import vcom.util.InterfaceCfg;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class ReportAction {
    protected static Logger log = Logger.getLogger(ReportAction.class);


    public String praiseStudentReport(String method, HttpServletRequest request, HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");

        String reUrl = request.getParameter("reUrl");
        String uid = request.getParameter("uid");
        String messageBody = request.getParameter("messageBody");


        if (messageBody == null) {
            return "fail";
        }
        String rdata = "{'success':0,uid:'" + uid + "'}";


        RebbitMqBean rebbitMqBean = new RebbitMqBean();

        if (reUrl != null) {
            try {
                String success = rebbitMqBean.rabbitTemplateSend("praiseStudentQueue", messageBody);
                rdata = "{'success':" + success + ",uid:'" + uid + "'}";
            } catch (Exception e) {
                log.error("praiseStudentQueue", e);
            }
            rdata = URLEncoder.encode(rdata);
            if (reUrl.indexOf("?") > 1) {
                reUrl = reUrl + "&rdata=" + rdata;
            } else {
                reUrl = reUrl + "?rdata=" + rdata;
            }
            try {
                response.sendRedirect(reUrl);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } else {
            try {
                messageBody = URLDecoder.decode(messageBody, "UTF-8");

                log.info("messageBody-----------start");
                log.info(messageBody);

                JSONObject obj = JSONObject.fromObject(messageBody);
                Map m = obj;

                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Date date = new Date();
                String dstr = sdf.format(date);

                m.put("createTime", dstr);

                log.info(((JSONObject) m).toString());
                log.info("mseesageBody-----------end");
                String msg = ((JSONObject) m).toString();
                messageBody = URLEncoder.encode(msg, "UTF-8");

            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            try {
                String success = rebbitMqBean.rabbitTemplateSend("praiseStudentQueue", messageBody);
                rdata = "{'success':" + success + ",uid:'" + uid + "'}";
            } catch (Exception e) {
                log.error("praiseStudentQueue", e);
            }

            response.setContentType("text/json;charset=utf-8");
            try {
                response.getWriter().print(rdata);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    public static void main(String args[]) {
        String messageBody = "{'createTime':'20180820','students':[{\"trueName\":\"1118����22\",\"userName\":\"41010110133048\",\"avatarUrl\":\"\"},{\"trueName\":\"studentOLx\",\"userName\":\"41010110068886\",\"avatarUrl\":\"\"}],'classId':'147098596789321647','sendType':'1','teacherAccount':'41010100010128','teacherName':'�Ų�','subjectCode':'0001','subjectName':'null','praiseType':'2','pariseName':'��������','busId':'15','templateContent':''}";

        System.out.println(InterfaceCfg.getSysPath("RABBITMQ_IP"));

        RebbitMqBean rebbitMqBean = new RebbitMqBean();

        String success = rebbitMqBean.rabbitTemplateSend("praiseStudentQueue", messageBody);

        System.out.println(success);
    }
}

