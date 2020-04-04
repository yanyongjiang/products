package com.yyj.apps.es.index;

import com.yyj.commonservice.CommonCmd;
import java.util.Map;

/**
 * Created by yyj on 2018/07/15.
 */
public class ListEsAttach  extends CommonCmd {
    private Map params;

    public ListEsAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String pkid = (String) params.get("pkid");
        if (pkid == null) return null;
        return $queryForLisFtl("listEsAttach.sql", params);
    }
}
