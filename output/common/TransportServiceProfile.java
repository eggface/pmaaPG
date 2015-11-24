//D:\Repo\pma\common\src\main\java\com\calix\pmapmaa\model\dpu\profile\upstreamdatarate\UpstreamDataRateProfile.java

package com.calix.pmapmaa.model.dpu.profile.transportservice;

import com.calix.pmapmaa.model.AbstractQNameConstants;
import com.calix.pmapmaa.model.BasePojo;

public class TransportServiceProfile extends BasePojo{
	public static final String QNAME = AbstractQNameConstants.TRANSPORT_SERVICE_PROFILE;
    
    //To BE ADDED MANUALLY: attributes
    
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


    To BE Generated in eclipse MANUALLY: equal/hashCode/toString

}
