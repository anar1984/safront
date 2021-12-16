const taskManagement = {

    insertTask: {

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
    loadAssigneesByProject(global_var.current_project_id)
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