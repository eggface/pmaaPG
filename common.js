/**
 * Created by JamesWang on 11/16/15.
 * Common using methods or configuration
 */
module.exports = {

    mylog: {
        p: function (msg) {
            console.log(msg);
        },
        pTips: function (msg) {
            //36: CYAN
            console.log('\x1b[36m', msg, '\x1b[0m');
        },
        pErr: function (msg) {
            //41: red
            console.log('\x1b[41m', "[Error] " + msg, '\x1b[0m');
        },
        pNoS: function (msg) {
            //41: red
            console.log('\x1b[35m', "[Not Supported] " + msg, '\x1b[0m');
        }
    },

    conf: {
        folder : {
            template: "./template",
            output: "./output",
        },
        file : {
            //Files
            dpu_service: "/resources/dpu-service.xml",
            restapi: "/resources/__PROFILE_CLASS__restapi_inventory.tmplate.json",
            q_name: "/common/AbstractQNameConstants.java",
            profile: "/common/__PROFILE_CLASS__Profile.java",
            profile_dpu: "/implementation/__PROFILE_CLASS__ProfileDPU.java",
            profile_inventory_rest: "/pmaa/__PROFILE_CLASS__ProfileInventoryRest.java",
            profile_pres: "/pmaa/__PROFILE_CLASS__ProfilePres.java",

        },
        //Input netconf template
        netconf_input: __dirname + "/netconf.xml",

        template_attr: "\n\
    @JsonProperty(\"__ATTRIBUTE_REST__\")\n\
    private __ATTRIBUTE_TYPE__ __ATTRIBUTE_VARI__;\n\
\n\
    public __ATTRIBUTE_TYPE__ get__ATTRIBUTE_CLASS__() {\n\
        return __ATTRIBUTE_VARI__;\n\
    }\n\
\n\
    public void set__ATTRIBUTE_CLASS__(__ATTRIBUTE_TYPE____ATTRIBUTE_VARI__) {\n\
        this.__ATTRIBUTE_VARI__ = __ATTRIBUTE_VARI__;\n\
    }\n",

        convert:{
            dpu:{
                body: "\n\
    @Override \n\
    public DPUNtwkObj<__PROFILE_CLASS__Profile> convertFrom(__PROFILE_CLASS__Profile northBasePojo) { \n\
        BeanUtils.copyProperties(northBasePojo, this); \n\
        __CONVERT_FROM_INNER__ \n\
        return this;\n\
    }\n\
\n\
    @Override\n\
    public __PROFILE_CLASS__Profile convertTo() {\n\
        __PROFILE_CLASS__Profile profilePojo = new __PROFILE_CLASS__Profile();\n\
        BeanUtils.copyProperties(this, profilePojo);\n\
        __CONVERT_TO_INNER__ \n\
        return profilePojo;\n\
    }",
                from_inner:"\n\
        if (null != northBasePojo.get__ATTRIBUTE_CLASS__() && northBasePojo.get__ATTRIBUTE_CLASS__().size() != 0) { \n\
            List<__ATTRIBUTE_CLASS__DPU> targetList = new ArrayList<__ATTRIBUTE_CLASS__DPU>(); \n\
             \n\
            for (__ATTRIBUTE_CLASS__ pojo : northBasePojo.get__ATTRIBUTE_CLASS__()) { \n\
                __ATTRIBUTE_CLASS__DPU dpuData = new __ATTRIBUTE_CLASS__DPU(); \n\
                BeanUtils.copyProperties(pojo, dpuData); \n\
                targetList.add(dpuData); \n\
            }\n\
            this.set__ATTRIBUTE_CLASS__(targetList);\n\
        }\n",
                to_inner:"\n\
        if (null != this.get__ATTRIBUTE_CLASS__() && this.get__ATTRIBUTE_CLASS__().size() != 0) {\n\
          List<__ATTRIBUTE_CLASS__> targetList = new ArrayList<__ATTRIBUTE_CLASS__>();\n\
    \n\
          for (__ATTRIBUTE_CLASS__DPU dpuData : this.get__ATTRIBUTE_CLASS__()) {\n\
              __ATTRIBUTE_CLASS__ pojo = new __ATTRIBUTE_CLASS__();\n\
              BeanUtils.copyProperties(dpuData, pojo);\n\
              targetList.add(pojo);\n\
          }\n\
          profilePojo.set__ATTRIBUTE_CLASS__(targetList);\n\
        }\n"
            },//End dpu
            pre:{
                body: "\n\
    @Override\n\
    public __PROFILE_CLASS__ProfilePres convertFrom(__PROFILE_CLASS__Profile pojo) {\n\
        BeanUtils.copyProperties(pojo, this);\n\
        __CONVERT_FROM_INNER__ \n\
        return this;\n\
    }\n\
\n\
    @Override\n\
    public __PROFILE_CLASS__Profile convertTo() {\n\
        __PROFILE_CLASS__Profile profilePojo = new __PROFILE_CLASS__Profile();\n\
        BeanUtils.copyProperties(this, profilePojo);\n\
        __CONVERT_TO_INNER__ \n\
        return profilePojo;\n\
    }",
                from_inner: "\n\
        if (null != pojo.get__ATTRIBUTE_CLASS__() && pojo.get__ATTRIBUTE_CLASS__().size() != 0) {\n\
            List<__ATTRIBUTE_CLASS__Pres> targetList = new ArrayList<__ATTRIBUTE_CLASS__Pres>();\n\
            \n\
            for (__ATTRIBUTE_CLASS__ pojoData : pojo.get__ATTRIBUTE_CLASS__()) {\n\
                __ATTRIBUTE_CLASS__Pres presData = new __ATTRIBUTE_CLASS__Pres();\n\
                BeanUtils.copyProperties(pojoData, presData);\n\
                targetList.add(presData);\n\
            }\n\
            this.set__ATTRIBUTE_CLASS__(targetList);\n\
        }\n",
                to_inner: "\n\
        if (null != this.get__ATTRIBUTE_CLASS__() && this.get__ATTRIBUTE_CLASS__().size() != 0) {\n\
          List<__ATTRIBUTE_CLASS__> targetList = new ArrayList<__ATTRIBUTE_CLASS__>();\n\
        \n\
          for (__ATTRIBUTE_CLASS__Pres presData : this.get__ATTRIBUTE_CLASS__()) {\n\
              __ATTRIBUTE_CLASS__ pojo = new __ATTRIBUTE_CLASS__();\n\
              BeanUtils.copyProperties(presData, pojo);\n\
              targetList.add(pojo);\n\
          }\n\
          profilePojo.set__ATTRIBUTE_CLASS__(targetList);\n\
        }\n"
            }//End pre
        }//End convert

    },

    myIo: {
        write: function write(file, str) {
            var fs = require('fs');
            fs.writeFile(file, str, function (err) {
                if (err) {
                    return mylog.p(err);
                }

                mylog.p("The file [" + file + "] was saved!");
            });
        },

        append:function append(file, str) {
            var fs = require('fs');
            fs.appendFile(file, str, function (err) {
                if (err) {
                    return mylog.p(err);
                }

                mylog.p("The file [" + file + "] was appended!");
            });
        },

        read:function read(file) {
            var fs = require("fs");

            // Synchronous read
            return fs.readFileSync(file).toString();
        }
    },

    util: {
        from_rest_name: {
            //var rest_name = "upstream-data-rate";
            getVariName: function(rest_name){
                //var vari_name = "upstreamDataRate";
                return rest_name.replace(/-\w/g, function(word_presub){
                    return word_presub.charAt(1).toUpperCase();
                });
            },
            getClassName: function(rest_name){
                //var class_name = "UpstreamDataRate";
                var vari_name = this.getVariName(rest_name);
                return vari_name.substring(0,1).toUpperCase() + vari_name.substring(1);
            },
            getFolderName: function(rest_name){
                //var folder_name = "upstreamdatarate";
                return rest_name.replace(/-/g, "");
            },
            getConstName: function(rest_name){
                //var const_name = "UPSTREAM_DATA_RATE";
                var const_name = rest_name.toUpperCase();
                return const_name.replace(/-/g, "_");
            }
        }

    }

}
