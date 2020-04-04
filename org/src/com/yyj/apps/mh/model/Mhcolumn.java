package com.yyj.apps.mh.model;

import java.sql.Timestamp;

public class Mhcolumn {
    private String id;
    private String fldname;
    private Integer fldsn;
    private String fldparentid;
    private String fldparentname;
    private Timestamp fldngdate;
    private String fldpic;
    private String state;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFldname() {
        return fldname;
    }

    public void setFldname(String fldname) {
        this.fldname = fldname;
    }

    public Integer getFldsn() {
        return fldsn;
    }

    public void setFldsn(Integer fldsn) {
        this.fldsn = fldsn;
    }

    public String getFldparentid() {
        return fldparentid;
    }

    public void setFldparentid(String fldparentid) {
        this.fldparentid = fldparentid;
    }

    public String getFldparentname() {
        return fldparentname;
    }

    public void setFldparentname(String fldparentname) {
        this.fldparentname = fldparentname;
    }

    public Timestamp getFldngdate() {
        return fldngdate;
    }

    public void setFldngdate(Timestamp fldngdate) {
        this.fldngdate = fldngdate;
    }

    public String getFldpic() {
        return fldpic;
    }

    public void setFldpic(String fldpic) {
        this.fldpic = fldpic;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}