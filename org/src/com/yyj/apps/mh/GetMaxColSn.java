package com.yyj.apps.mh;

import com.yyj.commonservice.CommonCmd;
import java.util.Map;

/**
 * Created by yyj on 2018/4/30.
 */
public class GetMaxColSn extends CommonCmd {
    private Map params;

    public GetMaxColSn(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
       return $asIntFtl("getMaxColSn.sql",params);
    }
}
