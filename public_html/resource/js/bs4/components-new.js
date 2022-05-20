'use strict';
const cmpList = {
    userBlock: {
        Init: function (elm, type,title,options) {
               var that  = this
              $(elm).each(function (params) {
                $(this).empty();
                $(this).css("text-align", 'left');
                $(this).attr("el-name", "selectInterActive");
                $(this).attr('component-type',"selectInterActive");
                if (type === 'multi') {
                    var block = that.genObserverBlockM(title,options);
                    $(this).attr("action-type", 'multi');
                } else {
                    var block = that.genObserverBlockS(title,options);
                    $(this).attr("action-type", 'single');
                }
                $(this).append(block);
                var select = $(this).find('select.selectpicker-user-list');
                that.getUserList(select,options);
                $(this).on("sachange", function (e, callback) {
                    if (callback) {
                        callback();
                    }
                })
              })
           
        
        },
        getDefaultUserprofile:function(){
           return 'userprofile.png';
        },
        clickfocusElementSeacrh:function (elm) {
            setTimeout(function() { 
                $(elm).closest(".user-addons-box-elm").find('.bs-searchbox input').focus();
        }, 300);
            
            console.log($(elm).closest(".user-addons-box-elm").find('.bs-searchbox input'));
        },
        getUserBlockValue: function (elm) {
            var type = $(elm).attr("action-type");
            var item = $(elm).find(".user-avatar-list ul li");

            if (type === "multi") {
                var list = []
                item.each(function () {
                    list.push($(this).attr("id"));
                })
                return list
            } else {
                return item.attr("id");
            }
        },
        genviewItemBlock: function (id, url, nameAt) {
            var img = (url) ?
                fileUrl(url) :
                fileUrl(this.getDefaultUserprofile());
            return ` <img id='${id}' class="Assigne-card-story-select-img owner" src="${img}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAt}">
                    `
        },
        genItemBlock: function (id, url, nameAt) {
            var img = (url) ?
                fileUrl(url) :
                fileUrl(this.getDefaultUserprofile());
            return `<li id="${id}">
                <div class="item-click">
                    <div class="circular--portrait">
                    <img src="${img}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAt}">
                    </div>
                    <i class="fa fas fa-close removed-user-btn"></i>
                </div>
            </li>`
        },
        setUserBlockValue: function (elm, list) {
            var type = $(elm).attr('action-type')
            var block = $(elm).find(".user-avatar-list ul");
            var tit = $(elm).find(".user-dropdonw-btn");
            if (list === '') {
                block.empty();
                var iconClass  = tit.attr('data-icon')
                tit.html(`<i class="user-interactive-icon  ${iconClass}"></i>`);
            }
            if (type === 'single') {
                if (list && typeof list === 'string') {
                    try {

                        var userImage = SAProjectUser.Users[list].userImage;
                        var userName = SAProjectUser.Users[list].userPersonName;
                        block.html(this.genItemBlock(list, userImage, userName));
                        tit.html(this.genviewItemBlock(list, userImage, userName));
                        $('[data-toggle="popover"]').popover({
                            html: true
                        });

                    } catch (error) {
                        /// Toaster.showError( "This id "+list+" User  is not defined!"); 
                    }

                }
            } else if (type === 'multi') {
                if(list.length >0){
                    block.empty();
                    tit.empty();
                }
                if (typeof list === 'object') {
                    for (let i = 0; i < list.length; i++) {
                        const o = list[i];
                        if (o) {
                            try {
                                var userImage = SAProjectUser.Users[o].userImage;
                                var userName = SAProjectUser.Users[o].userPersonName;
                                block.append(this.genItemBlock(o, userImage, userName));
                                tit.find(".user-interactive-icon").remove();
                                tit.append(this.genviewItemBlock(o, userImage, userName));

                                $('[data-toggle="popover"]').popover({
                                    html: true
                                });
                            } catch (error) {
                                // Toaster.showError( "This id "+o+" User  is not defined!"); 
                            }

                        }
                    }
                }
                this.genInterActiveView(block)

            }
            return list;
        },
        getUserList: function (select,option) {
            
            if(typeof option === "object"&&option.hiddenUser){
                var hiddenList  =  option.hiddenUser;  
                  
             }else{
                var hiddenList  ='';
             }
          
            var elm = select;
            elm.html('');
            var keys = SAProjectUser.GetKeysUser();
            for (var i = 0; i < keys.length; i++) {
                var id = keys[i];
                if(hiddenList.includes(id)){
                   
                }else{
                    var userImage = SAProjectUser.Users[id].userImage;
                    var userName = SAProjectUser.Users[id].userPersonName;
                    var img = (userImage) ?
                        fileUrl(userImage) :
                        fileUrl(this.getDefaultUserprofile());
                    var div = $(`<option value='${id}'
                            data-content="<div pid='${keys[i]}'><img class='Assigne-card-story-select-img owner' src='${img}' alt='avatar' srcset=''><span class='story-card-owner-name'>${userName}</span></div>">
                            ${userName}</option>`);
                    elm.append(div)
                }
              
            }
            elm.selectpicker('refresh');

        },
        genObserverBlockS: function (title,iconClass) {
            var  iconClass   = null
            if(typeof  option  ==='object' ){
                iconClass  =option.iconClass;
            }
            return `<div class="user-addons-box-elm single-addons dropup" action-type='single' >
                <span class='add-userList-title'>${title?title:"Məsul şəxs"} :</span>
                <span type="button" data-icon="${iconClass?iconClass:'cs-svg-icon user-addons-icon'}" class="dropdown-toggle user-dropdonw-btn" onclick='cmpList.userBlock.clickfocusElementSeacrh(this)' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                  <i class="user-interactive-icon ${iconClass?iconClass:'cs-svg-icon user-addons-icon'}"></i>      
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
        genObserverBlockM: function (title,option) {
           var  iconClass   = null
            if(typeof  option  ==='object' ){
                iconClass  =option.iconClass;
            }
            return `<div class="user-addons-box-elm multiple-addons dropup" action-type='multi' >
                    <span class='add-userList-title'>${title?title:lang_task.windowAddTask.observer} :</span>
                <span type="button" data-icon="${iconClass?iconClass:'cs-svg-icon user-addons-icon'}" onclick='cmpList.userBlock.clickfocusElementSeacrh(this)' class="dropdown-toggle user-dropdonw-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="user-interactive-icon ${iconClass?iconClass:'cs-svg-icon user-addons-icon'}"></i>
                </span>
                <span class="count_avatar_users"></span>
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
        },
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
        },
        genInterActiveView: function (elm, type) {
            try {
                var list_count = $(elm).closest('.user-addons-box-elm').find(".user-list-avatar-multiple li").length;
                var count_avatar_span = $(elm).closest('.user-addons-box-elm').find('.count_avatar_users');
            
                if (type === 'delete') {
                    list_count = parseFloat(list_count) - 1
                }
                var limit = 4;
                if (list_count > limit) {
                    count_avatar_span.text('+ ' + (list_count - limit));

                }
            } catch (error) {

            }

        }
    },
    tablePagintion: {
        Init: function (elm, rowCount) {
              
            var elm = $(elm);
               var attr  =  $(elm).attr('data-pag-id')
            if (elm.prop('tagName') === 'TABLE') {
                $("#paginiton_id_"+attr).remove();
                if(rowCount=="0"||!rowCount|| typeof rowCount =='object' || rowCount.length >10)
                 return;
                 
                 
                var tbid = makeId(10);
                $(elm).attr("data-pag-id", tbid);
                $(elm).addClass("selectableTable");
                $(elm).attr('component-type',"table-paginiton");
         
                $(elm).parent().after(this.genBlock(rowCount, tbid));
                $('#paginiton_id_'+tbid).find('.custom-select-table-for').selectpicker('refresh')
                var select = $('#paginiton_id_'+tbid).find("select.count-row-select-global");
                select.empty();
                var page = Math.ceil(rowCount / 50);
                for (let i = 0; i < page; i++) {
                    select.append($("<option>")
                        .text(i + 1)
                        .val(i + 1));
                }
            }
        },
        genBlock: function (rowCount, tbid) {
            return `<div id="paginiton_id_${tbid}" pid=""  class="d-flex w-100 table-paginition-block-component task-list-bottom ">
              <div class="mr-auto task-list-datetime">
                  
              </div>
              <div class="task-list-pagination "  table-id='${tbid}'>
                  <div style="display: none;">
                      <input class="startLimitNew" value="0" type="text">
                      <input class="endLimitNew" value="49" type="text">
                      <select name=""  class="count-row-select-global"></select>
                  </div>
                  <div class="float-right task-list-pagination_btns d-flex">
                  <div class="task-list-hid cs-input-group m-0 mr-2">
                        <select class="custom-select-table-for d-none" title='hesab' id="table-selected-row-details-${tbid}">
                                <option selected='selected'  class="count"> </option>
                                <option selected='selected' class="sum"></option>
                                <option class="avarage"> </option>
                                <option class="min"></option>
                                <option class="max"></option>      
                        </select>
                </div>
                   
                  <!--  <a class="btn circle btn-primary mt-0  tbl-export-import-btn"><i class='cs-svg-icon cs-svg-icon-import'></i></a> -->
                    <div class="dropdown">
                        <a class="btn circle btn-primary mt-0 tbl-export-import-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class='cs-svg-icon cs-svg-icon-export'></i></a>
                        <div class="dropdown-menu pageBttnContainer" aria-labelledby="dropdownMenu2">
                            <button data-st='all' onclick='cmpList.tablePagintion.export(this,"${tbid}")' class="dropdown-item" type="button">Hamısı</button>
                            <button data-st='choose' onclick='cmpList.tablePagintion.export(this,"${tbid}")' class="dropdown-item" type="button">Seçilmiş</button>
                        </div>
                    </div>
                      <div class="dropdown">
                          <button class="btn  pagination_btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" row-count='${rowCount}' aria-expanded="false">1-50/${rowCount}</button>
                          <div class="dropdown-menu pageBttnContainer" aria-labelledby="dropdownMenu2">
                              <button onclick='cmpList.tablePagintion.startEndClick(this)'  data-page-icon="pageStart" class="dropdown-item" type="button">Ən başa</button>
                              <button onclick='cmpList.tablePagintion.startEndClick(this)'  data-page-icon="pageEnd" class="dropdown-item" type="button">Ən sona</button>
      
                          </div>
                      </div>
                      <div>
                          <button onclick='cmpList.tablePagintion.clickBtnLeftRight(this)' class="btn pagination_btn_left_right" data-page-icon="pageLeft"> <i class="fas fa-angle-left" aria-hidden="true"></i></button>
                          <button onclick='cmpList.tablePagintion.clickBtnLeftRight(this)' class="btn pagination_btn_left_right" data-page-icon="pageRight"> <i class="fas fa-angle-right" aria-hidden="true"></i></button>
                      </div>
      
                  </div>
              </div>
          </div>`
        },
        clickBtnLeftRight: function (elm) {
            var block = $(elm).closest(".task-list-pagination");
            var stlm = block.find('.startLimitNew');
            var endlm = block.find('.endLimitNew');
            var clickedButton = $(elm).attr('data-page-icon');
            var pageSelected = block.find('select.count-row-select-global option:selected');
            var pageSelect = block.find('select.count-row-select-global');
            var pageNumber = null;
            var button = block.find('.pagination_btn');
            var rowCount = button.attr("row-count");
            var tbl = block.attr("table-id");

            if (clickedButton == 'pageLeft') {
                var current = parseInt(pageSelected.text());
                pageNumber = current != 1 ? current - 1 : 1;
                if (current != 1) {
                    var stm = parseFloat(stlm.val()) - 50;
                    var etm = parseFloat(endlm.val()) - 50;
                    stlm.val(stm);
                    endlm.val(etm);
                    button.html((stm + 1) + '-' + (etm + 1) + "/" + rowCount);
                }

            } else if (clickedButton == 'pageRight') {
                var current = parseInt(pageSelected.text());
                pageNumber = current != parseInt(pageSelect.find('option:last-child').text()) ? current + 1 : current;
                if (current != parseInt(pageSelect.find('option:last-child').text())) {
                    var stm = parseFloat(stlm.val()) + 50;
                    var etm = parseFloat(endlm.val()) + 50;
                    stlm.val(stm);
                    endlm.val(etm);
                    button.html((stm + 1) + '-' + (etm + 1) + "/" + rowCount);
                }
            }

            pageSelect.val(pageNumber);
            if (stm >= 0 && etm) {
                $("[data-pag-id='" + tbl + "']").trigger("change-page", [stm, etm]);
            }
        },
        startEndClick: function (elm) {
            var block = $(elm).closest(".task-list-pagination")
            var stlm = block.find('.startLimitNew');
            var endlm = block.find('.endLimitNew');
            var clickedButton = $(elm).attr('data-page-icon');
            var pageSelected = block.find('select.count-row-select-global option:selected');
            var pageSelect = block.find('select.count-row-select-global');
            var pageNumber = null;
            var button = block.find('.pagination_btn');
            var rowCount = button.attr("row-count");
            var tbl = block.attr("table-id")

            if (clickedButton == 'pageStart') {
                var current = parseInt(pageSelected.text());
                pageNumber = 1;
                var stm = 0
                var etm = 49;
                stlm.val(stm);
                endlm.val(etm);
                button.html((stm + 1) + '-' + (etm + 1) + "/" + rowCount);


            } else if (clickedButton == 'pageEnd') {
                pageNumber = pageSelect.find('option:last-child').text();
                if (current != parseInt(pageSelect.find('option:last-child').text())) {
                    var ol = Math.ceil(parseFloat(pageNumber) * 50);
                    var stm = ol - 50;
                    var etm = ol;
                    stlm.val(stm);
                    endlm.val(etm);
                    button.html((stm + 1) + '-' + (etm + 1) + "/" + rowCount);
                }
            }

            pageSelect.val(pageNumber);

            if (stm >= 0 && etm) {
                $("[data-pag-id='" + tbl + "']").trigger("change-page", [stm, etm]);
            }
        },
        export:function (elm,tbid) {
            var table  =  $('table[data-pag-id="'+tbid+'"]').clone();
            var type  =  $(elm).attr('data-st');
               var img  =  table.find('img');
                   img.each(function () {
                       var src  = $(this).attr('src');
                       var name  =  $(this).attr('alt')
                           var a  =  $("<a>")
                                     .attr('href',src)
                                     .text(name?name:"picture");
                     $(this).replaceWith(a);
                  })
            if(type==='all'){
              
                table.find("thead .filter-table-row-header-tr").remove();
                var tr = table.find("thead>tr>th");
                tr.each(function () {
                    if ($(this).css("display") === "none"||$(this).hasClass('d-none')) {
                        $(this).remove();
                    }
                })
                var td = table.find("tbody>tr>td");
                td.each(function () {
                    if ($(this).css("display") === "none"||$(this).hasClass('d-none')) {
                        $(this).remove();
                    }
                })
                table.find("thead tr td").remove();
              
            }else{
              
                var tr = table.find("tbody>tr");
                tr.each(function () {
                    var selected = $(this).find('.selected')
                    if (selected.length<1) {
                        $(this).remove();
                    }
                })
                var indexList  = [];
                table.find("tbody>tr>td:first-child").addClass('selected');
                var td = table.find("tbody>tr>td");     
                td.each(function () {
                    if ($(this).hasClass('selected')) {
            
                        indexList.push($(this).index());
                    }else{
                        $(this).addClass('removed-class');
                    }
                })
             
                var th = table.find("thead:first-child tr th");
                th.each(function () {

                    var indext  =  $(this).index();
                    if (indexList.includes(indext)) {
                     
                    }else{
                        $(this).addClass('removed-class');
                    }
                })
                table.find(".removed-class").remove();

            }
            table.tblToExcel();
        }

    },
    tableShowHideColumn: {
        Init: function (elm) {
            var table = $(elm);
            if (table.prop('tagName') === 'TABLE') {
                var oldId  = $(elm).attr('data-colum-id')
                $(".toggle-block-"+oldId).remove();
                var tableId = makeId(10);
                var btn  = $(this.openBlockBtn(tableId))
                table.find("thead >tr>th:first-child").html(btn);
                this.openBlock(btn)
                onclick='cmpList.tableShowHideColumn.openBlock(this)'
                table.attr("data-colum-id",tableId);
                $(elm).attr('component-type',"table-show-hide-column");
                var ul  = $("<ul>")
                var headerList = table.find("thead > tr > th");
                var that  = this ;
                  ul.append(this.genAllCheckBtn());
                  headerList.each(function () {
                    var orderNo = $(this).index();  
                    var text = $(this).text();
                      text = text.trim();
                    if(text.length >0 &&orderNo){
                         if($(this).hasClass("right-click-btn")){
                            
                        }else{ 
                            ul.append(that.genCheckItem(orderNo,text));
                        } 
                    } 
                  })

                  $(table).before(this.genBlock(tableId,ul.html()));
                  this.getLocalStorage(tableId);
            }

        },
        genBlock: function (tableId,list) {
            return ` <div  table-id='${tableId}' class="showhide-col-main-info toggle-block-${tableId}" style="display: none">
            <div class="showhide-col-main-info-in">
                <ul>
                   ${list}
                </ul>
                <div class="showhide-col-footer">
                    <span onclick='cmpList.tableShowHideColumn.showAllBtn("${tableId}")'  class="scm-show"><i class="fas fa-eye"></i></span>
                    <span onclick='cmpList.tableShowHideColumn.getLocalStorage("${tableId}")' class="scm-hide"><i class="fas fa-eye-slash"></i></span>
                </div>
            </div>
           
        </div>`
        },
        genAllCheckBtn: function (params) {
                return `<li>
                            <label>
                            Hamısı 
                            <input onchange='cmpList.tableShowHideColumn.checkAllBtn(this)' class="showhide-col-checkbox showhide-allcheckbox"  type="checkbox" checked >
                            </label>
                        </li> 
                        <hr class="m-1">
                        `
        },
        genCheckItem: function (order,nm) {
                return ` <li orderNo='${order}'>
                             <label>
                                ${nm}
                                <input onchange='cmpList.tableShowHideColumn.showHideClick(this)' class="showhide-col-checkbox show-hide-btn-4-global show-hide-btn-4-chwk" data-order='${order}' type="checkbox" checked >
                             </label>
                         </li> 
                        `
        },
        openBlockBtn: function (tableId) {
            return `<div  table-id='${tableId}' class="showhide-col-btn ">
                       <i class="cs-svg-icon numbers"></i>
                   </div>`

        },
        openBlock: function (elm) {
              $(elm).on('click',function(e){
                   var  block  = $(".toggle-block-"+$(this).attr('table-id'));
                    block.toggle('fast');
                    cmpList.getElementPosition(e,block);
                    block.draggable({
                    "containment":".redirectClass"
                })
              })
           
        },
        showHideClick: function (elm) {
            var tableId  = $(elm).closest('.showhide-col-main-info').attr('table-id');
              this.showHideClickCore(elm);
              this.saveLocalStorage(tableId);
              this.checkedTrueFalseAllBtn(tableId);
        },
        showHideClickCore: function (elm) {
            var item  = $(elm);
            var tableId  = item.closest('.showhide-col-main-info').attr('table-id');
            var order  = item.attr("data-order")
            var th  = $("[data-colum-id='"+tableId+"'] > thead > tr > th:eq("+order+")");
            var td  = $("[data-colum-id='"+tableId+"'] > tbody > tr").find("td:eq("+order+")");
            if(item.prop("checked")){
                td.each(function () {
                     $(this).removeClass("d-none"); 
                })
                th.each(function () {
                     $(this).removeClass('d-none'); 
                })
            }else{
               td.each(function () {
                    $(this).addClass('d-none'); 
              })
               th.each(function () {
                   $(this).addClass('d-none'); 
               })
            }
        },
        saveLocalStorage:function (tableId) {
             var realTabId = $("table[data-colum-id='"+tableId+"']").attr("id");
            var li  = $("[table-id='"+tableId+"'] ul").find('li');
                var list = [];
               li.each(function (params) {
                   if($(this).find("input.show-hide-btn-4-global").prop("checked")){
                    list.push($(this).attr('orderno'));
                   }
                    
               })
             localStorage.setItem("show-hide-column"+realTabId,list);
        },
        checkAllBtn:function (elm) {
            var input  =  $(elm).closest("ul").find('li input.show-hide-btn-4-global');
            var tableId  = $(elm).closest('.showhide-col-main-info').attr('table-id');
            if($(elm).prop("checked")){
                input.prop("checked",true);
            }else{
                input.prop("checked",false);
            }
            this.saveLocalStorage(tableId);
            this.getLocalStorage(tableId);
        },
        showAllBtn:function (tableId) {
            var input  = $("[table-id='"+tableId+"'] ul").find('li input.show-hide-btn-4-global');
      
            input.each(function (params) {
                var order  = $(this).attr("data-order");
                var th  = $("[data-colum-id='"+tableId+"'] > thead > tr > th:eq("+order+")");
                var td  = $("[data-colum-id='"+tableId+"'] > tbody > tr").find("td:eq("+order+")");  
                td.each(function () {
                    $(this).show(); 
               })
               th.show()
            })         
        },
        getLocalStorage:function (tableId) {
             try { 
                var realTabId = $("table[data-colum-id='"+tableId+"']").attr("id");
                var list  =   localStorage.getItem("show-hide-column"+realTabId);
            
                if(list||list===""){
                    var ul  = $("[table-id='"+tableId+"'] ul");
                    var inpt  = ul.find('li input.show-hide-btn-4-global');
                    inpt.prop("checked",false);
                     list  =  list.split(',');
                 for (let i = 0; i < list.length; i++) {
                     const o = list[i];
                     ul.find("li[orderno='"+o+"'] input").prop("checked",true);
                 }
                
                 var that = this;
                 inpt.each(function () {      
                        that.showHideClickCore($(this));   
                })
               
                }
                this.checkedTrueFalseAllBtn(tableId);
             } catch (error) {
             
            } 
           
        },
        checkedTrueFalseAllBtn : function (tableId) {
            var input  = $("[table-id='"+tableId+"'] ul").find('li input.show-hide-btn-4-global');
             var allinp  =  $("[table-id='"+tableId+"'] ul").find('li input.showhide-allcheckbox');
             var count  = 0
            input.each(function (params) {
               if($(this).prop("checked")){
                   count++
               }
            }) 
             if(count===input.length){
                allinp.prop("checked",true);
             }else{
                allinp.prop("checked",false);
             }
        }
    },
    tableRightClick:{
            Init: function(table){
                    var elm  = $(table); 
                    if (elm.prop('tagName') === 'TABLE') {
                        var tbid = makeId(10);
                        $(elm).attr("right-click", tbid);
                        $(elm).parent().find(".contextMenu-dropdown-style").remove();
                        $(elm).attr('component-type',"table-right-click");
                        var btns = $(elm).find("thead .right-click-btn");
                        var list  = $("<ul>");
                        var that = this;
                        btns.each(function () {
                            var icon  = $(this).attr("sa-data-content");
                             var order =  $(this).index();
                             var text  = $(this).text();
                            list.append(that.clickItem(order,text,tbid,icon));
                        })
                        var title  =  $(elm).find("thead th.right-click-btn");
                            title.hide();
                        $(elm).find("tbody .right-click-btn").closest("td").hide();
                     
                        $('body').append(this.genBlock(tbid,list.html()));
                        this.clickRight(tbid);
                    }
                
            },
            onClickItem: function (event,elm,tbid) {
                var order  = $(elm).attr('order-no')
                var item  = $("[right-click="+tbid+"] tbody .last_click_class td:eq("+order+")");
                item.find('.right-click-btn').trigger('click',[event]);
            },
            clickItem : function(order,text,tbid,icon) {
                return `<li onclick="cmpList.tableRightClick.onClickItem(event,this,'${tbid}')" class="dropdown-item" order-no="${order}">
                        <i class="cs-svg-icon ${icon?icon.trim():"link-2"}"></i> ${text}
                      </li>`
            },
            clickRight: function (tableId) {
              
                $(document).on("contextmenu","[right-click="+tableId+"] tbody tr",function (e) {
                    $(this).closest('tbody').find("tr").removeClass("last_click_class");
                    var menu  = $("#contextMenu"+tableId);
                     $(this).addClass("last_click_class");
                    menu.show();     
                    e.preventDefault(); // To prevent the default context menu.
                   
                    cmpList.getElementPosition(e,menu);
                })
            },
            genBlock: function (tbid,list) {
                return `<div id="contextMenu${tbid}" class="dropdown contextMenu-dropdown-style" style="">
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style="display:block;position:static;margin-bottom:5px;">
                      ${list}
                </ul>
            </div>`
            },
    },
    aktivPassivBtn:{
        Init: function (elm) {
              var elm  = $(elm); 
                  var newId = makeId(10);
                 
                  $(elm).attr('data-mode-id',newId);
                  $(elm).css({
                      "align-self":"center",
                      "max-width":"100%",
                  });
                  $(elm).attr('component-type',"mode-aktiv");
                  $(elm).html(this.genBlock(newId));
                             
        },
        genBlock: function (newId) {
            return `<div class="dropdown info-box-dropdown mode-aktiv-all" data-val='A' style='width:max-content;margin:auto' id="">
            <a class="btn dropdown-toggle" href="#" role="button" id="" data-toggle="dropdown" aria-expanded="false">
                <span class="title">A</span> <span id="row-count-table"></span>
            </a>
           <div class="dropdown-menu dropdown-menu-right" aria-labelledby="task-table-aktiv-all1">
              <a class="dropdown-item" onclick="cmpList.aktivPassivBtn.clickDropdownItem(this,'${newId}')" all-aktiv="A" href="#">Aktiv</a>
              <a class="dropdown-item" onclick="cmpList.aktivPassivBtn.clickDropdownItem(this,'${newId}')" all-aktiv="P" href="#">Passiv</a>
              <a class="dropdown-item" onclick="cmpList.aktivPassivBtn.clickDropdownItem(this,'${newId}')" all-aktiv="H" href="#">Hamısı</a>
            </div>
          </div>`        
        },
        clickDropdownItem: function (elm,newId) {
            var type  = $(elm).attr("all-aktiv");
            $(elm).closest('.mode-aktiv-all').find('.title').text(type);
            $(elm).closest('.mode-aktiv-all').attr("data-val",type);
            $("[data-mode-id='" + newId + "']").trigger("change-mode", [type]);
        }
    },
    genTableToggleBtn:{
        Init: function (elm,title) {
            var elm = $(elm);
               var attr  =  $(elm).attr('data-toggle-id');
            if (elm.prop('tagName') === 'TABLE') {
                $("#table_toggle_id_"+attr).remove();
                $(elm).parent().find(".modal-inside-table-expand").remove();
                
                var tbid = makeId(10);
                $(elm).parent().append(this.genCloseBtn(tbid));
                $(elm).attr("data-toggle-id", tbid);
                $(elm).attr('component-type',"table-toggle");
                $(elm).parent().before(this.genBlock(tbid,title));
               
            }
        },
        genCloseBtn: function (tbid) {
            return  `<span onclick="cmpList.genTableToggleBtn.clickCloseExpandTable(this,'${tbid}')" class="btn btn-sm btn-light position-absolute top-0 right-0 d-none toggle-table-close-${tbid}" style="top: 0px; right: 0px; z-index: 22;">
            <i class="fas fa-times" aria-hidden="true"></i>
            </span>`
        },
        genBlock: function (tableId,title) {
                return  `<div id='table_toggle_id_${tableId}' class="d-flex border-bottom-1px pb-1 m-1 mb-2 w-100">
                                        <div class="mr-auto toggle-body-title">
                                            <div class="result-box"><i class="cs-svg-icon  task-03"></i> <span class="name">${title?title:""}</span></div>
                                        </div>
                                        <div class="toggle-min-elements">
                                            <a class="cs-url" onclick="cmpList.genTableToggleBtn.clickExpandTable(this,'${tableId}')" ><i class="cs-svg-icon fullscreen"></i></a>
                                            <a onclick="cmpList.genTableToggleBtn.clickToggleTable(this,'${tableId}')" class="cs-url "><i class="fal fa-angle-down" aria-hidden="true"></i></a>
                                        </div>
                                    </div>`
        },
        clickToggleTable: function (elm,tableId) {
            $(elm).find('i').toggleClass("fa-angle-up");
            $(elm).find('i').toggleClass("fa-angle-down");
            $("[data-toggle-id='"+tableId+"']").toggleClass("d-none");
        },
        clickExpandTable: function (elm,tableId) {
            $(elm).closest('.modal').addClass('large-table-modal');
            $("[data-toggle-id='"+tableId+"']").closest('.component-container-dashed').addClass("modal-table-large-mod");
            $(".toggle-table-close-"+tableId).removeClass('d-none');
        },
        clickCloseExpandTable: function (elm,tableId) {
            
            $(elm).closest('.modal').removeClass('large-table-modal');
            $("[data-toggle-id='"+tableId+"']").closest('.component-container-dashed').removeClass("modal-table-large-mod");
            $(elm).addClass('d-none');
        }


    },
    saConfirm:{
        _hilightAnimating: false,
       Init:function(data){
               var container  = $(data.parent?data.parent:"body");

               container.append(this.genBlock(data))
       },
       genBlock:function(data) {
               var that  = this;
                var title = data.title?data.title:'Are You Sure?';
                var acceptButton = data.confrimButton?data.confrimButton:lang_task.windowUpdateTask.yes;
                var cancelButton = data.cancelButton?data.cancelButton:lang_task.windowUpdateTask.no;
                var buttonConfrim = $('<button type="button" class="btn cs-nextsave-btn w-50 mr-2">').text(acceptButton).click(function (e) {
                     var res =  data.confirmAction();
                    if(res){
                        data.confirmAction();
                      
                    }
                    that.close(this);
                });
                var buttonCancel = $('<button type="button" class="btn cs-nextsave-btn w-50">').text(cancelButton).click(function (e) {
                    e.preventDefault();
                    e.preventDefault();
                    var res =  data.cancelAction();
                   if(res){
                       data.cancelAction();
                       
                   }
                   that.close(this);
                });
                var closeButton = $('<span class="cs-close-confirm-eb-btn"><i class="fa fa-close"></i>').click(function (e) {
                    e.preventDefault();
                    var res =  data.closeAction();
                   if(res){
                       data.closeAction();
                    
                   }
                   that.close(this);
                });
                var div  = $("<div>")
                             

          var container   =  $("<div class='sa-confirm-block'>")
                                      .on('click',function(e){
                                                 var $body  =   $(this).closest('.sa-confirm-block').find('.cs-confirm-element-box-bg');
                                                    
                                                      var that = this;
                                                        if (this._hilightAnimating) {
                                                            return;
                                                        }
                                                        $body.addClass("highilight");
                                                        var duration = parseFloat($body.css("animation-duration")) || 2;
                                                        this._hilightAnimating = true;
                                                        setTimeout(function () {
                                                            that._hilightAnimating = false;
                                                            $body.removeClass("highilight");
                                                        }, duration * 1000);
                                              })
          var backGround   =  $("<div class='sa-confirm-background'>")
                                     
              var block  = $("<div class='cs-confirm-element-box-in'>")
                                 .append($("<div class='cs-confirm-element-box-bg'>")
                                            
                                            .append($("<div class='d-flex'>")
                                                        .append('<div class="mr-auto"></div>')
                                                         .append($("<div>")
                                                                      .append(closeButton)))
                                            .append(`<div class="cs-input-group mt-1 text-center" ><h4>${title}</h4></div>`)
                                            .append($("<div class='cs-input-group  d-flex'>")
                                                            .append(buttonConfrim)
                                                            .append(buttonCancel))
                                            .append(` <div class="cs-input-group ${data.notShowAgain?"":"d-none"} mt-2" >
                                                            <label class='checkmarkcontainer'>
                                                                <span class='ml-1'>${lang_task.windowUpdateTask.notShowAgain}</span>
                                                                <input type='checkbox'>
                                                                <span class="checkmark"></span> 
                                                        </label>
                                                    </div>`)
                                            )
            
           return  container.append(backGround)
                            .append(block);
       },
       close:function(elm){
          $(elm).closest(".sa-confirm-block").remove();
       }
    },
    getElementPosition:function (e,menu) {
                   var windowHeight = $(window).height()/2;
                    var windowWidth = $(window).width()/2;
                    //When user click on bottom-left part of window
                    $(menu).css("z-index", '55555555');
                    if(e.clientY > windowHeight && e.clientX <= windowWidth) {
                      $(menu).css("left", e.clientX);
                      $(menu).css("bottom", $(window).height()-e.clientY);
                      $(menu).css("right", "auto");
                      $(menu).css("top", "auto");
                    } else if(e.clientY > windowHeight && e.clientX > windowWidth) {
                      //When user click on bottom-right part of window
                      $(menu).css("right", $(window).width()-e.clientX);
                      $(menu).css("bottom", $(window).height()-e.clientY);
                      $(menu).css("left", "auto");
                      $(menu).css("top", "auto");
                    } else if(e.clientY <= windowHeight && e.clientX <= windowWidth) {
                      //When user click on top-left part of window
                      $(menu).css("left", e.clientX);
                      $(menu).css("top", e.clientY);
                      $(menu).css("right", "auto");
                      $(menu).css("bottom", "auto");
                    } else {
                       //When user click on top-right part of window
                      $(menu).css("right", $(window).width()-e.clientX);
                      $(menu).css("top", e.clientY);
                      $(menu).css("left", "auto");
                      $(menu).css("bottom", "auto");
                    }
                    /* By Revan :)) */ 
    }
}
/* // fn fnction >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
$.fn.selectInterActive = function (type, title,iconClass) {
    if (type === 'multi' || type === 'single') {
        cmpList.userBlock.Init(this,type,title,iconClass);
    }  
}
$.fn.getVal = function (val) {
    var type  = $(this).attr("component-type");
       if(type==='selectInterActive'){
        var detect = $(this).find('.user-addons-box-elm');
        if (detect.length > 0) {
            if (val || val === "") {
                cmpList.userBlock.setUserBlockValue(this, val);
            } else {
                return cmpList.userBlock.getUserBlockValue(this);
            }
        }
       }
       else if (type==='mode-aktiv'){
        if (val==='A'||val==='B'||val==='H') {
          
        } else {
            var value =$(this).find('.mode-aktiv-all').attr('data-val');
           return value?value:"A";
        }
        
       }
   
}
$.fn.setRowCount = function (val) {

      if(!val){
        return;
      } 
      val = parseFloat(val);
    var type  = $(this).attr("component-type");
       if(type==='selectInterActive'){
       
       }
       else if (type==='mode-aktiv'){
        if(typeof val ==="number"){
             $(this).find('#row-count-table').text(val);
        }           
       }
   
}
$.fn.genPaginition = function (rowCount) {
    cmpList.tablePagintion.Init(this, rowCount);
}
$.fn.genModeAktivPassiv = function () {
    cmpList.aktivPassivBtn.Init(this);
}
$.fn.genShowHideList = function (val) {
    cmpList.tableShowHideColumn.Init(this, val);
}
$.fn.genRightClickMenu = function (val) {
    cmpList.tableRightClick.Init(this);
}
$.fn.genToggleTable = function (val) {
    cmpList.genTableToggleBtn.Init(this,val);
}
$.fn.textWidth = function(){
    var html_org = $(this).html();
    var html_calc = '<span>' + html_org + '</span>';
    $(this).html(html_calc);
    var width = $(this).find('span:first').width();
    $(this).html(html_org);
    return width;
};
$.fn.extend({
    autoHeight: function () {
        function autoHeight_(element) {
        
         $(element).css({
                    "height": "auto",
                    "overflow-y": "hidden"
                })
          var  height  = element.scrollHeight>20?element.scrollHeight:"";
               $(element).height(height);
         return $(element);
        }
        return this.each(function () {
            autoHeight_(this).on("input", function () {
                autoHeight_(this);
            });
        });
    }
});
$.saConfirm = function(options, elements){
    if (typeof options === "undefined") {
        options = {};
    }
    if (typeof options === "string") {
        options = {
            content: options,
            element: (option2) ? option2 : false
        };
    }
    if (typeof options.buttons != "object") {
        options.buttons = {};
       
    }
    if (typeof options.closeAction === "function") {
          
    }
    return  cmpList.saConfirm.Init(options);
};
$.fn.tblToExcel = function () {
    var elm = true;
    if (this.length > 1) {
        $('body').append('<div id="tbl-tnv-back" style="position: fixed; z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);">' +
            '<div id="tbl-tnv-excel" style="background-color: #fefefe;margin: auto;' +
            'padding: 20px; ' +
            'overflow: auto;' +
            'border: 1px solid #888;' +
            'width: 80%;" >  </div>' +
            '</div>');
        elm = false;
    }
    $('#tbl-tnv-back').click(function () {
        $(this).remove();
        $('#tbl-tnv-anch').remove();
    });
    var tableToExcel = (function () {
        var i = 0;
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta charset="utf-8"/><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                })
            };
        return function (table, name) {
            if (!table.nodeType)
                table
            var ctx = {
                worksheet: name || 'Worksheet',
                table: table.innerHTML
            }
            if (elm) {
                window.location.href = uri + base64(format(template, ctx));
            } else {
                i++;
                var xl = uri + base64(format(template, ctx));
                $('#tbl-tnv-excel').append('<a id="tbl-tnv-anch" style="background-color: #4CAF50;border: none;\n' +
                    'color: white;' +
                    'padding: 15px 32px;' +
                    'text-align: center;' +
                    'text-decoration: none;' +
                    'display: inline-block; margin: 1px;' +
                    'font-size: 16px;" href=' + xl + ' download>Download Excel-' + i + ' </a>');
            }
        }
    })();

    return this.each(function () {
        tableToExcel(this, 'W3C Example Table');
    });
}
String.prototype.xss=function(){
    var str=this;

   return str?String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;'):'';
};
/* ///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<component events >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
/*    // userList Block start */
$(document).on('click', '.user-avatar-list li .item-click .removed-user-btn', function (e) {
    e.stopPropagation();

    var elm = $(this).closest("li");
    var ul = $(this).closest("ul");
    var tit = $(this).closest('.user-addons-box-elm').find(".user-dropdonw-btn");
    if (ul.hasClass("user-list-avatar-single")) {
        var iconClass  = tit.attr('data-icon')
                tit.html(`<i class="user-interactive-icon  ${iconClass}"></i>`);
    } else {
        cmpList.userBlock.returnValueSelect(elm);
        tit.find("#" + elm.attr('id')).remove();
        if (tit.find("img").length < 1) {
               var iconClass  = tit.attr('data-icon')
                  tit.html(`<i class="user-interactive-icon  ${iconClass}"></i>`);
        }
        cmpList.userBlock.genInterActiveView(this, 'delete');
    }
    var prt = $(this).closest('.user-addons-box-elm').parent();
    //event interactive 
    $(prt).trigger("delete-interactive", [elm.attr("id")]);

    elm.remove();
});

$(document).on('change', 'select.user-list-selectbox-multiple', function (e) {

    const o = $(this).val();
    var userImage = SAProjectUser.Users[o].userImage;
    var userName = SAProjectUser.Users[o].userPersonName;
    var tit = $(this).closest('.user-addons-box-elm').find(".user-dropdonw-btn");
    var block = $(this).closest('.user-addons-box').find('.user-avatar-list ul');
    var has = block.find("#" + o);
    if (has.length < 1) {
        tit.find(".user-interactive-icon").remove();
        tit.append(cmpList.userBlock.genviewItemBlock(o, userImage, userName));
        block.append(cmpList.userBlock.genItemBlock(o, userImage, userName));

        $(this).find('[value="' + o + '"]').remove();
        $(this).selectpicker('refresh');
        cmpList.userBlock.genInterActiveView(this);
    }
    var prt = $(this).closest('.user-addons-box-elm').parent();
    $(prt).trigger("change-interactive", [o]);
    $('[data-toggle="popover"]').popover({
        html: true
    })
});
$(document).on('change', 'select.user-list-selectbox-single', function (e) {
    const o = $(this).val();
    var userImage = SAProjectUser.Users[o].userImage;
    var userName = SAProjectUser.Users[o].userPersonName;
    var tit = $(this).closest('.user-addons-box-elm').find(".user-dropdonw-btn");
    var block = $(this).closest('.user-addons-box').find('.user-avatar-list ul');

    tit.html(cmpList.userBlock.genviewItemBlock(o, userImage, userName));
    block.html(cmpList.userBlock.genItemBlock(o, userImage, userName));
    var prt = $(this).closest('.user-addons-box-elm').parent();
    $(prt).trigger("change-interactive", [o]);
    $('[data-toggle="popover"]').popover({
        html: true
    });
    $(this).closest(".dropdown-menu").removeClass('show')
});
/*    // userList Block end */
$(document).on("click", '.showhide-col-btn', function (e) {
   e.stopPropagation();
});
$(document).on("input", 'input[type="number"]', function (e) {
    if($(this).attr('maxlength')){
        if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    }
});
$(document).on('hide.bs.dropdown', '.user-addons-box-elm', function (e) {
    return false;
});

$(document).on('click', '.user-addons-box-elm .dropdown-menu', function (e) {
    e.stopPropagation();
})
$(document).on("click", 'body', function () {
    $('.user-addons-box-elm > .dropdown-menu').removeClass('show');
    $(".contextMenu-dropdown-style").hide();
    $(".showhide-col-main-info").hide();
})
$(document).on("click", '.showhide-col-main-info', function (e) {
    e.stopPropagation();
});

function geDateRangePickerValueBT(elm) {
    try {
        var val  = elm.val();
        val = val.split('-')
        var dt = val[0].split('/');
        var dt1 = val[1].split('/');
       var  stTime = dt[2].trim() + dt[0].trim() + dt[1].trim();
       var  endTime = dt1[2].trim() + dt1[0].trim() + dt1[1].trim();
        var inns = stTime.trim() + '%BN%' + endTime.trim();
           return  inns;
    } catch (error) {
        return  '';
    }

}

/*   // selectable table Block start */
var isMouseDown = false;
var startRowIndex = null;
var startCellIndex = null;

function selectTo(cell) {
        
    var row = cell.parent();
    var cellIndex = cell.index();
    var rowIndex = row.index();
    var rowStart, rowEnd, cellStart, cellEnd;

    if (rowIndex < startRowIndex) {
        rowStart = rowIndex;
        rowEnd = startRowIndex;
    } else {
        rowStart = startRowIndex;
        rowEnd = rowIndex;
    }

    if (cellIndex < startCellIndex) {
        cellStart = cellIndex;
        cellEnd = startCellIndex;
    } else {
        cellStart = startCellIndex;
        cellEnd = cellIndex;
    }

    for (var i = rowStart; i <= rowEnd; i++) {

        var rowCells = $(".selectableTable tbody tr:eq(" + i + ")").find("td");

        for (var j = cellStart; j <= cellEnd; j++) {
            var dso = $(rowCells[j]).css("display")
            if (dso === 'none') {

            } else {
                $(rowCells[j]).addClass("selected");
            
            }

        }
    }
    var count = $(cell).closest(".selectableTable").find("td.selected")
    sumAvarMaxMinCount(cell, count);
}

function sumAvarMaxMinCount(tbid,selected) {
    var est=0
    var min = 0;
    var max = 0;
    var sum = 0;
    $(selected).each(function (index) {
        var dt = $(this);
        var val = dt.text();
          val  =  val.replace('%','');
          val = new Number(val);
          val  =  parseFloat(val);
         if(val){
             console.log(val);
             est++;
             if (est === 1) {
                min = val;
             }    
            
            sum = sum + val;
            if (max < val) {
                max = val;
            }
            if (min > val) {
                min = val;
            }
         }  
    })
    sum  = (Math.round(sum * 100) / 100)
    var count  = $(selected).length;
    var tbid = $(tbid).closest('table').attr('data-pag-id');
    var elm = $("#table-selected-row-details-"+tbid+"");
        elm.removeClass('d-none');
        elm.parent().removeClass('d-none');
    var avar = (sum / count);
    $(elm).find('.sum')
          .html((sum) ? ("<b>cəm: </b>" + sum) : "cəm").attr((sum) ? "data-tst" : ("disabled"), "true").removeAttr((sum) ? "disabled" : (""));
    $(elm).find('.avarage').html((sum) ? "<b>ortalama: </b>" + avar.toFixed(1) : "ortalama").attr((sum) ? "data-tst" : ("disabled"), "true").removeAttr((sum) ? "disabled" : (""));
    $(elm).find('.min').html((min) ? " <b>min: </b>" + (min) : "min").attr((min) ? "data-tst" : ("disabled"), "true").removeAttr((min) ? "disabled" : (""));
    $(elm).find('.max').html((max) ? " <b>maks: </b>" + (max) : "maks").attr((max) ? "data-tst" : ("disabled"), "true").removeAttr((max) ? "disabled" : (""));
    $(elm).find('.count').html((count) ? " <b>say: </b>" + (count) : "say").attr((count) ? "data-tst" : ("disabled"), "true").removeAttr((count) ? "disabled" : (""));
      elm.selectpicker('refresh');
}

$(document).on("mousedown", ".selectableTable td:not(:first-child)", function (e) {
    var tbid = $(this).closest('table').attr('data-pag-id');
        isMouseDown = true;
        var cell = $(this);
       
    $(".selectableTable").find(".selected").removeClass("selected"); // deselect everything
    var elm = $("#table-selected-row-details-"+tbid+"");
    elm.addClass('d-none');
    elm.parent().addClass('d-none');
    $(this).closest('table').find('.last_click_class').removeClass('last_click_class');
    if (e.shiftKey) {
        selectTo(cell);
    } else {
        cell.addClass("selected");
        startCellIndex = cell.index();
        startRowIndex = cell.parent().index();
    }

   // return false; // prevent text selection
})
$(document).on("mouseover", ".selectableTable td:not(:first-child)", function (e) {
    if (!isMouseDown)
        return;
    $(".selectableTable").find(".selected").removeClass("selected");
    selectTo($(this));
})

$(document).on("mouseover", ".selectableTable thead th:not(:first-child)", function (e) {
    if (!isMouseDown)
        return;
        if (e.shiftKey) {}else{
            $(".selectableTable").find(".selected").removeClass("selected");
        }   

    selectTheadOnClick(this);
  
})
$(document).on("click", ".selectableTable thead th", function (e) {
 
    if (e.shiftKey) {}else{
        $(".selectableTable").find(".selected").removeClass("selected");
    }
   
    selectTheadOnClick(this);
})
$(document).on("mousedown", ".selectableTable thead th:not(:first-child),.selectableTable tbody tr td:first-child", function (e) {
    isMouseDown = true;
    return false; // prevent text selection
})
function selectTheadOnClick(elm) {
 
    var ind = $(elm).index();
    var tbl = $(elm).closest(".selectableTable").find("tbody tr");
    for (let index = 0; index < tbl.length; index++) {
        $(tbl[index]).find("td").eq(ind).addClass("selected");
    }
    var count = $(elm).closest(".selectableTable").find("td.selected")

    sumAvarMaxMinCount(elm,count);
}
$(document).on("click", ".selectableTable tbody  tr td:first-child", function (e) {
    if (e.shiftKey) {}else{
        $(".selectableTable").find(".selected").removeClass("selected");
    }
       var td  = $(this).closest('tr').find('td:not(:first-child)');
           td.each(function (params) {
            if ($(this).css("display") === "none"||$(this).hasClass('d-none')) {
                
            }else{
                $(this).addClass('selected');
            }
           })
           var count = $(this).closest("table.selectableTable").find("td.selected")
           sumAvarMaxMinCount(this,count);
});
$(document).on("mouseover", ".selectableTable tbody  tr td:first-child", function (e) {
        if (!isMouseDown)
        return;
        if (e.shiftKey) {}else{
            $(".selectableTable").find(".selected").removeClass("selected");
        }   

       var td  = $(this).closest('tr').find('td:not(:first-child)');
           td.each(function (params) {
            if ($(this).css("display") === "none"||$(this).hasClass('d-none')) {
                
            }else{
                $(this).addClass('selected');
            }
           })
           var count = $(this).closest("table.selectableTable").find("td.selected")
           sumAvarMaxMinCount(this,count);
});
$(document).on("selectstart", ".selectableTable td", function () {
    return false;
});
$(document).mouseup(function () {
    isMouseDown = false;
});
/*    // selectbale table end */
/* //slider */
const CheweekSlider = function (parentDiv, imgArray) {
    const sliderContainer = document.getElementById(`${parentDiv}`);
    sliderContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="RS-slider"></div>`
    );
    function fillImages(imgArray) {
      imgArray.forEach((_, i) => {
        const sliderC = document.querySelector('.RS-slider');
        sliderC.insertAdjacentHTML(
          'beforeend',
          `<div class="RS-slide">
              <img
                class="RS-slide-img"
                src="${imgArray[i]}"
              />
          </div>`
        );
      });
    }
    fillImages(imgArray);
    const sliderButtons = document.querySelector('.RS-slider');
    sliderButtons.insertAdjacentHTML(
      'afterend',
      `
    <div class="RS-slider-controls">
    <div class="RS-slider__btn RS-slider__btn--left"><svg xmlns="http://www.w3.org/2000/svg"  fill="none"
    viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg></div>
    <div class="RS-slider__btn RS-slider__btn--right"><svg xmlns="http://www.w3.org/2000/svg"  fill="none"
    viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg></div>
    <div class="RS-dots"></div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" class="RS-close-full-slider RS-hidden-slider" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
    `
    );
    const slideImg = document.querySelectorAll('.RS-slide-img');
    const slides = document.querySelectorAll('.RS-slide');
    const btnLeft = document.querySelector('.RS-slider__btn--left');
    const btnRight = document.querySelector('.RS-slider__btn--right');
    const dotContainer = document.querySelector('.RS-dots');
    const exitIcon = document.querySelector('.RS-close-full-slider');
    exitIcon.addEventListener('click', function () {
      sliderContainer.style.position = 'relative';
      sliderContainer.classList.remove('RS-background-blur');
      exitIcon.classList.add('RS-hidden-slider');
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        sliderContainer.style.position = 'relative';
        sliderContainer.classList.remove('RS-background-blur');
      }
    });
    let curSlide = 0;
    const maxSlide = slides.length;
    const createDots = function () {
      slideImg.forEach(function (_, i) {
        let img = slideImg[i].src;
        dotContainer.insertAdjacentHTML(
          'beforeend',
          `<img width="50px" height="50px" class="RS-dots__dot" data-slide="${i}" src="${img}" />`
        );
      });
    };
    const activateDot = function (slide) {
      document
        .querySelectorAll('.RS-dots__dot')
        .forEach((dot) => dot.classList.remove('RS-dots__dot--active'));
      document
        .querySelector(`.RS-dots__dot[data-slide="${slide}"]`)
        .classList.add('RS-dots__dot--active');
    };
    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      );
    };
    const nextSlide = function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    };
    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    };
    const init = function () {
      goToSlide(0);
      createDots();
      activateDot(0);
    };
    init();
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') prevSlide();
      e.key === 'ArrowRight' && nextSlide();
    });
    dotContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('RS-dots__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
    const CheweekFullSlider = function (parentDiv, imgArray) {
      const pageBody = document.getElementsByTagName(`body`)[0];
      pageBody.style.margin = '0';
      pageBody.style.overflow = 'hidden';
      pageBody.insertAdjacentHTML(
        'afterbegin',
        `<div id="${parentDiv}-RSFULL-slider" class="RSFULL-slider RSFULL-hidden-slider">
        </div>`
      );
      function fillImages(imgArray) {
        imgArray.forEach((_, i) => {
          const sliderC = document.getElementById(`${parentDiv}-RSFULL-slider`);
          sliderC.insertAdjacentHTML(
            'beforeend',
            `<div class="RSFULL-slide">
                <img
                  class="RSFULL-slide-img"
                  src="${imgArray[i]}"
                />
            </div>`
          );
        });
      }
      fillImages(imgArray);
      const sliderButtons = document.getElementById(`${parentDiv}-RSFULL-slider`);
      sliderButtons.insertAdjacentHTML(
        'beforeend',
        `
      <div class="RSFULL-slider-controls">
      <div class="RSFULL-slider__btn RSFULL-slider__btn--left"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg></div>
      <div class="RSFULL-slider__btn RSFULL-slider__btn--right"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg></div>
      <div class="RSFULL-dots"></div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="RSFULL-close-full-slider " fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      `
      );
      const slideImg = document.querySelectorAll('.RS-slide-img');
      const slides = document.querySelectorAll('.RSFULL-slide');
      const btnLeft = document.querySelector('.RSFULL-slider__btn--left');
      const btnRight = document.querySelector('.RSFULL-slider__btn--right');
      const dotContainer = document.querySelector('.RSFULL-dots');
      const exitIcon = document.querySelector('.RSFULL-close-full-slider');
      const sliderFull = document.querySelector('.RSFULL-slider');
      function closeFullSlider() {
        sliderFull.classList.add('RSFULL-hidden-slider');
      }
      function openFullSlider() {
        sliderFull.classList.remove('RSFULL-hidden-slider');
      }
      slideImg.forEach((e) => {
        e.addEventListener('click', openFullSlider);
      });
  
      exitIcon.addEventListener('click', closeFullSlider);
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          closeFullSlider();
        }
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          sliderContainer.style.position = 'relative';
          sliderContainer.classList.remove('RSFULL-background-blur');
        }
      });
      let curSlide = 0;
      const maxSlide = slides.length;
      const createDots = function () {
        slideImg.forEach(function (_, i) {
          let img = slideImg[i].src;
          dotContainer.insertAdjacentHTML(
            'beforeend',
            `<img width="50px" height="50px" class="RSFULL-dots__dot" data-slide="${i}" src="${img}" />`
          );
        });
      };
      const activateDot = function (slide) {
        document
          .querySelectorAll('.RSFULL-dots__dot')
          .forEach((dot) => dot.classList.remove('RSFULL-dots__dot--active'));
        document
          .querySelector(`.RSFULL-dots__dot[data-slide="${slide}"]`)
          .classList.add('RSFULL-dots__dot--active');
      };
      const goToSlide = function (slide) {
        slides.forEach(
          (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
      };
      const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
          curSlide = 0;
        } else {
          curSlide++;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
      };
      const prevSlide = function () {
        if (curSlide === 0) {
          curSlide = maxSlide - 1;
        } else {
          curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
      };
      const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
      };
      init();
      btnRight.addEventListener('click', nextSlide);
      btnLeft.addEventListener('click', prevSlide);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
      });
      dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('RSFULL-dots__dot')) {
          const { slide } = e.target.dataset;
          goToSlide(slide);
          activateDot(slide);
        }
      });
    };
    CheweekFullSlider(parentDiv, imgArray);
 };


 
   /// checklist  start
var fn_22010711064709895352 = {


    create_aciqlama: (fkOnwer, elem) => {
    
        var setBack = elem.closest('.redirectClass')
        var loc = setBack.find('.task-check-list-box li .hm')
        if (loc.length > 0) {
            for (let i = 0; i < loc.length; i++) {
                var title = $(loc[i]).text();
                var fileList = $(loc[i]).closest('li').find('.saTypeFilePicherUploadFile').attr('fname');
                callApi('21121713570309449461',{title: title,fkOwnerId: fkOnwer,filePicker:fileList}, false, function (res) {
    
                        $('#newAddCheckListVocation').val('');
                        fn_22010711064709895352.loader(fkOnwer);
                    }
    
                )
            }
        } else {
            var titlee = $('#newAddCheckListVocation').val();
    
            callApi('21121713570309449461', {title: titlee,fkOwnerId: fkOnwer}, false, function (res) {
                    $('#newAddCheckListVocation').val('');
                    fn_22010711064709895352.loader(fkOnwer);
                }
    
            )
        }
    },
    
    
    //loader function
    loader: (fkOwnerId) => {
    
        if (fkOwnerId.length > 0) {
            var tab = $(".task-check-list-box ul")
            tab.empty();
            callApi('21121714131601512424', {fkOwnerId: fkOwnerId}, false, function (res) {
    
                    var list = res.tbl[0].r;
                    //var aciqlama = $("#newAddCheckListVocation")
                    var tab = $(".task-check-list-box ul")
                    tab.empty();
               
                    for (let i = 0; i < list.length; i++) {
                        const o = list[i];
                        var bestId = makeId(10);
                        var kid = makeId(10);
                        var imgblock  =  $('<div>')
                        try {
                            var imglist  =  o.filePicker;
                            imglist= imglist.split('|');
                            for (let l = 0; l < imglist.length; l++) {
                                const d = imglist[l];
                                if(d){
                                    imgblock.append(new FileView().genListFileModelNew(finalname,idx))
                                }
                               
                                
                            }
                              
                        } catch (error) {
                            console.log(error);
                        }
     
                        var div =
                            `<li class="d-block component-container-dashed ${(o.isChecked==1)?'on-checked':''}">
                                <div class="d-flex">
                                    <div class="item-checkbox">
                                       <label class="checkmarkcontainer" style="margin-top: 0px;">
                                           <input onchange='fn_22010711064709895352.updateCheckListAciqlama(this)' ${(o.isChecked==1)?'checked':''} class="taskCheckListItemToggle noteCheckListItem" oid="${o.id}" type="checkbox">
                                           <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="mr-auto w-100">
                                            <textarea rows="1" onchange="fn_22010711064709895352.updateMezmunVocation(this)" class="form-control updateTaskcheckListItemName1 " oid="${o.id}" >${o.title}</textarea>
                                    </div>
                                
                                    <div class="pl-0 p2-1">
                                        <span title="Created By">
                                            <img width="40px" class="Assigne-card-story-select-img created" src="${fileUrl(o.userImage)}" data-placement="top" data-trigger="hover" data-toggle="popover" data-content="${o.userName}" data-title="Created By" data-original-title="" title="">
                                        </span>
                                    </div>
                                <div class="pl-0 p2-1"></div>
                                <div class="pl-0 mb-0">
                                    <label class="mb-0">
                                        <span class="taskListenAttachmentFile">
                                             <input type="file"  oid="${o.id}"  id='${bestId}' fname='${o.filePicker}' multiple="" class="d-none file-item-checklist-input-operation saTypeFilePicherUploadFile">
                                                        <i class="cs-svg-icon attach-01"></i>
                                         </span>
                                  
                                    </label>
                                 </div>
                                 <div class="pl-1 p2-1 d-table">
                                       <a href="#" oid="${o.id}" onclick='fn_22010711064709895352.deleteMezmunVocation(this)' class="text-light">
                                         <i class="fas fa-trash-alt" aria-hidden="true"></i>
                                       </a>
                                 </div>
                               </div>
                               <div class="flex-column" fname="">
                                     <div class="progress_bar_new" id="progress_bar_new" style="margin-top: -3px;">
                                            
                                         ${imgblock.html()}
                                     </div>
                                </div>
                      </li>`
                        tab.prepend(div);
                    }
                    $('.updateTaskcheckListItemName1').autoHeight();
                }
    
            )
        }
    
    },
    
    // uddate check
    updateCheckListAciqlama: (el,file) => {
        var data = {};
        var id = $(el).attr('oid');
        var filename = $(el).closest('li').find('.saTypeFilePicherUploadFile').attr('fname');
             console.log($(el).closest('li').find('.saTypeFilePicherUploadFile'));
            data.fkChecklistId = id;
            data.filePicker = filename ;
        if ($(el).closest('li').find('.taskCheckListItemToggle').prop("checked")) { 
            data.isChecked = 1;
        } else {
            data.isChecked = 0;
        }
        callApi('21121714031708916446', data, true);
    },
    
    // update Mezmun
    updateMezmunVocation: (el) => {
        var id = $(el).attr('oid');
        var val = $(el).val();
    
        callApi('21121714072605535941', {fkChecklistId: id,title: val}, true);
    },
    
    //delete Mezmun
    deleteMezmunVocation: (el) => {
        if (confirm("Məlumatın silinməsinə əminsiz?")) {
            var id = $(el).attr('oid');
    
            callApi('21121714100203705645', {
                    fkChecklistId: id
                }, true, function () {
    
                    var fkowner = $(el).closest('.redirectClass').find('[sa-selectedfield="fkActionId"]').val();
                    fn_22010711064709895352.loader(fkowner);
    
                }
    
            )
        }
    },
    
    //create all
    create_all: (el) => {
    
        var setBack = el.closest('.redirectClass');
        var fk_owner = setBack.find('#comp_id_22011915551301534994').val();
        var aciqlama = $("#newAddCheckListVocation");
        var tab = $(".task-check-list-box ul");
        var loc = setBack.find('.task-check-list-box li .hm');
    
        if (loc.length > 0 && fk_owner && aciqlama.val()) {
            var data = aciqlama.val()
            var   ids  =   makeId(10);
            tab.append($(
                `<li class="d-block component-container-dashed">
                <div class="d-flex"> 
                    <div class="item-checkbox">
                    <label class="checkmarkcontainer">
                    <input class="taskCheckListItemToggle noteCheckListItem" oid="22011021582408303160" type="checkbox">
                    <span class="checkmark">
                    </span></label>
                    </div>
                    <div class="mr-auto w-100">
                    <textarea rows="1" class="form-control hm" oid="" style="height: 21px; overflow-y: hidden;">${data}</textarea></div>
                    <div class="pl-1 p2-1"></div>
                    <div class="pl-1 p2-1">
                    </div>
                    <div class="pl-0 mb-0"><label class="mb-0"><span class="taskListenAttachmentFile"><input  id='${ids}' multiple type="file" class="d-none saTypeFilePicherUploadFile"><i class="cs-svg-icon attach-01"></i></span></label></div>
                    <div class="pl-1 p2-1 d-table">
                    <a href="#" oid="" class="taskCheckListItemDeletecreate " style="font-size:13px;"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
                    </div>
                </div>
                
                <div class="flex-column"><div class="progress_bar_new" id='progress_bar_new' style="margin-top: -3px;">
                </div></div>
              </li>`
            ))
            aciqlama.val("")
            fn_22010711064709895352.create_aciqlama(fk_owner, el);
        } 
        
        else if (fk_owner && loc.length > 0) {
            fn_22010711064709895352.create_aciqlama(fk_owner, el);
        } 
        
        else if (fk_owner && aciqlama.val()) {
    
            fn_22010711064709895352.create_aciqlama(fk_owner, el);
    
        } 
        
        else {
    
            if (aciqlama.val()) {
                var data = aciqlama.val()
                var   ids  =   makeId(10);
                tab.append($(
                    `<li class="d-block component-container-dashed">
                <div class="d-flex"> 
                    <div class="item-checkbox">
                    <label class="checkmarkcontainer">
                    <input class="taskCheckListItemToggle noteCheckListItem"  type="checkbox">
                    <span class="checkmark">
                    </span></label>
                    </div>
                    <div class="mr-auto w-100">
                    <textarea rows="1" class="form-control hm" oid="" style="height: 21px; overflow-y: hidden;">${data}</textarea></div>
                    <div class="pl-1 p2-1"></div>
                    <div class="pl-1 p2-1">
                    </div>
                    <div class="pl-0 mb-0"><label class="mb-0"><span class="taskListenAttachmentFile"><input  id='${ids}' multiple type="file" class="d-none saTypeFilePicherUploadFile"><i class="cs-svg-icon attach-01"></i></span></label></div>
                    <div class="pl-1 p2-1 d-table">
                    <a href="#" oid="" class="taskCheckListItemDeletecreate " style="font-size:13px;"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
                    </div>
                </div>
                
                <div class="flex-column"><div class="progress_bar_new" id='progress_bar_new' style="margin-top: -3px;">
                </div></div>
              </li>`
                ))
                aciqlama.val("")
    
            }
    
        }
    }
    
    }
    
    //ENTER SLASH
    $(document).on('change',"#newAddCheckListVocation",function() {
        var el = $(this)
        fn_22010711064709895352.create_all(el);
    })
    
    // Loader click
    $(document).on('click',"#comp_id_220119163237025810359",function () {
    var elem = $(this);
    var setBack = elem.closest('.redirectClass');
    var fk_owner = setBack.find('#comp_id_22011915551301534994').val();
    fn_22010711064709895352.loader(fk_owner);
    
    })
    
    //add click
    $(document).on('click',"#comp_id_22011001554309238028",function () {
            var el = $(this)
            fn_22010711064709895352.create_all(el);
    })  
    //file upload  click
    $(document).on('load-file',".file-item-checklist-input-operation",function (file) {
            var el = $(this)
            fn_22010711064709895352.updateCheckListAciqlama(el,file);
    })  
     
   /// checklist  end
const  getTimeDifferenceNew = function (from, to) {
     
    var difMs = (from - to);
    var difDays = Math.floor(difMs / 86400000);
    var difHrs = Math.floor((difMs % 86400000) / 3600000);
    var difMins = Math.round(difMs / 60000);
    var txt = difMins;
       return txt
    // } 
}
/// date range picker   
function genTimePickerById(id,drop) {
    $('#' + id).daterangepicker({
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        defaultDate: false,
        ranges: {
            'Bu Gün': [moment(), moment()],
            'Dünən': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Son 7 gün': [moment().subtract(6, 'days'), moment()],
            'Son 30 gün': [moment().subtract(29, 'days'), moment()],
            'Bu Ay': [moment().startOf('month'), moment().endOf('month')],
            'Son Ay': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
    
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small btn-cancel-value-clear',
        separator: ' to ',
        drops:drop,
        locale: {

            applyLabel: 'Axtar',
            cancelLabel: 'ləğv et',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Xüsusi',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
        }
    });
    try {
        startTimeCurrent(id);
    } catch (error) {       
    }
   
}
function getValueRangePicker(elm, lk) {
    try {
        var val = $(elm).val();
        val = val.split('-')
        var dt = val[0].split('/');
        var dt1 = val[1].split('/');
        var stTime = dt[2].trim() + dt[0].trim() + dt[1].trim();
        var endTime = dt1[2].trim() + dt1[0].trim() + dt1[1].trim();

        // var inns = stTime.trim() + '%BN%' + endTime.trim();
        
        if (lk == 1) {
             return stTime;
        }
        else if (lk ==2) {
             return endTime;
        }else{
             return  [stTime,endTime];
        }

    } catch (error) {
        return '';
    }
}

function madeId() {
    var id  = '';
    var d  =  new Date();
         id+= d.getFullYear();
         id+= d.getMonth()+1;
         id+= d.getDate();
         id+= d.getDay();
         id+= d.getHours();
         id+= d.getMinutes();
         id+= d.getSeconds();
         id+= d.getMilliseconds();

    return 'comp_id_'+id;
}

function addSeperateNumber(nStr,rkl){
      if(!nStr){
        nStr  =  0;
      }
    nStr  = parseFloat(nStr).toFixed(rkl?rkl:2);
    nStr = nStr.xss();
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

(function($){
    var defaults = {
        elems           :null, //Element to print HTML
        copy_css        :false,//Copy CSS from original element
        external_css    :null  //New external css file to apply
    };

    var methods = {
        init : function (options) {
            var settings = $.extend({}, defaults, options)
            
            return this.each(function () {
                var elems=$(this);
              //  $(this).click(function(e) {
                        $('.print-iframe').remove();
                    var iframe   = document.createElement('iframe');
                        iframe.classList.add('print-iframe');
                   
                    
                    $(iframe).load(function(){
                        elems.each(function(){
                            iframe.contentWindow.document.body.appendChild(this.cloneNode(true));
                        });
                        if(settings.copy_css) {
                            var arrStyleSheets = document.getElementsByTagName("link");
                            for (var i = 0; i < arrStyleSheets.length; i++){
                                iframe.contentWindow.document.head.appendChild(arrStyleSheets[i].cloneNode(true));
                            }
                            var arrStyle = document.getElementsByTagName("style");
                            for (var i = 0; i < arrStyle.length; i++){    
                                iframe.contentWindow.document.head.appendChild(arrStyle[i].cloneNode(true));
                            }
                        }
                        if(settings.external_css) {
                            var style  = document.createElement("link")
                            style.rel  = 'stylesheet';
                            style.type = 'text/css';
                            style.href = settings.external_css;
                            iframe.contentWindow.document.head.appendChild(style);
                        }
                        var script   = document.createElement('script');
                        script.type  = 'text/javascript';
                        script.text  = 'window.print();';
                        iframe.contentWindow.document.head.appendChild(script);
                        $(iframe).hide();
                    });
                    $(iframe).appendTo('body');
               // });
            });
        },
        destroy : function () {
            //Anything else I should do here?
            return this.each(function () {});
        }
    };

    $.fn.saPrint = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.printIt');
        }    
    };
    }(jQuery));

