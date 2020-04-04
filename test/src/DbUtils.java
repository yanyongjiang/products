import com.yyj.utils.db.Paging;
import com.yyj.utils.db.PagingImpl;
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
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.jdbc.support.rowset.SqlRowSetMetaData;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.lang.reflect.Field;
import java.util.*;

/**
 * ҵ��ģ������:�����ݿ���ʹ����࣬ϵͳ�������ݿⶼʹ�ø��ࡿ
 * ����: ��ӵ��
 * ����: 2018/03/01 11:50
 */
public class DbUtils {

    public static JdbcTemplate jdbcTemplate=null;
    public static Configuration cfg=null;
    private static Logger logger = LogManager.getLogger(LogManager.ROOT_LOGGER_NAME);


    public static Configuration getConfiguration(){
        if(cfg==null){
            Configuration cfg = new Configuration(Configuration.VERSION_2_3_22);
            cfg.setClassForTemplateLoading(DbUtils.class,"/");
            cfg.setDefaultEncoding("UTF-8");
        }
        return cfg;
    }

    public static String getTemplateString(String tempPath,Map root) throws IOException, TemplateException {
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
        String[] insertargs=new String[fields.length];
        String[] updateargs=new String[fields.length];
        int i=0;
        int j=0;
        String fieldsStr="(";
        String valueStr="(";
        String updateValueStr="";
        for ( Field field : fields )
        {
            // �����Ϊ�գ����ÿɼ��ԣ�Ȼ�󷵻�
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
                // �����ֶοɼ���������get������ȡ����ֵ��
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
                    updateargs[j]=field.get(entity)+"";
                    j++;
                }else if(j==0&&!"id".equals(field.getName())){
                    updateValueStr+=field.getName()+"=?";
                    updateargs[j]=field.get(entity)+"";
                    j++;
                }
                insertargs[i]=field.get(entity)+"";
                i++;

        }
        fieldsStr+=")";
        valueStr+=")";

        sql+=fieldsStr+" values "+valueStr;
        if(!newEntityId){
            //ִ�в�ѯ��䣬�����ǲ���Ҫִ��update���
            T existEntity=$get((Class<T>) entity.getClass(),entityId);
            if(existEntity!=null) { //ִ��update���
                //String SQL = "update Student set age = ? where id = ?";
                updateSql+=updateValueStr+" where id=?";
                updateargs[updateargs.length-1]=entityId;
                logger.info("sql:"+updateSql+"\n");
                logger.info("args:"+updateargs.toString()+"\n");
                int t=getJdbcTemplate().update(updateSql, updateargs);
            }else{
                //ִ�в������
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
        logger.info("args:"+args.toString()+"\n");
        int totalCount=getJdbcTemplate().queryForObject(coutSql, Integer.class);
        PagingImpl<Map<String, Object>> paging=new PagingImpl<>(start,limit,totalCount,0);
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
    //ִ�����ӣ�ɾ��sql���
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
    public static String gernateTableClass(String tableName) {
        List<Map> tableFieldList=new ArrayList<>();
        String sql = "select * from " + tableName;
        SqlRowSet sqlRowSet = getJdbcTemplate().queryForRowSet(sql);
        SqlRowSetMetaData sqlRsmd = sqlRowSet.getMetaData();
        int columnCount = sqlRsmd.getColumnCount();
        for (int i = 1; i <= columnCount; i++) {
            Map<String, String> fieldMap = new HashMap<String, String>();
            fieldMap.put("name", sqlRsmd.getColumnName(i));
            fieldMap.put("fieldType", String.valueOf(sqlRsmd.getColumnType(i)));
            tableFieldList.add(fieldMap);
        }
        StringBuffer sb=new StringBuffer();
        sb.append("public class "+tableName+"{\n");
        boolean hasTime=false;
        if(tableFieldList.size()>0){
            for(Map p:tableFieldList){
                    String fieldType= (String) p.get("fieldType");
                    if("12".equals(fieldType)){
                        fieldType="String";
                    }
                    if("4".equals(fieldType)){
                        fieldType="Integer";
                    }
                    if("93".equals(fieldType)){
                        fieldType="Timestamp";
                        hasTime=true;
                    }//String
                    if("-1".equals(fieldType)){
                        fieldType="String";
                    }
                    sb.append("private "+fieldType+" "+p.get("name")+";\n");
            }
        }
        sb.append("}");
        if(hasTime){
            return "import java.sql.Timestamp;\n\n"+sb.toString();
        }
        else
        return sb.toString();
    }
    public static void main(String[] args){
        System.out.println(DbUtils.gernateTableClass("Flowdef"));
    }

    public static int $asIntFtl(String tempPath,Map root) throws IOException, TemplateException {
        String sql=getTemplateString(tempPath,root);
        logger.info("sql:"+sql+"\n");
        Object o=getJdbcTemplate().queryForObject(sql, Object.class);
        if(o==null) return 0;
        else return Integer.parseInt(o.toString());
    }
}
