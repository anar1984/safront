$(function () {


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
    $(document).on("click", '.change-color-component', function (e) {
   
          var clr  = $(this).attr("data-bgcolorspan");
          var elm  = $(this).parents('.component-container-dashed').find('.component-input-class');
              elm.css("background-color",clr);
         
           
           setComponentStyleUpdate(elm)

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
        var ldoa = `<div class="box-loader shimmer">
        
      </div>`
       
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