package com.yyj.apps.bbs.chat.model;

import java.sql.Timestamp;

public class Bbschartuser {
    private String id;
    private String flduserid;
    private String fldfriendid;
    private Timestamp fldngdate;
    private Timestamp fldlastcdate;

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

    public String getFldfriendid() {
        return fldfriendid;
    }

    public void setFldfriendid(String fldfriendid) {
        this.fldfriendid = fldfriendid;
    }

    public Timestamp getFldngdate() {
        return fldngdate;
    }

    public void setFldngdate(Timestamp fldngdate) {
        this.fldngdate = fldngdate;
    }

    public Timestamp getFldlastcdate() {
        return fldlastcdate;
    }

    public void setFldlastcdate(Timestamp fldlastcdate) {
        this.fldlastcdate = fldlastcdate;
    }
}