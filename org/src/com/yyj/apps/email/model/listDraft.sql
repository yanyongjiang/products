select 
    a.*,
    b.fldtm,
    b.fldcontent,
    b.inituserid,
    b.initusername,
    b.initbmid,
    b.initbm,
    b.initdeptid,
    b.initdeptname,
    b.initunitid,
    b.initunitname,
    b.fldngtime,
    b.fldsjrs,
    b.fldsjrids,
    b.fldcsrs,
    b.fldcsrids,
    b.fldmsrs,
    b.fldmsrids
from orgemail a LEFT JOIN orgemailcon b
ON a.fldcontentid=b.id
where 1=1
      and state='1'
      <#if fldsjrid??>
      and fldsjrid='${fldsjrid}'
      </#if>
      <#if fldtype??>
      and fldtype='${fldtype}'
      </#if>
       <#if fldboxid??>
      and fldboxid='${fldboxid}'
      </#if>
       <#if consql??>
      and (${consql})
      </#if>
      <#if qcon??>
      and (b.fldtm like '%${qcon}%' or b.initusername like '%${qcon}%' or b.initbm like '%${qcon}%')
      </#if>
      order by b.fldngtime desc