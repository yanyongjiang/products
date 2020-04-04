update Orgcomtip set fldacctime='${fldacctime}'
where
      <#if fldtipuserid??&&fldbuk??>
       fldtipuserid='${fldtipuserid}' and fldbuk='${fldbuk}'
      <#else>
       0=1
      </#if>
