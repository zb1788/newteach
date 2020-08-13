package vcom.newteach.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LogAction {
    public String WriteLog(String method, HttpServletRequest request, HttpServletResponse response) {
        String content = request.getParameter("content");
        String filename = request.getParameter("filename");
        String basePath = request.getSession().getServletContext().getRealPath("/");
        String filepath = basePath + filename;
        vcom.util.WriteLog.write(content, filepath);
        return null;
    }
}
