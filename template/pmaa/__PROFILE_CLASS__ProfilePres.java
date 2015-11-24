//D:\Repo\pma\pmaa\pmaa-dpu\src\main\java\com\calix\pmaa\dpu\profile\upstreamdatarate\model\UpstreamDataRateProfilePres.java
package com.calix.pmaa.dpu.profile.__PROFILE_FOLDER__.model;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.BeanUtils;

import com.calix.pmaa.dpu.profile.global.model.AbstractGlobalProfile;
import com.calix.pmaa.dpu.validation.ProfileName;
import com.calix.pmapmaa.model.dpu.profile.__PROFILE_FOLDER__.__PROFILE_CLASS__Profile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class __PROFILE_CLASS__ProfilePres extends AbstractGlobalProfile<__PROFILE_CLASS__Profile> {

*__KEY__VARI__ is also used in method
   // @JsonProperty("__KEY__REST__")
   // @ProfileName
   // @NotEmpty
   // private String __KEY__VARI__;
    
    //@JsonProperty("maximum-net-data-rate")
    //private Long maximumNetDataRate;

    __PROFILE_ATTRIBUTES__
    
    @Override
    @JsonIgnore
    public String[] getKeyProperties() {
        return new String[] { "__KEY__VARI__" };
    }

//*Please add methods manually, it is not supported adding auto, for now.
    __PROFILE_PRE_CONVERT__

*Please add hashCode/equal/toString manually

}
