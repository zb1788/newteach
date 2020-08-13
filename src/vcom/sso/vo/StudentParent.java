package vcom.sso.vo;

import java.io.Serializable;

public class StudentParent implements Serializable {
    private String parentAccount;//�ҳ��ʺ�
    private String parentUsername;//�ҳ��û���
    private String realname;//����
    private String concatNumber;//��ϵ�绰
    private String workUnit;//������λ
    private String email;
    private String smsBuyed;//�Ƿ񶩹�
    private String phoneActiveState;//�ֻ��Ű�״̬
    private String studentNumber;//ѧ���ʺ�
    private String parentType;//�ҳ�����
    private String phoneServiceProvider;//�ֻ���Ӫ��

    public String getPhoneServiceProvider() {
        return phoneServiceProvider;
    }

    public void setPhoneServiceProvider(String phoneServiceProvider) {
        this.phoneServiceProvider = phoneServiceProvider;
    }

    public String getParentType() {
        return parentType;
    }

    public void setParentType(String parentType) {
        this.parentType = parentType;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getPhoneActiveState() {
        return phoneActiveState;
    }

    public void setPhoneActiveState(String phoneActiveState) {
        this.phoneActiveState = phoneActiveState;
    }

    public String getParentAccount() {
        return parentAccount;
    }

    public String getSmsBuyed() {
        return smsBuyed;
    }

    public void setSmsBuyed(String smsBuyed) {
        this.smsBuyed = smsBuyed;
    }

    public void setParentAccount(String parentAccount) {
        this.parentAccount = parentAccount;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getConcatNumber() {
        return concatNumber;
    }

    public void setConcatNumber(String concatNumber) {
        this.concatNumber = concatNumber;
    }

    public String getWorkUnit() {
        return workUnit;
    }

    public void setWorkUnit(String workUnit) {
        this.workUnit = workUnit;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getParentUsername() {
        return parentUsername;
    }

    public void setParentUsername(String parentUsername) {
        this.parentUsername = parentUsername;
    }
}
