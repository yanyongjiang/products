select Max(fldsn) from orgdept
where <#if fldparentid??>
      fldparentid='${fldparentid}'
      <#else>
      fldparentid is null
      </#if>