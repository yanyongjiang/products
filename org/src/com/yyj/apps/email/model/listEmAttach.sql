select * from orgemailattach
where <#if pkid??>
      pkid='${pkid}'
      <#else>
      0=1
      </#if>
      order by fldngdate