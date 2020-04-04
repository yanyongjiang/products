package com.yyj.apps.flowd;

import com.yyj.commonservice.CommonCmd;

import java.util.Map;

/**
 * Created by yyj on 2019/2/17.
 */
public class GetMaxCatSn extends CommonCmd {
    private Map params;

    public GetMaxCatSn(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
       return $asIntFtl("getMaxCatSn.sql",params);
    }
}
