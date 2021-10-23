var current_table_id = "";
var current_db_id = "";
var per_page_here = 25;
var page_count_there = 1;

$(document).on("change", "select.cs-database-name-list", function (e) {
    // $(this).closest('.ShowDatabaseTable').find('.cs-nav-select select.cs-database-table-list').html("");
    current_db_id = $(this).val();
    getTablesAndFields4Popup(this, $(this).val());
});

$(document).on("change", ".th-header-filter-search-by-column", function (e) {
    page_count_there = 1;
    current_active_table_element = this;
    getDataList();
});

function getDataList() {
    var data = getFilterDataLine();
    getFieldByTableId4PopupContainer(data);
}

$(document).on("click", ".cs-sql-editor-debug-btn", function (e) {
    setCoreContainer(this);
    runSql();
});

var current_active_table_element;

$(document).on("change", "select.cs-database-table-list", function (e) {
    var tableId = $(this).val();
    current_active_table_element = this;
    current_table_id = tableId;
    getFieldByTableId4Popup(tableId);
});

$(document).on("change", "select.cs-database-field-list", function (e) {
    alert('zad');
});

$(document).on("click", ".cs-filter-table-btn", function (e) {
    setCoreContainer(this);
    getCoreContainerLast().find("select.cs-database-table-list").change();
});

$(document).on("change", "select.cs-pagination-page-count", function (e) {
    page_count_there = $(this).val();
    getDataList();
    // sqlEditorPageLoader();
});

$(document).on("click", ".perpage-select .perpage-prev", function (e) {
    $(this)
            .closest(".perpage-select")
            .find(".cs-pagination-page-count option:selected")
            .prev()
            .attr("selected", "selected")
            .selectpicker("refresh");
    $(this)
            .closest(".perpage-select")
            .find("select.cs-pagination-page-count")
            .change();
});

$(document).on("click", ".perpage-select .perpage-next", function (e) {
    $(this)
            .closest(".perpage-select")
            .find(".cs-pagination-page-count option:selected")
            .next()
            .attr("selected", "selected")
            .selectpicker("refresh");
    $(this)
            .closest(".perpage-select")
            .find("select.cs-pagination-page-count")
            .change();
});

$(document).on("change", "select.cs-pagination-per-page", function (e) {
    per_page_here = $(this).val();
    getDataList();
});

$(document).on("click", "#ShowDatabaseTableBtn", function (e) {
    sqlEditorPageLoader();
});

$(document).on("click", ".ShowTableDataEntry", function () {
    var tableid = $(this).closest("td.tdSeqment").attr("pid");
    var dbid = $("#entityDatabaseList").val();

    $("#ShowDatabaseTable").modal("show");
    sqlEditorPageLoader();
    $(".cs-database-name-list").val(dbid).change();
    getTablesAndFields4Popup(dbid);
    $(".cs-database-table-list").val(tableid).change();
});

$(document).on("click", ".cs-reset-live-sql", function (e) {
    $(this)
            .closest(".ShowDatabaseTable")
            .find(".cs-nav-select select.cs-database-name-list")
            .html("");
    $(this)
            .closest(".ShowDatabaseTable")
            .find(".cs-nav-select select.cs-database-table-list")
            .html("");
    $(this)
            .closest(".ShowDatabaseTable")
            .find("select.cs-database-name-list, select.cs-database-table-list")
            .selectpicker("refresh");
    $(this)
            .closest(".ShowDatabaseTable")
            .find(".cs-table-database-table-zad-list")
            .find("thead")
            .html("");
    $(this)
            .closest(".ShowDatabaseTable")
            .find(".cs-table-database-table-zad-list")
            .find("tbody")
            .html("");
});

function sqlEditorPageLoader() {
    $(this)
            .closest(".ShowDatabaseTable")
            .find(".cs-nav-select select.cs-database-name-list")
            .html("");
    $(this)
            .closest(".ShowDatabaseTable")
            .find(".cs-nav-select select.cs-database-table-list")
            .html("");
    cs_loadDatabaseList2ComboEntityDetails();
    $(".sa-sqlboard-selectpicker").selectpicker("refresh");

    $(".navigation select").each(function (ev) {
        let arrowWidth = 60;

        $.fn.resizeselect = function (settings) {
            return this.each(function () {
                $(this)
                        .change(function () {
                            let $this = $(this);
                            let style = window.getComputedStyle(this);
                            let {fontWeight, fontSize, fontFamily} = style;
                            let text = $this.find("option:selected").text();
                            let $demo = $("<span>").html(text).css({
                                "font-size": fontSize,
                                "font-weight": fontWeight,
                                "font-family": fontFamily,
                                visibility: "hidden",
                            });
                            $demo.appendTo($this.parent());
                            let width = $demo.width();
                            $demo.remove();
                            $this.width(width + arrowWidth);
                        })
                        .change();
            });
        };
        $(this).closest(".navigation .bootstrap-select").resizeselect();

    });
}

function cs_loadDatabaseList2ComboEntityDetails() {
    var el = $("select.cs-database-name-list");
    loadSqlEditorDatabaseListCombo(el);
}

function loadSqlEditorDatabaseListCombo(el) {
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
                el.append($("<option>").append("Select Database"));
                for (var i in obj) {
                    var o = obj[i];
                    el.append($("<option>").val(o.id).append(o.dbName));
                }
                sortSelectBoxByCoreElement(el);
                el.selectpicker("refresh");
            } catch (err) {
            }
        },
    });
}

function getTablesAndFields4Popup(parentEl, dbid) {
    if (!dbid)
        return;
    var el = $(parentEl)
            .closest("div.sql-tab-body-container")
            .find("select.cs-database-table-list");
    el.html("").append($("<option>").append(" "));

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
                el.append($("<option>").append("Select Table Name"));
                for (var i in obj) {
                    var o = obj[i];
                    el.append(
                            $('<option class="data-table-option">')
                            .val(o.id)
                            .append(o.tableName)
                            );
                }
                el.selectpicker("refresh");
            } catch (err) {
            }
        },
    });

    //   $(this)
    //     .closest(".ShowDatabaseTable")
    //     .find(".cs-nav-select select.cs-database-table-list")
    //     .selectpicker("refresh");
}

function getFieldByTableId4PopupContainer(data) {
    var tableId = getCoreContainerLast().find("select.cs-database-table-list").val();
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
        },
    });
    return keys;
}

function getFieldByTableId4Popup(tableId, dataCore) {
    if (!tableId)
        return;

    var el = getCoreContainerLast()
            .find("select.cs-database-field-list");
    el.html("").append($("<option>").append(" "));


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
        async: true,
        success: function (res) {
            el.html("");

            var selectedField = "";
            try {
                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    selectedField += o.fieldName ? o.fieldName + "," : "";

                    el.append($('<option class="data-table-option">')
                            .val(o.id)
                            .attr('selected', 'true')
                            .append(o.fieldName)
                            );
                }
                getDataTableRowListContainer(selectedField, dataCore);
            } catch (err) {
            }
            el.selectpicker('refresh');
        },
    });
}

function getFilterDataLine() {
    var data = {};
    getCoreContainerLast().find(".th-header-filter-search-by-column").each(function (ev) {
        var key = $(this).attr("sa-data-name");
        var val = $(this).val();

        if (val) {
            data[key] = val;
        }
    });

    return data;
}

function getCoreContainer(el) {
    setCoreContainer(el);
    return $(el).closest("div.sql-tab-body-container");
}

function setCoreContainer(el) {
    current_active_table_element = el;

}

function getCoreContainerLast() {
    return $(current_active_table_element).closest("div.sql-tab-body-container");
}

function getDataTableRowListContainer(selectedField, data) {
    var dbname = getCoreContainerLast()
            .find("select.cs-database-name-list")
            .find("option:selected")
            .text();
    var tablename = getCoreContainerLast()
            .find("select.cs-database-table-list")
            .find("option:selected")
            .text();
    getDataTableRowList(dbname, tablename, selectedField, data);
}

function getDataTableRowCount(dbname, tablename, dataCore) {
    var json = initJSON();
    if (dataCore) {
        json.kv = $.extend(json.kv, dataCore);
    }
    json.kv.entity = tablename;
    json.kv.entityDb = dbname;
    json.kv.isCountField = "id";
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
            getCoreContainerLast().find(".querydatarowcount").html(res.kv.countId);
        },
    });
}

function loadPageCountSelectBox(rowCount) {
    var el = getCoreContainerLast().find("select.cs-pagination-page-count");
    el.html("");
    var ceil = Math.ceil(rowCount / per_page_here);
    var ctm = 1;
    for (let index = 0; index < ceil; index++) {
        var opt = $("<option>").text(ctm);
        if (ctm === parseInt(page_count_there)) {
            opt.attr("selected", "selected");
        }
        el.append(opt);
        ctm++;
    }

    el.selectpicker("refresh");
}

function setLimitForDataFilter() {
    var data = {startLimit: 0, endLimit: 0};

    var startLimit = per_page_here * (page_count_there - 1);
    var endLimit = per_page_here * page_count_there;

    startLimit = startLimit < 0 ? 0 : startLimit;
    endLimit = endLimit < 0 ? 25 : endLimit;

    data.startLimit = startLimit;
    data.endLimit = endLimit;

    return data;
}

function runSql() {
    getCoreContainerLast().find("#sqlEditorRunResult").html("Output");

    var query = getCoreContainerLast().find("#livesqlditor").val();

    if (!query) {
        getCoreContainerLast().find("#sqlEditorRunResult").html("SQL Query is empty");
    }

    var el = getCoreContainerLast().find(".cs-table-database-table-zad-list");
    getCoreContainerLast().find(".live-sql-error").text("");
    el.find("thead").html("");
    el.find("tbody").html("");

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
                getCoreContainerLast().find("#sqlEditorRunResult").html(res.kv.err);
            } else {
                getDataTableRowListDetails(0, {}, el, res);
            }
        },
        error: function (res) {
            getCoreContainerLast().find("#sqlEditorRunResult").html(JSON.stringify(res));
            getCoreContainerLast().find(".live-sql-error").text("No data found");
        },
    });
}

function getDataTableRowList(dbname, tablename, selectedField, dataCore) {
    var el = getCoreContainerLast().find(".cs-table-database-table-zad-list");
    getCoreContainerLast().find(".live-sql-error").text("");
    el.find("thead").html("");
    el.find("tbody").html("");

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
            $(".live-sql-error").text("");
            $(".live-sql-error").text("No data found");
        },
    });
}

function getDataTableRowListDetails(startLimit, dataCore, el, res) {
    var keys = [];
    try {
        var keys = res.kv.selectedField.split(",");
    } catch (err) {
        keys = getFieldListByTableId();
    }

    var tr_th = $("<tr>").append($("<th>"));

    for (var k in keys) {
        var col = keys[k];
        var _col = Utility.addUnderScoreToCamalStyle(col);
        var valSt = dataCore && dataCore[col] ? dataCore[col] : "";
        tr_th.append(
                $("<th>")
                .text(_col)
                .append($("<br>"))
                .append(
                        $("<input>")
                        .val(valSt)
                        .addClass("th-header-filter-search-by-column")
                        .attr("placeholder", _col)
                        .attr("sa-data-name", col)
                        )
                );
    }
    el.find("thead").append(tr_th);
    el.find("tbody").html("");

    var obj = [];
    try {
        obj = res.tbl[0].r;
    } catch (err) {
        el.find("tbody").html("No Data Found");
    }

    var idx = 1;
    for (var i in obj) {
        var tr = $("<tr>");
        var o = obj[i];

        tr.append($("<td>").text(startLimit + idx));
        for (var k in keys) {
            var col = keys[k];

            var td = $("<td>");
            td.text(o[col]);
            tr.append(td);
        }
        el.find("tbody").append(tr);
        idx++;
    }

    autoResizeOfFilterEditBox();
}

function autoResizeOfFilterEditBox() {
    $(".livesql-table-boxes input").each(function (ev) {
        $.fn.textWidth = function (text, font) {
            if (!$.fn.textWidth.ZadFakeEl)
                $.fn.textWidth.ZadFakeEl = $("<span>").hide().appendTo(document.body);
            $.fn.textWidth.ZadFakeEl.text(
                    text || this.val() || this.text() || this.attr("placeholder")
                    ).css("font", font || this.css("font"));
            return $.fn.textWidth.ZadFakeEl.width();
        };

        $(this)
                .on("input", function () {
                    var inputWidth = $(this).textWidth();
                    $(this).css({
                        width: inputWidth + 15,
                    });
                })
                .trigger("input");

        function inputWidth(CSelem, minW, maxW) {
            CSelem = $(this);
        }

        var SheyTargetElem = $(this);

        inputWidth(SheyTargetElem);
    });
}

// SQL EDITOR SHOW
$(document).on("click", ".cs-sql-editor-run-btn", function (e) {
    setCoreContainer(this);
    getCoreContainerLast().find(".cs-sql-editor-run-btn")
            .toggleClass("active");
    getCoreContainerLast().find(".app_editor_wrapper")
            .show("slide", {direction: "up", }, 200);
});

$(document).on("click", ".cs-sql-editor-run-btn.active", function (e) {
    setCoreContainer(this);
    getCoreContainerLast().find(".app_editor_wrapper")
            .hide("slide", {direction: "up", }, 200);
});

// LOAD SQL BUTTON
$(document).on("click", ".cs-sql-editor-debug-load-btn", function (e) {
    $(this).closest(".cs-modal-box").find(".cs-sql-editor-debug-load-btn").toggleClass("active");
    $(this).closest(".cs-modal-box").find(".sql-editor-load-box").show();
});

$(document).on("click", ".cs-sql-editor-debug-load-btn.active", function (e) {
    $(this).closest(".cs-modal-box").find(".sql-editor-load-box").hide();
});
// SAVE SQL BUTTON
$(document).on("click", ".cs-sql-editor-debug-save-btn", function (e) {
    $(this).closest(".cs-modal-box").find(".cs-sql-editor-debug-save-btn").toggleClass("active");
    $(this).closest(".cs-modal-box").find(".sql-editor-save-input-box").show();
});

$(document).on("click", ".cs-sql-editor-debug-save-btn.active", function (e) {
    $(this).closest(".cs-modal-box").find(".sql-editor-save-input-box").hide();
});

$(document).on("click", ".sql-editor-save-btn", function (e) {
    var sql_name = $(".sql-editor-save-input").val();
    var sql_command = $(".ace_text-input").val();
    localStorage.setItem('sql_name', sql_name);
    localStorage.setItem('sql_command', sql_command);
});


// $(document).ready(function () {

//   var aceEditorInstance = ace.edit("livesqlditor");
//   aceEditorInstance.setTheme("ace/theme/sqlserver");
//   aceEditorInstance.getSession().setMode("ace/mode/sql");

//  window.draggingAceEditor = {};

//   function makeAceEditorResizable(editor) {
//     var id_editor = editor.container.id;
//     var id_dragbar = id_editor + "_dragbar";
//     var id_wrapper = id_editor + "_wrapper";
//     var wpoffset = 0;
//     window.draggingAceEditor[id_editor] = false;

//     var action_mousedown = function (e) {
//       e.preventDefault();

//       window.draggingAceEditor[id_editor] = true;

//       // Set editor opacity to 0 to make transparent so our wrapper div shows
//       document.getElementById(id_editor).style.opacity = 0;

//       document.addEventListener("mousemove", action_document_mousemove);
//     };

//     var action_document_mousemove = function (e) {
//       var _editor = document.getElementById(id_editor);
//       var rect = _editor.getBoundingClientRect();

//       var rsl = {
//         top: rect.top + document.body.scrollTop,
//       };

//       var top_offset = rsl.top - wpoffset;

//       var actualY = e.pageY - wpoffset;

//       // editor height
//       var eheight = actualY - top_offset;

//       // Set wrapper height
//       document.getElementById(id_wrapper).style.height = eheight;

//       // Set dragbar opacity while dragging (set to 0 to not show)
//       document.getElementById(id_dragbar).style.opacity = 0.15;
//     };

//     document
//       .getElementById(id_dragbar)
//       .addEventListener("mousedown", action_mousedown);

//     var action_mouseup = function (e) {
//       if (window.draggingAceEditor[id_editor]) {
//         var ctx_editor = document.getElementById(id_editor);

//         var rect = ctx_editor.getBoundingClientRect();

//         var rsl = {
//           top: rect.top + document.body.scrollTop,
//         };

//         var actualY = e.pageY - wpoffset;
//         var top_offset = rsl.top - wpoffset;
//         var eheight = actualY - top_offset;

//         document.removeEventListener("mousemove", action_document_mousemove);

//         // Set dragbar opacity back to 1
//         document.getElementById(id_dragbar).style.opacity = 1;

//         // Set height on actual editor element, and opacity back to 1
//         ctx_editor.style.height = eheight + "px";
//         ctx_editor.style.opacity = 1;

//         // Trigger ace editor resize()
//         editor.resize();

//         window.draggingAceEditor[id_editor] = false;
//       }
//     };

//     document.addEventListener("mouseup", action_mouseup);
//   }

//   //makeAceEditorResizable(aceEditorInstance);

// });

// SQL BOARD
function startSqlStory() {
    $("select.sqlboard-database-select").selectpicker();

    function cs_loadDatabaseListBoardDetails() {
        var el = $("select.sqlboard-database-select");
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
                    el.append($("<option>").append("Select Database"));
                    for (var i in obj) {
                        var o = obj[i];
                        el.append($("<option>").val(o.id).append(o.dbName));
                    }
                    el.selectpicker("refresh");
                } catch (err) {
                }
            },
        });
    }
    $(".sqlboard-wrapper").each(function (e) {
        cs_loadDatabaseListBoardDetails(e);
    });

    $(document).on("change", "select.sqlboard-database-select", function (e) {
        current_db_id = $(this).val();
        getTablesAndFields4PopupBoard($(this).val());
    });

    function getTablesAndFields4PopupBoard(dbid) {
        if (!dbid)
            return;
        var ul = $(".sqlboard-table-list");
        ul.html("");
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
                ul.html("");
                try {
                    var obj = res.tbl[0].r;
                    for (var i in obj) {
                        var o = obj[i];
                        ul.append(
                                $("<li>")
                                .attr("navtableboard", o.id)
                                .append($("<span>").append(o.tableName))
                                );
                    }
                } catch (err) {
                }
            },
        });
    }

    $(".cs-search-table-board").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".sqlboard-table-list *").filter(function () {
            let item = $(this).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(item);
        });
    });

    $("input.cs-search-table-board[type=search]").on("search", function () {
        $(".sqlboard-table-list *").removeAttr("style");
    });

    $(".sqlboard-wrapper").each(function (e) {
        $(".sql-board-tab-list").html("");
        $(".sql-board-tab-content").html("");
        $(".sql-board-tab-list").append(
                '<li class="list-add-boardtab"><button class="btn add-boardtab-btn">+</button></li>'
                );
    });
}

var num = 0;
$(document).on("dblclick", ".sqlboard-table-list>li", function (e) {
    n = num++;
    var tabs_board_id = makeId(10);
    var tabname = $(this).find("span").text();
    $(".list-add-boardtab").remove();

    var tab = $(".sql-board-tab-list");
    tab.append(
            $("<li>")
            .addClass("nav-item")
            .attr("role", "presentation")
            .append(
                    $("<a>")
                    .addClass("nav-link ")
                    .attr("id", tabs_board_id + "-tab")
                    .attr("csid", tabs_board_id)
                    .attr("data-toggle", "tab")
                    .attr("href", "#" + tabs_board_id)
                    .attr("role", "tab")
                    .append("Tab " + n + "-" + tabs_board_id)
                    .append(
                            '<span class="close-boardtab-btn"><i class="fas fa-times"></i></span>'
                            )
                    )
            );
    tab.append(
            '<li class="list-add-boardtab"><button class="btn add-boardtab-btn">+</button></li>'
            );
    var tabcontent = $(".sql-board-tab-content");
    var ct = tabcontent.find("div").length;
    tabcontent.append(
            $("<div>")
            .addClass("tab-pane fade")
            .addClass(ct === 0 ? "active show" : "")
            .attr("id", tabs_board_id)
            .attr("role", "tabpanel")
            .append($("<div>").html("Content " + tabname))
            );
    $(".sql-board-tab-list li:nth-last-child(-n+2) a").click();
});

$(document).on("click", ".add-boardtab-btn", function (e) {
    SQLBoardTab.Tabulation.Init();
});

$(document).on("click", ".close-boardtab-btn", function (e) {
    var csid = $(this).closest("li a").attr("csid");
    var elm = $(this).closest("li");
    $(this)
            .closest(".sqlboard-main")
            .find(".sql-board-tab-content #" + csid)
            .remove();
    if (elm.find("a").hasClass("active")) {
        elm.prev().find("a").click();
    }

    elm.remove();
});

var SQLBoardTab = {
    Tabulation: {
        Init: function () {
            var tabs_board_id = makeId(10);
            $(".list-add-boardtab").remove();
            var tab = $(".sql-board-tab-list");
            tab.append(SQLBoardTab.Tabulation.GenerateHeader(tabs_board_id));
            tab.append(
                    '<li class="list-add-boardtab"><button class="btn add-boardtab-btn">+</button></li>'
                    );
            var tabcontent = $(".sql-board-tab-content");
            var tab_count = tabcontent.find("div").length;
            var body = SQLBoardTab.Tabulation.GenerateBody(tabs_board_id, tab_count);
            tabcontent.append(body);
            var el = $("#" + tabs_board_id).find("select.cs-database-name-list");
            loadSqlEditorDatabaseListCombo(el);
            $('#' + tabs_board_id).find('.sa-sqlboard-selectpicker').selectpicker('refresh');
            $(".sql-board-tab-list li:nth-last-child(-n+2) a").click();
        },
        GenerateHeader: function (tabs_board_id) {
            return $("<li>")
                    .addClass("nav-item")
                    .attr("role", "presentation")
                    .append(
                            $("<a>")
                            .addClass("nav-link ")
                            .attr("id", tabs_board_id + "-tab")
                            .attr("csid", tabs_board_id)
                            .attr("data-toggle", "tab")
                            .attr("href", "#" + tabs_board_id)
                            .attr("role", "tab")
                            .append("Tab -" + tabs_board_id)
                            .append(
                                    '<span class="close-boardtab-btn"><i class="fas fa-times"></i></span>'
                                    )
                            );
        },
        GenerateBody: function (tabs_board_id, tab_count) {
            var singleTabBody = SQLBoardTab.Tabulation.GetSingleTabBody();
            return $("<div>")
                    .addClass("tab-pane fade")
                    .addClass("sql-tab-body-container")
                    .addClass(tab_count === 0 ? "active show" : "")
                    .attr("id", tabs_board_id)
                    .attr("role", "tabpanel")
                    .append($("<div>").html(singleTabBody));
        },
        GetSingleTabBody: function () {
            var body = $("#sqlTabBodyOriginal").html();
            return body;
        },
    },
};