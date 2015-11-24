//D:\Repo\pma\pmaa\pmaa-dpu\src\main\java\com\calix\pmaa\dpu\profile\upstreamdatarate\model\UpstreamDataRateProfilePres.java
package com.calix.pmaa.dpu.profile.transportservice.model;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.BeanUtils;

import com.calix.pmaa.dpu.profile.global.model.AbstractGlobalProfile;
import com.calix.pmaa.dpu.validation.ProfileName;
import com.calix.pmapmaa.model.dpu.profile.transportservice.TransportServiceProfile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class TransportServiceProfilePres extends AbstractGlobalProfile<TransportServiceProfile> {

*__KEY__VARI__ is also used in method
   // @JsonProperty("__KEY__REST__")
   // @ProfileName
   // @NotEmpty
   // private String __KEY__VARI__;
    
    //@JsonProperty("maximum-net-data-rate")
    //private Long maximumNetDataRate;

    
    @JsonProperty("tsp-name")
    private String tspName;

    public String getTspName() {
        return tspName;
    }

    public void setTspName(StringtspName) {
        this.tspName = tspName;
    }

    @JsonProperty("vlan-list")
    private List vlanList;

    public List getVlanList() {
        return vlanList;
    }

    public void setVlanList(ListvlanList) {
        this.vlanList = vlanList;
    }

    @JsonProperty("description")
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(Stringdescription) {
        this.description = description;
    }

    
    @Override
    @JsonIgnore
    public String[] getKeyProperties() {
        return new String[] { "__KEY__VARI__" };
    }

//*Please add methods manually, it is not supported adding auto, for now.
    
    @Override
    public TransportServiceProfilePres convertFrom(TransportServiceProfile pojo) {
        BeanUtils.copyProperties(pojo, this);
        
        if (null != pojo.getVlanList() && pojo.getVlanList().size() != 0) {
            List<VlanListPres> targetList = new ArrayList<VlanListPres>();
            
            for (VlanList pojoData : pojo.getVlanList()) {
                VlanListPres presData = new VlanListPres();
                BeanUtils.copyProperties(pojoData, presData);
                targetList.add(presData);
            }
            this.setVlanList(targetList);
        }
 
        return this;
    }

    @Override
    public TransportServiceProfile convertTo() {
        TransportServiceProfile profilePojo = new TransportServiceProfile();
        BeanUtils.copyProperties(this, profilePojo);
        
        if (null != this.getVlanList() && this.getVlanList().size() != 0) {
          List<VlanList> targetList = new ArrayList<VlanList>();
        
          for (VlanListPres presData : this.getVlanList()) {
              VlanList pojo = new VlanList();
              BeanUtils.copyProperties(presData, pojo);
              targetList.add(pojo);
          }
          profilePojo.setVlanList(targetList);
        }
 
        return profilePojo;
    }

*Please add hashCode/equal/toString manually

}
