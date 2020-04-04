select b.*,a.fldsn,a.id as deptid from orgdeptuser a LEFT JOIN orguser b on a.fldyhid=b.id
where 1=1 <#if fldbmid??>
     and fldbmid='${fldbmid}'
      </#if>
     <#if qcon??>
    and (fldname like '%${qcon}%' or fldloginid like '%${qcon}%' or fldzw like '%${qcon}%')
    </#if>
      order by a.fldsn