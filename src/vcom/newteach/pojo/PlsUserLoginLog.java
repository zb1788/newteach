package vcom.newteach.pojo;

import java.util.Date;


public class PlsUserLoginLog implements java.io.Serializable {


    private Integer pkId;//PK_ID
    private String mac;//MAC
    private String account;//ACCOUNT
    private String pwd;//PWD
    private String userName;//USERNAME
    private Date lastTime;//LASTTIME
    private String templateId;//
    private String c1;//
    private String c2;//���һ�ε����Ŀ¼���
    private String c3;//
    private String c4;//��ǰѧУ����
    private String c5;//��ʦ���ڵĽ�������
    private String c6;//���浱ǰ��ʦ�༶

    private String ip;
    private Integer count;
    private Integer excelRows;//excel����

    public Integer getPkId() {
        return pkId;
    }

    public void setPkId(Integer pkId) {
        this.pkId = pkId;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getLastTime() {
        return lastTime;
    }

    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getC1() {
        return c1;
    }

    public void setC1(String c1) {
        this.c1 = c1;
    }

    public String getC2() {
        return c2;
    }

    public void setC2(String c2) {
        this.c2 = c2;
    }

    public String getC3() {
        return c3;
    }

    public void setC3(String c3) {
        this.c3 = c3;
    }

    public String getC4() {
        return c4;
    }

    public void setC4(String c4) {
        this.c4 = c4;
    }

    public String getC5() {
        return c5;
    }

    public void setC5(String c5) {
        this.c5 = c5;
    }

    public String getC6() {
        return c6;
    }

    public void setC6(String c6) {
        this.c6 = c6;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getExcelRows() {
        return excelRows;
    }

    public void setExcelRows(Integer excelRows) {
        this.excelRows = excelRows;
    }

}
