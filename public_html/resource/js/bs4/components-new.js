'use strict';
var cmpList  = {
    userBlock: {
            Init: function (elm,type) {
                $(elm).empty();
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
            genItemBlock: function (id,url,nameAt) {
                return `<li id="${id}">
                <div class="item-click">
                    <div class="circular--portrait">
                    <img src="${fileUrl(url)}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAt}">
                    </div>
                    <i class="fa fas fa-close removed-user-btn"></i>
                </div>
            </li>`
            },
            setUserBlockValue: function (elm,list) {
                var type  = $(elm).attr('action-type')
                var block  = $(elm).find(".user-avatar-list ul");
                if(list===''){
                    block.empty();
                    var el  =  $(elm).find('.user-avatar-list');
                    if(type==='single'&& !el.hasClass('d-none')){
                        $(elm).find('.user-dropdonw-btn').toggleClass("d-none");
                    }
                }
                if(type==='single'){
                    if(list&& typeof list ==='string'){
                        try {
                            $(elm).find('.user-dropdonw-btn').toggleClass("d-none");
                            var userImage = SAProjectUser.GetDetails(list, "userImage");
                            var userName = SAProjectUser.GetDetails(list, "userName");
                            block.html(this.genItemBlock(list,userImage,userName));
                        } catch (error) {
                           /// Toaster.showError( "This id "+list+" User  is not defined!"); 
                        }
                        
                    } 
                }
                else if(type==='multi'){
                    block.empty(); 
                    if(typeof list ==='object'){
                        for (let i = 0; i < list.length; i++) {
                            const o = list[i];
                            if(o){
                                try {
                                    var userImage = SAProjectUser.GetDetails(o, "userImage");
                                    var userName = SAProjectUser.GetDetails(o, "userName");
                                    block.append(this.genItemBlock(o,userImage,userName));
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
                    var keys = SAProjectUser.GetKeys();
                    var div1 = $(`<option
                    data-content="<div><img class='Assigne-card-story-select-img owner' src='${fileUrl(new User().getDefaultUserprofileName())}' alt='avatar' srcset=''><span class='story-card-owner-name'>Unassigned</span></div>">
                    Unassigned</option>`);
                    elm.append(div1);
                    for (var i = 0; i < keys.length; i++) {
                        var userImage = SAProjectUser.GetDetails(keys[i], "userImage");
                        var userName = SAProjectUser.GetDetails(keys[i], "userName");
                        var id = SAProjectUser.GetDetails(keys[i], "fkUserId");
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
                <span type="button" class="dropdown-toggle user-dropdonw-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   Məsul şəxs:
                <i class="cs-svg-icon user-addons-icon"></i>      
                </span>
                
                <div class="dropdown-menu">
                    <div class="user-addons-box p-2 cs-box-background">
                    <div class="user-avatar-list mb-1 user-dropdonw-btn d-none">
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
                <span type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
              var  userImage = SAProjectUser.GetDetails(liid, "userImage");
            var userName = SAProjectUser.GetDetails(liid, "userName");
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
          .height(element.scrollHeight);
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
      if(ul.hasClass("user-list-avatar-single")){
         ul.closest(".single-addons").find('.user-dropdonw-btn').toggleClass("d-none")
      }else{
        cmpList.userBlock.returnValueSelect(elm) 
      }
      elm.remove();
   });
  
 $(document).on('change','select.user-list-selectbox-multiple', function (e) {
    var selected = $(this).find("option:selected") ;
    var dataContent = selected.attr('data-content');
    var srcAttr = $(dataContent).find('img').attr('src');
    var nameAttr = $(dataContent).find('span').text();
     var block  = $(this).closest('.user-addons-box').find('.user-avatar-list ul')
     var has = block.find("#"+selected.val());
    if(has.length <1){
        block.append(`<li id="${selected.val()}">
        <div class="item-click">
            <div class="circular--portrait">
            <img src="${srcAttr}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAttr}">
            </div>
            <i class="fa fas fa-close removed-user-btn"></i>
        </div>
    </li>`);
    $(this).find('[value="'+selected.val()+'"]').remove();
    $(this).selectpicker('refresh');
    }
    $('[data-toggle="popover"]').popover({
        html:true
    })
});
 $(document).on('change','select.user-list-selectbox-single', function (e) {
    var selected = $(this).find("option:selected") ;
    var dataContent = selected.attr('data-content');
    var srcAttr = $(dataContent).find('img').attr('src');
    var nameAttr = $(dataContent).find('span').text();
    var el  =  $(this).closest('.user-addons-box-elm').find('.user-avatar-list');
    var db  =  $(this).closest('.user-addons-box-elm').find('.user-dropdonw-btn');
    if(el.hasClass("d-none")){
        db.toggleClass("d-none");
    }
     var block  = db.find('ul').first();
     block.empty();
        block.append(`<li id="${selected.val()}">
        <div class="item-click">
            <div class="circular--portrait">
            <img src="${srcAttr}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAttr}">
            </div>
            <i class="fa fas fa-close removed-user-btn"></i>
        </div>
    </li>`);
    $('[data-toggle="popover"]').popover({
        html:true
    })
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