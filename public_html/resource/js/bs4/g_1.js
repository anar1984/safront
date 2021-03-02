$(function () {


    // $( ".bottombtn2" ).hover(function() {
    //     console.log('ok')
    //     var that=$('.myaccountName');
    //     setTimeout(function(){ 
    //         that.css('display','block');
    //         that.css('color','#032d6b');
    //      }, 3000);
    //   });


    $(document).on("click", '#user-story-delete-story', function (e) {
        if ($(this).is(":checked")) {
            $("#user-story-delete-story").prop("readonly", true);
        } else {
            $("#user-story-delete-story").prop("readonly", false);
        }
    });

    $(document).on("click", '.live-prototype-switch', function (e) {
        $("#live-prototype-show-key").toggle(600);
    });


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






})
//  document ready close 


var dY = 0;
var dX = 0;

function dragResize() {
    return;
    try {
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

    } catch (e) {
    }
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
var ch = 0, ch2 = 0, ch3 = 0, ch4 = 0, ch5 = 0, ch6 = 0;
$(document).on("click", "#general-btn-icon", function () {

    $('#ipo-tab-setting-general').addClass('active');
    ch++;
    ch2 = 0;
    ch3 = 0;
    ch4 = 0;
    ch5 = 0;
    ch6 = 0;
    $('#gui-desigin-component-view-main-div-id').css('display', 'block');
    $('#guid-desigin-main-div-id').removeClass('col-11');
    $('#guid-desigin-main-div-id').addClass('col-8');
    $('.home_icon_menu-item').css('right', '27%')
    $('.home_icon_menu-open-button').css('right', '27%')

    if (ch == 2) {
        ch = 0;
        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-properties').removeClass('active');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-8');
        $('#guid-desigin-main-div-id').addClass('col-11');
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
    $('#guid-desigin-main-div-id').removeClass('col-11');
    $('#guid-desigin-main-div-id').addClass('col-8');
    $('.home_icon_menu-item').css('right', '27%')
    $('.home_icon_menu-open-button').css('right', '27%')
    if (ch2 == 2) {
        ch2 = 0;
        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-properties').removeClass('active');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-8');
        $('#guid-desigin-main-div-id').addClass('col-11');
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
    $('#guid-desigin-main-div-id').removeClass('col-11');
    $('#guid-desigin-main-div-id').addClass('col-8');
    $('.home_icon_menu-item').css('right', '27%');
    $('.home_icon_menu-open-button').css('right', '27%');
    if (ch3 == 2) {
        ch3 = 0;
        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-container').removeClass('active');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-8');
        $('#guid-desigin-main-div-id').addClass('col-11');
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
    $('#guid-desigin-main-div-id').removeClass('col-11');
    $('#guid-desigin-main-div-id').addClass('col-8');
    $('.home_icon_menu-item').css('right', '27%')
    $('.home_icon_menu-open-button').css('right', '27%')
    if (ch4 == 2) {
        ch4 = 0;

        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-canvas').removeClass('active');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-8');
        $('#guid-desigin-main-div-id').addClass('col-11');
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
$(document).on("click", "#History-btn-icon", function () {
    $('#history_inp_popUp').toggle('fast');
    $('#history_inp_popUp').draggable({
        containment: "parent"
    });
    setBacklogHistory4View();
})
$(document).on("dblclick", ".component-container-dashed", function () {
    $('#edit_component_inp_popUp').toggle('fast');
    $('#edit_component_inp_popUp').draggable({
        containment: "parent"
    });
  
})

var popUpt = `<div   class="popup-Elements" data-toggle="modal" data-target="#exampleModal" id="popup-btn" >
  <span class="editBtnLVSect deleteBTn" title="Delete Input"><i class="fas fa-trash-alt"></i></span>

  </div>`


$(document).on("mouseenter", ".draggable", function () {


    $(".popup-Elements").remove();

    $("[data-edit='dataText']").removeAttr("data-edit");
    $(this).attr("data-edit", "dataText");
    $(this).append(popUpt)



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
    $('#guid-desigin-main-div-id').removeClass('col-11');
    $('#guid-desigin-main-div-id').addClass('col-8');
    if (ch6 == 2) {
        ch6 = 0;

        $('#gui-desigin-component-view-main-div-id').css('display', 'none');
        $('#ipo-tab-setting-inputAdd').removeClass('active');
        $('.home_icon_menu-item').css('right', '7%');
        $('.home_icon_menu-open-button').css('right', '7%');
        $('.tool-item').removeClass('active');
        $('#guid-desigin-main-div-id').removeClass('col-8');
        $('#guid-desigin-main-div-id').addClass('col-11');
    }

})
//  7. tool panel-input-add

$(document).on("click", "#currentAll-btn-icon", function () {
    $('.current').toggle();
    $('.all').toggle();
})

// draggable checkbok
$(document).on("click", ".dragCheckbox", function () {
    $('.checkmark2').toggle();
    $('.checkmark1').toggle();

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

}
;
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
        html2canvas: {scale: 5},
        jsPDF: {orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true}
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
    $('#panelFirst1').css('display', 'block')
    $('#panelSplit1').css('display', 'block')
});

$(document).on("click", ".openNavhide", function () {
    $("html").removeClass("openNav");
    $(".nav-toggle").removeClass("active");
    $('#panelFirst1').css('display', 'none')
    $('#panelSplit1').css('display', 'none')

})






$(document).on("click", ".cf li .inptadd", function () {

    let valin = $(this).parent().attr('value');



    addInputAsInput();


    setTimeout(function () {
        $('#addNewComponentModal').find('#exampleModal-new-input-name').focus();

    }, 700);
    $('#addNewComponentModal').find('#exampleModal-new-component-type').val(valin);

})

$(document).on('keypress', '#exampleModal-new-input-name', function (event) {

    if (event.keyCode == 13) {

        createNewInputComponent(this);


    }

});

function closeNewInputComponent() {

    $('#addNewComponentModal').modal('hide');
}


$(document).on("click", ".toolbar .minimzeBtn", function () {

    $('.toolbar .cf').css('display', 'none');
    $('.toolbar .editsect').css('display', 'none');
    $('.toolbar .maximizeBtn').css('display', 'block');


});

$(document).on("click", ".toolbar .maximizeBtn", function () {

    $('.toolbar .cf').css('display', 'flex');
    $('.toolbar .editsect').css('display', 'flex');
    $('.toolbar .maximizeBtn').css('display', 'none');

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

 function genIpoAPiBlock(apnm,){
     return $('<div>')
                 .addClass('ipo_api_card_new row feild_sect_opened col-11 text-center')
                 .append('<p>'+apnm+'</p>')
                 .append('<p>'+apnm+'</p>');
 }
  
   

$(document).ready(function(){

 
    $(document).on('click','.btn-toggle1', function(e){
        
        var _this = $(this);
        var pnl =$('#panelFirst1');
        pnl.toggleClass('is-close');
        
        if(pnl.hasClass('is-close')) {
          _this.html('<i class="fas fa-chevron-right"></i>');
          pnl.css('width','0px');
          pnl.css('display','none');
        } else {
          _this.html('<i class="fas fa-chevron-left"></i>');
          pnl.css('width','22%');
          pnl.css('display','block');
        }    
        
        });
    $(document).on('click','#api_block_opened', function(){

        $('div[data-closed="apisect"]').toggle('fast');

        $('div[data-toggle="apisect"]').toggleClass('col-12');
        $('div[data-toggle="apisect"]').toggleClass('col-6');
        

    })
    $(document).on('click','.addInputAttrPlus', function(){

        var nmval =$(this).parents('tr').find('select').val();
        var val =$(this).parents('tr').find('span').text();

        addInputAttributes2(nmval,val)

    })
    $(document).on('click','.addInputClassPlus', function(){

        var val =$(this).parents('tr').find('.clsLbVal').text();
          insertNewGuiClassModal2(val);

    })
    $(document).on('dblclick','.feild_sect_opened', function(){

      $(this).find('ul').toggle('fast')
        

    })

})
function addNewBug(el) {
    var bugDesc = $('#id').val();
    if (!(bugDesc))
        return;

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }


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




