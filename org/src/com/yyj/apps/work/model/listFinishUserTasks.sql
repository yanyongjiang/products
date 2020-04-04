select * from orgtask
where fldlast='1' and fldfinishtime is not null and (state!='1' or state is null)
      <#if fldassginid??>
      and fldassginid='${fldassginid}'
      <#else>
      and 0=1
      </#if>
        <#if qcon??>
    and (fldtm like '%${qcon}%' or initusername like '%${qcon}%' or initbm like '%${qcon}%')
    </#if>
      order by fldcretime desc