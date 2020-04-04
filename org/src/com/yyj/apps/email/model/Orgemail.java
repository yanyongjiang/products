package com.yyj.apps.email.model;

import java.sql.Timestamp;

public class Orgemail {
    private String id;
    private String fldcontentid;
    private String state;
    private String fldsjr;
    private String fldsjrid;
    private String fldtype;//1 表达创建人，2表示收件人，3表示抄送人，4表示密送人
    private String fldboxid;
    private Timestamp fldreadtime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFldcontentid() {
        return fldcontentid;
    }

    public void setFldcontentid(String fldcontentid) {
        this.fldcontentid = fldcontentid;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getFldsjr() {
        return fldsjr;
    }

    public void setFldsjr(String fldsjr) {
        this.fldsjr = fldsjr;
    }

    public String getFldsjrid() {
        return fldsjrid;
    }

    public void setFldsjrid(String fldsjrid) {
        this.fldsjrid = fldsjrid;
    }

    public String getFldtype() {
        return fldtype;
    }

    public void setFldtype(String fldtype) {
        this.fldtype = fldtype;
    }

    public String getFldboxid() {
        return fldboxid;
    }

    public void setFldboxid(String fldboxid) {
        this.fldboxid = fldboxid;
    }

    public Timestamp getFldreadtime() {
        return fldreadtime;
    }

    public void setFldreadtime(Timestamp fldreadtime) {
        this.fldreadtime = fldreadtime;
    }
}