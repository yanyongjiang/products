select Max(fldsn) from bbsreplay where fldstatus='1'
      <#if fldfromid??>
      and fldfromid='${fldfromid}'
      <#else>
      and 0=1
      </#if>