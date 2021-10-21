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