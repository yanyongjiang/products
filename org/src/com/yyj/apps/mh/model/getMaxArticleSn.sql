select Max(fldsn) from mharticle
where 1=1 and state='1'
     <#if fldlmid??>
     and fldlmid='${fldlmid}'
     </#if>