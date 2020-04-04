package com.yyj.apps.flowd;

import com.yyj.commonservice.CommonCmd;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2019/3/9.
 */
public class ListFlowD extends CommonCmd {
    private Map params;

    public ListFlowD(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        return $asPageFtl("listFlowD.sql", params);
    }
}
