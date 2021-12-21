const taskManagement = {

    insertTask: {
        genBlockModal:{
            Init:function () {
                $('body').find("#issue-managment-add-task").remove();
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
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <i class="cs-svg-icon x-close"></i>
                          </button>
                      </div>
                      <div class="modal-body">
                    <div class="row">
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
            genTitleBlock:function () {
                return `<div class="cs-input-group mb-3">
                <div class="d-flex">
                    <div class="mr-auto" style="width: 93%;">
                        <input type="text" class="form-control newTaskNameInput" name="testCaseTitle" id="taskNameInputNew2" placeholder="e.g., Renew gym every May 1st #Sport">
                    </div>
                    <div class="p-0">
                        <div class="priority-btn"><!-- if active ( class name -- active ) -->
                             <i class="cs-svg-icon flame"></i>
                        </div>
                    </div>
                </div>
            </div>`
            },
            genCheckListBlock:function () {
                return ` <div class="cs-input-group">
                <div class="task-check-list-box cs-box-background overflow-hidden">
                    <input type="text" class="form-control" id="newAddCheckList" placeholder="add check words..." style="background: transparent; border-radius: 0;">
                    <ul>
                      
                    </ul>
                </div>
            </div>`
            },
            genFileAddBlock:function () {
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
            genTaskDeadLineBlockTime:function () {
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
            genTaskDeadLineBlockTask:function () {
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
            genTaskDeadLineBlockEvent:function () {
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
            genNotifyButton:function () {
              return `  <div class="row">
              <div class="cs-flex-col flex-item ml-3 mt-2 horizontal">
                  <div class="cs-input-group mt-2">
                      <label class="checkmarkcontainer">Notify you about the confirmation?
                          <input type="checkbox" id="sendnotification">
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
                     ${this.genDetailsBlock()}
                     ${this.genScheduleBlock()}
                     ${this.genObserverBlock()}
                     ${this.genEventBlock()}
                     </div>
                     `
                     return  div                   
                },
                genTabHeader:function () {
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
        insertObserverTask: function (taskId) {
            try {
                var userList = "";
                var tbl = $("#issue-managment-add-task .task-observer-list>table>tr");

                for (let i = 0; i < tbl.length; i++) {
                    const o = tbl[i];
                    userList += $(o).attr("id") + ",";
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
            var itmList  =''
            var items  = $(".task-check-list-box ul>li");
              for (let i = 0; i < items.length; i++) {
                  const o = items[i];

                  itmList += $(o).find('.item-note').text() +'|';                
              }

            var data ={};
                data.fkTaskId = taskId;
                data.itemName =itmList;
            callService('insertSingleTaskCheckListCumulativeNew', data, true, function () {
              
            });
        }
        

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
    add_loadTaskType_bug_list: function (elm) {
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
                    $(elm).selectpicker('refresh')
                }
            }
        });
    }
}


// task-management event  list  add section events start >>>>>>>>START>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
    var bgid = $(this).parents('.task-content').attr("bid")
    var prId = getProjectIdOfBacklog(bgid);//$("#story_mn_filter_project_id").val();
    $("#bug_filter_project_id_add").val(prId).change();
    $("#bug_filter_backlog_id_add").val(bgid).change();
    var dwlmt = $('#bug_task_type_id_add')
    taskManagement.add_loadTaskType_bug_list(dwlmt);
    loadBugTaskDeadlineScripts()

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
    loadAssigneesByProject(global_var.current_project_id);
    $("#issue-managment-add-task").modal("show");
    
})

$(document).on("click", '#addIssueButtonId', function (e) {
    // $('#issue-managment-add-task .after-add-task').show();
    /* $('#issue-managment-add-task .after-add-task').css("pointer-events", "auto");
    $('#issue-managment-add-task .after-add-task').css("opacity", "1");
    $('#issue-managment-add-task .task-step-1').hide();
    $('#issue-managment-add-task .task-step-2').show(); */
    taskManagement.insertTask.insertNewTask();


})
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

function getTaskkObserverList(fkTaskId) {
    $('.task-observer-list').html('')
    callService('serviceTmgetTaskkObserverList', {
        "fkTaskId": fkTaskId
    }, true, function (res) {
        getTaskkObserverListDetaisl(res);
    });
}


function getTaskkObserverListDetaisl(res) {
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

    var idy = getIndexOfTable(res, "tmBacklogTaskObserver");
    var obj = (res && res.tbl && res.tbl.length > 0) ? res.tbl[idy].r : [];
    for (var n = 0; n < obj.length; n++) {
        var o = obj[n];

        var userSpan = (o.fkUserId && userList[o.fkUserId]) ?
            $('<span>')
            .attr('title', 'Observer ')
            .addClass('peronal-info')
            .append($('<img>')
                .addClass('Assigne-card-story-select-img')
                .attr('width', '40px')
                .attr('src', fileUrl(userList[o.fkUserId].userImage)))
            .append($('<span>').text(userList[o.fkUserId].userPersonName))

            :
            '';



        var tr = $("<tr>")
            .append($('<td>').text((n + 1)))
            .append($('<td>')
                .append(userSpan))
            .append($('<td>')
                .append($('<a href="#">')
                    .attr('oid', o.id)
                    .addClass("taskObserverDelete")
                    .append('<i class="fas fa-trash-alt" aria-hidden="true"></i>')));
        table.append(tr);
    }
    div.html(table);
}

// task-management event  list  add section events end >>>>>>>END>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>