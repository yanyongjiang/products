package com.yyj.apps.es.index.model;

import java.sql.Timestamp;

public class Esattach {
    private String id;
    private String pkid;
    private String fldpath;
    private String fldfilename;
    private Timestamp fldngdate;
    private String fldsize;
    private String flduserid;
    private String fldusername;
    private String fldext;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPkid() {
        return pkid;
    }

    public void setPkid(String pkid) {
        this.pkid = pkid;
    }

    public String getFldpath() {
        return fldpath;
    }

    public void setFldpath(String fldpath) {
        this.fldpath = fldpath;
    }

    public String getFldfilename() {
        return fldfilename;
    }

    public void setFldfilename(String fldfilename) {
        this.fldfilename = fldfilename;
    }

    public Timestamp getFldngdate() {
        return fldngdate;
    }

    public void setFldngdate(Timestamp fldngdate) {
        this.fldngdate = fldngdate;
    }

    public String getFldsize() {
        return fldsize;
    }

    public void setFldsize(String fldsize) {
        this.fldsize = fldsize;
    }

    public String getFlduserid() {
        return flduserid;
    }

    public void setFlduserid(String flduserid) {
        this.flduserid = flduserid;
    }

    public String getFldusername() {
        return fldusername;
    }

    public void setFldusername(String fldusername) {
        this.fldusername = fldusername;
    }

    public String getFldext() {
        return fldext;
    }

    public void setFldext(String fldext) {
        this.fldext = fldext;
    }
}