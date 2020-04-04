package com.yyj.apps.email;

import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.DbUtils;

import java.util.Map;

/**
 * Created by yyj on 2018/10/30.
 */
public class GetMaxFolderSn extends CommonCmd {
    private Map params;

    public GetMaxFolderSn(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
       return $asIntFtl("getMaxFolderSn.sql",params);
    }
}
