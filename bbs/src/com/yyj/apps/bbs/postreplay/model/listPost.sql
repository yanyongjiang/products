      select a.*,b.fldloginid,b.fldname from bbspost a,bbsuser b where a.flduserid=b.id
      <#if notfldstatus??>
      <#else>
      and fldstatus='1'
      </#if>
    <#if qcon??>
    and fldtm like '%${qcon}%'
    </#if>
       order by fldngdate desc
