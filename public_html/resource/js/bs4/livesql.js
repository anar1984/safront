let current_table_id = '';
let current_db_id = '';

$(document).on("change", ".cs-database-name-list", function (e) {
    current_db_id = $(this).val();
    getTablesAndFields4Popup($(this).val())
    // $('.cs-database-table-list').selectpicker('refresh');
});

$(document).on("change", ".cs-database-table-list", function (e) {
    var tableId = $(this).val();
    getFieldByTableId4Popup(tableId);
});

$(document).on("change", ".th-header-filter-search-by-column", function (e) {
    var data = getFilterDataLine();
    getFieldByTableId4PopupContainer(data);

});



$(document).on("change", ".cs-database-table-list", function (e) {
    var tableId = $(this).val();
    current_table_id = tableId;
    getFieldByTableId4Popup(tableId);
});

$(document).on("click", "#ShowDatabaseTableBtn", function (e) {
    $('.cs-nav-select').html("");
    $('.cs-nav-select').append($('<div>')
        .addClass('cs-input-group')
            .append($('<div>')
            .attr('class','input-group-addon')
                 .text('Project Name')
            )
            .append($('<select>')
                .attr('class','cs-database-name-list')
                .attr('data-live-search','true')
                .append($('<option>')
                    .text('Select Database')
                )
            )
        
        );
        $('.cs-nav-select').append($('<div>')
        .addClass('cs-input-group')
            .append($('<div>')
            .attr('class','input-group-addon')
                 .text('Project Name')
            )
            .append($('<select>')
                .attr('class','cs-database-table-list')
                .attr('data-live-search','true')
                .append($('<option>')
                    .text('Select Database')
                )
            )
        
        );
    // $('.cs-nav-select').append($('<select>')
    //     .attr('class','cs-database-table-list')
    //     .attr('data-live-search','true')
    //     .append($('<option>')
    //         .text('Select Database')
    //     )
    // );
    cs_loadDatabaseList2ComboEntityDetails();
    $('.cs-database-name-list, .cs-database-table-list').selectpicker('refresh');
});
function cs_loadDatabaseList2ComboEntityDetails() {
    var el = $('select.cs-database-name-list');
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
                el.append($('<option>').append('Select Database'))
                for (var i in obj) {
                    var o = obj[i];
                    el.append($('<option>').val(o.id)
                            .append(o.dbName))
                }
                el.selectpicker('refresh');
            } catch (err) {

            }

        }
    });

}


function getTablesAndFields4Popup(dbid) {
    if (!dbid) return;
    var el = $('select.cs-database-table-list');
    el.html("");
    el.append($('<option>').append('Select Database'))
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
                el.append($('<option>').append('Select Table Name'))
                for (var i in obj) {
                    var o = obj[i];
                    el.append($('<option class="data-table-option">').val(o.id)
                        .append(o.tableName))
                }
                el.selectpicker('refresh');
            } catch (err) {
                
            }
        }
    });
}

function getFieldByTableId4PopupContainer(data) {
    var tableId = $('select.cs-database-table-list').val();
    getFieldByTableId4Popup(tableId, data)
}


function getFieldListByTableId() {
    var tableId = current_table_id;
    if (!tableId)
        return;
    
    var keys = [];

    var json = initJSON();
    json.kv.tableId = tableId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmGetFieldByTableId",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            
            try {
                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    if (o.fieldName){
                        var val = Utility.convertStringToCamelStyle(o.fieldName);
                        keys.push(val);
                    }
                }
            } catch (err) {
            }
        }
    });
    return keys;
}



function getFieldByTableId4Popup(tableId, dataCore) {
    if (!tableId)
        return;

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
    $('.live-sql-error').text('');
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

            var keys = [];
            try {
                var  keys = res.kv.selectedField.split(",");
            } catch (err) {
                keys = getFieldListByTableId();
            }

            var tr_th = $('<tr>');
            for (var k in keys) {
                var col = keys[k];
                var valSt = ((dataCore) && (dataCore[col])) ? dataCore[col] : '';
                tr_th.append($('<th>')
                        .text(keys[k])
                        .append($('<br>'))
                        .append($('<input>')
                                .val(valSt)
                                .addClass('th-header-filter-search-by-column')
                                .attr('sa-data-name', col)));

            }
            el.find('thead').append(tr_th);


            el.find('tbody')
                    .html('');
            var obj = [];
            try{ obj = res.tbl[0].r;
            }catch(err){
                el.find('tbody')
                    .html('No Data Found');
            }
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

        },
        error: function () {
            $('.live-sql-error').text('');
            $('.live-sql-error').text('No data found');
          }
    });
}

// SQL EDITOR SHOW

$(document).on("click", ".cs-sql-editor-run-btn", function (e) {
     $('.cs-sql-editor-run-btn').toggleClass('active');
      $(".live-sql-ditor").show('slide', {
        direction: 'up'
      }, 200);
    });
        
$(document).on("click", ".cs-sql-editor-run-btn.active", function (e) {
      $('.live-sql-ditor').hide('slide', {
        direction: 'up'
      }, 200);
    });