$(document).on("change", ".cs-database-name-list", function (e) {

    getTablesAndFields4Popup($(this).val())

});


$(document).on("change", ".th-header-filter-search-by-column", function (e) {
    var data = getFilterDataLine();
    getFieldByTableId4PopupContainer(data);

});



$(document).on("change", ".cs-database-table-list", function (e) {
    var tableId = $(this).val();
    getFieldByTableId4Popup(tableId);
});

$(document).on("click", "#ShowDatabaseTableBtn", function (e) {
    cs_loadDatabaseList2ComboEntityDetails();
});


function cs_loadDatabaseList2ComboEntityDetails() {
    var el = $('.cs-database-name-list');
    el.html("");

    var json = initJSON();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetDbList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            el.html("");
            try {
                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    el.append($('<option>').val(o.id)
                        .append(o.dbName))
                }
                // el.selectpicker('refresh');
            } catch (err) {

            }

        }
    });



}


function getTablesAndFields4Popup(dbid) {
    if (!dbid) return;
    var el = $('.cs-database-table-list');
    el.html("");

    var json = initJSON();

    json.kv.dbId = dbid;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetDbTableListForPopup",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            el.html("");
            try {
                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    el.append($('<option>').val(o.id)
                        .append(o.tableName))
                }
                // el.selectpicker('refresh');
            } catch (err) {

            }

        }
    });
}

function getFieldByTableId4PopupContainer(data) {
    var tableId = $('.cs-database-table-list').val();
    getFieldByTableId4Popup(tableId, data)
}

function getFieldByTableId4Popup(tableId, dataCore) {
    if (!tableId) return;

    var json = initJSON();
    json.kv.tableId = tableId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmgetFieldByTableId",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var selectedField = '';
            try {
                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    selectedField += (o.fieldName) ? o.fieldName + ',' : '';
                }
                getDataTableRowListContainer(selectedField, dataCore);
            } catch (err) {

            }

        }
    });
}


function getFilterDataLine() {
    var data = {};
    $('.th-header-filter-search-by-column').each(function (ev) {
        var key = $(this).attr('sa-data-name');
        var val = $(this).val();

        if (val) {
            data[key] = val;
        }
    })

    return data;
}

function getDataTableRowListContainer(selectedField, data) {
    var dbname = $('.cs-database-name-list').find('option:selected').text();
    var tablename = $('.cs-database-table-list').find('option:selected').text();
    getDataTableRowList(dbname, tablename, selectedField, data);
}

function getDataTableRowList(dbname, tablename, selectedField, dataCore) {
    var el = $('.cs-table-database-table-zad-list');
    el.find('thead').html("");
    el.find('tbody').html("");

    var json = initJSON();
    if (dataCore) {
        json.kv = $.extend(json.kv, dataCore);
    }
    json.kv.entity = tablename;
    json.kv.entityDb = dbname;
    json.kv.startLimit = "0";
    json.kv.endLimit = '25';
    json.kv.selectedField = selectedField;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceIoCoreSelect",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            AJAXCallFeedback(res);
            var obj = res.tbl[0].r;
            var keys = Object.keys(obj[0]);

            var tr_th = $('<tr>');
            for (var k in keys) {
                var col = keys[k];
                var valSt = ((dataCore) && (dataCore[col])) ? dataCore[col]:'';
                tr_th.append($('<th>')
                    .text(keys[k])
                    .append($('<br>'))
                    .append($('<input>')
                        .val(valSt)
                        .addClass('th-header-filter-search-by-column')
                        .attr('sa-data-name', col)));

            }
            el.find('thead').append(tr_th);


            el.find('tbody').html('');
            for (var i in obj) {
                var tr = $('<tr>');
                var o = obj[i];

                for (var k in keys) {
                    var col = keys[k];

                    var td = $('<td>');
                    td.text(o[col]);
                    tr.append(td);
                }
                el.find('tbody').append(tr);
            }

        }
    });
}