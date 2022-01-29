'use strict';
var cmpList  = {
    userBlock: {
            Init: function (elm,type) {
                $(elm).empty();
                $(elm).addClass("text-center");
                $(elm).attr("el-name","selectInterActive");
                if(type==='multi'){
                    var block  = this.genObserverBlockM();
                    $(elm).attr("action-type",'multi');
                }else{
                    var block  = this.genObserverBlockS();
                    $(elm).attr("action-type",'single');
                }
                $(elm).append(block);
                var select  = $(elm).find('select.selectpicker-user-list');
                this.getUserList(select);
                $(elm).on("sachange",function(e,callback){
                      if(callback){
                          callback();
                      }
                })               
            },
            getUserBlockValue: function (elm) {
                var type  =  $(elm).attr("action-type");
                var item  = $(elm).find(".user-avatar-list ul li");
               
                   if(type ==="multi"){
                    var list  = []
                    item.each(function () {
                        list.push($(this).attr("id"));
                   })
                   return list
                   }else{
                       return  item.attr("id");
                   } 
            },
            genviewItemBlock: function (id,url,nameAt) {
                var img = (url) ?
                     fileUrl(url) :
                      fileUrl(new User().getDefaultUserprofileName());
                return ` <img id='${id}' class="Assigne-card-story-select-img owner" src="${img}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAt}">
                    `
            },
            genItemBlock: function (id,url,nameAt) {
                var img = (url) ?
                fileUrl(url) :
                 fileUrl(new User().getDefaultUserprofileName());
                return `<li id="${id}">
                <div class="item-click">
                    <div class="circular--portrait">
                    <img src="${img}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAt}">
                    </div>
                    <i class="fa fas fa-close removed-user-btn"></i>
                </div>
            </li>`
            },
            setUserBlockValue: function (elm,list) {
                var type  = $(elm).attr('action-type')
                var block  = $(elm).find(".user-avatar-list ul");
                var tit  = $(elm).find(".user-dropdonw-btn");
                if(list===''){
                    block.empty();
                    tit.html(`<i class="cs-svg-icon user-addons-icon"></i>`);
                }
                if(type==='single'){
                    if(list&& typeof list ==='string'){
                        try {
                        
                            var userImage = SAProjectUser.Users[list].userImage;
                            var userName = SAProjectUser.Users[list].userPersonName;
                            block.html(this.genItemBlock(list,userImage,userName));
                            tit.html(this.genviewItemBlock(list,userImage,userName));
                            $('[data-toggle="popover"]').popover({
                                html:true
                            });
                            
                        } catch (error) {
                           /// Toaster.showError( "This id "+list+" User  is not defined!"); 
                        }
                        
                    } 
                }
                else if(type==='multi'){
                    block.empty(); 
                    tit.empty();
                    if(typeof list ==='object'){
                        for (let i = 0; i < list.length; i++) {
                            const o = list[i];
                            if(o){
                                try {
                                    var userImage = SAProjectUser.Users[o].userImage;
                                    var userName = SAProjectUser.Users[o].userPersonName;
                                    block.append(this.genItemBlock(o,userImage,userName));
                                    tit.find(".user-addons-icon").remove();
                                    tit.append(this.genviewItemBlock(o,userImage,userName));
                                    
                                    $('[data-toggle="popover"]').popover({
                                        html:true
                                    });
                                } catch (error) {
                                   // Toaster.showError( "This id "+o+" User  is not defined!"); 
                                }
                                
                            }
                        }
                    }
                  
                }
                 return list;
            },
            getUserList:function (select) {
               
                    var elm  =select;
                    elm.html('');
                    var keys = SAProjectUser.GetKeysUser();
                    var div1 = $(`<option
                    data-content="<div><img class='Assigne-card-story-select-img owner' src='${fileUrl(new User().getDefaultUserprofileName())}' alt='avatar' srcset=''><span class='story-card-owner-name'>Unassigned</span></div>">
                    Unassigned</option>`);
                    elm.append(div1);
                    for (var i = 0; i < keys.length; i++) {
                        var id = keys[i];
                        var userImage = SAProjectUser.Users[id].userImage;
                        var userName = SAProjectUser.Users[id].userPersonName;
                        var img = (userImage) ?
                                fileUrl(userImage) :
                                fileUrl(new User().getDefaultUserprofileName());
                        var div = $(`<option value='${id}'
                        data-content="<div pid='${keys[i]}'><img class='Assigne-card-story-select-img owner' src='${img}' alt='avatar' srcset=''><span class='story-card-owner-name'>${userName}</span></div>">
                        ${userName}</option>`);
                        elm.append(div)
                    }
                    elm.selectpicker('refresh');
                
            },
            genObserverBlockS:function () {
                return  `<div class="user-addons-box-elm single-addons dropup" action-type='single'>
                Məsul şəxs:
                <span type="button" class="dropdown-toggle user-dropdonw-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                <i class="cs-svg-icon user-addons-icon"></i>      
                </span>
                
                <div class="dropdown-menu">
                    <div class="user-addons-box p-2 cs-box-background">
                    <div class="user-avatar-list mb-1 ">
                            <ul class="user-list-avatar-single">
                 
                           </ul>
                         </div>
                        <div class="input-group">
                            <select name="" class="selectpicker-user-list user-list-selectbox-single"   data-live-search="true">
                               
                            </select>  
                        </div>
                    </div>
                </div>
            </div>`
            },
            genObserverBlockM:function () {
                return  `<div class="user-addons-box-elm multiple-addons dropup" action-type='multi'>
                    Nəzarətci:
                <span type="button" class="dropdown-toggle user-dropdonw-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="cs-svg-icon user-addons-icon"></i>
                </span>
                <div class="dropdown-menu">
                    <div class="user-addons-box p-2 cs-box-background">
                        <div class="user-avatar-list mb-1">
                            <ul class="user-list-avatar-multiple">
                                
                            </ul>
                        </div>
                        <div class="input-group">
                            <select name="" class="selectpicker-user-list user-list-selectbox-multiple"   data-live-search="true">
                               
                            </select>  
                        </div>
                    </div>
                </div>
            </div>`
            } ,
            returnValueSelect: function (elm) {
                var liid = $(elm).attr('id');
                var userImage = SAProjectUser.Users[liid].userImage;
                var userName = SAProjectUser.Users[liid].userPersonName;
            var select = $(elm).closest('.user-addons-box-elm').find("select.user-list-selectbox-multiple")
            var img = (userImage) ?
                    fileUrl(userImage) :
                    fileUrl(new User().getDefaultUserprofileName());
            var div = $(`<option value='${liid}'
            data-content="<div pid='${liid}'>
            <img class='Assigne-card-story-select-img owner' src='${img}' alt='avatar' srcset=''>
            <span class='story-card-owner-name'>${userName}</span>
            </div>">${userName}</option>`);

            select.append(div);
                 select.val(liid);
                select.selectpicker('refresh');
            }
    },
}
$.fn.selectInterActive = function (type,val) {
      if(type==='multi'||type==='single'){
        cmpList.userBlock.Init(this,type);
      }
      else if(type==='setVal'){
        cmpList.userBlock.setUserBlockValue(this,val);   
      }
      else if(type==='getVal') {
         return cmpList.userBlock.getUserBlockValue(this); 
      }
      else if(type==='destroy') {
         return $(elm).empty(); 
      }
}
$.fn.getVal = function (val) {
    var detect  = $(this).find('.user-addons-box-elm');
             if(detect.length>0){
                 if(val|| val===""){
                    cmpList.userBlock.setUserBlockValue(this,val);
                 }else{
                    return cmpList.userBlock.getUserBlockValue(this); 
                 }
             } 
}

$.fn.extend({
    autoHeight: function () {
      function autoHeight_(element) {
        return jQuery(element)
          .css({ "height": "auto", "overflow-y": "hidden" })
          .height(element.scrollHeight-15);
      }
      return this.each(function() {
        autoHeight_(this).on("input", function() {
          autoHeight_(this);
        });
      });
    }
  });

///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<component events >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   // userList Block start
$(document).on('click','.user-avatar-list li .item-click .removed-user-btn', function (e) {
            e.stopPropagation();
    var elm = $(this).closest("li");
    var ul  =$(this).closest("ul");
    var tit  =  $(this).closest('.user-addons-box-elm').find(".user-dropdonw-btn");
      if(ul.hasClass("user-list-avatar-single")){
         tit.html(`<i class="cs-svg-icon user-addons-icon"></i>`);
      }else{
        cmpList.userBlock.returnValueSelect(elm);
        tit.find("#"+elm.attr('id')).remove();
           if(tit.find("img").length <1){
            tit.html(`<i class="cs-svg-icon user-addons-icon"></i>`);
           }
           
      }
      var prt  =$(this).closest('.user-addons-box-elm').parent();
      //event interactive 
      $(prt).trigger("delete-interactive",[elm.attr("id")]);
       elm.remove();
   });
  
 $(document).on('change','select.user-list-selectbox-multiple', function (e) {
    const o = $(this).val();
    var userImage = SAProjectUser.Users[o].userImage;
    var userName = SAProjectUser.Users[o].userPersonName;
    var tit  =  $(this).closest('.user-addons-box-elm').find(".user-dropdonw-btn");
    var block  = $(this).closest('.user-addons-box').find('.user-avatar-list ul');
     var has = block.find("#"+o);
    if(has.length <1){
        tit.find(".user-addons-icon").remove();
        tit.append(cmpList.userBlock.genviewItemBlock(o,userImage,userName));
        block.append(cmpList.userBlock.genItemBlock(o,userImage,userName));
        $(this).find('[value="'+o+'"]').remove();
       $(this).selectpicker('refresh');
    }
    var prt  =$(this).closest('.user-addons-box-elm').parent();
    $(prt).trigger("change-interactive",[o]);
    $('[data-toggle="popover"]').popover({
        html:true
    })
});
 $(document).on('change','select.user-list-selectbox-single', function (e) {
    const o = $(this).val();
    var userImage = SAProjectUser.Users[o].userImage;
    var userName = SAProjectUser.Users[o].userPersonName;
    var tit  =  $(this).closest('.user-addons-box-elm').find(".user-dropdonw-btn");
    var block  = $(this).closest('.user-addons-box').find('.user-avatar-list ul');
    
        tit.html(cmpList.userBlock.genviewItemBlock(o,userImage,userName));
        block.html(cmpList.userBlock.genItemBlock(o,userImage,userName));
     var prt  =$(this).closest('.user-addons-box-elm').parent();
        $(prt).trigger("change-interactive",[o]);
    $('[data-toggle="popover"]').popover({
        html:true
    });
});

 $(document).on('hide.bs.dropdown','.user-addons-box-elm',function (e) {
    return false;
}) 
$(document).on('click','.user-addons-box-elm   .dropdown-menu',function (e) {
    e.stopPropagation();
})
$(document).on("click",'body', function () {
    $('.user-addons-box-elm > .dropdown-menu').removeClass('show')
})
 // userList Block End