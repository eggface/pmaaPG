//D:\Repo\pma\pmaa\pmaa-dpu\src\main\java\com\calix\pmaa\dpu\profile\upstreamdatarate\UpstreamDataRateProfileInventoryRest.java
package com.calix.pmaa.dpu.profile.transportservice;

import javax.annotation.Resource;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.calix.pmaa.common.db.IRepository;
import com.calix.pmaa.common.rest.PmaaRestException;
import com.calix.pmaa.dpu.profile.ProfileInventoryQuery;
import com.calix.pmaa.dpu.profile.ProfileInventoryQuery.InventoryInstanceFactory;
import com.calix.pmaa.dpu.profile.transportservice.model.TransportServiceProfilePres;
import com.calix.pmapmaa.model.dpu.profile.transportservice.TransportServiceProfile;

@Component
@Path("/config")
@Produces(MediaType.APPLICATION_JSON)
public class TransportServiceProfileInventoryRest {

    private static final Logger LOGGER = LoggerFactory.getLogger(TransportServiceProfileInventoryRest.class);
    @Resource(name = "iRepository")
    protected IRepository iRepository;

    private InventoryInstanceFactory<TransportServiceProfile, TransportServiceProfilePres> factory = new InventoryInstanceFactory<TransportServiceProfile, TransportServiceProfilePres>() {

        @Override
        public TransportServiceProfile newInventoryInstance() {
            return new TransportServiceProfile();
        }

        @Override
        public TransportServiceProfilePres newPresInstance() {
            return new TransportServiceProfilePres();
        }
    };
    private ProfileInventoryQuery<TransportServiceProfile, TransportServiceProfilePres> query;

    public void init() {
        query = new ProfileInventoryQuery<>(iRepository, factory);
    }

    @GET
    @Path("/device/{device-name}/transport-service-profile")
    public Response queryByDevice(@PathParam("device-name") final String deviceName, @QueryParam("offset") int offset, @QueryParam("limit") int limit,
            @QueryParam("sort") String sorts, @QueryParam("fields") String fields) throws PmaaRestException {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("deviceName={}, offset={}, limit={}, sort={}, fields={}", deviceName, offset, limit, sorts, fields);
        }
        return query.queryByDevice(deviceName, offset, limit, sorts, fields);
    }

    @GET
    @Path("/device/{device-name}/transport-service-profile/{profile-name}")
    public Response queryByDeviceAndName(@PathParam("device-name") final String deviceName, @PathParam("profile-name") final String profileName,
            @QueryParam("fields") String fields) throws PmaaRestException {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("deviceName={}, fields={}", deviceName, fields);
        }
        return query.queryByDeviceAndId(deviceName, profileName, fields);
    }

    @GET
    @Path("/profile/transport-service-profile")
    public Response query(@QueryParam("offset") int offset, @QueryParam("limit") int limit, @QueryParam("sort") String sorts,
            @QueryParam("fields") String fields, @QueryParam("filter") String filter) throws PmaaRestException {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("offset={}, limit={}, sort={}, fields={}, filter={}", offset, limit, sorts, fields, filter);
        }
        return query.query(offset, limit, sorts, fields, filter);
    }
    
    @GET
    @Path("/profile/transport-service-profile/{profile-name}")
    public Response queryByName(@PathParam("profile-name") String profileName, @QueryParam("offset") int offset, @QueryParam("limit") int limit,
            @QueryParam("sort") String sorts, @QueryParam("fields") String fields, @QueryParam("filter") String filter) throws PmaaRestException {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("offset={}, limit={}, sort={}, fields={}, filter={}", offset, limit, sorts, fields, filter);
        }
        return query.queryById(profileName, offset, limit, sorts, fields, filter);
    }
}
