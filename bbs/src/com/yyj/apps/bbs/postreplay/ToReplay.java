package com.yyj.apps.bbs.postreplay;

import com.yyj.commonservice.CommonCmd;

import java.util.HashMap;
import java.util.Map;

/**
 * 业务模块描述:【获取回复私信数字】
 * 作者: 严拥江
 * 日期: 2018/03/31 11:50
 */
public class ToReplay extends CommonCmd {
    private Map params;

    public ToReplay(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String pagePerGroup= (String) params.get("pagePerGroup");
        if(pagePerGroup==null) pagePerGroup="10";
        int onepagecount=Integer.parseInt(pagePerGroup);
        String fldpostid= (String) params.get("fldpostid");
        String fldreplayid= (String) params.get("fldreplayid");
        Map p=new HashMap<>();
        p.put("fldfromid",fldpostid);
       // int tol=$asIntFtl("toReplay.sql",p);
        p.put("id",fldreplayid);
        int num=$asIntFtl("toReplay.sql",p);
        //num=num+1;
        int page=(num/onepagecount)+1;
        int start=(page-1)*onepagecount;
        return start;
    }
}
