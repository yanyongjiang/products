package com.yyj.apps.bbs.chat;

import com.yyj.apps.bbs.chat.model.Bbschartcont;
import com.yyj.apps.bbs.chat.model.Bbschartuser;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.Paging;

import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【列出帖子列表】
 * 作者: 严拥江
 * 日期: 2018/03/31 11:50
 */
public class ListFriendUser extends CommonCmd {
    private Map params;

    public ListFriendUser(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String flduserid = (String) params.get("flduserid");
        if(flduserid==null) return null;
        List<Map<String, Object>> friendlist=$queryForLisFtl("listFriendUser.sql", params);
        if(friendlist!=null&&friendlist.size()>0){
            for(Map f:friendlist){
                   int unreadM=$count(Bbschartcont.class,"fldfrom",
                           f.get("fldfriendid"),"fldto",flduserid,"fldrdate",null);
                   f.put("unread",unreadM);
            }
        }
        return friendlist;
    }
}
