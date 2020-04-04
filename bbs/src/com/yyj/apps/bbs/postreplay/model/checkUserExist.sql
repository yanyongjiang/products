select COUNT(*) from Bbsuser a where 1=1
<#assign hasCon = false/>
<#if notid??>
and a.id!='${notid}'
<#assign hasCon = true/>
</#if>
<#if fldloginid??>
and a.fldloginid='${fldloginid}'
<#assign hasCon = true/>
</#if>
<#if fldname??>
and a.fldname='${fldname}'
<#assign hasCon = true/>
</#if>
<#if !hasCon>
    and 0=1
</#if>