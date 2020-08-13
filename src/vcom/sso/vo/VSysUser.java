package vcom.sso.vo;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class VSysUser implements Serializable {
    private String username;//�û���

    private String account;//�ʺ�

    private String truename;//����

    private String nickname;//�ǳ�

    private String sex;//�Ա�

    private String state;//״̬

    private String eduOrgId;

    private School school;


    private String email;//����

    private String link;//�ֻ�

    private String usertype;//�û����� 2 ��ʦ 4 ѧ�� 0 �ҳ�

    private String headPhoto;//ͷ��

    private String photo;//������

    private String isGather;

    private String regFlg; // 0 ϵͳ¼�� 1 ��ע��

    private String phoneActiveState;// 0 δ�� 1 �Ѱ�

    private StudyStage[] studyStage = null;//ѧ��

    private Grade grade = null;//�꼶

    private SysArea area = null;//������

    private SysCp[] sysCPs = null;

    private Group[] groups = null;

    private SchoolClass[] schoolClasses = null;

    public SchoolClass[] getSchoolClasses() {
        return schoolClasses;
    }

    public void setSchoolClasses(SchoolClass[] schoolClasses) {
        this.schoolClasses = schoolClasses;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTruename() {
        return truename;
    }

    public void setTruename(String truename) {
        this.truename = truename;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Group[] getGroups() {
        return groups;
    }

    public void setGroups(Group[] groups) {
        this.groups = groups;
    }

    public SysCp[] getSysCPs() {
        return sysCPs;
    }

    public void setSysCPs(SysCp[] sysCPs) {
        this.sysCPs = sysCPs;
    }

    public String getIsGather() {
        return isGather;
    }

    public void setIsGather(String isGather) {
        this.isGather = isGather;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegFlg() {
        return regFlg;
    }

    public void setRegFlg(String regFlg) {
        this.regFlg = regFlg;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEduOrgId() {
        return eduOrgId;
    }

    public void setEduOrgId(String eduOrgId) {
        this.eduOrgId = eduOrgId;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public School getSchool() {
        return school;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public SysArea getArea() {
        return area;
    }

    public void setArea(SysArea area) {
        this.area = area;
    }

    public StudyStage[] getStudyStage() {
        return studyStage;
    }

    public void setStudyStage(StudyStage[] studyStage) {
        this.studyStage = studyStage;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getHeadPhoto() {
        return headPhoto;
    }

    public void setHeadPhoto(String headPhoto) {
        this.headPhoto = headPhoto;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getPhoneActiveState() {
        return phoneActiveState;
    }

    public void setPhoneActiveState(String phoneActiveState) {
        this.phoneActiveState = phoneActiveState;
    }
}
