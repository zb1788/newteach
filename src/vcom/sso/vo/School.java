package vcom.sso.vo;

import java.io.Serializable;

public class School implements Serializable {
    private String schoolId;
    private String areaId;
    private String schoolName;
    private String schoolType;//����   Сѧ ���� ���� ���� һ���� һ���ƾ���
    private String eduYears;//ѧ�� ���� ������
    private String headBranchFlg = "1";//����ѧУ��1������У��2������У��3����Ĭ�϶���ѧУ
    private String headSchoolId = "00";//����ѧУ  ��У�� headSchoolIdΪ00
    private String padTeachAble = "0";//0 ������ƽ��� 1 ����ƽ��� Ĭ�ϲ�����ƽ���

    public String getHeadSchoolId() {
        return headSchoolId;
    }

    public void setHeadSchoolId(String headSchoolId) {
        this.headSchoolId = headSchoolId;
    }

    public String getHeadBranchFlg() {
        return headBranchFlg;
    }

    public void setHeadBranchFlg(String headBranchFlg) {
        this.headBranchFlg = headBranchFlg;
    }

    public String getSchoolType() {
        return schoolType;
    }

    public void setSchoolType(String schoolType) {
        this.schoolType = schoolType;
    }

    public String getEduYears() {
        return eduYears;
    }

    public void setEduYears(String eduYears) {
        this.eduYears = eduYears;
    }

    public String getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(String schoolId) {
        this.schoolId = schoolId;
    }

    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getPadTeachAble() {
        return padTeachAble;
    }

    public void setPadTeachAble(String padTeachAble) {
        this.padTeachAble = padTeachAble;
    }

}
