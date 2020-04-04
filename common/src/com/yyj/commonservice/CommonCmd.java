package com.yyj.commonservice;

import com.yyj.utils.db.DbUtils;
import com.yyj.utils.db.Paging;
import freemarker.template.TemplateException;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/8/17.
 */
public class CommonCmd {
    public String sqlPath = "";

    public CommonCmd() {
        this.sqlPath = "/" + this.getClass().getPackage().getName().replace(".", "/") + "/model/";
    }

    public Paging<Map<String, Object>> $asPageFtl(String temple, Map params) throws IOException, TemplateException {
        return DbUtils.$asPageFtl(this.sqlPath + temple, params);
    }

    public int $asIntFtl(String temple, Map params) throws IOException, TemplateException {
        return DbUtils.$asIntFtl(this.sqlPath + temple, params);
    }

    public <T> T $save(T entity) throws IllegalAccessException {
        return DbUtils.$save(entity);
    }

    public List<Map<String, Object>> $queryForLisFtl(String tempPath, Map params) throws IOException, TemplateException {
        return DbUtils.$queryForLisFtl(this.sqlPath + tempPath, params);
    }

    public <T> T $get(Class<T> entityClass, Object id) {
        return DbUtils.$get(entityClass, id);
    }

    public <T> List<T> $find(Class<T> entityClass, Object... propertyAndValues) {
        return DbUtils.$find(entityClass, propertyAndValues);
    }
    //$findOne
    public <T> T $findOne(Class<T> entityClass, Object... propertyAndValues) {
        return DbUtils.$findOne(entityClass, propertyAndValues);
    }
    public int $update(Class entity, String id, Object... propertyAndValues) {
        return DbUtils.$update(entity, id, propertyAndValues);
    }

    public int $update(Class entity, String[] ids, Object... propertyAndValues) {
        return DbUtils.$update(entity, ids, propertyAndValues);
    }

    public int $update(Class entity, Map updateM, Map whereM) {
        return DbUtils.$update(entity, updateM, whereM);
    }

    public int $count(Class entity, Object... propertyAndValues) {
        return DbUtils.$count(entity, propertyAndValues);
    }

    public  int $asUpdateFtl(String tempPath,Map params) throws IOException, TemplateException {
        return DbUtils.$asUpdateFtl(this.sqlPath + tempPath, params);
    }
    public <T> List<T> $findOrder(Class<T> entityClass,String orderby,Object... propertyAndValues) throws IOException, TemplateException {
        return DbUtils.$findOrder(entityClass, orderby,propertyAndValues);
    }
}