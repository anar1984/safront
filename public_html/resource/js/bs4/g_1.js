$(function () {
//ishimi gorudum.
     //pish pishname
    // $( ".bottombtn2" ).hover(function() {
    //     console.log('ok')
    //     var that=$('.myaccountName');
    //     setTimeout(function(){ 
    //         that.css('display','block');
    //         that.css('color','#032d6b');
    //      }, 3000);
    //   });

    function connect(div1, div2, color, thickness) {
        var off1 = getOffset(div1);
        var off2 = getOffset(div2);
        // bottom right
        var x1 = off1.left + off1.width;
        var y1 = off1.top + off1.height;
        // top right
        var x2 = off2.left + off2.width;
        var y2 = off2.top;
        // distance
        var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2) - (thickness / 2);
        // angle
        var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
        // make hr
        var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
        //
        alert(htmlLine);
        document.body.innerHTML += htmlLine;
    }

    function getOffset(el) {
        var rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset,
            width: rect.width || el.offsetWidth,
            height: rect.height || el.offsetHeight
        };
    }

    window.testIt = function () {
        var div1 = document.getElementById('toolbar_cont_drag');
        var div2 = document.getElementById('animation-icon')
        connect(div1, div2, "#0F0", 5);

    }



    $(document).on("mouseover", '.sa-cw1', function (e) {
        $(this).popover();

    });
    $(document).on("mouseover", '.sa-cw3', function (e) {
        $(this).popover();

    });
    $(document).on("click", '.api_larged_block', function (e) {
        $('#debugApiBlockLarge').modal();
        var htm = $(this).parents('.sa-rww').html();

        $('#apiGenBlockLarge').empty();
        $('#apiGenBlockLarge').append(htm);

    });
    $(document).on("click", '.data-title-btn', function (e) {
        e.stopPropagation()
        $('.data-block-popUp').css('display', "none");
        $(this).parent().find('.data-block-popUp').toggle();


    });
    $(document).on("click", 'body', function (e) {
        $('.data-block-popUp').css('display', "none");



    });

    /// beaction >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $(document).on('click', '#description_table_id .cs-add-input', function(e) {
        $(this).parents('.cs-sum-inbox').find('ul#sum-sortable li:last-child')
        .after(`<li class="ui-sortable-placeholder cs-addons-sum-name">
        <div class="cs-value-trash-box">
                            <div class="cs-value-trash"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</div>
                        </div>
        <input class="fns-val function-statement-input-common function-statement-input-common-4-sum" type="text" value=""></li>`);
    });
    $(document).on('click', '#description_table_id .cs-value-trash', function(e) {
        

          

          if(confirm("Are you Sure??")){
            var th = $(this).parents("#sum-sortable")
            $(this).parents('li').remove();
           var f= $(th).find('.function-statement-input-common').first();
          
            SAFN.Reconvert.SumStatement(f);
          

        }
    });
    /// beaction end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $(document).on("click", '.change-color-component', function (e) {
   
          var clr  = $(this).attr("data-bgcolorspan");
          var elm  = $(this).parents('.component-container-dashed').find('.component-input-class');
              elm.css("background-color",clr);
         
           
           setComponentStyleUpdate(elm)

        });
    $(document).on("click", '#description_table_body_id', function (e) {
   
        $(this).find(".cs-sum-inbox").parents("td").removeAttr('ondblclick');

        });
    $(document).on("dblclick", '.cs-sum-inbox', function (e) {
   
            e.stopPropagation();
            e.preventDefault();

        });
    $(document).on("click", '.change-font-component', function (e) {
   
          var clr  = $(this).attr("data-bgcolorspan");
          var elm  = $(this).parents('.component-container-dashed').find('.component-input-class');
              elm.css("color", clr);
           var lastVal  = $("#gui_input_css_style").val();
         
           setComponentStyleUpdate(elm)



    });
    $(document).on("click", ".change-font-component", function () {
       $(".change-font-component").removeClass('gactive');
         $(this).addClass('gactive');
         lineColor = $(this).attr('data-bgcolorspan');
   
       })
    $(document).on("click", ".change-color-component", function () {
      $(".change-color-component").removeClass('gactive');
         $(this).addClass('gactive');
   
       })
    $(document).on("click", ".change-align-component", function () {
        $(".change-align-component").removeClass('gactive');
        $(this).addClass('gactive');
   
       })
    $(document).on("click", ".change-fstyle-component", function () {
     
         $(this).toggleClass('gactive');
   
       })
    $(document).on("click", '.change-align-component', function (e) {
   
          var clr  = $(this).attr("data-bgalign");
          var elm  = $(this).parents('.component-container-dashed').find('.component-input-class');
              elm.css("text-align",clr);
              setComponentStyleUpdate(elm)
          



    });
    $(document).on("click", '.change-fstyle-component', function (e) {
   
          var clr  = $(this).attr("data-bgalign");
          var key  = $(this).attr("data-key");
          var elm  = $(this).parents('.component-container-dashed').find('.component-input-class');
              elm.css(key,clr);
              setComponentStyleUpdate(elm);
          



    });
    $(document).on("change", '#heightComponent', function (e) {
   
          var clr  = $(this).val();
          var ind = $("#getStyleVah1d1").val();
          var elm  = $(this).parents('.component-container-dashed');
              elm.css("max-height",clr+ind);
              setContainerStyleUpdate(elm);
          

    });
    $(document).on("change", '#widthComponent', function (e) {
   
          var clr  = $(this).val();
         var ind = $("#getStyleVah1d2").val();
          var elm  = $(this).parents('.component-container-dashed');
              elm.css("max-width",clr+ind);
              setContainerStyleUpdate(elm);

    });
    $(document).on("change", '#gui-cell-selectbox-changed', function (e) {
        var lastCol = $(this).parents(".component-container-dashed")
              $("#us-gui-component-cell-no").val($(this).val());
              
         new UserStory().setGUIComponentCellNo($("#us-gui-component-cell-no"));
    });
    $(document).on("click", '.cellWitdhAdd', function (e) {
    
        var tr  = $(this).attr("data-add");
        var cellNo  = $(this).attr("cell-num");
        var lastCol = $(this).parents(".component-container-dashed")
  if(cellNo>0&&cellNo <= 12){
    if (tr=="true") {
            
        lastCol.removeClass("col-lg-"+cellNo);
        lastCol.addClass("col-lg-"+(parseFloat(cellNo)+1));
        $('.cellWitdhAdd').attr("cell-num",(parseFloat(cellNo)+1))
        $("#us-gui-component-cell-no").val((parseFloat(cellNo)+1))
    }else{
        lastCol.removeClass("col-lg-"+cellNo);
        
        lastCol.addClass("col-lg-"+(parseFloat(cellNo)-1));
        $('.cellWitdhAdd').attr("cell-num",(parseFloat(cellNo)-1));
        $("#us-gui-component-cell-no").val((parseFloat(cellNo)-1))
    }


  }
       
    });
    $(document).on("change", '#storyCardListSelectBox', function (e) {
        var id = $('option:selected', this).attr('value')
        new UserStory().getStoryInfo(id, this);
        $('.component-class').arrangeable({dragSelector: '.drag-areas-comp'});
        $('.component-class').resizableGrid();


    });
    $(document).on("click", '.tab-dash-trig', function (e) {
        var data = $(this).attr('data-link')
     
          Utility.addParamToUrl('current_tab_dash',data)
      
            $("#statistics-projectlist").change();
        
        

    });
    $(document).on("change", '#statistics-projectlist', function (e) {
        var current_tab = Utility.getParamFromUrl('current_tab_dash')
        var id = $('option:selected', this).attr('value');
        var  Lst = $(this).val();

        getProjectUsersForID(id)
          
        for (let index = 0; index < Lst.length; index++) {
          loadDetailsOnProjectSelect4Dashboard(Lst[index]);
            
        }
        

        if(current_tab==='backlog'){
            $("#database-table-list-div").hide();
            $("#statistics-projectlist").parent().show();
            $(".dashboard-title-log").text("Backlog History")
      
        }
        else if(current_tab==='stat'){
            $("#database-table-list-div").hide();
            $("#statistics-projectlist").parent().show();
            Statistics.Dashboard.InitByCombo(this);
            $(".dashboard-title-log").text("Statistics ")
        }
        else if(current_tab==='css'){
            $("#database-table-list-div").hide();
            $("#statistics-projectlist").parent().show();
            loadHistoryByCssId(id)
            $(".dashboard-title-log").text("CSS History")
        }
        else if(current_tab==='js'){
            $("#database-table-list-div").hide();
            $("#statistics-projectlist").parent().show();
            loadHistoryByJsId(id);
            $(".dashboard-title-log").text("JS History")
        }
        else if(current_tab==='tasks'){
            $("#database-table-list-div").hide();
            $("#statistics-projectlist").parent().show();
            $(".dashboard-title-log").text("Tasks History");
            loadHistoryByTasksId()
        }
        else if(current_tab==='sql'){
            $("#database-table-list-div").show();
            $("#statistics-projectlist").parent().hide();
           
            $("#database-table-list").change();
            $(".dashboard-title-log").text("SQL History")
            
        }
        else if(current_tab==='db'){
            $("#database-table-list-div").show();
            $("#statistics-projectlist").parent().hide();
           
            $("#database-table-list").change();
            $(".dashboard-title-log").text("DB History")
               
        }
        else if(current_tab==='backlogst'){
            $("#database-table-list-div").hide();
            $("#statistics-projectlist").parent().show();
            $(".dashboard-title-log").text("Backlog Statistics History")
                      
        }
        
        

    });
    $(document).on("change", '#statistics-BacklogList', function (e) {
        var id = $('option:selected', this).attr('value')
      

        var current_tab = Utility.getParamFromUrl('current_tab_dash');

        if(current_tab==='backlog'){
         
        loadHistoryByBacklofId(id)  
            
        }
                
        else if(current_tab==='tasks'){
         loadHistoryByTasksId(id);
        }
        
        

    });
    $(document).on("change", '#statistics-BacklogList-backlogst', function (e) {
        var id = $('option:selected', this).attr('value')
      

        var current_tab = Utility.getParamFromUrl('current_tab_dash');

        if(current_tab==='backlogst'){
            loadHistoryByBacklogStId(id)
            
        }
                
        else if(current_tab==='tasks'){
         loadHistoryByTasksId(id);
        }
        
        

    });
    $(document).on("change", '#database-tm-list', function (e) {
         
    
        getDbTablesList4CodeDash(this)

    });
    $(document).on("change", '#database-table-list', function (e) {
        var current_tab = Utility.getParamFromUrl('current_tab_dash')
       

        if(current_tab==='db'){
            loadHistoryByDBId($(this).val())
        }
        else if(current_tab==='sql'){
            loadHistoryBysqlId($(this).val())
        }
        
       

      
       

    });
    $(document).on("change", '#statistics-BacklogList-task', function (e) {
        var id = $('option:selected', this).attr('value')
      

        var current_tab = Utility.getParamFromUrl('current_tab_dash');

        if(current_tab==='backlog'){
         
        loadHistoryByBacklofId(id);
            
        }else if(current_tab==='tasks'){
         loadHistoryByTasksId(id);
        }
        
        

    });
    $(document).on("change", '#search-task-history-id', function (e) {
       
        $("#statistics-BacklogList-task").change();

    });
    $(document).on("change", '#datebet-task-history-id', function (e) {
       
        $("#statistics-BacklogList-task").change();

    });
    $(document).on("change", '#statistics-createdby-task', function (e) {
       
        $("#statistics-BacklogList-task").change();

    });
    $(document).on("click", '.div-content-body-td .load-more-button', function (e) {
       var th = $(this);
     
        var attr = th.attr("data-more");

        if(attr == "true"){
            th.text("show less");
            th.attr("data-more",'false');
            th.parents(".div-content-body-td").css('max-height',"max-content")
            

        }else{
            th.text("load more");
            th.attr("data-more",'true');
            th.parents('.div-content-body-td').css('max-height',"105px")
        }
      
      
        
          
    });
    $(document).on("click", '#table-show-hide-button-id-close', function (e) {
       var th = $(this);

            th.parents('.table-show-hide-row-div').hide("fast")          
    });
    $(document).on("click", '#group-data-table-btm', function (e) {
        var tableId = $(this).attr('tbid');
         
          if($(this).hasClass('active')){
              
            $('#'+tableId).find(".groupTrElement").remove();
            $(this).removeClass('active');
           
          }else{
            $('.table-gorup-by-th').removeClass("active");
            $(this).addClass('active');
            getGroupList4Table(this)
          }
    });
   
    $(document).on("click", '#table-show-hide-button-id-a', function (e) {
       var th = $(this);
            th.parents(".component-container-dashed").find(".table-show-hide-row-div").toggle("fast")
      
    });
    $(document).on("click", '#filter-show-hide-button-id-a', function (e) {
       var th = $(this);

           if(th.hasClass('active')){
               th.removeClass("active");
               th.parents(".component-container-dashed").find(".filter-table-row-header-tr").hide()
       
           }else{
            th.addClass("active");
            th.parents(".component-container-dashed").find(".filter-table-row-header-tr").show()
           }
      
    });
    
    $(document).on("click", '#user-story-delete-story', function (e) {
        if ($(this).is(":checked")) {
            $("#user-story-delete-story").prop("readonly", true);
        } else {
            $("#user-story-delete-story").prop("readonly", false);
        }
    });
    $(document).on("click", '.matrix_block_open', function (e) {
        $(".proto_type_block").toggle("fast");
        $(".main_page_matrix").toggle("fast");
    });

    $(document).on("click", '.live-prototype-switch', function (e) {
        $("#live-prototype-show-key").toggle(600);
    });
    $(document).on("dblclick", '.bug-tr .bug-list-column-task-name', function (e) {
         console.log('fdddddddddddd');
        var val = $(this).find("a").text();
          $(this).find(".task-name-issue").show().val(val);

    });
    $(document).on("change", '.bug-tr .task-name-issue', function (e) {
        var val = $(this).val();
        var taskID = $(this).parents(".bug-tr").attr("id")
        updateTask4ShortChangePure(val, "taskName", taskID);

        $(this).hide();

    });
    $(document).on("click", '#bug-taskName-dropdown', function (e) {
       $(".bug-tr").removeClass('active')
      $(this).parents(".bug-tr").addClass('active');
      var bugId = $(this).parents(".bug-tr").attr("id");
      var prId = $(this).parents(".bug-tr").attr("projectid");
      global_var.current_issue_id = bugId;
      Utility.addParamToUrl('current_issue_id', global_var.current_issue_id);
      getProjectUsersById(prId)
      
    });



    $(document).on('click', '.all-table-row-checked', function (event) {
        
        var li = $(this).parents('.table-show-hide-row-div').find(".table-row-show-hide-ul").find("li");
        var tbId=$(this).parents('.table-show-hide-row-div').attr('data-tableId');
        var ch =$(this);

        for (let index = 0; index < li.length; index++) {
            var lich = $(li[index]).find("label input")
            if(ch.prop("checked")){
              

                if(lich.prop("checked")){
                   
                }else{
                  lich.click();
                }
            }else{
              
                  lich.click();
                
            }
    
            
        }
            
    
    });
    $(document).on('change', '.component-class-show-hide input', function (event) {
        
            var tbId=$(this).parents('.table-show-hide-row-div').attr('data-tableId');
            var id = $(this).attr("data-check");
            var ch =$(this);

            if(!ch.prop("checked")){
                $("#"+tbId).find('[pdid='+id+']').hide();
                var st =   $("#"+tbId+" thead").find('[pid='+id+']').parents("th")
                       st.hide();
                       var dex = st.index();
                       st.parents("thead").find(".filter-table-row-header-tr").find("th:eq("+dex+")").hide();
              
                
            }else{
                $("#"+tbId).find('[pdid='+id+']').show();
                var st =   $("#"+tbId+" thead").find('[pid='+id+']').parents("th")
                       st.show();
                       var dex = st.index();
                       st.parents("thead").find(".filter-table-row-header-tr").find("th:eq("+dex+")").show();
            }

            tableShowHideRowSetItem(tbId);
           
    });
    $(document).on('click', '#show-table-row-btn', function (event) {
        
        var li =$(this).parents('.table-show-hide-row-div').find(".table-row-show-hide-ul").find("li");
            var tbId=$(this).parents('.table-show-hide-row-div').attr('data-tableId');


            for (let index = 0; index < li.length; index++) {
                var id = $(li[index]).find("label").attr("id")
                $("#"+tbId).find('[pdid='+id+']').show();
                $("#"+tbId+" thead").find('[pid='+id+']').parents("th").show();
                
            }
      
    });
    $(document).on('click', '#hide-table-row-btn', function (event) {
        
   
            var tbId=$(this).parents('.table-show-hide-row-div').attr('data-tableId');

              tableShowHideRowGetItem(tbId);
         //   $(".filter-table-row-select").selectpicker()
    });
    $(document).on('click', '.all-check-button-allTable', function (event) {
        
       var  id = $(this).parent().attr("id");

       if($(this).prop("checked")){
        
           $(this).parents("table").find("tbody tr").find("#comp_id_"+id).prop("checked",true);
           $(this).parents("table").find("tbody tr").find("#comp_id_"+id).change();
       }else{
           $(this).parents("table").find("tbody tr").find("#comp_id_"+id).prop("checked",false);
           $(this).parents("table").find("tbody tr").find("#comp_id_"+id).change();
       }
         
    });
    $(document).on('click', '.component-input-class[type="checkbox"]', function (event) {
        
       var  id = $(this).attr("pdid");
       var ls  = $(this).parents("tbody").find("tr #comp_id_"+id);
       var dt = 0
           for (let i = 0; i < ls.length; i++) {
                
            if($(ls[i]).prop("checked")){
                dt++
            }              
               
           }
          
           if(ls.length > dt){
               $(this).parents("table").find(".all-check-button-allTable").prop("checked",false)
           }else if(ls.length === dt){
            $(this).parents("table").find(".all-check-button-allTable").prop("checked",true)
           }
         
    });
   
$(document).on("change", '.prmanage-filter', function (e) {
    bug_filter.page_no = 1;
    getProjectManagementList()
})

$(document).on("click", '.projectManagmentPaginition .page-item-core-previous', function (e) {
    bug_filter.page_no = parseInt(bug_filter.page_no) - 1;
    getProjectManagementList()
})

$(document).on("click", '.projectManagmentPaginition .page-item-core-next', function (e) {
    bug_filter.page_no = parseInt(bug_filter.page_no) + 1;
    getProjectManagementList()
})

$(document).on("click", '.projectManagmentPaginition .page-item-core', function (e) {
    bug_filter.page_no = $(this).attr("page-no");
    getProjectManagementList()
})
    $(document).on('click', '.closePopupIn', function (event) {
        $(this).parent().hide('fast')
    });


    $(document).on("change", ".input-on-off input", function (e) {
        $(".table-hide-show").toggle(500);
    });

    $(document).on("change", ".history_show-hide input", function (e) {
        $(".change_history_hide").toggle(500);

    });

    //   delete user story
    $(document).on("change", ".delete-show-hide", function (e) {
        $('.delete-show-hide a').toggleClass('colorchange');


    });
    //user name editable

    $(document).click(function () {
        $('.myText').html("Hello World");
    });

    $(".myText").click(function (event) {
        $('.myText').html("<input type='text' id='test' value='Hello World'/>");
        $('#test').focus();
        event.stopPropagation();
    });



    // label button 
    $(document).on('click', '.dropdown-menu .drop-label-menu', function (e) {
        e.stopPropagation();
    });
    // filter button
    $(document).on('click', '.dropdown-menu .drop-filter-menu', function (e) {
        e.stopPropagation();
    });


    //placheholder change
    $('.btn-placeholder').focus(function () {
        $(this).attr('placeholder', 'Please write!')
    }).blur(function () {
        $(this).attr('placeholder', '+ Add User Story')
    })

    $('.btn-placeholder2').focus(function () {
        $(this).attr('placeholder', 'Search..')
    }).blur(function () {
        $(this).attr('placeholder', 'Search..')
    })

    //add user list enter add
    $('.us-checkbox-list.form-control.add-btn.btn-placeholder').on('keyup', function (event) {
        if (event.keyCode === 13) {
            $(this).val('');
            event.preventDefault();
        }
    })
    //add user list focusout add
    $('.us-checkbox-list.form-control.add-btn.btn-placeholder').focusout(function () {
        $(this).val('');
    })


    $('.add-btn2').on('click focusin', function () {
        $('.search-clear').css('display', 'block');
        $('.add-btn2').css('background-image', 'none');
    });

    $('#add-bkl-line').focusout(function () {
        setTimeout(function () {
            $('#add-bkl-line').css("background-image", "url(https://img.icons8.com/pastel-glyph/2x/search--v2.png)");
            $('.search-clear').css('display', 'none');
        }, 200);
    })









    $('.input-name').focus(function () {
        $(this).attr('placeholder', '')
    }).blur(function () {
        $(this).attr('placeholder', 'Please Enter Input Name!')
    })


    // search api list
    $(document).on('keypress', "#search-api_list", function () {
        searchFilterTable(this, 'api_list_side_bar');
    })


})
//  document ready close 


var dY = 0;
var dX = 0;

function dragResize() {
    return;
/*     try {
        $(".draggable").draggable({
            t: 0,
            l: 0,
            scroll: false,
            start: function () {
                var id = $(this).attr('id');
                new UserStory().setInputByGUIComponent(id);
                t = $(this).position().top;
                l = $(this).position().left;
            },
            drag: function () {
                //                var top1 = $(this).position().top
                //                var left1 = $(this).position().left;
                //
                //
                //                $('#gui_prop_cn_positiontop').val(top1 - t);
                //                $('#gui_prop_cn_positionleft').val(left1 - l);

            },
            stop: function () {
                var top1 = $(this).position().top;
                var left1 = $(this).position().left;
                var dT = top1 - t;
                var dL = left1 - l;

                var prevT = $('#gui_prop_cn_positiontop').val();
                var prevL = $('#gui_prop_cn_positionleft').val();

                var currT = (prevT) ? parseFloat(prevT) + dT : dT;
                var currL = (prevL) ? parseFloat(prevL) + dL : dL;

                $('#gui_prop_cn_positiontop').val(currT);
                $('#gui_prop_cn_positionleft').val(currL);

                new UserStory().setGUIContainerStyle();
            },
        })

        $(".resize1").resizable();

    } catch (e) {} */
}


// drag div-lerde olar modal functon
function myFn(id) {
    var popup = document.getElementById('myPopup' + id);
    if (popup.style.visibility === "visible") {
        popup.style.visibility = "hidden";
    } else {
        popup.style.visibility = "visible"
    }

    $('.popuptext').not('#gui_prop_in_backgroundcolor').click(false);

}



function makeClassActive(id) {
    return;
    //    if ($('#checkbox_' + id).is(':checked')) {
    //
    //        $('#' + id).css('border', '1px dashed blue');
    //
    //    } else {
    //        $('#' + id).css('border', 'none');
    //    }
}


function addEnter(id) {
    $("#enter" + id).keyup(function (event) {
        if (event.keyCode === 13) {
            new UserStory().updateInputDescriptionEditLineNew(this, id);
        }
    });
}

function toggleRelativeMode(el) {
    $('div.tooltipMan').each(function () {


    })
}

// <!-- 10.08.2020  gulbahar  -->

//  animation button
$(document).on("click", ".home_icon_menu-open-button,.home_icon_menu-item", function () {

    var t = $(this).parent().children(".home_icon_menu-open-button").data('t');
    if (t !== undefined)
        clearTimeout(t);
    $(this).parent().children(".home_icon_menu-item").addClass('active');
    $(this).parent().children(".home_icon_menu-open-button").addClass('active');
})

$(document).on("click", '.home_icon_menu-open-button', function () {
    var thisEle = $(this);
    var t = setTimeout(function () {
        thisEle.parent().children(".home_icon_menu-item").removeClass('active');
        thisEle.parent().children(".home_icon_menu-open-button").removeClass('active');
    }, 200);

    $(this).parent().children(".home_icon_menu-open-button").data('t', t);


});

//   15.08.2020
$(document).on("click", function (e) {
    if (!e.target.classList.contains('main-btn-plus')) {
        $(".home_icon_menu-item").removeClass("active");
    }
});



// Zoom-in ,Zoom-out, Zoom-default

//var zoom = 1;
//$(document).on("click", ".zoom", function () {
//    zoom += 0.1;
//    $('.target').css('zoom', zoom);
//})
//
//$(document).on("click", ".zoom-init", function () {
//    zoom = 1;
//    $('.target').css('zoom', zoom);
//})
//
//$(document).on("click", ".zoom-out", function () {
//    zoom -= 0.1;
//    $('.target').css('zoom', zoom);
//})


// main-tool-panel-proparties

// 1.tool panel-general
var ch = 0,
    ch2 = 0,
    ch3 = 0,
    ch4 = 0,
    ch5 = 0,
    ch6 = 0;
$(document).on("click", "#general-btn-icon", function () {

    $('#ipo-tab-setting-general').addClass('active');
    ch++;
    ch2 = 0;
    ch3 = 0;
    ch4 = 0;
    ch5 = 0;
    ch6 = 0;
    $('#gui-desigin-component-view-main-div-id').css('display', 'block');
    $('#guid-desigin-main-div-id').removeClass('col-12');
    $('#guid-desigin-main-div-id').addClass('col-9');
    $('.home_icon_menu-item').css('right', '27%')
    $('.home_icon_menu-open-button').css('right', '27%')

    if (ch == 2) {
        ch = 0;
        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-properties').removeClass('active');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-9');
        $('#guid-desigin-main-div-id').addClass('col-12');
        $('.home_icon_menu-item').css('right', '7%');
        $('.home_icon_menu-open-button').css('right', '7%');
    }


})
//  2.tool panel-component
$(document).on("click", "#component-btn-icon", function () {

    $('#ipo-tab-setting-properties').addClass('active');
    ch2++;
    ch = 0;
    ch3 = 0;
    ch4 = 0;
    ch5 = 0;
    ch6 = 0;
    $('#gui-desigin-component-view-main-div-id').css('display', 'block');
    $('#guid-desigin-main-div-id').removeClass('col-12');
    $('#guid-desigin-main-div-id').addClass('col-9');
    $('.home_icon_menu-item').css('right', '27%')
    $('.home_icon_menu-open-button').css('right', '27%')
    if (ch2 == 2) {
        ch2 = 0;
        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-properties').removeClass('active');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-9');
        $('#guid-desigin-main-div-id').addClass('col-12');
        $('.home_icon_menu-item').css('right', '7%');
        $('.home_icon_menu-open-button').css('right', '7%');

    }

})
$(document).on("click", "#apis-list-btn-icon", function () {

    $('#ipo-tab-setting-apis_list').addClass('active');
    ch2++;
    ch = 0;
    ch3 = 0;
    ch4 = 0;
    ch5 = 0;
    ch6 = 0;
    $('#gui-desigin-component-view-main-div-id').css('display', 'block');
    $('#guid-desigin-main-div-id').removeClass('col-12');
    $('#guid-desigin-main-div-id').addClass('col-9');
    $('.home_icon_menu-item').css('right', '27%')
    $('.home_icon_menu-open-button').css('right', '27%')
    if (ch2 == 2) {
        ch2 = 0;
        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-properties').removeClass('active');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-9');
        $('#guid-desigin-main-div-id').addClass('col-12');
        $('.home_icon_menu-item').css('right', '7%');
        $('.home_icon_menu-open-button').css('right', '7%');

    }

})

//  3. tool panel-container
$(document).on("click", "#container-btn-icon", function () {
    $('#ipo-tab-setting-container').addClass('active');
    ch3++;
    ch = 0;
    ch2 = 0;
    ch4 = 0;
    ch5 = 0;
    ch6 = 0;
    $('#gui-desigin-component-view-main-div-id').css('display', 'block');
    $('#guid-desigin-main-div-id').removeClass('col-12');
    $('#guid-desigin-main-div-id').addClass('col-9');
    $('.home_icon_menu-item').css('right', '27%');
    $('.home_icon_menu-open-button').css('right', '27%');
    if (ch3 == 2) {
        ch3 = 0;
        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-container').removeClass('active');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-9');
        $('#guid-desigin-main-div-id').addClass('col-12');
        $('.home_icon_menu-item').css('right', '7%');
        $('.home_icon_menu-open-button').css('right', '7%');
    }


})

//  4. tool panel-canvas
$(document).on("click", "#canvas-btn-icon", function () {
    $('#ipo-tab-setting-canvas').addClass('active');
    ch4++;
    ch = 0;
    ch2 = 0;
    ch3 = 0;
    ch5 = 0;
    ch6 = 0;
    $('#gui-desigin-component-view-main-div-id').css('display', 'block');
    $('#guid-desigin-main-div-id').removeClass('col-12');
    $('#guid-desigin-main-div-id').addClass('col-9');
    $('.home_icon_menu-item').css('right', '27%')
    $('.home_icon_menu-open-button').css('right', '27%')
    if (ch4 == 2) {
        ch4 = 0;

        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-canvas').removeClass('active');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-9');
        $('#guid-desigin-main-div-id').addClass('col-12');
        $('.home_icon_menu-item').css('right', '7%')
        $('.home_icon_menu-open-button').css('right', '7%')
    }

})
//  5. tool panel-input-add
//11.12.2020 Revan
$(document).on("click", "#input-btn-icon", function () {
    $('#inp_popUp').toggle('fast');
    $('#inp_popUp').draggable({
        containment: "parent"
    });
})
$(document).on("click", ".line_icon_line_list", function () {
    $('#inp_popUp_line_list').toggle('fast');
    $('#inp_popUp_line_list').draggable({
        containment: "parent"
    });
    showGuiInputList4DebugView();
})

$(document).on("click", ".line_icon_mvp_create", function () {
    createMvp();
})

$(document).on("click", ".live-prototype-show-line-list", function () {
    $('#leader-line-list-popUp').toggle('fast');
    $('#leader-line-list-popUp').draggable({
        containment: "parent"
    });
})
$(document).on("click", "#History-btn-icon", function () {
    $('#history_inp_popUp').toggle('fast');
    $('#history_inp_popUp').draggable({
        containment: "parent"
    });
    setBacklogHistory4View();
})
$(document).on("click", ".inp_popUp_story_card_list_cl", function () {
    $('#inp_popUp_story_card_list').toggle('fast');
    $('#inp_popUp_story_card_list').draggable({
        containment: "parent"
    });

})
$(document).on("dblclick", ".component-container-dashed", function () {
    $('#edit_component_inp_popUp').toggle('fast');
    $('#edit_component_inp_popUp').draggable({
        containment: "parent"
    });

})
$(document).on("change", "#userStory-taskList-us", function () {
    var id = $(this).parents(".bug-tr").attr('id')
    updateTask4ShortChangePure($(this).val(), "fkBacklogId",id);
})
$(document).on("focusout", "#userStory-taskList-us", function () {
  
  $(this).hide();
})
$(document).on("click", ".component-container-button", function () {
  $(this).parents(".component-container-dashed").dblclick();

})

var popUpt = `<div   class="popup-Elements" data-toggle="modal" data-target="#exampleModal" id="popup-btn" >
  <span class="editBtnLVSect deleteBTn" title="Delete Input"><i class="fas fa-trash-alt"></i></span>

  </div>`


$(document).on("mouseenter", ".draggable", function () {


    /* $(".popup-Elements").remove();

    $("[data-edit='dataText']").removeAttr("data-edit");
    $(this).attr("data-edit", "dataText");
    $(this).append(popUpt)
 */


})


$(document).on("dblclick", " img", function () {
    $("#full-image").attr("src", $(this).attr("src"));
    $('#image-viewer').show();
});

$(document).on("click", "#image-viewer .close", function () {
    $('#image-viewer').hide();
});
$(document).on("click", ".viewbtnIpo", function () {

    if (window.opener) {
        window.opener.location.href = 'viewer.html';
    } else {
        window.open('viewer.html', 'Test');
    }

    window.close();
});


//Revan

//  6. tool panel-animation
$(document).on("click", "#animation-icon", function () {
    $('#ipo-tab-setting-animation').addClass('active');
    ch6++;
    ch = 0;
    ch2 = 0;
    ch3 = 0;
    ch4 = 0;
    ch5 = 0;
    $('#gui-desigin-component-view-main-div-id').css('display', 'block');
    $('.home_icon_menu-item').css('right', '27%');
    $('.home_icon_menu-open-button').css('right', '27%');
    $('#guid-desigin-main-div-id').removeClass('col-12');
    $('#guid-desigin-main-div-id').addClass('col-9');
    if (ch6 == 2) {
        ch6 = 0;

        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-inputAdd').removeClass('active');
        $('.home_icon_menu-item').css('right', '7%');
        $('.home_icon_menu-open-button').css('right', '7%');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-9');
        $('#guid-desigin-main-div-id').addClass('col-12');
    }

})
//  7. tool panel-input-add

$(document).on("click", "#currentAll-btn-icon", function () {
    $('.current').toggle();
    $('.all').toggle();
})

// draggable checkbok
$(document).on("click", ".dragCheckbox", function () {
    $('.togglemark1').toggle();
    $('.togglemark2').toggle();

})




//  dragTable function
function dragTable() {
    $('.defaultTable').dragtable();
    $('#localStorageTable').dragtable({
        persistState: function (table) {

            if (!window.sessionStorage)
                return;
            var ss = window.sessionStorage;
            table.el.find('th').each(function (i) {
                if (this.id != '') {
                    table.sortOrder[this.id] = i;
                }
            });
            ss.setItem('tableorder', JSON.stringify(table.sortOrder));
        },
        restoreState: eval('(' + window.sessionStorage.getItem('tableorder') + ')')
    });

};
// 15.08.2020
function stopMouseAction(el) {
    console.log($(el).html())
    //    alert('ok')
}



// save as PDF 
// save as PDF 
function savePdf() {
    // Get the element.
    var element = document.getElementsByClassName('pdf')[0];
    // Generate the PDF.
    html2pdf().from(element).set({

        filename: 'Sourced Agile.pdf',
        html2canvas: {
            scale: 5
        },
        jsPDF: {
            orientation: 'portrait',
            unit: 'in',
            format: 'letter',
            compressPDF: true
        }
    }).save();
    $('.pdfHide').css('visibility', 'hidden');
    // 21.08.2020 start
    $('#storyCardRightMenu').css('display', 'none')
    $('#exportContent').removeClass('col-9');
    $('#exportContent').removeClass('col-md-9');
    $('#exportContent').removeClass('col-sm-11');
    // 21.08.2020  end


}
$(document).on("click", "#pdf", function () {
    $('.pdfHide').css('visibility', 'visible');
    // 21.08.2020 start
    $('#storyCardRightMenu').css('display', 'block')
    $('#exportContent').addClass('col-9');
    $('#exportContent').addClass('col-md-9');
    $('#exportContent').addClass('col-sm-11');
    // 21.08.2020 end

})


//  myaccount section
$(document).ready(function () {
    $(".bottombtn2").mouseover(function () {
        $(".myaccountName").css("display", "block");
    });
    $(".first-side").mouseover(function () {
        $(".myaccountName").css("display", "block");
    });
    $(".bottombtn2").mouseout(function () {
        $(".myaccountName").css("display", "none");
    });
});

$(document).on("click", ".openNavshow", function () {
    $('#panelFirst1').css('display', 'none')
    $('#panelSplit1').css('display', 'none')
});

$(document).on("click", ".openNavhide", function () {
    $("html").removeClass("openNav");
    $(".nav-toggle").removeClass("active");
    $('#panelFirst1').css('display', 'none')
    $('#panelSplit1').css('display', 'none')

})



$(document).keydown(function (event) {
    if (event.which == "17")
        cntrlIsPressed = true;
});


$(document).keyup(function () {
    cntrlIsPressed = false;
});

var cntrlIsPressed = false;


var idggdd = 4868347683787384609;

$(document).on("click", ".cf li .inptadd", function () {


    if (cntrlIsPressed === false) {
        idggdd++
        let valin = $(this).parent().attr('value');
        let nm = $(this).parent().attr('title');
      
        var comp = new ComponentInfo();

        comp.id = idggdd ;
        comp.inputType ="IN";
        comp.cellNo = "6";
        comp.componentType = valin;
        comp.label = nm ;
        comp.description = "";

        var st = Component.GetComponentHtmlNew(comp);
        var ldoa = `<div class="box-loader shimmer"></div>`
       
        $("#SUS_IPO_GUI_Design .empty-message-block").remove();
          $("#SUS_IPO_GUI_Design").append(st);
          $("#"+idggdd).append(ldoa);
        insertNewInputTotalDblClick(valin, nm, "6",idggdd);
     

    } else {
        let valin = $(this).parent().attr('value');



        addInputAsInput();


        setTimeout(function () {
            $('#addNewComponentModal').find('#exampleModal-new-input-name').focus();

        }, 700);
        $('#addNewComponentModal').find('#exampleModal-new-component-type').val(valin);
    }
    $('.component-class').arrangeable({dragSelector: '.drag-areas-comp'});

})





$(document).on('keypress', '#exampleModal-new-input-name', function (event) {

    if (event.keyCode == 13) {

        createNewInputComponent(this);


    }

});




$(document).on('click', '#element-edit-button-hover', function (event) {
    var pid = $(this).parents(".component-class").attr("id")
    var dt = $(this).parents(".component-class").find(".comp-title-span");
    var txt = dt.text();
    var input = $("<input>").addClass("edit-class-input-component").attr("id", "edit-name-input-component").val(txt).attr("pid", pid)
    dt.html(input);

    dt.find("input").focus();


});
$(document).on('change', '.us-mngm-is-api', function (e) {
  
    labelOrSplitValuesUs();

});
$(document).on('dblclick', '.comp-title-span', function (e) {
    e.stopPropagation();
    var pid = $(this).parents(".component-class").attr("id")
    var dt = $(this);
    var txt = dt.text();
    var input = $("<input>").addClass("edit-class-input-component").attr("id", "edit-name-input-component").val(txt).attr("pid", pid)
    dt.html(input);
    dt.find("input").focus();

});
$(document).on('change', '#edit-name-input-component', function (event) {
    $(this).hide();
    var dt = $(this).val();
    $(this).parent().html(dt);
   
    new UserStory().updateInputByAttr(this, 'name');

});

$(document).on('click', '.more-us-card-btn', function (event) {
       
    var stLimit = $(this).attr('startlimit')
    var endlimit = $(this).attr('endlimit')
    var st = parseFloat(stLimit);
    var end = parseFloat(endlimit);
    var bsts = $(this).attr('data-ople');

    new UserStory().setUSLists4KanbanViewByStatus(st,end,bsts);

});
$(document).on('click', '.add-task-us-card-managmenet', function (event) {
       var bgid = $(this).parents('.task-content').attr("bid")
    var prId = $("#story_mn_filter_project_id").val();
    $("#bug_filter_project_id_add").val(prId).change();
    $("#bug_filter_backlog_id_add").val(bgid).change();
    var dwlmt = $('#bug_task_type_id_add')
    add_loadTaskType_bug_list(dwlmt);


    $("#issue-managment-add-task").modal("show");

});
$(document).on('click', '.hide-more-table', function (event) {
       
        
         var tbody  = $(this).parents('.stat-table-us').find("tbody")
        tbody.empty()
    

    $(this).html('<i class="fas fa-angle-double-right"></i>')
    $(this).addClass('more-table-details')
    $(this).removeClass('hide-more-table')
    

});
var time_in_minutes = 5;
var current_time = Date.parse(new Date());
var deadline = new Date(current_time + time_in_minutes*60*1000);

$(document).on('click', '.next-large-modal-btn', function (event) {
       var st = $(this).attr('data-status')
          
     
        new UserStory().setUSLists4KanbanViewCoreUsLArge(st);
    $("#task-ongoing-large-modal").modal('show');
      $("#countDown-larg").attr('data-status-time',st)
      current_time = Date.parse(new Date());
      deadline= new Date(current_time + time_in_minutes*60*1000)
    run_clock('countDown-larg',deadline);

});
$(document).on('click', '.baclog-large-modal-next', function (event) {
    $("#body-large-modal-in-us4backlog").html("");

     var elm1 = $(this).parents('.task-content');
     var elm =elm1.clone();
     elm.css("width",'100%')
     elm.find('.baclog-large-modal-next').hide();
    
    $("#task-ongoing-large-modal4backlog").modal('show');
     $("#body-large-modal-in-us4backlog").append(elm);
     $('[data-toggle="popover"]').popover();

});
$(document).on('click', '.refresh-interval-butn', function (event) {
   
                clearInterval(timeinterval);
            var st = $('#countDown-larg').attr('data-status-time');
        
            new UserStory().setUSLists4KanbanViewCoreUsLArge(st);
           
                current_time = Date.parse(new Date());
             deadline= new Date(current_time + time_in_minutes*60*1000)
             run_clock('countDown-larg',new Date(current_time + time_in_minutes*60*1000))
  
});
$(document).on('click', '.pause-interval-butn', function (event) {
       
    if($(this).hasClass("start")){
        pause_clock();
        $(this).removeClass("start");
        $(this).html('<i class="far fa-play-circle"></i>');

    }else{
        resume_clock()
        $(this).addClass("start");
        $(this).html('<i class="far fa-pause-circle"></i>');
    }

});




function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

var timeinterval;
function run_clock(id,endtime){
	var clock = document.getElementById(id);
	function update_clock(){
		var t = time_remaining(endtime);
		clock.innerHTML = t.minutes+':'+t.seconds;
		if(t.total<=0){ 
            clearInterval(timeinterval);
            var st = $('#countDown-larg').attr('data-status-time');
        
            new UserStory().setUSLists4KanbanViewCoreUsLArge(st);
           
                current_time = Date.parse(new Date());
             deadline= new Date(current_time + time_in_minutes*60*1000)
             run_clock(id,deadline);
        }
	}
	update_clock(); // run function once at first to avoid delay
	timeinterval = setInterval(update_clock,1000);
}



var paused = false; // is the clock paused?
var time_left; // time left on the clock when paused

function pause_clock(){
	if(!paused){
		paused = true;
		clearInterval(timeinterval); // stop the clock
		time_left = time_remaining(deadline).total; // preserve remaining time
	}
}

function resume_clock(){
	if(paused){
		paused = false;

		// update the deadline to preserve the amount of time remaining
		deadline = new Date(Date.parse(new Date()) + time_left);

		// start the clock
		run_clock('countDown-larg',deadline);
	}
}



  
$(document).on('click', '.trigger-modal-us-header .status-large-menu-total', function (event) {
       
        
    $(this).toggleClass('gactive');


    clearInterval(timeinterval);
    var st = $('#countDown-larg').attr('data-status-time');

    new UserStory().setUSLists4KanbanViewCoreUsLArge(st);
   
        current_time = Date.parse(new Date());
     deadline= new Date(current_time + time_in_minutes*60*1000)
     run_clock('countDown-larg',new Date(current_time + time_in_minutes*60*1000));

});
$(document).on('click', '.more-table-details', function (event) {
       
        var bgId = $(this).attr("pid");
         var tbody  = $(this).parents('.stat-table-us').find("tbody")
    getBugList4UserStory(bgId,tbody);
    

    $(this).html('<i class="fas fa-angle-double-left"></i>')
    $(this).addClass('hide-more-table')
    $(this).removeClass('more-table-details')
    

});
$(document).on('click', '.stat-table-us thead .task-for-backlog-event-prm', function (event) {
        var tbody = $(this).parents('table').find('tbody');
        var log = $(this).attr("status");
        if(log==='total'){
            tbody.find(".task-tr-list").show(); 
            $('.stat-table-us thead .task-for-backlog-event-prm').removeClass('active')
        }else{
            $(this).toggleClass('active');
            var bgId = $(this).parents('tr').find('.task-for-backlog-event-prm.active');
            tbody.find(".task-tr-list").hide();
       
            for (let i = 0; i < bgId.length; i++) {
                   
                tbody.find('[data-tr-status="'+$(bgId[i]).attr("status")+'"]').show();
                
            }
             if(bgId.length === 0){
                tbody.find(".task-tr-list").show(); 
             }
        }
        
     
       
            
});
$(document).on('click', '#generalStatisticsDetailsModal .general-statistics-story-card-list', function (event) {
       
        $(this).parents('table').find('.general-statistics-story-card-list').removeClass('active')
        $(this).addClass('active')

});
$(document).on('change', '#priority-change-story-card-multi', function (event) {
    var chk = $('.assign-label-story-card-item-new');
    var sy =0;
    for (let i = 0; i < chk.length; i++) {
         
      if($(chk[i]).prop("checked")){

          sy++
          var id = $(chk[i]).parents(".task-content").attr("bid")
          updateUS4ShortChangeDetailsUsMngm($(this).val(), "priority",id);
          $('.task-column').find('#multi-edit-menu-btn-us').addClass("invisible");
          $("#multieditpopUpUs").modal("hide");
      }
        
    }

   


});
$(document).on('change', '#priority-change-story-card', function (event) {
       var id = $(this).parents(".task-content").attr("bid")
    updateUS4ShortChangeDetailsUsMngm($(this).val(), "priority",id)

});
$(document).on('change', '.all-check-us-mngm', function (event) {
      var st = $(this).attr('data-st');
      

      if($(this).prop("checked")){
        
        $(".main_div_of_backlog_info_kanban_view_table_"+st).find('.assign-label-story-card-item-new').prop("checked",true).change()

      }else{
        $(".main_div_of_backlog_info_kanban_view_table_"+st).find('.assign-label-story-card-item-new').prop("checked",false).change()
 
      }

});
$(document).on('change', '.assign-label-story-card-item-new', function (event) {
     var chk = $(this).parents('.task-column').find('.assign-label-story-card-item-new');
      var sy =0
      for (let i = 0; i < chk.length; i++) {
           
        if($(chk[i]).prop("checked")){
 
            sy++
        }
          
      }

      if(sy>1){
        
        $(this).parents('.task-column').find('#multi-edit-menu-btn-us').removeClass("invisible");
      }else{
        $(this).parents('.task-column').find('#multi-edit-menu-btn-us').addClass("invisible");

      }
      if(chk.length===sy){
        $(this).parents('.task-column').find('.all-check-us-mngm').prop('checked',true)
      }else{
        $(this).parents('.task-column').find('.all-check-us-mngm').prop('checked',false)

      }
});
$(document).on('change', '#user-story-show-stat', function (event) {
 

    if($(this).prop("checked")){
        $(this).parents(".task-content").find(".stat-div-task-content").show();
         getSTatsUserManagmentTableKanban(this)
         
    }else{
        $(this).parents(".task-content").find(".stat-div-task-content").hide();
    }

});
$(document).on('click', '.dropdown-menu-large-btn', function (event) {
  
   $(this).addClass("show");
   event.stopPropagation();
    event.preventDefault();
    
});



function closeNewInputComponent() {

    $('#addNewComponentModal').modal('hide');
}


$(document).on("click", ".toolbar .minimzeBtn", function () {

    $('.toolbar .cf').css('display', 'none');
    $('.toolbar .editsect').css('display', 'none');
    $('.toolbar .maximizeBtn').css('display', 'block');
    localStorage.setItem('data-toolbar-opened', "false");


});

$(document).on("click", ".toolbar .maximizeBtn", function () {

    $('.toolbar .cf').css('display', 'flex');
    $('.toolbar .editsect').css('display', 'flex');
    $('.toolbar .maximizeBtn').css('display', 'none');
    localStorage.setItem('data-toolbar-opened', "true");

});
$(document).on("click", ".toolbar .horizontalBtn", function () {

    $('.toolbar .cf').css('width', 'auto');
    $('.toolbar .cf').css('height', '30px');
    $('.toolbar .horizontalBtn').css('display', 'none');
    $('.toolbar .verticalBtn').css('display', 'block');


});

$(document).on("click", ".toolbar .verticalBtn", function () {

    $('.toolbar .cf').css('width', '90px');
    $('.toolbar .cf').css('height', 'auto');
    $('.toolbar .horizontalBtn').css('display', 'block');
    $('.toolbar .verticalBtn').css('display', 'none');

});

function genIpoAPiBlock(apnm, ) {
    return $('<div>')
        .addClass('ipo_api_card_new row feild_sect_opened col-11 text-center')
        .append('<p>' + apnm + '</p>')
        .append('<p>' + apnm + '</p>');
}



$(document).ready(function () {


    $(document).on('click', '.btn-toggle1', function (e) {

        var _this = $(this);
        var pnl = $('#panelFirst1');
        pnl.toggleClass('is-close');

        if (pnl.hasClass('is-close')) {
            _this.html('<i class="fas fa-chevron-right"></i>');
            pnl.css('width', '0px');
            pnl.css('display', 'none');
        } else {
            _this.html('<i class="fas fa-chevron-left"></i>');
            pnl.css('width', '22%');
            pnl.css('display', 'block');
        }

    });
    $(document).on('click', '#api_block_opened', function () {

        $('div[data-closed="apisect"]').toggle('fast');

        $('div[data-toggle="apisect"]').toggleClass('col-12');
        $('div[data-toggle="apisect"]').toggleClass('col-6');
        setApiIpoBlock();


    })
    $(document).on('click', '.addInputAttrPlus', function () {

        var val = $(this).parents('tr').find('.select_fell').val();

        var nmval = $(this).parents('tr').find('span').text();


        addInputAttributesCore(nmval, val);

        $(this).parents('tr').find('.select_fell').val('');

    })
    $(document).on('click', '.select_fell_check', function () {


        var nmval = $(this).parents('tr').find('span').text();
        var addedVal = $('.input_attributes_list_in_component').find('tr').find('.attr-name');


        var check = $(this);
        if (check.prop("checked") == true) {
            addInputAttributesCore(nmval, 1);
            return
        } else if (check.prop("checked") == false) {
            for (let ind = 0; ind < addedVal.length; ind++) {

                if (nmval === addedVal[ind].innerText) {

                    $(addedVal[ind]).parent().addClass('remv_second_attr');

                }
            }
            $('.remv_second_attr').find('.attr_rmv_sabtn').first().click()
            return
        }


        $(this).parents('tr').find('.select_fell').val('');

    })

    $(document).on('click', '.new-tr-add-btn', function () {

        var flagzad = $(this).attr('flagzad');

        var lnm = $(this).parents('tr');
        var datp = $(this).attr('data-pad-num');
        $(this).find('i').toggleClass("fa-chevron-right");
        $(this).find('i').toggleClass("fa-chevron-down");
        datp = parseFloat(datp) + 1;

        if (flagzad === "0") {
            alert("open")
            $(this).attr('flagzad', "1");
        } else {
            alert('closed');
            $(this).attr('flagzad', "0");

        }


        lnm.after($("<tr>").append("<td style='padding-left:" + datp * 25 + "px;' class='text-center'><button class='btn btn-light btn-sub-tr-second  btn-sm' data-pad-num='" + datp + "'><i class='fas fa-chevron-right'></i></button></td>")
            .append("<td>asasasfaf</td>"))





    })
    let luts = true
    $(document).on('click', '.btn-sub-tr-second ', function () {

        $(this).find('i').toggleClass("fa-chevron-right");
        $(this).find('i').toggleClass("fa-chevron-down");

        if (luts) {




            alert("acildi")
            luts = false
        } else {

            alert("baglandi")
            luts = true
        }




    })
    $(document).on('click', '.addInputClassPlus', function () {

        var val = $(this).parents('tr').find('.clsLbVal').text();
        insertNewGuiClassModalCore(val);


    })
    $(document).on('dblclick', '.feild_sect_opened', function () {

        $(this).find('ul').toggle('fast')


    })
    $(document).on('click', '.removeAttrSingle', function () {

        $(this).parent().attr('data-rmvc', '1')

        var attrs = $(this).parents('td').find('[data-rmvc=0]');
        var id = $(this).parents('tr').attr('data-rmv-id')
        var nmval = $(this).parents('tr').find('.attr-name').text();
        if (confirm("Are you sure?")) {
            removeInputAttributeCore(id);
            for (let i = 0; i < attrs.length; i++) {
                var val34 = attrs[i].innerText;
                addInputAttributesCore(nmval, val34);
            }
            $('[data-rmvc=1]').remove();
        }

    })

})

function addNewBug(el) {
    var bugDesc = $('#id').val();
    if (!(bugDesc))
        return;

    var json = {
        kv: {}
    };
    try {
        json.kv.cookie = getToken();
    } catch (err) {}


    backlogId = (backlogId) ? backlogId : "-1";
    assgineeId = (assgineeId) ? assgineeId : "-1";
    taskStatus = (taskStatus) ? taskStatus : "new";



    json.kv['fkProjectId'] = global_var.current_project_id;
    json.kv['fkBacklogId'] = backlogId;
    json.kv['fkAssigneeId'] = assgineeId;
    json.kv.taskName = bugDesc;
    json.kv.taskStatus = taskStatus;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmInsertNewBacklogTask4Short",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            console.log(JSON.stringify(res));
            //res[0].taskName;
            //generateTable developed by Gulbahar x.
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}


$(document).ready(function () {


    let dats
    let dats2
    let draggedElementPid;
    $(document).on('dragstart', ".apiListTd", function (ev) {
        var datat = $(this).parent().attr('input-type');
        dats = datat
        if (datat === "OUT") {
            $('.ApiOutTDspan').addClass('dropHereEvent');
        } else {
            $('.ApiInTDspan').addClass('dropHereEvent');
        }
        dats2 = $(this).text();
        draggedElementPid = $(this).attr("pid");
    })

    $(document).on('dragend', ".apiListTd", function (ev) {
        var datat = $(this).parent().attr('input-type');
        if (datat === "OUT") {
            $('.ApiOutTDspan').removeClass('dropHereEvent');
        } else {
            $('.ApiInTDspan').removeClass('dropHereEvent');
        }
    })


    $(document).on('dragover', ".ApiOutTDspan", function (ev) {
        if (dats === "OUT") {
            ev.preventDefault();
        }
    })

    $(document).on('dragover', ".ApiInTDspan", function (ev) {
        if (dats === "IN") {
            ev.preventDefault();
        }
    })

    $(document).on('drop', ".ApiOutTDspan", function (ev) {
        if (dats === "OUT") {
            //            $(this).text(dats2)
            //            alert('out kelbetin')

            var id = $(this).attr('pid'),
                action = 'select',
                selectFromBacklogId = $('#storyCardInputRelationModal_apilist').val(),
                selectFromInputId = draggedElementPid;

            addSourceOfRelationAsAPIDetails(id, action, selectFromBacklogId, selectFromInputId);

            setInputListToInputRelation();
        }

    })

    $(document).on('drop', ".ApiInTDspan", function (ev) {
        if (dats === "IN") {
            //            $(this).text(dats2);
            //            alert('in kelbetin')

            var id = $(this).attr('pid'),
                action = 'send',
                selectFromBacklogId = $('#storyCardInputRelationModal_apilist').val(),
                selectFromInputId = draggedElementPid;

            addSourceOfRelationAsAPIDetails(id, action, selectFromBacklogId, selectFromInputId);

            setInputListToInputRelation();
        }
    })

    $(document).on('click', ".DeleteOutAPi", function (ev) {
        $(this).parent().find('.ApiOutTDspan').text('Select from API');
    })

    $(document).on('click', ".DeleteINAPi", function (ev) {
        $(this).parent().find('.ApiInTDspan').text('Send to API');
    })




})
