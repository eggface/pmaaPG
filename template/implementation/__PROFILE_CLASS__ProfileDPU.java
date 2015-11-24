//D:\Repo\pma\exaplugin\implementation\src\main\java\org\opendaylight\calix\exaplugin\dpu\profile\upstreamdatarate\UpstreamDataRateProfileDPU.java
package org.opendaylight.calix.exaplugin.dpu.profile.__PROFILE_FOLDER__;

import org.opendaylight.calix.exaplugin.rest.pojo.AbstractDPUNtwkObj;
import org.opendaylight.calix.exaplugin.rest.pojo.DPUNtwkObj;
import org.springframework.beans.BeanUtils;

import com.calix.pmapmaa.model.AbstractQNameConstants;
import com.calix.pmapmaa.model.dpu.profile.__PROFILE_FOLDER__.__PROFILE_CLASS__Profile;
import com.fasterxml.jackson.annotation.JsonProperty;

public class __PROFILE_CLASS__ProfileDPU extends AbstractDPUNtwkObj<__PROFILE_CLASS__Profile>{
	public static final String QNAME = AbstractQNameConstants.__PROFILE_CONST___PROFILE;

*Please double confirm value manually.
    public static final String PARENT_PATH = "bbf-fast:configs/profiles";
    
*Please replace __KEY_ATTR__ as the key attribute. It is not replaced automatically, for now.
    String __KEY_ATTR__;

    __PROFILE_ATTRIBUTES__

//	@JsonProperty("minimum-gamma-data-rate")
//	Long minimumGammaDataRate=0L;
    
	@Override
	public String getPojoParentPath() {
		return PARENT_PATH;
	}

	@Override
	public String getQName() {
		return QNAME;
	}

	@Override
	public String getPojoID() {
		return __KEY_ATTR__;
	}

	@Override
	public String getKeyPath() {
		return getPojoParentPath() + "/" + getQName() + "/" + getPojoID();
	}
	
*Please generate hashCode/equal/toString

//*Please add convertTo and convertFrom. for now
    __PROFILE_DPU_CONVERT__

}
