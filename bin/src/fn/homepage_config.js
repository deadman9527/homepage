/****************************************************************************
 Copyright (c) 2014 Louis Y P Chen.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * Created by Louis W M Wu on 2014/12/24.
 */

(function (cb) {
    cb._({
        "~name": "op.homepage_config",
        "uQueue":[],
        "cQ":[],
        "~superclass": cb.base,
        "upload_tpl":'<div class="thumb_list" {{?it.src}} {{??}} init="true" {{?}} cb-node="{{=it.name}}_{{=it.id}}" cb-event="mouseover~showDelectImgItem:1;mouseout~showDelectImgItem:0">\
                        <span cb-node="{{=it.name}}_del_{{=it.id}}" {{?it.src}}style="display:block;"{{?}} class="delete_img" cb-event="click~removeImg:{{=it.name}},{{=it.id}}"><i class="fa fa-trash"></i></span>\
                        <div class="" cb-node="{{=it.name}}_btn_{{=it.id}}" id="{{=it.name}}_btn_{{=it.id}}"></div>\
                        </div>',
        ctor: function (options) {
            this.api = "homepage_config";
            this._super(options);
        },
        postCreate: function () {
            this.$.loading.show();
            this.$.side_menu.metisMenu();
            this.tpl_type = "1";
            this.img_width = 130;
            this.img_height = 90;
           // this.config_id = [];
            this.initImageUpload("","","130","90","130","90");
            this.request('getHomePageConfigList');
        },
        initImageUpload : function(url,btx,logo_width, logo_height,banner_width, banner_height){
            $.each({
                'config_img_upload': {
                    'max_upload' : 1,
                    'width' : logo_width,
                    'height':logo_height
                },
                'config_banner_img_upload': {
                    'max_upload' : 1,
                    'width' : banner_width,
                    'height':banner_height
                }
            }, cobra.ride(this,function(item, val) {
                this.makeUpload(item,val.max_upload,url,"",val.width,val.height);
            }));
        },
        showDelectImgItem:function(n,ele){
            //console.log(arguments);
            if(n=='1'){
                (!ele.attr('init')) && (ele.find('.delete_img').show());
            }else{
                ele.find('.delete_img').hide()
            }
        },
        getHomePageConfigListArgs: function () {
            return {
                type: "post",
                data: {},
                done: cobra.ride(this, function (data) {
                    this.$.loading.hide();
                    $.when(this.compile(this.$.config_rule, 'homepage_config>typeList', data)).done(cobra.ride(this, function(){
                        this.compile(this.$.homepage_config_list, "homepage_config>homepage_config_list", data);
                    }));
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        sideMenu:function(){
            var t = arguments[arguments.length - 1];
                if(t.hasClass('showMenu')){
                    t.removeClass('showMenu');
                    this.$.body.removeClass('body-small');
                    this.$.sideBar.hide();
                    this.$.mainContent.addClass('full');
                }else{
                    t.addClass('showMenu');
                    this.$.body.addClass('body-small');
                    this.$.sideBar.show();
                    this.$.mainContent.removeClass('full');
            }
        },
        goToEditOrderId:function(n,ele){
            n=="1" && ele.removeAttr("readonly").addClass("enable") || ele.attr("readonly","true").removeClass("enable");
        },
        editOrderId:function(id,nodeId){
            this.sortId = this.$[nodeId].val();
            this.orderId = id;
            this.request('getEditOrderId');
        },
        getEditOrderIdArgs:function(){
            return {
                type: "post",
                data: {id:this.orderId,
                    sort:this.sortId
                },
                done: cobra.ride(this, function (data) {
                    this._msgBox.info('修改成功！');
                    this.request('getHomePageConfigList');
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };

        },
        goToDelete:function(configid){
            this.config_id = configid;
           // this.config_id.push(configid);
            this.showPopupBox();
        },
        chksize:function(){

        },
        /*点击修改按钮*/
        goToEdit:function(index){
            this.toEdit = true;
            //this.index = index;
            //this.request('getFullList');
            var data = (this.req['getHomePageConfigList'].data.list)[index];
            this.config_id = data.id;
            this.sort_id = data.sort;
            this.$.page_title.html('修改');
            this.$.config_name.val(data.name);
            this.$.config_rule.val(data.type_id);
            this.updateImgStyle();
            if(data.type_id == "3"){
                this.$.mode_type.show();
                this.$.mode_type_selection.val(data.tpl_type);
                this.changeMode();
            }
            this.fill_img_upload_input(data.logo);
            this.fill_banner_img_upload_input(data.banner);
            this.$.config_url.val(data.url);
            if(data.is_pc_dis=="1"){
                this.$.pc_dis.addClass('checked');
                this.$.pc_dis.attr('cb-id',data.is_pc_dis);
            }
            if(data.is_app_dis=="1"){
                this.$.mob_dis.addClass('checked');
                this.$.mob_dis.attr('cb-id',data.is_app_dis);
            }
            this.$.add_effect.find('.iradio_square-green').each(function(ix){
                if($(this).attr('cb-id') == data.is_effect){
                    $(this).addClass('checked');
                }
            });
            this.$.show_banner.find('.iradio_square-green').each(function(ix){
                if($(this).attr('cb-id') == data.is_banner_dis){
                    $(this).addClass('checked');
                }
            });
            this.$.new_add.show();
        },

        getDelHomePageConfigListArgs: function () {
            return {
                type: "post",
                data: {id:this.config_id
                },
                done: cobra.ride(this, function (data) {
                    this._msgBox.info('删除成功！');
                    this.request('getHomePageConfigList');
                    //window.location.reload();
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        /*点击新增按钮刷新页面 */
        newAddConfig:function(){
                window.location.reload();
        },
        /* 页面单选按钮的时间*/
        showHover:function(n,ele){
            if(n=='1'){
                ele.addClass('hover');
            }else{
                ele.removeClass('hover');
            }
        },
        checkSelectEvent:function(selfName){
            var ele = arguments[arguments.length - 1];
            /*if checkbox */
            ele.toggleClass('checked');
           // ele.hasClass('checked')? ele.attr('cb-id','1') : ele.attr('cb-id','0');
           if(ele.hasClass('icheckbox_square-green')){
                this.$[selfName].hasClass('checked')?this.$[selfName].attr('cb-id','1') : this.$[selfName].attr('cb-id','0');
           }
           else {
                ele.closest('.radio').siblings().find('.checked').removeClass('checked');
            }
        },
        /*新增或修改表单提交 */
        submitNewAdd:function(){
            if(this.validateEditForm()){
                this.toEdit?this.request('getHomePageConfigSubmit') : this.request('getHomePageConfigAddSubmit');
            }
        },
        getHomePageConfigSubmitArgs: function () {
            return {
                type: "post",
                data: {id:this.config_id,
                    name:this.$.config_name.val(),
                    type:this.$.config_rule.val(),
                    logo:this.$.config_img_upload_input.val(),
                    banner:this.$.config_banner_img_upload_input.val(),
                    url:this.$.config_url.val(),
                    sort:this.sort_id,
                    tpl_type:this.tpl_type,
                    is_effect:this.$.add_effect.find('.checked').attr('cb-id'),
                    is_pc_dis:"1",
                    is_app_dis:"0",
                    is_banner_dis:this.$.show_banner.find('.checked').attr('cb-id')
                },
                done: cobra.ride(this, function (data) {
                    var title='提交结果';
                    var result=$("<div></div>");
                    var resultOpt={
                        width:350,
                        height:150,
                        closeX:true,
                        title: this.parse(title, data),
                        content:"<div style='text-align: center;font-size: 16px;line-height: 50px;color:#E62D8B;font-weight: bold;'>提交成功!</div>",
                        'buttons':[
                            {
                                'value':'确定',
                                'type':'',
                                'click':function(){
                                    window.location.reload();
                                }
                            }
                        ],
                        clickCloseX:function(){
                            window.location.reload();
                        }
                    }
                    miniDialog(resultOpt);
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        getHomePageConfigAddSubmitArgs: function () {
            return {
                type: "post",
                data: {
                    name:this.$.config_name.val(),
                    type:this.$.config_rule.val(),
                    logo:this.$.config_img_upload_input.val(),
                    banner:this.$.config_banner_img_upload_input.val(),
                    url:this.$.config_url.val(),
                    sort:this.sort_id,
                    tpl_type:this.tpl_type,
                    is_effect:this.$.add_effect.find('.checked').attr('cb-id'),
                    is_pc_dis:"1",
                    is_app_dis:"0",
                    is_banner_dis:this.$.show_banner.find('.checked').attr('cb-id')
                },
                done: cobra.ride(this, function (data) {
                    var title='提交结果';
                    var result=$("<div></div>");
                    var resultOpt={
                        width:350,
                        height:150,
                        closeX:true,
                        title: this.parse(title, data),
                        content:"<div style='text-align: center;font-size: 16px;line-height: 50px;color:#E62D8B;font-weight: bold;'>提交成功!</div>",
                        'buttons':[
                            {
                                'value':'确定',
                                'type':'',
                                'click':function(){
                                    window.location.reload();
                                }
                            }
                        ],
                        clickCloseX:function(){
                            window.location.reload();
                        }
                    }
                    miniDialog(resultOpt);
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        setStyle: function(obj,ht,wd){
            obj.height(ht);
            obj.width(wd);
        },
        setText:function(obj,ht, wd){
            obj.html(wd+" x " + ht);
        },
        setSize: function(lwid,lhei,bwid,bhei){
            this.logo_wid = lwid;
            this.logo_height = lhei;
            this.banner_wid = bwid;
            this.banner_height = bhei;
        },
        updateImgStyle:function(url){
            var eleVal = this.$.config_rule.val();
            eleVal == "3" ? this.$.mode_type.show() : this.$.mode_type.hide();
            switch(eleVal){
                case "1":
                    var tdata = imageConfig.bestselling;
                    this.$.logo_form.height(tdata.logo.height_display);
                    this.$.banner_form.height(tdata.banner.height_display);
                    this.initImageUpload(url,"",tdata.logo.width_display,tdata.logo.height_display,tdata.banner.width_display,tdata.banner.height_display);
                    this.setSize(tdata.logo.width_display,tdata.logo.height_display,tdata.banner.width_display,tdata.banner.height_display);
                    this.$.logo_text.html('*栏目图标：<p style="font-weight: normal;">' + tdata.logo.width_text + ' x ' + tdata.logo.height_text + '</p>');
                    this.$.banner_text.html('*广告图：<p style="font-weight: normal;">' + tdata.banner.width_text + ' x ' + tdata.banner.height_text + '</p>');
                    break;
                case "2":
                    var tdata = imageConfig.subject;
                    this.$.logo_form.height(tdata.logo.height_display);
                    this.$.banner_form.height(tdata.banner.height_display);
                    this.initImageUpload(url,"",tdata.logo.width_display,tdata.logo.height_display,tdata.banner.width_display,tdata.banner.height_display);
                    this.setSize(tdata.logo.width_display,tdata.logo.height_display,tdata.banner.width_display,tdata.banner.height_display);
                    this.$.logo_text.html('*栏目图标：<p style="font-weight: normal;">' + tdata.logo.width_text + ' x ' + tdata.logo.height_text + '</p>');
                    this.$.banner_text.html('*广告图：<p style="font-weight: normal;">' + tdata.banner.width_text + ' x ' + tdata.banner.height_text + '</p>');
                    break;
                case "3":
                    var tdata = imageConfig.series;
                    this.$.logo_form.height(tdata.logo.height_display);
                    this.$.banner_form.height(tdata.template1.banner.height_display);
                    this.initImageUpload(url,"",tdata.logo.width_display,tdata.logo.height_display,tdata.template1.banner.width_display,tdata.template1.banner.height_display);
                    this.setSize(tdata.logo.width_display,tdata.logo.height_display,tdata.template1.banner.width_display,tdata.template1.banner.height_display);
                    this.$.logo_text.html('*栏目图标：<p style="font-weight: normal;">' + tdata.logo.width_text + ' x ' + tdata.logo.height_text + '</p>');
                    this.$.banner_text.html('*广告图：<p style="font-weight: normal;">' + tdata.template1.banner.width_text + ' x ' + tdata.template1.banner.height_text + '</p>');
                    break;
            }
        },
        changeMode:function(url){
            var tdata = imageConfig.series;
            if(this.$.mode_type_selection.val()=="1") {
                this.initImageUpload(url,"",tdata.logo.width_display,tdata.logo.height_display,tdata.template1.banner.width_display,tdata.template1.banner.height_display);
                this.setSize(tdata.logo.width_display,tdata.logo.height_display,tdata.template1.banner.width_display,tdata.template1.banner.height_display);
                this.$.logo_text.html('*栏目图标：<p style="font-weight: normal;">' + tdata.logo.width_text + ' x ' + tdata.logo.height_text + '</p>');
                this.$.banner_text.html('*广告图：<p style="font-weight: normal;">' + tdata.template1.banner.width_text + ' x ' + tdata.template1.banner.height_text + '</p>');
                //this.setText(this.$.banner_size.find(".product-add-title"),tdata.template1.banner.height_text,tdata.template1.banner.width_text);
            }else if(this.$.mode_type_selection.val()=="2"){
                this.initImageUpload(url,"",tdata.logo.width_display,tdata.logo.height_display,tdata.template2.banner.width_display,tdata.template2.banner.height_display);
                this.setSize(tdata.logo.width_display,tdata.logo.height_display,tdata.template2.banner.width_display,tdata.template2.banner.height_display);
                this.$.logo_text.html('*栏目图标：<p style="font-weight: normal;">' + tdata.logo.width_text + ' x ' + tdata.logo.height_text + '</p>');
                this.$.banner_text.html('*广告图：<p style="font-weight: normal;">' + tdata.template2.banner.width_text + ' x ' + tdata.template2.banner.height_text + '</p>');
                //this.setText(this.$.banner_size.find(".product-add-title"),tdata.template2.banner.height_text,tdata.template2.banner.width_text);
                this.tpl_type = "2";
            }
        },
        /*新增或修改表单验证 */
        validateEditForm:function(){
            var err='';
            if(this.$.config_name.val()==''){
                err += '栏目名称不能为空!<br/>';
            }
            if(this.$.config_url.val()==''){
                err += '广告URL不能为空!<br/>';
            }
            if(this.$.add_effect.find('.checked').length==0){
                err += '请选择是否设置栏目有效!<br/>';
            }
            if (err && err!=''){
                this._msgBox.warn(err);
                return false;
            }else{
                return true;
            }
        },
        /*删除时的弹出框 */
        showPopupBox:function(){
            this.popup_dialog = new cobra.modal({
                title : '删除栏目',
                tip : '',
                content : '<div class="ibox-content"><p style="text-align: center;">确定要删除该栏目吗？</p></div>',
                confirm : cobra.ride(this, function(){
                    this.request('getDelHomePageConfigList');
                })
            });
        },
        /* add for img upload*/
        createOpt:function(name,id,btn_txt){
            var that=this,_id=id,_name=name;
            var opt={
                '__name':_name,
                '__sid':_id,
                'formData': {
                    'timestamp': new Date().getTime(),
                    'token': 'A'
                },
                'fileSizeLimit' : '300KB',
                'buttonClass': 'uploadify-button uploadify-button2',
                'width': this.img_width,
                'height': this.img_height,
                'multi': false,
                'swf': that.host[that.host.use] + '/homepage/src/plugins/uploadify/uploadify.swf',
                //'swf':'http://localhost:63342/homepage/bin/src/plugins/uploadify/uploadify.swf',
                'uploader': that.host.imageUploadUrl,
                'buttonText': btn_txt || '<i class="fa fa-upload"></i> 上传图片<br/>',
                'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                    //this.button.html(totalBytesUploaded/totalBytesTotal);
                    var percentage = Math.round(totalBytesUploaded / totalBytesTotal * 100) - 1;
                    (percentage>100) && (percentage=100);
                    this._ps.find(".uploadify-progress-bar").css('width', percentage + "%").html(percentage + '%');
                    this.button.html('正在上传');
                },
                'onUploadError': function() {
                    //console.log(arguments)
                    this.queueData.queueBytesUploaded=0
                    this._ps.find(".uploadify-progress-bar").css('width', "100%").css('background','red').html('上传出错');
                },
                'onUploadStart':function(){
                    this.queueData.queueBytesUploaded=0
                    var _sid=this.getSetting('__sid');
                    var _name=this.getSetting('__name');
                    var _ele=that.$[this.settings.__name+'_'+this.settings.__sid];
                    this._ps=$('<div class="uploadify-progress-register" style="position: absolute;top: 40%;"><div class="uploadify-progress-bar"></div></div>');
                    _ele.append(this._ps);
                },
                itemTemplate: '',
                'onUploadSuccess': function() {
                    //console.log(arguments);
                    this._ps.remove();
                    this.queueData.queueBytesUploaded=0;
                    var _sid=this.getSetting('__sid');
                    var _name=this.getSetting('__name');
                    var _ele=that.$[this.settings.__name+'_'+this.settings.__sid];
                    console.log(arguments[1]);
                    var data=$.parseJSON(arguments[1]),thumb='',url='';
                    !(data && data.responseBody.data )&& (this.button.html('点击上传')) && (that._msgBox.warn('图片上传失败，请检查图片是否异常'));
                    if(data && data.responseBody.data && data.responseBody.data.status==1){
                        thumb=data.responseBody.data.thumb;
                        url=data.responseBody.data.url;
                        var ht = this.button.height(),wd = this.button.width();
                        this.button.html('<img style="height:'+ ht + 'px;width:'+ wd + 'px" src="'+ url + '" />');
                        that.$[_name+'_'+_sid].removeAttr('init');
                        //url && (that.$[_name+'_img_'+_sid].attr('_src',url).attr('src',url));
                        that.checkUploadElement(_name);
                    }else{
                        this.button.html('点击上传')
                        that._msgBox.error('图片上传失败，请稍后重试');
                    }
                }
            }
            return opt;
        },
        makeUpload:function(name,count,src,btn_txt,wdth,ht){
            var that=this;
            //最大值
            count && (that.cQ[name]=count);
            //大框框
            var _box=that.$[name];
            //item
            var _id=that.uQueue[name]|| 1200;

            var _sid=name+'_btn_'+_id;
            var _item=$(that.doT(that.upload_tpl,{name:name,id:_id,src:src,height:ht,width:wdth}));
            src ? (_box.html(_item)) :(_box.html(_item));
            var _btn=that.$[_sid];
            this.img_width = wdth;
            this.img_height = ht;
            _btn && _btn.uploadify(that.createOpt(name,_id,btn_txt));
            that.uQueue[name]=++_id;
/*            var _img =_btn.find('.uploadify-button');
            src ? _img.html('<img style="height:'+ ht + 'px;width:'+ wdth + 'px" src="'+ src + '" />'):"";*/
        },
        removeImg:function(name,id){
            var that=this;
            //that.$[name+'_'+id].remove();
            that.$[name+'_'+id].find('.uploadify-button').html('<span class="uploadify-button-text"><i class="fa fa-upload"></i> 上传图片<br></span>');
            that.$[name+'_'+id].attr("init","true");
            that.checkUploadElement(name);
        },
        checkUploadElement:function(name){
            //ele
            var that=this;
            if(that.$[name].children().length==0){
                that.makeUpload(name);
            }else if(that.$[name].children().length<=that.cQ[name]-1){
                var _items=that.$[name].children();
                (!_items.filter("div[init]").length>0) && (that.makeUpload(name));
            }
            //input
            var _imgs=that.$[name].find('img');
            //console.log(_imgs);
            //console.log(that.$[name+'_input']);
            var _arr=[]
            cobra.ride(that,$.each(_imgs,function(i,e){
                $(e).attr('src') && _arr.push($(e).attr('src'));
            }));
            that.$[name+'_input'].val(_arr.join(','));
        },
        fill_images_input:function(name,url,ht,wd){
            if (!url) return false;
            var that = this;
            this.$[name+'_input'].val(url);
            if (url.indexOf(',') < 0) {
                that.$[name].find(".uploadify-button").html( '<img style="height:'+ ht + 'px;width:'+ wd + 'px" src="'+ url + '" />');
                that.$[name].find(".thumb_list").removeAttr("init");
                //that.makeUpload(name, that.cQ[name], url, ' ');
                //that.$[name].children().filter("div[init]").remove();
            } else {
                var arr = url.split(',').reverse();
                cobra.ride(that, $.each(arr, function(i, e) {
                    that.$[name].find(".uploadify-button").html( '<img style="height:'+ ht + 'px;width:'+ wd + 'px" src="'+ url + '" />');
                    that.$[name].find(".thumb_list").removeAttr("init");
                    //that.makeUpload(name, that.cQ[name], e, ' ');
                }));
                //(that.$[name].children().length>arr.length) && (that.$[name].children().filter("div[init]").remove());
            }
        },
        fill_img_upload_input:function(url){
            this.fill_images_input('config_img_upload',url,this.logo_height,this.logo_wid)
        },
         fill_banner_img_upload_input:function(url){
             this.fill_images_input('config_banner_img_upload',url,this.banner_height,this.banner_wid)
         }
    });
    $(function () {
        new op.homepage_config();
    });
})(cobra);