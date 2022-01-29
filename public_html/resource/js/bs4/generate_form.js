/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const create_form_js_body = (button_id, api_id) => {
    return `$('#comp_id_${button_id}').click(function () {
                var data = getDataFromForm(this);
                var formId = getFormId(this);
                var that = this;
                callApi('${api_id}', data, true, function (res) {
                    $(that).closest('.redirectClass').find('[sa-close-button]').click();
                    $('[sa-loader-button]').click();
                })
            })`;
}

const update_form_js_body = (update_button_id, load_button_id, info_api_id, update_api_id) => {
    return `$('#comp_id_${load_button_id}').click(function () {
        var formId = getFormId(this);
        var id1 =  $(this).closest('.redirectClass').find('[sa-onloadclick-id]').val();
        callApi('${info_api_id}', { id: id1 }, true, function (res) {
             setDataToForm(formId, res.kv);
        })
    })
    
    $('#comp_id_${update_button_id}').click(function () {
        var formId = getFormId(this);
        var id1 =  $(this).closest('.redirectClass').find('[sa-onloadclick-id]').val();
        var data = getDataFromForm(this);
        data.id = id1;
        var that  = this;
        callApi('${update_api_id}', data, true, function (res) {
            $(that).closest('.redirectClass').find('[sa-close-button]').click();
            $('[sa-loader-button]').click();
        })
    })
    `;
}


const view_form_js_body = (load_button_id, info_api_id) => {
    return `$('#comp_id_${load_button_id}').click(function () {
        var formId = getFormId(this);
        var id1 = $(this).closest('.redirectClass').find('[sa-onloadclick-id]').val();
        callApi('${info_api_id}', { id: id1 }, true, function (res) {
             setDataToForm(formId, res.kv);
        })
    })

  
    
 
    `;
}

const list_form_js_body = (  delete_table_api, new_form_id,
    update_form_id, view_form_id, load_table_api, input_table_id, tbody_script) => {
        let new_button_id =table_new_button_id;
        let loader_button_id = table_loader_button_id; 
    return ` 
 

$('#comp_id_${new_button_id}').click(function () {
      showForm('${new_form_id}');
})

function deleteRow(el) {
    if (!confirm("Məlumatın silinməsindən əminsiz?")) {
        return;
    }
    var data = getDataFromTable(el); 
    callApi('${delete_table_api}', data, true, function (res) {
        $(el).closest('tr').remove();
    })
}

 function viewRow (el) {
    var data = getDataFromTable(el);
    var form_id = showForm('${view_form_id}');
    setDataToForm(form_id, data);
    $('#'+form_id).find('[sa-loader-button]').click();
}


 

function updateRow(el) {
    var data = getDataFromTable(el);
    var form_id = showForm('${update_form_id}');
    setDataToForm(form_id, data);
    $('#'+form_id).find('[sa-loader-button]').click();
}




$('#comp_id_${loader_button_id}').click(function () {
    var data = getDataFromForm(this);
    callApi('${load_table_api}', data, true, function (res) {
        var tbody = $('table#comp_id_${input_table_id}').find('tbody');
        tbody.html('');
        var idx = 1;
        var obj = res.tbl[0].r;
       
        for (var i = 0; i < obj.length; i++) {
            var o = obj[i];
            tbody.append(\`
                ${tbody_script}
                                                
                        \`)
        }
    })
});

 
    `;
}



let show_generate_crud_api_table_name = "";
$(document).on("click", ".Field_ShowFormGenerator", function (e) {
    show_generate_crud_api_table_id = $(this).closest('td.tdSeqment').attr('pid');
    show_generate_crud_api_table_name =
        $('#fieldFormGeneratorModal').modal("show");
    var tableId = $(this).closest('td.tdSeqment').attr("pid");
    $('#fieldFormGeneratorModal_id').val(tableId);
    load_project_list_for_form_generation();
    var entityName = $(this).closest('td.tdSeqment').find('.TableNameH5').text();
    show_generate_crud_api_table_name = entityName;
    entityName = entityName.replace(/_/g, ' ');
    entityName = entityName.replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    $('#fieldFormGeneratorModal_body_create_form_name').val(" Create " + entityName)
    $('#fieldFormGeneratorModal_body_update_form_name').val(" Update " + entityName)
    $('#fieldFormGeneratorModal_body_view_form_name').val(" View " + entityName)
    $('#fieldFormGeneratorModal_body_list_form_name').val(" List " + entityName)

    if (!tableId) {
        return;
    }

    callService('serviceTmGetFieldByTableId', { tableId: tableId }, true,
        function (res) {

            var tbody = $('table#fieldFormGeneratorModal_id').find('tbody');
            tbody.html('');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var o = obj[i];
                var fieldname = o.fieldName;
                fieldname = fieldname.replace(/_/g, ' ');
                fieldname = fieldname.replace(/(^\w|\s\w)/g, m => m.toUpperCase())

                var tr = `<tr>
                                    <td><input class='generate-olacaq-inputlarin-check-box' type='checkbox' checked></td>                                    
                                    <td >${i + 1}</td>
                                    <td class='field-name'>${o.fieldName}</td>
                                    <td> <input  class='form-control field-title' value='${fieldname}'></td>
                                    <td cl>${component_type}</td>
                                    <td>${order_no(i + 1)}</td>
                                    <td>${cell_no}</td>
                                    <td>${content2()}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class='row-id hidden' hidden>${o.id}</td>

                                
                                </tr>`
                tbody.append(tr)
            }
        })
})


$(document).on('change', '#us-gui-component-id-field-relation', function () {
    var val = $(this).val();
    var that = this;
    if (val === 'cmb') {
        $('select.form-generator-projectlist-main').remove();
        callService('serviceTmgetProjectList', {}, true, function (res) {
            var select = $('<select>').addClass('form-control form-generator-projectlist-main');
            let obj = res.tbl[0].r;
            select.append(obj.map((o) => `<option value='${o.id}'>${o.projectName}</option>`));
            $(that).after(select);
        })
    }
})

$(document).on('change', 'select.form-generator-projectlist-main', function () {
    var val = $(this).val();
    if (!val) {
        return;
    }
    var that = this;
    $('select.form-generator-api-list-main').remove();
    callService('serviceTmgetApiListByProjectId', { fkProjectId: val }, true, function (res) {
        var select = $('<select>').addClass('form-control form-generator-api-list-main');
        let obj = res.tbl[0].r;
        select.append(obj.map((o) => `<option value='${o.id}'>${o.backlogName}</option>`));
        $(that).after(select);
    })
})


$(document).on('change', 'select.form-generator-api-list-main', function () {
    var val = $(this).val();
    if (!val) {
        return;
    }
    var that = this;
    $('select.form-generator-input-list-main').remove();
    callService('serviceTmGetInputList', { fkBacklogId: val, inputType: "OUT" }, true, function (res) {
        var select = $('<select>').addClass('form-control form-generator-input-list-main');
        let obj = res.tbl[0].r;
        select.append(obj.map((o) => `<option value='${o.id}'>${o.inputName}</option>`));
        $(that).after(select);
    })
})



const component_type =
    `<select class='form-control' 
                    id="us-gui-component-id-field-relation">
                    <option value="txt">Edit Line</option>
                    <option value="cmb">Select Box</option>
                    <option value="mcmb">Multi Select Box</option>
                    <option value="txa">Textarea</option>
                    <option value="rbtn">Radio Button</option>
                    <option value="cbox">Check Box</option>
                    <option value="file">File Picker</option>
                    <option value="date">Date</option>
                    <option value="time">Time</option>
                    <option value="lbl">Label</option>
                    <option value="img">Image</option>
                    <option value="ytube">Youtube</option>
                    <option value="irbtn">Inner Radio Button</option>
                    <option value="icbox">Inner Check Box</option>
                    <option value="iedit">Inner Edit</option>
                    <option value="hr">Inner Line</option>
                    <option value="hlink">Hiperlink</option>
                    <option value="icon">Icon</option>
                    <option value="btn">Button</option>
                    <option value="hdn">Hidden</option>
                    <option value="fhtml">Free HTML</option>
                    <option value="fcomp">Free Component</option>
                    <option value="sctn">Section</option>
                    <option value="tab">Tab</option>
                    <option value="hcrr">Hidden Carrier</option>
                 </select>`;
const cell_no =
    `<select id="us-gui-component-cell-no-form-gen" 
                class='form-control' >
                <option valf="1">1</option>
                <option val="2">2</option>
                <option val="3">3</option>
                <option val="4">4</option>
                <option val="5">5</option>
                <option val="6" selected>6</option>
                <option val="7">7</option>
                <option val="8">8</option>
                <option val="9">9</option>
                <option val="10">10</option>
                <option val="11">11</option>
                <option val="12">12</option>
             </select>`;
const order_no = function (order_no1) {
    return `<input class='form-control' value='${order_no1}'
            style='width:130px'
                    id='us-gui-component-order-no-form-gen' type=number>`;
}

const content2 = function () {
    return `<textarea class='form-control'  
                        rows='1'
                       id='us-gui-component-content-form-gen' type=number>
                    </textarea>`;
}

var load_project_list_for_form_generation = function () {
    var select = $('select#generalte-form-in-project-called');
    select.html('');
    callService('serviceTmgetProjectList', {}, true, function (res) {
        let obj = res.tbl[0].r;
        select.append($('<option>').val('').text(''))
            .append(obj.map((o) => `<option value='${o.id}'>${o.projectName}</option>`));
    })

}

$(document).on('change', 'select#generalte-form-in-project-called', function () {
    callService('serviceTmgetApiListByProjectId', { fkProjectId: $(this).val() }, true, function (res) {
        let obj = res.tbl[0].r;
        $('#fieldFormGeneratorModal_body_create_form_name_action_api')
            .append($('<option>').val('').text(''))
            .append(obj.map((o) => `<option value='${o.id}'>${o.backlogName}</option>`));
        $('#fieldFormGeneratorModal_body_update_form_name_action_api')
            .append($('<option>').val('').text(''))
            .append(obj.map((o) => `<option value='${o.id}'>${o.backlogName}</option>`));
        $('#fieldFormGeneratorModal_body_delete_form_name_action_api')
            .append($('<option>').val('').text(''))
            .append(obj.map((o) => `<option value='${o.id}'>${o.backlogName}</option>`));
        $('#fieldFormGeneratorModal_body_view_form_name_action_api')
            .append($('<option>').val('').text(''))
            .append(obj.map((o) => `<option value='${o.id}'>${o.backlogName}</option>`));
        $('#fieldFormGeneratorModal_body_list_form_name_action_api')
            .append($('<option>').val('').text(''))
            .append(obj.map((o) => `<option value='${o.id}'>${o.backlogName}</option>`));
        $('#fieldFormGeneratorModal_body_create_form_name_action_api').selectpicker('refresh');
        $('#fieldFormGeneratorModal_body_update_form_name_action_api').selectpicker('refresh');
        $('#fieldFormGeneratorModal_body_delete_form_name_action_api').selectpicker('refresh');
        $('#fieldFormGeneratorModal_body_view_form_name_action_api').selectpicker('refresh');
        $('#fieldFormGeneratorModal_body_list_form_name_action_api').selectpicker('refresh');
    })

    callService('serviceTmgetBacklogListByProjectId', { fkProjectId: $(this).val() }, true, function (res) {
        let obj = res.tbl[0].r;
        $('#fieldFormGeneratorModal_body_list_form_name_story_card_create')
            .append($('<option>').val('').text(''))
            .append(obj.map((o) => `<option value='${o.id}'>${o.backlogName}</option>`));
        $('#fieldFormGeneratorModal_body_list_form_name_story_card_update')
            .append($('<option>').val('').text(''))
            .append(obj.map((o) => `<option value='${o.id}'>${o.backlogName}</option>`));
        $('#fieldFormGeneratorModal_body_list_form_name_story_card_view')
            .append($('<option>').val('').text(''))
            .append(obj.map((o) => `<option value='${o.id}'>${o.backlogName}</option>`));

        $('#fieldFormGeneratorModal_body_create_fieldFormGeneratorModal_body_list_form_name_story_card_createform_name_action_api').selectpicker('refresh');
        $('#fieldFormGeneratorModal_body_list_form_name_story_card_update').selectpicker('refresh');
        $('#fieldFormGeneratorModal_body_list_form_name_story_card_view').selectpicker('refresh');
    })
})


//GENERATE CREATE FORM
$(document).on('click', '#fieldFormGeneratorModal_body_create_form_name_generate', function () {
    generate_create_form_backlog();
})

const generate_create_form_backlog = () => {
    var data = {};
    data.backlogName = $('#fieldFormGeneratorModal_body_create_form_name').val();
    data.fkProjectId = $('#generalte-form-in-project-called').val();
    data.isApi = "0";
    callService('serviceTmInsertNewBacklogShort', data, true, function (res) {
        set_story_card_to_combo('fieldFormGeneratorModal_body_list_form_name_story_card_create', res.kv.id, data.backlogName)

        add_checked_inputs_to_story_card(res.kv.id, data.fkProjectId);
        hr(res.kv.id, data.fkProjectId, 100);
        save_button(res.kv.id, data.fkProjectId, 101);
        close_button(res.kv.id, data.fkProjectId, 102);

    })
}

const set_story_card_to_combo = (combo_id, id, value) => {
    $('#' + combo_id).append(`<option value='${id}' selected>${value}</option>`);
    $('#' + combo_id).selectpicker('refresh');
    $('#' + combo_id).val(id);


}

const create_js_for_create_form = (save_button_id, backlog_id) => {
    var api_id = $('#fieldFormGeneratorModal_body_create_form_name_action_api').val();
    var js_body = create_form_js_body(save_button_id, api_id);
    var data = {};
    data.fkBacklogId = backlog_id;
    data.jsBody = js_body;
    callService("serviceTminsertBacklogJsCode", data, true, function (res) {
    })
}

var show_generate_crud_api_table_id = "";
const generate_create_api = (backlog_id) => {
    var data = {
        "dbId": "",
        "tableId": "",
        "entity": "",
        "entityDb": "test",
        "action": "",
        "fkProjectId": ""
    };
    data.fkProjectId = $('#generalte-form-in-project-called').val();
    data.tableId = show_generate_crud_api_table_id;
    data.entity = show_generate_crud_api_table_name;
    data.dbId = $('#entityDatabaseList').val();
    data.action = "C";
    callService("serviceTmgenerateCreateApi", data, true,
        function (res) {
            let api_id = res.kv.fkBacklogId;
            var js_body = create_form_js_body(api_id);
            var data = {};
            data.fkBacklogId = backlog_id;
            data.jsBody = js_body;
            callService("serviceTminsertBacklogJsCode", data, true, function (res) {
            })
        })
}

//GENERATE update FORM
$(document).on('click', '#fieldFormGeneratorModal_body_update_form_name_generate', function () {
    generate_update_form_backlog();
})
const generate_update_form_backlog = () => {
    var data = {};
    data.backlogName = $('#fieldFormGeneratorModal_body_update_form_name').val();
    data.fkProjectId = $('#generalte-form-in-project-called').val();
    data.isApi = "0";
    callService('serviceTmInsertNewBacklogShort', data, true, function (res) {
        set_story_card_to_combo('fieldFormGeneratorModal_body_list_form_name_story_card_update', res.kv.id, data.backlogName)

        add_checked_inputs_to_story_card(res.kv.id, data.fkProjectId);
        hr(res.kv.id, data.fkProjectId, 100);
        update_button(res.kv.id, data.fkProjectId, 101);
        close_button(res.kv.id, data.fkProjectId, 102);
        id_hidden_carrier(res.kv.id, data.fkProjectId, 103);

    })
}


const create_js_for_update_form = (update_button_id, load_button_id, backlog_id) => {
    var info_api_id = $('#fieldFormGeneratorModal_body_view_form_name_action_api').val();
    var update_api_id = $('#fieldFormGeneratorModal_body_update_form_name_action_api').val();
    var js_body = update_form_js_body(update_button_id, load_button_id, info_api_id, update_api_id);
    var data = {};
    data.fkBacklogId = backlog_id;
    data.jsBody = js_body;
    callService("serviceTminsertBacklogJsCode", data, true, function (res) {
    })
}



//GENERATE view FORM
$(document).on('click', '#fieldFormGeneratorModal_body_view_form_name_generate', function () {
    generate_view_form_backlog();
})

const generate_view_form_backlog = () => {
    var data = {};
    data.backlogName = $('#fieldFormGeneratorModal_body_view_form_name').val();
    data.fkProjectId = $('#generalte-form-in-project-called').val();
    data.isApi = "0";
    callService('serviceTmInsertNewBacklogShort', data, true, function (res) {
        set_story_card_to_combo('fieldFormGeneratorModal_body_list_form_name_story_card_view', res.kv.id, data.backlogName)

        add_checked_inputs_to_story_card(res.kv.id, data.fkProjectId, true);
        hr(res.kv.id, data.fkProjectId, 100);
        close_button(res.kv.id, data.fkProjectId, 102);
        id_hidden_carrier(res.kv.id, data.fkProjectId, 103);
        loader_hidden_carrier_4_view(res.kv.id, data.fkProjectId, 103);


    })
}


//GENERATE LIST FORM
$(document).on('click', '#fieldFormGeneratorModal_body_list_form_name_generate', function () {
    generate_list_form_backlog();
})

const table_list_body = []; 

const generate_list_form_backlog = () => {
    var data = {};
    data.backlogName = $('#fieldFormGeneratorModal_body_list_form_name').val();
    data.fkProjectId = $('#generalte-form-in-project-called').val();
    data.isApi = "0";
    callService('serviceTmInsertNewBacklogShort', data, true, function (res) {
        new_button(res.kv.id, data.fkProjectId, 0.1);
      
        id_hidden_carrier(res.kv.id, data.fkProjectId, 0.3);
        hr(res.kv.id, data.fkProjectId, 0.5);

       
       



    })
}



const create_js_for_list_form = (backlog_id, input_table_id) => {
    var info_api_id = $('#fieldFormGeneratorModal_body_view_form_name_action_api').val();
    var update_api_id = $('#fieldFormGeneratorModal_body_update_form_name_action_api').val();
    var delete_table_api = $('#fieldFormGeneratorModal_body_delete_form_name_action_api').val();
    var load_table_api = $('#fieldFormGeneratorModal_body_list_form_name_action_api').val();

    var new_form_id = $('#fieldFormGeneratorModal_body_list_form_name_story_card_create').val();
    var update_form_id = $('#fieldFormGeneratorModal_body_list_form_name_story_card_update').val();
    var view_form_id = $('#fieldFormGeneratorModal_body_list_form_name_story_card_view').val();



    var js_body_details = create_js_for_list_form_details();

    var js_body = list_form_js_body(delete_table_api, new_form_id,
        update_form_id, view_form_id, load_table_api, input_table_id, js_body_details);
    var data = {};
    data.fkBacklogId = backlog_id;
    data.jsBody = js_body;
    callService("serviceTminsertBacklogJsCode", data, true, function (res) {
    })
}

const create_js_for_list_form_details = () => {
    var res = `<tr>
    
    <tr class='redirectClass' ><td>\${idx++}</td> 
    <td sa-data-id='id' sa-data-value='\${o.id}'   hidden >\${o.id}</td> 
    
   
    `;

    var obj = Object.keys(table_list_body);
    for (var i in obj) {
        var key = obj[i];
        var val = table_list_body[key];
        val = Utility.convertStringToCamelStyle(val);
        res += ` <td class=text-center'>\${o.${val}}</td> \n\t`
    }

    res += `   
    <td>
        <a sa-selectedfield="sa-view-table-row" class='sa-view-table-row text-center' onclick='viewRow(this)' href='#'>Ətraflı</a>
    </td> 
    <td >
        <a sa-selectedfield="sa-update-table-row" class='sa-update-table-row text-center'  onclick='updateRow(this)' href='#'>Dəyiş</a>
    </td> 
    <td>
        <a sa-selectedfield="sa-delete-table-row" class='sa-delete-table-row text-center'   onclick='deleteRow(this)' href='#'>Sil</a>
    </td>
</tr>`;
    return res;
}

////////////////

const create_js_for_view_form = (load_button_id, backlog_id) => {
    var info_api_id = $('#fieldFormGeneratorModal_body_view_form_name_action_api').val();
    var js_body = view_form_js_body(load_button_id, info_api_id);
    var data = {};
    data.fkBacklogId = backlog_id;
    data.jsBody = js_body;
    callService("serviceTminsertBacklogJsCode", data, true, function (res) {
    })
}
//////

const add_input_to_table = (backlog_id, fkProjectId, tableId, inputId, showColumn, showColumnName, showComponent) => {
    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;

    data.fkInputId = inputId;
    data.newInputName = '';
    data.fkInputTableId = tableId;
    data.showColumn = (showColumn) ? showColumn : "0";
    data.showColumnName = (showColumnName) ? showColumnName : "0"
    data.showComponent = (showComponent) ? showComponent : "0"
    callService("serviceTmAddColumnsAsInputToTableDirect", data, true, function (res) {

    })
}

const add_checked_inputs_to_story_card = (backlog_id, fkProjectId, setDisabled, tableId) => {
    $('.generate-olacaq-inputlarin-check-box').each(function () {
        if ($(this).is(":checked")) {
            var data = {};
            data.fkBacklogId = backlog_id;
            data.fkProjectId = fkProjectId;
            data.inputKey = $(this).closest('tr').find('.field-name').text();
            data.inputName = $(this).closest('tr').find('.field-title').val();
            data.inputType = "IN";
            data.componentType = $(this).closest('tr').find('#us-gui-component-id-field-relation').val();
            data.orderNo = $(this).closest('tr').find('#us-gui-component-order-no-form-gen').val();
            data.cellNo = $(this).closest('tr').find('#us-gui-component-cell-no-form-gen').val();
            data.content = $(this).closest('tr').find('#us-gui-component-content-form-gen').text();
            data.fkSelectFromProjectId = $(this).closest('tr').find('.form-generator-projectlist-main').text();
            data.fkSelectFromBacklogId = $(this).closest('tr').find('.form-generator-api-list-main').text();
            data.fkSelectFromInputId = $(this).closest('tr').find('#form-generator-input-list-main').text();

            table_list_body[data.orderNo] = data.inputKey;

            callService('serviceTmInsertNewInput4Select', data, true, function (res) {
                add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, data.inputKey);
                if (setDisabled === true) {
                    add_input_disable_readonly(res.kv.id, backlog_id, fkProjectId);
                }
                if (tableId) {
                    add_input_to_table(backlog_id, fkProjectId, tableId, res.kv.id);
                }
                Toaster.showMessage("Successfully Added")

            })
        }
    })
}

const table_body = ( backlog_id, fkProjectId) => {
    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.rowCount = global_var.component_table_default_row_count;
    
    callService('serviceTmAddTableAsInput', data, true, function (res) {
        close_button(backlog_id, data.fkProjectId, 102);

        table_id_button(backlog_id, fkProjectId, res.kv.fkInputTableCompId);
        view_table_row_button(backlog_id, fkProjectId, res.kv.fkInputTableCompId);
        update_table_row_button(backlog_id, fkProjectId, res.kv.fkInputTableCompId);
        delete_table_row_button(backlog_id, fkProjectId, res.kv.fkInputTableCompId);
        add_checked_inputs_to_story_card(backlog_id, fkProjectId, false, res.kv.fkInputTableCompId);
        //create JS file
        create_js_for_list_form(backlog_id, res.kv.id);
    })
}

const hr = (backlog_id, fkProjectId, orderNo) => {


    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'Inner Line';
    data.inputType = "IN";
    data.componentType = 'hdn';
    data.cellNo = "12";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        Toaster.showMessage("Successfully Added")
    })
}

let table_new_button_id = "";
const new_button = (backlog_id, fkProjectId, orderNo) => {

    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'Yeni';
    data.inputType = "IN";
    data.componentType = 'btn';
    data.cellNo = "2";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, "sa-new-button", "1");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-add-button", "1");

        table_new_button_id = res.kv.id;

        loader_hidden_carrier_4_list(backlog_id, data.fkProjectId, 0.2);
       

        Toaster.showMessage("Successfully Added");
    })
}


const table_id_button = (backlog_id, fkProjectId, inputTableId) => {

    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'id';
    data.inputType = "IN";
    data.componentType = 'txt';
    data.cellNo = "2";
    data.orderNo = "1";
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, "id")
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-table-row-id", "1");
        add_input_to_table(backlog_id, fkProjectId, inputTableId, res.kv.id, 1);
    })
}



const update_table_row_button = (backlog_id, fkProjectId, inputTableId) => {
    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'Dəyiş';
    data.inputType = "IN";
    data.componentType = 'hlink';
    data.cellNo = "2";
    data.orderNo = "102";
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, "sa-update-table-row")
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-update-table-row", "1");
        add_input_to_table(backlog_id, fkProjectId, inputTableId, res.kv.id, 0, 1, 1);
    })
}

const view_table_row_button = (backlog_id, fkProjectId, inputTableId) => {
    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'Ətraflı';
    data.inputType = "IN";
    data.componentType = 'hlink';
    data.cellNo = "2";
    data.orderNo = "101";
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, "sa-view-table-row");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-view-table-row", "1");
        add_input_to_table(backlog_id, fkProjectId, inputTableId, res.kv.id, 0, 1, 1);
    })
}

const delete_table_row_button = (backlog_id, fkProjectId, inputTableId) => {
    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'Sil';
    data.inputType = "IN";
    data.componentType = 'hlink';
    data.cellNo = "2";
    data.orderNo = "103";
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, "sa-delete-table-row");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-delete-table-row", "1");
        add_input_to_table(backlog_id, fkProjectId, inputTableId, res.kv.id, 0, 1, 1);
    })
}

const save_button = (backlog_id, fkProjectId, orderNo) => {

    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'Əlavə et';
    data.inputType = "IN";
    data.componentType = 'btn';
    data.cellNo = "2";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-save-button", "1");
        create_js_for_create_form(res.kv.id, backlog_id);
        Toaster.showMessage("Successfully Added");
    })
}

const close_button = (backlog_id, fkProjectId, orderNo) => {

    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'Bağla';
    data.inputType = "IN";
    data.componentType = 'btn';
    data.cellNo = "2";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        Toaster.showMessage("Successfully Added");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, " data-dismiss", "modal");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-close-button", "1");
    })
}

const update_button = (backlog_id, fkProjectId, orderNo) => {

    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'Yadda saxla';
    data.inputType = "IN";
    data.componentType = 'btn';
    data.cellNo = "2";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        Toaster.showMessage("Successfully Added");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-update-button", "1");

        loader_hidden_carrier_4_update(res.kv.id, backlog_id, data.fkProjectId, 103);

    })
}

const id_hidden_carrier = (backlog_id, fkProjectId, orderNo) => {

    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'id';
    data.inputType = "IN";
    data.componentType = 'hcrr';
    data.cellNo = "2";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        Toaster.showMessage("Successfully Added");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-onloadclick-id", "1")
        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId,   "id")
    })
}

//create JS file



let table_loader_button_id = '';
const loader_hidden_carrier_4_list = (backlog_id, fkProjectId, orderNo) => {
    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'loader';
    data.inputType = "IN";
    data.componentType = 'hcrr';
    data.cellNo = "2";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data,true, function (res) {
        Toaster.showMessage("Successfully Added");
        table_loader_button_id = res.kv.id;

        table_body(backlog_id,  data.fkProjectId);

        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, "sa-onloadclick", "1")
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-loader-button", "0")
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-loader-button-development-visibility", "1")
    })
}

const loader_hidden_carrier_4_update = (update_button_id, backlog_id, fkProjectId, orderNo) => {
    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'loader';
    data.inputType = "IN";
    data.componentType = 'hcrr';
    data.cellNo = "2";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        Toaster.showMessage("Successfully Added");
        create_js_for_update_form(update_button_id, res.kv.id, backlog_id);
        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, "sa-onloadclick", "1");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-loader-button", "0");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-loader-button-development-visibility", "1")
    })
}


const loader_hidden_carrier_4_view = (backlog_id, fkProjectId, orderNo) => {
    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'loader';
    data.inputType = "IN";
    data.componentType = 'hcrr';
    data.cellNo = "2";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        Toaster.showMessage("Successfully Added");
        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, "sa-onloadclick", "1") 
        
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-loader-button", "0");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-loader-button-development-visibility", "1")

        //create_js_for_view_form
        create_js_for_view_form(res.kv.id, backlog_id);
    })
}

const loader_hidden_carrier = (backlog_id, fkProjectId, orderNo) => {
    var data = {};
    data.fkBacklogId = backlog_id;
    data.fkProjectId = fkProjectId;
    data.inputName = 'loader';
    data.inputType = "IN";
    data.componentType = 'hcrr';
    data.cellNo = "2";
    data.orderNo = orderNo;
    callService('serviceTmInsertNewInput4Select', data, true, function (res) {
        Toaster.showMessage("Successfully Added");
        add_input_selectedfield(res.kv.id, backlog_id, fkProjectId, "sa-onloadclick", "1")
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-loader-button", "0");
        add_input_attribute(res.kv.id, backlog_id, fkProjectId, "sa-loader-button-development-visibility", "1")
    })
}

const add_input_disable_readonly = (fkInputId, fkBacklogId, fkProjectId) => {
    add_input_attribute(fkInputId, fkBacklogId, fkProjectId, "readonly", "readonly");
    add_input_attribute(fkInputId, fkBacklogId, fkProjectId, "disabled", "disabled")

}

const add_input_selectedfield = (fkInputId, fkBacklogId, fkProjectId, attrVal) => {

    attrVal = attrVal.replace(/_/g, ' ');
    attrVal = attrVal.replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    attrVal = attrVal.replace(/ /g, '');
    attrVal = attrVal.charAt(0).toLowerCase() + attrVal.slice(1);
    add_input_attribute(fkInputId, fkBacklogId, fkProjectId, "sa-selectedfield", attrVal)
}
const add_input_attribute = (fkInputId, fkBacklogId, fkProjectId, attrName, attrVal) => {

    if (!attrName || !attrVal) {
        return;
    }

    var data = {};
    data.attrName = attrName;
    data.attrValue = attrVal;
    data.fkInputId = fkInputId;
    data.fkProjectId = fkProjectId;
    data.fkBacklogId = fkBacklogId;
    data.attrType = "comp";
    callService('serviceTmInsertNewInputAttribute', data, true, function (res) {

    })
}