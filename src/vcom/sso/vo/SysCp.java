package vcom.sso.vo;

/**
 * SysCp generated by MyEclipse Persistence Tools
 */

public class SysCp implements java.io.Serializable {

    // Fields

    /**
     *
     */
    private static final long serialVersionUID = 233136673448825627L;


    private String cpCode;

    private String cpName;

    private String delFlag;

    // Constructors

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    /**
     * default constructor
     */
    public SysCp() {
    }

    /**
     * full constructor
     */
    public SysCp(String cpCode, String cpName) {
        this.cpCode = cpCode;
        this.cpName = cpName;
    }


    public String getCpCode() {
        return this.cpCode;
    }

    public void setCpCode(String cpCode) {
        this.cpCode = cpCode;
    }

    public String getCpName() {
        return this.cpName;
    }

    public void setCpName(String cpName) {
        this.cpName = cpName;
    }


}