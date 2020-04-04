select Max(fldsn) from flowcatalog
where state='1'
      <#if fldparentid??>
      and fldparentid='${fldparentid}'
      <#else>
      and fldparentid is null
      </#if>