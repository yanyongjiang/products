select Max(fldsn) from mhcolumn
where state='1'
      <#if fldparentid??>
      and fldparentid='${fldparentid}'
      <#else>
      and fldparentid is null
      </#if>