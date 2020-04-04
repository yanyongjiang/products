select Max(fldsn) from orgdeptuser
where <#if fldbmid??>
      fldbmid='${fldbmid}'
      <#else>
      0=1
      </#if>