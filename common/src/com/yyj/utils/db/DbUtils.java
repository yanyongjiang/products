package com.yyj.utils.db;
import com.yyj.config.Server;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SingleColumnRowMapper;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.lang.reflect.Field;
import java.util.*;

/**
 * 业务模块描述:【数据库访问工具类，系统操作数据库都使用该类】
 * 作者: 严拥江
 * 日期: 2018/03/01 11:50
 */
public class DbUtils {

    public static JdbcTemplate jdbcTemplate=null;
    public static Configuration cfg=null;
    private static Logger logger = LogManager.getLogger(LogManager.ROOT_LOGGER_NAME);

    public static Configuration getConfiguration() throws IOException {
        if(cfg==null){
            cfg = new Configuration(Configuration.VERSION_2_3_22);
            cfg.setClassLoaderForTemplateLoading(DbUtils.class.getClassLoader(),"");
            cfg.setDefaultEncoding("UTF-8");
            String templateUpdateDelayMilliseconds= Server.getProperty("templateUpdateDelayMilliseconds");
            if(templateUpdateDelayMilliseconds!=null)
            cfg.setTemplateUpdateDelayMilliseconds(Integer.parseInt(templateUpdateDelayMilliseconds));
        }
        return cfg;
    }

    public static String getTemplateString(String tempPath,Map root) throws IOException, TemplateException {
        logger.info("sqlPath:"+tempPath+"\n");
        Template temp = getConfiguration().getTemplate(tempPath);
        Writer out = new StringWriter();
        temp.process(root, out);
        return out.toString();
    }
    public static JdbcTemplate getJdbcTemplate(){
        if(jdbcTemplate==null){
            ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
            DataSource dataSource= (DataSource) context.getBean("dataSource");
            jdbcTemplate=new JdbcTemplate(dataSource);
        }
        return jdbcTemplate;
    }
    public static JdbcTemplate setJdbcTemplate(String beanxmlPath){
         if(jdbcTemplate==null){
             ApplicationContext context = new ClassPathXmlApplicationContext(beanxmlPath);
             DataSource dataSource= (DataSource) context.getBean("dataSource");
             JdbcTemplate jdbcTemplate=new JdbcTemplate(dataSource);
         }
         return jdbcTemplate;
    }

    public static String uuid() {
        return UUID.randomUUID().toString().replace("-", "");
    }
    public static int $update(Class entity, String id, Object... propertyAndValues) {
        String table=entity.getName();
        if(table.indexOf(".")!=-1){
            table=table.substring(table.lastIndexOf(".")+1);
            table=table.toLowerCase();
        }
        String updateSql="update "+table+" set ";
        String updateValueStr="";
        List<String> args=new ArrayList<>();
        int sql1=0;
        while(true) {
            if(sql1 >= propertyAndValues.length) {
                break;
            }
            String name =propertyAndValues[sql1].toString();
            if(updateValueStr.length() > 1) {
                updateValueStr+=",";
            }

            Object value = propertyAndValues[sql1 + 1];
            updateValueStr+=name+"=";
            if(null != value) {
                if("".equals(value)) {
                    updateValueStr+="null";
                } else {
                    updateValueStr+="?";
                    args.add(value.toString());
                }
            } else {
                updateValueStr+="null";
            }


            sql1 += 2;
        }
        args.add(id);
        updateSql+=updateValueStr+" where id=?";
        logger.info("sql:"+updateSql+"\n");
        logger.info("args:"+args.toString()+"\n");
        return getJdbcTemplate().update(updateSql, args.toArray(new String[]{}));
    }
    public static int $update(Class entity, String[] ids, Object... propertyAndValues) {
        String table=entity.getName();
        if(table.indexOf(".")!=-1){
            table=table.substring(table.lastIndexOf(".")+1);
            table=table.toLowerCase();
        }
        String updateSql="update "+table+" set ";
        String updateValueStr="";
        List<String> args=new ArrayList<>();
        int sql1=0;
        while(true) {
            if(sql1 >= propertyAndValues.length) {
                break;
            }
            String name =propertyAndValues[sql1].toString();
            if(updateValueStr.length() > 1) {
                updateValueStr+=",";
            }

            Object value = propertyAndValues[sql1 + 1];
            updateValueStr+=name+"=";
            if(null != value) {
                if("".equals(value)||"null".equals(value)) {
                    updateValueStr+="null";
                } else {
                    updateValueStr+="?";
                    args.add(value.toString());
                }
            } else {
                updateValueStr+="null";
            }


            sql1 += 2;
        }

        updateSql+=updateValueStr+" where id in (";
        int i=0;
        for(String id:ids){
            if(i==0) updateSql+="?";
            else updateSql+=",?";
            i++;
            args.add(id);
        }
        updateSql+=")";
        logger.info("sql:"+updateSql+"\n");
        logger.info("args:"+args.toString()+"\n");
        return getJdbcTemplate().update(updateSql, args.toArray(new String[]{}));
    }
    public static int $update(Class entity,Map updateM, Map whereM) {
        String table=entity.getName();
        if(table.indexOf(".")!=-1){
            table=table.substring(table.lastIndexOf(".")+1);
            table=table.toLowerCase();
        }
        String updateSql="update "+table+" set ";
        String updateValueStr="";
        List<String> args=new ArrayList<>();
        Object[] propertyAndValues=new Object[updateM.size()*2];
        int index=0;
        for(Object key:updateM.keySet()){
            propertyAndValues[index]=key;
            index++;
            propertyAndValues[index]=updateM.get(key);
            index++;
        }
        int sql1=0;
        while(true) {
            if(sql1 >= propertyAndValues.length) {
                break;
            }
            String name =propertyAndValues[sql1].toString();
            if(updateValueStr.length() > 1) {
                updateValueStr+=",";
            }
            Object value = propertyAndValues[sql1 + 1];
            updateValueStr+=name+"=";
            if(null != value) {
                if("".equals(value)||"null".equals(value)) {
                    updateValueStr+="null";
                } else {
                    updateValueStr+="?";
                    args.add(value.toString());
                }
            } else {
                updateValueStr+="null";
            }
            sql1 += 2;
        }

        updateSql+=updateValueStr+" where ";
        Object[] propertyAndValues2=new Object[whereM.size()*2];
        index=0;
        for(Object key:whereM.keySet()){
            propertyAndValues2[index]=key;
            index++;
            propertyAndValues2[index]=whereM.get(key);
            index++;
        }
        sql1=0;
        updateValueStr="";
        while(true) {
            if(sql1 >= propertyAndValues2.length) {
                break;
            }
            String name =propertyAndValues2[sql1].toString();
            if(updateValueStr.length() > 1) {
                updateValueStr+=" and ";
            }
            Object value = propertyAndValues2[sql1 + 1];
            updateValueStr+=name+"=";
            if(null != value) {
                if("".equals(value)||"null".equals(value)) {
                    updateValueStr+="null";
                } else {
                    updateValueStr+="?";
                    args.add(value.toString());
                }
            } else {
                updateValueStr+="null";
            }
            sql1 += 2;
        }
        updateSql+=updateValueStr;
        logger.info("sql:"+updateSql+"\n");
        logger.info("args:"+args.toString()+"\n");
        return getJdbcTemplate().update(updateSql, args.toArray(new String[]{}));
    }
    public static int $remove(Class entity, Object... propertyAndValues) {
        String table=entity.getName();
        if(table.indexOf(".")!=-1){
            table=table.substring(table.lastIndexOf(".")+1);
            table=table.toLowerCase();
        }
        List<String> args=new ArrayList<>();
        String SQL = "delete from "+table;
        if(propertyAndValues.length==1){
            SQL=SQL+" where id=?";
            args.add((String) propertyAndValues[0]);
        }else{
            int sql1=0;
            StringBuilder where = new StringBuilder();
            while(true) {
                if(sql1 >= propertyAndValues.length) {
                    break;
                }
                String name =propertyAndValues[sql1].toString();
                if(where.length() > 1) {
                    where.append(" and ");
                }

                Object value = propertyAndValues[sql1 + 1];
                where.append(name);
                if(null != value) {
                    if("not null".equals(value)) {
                        where.append(" is not null");
                    } else {
                        where.append("=?");
                        args.add(value.toString());
                    }
                } else {
                    where.append(" is null");
                }


                sql1 += 2;
            }
            if(where.length()>0)
                SQL=SQL+" "+"where"+" "+where.toString();
        }
        logger.info("sql:"+SQL+"\n");
        logger.info("args:"+args.toString()+"\n");
        return getJdbcTemplate().update(SQL, args.toArray(new String[]{}));
    }
    public static int $removeById(Class entity,String id){
        return DbUtils.$remove(entity,"id",id);
    }
    public static <T> T $save(T entity) throws IllegalAccessException {
        String entityId="";
        Boolean newEntityId=false;
        String table=entity.getClass().getName();
        if(table.indexOf(".")!=-1){
            table=table.substring(table.lastIndexOf(".")+1);
            table=table.toLowerCase();
        }
        String sql="insert into "+table+" ";
        String updateSql="update "+table+" set ";
        Field[] fields = entity.getClass().getDeclaredFields();
        Object[] insertargs=new Object[fields.length];
        Object[] updateargs=new Object[fields.length];
        int i=0;
        int j=0;
        String fieldsStr="(";
        String valueStr="(";
        String updateValueStr="";
        for ( Field field : fields )
        {
            // 如果不为空，设置可见性，然后返回
            field.setAccessible( true );
                if("id".equals(field.getName())){
                    if(field.get(entity)!=null){
                        newEntityId=false;
                        entityId=field.get(entity)+"";
                    }
                    else{
                        entityId= UUID.randomUUID().toString().replace("-", "");
                        field.set(entity,entityId);
                    }
                }
                // 设置字段可见，即可用get方法获取属性值。
                //   result += field.getName() + "=" + field.GetById(entity) +",\n";
                if(i!=0){
                    fieldsStr+=","+field.getName();
                    valueStr+=",?";
                }
                else{
                    fieldsStr+=field.getName();
                    valueStr+="?";
                }
                if(!"id".equals(field.getName())&&j!=0){
                    updateValueStr+=","+field.getName()+"=?";
                    updateargs[j]=  field.get(entity);
                    j++;
                }else if(j==0&&!"id".equals(field.getName())){
                    updateValueStr+=field.getName()+"=?";
                    updateargs[j]=  field.get(entity);
                    j++;
                }
                insertargs[i]=field.get(entity);
                i++;

        }
        fieldsStr+=")";
        valueStr+=")";

        sql+=fieldsStr+" values "+valueStr;
        if(!newEntityId){
            //执行查询语句，看看是不是要执行update语句
            T existEntity=$get((Class<T>) entity.getClass(),entityId);
            if(existEntity!=null) { //执行update语句
                //String SQL = "update Student set age = ? where id = ?";
                updateSql+=updateValueStr+" where id=?";
                updateargs[updateargs.length-1]=entityId;
                logger.info("sql:"+updateSql+"\n");
                logger.info("args:"+Arrays.asList(updateargs).toString()+"\n");
                int t=getJdbcTemplate().update(updateSql, updateargs);
            }else{
                //执行插入语句
                logger.info("sql:"+sql+"\n");
                logger.info("args:"+ Arrays.asList(insertargs).toString()+"\n");
                int t=getJdbcTemplate().update(sql, insertargs);
            }
        }
        return (T) entity;
    }
    public static <T> T $get(Class<T> entityClass, Object id){
        T student=null;
        try{
            String SQL = "select * from";
            String table=entityClass.getName();
            if(table.indexOf(".")!=-1){
                table=table.substring(table.lastIndexOf(".")+1);
                table=table.toLowerCase();
            }
            SQL=SQL+" "+table+" where id = ?";
            logger.info("sql:"+SQL+"\n");
            logger.info("args:"+id+"\n");
            student= (T) getJdbcTemplate().queryForObject(SQL, new Object[]{id}, new BeanPropertyRowMapper<T>(entityClass));
        }catch (EmptyResultDataAccessException e){
            return null;
        }
        return (T) student;
    }
    public static <T> List<T> $find(Class<T> entityClass,Object... propertyAndValues){
        List<T> student=null;
        String SQL = "select * from";
        String table=entityClass.getName();
        if(table.indexOf(".")!=-1){
            table=table.substring(table.lastIndexOf(".")+1);
            table=table.toLowerCase();
        }
        SQL=SQL+" "+table;
        int sql1=0;
        StringBuilder where = new StringBuilder();
        List<String> args=new ArrayList<>();
        while(true) {
            if(sql1 >= propertyAndValues.length) {
                break;
            }
            String name =propertyAndValues[sql1].toString();
            if(where.length() > 1) {
                where.append(" and ");
            }

            Object value = propertyAndValues[sql1 + 1];
            where.append(name);
            if(null != value) {
                if("not null".equals(value)) {
                    where.append(" is not null");
                } else {
                    where.append("=?");
                    args.add(value.toString());
                }
            } else {
                where.append(" is null");
            }


            sql1 += 2;
        }
        if(where.length()>0)
            SQL=SQL+" "+"where"+" "+where.toString();
        logger.info("sql:"+SQL+"\n");
        logger.info("args:"+args.toString()+"\n");
        student= (List<T>) getJdbcTemplate().query(SQL, args.toArray(new String[]{}), new BeanPropertyRowMapper<T>(entityClass));
        return (List<T>) student;
    }

    public static <T> T $findOne(Class<T> entityClass,Object... propertyAndValues){
        List<T> student=null;
        String SQL = "select * from";
        String table=entityClass.getName();
        if(table.indexOf(".")!=-1){
            table=table.substring(table.lastIndexOf(".")+1);
            table=table.toLowerCase();
        }
        SQL=SQL+" "+table;
        int sql1=0;
        StringBuilder where = new StringBuilder();
        List<String> args=new ArrayList<>();
        while(true) {
            if(sql1 >= propertyAndValues.length) {
                break;
            }
            String name =propertyAndValues[sql1].toString();
            if(where.length() > 1) {
                where.append(" and ");
            }

            Object value = propertyAndValues[sql1 + 1];
            where.append(name);
            if(null != value) {
                if("not null".equals(value)) {
                    where.append(" is not null");
                } else if(value.toString().indexOf("!=")!=-1){
                    where.append(value.toString());
                }
                else{
                    where.append("=?");
                    args.add(value.toString());
                }
            } else {
                where.append(" is null");
            }


            sql1 += 2;
        }
        if(where.length()>0)
            SQL=SQL+" "+"where"+" "+where.toString();
        logger.info("sql:"+SQL+"\n");
        logger.info("args:"+args.toString()+"\n");
        student= (List<T>) getJdbcTemplate().query(SQL, args.toArray(new String[]{}), new BeanPropertyRowMapper<T>(entityClass));
        if(student!=null&&student.size()>0){
            return student.get(0);
        }
        return null;
    }
    public static <T> Paging<T> $asPage(int start,int limit,String SQL,Class<T> entityClass){
        List<T> result=null;
        List<String> args=new ArrayList<>();
        String coutSql=getCountString(SQL);

        if(start<=0){
            SQL=getLimitString(SQL,false,start,limit);
            args.add(limit+"");
        }else{
            SQL=getLimitString(SQL,true,start,limit);
            args.add(start+"");
            args.add(limit+"");
        }
        logger.info("coutSql:"+coutSql+"\n");
        logger.info("args:"+args.toString()+"\n");
        int totalCount=getJdbcTemplate().queryForObject(coutSql, Integer.class);
        PagingImpl<T> paging=new PagingImpl<>(start,limit,totalCount,0);
        logger.info("sql:"+SQL+"\n");
        logger.info("args:"+args.toString()+"\n");
        result= (List<T>) getJdbcTemplate().query(SQL, new BeanPropertyRowMapper<T>(entityClass));
        if(null!=result&&result.size()>0)
            paging.setData(result);

        return paging;
    }
    public static  Paging<Map<String, Object>> $asPage(int start,int limit,String SQL){
        List<Map<String, Object>> result=null;
        List<String> args=new ArrayList<>();
        String coutSql=getCountString(SQL);

        if(start<=0){
            SQL=getLimitString(SQL,false,start,limit);
            args.add(limit+"");
        }else{
            SQL=getLimitString(SQL,true,start,limit);
            args.add(start+"");
            args.add(limit+"");
        }
        logger.info("coutSql:"+coutSql+"\n");
       // logger.info("args:"+args.toString()+"\n");
        int totalCount=getJdbcTemplate().queryForObject(coutSql, Integer.class);
        logger.info("totalCount:"+totalCount+"\n");
        PagingImpl<Map<String, Object>> paging=new PagingImpl<>(start,limit,totalCount,0);
        logger.info("sql:"+SQL+"\n");
        result= getJdbcTemplate().queryForList(SQL);
        List<Map<String, Object>> lowerMapKey=new ArrayList<>();
        if(null!=result&&result.size()>0){
            for(Map<String, Object> map:result){
                Map nmap=new HashMap<>();
                Iterator<Map.Entry<String, Object>> it = map.entrySet().iterator();
                while (it.hasNext()) {
                    Map.Entry<String, Object> entry = it.next();
                    String key= entry.getKey();
                    key=key.toLowerCase();
                    nmap.put(key, entry.getValue());
                }
                lowerMapKey.add(nmap);
            }
            paging.setData(lowerMapKey);
        }
        return paging;
    }
    public static <T> Paging<T> $asPage(int start,int limit,String SQL,Class<T> entityClass,int pagePerGroup){
        List<T> result=null;
        List<String> args=new ArrayList<>();
        String coutSql=getCountString(SQL);

        if(start<=0){
            SQL=getLimitString(SQL,false,start,limit);
            args.add(limit+"");
        }else{
            SQL=getLimitString(SQL,true,start,limit);
            args.add(start+"");
            args.add(limit+"");
        }
        logger.info("coutSql:"+coutSql+"\n");
        logger.info("args:"+args.toString()+"\n");
        int totalCount=getJdbcTemplate().queryForObject(coutSql, Integer.class);
        PagingImpl<T> paging=new PagingImpl<>(start,limit,totalCount,pagePerGroup);
        logger.info("sql:"+SQL+"\n");
        logger.info("args:"+args.toString()+"\n");
        result= (List<T>) getJdbcTemplate().query(SQL, new BeanPropertyRowMapper<T>(entityClass));
        if(null!=result&&result.size()>0)
            paging.setData(result);

        return paging;
    }
    public static  Paging<Map<String, Object>> $asPage(int start,int limit,String SQL,int pagePerGroup){
        List<Map<String, Object>> result=null;
        List<String> args=new ArrayList<>();
        String coutSql=getCountString(SQL);

        if(start<=0){
            SQL=getLimitString(SQL,false,start,limit);
            args.add(limit+"");
        }else{
            SQL=getLimitString(SQL,true,start,limit);
            args.add(start+"");
            args.add(limit+"");
        }
        logger.info("coutSql:"+coutSql+"\n");
        logger.info("args:"+args.toString()+"\n");
        int totalCount=getJdbcTemplate().queryForObject(coutSql, Integer.class);
        PagingImpl<Map<String, Object>> paging=new PagingImpl<>(start,limit,totalCount,pagePerGroup);
        logger.info("sql:"+coutSql+"\n");
        logger.info("args:"+args.toString()+"\n");
        result= getJdbcTemplate().queryForList(SQL);
        List<Map<String, Object>> lowerMapKey=new ArrayList<>();
        if(null!=result&&result.size()>0){
            for(Map<String, Object> map:result){
                Map nmap=new HashMap<>();
                Iterator<Map.Entry<String, Object>> it = map.entrySet().iterator();
                while (it.hasNext()) {
                    Map.Entry<String, Object> entry = it.next();
                    String key= entry.getKey();
                    key=key.toLowerCase();
                    nmap.put(key, entry.getValue());
                }
                lowerMapKey.add(nmap);
            }
            paging.setData(lowerMapKey);
        }
        return paging;
    }

    public static String getLimitString(String sql, boolean hasOffset,int start,int limit) {
        return (new StringBuffer(sql.length() + 20)).append(sql).append(hasOffset ? " limit " + start + ", " + limit : " limit " + limit).toString();
    }
    public static String getCountString(String sql) {
        return "select count(*) from (" + sql + ") t";
    }

    public static List<Map<String, Object>> $queryForList(String sql,Object... args){
        logger.info("sql:"+sql+"\n");
        logger.info("args:"+args.toString()+"\n");
        return getJdbcTemplate().queryForList(sql,args);
    }
    public static  List<Map<String, Object>> $queryForList(int start,int limit,String SQL){
        List<Map<String, Object>> result=null;
        List<String> args=new ArrayList<>();
        if(start<=0){
            SQL=getLimitString(SQL,false,start,limit);
            args.add(limit+"");
        }else{
            SQL=getLimitString(SQL,true,start,limit);
            args.add(start+"");
            args.add(limit+"");
        }
        logger.info("args:"+args.toString()+"\n");
        logger.info("args:"+SQL+"\n");
        result= getJdbcTemplate().queryForList(SQL);
        List<Map<String, Object>> lowerMapKey=new ArrayList<>();
        if(null!=result&&result.size()>0){
            for(Map<String, Object> map:result){
                Map nmap=new HashMap<>();
                Iterator<Map.Entry<String, Object>> it = map.entrySet().iterator();
                while (it.hasNext()) {
                    Map.Entry<String, Object> entry = it.next();
                    String key= entry.getKey();
                    key=key.toLowerCase();
                    nmap.put(key, entry.getValue());
                }
                lowerMapKey.add(nmap);
            }
        }
        return lowerMapKey;
    }

    //执行增加，删除sql语句
    public static int $asUpdate(String sql,Object... args){
        logger.info("sql:"+sql+"\n");
        logger.info("args:"+Arrays.asList(args).toString()+"\n");
        return getJdbcTemplate().update(sql,args);
    }
    public static int $asInt(String sql){
        logger.info("sql:"+sql+"\n");
        Object o=getJdbcTemplate().queryForObject(sql, Object.class);
        if(o==null) return 0;
        else return Integer.parseInt(o.toString());
    }

    public static int $asInt(String sql,Object... args){
        logger.info("sql:"+sql+"\n");
        logger.info("args:"+Arrays.asList(args).toString()+"\n");
        List o =getJdbcTemplate().query(sql,args,new SingleColumnRowMapper<Object>());
        if(o==null) return 0;
        else if(o.size()>0&&o.get(0)!=null) return Integer.parseInt(o.get(0).toString());
        else return 0;
    }
    public static int $asIntFtl(String tempPath,Map root) throws IOException, TemplateException {
        String sql=getTemplateString(tempPath,root);
        logger.info("sql:"+sql+"\n");
        Object o=getJdbcTemplate().queryForObject(sql, Object.class);
        if(o==null) return 0;
        else return Integer.parseInt(o.toString());
    }

    public static Paging<Map<String, Object>> $asPageFtl(String tempPath, Map params) throws IOException, TemplateException {
        if(params.get("start")==null|| params.get("limit")==null) return null;
        int start=Integer.parseInt((String)params.get("start"));
        int limit=Integer.parseInt((String) params.get("limit"));
        String sql=getTemplateString(tempPath,params);
        int pagePerGroup=0;
        if(params.get("pagePerGroup")!=null){
            pagePerGroup=Integer.parseInt((String) params.get("pagePerGroup"));
        }
        if(pagePerGroup!=0){
            return $asPage(start,limit,sql,pagePerGroup);
        }
        return $asPage(start,limit,sql);
    }

    public static <T> List<T> $findOrder(Class<T> entityClass,String orderby,Object... propertyAndValues){
        List<T> student=null;
        String SQL = "select * from";
        String table=entityClass.getName();
        if(table.indexOf(".")!=-1){
            table=table.substring(table.lastIndexOf(".")+1);
            table=table.toLowerCase();
        }
        SQL=SQL+" "+table;
        int sql1=0;
        StringBuilder where = new StringBuilder();
        List<String> args=new ArrayList<>();
        while(true) {
            if(sql1 >= propertyAndValues.length) {
                break;
            }
            String name =propertyAndValues[sql1].toString();
            if(where.length() > 1) {
                where.append(" and ");
            }

            Object value = propertyAndValues[sql1 + 1];
            where.append(name);
            if(null != value) {
                if("not null".equals(value)) {
                    where.append(" is not null");
                } else {
                    where.append("=?");
                    args.add(value.toString());
                }
            } else {
                where.append(" is null");
            }


            sql1 += 2;
        }
        if(where.length()>0)
            SQL=SQL+" "+"where"+" "+where.toString();
        if(orderby!=null)
            SQL=SQL+" "+orderby;

        logger.info("sql:"+SQL+"\n");
        logger.info("args:"+args.toString()+"\n");
        student= (List<T>) getJdbcTemplate().query(SQL, args.toArray(new String[]{}), new BeanPropertyRowMapper<T>(entityClass));
        return (List<T>) student;
    }

    public static List<Map<String, Object>> $queryForLisFtl(String tempPath,Map params) throws IOException, TemplateException {
        String sql=getTemplateString(tempPath,params);
        if(params.get("start")==null|| params.get("limit")==null){
            logger.info("sql:"+sql+"\n");
            return getJdbcTemplate().queryForList(sql);
        }else{
            int start=Integer.parseInt((String)params.get("start"));
            int limit=Integer.parseInt((String) params.get("limit"));
            return $queryForList(start,limit,sql);
        }
    }


    public static int $asUpdateFtl(String tempPath,Map params) throws IOException, TemplateException {
        String sql=getTemplateString(tempPath,params);
        logger.info("sql:"+sql+"\n");
        return getJdbcTemplate().update(sql);
    }
    public static int $count(Class entityClass,Object... propertyAndValues) {
        String SQL = "select count(*) from";
        String table=entityClass.getName();
        if(table.indexOf(".")!=-1){
            table=table.substring(table.lastIndexOf(".")+1);
            table=table.toLowerCase();
        }
        SQL=SQL+" "+table;
        int sql1=0;
        StringBuilder where = new StringBuilder();
        List<String> args=new ArrayList<>();
        while(true) {
            if(sql1 >= propertyAndValues.length) {
                break;
            }
            String name =propertyAndValues[sql1].toString();
            if(where.length() > 1) {
                where.append(" and ");
            }

            Object value = propertyAndValues[sql1 + 1];
            where.append(name);
            if(null != value) {
                if("not null".equals(value)) {
                    where.append(" is not null");
                } else {
                    where.append("=?");
                    args.add(value.toString());
                }
            } else {
                where.append(" is null");
            }


            sql1 += 2;
        }
        if(where.length()>0)
            SQL=SQL+" "+"where"+" "+where.toString();
        logger.info("sql:"+SQL+"\n");
        logger.info("args:"+args.toString()+"\n");
        return $asInt(SQL,args.toArray(new String[args.size()]));
    }
}
