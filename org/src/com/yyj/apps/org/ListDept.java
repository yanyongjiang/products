package com.yyj.apps.org;

import com.yyj.apps.org.model.Orgdept;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.util.*;

/**
 * Created by yyj on 2018/4/30.
 */
public class ListDept {
    private Map params;

    public ListDept(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String id= (String) params.get("id");
        List<Map> maps=new ArrayList<>();
        List<Orgdept> list=null;
        if(id==null||"".equals(id)){
            list=DbUtils.$find(Orgdept.class, "fldparentid", null);
        }
        else {
            list=DbUtils.$find(Orgdept.class,"fldparentid",id);
        }
        if(list!=null&&list.size()>0){
            for(Orgdept one:list){
                Map map= BeanUtils.ObjectToMap(one);
                List<Orgdept> clist=DbUtils.$find(Orgdept.class, "fldparentid", one.getId());
                if(clist!=null&&clist.size()>0){
                    map.put("isParent",true);
                }
                maps.add(map);
            }
        }
        if(maps.size()>0){
            Collections.sort(maps, new Comparator<Map>() {
                @Override
                public int compare(Map id1, Map id2) {

                    int size1 = (int) id1.get("fldsn");
                    int size2 = (int) id2.get("fldsn");

                    //前面sn都相同，谁长就排后面
                    if (size1 > size2) {
                        return 1;
                    } else if (size1 == size2) {
                        return 0;
                    } else {
                        return -1;
                    }
                }
            });
        }
        return maps;
    }
}
