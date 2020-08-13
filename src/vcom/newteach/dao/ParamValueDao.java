package vcom.newteach.dao;

import java.util.*;

import vcom.util.DaoUtil;

public class ParamValueDao {

    /**
     * ��ȡsys_param_n���Ӧparamname��paramvalue
     *
     * @param key
     * @return
     * @throws Exception
     */
    public String getParamValue(String key) throws Exception {
        if (key == null) {
            return null;
        }
        DaoUtil dao = new DaoUtil();
        //��SQL�������滻������
        key = key.replaceAll("'", "��");

        String sql = "select * from sys_param_n where paramname='" + key + "'";
        Map<String, String> rmap = dao.getSingleData(sql);
        if (rmap != null) {
            return rmap.get("paramvalue");
        }
        return null;
    }

}
