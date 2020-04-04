package com.yyj.apps.es.index.model;

import java.sql.Timestamp;

public class Esdata {
    private String id;
    private String fldtm;
    private String fldcontent;
    private Timestamp fldngdate;
    private String fldstatus;
    private String fldtext;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFldtm() {
        return fldtm;
    }

    public void setFldtm(String fldtm) {
        this.fldtm = fldtm;
    }

    public String getFldcontent() {
        return fldcontent;
    }

    public void setFldcontent(String fldcontent) {
        this.fldcontent = fldcontent;
    }

    public Timestamp getFldngdate() {
        return fldngdate;
    }

    public void setFldngdate(Timestamp fldngdate) {
        this.fldngdate = fldngdate;
    }

    public String getFldstatus() {
        return fldstatus;
    }

    public void setFldstatus(String fldstatus) {
        this.fldstatus = fldstatus;
    }

    public String getFldtext() {
        return fldtext;
    }

    public void setFldtext(String fldtext) {
        this.fldtext = fldtext;
    }
}