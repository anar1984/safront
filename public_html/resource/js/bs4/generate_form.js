/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("click", ".Field_ShowFormGenerator", function (e) {
    $('#fieldFormGeneratorModal').modal("show");
    var tableId = $(this).closest('td.tdSeqment').attr("pid");
    $('#fieldFormGeneratorModal_id').val(tableId);
    load_project_list_for_form_generation();

    var entityName = $(this).closest('td.tdSeqment').find('.TableNameH5').text();
    entityName = entityName.replace(/_/g, ' ');
    entityName = entityName.replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    $('#fieldFormGeneratorModal_body_create_form_name').val(" Create " + entityName)
    $('#fieldFormGeneratorModal_body_update_form_name').val(" Update " + entityName)
    $('#fieldFormGeneratorModal_body_view_form_name').val(" View " + entityName)
    $('#fieldFormGeneratorModal_body_list_form_name').val(" List " + entityName)

    if (!tableId) {
        return;
    }

    callService('serviceTmGetFieldByTableId', {tableId: tableId}, true,
            function (res) {

                var tbody = $('table#fieldFormGeneratorModal_id');
                var obj = res.tbl[0].r;
                for (var i = 0; i < obj.length; i++) {
                    var o = obj[i];
                    var tr = `<tr>
                                    <td><input type='checkbox' checked></td>                                    
                                    <td>${i + 1}</td>
                                    <td>${o.fieldName}</td>
                                    <td>${component_type}</td>
                                    <td>${order_no(i + 1)}</td>
                                    <td>${cell_no}</td>
                                    <td>${content2()}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class='row-id hidden' hidden>${o.id}</td>

                                
                                </tr>`;

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
    callService('serviceTmgetApiListByProjectId', {fkProjectId: val}, true, function (res) {
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
    callService('serviceTmGetInputList', {fkBacklogId: val, inputType: "OUT"}, true, function (res) {
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
        select.append(obj.map((o) => `<option value='${o.id}'>${o.projectName}</option>`));
    })

}

$(document).on('change', 'select#generalte-form-in-project-called', function () {
    callService('serviceTmgetApiListByProjectId', {fkProjectId: val}, true, function (res) {
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

    })
})


