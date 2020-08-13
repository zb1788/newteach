package vcom.newteach.dao;

import org.apache.commons.lang.StringUtils;
import vcom.newteach.pojo.PlsUserLoginLog;
import vcom.util.DaoUtil;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class UserLoginDao {

    /**
     * ���¶�ӦMAC��Account��pls_user_login_log����
     *
     * @param plsUserLoginLog
     * @return
     * @throws Exception
     */
    public String upLoginLog(PlsUserLoginLog plsUserLoginLog) throws Exception {
        if (plsUserLoginLog.getMac() == null) {
            return null;
        }
        DaoUtil dao = new DaoUtil();
        //��SQL�������滻������
        String mac = plsUserLoginLog.getMac().replaceAll("'", "��");

        String sql = "select * from pls_user_login_log where mac='" + plsUserLoginLog.getMac() + "'";

        if (plsUserLoginLog.getC1() != null && plsUserLoginLog.getC1().equals("2")) {
            sql = sql + " and c1='2'";
        } else {
            sql = sql + " and account='" + plsUserLoginLog.getAccount()
                    + "' and c1='1'";
        }
        sql += " order by lasttime desc";
        Map<String, String> rmap = dao.getSingleData(sql);

        // Broadcast	Examine exam=null;
        if (rmap != null) {
            ArrayList<Object> plist = new ArrayList<Object>();

            String upsql = "update pls_user_login_log set lasttime=?";
            plist.add(new Date());

            // c2==null��ʾû�н��а汾ѡ��
            String pwd = plsUserLoginLog.getPwd();
            if (pwd != null) {
                if (pwd.equals("null")) {
                    pwd = "";
                }
                upsql += ",pwd=?";
                plist.add(pwd);
            }
            String c2 = plsUserLoginLog.getC2();
            if (c2 != null && !c2.equals("")) {
                upsql += ",c2=?";
                plist.add(c2);
            }
            String c3 = plsUserLoginLog.getC3();
            if (c3 != null && !c3.equals("")) {
                upsql += ",c3=?";
                plist.add(c3);
            }
            String c6 = plsUserLoginLog.getC6();
            if (c6 != null && !c6.equals("")) {
                upsql += ",c6=?";
                plist.add(c6);
            }
            String templateId = plsUserLoginLog.getTemplateId();
            if (templateId != null) {
                upsql += ",templateid=?";
                plist.add(templateId);
            }
            String userName = plsUserLoginLog.getUserName();
            if (userName != null) {
                upsql += ",username=?";
                plist.add(userName);
            }

            upsql += " where pk_id='" + rmap.get("pk_id") + "'";
            ArrayList<Object[]> arrlist = new ArrayList<Object[]>();
            arrlist.add(plist.toArray());
            new DaoUtil().executePreparedSQL(upsql, arrlist);
        } else {
            Object[] parr = new Object[12];
            parr[0] = plsUserLoginLog.getMac();
            parr[1] = new Date();
            //�˺�
            if (plsUserLoginLog.getAccount() != null) {
                parr[2] = plsUserLoginLog.getAccount();
            }
            if (plsUserLoginLog.getPwd() != null) {
                parr[3] = plsUserLoginLog.getPwd();
            }
            if (plsUserLoginLog.getUserName() != null) {
                parr[4] = java.net.URLDecoder.decode(plsUserLoginLog.getUserName(), "UTF-8");
            }
            if (plsUserLoginLog.getTemplateId() != null) {
                parr[5] = plsUserLoginLog.getTemplateId();
            }
            if (plsUserLoginLog.getC1() != null) {
                parr[6] = plsUserLoginLog.getC1();
            }
            if (plsUserLoginLog.getC2() != null) {
                parr[7] = plsUserLoginLog.getC2();
            }
            if (plsUserLoginLog.getC3() != null) {
                parr[8] = plsUserLoginLog.getC3();
            }
            //�༶����
            if (plsUserLoginLog.getC4() != null) {
                parr[9] = java.net.URLDecoder.decode(plsUserLoginLog.getC4(), "UTF-8");
            }
            if (plsUserLoginLog.getC5() != null) {
                parr[10] = plsUserLoginLog.getC5();
            }
            //ѧУ����
            if (plsUserLoginLog.getC6() != null) {
                parr[11] = java.net.URLDecoder.decode(plsUserLoginLog.getC6(), "UTF-8");
            }
            ArrayList<Object[]> arrlist = new ArrayList<Object[]>();
            arrlist.add(parr);
            String insql = "insert into pls_user_login_log (pk_id, mac, lasttime,account, pwd, username,  templateid,  c1, c2, c3, c4, c5, c6)values(pls_user_login_log_seq.nextval,?,?,?,?,?,?,?,?,?,?,?,?)";
            new DaoUtil().executePreparedSQL(insql, arrlist);
        }
        return "��ӳɹ�";
    }

    /**
     * ��ѯ��½��ʷpls_user_login_log,�ɸ���mac,account,username,templetid,c1
     *
     * @param plsUserLoginLog<PlsUserLoginLog>
     * @return
     * @throws Exception
     */
    public List<PlsUserLoginLog> queryLoginLog(PlsUserLoginLog plsUserLoginLog) throws Exception {
        String sql = "select * from pls_user_login_log where 1=1 ";
        if (plsUserLoginLog != null) {
            if (StringUtils.isNotBlank(plsUserLoginLog.getMac())) {
                //��SQL�������滻������
                String mac = plsUserLoginLog.getMac().replaceAll("'", "��");
                sql += " and mac='" + mac + "'";
            }
            if (StringUtils.isNotBlank(plsUserLoginLog.getAccount())) {
                //��SQL�������滻������
                String account = java.net.URLDecoder.decode(plsUserLoginLog.getAccount(), "UTF-8").replaceAll("'", "��");
                sql += " and account='" + account + "'";
            }
            if (StringUtils.isNotBlank(plsUserLoginLog.getUserName())) {
                //��SQL�������滻������
                String username = java.net.URLDecoder.decode(plsUserLoginLog.getUserName(), "UTF-8").replaceAll("'", "��");
                sql += " and username='" + username + "'";
            }
            if (plsUserLoginLog.getTemplateId() != null) {
                //��SQL�������滻������
                String templateid = plsUserLoginLog.getTemplateId().replaceAll("'", "��");
                sql += " and templateid='" + templateid + "'";
            }
            if (plsUserLoginLog.getC1() != null) {
                //��SQL�������滻������
                String c1 = plsUserLoginLog.getC1().replaceAll("'", "��");
                sql += " and c1='" + c1 + "'";
            }
        }
        sql += " order by lastTime desc ";
        List<Map<String, String>> rmaplist = new DaoUtil().getMultiData(sql);
        ArrayList<PlsUserLoginLog> rlist = new ArrayList<PlsUserLoginLog>();
        if (rmaplist != null) {
            for (Map<String, String> rmap : rmaplist) {
                PlsUserLoginLog pull = new PlsUserLoginLog();
                DaoUtil.injectionObjectFromMap(rmap, pull);
                rlist.add(pull);
            }
        }
        return rlist;
    }

    /**
     * ɾ����ʷ������־
     *
     * @param pmap
     * @return
     */
    public boolean deleteLoginLog(Map<String, String> pmap) {
        String sql = "delete from pls_user_login_log where 1=1";

        if (pmap.get("c1") != null) {
            sql = sql + " and c1='" + pmap.get("c1") + "'";
        }
        if (pmap.get("mac") != null) {
            sql = sql + " and mac='" + pmap.get("mac") + "'";
        }
        if (pmap.get("account") != null) {
            sql = sql + " and account='" + pmap.get("account") + "'";
        }

        return new DaoUtil().ExecSQL(sql);
    }

}
