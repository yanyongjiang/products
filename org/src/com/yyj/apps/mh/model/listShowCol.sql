select * from Mhcolumn
where 1=1 and state='1'
     <#if fldparentid??>
     and fldparentid='${fldparentid}'
     <#else>
     and (fldparentid is null or fldparentid='')
     </#if>
       <#if fldpicnotnull??>
     and fldpic is not null
     </#if>
     <#if id??>
     and id='${id}'
     </#if>
     <#if qcon??>
     and (fldtm like '%${qcon}%' or fldcontent like '%${qcon}%' or fldlink like '%${qcon}%')
     </#if>
      order by fldsn