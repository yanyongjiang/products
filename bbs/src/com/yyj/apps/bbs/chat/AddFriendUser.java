package com.yyj.apps.bbs.chat;

import com.yyj.apps.bbs.chat.model.Bbschartuser;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【保存注册用户】
 * 作者: 严拥江
 * 日期: 2018/03/04 11:50
 */
public class AddFriendUser extends CommonCmd {
    private Map params;

    public AddFriendUser(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Bbschartuser user = new Bbschartuser();
        user = BeanUtils.MapToObject(user, params);
        String flduserid = (String) params.get("flduserid");
        String fldfriendid = (String) params.get("fldfriendid");
        List<Bbschartuser> alreadyE1 = DbUtils.$find(Bbschartuser.class, "flduserid",flduserid, "fldfriendid",fldfriendid);
        if (alreadyE1 != null && alreadyE1.size() > 0) {
        }else{
            $save(user);
        }
        List<Bbschartuser> alreadyE2 = DbUtils.$find(Bbschartuser.class, "flduserid",fldfriendid, "fldfriendid",flduserid);
        if (alreadyE2 != null && alreadyE2.size() > 0) {
        }else{
            Bbschartuser user2 = new Bbschartuser();
            user2 = BeanUtils.MapToObject(user2, params);
            user2.setFlduserid(fldfriendid);
            user2.setFldfriendid(flduserid);
            $save(user2);
        }
        return true;
    }
}
