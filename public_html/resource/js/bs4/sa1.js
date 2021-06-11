/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function showGuiInputList4DebugView() {
    var tbody = $('#backlogInput4Debug');
    tbody.html('');

    var loadedList = [];

    var ls = SADebug.Lines;
    for (var i = 0; i < ls.length; i++) {
        var obj = SADebug.Lines[i];
        if (!obj.actionId) {
            continue
        }

        if (loadedList.includes(obj.actionId)) {
            continue;
        }


        loadedList.push(obj.actionId);



        var txt = " " + obj.desc;
        txt += (obj.relationType === 'gui_gui') ? " (Event Relation)" : "";

        var tr = $('<tr>')
                .append($('<td>')
                        .append($('<input type="checkbox">')
                                .addClass('debugInputListCheckbox')
                                .attr('checked', obj.active === '1')
                                .attr('onchange', 'toggleInputList4Debug(this)')
                                .attr('actionId', obj.actionId)
                                )
                        )
                .append($('<td>')
                        .append($('<span>').text(txt)))

        tbody.append(tr);
    }
}


function toggleInputList4Debug(el) {
    var actionId = $(el).attr('actionId');

    if (actionId) {
        var ls = SADebug.Lines;
        for (var i = 0; i < ls.length; i++) {
            var obj = SADebug.Lines[i];
            if (obj.actionId === actionId) {
                SADebug.Lines[i].active = $(el).is(":checked") ? "1" : "0";
            }
        }
    }

    SADebug.RemoveAllDrawLine();
    SADebug.DrawLines();

}

function toggleCheckAllInputListInDebugMode(el) {
    if ($(el).is(":checked")) {
        $(el).closest('table').find('.debugInputListCheckbox').prop("checked", true);
        var ls = SADebug.Lines;
        for (var i = 0; i < ls.length; i++) {
            SADebug.Lines[i].active = "1";
        }
    } else {
        $(el).closest('table').find('.debugInputListCheckbox').prop("checked", false);
        var ls = SADebug.Lines;
        for (var i = 0; i < ls.length; i++) {
            SADebug.Lines[i].active = "0";
        }
    }

    SADebug.RemoveAllDrawLine();
    SADebug.DrawLines();
}