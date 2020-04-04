package com.yyj.apps.mh;

import com.yyj.commonservice.CommonCmd;

import java.util.Map;

/**
 * Created by yyj on 2018/07/15.
 */
public class ListArtAttach extends CommonCmd {
    private Map params;

    public ListArtAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String pkid = (String) params.get("pkid");
        if (pkid == null) return null;
        return $queryForLisFtl("listArtAttach.sql", params);
    }
}
