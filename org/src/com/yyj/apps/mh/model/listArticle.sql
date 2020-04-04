select * from mharticle
where 1=1 and state='1'
     <#if fldlmid??>
     and fldlmid='${fldlmid}'
     </#if>
      <#if fldisfb??>
     and fldisfb='${fldisfb}'
     </#if>
      <#if fldpicnotnull??>
     and fldpic is not null
     </#if>
     <#if qcon??>
     and (fldtm like '%${qcon}%' or fldcontent like '%${qcon}%' or fldlink like '%${qcon}%')
     </#if>
     <#if orderby??>
      ${orderby}
     <#else>
     order by fldsn
     </#if>
