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
    showChildTask: '1',
}

var sprintTaskIds = "";
var labelTaskIds = "";
var bugId = "";

var coreBugList = {};
var coreBugKV = {};

function getSprintNamesByTask() {
    var select = $('.task-mgmt-modal-sprintname');
    select.html('');

    var json = initJSON();
    json.kv.fkBacklogTaskId = global_var.current_us_task_id;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetSprintNamesByTask",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var obj = res.tbl[0].r;
            for (var i in obj) {
                var o = obj[i];
                var d = ((o.sprintStartDate) && (o.sprintEndDate)) ?
                    " (" + Utility.convertDate(o.sprintStartDate) + "-" + Utility.convertDate(o.sprintEndDate) + ")" :
                    "";

                var st = $('<span>')
                    .text(o.sprintName)
                    .append(d)
                    .append("<br>")
                    .attr("class", "lbl-item")
                    .css("font-size", "12px")
                    .attr("style", "font-size:12px;color:" + o.sprintColor)

                select.append(st);
            }

            //            new Label().load4Task()
        }
    });
}
var cl = 3232;

function sortTable(sv, cls) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("bugListTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[sv];
            y = rows[i + 1].getElementsByTagName("TD")[sv];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    var trList = $(table).find(".bug-tr");

    var fTr
    for (let index = 0; index < trList.length; index++) {
        $(trList[index]).find("td:first-child").html(index + 1)
        var tbl = "id-row" + cl
        fTr = $(trList[0]);
        if (index === 0) {
            var tx = fTr.find("." + cls).find(".get-data-group").html();

            if (tx.length < 1) {
                tx = "undefined"
            }

            fTr.before($("<tr>")
                .addClass("groupTrElement")
                .append($("<td>")
                    .addClass("groupTdElement")
                    .append($("<div>")
                        .append('<span data-closed="0" data-aidli=' + tbl + ' class="bugChangegroupArrow"><i class="fas fa-chevron-down"></i></span>')
                        .append(tx)
                        .addClass("groupTableDivInside"))))
        }

        var htm = $(trList[index]).find("." + cls).find(".get-data-group").html();
        var htm1 = $(trList[index + 1]).find("." + cls).find(".get-data-group").html();


        if (htm === htm1) {
            $(trList[index]).attr("data-aid", tbl)

        } else {
            $(trList[index]).attr("data-aid", tbl);
            cl++
            tbl = "id-row" + cl;
            if (htm1 ==='') {
                htm1 = "undefined"
            }
            if(index === trList.length){
                console.log(index);
                $(trList[index]).attr("data-aid", tbl);
            }
            $(trList[index]).after($("<tr>")
                .addClass("groupTrElement")
                .append($("<td>")
                    .addClass("groupTdElement")

                    .append($("<div>")
                        .append('<span data-closed="0" data-aidli=' + tbl + ' class="bugChangegroupArrow"><i class="fas fa-chevron-down"></i></span>')
                        .append(htm1)
                        .addClass("groupTableDivInside"))));

        }
        


    }



}
$(document).on("change", "#inputGroupSelect01", function (e) {

    getBugList();

})


function getGroupList() {
   try {
        
    var sv = $("#inputGroupSelect01").val();

    var td = $("#bugListTable tbody tr td:eq(" + sv + ")").attr("class").split(/\s+/);


    $.each(td, function (index, item) {
        if (item === 'bug-list-column') {

        } else {

            sortTable(sv, item);
        }
    })
   } catch (error) {
       
   }
  
}

$(document).on('click', '.bugChangegroupArrow', function (evt) {
    var dt = $(this).attr("data-closed");
    var dst = $(this).attr("data-aidli");
    if (dt == 1) {


        $(this).html('<i class="fas fa-chevron-down"></i>');
        $(this).attr("data-closed", 0);
    }
    if (dt == 0) {

        $(this).html('<i class="fas fa-chevron-right"></i>');
        $(this).attr("data-closed", 1);
    }
    $("[data-aid=" + dst + "]").toggle("fast");
})
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

function lableAddAssign(elm) {
    var check = $("#bugListTable .bug-tr .checkbox-issue-task");
 
    var labelId = $(elm).attr("id");
for (var indx = 0; indx < check.length; indx++) {
    
    
    if($(check[indx]).prop('checked')){
       
        var projectId = $(check[indx]).parents("tr").attr('projectid');
        var backlogId = $(check[indx]).parents("tr").attr('stIdr')?'-1':"";
        var id = $(check[indx]).parents("tr").attr("id");
   
        
           var  checked = '1';
        
    
        var json = {
            kv: {}
        };
        try {
            json.kv.cookie = getToken();
        } catch (err) {}
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

    }

}

    
};


 function sprintAddAssign(elm) {
  



    var check = $("#bugListTable .bug-tr .checkbox-issue-task");
    var sprintId = $(elm).attr("id");
    
for (var indx = 0; indx < check.length; indx++) {
    
    
    if($(check[indx]).prop('checked')){
       
        var projectId = $(check[indx]).parents("tr").attr('projectid');
        var backlogId =$(check[indx]).parents("tr").attr('stIdr')?'-1':"";;
        var id = $(check[indx]).parents("tr").attr("id");

        var checked = '1';
        
        sprintZadininSheyeidlmesi(id, projectId, backlogId, sprintId, checked);
        
    }

}


};

function sprintZadininSheyeidlmesi(id, projectId, backlogId, sprintId, checked) {
    var json = initJSON();
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
        }
    });
}

function deleteBugFromTable(el) {
    if (!bugId) {
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
    var projectList = $('#bug_filter_project_id_add').val();
    if (projectList.length === 0) {
        Toaster.showError("Please select project(s).")
        return;
    }

    var backlogList = $('#bug_filter_backlog_id_add').val()
    /*    : ['-1']; */
    var assigneeList = $('#bug_filter_assignee_id_add').val()
 
    var sprintList = "";
    $('.bug-task-filter-checkbox-sprint').each(function () {
        if ($(this).is(":checked")) {
            sprintList += $(this).val() + ',';
        }
    })

    var taskTypeName = $("#bug_task_type_id_add").val();

    var taskNature = $("#bug_task_nature_id_add").val();

    var taskPriority = $("#bug_filter_priority_add").val();


    /*   for (var bid in backlogList) {
          for (var aid in assigneeList) { */
    insertNewTaskDetail4Bug(taskName, backlogList, assigneeList, 'new', projectList, sprintList, taskTypeName, taskNature, taskPriority)
    /*    }
    }
 */

    $(el).val('');
    getBugList();
}

function addNewTask4BugInput(el) {
    if (!$(el).val().trim()) {
        return;
    }

    var tskNature = $("#bug_add_nature").val();
    var taskName = $(el).val().trim();
    var projectList = $('#bug_filter_project_id').val();
    if (projectList.length === 0) {
        Toaster.showError("Please select project(s).")
        return;
    }

    var backlogList = ($('#bug_filter_backlog_id').val().length > 0) ?
        $('#bug_filter_backlog_id').val() : ['-1'];
    var assigneeList = ($('#bug_filter_assignee_id').val().length > 0) ?
        $('#bug_filter_assignee_id').val() : ['-1'];
    var sprintList = "";
    $('.bug-task-filter-checkbox-sprint').each(function () {
        if ($(this).is(":checked")) {
            sprintList += $(this).val() + ',';
        }
    })


    for (var bid in backlogList) {
        for (var aid in assigneeList) {
            insertNewTaskDetail4Bug(taskName, backlogList[bid], assigneeList[aid], 'new', projectList, sprintList, "", tskNature, "")
        }
    }


    $(el).val('');
    getBugList();
}

function insertNewTaskDetail4Bug(taskName, backlogId, assgineeId, taskStatus, projectId, sprintList, taskTypeName, taskNature, taskPriority) {
    if (!(taskName))
        return;
    var json = {
        kv: {}
    };
    try {
        json.kv.cookie = getToken();
    } catch (err) {}

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
    json.kv.taskNature = taskNature;
    json.kv.fkTaskTypeId = taskTypeName;
    json.kv.taskPriority = taskPriority;
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
            var select3 = $('#bug_filter_assignee_id_add');
            var select4 = $('#bug_filter_assignee_id_multi');
            select.html('');
            select2.html('');
            var obj = res.tbl[0].r;
            for (var id in obj) {
                var o = obj[id];
                var op = $("<option>").val(o.fkUserId).text(o.userName);
                var op2 = $("<option>").val(o.fkUserId).text(o.userName);
                var op3 = $("<option>").val(o.fkUserId).text(o.userName);
                var op4 = $("<option>").val(o.fkUserId).text(o.userName);
                select.append(op);
                select2.append(op2);
                select3.append(op3);
                select4.append(op4);
            }

            if (global_var.current_user_type === 'S') {
                select.val(global_var.current_ticker_id)
            }

            select.selectpicker('refresh');
            select2.selectpicker('refresh');
            select3.selectpicker('refresh');
            select4.selectpicker('refresh');
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

function setBugFilterProjectAdd(elId) {
    var select = $("#"+elId);
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

    $('#'+elId).selectpicker('refresh');
}

function addUserStoryNewPopupBug() {
    var usName = $('#addUserStoryPopupModal-userstoryname1').val();
    var prid = $('#bug_filter_project_id_add_pop').val();

     if(!prid){
        Toaster.showError("Please Choose Project")
        return
     }
    if (!usName)
        return;

    var json = initJSON();
    json.kv['backlogName'] = usName;
    json.kv['fkProjectId'] =prid ;
    json.kv['isApi'] = "0";
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmInsertNewBacklogShort",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            SACore.addBacklogByRes(res);
            SACore.SetBacklogNo(res.kv.backlogNo, res.kv.id);
            loadCurrentBacklogProdDetails();

            global_var.current_backlog_id = res.kv.id;
            Utility.addParamToUrl('current_backlog_id', global_var.current_backlog_id);
            $('#bug_filter_project_id').change();
            // $('.projectList_activity').change();
            $('#addUserStoryPopupModal-userstoryname').val('');
            $('#addUserStoryPopupModalwithProject').modal('hide');
           
            if (global_var.current_modal === 'loadStoryCard') {
                $('.projectList_liveprototype_storycard').change();
            }

            $("#bug_filter_backlog_id").val(res.kv.id)
            $("#bug_filter_backlog_id").change()
        }
    });
}

function addUserStoryNewModalWithProject() {
    var select = $('#bug_filter_project_id_add_pop');
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


    $('#bug_filter_project_id_add_pop').selectpicker('refresh');
    $('#addUserStoryPopupModalwithProject').modal('show');
    $('#addUserStoryPopupModal-userstoryname').focus();
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

function getBugFilterMultiSelectById(elementId) {
    return getBugFilterMultiSelect(document.getElementById(elementId));
}

function setBugFilterValues() {
    $('.bug-filter').each(function () {
        var data_type = $(this).attr('data-type');
        bug_filter[data_type] = $(this).val();
    })
}

function setBugFilterCheckBoxValues() {
    $('.bug-filter-checkbox').each(function () {
        var data_type = $(this).attr('data-type');
        bug_filter[data_type] = $(this).is(":checked") ? "1" : "0";
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
$(document).on("click", '#addNewTaskButton', function (e) {
    setBugFilterProjectAdd('bug_filter_project_id_add');
    var dwlmt = $('#bug_task_type_id_add')
    add_loadTaskType_bug_list(dwlmt)
})
$(document).on("click", '#update_multi_bug_change_btn', function (e) {

   var fkAssigneeId = $("#bug_filter_assignee_id_multi").val();
   var fkTaskTypeId = $("#bug_task_type_id_multi").val();
   var fkBacklogId = $("#bug_filter_backlog_id_multi").val();
   var taskPriority = $("#bug_filter_priority_add").val();
   var taskNature = $("#bug_task_nature_id_multi").val();

   var check = $("#bugListTable .bug-tr .checkbox-issue-task");
  
    if(!fkAssigneeId == 0){

        for (var indx = 0; indx < check.length; indx++) {
    
    
            if($(check[indx]).prop('checked')){
        
                var taskId = $(check[indx]).parents("tr").attr("id");
                   
                multiUpdateTask4ShortChangePure(fkAssigneeId, "fkAssigneeId", taskId);
                
            }
        
        }
    }
    if(!fkTaskTypeId == 0){

        for (var indx = 0; indx < check.length; indx++) {
    
    
            if($(check[indx]).prop('checked')){
        
                var taskId = $(check[indx]).parents("tr").attr("id");
                   
                multiUpdateTask4ShortChangePure(fkTaskTypeId, "fkTaskTypeId", taskId);
                
            }
        
        }
    }
    if(!fkBacklogId == 0){

        for (var indx = 0; indx < check.length; indx++) {
    
    
            if($(check[indx]).prop('checked')){
        
                var taskId = $(check[indx]).parents("tr").attr("id");
                   
                multiUpdateTask4ShortChangePure(fkBacklogId, "fkBacklogId", taskId);
                
            }
        
        }
    }
    if(!taskPriority == 0){

        for (var indx = 0; indx < check.length; indx++) {
    
    
            if($(check[indx]).prop('checked')){
        
                var taskId = $(check[indx]).parents("tr").attr("id");
                   
                multiUpdateTask4ShortChangePure(taskPriority, "taskPriority", taskId);
                
            }
        
        }
    }
    if(!taskNature == 0){

        for (var indx = 0; indx < check.length; indx++) {
    
    
            if($(check[indx]).prop('checked')){
        
                var taskId = $(check[indx]).parents("tr").attr("id");
                   
                multiUpdateTask4ShortChangePure(taskNature, "taskNature", taskId);
                
            }
        
        }
    }
    

    $("#multieditpopUp").modal("hide");

})


function multiUpdateTask4ShortChangePure(val, ustype, taskId) {
 

    try {

        if (ustype.lentgh === 0 || val.lentgh === 0 || taskId === 0) {
            return;
        }
    } catch (e) {
        return;



    } 


    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv.id = taskId;
    json.kv.type = ustype;
    json.kv.value = val;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmUpdateTask4ShortChange",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            SATask.addTaskByRes(res);
            SACore.updateBacklogByRes(res);
      
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

$(document).on("click", '#multi-edit-menu-btn', function (e) {
    setBugFilterProjectAdd('bug_filter_project_id_multi');
    var dwlmt = $('#bug_task_type_id_multi')
    add_loadTaskType_bug_list(dwlmt)
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
        .attr('onchange', "updateTask4ShortChange(this, 'fkProjectId')");
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
    setBugFilterCheckBoxValues();
    setBugFilterValues();
    setBugFilterMultiValues();
    setBugFilterSprintValues();
    setBugFilterLabelValues();
    var json = {
        kv: {}
    };
    try {
        json.kv.cookie = getToken();
    } catch (err) {}
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
    json.kv.showChildTask = bug_filter.showChildTask;
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
            setPagination(res.kv.tableCount, res.kv.limit);
            getGroupList();

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
    } catch (err) {}
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

        .append($('<th>').append('# <input type="checkbox" class="all-bug-list-check">'))
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
            .addClass('bug-list-column-story-card').append('Story Card').append("<button style='color:lightgreen;' onclick='addUserStoryNewModalWithProject()' class='btn btn-sm'><i class='fas fa-plus-circle'></i></button>"))
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

var TableIDvalue = "bugListTable";
var TableLastSortedColumn = -1;



function CompareRowOfText(a, b) {
    var aval = a.value;
    var bval = b.value;
    return (aval == bval ? 0 : (aval > bval ? 1 : -1));
}


function getBugListTaskNatureValue(taskNature) {
    var res = '';
    if (taskNature === 'new') {
        res = $('<span>').addClass("get-data-group")
            .css("color", "grey")
            .append("New Request");
    } else if (taskNature === 'bug') {
        res = $('<span>').addClass("get-data-group")
            .css("color", "red")
            .append("Bug");
    } else if (taskNature === 'change') {
        res = $('<span>').addClass("get-data-group")
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

        /* var rsLabelFilter = global_var.bug_task_label_assign_checked === 1 *//*  ?
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



        var rs = global_var.bug_task_sprint_assign_checked === 1 /* ?
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
            fileUrl(new User().getDefaultUserprofileName());

        var backlogName = '<a href1="#" onclick="callStoryCard4BugTask(\'' + o.fkProjectId + '\',\'' + o.fkBacklogId + '\',this)">' + replaceTags(o.backlogName) + '</a>';
        var taskName = '<a class="issue_' + o.id + '" href1="#" onclick="callTaskCard4BugTask(this,\'' + o.fkProjectId + '\',\'' + o.id + '\')" >' + replaceTags(fnline2Text(o.taskName)) + '</a>';
        var task_id = getTaskCode(o.id);

        var t = $('<tr>')
            .attr("id", o.id)
            .attr("projectId", o.fkProjectId)
            .attr("stIdr", o.fkBacklogId)
            .addClass('bug-tr')
            .append($('<td>').attr("style","min-width:50px;padding:5px;").append(row+'<input class="checkbox-issue-task" type="checkbox">'))
            .append($('<td>').addClass('bug-list-column')
                .addClass('bug-list-column-task-status')
                .append($("<div>")
                    .addClass("dropdown")
                    .append($("<div>")
                        .addClass('dropdown-toggle cst-dropwdown-toggle-bug')
                        .attr("data-toggle", "dropdown")
                        .attr("aria-haspopup", "true")
                        .attr("aria-expanded", "false")
                        .attr("id", "bug-status-dropdown")
                        .append($('<span>')
                            .addClass('us-item-status-' + o.taskStatus)
                            .append(o.taskStatus)))

                    .append($("<div>")
                        .addClass("dropdown-menu")
                        .attr("aria-labelledby", "bug-status-dropdown")

                        .append('<a class="dropdown-item" data-value ="new">New</a>')
                        .append('<a class="dropdown-item" data-value ="ongoing">Ongoing</a>')
                        .append('<a class="dropdown-item" data-value ="closed">closed</a>')
                        .append('<a class="dropdown-item" data-value ="waiting">waiting</a>')
                        .append('<a class="dropdown-item" data-value ="Canceled">Canceled</a>')
                        .append('<a class="dropdown-item" data-value ="UAT">UAT</a>')

                    )))
            .append($('<td>').addClass('bug-list-column')
                .addClass('bug-list-column-task-id').append(task_id))
            .append($('<td>')
                .addClass('bug-list-column')
                .addClass('bug-list-column-task-name')
                .css("max-width", '400px')
                .append(taskName, ' ')
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
            .append($('<td>')
                .css('white-space', 'nowrap')
                .addClass('bug-list-column')
                .addClass('bug-list-column-assignee')
                .append($("<div>")
                    .addClass("dropdown")
                    .append($("<div>")
                        .addClass('dropdown-toggle cst-dropwdown-toggle-bug get-data-group')
                        .attr("data-toggle", "dropdown")
                        .attr("aria-haspopup", "true")
                        .attr("aria-expanded", "false")
                        .attr("id", "bug-listassigne-dropdown")
                        .append((o.userName) ? $('<img class="Assigne-card-story-select-img">')
                            .attr('src', img) : "<img class='Assigne-card-story-select-img' src='https://app.sourcedagile.com/api/get/files/userprofile.png'> Unassigned")
                        .append(o.userName))

                    .append($("<div>")
                        .addClass("dropdown-menu")
                        .attr("aria-labelledby", "bug-listassigne-dropdown")
                        .append("")))
                .append(" ")

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
                .addClass('bug-list-column-tasktype')
                .append($("<div>")
                    .addClass("dropdown")
                    .append($("<div>")
                        .addClass('dropdown-toggle cst-dropwdown-toggle-bug get-data-group')

                        .attr("data-toggle", "dropdown")
                        .attr("aria-haspopup", "true")
                        .attr("aria-expanded", "false")
                        .attr("id", "bug-tasktype-dropdown")
                        .append((replaceTags(o.taskTypeName)? "<span style ='visibility:hidden;'>fddfhdh</span>":"<span style ='visibility:hidden;'>fddfhdh</span>")))

                    .append($("<div>")
                        .addClass("dropdown-menu")
                        .attr("aria-labelledby", "bug-tasktype-dropdown")

                        /* .append('<a class="dropdown-item" data-value ="New">New</a>')
                        .append('<a class="dropdown-item" data-value ="ongoing">Ongoing</a>')
                        .append('<a class="dropdown-item" data-value ="closed">closed</a>')
                        .append('<a class="dropdown-item" data-value ="waiting">waiting</a>')
                        .append('<a class="dropdown-item" data-value ="Canceled">Canceled</a>')
                        .append('<a class="dropdown-item" data-value ="UAT">UAT</a>') */

                    )))
            .append($('<td>').addClass('bug-list-column')
                .addClass('bug-list-column-priority get-data-group').append(replaceTags(o.taskPriority)))
            .append($('<td>').addClass('bug-list-column')
                .addClass('bug-list-column-story-card')
                .append("<span class='get-data-group'>" + backlogName + "</span>")
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
                })
            )
            .append($('<td>').addClass('bug-list-column')
                .css('white-space', 'nowrap')
                .addClass('bug-list-column-created-by ')
                .append($("<div>").addClass("get-data-group")
                    .append((o.createByName) ? $('<img class="Assigne-card-story-select-img">')
                        .attr('src', createdByImg) : "")
                    .append(" ")
                    .append(o.createByName))

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
                .addClass('bug-list-column-created-date').append("<span class='get-data-group'>" + Utility.convertDate(o.createdDate) + "</span>"))
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
    var json = {
        kv: {}
    };
    try {
        json.kv.cookie = getToken();
    } catch (err) {}
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
    var json = {
        kv: {}
    };
    try {
        json.kv.cookie = getToken();
    } catch (err) {}
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

    $.get("resource/child/storycard.html", function (html_string) {
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
         setStoryCardCreatedBy();

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


$(document).on("click", '.all-bug-list-check', function (e) {
   
    var chck = $(".checkbox-issue-task");
    if ($(this).is(':checked')) {
        $('#multi-edit-menu-btn').css('display','initial');
        chck.prop('checked', true);
        } else {
          
           $('#multi-edit-menu-btn').css('display','none');
           chck.prop('checked', false);
        }

})
$(document).on("click", '.checkbox-issue-task', function (e) {
   
     
      var check = $("#bugListTable .bug-tr .checkbox-issue-task");

   var ast =[];
var pids=[];
for (var indx = 0; indx < check.length; indx++) {
    
    
    if($(check[indx]).prop('checked')){
  
    ast.push($(check[indx]).prop('checked'));
    pids.push($(check[indx]).attr('onclick_trigger_id'));

    }

}



   if(ast.length===check.length){
        $(".all-bug-list-check").prop('checked', true);
    }else{

     $(".all-bug-list-check").prop('checked', false);

    }
   if(ast.length>1){
         $('#multi-edit-menu-btn').css('display','initial');
    }else{

      $('#multi-edit-menu-btn').css('display','none');

    }

  

})
$(document).on("change", '#bug_filter_project_id', function (e) {
    var id = getProjectListIn();
    loadStoryCardByProject(id);
    loadAssigneesByProject(id);
    //    $('#bug_filter_backlog_id').selectpicker();
    //    $('#bug_filter_assignee_id').selectpicker();

})
$(document).on("change", '#bug_filter_project_id_add_pop', function (e) {
    var id = $(this).val();
    $('#bug_filter_project_id').val(id);
    $('#bug_filter_project_id').change();
    loadStoryCardByProjectAdd(id)


})
$(document).on("change", '#bug_filter_project_id_add', function (e) {
    var id = $(this).val();
    $('#bug_filter_project_id').val(id);
    $('#bug_filter_project_id').change();
    loadStoryCardByProjectAdd(id);


})
$(document).on("click", '#collapse-group', function (e) {
     var $this = $(".bugChangegroupArrow");
     console.log($this);

     for (let index = 0; index < $this.length; index++) {
        var dt = $this[index].attr("data-closed");
        var dt = $($this[index]).attr("data-closed");

        if (dt == 1) {
            $($this[index]).click();
        
        }
     
     
         
     }
   
  

})
$(document).on("click", '#expand-group', function (e) {
    var $this = $(".bugChangegroupArrow")
       
    for (let index = 0; index < $this.length; index++) {
       var dt = $($this[index]).attr("data-closed");

       if (dt == 0) {
           $($this[index]).click();
       
       }
    
        
    }
})
$(document).on("click", '#addIssueButtonId', function (e) {
    var elem = $("#taskNameInputNew2")
    addNewTask4Bug(elem)
    $("#issue-managment-add-task").modal('hide');


})


$(document).on("click", '#bug-listassigne-dropdown', function (e) {

    var id = $(this).parents('tr').attr("projectid")
    var el = $(this).parents(".dropdown").find(".dropdown-menu ");
    el.empty()
    loadAssigneesByProjectDrop(id, el);



})
$(document).on("click", '.bug-list-column-task-status a', function (e) {

    var val = $(this).attr("data-value");
    var id = $(this).parents('tr').attr("id");

    updateTask4ShortChangePure(val, "taskStatus", id);



})
$(document).on("click", '.bug-list-column-assignee a', function (e) {

    var val = $(this).attr("assigne-id");
    var id = $(this).parents('tr').attr("id");

    updateTask4ShortChangePure(val, "fkAssigneeId", id);



})
$(document).on("click", '.bug-list-column-task-nature a', function (e) {

    var val = $(this).attr("data-value");
    var id = $(this).parents('tr').attr("id");

    updateTask4ShortChangePure(val, "taskNature", id);



})
$(document).on("click", '#bug-tasktype-dropdown', function (e) {


    var elm = $(this).parent().find('.dropdown-menu');
    console.log(elm)
    addUserStoryToTask_loadTaskType_bug_list(elm);


})
$(document).on("click", '.bug-list-column-tasktype a', function (e) {

    var val = $(this).attr("data-value");
    var id = $(this).parents('tr').attr("id");

    updateTask4ShortChangePure(val, "fkTaskTypeId", id);

    

})

function addUserStoryToTask_loadTaskType_bug_list(elm) {
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
                var opt = $('<a>').addClass("dropdown-item").attr("data-value", ids).text(nm);

                $(elm).append(opt);
            }
        }
    });
}

function add_loadTaskType_bug_list(elm) {
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

function loadAssigneesByProjectDrop(projectId, el) {


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
            var obj = res.tbl[0].r;

            for (var i in obj) {
                var o = obj[i];
                var opt = $('<a>').addClass("dropdown-item").attr("assigne-id", o.fkUserId).text(o.userName);
                $(el).append(opt);




            }
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
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
            $('#bug_filter_assignee_id_add').selectpicker('refresh');
            $('#bug_filter_assignee_id_multi').selectpicker('refresh');
            $('#testcase_createdbyfilter').selectpicker('refresh');
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}


function loadAssigneesByProjectDetails(res) {
    $('#bug_filter_assignee_id').html('');
    $('#bug_filter_assignee_id_add').html('');
    $('#bug_filter_assignee_id_multi').html('');
    $('#bug_filter_created_by').html('');
    $('#testcase_createdbyfilter').html('');

    var obj = res.tbl[0].r;
    for (var i in obj) {
        var o = obj[i];
        var opt = $('<option>').val(o.fkUserId).text(o.userName);
        var opt2 = $('<option>').val(o.fkUserId).text(o.userName);
        var opt3 = $('<option>').val(o.fkUserId).text(o.userName);
        var opt4 = $('<option>').val(o.fkUserId).text(o.userName);
        var opt5 = $('<option>').val(o.fkUserId).text(o.userName);
        $('#bug_filter_assignee_id').append(opt);
        $('#bug_filter_assignee_id_add').append(opt4);
        $('#bug_filter_assignee_id_multi').append(opt5);
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

function loadStoryCardByProjectAdd(projectId) {
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
            loadStoryCardByProjectDetailsAdd(res);
            $('#bug_filter_backlog_id_add').selectpicker('refresh');
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
    $('#bug_filter_backlog_id_add').selectpicker('refresh');
}

function loadStoryCardByProjectDetailsAdd(res) {
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
