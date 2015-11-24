/**
 * Created by JamesWang on 11/16/15.
 */
//From common.js exports
var com = require("./common.js");
var xmljs = require("./xml2projava.js");
mylog = com.mylog;
conf = com.conf;
myIo = com.myIo;
util = com.util;

mylog.pTips("==========Profile Generator==========")

// put all template files in input_files
var input_files = function(){
    var ary = [];
    for(var prop in conf.file){
        ary.push(conf.file[prop]);
    }
    return ary;
}();
//mylog.p(input_files);

//====================================Logic=====================================================
//Get arguments
mylog.pTips("Get arguments from netconf.xml... ");
//Fetch data via callback function
var gened_java_obj;
xmljs.xml2java(function(obj){
    gened_java_obj = obj;
});
//mylog.p("gened_java_obj: " + gened_java_obj);
mylog.p("profile name: " + gened_java_obj.profile_name);
mylog.p("attribute part: " + gened_java_obj.attr_part);
mylog.p("dpu convert part:" + gened_java_obj.dpu_convert_part);
mylog.p("pre convert part:" + gened_java_obj.pre_convert_part);

//Generate variables with input argument
//Assume coming from arguments
//var rest_name = "upstream-data-rate";
var rest_name = gened_java_obj.profile_name;

mylog.pTips("Init template data...");
var template_keymap_ary = [];
push_template = function(reg_exp_str, replacement){
    template_keymap_ary.push({ reg_exp: new RegExp(reg_exp_str, "g"), replacement: replacement});
}

//Key words -> replaced words
push_template("__PROFILE_REST__", rest_name);  //upstream-data-rate
push_template("__PROFILE_CLASS__", util.from_rest_name.getClassName(rest_name)); //UpstreamDataRate
push_template("__PROFILE_VARI__", util.from_rest_name.getVariName(rest_name)); //upstreamDataRate
push_template("__PROFILE_FOLDER__", util.from_rest_name.getFolderName(rest_name)); //upstreamdatarate
push_template("__PROFILE_CONST__", util.from_rest_name.getConstName(rest_name));  //UPSTREAM_DATA_RATE
push_template("__PROFILE_ATTRIBUTES__", gened_java_obj.attr_part);  //replace attributes part
push_template("__PROFILE_DPU_CONVERT__", gened_java_obj.dpu_convert_part);  //replace dpu convert part
push_template("__PROFILE_PRE_CONVERT__", gened_java_obj.pre_convert_part);  //replace pre convert part



//Loop all files
input_files.forEach(function(val, ind, ar2){
    var input_file = conf.folder.template + val;
    var output_file = conf.folder.output + val;
    //
    //Read Files
    mylog.pTips("Reading Files " + input_file + "...");
    var mem = myIo.read(input_file);
    //mylog.p(mem);

    //Replace Key words
    mylog.pTips("Replacing template words...");
    template_keymap_ary.forEach(function(ele){
        //File content replacement
        mem = mem.replace(ele.reg_exp, ele.replacement);
        //File name replacement
        output_file = output_file.replace(ele.reg_exp, ele.replacement);
    });
    //mylog.p(mem);

    //Write Files
    mylog.pTips("Writing Files...");
    myIo.write(output_file, mem);
});
//End file loop

//Insert Netconf -> JSON -> Java Attributes

