package com.yyj.utils.bean;

import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/6/16.
 */
public class BeanUtils {
    public static <T> T MapToObject(T entity ,Map params) throws IllegalAccessException {
        Field[] fields = entity.getClass().getDeclaredFields();
        for ( Field field : fields )
        {
            // ??????????????????????
            field.setAccessible( true );
            String key=field.getName();
            if(params.get(key)!=null){
                if("class java.lang.Integer".equals(field.getType().toString())&&params.get(key) instanceof String)
                {
                    int intVal=Integer.parseInt((String) params.get(key));
                    field.set(entity,intVal);
                }else if("class java.sql.Timestamp".equals(field.getType().toString())&&params.get(key) instanceof String){
                    field.set(entity, Timestamp.valueOf((String) params.get(key)));
                }
                else{
                    field.set(entity,params.get(key));
                }

            }
        }
        return (T) entity;
    }

    public static <T> Map ObjectToMap(T entity) throws IllegalAccessException {
        Map params=new HashMap<>();
        Field[] fields = entity.getClass().getDeclaredFields();
        for ( Field field : fields )
        {
            // ??????????????????????
            field.setAccessible( true );
            String key=field.getName();
            params.put(key,field.get(entity));
        }
        return params;
    }
}
