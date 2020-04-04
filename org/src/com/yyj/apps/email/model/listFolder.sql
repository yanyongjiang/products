select * from Orgemailfolder
where state='1' <#if fldparentid??>
      and fldparentid='${fldparentid}'
      <#else>
      and fldparentid is null
      </#if>
      <#if inituserid??>
      and inituserid='${inituserid}'
      </#if>
order by fldsn