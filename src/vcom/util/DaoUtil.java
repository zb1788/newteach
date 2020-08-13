/**
 * ��д�� JavaBeans ����ҪĿ����Ϊ�˷�װ SQL ��䣬���� Java��JSP ��������ݿ�ķ���.
 */

package vcom.util;

import java.io.InputStream;
import java.io.Reader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.*;
import java.util.*;
import java.util.Date;

import javax.sql.DataSource;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;

import vcom.util.DateUtil;
import vcom.util.StringUtil;
import vcom.util.Config;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;

public class DaoUtil {
    private static transient Logger log = Logger.getLogger(DaoUtil.class);
    private static DataSource DATA_SOURCE = null;

    //public static DBPool  connPool= null;
    public static boolean initialized = false;

    public DaoUtil() {
        init();
    }

    /*DBPool initialization*/
    public void init() {
        if (!initialized) {
            //����class�ļ�λ���жϵ�ǰ�Ǻ�̨������web����
            log.info("---- START INIT DATASOURCE NOW !  ----");
            try {
                Properties dbconfig = Config.getDBProperty();
                log.info("[DATASOURCE    DRIVERCLASSNAME]:" + dbconfig.getProperty("driverClassName"));
                log.info("[DATASOURCE    URL            ]:" + dbconfig.getProperty("url"));
                log.info("[DATASOURCE    USERNAME       ]:" + dbconfig.getProperty("username"));
                log.info("[DATASOURCE    PASSWORD       ]:" + dbconfig.getProperty("password"));
                DATA_SOURCE = DruidDataSourceFactory.createDataSource(dbconfig);
                log.debug("[DB_INIT]:  NOW DB INITED !  [DB_INIT]");
            } catch (ClassNotFoundException e) {
                // TODO Auto-generated catch block
                log.error(" connectpool init fail! message is :" + e.getMessage());
                e.printStackTrace();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                log.error("[DB_INIT Fail]: connectpool init Fail! message is :" + e.getMessage() + " [DB_INIT Fail]");
                e.printStackTrace();
            }
            initialized = true;
        }
    }

    /**
     * ��ȡ���ݿ����ӣ������WEB�����У��������������ȡ������ֱ�Ӵ����ӳ�����ȡ��
     */
    public Connection getConnection() {
        //���δ�ͷ����ͷ�
        Connection conn = null;
        log.debug("GET CONNECT FROM DaoUtil !");

        //ʹ��proxool���ӳ�
        log.debug("GET Connect from Pool !!");
        try {
            if (!initialized) {
                init();
            }
            conn = DATA_SOURCE.getConnection();

        } catch (Exception e) {
            log.error(" get Connect from proxool ERROR :" + e.getMessage());
            e.printStackTrace();
        }
        try {
            if (conn == null) {
                log.error("[ERROR] getConnect ERROR: CAN NOT GET CONNECT !!");
            } else if (conn.isClosed()) {
                log.error("[ERROR] getConnect ERROR: THE CONNECT IS CLOSE!!");
            } else {
                log.debug("GET CONNECT!");
                //��ʾ���ӳ�״̬
                if (Level.DEBUG.equals(log.getEffectiveLevel())) {
                    showSnapshotInfo();
                }
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            log.warn("GET DBPOOL STATUS ERROR:" + e.getMessage());
            //e.printStackTrace();
        }

        return conn;
    }

    /**
     * ��ʾproxool ���ӳ� ״̬
     */
    public void showSnapshotInfo() {

    }

    /**
     *	���в�ѯ|����:sql|����ֵ:������ѯ������ַ�������
     *    @param sql ִ�����
     *  @return Map��Сд��ĸ�����Ϊkey�����Ϊvalue��Map����
     *	@author �ɻ���
     */
    public Map<String, String> getSingleData(String sql) {
        if (StringUtil.isEmpty(sql)) {
            return null;
        }
        log.debug("getSingleData SQL:" + sql);
        Connection conn = getConnection();
        Statement statement = null;
        ResultSet rs = null;
        ResultSetMetaData rmd = null;
        Map resmap = null;
        try {
            if (conn == null) {
                log.error("Can't get connection!");
                return null;
            }
            statement = conn.createStatement();
            rs = statement.executeQuery(sql);
            if (rs.next()) {
                rmd = rs.getMetaData();
                resmap = new HashMap<String, String>();
                int j;
                int Count = rmd.getColumnCount();
                for (j = 1; j <= Count; j++) {
                    //String colname = rmd.getColumnName(j).toLowerCase();//ʵ������
                    String collab = rmd.getColumnLabel(j).toLowerCase();//������,as������ƣ�Ĭ����colnameһ��
                    String coltypename = rmd.getColumnTypeName(j).toLowerCase();
                    if (coltypename.startsWith("timestamp") || coltypename.startsWith("date")) {
                        try {
                            if (rs.getDate(collab) != null) {
                                resmap.put(collab, DateUtil.parseDate(new Date(rs.getTimestamp(collab).getTime()), "yyyy-MM-dd HH:mm:ss"));
                            }
                        } catch (Exception e) {
                            log.warn("GET TIMETYPE COLUMN DATA FAILE ,MESSAGE IS : " + e.getMessage(), e);
                            resmap.put(collab, rs.getString(collab));
                        }
                    } else {
                        resmap.put(collab, rs.getString(collab));
                    }
                    coltypename = null;
                }
            } else {
                return null;
            }
        } catch (Exception e) {
            log.error("SQL:" + sql + "; getSingleData Exception!" + e.getMessage(), e);
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                rs = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (conn != null) {
                    conn.close();
                }
                conn = null;
            } catch (SQLException e) {
                log.error("Connection Close Exception!");
                e.printStackTrace();
            }
        }
        return resmap;
    }

    /**
     * ����sql(����Ϊ�����count���)��ѯ����
     * @param sql
     * @return
     */
    public Integer getCountData(String sql) {
        if (StringUtil.isEmpty(sql) || sql.indexOf("count(") < 0) {
            return null;
        }
        log.debug("getCountData SQL:" + sql);
        Connection conn = getConnection();
        Statement statement = null;
        ResultSet rs = null;
        ResultSetMetaData rmd = null;
        Integer countresult = null;
        try {
            if (conn == null) {
                log.error("Can't get connection!");
                return null;
            }
            statement = conn.createStatement();
            rs = statement.executeQuery(sql);
            if (rs.next()) {
                countresult = rs.getInt(1);
            } else {
                return null;
            }
        } catch (Exception e) {
            log.error("SQL:" + sql + ";getCountData Exception!" + e.getMessage(), e);
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                rs = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (conn != null) {
                    conn.close();
                }
                conn = null;
            } catch (SQLException e) {
                log.error("Connection Close Exception!");
                e.printStackTrace();
            }
        }
        return countresult;
    }

    /**
     *	���в�ѯ|����:sql;����ֵ:������ѯ����İ������в�ѯ�����
     *    @param sql ִ�����
     *  @return ArrayList<Map>��Сд��ĸ�����Ϊkey�����Ϊvalue��Map����List
     *	@author �ɻ���
     */
    public List<Map<String, String>> getMultiData(String sql) {
        ArrayList resultlist = null;
        if (StringUtil.isEmpty(sql)) {
            return null;
        }
        log.debug("getMultiData SQL:" + sql);
        Connection conn = getConnection();
        Statement statement = null;
        ResultSet rs = null;
        ResultSetMetaData rmd = null;
        try {
            if (conn == null) {
                log.error("Can't get connection!");
                return null;
            }
            statement = conn.createStatement();
            rs = statement.executeQuery(sql);
            rmd = rs.getMetaData();
            int Count = rmd.getColumnCount();
            while (rs.next()) {
                if (resultlist == null) {
                    resultlist = new ArrayList();
                }
                Map resmap = new HashMap<String, String>();
                for (int j = 1; j <= Count; j++) {
                    //String colname = rmd.getColumnName(j).toLowerCase();//ʵ������
                    String collab = rmd.getColumnLabel(j).toLowerCase();//������,as������ƣ�Ĭ����colnameһ��
                    String coltypename = rmd.getColumnTypeName(j).toLowerCase();
                    if (coltypename.startsWith("timestamp") || coltypename.startsWith("date")) {
                        try {
                            if (rs.getDate(collab) != null) {
                                resmap.put(collab, DateUtil.parseDate(new Date(rs.getTimestamp(collab).getTime()), "yyyy-MM-dd HH:mm:ss"));
                            }
                        } catch (Exception e) {
                            log.warn("GET TIMETYPE COLUMN DATA FAILE ,MESSAGE IS : " + e.getMessage(), e);
                            resmap.put(collab, rs.getString(collab));
                        }
                    } else {
                        resmap.put(collab, rs.getString(collab));
                    }
                    coltypename = null;
                }
                resultlist.add(resmap);
            }
        } catch (Exception e) {
            log.error("SQL:" + sql + ";getMultiData Exception!" + e.getMessage(), e);
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                rs = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (conn != null) {
                    conn.close();
                }
                conn = null;
            } catch (SQLException e) {
                log.error("Connection Close Exception!");
                e.printStackTrace();
            }
        }
        return resultlist;
    }

    /**
     * ִ�ж����ݿ�ĸ��²���,�Զ������ύ
     * @param sql        ���sql(UPDATE,DELETE,INSERT)
     * @return boolean    ���³ɹ�Ϊtrue;����ʧ��Ϊfalse
     */
    public boolean ExecSQL(String sql) {
        if (StringUtil.isEmpty(sql)) return false;
        log.debug("Exec SQL:" + sql);
        boolean bool = false;
        Connection conn = getConnection();
        Statement statement = null;
        if (conn == null) {
            log.error("Can't get connection!");
            return false;
        }
        try {
            //conn.setAutoCommit(false);
            statement = conn.createStatement();
            statement.execute(sql);
            statement.close();
            bool = true;
            //conn.commit();
        } catch (Exception e) {
            log.error("SQL:" + sql + "; exec Exception Message is :" + e.getMessage());
            e.printStackTrace();
            try {
                conn.rollback();
            } catch (SQLException e1) {
                log.error(" SQL exec RollBack ERROR!!!  Exception Message is :" + e.getMessage());
                e1.printStackTrace();
            }
        } finally {
            try {
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (conn != null) {
                    conn.close();
                }
                conn = null;
            } catch (SQLException e) {
                log.error("Connection Close Exception!");
                e.printStackTrace();
            }
        }
        return bool;
    }

    /**
     * �����������ݿ�������ִ�з���
     * @param sql
     * @param paramValues    List<Object[]> ÿ��List��Object[]Ϊһ�ײ�����ÿ��Object[]Ϊÿ��ִ��sql�Ĳ�����˳�������������������?��Ӧλ��һ��
     * @return
     * @throws SQLException
     */
    public boolean executePreparedSQL(String sql, List<Object[]> paramValues) throws SQLException {
        Connection conn = getConnection();
        if (paramValues == null || paramValues.size() == 0 || StringUtil.isEmpty(sql)) {
            return false;
        }
        try {
            java.sql.PreparedStatement pstmt = conn.prepareStatement(sql);
            log.debug("Will  execute Prepared SQL:" + sql);
            for (Object[] vol : paramValues) {
                int voi = 1;
                for (Object param : vol) {
                    if (param instanceof Integer) {
                        int value = ((Integer) param).intValue();
                        pstmt.setInt(voi, value);
                    } else if (param instanceof String) {
                        String s = (String) param;
                        pstmt.setString(voi, s);
                    } else if (param instanceof Double) {
                        double d = ((Double) param).doubleValue();
                        pstmt.setDouble(voi, d);
                    } else if (param instanceof Float) {
                        float f = ((Float) param).floatValue();
                        pstmt.setFloat(voi, f);
                    } else if (param instanceof Long) {
                        long l = ((Long) param).longValue();
                        pstmt.setLong(voi, l);
                    } else if (param instanceof Boolean) {
                        boolean b = ((Boolean) param).booleanValue();
                        pstmt.setBoolean(voi, b);
                    } else if (param instanceof java.util.Date) {
                        java.util.Date d = (java.util.Date) param;
                        pstmt.setDate(voi, new java.sql.Date(d.getTime()));
                    } else {
                        pstmt.setObject(voi, param);
                    }
                    voi++;
                }
                pstmt.addBatch();
            }
            pstmt.executeBatch();
            pstmt.close();
        } catch (Exception e) {
            log.error("SQL:" + sql + "; exec Exception Message is :" + e.getMessage());
            e.printStackTrace();
            try {
                conn.rollback();
            } catch (SQLException e1) {
                log.error(" SQL exec RollBack ERROR!!!  Exception Message is :" + e.getMessage());
                e1.printStackTrace();
            }
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
                conn = null;
            } catch (SQLException e) {
                log.error("Connection Close Exception!");
                e.printStackTrace();
            }
        }
        return true;
    }

    /**
     * ��һ�������ڴ�����sql��䣬�������в��ɹ�����䣬����������ع�
     * @param c Collection:Ҫִ�е�sql�����ַ����ļ��ϣ�����ÿ��Ԫ����һ��String�Ͷ���
     * @return boolean���ɹ����� true��ʧ�ܣ��ع������� false
     * @throws SQLException
     * ���ڸò��ֲ���Ҫ���ؽ����������ִ����ϼ��̹ر���䡢����
     */
    public boolean executeBatchSQL(Collection c) {
        Connection conn = getConnection();
        boolean result = false;
        boolean autoCommit = false;
        Iterator ir = c.iterator();
        Statement stmt = null;
        String sql = null;
        try {

            autoCommit = conn.getAutoCommit(); //�õ���ǰ�Ƿ��Զ�ִ��״̬
            conn.setAutoCommit(false); //�赱ǰ�Զ�ִ��״̬Ϊ��
            stmt = conn.createStatement();

            while (ir.hasNext()) {
                sql = (String) (ir.next());
                log.debug("Will Batch exec SQL:" + sql);
                stmt.addBatch(sql);
            }
            try {
                stmt.executeBatch();
                conn.commit();
                conn.setAutoCommit(autoCommit);
            } catch (BatchUpdateException buex) {
                buex.printStackTrace();
                conn.rollback();
                conn.setAutoCommit(autoCommit); //�ָ�ִ��ǰ�Զ�ִ��״̬
                stmt.clearBatch();
                log.error("SQL:" + sql + "; Exception with executebatchTask ��" + buex.getMessage() + sql);
            }
            result = true;
        } catch (Exception ex) {
            log.error("Exception with executebatchTask ��" + ex.getMessage());
            ex.printStackTrace();
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                stmt = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (conn != null) {
                    conn.close();
                }
                conn = null;
            } catch (SQLException e) {
                log.error("Connection Close Exception!");
                e.printStackTrace();
            }
        }
        return result;
    }

    /**
     * ��ȡCLOBֵ������ѯĳ�е�һ��CLOB�У����������ַ�������
     * @param sql
     * @return
     */
    public String getClobValue(String sql) {
        if (StringUtil.isEmpty(sql)) {
            return null;
        }
        log.debug("getClob SQL:" + sql);
        Connection conn = getConnection();
        Statement statement = null;
        ResultSet rs = null;
        ResultSetMetaData rmd = null;
        String resmap = null;
        if (conn == null) {
            log.error("Can't get connection!");
            return null;
        }
        try {
            statement = conn.createStatement();
            rs = statement.executeQuery(sql);
            if (rs.next()) {
                java.sql.Clob c = (Clob) rs.getClob(1);
                Reader reader = c.getCharacterStream();
                if (reader == null) {
                    return null;
                }
                StringBuffer sb = new StringBuffer();
                char[] charbuf = new char[4096];
                for (int i = reader.read(charbuf); i > 0; i = reader.read(charbuf)) {
                    sb.append(charbuf, 0, i);
                }
                return sb.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                rs = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (conn != null) {
                    conn.close();
                }
                conn = null;
            } catch (SQLException e) {
                log.error("Connection Close Exception!");
                e.printStackTrace();
            }
        }
        return resmap;

    }

    /**
     * ��ȡBLOBֵ������ѯĳ�е�һ��BLOB�У�����������
     * @param sql
     * @return
     */
    public InputStream getBlobValue(String sql) {
        if (StringUtil.isEmpty(sql)) {
            return null;
        }
        log.debug("getBlob SQL:" + sql);
        Connection conn = getConnection();
        Statement statement = null;
        ResultSet rs = null;
        ResultSetMetaData rmd = null;
        if (conn == null) {
            log.error("Can't get connection!");
            return null;
        }
        try {
            statement = conn.createStatement();
            rs = statement.executeQuery(sql);
            if (rs.next()) {
                java.sql.Blob blob = rs.getBlob(1);
                return blob.getBinaryStream();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                rs = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            try {
                if (conn != null) {
                    conn.close();
                }
                conn = null;
            } catch (SQLException e) {
                log.error("Connection Close Exception!");
                e.printStackTrace();
            }
        }
        return null;
    }

    /**
     * map����д��obj��������,����ʱ�����������ִ�Сд
     *
     * @param pmap
     * @param obj
     */
    public static void injectionObjectFromMap(Map<String, String> pmap, Object obj) {
        if (obj == null || pmap == null) {
            obj = null;
            return;
        }
        //�ж����Բ������ͺ󡢷���ע��
        for (Iterator<String> iterator = pmap.keySet().iterator(); iterator.hasNext(); ) {
            String key = iterator.next();
            String value = pmap.get(key);
            if (value == null || StringUtil.isEmpty(value)) {
                continue;
            }
            Method[] methods = obj.getClass().getMethods();
            for (Method m : methods) {
                //��ȡsetkey����(�����ִ�Сд)��ȫ����LowerCaseת��
                String mname = "set" + key;
                if (mname.equals(m.getName().toLowerCase())) {
                    try {
                        String paramtype = m.getParameterTypes()[0].getName();
                        if (paramtype.equals("java.lang.String")) {
                            m.invoke(obj, new Object[]{value});
                        } else if (paramtype.equals("java.lang.Integer") || paramtype.equals("int")) {
                            m.invoke(obj, new Object[]{Integer.parseInt(value)});
                        } else if (paramtype.equals("java.lang.Long") || paramtype.equals("long")) {
                            m.invoke(obj, new Object[]{Long.parseLong(value)});
                        } else if (paramtype.equals("java.lang.Double") || paramtype.equals("double")) {
                            m.invoke(obj, new Object[]{Double.parseDouble(value)});
                        } else if (paramtype.equals("java.lang.Float") || paramtype.equals("float")) {
                            m.invoke(obj, new Object[]{Float.parseFloat(value)});
                        } else if (paramtype.equals("java.lang.Boolean") || paramtype.equals("boolean")) {
                            m.invoke(obj, new Object[]{Boolean.parseBoolean(value)});
                        } else if (paramtype.equals("java.util.Date")) {
                            if (DateUtil.parseDate(value) != null) {
                                m.invoke(obj, new Object[]{DateUtil.parseDate(value)});
                            }
                        }
                    } catch (SecurityException e) {
                        log.warn(key + "����ע��'" + value + "'�쳣!:" + e.getMessage());
                    } catch (IllegalArgumentException e) {
                        log.warn(key + "����ע��'" + value + "'�쳣!:" + e.getMessage());
                    } catch (IllegalAccessException e) {
                        log.warn(key + "����ע��'" + value + "'�쳣!:" + e.getMessage());
                    } catch (InvocationTargetException e) {
                        log.warn(key + "����ע��'" + value + "'�쳣!:" + e.getMessage());
                    } catch (Exception e) {
                        log.warn(key + "����ע��'" + value + "'�쳣!:" + e.getMessage());
                    }
                }
            }
        }
    }

    public static void main(String[] arg) {
        DaoUtil dao = new DaoUtil();
        int i = dao.getCountData("select count(*) from PLS_USER_LOGIN_LOG");
        Map rm = dao.getSingleData("select * from PLS_USER_LOGIN_LOG  where PK_ID='10000637'");

        System.out.println(" mac = " + rm.get("mac"));
        System.out.println("PLS_USER_LOGIN_LOG count =" + i);
    }
}
