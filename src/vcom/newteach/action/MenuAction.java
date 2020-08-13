package vcom.newteach.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import org.apache.commons.beanutils.BeanComparator;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import vcom.newteach.pojo.Menu;
import vcom.sso.vo.AuthResult;


/**
 * ������ĿAction
 *
 * @author root
 */
public class MenuAction {

    private static final long serialVersionUID = 1L;
    private static Logger log = Logger.getLogger(MenuAction.class);

    /**
     * ����ڿβ˵��û��Զ���˵��б�
     */
    public String getSKCustomMenuXml(String method, HttpServletRequest request, HttpServletResponse response) {

        Integer currSys = 1;// ��ǰϵͳ'0-���� 1-�ڿ�',
        Integer menubelong = 1;// '0-���� 1-�ڿ�',
        Integer menutype = 0; // '0-����Ŀ 1-����Ŀ',

        String jsoncallback = request.getParameter("jsoncallback");
        JSONArray ja = null;
        ArrayList<Menu> menuList = new ArrayList<Menu>();

        AuthResult authResult = (AuthResult) request.getSession().getAttribute("authResult");
        if (authResult == null) {
            request.setAttribute("errorMessage", "No Login!");
            return "error";
        }
        vcom.sso.vo.SysModule[] menuArray = authResult.getUserAuthoritys()[0].getModules();
        for (vcom.sso.vo.SysModule module : menuArray) {// ��װ�Զ���˵�
            if (true) {
                Menu menu = new Menu();
                menu.setMenuid(module.getModuleid());
                menu.setName(module.getModulename());
                menu.setSelected(1);
                if (module.getOrderid() != null) {
                    menu.setSortnum(module.getOrderid().intValue());
                }
                menu.setJsFunction(module.getModuleurl());
                menu.setJsFunction(module.getModuleurl());
                menu.setC1(module.getC1());
                menu.setC2(module.getC2());
                menu.setC3(module.getC3());
                menu.setC4(module.getC4());
                menuList.add(menu);
            }
        }
        if (null != menuList) {
            Comparator sort = new BeanComparator("sortnum");
            Collections.sort(menuList, sort);
            ja = JSONArray.fromObject(menuList);
            String json = null;
            if (jsoncallback != null && jsoncallback.trim().length() > 0) {
                json = jsoncallback + '(' + ja.toString() + ')';
            }
            response.setContentType("text/html;charset=gbk");
            PrintWriter out = null;
            try {
                out = new PrintWriter(response.getOutputStream());
            } catch (IOException e) {
                e.printStackTrace();
            }
            if (out != null) {
                out.print(json);
                out.flush();
                out.close();
            }
        } else {
            request.setAttribute("errorMessage", "No Menu!");
            return "error";
        }
        return null;
    }
}
