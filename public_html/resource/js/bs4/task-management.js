const taskManagement = {

    insertTask: {

        insertNewTask: function () {
            var data = this.getValueCreateModalScreen();
           
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


            data.startDate = toDate("runTaskStartDate");
            data.endDate = toDate("runTaskEndDate");
            data.runTime = GetConvertedTime("runTaskTime");
            data.intensive = $("#run_task_intensive_select").val();
            data.repeatInterval = $("#run_task_repeat_select").val();
            data.scheduleStatus = $("#run_task_status_select").val();
            // data.description = $("#bug_filter_project_id_add").val();
            data.actionParam = getMultiSelectpickerValueByElementName("run_task_weekday_select");
            data.action = $("#bug_filter_project_id_add").val();
            data.weekdays = $("#swofm_weekday_select").val();
            data.sendNotification = $("#sendnotification").is(":checked") ? "1" : "0";
            data.notificationMail = $("#bug_filter_project_id_add").val();
            data.remindMeParam = $("#bug_filter_project_id_add").val();
            data.activateSchedule = $("#runTaskAvtivateSchedule").is(":checked") ? "1" : "0";


            data.monthlyAction = $("#monthlyAction:checked").val();
            data.actionDayOfMonth = $("#sdofm_day_of_Month_select").val();
            data.dayBeforeLastDayOfMonth = $("#days_before_last_day_of_month").val();
            data.specificWeekDayOfMonthAction = $("#swofm_fl_action_select").val();
            data.specificWeekDayOfMonthWeekdays = $("#swofm_weekday_select").val();
            data.taskCheckList = $('#commentinput_for_taskcreatechecklist').val();
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

            var userList =
                callService('serviceTminsertTaskObserver', {
                    "fkTaskId": taskId,
                    "fkUserId": userList
                }, true, function () {
                    getTaskkObserverList(global_var.current_task_id_4_comment)
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


// task-management event  list

$(document).on("change", '#bug_filter_project_id_add', function (e) {
    var id = $(this).val();
    taskManagement.getBacklogLIstByprojectId(id)


})
$(document).on("click", '#addNewTaskButton', function (e) {
    reset_task_data();
    global_var.active_canvas = 'taskCreate';
    taskManagement.setBugFilterProjectAdd('bug_filter_project_id_add');
    var dwlmt = $('#bug_task_type_id_add')
    taskManagement.add_loadTaskType_bug_list(dwlmt);
    /* $('#issue-managment-add-task .after-add-task').css("pointer-events", "none");
    $('#issue-managment-add-task .after-add-task').css("opacity", "0.7");
    $('#issue-managment-add-task .task-step-1').show();
    $('#issue-managment-add-task .task-step-2').hide();
    $('#issue-managment-add-task #details-tab').click(); */
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