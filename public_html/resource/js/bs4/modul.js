
function generatePopupModalNew(modalBody, style, triggerId, backlogId, title) {
    var pageId = makeId(15);
    var butnList = '';
    var fkpr = Utility.getParamFromUrl("fkManualProjectId").length
    if (global_var.current_domain === '48edh' && fkpr > 0) {
        butnList = `<div style="position: absolute;top: 2px;right: 40px;">
                            <span class='mr-2' ><a class="taskListShowNewSorguBtnClickEvent" href="#" title="Tapşırıq" sa-data-link="21042817181209336901"><img width="25px" class='rounded-circle' src="img/task.jpeg"></a></span> 
                             <span class='mr-2' ><a class="for-chewekk-new-chat-link" data-link="chwkchat" href="javascript:void" title="Show Chat"><img width="25px" class='rounded-circle' src="img/chat.jpeg"></a></span> 
                             <span  class='mr-2'><img width="25px" class='rounded-circle' src="img/info.jpg"></a> </span> 
                             </div>`
    }
  
    var st =`<div class="modal fade" id="${pageId}" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                 <div class="modal-dialog modal-lg gui-design redirectClass4CSS"  style="max-width: 800px;margin-top: 20px;padding: 0px;'${style}" role="document">
                   <div class="modal-content" style="background-color:inherit;border: 0px;">
                         <div class="modal-header text-center" style="padding: 0px 10px;background: none;">
                           <b class="modal-title" id="userstory-gui-input-component-res-sus-label">${title }</b> ${butnList} 
                           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                          </button>
                   </div>
                    <div class="loaderModalInitiator"></div>
                   <div class="modal-body" style="overflow-y: auto;overflow-x: hidden;height: 100%;max-height: 90vh;">
                        
                     <input type="hidden" id=popupTrigger pid="${triggerId}" value="nonenone">
                   <div class="row redirectClass" bid="${backlogId}"  bcode="${makeId(10)}" id="userstory-gui-input-component-res-sus-id">
                        ${modalBody}
                   </div>
                </div>
            </div>
       </div>
    </div>`;
    $("#body_of_nature").append(st);
    initSelectpickerComponent();
    $('#' + pageId).modal("show");
    $(document).on('hidden.bs.modal', '#' + pageId, function (evt) {
        $('#' + pageId).remove();
        $('body').addClass('modal-open');
    });
    return pageId;
}
function genTimePickerById(id,drop) {
  $('#' + id).daterangepicker({
      showDropdowns: true,
      showWeekNumbers: true,
      timePicker: false,
      timePickerIncrement: 1,
      timePicker12Hour: true,
      defaultDate: true,
      startDate:  moment(),
      endDate:  moment(),
      ranges: {
          'This Day': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
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

          applyLabel: 'Search',
          cancelLabel: 'cancel',
          fromLabel: 'From',
          toLabel: 'To',
          customRangeLabel: 'Special',
          daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          monthNames: ['January', 'February', 'March', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
      }
  });
}

function nav_list_menu_story_card() {
     try {
      var list  =localStorage.getItem('nav_list_menu_story_card');
      list  = list.split(',');
      for (let i = 0; i < list.length; i++) {
          const o = list[i];
      
            $("#part-nav-menu-id4UserStory [data-link='"+o+"']").click();
      }
     } catch (error) {
       
     }
  
}


$(document).on("click", '#task-list-statistic-4backlog .status-class',function (e) {
  $(this).toggleClass('active');
  var items  = $("#task-list-statistic-4backlog .status-class.active");
      if(items.length <1){
        $('.cst-table-hover tbody tr.redirectClass').show();
      }else{
        $('.cst-table-hover tbody tr.redirectClass').hide();
        items.each(function () {
          var dataStatus = $(this).attr('data-status');     
         $('.cst-table-hover tbody tr.triggger-status-' + dataStatus).show();   
        })
      }
})

