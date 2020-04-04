select Max(fldsn) from Orgemailfolder
where 1=1 <#if fldparentid??>
      and fldparentid='${fldparentid}'
      <#else>
      and fldparentid is null
      </#if>
      <#if inituserid??>
      and inituserid='${inituserid}'
      </#if>