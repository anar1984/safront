const taskManagement = {

    insertTask: {
        genBlockModal: {
            Init: function () {
                $('body').find("#issue-managment-add-task").remove();
                $('body').find(".modal-backdrop").remove();
                $('body').append(this.genModalSelfBlock());

                setProjectListByID('bug_filter_project_id_add');
                $("#issue-managment-add-task select.bug-mgmt-filter-select").selectpicker("refresh");

            },
            genModalSelfBlock: function () {
                return ` <div class="modal fade cs-modal-box issue-managment-add-task" id="issue-managment-add-task" data-backdrop="static" data-keyboard="false" tabindex="2" role="dialog" aria-labelledby="exampleModalLabel"
               aria-hidden="true">
              <div class="modal-dialog rounded" style="max-width: 50%;" role="document">
                  <div class="modal-content">
                      <div class="modal-header task-modal-header">
                          <h6 class="modal-title task-modal-title">
                              <span class="text">Add Task</span>
                          </h6>
                          <button id="addModalBugIssueTaskMng" bid='21121313200609883521' pid='21120217192004514462' class="btn btn-sm rounded-circle btn-danger" style="padding-top: 3px;"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></button>
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
                        <div class="col-lg-12 mt-3"> 
                            <div class="d-flex pl-3 pr-3 task-deadline-boxes">
                            ${this.genTaskDeadLineBlockTime()}
                            ${this.genTaskDeadLineBlockTask()}
                            ${this.genTaskDeadLineBlockEvent()}
                              </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12" style="padding: 0 25px;">
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
                          <button type="button" id="addIssueButtonId" class="btn btn-primary">Add</button>
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                  </div>
              </div>
          </div>`
            },
            genTitleBlock: function () {
                return `<div class="cs-input-group mb-3">
                <div class="d-flex">
                    <div class="mr-auto" style="width: 93%;">
                        <input type="text" class="form-control newTaskNameInput" name="testCaseTitle" id="taskNameInputNew2" placeholder="e.g., Renew gym every May 1st #Sport">
                        <span class='p-1'>quick insert task onfocus input SHIFT+ENTER</span>
                    </div>
                    <div class="p-0">
                        <div class="priority-btn"><!-- if active ( class name -- active ) -->
                             <i class="cs-svg-icon flame"></i>
                        </div>
                    </div>
                </div>
            </div>`
            },
            genCheckListBlock: function () {
                return ` <div class="cs-input-group">
                <div class="task-check-list-box cs-box-background overflow-hidden">
                    <input type="text" class="form-control" id="newAddCheckList" placeholder="add check words..." style="background: transparent; border-radius: 0;">
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
                        <h5>Copy and Paste Image Here</h5>
                    </div>
                </div>
                <div class="commentsubmit-seqment cm-file-upload-box ml-0 mr-0" >
                    <div data-toggle="tooltip" id="file1134"                                         
                         class=" tooltipMan component-class  
                         col-lg-12 hover-prototype-selector">
                         <label class="cs-file-upload">
                            <input class="form-control saTypeFilePicherUploadFile component-input-class" 
                                   sa-type="filepicker"  type="file" value="" row-no="" 
                                   pdid="21112211275108954370" id="addComment4Task_addnewfile" 
                                   multiple="" 
                                   fname="">
                                   Attach a file
                        </label>
                        <div class="progress_bar_new" id="progress_bar_new"></div>
                    </div>
                </div>
            </div>`
            },
            genTaskDeadLineBlockTime: function () {
                return `<div class="mr-auto p-2">
                <div class="row">
                    <div class="col-xl-12" style="display:contents">
                        <div class="col-lg-6 cs-input-group mt-2 p-1">
                            <div class="input-group-addon">Start Date</div>                                                 
                            <div class='cs-date-time d-flex'>
                                <div>
                                    <div class="d-flex">
                                        <span class="input-group-icon">
                                            <i class="fa fa-calendar-o" aria-hidden="true"></i>
                                           </span>
                                           <input type='text' id="taskDeadlineStartDade" class="form-control" />
                                    </div>
                                </div>
                                <div>
                                    <div class="d-flex">
                                        <span class="input-group-icon">
                                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                                           </span>
                                           <input type='text' id="taskDeadlineStartTime" class="form-control" style="width:50px;" />
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div class="col-lg-6 cs-input-group mt-2 p-1">
                            <div class="input-group-addon">End Date</div>
                            <div class='cs-date-time d-flex'>
                                <div>
                                    <div class="d-flex">
                                        <span class="input-group-icon">
                                            <i class="fa fa-calendar-o" aria-hidden="true"></i>
                                            </span>
                                            <input type='text' id="taskDeadlineEndDade" class="form-control" />
                                    </div>
                                </div>
                                <div>
                                    <div class="d-flex">
                                        <span class="input-group-icon">
                                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                                            </span>
                                            <input type='text' id="taskDeadlineEndTime" class="form-control" style="width:50px;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 cs-flex-col flex-item mt-2 p-0">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Responsible</div>
                                <select class="form-control" data-actions-box="true" onchange='' data-live-search="true"
                                        id='bug_filter_assignee_id_add' title="Assignee"></select>
                            </div>
                        </div>
                        <div class="col-lg-6 cs-flex-col flex-item mt-2 p-0">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Categories</div>
                                <select class="run_task_categories"  id="run_task_categories" data-live-search="true">
                                    <option value="cat1">Software</option>
                                    <option value="ca2">Back-end</option>
                                    <option value="cat3">Front-end</option>
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
                        <div class="input-group-addon">Tapşırıq</div>
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
                        <div class="input-group-addon">Toplantı</div>
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
                      <label class="checkmarkcontainer">Notify you about the confirmation?
                          <input type="checkbox" id="sendnotification">
                          <span class="checkmark"></span>
                      </label>
                      <label class="">
                      <input type="checkbox" checked='true' id="after_insert_modal">
                      After insert closed Modal
                      
                
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
                     ${this.genDetailsBlock()}
                     ${this.genScheduleBlock()}
                     ${this.genObserverBlock()}
                     ${this.genEventBlock()}
                     </div>
                     `
                    return div
                },
                genTabHeader: function () {
                    return ` <ul class="nav nav-pills mb-3 mt-2" id="pills-tab" role="tablist" style=" border-top: 2px solid rgb(3 57 108 / 50%); padding-top: 10px; margin-top: 3px !important; ">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="details-tab" data-toggle="tab" href="#task-tab1" role="tab" aria-controls="task-tab1" aria-selected="true"><i class="cs-svg-icon details"></i> <span>Details</span></a>
                    </li>
                    <li class="nav-item after-add-task" role="presentation">
                        <a class="nav-link" id="shedule-tab" data-toggle="tab" href="#task-tab2" role="tab" aria-controls="task-tab2" aria-selected="false"><i class="cs-svg-icon schedule"></i> <span>Schedule</span></a>
                    </li>
                    <!-- <li class="nav-item after-add-task" role="presentation">
                        <a class="nav-link" id="check-list-tab" data-toggle="tab" href="#task-tab4" role="tab" aria-controls="task-tab4" aria-selected="false"> <span>Check List</span></a>
                    </li> -->
                    <li class="nav-item after-add-task" role="presentation">
                        <a class="nav-link loadUserForObserver" id="observer-tab" data-toggle="tab" href="#task-tab5" role="tab" aria-controls="task-tab5" aria-selected="false"><i class="cs-svg-icon observer"></i> <span>Observer</span></a>
                    </li>
                    <!-- <li class="nav-item after-add-task" role="presentation">
                        <a class="nav-link" id="subtask-tab" data-toggle="tab" href="#task-tab6" role="tab" aria-controls="task-tab6" aria-selected="false"><i class="cs-svg-icon subtask-light"></i> <span>Subtask</span></a>
                    </li> -->
                    <li class="nav-item after-add-task" role="presentation">
                        <a class="nav-link" id="events-tab" data-toggle="tab" href="#task-tab3" role="tab" aria-controls="task-tab3" aria-selected="false"><i class="cs-svg-icon hour-02"></i> <span>Events</span></a>
                    </li>
                </ul>   `
                },
                genDetailsBlock: function () {
                    return `  <div class="tab-pane fade task-tab1 active show cs-box-background" id="task-tab1" role="tabpanel" aria-labelledby="task-tab1-tab">
                    <div class='row'>
                        <div class="col-lg-6  mt-2">
                            <div class="cs-input-group">
                                <select class="form-control" data-live-search="true" data-actions-box="true"
                                        style="text-overflow: ellipsis" onchange='' id='bug_filter_project_id_add'
                                        title="Project"></select>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <div class="cs-input-group">
                                <select class="form-control bug-mgmt-filter-select " data-actions-box="true" onchange=''
                                        data-live-search="true" id='bug_filter_backlog_id_add' title="Story Card">
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <div class="cs-input-group">
                                <select class="form-control bug-mgmt-filter-select " data-actions-box="true" onchange=''
                                        data-live-search="true" id='bug_task_type_id_add' title="Task Type"></select>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <div class="cs-input-group">
                                <select class="form-control bug-mgmt-filter-select " data-actions-box="true" onchange=''
                                        id='bug_task_nature_id_add' title="Task Nature">
                                    <option value="bug" selected="">Bug</option>
                                    <option value="change" selected="">Change Request</option>
                                    <option value="new" selected="">New Request</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>`
                },
                genScheduleBlock: function () {
                    return ` <div class="tab-pane fade run-shedule-elements task-tab2 cs-box-background" id="task-tab2" role="tabpanel" aria-labelledby="task-tab2-tab">
                   <div class="row">
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <label class="switch bcs-swith">
                                   <input type="checkbox" id="runTaskAvtivateSchedule">
                                   <span class="slider round">
                                       <small class="deactive">Deactive</small>
                                       <small class="active">Active</small>
                                   </span>
                               </label>
                           </div>
                       </div>
                   </div>
                   <div class="row rsoon">
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">Start Date</div>
                               <input class="form-control" name="runTaskStartDate" id="runTaskStartDate" type="date" required>
                           </div>
                       </div>
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">End Date</div>
                               <input class="form-control" name="runTaskiceEndDate" id="runTaskEndDate" type="text" required>
                           </div>
                       </div>
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">Run Time</div>
                               <input class="form-control" name="runTaskTime" id="runTaskTime" type="text" required>
                           </div>
                       </div>

                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">Intensive</div>
                               <select class="" name="run_task_intensive_select" id='run_task_intensive_select' data-live-search="true">
                                   <option value="weekly">Weekly</option>
                                   <option value="monthly">Monthly</option>
                                   <option value="yearly">Yearly</option>
                               </select>
                           </div>
                       </div>
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">Repeat every</div>
                               <select class="" name="run_task_repeat_select" id='run_task_repeat_select' data-live-search="true">
                                   <option value="1">1</option>
                                   <option value="2">2</option>
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
                               </select>
                           </div>
                       </div>
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">Status</div>
                               <select class="" name="run_task_status_select" id='run_task_status_select' data-live-search="true">
                                   <option value="active">Active</option>
                                   <option value="passive">Passive</option>
                               </select>
                           </div>
                       </div>
                   </div>
                   <div class="row rsoon weekly-actions run-intensive run-enabled">
                       <div class="col-12">
                           <h5 class="section-title"><strong>Weekly Actions</strong></h5>
                       </div>
                       <div class="col-md-3 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">Weekday</div>
                               <select class="" name="run_task_weekday_select" id="run_task_weekday_select" data-actions-box="true" multiple data-live-search="true">
                                   <option value="monday">Monday</option>
                                   <option value="tuesday">Tuesday</option>
                                   <option value="wednesday">Wednesday</option>
                                   <option value="thursday">Thursday</option>
                                   <option value="friday">Friday</option>
                                   <option value="saturday">Saturday</option>
                                   <option value="sunday">Sunday</option>
                               </select>
                           </div>
                       </div>
                   </div>
                   <div class="row rsoon" style="display: none;">
                       <input type="hide" id="hide_actions">
                       <input type="hide" id="hide_actions_param">
                       <input type="hide" id="hide_actions_param_2">
                   </div>
                   <div class="row rsoon monthly-actions run-intensive">
                       <div class="col-12">
                           <h5 class="section-title"><strong>Monthly Action</strong></h5>
                       </div>
                       <div class="cs-flex-col flex-item mt-2">
                           <div class="cs-input-group horizontal ml-3 mt-2">
                               <div class="input-group-addon">Specification</div>
                               <label class="checkcontainer">Last day of month
                                   <input type="radio" checked="checked" name="monthlyAction" id="monthlyAction" value="last_day_of_month">
                                   <span class="radiobtn"></span>
                               </label>
                               <label class="checkcontainer">First day of month
                                   <input type="radio" name="monthlyAction" id="monthlyAction" value="first_day_of_month">
                                   <span class="radiobtn"></span>
                               </label>
                               <label class="checkcontainer spa">Specific day of month
                                   <input type="radio" name="monthlyAction" id="monthlyAction" value="specific_day_of_month">
                                   <span class="radiobtn"></span>
                               </label>
                               <label class="checkcontainer spa">Before last day of month
                                   <input type="radio" name="monthlyAction" id="monthlyAction" value="before_last_day_of_month">
                                   <span class="radiobtn"></span>
                               </label>
                               <label class="checkcontainer spa">Specific weekday of month 
                                   <input type="radio" name="monthlyAction" id="monthlyAction" value="specific_weekday_of_month">
                                   <span class="radiobtn"></span>
                               </label>
                           </div>
                       </div>
                       <div class="col-12">
                           <hr class="hr_spa">
                           <div class="row">
                               <div class="spa_sdofm_day_of_Month_select run_spa cs-flex-col flex-item ml-2 mt-2">
                                   <div class="cs-input-group ml-3">
                                       <div class="input-group-addon">Day of Month</div>
                                       <select class="" name="sdofm_day_of_Month_select" id="sdofm_day_of_Month_select" data-live-search="true">
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
                               <div class="spa_days_before_last_day_of_month run_spa cs-flex-col flex-item ml-3 mt-2">
                                   <div class="cs-input-group">
                                       <div class="input-group-addon">Day(s) before last day of month</div>
                                       <input class="form-control" name="days_before_last_day_of_month" id="days_before_last_day_of_month" type="number" required>
                                   </div>
                               </div>
                               <div class="spa_swofm_fl_action_select run_spa cs-flex-col flex-item ml-3 mt-2">
                                   <div class="cs-input-group">
                                       <div class="input-group-addon">Action</div>
                                       <select class="" name="swofm_fl_action_select" id="swofm_fl_action_select" data-live-search="true">
                                           <option value="first">First</option>
                                           <option value="last">Last</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="spa_swofm_weekday_select run_spa cs-flex-col flex-item ml-2 mt-2">
                                   <div class="cs-input-group">
                                       <div class="input-group-addon">Weekdays</div>
                                       <select name="swofm_weekday_select" id="swofm_weekday_select" data-live-search="true">
                                           <option value="monday">Monday</option>
                                           <option value="tuesday">Tuesday</option>
                                           <option value="wednesday">Wednesday</option>
                                           <option value="thursday">Thursday</option>
                                           <option value="friday">Friday</option>
                                           <option value="saturday">Saturday</option>
                                           <option value="sunday">Sunday</option>
                                       </select>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div class="row rsoon yearly-actions run-intensive">
                       <div class="col-12">
                           <h5 class="section-title"><strong>Yearly</strong></h5>
                       </div>
                       <div class="cs-flex-col flex-item ml-3 mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">Execution Data</div>
                               <input class="form-control" id="runTaskExecutiveDate" type="text" name="runTaskExecutiveDate" required>
                           </div>
                       </div>
                   </div>

                   <div class="row rsoon">
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <div class="input-group-addon">Select Reminder</div>
                               <select class="" name="run_task_repeat_select" id='run_task_reminder_select' data-live-search="true">
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
                   </div>

               </div>`
                },
                genObserverBlock: function () {
                    return `<div class="tab-pane fade task-check-list-created cs-box-background" id="task-tab5" role="tabpanel" aria-labelledby="task-tab5-tab">
                 <div class="cs-input-group mb-3 ml-2">
                     <div class="input-group-addon">Observer Name</div>
                     <div class="task-check-list-observer p-0 mt-1 mb-3">
                         <!-- <button class='btn loadUserForObserver'>Load User</button> -->
                         <select class="form-control" id="createdtask_oblerverlist"></select>
                         <button class='btn addObserverToTAsk'><i class="fas fa-plus" aria-hidden="true"></i> Add Observer</button>
                     </div>
                     <div class="task-observer-list">

                     </div>
                 </div>
             </div>`
                },
                genEventBlock: function () {
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
                                <div class="input-group-addon">Subject</div>
                                <input class="form-control" name="mezmun" id="ivent-mezmun" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Structure</div>
                                <input class="form-control" name="struktur" id="ivent-struktur" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Type</div>
                                <input class="form-control" name="nov" id="ivent-nov" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Responsible person</div>
                                <input class="form-control" name="mesulShexs" id="ivent-mesulShexs" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Participant</div>
                                <input class="form-control" name="mesulShexs" id="ivent-istirakci" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Counterparty</div>
                                <input class="form-control" name="mesulShexs" id="ivent-kontragent" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Location</div>
                                <input class="form-control" name="yer" id="ivent-yer" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Note</div>
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
        insertNewTaskApi: function (dataCore) {
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
                    that.insertEventByTaskId(res.kv.id);
                    that.insertObserverTask(res.kv.id);
                    that.insertCheckListComulativ(res.kv.id);
                    getBugList();
                    Toaster.showMessage('Tapşırıq uğurla daxil edilmişdir');
                    if ($("#after_insert_modal").prop("checked")) {
                        $("#issue-managment-add-task").modal("hide");

                    }
                    reset_task_data();
                },
                error: function () {
                    Toaster.showError(('Tapşırıq daxil edilmədi'));
                }
            });
        },
        getValueCreateModalScreen: function () {
            var val = $('#taskNameInputNew2').val();
            if (!val) {
                Toaster.showError('Məzmun daxil edilməmişdir.');
                return
            }

            var data = {};

            data.comment = $('#addComment4Task_comment_new').val();
            var files = $('#addComment4Task_addnewfile').attr('fname');

            $('.canvas-sub-class').each(function (e) {
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
            data.fkAssigneeId = $('#bug_filter_assignee_id_add').val();
            data.fkTaskTypeId = $("#bug_task_type_id_add").val();
            data.taskNature = $("#bug_task_nature_id_add").val();
            data.taskPriority = $("#bug_filter_priority_add").val();
            //data.taskNature = $("#bug_filter_project_id_add").val();
            data.sprintList = sprintList;
            data.startDate = $('#taskDeadlineStartDade').val();
            data.startTime = $('#taskDeadlineStartTime').val();
            data.endTime = $('#taskDeadlineEndTime').val();
            data.endDate = $('#taskDeadlineEndDade').val();
            data.isMeet = ($("#tapshiriq-btn").hasClass("active")) ? "1" : "0";
            data.fkParentTaskId = $("#parent-task-id-input").val();



            // data.description = $("#bug_filter_project_id_add").val();

            this.insertNewTaskApi(data);
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
                        msgMessage = 'Events successfully created!';
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
                var tbl = $("#issue-managment-add-task .task-observer-list>table>tr");

                for (let i = 0; i < tbl.length; i++) {
                    const o = tbl[i];
                    userList += $(o).attr("id") + ",";
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
                console.log('task Observer ++++' + error);
            }


        },
        insertBacklogTaskDetail: function (taskId) {
            try {
                var data = {};
                data.fkTaskId = taskId;
                data.actionParam = getMultiSelectpickerValueByElementName("run_task_weekday_select");
                data.action = $("#bug_filter_project_id_add").val();
                data.weekdays = $("#swofm_weekday_select").val();
                data.startDate = toDate("runTaskStartDate");
                data.endDate = toDate("runTaskEndDate");
                data.runTime = GetConvertedTime("runTaskTime");
                data.intensive = $("#run_task_intensive_select").val();
                data.repeatInterval = $("#run_task_repeat_select").val();
                data.scheduleStatus = $("#run_task_status_select").val();
                data.projectId = $('#bug_filter_project_id_add').val();
                data.projectName = $('#bug_filter_project_id_add option:selected').text();
                data.sendNotification = $("#sendnotification").is(":checked") ? "1" : "0";
                data.notificationMail = $("#sendnotification").is(":checked") ? "1" : "0";
                data.remindMeParam = $("#bug_filter_project_id_add").val();
                data.activateSchedule = $("#runTaskAvtivateSchedule").is(":checked") ? "1" : "0";
                data.monthlyAction = $("#monthlyAction:checked").val();
                data.actionDayOfMonth = $("#sdofm_day_of_Month_select").val();
                data.dayBeforeLastDayOfMonth = $("#days_before_last_day_of_month").val();
                data.specificWeekDayOfMonthAction = $("#swofm_fl_action_select").val();
                data.specificWeekDayOfMonthWeekdays = $("#swofm_weekday_select").val();
                data.taskCheckList = $('#commentinput_for_taskcreatechecklist').val();


                callService('serviceRsCreateBacklogTaskDetail', data, true, function () {
                    // getTaskkObserverList(global_var.current_task_id_4_comment)
                });
            } catch (error) {
                console.log('task Observer ++++' + error);
            }


        },
        insertCheckListComulativ: function (taskId) {
            var itmList = ''
            var items = $(".task-check-list-box ul>li");
            for (let i = 0; i < items.length; i++) {
                const o = items[i];

                itmList += $(o).find('.item-note').text() + '|';
            }

            this.insertCheckListComulativCore(itmList, taskId)

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
            $('#bug_filter_assignee_id').html('');
            $('#bug_filter_assignee_id_add').html('');
            $('#bug_filter_detail_assignee_id_add').html('');
            $('#bug_filter_assignee_id_multi').html('');
            $('#bug_filter_created_by').html('');
            $('#testcase_createdbyfilter').html('');
            $('#createdtask_oblerverlist').html('');
            try {
                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    var opt = $('<option>').val(o.fkUserId).text(o.userName);
                    var opt2 = $('<option>').val(o.fkUserId).text(o.userName);
                    var opt3 = $('<option>').val(o.fkUserId).text(o.userName);
                    var opt4 = $('<option>').val(o.fkUserId).text(o.userName);
                    var opt5 = $('<option>').val(o.fkUserId).text(o.userName);
                    var opt6 = $('<option>').val(o.fkUserId).text(o.userName);
                    $('#bug_filter_assignee_id').append(opt);
                    $('#bug_filter_assignee_id_add').append(opt4);
                    $('#bug_filter_detail_assignee_id_add').append(opt4);
                    $('#bug_filter_assignee_id_multi').append(opt5);
                    $('#bug_filter_created_by').append(opt2);
                    $('#testcase_createdbyfilter').append(opt3);
                    $('#createdtask_oblerverlist').append(opt6);

                }
            } catch (error) {

            }

            $('#bug_filter_created_by').selectpicker('refresh');
            $('#bug_filter_assignee_id').selectpicker('refresh');
            $('#bug_filter_assignee_id_add').selectpicker('refresh');
            $('#bug_filter_detail_assignee_id_add').selectpicker('refresh');
            $('#bug_filter_assignee_id_multi').selectpicker('refresh');
            $('#testcase_createdbyfilter').selectpicker('refresh');
            $('#createdtask_oblerverlist').selectpicker('refresh');

        }

    },
    updateTask: {
        genBlockModal: {
            Init: function () {
                $('body').find("#taskMgmtModal").remove();
                $('body').find(".modal-backdrop").remove();
                $('body').append(this.genModalSelfBlock());

                setProjectListByID('bug_filter_project_id_add');
                $("#taskMgmtModal select.update-selectpicker").selectpicker("refresh");

            },
            genModalSelfBlock: function () {
                return `<div class="modal fade cs-modal-box TaskStoryCardPanel card-Userstory-detail" id="taskMgmtModal" tabindex="-1" role="dialog"
               aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document" style="max-width: 50%" id="taskMgmtModal-body">
                  <div class="modal-content">
                      <div class="modal-header task-modal-header">
                          <h6 class="modal-title task-modal-title">
                              <span class="text card-UserStory-header-text-code">Add Task</span>
                          </h6>
                          <button id="addModalBugIssueTaskMng" bid='21121313201600758588' pid='21120217192004514462' class="btn btn-sm rounded-circle btn-danger" style="padding-top: 3px;"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></button>

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
                      <div class="col-lg-12 mt-3"> 
                          <div class="d-flex pl-3 pr-3 task-deadline-boxes">
                          ${this.genTaskDeadLineBlockTime()}
                          ${this.genTaskDeadLineBlockTask()}
                          ${this.genTaskDeadLineBlockEvent()}
                            </div>
                      </div>
                  </div>
                  <div class="row">
                  <div class="col-lg-12" style="padding: 0 25px;">
                  <div class="comment-seqment">
                  ${this.genTabBlock.Init()}
                    </div>
                   </div>
                  </div>
                      ${this.genNotifyButton()}
 

                      </div>
                  </div>
              </div>
          
          </div>`
            },
            genTitleBlock: function () {
                return ` <div class="cs-input-group mb-3">
                <div class="d-flex">
                    <div class="mr-auto" style="width: 93%;">
                        <div class="Story-card-Header-task">
                            <div class="card-UserStory-header">
                                <span class="card-UserStory-header-text"></span>
                                <div class="card-UserStory-header-edit" style="display: none; width: 100%;top: 0;height: 0;">
                                    <input class="card-UserStory-header-input form-control" type="text" placeholder="e.g., Renew gym every May 1st #Sport">
                                    <div class=" card-UserStory-header-accept TextHeader "
                                         onclick="updateTask4ShortChangeTaskName()" id="AcceptText" style="color: #38628a;background: #dfeef7;">
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <div class=" card-UserStory-header-delete TextHeader " id="DeleteText" style="color: #38628a;background: #dfeef7;">
                                        <i class="fas fa-times"></i>
                                    </div>
        
                                </div>                    
                            </div>
        
                            <div class="card-UserStory-edit-task cs-input-group">
                                <div class="dropdown-task show dropright">
                                    <a class="btn dropdown-toggle-task" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </a>
        
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a class="dropdown-item forward-task" href="#" onclick="createChildTask()">Create
                                            Child Task</a>
                                        <a class="dropdown-item forward-task" href="#" onclick="ForwardTaskTo()">Forward
                                            To</a>
                                        <a class="dropdown-item assign-task" href="#" onclick="assignTaskToOthers()">Assign
                                            To</a>
                                        <a class="dropdown-item clone-task" href="#" onclick="cloneTask()">Duplicate</a>
                                        <a class="dropdown-item" href="#" onclick="rejectTask()">Reject Task</a>
                                        <a class="dropdown-item" href="#" onclick="deleteTask()">Delete</a>
                                    </div>
                                </div>
        
                            </div>
        
                        </div>
                    </div>
                    <div class="p-0">
                        <div class="priority-btn"><!-- if active ( class name -- active ) -->
                             <i class="cs-svg-icon flame"></i>
                        </div>
                    </div>
                </div>
            </div>`
            },
            genCheckListBlock: function () {
                return `<div class="cs-input-group">
                <div class="task-check-list-box cs-box-background overflow-hidden">
                    <input type="text" class="form-control" id="updateCheckList" placeholder="add check words..." style="background: transparent; border-radius: 0;">
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
                        <h5>Copy and Paste Image Here</h5>
                    </div>
                </div>
                <div class="commentsubmit-seqment cm-file-upload-box ml-0 mr-0" >
                    <div data-toggle="tooltip" id="file1134"                                         
                         class=" tooltipMan component-class  
                         col-lg-12 hover-prototype-selector">
                         <label class="cs-file-upload">
                            <input class="form-control saTypeFilePicherUploadFile component-input-class" 
                                   sa-type="filepicker"  type="file" value="" row-no="" 
                                   pdid="21112211275108954370" id="addComment4Task_addnewfile" 
                                   multiple="" 
                                   fname="">
                                   Attach a file
                        </label>
                        <div class="progress_bar_new" id="progress_bar_new"></div>
                    </div>
                </div>
            </div>`
            },
            genTaskDeadLineBlockTime: function () {
                return `<div class="mr-auto p-2">
                <div class="row">
                    <div class="col-xl-12" style="display:contents">
                        <div class="col-lg-6 cs-input-group mt-2 p-1">
                            <div class="input-group-addon">Start Date</div>                                                 
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
                        <div class="col-lg-6 cs-input-group mt-2 p-1">
                            <div class="input-group-addon">End Date</div>
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
                        <div class="col-lg-6 cs-flex-col flex-item mt-1 p-1">
                            <div class="cs-input-group p-0">
                                <div class="input-group-addon">Responsible</div>
                                <select class="form-control update-selectpicker" data-actions-box="true"  data-live-search="true"
                                        id='bug_filter_detail_assignee_id_update'   onchange="updateTask4ShortChange(this, 'fkAssigneeId')" title="Assignee"></select>
                            </div>
                        </div>
                        <div class="col-lg-6 cs-flex-col flex-item mt-1 p-1">
                            <div class="cs-input-group p-0">
                                <div class="input-group-addon">Categories</div>
                                <select class="run_task_categories update-selectpicker"   id="run_task_detail_detail_categories" data-live-search="true">
                                    <option value="cat1">Software</option>
                                    <option value="ca2">Back-end</option>
                                    <option value="cat3">Front-end</option>
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
                        <div class="input-group-addon">Tapşırıq</div>
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
                        <div class="input-group-addon">Toplantı</div>
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
              <div class="cs-flex-col flex-item ml-2 mt-2 horizontal">
                  <div class="cs-input-group mt-2">
                      <label class="checkmarkcontainer">Notify you about the confirmation?
                          <input type="checkbox" id="sendnotification_detail">
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
                    return `  <ul class="nav nav-pills mb-3 p-2 mt-3" id="pills-tab" role="tablist" style=" border-top: 2px solid rgb(3 57 108 / 50%); padding-top: 10px; margin-top: 3px !important; ">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="d-comments-tab" data-toggle="tab" href="#d-task-tab0" role="tab" aria-controls="task-tab1" aria-selected="true"><i class="cs-svg-icon comment"></i> <span>Comments</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="d-details-tab" data-toggle="tab" href="#d-task-tab1" role="tab" aria-controls="task-tab1" aria-selected="true"><i class="cs-svg-icon details"></i> <span>Details</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="d-schedule-tab" data-toggle="tab" href="#d-task-tab2" role="tab" aria-controls="task-tab2" aria-selected="false"><i class="cs-svg-icon schedule"></i> <span>Schedule</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link loadUserForObserver" id="d-observer-tab" data-toggle="tab" href="#d-task-tab4" role="tab" aria-controls="task-tab4" aria-selected="false"><i class="cs-svg-icon observer"></i> <span>Observer</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link loadUserForSubtask" id="d-subtask-tab" data-toggle="tab" href="#d-task-tab5" role="tab" aria-controls="task-tab5" aria-selected="false"><i class="cs-svg-icon subtask-light"></i> <span>Subtask</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="d-ivents-tab" data-toggle="tab" href="#d-task-tab6" role="tab" aria-controls="task-tab6" aria-selected="false"><i class="cs-svg-icon hour-02"></i> <span>Events</span></a>
                    </li>
                </ul>`
                },
                genCommentBlock: function () {
                    return `  <div class="tab-pane fade active show cs-box-background" id="d-task-tab0" role="tabpanel" aria-labelledby="pills-d-task-tab4">
                    <div class="cs-input-group mb-3 mt-3">
                        <div class="commentwritepanel">
                            <div class="input-group-addon">Description</div>
                            <textarea name="commentinput" id="addComment4Task_comment" class="commentinput form-control"
                                      placeholder="Add a comment.." rows="1"></textarea>

                            <br>
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
                                <div class="deletecomment flex-fill mr-1">
                                    <button class="btn " type="submit">Cancel</button>
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
                            <div class="col-lg-4 statusCardStorymb-3">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Status</label>
                                    <!-- <span class="comment-content-header-history" style="margin-left: 0px;">Status</span> -->
                                    <div class="form-group ">

                                        <select class="form-control update-selectpicker task-info-modal-status" style="width:auto"
                                                onchange="updateTask4ShortChange(this, 'taskStatus')" id="task-info-modal-status">
                                            <option value='new'><span
                                                class="us-item-status-new comment-content-header-status">New</span></option>
                                            <option value='ongoing'> <span
                                                class="us-item-status-ongoing comment-content-header-status"
                                                id="">Ongoing</span></option>
                                            <option value='closed'><span
                                                class="us-item-status-closed comment-content-header-status"
                                                id="">Closed</span></option>
                                            <option value='waiting'><span
                                                class="us-item-status-waiting comment-content-header-status"
                                                id="">Waiting</span></option>
                                            <option value='canceled'><span
                                                class="us-item-status-canceled comment-content-header-status"
                                                id="">Canceled</span></option>
                                            <option value='rejected'><span
                                                class="us-item-status-rejected comment-content-header-status"
                                                id="">Rejected</span></option>
                                            <option value='UAT'><span
                                                class="us-item-status-rejected comment-content-header-status"
                                                id="">UAT</span></option>

                                        </select>
                                    </div>
                                </div>            
                            </div>



                            <div class="col-lg-4 statusCardStory mb-3">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Task Nature</label>
                                    <!-- <span class="comment-content-header-history" style="margin-left: 0px;">Task Nature</span> -->
                                    <div class="form-group">
                                        <select class="form-control update-selectpicker task-info-modal-nature" style="width:auto"
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

                            <div class="col-lg-4 statusCardStory task-mgmt-tasktype mb-3" id='task-mgmt-tasktype'>
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Task Type</label>
                                    <!-- <span class="comment-content-header-history" style="margin-left: 0px;">Task Type</span> -->
                                    <div class="form-group">

                                        <select class="form-control update-selectpicker task-info-modal-tasktype" style="width:auto"
                                                onchange="updateTask4ShortChange(this, 'fkTaskTypeId')"
                                                id="task-info-modal-tasktype">


                                        </select>
                                    </div>
                                </div>            
                            </div>
                            <div class="col-lg-4 statusCardStory">
                                <div class="cs-input-group">
                                    <label class="input-group-addon">Priority</label>
                                    <!-- <span class="comment-content-header-history" style="margin-left: 0px;">Priority</span> -->
                                    <div class="form-group ">
                                        <select class="form-control update-selectpicker task-info-modal-priority" style="width:auto"
                                                onchange="updateTask4ShortChange(this, 'taskPriority')"
                                                id="task-info-modal-priority">
                                            <option value='1' selected>1- Lowest</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                            <option value='6'>6</option>
                                            <option value='7'>7</option>
                                            <option value='8'>8</option>
                                            <option value='9'>9 - Highest</option>
                                        </select>
                                    </div>
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
                            <div class="col-md-4">
                            <div class="cs-input-group Assigne-card-story">
                            <label class="input-group-addon">Created by</label>

                            <div class="Assigne-card-story-select form-control">
                                <div id="task-mgmt-create-by">
                                    <img class="Assigne-card-story-select-img" src="resource/img/rev.png" alt="" srcset="">
                                    <span class="Assigne-card-story-select-name">Unassigned</span>
                                </div>
                            </div>
                        </div>
                            </div>

                            <div class="col-md-4">
                            <div class="cs-input-group Assigne-card-story">
                            <label class="input-group-addon">Updated By: <span class="by-last-updated" style="float:right"><span class="task_detail_created_date">..</span> / <span class="task_detail_created_time">::</span></span></label>

                            <div class="Assigne-card-story-select form-control">
                                <div id="task-mgmt-closed-by">
                                    <img class="Assigne-card-story-select-img" src="resource/img/rev.png" alt="" srcset="">
                                    <span class="Assigne-card-story-select-name">Unassigned</span>
                                </div>
                            </div>
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
        
                                <select class="form-control" 
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
                    return `<div class="tab-pane fade shedule-elements cs-box-background" id="d-task-tab2" role="tabpanel" aria-labelledby="pills-d-task-tab2">
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
                   <div class="row soon">
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <label class="input-group-addon">Start Date</label>
                               <input class="form-control cs-input" name="runTaskStartDate" id="runTaskStartDate_detail" type="text" required>
                           </div>
                       </div>
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <label class="input-group-addon">End Date</label>
                               <input class="form-control cs-input" name="runTaskiceEndDate" id="runTaskEndDate_detail" type="text" required>
                           </div>
                       </div>
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <label class="input-group-addon">Run Time</label>
                               <input class="form-control cs-input" name="runTaskTime" id="runTaskTime_detail" type="text" required>
                           </div>
                       </div>

                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <label class="input-group-addon">Intensive</label>
                               <select class="" name="run_task_intensive_select" id='run_task_intensive_select_detail' data-live-search="true">
                                   <option value="weekly">Weekly</option>
                                   <option value="monthly">Monthly</option>
                                   <option value="yearly">Yearly</option>
                               </select>
                           </div>
                       </div>
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <label class="input-group-addon">Repeat every</label>
                               <select class="" name="run_task_repeat_select" id='run_task_repeat_select_detail' data-live-search="true">
                                   <option value="1">1</option>
                                   <option value="2">2</option>
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
                               </select>
                           </div>
                       </div>
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <label class="input-group-addon">Status</label>
                               <select class="" name="run_task_status_select" id='run_task_status_select_detail' data-live-search="true">
                                   <option value="active">Active</option>
                                   <option value="passive">Passive</option>
                               </select>
                           </div>
                       </div>
                   </div>
                   <div class="row soon weekly-actions run-intensive run-enabled mt-3">
                       <div class="col-12">
                           <h5 class="section-title"><strong>Weekly Actions</strong></h5>
                       </div>
                       <div class="col-md-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <label class="input-group-addon">Weekday</label>
                               <select class="" name="run_task_weekday_select" id="run_task_weekday_select_detail" data-actions-box="true" multiple data-live-search="true">
                                   <option value="monday">Monday</option>
                                   <option value="tuesday">Tuesday</option>
                                   <option value="wednesday">Wednesday</option>
                                   <option value="thursday">Thursday</option>
                                   <option value="friday">Friday</option>
                                   <option value="saturday">Saturday</option>
                                   <option value="sunday">Sunday</option>
                               </select>
                           </div>
                       </div>
                   </div>
                   <div class="row soon" style="display: none;">
                       <input type="hide" id="hide_actions_detail">
                       <input type="hide" id="hide_actions_param_detail">
                       <input type="hide" id="hide_actions_param_2_detail">
                   </div>
                   <div class="row soon monthly-actions run-intensive mt-3">
                       <div class="col-12">
                           <h5 class="section-title"><strong>Monthly Action</strong></h5>
                       </div>
                       <div class="cs-flex-col flex-item mt-2">
                           <div class="cs-input-group horizontal ml-3 mt-2">
                               <div class="input-group-addon">Specification</div>
                               <label class="checkcontainer">Last day of month
                                   <input type="radio" checked="checked" name="radio" id="last_day_of_month_detail">
                                   <span class="radiobtn"></span>
                               </label>
                               <label class="checkcontainer">First day of month
                                   <input type="radio" name="radio" id="first_day_of_month_detail">
                                   <span class="radiobtn"></span>
                               </label>
                               <label class="checkcontainer spa">Specific day of month
                                   <input type="radio" name="radio" id="specific_day_of_month_detail">
                                   <span class="radiobtn"></span>
                               </label>
                               <label class="checkcontainer spa">Before last day of month
                                   <input type="radio" name="radio" id="before_last_day_of_month_detail">
                                   <span class="radiobtn"></span>
                               </label>
                               <label class="checkcontainer spa">Specific weekday of month 
                                   <input type="radio" name="radio" id="specific_weekday_of_month_detail">
                                   <span class="radiobtn"></span>
                               </label>
                           </div>
                       </div>
                       <div class="col-12">
                           <hr class="hr_spa">
                           <div class="row">
                               <div class="spa_sdofm_day_of_Month_select run_spa cs-flex-col flex-item ml-2 mt-2">
                                   <div class="cs-input-group ml-3">
                                       <label class="input-group-addon">Day of Month</label>
                                       <select class="" name="sdofm_day_of_Month_select" id="sdofm_day_of_Month_select_detail" data-live-search="true">
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
                               <div class="spa_days_before_last_day_of_month run_spa cs-flex-col flex-item ml-3 mt-2">
                                   <div class="cs-input-group">
                                       <label class="input-group-addon">Day(s) before last day of month</label>
                                       <input class="form-control" name="days_before_last_day_of_month" id="days_before_last_day_of_month_detail" type="number" required>
                                   </div>
                               </div>
                               <div class="spa_swofm_fl_action_select run_spa cs-flex-col flex-item ml-3 mt-2">
                                   <div class="cs-input-group">
                                       <label class="input-group-addon">Action</label>
                                       <select class="" name="swofm_fl_action_select" id="swofm_fl_action_select_detail" data-live-search="true">
                                           <option value="first">First</option>
                                           <option value="last">Last</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="spa_swofm_weekday_select run_spa cs-flex-col flex-item ml-2 mt-2">
                                   <div class="cs-input-group">
                                       <label class="input-group-addon">Weekdays</label>
                                       <select name="swofm_weekday_select" id="swofm_weekday_select_detail" data-live-search="true">
                                           <option value="monday">Monday</option>
                                           <option value="tuesday">Tuesday</option>
                                           <option value="wednesday">Wednesday</option>
                                           <option value="thursday">Thursday</option>
                                           <option value="friday">Friday</option>
                                           <option value="saturday">Saturday</option>
                                           <option value="sunday">Sunday</option>
                                       </select>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div class="row soon yearly-actions run-intensive mt-3">
                       <div class="col-12">
                           <h5 class="section-title"><strong>Yearly</strong> </h5>
                       </div>
                       <div class="cs-flex-col flex-item ml-3 mt-2">
                           <div class="cs-input-group">
                               <label class="input-group-addon">Execution Data</label>
                               <input class="form-control" id="runTaskExecutiveDate_detail" type="text" name="runTaskExecutiveDate" required>
                           </div>
                       </div>
                   </div>
                   <hr>
                   <div class="row soon">
                       <div class="col-lg-4 cs-flex-col flex-item mt-2">
                           <div class="cs-input-group">
                               <label class="input-group-addon">Select Reminder</label>
                               <select class="" name="run_task_repeat_select_detail" id='run_task_reminder_select_detail' data-live-search="true">
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
                   </div>
               </div>`
                },
                genObserverBlock: function () {
                    return `  <div class="tab-pane fade cs-box-background" id="d-task-tab4" role="tabpanel" aria-labelledby="pills-d-task-tab4">
                 <div class="cs-input-group mb-3 ml-2">
                     <div class="input-group-addon">Observer Name</div>
                     <div class="task-check-list-observer p-0 mt-1 mb-3">
                         <!-- <button class='btn loadUserForObserver'>Load User</button> -->
                         <select class="form-control" id="updatetask_oblerverlist"></select>
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
                                    <th>#</th>
                                    <th>Task ID</th>
                                    <th>Parent Task <a href="#" class="comment-content-header-history" onclick="changeParentTaskModal()" style="color: #03396c">
                                            <i class="fas fa-plus" aria-hidden="true"></i>
                                        </a></th>
                                    <th>Task Status</th>
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
                                    <th>#</th>
                                    <th>Task ID</th>
                                    <th>Child Task
                                    <a href="#" class='comment-content-header-history' id="add-child-task-open-modal" style="color: #03396c;">
                                    <i class="fas fa-plus" aria-hidden="true"></i>
                                </a></th>                                                    
                                    <th>Task Status</th>
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
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <label class="switch bcs-swith">
                                    <input type="checkbox" id="activateUpdatedEvenets">
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
                                <div class="input-group-addon">Subject</div>
                                <input class="form-control updevents" name="mezmun" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Structure</div>
                                <input class="form-control updevents" name="struktur" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Type</div>
                                <input class="form-control updevents" name="nov" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Responsible person</div>
                                <input class="form-control updevents" name="mesulShexs" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Participant</div>
                                <input class="form-control updevents" name="istirakci" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Counterparty</div>
                                <input class="form-control updevents" name="kontragent" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Location</div>
                                <input class="form-control updevents" name="yer" type="text">
                            </div>
                        </div>
                        <div class="col-lg-4 cs-flex-col flex-item mt-2">
                            <div class="cs-input-group">
                                <div class="input-group-addon">Note</div>
                                <input class="form-control updevents" name="qeyd" type="text">
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
            if (!taskId) {
                return;
            }
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

            getProjectUsers();
            $(".card-UserStory-header-text-code").html(getTaskCode(taskId));

            let headerText = $(el).html();
            $(".card-UserStory-header-text").html(headerText);

            taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'update')
            loadTaskInfoToContainer(taskId, projectId);
            taskManagement.updateTask.genCommentListOfTask();
            $("#task-info-modal-status").val(coreBugKV[taskId].taskStatus);
            $("#task-info-modal-status").selectpicker('refresh');
            $("#task-mgmt-create-by>img").attr('src', fileUrl(coreBugKV[taskId].createByImage));
            $("#task-mgmt-create-by>span").text(coreBugKV[taskId].createByName);
            $('#taskDetailDeadlineStartDade').val(coreBugKV[taskId].startDate);
            $('#taskDetailDeadlineStartTime').val(coreBugKV[taskId].startTime);
            $('#taskDetailDeadlineEndTime').val(coreBugKV[taskId].endTime);
            $('#taskDetailDeadlineEndDade').val(coreBugKV[taskId].endDate);
            if (coreBugKV[taskId].isMeet === '1') {
                $("#toplanti-d-btn").click();
            } else {
                $("#tapshiriq-btn").click();
            }
            $("#taskMgmtModal").modal("show");
            //set backlog infos

            if (coreBugKV[taskId].backlogName) {
                $('#taskMgmtModal').find('#task-mgmt-modal-user-story')
                    .attr('pid', coreBugKV[taskId].fkBacklogId)
                    .html(coreBugKV[taskId].backlogName);
            }

            this.getCheckListComulativ(taskId);
            this.getTaskObserverList(taskId);

            this.getTaskEvent(taskId);
            getChildTasks();
            getParentTask();

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
                    that.getTaskObserverList(taskId);
                });
            } catch (error) {
                console.log('task Observer ++++' + error);
            }


        },
        updateBacklogTaskDetail: function (taskId) {
            try {
                var data = {};
                data.fkTaskId = taskId;
                data.actionParam = getMultiSelectpickerValueByElementName("run_task_weekday_select");
                data.action = $("#bug_filter_project_id_add").val();
                data.weekdays = $("#swofm_weekday_select").val();
                data.startDate = toDate("runTaskStartDate");
                data.endDate = toDate("runTaskEndDate");
                data.runTime = GetConvertedTime("runTaskTime");
                data.intensive = $("#run_task_intensive_select").val();
                data.repeatInterval = $("#run_task_repeat_select").val();
                data.scheduleStatus = $("#run_task_status_select").val();
                data.projectId = $('#bug_filter_project_id_add').val();
                data.projectName = $('#bug_filter_project_id_add option:selected').text();
                data.sendNotification = $("#sendnotification").is(":checked") ? "1" : "0";
                data.notificationMail = $("#sendnotification").is(":checked") ? "1" : "0";
                data.remindMeParam = $("#bug_filter_project_id_add").val();
                data.activateSchedule = $("#runTaskAvtivateSchedule").is(":checked") ? "1" : "0";
                data.monthlyAction = $("#monthlyAction:checked").val();
                data.actionDayOfMonth = $("#sdofm_day_of_Month_select").val();
                data.dayBeforeLastDayOfMonth = $("#days_before_last_day_of_month").val();
                data.specificWeekDayOfMonthAction = $("#swofm_fl_action_select").val();
                data.specificWeekDayOfMonthWeekdays = $("#swofm_weekday_select").val();
                data.taskCheckList = $('#commentinput_for_taskcreatechecklist').val();

                callService('serviceRsCreateBacklogTaskDetail', data, true, function () {
                    // getTaskkObserverList(global_var.current_task_id_4_comment)
                });
            } catch (error) {
                console.log('task Observer ++++' + error);
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
                        .append($('<span>')
                            .addClass((o.isChecked === '1') ? 'text-checked' : '')
                            .append($('<textarea>')
                                .attr('rows', '1')
                                .addClass('form-control')
                                .attr("oid", o.id)
                                .addClass("updateTaskcheckListItemName")
                                .val(o.itemName)))
                        .append($('<span>')
                            .append(createdBySpan))
                        .append($('<span>')
                            .append(updatedBySpan))

                        .append($('<span>')
                            .append($('<a href="#">')
                                .attr('oid', o.id)
                                .addClass("taskCheckListItemDelete")
                                .append('<i class="fas fa-trash-alt" aria-hidden="true"></i>')));
                    ul.append(tr);

                }

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
            var userList = {};
            try {
                var idx = getIndexOfTable(res, "userList");
                var objUser = res.tbl[idx].r;
                for (var k in objUser) {
                    var o2 = objUser[k];
                    userList[o2.id] = o2;
                }
            } catch (err) {}



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

            try {
                var idy = getIndexOfTable(res, "tmBacklogTaskObserver");
                var obj = (res && res.tbl && res.tbl.length > 0) ? res.tbl[idy].r : [];
                for (var n = 0; n < obj.length; n++) {
                    var o = obj[n];

                    var lst = o.fkUserId.split(',')
                    for (let l = 0; l < lst.length; l++) {
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

                }
                div.html(table);
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
                var div = $('<div></div>').append($('<div></div>').addClass("row").append("<br>"));
                for (var i = 0; i < obj.length; i++) {


                    var div_by_col = $('<div></div>').addClass("col").addClass("mangodbcol1")
                        .append("<br>");
                    var div_by_row = $('<div></div>')
                        .addClass("row")
                        .addClass("mangodb");
                    var img = obj[i].avatarUrl.length === 0 ?
                        fileUrl(new User().getDefaultUserprofileName()) :
                        fileUrl(obj[i].avatarUrl);
                    var div1 = $('<div></div>')
                        .addClass("col-1 comment-line1")
                        .append($('<img></img>')
                            .addClass("figure-img img-fluid rounded-circle")
                            .attr("style", "max-width:28px")
                            .attr("src", img));
                    //            var comment = replaceMainTrustedTags(replaceTags(obj[i].comment));
                    var comment = replaceTags(obj[i].comment);
                    var div2 = $('<div></div>')
                        .attr('style', "padding-left:0px;font-size:13px;")
                        .addClass("col-11")
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
                        .append("<br>")
                        .append($("<span class='comment-main-span'>")
                            .css('padding-bottom', "5px")
                            .attr("id", obj[i].id)
                            //                            .attr("ondblclick", "new UserStory().convertCommentHtml2TextArea(this)")
                            .attr("pval", replaceMainTrustedTags(replaceTags(obj[i].comment)))
                            .append(MapTextAreaHtml(comment)));
                    var div2_1 = new UserStory().generateCommentFileLine(obj[i].fileName);
                    var div3 = $('<div></div>').addClass("col-12").append("");
                    div2.append(div2_1)
                        .append("<br>")
                    //                    .append($('<a href="#" style="font-size:11px;">')
                    //                            .attr('onclick', " convertCommentHtml2TextArea(this,'" + obj[i].id + "')")
                    //                            .append("Edit"))

                    //                    .append('&nbsp;&nbsp;&nbsp;')
                    //                    .append($('<a class="saveComment" href="#" style="display:none;font-size:11px;">')
                    //                            .attr('onclick', "saveComment(this,'" + obj[i].id + "')")
                    //                            .append("Save"));
                    div_by_row.append(div1).append(div2)
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
            var el = $('#bug_filter_detail_assignee_id_update')
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
            }



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
                if (view === 'kanban') {
                    div.append(this.genHeader());
                } else if (view === 'table') {
                    div.append(this.genHeader());
                    div.append(this.genTableView.genTableBlock());
                }

            },
            genHeader: function () {
                return `<div class="header-info-section d-flex w-100">
                <div class="mr-auto p-2">
                    <div class="d-flex justify-content-start" id="task-list-statistic-block"> 
                
               </div>    
                </div>
                <div class="p-2 mt-2">
                    <div class="dropdown info-box-dropdown" id="task-table-aktiv-all">
                        <a class="btn dropdown-toggle" href="#" role="button" id="task-table-aktiv-all1" data-toggle="dropdown" aria-expanded="false">
                            <span class="title">H</span> <span id="row-count-table">125</span>
                        </a>
                       <div class="dropdown-menu dropdown-menu-right" aria-labelledby="task-table-aktiv-all1">
                          <a class="dropdown-item" all-aktiv="A" href="#">Activ</a>
                          <a class="dropdown-item" all-aktiv="P" href="#">Passiv</a>
                          <a class="dropdown-item" all-aktiv="H" href="#">Hamısı</a>
                        </div>
                      </div>
                   </div>
                </div>`
            },
            genHeaderContent: function (privateT, work, vxtkcb, vxtctb, nvbd, nodeadln, newt, ongoing, waiting, yonledrlb, canceled, rejected, closed, btb) {
                return `
               <div class="info-box mr-2">
               <div class="info-item-elements" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Şəxsi" data-original-title="" title="">
                   <i class="cs-svg-icon user-circle-white"></i> <span>${privateT}</span>
               </div>
               <div class="info-item-elements" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="İş" data-original-title="" title="">
                   <i class="cs-svg-icon users-circle-white"></i> <span>${work}</span>
               </div>
           </div> 
           <div class="info-box mr-2">
                <span class="title">Tarix</span>
                <div class="info-item-elements" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Vaxtı keçib" data-original-title="" title="">
                    <i class="cs-svg-icon dot-radar"></i> <span>${vxtkcb}</span>
                </div>
                <div class="info-item-elements" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Vaxtı çatıb" data-original-title="" title="">
                    <i class="cs-svg-icon checkbox-circle"></i> <span>${vxtctb}</span>
                </div>
                <div class="info-item-elements" data-placement="bottom" data-toggle="p
                opover" data-trigger="hover" data-content="Növbədə" data-original-title="" title="">
                    <i class="cs-svg-icon dot-circle"></i> <span>${nvbd}</span>
                </div>
                <div class="info-item-elements" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Vaxt qoyulmayıb" data-original-title="" title="">
                    <i class="cs-svg-icon circle"></i> <span>${nodeadln}</span>
                </div>
            </div>
            <div class="info-box">
                <span class="title">Status</span>
                <div class=" info-item-elements" data-status="new" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Yeni" data-original-title="" title="">
                  <i class="cs-svg-icon plus-circle"></i> <span>${newt}</span>
                </div>
                <div class=" info-item-elements" data-status="ongoing" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="İcrada" data-original-title="" title="">
                    <i class="cs-svg-icon refresh-three"></i> <span>${ongoing}</span>
                </div>
                <div class=" info-item-elements" data-status="waiting" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Gözləmədə" data-original-title="" title="">
                    <i class="cs-svg-icon hour-01"></i> <span>${waiting}</span>
                </div>
        
                <div class=" info-item-elements active" data-status="yonlendirilib" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Yönləndirilib" data-original-title="" title="">
                    <i class="cs-svg-icon right-circle"></i> <span>${yonledrlb}</span>
                </div>
                <div class=" info-item-elements" data-status="canceled" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Ləğv edilib" data-original-title="" title="">
                    <i class="cs-svg-icon close-icon"></i> <span>${canceled}</span>
                </div>
                <div class=" info-item-elements" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="İmtina edilib" data-original-title="" title="">
                    <i class="cs-svg-icon none"></i> <span>${rejected}</span>
        
                </div>
                <div class=" info-item-elements" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="İcra edilib" data-original-title="" title="">
                    <i class="cs-svg-icon double-checkbox"></i> <span>${closed}</span>
                </div>
                <div class=" info-item-elements" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-content="Bitib" data-original-title="" title="">
                    <i class="cs-svg-icon shtamp-circle"></i> <span>${btb}</span>
                </div>
            </div>`
            },
            genKanbanView: {
                genZonaBlock: function () {
                   
                },
                genKanbanContentBlock: function () {

                },
            },
            genTableView: {
                genTableBlock: function () {
                    return `   <div class="col pl-1 pr-1" id="addBuglist">
                   <div class="row" style="margin: 0;">
                       <div class='col-12 tableFixHead' id1="bugList" style="padding: 0;">
                           <table class="table-hover splited1 bugListTable" style="width:100%" id="bugListTable">
                               <thead class="bugThead">
                                ${this.genTableHeaderBlock()}
                               </thead>
                               <tbody>
       
                               </tbody>
       
                           </table>
                       </div>
                       
                   </div>
                  
       
                   <div class=" col-12 d-flex justify-content-center paginationStyle">
                       <nav aria-label="Page navigation example">
                           <ul class="pagination" id="pagination_block">
                               <li class="page-item">
                                   <a class="page-link" href="#" aria-label="Previous">
                                       <span aria-hidden="true">&laquo;</span>
                                       <span class="sr-only">Previous</span>
                                   </a>
                               </li>
                               <li class="page-item num"><a class="page-link">1</a></li>
                               <li class="page-item num"><a class="page-link">2</a></li>
       
                               <li class="page-item order-last">
                                   <a class="page-link" href="#" aria-label="Next">
                                       <span aria-hidden="true">&raquo;</span>
                                       <span class="sr-only">Next</span>
                                   </a>
                               </li>
                           </ul>
                       </nav>
                   </div>
               </div>   `
                },
                genTableHeaderBlock: function () {
                    return `<thead class="bugThead">
                    <tr>
                    <th><i class="cs-svg-icon numbers"></i></th>
                    <th><input type="checkbox" class="all-bug-list-check"></th>
                    <th class="bug-list-column bug-list-column-task-id" style=""><i class="cs-svg-icon id"></i></th>
                    <th class="bug-list-column-0 bug-list-column-task-deadline"><i class="cs-svg-icon deadline"></i></th>
                    <th class="bug-list-column bug-list-column-task-status" style="width: 90px;"><i class="cs-svg-icon status"></i></th>
                    <th class="bug-list-column bug-list-column-task-name" style="min-width: 160px;">Description</th>
                    <th class="bug-list-column bug-list-column-task-nature" style="width: 140px;">Task Nature</th>
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
                    <th></th>
                    </tr>
                   </thead>`
                },
                genTableBodyBlock: function (res) {
                    //    tbody to append
                    var table = $('#bugListTable');
                    var tbody = $('#bugListTable > tbody');
                    tbody.html('');
                    table.append(getBugListDetailsHeader());
                    // // thead to appaend----main header
                    var sumEstHours = 0,
                        sumSpentHours = 0,
                        sumEstCount = 0,
                        sumExecCount = 0,
                        sumEstBudget = 0,
                        sumSpentBudget = 0;



                    var obj = res.tbl[0].r;
                    for (var i = 0; i < obj.length; i++) {
                        var o = obj[i];

                        /*         var isLabelChecked = (bug_filter.label_id.length > 1);
                         var divLabelFilter = $('<div>')
                         .append($("<input type='checkbox'>")
                         .addClass("assign-label-to-task-item")
                         .attr("pid", o.id)
                         .attr('projectId', o.fkProjectId)
                         .attr('backlogId', o.fkBacklogId)
                         .attr("checked", isLabelChecked)
                         .attr("sid", global_var.bug_task_label_assign_id))
                         .append($('<span>').append(" (" + global_var.bug_task_label_assign_name + ") ")); */

                        /* var rsLabelFilter = global_var.bug_task_label_assign_checked === 1 */
                        /*  ?
                                 divLabelFilter.html() :
                                 ""; */
                        /* 
                         var ischecked = (bug_filter.sprint_id.length > 1); */
                        /*         var div = $('<div>')
                         .append($("<input type='checkbox'>")
                         .addClass("assign-sprint-to-task-item")
                         .attr("pid", o.id)
                         .attr('projectId', o.fkProjectId)
                         .attr('backlogId', o.fkBacklogId)
                         .attr("checked", ischecked)
                         .attr("sid", global_var.bug_task_sprint_assign_id))
                         .append($('<span>').append(" (" + global_var.bug_task_sprint_assign_name + ") ")); */



                        var rs = global_var.bug_task_sprint_assign_checked === 1
                        /* ?
                                div.html() :
                                ""; */

                        sumEstHours = increaseValue(sumEstHours, o.estimatedHours);
                        sumSpentHours = increaseValue(sumSpentHours, o.spentHours);
                        sumEstCount = increaseValue(sumEstCount, o.estimatedCounter);
                        sumExecCount = increaseValue(sumExecCount, o.executedCounter);
                        sumEstBudget = increaseValue(sumEstBudget, o.estimatedBudget);
                        sumSpentBudget = increaseValue(sumSpentBudget, o.spentBudget);

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

                        var backlogName = '<a href1="#" onclick="callStoryCard4BugTask(\'' + o.fkProjectId + '\',\'' + o.fkBacklogId + '\',this)">' + replaceTags(o.backlogName) + '</a>';
                        var taskName = '<a class="task-list-name issue_' + o.id + '" href1="#" onclick="taskManagement.updateTask.callTaskCard4BugTask(this,\'' + o.fkProjectId + '\',\'' + o.id + '\')" >' + replaceTags(fnline2Text(o.taskName)) + '</a>';
                        var task_id = getTaskCode(o.id);

                        var dropMenuDiv = $("<div>")
                            .addClass("dropdown-menu")
                            .attr("aria-labelledby", "bug-status-dropdown")

                            .append('<a class="dropdown-item" data-value ="new">New</a>')
                            .append('<a class="dropdown-item" data-value ="ongoing">Ongoing</a>')
                            //                        .append('<a class="dropdown-item" data-value ="closed">closed</a>')
                            .append('<a class="dropdown-item" data-value ="waiting">Waiting</a>')
                            .append('<a class="dropdown-item" data-value ="Canceled">Canceled</a>')
                        //                        .append('<a class="dropdown-item" data-value ="UAT">UAT</a>')

                        var t = $('<tr>')
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
                                .append($('<div>').addClass('td-deadline-box kecib')
                                    .append($('<span>')
                                        .text('-22s')))
                            )
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-task-status cs-input-group')
                                .css("text-align", 'left')
                                .css("padding-left", '3px')
                                .css("overflow", 'initial')
                                .append($("<div>")
                                    .addClass("dropdown")
                                    .append($("<div>")
                                        .addClass('dropdown-toggle cst-dropwdown-toggle-bug')
                                        .addClass('us-item-status-' + o.taskStatus)
                                        .attr("data-toggle", "dropdown")
                                        .attr("aria-haspopup", "true")
                                        .attr("aria-expanded", "false")
                                        .attr("id", "bug-status-dropdown")
                                        .append($('<span>')
                                            .append(o.taskStatus)))
                                    .append(o.taskStatus !== 'UAT' ? dropMenuDiv : "")
                                ))
                            .append($('<td>')
                                .addClass('bug-list-column')
                                .addClass('bug-list-column-task-name')
                                .css("max-width", '240px')
                                .append(taskName, ' ')
                                .append("<input type='text' class=' task-name-issue select-box-issue'>")
                                .append($("<div>")
                                    .addClass("dropdown task-name-editdrop")
                                    .append($("<button>")
                                        .addClass('btn btn-light')
                                        .attr("aria-haspopup", "true")
                                        .attr("aria-expanded", "false")
                                        .attr("data-toggle", "dropdown")
                                        .attr("id", "bug-taskName-dropdown")
                                        .append('<i class="fas fa-ellipsis-v"></i>'))

                                    .append($("<div>")
                                        .addClass("dropdown-menu")
                                        .attr("aria-labelledby", "bug-taskName-dropdown")

                                        .append('<a class="dropdown-item forward-task" href="#" onclick="()">Create Child Task</a>')
                                        .append('<a class="dropdown-item forward-task" href="#" onclick="ForwardTaskTo()">Forward To</a>')
                                        .append('<a class="dropdown-item assign-task" href="#" onclick="assignTaskToOthers()">Assign To</a>')
                                        .append('<a class="dropdown-item clone-task" href="#" onclick="cloneTask()">Duplicate</a>')
                                        .append('<a class="dropdown-item" href="#" onclick="rejectTask()">Reject Task</a>')
                                        .append('<a class="dropdown-item" href="#" onclick="iDidIt()">I Did It!</a>')
                                        .append('<a class="dropdown-item" href="#" onclick="userAcceptance()">User Acceptance Testing</a>')
                                        .append('<a class="dropdown-item" href="#" onclick="deleteTask()">Delete</a>')

                                    ))
                                .append((o.fkParentTaskId) ? "<i class='fa fa-level-up '>" : "")
                                .attr('title', (o.fkParentTaskId) ? "Has Parent Task" : "")
                            )
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-task-nature')
                                .append($("<div>")
                                    .addClass("dropdown")
                                    .append($("<div>")
                                        .addClass('dropdown-toggle cst-dropwdown-toggle-bug')
                                        .attr("data-toggle", "dropdown")
                                        .attr("aria-haspopup", "true")
                                        .attr("aria-expanded", "false")
                                        .attr("id", "bug-taskNature-dropdown")
                                        .append(getBugListTaskNatureValue(o.taskNature)))

                                    .append($("<div>")
                                        .addClass("dropdown-menu")
                                        .attr("aria-labelledby", "bug-taskNature-dropdown")

                                        .append('<a class="dropdown-item" data-value ="new">New Request</a>')
                                        .append('<a class="dropdown-item" data-value ="change">Change Request</a>')
                                        .append('<a class="dropdown-item" data-value ="bug">Bug</a>')

                                    )))

                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-priority get-data-group').append(replaceTags(o.taskPriority)))
                            .append($('<td>').addClass('bug-list-column')
                                .addClass('bug-list-column-story-card')
                                .append("<span class='get-data-group ellipsis-story-card'>" + backlogName + "</span>")
                                .append(' <select dataPid=' + o.fkProjectId + ' id="userStory-taskList-us" title="UserStory" data-actions-box="true" class=" select-box-issue" data-live-search="true"></select>')
                                .append($('<div>').addClass('set-filter-box')
                                    .append($('<i class="fa fa-filter">')
                                        .attr('onclick', 'setFilter4IssueMgmtAsBacklog("' + o.fkProjectId + '","' + o.fkBacklogId + '")')
                                        .css("display", "none")
                                        .addClass("hpYuyept"))
                                    .append($('<i class="fas fa-chevron-down">')
                                        .attr('onclick', 'setChnageUserStoryCard("' + o.fkProjectId + '",this)')
                                        .css("display", "none")
                                        .addClass("hpYuyept1"))
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
                                .attr("style", "width:140px;")
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
                                .append(genUserTrblock(o.userName, img))
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
                                .append(genUserTrblock(o.createByName, createdByImg))
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

                        tbody.append(t);
                        $('[data-toggle="popover"]').popover({
                            html: true
                        });
                    }

                    getBugListDetailsSumLine(tbody, sumEstHours, sumSpentHours, sumEstCount, sumExecCount,
                        sumEstBudget, sumSpentBudget);

                    global_var.bug_task_sprint_assign_checked = '';
                    global_var.bug_task_sprint_assign_name = '';
                    global_var.bug_task_sprint_assign_id = '';


                    global_var.bug_task_label_assign_checked = '';
                    global_var.bug_task_label_assign_name = '';
                    global_var.bug_task_label_assign_id = '';
                }
            }
        },
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
                        $(elm).val(coreBugKV[global_var.current_issue_id].fkTaskTypeId);
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
            async: false,
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

// task-management event  list  add section events start >>>>>>>>START>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

$(document).on("change", '#updateCheckList', function (e) {


    var tskId = Utility.getParamFromUrl('current_issue_id')

    taskManagement.insertTask.insertCheckListComulativCore($(this).val() + "|", tskId, 'update')
    $(this).val('');

})
/* $(document).on("keypress", ".commentinput", function (event) {
    if (event.keyCode === 13) {
        new UserStory().addTaskCommentToTask(this)
    }
}) */
$(document).on("change", '#newAddCheckList', function (e) {

    $(this).parent().find('ul').prepend(`<li class="d-flex">
    <div class="item-checkbox">
        <label class="checkmarkcontainer">
            <input type="checkbox" class="noteCheckListItem" value="0">
            <span class="checkmark"></span>
        </label>
    </div>
    <div class="item-note">${$(this).val()}</div>
</li>`)
    $(this).val('')

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
    taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');

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
    taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');

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
    global_var.active_canvas = 'taskCreate';
    taskManagement.setBugFilterProjectAdd('bug_filter_project_id_add');
    var dwlmt = $('#bug_task_type_id_add')
    taskManagement.add_loadTaskType_bug_list(dwlmt);
    taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');

    $("#issue-managment-add-task").modal("show");

});
$(document).on("change", '#bug_filter_project_id_add', function (e) {
    var id = $(this).val();
    taskManagement.getBacklogLIstByprojectId(id)


})
$(document).on("click", '#addNewTaskButton', function (e) {
    taskManagement.insertTask.genBlockModal.Init();
    loadBugTaskDeadlineScripts()
    reset_task_data();
    global_var.active_canvas = 'taskCreate';
    taskManagement.setBugFilterProjectAdd('bug_filter_project_id_add');
    var dwlmt = $('#bug_task_type_id_add')
    taskManagement.add_loadTaskType_bug_list(dwlmt);
    taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');
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
        idb = '21082003320807935137'
    }
    if (global_var.current_modal === 'loadActivityDiagram') {
        idb = ''
    }
    if (global_var.current_modal === 'loadSourceActivity') {
        idb = ''
    }
    if (global_var.current_modal === 'loadEntityDiagram') {
        idb = '21082003322903142571'
    }
    if (global_var.current_modal === 'loadSqlBoard') {
        idb = '21102000014805402484'
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
    taskManagement.getUserListWithImageSelectbox(global_var.current_project_id, 'create');
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
$(document).on("click", ".addObserverToTAskUpdate", function (e) {

    var taskid = Utility.getParamFromUrl('current_issue_id');
    var val = $("#updatetask_oblerverlist").val();
    taskManagement.updateTask.updateObserverTask(taskid, val)
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
$(document).on("click", '#toplanti-btn', function () {
    $(this).addClass('active');
    $(this).closest('.task-deadline-boxes').find('.tapshiriq-btn').removeClass('active');
    $(this).closest('.modal-body').find('.loadUserForObserver i.cs-svg-icon').removeClass('observer').addClass('participant');
    $(this).closest('.modal-body').find('.loadUserForObserver span').text('').text('Participant');
});
$(document).on("click", '#tapshiriq-btn', function () {
    $(this).addClass('active');
    $(this).closest('.task-deadline-boxes').find('.toplanti-btn').removeClass('active');
    $('.loadUserForObserver i.cs-svg-icon').removeClass('participant').addClass('observer');
    $('.loadUserForObserver span').text('').text('Observer');

});


$(document).on("click", '#toplanti-d-btn', function () {
    $(this).addClass('active');
    $(this).closest('.modal-body').find('.tapshiriq-btn').removeClass('active');
    $(this).closest('.modal-body').find('.loadUserForObserver i.cs-svg-icon').removeClass('observer').addClass('participant');
    $(this).closest('.modal-body').find('.loadUserForObserver span').text('').text('Participant');

    $(this).closest('.modal-body').find('.loadUserForSubtask i.cs-svg-icon').removeClass('subtask-light').addClass('hammer');
    $(this).closest('.modal-body').find('.loadUserForSubtask span').text('').text('Decisions');
});

$(document).on("click", '#tapshiriq-d-btn', function () {
    $(this).addClass('active');

    $(this).closest('.modal-body').find('.toplanti-btn').removeClass('active');

    $(this).closest('.modal-body').find('.loadUserForObserver i.cs-svg-icon').removeClass('participant').addClass('observer');
    $(this).closest('.modal-body').find('.loadUserForObserver span').text('').text('Observer');

    $(this).closest('.modal-body').find('.loadUserForSubtask i.cs-svg-icon').removeClass('hammer').addClass('subtask-light');
    $(this).closest('.modal-body').find('.loadUserForSubtask span').text('').text('Subtask');

});


// task-management event  list  add section events end >>>>>>>END>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function reset_task_data() {
    $('.task-events-created').attr("data-taskid", '');
    $('.task-events-created input').val('');
    $('.task-events-created input').change('');
    $('input#taskNameInputNew2').val('');
    $('#addComment4Task_comment_new').val('');
}