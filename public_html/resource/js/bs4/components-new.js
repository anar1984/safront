'use strict';
var cmpList = {
    userBlock: {
        Init: function (elm, type) {
            $(elm).empty();
            $(elm).css("text-align", 'left');
            $(elm).attr("el-name", "selectInterActive");
            $(elm).attr('component-type',"selectInterActive");
            if (type === 'multi') {
                var block = this.genObserverBlockM();
                $(elm).attr("action-type", 'multi');
            } else {
                var block = this.genObserverBlockS();
                $(elm).attr("action-type", 'single');
            }
            $(elm).append(block);
            var select = $(elm).find('select.selectpicker-user-list');
            this.getUserList(select);
            $(elm).on("sachange", function (e, callback) {
                if (callback) {
                    callback();
                }
            })
        
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
                fileUrl(new User().getDefaultUserprofileName());
            return ` <img id='${id}' class="Assigne-card-story-select-img owner" src="${img}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameAt}">
                    `
        },
        genItemBlock: function (id, url, nameAt) {
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
        setUserBlockValue: function (elm, list) {
            var type = $(elm).attr('action-type')
            var block = $(elm).find(".user-avatar-list ul");
            var tit = $(elm).find(".user-dropdonw-btn");
            if (list === '') {
                block.empty();
                tit.html(`<i class="cs-svg-icon user-addons-icon"></i>`);
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
                block.empty();
                tit.empty();
                if (typeof list === 'object') {
                    for (let i = 0; i < list.length; i++) {
                        const o = list[i];
                        if (o) {
                            try {
                                var userImage = SAProjectUser.Users[o].userImage;
                                var userName = SAProjectUser.Users[o].userPersonName;
                                block.append(this.genItemBlock(o, userImage, userName));
                                tit.find(".user-addons-icon").remove();
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
        getUserList: function (select) {

            var elm = select;
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
        genObserverBlockS: function () {
            return `<div class="user-addons-box-elm single-addons dropup" action-type='single'>
                Məsul şəxs:
                <span type="button" class="dropdown-toggle user-dropdonw-btn" onclick='cmpList.userBlock.clickfocusElementSeacrh(this)' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
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
        genObserverBlockM: function () {
            return `<div class="user-addons-box-elm multiple-addons dropup" action-type='multi'>
                    <span class='add-userList-title'>${lang_task.windowAddTask.observer} :</span>
                <span type="button" onclick='cmpList.userBlock.clickfocusElementSeacrh(this)' class="dropdown-toggle user-dropdonw-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="cs-svg-icon user-addons-icon"></i>
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
                var tbid = makeId(10);
                $(elm).attr("data-pag-id", tbid);
                $(elm).attr('component-type',"table-paginiton");
         
                $(elm).parent().after(this.genBlock(rowCount, tbid));
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
              <div class="task-list-pagination" table-id='${tbid}'>
                  <div style="display: none;">
                      <input class="startLimitNew" value="0" type="text">
                      <input class="endLimitNew" value="49" type="text">
                      <select name=""  class="count-row-select-global"></select>
                  </div>
                  <div data-toggle="tooltip" orderno="34" id="21041210270502835999" pid="21041210270502835999" class="tooltipMan component-class d-flex justify-content-end p-0 col-lg-9 col-5" onclick="">
                      <div class="component-input-class" row-no="" pdid="21041210270502835999" id="comp_id_21041210270502835999"></div>
                  </div>
                  <div class="float-right d-flex">
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

    },
    tableShowHideColumn: {
        Init: function (elm) {
            var table = $(elm);
            if (table.prop('tagName') === 'TABLE') {
                var oldId  = $(elm).attr('data-colum-id')
                $(".toggle-block-"+oldId).remove();
                var tableId = makeId(10);
                table.find("thead >tr>th:first-child").html(this.openBlockBtn(tableId));
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
            return `<div onclick='cmpList.tableShowHideColumn.openBlock(this)' table-id='${tableId}' class="showhide-col-btn ">
                       <i class="cs-svg-icon numbers"></i>
                   </div>`

        },
        openBlock: function (elm) {
            var  block  = $(".toggle-block-"+$(elm).attr('table-id'));
                 block.toggle('fast');

                var top = $(elm).offset().top;
                var left = $(elm).offset().left; 
                var w  = $(block).css("height");
                var h  = $(block).css("width");
                block.css({
                      "top": (w>top)?top+w:top,
                      "left":(h>left)?left+h:left,
                      "z-index":"5000000"
                  }) 
              block.draggable({
               "containment":".redirectClass"
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
            onClickItem: function (elm,tbid) {
                var order  = $(elm).attr('order-no')
                var item  = $("[right-click="+tbid+"] tbody .last_click_class td:eq("+order+")");
                item.find('.right-click-btn').click();
            },
            clickItem : function(order,text,tbid,icon) {
                return `<li onclick="cmpList.tableRightClick.onClickItem(this,'${tbid}')" class="dropdown-item" order-no="${order}">
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
            $("[data-toggle-id='"+tableId+"']").closest('.component-container-dashed').addClass("modal-table-large-mod");
            $(".toggle-table-close-"+tableId).removeClass('d-none');
        },
        clickCloseExpandTable: function (elm,tableId) {
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
                var buttonConfrim = $('<button type="button" class="btn cs-nextsave-btn w-50 mr-2">').html(acceptButton).click(function (e) {
                     var res =  data.confirmAction();
                    if(res){
                        data.confirmAction();
                      
                    }
                    that.close(this);
                });
                var buttonCancel = $('<button type="button" class="btn cs-nextsave-btn w-50">').html(cancelButton).click(function (e) {
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
    }
}
/* // fn fnction >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
$.fn.selectInterActive = function (type, val) {
    if (type === 'multi' || type === 'single') {
        cmpList.userBlock.Init(this, type);
    } else if (type === 'setVal') {
        cmpList.userBlock.setUserBlockValue(this, val);
    } else if (type === 'getVal') {
        return cmpList.userBlock.getUserBlockValue(this);
    } else if (type === 'destroy') {
        return $(elm).empty();
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
          var  height  = element.scrollHeight>20?element.scrollHeight:"";
            return jQuery(element)
                .css({
                    "height": "auto",
                    "overflow-y": "hidden"
                })
             
                .height(height);
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
 
/* ///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<component events >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
/*    // userList Block start */
$(document).on('click', '.user-avatar-list li .item-click .removed-user-btn', function (e) {
    e.stopPropagation();

    var elm = $(this).closest("li");
    var ul = $(this).closest("ul");
    var tit = $(this).closest('.user-addons-box-elm').find(".user-dropdonw-btn");
    if (ul.hasClass("user-list-avatar-single")) {
        tit.html(`<i class="cs-svg-icon user-addons-icon"></i>`);
    } else {
        cmpList.userBlock.returnValueSelect(elm);
        tit.find("#" + elm.attr('id')).remove();
        if (tit.find("img").length < 1) {
            tit.html(`<i class="cs-svg-icon user-addons-icon"></i>`);
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
        tit.find(".user-addons-icon").remove();
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
$(document).on("click", '.showhide-col-btn', function (e) {
   e.stopPropagation();
});
$(document).on('hide.bs.dropdown', '.user-addons-box-elm', function (e) {
    return false;
})
$(document).on('click', '.user-addons-box-elm .dropdown-menu', function (e) {
    e.stopPropagation();
})
$(document).on("click", 'body', function () {
    $('.user-addons-box-elm > .dropdown-menu').removeClass('show');
    $('.showhide-col-main-info').hide();
    $(".contextMenu-dropdown-style").hide();
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


/*  // userList Block End */
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
    function goFullSlider() {
      const exitIcon = document.querySelector('.RS-close-full-slider');
      sliderContainer.classList.add('RS-background-blur');
      sliderContainer.style.position = 'absolute';
      exitIcon.classList.remove('RS-hidden-slider');
      document
        .querySelector('.RS-close-full-slider')
        .addEventListener('click', function () {});
    }
    fillImages(imgArray);
    const sliderButtons = document.querySelector('.RS-slider');
    sliderButtons.insertAdjacentHTML(
      'afterend',
      `
    <div class="RS-slider-controls">
    <div class="RS-slider__btn RS-slider__btn--left"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
    viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg></div>
    <div class="RS-slider__btn RS-slider__btn--right"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
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
    slideImg.forEach((e) => e.addEventListener('click', goFullSlider));
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
  };