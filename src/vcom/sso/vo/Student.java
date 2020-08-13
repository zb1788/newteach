package vcom.sso.vo;

import java.io.Serializable;
import java.util.ArrayList;

public class Student implements Serializable {
    private String studentId;//ѧ��ID
    private String studentAccount;//ѧ���ʺ�
    private String studentNumber;//ѧ��
    private String realname;//����
    private String sex;//�Ա�
    private StudentParent[] studentParents;//�ҳ�
    private ArrayList<StudentParent> studentParentArray = new ArrayList<StudentParent>();//�ҳ�

    public void setStudentParents(StudentParent[] studentParents) {
        this.studentParents = studentParents;
    }

    private String email;
    private String concatNumber;//��ϵ�绰
    private String schoolId;//ѧУID
    private String schoolClassId;//�༶ID
    private String gradeCode;//�꼶
    private String headPhoto;//ͷ��
    private String smsBuyed;//�������

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentAccount() {
        return studentAccount;
    }

    public void setStudentAccount(String studentAccount) {
        this.studentAccount = studentAccount;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public StudentParent[] getStudentParents() {
        studentParents = new StudentParent[studentParentArray.size()];
        studentParents = studentParentArray.toArray(studentParents);
        return studentParents;
    }

    public ArrayList<StudentParent> refStudentParentArray() {
        return studentParentArray;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getConcatNumber() {
        return concatNumber;
    }

    public void setConcatNumber(String concatNumber) {
        this.concatNumber = concatNumber;
    }

    public String getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(String schoolId) {
        this.schoolId = schoolId;
    }

    public String getSchoolClassId() {
        return schoolClassId;
    }

    public void setSchoolClassId(String schoolClassId) {
        this.schoolClassId = schoolClassId;
    }

    public String getHeadPhoto() {
        if (headPhoto == null || headPhoto.trim().equals("")) {
            if (sex != null && sex.trim().equals("1")) {
                headPhoto = "/upload/template/default_girl.jpg";
            } else if (sex != null && sex.trim().equals("0")) {
                headPhoto = "/upload/template/default_boy.jpg";
            }
        }
        return headPhoto;
    }

    public void setHeadPhoto(String headPhoto) {
        this.headPhoto = headPhoto;
    }

    public String getSmsBuyed() {
        return smsBuyed;
    }

    public void setSmsBuyed(String smsBuyed) {
        this.smsBuyed = smsBuyed;
    }

    public String getGradeCode() {
        return gradeCode;
    }

    public void setGradeCode(String gradeCode) {
        this.gradeCode = gradeCode;
    }

    public void setStudentParentArray(ArrayList<StudentParent> studentParentArray) {
        this.studentParentArray = studentParentArray;
    }
}
