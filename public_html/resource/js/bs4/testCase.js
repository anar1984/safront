// ****************************
//    Bug List 30.08.2020
// ****************************

// Bug List table show and hide
var bug_filter = {
    search_text: '',
    project_id: '',
    backlog_id: '',
    assignee_id: '',
    created_by: '',
    status: '',
    priority: '',
    nature: '',
    limit: 30,
    page_no: 1,
    sprint_id: '',
    label_id: '',
}

var sprintTaskIds = "";
var labelTaskIds = "";
var bugId = "";

var coreBugList = {};
var coreBugKV = {};
$(document).on('click', '.bug-task-filter-checkbox-label', function (evt) {

    var rc = getLabelFilterCheckedCount();
    if (rc > 0) {
        $('.bug-filter-badge-label').show();
        $('.bug-filter-badge-label').html(rc)
    } else {
        $('.bug-filter-badge-label').hide();
    }

    if (global_var.current_modal === 'loadBugChange') {
        getBugList();
    } else if (global_var.current_modal === 'loadTaskManagement') {
        $('.' + global_var.task_mgmt_group_by).click();
    }
})

$(document).on('click', '.bug-task-filter-checkbox-sprint', function (evt) {

    var rc = getSprintFilterCheckedCount();
    if (rc > 0) {
        $('.bug-filter-badge').show();
        $('.bug-filter-badge').html(rc)
    } else {
        $('.bug-filter-badge').hide();
    }

    if (global_var.current_modal === 'loadBugChange') {
        getBugList();
    } else if (global_var.current_modal === 'loadTaskManagement') {
        $('.' + global_var.task_mgmt_group_by).click();
    }
})

function getLabelFilterCheckedCount() {
    var rc = 0;
    $('.bug-task-filter-checkbox-label').each(function () {
        if ($(this).is(":checked")) {
            rc++;
        }
    })
    return rc;
}


function getSprintFilterCheckedCount() {
    var rc = 0;
    $('.bug-task-filter-checkbox-sprint').each(function () {
        if ($(this).is(":checked")) {
            rc++;
        }
    })
    return rc;
}

$(document).on('click', '.assign-label-to-task-item', function (evt) {
    var id = $(this).attr("pid");
    var projectId = $(this).attr('projectId');
    var backlogId = $(this).attr('backlogId');

    var labelId = $(this).attr("sid");
    var checked = '0';
    if ($(this).is(":checked")) {
        checked = '1';
    }

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv['fkLabelId'] = labelId;
    json.kv['fkProjectId'] = projectId;
    json.kv.fkBacklogId = backlogId;
    json.kv['fkBacklogTaskId'] = id;
    json.kv.assign = checked;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmAssignLabelToTask",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            new Label().load4Task()
        },
        error: function () {
            Toaster.showError(('Something went wrong!!!'));
        }
    });
});


$(document).on('click', '.assign-sprint-to-task-item', function (evt) {
    var id = $(this).attr("pid");
    var projectId = $(this).attr('projectId');
    var backlogId = $(this).attr('backlogId');

    var sprintId = $(this).attr("sid");
    var checked = '0';
    if ($(this).is(":checked")) {
        checked = '1';
    }

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv['fkSprintId'] = sprintId;
    json.kv['fkProjectId'] = projectId;
    json.kv.fkBacklogId = backlogId;
    json.kv['fkBacklogTaskId'] = id;
    json.kv.assign = checked;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmAssignSprintToTask",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            new Sprint().load4Task()
        },
        error: function () {
            Toaster.showError(('Something went wrong!!!'));
        }
    });
});

function deleteBugFromTable(el) {
    if (!bugId) {
        return;
    }

    if (!confirm("Are you sure?")) {
        return;
    }

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv.id = bugId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmDeleteBacklogTask",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            SATask.deleteTask(bugId);
            SATask.RemoveFromOrderNo(bugId);
            $('#addBugBtnClose').click();
//            getBugList();

        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

function addNewTask4Bug(el) {
    if (!$(el).val().trim()) {
        return;
    }
    var taskName = $(el).val().trim();
    var projectList = $('#bug_filter_project_id').val();
    if (projectList.length === 0) {
        Toaster.showError("Please select project(s).")
        return;
    }

    var backlogList = ($('#bug_filter_backlog_id').val().length > 0)
            ? $('#bug_filter_backlog_id').val()
            : ['-1'];
    var assigneeList = ($('#bug_filter_assignee_id').val().length > 0)
            ? $('#bug_filter_assignee_id').val()
            : ['-1'];
    var sprintList = "";
    $('.bug-task-filter-checkbox-sprint').each(function () {
        if ($(this).is(":checked")) {
            sprintList += $(this).val() + ',';
        }
    })


    for (var bid in backlogList) {
        for (var aid in assigneeList) {
            insertNewTaskDetail4Bug(taskName, backlogList[bid], assigneeList[aid], 'new', projectList, sprintList)
        }
    }


    $(el).val('');
    getBugList();
}

function insertNewTaskDetail4Bug(taskName, backlogId, assgineeId, taskStatus, projectId, sprintList) {
    if (!(taskName))
        return;
    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }

    projectId = (projectId) ? projectId : global_var.current_project_id;
    if (!projectId) {
        return;
    }
    
    var id = "";
    
    backlogId = (backlogId) ? backlogId : "-1";
    assgineeId = (assgineeId) ? assgineeId : "-1";
    taskStatus = (taskStatus) ? taskStatus : "new";
    json.kv['fkProjectId'] = projectId;
    json.kv['fkBacklogId'] = backlogId;
    json.kv['fkAssigneeId'] = assgineeId;
    json.kv.taskName = taskName;
    json.kv.taskStatus = taskStatus;
    json.kv.sprintList = sprintList;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmInsertNewBacklogTask4Short",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            id = res.kv.id;
            SATask.updateTaskByRes(res);
            SACore.updateBacklogByRes(res);
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
    return id;
}

$(document).on("change", '.bug-filter', function (e) {
    bug_filter.page_no = 1;
    getBugList();
})

$(document).on("click", '.page-item-core-previous', function (e) {
    bug_filter.page_no = parseInt(bug_filter.page_no) - 1;
    getBugList();
})

$(document).on("click", '.page-item-core-next', function (e) {
    bug_filter.page_no = parseInt(bug_filter.page_no) + 1;
    getBugList();
})

$(document).on("click", '.page-item-core', function (e) {
    bug_filter.page_no = $(this).attr("page-no");
    getBugList();
})

function callBugFilterMulti(el) {
    bug_filter.page_no = 1;
    getBugList();
}

//$(document).on("change", '.bug-filter-multi', function (e) {
//    getBugList();
//})

function setBugFilterAssignees() {

    var json = initJSON();
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetUserListByProjects",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            var select = $('#bug_filter_assignee_id');
            var select2 = $('#bug_filter_created_by');
            select.html('');
            select2.html('');
            var obj = res.tbl[0].r;
            for (var id in obj) {
                var o = obj[id];
                var op = $("<option>").val(o.fkUserId).text(o.userName);
                var op2 = $("<option>").val(o.fkUserId).text(o.userName);
                select.append(op);
                select2.append(op2);
            }

            if (global_var.current_user_type === 'S') {
                select.val(global_var.current_ticker_id)
            }

            select.selectpicker('refresh');
            select2.selectpicker('refresh');
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

function getBugFilterProjectList4Sprint() {
    var st = "";

    if (global_var.current_modal === 'loadTaskManagement') {
        st = "-1%IN%";
        st += global_var.current_project_id;
    } else if (global_var.current_modal === 'loadBugChange ') {
        st = "-1";
        var keys = Object.keys(SACore.Project);
        for (var id in keys) {
            var pid = keys[id];
            st += "%IN%" + pid;
        }
    }

    return st;
}

function setBugFilterProject() {
    var select = $('#bug_filter_project_id');
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
}



function setBugFilterMultiValues() {
    $('.bug-filter-multi').each(function () {
        var data_type = $(this).attr('data-type');
        var val = getBugFilterMultiSelect(this)
        bug_filter[data_type] = val;
    })
}

function getBugFilterMultiSelect(el) {
    var id = $(el).val();
    var st = "";
    for (var i = 0; i < id.length; i++) {
        st += "'" + id[i] + "'"
        if (i < id.length - 1) {
            st += ','
        }
    }
    return st;
}

function setBugFilterValues() {
    $('.bug-filter').each(function () {
        var data_type = $(this).attr('data-type');
        bug_filter[data_type] = $(this).val();
    })
}
function setBugFilterLabelValues() {
    var st = ' ';
    $('.bug-task-filter-checkbox-label').each(function () {
        if ($(this).is(":checked")) {
            st += "'" + $(this).val() + "',";
        }
    })
    st = st.substring(0, st.length - 1);
    bug_filter.label_id = st;
}
function setBugFilterSprintValues() {
    var st = ' ';
    $('.bug-task-filter-checkbox-sprint').each(function () {
        if ($(this).is(":checked")) {
            st += "'" + $(this).val() + "',";
        }
    })
    st = st.substring(0, st.length - 1);
    bug_filter.sprint_id = st;
}

$(document).on("click", '.openBugStatus', function (e) {
    openTaskDialog();
})

function openTaskDialog() {
    return;
    global_var.bug_list_popup_is_opened = true;
    $('.updateBugList').css('visibility', 'visible');
    $('.bug-tr').find('.active').first().click();
}

$(document).on("click", '#addBugBtnClose', function (e) {
    getBugList();
    global_var.bug_list_popup_is_opened = false;
    $('.updateBugList').css('visibility', 'hidden');
    // $('#addBuglist').removeClass('col-lg-5');
    // $('#addBuglist').addClass('col-lg-12');           bunlar silinmelidir 20.09.20
})

// bug list active tr
global_var.bug_list_popup_is_opened = false;



//$(document).on("dblclick", '.bug-tr', function (e) {
//    openTaskDialog();
//})

$(document).on("click", '.bug-tr', function (e) {
    $('.bug-tr').removeClass("active");
    $(this).toggleClass("active")
    bugId = $(this).attr("id");

//    if (global_var.bug_list_popup_is_opened) {
//        var taskId = $(this).attr("id");
//        var projectId = $(this).attr("projectId");
//        if (!taskId) {
//            return;
//        }
//        loadTaskInfoToContainer(taskId, projectId);
//        showAssigneeTaskCardIn(taskId, 'updateBugList-taskinfo');
//        $('#task-mgmt-tasktype')
//                .after($('<div class="statusCardStory">')
//                        .append($('<span>').addClass('comment-content-header-history').css('margin-left', '0px').append('Project'))
//                        .append(getProjectList4TaskInfo()))
//
//    }

})

function getProjectList4TaskInfo(currentProjectId) {
    $('#task-card-project-id').remove();
    var select = $('<select>')
            .attr('id', 'task-card-project-id')
            .addClass('form-control')
            .css('width', 'auto')
            .attr('onchange', "updateTask4ShortChange(this, 'fkProjectId')")
            ;
    var keys = Object.keys(SACore.Project);
    for (var id in keys) {
        var pid = keys[id];
        var td = $("<option>")
                .val(pid)
                .text(SACore.Project[pid]);
        if (pid === currentProjectId) {
            td.attr("selected", "selected")
        }
        select.append(td)
    }
    return select;
}



// bug list icon -toggle
function arrowHideShow(el, id) {
    $('#bug_i' + id).toggleClass('fa-angle-right')
    $('#bug_i' + id).toggleClass('fa-angle-down')
    if ($(el).is('.arrow-right')) {
        $('#bug_tr' + id).toggle();
    }
}

//function insertNewTask4Bug(el, taskStatus) {
//    var bugDesc = $(el).parent().find("#bugDescription").val();
//    var backlogId = global_var.task_mgmt_group_by === 'userStoryTab' ? $(el).attr('us-id') : "-1";
//    var assgineeId = global_var.task_mgmt_group_by === 'assignee' ? $(el).attr('us-id') : "-1";
//    this.addNewBug(bugDesc, backlogId, assgineeId, taskStatus);
//}


// _________________________________________________________________
function addNewBug(bugDesc, backlogId, assgineeId, taskStatus) {
    var bugDesc = $('#bugDescription').val();
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
            getBugList();
            $('#bugDescription').val('');

        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}
// _______________________________________________________________  


// ______________________________________________________________



function getBugList() {
    setBugFilterValues();
    setBugFilterMultiValues();
    setBugFilterSprintValues();
    setBugFilterLabelValues();
    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv.fkProjectId = bug_filter.project_id;
    json.kv.fkAssigneeId = bug_filter.assignee_id;
    json.kv.createdBy = bug_filter.created_by;
    json.kv.fkBackogId = bug_filter.backlog_id;
    json.kv.taskStatus = bug_filter.status;
    json.kv.priority = bug_filter.priority;
    json.kv.taskNature = bug_filter.nature;
    json.kv.searchText = bug_filter.search_text;
    json.kv.searchLimit = bug_filter.limit;
    json.kv.pageNo = bug_filter.page_no;
    json.kv.sprintId = bug_filter.sprint_id;
    json.kv.labelId = bug_filter.label_id;
    json.kv.fkTaskId = global_var.current_issue_id;
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
            coreBugList = res;
            setKV4CoreBugList();
            getBugListDetails(res);
            toggleColumns();
            setPagination(res.kv.tableCount, res.kv.limit)
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

function setKV4CoreBugList() {
    try {
        var obj = coreBugList.tbl[0].r;
        for (var i = 0; i < obj.length; i++) {
            var o = obj[i];
            coreBugKV[o.id] = o;
            SATask.AddTask(o);
        }
    } catch (err) {
    }
}

function setPagination(rowcount, limit) {
    var rc = Math.ceil(rowcount / limit);
    var el = $('#pagination_block');
    el.html('');
    el.append($('<li class="page-item page-item-core-previous">')
            .append($('<a class="page-link" href="#" aria-label="Previous">')
                    .append($('<span aria-hidden="true">').append('&laquo;'))
                    .append($('<span class="sr-only">').append('Previous'))))

    for (var i = 1; i <= rc; i++) {

        var li = $('<li>')
                .addClass('page-item num page-item-core')
                .attr('page-no', i)
                .append($('<a  href="#" class="page-link">').append(i));

        if (i === parseInt(bug_filter.page_no)) {
            li.addClass("active");
        }

        el.append(li)


    }

    el.append($('<li class="page-item order-last page-item-core-next">')
            .append($('<a class="page-link" href="#" aria-label="Next">')
                    .append($('<span aria-hidden="true">').append('&raquo;'))
                    .append($('<span class="sr-only">').append('Next'))))

}


function getBugListDetailsHeader() {
    var th = $('<tr>')

            .append($('<th>').append('#'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-task-status')
                    .append('Status'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-task-id').css("width1", '2%').append('Task ID'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-task-name').css("min-width", '250px').append('Description'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-task-nature').append('Task Nature'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-assignee').append('Assignee'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-tasktype').append('Task Type'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-priority').append('Priority'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-story-card').append('Story Card'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-project').append('Project'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-created-by').append('Created By'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-created-date').append('Created Date'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-last-update').append('Last Update'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-estimated-hours').append('Estimated Hour(s)'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-spent-hours').append('Spent Hour(s)'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-estimated-counter').append('Estimated Counter'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-executed-counter').append('Executed Counter'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-estimated-budget').append('Estimated Budget'))
            .append($('<th>').addClass('bug-list-column')
                    .addClass('bug-list-column-spent-budget').append('Spent Budget'))
            .append($('<th>').append(''))




    return th;
}

function getBugListTaskNatureValue(taskNature) {
    var res = '';
    if (taskNature === 'new') {
        res = $('<span>')
                .css("color", "grey")
                .append("New Request");
    } else if (taskNature === 'bug') {
        res = $('<span>')
                .css("color", "red")
                .append("Bug");
    } else if (taskNature === 'change') {
        res = $('<span>')
                .css("color", "#FF7F50")
                .append("Change Request");
    }
    return res;
}

function increaseValue(mainVal, addedVal) {
    var res = mainVal;
    if (!addedVal || addedVal === undefined)
        return res;
    try {
        res = (parseFloat(mainVal) + parseFloat(addedVal));
    } catch (err) {
        res = mainVal;
    }
    res = Math.round(res, 2);
    return res;
}

function getBugListDetails(res) {
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

        var isLabelChecked = (bug_filter.label_id.length > 1);
        var divLabelFilter = $('<div>')
                .append($("<input type='checkbox'>")
                        .addClass("assign-label-to-task-item")
                        .attr("pid", o.id)
                        .attr('projectId', o.fkProjectId)
                        .attr('backlogId', o.fkBacklogId)
                        .attr("checked", isLabelChecked)
                        .attr("sid", global_var.bug_task_label_assign_id))
                .append($('<span>').append(" (" + global_var.bug_task_label_assign_name + ") "));

        var rsLabelFilter = global_var.bug_task_label_assign_checked === 1
                ? divLabelFilter.html()
                : "";

        var ischecked = (bug_filter.sprint_id.length > 1);
        var div = $('<div>')
                .append($("<input type='checkbox'>")
                        .addClass("assign-sprint-to-task-item")
                        .attr("pid", o.id)
                        .attr('projectId', o.fkProjectId)
                        .attr('backlogId', o.fkBacklogId)
                        .attr("checked", ischecked)
                        .attr("sid", global_var.bug_task_sprint_assign_id))
                .append($('<span>').append(" (" + global_var.bug_task_sprint_assign_name + ") "));



        var rs = global_var.bug_task_sprint_assign_checked === 1
                ? div.html()
                : "";

        sumEstHours = increaseValue(sumEstHours, o.estimatedHours);
        sumSpentHours = increaseValue(sumSpentHours, o.spentHours);
        sumEstCount = increaseValue(sumEstCount, o.estimatedCounter);
        sumExecCount = increaseValue(sumExecCount, o.executedCounter);
        sumEstBudget = increaseValue(sumEstBudget, o.estimatedBudget);
        sumSpentBudget = increaseValue(sumSpentBudget, o.spentBudget);

        var row = (i + 1 + (parseInt(bug_filter.page_no) - 1) * (parseInt(bug_filter.limit)));
        row += " " + rs + rsLabelFilter;

        var userImage = o.userImage;
        var img = (userImage)
                ? fileUrl(userImage)
                : fileUrl(new User().getDefaultUserprofileName());

        var createByImage = o.createByImage;
        var createdByImg = (createByImage)
                ? fileUrl(createByImage)
                : fileUrl(new User().getDefaultUserprofileName());

        var backlogName = '<a href1="#" onclick="callStoryCard4BugTask(\'' + o.fkProjectId + '\',\'' + o.fkBacklogId + '\',this)" style="cursor:pointer;color: rgb(0, 0, 255);">' + replaceTags(o.backlogName) + '</a>';
        var taskName = '<a class="issue_'+o.id+'" href1="#" onclick="callTaskCard4BugTask(this,\'' + o.fkProjectId + '\',\'' + o.id + '\')" style="cursor:pointer;color: rgb(0, 0, 255);">' + replaceTags(fnline2Text(o.taskName)) + '</a>';
        var task_id = getTaskCode(o.id);

        var t = $('<tr>')
                .attr("id", o.id)
                .attr("projectId", o.fkProjectId)
                .addClass('bug-tr')
                .append($('<td>').append(row))
                .append($('<td>').addClass('bug-list-column')
                        .addClass('bug-list-column-task-status')
                        .append($('<span>')
                                .addClass('us-item-status-' + o.taskStatus)
                                .append(o.taskStatus)))
                .append($('<td>').addClass('bug-list-column')
                        .addClass('bug-list-column-task-id').append(task_id))
                .append($('<td>')
                        .addClass('bug-list-column')
                        .addClass('bug-list-column-task-name')
                        .css("max-width", '400px')
                        .append(taskName, ' ')

                        )
                .append($('<td>').addClass('bug-list-column')
                        .addClass('bug-list-column-task-nature').append(getBugListTaskNatureValue(o.taskNature)))
                .append($('<td>')
                        .css('white-space', 'nowrap')
                        .addClass('bug-list-column')
                        .addClass('bug-list-column-assignee')
                        .append((o.userName) ? $('<img class="Assigne-card-story-select-img">')
                                .attr('src', img) : "")
                        .append(" ")
                        .append(o.userName)
                        .append($('<i class="fa fa-filter">')
                                .attr('onclick', 'setFilter4IssueMgmtAsAssigne("' + o.fkAssigneeId + '")')
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
                        .addClass('bug-list-column-tasktype').append(replaceTags(o.taskTypeName)))
                .append($('<td>').addClass('bug-list-column')
                        .addClass('bug-list-column-priority').append(replaceTags(o.taskPriority)))
                .append($('<td>').addClass('bug-list-column')
                        .addClass('bug-list-column-story-card')
                        .append(backlogName)
                        .append($('<i class="fa fa-filter">')
                                .attr('onclick', 'setFilter4IssueMgmtAsBacklog("' + o.fkProjectId + '","' + o.fkBacklogId + '")')
                                .css("display", "none")
                                .addClass("hpYuyept"))
                        .mouseover(function () {
                            $(this).find(".hpYuyept").show();
                        })
                        .mouseleave(function () {
                            $(this).find(".hpYuyept").hide();
                        }))
                .append($('<td>').addClass('bug-list-column')
                        .addClass('bug-list-column-project')
                        .text(replaceTags(o.projectName))
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
                        .css('white-space', 'nowrap')
                        .addClass('bug-list-column-created-by')
                        .append((o.createByName) ? $('<img class="Assigne-card-story-select-img">')
                                .attr('src', createdByImg) : "")
                        .append(" ")
                        .append(o.createByName)
                        .append($('<i class="fa fa-filter">')
                                .attr('onclick', 'setFilter4IssueMgmtAsCreatedBy("' + o.createdBy + '")')
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
                        .addClass('bug-list-column-created-date').append(Utility.convertDate(o.createdDate)))
                .append($('<td>').addClass('bug-list-column')
                        .addClass('bug-list-column-last-update').append((o.lastUpdatedDate) ? Utility.convertDate(o.lastUpdatedDate) : ""))
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
                .append($('<td>')
                        .css("width", "1%")
//                        .append($('<i>')
//                                .addClass('fa fa-arrow-right bug-icon viewBtn')
//                                .addClass('openBugStatus'))
                        )

        tbody.append(t);
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

function callTaskCard4BugTask(el, projectId, taskId) {



    if (!taskId) {
//        hideProgressAlternative();
        return;
    }


    global_var.current_issue_id = taskId;
    Utility.addParamToUrl('current_issue_id', global_var.current_issue_id);
    global_var.current_issue_is_hide = "0";
    Utility.addParamToUrl('current_issue_is_hide', global_var.current_issue_is_hide);
    
    
//Task card-da Story Card-linke basanda istifade edilir.
    if (projectId !== global_var.current_project_id) {
        global_var.current_project_id = projectId;
        new UserStory().refreshBacklog4Bug(true);
    }

    getProjectUsers();
//    getUsers();

    $(".card-UserStory-header-text-code").text("");
    $(".card-UserStory-header-text-code").append(getTaskCode(taskId));



    let headerText = $(el).html();
    $(".card-UserStory-header-text").text("");
    $(".card-UserStory-header-text").append(headerText);
    $(".TaskStoryCardPanel").css("display", "block")
    $('.comment-body').html("")
    $('.card-UserStory-edit-task').show();


    loadUsersAsAssignee();
    loadTaskInfoToContainer(taskId, projectId);
    loadTaskCardDetails(taskId);



    //add project list to task
    $('.task-card-project-div-id').remove();
    $('.task-mgmt-tasktype').each(function () {
        $(this).after($('<div class="task-card-project-div-id statusCardStory" id="task-card-project-div-id">')
                .append($('<span>').addClass('comment-content-header-history').css('margin-left', '0px').append('Project'))
                .append(getProjectList4TaskInfo(projectId)))
    })


    //set backlog infos
    if (coreBugKV[taskId].backlogName) {
        $('#taskMgmtModal').find('#task-mgmt-modal-user-story')
                .attr('pid', coreBugKV[taskId].fkBacklogId)
                .html(coreBugKV[taskId].backlogName);
    }


//    showAssigneeTaskCardIn(taskId, 'updateBugList-taskinfo');

//    hideProgressAlternative();


}


function getProjectIdOfBacklog(backlogId) {
    if (!backlogId) {
        return;
    }
    var rs = "";
    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv.fkBacklogId = backlogId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetProjectIdOfBacklog",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            rs = res.kv.fkProjectId;
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
    return rs;
}

function getBacklogDetailsById(backlogId) {
    if (!backlogId) {
        return;
    }
    var rs = "";
    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv.fkBacklogId = backlogId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetBacklogDetailsById",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            rs = res.kv;
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
    return rs;
}


function callStoryCard4BugTask(projectIdOld, backlogId, el, containDiv) {

//    showProgressAlternative();

//    var divId = (containDiv)? containDiv :"body_of_nature";

    var divId = '#storyCardViewManualModal-body';
    $('#storyCardViewManualModal').modal('show');

    $.get("resource/child/storycard.html", function (html_string)
    {
        if (!backlogId || backlogId === '-1') {
            return;
        }

        global_var.current_backlog_id = backlogId;

        $(divId).html(html_string); // this is not Working
        var storyCard = html_string;
        $(divId).html(storyCard);


        var backlogName = $(el).html();
        $('#generalview-us-header-name').text(backlogName);


        var projectId = getProjectIdOfBacklog(backlogId);
        if (projectId !== global_var.current_project_id || SACore.GetBacklogKeyList().length === 0) {
            global_var.current_project_id = projectId;
            new UserStory().refreshBacklog4Bug();
        }

        new UserStory().toggleSubmenuStoryCard();
        loadUsersAsOwner();
        setStoryCardOwner();

//        hideProgressAlternative();

    });
}

function getBugListDetailsSumLine(tbody, sumEstHours, sumSpentHours, sumEstCount, sumExecCount,
        sumEstBudget, sumSpentBudget) {


    var t = $('<tr>')
            .append($('<td>').append(''))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-task-status'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-task-name'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-task-nature'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-assignee'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-tasktype'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-story-card'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-project'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-created-by'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-created-date'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-last-update'))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-estimated-hours')
                    .append($('<h6>').append(sumEstHours)))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-spent-hours')
                    .append($('<h6>')
                            .append(sumSpentHours)))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-estimated-counter')
                    .append($('<h6>').append(sumEstCount)))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-executed-counter')
                    .append($('<h6>').append(sumExecCount)))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-estimated-budget')
                    .append($('<h6>').append(sumEstBudget)))
            .append($('<td>').addClass('bug-list-column')
                    .addClass('bug-list-column-spent-budget')
                    .append($('<h6>').append(sumSpentBudget)))
            .append($('<td>').append($('<h6>').append('')))

    tbody.append(t);
}


$(document).on("change", '#bug_filter_project_id', function (e) {
    var id = getProjectListIn();
    loadStoryCardByProject(id);
    loadAssigneesByProject(id);
//    $('#bug_filter_backlog_id').selectpicker();
//    $('#bug_filter_assignee_id').selectpicker();

})

function toggleColumns() {
    $('.bug-list-column').hide();
    var colList = $('#bug_filter_columns').val();
    for (var col in colList) {
        $('.bug-list-column-' + colList[col]).show();
    }
}

function getProjectListIn() {
    var id = $('#bug_filter_project_id').val();
    var st = id;
//    for (var i in id) {
//        st += id[i] + "%IN%"
//    }
    return st;
}

function loadAssigneesByProject(projectId) {


    var json = initJSON();
    json.kv.fkProjectId = projectId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmLoadAssigneeByProject",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            loadAssigneesByProjectDetails(res);
            $('#bug_filter_created_by').selectpicker('refresh');
            $('#bug_filter_assignee_id').selectpicker('refresh');
            $('#testcase_createdbyfilter').selectpicker('refresh');
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}


function loadAssigneesByProjectDetails(res) {
    $('#bug_filter_assignee_id').html('');
    $('#bug_filter_created_by').html('');
    $('#testcase_createdbyfilter').html('');

    var obj = res.tbl[0].r;
    for (var i in obj) {
        var o = obj[i];
        var opt = $('<option>').val(o.fkUserId).text(o.userName);
        var opt2 = $('<option>').val(o.fkUserId).text(o.userName);
        var opt3 = $('<option>').val(o.fkUserId).text(o.userName);
        $('#bug_filter_assignee_id').append(opt);
        $('#bug_filter_created_by').append(opt2);
        $('#testcase_createdbyfilter').append(opt3);

    }


}

function loadStoryCardByProject(projectId) {
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
            loadStoryCardByProjectDetails(res);
            $('#bug_filter_backlog_id').selectpicker('refresh');
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

function loadStoryCardByProjectDetails(res) {
    try {
        var el = $('#bug_filter_backlog_id');
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
    $('#bug_filter_backlog_id').selectpicker('refresh');
}



$(document).on('click', function (e) {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 100) {
            $(".addBugModalListUpdate").addClass("sticky2");
        } else {
            $(".addBugModalListUpdate").removeClass("sticky2")
        }
    })
})
