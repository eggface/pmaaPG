//var tspxml =
//    "<transport-service-profile>\
//        <tsp-name>\
//            <type>String</type>\
//        </tsp-name>\
//        <vlan-list>\
//            <type>List</type>\
//        </vlan-list>\
//        <description>\
//            <type>String</type>\
//        </description>\
//    </transport-service-profile>\
//    ";

/**
 * Created by JamesWang on 11/16/15.
 * Translate XML to JSON
 */
var com = require("./common.js");
mylog = com.mylog;
myIo = com.myIo;
util = com.util;
conf = com.conf;
template_attr = com.conf.template_attr;
template_convert = com.conf.convert;

module.exports = {
    //JSON in java
    //    ---profile_name
    //    ---attr_part
    //    ---dpu_convert_part
    //    ---pre_convert_part

    //callback parameter is a callback function, it should be called by caller to get callback result. 
    xml2java: function(callback){
        //var fs = require('fs');
        var xml2js = require('xml2js');
        var parser = new xml2js.Parser();
        //__dirname + '/netconf.xml';
        var prof_def = conf.netconf_input;
        mylog.p("Loading profile define XML file: " + prof_def);

        var json2java = function(json_obj){
            var rtn_obj = {
                profile_name: "",
                attr_part: "",
                dpu_convert_part: "",
                pre_convert_part: ""
            };

            //json_obj: { 'transport-service-profile':
            //               { 'tsp-name': [ 'JamesProfile2' ],
            //                 'vlan-list': [ '1', '2', '3', '4', '8' ],
            //                 description: [ 'jamesDescri' ] } }
            mylog.p("");
            mylog.p("In json2java function()...");

            //?Sub object

            for(var prop in json_obj){
                if (json_obj.hasOwnProperty(prop)) {
                    //Assume the first one is the rest object name.
                    var rest_name = prop;
                    //trim "-profile" at the last
                    //mylog.p("Rest name is: " + rest_name);
                    rest_name = rest_name.replace(/-?profile$/g, "");
                    rtn_obj.profile_name = rest_name;

                    //Loop props for attribute
                    var attrs = json_obj[prop];
                    //store attribute whose type is List
                    var list_att_name = [];
                    for(var prop_att in attrs){
                        if (attrs.hasOwnProperty(prop_att)) {
                            var attr_name = prop_att;
                            //mylog.p("Attribute name is: " + attr_name);
                            //mylog.p("Attribute value is: " + attrs[attr_name]);

                            var attr_obj = attrs[attr_name][0];
                            //mylog.p(attr_obj);

                            //Attribute type
                            var attr_type;
                            if(typeof(attr_obj) === 'object'){
                                if(null != attr_obj.type){
                                    attr_type = attr_obj.type[0];
                                    //mylog.p(attr_type);
                                    //mylog.p("attr_obj.type is: " + attr_type);
                                    if("List" === attr_type){
                                        //mylog.p("put type into array: " + attr_name);
                                        list_att_name.push(attr_name);
                                    }
                                }
                            }

                            var str_attr = attr2java(attr_name, attr_type)
                            rtn_obj.attr_part += str_attr ;
                            //mylog.p(rtn_obj.attr_part + "\n");
                            //mylog.p(str_attr + "\n");
                            attr_name = attr_obj = attr_type = null;
                        }
                    }//End Attribute for

                    //convert methods
                    var str_convert = convert2java(rest_name, "dpu", list_att_name)
                    rtn_obj.dpu_convert_part += str_convert ;

                    str_convert = convert2java(rest_name, "pre", list_att_name)
                    rtn_obj.pre_convert_part += str_convert ;

                    list_att_name = [];
                }
            }//End for
            return rtn_obj;
        }//End json2java

        var attr2java = function(rest_name, type){
            var rtn;
            var vari_name = util.from_rest_name.getVariName(rest_name);
            var class_name = util.from_rest_name.getClassName(rest_name);

            //replace template_attr
            rtn = template_attr.replace(/__ATTRIBUTE_REST__/g, rest_name);
            rtn = rtn.replace(/__ATTRIBUTE_CLASS__/g, class_name);
            rtn = rtn.replace(/__ATTRIBUTE_VARI__/g, vari_name);
            if(null != type){
                rtn = rtn.replace(/__ATTRIBUTE_TYPE__/g, type);
            }
            return rtn;
        };

        //generate ConvertFrom and ConvertTo methods
        var convert2java = function(rest_name, convert_type, list_att_name){
            var rtn;
            var convert;
            if ("pre" === convert_type){
                convert = template_convert.pre;
            }

            if ("dpu" === convert_type){
                convert = template_convert.dpu;
            }

            var convert_from_inner = "";
            var convert_to_inner = "";
            // append list if any
            if(null != list_att_name && list_att_name.length > 0){
                // insert data and replace
                list_att_name.forEach(function(val, ind, ar2){
                    //replace one by one
                    var attr_class_name = util.from_rest_name.getClassName(val);
                    convert_from_inner += convert.from_inner.replace(/__ATTRIBUTE_CLASS__/g, attr_class_name);
                    convert_to_inner += convert.to_inner.replace(/__ATTRIBUTE_CLASS__/g, attr_class_name);
                });
            }

            var class_name = util.from_rest_name.getClassName(rest_name);
            rtn = convert.body.replace(/__PROFILE_CLASS__/g, class_name);
            rtn = rtn.replace(/__CONVERT_FROM_INNER__/g, convert_from_inner);
            rtn = rtn.replace(/__CONVERT_TO_INNER__/g, convert_to_inner);
            return rtn;
        };

        //Decode xml
        var xml_data = myIo.read(prof_def);
        parser.parseString(xml_data, function (err, result) {
            //mylog.p(result);
            var obj = json2java(result);
            // mylog.p("profile name: " + obj.profile_name);
            // mylog.p("attribute part: " + obj.attr_part);
            // mylog.p("convert part:" + obj.convert_part);
            //return obj out
            callback(obj);
        });
    }
}


