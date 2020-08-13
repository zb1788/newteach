package vcom.newteach.pojo;


public class PersonalMenuConfig {

    private String id; //
    private String username; //
    private String menuid;
    private Integer menubelong;// '0-���� 1-�ڿ�',
    private Integer menutype; // '0-����Ŀ 1-����Ŀ',
    private Integer selected;
    private Integer sortnum;

    public Integer getSelected() {
        return selected;
    }

    public void setSelected(Integer selected) {
        this.selected = selected;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMenuid() {
        return menuid;
    }

    public void setMenuid(String menuid) {
        this.menuid = menuid;
    }

    public Integer getMenubelong() {
        return menubelong;
    }

    public void setMenubelong(Integer menubelong) {
        this.menubelong = menubelong;
    }

    public Integer getMenutype() {
        return menutype;
    }

    public void setMenutype(Integer menutype) {
        this.menutype = menutype;
    }

    public Integer getSortnum() {
        return sortnum;
    }

    public void setSortnum(Integer sortnum) {
        this.sortnum = sortnum;
    }

}