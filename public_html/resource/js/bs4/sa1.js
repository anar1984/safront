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
                                .attr('pval', obj.desc)
                                .attr('checked', obj.active === '1')
                                .attr('onchange', 'toggleInputList4Debug(this)')
                                .attr('actionId', obj.actionId)
                                )
                        )
                .append($('<td>')
                        .append($('<input type="checkbox">')
                                .addClass('debugInputListCheckbox4Selectedfield')
                                .attr('pval', obj.desc)
                                .attr('onchange', 'toggleInputList4Debug4Selectedfield(this)')
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
        $(el).closest('table').find('.debugInputListCheckbox').each(function () {
            var val = $(this).attr('pval');
            var ls = SADebug.Lines;
            for (var i = 0; i < ls.length; i++) {
                if (SADebug.Lines[i].desc === val) {
                    SADebug.Lines[i].active = "1";
                }
            }
        });


    } else {
        $(el).closest('table').find('.debugInputListCheckbox').prop("checked", false);
        $(el).closest('table').find('.debugInputListCheckbox').each(function () {
            var val = $(this).attr('pval');
            var ls = SADebug.Lines;
            for (var i = 0; i < ls.length; i++) {
                if (SADebug.Lines[i].desc === val) {
                    SADebug.Lines[i].active = "0";
                }
            }
        });
    }

    SADebug.RemoveAllDrawLine();
    SADebug.DrawLines();
}

function toggleInputList4Debug4Selectedfield(el) {
    SADebug.RemoveAllDrawLine();
    $('.debugInputListCheckbox4Selectedfield').each(function () {
        var elm = $(this);
        if (elm.is(':checked')) {
            try {
                var inputId = elm.attr('actionId');
                var compId = 'comp_id_' + inputId;
                var selectedFields = $('#' + compId).attr('sa-selectedfield').split(',');
                for (var i in selectedFields) {
                    var field = selectedFields[i].trim();
                    if (field.length > 0) {
                        var fromId = compId;

                        var toId = '';
                        $('.api-io-list-zad[idx=' + field + ']').each(function () {
                            toId = $(this).attr('id');
//                            showParentDivOfEsasApi(document.getElementById(toId));

                            var oldTop = $('#gui_component_main_view').scrollTop();
                            var oldLeft = $('#gui_component_main_view').scrollLeft();

                            $('#gui_component_main_view').scrollTop(0);
                            $('#gui_component_main_view').scrollLeft(0);

                            SADebug.JustLine4SelecedField(fromId, toId,field);

                            $('#gui_component_main_view').scrollTop(oldTop);
                            $('#gui_component_main_view').scrollLeft(oldLeft);
                        })
                    }
                }
            } catch (err) {
            }

        }
    })
}

function showParentDivOfEsasApi(el) {
    $(el).show();
    $(el).parents('div.sa-api-esas').each(function () {
        $(this).show();
        showParentDivOfEsasApi(this);
    })
}

function hideParentDivOfEsasApi(el) {
    $(el).hide();
    $(el).parents('div.sa-api-esas').each(function () {
        hideParentDivOfEsasApi(this);
    })
}

function showChildDivOfEsasApi(el) {
    return;

    $(el).show();
    $(el).find('div.sa-api-esas').each(function () {
        showChildDivOfEsasApi(this);
    })
}

var hideOlacaqEsasDivler = [];

function hideChildDivOfEsasApi(elId) {
//    $(el).hide();

    console.log(elId, ' hide oldu');

    $('#' + elId).hide();

    $('#' + elId).find('.sa-api-esas').each(function () {
//       $(this).html('kelbetin');

        var idZad = $(this).attr('id');
        hideChildDivOfEsasApi(idZad);
    })





}