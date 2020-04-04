package com.yyj.apps.email;

import com.yyj.commonservice.CommonCmd;

import java.util.Map;

import static com.yyj.utils.db.DbUtils.$asUpdateFtl;

/**
 * Created by yyj on 2018/10/23.
 * 更新附件pkId
 */
public class UpdateEmAttachPkid extends CommonCmd {
    private Map params;
    public UpdateEmAttachPkid(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String oldpkid = (String) params.get("oldpkid");
        String pkid = (String) params.get("pkid");
        if(oldpkid==null||pkid==null) return null;
        return $asUpdateFtl("updateEmAttachPkid.sql",params);
    }
}
