package com.yyj.apps.work.model;

import java.sql.Timestamp;

public class Orgcomtip {
    private String id;
    private String fldtm;
    private String flduserid;
    private String fldusername;
    private String fldtipuserid;
    private String fldtipusername;
    private String fldbuk;
    private Timestamp fldcretime;
    private Timestamp fldacctime;
    private String fldcomid;

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

    public String getFldtipuserid() {
        return fldtipuserid;
    }

    public void setFldtipuserid(String fldtipuserid) {
        this.fldtipuserid = fldtipuserid;
    }

    public String getFldtipusername() {
        return fldtipusername;
    }

    public void setFldtipusername(String fldtipusername) {
        this.fldtipusername = fldtipusername;
    }

    public String getFldbuk() {
        return fldbuk;
    }

    public void setFldbuk(String fldbuk) {
        this.fldbuk = fldbuk;
    }

    public Timestamp getFldcretime() {
        return fldcretime;
    }

    public void setFldcretime(Timestamp fldcretime) {
        this.fldcretime = fldcretime;
    }

    public Timestamp getFldacctime() {
        return fldacctime;
    }

    public void setFldacctime(Timestamp fldacctime) {
        this.fldacctime = fldacctime;
    }

    public String getFldcomid() {
        return fldcomid;
    }

    public void setFldcomid(String fldcomid) {
        this.fldcomid = fldcomid;
    }
}