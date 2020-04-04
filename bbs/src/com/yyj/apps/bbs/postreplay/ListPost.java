package com.yyj.apps.bbs.postreplay;

import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.Paging;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 业务模块描述:【列出帖子列表】
 * 作者: 严拥江
 * 日期: 2018/03/31 11:50
 */
public class ListPost extends CommonCmd {
    private Map params;

    public ListPost(Map params) {
        this.params = params;
    }
    public String getImgSrc(String htmlStr) {
        if( htmlStr == null ){
            return null;
        }
        Pattern p_image;
        Matcher m_image;
        String pics = null;
        String regEx_img =  "(?i)<img[^>]*>";
        p_image = Pattern.compile(regEx_img, Pattern.CASE_INSENSITIVE);
        m_image = p_image.matcher(htmlStr);
        int i=0;
        while (m_image.find()&&i<3) {
            if(m_image.group().indexOf("ueditor/dialogs/attachment/fileTypeImages/icon_txt.gif")==-1){
                if(pics==null) pics=m_image.group();
                else pics+=m_image.group();
                i++;
            }
        }
        if(pics!=null) return pics;

        return "";
    }
    public Object execute() throws Exception {

        if(params.get("start")==null|| params.get("limit")==null) return null;
        int contentcut=360;
        if(params.get("contentcut")!=null){
            contentcut=Integer.parseInt((String) params.get("contentcut"));
        }
        Paging<Map<String, Object>> paging=$asPageFtl("listPost.sql", params);
        if(paging!=null&&paging.getData()!=null&&paging.getData().size()>0){
            List<Map<String, Object>> postlist=paging.getData();
            for(Map one:postlist){
                String fldtext= (String) one.get("fldtext");
                if(fldtext!=null){
                    fldtext=fldtext.trim();
                    if(fldtext!=null&&fldtext.length()>contentcut)
                        fldtext=fldtext.substring(0,contentcut)+"...";
                    one.put("fldtext",fldtext);
                }
                String fldcontent= (String) one.get("fldcontent");
                if(fldcontent!=null&&params.get("notCutContent")==null){
                    fldcontent=fldcontent.trim();
                    fldcontent=getImgSrc(fldcontent);
                    one.put("fldcontent",fldcontent);
                }
            }
        }
        return paging;
    }
}
