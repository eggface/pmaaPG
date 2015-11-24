//D:\Repo\pma\exaplugin\implementation\src\main\java\org\opendaylight\calix\exaplugin\dpu\profile\upstreamdatarate\UpstreamDataRateProfileDPU.java
package org.opendaylight.calix.exaplugin.dpu.profile.transportservice;

import org.opendaylight.calix.exaplugin.rest.pojo.AbstractDPUNtwkObj;
import org.opendaylight.calix.exaplugin.rest.pojo.DPUNtwkObj;
import org.springframework.beans.BeanUtils;

import com.calix.pmapmaa.model.AbstractQNameConstants;
import com.calix.pmapmaa.model.dpu.profile.transportservice.TransportServiceProfile;
import com.fasterxml.jackson.annotation.JsonProperty;

public class TransportServiceProfileDPU extends AbstractDPUNtwkObj<TransportServiceProfile>{
	public static final String QNAME = AbstractQNameConstants.TRANSPORT_SERVICE_PROFILE;

*Please double confirm value manually.
    public static final String PARENT_PATH = "bbf-fast:configs/profiles";
    
*Please replace __KEY_ATTR__ as the key attribute. It is not replaced automatically, for now.
    String __KEY_ATTR__;

    
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
    
    @Override 
    public DPUNtwkObj<TransportServiceProfile> convertFrom(TransportServiceProfile northBasePojo) { 
        BeanUtils.copyProperties(northBasePojo, this); 
        
        if (null != northBasePojo.getVlanList() && northBasePojo.getVlanList().size() != 0) { 
            List<VlanListDPU> targetList = new ArrayList<VlanListDPU>(); 
             
            for (VlanList pojo : northBasePojo.getVlanList()) { 
                VlanListDPU dpuData = new VlanListDPU(); 
                BeanUtils.copyProperties(pojo, dpuData); 
                targetList.add(dpuData); 
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
    
          for (VlanListDPU dpuData : this.getVlanList()) {
              VlanList pojo = new VlanList();
              BeanUtils.copyProperties(dpuData, pojo);
              targetList.add(pojo);
          }
          profilePojo.setVlanList(targetList);
        }
 
        return profilePojo;
    }

}
