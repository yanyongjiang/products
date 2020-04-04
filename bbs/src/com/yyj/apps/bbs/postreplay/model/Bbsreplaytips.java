package com.yyj.apps.bbs.postreplay.model;

import java.sql.Timestamp;

public class Bbsreplaytips {
    private String id;
    private String flduserid;
    private String fldreplayid;
    private String fldpostid;
    private String fldreplayrid; //被回复的回复id
    private Timestamp fldreaddate;
    private Timestamp fldngdate;
    private String fldtipuserid;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFlduserid() {
        return flduserid;
    }

    public void setFlduserid(String flduserid) {
        this.flduserid = flduserid;
    }

    public String getFldreplayid() {
        return fldreplayid;
    }

    public void setFldreplayid(String fldreplayid) {
        this.fldreplayid = fldreplayid;
    }

    public String getFldpostid() {
        return fldpostid;
    }

    public void setFldpostid(String fldpostid) {
        this.fldpostid = fldpostid;
    }

    public String getFldreplayrid() {
        return fldreplayrid;
    }

    public void setFldreplayrid(String fldreplayrid) {
        this.fldreplayrid = fldreplayrid;
    }

    public Timestamp getFldngdate() {
        return fldngdate;
    }

    public void setFldngdate(Timestamp fldngdate) {
        this.fldngdate = fldngdate;
    }

    public Timestamp getFldreaddate() {
        return fldreaddate;
    }

    public void setFldreaddate(Timestamp fldreaddate) {
        this.fldreaddate = fldreaddate;
    }

    public String getFldtipuserid() {
        return fldtipuserid;
    }

    public void setFldtipuserid(String fldtipuserid) {
        this.fldtipuserid = fldtipuserid;
    }
}