package com.yyj.apps.flowd.model;

import java.sql.Timestamp;

public class Flowcatalog {
    private String id;
    private String fldname;
    private Integer fldsn;
    private String fldparentid;
    private String fldparentname;
    private Timestamp fldngdate;
    private String state;
    private String inituserid;
    private String initusername;
    private String initbmid;
    private String initbm;
    private String initdeptid;
    private String initdeptname;
    private String initunitid;
    private String initunitname;

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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getInituserid() {
        return inituserid;
    }

    public void setInituserid(String inituserid) {
        this.inituserid = inituserid;
    }

    public String getInitusername() {
        return initusername;
    }

    public void setInitusername(String initusername) {
        this.initusername = initusername;
    }

    public String getInitbmid() {
        return initbmid;
    }

    public void setInitbmid(String initbmid) {
        this.initbmid = initbmid;
    }

    public String getInitbm() {
        return initbm;
    }

    public void setInitbm(String initbm) {
        this.initbm = initbm;
    }

    public String getInitdeptid() {
        return initdeptid;
    }

    public void setInitdeptid(String initdeptid) {
        this.initdeptid = initdeptid;
    }

    public String getInitdeptname() {
        return initdeptname;
    }

    public void setInitdeptname(String initdeptname) {
        this.initdeptname = initdeptname;
    }

    public String getInitunitid() {
        return initunitid;
    }

    public void setInitunitid(String initunitid) {
        this.initunitid = initunitid;
    }

    public String getInitunitname() {
        return initunitname;
    }

    public void setInitunitname(String initunitname) {
        this.initunitname = initunitname;
    }
}