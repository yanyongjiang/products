package com.yyj.apps.work.model;
import java.sql.Timestamp;
public class Orgcom{
    private String id;
    private String fldtaskid;
    private Timestamp fldcretime;
    private String fldmessage;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFldtaskid() {
        return fldtaskid;
    }

    public void setFldtaskid(String fldtaskid) {
        this.fldtaskid = fldtaskid;
    }

    public Timestamp getFldcretime() {
        return fldcretime;
    }

    public void setFldcretime(Timestamp fldcretime) {
        this.fldcretime = fldcretime;
    }

    public String getFldmessage() {
        return fldmessage;
    }

    public void setFldmessage(String fldmessage) {
        this.fldmessage = fldmessage;
    }
}