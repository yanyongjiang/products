package com.yyj.apps.mh;

import com.yyj.commonservice.CommonCmd;

import java.util.Map;

/**
 * Created by yyj on 2018/9/8.
 * 更新附件pkId
 */
public class UpdateMhAttachPkid extends CommonCmd {
    private Map params;
    public UpdateMhAttachPkid(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String oldpkid = (String) params.get("oldpkid");
        String pkid = (String) params.get("pkid");
        if(oldpkid==null||pkid==null) return null;
        return $asUpdateFtl("updateArtAttachPkid.sql",params);
    }
}
