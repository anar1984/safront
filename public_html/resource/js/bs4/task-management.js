

const taskManagement = {
    "taskLabelList":{},
    "taskSprintList":{},
    Init: function (elm) {
        var elm = $(elm);
        elm.html(this.genBlockMain());
        this.readTask.genBlockTask.Init($('.main-section'));
        $("#main-sidebar-div").html('');
        $("#main-sidebar-div").append(this.readTask.genBlockTask.genFilterBlock());
        genTimePickerById("issue_management_closed_date_from",'');
        $("#main-sidebar-div").append(this.readTask.genBlockTask.genLabelBlock());
        $("#main-sidebar-div").append(this.readTask.genBlockTask.genSprintBlock());
        var dwlmt = $('#bug_filter_tasktype')
        taskManagement.add_loadTaskType_bug_list(dwlmt, 'load');
        $("#main-sidebar-div").append(this.readTask.genBlockTask.genNotificationBlock());
        this.readTask.genBlockTask.getNotificationRowCount();

    },
    insertTask: {
        genBlockModal: {
            Init: function () {
                $('body').find("#issue-managment-add-task").remove();
                $('body').find(".modal-backdrop").remove();
                $('body').append(this.genModalSelfBlock());
                cmpList.userBlock.Init($('.assigne-div-add-issue'),'single');
                cmpList.userBlock.Init($('.observer-div-add-issue'),'multi');
                taskManagement.updateTask.getSprintTask($('#add_task_sprint'));
                taskManagement.updateTask.getLabelTask($('#run_task_categories'));
                setProjectListByID('bug_filter_project_id_add');
                $("#issue-managment-add-task select.bug-mgmt-filter-select").selectpicker("refresh");

            },
            genModalSelfBlock: function () {
                return ` <div class="modal fade cs-modal-box issue-managment-add-task ${notChwk()?"":"left  cs-modal-box story-card-modal"}" id="issue-managment-add-task" data-backdrop="static" data-keyboard="false" tabindex="2" role="dialog" aria-labelledby="exampleModalLabel"
               aria-hidden="true">
              <div class="modal-dialog rounded" style="max-width: 50%;" role="document">
                  <div class="modal-content">
                      <div class="justify-content-center modal-header task-modal-header">
                          <h6 class="modal-title task-modal-title">
                              <span class="text">${lang_task.windowAddTask.addTask}</span>
                          </h6>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <i class="cs-svg-icon x-close"></i>
                          </button>
                      </div>
                      <div class="modal-body">
                    <div class="row">
                      <input class='d-none' type='text' id='parent-task-id-input'>
                       <div class="col-lg-12">
                         ${this.genTitleBlock()}
                         ${this.genCheckListBlock()}
                         ${this.genFileAddBlock()}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 mt-0"> 
                            <div class="d-flex task-deadline-boxes">
                            ${this.genTaskDeadLineBlockTime()}
                            ${this.genTaskDeadLineBlockTask()}
                            ${this.genTaskDeadLineBlockEvent()}
                              </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                        ${this.genTabBlock.Init()}
                         </div>
                        </div>
                       ${this.genNotifyButton()}
                    <div class="row">
                        <div class="col-12">
                            <div class="run-msg"></div>
                        </div>
                    </div>
                      </div>
                      <div class="modal-footer">
                        <div class="d-flex w-100">
                                <div class="mr-auto">
                                    <div class="assigne-div-add-issue" style="display:inline-block; margin-right:15px"></div>
                                    <div class="observer-div-add-issue" style="display:inline-block"></div>
                                </div>
                                <div class="d-table" style="padding: 3px 0px;">
                                    <button type="button" id="addIssueButtonId" class="btn btn-primary align-middle">${lang_task.windowAddTask.add}</button>
                                    </div>
                                </div>
                        </div>
                  </div>
              </div>
          </div>`
            },
            genTitleBlock: function () {
                return `<div class="cs-input-group mb-2">
                <div class="d-flex">
                    <div class="mr-auto" style="width: 93%;">
                        <input type="text" class="form-control newTaskNameInput bg-transparent pl-0 pr-0 pb-0 pb-0" name="testCaseTitle" placeholder='${lang_task.windowAddTask.taskName}' id="taskNameInputNew2">
                         <span class='pt-0' style="color: #ffffff66;font-size: 12px;margin-top: -3px;margin-bottom: 6px;display: block;">${lang_task.windowAddTask.quickInsertTaskOnfocusInput}</span>
                    </div>
                    <div class="pt-1">
                        <div id="cerateTask-priority-btn" class="priority-btn">
                             <i class="cs-svg-icon flame"></i>
                        </div>
                    </div>
                </div>
            </div>`
            },
            genCheckListBlock: function () {
                return ` <div class="cs-input-group">
                <div class="task-check-list-box cs-box-background overflow-hidden">
                    <input type="text" class="form-control" id="newAddCheckList" placeholder="${lang_task.windowAddTask.addCheckWords}.." style="background: transparent; border-radius: 0;">
                    <ul>
                      
                    </ul>
                </div>
            </div>`
            },
            genFileAddBlock: function () {
                return `<div class="cs-input-group">
                              
                <div class="row canvas_canvas commentsubmit-seqment" id="canvasdiv_taskCreate"
                     style="width:100%;padding:0px;margin:0px;">
                    <div class="col-12 text-center canvas_canvas_msg "
                         style='border: 1px dashed #525596;border-radius: 5px;color: #bbbbcf;'>
                        <h5>${lang_task.windowAddTask.copyPasteImg}</h5>
                    </div>
                </div>
                <div class="commentsubmit-seqment component-class p-0 cm-file-upload-box ml-0 mr-0" >
                    <div data-toggle="tooltip" id="file1134"                                         
                         class=" tooltipMan component-class  
                         col-lg-12 hover-prototype-selector">
                         <span class="cs-btn-border">
                         <label class="cs-file-upload">
                            <input class="form-control saTypeFilePicherUploadFile component-input-class" 
                                   sa-type="filepicker"  type="file" value="" row-no="" 
                                   pdid="21112211275108954370" id="addComment4Task_addnewfile" 
                                   multiple="" 
                                   fname="">
                                   ${lang_task.windowAddTask.attachFile}
                        </label>
                        </span>
                        <div class="progress_bar_new" id="progress_bar_new"></div>
                    </div>
                </div>
            </div>`
            },
            genTaskDeadLineBlockTime: function () {
                return `<div class="mr-auto pl-0 pr-0 pb-2">
                <div class="row">
                    <div class="col-xl-12" style="display:contents">
                        <div class="col-lg-6  mt-3 cs-p-rem">
                            <div class="cs-input-group p-0">
                            <div class="input-group-addon">${lang_task.windowAddTask.startDate}</div>                                                 
                                <div class='cs-date-time d-flex'>
                                    <div>
                                        <div class="d-flex">
                                            <span class="input-group-icon">
                                                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                                            </span>
                                            <input type='text' id="taskDeadlineStartDade" class="form-control taskDeadlineDate" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="d-flex">
                                            <span class="input-group-icon">
                                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                            </span>
                                            <input type='text' id="taskDeadlineStartTime" class="form-control taskDeadlineTime" style="width:50px;" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-3 cs-p-rem">
                          <div class="cs-input-group p-0">
                            <div class="input-group-addon">${lang_task.windowAddTask.endDate}</div>
                                <div class='cs-date-time d-flex'>
                                    <div>
                                        <div class="d-flex">
                                            <span class="input-group-icon">
                                                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                                                </span>
                                                <input type='text' id="taskDeadlineEndDade" class="form-control taskDeadlineDate" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="d-flex">
                                            <span class="input-group-icon">
                                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                                </span>
                                                <input type='text' id="taskDeadlineEndTime" class="form-control taskDeadlineTime" style="width:50px;" />
                                        </div>
                                    </div>
                                </div>
                          </div>
                        </div>
                       
                        <div class="col-lg-6 mt-3 cs-p-rem">
                            <div class="cs-input-group p-0">
                                <div class="input-group-addon">Sprint</div>
                                <select multiple class="add_task_sprint issue_selectpicker"  id="add_task_sprint" data-live-search="true">
                                   
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-3 cs-p-rem">
                            <div class="cs-input-group p-0">
                                <div class="input-group-addon">${lang_task.windowAddTask.catagories}</div>
                                <select multiple class="run_task_categories issue_selectpicker"  id="run_task_categories" data-live-search="true">
                                   
                                </select>
                            </div>
                        </div>
                   </div>
                </div>
        </div>`
            },
            genTaskDeadLineBlockTask: function () {
                return `  <div class="p-2 mt-2 ml-4">
                <div class="">
                    <div class="cs-input-group">
                        <div class="input-group-addon">${lang_task.windowAddTask.task}</div>
                        <div class="tapshiriq-btn active" id="tapshiriq-btn">
                            <i class="cs-svg-icon tapshiriq"></i>
                            <i class="cs-svg-icon tapshiriq-light"></i>
                        </div>
                    </div>
                </div>
            </div> `
            },
            genTaskDeadLineBlockEvent: function () {
                return ` <div class="p-2 mt-2">
                <div class="">
                    <div class="cs-input-group">
                        <div class="input-group-addon">${lang_task.windowAddTask.meeting}</div>
                        <div class="toplanti-btn" id="toplanti-btn">
                            <i class="cs-svg-icon toplanti"></i>
                            <i class="cs-svg-icon toplanti-light"></i>
                        </div>
                    </div>
                </div>
            </div>`
            },
            genNotifyButton: function () {
                return `  <div class="row">
              <div class="cs-flex-col flex-item ml-3 mt-2 horizontal">
                  <div class="cs-input-group mt-2">
                      <label class="checkmarkcontainer">${lang_task.windowAddTask.confirmationNotification}
                          <input type="checkbox" id="sendnotification">
                          <span class="checkmark"></span>
                      </label>

                      <label class="checkmarkcontainer"> ${lang_task.windowAddTask.closeAfterInsert}
                            <input type="checkbox" checked='true' id="after_insert_modal">
                            <span class="checkmark"></span>
                      </label>
                  </div>
              </div>
          </div>`
            },
            genTabBlock: {
                Init: function () {
                    var div = `
                     ${this.genTabHeader()}
                     <div class="tab-content" id="myTabContent">
                     ${/* notChwk()? */this.genDetailsBlock()/* :"" */}
                     ${this.genScheduleBlockInsertNew()}
                     ${this.genObserverBlock()}
                     ${this.genEventBlock()}
                     </div>
                     `
                    return div
                },
                genTabHeader: function () {
                    return `<div class="d-flex" style=" border-top: 2px solid rgb(3 57 108 / 50%); padding-top: 10px; margin-top: 3px !important;">
                        <div class="schedule-dcbtn" style="display:none;">
                            <div class="row">
                                <div class="col-lg-4 cs-flex-col flex-item mt-2">
                                    <div class="cs-input-group">
                                        <label class="switch bcs-swith">
                                            <input type="checkbox" id="runTaskAvtivateSchedule">
                                            <span class="slider round">
                                                <small class="deactive">${lang_task.topBar.tableTypeSelector.passive}</small>
                                                <small class="active">${lang_task.topBar.tableTypeSelector.active}</small>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ml-auto">
                            <ul class="nav nav-pills mb-3 mt-2" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link active" id="details-tab" data-toggle="tab" href="#task-tab1" role="tab" aria-controls="task-tab1" aria-selected="true"><i class="cs-svg-icon details"></i> <span>${lang_task.windowAddTask.details}</span></a>
                                </li>
                                <li class="nav-item after-add-task" role="presentation">
                                    <a class="nav-link task-tab2" id="shedule-tab" data-toggle="tab" href="#task-tab2" role="tab" aria-controls="task-tab2" aria-selected="false"><i class="cs-svg-icon schedule"></i> <span>${lang_task.windowAddTask.schedule}</span></a>
                                </li>
                            
                            <!-- <li class="nav-item after-add-task" role="presentation">
                                    <a class="nav-link loadUserForObserver" id="observer-tab" data-toggle="tab" href="#task-tab5" role="tab" aria-controls="task-tab5" aria-selected="false"><i class="cs-svg-icon observer"></i> <span>${lang_task.windowAddTask.observer}</span></a>
                                </li>-->
            
                                <!--<li class="nav-item after-add-task" role="presentation">
                                    <a class="nav-link" id="events-tab" data-toggle="tab" href="#task-tab3" role="tab" aria-controls="task-tab3" aria-selected="false"><i class="cs-svg-icon hour-02"></i> <span>${lang_task.windowAddTask.events}</span></a>
                                </li>-->
                            </ul>
                        </div>
                    </div>`
                },
                genDetailsBlock: function () {
                    return `  <div class="tab-pane fade task-tab1 active show cs-box-background" id="task-tab1" role="tabpanel" aria-labelledby="task-tab1-tab">
                    <div class='row'>
                        <div class="col-lg-6  mt-2">
                            <div class="cs-input-group">
                                <select class="form-control issue_selectpicker" data-live-search="true" data-actions-box="true"
                                        style="text-overflow: ellipsis" onchange='' id='bug_filter_project_id_add'
                                        title="${lang_task.rightBar.project}"></select>
                            </div>
                        </div>
                    
                        <div class="col-lg-6 mt-2">
                            <div class="cs-input-group">
                                <select class="form-control bug-mgmt-filter-select issue_selectpicker " data-actions-box="true" onchange=''
                                        data-live-search="true" id='bug_filter_backlog_id_add' title="${lang_task.rightBar.storyCart}">
                                </select>
                            </div>
                        </div>
                   
                        <div class="col-lg-6 mt-2">
                            <div class="cs-input-group">
                                <select class="form-control bug-mgmt-filter-select issue_selectpicker " data-actions-box="true" onchange=''
                                        data-live-search="true" id='bug_task_type_id_add' title="${lang_task.rightBar.taskType}"></select>
                            </div>
                        </div>
                       
                        <div class="col-lg-6 mt-2">
                            <div class="cs-input-group">
                                <select class="form-control bug-mgmt-filter-select issue_selectpicker  " data-actions-box="true" onchange=''
                                        id='bug_task_nature_id_add' title="${lang_task.rightBar.taskNature}">
                                    <option value="bug" selected="">${lang_task.table.taskNature.bug}</option>
                                    <option value="change" selected="">${lang_task.table.taskNature.changeRequest}</option>
                                    <option value="new" selected="">${lang_task.table.taskNature.newRequest}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                            <div class="col-4 estimateHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Estimated Hour(s)</label>
                                    <input placeholder="None" onchange="updateTask4ShortChange(this, 'estimatedHours')"
                                           class="taskEstimationHoursInput estimateHourseInput form-control cs-input" type="number" name=""
                                           id="">
                                </div>
                            </div>
                            <div class="col-4 spentHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Spent Hour(s)</label>
                                    <input placeholder="None" class="taskSpentHoursInput estimateHourseInput form-control cs-input"
                                           onchange="updateTask4ShortChange(this, 'spentHours')" type="number" name="" id="">
                                </div>
                            </div>
                            <div class="col-4 estimateHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Estimated Counter</label>
                                    <input placeholder="None" onchange="updateTask4ShortChange(this, 'estimatedCounter')"
                                           class="taskEstimatedCounterInput estimateHourseInput form-control cs-input" type="number" name=""
                                           id="">
                                </div>
                            </div>
                            <div class="col-4 spentHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Executed Counter</label>
                                    <input placeholder="None" class="taskExecutedCounterInput estimateHourseInput form-control cs-input"
                                           onchange="updateTask4ShortChange(this, 'executedCounter')" type="number" name="" id="">
                                </div>
                            </div>
                            <div class="col-4 estimateHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Estimated Budget</label>
                                    <input placeholder="None" onchange="updateTask4ShortChange(this, 'estimatedBudget')"
                                           class="taskEstimatedBudgetInput estimateHourseInput form-control cs-input" type="number" name=""
                                           id="">
                                </div>
                            </div>
                            <div class="col-4 spentHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Spent Budget</label>
                                    <input placeholder="None" class="taskSpentBudgetInput estimateHourseInput form-control cs-input"
                                           onchange="updateTask4ShortChange(this, 'spentBudget')" type="number" name="" id="">
                                </div>
                            </div>
                        </div>
                </div>`
                },
                genScheduleBlockInsertNew: function () {
                    return ` <div class="tab-pane fade run-shedule-elements task-tab2 cs-box-background" id="task-tab2" role="tabpanel" aria-labelledby="task-tab2-tab">
                   <div class="row rsoon">
                      <div class="col-lg-3 pr-0 mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">${lang_task.windowAddTask.reapeatEvery}</div>
                               <input class="form-control" name="run_task_repeat_select" id='run_task_repeat_select' type="number" required>
                           </div>
                       </div>
                   
                       <div class="col-lg-4 pr-0 mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.intensive}</div>
                                <select class="issue_selectpicker" name="run_task_intensive_select" id='run_task_intensive_select' data-live-search="true">
                                    <option value="weekly">${lang_task.windowAddTask.weekly}</option>
                                    <option value="monthly">${lang_task.windowAddTask.monthly}</option>
                                    <option value="yearly">${lang_task.windowAddTask.yearly}</option>
                                </select>
                            </div>
                       </div>                 
                       <div class="col-lg-5  mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.selectReminder}</div>
                                <select class="issue_selectpicker" name="run_task_repeat_select" id='run_task_reminder_select' data-live-search="true">
                                    <option value="at_start_time">At start time</option>
                                    <option value="5_minutes_before">5 minutes before</option><option value="10_minutes_before">10 minutes before</option><option value="15_minutes_before">15 minutes before</option> 
                                     <option value="20_minutes_before">20 minutes before</option><option value="25_minutes_before">25 minutes before</option>                                    <option value="30_minutes_before">30 minutes before</option>                                    <option value="45_minutes_before">45 minutes before</option>                                    <option value="1_hour_before">1 hour before</option>                                    <option value="2_hours_before">2 hours before</option>                                    <option value="3_hours_before">3 hours before</option>                                    <option value="12_hours_before">12 hours before</option>                                    <option value="24_hours_before">24 hour before</option>                        <option value="2_days_before">2 days before</option>
                                    <option value="1_week_before">1 week before</option>
                                </select>
                            </div>
                        </div>
                      
                   </difv>
                   </div>
                  
                   <div class="row rsoon weekly-and-monthly-actions run-intensive run-enabled">
                
                       <div class="col-lg-12 cs-col-padding mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">${lang_task.windowAddTask.weekDay}</div>

                                <div class="cs-horizontal-checkboxes" id="run_task_weekday_select">
                                    <label><input type="checkbox" value="monday" ><span>Monday</span></label>
                                    <label><input type="checkbox" value="tuesday" ><span>Tuesday</span></label>
                                    <label><input type="checkbox" value="wednesday" ><span>Wednesday</span></label>
                                    <label><input type="checkbox" value="thursday" ><span>Thursday</span></label>
                                    <label><input type="checkbox" value="friday" ><span>Friday</span></label>
                                    <label><input type="checkbox" value="saturday" ><span>Saturday</span></label>
                                    <label><input type="checkbox" value="sunday" ><span>Sunday</span></label>
                                </div>

                           </div>
                       </div>
                   </div>
                   <div class="row rsoon monthly-actions run-intensive">
                       
                        <div class="col-lg-9 mt-2">
                                <div class="cs-input-group">
                                    <div class="input-group-addon">Ay həftəsi</div>
                                        <div class="cs-horizontal-checkboxes" id="run_task_day_yearly_select">
                                            <label><input type="checkbox" value="1_week" ><span>1-ci həftə</span></label>
                                            <label><input type="checkbox" value="2_week" ><span>2-ci həftə</span></label>
                                            <label><input type="checkbox" value="3_week" ><span>3-cü həftə</span></label>
                                            <label><input type="checkbox" value="4_week" ><span>4-cü həftə</span></label>
                                            <label><input type="checkbox" value="last_week" ><span>Last week</span></label>
                                        </div>
                                </div>
                            </div>
                            <div class="col-lg-3 pl-0 mt-2">
                                <div class="cs-input-group">
                                    <div class="input-group-addon">Gün:</div>
                                    <select class="issue_selectpicker" name="sdofm_day_of_Month_select" id="sdofm_day_of_Month_select" data-live-search="true" tabindex="null">
                                    <option value="1">1</option><option value="2">3</option><option value="3">3</option>
                                    <option value="4">4</option><option value="5">5</option><option value="6">6</option>
                                    <option value="7">7</option><option value="8">8</option><option value="9">9</option>
                                    <option value="10">10</option><option value="11">11</option><option value="12">12</option>
                                    <option value="13">13</option><option value="14">14</option><option value="15">15</option>
                                    <option value="16">16</option><option value="17">17</option><option value="18">18</option>
                                    <option value="19">19</option><option value="20">20</option><option value="21">21</option>
                                    <option value="22">22</option><option value="23">23</option><option value="24">24</option>
                                    <option value="25">25</option><option value="26">26</option><option value="27">27</option>
                                    <option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option>
                                </select>
                                </div>
                            </div>
                      
                   </div>
                   <div class="row rsoon yearly-actions run-intensive">
                     
                   </div>
               </div>`
                },
                genObserverBlock: function () {
                    return'';
                    return `<div class="tab-pane fade task-check-list-created cs-box-background" id="task-tab5" role="tabpanel" aria-labelledby="task-tab5-tab">
                 <div class="cs-input-group mb-3 ml-2">
                     <div class="input-group-addon">${lang_task.windowAddTask.observerName}</div>
                     <div class="task-check-list-observer p-0 mt-1 mb-3">
                         <select class="form-control" id="createdtask_oblerverlist"></select>
                         <button class='btn addObserverToTAsk'><i class="fas fa-plus" aria-hidden="true"></i> ${lang_task.windowAddTask.addObserver}</button>
                     </div>
                     <div class="task-observer-list">

                     </div>
                 </div>
             </div>`
                },
                genEventBlock: function () {
                    return ""
                    return `  <div class="tab-pane fade task-events-created cs-box-background" id="task-tab3" role="tabpanel" aria-labelledby="task-tab2-tab">
                    <div class="row">
                        <div class="col-lg-12 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">

                                <!-- <label class="checkmarkcontainer">Activate
                                    <input type="checkbox" name="activateCreatedEvenets" id="activateCreatedEvenets" value="">
                                    <span class="checkmark"></span>
                                </label> -->
                                <label class="switch bcs-swith">
                                    <input type="checkbox"  name="activateCreatedEvenets" id="activateCreatedEvenets">
                                    <span class="slider round">
                                        <small class="deactive">Deactive</small>
                                        <small class="active">Active</small>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.subject}</div>
                                <input class="form-control" name="mezmun" id="ivent-mezmun" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.structure}</div>
                                <input class="form-control" name="struktur" id="ivent-struktur" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.type}</div>
                                <input class="form-control" name="nov" id="ivent-nov" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.responsiblePerson}</div>
                                <input class="form-control" name="mesulShexs" id="ivent-mesulShexs" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.participant}</div>
                                <input class="form-control" name="mesulShexs" id="ivent-istirakci" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.counterparty}</div>
                                <input class="form-control" name="mesulShexs" id="ivent-kontragent" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.location}</div>
                                <input class="form-control" name="yer" id="ivent-yer" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.note}</div>
                                <input class="form-control" name="qeyd" id="ivent-qeyd" type="text">
                            </div>
                        </div>
                    </div>
                </div>`
                },
            }
        },
        insertNewTask: function () {
            this.getValueCreateModalScreen();

        },
        insertNewTaskApi: function (dataCore,itmlist) {
            var json = initJSON();
            var dataPure = $.extend(json.kv, dataCore);
            json.kv = dataPure;

            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmInsertNewBacklogTaskCoreNew",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    AJAXCallFeedback(res);
                //    that.insertEventByTaskId(res.kv.id);
                    that.insertObserverTask(res.kv.id);
                    that.insertCheckListComulativ(res.kv.id,itmlist);
                   
                    taskManagement.insertTask.insertBacklogTaskDetail(res.kv.id);
                     
                    getBugList();
                    Toaster.showMessage(lang_task.windowAddTask.addTaskMessageSucc);
                    if ($("#after_insert_modal").prop("checked")) {
                        $("#issue-managment-add-task").modal("hide");

                    }
                   $("#addIssueButtonId").removeAttr("disabled");
                   updateSpirntTaskById($('#add_task_sprint').val(),res.kv.id);
                   updateLabelTaskById($('#run_task_categories').val(),res.kv.id);
                   var prt  = $("#parent-task-id-input").val()
                   if(prt.length>0){
                    getChildTasks();
                   }
                },
                error: function () {
                    Toaster.showError((lang_task.windowAddTask.addTaskMessageErr));
                }
            });
        },
        getValueCreateModalScreen: function () {
            var val = $('#taskNameInputNew2').val();
            var backlog = $('#bug_filter_backlog_id_add').val();
            if (!val) {
                Toaster.showError(lang_task.windowAddTask.errorMessageTask);
                return
            }
            if (!backlog) {
                Toaster.showError('StoryCard Not entered');
                return
            }

            var data = {};

            data.comment = $('#addComment4Task_comment_new').val();
            var files = $('#addComment4Task_addnewfile').attr('fname') +"|";

            $('#canvasdiv_taskCreate .canvas-sub-class').each(function (e) {
                files += $(this).attr('fname') + "|";
            })

            var sprintList = "";
            $('.bug-task-filter-checkbox-sprint').each(function () {
                if ($(this).is(":checked")) {
                    sprintList += $(this).val() + ',';
                }
            })

            data.taskName = val;
            data.filename = files;
            data.fkProjectId = $('#bug_filter_project_id_add').val();
            data.fkBacklogId = $('#bug_filter_backlog_id_add').val();
            data.fkAssigneeId = $('.assigne-div-add-issue').getVal();
            data.fkTaskTypeId = $("#bug_task_type_id_add").val();
            data.taskNature = $("#bug_task_nature_id_add").val();
            data.taskPriority = $("#bug_filter_priority_add").val();
            //data.taskNature = $("#bug_filter_project_id_add").val();
            data.sprintList = sprintList;
            data.startDate = toDate('taskDeadlineStartDade');
            data.startTime = GetConvertedTimeDT('taskDeadlineStartTime');
            data.endTime = GetConvertedTimeDT('taskDeadlineEndTime');
            data.endDate = toDate('taskDeadlineEndDade');
            data.isMeet = ($("#tapshiriq-btn").hasClass("active")) ? "0" : "1";
            data.fkParentTaskId = $("#parent-task-id-input").val();
            data.sendNotification = $("#sendnotification").is(":checked") ? "1" : "0";
            data.notificationMail = $("#sendnotification").is(":checked") ? "1" : "0";
           // schedulle 
            
            // data.description = $("#bug_filter_project_id_add").val();
       
            //$(this).attr("disabled",'disabled');
            var itmList = ''
            var items = $(".issue-managment-add-task .task-check-list-box ul>li");
            for (let i = 0; i < items.length; i++) {
                const o = items[i];
                itmList += $(o).find('textarea').val() + '|';
            }
            reset_task_data();
            this.insertNewTaskApi(data,itmList);
        },
        insertEventByTaskId: function (id) {

            var json = initJSON();
            json.kv.fkTaskId = id;
            json.kv.mezmun = $('#ivent-mezmun').val();
            json.kv.struktur = $('#ivent-struktur').val();
            json.kv.nov = $('#ivent-nov').val();
            json.kv.mesulShexs = $('#ivent-mesulShexs').val();
            json.kv.istirakci = $('#ivent-istirakci').val();
            json.kv.kontragent = $('#ivent-kontragent').val();
            json.kv.yer = $('#ivent-yer').val();
            json.kv.qeyd = $('#ivent-qeyd').val();


            // json.kv.filename = zipfilename;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceRsCreateBacklogTaskEvent",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    //  var dataurl = urlGl + 'api/get/files/' + res.kv.filename;
                    try {
                        var err = res.err.message;
                        if (err) {
                            //Toaster.showError(err);
                        }

                    } catch (error) {
                        msgMessage = lang_task.windowAddTask.eventMessageAdd;
                        Toaster.showMessage(msgMessage);
                    }

                },
                error: function () {
                    Toaster.showError(('API error'));

                }
            });
        },
        insertObserverTask: function (taskId) {
            try {
                var userList = "";
                var tbl = $(".observer-div-add-issue").getVal();

                for (let i = 0; i < tbl.length; i++) {
                    const o = tbl[i];
                    userList += o + ",";
                }
                if (!userList) {
                    return
                }
                callService('serviceTminsertTaskObserver', {
                    "fkTaskId": taskId,
                    "fkUserId": userList
                }, true, function () {
                    // getTaskkObserverList(global_var.current_task_id_4_comment)
                });
            } catch (error) {
               // console.log('task Observer ++++' + error);
            }


        },

        insertBacklogTaskDetail: function (taskId) {
            try {

                var data = {};
                data.fkTaskId = taskId;
                data.sendNotification = $("#sendnotification").is(":checked") ? "1" : "0";
                data.notificationMail = $("#sendnotification").is(":checked") ? "1" : "0";
                if($('#runTaskAvtivateSchedule').prop("checked")){
                    data.intensive = $("#run_task_intensive_select").val();
                    data.repeatInterval = $("#run_task_repeat_select").val();
                    data.scheduleStatus =  $("#runTaskAvtivateSchedule").is(":checked") ? "1" : "0";
                 
                    data.weekdays = getValueScheduleWeekDay('run_task_weekday_yearly_select');
                    data.remindMeParam = $("#run_task_reminder_select").val();
                    data.activateSchedule = $("#runTaskAvtivateSchedule").is(":checked") ? "1" : "0";
                    data.monthlyAction = getValueScheduleWeekAction('run_task_day_yearly_select');
                    data.actionDayOfMonth = $("#sdofm_day_of_Month_select").val();
                    data.startDate = toDate("taskDeadlineStartDade");
                    data.endDate = toDate("taskDeadlineEndDade");
                    data.runTime = GetConvertedTime("taskDeadlineStartTime");
                    
                 }
               

                callService('serviceRsCreateBacklogTaskDetail', data, true, function (res) {
                    // getTaskkObserverList(global_var.current_task_id_4_comment)
                   // AJAXCallFeedback(res);
                });
            } catch (error) {
                
            }


        },
        insertCheckListComulativ: function (taskId,itmList) {
            

            this.insertCheckListComulativCore(itmList, taskId);

        },
        insertCheckListComulativCore: function (list, taskId, type) {
            var data = {};
            data.fkTaskId = taskId;
            data.itemName = list;
            if (!list) {
                return
            }
            callService('serviceTmInsertSingleTaskCheckListCumulativeNew', data, true, function () {
                if (type === 'update') {
                    taskManagement.updateTask.getCheckListComulativ();
                }
            });
        },
        loadAssigneesByProjectDetails: function (res) {
                       return
           var elm  =  $('select.user_filter_element_selectpicker');
                elm.empty();
            try {
                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    var opt = $('<option>').val(o.fkUserId).text(o.userName);
                    elm.append(opt);

                }
            } catch (error) {

            }
            elm.append(opt);
            elm.selectpicker('refresh');

        }

    },
    updateTask: {
        genBlockModal: {
            Init: function () {
                $('body').find("#taskMgmtModal").remove();
                $('body').find(".modal-backdrop").remove();
                $('body').append(this.genModalSelfBlock());
              
                $("#taskMgmtModal select.update-selectpicker").selectpicker("refresh");
              return

            },
            genModalSelfBlock: function () {
                return `<div class="modal fade cs-modal-box ${notChwk()?"":"left  cs-modal-box story-card-modal"} TaskStoryCardPanel card-Userstory-detail" id="taskMgmtModal" tabindex="-1" role="dialog"
               aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document" style="max-width: 50%" id="taskMgmtModal-body">
                  <div class="modal-content">
                      <div class="justify-content-center modal-header task-modal-header">
                          <h6 class="modal-title task-modal-title ">
                              <span class="text card-UserStory-header-text-code"></span>
                          </h6>

                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <i class="cs-svg-icon x-close"></i>
                          </button>
                      </div>
                      <div class="modal-body issue-managment-add-task col-12">
                      <div class="row">  </div>
                      <div class="row"> 
                         <div class="col-lg-12">
                          ${this.genTitleBlock()}
                          ${this.genCheckListBlock()}
                         </div>
                      </div>
                      <div class="row">
                      <div class="col-lg-12 mt-0"> 
                          <div class="d-flex task-deadline-boxes">
                          ${this.genTaskDeadLineBlockTime()}
                          ${this.genTaskDeadLineBlockTask()}
                          ${this.genTaskDeadLineBlockEvent()}
                            </div>
                      </div>
                  </div>
                  <div class="row">
                  <div class="col-lg-12">
                  <div class="comment-seqment">
                  ${this.genTabBlock.Init()}
                    </div>
                   </div>
                  </div>
                      ${this.genNotifyButton()}
 

                      </div>
                      <div class="modal-footer">
                        <div class="d-flex w-100">
                            <div class="mr-auto">
                                <div class="assigne-div-update-issue" style="display:inline-block; margin-right:15px"></div>
                                <div class="observer-div-update-issue" style="display:inline-block"></div>
                            </div>
                            <div class="d-table" style="padding: 3px 0px;">
                            <button type="button" id="" onclick="nextModalpopUpShow(this)" class="cs-next-popup-btn btn btn-primary">---</button>
                            </div>
                        </div>


                  </div>
              </div>
          
          </div>`
            },
            genTitleBlock: function () {
                return ` <div class="cs-input-group mb-2">
                <div class="d-flex">
                    <div class="mr-auto" style="width: 93%;align-self:center;">
                        <div class="Story-card-Header-task">
                            <div class="card-UserStory-header">
                                <span class="card-UserStory-header-text"></span>
                                <div class="card-UserStory-header-edit position-relative" style="display: none; width: 100%;top: 0;height: 30px;">
                                    <input class="card-UserStory-header-input form-control" type="text" placeholder="${lang_task.windowAddTask.taskName}">
                                    <div class=" card-UserStory-header-accept TextHeader "
                                         onclick="updateTask4ShortChangeTaskName()" id="AcceptText" style="color: #38628a;background: #dfeef7;">
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <div class=" card-UserStory-header-delete TextHeader " id="DeleteText" style="color: #38628a;background: #dfeef7;">
                                        <i class="fas fa-times"></i>
                                    </div>
        
                                </div>                    
                            </div>
        
                                
                        </div>
                    </div>
                    <div class="p-0" style="margin-top: 3px;">
                        <div  id="updateTask-priority-btn"  class="priority-btn"><!-- if active ( class name -- active ) -->
                             <i class="cs-svg-icon flame"></i>
                        </div>
                    </div>
                </div>
            </div>`
            },
            genNextBlockPopUp:function (params) {
                return `<div class="cs-next-element-box d-none" id='nextBlockItemPopUp' style="position:fixed;">
                <div class="cs-next-element-box-in">
                   <div class="cs-next-element-box-bg">
                      <div class="d-flex">
                        <div class="mr-auto">
                          <div class="cs-input-group">
                            <select id="nextElementListSelect" class='update-selectpicker'>
                              <option value="ididit">${getOperName("ididit")}</option>
                              <option value="ForwardTaskTo">${getOperName("ForwardTaskTo")}</option>
                              <option value="rejectTask">${getOperName("rejectTask")}</option>
                              <option value="canceledTask">${getOperName("cancel")}</option>
                            </select>
                          </div>
                        </div>
                        <div class="">
                          <span class="cs-close-next-eb-btn"><i class="fa fa-close"></i></span>
                        </div>
                      </div>
                      <div class="cs-input-group" style="margin-top:10px">
                        <textarea class="form-control cs-nextTextarea" id="note"></textarea>
                      </div>
                      <div class="cs-input-group" style="margin-top:10px; text-align:right;">
                         <div style="display:inline;" class="forward-assignee-list d-none"></div>
                        <button class="btn cs-nextsave-btn">Yadda saxla</button>
                      </div>
                   </div>
                </div>
              </div>`
            },
            genCheckListBlock: function () {
                return `<div class="cs-input-group">
                <div class="task-check-list-box cs-box-background overflow-hidden">
                    <input type="text" class="form-control" id="updateCheckList" placeholder="${lang_task.windowAddTask.addCheckWords}" style="background: transparent; border-radius: 0;">
                    <ul>
                    </ul>
                </div>
            </div>`
            },
            genFileAddBlock: function () {
                return `<div class="cs-input-group">
                              
                <div class="row canvas_canvas commentsubmit-seqment" id=""
                     style="width:100%;padding:0px;margin:0px;">
                    <div class="col-12 text-center canvas_canvas_msg "
                         style='border: 1px dashed #525596;border-radius: 5px;color: #bbbbcf;'>
                        <h5>${lang_task.windowAddTask.copyPasteImg}</h5>
                    </div>
                </div>
                <div class="commentsubmit-seqment cm-file-upload-box ml-0 mr-0" >
                    <div data-toggle="tooltip" id="file1134"                                         
                         class=" tooltipMan component-class  
                         col-lg-12 hover-prototype-selector">
                         <span class="cs-btn-border">
                            <label class="cs-file-upload">
                                <input class="form-control saTypeFilePicherUploadFile component-input-class" 
                                    sa-type="filepicker"  type="file" value="" row-no="" 
                                    pdid="21112211275108954370" id="addComment4Task_addnewfile" 
                                    multiple="" 
                                    fname="">
                                    ${lang_task.windowAddTask.attachFile}
                            </label>
                         </span>
                        <div class="progress_bar_new" id="progress_bar_new"></div>
                    </div>
                </div>
            </div>`
            },
            genTaskDeadLineBlockTime: function () {
                return `<div class="mr-auto pl-0 pr-0 pb-2">
                <div class="row">
                    <div class="col-xl-12" style="display:contents">
                        <div class="col-lg-6 mt-3 cs-p-rem">
                            <div class="cs-input-group p-0">
                                <div class="input-group-addon">${lang_task.windowAddTask.startDate}</div>                                                 
                                <div class='cs-date-time d-flex'>
                                    <div>
                                        <div class="d-flex">
                                            <span class="input-group-icon">
                                                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                                            </span>
                                            <input type='text' id="taskDetailDeadlineStartDade"  class="form-control" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="d-flex">
                                            <span class="input-group-icon">
                                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                            </span>
                                            <input type='text' id="taskDetailDeadlineStartTime" class="form-control"  style="width:50px;" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-3 cs-p-rem">
                           <div class="cs-input-group p-0">
                                <div class="input-group-addon">${lang_task.windowAddTask.endDate}</div>
                                <div class='cs-date-time d-flex'>
                                    <div>
                                        <div class="d-flex">
                                            <span class="input-group-icon">
                                                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                                                </span>
                                                <input type='text' id="taskDetailDeadlineEndDade" class="form-control" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="d-flex">
                                            <span class="input-group-icon">
                                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                                </span>
                                                <input type='text' id="taskDetailDeadlineEndTime"  class="form-control" style="width:50px;" />
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                        
                        <div class="col-lg-6 mt-3 cs-p-rem">
                            <div class="cs-input-group p-0">
                                <div class="input-group-addon">${lang_task.windowAddTask.catagories}</div>
                                <select class="run_task_categories update-selectpicker issue_selectpicker" multiple  id="run_task_detail_detail_categories" data-live-search="true">
                                 
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-3 cs-p-rem">
                            <div class="cs-input-group p-0">
                                <div class="input-group-addon">Sprint</div>
                                <select class="run_task_sprint update-selectpicker issue_selectpicker" multiple id="run_task_detail_detail_sprint" data-live-search="true">
                                
                                </select>
                            </div>
                        </div>
                   </div>
                </div>
        </div>`
            },
            genTaskDeadLineBlockTask: function () {
                return `       <div class="p-2 mt-2 ml-4">
                <div class="">
                    <div class="cs-input-group">
                        <div class="input-group-addon">${lang_task.windowAddTask.task}</div>
                        <div class="tapshiriq-btn active" id="tapshiriq-d-btn">
                            <i class="cs-svg-icon tapshiriq"></i>
                            <i class="cs-svg-icon tapshiriq-light"></i>
                        </div>
                    </div>
                </div>
            </div> `
            },
            genTaskDeadLineBlockEvent: function () {
                return ` <div class="p-2 mt-2">
                <div class="">
                    <div class="cs-input-group">
                        <div class="input-group-addon">${lang_task.windowAddTask.meeting}</div>
                        <div class="toplanti-btn" id="toplanti-d-btn">
                            <i class="cs-svg-icon toplanti"></i>
                            <i class="cs-svg-icon toplanti-light"></i>
                        </div>
                    </div>
                </div>
            </div> `
            },
            genNotifyButton: function () {
                return `    <div class="row">
              <div class="col-12">
                  <hr>
              </div>
              <div class="col-12">
                  <div class="cs-input-group mt-2">
                      <label class="checkmarkcontainer">${lang_task.windowAddTask.confirmationNotification}
                          <input type="checkbox" onchange="updateTask4Details(this, 'sendNotification')" id="sendnotification_detail">
                          <span class="checkmark"></span>
                      </label>
                  </div>
              </div>
          </div> `
            },
            genTabBlock: {
                Init: function () {
                    var div = `
                     ${this.genTabHeader()}
                     <div class="tab-content" id="pills-tabContent" >
                     ${this.genCommentBlock()}
                     ${this.genDetailsBlock()}
                     ${this.genScheduleBlock()}
                     ${this.genObserverBlock()}
                     ${this.genSubtaskBlock()}
                     ${this.genEventBlock()}
                     </div>
                     `
                    return div
                },

                genTabHeader: function () {
                    return `<div class="d-flex" style=" border-top: 2px solid rgb(3 57 108 / 50%); padding-top: 10px; margin-top: 3px !important;">
                        <div class="d-schedule-dcbtn" style="display:none">
                            <div class="row">
                                <div class="col-lg-4 cs-flex-col flex-item mt-2">
                                    <div class="cs-input-group">
                                        <label class="switch bcs-swith">
                                            <input type="checkbox" id="runTaskStartDate_activateschedule">
                                            <span class="slider round">
                                                <small class="deactive">Deactive</small>
                                                <small class="active">Active</small>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ml-auto">
                            <ul class="nav nav-pills mb-3 mt-2" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link active" id="d-comments-tab" data-toggle="tab" href="#d-task-tab0" role="tab" aria-controls="task-tab1" aria-selected="true"><i class="cs-svg-icon comment"></i> <span>${lang_task.windowUpdateTask.comment}</span></a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link d-task-tab2" id="d-schedule-tab" data-toggle="tab" href="#d-task-tab2" role="tab" aria-controls="task-tab2" aria-selected="false"><i class="cs-svg-icon schedule"></i> <span>${lang_task.windowAddTask.schedule}</span></a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link loadUserForSubtask" id="d-subtask-tab" data-toggle="tab" href="#d-task-tab5" role="tab" aria-controls="task-tab5" aria-selected="false"><i class="cs-svg-icon subtask-light"></i> <span>${lang_task.windowUpdateTask.subtask}</span></a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link" id="d-details-tab" data-toggle="tab" href="#d-task-tab1" role="tab" aria-controls="task-tab1" aria-selected="true"><i class="cs-svg-icon details"></i> <span>${lang_task.windowAddTask.details}</span></a>
                                </li>
                                
                                <li class="nav-item" role="presentation">
                                     <a class="nav-link" id="d-ivents-tab" data-toggle="tab" href="#d-task-tab6" role="tab" aria-controls="task-tab6" aria-selected="false"><i class="cs-svg-icon chat-alt"></i> <span>Chat</span></a>
                                </li>
                                <li class="nav-item" role="presentation">
                                <a class="nav-link" id="d-ivents-tab" data-toggle="tab" href="#d-task-tab6" role="tab" aria-controls="task-tab6" aria-selected="false"><i class="cs-svg-icon hour-02"></i> <span>${lang_task.windowAddTask.events}</span></a>
                                </li>
                             </ul>
                        </div>
                    </div>`
                },
                genCommentBlock: function () {
                    return `<div class="tab-pane fade active show cs-box-background" id="d-task-tab0" role="tabpanel" aria-labelledby="pills-d-task-tab4">
                    <div class="cs-input-group mb-3 mt-0">
                        <div class="commentwritepanel">
                            <div class="input-group-addon">Description</div>
                            <textarea name="commentinput" id="addComment4Task_comment" class="commentinput addComment4Task_comment form-control cs-taskcomment-textarea" placeholder="Add a comment.." rows="1"></textarea>
                           
                            <div class="row canvas_canvas commentsubmit-seqment" id="canvasdiv_comment"
                                 style="width:100%;display: none; padding:0px;margin:0px;">
                                <div class="col-12 text-center canvas_canvas_msg "
                                     style='border: 1px dashed #ffffff52;border-radius: 5px;color: white;'>
                                    <h5 class="copy-title">Copy and Paste Image Here</h5>
                                </div>
                            </div>
                            <div class="commentsubmit-seqment cm-file-upload-box ml-0 mr-0 d-flex " style="display: none;">

                                <div class="acceptcomment flex-fill mr-1">
                                    <button class="btn btn-primary" type="submit"
                                            onclick="new UserStory().addTaskCommentToTask(this)">Add</button>
                                </div>
                           
                                <input id="file11" class="us-file-upload commentsubmit-seqment flex-fill  " 
                                       multiple="" type="file" file_type="general" value="" onchange1="new UserStory().addFileForTaskComment()">
                            </div>
                        </div>
                    </div>
                    <div class="comment-body"></div>
                </div>`
                },
                genDetailsBlock: function () {
                    return `   <div class="tab-pane fade cs-box-background" id="d-task-tab1" role="tabpanel" aria-labelledby="pills-d-task-tab1">

                    <div class="col-lg-12">
                        <div class="row">
                            
                            <div class="col-lg-6 statusCardStory mb-3">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Task Nature</label>
                                    <!-- <span class="comment-content-header-history" style="margin-left: 0px;">Task Nature</span> -->
                                    <div class="form-group">
                                        <select class="form-control update-selectpicker task-info-modal-nature issue_selectpicker" style="width:auto"
                                                onchange="updateTask4ShortChange(this, 'taskNature')" id="task-info-modal-nature">
                                            <option value='new'><span
                                                class="us-item-status-new comment-content-header-status">New Request</span>
                                            </option>
                                            <option value='change'> <span
                                                class="us-item-status-ongoing comment-content-header-status" id="">Change
                                                Request</span></option>
                                            <option value='bug'><span
                                                class="us-item-status-closed comment-content-header-status" id="">Bug</span>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 statusCardStory task-mgmt-tasktype mb-3" id='task-mgmt-tasktype'>
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Task Type</label>
                                    <!-- <span class="comment-content-header-history" style="margin-left: 0px;">Task Type</span> -->
                                    <div class="form-group">

                                        <select class="form-control update-selectpicker task-info-modal-tasktype issue_selectpicker" style="width:auto"
                                                onchange="updateTask4ShortChange(this, 'fkTaskTypeId')"
                                                id="task-info-modal-tasktype">


                                        </select>
                                    </div>
                                </div>            
                            </div>

                            <div class="col-lg-6  mt-2">
                            <div class="cs-input-group">
                                    <select class="form-control issue_selectpicker" data-live-search="true" data-actions-box="true"
                                            style="text-overflow: ellipsis" onchange='' id='bug_filter_project_id_detail'
                                            title="${lang_task.rightBar.project}"></select>
                                </div>
                            </div>
                    
                            <div class="col-lg-6 mt-2">
                                <div class="cs-input-group">
                                    <select class="form-control bug-mgmt-filter-select issue_selectpicker " data-actions-box="true" onchange=''
                                            data-live-search="true" id='bug_filter_backlog_id_detail' title="${lang_task.rightBar.storyCart}">
                                    </select>
                                </div>
                            </div>
                         
                        </div>
                        <hr>
                        <div class="row addEpicTask">           
                            <div class="col-lg-12">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Story Card | </label>
                                    <span>
                                        <a href="#" class="cs-history-links comment-content-header-history" onclick="showUserStoryOfTaskCardModal(this)" id='task-mgmt-modal-user-story'></a>
                                        <a href="#" class="cs-history-links btn comment-content-header-history mb-1" onclick="changeUserStoryOfTaskModal()"><i class="fas fa-exchange-alt"></i> Change</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr>
                 
                        <div class="row">
                            <div class="col-md-12">
                                <div class="cs-forum-group addEpicTask mt-0">
                                    <div class="dropdown-task show">
                                        <span href="#" class="comment-content-header-history">
                                            Sprint<br>
                                        </span>

                                        <span class="comment-content-header-history task-mgmt-modal-sprintname"
                                              style="color:black;" id="task-mgmt-modal-sprintname">

                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-4 estimateHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Estimated Hour(s)</label>
                                    <input placeholder="None" onchange="updateTask4ShortChange(this, 'estimatedHours')"
                                           class="taskEstimationHoursInput estimateHourseInput form-control cs-input" type="number" name=""
                                           id="">
                                </div>
                            </div>
                            <div class="col-4 spentHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Spent Hour(s)</label>
                                    <input placeholder="None" class="taskSpentHoursInput estimateHourseInput form-control cs-input"
                                           onchange="updateTask4ShortChange(this, 'spentHours')" type="number" name="" id="">
                                </div>
                            </div>
                            <div class="col-4 estimateHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Estimated Counter</label>
                                    <input placeholder="None" onchange="updateTask4ShortChange(this, 'estimatedCounter')"
                                           class="taskEstimatedCounterInput estimateHourseInput form-control cs-input" type="number" name=""
                                           id="">
                                </div>
                            </div>
                            <div class="col-4 spentHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Executed Counter</label>
                                    <input placeholder="None" class="taskExecutedCounterInput estimateHourseInput form-control cs-input"
                                           onchange="updateTask4ShortChange(this, 'executedCounter')" type="number" name="" id="">
                                </div>
                            </div>
                            <div class="col-4 estimateHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Estimated Budget</label>
                                    <input placeholder="None" onchange="updateTask4ShortChange(this, 'estimatedBudget')"
                                           class="taskEstimatedBudgetInput estimateHourseInput form-control cs-input" type="number" name=""
                                           id="">
                                </div>
                            </div>
                            <div class="col-4 spentHours">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Spent Budget</label>
                                    <input placeholder="None" class="taskSpentBudgetInput estimateHourseInput form-control cs-input"
                                           onchange="updateTask4ShortChange(this, 'spentBudget')" type="number" name="" id="">
                                </div>
                            </div>
                        </div>


                        <!-- <div class="statusCardStory">
                            <span  class="comment-content-header-history" style="margin-left: 0px;">Change Version</span>
                            <div class="form-group statusSelectSelect">
        
                                <select class="form-control issue_selectpicker" 
                                        style="width:auto"
                                        onchange="updateTask4ShortChange(this, 'taskVersion')"
                                        id="task-info-change-version">
        
        
                                </select>
                            </div>
        
                        </div>-->
                    </div>
                </div>`
                },
                genScheduleBlock: function () {
                    return ` <div class="tab-pane fade run-shedule-elements task-tab2 cs-box-background" id="d-task-tab2" role="tabpanel" aria-labelledby="task-tab2-tab">
                    <div class="row rsoon">
                       <div class="col-lg-3 pr-0 mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.reapeatEvery}</div>
                                <input class="form-control" name="run_task_repeat_select" id='run_task_repeat_select_detail' onchange="updateTask4Details(this, 'repeatInterval')" type="number" required>
                            </div>
                        </div>
                    
                        <div class="col-lg-4 pr-0 mt-2">
                             <div class="cs-input-group">
                                 <div class="input-group-addon">${lang_task.windowAddTask.intensive}</div>
                                 <select class="issue_selectpicker" onchange="updateTask4Details(this, 'intensive')" name="run_task_intensive_select" id='run_task_intensive_select_detail' data-live-search="true">
                                     <option value="weekly">${lang_task.windowAddTask.weekly}</option>
                                     <option value="monthly">${lang_task.windowAddTask.monthly}</option>
                                     <option value="yearly">${lang_task.windowAddTask.yearly}</option>
                                 </select>
                             </div>
                        </div>                
                        <div class="col-lg-5  mt-2">
                             <div class="cs-input-group">
                                 <div class="input-group-addon">${lang_task.windowAddTask.selectReminder}</div>
                                 <select class="issue_selectpicker" name="run_task_repeat_select" onchange="updateTask4Details(this, 'remindMeParam')"  id='run_task_reminder_select_detail' data-live-search="true">
                                     <option value="at_start_time">At start time</option>
                                     <option value="5_minutes_before">5 minutes before</option>
                                     <option value="10_minutes_before">10 minutes before</option>
                                     <option value="15_minutes_before">15 minutes before</option>
                                     <option value="20_minutes_before">20 minutes before</option>
                                     <option value="25_minutes_before">25 minutes before</option>
                                     <option value="30_minutes_before">30 minutes before</option>
                                     <option value="45_minutes_before">45 minutes before</option>
                                     <option value="1_hour_before">1 hour before</option>
                                     <option value="2_hours_before">2 hours before</option>
                                     <option value="3_hours_before">3 hours before</option>
                                     <option value="12_hours_before">12 hours before</option>
                                     <option value="24_hours_before">24 hour before</option>
                                     <option value="2_days_before">2 days before</option>
                                     <option value="1_week_before">1 week before</option>
                                 </select>
                             </div>
                         </div>
                       
                    </difv>
                    </div>
                   
                    <div class="row rsoon weekly-and-monthly-actions run-intensive run-enabled">
                 
                        <div class="col-lg-12 cs-col-padding mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">${lang_task.windowAddTask.weekDay}</div>
 
                                 <div class="cs-horizontal-checkboxes" id="run_task_weekday_select_detail">
                                     <label><input type="checkbox" value="monday" ><span>Monday</span></label>
                                     <label><input type="checkbox" value="tuesday" ><span>Tuesday</span></label>
                                     <label><input type="checkbox" value="wednesday" ><span>Wednesday</span></label>
                                     <label><input type="checkbox" value="thursday" ><span>Thursday</span></label>
                                     <label><input type="checkbox" value="friday" ><span>Friday</span></label>
                                     <label><input type="checkbox" value="saturday" ><span>Saturday</span></label>
                                     <label><input type="checkbox" value="sunday" ><span>Sunday</span></label>
                                 </div>
 
                            </div>
                        </div>
                    </div>
                    <div class="row rsoon monthly-actions  run-intensive">
                         <div class="col-lg-9 mt-2">
                                 <div class="cs-input-group">
                                     <div class="input-group-addon">Ay həftəsi</div>
                                         <div class="cs-horizontal-checkboxes" id="run_task_day_yearly_select_detail">
                                             <label><input type="checkbox" value="1_week" ><span>1-ci həftə</span></label>
                                             <label><input type="checkbox" value="2_week" ><span>2-ci həftə</span></label>
                                             <label><input type="checkbox" value="3_week" ><span>3-cü həftə</span></label>
                                             <label><input type="checkbox" value="4_week" ><span>4-cü həftə</span></label>
                                             <label><input type="checkbox" value="last_week" ><span>Last week</span></label>
                                         </div>
                                 </div>
                             </div>
                             <div class="col-lg-3 pl-0 mt-2">
                                 <div class="cs-input-group">
                                     <div class="input-group-addon">Gün:</div>
                                     <select onchange='updateTask4Details(this,"actionDayOfMonth")' class="issue_selectpicker" name="sdofm_day_of_Month_select" id="sdofm_day_of_Month_select_detail" data-live-search="true" tabindex="null">
                                     <option value="1">1</option>
                                     <option value="2">3</option>
                                     <option value="3">3</option>
                                     <option value="4">4</option>
                                     <option value="5">5</option>
                                     <option value="6">6</option>
                                     <option value="7">7</option>
                                     <option value="8">8</option>
                                     <option value="9">9</option>
                                     <option value="10">10</option>
                                     <option value="11">11</option>
                                     <option value="12">12</option>
                                     <option value="13">13</option>
                                     <option value="14">14</option>
                                     <option value="15">15</option>
                                     <option value="16">16</option>
                                     <option value="17">17</option>
                                     <option value="18">18</option>
                                     <option value="19">19</option>
                                     <option value="20">20</option>
                                     <option value="21">21</option>
                                     <option value="22">22</option>
                                     <option value="23">23</option>
                                     <option value="24">24</option>
                                     <option value="25">25</option>
                                     <option value="26">26</option>
                                     <option value="27">27</option>
                                     <option value="28">28</option>
                                     <option value="29">29</option>
                                     <option value="30">30</option>
                                     <option value="31">31</option>
                                 </select>
                                 </div>
                             </div>
                       
                    </div>
                    <div class="row rsoon yearly-actions run-intensive">
                      
                    </div>
                </div>`
                },
                genObserverBlock: function () {
                    return ""
                    return `  <div class="tab-pane fade cs-box-background" id="d-task-tab4" role="tabpanel" aria-labelledby="pills-d-task-tab4">
                 <div class="cs-input-group mb-3 ml-2">
                     <div class="input-group-addon">Observer Name</div>
                     <div class="task-check-list-observer p-0 mt-1 mb-3">
                         <!-- <button class='btn loadUserForObserver'>Load User</button> -->
                         <select class="form-control issue_selectpicker" id="updatetask_oblerverlist issue_selectpicker"></select>
                         <button class='btn addObserverToTAskUpdate'><i class="fas fa-plus" aria-hidden="true"></i> Add Observer</button>
                     </div>
                     <div class="task-observer-list">

                     </div>
                 </div>
             </div>`
                },
                genSubtaskBlock: function () {
                    return `<div class="tab-pane fade cs-box-background" id="d-task-tab5" role="tabpanel" aria-labelledby="pills-d-task-tab5">

                    <div class="col-lg-12 pl-0 pr-0">
                        <table class="table-hover splited1 bugListTable subtask-table parent-task" style="width: 100%;">
                            <thead>
                                <tr>
                                <th><i class="cs-svg-icon numbers"></i></th>
                                <th><i class="cs-svg-icon id"></i></th>
                                <th><i class="cs-svg-icon deadline"></i></th>
                                <th><i class="cs-svg-icon status"></i></th>
                                    <th>Parent Task <a href="#" class="comment-content-header-history" onclick="changeParentTaskModal()" style="color: #03396c">
                                            <i class="fas fa-plus" aria-hidden="true"></i>
                                        </a></th>
                                         
                                <th><i class="cs-svg-icon task-user-1"></i></th>                                                  
                                <th><i class="cs-svg-icon task-user-2"></i></th>                                                  
                                <th><i class="cs-svg-icon calendar-01-dark"></i></th> 
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>

                        <!-- <div class="cs-input-group">
                             <div class="dropdown-task show">
                                 <a href="#" class="btn comment-content-header-history" onclick="changeParentTaskModal()">
                                     Parent Task<br>
                                 </a>

                                 <a class="btn comment-content-header-history task-mgmt-modal-parent-task"
                                     onclick="shiftTaskInfoOnTaskInfoModal(this)"
                                     id='task-mgmt-modal-parent-task'>
                             </a>
                             </div>
                        </div> -->
                    </div>


                    <div class="col-lg-12 mt-3 pl-0 pr-0">
                        <table class="table-hover splited1 bugListTable subtask-table task-mgmt-modal-child-task" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th><i class="cs-svg-icon numbers"></i></th>
                                    <th><i class="cs-svg-icon id"></i></th>
                                    <th><i class="cs-svg-icon deadline"></i></th>
                                    <th><i class="cs-svg-icon status"></i></th>
                                    <th>Child Task
                                    <a href="#" class='comment-content-header-history' id="add-child-task-open-modal" style="color: #03396c;">
                                     <i class="fas fa-plus" aria-hidden="true"></i>
                                     </a></th>  
                                    <th><i class="cs-svg-icon task-user-1"></i></th>                                                  
                                    <th><i class="cs-svg-icon task-user-2"></i></th>                                                  
                                    <th><i class="cs-svg-icon calendar-01-dark"></i></th>                                                  
                                  
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="cs-input-group">
                           
                         <!-- <div class="dropdown-task show">
                             <a href="#" class="btn comment-content-header-history">
                                 <i class="fas fa-plus" aria-hidden="true"></i>
                             </a>

                             <a class="btn comment-content-header-history task-mgmt-modal-child-task"
                                 id='task-mgmt-modal-child-task'>
                         </a>
                         </div> -->
                        </div>
                    </div>
                </div>`
                },
                genEventBlock: function () {
                    return `   <div class="tab-pane fade task-events-updated cs-box-background" id="d-task-tab6" data-taskId="" role="tabpanel" aria-labelledby="pills-d-task-tab6">  
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="toggle-body-item toggle-top-box-5 " style="display: block;">
                                <div class="d-flex border-bottom-1px pb-1 mt-2 mb-1">
                                    <div class="mr-auto toggle-body-title">
                                        <div class="result-box">
                                            <img class="rounded-circle" src="https://test.sourcedagile.com/api/get/files/shekil1_77A7F3AC232D5.png" style="width: 33px; height: 33px; border: 1px solid rgb(3, 57, 108);" />
                                            <span class="toggle-datatime">26.11.2021  13:42:36</span>
                                        </div>
                                    </div>
                                    <div class="toggle-min-elements">
                                        <a class="cs-url"><i class="cs-svg-icon fullscreen"></i></a>
                                        <a data-link="5" class="cs-url toggle-btn active"><i class="fal fa-angle-down" aria-hidden="true"></i></a>
                                    </div>
                                </div>
                                <div class="toggle-box-5 table-box" orderno="7.3" style=" overflow: auto; height: calc(250px - 0px); padding: 0px !important;">
                                    <table class="table cst-table-hover tablePaginatione component-input-class mb-0" id="taskListCW" style="width: 100% !important;">
                                        <thead>
                                            <tr>
                                                <th class="text-center" style="width:46px"><i class="cs-svg-icon numbers"></i>
                                                </th>
                                                
                                                <th class="text-center cst-a-font"><label href="#" class="component-class">Tip</label> <span class="handle-drag"></span>
                                                </th>

                                                <th class="text-center cst-a-font"><label href="#" class="component-class">Ad</label> <span class="handle-drag"></span>
                                                </th>

                                                <th class="text-center cst-a-font"><label href="#" class="component-class">Tarix</label> <span class="handle-drag"></span>
                                                </th>
                                                <th class="text-center cst-a-font"><label href="#" class="component-class">Saat</label> <span class="handle-drag"></span>
                                                </th>

                                                <th class="text-center">
                                                    <label href="#" class="component-class"><i class="cs-svg-icon task-user-2"></i></label>
                                                    <span class="handle-drag"></span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="redirectClass" style="width: 46px;">
                                                <td class="text-center brend-color" style="width: 20px;">1</td>
                                                
                                                <td class="text-center" style="width: 170px;">
                                                    <a href="#" class="brend-color">Tapşırıq</a>
                                                </td>

                                                <td class="text-center" style="width: 170px;">
                                                    <a href="#" class="brend-color">Tapşırıq</a>
                                                </td>
                                                <td class="text-center" style="padding-left: 5px; max-width: 1px;">
                                                    <a href="#" class="brend-color">24.11.2021</a>
                                                </td>
                                                <td class="text-center" style="padding-left: 5px; max-width: 1px;">
                                                    <a href="#" class="brend-color">15:41:43</a>
                                                </td>
                                            <td class="text-center" style="width: 80px;">
                                                    <img class="rounded-circle personal-btn-img js-btn-popover--custom" src="https://media-exp1.licdn.com/dms/image/C5603AQFaISdrl8b82g/profile-displayphoto-shrink_100_100/0/1517498104463?e=1645660800&amp;v=beta&amp;t=naVWBpYIQlj23vvvkG1BdrfsiD7d8_Q7FhXV1yiFptg" data-placement="left" data-toggle="popover" data-trigger="hover" sa-selectedfield="fkAssigneeId" style="width: 22px; height: 22px; border: 1px solid rgb(3, 57, 108);" data-original-title="" title="">
                                                </td>
                                            </tr>
                                            <tr class="redirectClass" style="width: 46px;">
                                                <td class="text-center brend-color" style="width: 20px;">2</td>
                                                
                                                <td class="text-center" style="width: 170px;">
                                                    <a href="#" class="brend-color">Əməliyyat</a>
                                                </td>
                                                <td class="text-center" style="width: 170px;">
                                                    <a href="#" class="brend-color">Əməliyyat</a>
                                                </td>
                                                <td class="text-center" style="padding-left: 5px; max-width: 1px;">
                                                    <a href="#" class="brend-color">24.11.2021</a>
                                                </td>
                                                <td class="text-center" style="padding-left: 5px; max-width: 1px;">
                                                    <a href="#" class="brend-color">15:41:43</a>
                                                </td>
                                                <td class="text-center" style="width: 80px;">
                                                    <img class="rounded-circle personal-btn-img" src="https://media-exp1.licdn.com/dms/image/C5603AQFaISdrl8b82g/profile-displayphoto-shrink_100_100/0/1517498104463?e=1645660800&amp;v=beta&amp;t=naVWBpYIQlj23vvvkG1BdrfsiD7d8_Q7FhXV1yiFptg" data-placement="left" data-toggle="popover" data-trigger="hover" style="width: 22px; height: 22px; border: 1px solid rgb(3, 57, 108);" data-original-title="" title="">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                },
            }
        },
        callTaskCard4BugTask: function (el, projectId, taskId) {
            taskManagement.updateTask.genBlockModal.Init();
             loadBugTaskDeadlineScripts(); 
               $("#taskMgmtModal").modal("show");
               $(".card-UserStory-header-text-code").html(getTaskCode(taskId));
               let headerText = $(el).html();
               $(".card-UserStory-header-text").html(headerText);
               $("#task-info-modal-status").val(coreBugKV[taskId].taskStatus);
                $("#task-info-modal-status").selectpicker('refresh');
                $("#task-mgmt-create-by>img").attr('src', fileUrl(coreBugKV[taskId].createByImage));
                $("#task-mgmt-create-by>span").text(coreBugKV[taskId].createByName);
                $('#taskDetailDeadlineStartDade').val(Utility.convertDate(coreBugKV[taskId].startDate,'-'));
                $('#taskDetailDeadlineStartTime').val(Utility.convertTime(coreBugKV[taskId].startTime,'-'));
                $('#taskDetailDeadlineEndTime').val(Utility.convertTime(coreBugKV[taskId].endTime,'-'));
                $('#taskDetailDeadlineEndDade').val(Utility.convertDate(coreBugKV[taskId].endDate,'-'));
                if (coreBugKV[taskId].isMeet === '1') {
                    changeMeetAndTask($("#toplanti-d-btn"),'1');
                    $(".card-UserStory-header-text-code").html("Toplantı-"+coreBugKV[taskId].orderNoSeq+"");
                } else {
                    changeMeetAndTask($("#tapshiriq-btn"),'0');
                    $(".card-UserStory-header-text-code").html("Tapşırıq-"+coreBugKV[taskId].orderNoSeq+"");
                }
            
                //set backlog infos
                if (coreBugKV[taskId].taskPriority === '9') {
                    $("#updateTask-priority-btn").addClass("active");
                } else {
                    $("#updateTask-priority-btn").removeClass("active");
                }
                $('#addComment4Task_comment').autoHeight();
                if (coreBugKV[taskId].backlogName) {
                    $('#taskMgmtModal').find('#task-mgmt-modal-user-story')
                        .attr('pid', coreBugKV[taskId].fkBacklogId)
                        .html(coreBugKV[taskId].backlogName);
                }
                cmpList.userBlock.Init($('.assigne-div-update-issue'),'single');
                cmpList.userBlock.Init($('.observer-div-update-issue'),'multi');
                cmpList.userBlock.Init($('.forward-assignee-list'),'single');
         

         setTimeout(() => {
             
          
        if (!taskId) {
            return;
        }
        global_var.active_canvas = 'comment';
        global_var.current_issue_id = taskId;
        Utility.addParamToUrl('current_issue_id', global_var.current_issue_id);
        /*   global_var.current_issue_is_hide = "0";
          Utility.addParamToUrl('current_issue_is_hide', global_var.current_issue_is_hide); */

        //Task card-da Story Card-linke basanda istifade edilir.
        var dwlmt = $('#task-info-modal-tasktype')
        taskManagement.add_loadTaskType_bug_list(dwlmt, 'load');
        if (projectId !== global_var.current_project_id) {
            global_var.current_project_id = projectId;
            new UserStory().refreshBacklog4Bug(true);
        }
        $(".assigne-div-update-issue").getVal(coreBugKV[global_var.current_issue_id].fkAssigneeId);
        this.getLabelTask($('#run_task_detail_detail_categories'));
        this.getSprintTask($('#run_task_detail_detail_sprint'));
        this.getTaskSpirntList(taskId)
        this.getTaskLabelList(taskId)

        getProjectUsers();    
        
        loadTaskInfoToContainer(taskId, projectId);
        taskManagement.updateTask.genCommentListOfTask();
        taskManagement.updateTask.updateBacklogTaskDetail(taskId);
        
        this.getCheckListComulativ(taskId);
        this.getTaskObserverList(taskId);

        this.getTaskEvent(taskId);
        getChildTasks();
        getParentTask();
         }, 700);
            

        },
        updateEventByTaskId: function (id) {

            var json = initJSON();
            json.kv.fkTaskId = id;
            json.kv.mezmun = $('#ivent-mezmun').val();
            json.kv.struktur = $('#ivent-struktur').val();
            json.kv.nov = $('#ivent-nov').val();
            json.kv.mesulShexs = $('#ivent-mesulShexs').val();
            json.kv.istirakci = $('#ivent-istirakci').val();
            json.kv.kontragent = $('#ivent-kontragent').val();
            json.kv.yer = $('#ivent-yer').val();
            json.kv.qeyd = $('#ivent-qeyd').val();


            // json.kv.filename = zipfilename;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceRsCreateBacklogTaskEvent",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    //  var dataurl = urlGl + 'api/get/files/' + res.kv.filename;
                    try {
                        var err = res.err.message;
                        if (err) {
                            Toaster.showError(err);
                        }

                    } catch (error) {
                        msgMessage = 'Events successfully created!';
                        Toaster.showMessage(msgMessage);
                    }

                },
                error: function () {
                    Toaster.showError(('API error'));

                }
            });
        },
        updateObserverTask: function (taskId, val) {
            try {

                var that = this;
                callService('serviceTminsertTaskObserver', {
                    "fkTaskId": taskId,
                    "fkUserId": val
                }, true, function () {
                   // that.getTaskObserverList(taskId);
                });
            } catch (error) {
                console.log('task Observer ++++' + error);
            }


        },
        updateBacklogTaskDetail: function (taskId) {
            try {

                var data = {};
                data.fkTaskId = taskId;               
                callService('serviceRsGetBacklogTaskListByTaskId', data, true, function (res) {
                    // getTaskkObserverList(global_var.current_task_id_4_comment)
                    AJAXCallFeedback(res);
                    console.log(res);
                    try {
                        const  o  = res.tbl[0].r[0];
                        console.log(o);
                        $("#runTaskStartDate_activateschedule").prop("checked",o.scheduleStatus==='1'?true:false);
                        changeModeSchedule4Update(o.intensive);
                        $("#sendnotification_detail").prop("checked",o.sendNotification==='1'?true:false);
                        $("#runTaskStartDate_activateschedule").change();
                        $("#run_task_intensive_select_detail").val(o.intensive)
                                                              .selectpicker("refresh");
                        $("#run_task_repeat_select_detail").val(o.repeatInterval);
                        $("#run_task_reminder_select_detail").val(o.remindMeParam)
                                                             .selectpicker("refresh");
                        $("#sdofm_day_of_Month_select_detail").val(o.actionDayOfMonth)
                                                             .selectpicker("refresh");
                        setValueScheduleWeekDay("run_task_weekday_yearly_select_detail",o.weekdays);
                        setValueScheduleWeekDay("run_task_day_yearly_select_detail",o.monthlyAction);
                        
                    } catch (error) {
                        console.log(error);
                    }
                   
                });
            } catch (error) {
                
            }



        },
        getCheckListComulativ: function (taskId) {
            if (!taskId && !global_var.current_task_id_4_comment) {
                return;
            }

            global_var.current_task_id_4_comment = (taskId) ?
                taskId :
                global_var.current_task_id_4_comment;
            var json = initJSON();
            json.kv.fkTaskId = global_var.current_task_id_4_comment;
            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmGetTaskCheckList",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    that.getTaskCheckListDetails(res)
                },
                error: function () {
                    //                alert("error");
                }
            });
        },
        getTaskCheckListDetails: function (res) {
            var userList = {};
            try {
                var idx = getIndexOfTable(res, "userList");
                var objUser = res.tbl[idx].r;
                for (var k in objUser) {
                    var o2 = objUser[k];
                    userList[o2.id] = o2;
                }
            } catch (err) {}


            var ul = $('.task-check-list-box ul')
            ul.html('');

            try {
                var idy = getIndexOfTable(res, "tmBacklogTaskCheckList");
                var obj = (res && res.tbl && res.tbl.length > 0) ? res.tbl[idy].r : [];
                for (var n = 0; n < obj.length; n++) {
                    var o = obj[n];
                    var createdBySpan = (o.createdBy && userList[o.createdBy]) ?
                        $('<span>')
                        .attr('title', 'Created By')
                        .append($('<img>')
                            .attr('width', '40px')
                            .addClass('Assigne-card-story-select-img created')
                            .attr('src', fileUrl(userList[o.createdBy].userImage))
                            .attr('data-placement', 'top')
                            .attr('data-trigger', 'hover')
                            .attr('data-toggle', 'popover')
                            .attr('data-content', userList[o.createdBy].userPersonName + ' / ' + Utility.convertDate(o.createdDate) + '  ' + Utility.convertTime(o.createdTime))
                            .attr('data-title', 'Created By')
                        ) :
                        '';

                    var updatedBySpan = (o.updatedBy && userList[o.updatedBy]) ?
                        $('<span>')
                        .attr('title', 'Updated By')
                        .append($('<img>')
                            .attr('width', '40px')
                            .addClass('Assigne-card-story-select-img updated')
                            .attr('src', fileUrl(userList[o.updatedBy].userImage))
                            .attr('data-placement', 'top')
                            .attr('data-trigger', 'hover')
                            .attr('data-toggle', 'popover')
                            .attr('data-content', userList[o.updatedBy].userPersonName + ' | ' + Utility.convertDate(o.updatedDate) + '  ' + Utility.convertTime(o.updatedTime))
                            .attr('data-title', 'Updated By')
                        ) :
                        '';

                    var tr = $("<li class='d-flex'>")
                        .addClass((o.isChecked === '1') ? 'on-checked' : '')
                        .append($('<div class="item-checkbox">')
                            .append($('<label class="checkmarkcontainer">')
                                .append($('<input>')
                                    .addClass("taskCheckListItemToggle noteCheckListItem")
                                    .attr("oid", o.id)
                                    .attr('type', 'checkbox')
                                    .attr("checked", (o.isChecked === '1') ? true : false))
                                .append('<span class="checkmark"></span>')))
                        .append($('<div>')
                            .addClass('mr-auto w-100')
                            .addClass((o.isChecked === '1') ? 'text-checked' : '')
                            .append($('<textarea>')
                                .attr('rows', '1')
                                .addClass('form-control')
                                .attr("oid", o.id)
                                .addClass("updateTaskcheckListItemName")
                                .val(o.itemName)))
                        .append($('<div>')
                            .addClass('pl-1 p2-1')
                            .append(createdBySpan))
                        .append($('<div>')
                            .addClass('pl-1 p2-1')
                            .append(updatedBySpan))

                        .append($('<div>')
                            .addClass('pl-1 p2-1 d-table')
                            .append($('<a href="#">')
                                .attr('oid', o.id)
                                .addClass("taskCheckListItemDelete")
                                .append('<i class="fas fa-trash-alt" aria-hidden="true"></i>')));
                    ul.append(tr);

                }
                setTimeout(() => {
                    $('.updateTaskcheckListItemName').autoHeight();
                }, 200);
                $('[data-toggle=popover]').popover({
                    html: true,
                    trigger: "hover"
                });
            } catch (error) {

            }

        },
        getTaskObserverList: function (taskId) {
            $('.task-observer-list').html('')
            var that = this
            callService('serviceTmgetTaskkObserverList', {
                "fkTaskId": taskId
            }, true, function (res) {
                that.getTaskkObserverListDetaisl(res);
            });
        },

        getTaskkObserverListDetaisl: function (res) {
        /*     var userList = {};
            try {
                var idx = getIndexOfTable(res, "userList");
                var objUser = res.tbl[idx].r;
                for (var k in objUser) {
                    var o2 = objUser[k];
                    userList[o2.id] = o2;
                }
            } catch (err) {}
 */
/* 
            var div = $('.task-observer-list');
            div.html('')

            var table = $('<table>')
                .addClass('table table-hover project-table-list defaultTable sar-table');
            table.append($('<thead>')
                .append($("<tr>")
                    .append($("<th>")
                        .css("width", "1%")
                        .text("#"))
                    .append($('<th>')
                        .text("Observer"))
                )
            )
 */
            try {
                var idy = getIndexOfTable(res, "tmBacklogTaskObserver");
                var obj = (res && res.tbl && res.tbl.length > 0) ? res.tbl[idy].r : [];
                var ts  =  []
                for (var n = 0; n < obj.length; n++) {
                    var o = obj[n];
                        ts.push(o.fkUserId)
                   // var lst = o.fkUserId.split(',');
                   
                  /*   for (let l = 0; l < lst.length; l++) {
                        const k = lst[l];
                        var userSpan = (k && userList[k]) ?
                            $('<span>')
                            .attr('title', 'Observer ')
                            .addClass('peronal-info')
                            .append($('<img>')
                                .addClass('Assigne-card-story-select-img')
                                .attr('width', '40px')
                                .attr('src', fileUrl(userList[k].userImage)))
                            .append($('<span>').text(userList[k].userPersonName))

                            :
                            '';

                        var tr = $("<tr>")
                            .append($('<td>').text((parseFloat(l) + 1)))
                            .append($('<td>')
                                .append(userSpan))
                            .append($('<td>')
                                .append($('<a href="#">')
                                    .attr('oid', o.id)
                                    .addClass("taskObserverDelete")
                                    .append('<i class="fas fa-trash-alt" aria-hidden="true"></i>')));
                        table.append(tr);
                    }
 */
                }
                $(".observer-div-update-issue").getVal(ts);
               // div.html(table);
            } catch (error) {

            }

        },
        genCommentListOfTask: function (taskId) {
            var taskId = global_var.current_issue_id;
            //        console.log('task id'+taskId);
            if (!taskId) {
                return;
            }
            var json = {
                kv: {}
            };
            try {
                json.kv.cookie = getToken();
            } catch (err) {}
            json.kv.fkTaskId = taskId;
            var that = this;
            var data = JSON.stringify(json);
            var rs = "";
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmGetCommentListByTask",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    rs = that.generateCommentListHtml4Task(res, taskId);
                },
                error: function () {
                    //                Toaster.showError("error");
                }
            });
            return rs;
        },
        generateCommentListHtml4Task: function (res, taskId) {
            try {
                if (!res.tbl[0].r) {
                    return;
                }
                var obj = res.tbl[0].r;
                var div = $('<div></div>');
                for (var i = 0; i < obj.length; i++) {


                    var div_by_col = $('<div></div>').addClass("col").addClass("mangodbcol1")
                       
                    var div_by_row = $('<div></div>')
                        .addClass("row")
                        .addClass("mangodb");
                    var img = obj[i].avatarUrl.length === 0 ?
                        fileUrl(new User().getDefaultUserprofileName()) :
                        fileUrl(obj[i].avatarUrl);
                    var div1 = $('<div></div>')
                        .addClass("comment-line1")
                        .append($('<img></img>')
                            .addClass("figure-img img-fluid rounded-circle")
                            .attr("style", "width: 21px;height: 21px;object-fit: cover;object-position: center center;")
                            .attr("src", img));
                    //            var comment = replaceMainTrustedTags(replaceTags(obj[i].comment));
                    var comment = replaceTags(obj[i].comment);
                    var div2 = $('<div></div>')
                        .addClass("col-12").attr('style', "font-size:13px;")
                        .append($("<div>").addClass('d-flex')

                            .append(div1)
                            .append($('<div>').addClass('ml-auto')
                            .append($("<span>").append(obj[i].username)
                            .addClass('comment-content-header-name')
                            .append($("<span>")
                                .addClass('comment-content-header-history')
                                .append(Utility.convertDate(obj[i].commentDate))
                                .append(", ")
                                .append(Utility.convertTime(obj[i].commentTime))
                                .append(" ")
                            )
                            .append('&nbsp;&nbsp;&nbsp;')

                                //                            .append($('<a href="#" style="font-size:11px;">')
                                //                                    .addClass('comment-content-header-name')
                                //                                    .attr('onclick', "deleteComment('" + obj[i].id + "')")
                                //                                    .append("Delete"))
                            )

                            )
                            
                            
                        )
                        .append($("<span class='comment-main-span'>")
                            .css('padding-bottom', "5px")
                            .attr("id", obj[i].id)
                            //                            .attr("ondblclick", "new UserStory().convertCommentHtml2TextArea(this)")
                            .attr("pval", replaceMainTrustedTags(replaceTags(obj[i].comment)))
                            .append(MapTextAreaHtml(comment)));
                    var div2_1 = new UserStory().generateCommentFileLine(obj[i].fileName);
                    var div3 = $('<div></div>').addClass("col-12").append("");
                    div2.append(div2_1)
                        
                    //                    .append($('<a href="#" style="font-size:11px;">')
                    //                            .attr('onclick', " convertCommentHtml2TextArea(this,'" + obj[i].id + "')")
                    //                            .append("Edit"))

                    //                    .append('&nbsp;&nbsp;&nbsp;')
                    //                    .append($('<a class="saveComment" href="#" style="display:none;font-size:11px;">')
                    //                            .attr('onclick', "saveComment(this,'" + obj[i].id + "')")
                    //                            .append("Save"));
                    div_by_row.append(div2)
                        .append(div3);
                    div_by_col.append(div_by_row)
                    div.append(div_by_col);
                    //                        div.append(div1).append(div2).append(div3);
                }
                //        return div.html();

                $('.comment-body').html(div.html());
            } catch (e) {}
        },
        getTaskSubtaskList: function () {

        },
        getTaskDeadLine: function () {

        },
        getLabelTask: function (elm) {
           
            elm.empty();
            try {
                var  list  = taskManagement.taskLabelList.tbl[0].r;
           
            for (let i = 0; i < list.length; i++) {
                const o = list[i];
                elm.append($("<option>")
                                .val(o.id)
                               .text(o.name))
            }
            } catch (error) {
                
            }
            
            elm.selectpicker("refresh");
        },
        getSprintTask: function (elm) {
        
            elm.empty();
             try {
                var  list  = taskManagement.taskSprintList.tbl[0].r;

                for (let i = 0; i < list.length; i++) {
                    const o = list[i];
                    elm.append($("<option>")
                                    .val(o.id)
                                   .text(o.sprintName))
                }
             } catch (error) {
                 
             }
             
             elm.selectpicker("refresh");
        },
        getTaskSpirntList: function (taskId) {

            callApi('22012918213902436118',{fkBacklogTaskId:taskId},true,function (res) {
                try {
                    var  list  = res.tbl[0].r;
                    var tb  = []
                   for (let i = 0; i < list.length; i++) {
                       const o = list[i];
                       tb.push(o.fkSprintId);
                   }
                   $("#run_task_detail_detail_sprint").val(tb);
                   $("#run_task_detail_detail_sprint").selectpicker("refresh");
                } catch (error) {
                    
                }
                  
           }) 
        },
        getTaskLabelList: function (taskId) {

            callApi('22012918304302492366',{fkBacklogTaskId:taskId},true,function (res) {
                try {
                    var  list  = res.tbl[0].r;
                    var tb  = []
                   for (let i = 0; i < list.length; i++) {
                       const o = list[i];
                       tb.push(o.fkLabelId)
                   }
               
                   
                   $("#run_task_detail_detail_categories").val(tb);
                   $("#run_task_detail_detail_categories").selectpicker("refresh");
                   
                } catch (error) {
                    
                }
            
           }) 
        },
        getTaskEvent: function (taskId) {
            $('.task-events-updated').attr("data-taskid", '');
            $('.task-events-updated input').val('');
            $('.task-events-updated input').change('');
            var json = initJSON();

            json.kv.fkTaskId = taskId;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceRsGetTaskEventListByTaskId",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {

                    try {
                        var obj = res.tbl[0].r[0];

                        $('.task-events-updated').attr("data-taskid", obj.id);

                        $('.task-events-updated input[name="mezmun"]').val(obj.mezmun);
                        $('.task-events-updated input[name="mezmun"]').selectpicker('refresh');

                        $('.task-events-updated input[name="struktur"]').val(obj.struktur);
                        $('.task-events-updated input[name="struktur"]').selectpicker('refresh');

                        $('.task-events-updated input[name="nov"]').val(obj.nov);
                        $('.task-events-updated input[name="nov"]').selectpicker('refresh');

                        $('.task-events-updated input[name="mesulShexs"]').val(obj.mesulShexs);
                        $('.task-events-updated input[name="mesulShexs"]').selectpicker('refresh');

                        $('.task-events-updated input[name="istirakci"]').val(obj.istirakci);
                        $('.task-events-updated input[name="istirakci"]').selectpicker('refresh');

                        $('.task-events-updated input[name="kontragent"]').val(obj.kontragent);
                        $('.task-events-updated input[name="kontragent"]').selectpicker('refresh');

                        $('.task-events-updated input[name="yer"]').val(obj.yer);
                        $('.task-events-updated input[name="yer"]').selectpicker('refresh');

                        $('.task-events-updated input[name="qeyd"]').val(obj.qeyd);
                        $('.task-events-updated input[name="qeyd"]').selectpicker('refresh');
                    } catch (error) {

                    }


                },
                error: function () {
                    Toaster.showError(('somethingww'));
                }
            });
        },
        getTaskSchedule: function () {

        },
        loadAssigneesByProjectDetails: function (res) {
            $(".assigne-div-update-issue").getVal(coreBugKV[global_var.current_issue_id].fkAssigneeId);
            return
           /*  var el = $('#bug_filter_detail_assignee_id_update')
            el.html('');
            try {


                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    var opt4 = $('<option>').val(o.fkUserId).text(o.userName);

                    el.append(opt4);

                }
                console.log(coreBugKV[global_var.current_issue_id].fkAssigneeId);
                el.selectpicker("destroy");
                el.val(coreBugKV[global_var.current_issue_id].fkAssigneeId);
                el.selectpicker("refresh");
            } catch (error) {
                el.hide();
            } */



        }


    },
    readTask: {
        Init: function () {

        },
        genBlockTask: {
            Init: function (elm) {
                var div = $(elm);
                div.empty();
                var view = localStorage.getItem('task-view-format');
                div.append(this.genHeader());
                taskManagement.readTask.genBlockTask.getstatisticList();
                if (!view) {
                    view = "table"
                }
                if (view === 'kanban') {
                    div.append(this.genKanbanView.genKanbanBlock());
                } else if (view === 'table') {

                    div.append(this.genTableView.genTableBlock());
                    setInterval(function(){ startTimeCurrent("issue-list-datetime") }, 5000);
                  
                }
                genTimePickerById("issue-list-datetime",'up');
                

            },
            genCheweekBtn: function (params) {
                return `<div class="info-box multi-edit-menu d-none pl-0 mr-2" >
                <div onclick="nextModalpopUpShow(this,'ididit','multi')" class="info-item-elements">
                    <i class="cs-svg-icon arrow-1"></i>
                </div>
                <div onclick="nextModalpopUpShow(this,'canceledTask','multi')" class="info-item-elements">
                    <i class="cs-svg-icon none-white"></i>
                </div>
                <div onclick="nextModalpopUpShow(this,'rejectTask','multi')" class="info-item-elements">
                    <i class="cs-svg-icon close-white"></i>
                </div>
                <div onclick="nextModalpopUpShow(this,'ForwardTaskTo','multi')" class="info-item-elements">
                    <i class="cs-svg-icon right-circle-02"></i>
                </div>
               <!--<div class="info-item-elements">
                    <i class="cs-svg-icon user-eye"></i>
                </div>
                <div class="info-item-elements">
                    <i class="cs-svg-icon task-02"></i>
                </div>-->
                <div class="info-item-elements">
                    <i class="cs-svg-icon chat-circle"></i>
                </div>
                <div class="info-item-elements">
                    <i class="cs-svg-icon hour-circle"></i>
                </div>
            </div> `
            },
            genHeader: function () {
                return `    <div class="header-info-section d-flex w-100">
                <div class="mr-auto d-flex p-2">
                    <div class="d-flex justify-content-start">
                        <div class="form-group ${notChwk()?"":"d-none"} has-search mr-2">
                        <div class="has-search-in">
                            <span class="fa fa-search form-control-feedback" aria-hidden="true"></span>
                            <input data-type="search_text" type="search" aria-autocomplete="list" aria-expanded="false" class="bug-filter form-control" placeholder="Axtar..." id="bug_filter_search_text">
                        </div>
                        </div>
                  
                        ${notChwk()?` <div class="info-box" style="background: transparent; border: none;">
                        <!-- <button id="my-task-btn" class="btn btn-light" style=" height: 32px !important;"> My Task</button> -->
                        <div class="bcs-col-btn multi-edit-menu d-none cs-input-group" >
                           <button id="multi-edit-menu-btn" class="btn btn-light multi-edit-menu-btn" data-toggle="modal" data-target="#multieditpopUp"> <i class="fas fa-edit" aria-hidden="true"></i></button>                                                              
                       </div>
                  </div>`:this.genCheweekBtn()}  
                       
                    </div>
                    <div class="d-flex justify-content-start" id="issue-list-statistic-block">
                    </div>    
                </div>
                <div class="p-2 mt-2">
                    <div class="dropdown info-box-dropdown" id="issue-table-aktiv-all">
                        <a class="btn dropdown-toggle" href="#" role="button" id="task-table-aktiv-all1" data-toggle="dropdown" aria-expanded="false">
                            <span class="title">${localStorage.getItem("issue_mode_active")?localStorage.getItem("issue_mode_active"):"A"}</span> <span id="row-count-table">125</span>
                        </a>
                       <div class="dropdown-menu dropdown-menu-right" aria-labelledby="task-table-aktiv-all1">
                          <a class="dropdown-item" all-aktiv="A" href="#">Aktiv</a>
                          <a class="dropdown-item" all-aktiv="P" href="#">Passiv</a>
                          <a class="dropdown-item" all-aktiv="H" href="#">Hamısı</a>
                        </div>
                      </div>
                   </div>
                </div>`
            },
            genHeaderContent: function (privateT, work, vxtkcb, vxtctb, nvbd, nodeadln, newt, ongoing, waiting, yonledrlb, canceled, rejected, closed, btb) {
        
                const  lt  = localStorage.getItem("issue_mode_active")?localStorage.getItem("issue_mode_active"):"A"
                return `
               <div class="info-box mr-2">
               <div class="info-item-elements filter-task-list-btn static-class"  data-status="meSend" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Şəxsi" data-original-title="" title="">
                   <i class="cs-svg-icon user-circle-white"></i> <span>${privateT}</span>
               </div>
               <div class="info-item-elements  dropdown-toggle "    data-toggle="dropdown">
                    <span data-placement="bottom" class='static-class' data-status="myTask" data-toggle="popover" data-trigger="hover" data-content="İş">
                    <i class="cs-svg-icon users-circle-white"></i> <span>${work}</span>
                    </span>
                </div>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item filter-task-list-btn" href="#" data-placement="right" data-toggle="popover" data-trigger="hover" data-content="İcraya verdiyim"><i class="cs-svg-icon daxil-eden"></i> 0655</a>
                    <a class="dropdown-item filter-task-list-btn" href="#" data-placement="right" data-toggle="popover" data-trigger="hover" data-content="İcra etdiyim"><i class="cs-svg-icon icra-eden"></i> 0655</a>
                    <a class="dropdown-item filter-task-list-btn" href="#" data-placement="right" data-toggle="popover" data-trigger="hover" data-content="Nəzarətimdə"><i class="cs-svg-icon nezaretci-o"></i> 0655</a>
                </div>
           </div> 
           <div class="info-box info-box-mob mr-2">
           <span class="title">Tarix</span>
                <div class="info-box-in">
                    <div class="info-item-elements static-class deadline-class"  data-status="expired" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Vaxtı keçib" data-original-title="" title="">
                        <i class="cs-svg-icon dot-radar"></i> <span>${vxtkcb}</span>
                    </div>
                    <div class="info-item-elements static-class deadline-class"  data-status="todays" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Vaxtı çatıb" data-original-title="" title="">
                        <i class="cs-svg-icon checkbox-circle"></i> <span>${vxtctb}</span>
                    </div>
                    <div class="info-item-elements static-class deadline-class"  data-status="notTodays" data-placement="bottom" data-toggle="p
                    opover" data-trigger="hover" data-content="Növbədə" data-original-title="" title="">
                        <i class="cs-svg-icon dot-circle"></i> <span>${nvbd}</span>
                    </div>
                    <div class="info-item-elements static-class deadline-class"  data-status="noDeadline" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Vaxt qoyulmayıb" data-original-title="" title="">
                        <i class="cs-svg-icon circle"></i> <span>${nodeadln}</span>
                    </div>
                </div>
            </div>
            ${this.genOperationBlock(lt,newt,ongoing,waiting,closed,rejected,yonledrlb,canceled,btb)}
           `
            },
            genOperationBlock: function (lt,news,ongoing,waiting,closed,rejected,yonlendirilib,canceled,tamamlanib) {
                return `<div class="info-box info-box-mob">
                <span class="title">Status</span>
                <div class="info-box-in">
                    <div class="${lt==='A'||lt==='H'?'':"d-none "} static-class status-class info-item-elements" data-status='new' data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Yeni">
                    <i class="cs-svg-icon plus-circle"></i> <span>${news}</span>
                    </div>
                    <div class="${lt==='A'||lt==='H'?'':"d-none "} static-class status-class info-item-elements" data-status='ongoing' data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="İcrada">
                        <i class="cs-svg-icon refresh-three"></i> <span>${ongoing}</span>
                    </div>
                    <div class="${lt==='A'||lt==='H'?'':"d-none "} static-class status-class info-item-elements" data-status='waiting' data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Gözləmədə">
                        <i class="cs-svg-icon hour-01"></i> <span>${waiting}</span>
                    </div>
        
                    <div class="${lt==='P'||lt==='H'?'':"d-none "} static-class status-class info-item-elements " data-status='yonlendirilib' data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Yönləndirilib">
                        <i class="cs-svg-icon right-circle"></i> <span>${yonlendirilib}</span>
                    </div>
                    <div class="${lt==='P'||lt==='H'?'':"d-none "} static-class status-class info-item-elements" data-status='canceled' data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Ləğv edilib">
                        <i class="cs-svg-icon close-icon"></i> <span>${canceled}</span>
                    </div>
                    <div class="${lt==='P'||lt==='H'?'':"d-none "} static-class status-class info-item-elements" data-status='rejected' data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="İmtina edilib">
                        <i class="cs-svg-icon none"></i> <span>${rejected}</span>
        
                    </div>
                    <div class="${lt==='P'||lt==='H'?'':"d-none "} static-class status-class info-item-elements" data-status='closed' data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="İcra edilib">
                        <i class="cs-svg-icon double-checkbox"></i> <span>${closed}</span>
                    </div>
                    <div class="${/* lt==='P'||lt==='H'?'': */"d-none "} static-class status-class info-item-elements" data-status='tamamlanib' data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Bitib">
                        <i class="cs-svg-icon shtamp-circle"></i> <span>${tamamlanib}</span>
                    </div>
                </div>
            </div>`
            },
            genFilterProject: function (params) {
                return ` <div class="cs-input-group mt-3">
                <div class="input-group-addon">Project</div>
                <select class="form-control  bug-filter-multi bug-mgmt-filter-select" data-live-search="true" data-actions-box="true"
                style="text-overflow: ellipsis" multiple onchange='callBugFilterMulti(this)' id='bug_filter_project_id'
                data-type="project_id" title="Project"></select>
            </div>`
            },
            genFilterStoryCard: function (params) {
                return ` <div class="cs-input-group mt-3">
                <div class="input-group-addon">Story Card</div>
                <select class="form-control bug-filter-multi  bug-mgmt-filter-select selectpicker1" data-actions-box="true"
                onchange='callBugFilterMulti(this)' multiple data-live-search="true" id='bug_filter_backlog_id'
                data-type="backlog_id" title="Story Card">
               </select>
            </div>`
            },
            genFilterAssigne: function (params) {
                return ` <div class="cs-input-group mt-3">
                <div class="input-group-addon">Assignee</div>
                <select class="form-control  bug-filter-multi bug-mgmt-filter-select user_filter_element_selectpicker  bug_filter_assignee_id cs-svg-icon daxil-eden" data-actions-box="true"
                onchange='callBugFilterMulti(this)' multiple data-live-search="true" id='bug_filter_assignee_id'
                data-type="assignee_id" title="Assignee"></select>
            </div>`
            },
            genFilterClosedBy: function (params) {
                return ` <div class="cs-input-group mt-3">
                <div class="input-group-addon">Closed By</div>
                <select class="form-control  bug-filter-multi  bug-mgmt-filter-select user_filter_element_selectpicker" data-actions-box="true"
                onchange='callBugFilterMulti(this)' multiple data-live-search="true" id='bug_filter_closed_by'
                data-type="closed_by" title="Closed By"></select>
            </div>`
            },
            genFilterStatus: function (params) {
                return `<div class="cs-input-group mt-3 d-none">
                <div class="input-group-addon">Statuse</div>
                <select class="form-control bug-filter-multi bug-mgmt-filter-select " onchange='callBugFilterMulti(this)'
                    data-live-search="true" data-actions-box="true" multiple id='bug_filter_status' data-type="status"
                    title="Status">
                    <option value='new' >New</option>
                    <option value='ongoing' >Ongoing</option>
                    <option value='closed'>Closed</option>
                    <option value='waiting'>Waiting</option>
                    <option value='canceled'>Canceled</option>
                    <option value='rejected' >Rejected</option>
                    ${notChwk()?`<option value='UAT' > UAT</option>`:""}
        
                </select>
            </div>`
            },
            genFilterTaskType: function (params) {
                return `<div class="cs-input-group mt-3">
                <div class="input-group-addon">Task Type</div>
                <select class="form-control bug-filter-multi  bug-mgmt-filter-select" onchange='callBugFilterMulti(this)'
                    data-live-search="true" data-actions-box="true" multiple id='bug_filter_tasktype' data-type="fktaskTypeId"
                    title="Task Type">
                </select>
            </div>`
            },
            genFilterTaskNature: function (params) {
                return ` <div class="cs-input-group mt-3">
                <div class="input-group-addon">Task Nature</div>
                <select class="form-control bug-filter-multi  bug-mgmt-filter-select" onchange='callBugFilterMulti(this)'
                    multiple id='bug_filter_nature' data-type="nature" title="Task Nature">
                    <option value='bug' selected>Bug</option>
                    <option value='change' selected>Change Request</option>
                    <option value='new' selected>New Request</option>
                </select>
            </div>`
            },
            genFilterCreatedBy: function (params) {
                return `  <div class="cs-input-group mt-3">
                <div class="input-group-addon">Created by</div>
                <select class=" form-control bug-filter-multi user_filter_element_selectpicker  bug-mgmt-filter-select" data-actions-box="true"
                    onchange='callBugFilterMulti(this)' multiple data-live-search="true" id='bug_filter_created_by'
                    data-type="created_by" title="Created by"></select>
            </div>`
            },
            genFilterObserverBy: function (params) {
                return `  <div class="cs-input-group mt-3">
                <div class="input-group-addon">Observer by</div>
                <select class=" form-control bug-filter-multi user_filter_element_selectpicker bug-mgmt-filter-select" data-actions-box="true"
                    onchange='callBugFilterMulti(this)' multiple data-live-search="true" id='bug_filter_observer_by'
                    data-type="observer_by" title="Observer by"></select>
            </div>`
            },
            genFilterIsmeetBy: function () {
                return `  <div class="cs-input-group mt-3">
                <div class="input-group-addon">Type</div>
                <select class=" form-control bug-filter  bug-mgmt-filter-select" data-actions-box="true"
                    onchange='callBugFilterMulti(this)'  data-live-search="true" id='bug_filter_is_meet'
                    data-type="is_meet" >
                    <option value="">${lang_task.rightBar.all}</option>
                    <option value="0">${lang_task.rightBar.task}</option>
                    <option value="1">${lang_task.rightBar.meet}</option>
                    </select>
            </div>`
            },
            genFilterShowChildTask: function () {
                return `  <div class="cs-input-group mt-3">
    
                <label class="checkmarkcontainer"><span class="checkmark-title ml-1">Show Child Tasks</span>
                    <input type="checkbox" name="" class="bug-filter-checkbox bug-mgmt-filter-select"  data-type="showChildTask" onchange="callBugFilterMulti(this)" checked="true" id="" title="Show Child Tasks">
                    <span class="checkmark"></span>
                </label>                    
            </div>`
            },
            genFilterPriorty: function () {
                return `  <div class="cs-input-group mt-3">
                <div class="input-group-addon">Priority</div>
                <select class="form-control bug-filter-multi  bug-mgmt-filter-select" data-actions-box="true" multiple
                    data-type="priority" onchange="callBugFilterMulti(this)" id='bug_filter_priority' title="Priority">
                    <option value='1'>1- Lowest</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9 - Highest</option>
        
                </select>
            </div>`
            },
            genFilterShowHide: function (params) {
                return ` <div class="cs-input-group ${notChwk()?"":"d-none"}  mt-3">
                <div class="input-group-addon">Columns</div>
                <select class="form-control  bug-mgmt-filter-select" data-actions-box="true" multiple
                    id='bug_filter_columns' title="Columns">
                    <option value='task-status' selected>Status</option>
                    <option value='task-id' selected>Task ID</option>
                    <option value='task-name' selected>Description</option>
                    <option value='task-nature' ${notChwk()?"selected":""}>Task Nature</option>
                    <option value='assignee' selected>Assignee</option>
                    <option value='tasktype'  ${notChwk()?"selected":""} >Task Type</option>
                    <option value='ismeet'  ${notChwk()?"":"selected"} >Meet</option>
                    <option value='close-date' >Status Close Date</option> 
                    <option value='closed-by'>Status Closed By</option> 
                    <option value='priority'>Priority</option>
                    <option value='story-card' ${notChwk()?"selected":""}>Story Card</option>
                    <option value='project' ${notChwk()?"selected":""}>Project</option>
                    <option value='created-by' selected>Create By</option>
                    <option value='created-date' selected>Create Date</option>
                    <option value='last-update'>Late Update</option>
                    <option value='estimated-hours'>Estimated Hours</option>
                    <option value='spent-hours'>Spent Hours</option>
                    <!--<option value='estimated-counter'>Estimated Counter</option>-->
                    <option value='executed-counter'>Executed Counter</option>
                    <option value='estimated-budget'>Estimated Budget</option>
                    <option value='spent-budget'>Spent Budget</option>
        
                </select>
            </div>`
            },
            genFilterBlock: function () {

                return `<div class="bugListNavMenu bugList-elements">
                <div class="main-sorting">
                     ${this.genFilterClosed()}
                     ${this.genFilterSortBy()}
                </div>
                  ${notChwk()?this.genFilterProject():""}
                  ${notChwk()?this.genFilterStoryCard():""}
                  ${this.genFilterAssigne()}
                  ${this.genFilterIsmeetBy()}
                  ${notChwk()?this.genFilterClosedBy():""}               
                  ${this.genFilterStatus()}
                  ${notChwk()?this.genFilterTaskType():""}  
                  ${notChwk()?this.genFilterTaskNature():""}
                  ${this.genFilterCreatedBy()}
                  ${this.genFilterObserverBy()}
                  ${notChwk()?this.genFilterShowChildTask():""}
                  ${notChwk()?this.genFilterPriorty():""}
                  ${this.genFilterShowHide()}    
            </div>
                `
            },
            genFilterClosed: function () {
                return `  <div class="row ml-0 mr-0">
                <div class="d-flex justify-content-center">
                    <div class="cs-input-group cs-pagination-group-by icon-input-group d-flex mt-3" style="min-width: 250px;">
                    
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="cs-svg-icon filter-group"></i></div>
                        </div>
                        <select class='bug-mgmt-filter-select' id="inputGroupSelect01">
                            <option value='0' >Group By...</option>
                            <option value='4' >Task Status</option>
                            ${
                                notChwk()?`<option value='7' >Task Nature</option>
                                <option value='8' >Task Type</option>
                                <option value='9' >Story Card</option>
                                <option value='10' >Project</option>
                            `:""
                            }
                            <option value='13' >Create By</option>
                            <option value='12' >Assignee</option>
                        </select>
                    </div>


                        <div class="mt-3">
                            <div class="cs-input-group  cs-pagination-limit">
                                <select data-type='' class="bug-mgmt-filter-select" onchange="callBugFilterMulti(this)" id="bug_filter_limit">
                                    <option value='10'>10</option>
                                    <option value='25' selected> 25</option>
                                    <option value='50'>50</option>
                                    <option value='100'>100</option>
                                    <option value='200'>200</option>
                                    <option value='300'>300</option>
                                </select>
                            </div>
                            <b id="table-row-count"> </b>
                        </div>
                        <div class="cs-input-group text-center mt-3 pr-0">
                            <div class="task-clear-filter-btn">
                                <i class="cs-svg-icon clear-filter"></i>
                            </div>
                        </div>

                </div>
                <div class="cs-input-group input-group mt-3 col-12">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="cs-svg-icon calendar-01"></i></div>
                    </div>
                    <input class="form-control issue-mgmt-general-filter bug-mgmt-filter-closed-date-from" id="issue_management_closed_date_from" type="text">
                 </div>
         
            </div>`
            },
            genFilterSortBy: function () {
                return `
                <div class="row ml-0 mr-0">
                <!--<div class="cs-input-group col-12 mt-2">
                        <div class="input-group-addon">Sort by</div>
                    </div>-->
                    <div class="cs-input-group icon-input-group col-6 mt-3">
                       <div class="d-flex">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="cs-svg-icon filter-sorting"></i></div>
                            </div>
                            <select class="issue-mgmt-general-filter bug-mgmt-filter-select bug-mgmt-filter-sortby" data-actions-box="true"    
                                id='bug_filter_sortby' title="Columns">
                                    <option value='0' >Sort by...</option>
                                    <option value='task_status' selected>Status</option>
                                    <option value='id' selected>Task ID</option>
                                    <option value='task_name'  accesskey="">Description</option>
                                    <option value='task_nature'  >Task Nature</option>
                                    <option value='fk_assignee_id' >Assignee</option>
                                    <option value='fk_task_type_id' >Task Type</option>
                                    <option value='close_status_date'>Closed Date</option> 
                                    <option value='closed_by'>Closed By</option> 
                                    <option value='task_priority'>Priority</option>  
                                    <option value='created_by'  >Create By</option>
                                    <option value='created_date'  >Create Date</option>  
                                    </select>
                        </div>
                    </div>

                    <div class="cs-input-group col-6 mt-3">
                        <select class="issue-mgmt-general-filter bug-mgmt-filter-select bug-mgmt-filter-sortby-asc" data-actions-box="true"    
                                id='bug_filter_sortby_asc' title="Columns">
                            <option value='asc' >ASC</option>
                            <option value='desc' selected>Desc</option>
                        </select>
                    </div>
                    
                </div>`
            },
            genLabelBlock:function (param) {  
                return`    <div class="bugLabel-elements label-show-4-task category-elements text-center" style="padding: 0px 10px;">
                                        <div class="category-case-box text-left">
                                            <span class="first-icon"><i class="cs-svg-icon label"></i></span> Cheweek <span class="last-icon">8</span>
                                        </div>
                                        <div class="category-item-boxes text-left">
                                            <div href="#" class="category-show-hide d-flex">
                                                <div class="category">
                                                    <span class="icon"><i class="cs-svg-icon category"></i></span> Kategoriyalar
                                                </div>
                                                <div class="created new-label-modal" title="New Label" data-target="#insertNewLabel4Task" data-toggle="modal"><i class="fa fa-plus" aria-hidden="true"></i></div>
                                            </div>
                                            <ul id="tasklabellist4Task" >
                    
                                            </ul>
                                        </div>
                                    </div>
            `
            },
            genSprintBlock:function (param) {  
                return`<div class="bugSprint-elements sprint-show-4-task">
                <span><a class="btn" href="#" data-target="#insertNewSprint4Task" style="padding:0px;width: 20px;font-weight: 600;vertical-align: -webkit-baseline-middle; font-size: 12px; color:#727D91; margin-top: 5px;"> New Sprint</a>
                </span>
                <span class="newlabelspan" style="cursor: pointer;"
                    onclick="new UserStory().clearAndShowAll(this)">Clear</span>
                <div class="dropdown-divider" style="padding:0px;"></div>
                <div id="sprintlist4Task" class="sprintlist4Task" style='height: 250px;overflow-y: auto; overflow-x: hidden;'></div>
            </div>`
            },
            genNotificationBlock: function () {
                return `<div class="notifcation-block">
                <div class="notification-header mb-4">
                  <div style="float: right;padding: 0 3px;">
                  <span class="large-blok-expand"><i class="fas fa-expand" aria-hidden="true"></i></span>
                    <span class="circle">
                        <label class="checkmarkcontainer">
                            <input type="checkbox" class="noteCheckListItem" value="0">
                            <span class="checkmark"></span>
                        </label>
                    </span>
                  </div>
                </div>
                <div class="notification-body" id="notification-block-id">

                </div>
            </div>`
            },
            genNotificationItemBlock: function (id, taskId, title, deadline, body,time,msg,img,taskStatus,fktaskId) {
                return `  <div class="notification-elements" id='${id}'>
              <div class="d-flex p-2 notify-top-section">
                  <div class="mr-auto">
                      <span class="top-title">${title}</span>
                        ${deadline}
                      
                  </div>
                  <div>
                     
                      <div class="circle-s">
                          <label class="checkmarkcontainer">
                              <input type="checkbox" class="noteCheckListItem" value="0">
                              <span class="checkmark"></span>
                          </label>
                      </div>
                  </div>
              </div>
              <div class="d-flex pl-2 pr-2 pb-2 pt-0 mb-0 notify-title-box">
                  <div class="mr-auto ncs-ellipsis"><span class="id">${taskId}</span>
                      <a href='#'  onclick="taskManagement.updateTask.callTaskCard4BugTask(this,'-1','${fktaskId}')" class="notefy-title ">${body}</a>
                      <div class="d-flex mt-1 notify-msg">
                          <span>${msg?"Mesaj:":""} </span><span>${msg}</span>
                      </div>
                  </div>
                  <div class="show-arrow show-more-btn"><i class="cs-svg-icon arrow-bottom"></i></div>
              </div>
              <div class="notify-bottom-box pt-2">
                  
                  <div class="d-flex mt-2 status-box status-box-${taskStatus}">
                      <div class="mr-auto">
                          <div class="author-img"><img class="author" src="${img}" title="Creator"></div>
                          <span class="notefy-status">${getStatusName(taskStatus)}</span>
                      </div>
                      <div class="notify-bottom-right pr-2">
                          <ul>
                            <li><div class="cs-click">${time}</div></li>
                            <!-- <li><div class="cs-click"><i class="cs-svg-icon setting-checkbox"></i> 3</div></li>
                            <li><div class="cs-click"><i class="cs-svg-icon attach-01"></i></div></li> -->
                          </ul>
                      </div>
                  </div>
              </div>
          </div>`
            },
            getNotificationRowCount:function () {
                var json  = initJSON();
                   json.kv.fkAssigneeId =  global_var.current_ticker_id;
                var data = JSON.stringify(json);
                var that = this;
                $.ajax({
                    url: urlGl + "api/post/srv/serviceRsGetRowCount4TaskNotificationByUser",
                    type: "POST",
                    data: data,
                    contentType: "application/json",
                    crossDomain: true,
                    async: true,
                    success: function (res) {
                        $(".notification-btn .info").text(res.kv.rowCount);
                           
                       // $(".notification-btn .info").text(res.kv.rowCount);
                    },
                    error: function () {
                        Toaster.showError(('somethingww'));
                    }
                });
              
            },
            getNotificationList:function () {
                var json  = initJSON();
                   json.kv.fkAssigneeId =  global_var.current_ticker_id;
                var data = JSON.stringify(json);
                var that = this;
                $.ajax({
                    url: urlGl + "api/post/srv/serviceRsGetTaskNotificationListByUserId",
                    type: "POST",
                    data: data,
                    contentType: "application/json",
                    crossDomain: true,
                    async: true,
                    success: function (res) {
                        var list  = res.tbl[0].r;
                           var elm  = $("#notification-block-id");
                                elm.empty();
                            for (let i = 0; i < list.length; i++) {
                                const o = list[i];
                                var endTime = new Date(o.endDate + ' ' + o.endTime);
                                var html = that.genTypeNotMessaje(
                                    o.id,
                                    o.fkTaskId,
                                    o.fkProjectId,
                                    o.historyTellerId,
                                    o.newValue,
                                    o.oldValue,
                                    o.historyDate,
                                    o.historyTime,
                                    o.noteType,
                                    o.orderNoSeq,
                                    endTime,
                                    o.taskStatus,
                                    o.isMeet,
                                    o.fkTaskId
                                )
                                elm.append(html);
                            }
                    },
                    error: function () {
                        Toaster.showError(('somethingww'));
                    }
                });
              
            },
            genTypeNotMessaje:function (noetId, taskId, projectId ,tellerId, newValue,oldValue,dateL,timeL,notType,orderNoSeq,endTime,taskStatus,isMeet,fktaskId) {
                if(!notType){
                    return
                }
                try {

                    var title  = (isMeet==='1')?"Meet":"Task"
                    try {
                        var projectCode = SACore.GetProjectCore(projectId).projectCode;
                        projectCode = projectCode.toUpperCase();
                      
                       var taskId = (orderNoSeq)
                       ? (replaceTags(projectCode)) ? replaceTags(projectCode) + "-" + orderNoSeq : orderNoSeq : "";
                    } catch (error) {
                        console.log(error);
                     var  taskId ="no-id";
                    }
                   
                     var  img  =''
                         var body =''                
                      if(notType==='new'){
                          body = "New Task Added ("+newValue+")"
                      }
                      else if (notType==='status'){
                        body = "Status Changed From ("+oldValue+") To ("+newValue+")"
                      }
                      else if (notType==='assignee'){
                        body = "Task Assigne ("+oldValue+") changed ("+newValue+")"
                      }
                      else if (notType==='comment'){
                        body = "New Comment Added ("+newValue+")"
                      }
   
                            var msg = ""
                             var img  = SAProjectUser.Users[tellerId].userImage;
                               img  =  fileUrl(img)
                             var deadLine = getTimeDifference(endTime, new Date());
                             var time  =  Utility.convertDate(dateL) +" "+ Utility.convertTime(timeL)
                  return this.genNotificationItemBlock(noetId, taskId, title, deadLine, body,time,msg,img,taskStatus,fktaskId);
                    
                } catch (error) {
                   console.log(error)
                    return ''
                }
                
            },
            getstatisticListLoadAfter: function (json) {
                try {
                    var json = initJSON();
                    json.kv.fkProjectId = bug_filter.project_id;
                    json.kv.fkAssigneeId = ($(".me-send-task-list-btn").hasClass('active'))?me:bug_filter.assignee_id;
                    json.kv.closedBy = bug_filter.closed_by;
                    json.kv.createdBy = ($(".my-send-task-list-btn").hasClass('active'))?me:bug_filter.created_by;
                    json.kv.fkBacklogId = bug_filter.backlog_id;
                  
                    json.kv.priority = bug_filter.priority;
                    json.kv.taskNature = bug_filter.nature;
                    json.kv.searchText = bug_filter.search_text;
                    json.kv.searchLimit = bug_filter.limit;
                    json.kv.pageNo = bug_filter.page_no;
                    json.kv.sprintId = bug_filter.sprint_id;
                    json.kv.labelId = bug_filter.label_id;
                    json.kv.sortBy = bug_filter.sortBy;
                    json.kv.sortByAsc = bug_filter.sortByAsc;
                    json.kv.closedDateFrom = bug_filter.closed_date_from;
                    json.kv.closedDateTo = bug_filter.closed_date_to;
                    json.kv.showChildTask = bug_filter.showChildTask;
                    json.kv.createdDate = bug_filter.createdDate;
                    json.kv.fkTaskTypeId = bug_filter.fktaskTypeId;
                    var that = this
                    var data = JSON.stringify(json);
                    $.ajax({
                        url: urlGl + "api/post/srv/serviceTmgetTaskListStatusCount",
                        type: "POST",
                        data: data,
                        contentType: "application/json",
                        crossDomain: true,
                        async: false,
                        success: function (res) {
                           
                            const o = res.tbl[0].r[0];
                            var elm  = $("#issue-list-statistic-block .static-class")
                               elm.each( function () {
                                   var fld  = $(this).attr("data-status");
                                       $(this).find("span").text(o[fld]);
                               })
                             $('[data-toggle="popover"]').popover({
                                 html: true
                             });
                        },
                        error: function () {
                            Toaster.showError(('somethingww'));
                        }
                    });/* 
                    callService('serviceTmgetTaskListStatusCount', {}, true, function (res) {
                      
                        //getInfoBoxResponsive();
                    }); */

                } catch (error) {}


            },
            getstatisticList: function () {
                try {
                    var that = this
                   /*  callService('serviceTmgetTaskListStatusCount', {}, true, function (res) {
                        const o = res.tbl[0].r[0];
                        $('[data-toggle="popover"]').popover({
                            html: true
                        });
                        //getInfoBoxResponsive();
                    }); */
                    $("#issue-list-statistic-block")
                    .html(that.genHeaderContent(/* o.meSend, o.myTask, o.expired, o.todays, o.notTodays, o.noDeadline, o.new, o.ongoing, o.waiting, o.yonlendirilib, o.canceled, o.rejected, o.closed, o.tamamlanib */))
               

                } catch (error) {}


            },
            genKanbanView: {
                Init: function (params) {

                },
                genKanbanBlock: function () {
                    return `
                    <div class="col pl-1 pr-1" id="">
                   <div class="row" style="margin: 0;">
                       <div class='col-12 tableFixHead' id1="bugList" style="padding: 0;">
                       <div class="cs-task-panel-column cs-task-panel-column-issue">
                       </div>
                       </div>
                   </div></div>`
                },
                genZonaBlock: function (nameh, id) {
        return `<div class="cs-task-col ${id}"><div class="cs-task-boxes cs-gray-bg"><div class="cs-task-status-header"><div class="d-flex bd-highlight cs-flex-align-middle">
            <div class="flex-fill bd-highlight">
               
            </div>
            <div class="flex-fill bd-highlight text-center">
            <div class="cs-card-size">
                    <span><i class="fas fa-clipboard-list" aria-hidden="true"></i></span>
                </div>
                <h4 class="cs-status-box-name text-center">${nameh}</h4>
                <div class="cs-card-size">
                    <span class="count-cs-${id} ">0</span>
                </div>
            </div>
            <div class="flex-fill d-flex bd-highlight minimze-hidden-block" id="${id}-total-task-list">
           
            </div>
            <div class="flex-fill bd-highlight">
                <div class="cs-card-fullview cs-next-large-modal-btn">
                    <a href="#"><i class="fas fa-expand" aria-hidden="true"></i></a>
                </div>
            </div>
            </div>
            </div>
            <div class="cs-task-item-box">
            <div id="flex-col-${id}" class="cs-task-item-box-bg">
            </div>
            </div>
            </div>
            </div>`
                },
                genKanbanContentBlock: function (id, taskid, isMeet, deadline, body, stats, ceratedDate,createdImg,createdName,assigneImage,assignName) {
                    return `<div class="cs-task-item-in-box redirectClass cs-white-bg" id="${id}" pid="">
                    <div class="cs-cart-head-title p-2" style="padding-bottom:5px;">
                    ${notChwk()?"":`<span href="#" class="operation " >${isMeet==='1'?"Toplantı":"Tapşırıq"}</span>`}
                    <div class="d-flex pl-0 pr-0 pb-0 pt-0 mb-0 notify-title-box">
                    <div class="mr-auto ncs-ellipsis"><span class="id">${taskid}</span>
                        <div class="d-inline-block notify-top-section">
                            <div class="mr-auto">
                                <span class="deadline"> ${deadline}</span>
                            </div>
                        </div>
                    </div>
                </div>
                    <span class="brend-color large-blok-icon"><i class="fas fa-expand" aria-hidden="true"></i></span></div><div class="cs-task-card-body pl-2 pr-2" "="">
                                  
                           <div class="cs-task-card-desc">
                           <p onclick_trigger_id="21031217414702167956" class="">${body}</p>
                           </div>
                           </div><div class="cs-task-card-bottom">
                           <div class="d-flex cs-flex-align-middle">
                           <div class="align-items-center">
                           <div class="cs-task-card-avatar-boxes">
                           <ul class='d-flex'>
                            <li><img class="Assigne-card-story-select-img ${stats}" src="${createdImg}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${createdName}" title="" data-original-title="Daxil Edən"></li>
                            <li><img class="Assigne-card-story-select-img ${stats}" src="${assigneImage}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${assignName}" title="" data-original-title="İcra Edən"></li>
                                 </ul>
                                 </div>
                                 </div>
                                 <div class="flex-fill text-right"><div class="cs-task-card-datatime d-block text-right">
                                    <span>${ceratedDate} </span>
                                </div><div class="bg-status-${stats}" style="height: 2px; margin: 10px 0px 0px 7px;"></div>
                                <div class="cs-staturs-circle-note1 ml-2 d-inline-block float-left">
                                <span>${stats}</span></div><div class="canban-item-btns d-flex float-right">
                                            <div class="btn-1 mr-2" onclick='iDidIt()' data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${getOperName("ididit")}">
                                                <i class="cs-svg-icon c-icon-1"></i>
                                            </div>
                                            <div class="btn-2 mr-2 status-change" data-value='rejected' data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${getOperName("rejectTask")}"  >
                                                <i class="cs-svg-icon c-icon-2"></i>
                                            </div>
                                            <div class="btn-3 mr-2 status-change"  data-value='canceled' data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${getOperName("cancel")}">
                                                <i class="cs-svg-icon c-icon-3"></i>
                                            </div>
                                            <div class="btn-4 mr-2"  data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${getOperName("ForwardTaskTo")}">
                                                <i class="cs-svg-icon c-icon-6"></i>
                                            </div>
                                            ${notChwk()?`<div class="btn-5 mr-2"  data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${getStatusName("UAT")}">
                                            <i class="cs-svg-icon c-icon-6"></i>
                                        </div>`:""}
                                            <div class="btn-6 mr-2"  data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${getOperName("history")}">
                                                <i class="cs-svg-icon c-icon-6"></i>
                                            </div>
                                            <div class="btn-7 mr-2"  data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${getOperName("chat")}">
                                                <i class="cs-svg-icon c-icon-6"></i>
                                            </div>
                                            </div> 
                                            </div> 
                                             </div> 
                                              </div>
                                               </div>`
                },
                getKanbanBodyBlock: function (res, typeRow, st,pageNo) {
                    $(".count-cs-" + st).text(res.kv.tableCount);
                    var sumEstHours = 0,
                        sumSpentHours = 0,
                        sumEstCount = 0,
                        sumExecCount = 0,
                        sumEstBudget = 0,
                        sumSpentBudget = 0;
                    try {
                        var obj = res.tbl[0].r;
                        for (var i = 0; i < obj.length; i++) {
                            var o = obj[i];
                            sumEstHours = increaseValue(sumEstHours, o.estimatedHours);
                            sumSpentHours = increaseValue(sumSpentHours, o.spentHours);
                            sumEstCount = increaseValue(sumEstCount, o.estimatedCounter);
                            sumExecCount = increaseValue(sumExecCount, o.executedCounter);
                            sumEstBudget = increaseValue(sumEstBudget, o.estimatedBudget);
                            sumSpentBudget = increaseValue(sumSpentBudget, o.spentBudget);
                            var startTime = new Date();
                            var endTime = new Date(o.endDate + ' ' + o.endTime);

                            var row = (i + 1 + (parseInt(bug_filter.page_no) - 1) * (parseInt(bug_filter.limit)));
                            row += " " /* + rs + rsLabelFilter; */

                            var userImage = o.userImage;
                            var img = (userImage) ?
                                fileUrl(userImage) :
                                fileUrl(new User().getDefaultUserprofileName());

                            var createByImage = o.createByImage;
                            var createdByImg = (createByImage) ?
                                fileUrl(createByImage) :
                                " ";

                            var backlogName = '<a href1="#" onclick="callStoryCard(\'' + o.fkBacklogId + '\')">' + replaceTags(o.backlogName) + '</a>';
                            var taskName = '<a class="task-list-name issue_' + o.id + '" href="#" onclick="taskManagement.updateTask.callTaskCard4BugTask(this,\'' + o.fkProjectId + '\',\'' + o.id + '\')" >' + replaceTags(fnline2Text(o.taskName)) + '</a>';
                            var task_id = getTaskCode(o.id);

                            // var prtDiv = `<div class="cs-tecili"><i class="cs-svg-icon flame"></i></div>`
                            $('#flex-col-' + o[typeRow]).append(
                                this.genKanbanContentBlock(
                                    o.id,
                                    task_id,
                                    o.isMeet,
                                    getTimeDifference(endTime, startTime),
                                     taskName, 
                                     getStatusName(o.taskStatus), 
                                     Utility.convertDate(o.createdDate),
                                     createdByImg,
                                     o.createByName,
                                     img,
                                     o.userName,
                                    
                                )
                            )


                        }
                    } catch (error) {

                    }

                    $('[data-toggle="popover"]').popover({
                        html: true
                    });

                    if (parseFloat(bug_filter.limit) < parseFloat(res.kv.tableCount)) {
                        $('#flex-col-' + st).find(".more-button-forIssue").remove();
                        $('#flex-col-' + st)
                            .append(`<div class="more-button-forIssue text-center" data-type="${typeRow}" data-status="${st}" start-limit="${parseFloat(pageNo) +1}" end-limit="${bug_filter.limit}">More</div>`)
                    }


                    // getBugListDetailsSumLine(tbody, sumEstHours, sumSpentHours, sumEstCount, sumExecCount,
                    //         sumEstBudget, sumSpentBudget);

                    global_var.bug_task_sprint_assign_checked = '';
                    global_var.bug_task_sprint_assign_name = '';
                    global_var.bug_task_sprint_assign_id = '';


                    global_var.bug_task_label_assign_checked = '';
                    global_var.bug_task_label_assign_name = '';
                    global_var.bug_task_label_assign_id = '';
                },
                
                generAteBlockKanbanByGroupBy: function (elm, data) {
                    var goupBy = $('#inputGroupSelect01').val();
                    var items;
                    var type = "";
                    if (goupBy === "5"||goupBy === "0") {
                        items = $("select#bug_filter_status option");
                        type = "taskStatus"
                    }
                    if (goupBy === "7") {
                        items = $("select#bug_filter_nature option");
                        type = "taskNature"
                    }
                    if (goupBy === "9") {
                        items = $("select#bug_filter_backlog_id");
                        type = "fkBacklogId";
                        $(elm).empty();
                        var arr  = items.val();                        
                      for (let index = 0; index < arr.length; index++) {
                          const al = arr[index];
                             var nm =items.find('[value='+al+']').text();
                          $(elm).append(this.genZonaBlock(nm, al));
                          this.getTaskList4Kanban(data, type, al);
                       }

                       return
                    }
                    if (goupBy === "10") {
                        items = $("select#bug_filter_project_id");
                        type = "fkProjectId";
                        $(elm).empty();
                        var arr  = items.val();                        
                      for (let index = 0; index < arr.length; index++) {
                          const al = arr[index];
                             var nm =items.find('[value='+al+']').text();
                          $(elm).append(this.genZonaBlock(nm, al));
                          this.getTaskList4Kanban(data, type, al);
                       }

                       return
                    }
                    if (goupBy === "11") {
                        items = $("select#bug_filter_assignee_id");
                        type = "fkAssigneeId";
                        $(elm).empty();
                        var arr  = items.val();
                        if(arr.length<1){
                            arr=[]
                            var itm = items.find("option")
                              itm.each(function (index) {
                                   if(index<3){
                                       arr.push($(this).val())
                                   }
                                  })
                        }                         
                      for (let index = 0; index < arr.length; index++) {
                          const al = arr[index];
                             var nm =items.find('[value='+al+']').text();
                          $(elm).append(this.genZonaBlock(nm, al));
                          this.getTaskList4Kanban(data, type, al);
                       }

                       return
                    }
                    if (goupBy === "12") {
                        items = $("select#bug_filter_created_by");
                        type = "createdBy";
                        $(elm).empty();
                        var arr  = items.val(); 
                             if(arr.length<1){
                                 arr=[]
                                 var itm = items.find("option")
                                   itm.each(function (index) {
                                        if(index<3){
                                            arr.push($(this).val())
                                        }
                                       })
                                       
                             }                       
                      for (let index = 0; index < arr.length; index++) {
                          const al = arr[index];
                             var nm =items.find('[value='+al+']').text();
                          $(elm).append(this.genZonaBlock(nm, al));
                          this.getTaskList4Kanban(data, type, al);
                       }

                       return
                    }
                    if (goupBy === "8") {
                        items = $("select#bug_filter_tasktype");
                        type = "fkTaskTypeId"
                        $(elm).empty();
                        var arr  = items.val();                        
                      for (let index = 0; index < arr.length; index++) {
                          const al = arr[index];
                             var nm =items.find('[value='+al+']').text();
                          $(elm).append(this.genZonaBlock(nm, al));
                          this.getTaskList4Kanban(data, type, al);
                       }

                       return
                    }
                    /*  if(goupBy===0){
                          items  = $("select#bug_filter_status>option");  
                     } */
                    var that = this
                    $(elm).empty();
                    items.each(function (index) {
                        var id = $(this).attr("value")
                        var nm = $(this).text()
                        $(elm).append(that.genZonaBlock(nm, id));
                        that.getTaskList4Kanban(data, type, id);

                    })

                    return type
                },
                getTaskList4Kanban: function (json, type, st) {
                    json.kv[type] = "'" + st + "'";
                    var limit = json.kv.searchLimit;
                    var data = JSON.stringify(json);
                    var that = this;
                    $.ajax({
                        url: urlGl + "api/post/srv/serviceTmGetTaskList4Table",
                        type: "POST",
                        data: data,
                        contentType: "application/json",
                        crossDomain: true,
                        async: true,
                        success: function (res) {
                            AJAXCallFeedback(res);
                            coreBugList = res;
                            setKV4CoreBugList();
                            that.getKanbanBodyBlock(res, type, st, '1');
                          
                        },
                        error: function () {
                            Toaster.showError(('somethingww'));
                        }
                    });
                },
                getTaskList4KanbanMore: function (type, st,pageNo) {
                    var json = initJSON();
                    json.kv.fkProjectId = bug_filter.project_id;
                    json.kv.fkAssigneeId = bug_filter.assignee_id;
                    json.kv.closedBy = bug_filter.closed_by;
                    json.kv.createdBy = bug_filter.created_by;
                    json.kv.fkBackogId = bug_filter.backlog_id;
                    json.kv.taskStatus = bug_filter.status;
                    json.kv.priority = bug_filter.priority;
                    json.kv.taskNature = bug_filter.nature;
                    json.kv.searchText = bug_filter.search_text;
                    json.kv.searchLimit = bug_filter.limit;
                    json.kv.pageNo = pageNo;
                    json.kv.sprintId = bug_filter.sprint_id;
                    json.kv.labelId = bug_filter.label_id;
                    json.kv.sortBy = bug_filter.sortBy;
                    json.kv.sortByAsc = bug_filter.sortByAsc;
                    json.kv.closedDateFrom = bug_filter.closed_date_from;
                    json.kv.closedDateTo = bug_filter.closed_date_to;
                    json.kv.showChildTask = bug_filter.showChildTask;
                    json.kv.createdDate = bug_filter.createdDate;
                    json.kv.startLimit = 0;
                    json.kv.endLimit = 25;
                    json.kv[type] = "'" + st + "'";
                    var data = JSON.stringify(json);
                    var that = this;
                    $.ajax({
                        url: urlGl + "api/post/srv/serviceTmGetTaskList4Table",
                        type: "POST",
                        data: data,
                        contentType: "application/json",
                        crossDomain: true,
                        async: true,
                        success: function (res) {
                            AJAXCallFeedback(res);
                            coreBugList = res;
                            setKV4CoreBugList();
                            that.getKanbanBodyBlock(res, type, st,pageNo );
                            

                        },
                        error: function () {
                            Toaster.showError(('somethingww'));
                        }
                    });
                }
            },
            genTableView: {
                genTableBlock: function () {
                    return ` <div class="col pl-1 pr-1" id="addBuglist">
                   <div class="row" style="margin: 0;">
                       <div class='col-12 tableFixHead' id1="bugList" style="padding: 0;">
                         ${notChwk()?"":this.genShowHideBlock4ch()}
                           <table class="table-hover splited1 bugListTable" style="width:100%" id="bugListTable">
                               <thead class="bugThead">
                                ${this.genTableHeaderBlock()}
                               </thead>
                               <tbody>
       
                               </tbody>
       
                           </table>
                           ${this.genContextMenu()}
                       </div>
                       
                   </div>
                   <div class=" col-12 d-flex justify-content-center paginationStyle" style=" z-index: 500; ">

                   <div class="mr-auto">
                       <div class="task-list-datetime">
                           <div class="d-flex">
                           <span class="input-group-icon"><i class="cs-svg-icon calendar-01"></i></span>
                           <input type="text" autocomplete="off" onchange="callBugFilterMulti()" id="issue-list-datetime" class="form-control text-center sss" placeholder="Tarixə görə">
                           </div>
                        </div>
                   </div>
                     <div class="d-none">
                         <input type="text" name="" id="pagintion-selectbox-issue">
                     </div>
                   <div class="d-flex">
                       <div class="dropdown">
                           <button class="btn pagination_btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">1-50/212</button>
                           <div class="dropdown-menu pageBttnContainer" aria-labelledby="dropdownMenu2">
                               <button class="btn-minus-pag dropdown-item" type="button" style="border-bottom: 1px solid #9a9a9a45;">Ən başa</button>
                               <button class="btn-plus-pag dropdown-item" type="button">Ən sona</button>
                           </div>
                       </div>
                       <div class="d-table">
                           <button class="btn pagination_btn_left_right page-item-core-previous" data-page-icon="pageLeft"> <i class="fas fa-angle-left" aria-hidden="true"></i></button>
                           <button class="btn pagination_btn_left_right page-item-core-next" data-page-icon="pageRight"> <i class="fas fa-angle-right" aria-hidden="true"></i></button>
                       </div>
                   </div>
                  </div>
                 </div>
                     `
                },
                genShowHideBlock4ch:function (params) {
                    return ` <div class="showhide-col-main-issue" style="display: none">
                    <div class="showhide-col-main-info-in-issue">
                        <ul>
                            <li>
                                <label>Hamısı 
                                <input class="showhide-col-checkbox showhide-allcheckbox"  type="checkbox" checked ></label>
                            </li> 
                            <hr class="m-1">
                            <li>
                                <label>Status <input class="showhide-col-checkbox show-hide-btn-4-chwk" data-id='task-status' type="checkbox" checked ></label>
                            </li> 
                            <li>
                                <label>Ad
                                <input class="showhide-col-checkbox show-hide-btn-4-chwk" data-id='ismeet' type="checkbox" checked ></label>
                            </li> 
                            <li>
                                <label>${lang_task.table.tableColums.description} <input data-id='task-name' class="showhide-col-checkbox show-hide-btn-4-chwk" type="checkbox" checked ></label>
                            </li> 
                            <li>
                                <label>${lang_task.table.tableColums.createdBy} 
                                <input data-id='created-by' class="showhide-col-checkbox show-hide-btn-4-chwk" type="checkbox" checked ></label>
                            </li> 
                            <li>
                                <label>${lang_task.table.tableColums.assigined} 
                                <input data-id='assignee' class="showhide-col-checkbox show-hide-btn-4-chwk" type="checkbox" checked >
                                </label>
                            </li> 
                            <li>
                                <label>Tarix <input data-id='created-date' class="showhide-col-checkbox show-hide-btn-4-chwk" type="checkbox" checked ></label>
                            </li> 
                        </ul>
                        <div class="showhide-col-footer">
                        <span class="scm-show"><i class="fas fa-eye"></i></span>
                        <span class="scm-hide"><i class="fas fa-eye-slash"></i></span>
                        </div>
                    </div>
                   
                </div>`
                },
                genTableHeaderBlock: function () {
                    return `<thead class="bugThead">
                    <tr>
                    <th><div class="showhide-col-btn-issue" ><i class="cs-svg-icon numbers"></i></div></th>
                    <th><input type="checkbox" class="all-bug-list-check"></th>
                    <th class="bug-list-column bug-list-column-task-id" style=""><i class="cs-svg-icon id"></i></th>
                    <th class="bug-list-column-0 bug-list-column-task-deadline"><i class="cs-svg-icon deadline"></i></th>
                    <th class="bug-list-column bug-list-column-task-status" style="width: 90px;"><i class="cs-svg-icon status"></i></th>
                    <th class="bug-list-column bug-list-column-ismeet" style="width: 90px;">AD</th>
                    <th class="bug-list-column bug-list-column-task-name" style="min-width: 160px;">Description</th>
                    <th class="bug-list-column bug-list-column-task-nature" style="width: 40px;"><i class="fas fa-tasks"></i></th>
                    <th class="bug-list-column bug-list-column-tasktype"><i class="fas fa-tasks"></i></th>
                    <th class="bug-list-column bug-list-column-priority" style="display: none;">Priority</th>
                    <th class="bug-list-column bug-list-column-story-card" style=""><span>Story Card</span><button onclick="addUserStoryNewModalWithProject()" class="btn btn-sm"><i class="fas fa-plus" aria-hidden="true"></i></button></th>
                    <th class="bug-list-column bug-list-column-project" style="">Project</th>
                    <th class="bug-list-column bug-list-column-assignee" style="width: 70px;"><i class="cs-svg-icon task-user-1"></i></th>
                    <th class="bug-list-column bug-list-column-created-by" style="width: 70px;"><i class="cs-svg-icon task-user-2"></i></th>
                    <th class="bug-list-column bug-list-column-created-date" style="width: 80px;"><i class="cs-svg-icon calendar-01-dark"></i></th>
                    <th class="bug-list-column bug-list-column-close-date" style="display: none;">Closed On</th><th class="bug-list-column bug-list-column-closed-by" style="display: none;">Closed By</th>
                    <th class="bug-list-column bug-list-column-last-update" style="display: none;">Last Update</th>
                    <th class="bug-list-column bug-list-column-estimated-hours" style="display: none;">Estimated Hour(s)</th>
                    <th class="bug-list-column bug-list-column-spent-hours" style="display: none;">Spent Hour(s)</th>
                    <th class="bug-list-column bug-list-column-estimated-counter" style="display: none;">Estimated Counter</th>
                    <th class="bug-list-column bug-list-column-executed-counter" style="display: none;">Executed Counter</th>
                    <th class="bug-list-column bug-list-column-estimated-budget" style="display: none;">Estimated Budget</th>
                    <th class="bug-list-column bug-list-column-spent-budget" style="display: none;">Spent Budget</th>
            
                    </tr>
                   </thead>`
                },
                genTableBodyBlock: function (res) {

                    var tbody = $('#bugListTable > tbody');
                    tbody.html('');
                    //table.append(getBugListDetailsHeader());
                    // // thead to appaend----main header
                    var sumEstHours = 0,
                        sumSpentHours = 0,
                        sumEstCount = 0,
                        sumExecCount = 0,
                        sumEstBudget = 0,
                        sumSpentBudget = 0;
                        try {
                            var obj = res.tbl[0].r;
                            for (var i = 0; i < obj.length; i++) {
                                var o = obj[i];
                                sumEstHours = increaseValue(sumEstHours, o.estimatedHours);
                                sumSpentHours = increaseValue(sumSpentHours, o.spentHours);
                                sumEstCount = increaseValue(sumEstCount, o.estimatedCounter);
                                sumExecCount = increaseValue(sumExecCount, o.executedCounter);
                                sumEstBudget = increaseValue(sumEstBudget, o.estimatedBudget);
                                sumSpentBudget = increaseValue(sumSpentBudget, o.spentBudget);
                                
        
                                var t = this.genTaskTableForm(o,i);
                                tbody.append(t);
                                $('[data-toggle="popover"]').popover({
                                    html: true
                                });
                            }
        
                            // getBugListDetailsSumLine(tbody, sumEstHours, sumSpentHours, sumEstCount, sumExecCount,
                            //         sumEstBudget, sumSpentBudget);
        
                            global_var.bug_task_sprint_assign_checked = '';
                            global_var.bug_task_sprint_assign_name = '';
                            global_var.bug_task_sprint_assign_id = '';
        
        
                            global_var.bug_task_label_assign_checked = '';
                            global_var.bug_task_label_assign_name = '';
                            global_var.bug_task_label_assign_id = '';
                        } catch (error) {
                            
                        }
                   
                },
                genContextMenu : function () {
                    return `<div id="contextMenu" class="dropdown contextMenu-dropdown-style position-fixed" style="z-index:555;display: none;">
                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style="display:block;position:static;margin-bottom:5px;">
                        <li class="dropdown-item" href="#" onclick="nextModalpopUpShow(this,'ididit')" >
                            <i class="cs-svg-icon novbeti"></i> ${getOperName("ididit")}
                        </li>
                        <li class="dropdown-item" onclick="nextModalpopUpShow(this,'canceledTask')"  >
                               <i class="cs-svg-icon imtina"></i> ${getOperName("cancel")}
                        </li>
                        <li class="dropdown-item" class="dropdown-item" href="#" onclick="nextModalpopUpShow(this,'rejectTask')">
                              <i class="cs-svg-icon legv"></i> ${getOperName("rejectTask")}
                        </li>
                        <li class="dropdown-item forward-task" href="#" onclick="nextModalpopUpShow(this,'ForwardTaskTo')">
                        <i class="cs-svg-icon yonlendir"></i> ${getOperName("ForwardTaskTo")}
                         </li>                       
                        <li class="dropdown-item">
                            <i class="cs-svg-icon tarixce"></i> ${getOperName("history")}
                        </li>
                        <li class="dropdown-item">
                           <i class="cs-svg-icon chat-circle-dark"></i> ${getOperName("chat")}
                        </li>
                    </ul>
                </div>`
                   
                },
                getTaskList4Table: function (json) {
                    var that = this;
                    var data = JSON.stringify(json);
                    $.ajax({
                        url: urlGl + "api/post/srv/serviceTmGetTaskList4Table",
                        type: "POST",
                        data: data,
                        contentType: "application/json",
                        crossDomain: true,
                        async: false,
                        success: function (res) {
                            AJAXCallFeedback(res);
                            coreBugList = res;
                            setKV4CoreBugList();
                            that.genTableBodyBlock(res);

                            toggleColumns();
                            setPagination(res.kv.tableCount, res.kv.limit);
                            getGroupList();

                        },
                        error: function () {
                            Toaster.showError(('somethingww'));
                        }
                    });
                },
                genTaskTableFormMini: function (o,i) {
                    var startTime = new Date();
                        var endTime = new Date(o.endDate + ' ' + o.endTime);

                        var row = (i + 1 + (parseInt(bug_filter.page_no) - 1) * (parseInt(bug_filter.limit)));
                        row += " " /* + rs + rsLabelFilter; */

                        var userImage = o.userImage;
                        var img = (userImage) ?
                            fileUrl(userImage) :
                            fileUrl(new User().getDefaultUserprofileName());

                        var createByImage = o.createByImage;
                        var createdByImg = (createByImage) ?
                            fileUrl(createByImage) :
                            " ";

                        var backlogName = `<a href1="#" onclick="callStoryCard('${o.fkBacklogId}')">${replaceTags(o.backlogName)}</a>`;
                        var taskName = '<a class="task-list-name issue_' + o.id + '" href="#" onclick="taskManagement.updateTask.callTaskCard4BugTask(this,\'' + o.fkProjectId + '\',\'' + o.id + '\')" >' + replaceTags(fnline2Text(o.taskName)) + '</a>';
                        var task_id = getTaskCode(o.id);

                        var prtDiv = `<div class="cs-tecili"><i class="cs-svg-icon flame"></i></div>`;
                  const t= $('<tr>')
                            .attr("id", o.id)
                            .attr("projectId", o.fkProjectId)
                            .attr("stIdr", o.fkBacklogId)
                            .append($('<td>').attr("style", "width:25px;")
                                .append(row)
                            )
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-task-id').append(task_id))
                            .append($('<td>').addClass('bug-list-column-0').attr("style", "width:30px; padding: 0;")
                                .addClass('bug-list-column-task-deadline')
                                .append(getTimeDifference(endTime, startTime))
                            )
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-task-status cs-input-group')
                                .css("text-align", 'left')
                                .css("padding-left", '3px')
                                .css("overflow", 'initial')
                                .append($("<div>")
                                    .append($("<div>")
                                        .addClass('position-relative us-item-status-' + o.taskStatus)
                                        .append($('<span>')
                                            .append(getStatusName(o.taskStatus)))
                                        .append((o.taskPriority === '9') ? prtDiv : ""))
                                ))
                           
                           .append($('<td>')
                                .addClass('bug-list-column')
                                .attr("data-placement","top")
                                .attr("data-toggle","popover")
                                .attr("data-trigger","hover")
                                .attr("data-content",taskName)
                                .addClass('bug-list-column-task-name')
                                .css("max-width", '240px')
                                .append(taskName, ' ')
                               
                            )
                           
                                                        
                            .append($('<td>')
                                .css('white-space', 'nowrap').css("text-align", 'center')
                                .addClass('bug-list-column')
                                .addClass('bug-list-column-assignee')
                                .append(genUserTrblock(o.userName, img,"Assigne",o.fkAssigneeId)))
                            .append($('<td>').addClass('bug-list-column')
                                .css('white-space', 'nowrap').css("text-align", 'center')
                                .addClass('bug-list-column-created-by ')
                                .append(genUserTrblock(o.createByName, createdByImg,"Created by",o.createdBy)))
                            .append($('<td>').addClass('bug-list-column')
                                .css('white-space', 'nowrap').css("text-align", 'center')
                                .addClass('bug-list-column-created-date').append("<span class='get-data-group'>" + Utility.convertDate(o.createdDate) + "</span>"))
                          
                           

                    return t
                },
                genTaskTableForm: function (o,i) {
                    var startTime = new Date();
                        var endTime = new Date(o.endDate + ' ' + o.endTime);

                        var row = (i + 1 + (parseInt(bug_filter.page_no) - 1) * (parseInt(bug_filter.limit)));
                        row += " " /* + rs + rsLabelFilter; */

                        var userImage = o.userImage;
                        var img = (userImage) ?
                            fileUrl(userImage) :
                            fileUrl(new User().getDefaultUserprofileName());

                        var createByImage = o.createByImage;
                        var createdByImg = (createByImage) ?
                            fileUrl(createByImage) :
                            " ";

                        var backlogName = `<a href1="#" onclick="callStoryCard('${o.fkBacklogId}')">${replaceTags(o.backlogName)}</a>`;
                        var taskName = '<a class="task-list-name issue_' + o.id + '" href="#" onclick="taskManagement.updateTask.callTaskCard4BugTask(this,\'' + o.fkProjectId + '\',\'' + o.id + '\')" >' + replaceTags(fnline2Text(o.taskName)) + '</a>';
                        var task_id = getTaskCode(o.id);

                        var prtDiv = `<div class="cs-tecili"><i class="cs-svg-icon flame"></i></div>`;
                  const t=   $('<tr>')
                            .attr("id", o.id)
                            .attr("projectId", o.fkProjectId)
                            .attr("stIdr", o.fkBacklogId)
                            .addClass('bug-tr')
                            .append($('<td>').attr("style", "width:25px;")
                                .append(row)
                            )
                            .append($('<td>').attr("style", "width:30px;")
                                .addClass('bug-list-checkbox')
                                .append('<input class="checkbox-issue-task" type="checkbox">')
                            )
                            .append($('<td>').addClass('bug-list-column').attr("style", "width:100px;")
                                .addClass('bug-list-column-task-id').append(task_id))
                            .append($('<td>').addClass('bug-list-column-0').attr("style", "width:30px; padding: 0;")
                                .addClass('bug-list-column-task-deadline')
                                .append(getTimeDifference(endTime, startTime))
                            )
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-task-status cs-input-group')
                                .css("text-align", 'left')
                                .css("padding-left", '3px')
                                .css("overflow", 'initial')
                                .append($("<div>")
                                    .append($("<div>")
                                        .addClass('position-relative us-item-status-' + o.taskStatus)
                                        .append($('<span>')
                                            .append(getStatusName(o.taskStatus)))
                                        .append((o.taskPriority === '9') ? prtDiv : ""))
                                ))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-ismeet cs-input-group')
                                 .append(o.isMeet==='1'?'<i class="cs-svg-icon users-dark"></i>':'<i class="cs-svg-icon tapshiriq-dark"></i>')
                                 .append(o.isMeet==='1'?"Toplantı":"Tapşırıq")
                                  )
                           .append($('<td>')
                                .addClass('bug-list-column')
                                .attr("data-placement","top")
                                .attr("data-toggle","popover")
                                .attr("data-trigger","hover")
                                .attr("data-content",replaceTags(fnline2Text(o.taskName)))
                                .addClass('bug-list-column-task-name')
                                .css("max-width", '240px')
                                .append((o.fkParentTaskId) ? "<i class='fa fa-level-up bug-list-column-task-name-icon'>" : "")
                                .attr('title', (o.fkParentTaskId) ? "Has Parent Task" : "")
                                .append(taskName, ' ')
                                .append("<input type='text' class=' task-name-issue select-box-issue'>")
                                
                                // .append((o.fkParentTaskId) ? "<i class='fa fa-level-up '>" : "")
                                .attr('title', (o.fkParentTaskId) ? "Has Parent Task" : "")
                            )
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-task-nature')
                                .append($("<div>")
                                    .addClass("dropdown ")
                                    .append($("<div>")
                                        .attr("id", "bug-taskNature-dropdown")
                                        .append(o.taskNature == 'bug' ? '<i class="fas fa-bug" style="color: red;"></i>' : "")
                                        .append(o.taskNature == 'change' ? '<i class="fas fa-edit" style="color: #FF7F50;"></i>' : "")
                                        .append(o.taskNature == 'new' ? '<i class="fas fa-file-alt"></i>' : "")
        
                                    )))
                            .append($('<td>').addClass('bug-list-column')
                                .attr("data-placement","top")
                                .attr("data-toggle","popover")
                                .attr("data-trigger","hover")
                                .attr("data-content",o.taskTypeName)
                                .addClass('bug-list-column-tasktype')
                                .append($("<div>")
                                    .addClass(" ")
                                    .append($("<div>")
                                        .attr("id", "bug-taskNature-dropdown")
                                        .append(o.taskTypeName)
                                    )))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-priority get-data-group').append(replaceTags(o.taskPriority)))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-story-card')
                                .attr("data-placement","top")
                                .attr("data-toggle","popover")
                                .attr("data-trigger","hover")
                                .attr("data-content",backlogName)
                                .append("<span class='get-data-group ellipsis-story-card'>" + backlogName + "</span>")
                                .append($('<div>').addClass('set-filter-box')
                                    .append($('<i class="fa fa-filter">')
                                        .attr('onclick', 'setFilter4IssueMgmtAsBacklog("' + o.fkProjectId + '","' + o.fkBacklogId + '")')
                                        .css("display", "none")
                                        .addClass("hpYuyept"))

                                )
                                .mouseover(function () {
                                    $(this).find(".hpYuyept").show();
                                    $(this).find(".hpYuyept1").show();
                                })
                                .mouseleave(function () {
                                    $(this).find(".hpYuyept").hide();
                                    $(this).find(".hpYuyept1").hide();
                                })
                            )
                            .append($('<td>').addClass('bug-list-column')
                                .attr("data-placement","top")
                                .attr("data-toggle","popover")
                                .attr("data-trigger","hover")
                                .attr("data-content",replaceTags(o.projectName))
                                .attr("style", "max-width:200px;")
                                .addClass('bug-list-column-project')
                                .append("<span class='get-data-group'>" + replaceTags(o.projectName) + "</span>")
                                .append($('<i class="fa fa-filter">')
                                    .attr('onclick', 'setFilter4IssueMgmtAsProject("' + o.fkProjectId + '")')
                                    .css("display", "none")
                                    .addClass("hpYuyept"))
                                .mouseover(function () {
                                    $(this).find(".hpYuyept").show();
                                })
                                .mouseleave(function () {
                                    $(this).find(".hpYuyept").hide();
                                }))
                            .append($('<td>')
                                .css('white-space', 'nowrap').css("text-align", 'center')
                                .addClass('bug-list-column')
                                .addClass('bug-list-column-assignee')
                                .append(genUserTrblock(o.userName, img,"Assigne",o.fkAssigneeId))
                                .append($('<i class="fa fa-filter">')
                                    .attr('onclick', 'setFilter4IssueMgmtAsAssigne("' + o.fkAssigneeId + '")')
                                    .css("display", "none")
                                    .addClass("hpYuyept"))
                                .mouseover(function () {
                                    $(this).find(".hpYuyept").show();
                                })
                                .mouseleave(function () {
                                    $(this).find(".hpYuyept").hide();
                                }))
                            .append($('<td>').addClass('bug-list-column')
                                .css('white-space', 'nowrap').css("text-align", 'center')
                                .addClass('bug-list-column-created-by ')
                                .append(genUserTrblock(o.createByName, createdByImg,"Created by",o.createdBy))
                                .append($('<i class="fa fa-filter">')
                                    .attr('onclick', 'setFilter4IssueMgmtAsProject("' + o.fkProjectId + '")')
                                    .css("display", "none")
                                    .addClass("hpYuyept"))
                                .mouseover(function () {
                                    $(this).find(".hpYuyept").show();
                                })
                                .mouseleave(function () {
                                    $(this).find(".hpYuyept").hide();
                                })
                            )
                            .append($('<td>').addClass('bug-list-column')
                                .css('white-space', 'nowrap').css("text-align", 'center')
                                .addClass('bug-list-column-created-date').append("<span class='get-data-group'>" + Utility.convertDate(o.createdDate) + "</span>"))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-close-date')
                                .append((o.closeStatusDate) ?
                                    "<span class='get-data-group'>" + Utility.convertDate(o.closeStatusDate) + " : " + Utility.convertTime(o.closeStatusTime) + "</span>" :
                                    ""))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-closed-by')
                                .append("<span class='get-data-group'>" + o.closedByName + "</span>"))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-last-update').append("<span class='get-data-group'>" + (o.lastUpdatedDate) ? Utility.convertDate(o.lastUpdatedDate) : "" + "</span>"))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-estimated-hours').append((o.estimatedHours !== '0') ? o.estimatedHours : ""))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-spent-hours').append((o.spentHours !== '0') ? o.spentHours : ""))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-estimated-counter').append((o.estimatedCounter !== '0') ? o.estimatedCounter : ""))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-executed-counter').append((o.executedCounter !== '0') ? o.executedCounter : ""))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-estimated-budget').append((o.estimatedBudget !== '0') ? o.estimatedBudget : ""))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-spent-budget').append((o.spentBudget !== '0') ? o.spentBudget : ""))

                    return t
                }
            },
        },

    },
    genBlockMain: function () {
        return `<div class="cs-core-issue-management brand-issue-management">
        <div class="panel-container">
            <div class="main-section"></div>
        <div class="right-section">
            <div class="setting-panel d-flex">
                <div class="setting-btn-panel">
                   <div class="setting-btn-panel-in">
                        <div class="setting-elemen-box">
                            <div class="standart-badges notification-btn">
                                <span class="info">12</span>
                                <i class="cs-svg-icon task-01"></i>
                            </div>
                        </div>
                        <hr class="rcs-hr">
                        <div class="setting-elemen-box pb-0">
                            <div class="standart-badges taskfilter-btn" data-placement="left" data-toggle="popover" data-trigger="hover" data-content="Filter">
                                 <span class="info">0</span>
                                <i class="cs-svg-icon filter"></i>
                            </div>
                        </div>
                        <div class="setting-elemen-box">
                            <div class="standart-badges tasklabel-btn" data-placement="left" data-toggle="popover" data-trigger="hover" data-content="Label">
                                <i class="fas fa-tag" style="color:#fff; font-size: 21px;"></i>
                            </div>
                        </div>
                        <div class="setting-elemen-box">
                            <div class="standart-badges tasksprint-btn" data-placement="left" data-toggle="popover" data-trigger="hover" data-content="Sprint">
                                <i class="fas fa-running" style=" color: #fff; font-size: 21px;"></i>
                            </div>
    
                        </div>
                        <!--<div class="setting-elemen-box">
                            <div class="sticky-badges" data-placement="left" data-toggle="popover" data-trigger="hover" data-content="Notes">
                                <i class="cs-svg-icon sticky-notes"></i>
                            </div>
                        </div>-->       
                        <hr class="rcs-hr">
                        <!-- <div class="setting-elemen-box">
                            <div class="calendar-badges" data-placement="left" data-toggle="popover" data-trigger="hover" data-content="Calendar">
                                <span class="calendar-info">19</span>
                                <i class="cs-svg-icon calendar-02"></i>
                            </div>
                        </div>-->
                        <div class="setting-elemen-box issue-view-change-button" view-type='table' >
                            <div class="standart-badges" data-placement="left" data-toggle="popover" data-trigger="hover" data-content="Row Style">
                                <i class="cs-svg-icon cs-row-style"></i>
                            </div>
                        </div>
                        <div class="setting-elemen-box issue-view-change-button" view-type='kanban'>
                            <div class="standart-badges" data-placement="left" data-toggle="popover" data-trigger="hover" data-content="Canban Style">
                                <i class="cs-svg-icon cs-col-style"></i>
                            </div>
                        </div>
                        <div class="btn-panel-bottom" >
                            <div class="setting-elemen-box">
                                
                                <div class="standart-badges" id="addNewTaskButton"   style="margin-bottom: 5px;background: rgb(0 0 0 / 20%);border-radius: 50px;height: 28px;width: 28px;padding: 1px;color: #fff;border: 1px solid rgb(0 0 0 / 20%);">
                                    <i class="fa fa-plus"></i>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
                <div class="setting-views-panel mr-auto">
                    <div class="setting-views-panel-in">
                        <div class="setting-headline d-flex">
                            <div class="title mr-auto">Qeydlər</div>
                            <div class="close-panel"><i class="cs-svg-icon x-close"></i></div>
                        </div>
                        <div class="setting-main" id="main-sidebar-div">
                                                      
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    </div>`
    },
    getBacklogLIstByprojectId: function (projectId) {
        if (!projectId) {
            return;
        }

        var json = initJSON();
        json.kv.fkProjectId = projectId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmLoadStoryCardByProject",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                try {
                    var el = $('#bug_filter_backlog_id_add');
                    el.html('');
                    var obj = res.tbl[0].r;
                    for (var i in obj) {
                        var o = obj[i];
                        el.append($('<option>')
                            .val(o.id)
                            .text(o.backlogName));
                    }
                } catch (err) {

                }
                $('#bug_filter_backlog_id_add').selectpicker('refresh');
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setBugFilterProjectAdd: function (elId) {
        var select = $("#" + elId);
        var keys = Object.keys(SACore.Project);
        select.append($("<option>")
            .val("")
            .text("All Projects"))
        for (var id in keys) {
            var pid = keys[id];
            select.append($("<option>")
                .val(pid)
                .text(SACore.Project[pid]))
        }

        $('#' + elId).selectpicker('refresh');
    },
    add_loadTaskType_bug_list: function (elm, dlm) {
        var json = {
            kv: {}
        };
        try {
            json.kv.cookie = getToken();
        } catch (err) {}
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'typeName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskTypeList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {

                var dt = res.tbl[0].r;
                for (let index = 0; index < dt.length; index++) {

                    var nm = dt[index].typeName;
                    var ids = dt[index].id;
                    var opt = $('<option>').val(ids).text(nm);
                    $(elm).append(opt);
                    if (dlm = 'load') {
                        try {
                            $(elm).val(coreBugKV[global_var.current_issue_id].fkTaskTypeId);

                        } catch (error) {

                        }
                    }
                    $(elm).selectpicker('refresh')
                }
            }
        });
    },
    getUserListWithImageSelectbox: function (projectId, type) {
        var json = initJSON();
        json.kv.fkProjectId = projectId ? projectId : global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        console.log('sdfsdfsdf');
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmLoadAssigneeByProject",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {

                if (type === 'update') {
                    taskManagement.updateTask.loadAssigneesByProjectDetails(res);
                } else if (type === 'create') {
                    taskManagement.insertTask.loadAssigneesByProjectDetails(res);
                }

            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    }
}
function getValueScheduleWeekDay(elmId) {
       var list =''; 
       var block  =  $("#"+elmId).find('input[type="checkbox"]');
          block.each(function (params) {
              if($(this).prop("checked")){
                  list += $(this).val() + '%IN%'
              }
          })
       return list ;
}
function getValueScheduleWeekAction(elmId) {
       var list =''; 
       var block  =  $("#"+elmId).find('input[type="checkbox"]');
          block.each(function () {
              if($(this).prop("checked")){
                  list += $(this).val() + '%IN%'
              }
          })
       return list ;
}
function setValueScheduleWeekDay(elmId,val) {
    try {
        var val =val.split('%IN%'); 
        for (let i = 0; i < val.length; i++) {
            const o = val[i];
            $("#"+elmId).find('input[value="'+o+'"]').prop("checked",true);
        }   
    } catch (error) {
        
    }
      
         
}
function setValueScheduleWeekAction(elmId) {
       var list =''; 
       var block  =  $("#"+elmId).find('input[type="checkbox"]');
          block.each(function () {
              if($(this).prop("checked")){
                  list += $(this).val() + '%IN%'
              }
          })
       return list ;
}
function getStatusName(id) {
       
    var nm  = lang_task.taskStatus[id.trim()];
    return nm
}
function getOperName(id) {
    var nm  = lang_task.windowUpdateTask[id.trim()];
    return nm
}
function startTimeCurrent(id) {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    var dt  = hr + ":" + min ;
    
    
    var curDay = today.getDate();
    var curMonth = today.getMonth()+1;
    var curYear = today.getFullYear();
    var date = checkTime(curDay)+"."+checkTime(curMonth)+"."+checkTime(curYear);
    $("#"+id).attr("placeholder",date+" "+dt)
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function notChwk() {
    if(global_screen_name==='ch'){
         return null;
    }else{
        return  true
    }
}
function getTaskCode(taskId) {
    try {
        var orderSeq = SATask.GetDetails(taskId, 'orderNoSeq');
        var projectId = SATask.GetDetails(taskId, 'fkProjectId');
        var projectCode = SACore.GetProjectCore(projectId).projectCode;
        projectCode = projectCode.toUpperCase();

        var taskId = (orderSeq)
                ? (replaceTags(projectCode)) ? replaceTags(projectCode) + "-" + orderSeq : orderSeq : "";
        taskId = "<b>" + taskId + "</b>";
        return taskId;
    } catch (err) {
        var orderSeq = SATask.GetDetails(taskId, 'orderNoSeq');
        taskId = "<b>" + "PRVT-"+orderSeq + "</b>";
        return taskId;
    }
}

// task-management event  list  add section events start >>>>>>>>START>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var getTimeDifference = function (from, to) {


    var difMs = (from - to);
    var colorClass

    /* if(difMs<=0){
        return 0 + " days, " + 0 + " hours, " + 0 + " mins";
    }else{ */
    var difDays = Math.floor(difMs / 86400000);
    var difHrs = Math.floor((difMs % 86400000) / 3600000);
    var difMins = Math.round(((difMs % 86400000) % 3600000) / 60000);
    var txt = difDays + " d, " + difHrs + " h, " + difMins + " m";
    var time = '';
    if (parseFloat(difMins) !== 0) {
        time = difMins + "m"
    }
    if (parseFloat(difHrs) !== 0) {
        time = difHrs + "h"
    }
    if (parseFloat(difDays) !== 0) {
        time = difDays + "d"
    }
    if (difMs < 0) {
        colorClass = 'kecib'
    } else {
        if (difDays > 0) {
            colorClass = "gelecek"
        } else if (difDays === 0) {
            colorClass = "bugun"
        } else {
            colorClass = "nodeadline"
        }
    }
    var div = $('<div>')
        .addClass('td-deadline-box ')
        .addClass(colorClass)
        .append($('<span>')
            .html(difMins ? `<div data-placement="top" data-toggle="popover" data-trigger="hover" data-content="${txt}" >${time}</div>` : '<i class="fas fa-ellipsis-h"></i>'))

    var bl = $("<div>").html(div)
    return bl.html();
    // } 
}

$(document).on("change", '#updateCheckList', function (e) {


    var tskId = Utility.getParamFromUrl('current_issue_id')

    taskManagement.insertTask.insertCheckListComulativCore($(this).val() + "|", tskId, 'update')
    $(this).val('');

})

$(document).on("change", '#run_task_weekday_select_detail input', function (e) {

        var val  = getValueScheduleWeekDay("run_task_weekday_select_detail");
        updateTask4ShortChangePureDetail(val, "weekdays", global_var.current_issue_id);
    

})
$(document).on("change", '#run_task_day_yearly_select_detail input', function (e) {

        var val  = getValueScheduleWeekAction("run_task_day_yearly_select_detail");
        updateTask4ShortChangePureDetail(val, "monthlyAction", global_var.current_issue_id);
    

})

$(document).on("click", '#issue-table-aktiv-all .dropdown-item', function (e) {
    var ty = $(this).attr('all-aktiv');
    localStorage.setItem("issue_mode_active", ty);
    $(this).closest('#issue-table-aktiv-all').find('.title').text(ty)
    var sel = $("#bug_filter_status");
    let value
    if (ty === 'A') {
        value = ["new", 'ongoing', 'waiting']
    } else if (ty === 'P') {
        value = ["rejected",notChwk()?'UAT':"", 'closed', 'canceled']
    }
    sel.val(value);
    sel.selectpicker("refresh");
    taskManagement.readTask.genBlockTask.getstatisticList();
    getBugList();

})
$(document).on("change", '#newAddCheckList', function (e) {

    $(this).parent().find('ul').prepend(`<li class="d-flex">
    <div class="item-checkbox">
    <label class="checkmarkcontainer">
    <input class="taskCheckListItemToggle noteCheckListItem" oid="22011021582408303160" type="checkbox">
    <span class="checkmark">
    </span></label>
    </div>
    <div class="mr-auto w-100">
    <textarea rows="1" class="form-control " oid="">${$(this).val()}</textarea></div>
    <div class="pl-1 p2-1"></div>
    <div class="pl-1 p2-1">
    </div>
    <div class="pl-1 p2-1 d-table">
    <a href="#" oid="" class="taskCheckListItemDeletecreate" style="font-size:13px;"><i class="fas fa-trash-alt" aria-hidden="true"></i></a></div></li>`)
    $(this).val('');
    $(this).parent().find("ul textarea").autoHeight();

})

$(document).on('click', '.taskCheckListItemDeletecreate', function (event) {
     $(this).closest('li').remove();
})
$(document).on('click', '.add-task-us-card-managmenet', function (event) {
    taskManagement.insertTask.genBlockModal.Init()
    loadBugTaskDeadlineScripts()
    var bgid = $(this).parents('.task-content').attr("bid")
    var prId = getProjectIdOfBacklog(bgid); //$("#story_mn_filter_project_id").val();
    $("#bug_filter_project_id_add").val(prId).change();
    $("#bug_filter_backlog_id_add").val(bgid).change();
    global_var.active_canvas = 'taskCreate';
    taskManagement.setBugFilterProjectAdd('bug_filter_project_id_add');
    var dwlmt = $('#bug_task_type_id_add')
    taskManagement.add_loadTaskType_bug_list(dwlmt);
  //  taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');

    $("#issue-managment-add-task").modal("show");

});
$(document).on('click', '#addModalBugIssueTaskMng', function (event) {

    taskManagement.insertTask.genBlockModal.Init()
    loadBugTaskDeadlineScripts()
    var bgid = $(this).attr("bid")
    var prId = $(this).attr("pid"); //$("#story_mn_filter_project_id").val();
    $("#bug_filter_project_id_add").val(prId).change();
    $("#bug_filter_backlog_id_add").val(bgid).change();
    global_var.active_canvas = 'taskCreate';
    taskManagement.setBugFilterProjectAdd('bug_filter_project_id_add');
    var dwlmt = $('#bug_task_type_id_add')
    taskManagement.add_loadTaskType_bug_list(dwlmt);
  //  taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');

    $("#issue-managment-add-task").modal("show");

});
$(document).on('click', '#addProjectBugIssueTaskMng', function (event) {

    var manId = Utility.getParamFromUrl("fkManualProjectId")
    taskManagement.insertTask.genBlockModal.Init()
    loadBugTaskDeadlineScripts()
    var bgid = manId ? "" : getCurrentModalId4UsTask();
    var prId = manId ? manId : '21062415244905361923'; //$("#story_mn_filter_project_id").val();
    $("#bug_filter_project_id_add").val(prId).change();
    $("#bug_filter_backlog_id_add").val(bgid).change();
    $("#bug_task_nature_id_add").val("bug");
    $("#bug_task_nature_id_add").selectpicker("refresh");

    global_var.active_canvas = 'taskCreate';
    taskManagement.setBugFilterProjectAdd('bug_filter_project_id_add');
    var dwlmt = $('#bug_task_type_id_add')
    taskManagement.add_loadTaskType_bug_list(dwlmt);
  //  taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');

    $("#issue-managment-add-task").modal("show");

});
$(document).on("change", '#bug_filter_project_id_add', function (e) {
    var id = $(this).val();
    taskManagement.getBacklogLIstByprojectId(id)


})
$(document).on("click", '.issue-view-change-button', function (e) {
    var ty = $(this).attr('view-type');
    localStorage.setItem('task-view-format', ty);
    taskManagement.readTask.genBlockTask.Init($('.main-section'));
    getBugList();

})
$(document).on("click", '#addNewTaskButton', function (e) {
    taskManagement.insertTask.genBlockModal.Init();
    loadBugTaskDeadlineScripts()
    reset_task_data();
    global_var.active_canvas = 'taskCreate';
    taskManagement.setBugFilterProjectAdd('bug_filter_project_id_add');
    var dwlmt = $('#bug_task_type_id_add')
    taskManagement.add_loadTaskType_bug_list(dwlmt);
  //  taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');
    $("#issue-managment-add-task").modal("show");

})

function getCurrentModalId4UsTask() {
    var idb = '';

    if (global_var.current_modal === 'loadStoryCardMgmt') {
        idb = '21082003291903775632'
    }
    if (global_var.current_modal === 'loadStoryCard') {
        idb = '21122411175006081920'
    }
    if (global_var.current_modal === 'loadDev') {
        idb = '21122518513102431977'
    }
    if (global_var.current_modal === 'loadCodeGround') {
        idb = '21122518532301398391'
    }
    if (global_var.current_modal === 'loadProjectManagement') {
        idb = '21090713220709994607'
    }
    if (global_var.current_modal === 'loadDashboard') {
        idb = '210820032833056810823'
    }
    if (global_var.current_modal === 'loadTaskManagement') {
        idb = '21082003302308873715'
    }
    if (global_var.current_modal === 'loadBusinessCase') {
        idb = '21082003314403151270'
    }
    if (global_var.current_modal === 'loadBugChange') {
        idb = '21082003275802222786'
    }
    if (global_var.current_modal === 'loadTestCase') {
        idb = '21082003310301912293'
    }
    if (global_var.current_modal === 'loadDocEditor') {
        idb = '21082003312500622676'
    }
    if (global_var.current_modal === 'loadRunService') {
        idb = '21110810291103705004'
    }
    if (global_var.current_modal === 'loadBusinessService') {
        idb = '21082003320807935137';
    }
    if (global_var.current_modal === 'loadActivityDiagram') {
        idb = '';
    }
    if (global_var.current_modal === 'loadSourceActivity') {
        idb = '';
    }
    if (global_var.current_modal === 'loadEntityDiagram') {
        idb = '21082003322903142571';
    }
    if (global_var.current_modal === 'loadSqlBoard') {
        idb = '21102000014805402484';
    }
    if (global_var.current_modal === 'loadFn') {
        idb = '22011514411404426625';
    }

    return idb;
}

$(document).on("click", '#addIssueButtonId', function (e) {
    // $('#issue-managment-add-task .after-add-task').show();
    /* $('#issue-managment-add-task .after-add-task').css("pointer-events", "auto");
    $('#issue-managment-add-task .after-add-task').css("opacity", "1");
    $('#issue-managment-add-task .task-step-1').hide();
    $('#issue-managment-add-task .task-step-2').show(); */
 
    taskManagement.insertTask.insertNewTask();


})
$(document).on("click", '#add-child-task-open-modal', function (e) {
    var taskId = global_var.current_issue_id
    taskManagement.insertTask.genBlockModal.Init();
    loadBugTaskDeadlineScripts()
    reset_task_data();
    global_var.active_canvas = 'taskCreate';
    taskManagement.setBugFilterProjectAdd('bug_filter_project_id_add');
    var dwlmt = $('#bug_task_type_id_add')
    taskManagement.add_loadTaskType_bug_list(dwlmt);
    //taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');
    $("#parent-task-id-input").val(taskId);
    $("#issue-managment-add-task").modal("show");


})
$(document).on("keyup", "#taskNameInputNew2", function (event) {
    if (event.keyCode == 13) {
        if (event.shiftKey) {
            taskManagement.insertTask.insertNewTask();
        }
    }
});
$(document).on("click", '#multi-edit-menu-btn', function (e) {
    taskManagement.setBugFilterProjectAdd('bug_filter_project_id_multi');
    var dwlmt = $('#bug_task_type_id_multi');
    $("#update_multi_bug_change_btn").attr("data-pid",$(this).attr("pid"));
    if(global_var.current_modal==='loadStoryCardMgmt'||global_var.current_modal==='loadStoryCard'){
        $("select.bug-mgmt-filter-select").selectpicker("refresh");
     
        loadUsersAs4ComboByElm($('#bug_filter_assignee_id_multi'))
    }
    taskManagement.add_loadTaskType_bug_list(dwlmt);
})

$(document).on("click", ".addObserverToTAsk", function (e) {
    var div = $('div.task-observer-list');
    var table = $('<table>')
        .addClass('table table-hover project-table-list defaultTable sar-table');
    table.append($('<thead>')
        .append($("<tr>")
            .append($("<th>")
                .css("width", "1%")
                .text("#"))
            .append($('<th>')
                .text("Observer"))))

    var usId = $("#createdtask_oblerverlist").val();
    var ct = table.find("tbody tr")
    /*    callService('serviceTminsertTaskObserver',
               {"fkTaskId": global_var.current_task_id_4_comment,
                   "fkUserId": $('#updatetask_oblerverlist').val()}, true
               , function () {
                   getTaskkObserverList(global_var.current_task_id_4_comment)
               }); */
    if (div.find(".project-table-list").length < 1) {
        div.html(table);
    } else {
        table = div.find(".project-table-list")
    }
    var det = $(table).find('tr#' + usId);
    var userSpan = (usId) ?
        $('<span>')
        .attr('title', 'Observer ')
        .addClass('peronal-info')
        .append($('<img>')
            .addClass('Assigne-card-story-select-img')
            .attr('width', '40px')
            .attr('src', fileUrl(SAProjectUser.Users[usId].userImage)))
        .append($('<span>').text(SAProjectUser.Users[usId].userPersonName))

        :
        '';

    var tr = $("<tr>")
        .attr('id', usId)
        .append($('<td>').text((parseFloat(ct.length) + 1)))
        .append($('<td>')
            .append(userSpan))
        .append($('<td>')
            .append($('<a href="#">')
                .attr('oid', usId)
                .addClass("taskObserverDelete")
                .append('<i class="fas fa-trash-alt" aria-hidden="true"></i>')));
    if (det.length < 1) {
        table.append(tr);
        // nl++
    } else {
        Toaster.showError("İstifadəçi daxil edilib");
    }



})


function deleteComment(commentId) {


    //        console.log('task id'+taskId);
    if (!commentId) {
        return;
    }

    if (!confirm("Are you sure?")) {
        return;
    }

    var json = {
        kv: {}
    };
    try {
        json.kv.cookie = getToken();
    } catch (err) {}
    json.kv.id = commentId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmDeleteComment",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            taskManagement.updateTask.genCommentListOfTask();
        }
    });
}

function convertCommentHtml2TextArea(el, commentId) {
    new UserStory().convertCommentHtml2TextAreaNoChange($('#' + commentId));
    $(el).closest("div").find('.saveComment').show();
}

function saveComment(el, commentId) {
    new UserStory().saveCommentUpdate($('#' + commentId));
    new UserStory().convertTextArea2HtmlAsText($('#' + commentId));
    $(el).hide();
}

// created
$(document).on("click", '#toplanti-btn', function () {
    $(this).addClass('active');
    $(this).closest('.task-deadline-boxes').find('.tapshiriq-btn').removeClass('active');
    // $(this).closest('.modal-body').find('.loadUserForObserver i.cs-svg-icon').removeClass('observer').addClass('participant');
    // $(this).closest('.modal-body').find('.loadUserForObserver span').text('').text('Participant');

    $("#newAddCheckList").attr("placeholder",'Gündəm');
    $(".observer-div-add-issue .add-userList-title").text(lang_task.windowAddTask.participant+":");
});
$(document).on("click", '#tapshiriq-btn', function () {
    $(this).addClass('active');
    $(this).closest('.task-deadline-boxes').find('.toplanti-btn').removeClass('active');
    // $('.loadUserForObserver i.cs-svg-icon').removeClass('participant').addClass('observer');
    
    $("#newAddCheckList").attr("placeholder",lang_task.windowUpdateTask.description);
    $(".observer-div-add-issue .add-userList-title").text(lang_task.windowAddTask.observer+":");
});

// updated start
$(document).on("click", '#toplanti-d-btn', function () {
   
    updateTask4ShortChangeDetails('1', "isMeet");
    changeMeetAndTask(this,'1');
});
function changeMeetAndTask(elm,value){
    if(value==='1'){
        $(elm).addClass('active');
        $(elm).closest('.modal-body').find('.tapshiriq-btn').removeClass('active');
        $(elm).closest('.modal-body').find('.loadUserForObserver i.cs-svg-icon').removeClass('observer').addClass('participant');
        $(elm).closest('.modal-body').find('.loadUserForObserver span').text('').text('Participant');
    
        $(elm).closest('.modal-body').find('.loadUserForSubtask i.cs-svg-icon').removeClass('subtask-light').addClass('hammer');
        $(elm).closest('.modal-body').find('.loadUserForSubtask span').text('').text('Decisions');
        $("#updateCheckList").attr("placeholder",'Gündəm');
        $(".observer-div-update-issue .add-userList-title").text(lang_task.windowAddTask.participant+":");
    }else {
        $(elm).addClass('active');
   
        $(elm).closest('.modal-body').find('.toplanti-btn').removeClass('active');
    
        $(elm).closest('.modal-body').find('.loadUserForObserver i.cs-svg-icon').removeClass('participant').addClass('observer');
        $(elm).closest('.modal-body').find('.loadUserForObserver span').text('').text('Observer');
    
        $(elm).closest('.modal-body').find('.loadUserForSubtask i.cs-svg-icon').removeClass('hammer').addClass('subtask-light');
        $(elm).closest('.modal-body').find('.loadUserForSubtask span').text('').text('Subtask');
        $("#updateCheckList").attr("placeholder",lang_task.windowUpdateTask.description);
        $(".observer-div-update-issue .add-userList-title").text(lang_task.windowAddTask.observer+":");
    }
}
$(document).on("click", '#tapshiriq-d-btn', function () {
    updateTask4ShortChangeDetails('0', "isMeet");
    changeMeetAndTask(this,'0');
});
// updated finally
$(document).on("change", '.assigne-div-update-issue select.user-list-selectbox-single', function () {
      var val  = $(this).closest('.assigne-div-update-issue').getVal();
    updateTask4ShortChangeDetails(val, "fkAssigneeId");
});
$(document).on("change", '.observer-div-update-issue select.user-list-selectbox-multiple', function () {
      var val  = $(this).closest('.observer-div-update-issue').find('.user-list-avatar-multiple li:last-child').attr("id");
      console.log(val);
      var taskid = Utility.getParamFromUrl('current_issue_id');
      taskManagement.updateTask.updateObserverTask(taskid, val);
});
$(document).on("delete-interactive", '.observer-div-update-issue', function (e,id) {
 
    callApi('22012614383006986455', {id: id});

});



$(document).on('click', '#updateTask-priority-btn', function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
        updateTask4ShortChangeDetails('9', "taskPriority");
    } else {
        updateTask4ShortChangeDetails('1', "taskPriority");
    }
})
$(document).on('click', '#cerateTask-priority-btn', function () {
    $(this).toggleClass('active');
})
$(document).on('click', '#issue-list-statistic-block .info-item-elements', function () {

})
$(document).on('click', '#issue-list-statistic-block .info-item-elements.status-class', function () {
    $(this).toggleClass('active');
    var items = $(this).parent().find('.info-item-elements.status-class.active');
    var statlist = [];
    var sel = $("#bug_filter_status");
    items.each(function (index) {
        statlist.push($(this).attr('data-status'));
    })
    sel.val(statlist);
    sel.selectpicker("refresh");
    getBugList();
})
$(document).on('click', '#issue-list-statistic-block .info-item-elements.deadline-class', function () {
    $(this).toggleClass('active');
    getBugList();
})
$(document).on('click', '.more-button-forIssue', function () {
     var type  = $(this).attr('data-type');
     var pageNo  = $(this).attr('start-limit');
     var st  = $(this).attr('data-status');
     taskManagement.readTask.genBlockTask.genKanbanView.getTaskList4KanbanMore(type, st,pageNo)
    
})

// task-management event  list  add section events end >>>>>>>END>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function reset_task_data() {
    $('.task-events-created').attr("data-taskid", '');
    $('.task-events-created input').val('');
    $('.task-events-created input').change('');
    $('input#taskNameInputNew2').val('');
    $('#addComment4Task_comment_new').val('');
    emptyCanvasDiv();
    $("#progress_bar_new").empty();
    $(".issue-managment-add-task .task-check-list-box ul").empty();
}
if (self.CavalryLogger) {
    CavalryLogger.start_js(["jMqsAf+"]);
}

$(document).on("click", '.setting-elemen-box .notification-btn', function () {
    $('#main-sidebar-div>div').hide();
    $('#main-sidebar-div .notifcation-block').show();  
    taskManagement.readTask.genBlockTask.getNotificationList();  
});
$(document).on("click",'.cs-task-item-in-box',function (params) {
    global_var.current_issue_id = $(this).attr('id');
    Utility.addParamToUrl("current_issue_id",$(this).attr('id'))
})
$(document).on("click",'.filter-task-list-btn',function (e) {
    $(this).closest('.info-box').find(".filter-task-list-btn").removeClass("active");
    $(this).toggleClass("active");
    getBugList();
})
$(document).on("click",'.cs-next-large-modal-btn',function (e) {
//    $(this).closest('.cs-task-col').toggleClass('large-modal-expand');

   $(this).closest(".cs-task-col").toggleClass("large-modal-expand");
 if($(this).closest(".cs-task-col").hasClass('large-modal-expand')){
     $('.cs-task-panel-column').stop().animate({
         scrollLeft:$(this).closest(".cs-task-panel-column").scrollLeft() + $(this).closest(".cs-task-col").position().left-15
     }, 200);
 }
})

$(document).on("click", '.info-box.info-box-mob>.title', function () {
    $(this).closest('.info-box.info-box-mob').toggleClass('active');
});

$(document).on("change",'.bugListNavMenu.bugList-elements',function (e) {
   // $('.setting-elemen-box.task-clear-filter-onoff').css({'display': 'block'});
});
$(document).on("click",'.task-clear-filter-btn',function (e) {
    $('.bugListNavMenu.bugList-elements').find("select.bug-filter-multi").val('');
    $('.bugListNavMenu.bugList-elements').find("select.bug-filter").val('');
    $('.bugListNavMenu.bugList-elements .bug-filter-multi').selectpicker('refresh');
    $('.bugListNavMenu.bugList-elements .bug-filter').selectpicker('refresh');
    $('#issue-list-datetime').val('');
    $('#issue_management_closed_date_from').val('');
    $('#inputGroupSelect01').val('0');
    $('#inputGroupSelect01').selectpicker('refresh');
    getBugList();
});

function loadBugTaskDeadlineScripts() {
    $("select.issue_selectpicker").selectpicker('refresh');
  
    setProjectListByID('run_task_project_name');
    $('#run_task_project_name').change();
    $("#runTaskStartDate").daterangepicker({
        format: 'YYYY/MM/DD',
        singleDatePicker: true
    });
    $("#runTaskEndDate").daterangepicker({
        format: 'YYYY/MM/DD',
        singleDatePicker: true
    });
    $('#runTaskTime').datetimepicker({
        format: 'HH:mm'
                // sideBySide: true
    });
    $('#runTaskExecutiveDate').daterangepicker({
        format: 'YYYY/MM/DD',
        singleDatePicker: true,
        drops: 'up'
    });
    $('.hr_spa').hide();

    $('.task-events-created .cs-input-group input[type="text"]').css("pointer-events", "none");
    $('.task-events-created .cs-input-group input[type="text"]').css("opacity", "0.7");
    $('.task-events-created .cs-input-group input[type="text"]').attr("disabled", true);
    // $('#issue-managment-add-task .after-add-task').hide();
   
    $('#issue-managment-add-task .task-step-2').hide();

    // TASK DETAILS ON
    setProjectListByID('run_task_project_name_detail');
    $('#run_task_project_name_detail').change();


    $("input.runTaskStartDate_detail").daterangepicker({
        format: 'YYYY/MM/DD',
        singleDatePicker: true
    });
    $('#runTaskExecutiveDate_detail').daterangepicker({
        format: 'YYYY/MM/DD',
        singleDatePicker: true,
        drops: 'up'
    });
    $('.shedule-elements').addClass('el-disabled');
    $('.shedule-elements.el-disabled .soon').css("pointer-events", "none");
    $('.shedule-elements.el-disabled .soon').css("opacity", "0.7");
    $('.shedule-elements.el-disabled .soon input').attr("disabled", true);
    $('.shedule-elements.el-disabled .soon select').attr("disabled", true);

    $('.run-shedule-elements').addClass('el-disabled');
    $('.run-shedule-elements.el-disabled .rsoon').css("pointer-events", "none");
    $('.run-shedule-elements.el-disabled .rsoon').css("opacity", "0.7");
    $('.run-shedule-elements.el-disabled .rsoon input').attr("disabled", true);
    $('.run-shedule-elements.el-disabled .rsoon select').attr("disabled", true);

    $('.task-events-updated .cs-input-group input[type="text"]').css("pointer-events", "none");
    $('.task-events-updated .cs-input-group input[type="text"]').css("opacity", "0.7");
    $('.task-events-updated .cs-input-group input[type="text"]').attr("disabled", true);

    // Task Deadline 
       
        $("input.taskDeadlineTime").datetimepicker({
            format: 'HH:mm',
            // inline: true
        });
        $("input.taskDeadlineDate").datetimepicker({
            format: 'YYYY-MM-DD'
            // singleDatePicker: true
        });
    
        $("#taskDetailDeadlineStartDade").datetimepicker({
            format: 'YYYY-MM-DD',
            // inline: true
        }).on('dp.change', function(event) {
            updateTask4ShortChange(this, 'startDate');
        });
        $("#taskDetailDeadlineStartTime").datetimepicker({
            format: 'HH:mm',
            // inline: true
        }).on('dp.change', function(event) {
            updateTask4ShortChange(this, 'startTime');
        });
        $("#taskDetailDeadlineEndDade").datetimepicker({
            format: 'YYYY-MM-DD',
        }).on('dp.change', function(event) {
            updateTask4ShortChange(this, 'endDate');
        });
        $("#taskDetailDeadlineEndTime").datetimepicker({
             format: 'HH:mm',
            // singleDatePicker: true
        }).on('dp.change', function(event) {
            updateTask4ShortChange(this, 'endTime');
        });

}


// function getInfoBoxResponsive() {
//     $(document).ready(function(){
//         var infoBoxHeight = $('.info-box.info-box-mob').height();
//         console.log(infoBoxHeight);
//         // $('.info-box.info-box-mob').css('height', infoBoxHeight);
//         if (infoBoxHeight > 35 ) {
//             $('.info-box.info-box-mob').addClass('info-box-res');
//         }else{
//             $('.info-box.info-box-mob').removeClass('info-box-res');
//         }
//     });
// }



function getParentTask() {
    var body = $('#d-task-tab5 .parent-task tbody');
    body.html("")

    var json = initJSON();
    json.kv.fkTaskId = global_var.current_issue_id;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetParentTask",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            try {
                var relId = res.kv.id;
                if (!relId) {
                    return
                }
                var fkParentTaskId = res.kv.fkTaskId;
                if (fkParentTaskId) {


                    var fkProjectId4 = res.kv.fkProjectId;
                    var parentTaskName = res.kv.taskName;
                    var orderNoSeq = res.kv.orderNoSeq;
                    try {
                        var projectCode = SACore.ProjectCore[fkProjectId4].projectCode;
                        var taskCodeID = " (" + projectCode.toUpperCase() + "-" + orderNoSeq + ") ";
                    } catch (error) {
                        var projectCode = "PRIVATE";
                    }

                    var taskName = add3Dots2String(parentTaskName, 50);

                    var tr = taskManagement.readTask.genBlockTask.genTableView.genTaskTableFormMini(res.kv,0) 
                    body.append(tr)

                }

            } catch (err) {

            }
        }
    });
}

function getChildTasks() {
    var tbody = $('.task-mgmt-modal-child-task tbody');
    tbody.html('');

    var json = initJSON();
    json.kv.fkTaskId = global_var.current_issue_id;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetChildTaskList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {

            try {
                var obj = res.tbl[0].r;
                
                for (var n = 0; n < obj.length; n++) {
                    var o = obj[n];

                    //set parent task info
                    

                    var fkProjectId4 = o.fkProjectId;
                    try {
                        var projectCode = SACore.ProjectCore[fkProjectId4].projectCode;
                        projectCode = " (" + projectCode.toUpperCase() + "-" + o.orderNoSeq + ") ";
                    } catch (error) {
                        var projectCode = 'PRIVATE';

                    }
                    tbody.each(function () {
                        $(this).append(taskManagement.readTask.genBlockTask.genTableView.genTaskTableFormMini(o,n) )

                    })

                }

            } catch (err) {
                // alert(err);
            }
        }
    });
}


function changeParentTaskModal() {
    $('#change-parent-task-modal').modal('show');
    var select = $('#change-parent-task-modal-parent-task-list');
    select.html('');
    select.append($('<option>').val('').text(''))

    var json = initJSON();
    json.kv['fkProjectId'] = global_var.current_project_id;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetTaskList4Short",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            try {
                var obj = res.tbl[0].r;
                for (var n = 0; n < obj.length; n++) {
                    var o = obj[n];

                    //set parent task info;
                    try {
                        var projectCode = SACore.ProjectCore[o.fkProjectId].projectCode;
                    } catch (error) {
                        var projectCode = "PRVT"
                    }
              
                    var nameFull = o.taskName + " (" + projectCode.toUpperCase() + "-" + o.orderNoSeq + ") "
                    select.append($('<option>').val(o.id).text(nameFull))
                }
                sortSelectBoxByElement(select);
            } catch (err) {
            }
        }
    });
}

function addParentTaskToTask() {
    updateTask4ShortChangeDetailsWithSync($('#change-parent-task-modal-parent-task-list').val(), 'fkParentTaskId');
    getParentTask();
    $('#change-parent-task-modal').modal('hide');
    $('#task-mgmt-modal-parent-task').text($('#change-parent-task-modal-parent-task-list option:selected').text())
    $('#task-mgmt-modal-parent-task').attr("pid", $('#change-parent-task-modal-parent-task-list').val());
}

function createChildTask() {


    var json = initJSON();
    json.kv.fkTaskId = global_var.current_issue_id;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmCreateChildTask",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            Toaster.showMessage("Child task is created.");

            getBugList();

        }
    });

}
$(document).click(function () {
    $("#contextMenu").hide();
  })
$(document).on("contextmenu", "#bugListTable tbody tr", function (e) {
   
    $(this).closest('tbody').find("tr").removeClass("active")
    $(this).addClass("active");
    global_var.current_issue_id = $(this).attr("id")
    $("#contextMenu").css({
        display: "block",
        left: e.pageX,
        top: e.pageY
    });
    return false;
});

$(document).on('change', ".saTypeFilePicherUploadFileTask", function (e) {
    if ($(this).val().trim().length > 0) {
        uploadFile4IpoTAsk($(this).attr('id'));
    }
})
$(document).on('change', "#bug_filter_columns", function (e) {
      localStorage.setItem("bug_list_colum",$(this).val());
    toggleColumns();
})
$(document).on('change', "#run_task_detail_detail_categories", function (e) {
    updateLabelTaskById($(this).val(),global_var.current_issue_id)
})
$(document).on('change', "#run_task_detail_detail_sprint", function (e) {
 
        updateSpirntTaskById($(this).val(),global_var.current_issue_id);
    
})
$(document).on('change', "#nextElementListSelect", function (e) {
        var value  = $(this).val();
        $(".forward-assignee-list").addClass("d-none");
       if(value==='ForwardTaskTo'){
        $(".forward-assignee-list").removeClass("d-none"); 
       }
})
$(document).on('click', "#nextBlockItemPopUp .cs-nextsave-btn", function (e) {
    var select  = $(this).closest('#nextBlockItemPopUp').find("#nextElementListSelect");
     var value  = select.val();
     var type  = select.attr('action-type');
     if(!type){
         if(value==='ididit'){
            iDidItAction()
          }
          else if (value==='ForwardTaskTo'){
            forwardTaskToAction();
          } 
          else if (value==='rejectTask'){
            rejectTaskAction();
          } 
          else if (value==='canceledTask'){
            cancelTaskAction();
          } 
     }else{

            var check = $("#bugListTable .bug-tr .checkbox-issue-task");
            
            for (var indx = 0; indx < check.length; indx++) {
                if ($(check[indx]).prop('checked')) {
                    var taskId = $(check[indx]).parents("tr").attr("id");
                    if(value==='ididit'){
                        iDidItAction(taskId)
                      }
                      else if (value==='ForwardTaskTo'){
                        forwardTaskToAction(taskId);
                      } 
                      else if (value==='rejectTask'){
                        rejectTaskAction(taskId);
                      } 
                      else if (value==='canceledTask'){
                        cancelTaskAction(taskId);
                      } 
                }
            }
         
     }
    
      $('#nextBlockItemPopUp textarea#note').val('');
      $(this).closest('.cs-next-element-box').toggle('fast');
})

function nextModalpopUpShow(elm,value,multi) {
    $("#nextBlockItemPopUp").remove();
    var block  = taskManagement.updateTask.genBlockModal.genNextBlockPopUp();
    $("body").append(block);
     var k =   $("#nextBlockItemPopUp")
    var top = $(elm).offset().top;
    var left = $(elm).offset().left; 
    var w  = 160;
    var h  = 250;
      k.css({
          "top": (w>top)?top+w:top,
          "left":(h>left)?left+h:left,
          "z-index":"5000000"
      }) 
      if(multi==='multi'){
        $("#nextElementListSelect").attr("action-type",'multi') 
      }
      $("#nextElementListSelect").val(value);
      $("#nextElementListSelect").selectpicker("refresh");
      $("#nextBlockItemPopUp").removeClass('d-none');
 }

function forwardTaskToAction(taskid) {
     taskid  = taskid?taskid:global_var.current_issue_id;
    updateTask4ShortChangeDetailsWithSync($('div.forward-assignee-list').getVal(), 'fkAssigneeId');
    var comel  = $('#nextBlockItemPopUp textarea#note');
    if (comel.val().trim()) {
        new UserStory().addCommentInput4TaskDetails(comel.val(),"","","","",taskid);
    }
    getBugList();
}

function rejectTaskAction(taskid) {
    taskid  = taskid?taskid:global_var.current_issue_id;
    var comel  = $('#nextBlockItemPopUp textarea#note');
    updateTask4ShortChangePureWithSync('rejected', 'taskStatus',taskid, comel.val(), 'true');
 
    if (comel.val().trim()) {
        new UserStory().addCommentInput4TaskDetails(comel.val(),"","","","",taskid);
    }
    getBugList();
}

function cancelTaskAction(taskid) {
    taskid  = taskid?taskid:global_var.current_issue_id;
    var comel  = $('#nextBlockItemPopUp textarea#note');
    updateTask4ShortChangePureWithSync('canceled', 'taskStatus', taskid, comel.val(), 'true');
 
    if (comel.val().trim()) {
        new UserStory().addCommentInput4TaskDetails(comel.val(),"","","","",taskid);
    }
    getBugList();
}

function iDidItAction(taskid) {
    taskid  = taskid?taskid:global_var.current_issue_id;
    var json = initJSON();

    json.kv.fkTaskId = taskid;
    json.kv.comment = $('#nextBlockItemPopUp textarea#note').val();
    var that = this;
    var data = JSON.stringify(json);

    $.ajax({
        url: urlGl + "api/post/srv/serviceTmIDidItTask",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            AJAXCallFeedback(res);
            getBugList();
        }
    });

}


function updateSpirntTaskById(list,taskid) {
       var ls  ='';
       if(list.length <1){
        return
     }
       for (let index = 0; index < list.length; index++) {
           const o = list[index];
             ls+= o +","
       }
       var data  =  {};
          data.fkSprintId =  ls;
          data.fkTaskId = taskid;
       callApi('22012917513008573817',data,true,function (res) {
              
   }) 
}
function updateLabelTaskById(list,taskid) {
       var ls  =''
       if(list.length <1){
           return
       }
       for (let index = 0; index < list.length; index++) {
           const o = list[index];
             ls+= o +","
       }
       var data  =  {};
          data.fkLabelId =  ls;
          data.fkTaskId = taskid;
       callApi('22012918335802271686',data,true,function (res) {
              
   }) 
}
function uploadFile4IpoTAsk(id) {
    var r = "";
    var that = this;
    var files = document.getElementById(id).files;
    var file_count = files.length;
    var st = "";
    var trc = 0;

    var pbDiv = $('#' + id).closest('div').find('#progress_bar_new');
  
    $('#' + id).attr('fname', '');

    for (var i = 0, f; f = files[i]; i++) {
        //            var file = files[0];
        var file = f;
        var fileext = file['name'].split('.').pop();
        var fname = file['name'].split('.')[0];
        //            console.log('fname=' + fname);
        if (files && file) {
            var reader = new FileReader();
            reader.fileName = fname;
            reader.fileExt = fileext;
            reader.fileNo = i;
            reader.onload = function (readerEvt) {
                trc++;
                var fname1 = readerEvt.target.fileName;
                var fileext1 = readerEvt.target.fileExt;
                var fileNo = readerEvt.target.fileNo;
                //                    console.log('trc no=' + trc);
                var binaryString = readerEvt.target.result;
                uploadFile4IpoCore(fileext1, btoa(binaryString), fname1, id);

            };
            reader.readAsBinaryString(file, fname);
        }
    }
}

$(document).on('click', ".cs-close-next-eb-btn", function (e) {
    $(this).closest('.cs-next-element-box').remove();
});

$(document).on("click", '#pills-tab .nav-link', function (e) {
    if ($(this).hasClass('d-task-tab2')) {
      $('.d-schedule-dcbtn').show();  
    }else{
       $('.d-schedule-dcbtn').hide();     
    }
    if ($(this).hasClass('task-tab2')) {
      $('.schedule-dcbtn').show();  
    }else{
       $('.schedule-dcbtn').hide();
    }
}); 


$(document).on('click', ".usm-more-filter-btn", function (e) {
    $(this).toggleClass('show');
    $('.usm-more-filter').toggleClass('show');
    $(this).find('i').toggleClass('fa-plus fa-minus');
});

$(document).on("dblclick", ".card-UserStory-header-text", function () {
    $(this).hide();
    $(this).parent().find(".card-UserStory-header-edit").css("display", "inline-block")
    let Namestory = $(this).parent().parent().find(".card-UserStory-header-text").text()
    $(this).parent().find(".card-UserStory-header-input").val(Namestory)
})


$(document).on("click", "#AcceptText", function (e) {
    let InputText = $(this).parent().find(".card-UserStory-header-input").val()
    if (InputText.trim().length > 0) {
        $(this).parent().parent().find(".card-UserStory-header-text").text(InputText)
        $(this).parent().parent().find(".card-UserStory-header-text").show();
        $(this).parent().find(".card-UserStory-header-input").val("")
        $(this).parent().css("display", "none")
    }
})

$(document).on("click", "#DeleteText", function (e) {
    $(this).parent().css("display", "none");
    $(this).parent().parent().find(".card-UserStory-header-text").show();
})
