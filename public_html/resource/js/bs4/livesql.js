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
                 .text('Database Name')
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
                 .text('Table Name')
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
                                .attr('placeholder', keys[k])
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
            $('.livesql-table-boxes input').each(function (ev) {
                $.fn.textWidth = function (text, font) {
                    if (!$.fn.textWidth.ZadFakeEl) $.fn.textWidth.ZadFakeEl = $('<span>').hide().appendTo(document.body);
                    $.fn.textWidth.ZadFakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));
                    return $.fn.textWidth.ZadFakeEl.width();
                };
        
                $(this).on('input', function () {
                    var inputWidth = $(this).textWidth();
                    $(this).css({
                        width: inputWidth + 15
                    })
                }).trigger('input');
        
                function inputWidth(CSelem, minW, maxW) {
                    CSelem = $(this);
                }
        
                var SheyTargetElem = $(this);
        
                inputWidth(SheyTargetElem);
            })

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
      $(".app_editor_wrapper").show('slide', {
        direction: 'up'
      }, 200);
    });
        
$(document).on("click", ".cs-sql-editor-run-btn.active", function (e) {
      $('.app_editor_wrapper').hide('slide', {
        direction: 'up'
      }, 200);
    });


    $( document ).ready(function() {

        var aceEditorInstance = ace.edit("livesqlditor");
        aceEditorInstance.setTheme("ace/theme/sqlserver");
    
        aceEditorInstance.getSession().setMode( "ace/mode/sql");
    
        window.draggingAceEditor = {};
    
    function makeAceEditorResizable(editor){
        var id_editor = editor.container.id;
        var id_dragbar = id_editor + '_dragbar';
        var id_wrapper =  id_editor + '_wrapper';
        var wpoffset = 0;
        window.draggingAceEditor[id_editor] = false;
    
        var action_mousedown = function(e) {
            e.preventDefault();
    
            window.draggingAceEditor[id_editor] = true;
    
            // Set editor opacity to 0 to make transparent so our wrapper div shows
            document.getElementById(id_editor).style.opacity = 0;
        
            document.addEventListener("mousemove", action_document_mousemove);
        };
    
        var action_document_mousemove = function(e){
            var _editor = document.getElementById(id_editor);
            var rect = _editor.getBoundingClientRect();
    
            var rsl = {
                top: rect.top + document.body.scrollTop
            };
    
            var top_offset = rsl.top - wpoffset;
    
            var actualY = e.pageY - wpoffset;
    
            // editor height
            var eheight = actualY - top_offset;
            
            // Set wrapper height
            document.getElementById(id_wrapper).style.height = eheight;
            
            // Set dragbar opacity while dragging (set to 0 to not show)
            document.getElementById(id_dragbar).style.opacity =  0.15;
        };
    
        document.getElementById(id_dragbar).addEventListener("mousedown", action_mousedown);
     
        var action_mouseup = function(e){
            if (window.draggingAceEditor[id_editor])
            {
                var ctx_editor = document.getElementById(id_editor);
                
                var rect = ctx_editor.getBoundingClientRect();
    
                var rsl = {
                    top: rect.top + document.body.scrollTop
                };
    
                var actualY = e.pageY - wpoffset;
                var top_offset = rsl.top - wpoffset;
                var eheight = actualY - top_offset;
                
                document.removeEventListener("mousemove", action_document_mousemove);
                
                // Set dragbar opacity back to 1
                document.getElementById(id_dragbar).style.opacity = 1;
                
                // Set height on actual editor element, and opacity back to 1
                ctx_editor.style.height = eheight + "px";
                ctx_editor.style.opacity = 1;
                
                // Trigger ace editor resize()
                editor.resize();
    
                window.draggingAceEditor[id_editor] = false;
            }
        };
    
        document.addEventListener("mouseup", action_mouseup);
    }
       
    makeAceEditorResizable(aceEditorInstance);

    });
