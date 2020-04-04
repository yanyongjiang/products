select * from Mhattach
where 1=1
      <#if fldtype??>
      and fldtype='${fldtype}'
      <#assign assign=true>
      <#else>
      and (fldtype='' or fldtype is null)
      </#if>
      <#if pkid??>
      <#assign assign=true>
      and pkid='${pkid}'
      </#if>
      <#if pkids??&&(pkids?size>0)>
      <#assign assign=true>
      and pkid in(<#list pkids as onepkid>'${onepkid}'<#if onepkid_has_next>,</#if></#list>)
      </#if>
      <#if !assign>
      0=1
      </#if>
      order by fldngdate