package vcom.sso.vo;

import java.io.Serializable;
import java.util.Date;

public class Group implements Serializable {
    public static final String GROUP_REARCH = "RG";//������
    public static final String GROUP_INTEREST = "IG";//��Ȥ��
    public static final String GROUP_TEACHER = "TG";//��ʦ��
    public static final String GROUP_STUDENT = "SG";//ѧ����
    public static final String GROUP_PARENT = "PG";//�ҳ���
    public static final String GROUP_EXECLLENT_TEACHER = "EG";//��ʦ��


    private Long gtId;//��ID
    private String gtName;//������
    private String areaId;//������ID
    private String eduOrgId;//��������ID
    private String schoolId;//ѧУID
    private String createUser;//������
    private String groupType;//������ tg ��ʦ�� sgѧ���� pg�ҳ��� ig��Ȥ�� rg ������ eg��ʦ��
    private String vistable;

    public String getVistable() {
        return vistable;
    }

    public void setVistable(String vistable) {
        this.vistable = vistable;
    }

    public String getGroupType() {
        return groupType;
    }

    public void setGroupType(String groupType) {
        this.groupType = groupType;
    }

    public Long getGtId() {
        return gtId;
    }

    public void setGtId(Long gtId) {
        this.gtId = gtId;
    }

    public String getGtName() {
        return gtName;
    }

    public void setGtName(String gtName) {
        this.gtName = gtName;
    }

    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

    public String getEduOrgId() {
        return eduOrgId;
    }

    public void setEduOrgId(String eduOrgId) {
        this.eduOrgId = eduOrgId;
    }

    public String getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(String schoolId) {
        this.schoolId = schoolId;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }
}
