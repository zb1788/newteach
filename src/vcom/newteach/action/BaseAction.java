package vcom.newteach.action;


public class BaseAction {
    public static String SUCCESS = "success";
    public static String ERROR = "error";

    /**
     * ֱ��ת��success����
     *
     * @return
     */
    public String transit(String m, javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) {
        return SUCCESS;
    }
}
