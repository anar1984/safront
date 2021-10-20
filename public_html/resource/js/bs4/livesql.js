var current_table_id = '';
var current_db_id = '';
var per_page_here = 25;
var page_count_there = 1;

$(document).on("change", "select.cs-database-name-list", function (e) {
    // $(this).closest('.ShowDatabaseTable').find('.cs-nav-select select.cs-database-table-list').html("");
    current_db_id = $(this).val();
    getTablesAndFields4Popup($(this).val())
    $(this).closest('.ShowDatabaseTable').find('.cs-nav-select select.cs-database-table-list').selectpicker('refresh');
});

$(document).on("change", ".th-header-filter-search-by-column", function (e) {
    page_count_there = 1;
    getDataList();
});

function getDataList() {
    var data = getFilterDataLine();
    getFieldByTableId4PopupContainer(data);
}


$(document).on("click", ".cs-sql-editor-debug-btn", function (e) {
    runSql();
});


$(document).on("change", "select.cs-database-table-list", function (e) {
    var tableId = $(this).val();
    current_table_id = tableId;
    getFieldByTableId4Popup(tableId);
});


$(document).on("click", ".cs-filter-table-btn", function (e) {
    $('select.cs-database-table-list').change();
});

$(document).on("change", "select.cs-pagination-page-count", function (e) {
    page_count_there = $(this).val();
    getDataList();
    // sqlEditorPageLoader();
});

$(document).on("click", ".perpage-select .perpage-prev", function (e) {
    $(this).closest('.perpage-select').find('.cs-pagination-page-count option:selected').prev().attr('selected', 'selected').selectpicker('refresh');
    $(this).closest('.perpage-select').find('select.cs-pagination-page-count').change();
});

$(document).on("click", ".perpage-select .perpage-next", function (e) {
    $(this).closest('.perpage-select').find('.cs-pagination-page-count option:selected').next().attr('selected', 'selected').selectpicker('refresh');
    $(this).closest('.perpage-select').find('select.cs-pagination-page-count').change();
});

$(document).on("change", "select.cs-pagination-per-page", function (e) {
    per_page_here = $(this).val();
    getDataList();
});

$(document).on("click", "#ShowDatabaseTableBtn", function (e) {
    sqlEditorPageLoader();
});

$(document).on("click", ".ShowTableDataEntry", function () {

    var tableid = $(this).closest('td.tdSeqment').attr('pid');
    var dbid = $('#entityDatabaseList').val();
    
    $('#ShowDatabaseTable').modal('show');
    sqlEditorPageLoader();
    $('.cs-database-name-list').val(dbid).change();
    getTablesAndFields4Popup(dbid);
    $('.cs-database-table-list').val(tableid).change();
})

$(document).on("click", ".cs-reset-live-sql", function (e) {
    $(this).closest('.ShowDatabaseTable').find('.cs-nav-select select.cs-database-name-list').html("");
    $(this).closest('.ShowDatabaseTable').find('.cs-nav-select select.cs-database-table-list').html("");
    $(this).closest('.ShowDatabaseTable').find('select.cs-database-name-list, select.cs-database-table-list').selectpicker('refresh');
    $(this).closest('.ShowDatabaseTable').find('.cs-table-database-table-zad-list').find('thead').html("");
    $(this).closest('.ShowDatabaseTable').find('.cs-table-database-table-zad-list').find('tbody').html("");
});

function sqlEditorPageLoader() {
    $(this).closest('.ShowDatabaseTable').find('.cs-nav-select select.cs-database-name-list').html("");
    $(this).closest('.ShowDatabaseTable').find('.cs-nav-select select.cs-database-table-list').html("");
    cs_loadDatabaseList2ComboEntityDetails();
    $('.cs-database-name-list, .cs-database-table-list').selectpicker('refresh');

    $('.navigation select').each(function (ev) {
        let arrowWidth = 60;

        $.fn.resizeselect = function (settings) {
            return this.each(function () {

                $(this).change(function () {
                    let $this = $(this);
                    let style = window.getComputedStyle(this)
                    let {fontWeight, fontSize, fontFamily} = style
                    let text = $this.find("option:selected").text();
                    let $demo = $("<span>").html(text).css({
                        "font-size": fontSize,
                        "font-weight": fontWeight,
                        "font-family": fontFamily,
                        "visibility": "hidden"
                    });
                    $demo.appendTo($this.parent());
                    let width = $demo.width();
                    $demo.remove();
                    $this.width(width + arrowWidth);

                }).change();

            });
        };
        $(this).closest('.navigation .bootstrap-select').resizeselect();
    })
}

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
    if (!dbid)
        return;
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
    getFieldByTableId4Popup(tableId, data);
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
                    if (o.fieldName) {
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
    var dbname = $('select.cs-database-name-list').find('option:selected').text();
    var tablename = $('select.cs-database-table-list').find('option:selected').text();
    getDataTableRowList(dbname, tablename, selectedField, data);
}

function getDataTableRowCount(dbname, tablename, dataCore) {


    var json = initJSON();
    if (dataCore) {
        json.kv = $.extend(json.kv, dataCore);
    }
    json.kv.entity = tablename;
    json.kv.entityDb = dbname;
    json.kv.isCountField = 'id';
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceIoCoreSelect",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            loadPageCountSelectBox(res.kv.countId);
            $('.querydatarowcount').html(res.kv.countId);
        }
    });
}

function loadPageCountSelectBox(rowCount) {
    var el = $('select.cs-pagination-page-count');
    el.html('');
    var ceil = Math.ceil(rowCount / per_page_here);
    var ctm = 1;
    for (let index = 0; index < ceil; index++) {
        var opt = $('<option>').text(ctm);
        if (ctm === parseInt(page_count_there)) {
            opt.attr('selected', 'selected');
        }
        el.append(opt);
        ctm++;
    }
    el.selectpicker('refresh');
}

function setLimitForDataFilter() {
    var data = {startLimit: 0, endLimit: 0};

    var startLimit = per_page_here * (page_count_there - 1);
    var endLimit = per_page_here * (page_count_there);

    startLimit = (startLimit < 0) ? 0 : startLimit;
    endLimit = (endLimit < 0) ? 25 : endLimit;

    data.startLimit = startLimit;
    data.endLimit = endLimit;


    return data;
}

function runSql() {
    $('#sqlEditorRunResult').html('Output');

    var query = $('#livesqlditor').find('textarea').val();

    if (!query) {
        $('#sqlEditorRunResult').html('SQL Query is empty');
    }

    var el = $('.cs-table-database-table-zad-list');
    $('.live-sql-error').text('');
    el.find('thead').html("");
    el.find('tbody').html("");


    var json = initJSON();



    json.kv.query = query;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmrunSelectSqlForEditor",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            AJAXCallFeedback(res);

            if (res.kv.err) {
               $('#sqlEditorRunResult').html(res.kv.err);
            }else{
                  getDataTableRowListDetails(0, {}, el, res);
            }

        },
        error: function (res) {
            $('#sqlEditorRunResult').html(JSON.stringify(res));
            $('.live-sql-error').text('No data found');
        }
    });
}

function getDataTableRowList(dbname, tablename, selectedField, dataCore) {
    var el = $('.cs-table-database-table-zad-list');
    $('.live-sql-error').text('');
    el.find('thead').html("");
    el.find('tbody').html("");

    getDataTableRowCount(dbname, tablename, dataCore);

    var limitData = setLimitForDataFilter();

    var json = initJSON();
    if (dataCore) {
        json.kv = $.extend(json.kv, dataCore);
    }
    json.kv = $.extend(json.kv, limitData);

    json.kv.entity = tablename;
    json.kv.entityDb = dbname;
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

            getDataTableRowListDetails(limitData.startLimit, dataCore, el, res);

        },
        error: function () {
            $('.live-sql-error').text('');
            $('.live-sql-error').text('No data found');
        }
    });
}

function getDataTableRowListDetails(startLimit, dataCore, el, res) {
    var keys = [];
    try {
        var keys = res.kv.selectedField.split(",");
    } catch (err) {
        keys = getFieldListByTableId();
    }

    var tr_th = $('<tr>').append($('<th>'));

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
    el.find('tbody').html('');

    var obj = [];
    try {
        obj = res.tbl[0].r;
    } catch (err) {
        el.find('tbody').html('No Data Found');
    }

    var idx = 1;
    for (var i in obj) {
        var tr = $('<tr>');
        var o = obj[i];

        tr.append($('<td>').text(startLimit + idx))
        for (var k in keys) {
            var col = keys[k];

            var td = $('<td>');
            td.text(o[col]);
            tr.append(td);
        }
        el.find('tbody').append(tr);
        idx++;
    }

    autoResizeOfFilterEditBox();
}

function autoResizeOfFilterEditBox() {
    $('.livesql-table-boxes input').each(function (ev) {
        $.fn.textWidth = function (text, font) {
            if (!$.fn.textWidth.ZadFakeEl)
                $.fn.textWidth.ZadFakeEl = $('<span>').hide().appendTo(document.body);
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
}

// SQL EDITOR SHOW
$(document).on("click", ".cs-sql-editor-run-btn", function (e) {
    $(this).closest('.cs-modal-box').find('.cs-sql-editor-run-btn').toggleClass('active');
    $(this).closest('.cs-modal-box').find(".app_editor_wrapper").show('slide', {
        direction: 'up'
    }, 200);
});

$(document).on("click", ".cs-sql-editor-run-btn.active", function (e) {
    $(this).closest('.cs-modal-box').find('.app_editor_wrapper').hide('slide', {
        direction: 'up'
    }, 200);
});


$(document).ready(function () {

    var aceEditorInstance = ace.edit("livesqlditor");
    aceEditorInstance.setTheme("ace/theme/sqlserver");
    aceEditorInstance.getSession().setMode("ace/mode/sql");

    var aceEditorInstance2 = ace.edit("livesqlditor2");
    aceEditorInstance2.setTheme("ace/theme/sqlserver");
    aceEditorInstance2.getSession().setMode("ace/mode/sql");

    window.draggingAceEditor = {};

    function makeAceEditorResizable(editor) {
        var id_editor = editor.container.id;
        var id_dragbar = id_editor + '_dragbar';
        var id_wrapper = id_editor + '_wrapper';
        var wpoffset = 0;
        window.draggingAceEditor[id_editor] = false;

        var action_mousedown = function (e) {
            e.preventDefault();

            window.draggingAceEditor[id_editor] = true;

            // Set editor opacity to 0 to make transparent so our wrapper div shows
            document.getElementById(id_editor).style.opacity = 0;

            document.addEventListener("mousemove", action_document_mousemove);
        };

        var action_document_mousemove = function (e) {
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
            document.getElementById(id_dragbar).style.opacity = 0.15;
        };

        document.getElementById(id_dragbar).addEventListener("mousedown", action_mousedown);

        var action_mouseup = function (e) {
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
    makeAceEditorResizable(aceEditorInstance2);

});











