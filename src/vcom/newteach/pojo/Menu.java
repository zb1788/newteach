package vcom.newteach.pojo;

public class Menu {
    private String menuid;
    private String name;
    private String jsFunction;

    private Integer menubelong;// '0-���� 1-�ڿ�',
    private Integer menutype; // '0-����Ŀ 1-����Ŀ',

    private Integer sortnum;
    private Integer selected;

    private String moveinpic;

    private Integer mustUse;//1 ���ܱ�ȥ��������ʹ��
    private Integer showFlag;//��ʾ��ʽ ���ұ�������ֱ���γ�
    private String c1;//��ԱȨ��c1ԭʼֵ
    private String c2;//��ԱȨ��c1ԭʼֵ
    private String c3;//��ԱȨ��c1ԭʼֵ
    private String c4;//��ԱȨ��c1ԭʼֵ

    private Integer newMenuFlag = 0;//0-������Ŀ 1-��������Ŀ

    public String getMoveinpic() {
        return moveinpic;
    }

    public void setMoveinpic(String moveinpic) {
        this.moveinpic = moveinpic;
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

    public Menu(String menuid, String name, Integer menubelong,
                Integer menutype, Integer sortnum) {
        super();
        this.menuid = menuid;
        this.name = name;
        this.menubelong = menubelong;
        this.menutype = menutype;
        this.sortnum = sortnum;
    }

    public Menu() {

    }

    public Integer getSortnum() {
        return sortnum;
    }

    public void setSortnum(Integer sortnum) {
        this.sortnum = sortnum;
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


    public Integer getSelected() {
        return selected;
    }

    public void setSelected(Integer selected) {
        this.selected = selected;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMenuid() {
        return menuid;
    }

    public void setMenuid(String menuid) {
        this.menuid = menuid;
    }

    public String getJsFunction() {
        return jsFunction;
    }

    public void setJsFunction(String jsFunction) {
        this.jsFunction = jsFunction;
    }


    public Integer getMustUse() {
        return mustUse;
    }

    public void setMustUse(Integer mustUse) {
        this.mustUse = mustUse;
    }

    public Integer getShowFlag() {
        return showFlag;
    }

    public void setShowFlag(Integer showFlag) {
        this.showFlag = showFlag;
    }

    public Integer getNewMenuFlag() {
        return newMenuFlag;
    }

    public void setNewMenuFlag(Integer newMenuFlag) {
        this.newMenuFlag = newMenuFlag;
    }

}
