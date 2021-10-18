/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */






$(document).on('focusout', '.okayPitchYourPathYourWay', function (ev) {
    $(this).css('width', '20px');
});

$(document).on('focusin', '.okayPitchYourPathYourWay', function (ev) {
    $(this).css('width', '120px');
});

$(document).on('change', '.okayPitchYourPathYourWay', function (ev) {

    var attrVal = $(this).val();

    if (!attrVal) {
        return;
    }

    var json = initJSON();

    json.kv.attrValue = attrVal;
    json.kv.fkInputId = global_var.current_us_input_id;
    json.kv.fkProjectId = global_var.current_project_id;
    json.kv.fkBacklogId = global_var.current_backlog_id;
    json.kv.attrType = "comp";

    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmAddSelectedField",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            $(that).val('');
            var div = splitSelectedFieldAndGenHtml(res.kv.attrValue, global_var.current_us_input_id);
            $(that).closest('tr').find('.selectedfieldlistforzad').html('').append(div);
        }
    });
});

function splitSelectedFieldAndGenHtml(selectedField, fkInputId) {
    var ls = selectedField.split(',');
    var div = $('<div>');
    for (var s in ls) {
        var sf = ls[s];
        if (sf.trim().length === 0) {
            continue;
        }
        var span = $('<span>')
                .text(sf)
                .append($('<a>')
                        .attr('inputId', fkInputId)
                        .attr('pid', sf)
                        .append('<b>(x)</b>')
                        .addClass('deleteSelectedFieldFromInput'));
        div.append(span);

        if (s < ls.length - 1) {
            div.append(' , ');
        }

    }
    return div;
}


$(document).on('click', '.deleteSelectedFieldFromInput', function (ev) {

    if (!confirm("Are you sure?")) {
        return;
    }

    var attrVal = $(this).attr('pid');

    if (!attrVal) {
        return;
    }
    var fkInputId = $(this).attr('inputId');

    var json = initJSON();
    json.kv.attrValue = attrVal;
    json.kv.fkInputId = fkInputId;
    json.kv.attrType = "comp";
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmDeleteSelectedField",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            $(that).val('');
            var div = splitSelectedFieldAndGenHtml(res.kv.attrValue, fkInputId);
            $(that).closest('tr').find('.selectedfieldlistforzad').html('').append(div);
        }
    });
});