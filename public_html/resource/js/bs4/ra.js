/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TableComp = {
    Init: function (tableId, data, startLimitCore) {
        if (!tableId) {
            return;
        }

        var startLimit = (startLimitCore) ? startLimitCore : 0;
        var table = $('table#' + tableId);
        var thead = table.find('thead');

        var obj = (data && data._table && data._table.r) ? data._table.r : [];
        var tbody = $('<tbody>');

        for (var j = 0; j < obj.length; j++) {
            var o = obj[j];
            var tr = $('<tr>')
                    .addClass('redirectClass')
                    .append($('<td>')
                            .text((parseInt(startLimit) + j + 1)));

            thead.find("th.selectablezad").each(function (e) {
                var sfield = $(this).attr("sa-selectedfield");
                var inputId = $(this).attr("pid");
                var td = $('<td>');
                td.attr('onclick', $(this).attr('onclick'));
                td.attr('onchange', $(this).attr('onchange'));
                td.attr('ondblclick', $(this).attr('ondblclick'));
                td.attr('prodesc', $(this).attr('prodesc'));


                TableComp.IsColumnHidden(td);

                var val = (sfield) ? o[sfield.split(',')[0]] : "";
                val = (val) ? val : "";

                val = TableComp.SetType(this, val);
                td.append(val);
                td.css("text-align", "center");
                tr.append(td);
            })

            tbody.append(tr);
        }
        table.find('tbody').html(tbody.html());
    },
    SetType: function (elm, val) {
        var type = $(elm).attr('sa-type');
        var res = "";

        try {
            switch (type) {
                case 'input':
                    res = TableComp.CompType.Input(val, elm);
                    break;
                case 'date':
                    res = TableComp.CompType.Date(val, elm);
                    break;
                case 'time' :
                    res = TableComp.CompType.Time(val, elm);
                    break;
                case 'image':
                    res = TableComp.CompType.Image(val, elm);
                    break;
                case 'filelist':
                    res = TableComp.CompType.FileList(val, elm);
                    break;
                case 'button':
                    res = TableComp.CompType.Button(val, elm);
                    break;
                case 'hiperlink':
                    res = TableComp.CompType.Hiperlink(val, elm);
                    break;
                default:
                    res = TableComp.CompType.Label(val, elm);
            }
        } catch (err) {
            console.log(err);
        }

        res.addClass($(elm).attr('class'));
        res.attr('sa-selectedfield', $(elm).attr('sa-selectedfield'));


        return res;

    },
    IsColumnHidden: function (td) {
        if (global_var.current_modal !== 'loadLivePrototype' &&
                $(this).hasClass("componentisheaden")) {
            td.css('display', 'none');
        }
    },
    CompType: {
        Input: function (val, elm) {
            return  $('<input>')
                    .attr('sa-type', 'input')
                    .attr('style', $(elm).attr('css').replace(/##/g, ''))
                    .addClass('form-control')
                    .attr('value', val);
        },
        Label: function (val, elm) {
            return  $('<span>')
                    .attr('sa-type', 'label')
                    .attr('style', $(elm).attr('css').replace(/##/g, ''))
                    .text(val);
        },
        Date: function (val, elm) {
            return  $('<span>')
                    .attr('sa-type', 'date')

                    .attr('style', $(elm).attr('css').replace(/##/g, ''))
                    .text(Utility.convertDate(val));
        },
        Time: function (val, elm) {
            return  $('<span>')
                    .attr('sa-type', 'time')

                    .attr('style', $(elm).attr('css').replace(/##/g, ''))
                    .text(Utility.convertTime(val));
            ;
        },
        FileList: function (val, elm) {
            var div = $("<div>");
            var resr = val.split(global_var.vertical_seperator);
            for (var i = 0; i < resr.length; i++) {
                try {
                    div.append(generateFileLine(resr[i].trim(), "col-12"));
                } catch (e) {
                }
            }
            return div;
        },
        Image: function (val, elm) {
            return $('<img>')
                    .attr('style', $(elm).attr('css').replace(/##/g, ''))
                    .attr('src', fileUrl(val));

        },
        TextArea: function (val, elm) {
            return  $('<input>')
                    .attr('sa-type', 'textarea')
                    .attr('style', $(elm).attr('css').replace(/##/g, ''))
                    .addClass('form-control')
                    .attr('value', val);
        },
        InnerCheckbox: function (val, elm) {
            return  $('<input>')
                    .attr('sa-type', 'innercheckbox')
                    .attr('style', $(elm).attr('css').replace(/##/g, ''))
                    .addClass('form-control')
                    .attr('value', val);
        },
        Button: function (val, elm) {
            var title = (val) ? val : $(elm).attr("sa-title");
            return  $('<button>')
                    .attr('sa-type', 'button')
                    .attr('style', gui_component.defaultCSS.Button + ';' + $(elm).attr('css').replace(/##/g, ''))
                    .css("cursor", "pointer")
                    .addClass('form-control')
                    .text(title);
        },
        Icon: function (val, elm) {
            return  $('<input>')
                    .attr('style', $(elm).attr('css').replace(/##/g, ''))
                    .addClass('form-control')
                    .attr('value', val);
        },
        Hiperlink: function (val, elm) {
            var title = (val) ? val : $(elm).attr("sa-title");
            return  $('<a>')
                    .attr('sa-type', 'hiperlink')
                    .attr('style', gui_component.defaultCSS.Hiperlink + ';' + $(elm).attr('css').replace(/##/g, ''))
                    .css("cursor", "pointer")
                    .attr("href", "#")
                    .text(title);
        },
    }
}

var StoryCardPanel = {
    StoryCardId: "",
    Init: function (storyCardId, elementId) {
        this.StoryCardId = storyCardId;
        this.LoadStoryCardInfo();
        this.LoadBody(elementId);
        this.LoadProjectList();
    },

    LoadStoryCardInfo: function () {
        loadBacklogDetailsByIdIfNotExist(StoryCardPanel.StoryCardId);
    },
    LoadBody: function (elementId) {
        var html = this.LoadContent();
        ;
        $('#' + elementId).html(html);
    },
    LoadContent: function () {
        var res = "";
        $.ajax({
            url: "resource/child/storycard.html",
            type: "GET",
            contentType: "text/html",
            crossDomain: true,
            async: false,
            success: function (html) {
                res = html;
            }
        })
        return res;
    },
    LoadProjectList: function () {
        var fkProjectId = SACore.GetBacklogDetails(StoryCardPanel.StoryCardId, "fkProjectId");
        global_var.current_project_id = fkProjectId;

        var cmd = $('.projectList_liveprototype_storycard');
        cmd.html('');
        var f = true;
        var pid = SACore.GetProjectKeys();
        for (var n = 0; n < pid.length; n++) {
            var pname = SACore.GetProjectName(pid[n]);
            var o = $('<option></option')
                    .attr('value', pid[n])
                    .text(pname);
            if (f) {
                o.attr("selected", true);
                f = false;
            }
            if (pid[n] === global_var.current_project_id) {
                o.attr("selected", true);
            }
            cmd.append(o);
        }

        //    cmd.val(global_var.current_project_id);
        sortSelectBoxByElement(cmd);
        cmd.selectpicker('refresh');
        $('select.projectList_liveprototype_storycard').val(fkProjectId);

        if (StoryCardPanel.StoryCardId) {
            this.LoadStoryCardInfoIfExist();
        } else {
            $('select.projectList_liveprototype_storycard').change();
        }

    },
    LoadStoryCardInfoIfExist: function () {
        global_var.current_backlog_id = StoryCardPanel.StoryCardId;
        var backlogName = SACore.GetCurrentBacklogname();
        $('#storyCardListSelectBox4StoryCard')
                .append($('<option>').text(backlogName))
                .append($('<option>')
                        .val('-2')
                        .text("Load All Story Cards"));
        $('#storyCardListSelectBox4StoryCard').selectpicker('refresh');
    },

    FillBacklogHistory: function () {
        fillBacklogHistory4View(StoryCardPanel.StoryCardId, "0");
    }
}


function callStoryCard1(id, elId, backlogName) {



    var divId = (elId) ? elId : "body_of_nature";
    $('#storyCardViewManualModal-body').html(''); //alternative backlog modal oldugu ucun ID-ler tekrarlarni
    StoryCardPanel.Init(id);
//    $.get("resource/child/storycard.html", function (html_string)
//    {
//        if (!id || id === '-1') {
//            return;
//        }
//
//        loadBacklogDetailsByIdIfNotExist(id);
//        var fkProjectId = SACore.GetBacklogDetails(id, "fkProjectId");
//        global_var.current_project_id = fkProjectId;
//
//        $("#UserStoryPopupModal-Toggle-modal").html(html_string);
//        $("#UserStoryPopupModal-Toggle").modal('show');
//        loadProjectList2SelectboxByClassWithoutCallAction('projectList_liveprototype_storycard');
//        $('select.projectList_liveprototype_storycard').val(fkProjectId)
//
//        global_var.current_backlog_id = id;
//        var backlogName = SACore.GetCurrentBacklogname();
//        $('#storyCardListSelectBox4StoryCard')
//                .append($('<option>').text(backlogName))
//                .append($('<option>')
//                        .val('-2')
//                        .text("Load All Story Cards"));
//        $('#storyCardListSelectBox4StoryCard').selectpicker('refresh');
//
//        fillBacklogHistory4View(id, "0");
//        new UserStory().toggleSubmenuStoryCard();
////        loadStoryCardBodyInfo();
//
//        loadUsersAsOwner();
//        setStoryCardOwner();
//        setStoryCardCreatedBy();
//    });
}

//$(document).on('focusout', '#addComment4Task_comment_new', function (ev) {
//    var val = $(this).val();
//    
//    var fname = $('#addComment4Task_addnewfile').attr('fname');
//
//    if (!val && !fname) {
//        $("#cke_commentinput").remove()
//        $(".commentinput").css("display", "block")
//        $(".commentinput").css("visibility", "visible")
//
//        setTimeout(function () {
//            $(".commentsubmit-seqment").css("display", "none")
//            $(".commentinput").css("height", "")
//        }, 300)
//    }
//});

$(document).on('change', 'select.user-story-backlog-type', function (ev) {
    var backlogType = $('#user-story-type').val();
    storyCardTypeChangeEvent(backlogType);
    var isApi = (backlogType === 'api') ? "1" : "0";
    updateUS4ShortChangeDetails(isApi, "isApi");
});



function loadStoryCardInfo4StoryCard(el) {
    var id = $(el).val();
    if (id === '-2') {
        $('select.projectList_liveprototype_storycard').change();
    } else {
        global_var.current_backlog_id = id;
        Utility.addParamToUrl('current_backlog_id', global_var.current_backlog_id);
        fillBacklogHistory4View(id, "0");
        new UserStory().toggleSubmenuStoryCard();
        loadUsersAsOwner();
        setStoryCardOwner();
        setStoryCardCreatedBy();
        setStoryCardUpdatedBy();
    }
}


function storyCardTypeChangeEvent(backlogType) {
    //hide all story card side by panels
    $('.story-card-right-menu-panels').hide();
    $('.story-card-right-menu-panels-' + backlogType).show();
}



$(document).on('change', '#liveProActionType', function (ev) {
    var val = $(this).val();
    $('.liveProActionTypeAll').hide();
    if (val === 'api') {
        $('.liveProActionTypeApi').show();
    } else if (val === 'toggle') {
        $('.liveProActionTypeToggle').show();
    } else if (val === 'manual') {
        $('.liveProActionTypeManual').show();
    } else if (val === 'direct') {
        $('.liveProActionTypeDirect').show();
    }
});

$(document).on('change', '#liveProActionTypeToggleItemIfActionOperation', function (ev) {
    var val = $(this).val();

    if (val === 'callapi') {
        $('#liveProActionTypeToggleItemIfThenApiList').show();
        $('#liveProActionTypeToggleItemIfThenClassname').hide();
    } else {
        $('#liveProActionTypeToggleItemIfThenApiList').hide();
        $('#liveProActionTypeToggleItemIfThenClassname').show();
    }
});


$(document).on('change', '#liveProActionTypeToggleItemIfElseActionOperation', function (ev) {
    var val = $(this).val();

    if (val === 'callapi') {
        $('#liveProActionTypeToggleItemIfElseThenApiList').show();
        $('#liveProActionTypeToggleItemIfElseThenClassname').hide();
    } else {
        $('#liveProActionTypeToggleItemIfElseThenApiList').hide();
        $('#liveProActionTypeToggleItemIfElseThenClassname').show();
    }
});


$(document).on('change', '.inputActionTypeChangeZadSheyOOO', function (ev) {
    updateCurrentInput4ShortChanges(this);
});

$(document).on('change', '.hasInputManualEventActionChange', function (ev) {
    var inputId = $(this).attr('pdid');
    var ifKey = SAInput.getInputDetails(inputId, 'ifKey');
    var coreKey = $(this).val();
    if (ifKey === 'key') {
        coreKey = $(this).find('option:selected').text();
    }

    var ifOperation = SAInput.getInputDetails(inputId, 'ifOperation');
    var ifValue = SAInput.getInputDetails(inputId, 'ifValue');
    var thenAction = SAInput.getInputDetails(inputId, 'thenAction');
    var thenClassname = SAInput.getInputDetails(inputId, 'thenClassname');
    var thenApiId = SAInput.getInputDetails(inputId, 'thenApiId');
    var elseAction = SAInput.getInputDetails(inputId, 'elseAction');
    var elseClassname = SAInput.getInputDetails(inputId, 'elseClassname');
    var elseApiId = SAInput.getInputDetails(inputId, 'elseApiId');


    ifOperation = ifOperation.replace(/ /g, '');
    var operation = ifOperation.toLowerCase();

    var value = ifValue;
    var key = coreKey;

    key = key.trim();
    value = value.trim();

    var operRes = false;

    if (operation === '=') {
        operRes = (key === value)
    } else if (operation === '!=') {
        operRes = (key !== value)
    } else if (operation === '>') {
        operRes = (parseFloat(key) > parseFloat(value));
    } else if (operation === '>') {
        operRes = (parseFloat(key) > parseFloat(value));
    } else if (operation === '<') {
        operRes = (parseFloat(key) < parseFloat(value));
    } else if (operation === '>=' || operation === '=>') {
        operRes = (parseFloat(key) >= parseFloat(value));
    } else if (operation === '<=' || operation === '=<') {
        operRes = (parseFloat(key) <= parseFloat(value));
    } else if (operation === 'in') {
        operRes = (key.includes(value));
    } else if (operation === 'notin') {
        operRes = (!key.includes(value));
    }


    if (operRes) {
        switch (thenAction) {
            case 'hide':
                $('.' + thenClassname).hide();
                break;
            case 'show':
                $('.' + thenClassname).show();
                break;
            case 'disable':
                $('.' + thenClassname).attr('disabled', true);
                $('.' + thenClassname).attr('readonly', true);
                break;
            case 'enable':
                $('.' + thenClassname).removeAttr('disabled');
                $('.' + thenClassname).removeAttr('readonly');
                break;
            case 'callapi':
                if (thenApiId) {
                    triggerAPI(this, thenApiId)
                }
                break;

            default:
                var t = 1;
        }
    } else {
        switch (elseAction) {
            case 'hide':
                $('.' + elseClassname).hide();
                break;
            case 'show':
                $('.' + elseClassname).show();
                break;
            case 'disable':
                $('.' + elseClassname).attr('disabled', true);
                $('.' + elseClassname).attr('readonly', true);
                break;
            case 'enable':
                $('.' + elseClassname).removeAttr('disabled');
                $('.' + elseClassname).removeAttr('readonly');
                break;
            case 'callapi':
                if (elseApiId) {
                    triggerAPI(this, elseApiId)
                }
                break;

            default:
                var t = 1;
        }
    }


});


$(document).on('dblclick', '.hasInputManualEventActionDblClick', function (ev) {
    alert('dblclick')
});

$(document).on('click', '.hasInputManualEventActionClick', function (ev) {
    alert('click')
});

function updateCurrentInput4ShortChanges(el) {
    var inputId = global_var.current_us_input_id;
    var ustype = $(el).attr('key');
    updateInput4SC(inputId, el, ustype);
}


$(document).on("focusout", '#eventActionType4ManualJs', function (event) {
  
      
            var inputId = global_var.current_us_input_id;
            var val = window.editorEvent.getValue();
            var actionType = SAInput.getInputDetails(inputId, "actionType")
            if (val && actionType) {
                $("div#"+inputId + " .script-div").remove();
                var fn = Component.GetManualFunctionBody(actionType,inputId, val)
                $("div#"+inputId).append($('<div>')
                        .addClass("script-div")
                        .append($('<script>').text(fn)));
    
            }
            updateInput4SCDetails(inputId, val, 'manualJs');
          return false;
            
})

$(document).on('focusout', '.okayPitchYourPathYourWay', function (ev) {
    $(this).css('width', '20px');
});

$(document).on('focusin', '.okayPitchYourPathYourWay', function (ev) {
    $(this).css('width', '120px');
});

$(document).on('click', '.live-prototype-show-story-card-hard-refresh', function (ev) {
    loadBacklogProductionCoreDetailssByIdPost(global_var.current_backlog_id, false);
    $('.live-prototype-show-story-card-refresh').click();
})

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
            highlightTheSameSelectedFieldsInInputList();
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
                .addClass("inputSelectedFieldSingleCell")
                .attr('pname', sf)
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

$(document).on('click', '.ShowApiFieldRelations', function (ev) {
    $('#entityApiRelationModal').modal('show');
//    entityApiRelationModal_main


    var fieldId = $(this).closest('div.feildSection').first().attr('id');

    if (!fieldId)
        return;

    var json = initJSON();
    json.kv.fieldId = fieldId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmgetApiListByFieldId",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var body = $('#entityApiRelationModal_table tbody');
            body.empty();

            var obj = res.tbl[0].r;
            for (let i = 0; i < obj.length; i++) {
                var o = obj[i];
                body.append($('<tr>')
                        .append($("<td>").text(i + 1))
                        .append($("<td>").append($('<b>')
                                .css('cursor', 'pointer')
                                .attr('onclick', 'callStoryCard("' + o.id + '")')
                                .text(o.backlogName)))
                        .append($("<td>").text(GetApiActionTypeText(o.apiAction)))
                        .append($("<td>").text(MapApiCallAsyncType(o.apiSyncRequest)))
                        )
            }
        }
    });

});


$(document).on('click', '.ShowApiRelations', function (ev) {
    $('#entityApiRelationModal').modal('show');
//    entityApiRelationModal_main


    var tableid = $(this).closest('td.tdSeqment').first().attr('pid');

    if (!tableid)
        return;

    var json = initJSON();
    json.kv.tableId = tableid;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmgetApiListByEntityId",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var body = $('#entityApiRelationModal_table tbody');
            body.empty();

            var obj = res.tbl[0].r;
            for (let i = 0; i < obj.length; i++) {
                var o = obj[i];
                body.append($('<tr>')
                        .append($("<td>").text(i + 1))
                        .append($("<td>").append($('<b>')
                                .css('cursor', 'pointer')
                                .attr('onclick', 'callStoryCard("' + o.id + '")')
                                .text(o.backlogName)))
                        .append($("<td>").text(GetApiActionTypeText(o.apiAction)))
                        .append($("<td>").text(MapApiCallAsyncType(o.apiSyncRequest)))
                        )
            }
        }
    });

});

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
            highlightTheSameSelectedFieldsInInputList();
        }
    });
});


var map;
var markers = [];

function initMap(latInit, lngInit) {
    var lat = (latInit) ? parseFloat(latInit) : 40.58511505605673;
    var lng = (lngInit) ? parseFloat(lngInit) : 49.66477990150452;

    var haightAshbury = {lat: lat, lng: lng};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16.3, // Set the zoom level manually
        center: haightAshbury,
        mapTypeId: 'hybrid'
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function (event) {
        if (markers.length >= 1) {
            deleteMarkers();
        }

        addMarker(event.latLng);
        document.getElementById('lat').value = event.latLng.lat();
        document.getElementById('long').value = event.latLng.lng();
    });
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function triggerApiDebugMode(el, apiId) {
    if (!global_var.current_modal === 'loadLivePrototype') {
        return;
    }

    if (!$('#livePrototypDebugMode').is(":checked")) {
        return;
    }

    highlightInputFieldsForTriggerApi(el, apiId);

    clearLivePrototypeViewForDebug();
    $('.live-prototype-show-sourcedrelation').click();

    //hide all api cards
    toggleComponentBlock4Debug(el);

}

function triggerApiDebugMode4ApiOutput(el, selectedField) {
    if (!global_var.current_modal === 'loadLivePrototype') {
        return;
    }

    if (!$('#livePrototypDebugMode').is(":checked")) {
        return;
    }

    highlightOutputFieldsForTriggerApi(el, selectedField);

}


function highlightOutputFieldsForTriggerApi(el, selectedField) {
    $(el).closest('div.component-class')
            .addClass('sa-debug-mode-output-api-selectedfield');
    var attr = $(el).closest('div.component-class').attr('sa-debug-output-attr')
    $(el).closest('div.component-class').attr('sa-debug-output-attr', attr + ',' + selectedField);
}

function highlightInputFieldsForTriggerApi(el, apiId) {
    //input bildiren elemnentlerin classlarini silmek
    $('.sa-debug-mode-input-api-selectedfield')
            .removeClass('sa-debug-mode-input-api-selectedfield')

    $('.sa-debug-mode-output-api-selectedfield')
            .removeClass('sa-debug-mode-output-api-selectedfield');

    var inputList = be.ExecAPI.GetInputsByAPI(apiId);

    $(el).closest('.redirectClass').find('[sa-selectedfield]').each(function (e) {

        var selectedFields = $(this).attr('sa-selectedfield').split(',');
        for (var i in selectedFields) {
            var field = selectedFields[i].trim();
            if (inputList.includes(field)) {
                $(this).closest('div.component-class')
                        .addClass('sa-debug-mode-input-api-selectedfield');
                var attr = $(this).closest('div.component-class').attr('sa-debug-input-attr')
                $(this).closest('div.component-class').attr('sa-debug-input-attr', attr + ',' + field);
            }
        }
    })
}

function toggleComponentBlock4Debug(el) {
    var elementId = $(el).attr('id');
    var ls = SADebug.Lines;
    for (var i = 0; i < ls.length; i++) {

        if (SADebug.Lines[i].actionId) {
            if ('comp_id_' + SADebug.Lines[i].actionId === elementId) {
                SADebug.Lines[i].active = "1";
            } else {
                SADebug.Lines[i].active = "0";
            }
        }
    }
    SADebug.RemoveAllDrawLine();
    SADebug.DrawLines();
}

function getCallApiListFromProcessDescriptionLine(commandLine) {
//    commandLine = '@.if(x,=,y){@.callapi(21062010245603843446);@.forlist(class){@.if(z,=,5){@.callapi(21071110441109806371);@.callapi(21062914173108442476);@.ifhasvalue(444){@.callapi(211010181551089210372);};};};}';
    var cmdList = [];
    commandLine = commandLine.toLowerCase();
    commandLine = commandLine.replace(/@.callapi/g, '@.callapi@.fntemp');
    var cmd = commandLine.split('@.callapi');
    for (var i = 0; i < cmd.length; i++) {
        var apiCmd = cmd[i].trim();
        if (apiCmd && apiCmd.includes('@.fntemp')) {
            apiCmd = apiCmd.replace(/@.fntemp/g, '@.callapi@');
            var arg = SAFN.GetCommandArgument(apiCmd);
            arg = arg.replace(/ /g, '').replace(/'/g, '').replace(/"/g, '');
            cmdList.push(arg);
        }
    }

    return cmdList;
}

function highlightTheSameSelectedFieldsInInputList() {
    var saList = [];
    $('#tblIPOList').find('.inputSelectedFieldSingleCell').each(function (e) {
        var saName = $(this).attr('pname');
        if (saName && !saList.includes(saName)) {
            saList.push(saName);
        }
    })

    for (var i = 0; i < saList.length; i++) {
        var saName = saList[i];
        if (saName) {
            if ($('#tblIPOList').find('.inputSelectedFieldSingleCell[pname="' + saName + '"]').length > 1) {
                $('#tblIPOList').find('.inputSelectedFieldSingleCell[pname="' + saName + '"]')
                        .css("border-radius", "5px")
                        .css('background-color', getRandomColor());
            }
        }
    }

    return saList;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function setBacklogAsHtml(backlogId) {
    if (!backlogId) {
        return;
    }

    var resTmp = SAInput.toJSONByBacklog(backlogId);

    var html = new UserStory().getGUIDesignHTMLPure(resTmp);


    var json = initJSON();
    json.kv.fkBacklogId = backlogId;
    json.kv.backlogHtml = html;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmsetBacklogAsHtml",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            loadBacklogProductionCoreDetailssById(global_var.current_backlog_id, true);
        },
        error: function () {
            Toaster.showError(('Something went wrong!!!'));
        }
    });
}



function getBacklogAsHtml(bid1, isAsync) {
    var out = '';
    var async = (isAsync) ? isAsync : false;
    var bid = (bid1) ? bid1 : global_var.current_backlog_id;

    if (!bid)
        return out;

    $.ajax({
        url: urlGl + "api/get/dwd/html/" + global_var.current_domain + "/" + bid,
        type: "GET",
        contentType: "application/json",
        crossDomain: true,
        async: async,
        success: function (res) {
            out = res;
            if (out.length === 0) {
                setBacklogAsHtml(bid);
            }
        }
    });

    return out;

}


function initZadShey(projectId) {
//  alert('hole hole hoel')
    $('#kelbetin2').after($('<script>').attr('src', urlGl + 'api/get/script/js/' + global_var.current_domain + "/" + projectId + '.js'))
    $('#kelbetin').after($('<link>')
            .attr('rel', 'stylesheet')
            .attr('href', urlGl + 'api/get/script/css/' + global_var.current_domain + "/" + projectId + '.css'))

}




function loadDetailsOnProjectSelect4Ipo5555555(fkProjectId) {
    var pid = (fkProjectId) ? fkProjectId : global_var.current_project_id;

    var json = initJSON();
    json.kv.fkProjectId = pid;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetBacklogList4Combo",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {

            global_var.current_modal = "";
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                if (o.isApi !== '1') {
                    setBacklogAsHtml(o.id);

                }

            }

            //            cmd.val(global_var.current_backlog_id);


        }
    });
}


function getClasswordAndUserList(fkClassId) {
    var res1 = '';
    var json = initJSON();
    json.kv.fkClassId = fkClassId;
    json.kv.apiId = '21111923082206581653';
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceIoCallActionApi",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            try {
                res1 = res;

                var obj = res.tbl[0].r;

                for (var i in obj) {
                    var o = obj[i];
                    var key = o.fkClassworkId + "_" + o.fkUserId;
                    res1[key] = o;
                }
            } catch (err) {
            }

        }
    });

    return res1;

}

function getClassworkList(fkClassId) {
    var res1 = '';
    var json = initJSON();
    json.kv.fkClassId = fkClassId;
    json.kv.apiId = '21111917574404721010';
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceIoCallActionApi",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            res1 = res;
        }
    });

    return res1;

}

function getClassEnrolledUserkList(fkClassId) {
    var res1 = '';
    var json = initJSON();
    json.kv.fkClassId = fkClassId;
    json.kv.apiId = '21111917513206074975';
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceIoCallActionApi",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            res1 = res;
        }
    });
    return res1;
}



function genClassworkAndUserMatrix(fkClassId) {
    $('._teacherGradingSystem').html("No Data Found");
    if (!fkClassId) {

        return;
    }

    var classwork = getClassworkList(fkClassId);
    var participants = getClassEnrolledUserkList(fkClassId);
    var grading = getClasswordAndUserList(fkClassId);

    var clworkObj = classwork.tbl[0].r;
    var partObj = participants.tbl[0].r;

    var table = $('<table>')
            .addClass('table table-hover')


    var thead = $('<thead>')
    var trh = $('<tr>').append($('<th>').text(''))
    for (var i in clworkObj) {
        var cObj = clworkObj[i];
        trh.append($('<th>').text(cObj.title))
    }
    thead.append(trh);
    table.append(thead);

    var tbody = $('<tbody>')
    for (var j in partObj) {
        var pObj = partObj[j];
        var tr = $('<tr>');
        tr.append($('<td>').text(pObj.userName));
        for (var i in clworkObj) {
            var cObj = clworkObj[i];

            var cnt = "-";
            var key = cObj.fkClassworkId + "_" + pObj.fkUserId;
            if (grading && grading[key]) {
                cnt = $("<a href='#'>")
                        .append($('<spen>').text('Open'))
                        .append(GradingBlock());
            }
            tr.append($('<td>').append(cnt))

        }
        tbody.append(tr);
    }
    table.append(tbody);
    $('._teacherGradingSystem').html(table);
}

function GradingBlock() {
    return $('<select>')
            .addClass('gradingblock')
            .append($('<option>').val('5').text('Correct'))
            .append($('<option>').val('4').text('Almost Corrent'))
            .append($('<option>').val('3').text('Half Correct'))
            .append($('<option>').val('2').text('Almost Wrong'))
            .append($('<option>').val('1').text('Wrong'));
}


function genClassworkAndUserMatrixStudent(fkClassId) {
    $('._teacherGradingSystem').html("No Data Found");
    if (!fkClassId) {

        return;
    }

    var classwork = getClassworkList(fkClassId);
    var grading = getClasswordAndUserList(fkClassId);

    var clworkObj = classwork.tbl[0].r;

    var table = $('<table>')
            .addClass('table table-hover')


    var thead = $('<thead>')
    var trh = $('<tr>');

    trh.append($('<th>').text('#'))
            .append($('<th>').text('Title'))
            .append($('<th>').text('Created Date'))
            .append($('<th>').text('Due Date'))
            .append($('<th>').text('Type'))
            .append($('<th>').text('Grade'))
            .append($('<th>').text(''))


    thead.append(trh);
    table.append(thead);

    var tbody = $('<tbody>')

    var idx = 1;
    for (var i in clworkObj) {
        var cObj = clworkObj[i];

        var tr = $('<tr>').addClass("redirectClass");
        tr.append($('<td>').text(idx))
                .append($('<td>').append($('<a href="#">')
                        .val(cObj.id)
                        .attr('sa-selectedfield', 'fkClassworkId')
                        .attr('onclick_trigger_id', "21111819514900624174")
                        .attr('fkClassworkId', cObj.id)
                        .attr('onclick', 'showClassworkInfo(this)')
                        .text(cObj.title)))
                .append($('<td>').text(Utility.convertDate(cObj.createdDate)))
                .append($('<td>').text(Utility.convertDate(cObj.dueDate) + ' : ' + cObj.dueTime))
                .append($('<td>').text(cObj.typeName))
                .append($('<td>').text(cObj.grade))


                ;
        idx++;

        var key = cObj.id + "_" + global_var.current_ticker_id;
        if (grading && grading[key]) {
            tr.append($('<td>')
                    .append($('<a href="#">')
                            .addClass("openClassworkbody")

                            .attr('fkActionId', grading[key].fkActionId)
                            .attr('classworkType', grading[key].classworkType)
                            .text("Open")))
                    ;
        } else {
            tr.append($('<td>')
                    .append($('<a href="#">')
                            .attr("fkClassworkId", cObj.id)
                            .attr("fkUserId", global_var.current_ticker_id)
                            .attr("classworkType", cObj.classworkType)
                            .attr("fkClassId", fkClassId)
                            .attr('onclick', 'startBusinessCaseClasswork(this)')
                            .text("Submit")))
        }
        tbody.append(tr);
    }

    table.append(tbody);
    $('._teacherGradingSystem').html(table);
}

function startBusinessCaseClasswork(el) {
    var fkUserId = $(el).attr('fkUserId')
            , fkClassworkId = $(el).attr('fkClassworkId')
            , fkActionId = $(el).attr('fkActionId')
            , classworkType = $(el).attr('classworkType')
            , fkClassId = $(el).attr('fkClassId');

    if (fkActionId) {
        openBusinessCaseModal(fkActionId, classworkType);
        return;
    }

    var bs = insertNewBusinessCaseDetailsForTraining("Business Case for Classwork: ");
    if (!bs.kv.id) {
        Toaster.showError("Classwork didn't submitted!");
    }
    $(el).attr('fkActionId', bs.kv.id);

    var dt = {};
    dt.fkUserId = fkUserId;
    dt.fkClassworkId = fkClassworkId;
    dt.fkActionId = bs.kv.id;
    dt.fkClassId = fkClassId;
    dt.classworkType = classworkType;

    CallActionApi('21112007581103583541', dt);
    openBusinessCaseModal(bs.kv.id);


//            21112007581103583541 startNewClasswork
}

function showClassworkInfo(el) {
    new UserStory().setGUIComponentButtonGUIModal('21111723482809628427', el);
    $('._save').remove();
    $('._update').remove();
    $('#21111723495201831388').remove();
    $('#comp_id_21111822572801867649').remove();
}


function CallActionApi(apiId, dataCore, isAsync, fn) {
    if (!apiId) {
        Toaster.showError('API ID is not entered');
    }

    var synch = (isAsync) ? isAsync : true;

    var res1 = '';
    var json = initJSON();
    if (dataCore) {
        json.kv = $.extend(json.kv, dataCore);
    }
    json.kv.apiId = apiId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceIoCallActionApi",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: synch,
        success: function (res) {
            res1 = res;
            if (fn) {
                fn(res);
            }
        }
    });
    return res1;
}

function callApi(apiId, dataCore, isAsync, callback) {
    if (!apiId) {
        Toaster.showError('API ID is not entered');
    }

    var synch = (isAsync) ? isAsync : true;

    var res1 = '';
    var json = initJSON();
    if (dataCore) {
        json.kv = $.extend(json.kv, dataCore);
    }
    json.kv['apiId'] = apiId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceIoCallActionApi",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: synch,
        success: function (res) {
            AJAXCallFeedback(res);
            res1 = res;
            if (callback) {
                callback(res);
            }
        },
        error: function () {
            Toaster.showError(api + ' ----> Something went wrong!!!');
        }
    });
    return res1;
}

function callService(serviceName, dataCore, isAsync, callback) {
    if (!serviceName) {
        Toaster.showError('API ID is not entered');
    }

    var synch = (isAsync) ? isAsync : true;

    var res1 = '';
    var json = initJSON();
    if (dataCore) {
        json.kv = $.extend(json.kv, dataCore);
    }
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/" + serviceName,
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: synch,
        success: function (res) {
            AJAXCallFeedback(res);
            res1 = res;
            if (callback) {
                callback(res);
            }
        },
        error: function () {
            Toaster.showError(serviceName + ' ----> Something went wrong!!!');
        }
    });
    return res1;
}





$(document).on('click', '.openClassworkbody', function (ev) {
    var fkActionId = $(this).attr('fkActionId');
    var classworkType = $(this).attr('classworkType');
    openBusinessCaseModal(fkActionId, classworkType);
});

function openBusinessCaseModal(fkBusinessCaseId, classworkType) {
    if (!fkBusinessCaseId) {
        return;
    }

    $.get("resource/child/bcase.html", function (html_string) {
        $('#trainingGeneralModal').modal('show');
        $('#trainingGeneralModal_body').html(html_string);

//        getNewExecutiveTable();

        activeBCId = fkBusinessCaseId;
        var caseName = "";
        setBCasescripts();

        if (classworkType === 'businesscase') {
            $('#trainingGeneralModal_title').html('Business Case');
            loadMainBusinesCaseBody(caseName);
        } else if (classworkType === 'question') {
            $('#trainingGeneralModal_title').html('Question');
            loadMainBusinesCaseBodyForQuestion(caseName);
        }

        $('#trainingGeneralModal_body').find('.cs-headline-box').hide();

    });


}

function loadMainBusinesCaseBodyForQuestion(caseName) {
    $('#business_case_heading').html(caseName)
//   $('#business_case_description').text("asdfasd")
    getProblemStatList();
    $('#bcase_financial_projection').remove();
    $('#bcase_competitor_list').remove();
    $('#bcase_provided_services').remove();
    $('#bcase_problem_statement').remove();


}
$(document).on('click', '.ShowApiRelations', function (ev) {
    $('#entityApiRelationModal').modal('show');
//    entityApiRelationModal_main


    var tableid = $(this).closest('td.tdSeqment').first().attr('pid');

    if (!tableid)
        return;

    var json = initJSON();
    json.kv.tableId = tableid;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmgetApiListByEntityId",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var body = $('#entityApiRelationModal_table tbody');
            body.empty();

            var obj = res.tbl[0].r;
            for (let i = 0; i < obj.length; i++) {
                var o = obj[i];
                body.append($('<tr>')
                        .append($("<td>").text(i + 1))
                        .append($("<td>").append($('<b>')
                                .css('cursor', 'pointer')
                                .attr('onclick', 'callStoryCard("' + o.id + '")')
                                .text(o.backlogName)))
                        .append($("<td>").text(GetApiActionTypeText(o.apiAction)))
                        .append($("<td>").text(MapApiCallAsyncType(o.apiSyncRequest)))
                        )
            }
        }
    });

});


