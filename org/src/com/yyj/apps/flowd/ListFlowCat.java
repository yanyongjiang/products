package com.yyj.apps.flowd;

import com.yyj.apps.flowd.model.Flowcatalog;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import java.util.*;

/**
 * Created by yyj on 2019/2/17.
 */
public class ListFlowCat extends CommonCmd {
    private Map params;

    public ListFlowCat(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String id= (String) params.get("id");
        List<Map> maps=new ArrayList<>();
        List<Flowcatalog> list=null;
        if(id==null||"".equals(id)){
            list=$find(Flowcatalog.class, "fldparentid", null,"state","1");
        }
        else {
            list=$find(Flowcatalog.class,"fldparentid",id,"state","1");
        }
        if(list!=null&&list.size()>0){
            for(Flowcatalog one:list){
                Map map= BeanUtils.ObjectToMap(one);
                List<Flowcatalog> clist=$find(Flowcatalog.class, "fldparentid", one.getId(),"state","1");
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
