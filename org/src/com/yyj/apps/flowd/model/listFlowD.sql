select * from flowdef
where 1=1
     <#if state??>
     and state='${state}'
     <#else>
     and state='1'
     </#if>
     <#if fldcatid??>
     and fldcatid='${fldcatid}'
     </#if>
     <#if fldtype??>
     and fldtype='${fldtype}'
     </#if>
     <#if qcon??>
     and (fldtm like '%${qcon}%' or fldcontent like '%${qcon}%' or fldver like '%${qcon}%')
     </#if>
     <#if orderby??>
      ${orderby}
     <#else>
     order by fldsn
     </#if>
