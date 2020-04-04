package com.yyj.apps.bbs.chat.model;

import java.sql.Timestamp;

public class Bbschartcont {
    private String id;
    private String fldfrom;
    private String fldto;
    private Timestamp fldngdate;
    private String fldtext;
    private Timestamp fldrdate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFldfrom() {
        return fldfrom;
    }

    public void setFldfrom(String fldfrom) {
        this.fldfrom = fldfrom;
    }

    public String getFldto() {
        return fldto;
    }

    public void setFldto(String fldto) {
        this.fldto = fldto;
    }

    public Timestamp getFldngdate() {
        return fldngdate;
    }

    public void setFldngdate(Timestamp fldngdate) {
        this.fldngdate = fldngdate;
    }

    public String getFldtext() {
        return fldtext;
    }

    public void setFldtext(String fldtext) {
        this.fldtext = fldtext;
    }

    public Timestamp getFldrdate() {
        return fldrdate;
    }

    public void setFldrdate(Timestamp fldrdate) {
        this.fldrdate = fldrdate;
    }
}