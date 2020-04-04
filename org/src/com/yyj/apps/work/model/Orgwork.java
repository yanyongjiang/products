package com.yyj.apps.work.model;

import java.sql.Timestamp;

public class Orgwork{
    private String id;
    private String fldtm;
    private String fldcontent;
    private String inituserid;
    private String initusername;
    private String initbmid;
    private String initbm;
    private String initdeptid;
    private String initdeptname;
    private String initunitid;
    private String initunitname;
    private Timestamp fldngtime;
    private String state;

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

    public Timestamp getFldngtime() {
        return fldngtime;
    }

    public void setFldngtime(Timestamp fldngtime) {
        this.fldngtime = fldngtime;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

}