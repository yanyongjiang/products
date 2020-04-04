      select a.* from bbschartcont a where 1=1
      <#assign hasCon = false/>
      <#if fldfrom??>
      and (fldfrom='${fldfrom}' or fldto='${fldfrom}')
      <#assign hasCon = true/>
      </#if>
         <#if fldto??>
      and (fldfrom='${fldto}' or fldto='${fldto}')
      <#assign hasCon = true/>
      </#if>
      <#if !hasCon>
          and 0=1
      </#if>
       order by fldngdate desc
