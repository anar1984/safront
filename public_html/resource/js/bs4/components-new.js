var cmpList  = {
    userBlock: {
            Init: function (elm,type) {
                $(elm).empty();
                if(type==='multi'){
                    var block  = this.genObserverBlockM();
                }else{
                    var block  = this.genObserverBlockS();
                }
                $(elm).append(block);
                var select  = $(elm).find('select.selectpicker-user-list');
                this.getUserList(select);               
            },
            getUserBlockValue: function (elm) {
                var item  = $(elm).find(".user-avatar-list ul li")
                    var list  = ''
                  item.each(function () {
                       list  += $(this).attr("id") +",";
                  })

                  return list
            },
            genItemBlock: function (id,url,nameAt) {
                return `<li id="${id}">
                <div class="item-click">
                    <div class="circular--portrait">
                    <img src="${fileUrl(url)}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAt}">
                    </div>
                    <i class="fa fas fa-close removed-nezaretci-btn"></i>
                </div>
            </li>`
            },
            setUserBlockValue: function (elm,list) {
                var block  = $(elm).find(".user-avatar-list ul");
                    var list  = list.split(',');
                    block.empty();
                    for (let i = 0; i < list.length; i++) {
                        const o = list[i];
                        if(o){
                            try {
                                var userImage = SAProjectUser.GetDetails(o, "userImage");
                                var userName = SAProjectUser.GetDetails(o, "userName");
                                block.append(this.genItemBlock(o,userImage,userName));
                            } catch (error) {
                                Toaster.showError( "This id "+o+" User  is not defined!"); 
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
                return  ` <div class="user-addons-box-elm single-addons dropup">
                <span type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <!-- <i class="cs-svg-icon user-addons-icon-1"></i> -->
                    <i class="cs-svg-icon user-addons-icon"></i>
                </span>
                <div class="dropdown-menu">
                    <div class="user-addons-box p-2 cs-box-background">
                        <div class="user-avatar-list mb-1">
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
                return  ` <div class="user-addons-box-elm multiple-addons dropup">
                <span type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <!-- <i class="cs-svg-icon user-addons-icon-1"></i> -->
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
            }

    },
}

///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<component events >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   // userList Block start
$(document).on('click','.user-avatar-list li .item-click .removed-nezaretci-btn', function (e) {
   
    var elm = $(this).closest("li")
      var select = $(this).closest('.user-addons-box').find('select.user-list-selectbox-multiple')
           var list  = select.val();
          
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
            <i class="fa fas fa-close removed-nezaretci-btn"></i>
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
     var block  = $(this).closest('.user-addons-box').find('.user-avatar-list');
     block.empty();
        block.append(`<li id="${selected.val()}">
        <div class="item-click">
            <div class="circular--portrait">
            <img src="${srcAttr}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAttr}">
            </div>
            <i class="fa fas fa-close removed-nezaretci-btn"></i>
        </div>
    </li>`);
    $('[data-toggle="popover"]').popover({
        html:true
    })
});
/* $(document).on('hide.bs.dropdown','.user-addons-box-elm',function (e) {
    return false;
}) */
$(document).on('click','.user-addons-box-elm  > .dropdown-menu',function (e) {
    e.stopPropagation();
})
$(document).on("click",'body', function () {
    $('.user-addons-box-elm > .dropdown-menu').removeClass('show')
})
 // userList Block End