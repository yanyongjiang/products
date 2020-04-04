package com.yyj.apps.bbs.postreplay.model;

import java.sql.Timestamp;

public class Bbsreplay {
   private String id;
   private String fldfromid;
   private String fldcontent;
   private Timestamp fldngdate;
   private int fldsn;
   private String fldstatus;
   private String flduserid;
   private String fldreplayid;

   public String getId() {
      return id;
   }

   public void setId(String id) {
      this.id = id;
   }

   public String getFldfromid() {
      return fldfromid;
   }

   public void setFldfromid(String fldfromid) {
      this.fldfromid = fldfromid;
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

   public int getFldsn() {
      return fldsn;
   }

   public void setFldsn(int fldsn) {
      this.fldsn = fldsn;
   }

   public String getFldstatus() {
      return fldstatus;
   }

   public void setFldstatus(String fldstatus) {
      this.fldstatus = fldstatus;
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
}