package vcom.newteach.action;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import vcom.util.HttpRequestTools;

public class PostAction {
    protected static Logger log = Logger.getLogger(PostAction.class);


    public String postData(String method, HttpServletRequest request, HttpServletResponse response) {
        String reUrl = request.getParameter("reUrl");
        String targetUrl = request.getParameter("targetUrl");
        String jsonStr = request.getParameter("jsonStr");


        if (jsonStr == null) {
            return "fail";
        }

        String param = "data=" + jsonStr;

//        String rdata="{'success':0}";

        log.info("targetuRL:" + targetUrl);

        log.info("targetuRL PARAM:" + param);
        String result = null;

        result = HttpRequestTools.sendPost(targetUrl, param, "gbk");

        if ("".equals(result)) {
            result = "{\"result\":0}";
        }

        log.info("Group Save Result:" + result);

        if (reUrl != null) {

            result = URLEncoder.encode(result);
            if (reUrl.indexOf("?") > 1) {
                reUrl = reUrl + "&data=" + result;
            } else {
                reUrl = reUrl + "?data=" + result;
            }
            try {
                log.info("Re Url:" + reUrl);
                response.sendRedirect(reUrl);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        return null;
    }
}
