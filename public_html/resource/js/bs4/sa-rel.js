/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


SADebug = {
    "BacklogId": "",
    LoadedBacklogsFromPart: [],
    LoadedBacklogsToPart: [],
    Lines: [],
    SetDrawLine: function (fromId, toId, title, relType) {
        var kv = {};
        kv.fromId = fromId;
        kv.toId = toId;
        kv.title = title;
        kv.relType = relType;
        SADebug.Lines.push(kv);
    },
    RemoveAllDrawLine: function () {
        $(".line_class").remove();
//        $('.customLineZad').remove();
    },
    DrawLines_old: function () {
        for (var i = 0; i < SADebug.Lines.length; i++) {
            try {
                var from = SADebug.Lines[i].fromId;
                var to = SADebug.Lines[i].toId;

                var fromDiv = document.getElementById(from);
                var toDiv = document.getElementById(to)
                SADebug.Connect(fromDiv, toDiv, "#0F0", 5);
            } catch (err) {
            }



        }
    },

    DrawLines: function () {
        for (var i = 0; i < SADebug.Lines.length; i++) {
            try {
                var from = SADebug.Lines[i].fromId;
                var to = SADebug.Lines[i].toId;



                SADebug.GetLineDivId4Drawing(from, to);

            } catch (err) {
            }
        }
    },
    CallGUI: function (backlogId) {
        if (backlogId.length < 3)
            return;
        SADebug.GUIFunction.Generate(backlogId);
        SADebug.RemoveAllDrawLine();
        SADebug.DrawLines();
    },

    DrawLineOnZoom: function () {
//        SADebug.RemoveAllDrawLine();
//        SADebug.DrawLines();
    },
    CallApi: function (apiId) {
        if (apiId.length < 3) {
            return;
        }

        var extApiList = (cr_project_desc_by_backlog[apiId])
                ? cr_project_desc_by_backlog[apiId]
                : [];

        for (var i in  extApiList) {
//                try {

            var extId = extApiList[i];
            var o = cr_project_desc[extId];

            if (o.fkRelatedApiId) {
                var body = SADebug.Pattern.API.GetPattern(o.fkRelatedApiId);
                var div3 = $("<div class='sa-cwr'>").append(body);

                $("#core_api_" + apiId).closest('div.sa-api-esas').find('.sa-dept-rww').first().append(div3);
                SADebug.SetDrawLine("core_api_" + apiId, "core_api_" + o.fkRelatedApiId, 'api_api');

                var apiCallId = o.fkRelatedApiId;
                SADebug.CallApiThread(apiCallId);
            }

        }





    },
    GetGuiDesign: function (backlogId) {
        if (backlogId.length < 3)
            return;


        var jsonZad = SAInput.toJSONByBacklog(backlogId);
        var canvasCSS = Component.ReplaceCSS(SACore.GetBacklogDetails(backlogId, 'param1'));
        var guiDesign = new UserStory().getGUIDesignHTMLPure(jsonZad);

        return guiDesign;
    },
    GUIFunction: {
        SelectFromBacklogId: function (inputId, apiId, backlogId) {
            if (SADebug.LoadedBacklogsFromPart.includes(apiId))
                return;

            var dyncId = makeId(10);
            var body = SADebug.Pattern.API.GetPattern(apiId, dyncId);
            $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c1').append(body);
            SADebug.LoadedBacklogsFromPart.push(apiId)

            SADebug.SetDrawLine("comp_id_" + inputId, "core_api_" + apiId, 'gui_select_from');


            var apiCallId = apiId;
            SADebug.CallApiThread(apiCallId);
        },
        GetFkDependentBacklogId: function (inputId, apiId, backlogId) {
            if (SADebug.LoadedBacklogsFromPart.includes(apiId))
                return;

            var body = SADebug.Pattern.API.GetPattern(apiId);
            $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c1').append(body);
            SADebug.LoadedBacklogsFromPart.push(apiId)

            SADebug.SetDrawLine("comp_id_" + inputId, "core_api_" + apiId, 'gui_select_from');

            var apiCallId = apiId;
            SADebug.CallApiThread(apiCallId);
        },
        SendToBacklogId: function (inputId, apiId, backlogId) {
            if (SADebug.LoadedBacklogsToPart.includes(apiId))
                return;

            var body = SADebug.Pattern.API.GetPattern(apiId);
            $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c3').append(body);
            SADebug.LoadedBacklogsToPart.push(apiId);

            SADebug.SetDrawLine("comp_id_" + inputId, "core_api_" + apiId, 'gui_send_to');

            var apiCallId = apiId;
            SADebug.CallApiThread(apiCallId);


        },
        GenerateInputActionRelation4Read: function (inputId, apiId, backlogId) {
            if (SADebug.LoadedBacklogsFromPart.includes(apiId))
                return;

            var body = SADebug.Pattern.API.GetPattern(apiId);
            $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c1').append(body);
            SADebug.LoadedBacklogsFromPart.push(apiId);

            SADebug.SetDrawLine("comp_id_" + inputId, "core_api_" + apiId, 'gui_select_from');

            var apiCallId = apiId;
            SADebug.CallApiThread(apiCallId);
        },
        GenerateInputActionRelation4CUD: function (inputId, apiId, backlogId) {
            if (SADebug.LoadedBacklogsToPart.includes(apiId))
                return;

            var body = SADebug.Pattern.API.GetPattern(apiId);
            $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c3').append(body);
            SADebug.LoadedBacklogsToPart.push(apiId);

            SADebug.SetDrawLine("comp_id_" + inputId, "core_api_" + apiId, 'gui_send_to');

            var apiCallId = apiId;
            SADebug.CallApiThread(apiCallId);
        },
        GenerateInputActionRelation: function (inputId, backlogId) {
            try {
                var eventList = cr_input_action_rel[inputId];
                for (var i = 0; i < eventList.length; i++) {
                    var relId = eventList[i];
                    var obj = cr_input_action_rel_list[relId];
                    var apiId = obj.fkApiId;

                    if (apiId) {

                        var apiAction = SACore.GetBacklogDetails(apiId, "apiAction");
                        if (apiAction === 'R') {
                            SADebug.GUIFunction.GenerateInputActionRelation4Read(inputId, apiId, backlogId);
                        } else if (apiAction !== 'R' && !SADebug.LoadedBacklogsToPart.includes(apiId)) {
                            SADebug.GUIFunction.GenerateInputActionRelation4CUD(inputId, apiId, backlogId);
                        }
                    }
                }
            } catch (err) {
            }
        },
        CallGuiThread: function (guiId) {
            var carrier = new Carrier();
            carrier.setBacklogId(guiId);


            if (!ifBacklogInputs4LoaderExistById(guiId)) {
                showProgress5();
                carrier.setExecwarder("_CallBacklogInputListIfNotExistAndForward");
                carrier.setApplier("SADebug.GUIFunction._FillGuiDivBody");
                carrier.I_am_Requirer();
            } else {
                carrier.setApplier("SADebug.GUIFunction._FillGuiDivBody");
                carrier.I_am_Execwarder();

            }

            SourcedDispatcher.Exec(carrier);
        },
        _FillGuiDivBody: function (carrier) {
            var guiId = carrier.getBacklogId();
            var guiDesign = SADebug.GetGuiDesign(guiId);
            $('#core_gui_' + guiId).closest('div.sa-gui-esas').find('.progressLoader').first().remove();
            $('#core_gui_' + guiId).closest('div.sa-gui-esas').find('.sa-gui-esas-body').html(guiDesign);
            SADebug.CallGUI(guiId);
        },
        GenerateDependentGui: function (guiId, backlogId) {
            var guiDesign = '';//SADebug.GetGuiDesign(guiId);

            var div3 = $("<div class='sa-cwr'>")
                    .append($('<div class="sa-gui-esas">')
                            .append($('<div class="progressLoader loaderTable">'))
                            .append($('<div class="sa-gui-rw sa-rw row">')
                                    .append($('<div class="sa-c1">'))
                                    .append($('<div class="sa-c2">')
                                            .attr("id", "core_gui_" + guiId)
                                            .append($('<div>')
                                                    .addClass("sa-gui-esas-body")
                                                    .append(guiDesign)
                                                    .addClass('row redirectClass gui-design')))
                                    .append($('<div class="sa-c3">'))
                                    )
                            .append($('<div class="sa-gui-dept-rw sa-rw">'))
                            )
                    ;
            $("#core_gui_" + backlogId).closest('div.sa-gui-esas').find('.sa-gui-dept-rw').first().append(div3);

            SADebug.GUIFunction.CallGuiThread(guiId);


//            SADebug.CallGUI(guiId);  


            SADebug.SetDrawLine("core_gui_" + backlogId, "core_gui_" + guiId, 'gui_gui');
//                        $('#SUS_IPO_GUI_Design').html(st);
//                        $('#SUS_IPO_GUI_Design').attr('bid', guiId);
//                        $('#SUS_IPO_GUI_Design').attr('bcode', makeId(10));

//                        $('.sa-main-c2').attr("id", "core_gui_" + SACore.GetCurrentBacklogId());
            //get element
//                        var elm = document.getElementById('SUS_IPO_GUI_Design');

            //fill selectbox after GUI Design
            //loadSelectBoxesAfterGUIDesign(elm);

            //init onload click and change events
            // initOnloadActionOnGUIDesign4OnClick(elm);
            // initOnloadActionOnGUIDesign4Onchange(elm);
        },
        Generate: function (backlogId) {
            var outputList = SACore.GetBacklogDetails(backlogId, "inputIds").split(',');
            for (var i in outputList) {
                try {
                    var oid = outputList[i];
                    oid = oid.trim();
                    var inputObj = SAInput.getInputObject(oid);


                    if (inputObj.selectFromBacklogId) {
                        SADebug.GUIFunction.SelectFromBacklogId(inputObj.id, inputObj.selectFromBacklogId, backlogId);
                    }

                    if (inputObj.fkDependentBacklogId) {
                        SADebug.GUIFunction.GetFkDependentBacklogId(inputObj.id, inputObj.fkDependentBacklogId, backlogId);
                    }


                    if (inputObj.sendToBacklogId) {
                        SADebug.GUIFunction.SendToBacklogId(inputObj.id, inputObj.sendToBacklogId, backlogId);
                    }

                    SADebug.GUIFunction.GenerateInputActionRelation(inputObj.id, backlogId);

                    //action = ,redirect,fill, popup
                    var guiId = inputObj.param1;
                    if (guiId) {
                        SADebug.GUIFunction.GenerateDependentGui(guiId, backlogId);
                    }
                } catch (err) {

                }
            }

        }
    },

    GetSelectFromApi: function (backlogId) {


    },
    CallApiThread: function (apiId) {
        var carrier = new Carrier();
        carrier.setBacklogId(apiId);


        $('#core_api_' + apiId).closest("div.sa-api-esas").prepend($('<div class="progressLoader loaderTable">'))

        if (!ifBacklogInputs4LoaderExistById(apiId)) {
            showProgress5();
            carrier.setExecwarder("_CallBacklogInputListIfNotExistAndForward");
            carrier.setApplier("SADebug._FillApiDivBody");
            carrier.I_am_Requirer();
        } else {
            carrier.setApplier("SADebug._FillApiDivBody");
            carrier.I_am_Execwarder();

        }

        SourcedDispatcher.Exec(carrier);
    },
    _FillApiDivBody: function (carrier) {
        var apiId = carrier.getBacklogId();
        var apiName = SACore.GetBacklogDetails(apiId, 'backlogName');

        var body = $('<div>')
                .append($('<span>').text(apiName))
                .append(" ")
                .append($('<span>')
                        .css("border-radius", "15px")
                        .css("padding", "2px 8px")
                        .css("background-color", "orange")
                        .text(GetApiActionTypeText(SACore.GetBacklogDetails(apiId, 'apiAction'))
                                )
                        )
                .append($('<span>')
                        .css("border-radius", "15px")
                        .css("padding", "2px 8px")
                        .css("background-color", "yellow")
                        .text(MapApiCallAsyncType(SACore.GetBacklogDetails(apiId, 'apiSyncRequest'))))



        $('#core_api_' + apiId)
                .closest("div.sa-api-esas")
                .find('.api-body')
                .first().html(body);

        $('#core_api_' + apiId)
                .closest("div.sa-api-esas")
                .find('.api-input-list')
                .first().html(SADebug.Pattern.API.GetInputList(apiId));

        $('#core_api_' + apiId)
                .closest("div.sa-api-esas")
                .find('.api-desc-list')
                .first().html(SADebug.Pattern.API.GetProcessDescriptionList(apiId));

        $('#core_api_' + apiId)
                .closest("div.sa-api-esas")
                .find('.api-output-list')
                .first().html(SADebug.Pattern.API.GetOutputList(apiId));

        $('#core_api_' + apiId).closest("div.sa-api-esas").find('.progressLoader').remove();

        SADebug.CallApi(apiId);
    },

    Pattern: {
        API: {
            GetPattern: function (apiId) {
                if (!apiId)
                    return "";

                //loadBacklogDetailsByIdIfNotExist(apiId);

                //var body = SACore.GetBacklogDetails(apiId, 'backlogName');

                var div = $('<div class="sa-api-esas">')
                        .append($('<div class="sa-rww">')
                                .append($('<div>')
                                        .addClass("sa-cw1"))
                                .append($('<div>')
                                        .addClass("sa-cw2 row")
                                        .attr("id", "core_api_" + apiId)
                                        //.append($('<br>').append('------------------------'))
                                        .append($('<h6>')
                                                .addClass("api-body")
                                                .css("cursor", "pointer")
                                                .attr("is_api", "1")
                                                .attr('onclick', "new UserStory().getStoryInfo('" + apiId + "',this)")
                                                .append('')
                                                .addClass(''))
                                        .append($('<div>')
                                                .addClass('row-fixed-width')
                                                .addClass('api-input-list')
                                                .append("<h6>Input(s)</h6>")
                                                .append(''))
                                        .append($("<div>")
                                                .addClass('row-fixed-width2')
                                                .addClass('api-desc-list')
                                                .append("<h6>Description(s)</h6>")
                                                .append(''))
                                        .append($("<div>")
                                                .addClass('row-fixed-width')
                                                .addClass('api-output-list')
                                                .append("<h6>Output(s)<h6>")
                                                .append(''))
                                        )
                                .append($('<div>')
                                        .addClass("sa-cw3"))
                                )
                        .append($('<div class="sa-dept-rww">'))
                        ;

                return div;

            },
            GetPattern_old: function (apiId, dyncId) {
                if (!apiId)
                    return "";

                loadBacklogDetailsByIdIfNotExist(apiId);

                var body = SACore.GetBacklogDetails(apiId, 'backlogName');

                var div = $('<div class="sa-api-esas">')
                        .append($('<div class="sa-rww">')
                                .append($('<div>')
                                        .addClass("sa-cw1"))
                                .append($('<div>')
                                        .addClass("sa-cw2 row")
                                        .attr("id", "core_api_" + apiId)
                                        //.append($('<br>').append('------------------------'))
                                        .append($('<h5>')
                                                .append(body)
                                                .addClass(''))
                                        .append($('<div>')
                                                .addClass('row-fixed-width input-text')
                                                .append("<h6>Input(s)</h6>")
                                                .append(SADebug.Pattern.API.GetInputList(apiId)))
                                        .append($("<div>")
                                                .addClass('row-fixed-width2')
                                                .append("<h6>Description(s)</h6>")
                                                .append(SADebug.Pattern.API.GetProcessDescriptionList(apiId)))
                                        .append($("<div>")
                                                .addClass('row-fixed-width output-text')
                                                .append("<h6>Output(s)<h6>")
                                                .append(SADebug.Pattern.API.GetOutputList(apiId)))
                                        )
                                .append($('<div>')
                                        .addClass("sa-cw3"))
                                )
                        .append($('<div class="sa-dept-rww">'))
                        ;

                return div;

            },
            GetInputList: function (apiId) {
                var outputList = SACore.GetBacklogDetails(apiId, "inputIds").split(',');
                var div = $('<div>');
                for (var i in outputList) {
                    try {
                        var oid = outputList[i];
                        oid = oid.trim();
                        var inputObj = SAInput.getInputObject(oid);

                        if (inputObj.inputType !== 'IN')
                            continue;

                        div.append(inputObj.inputName)
                                .append("<br>");


                    } catch (err) {

                    }
                }
                return div;
            },
            GetOutputList: function (apiId) {
                var outputList = SACore.GetBacklogDetails(apiId, "inputIds").split(',');
                var div = $('<div>');
                for (var i in outputList) {
                    try {
                        var oid = outputList[i];
                        oid = oid.trim();
                        var inputObj = SAInput.getInputObject(oid);

                        if (inputObj.inputType !== 'OUT')
                            continue;

                        var inputDBInfo = "";
                        var inputDBInfoSend = "";
                        if (inputObj.selectFromFieldId) {
                            var txt = SAEntity.Databases[inputObj.selectFromDbId].dbName + "." +
                                    SAEntity.Tables[inputObj.selectFromTableId].tableName + "." +
                                    SAEntity.Fields[inputObj.selectFromFieldId].fieldName;
                            inputDBInfo = $('<span>')
                                    .attr("title", "Select from DB")
//                                    .append($('<span>')
//                                            .css('padding', '2px 5px')
//                                            .css("border-radius", "15px")
//                                            .css("background-color", "yellow")
//                                            .text(" << "))
                                    .append(" ")
                                    .append($('<span>')
                                            .css('padding', '2px 5px')
                                            .css("border-radius", "15px")
                                            .css("background-color", "yellow")
                                            .text(txt))
                        }
                        if (inputObj.sendToFieldId) {
                            var txt = SAEntity.Databases[inputObj.sendToDbId].dbName + "." +
                                    SAEntity.Tables[inputObj.sendToTableId].tableName + "." +
                                    SAEntity.Fields[inputObj.sendToFieldId].fieldName;
                            inputDBInfoSend = $('<span>')
                                    .attr("title", "Send to DB")
//                                    .append($('<span>')
//                                            .css('padding', '2px 5px')
//                                            .css("border-radius", "15px")
//                                            .css("background-color", "orange")
//                                            .text(" >> "))
                                    .append(" ")
                                    .append($('<span>')
                                            .css('padding', '2px 5px')
                                            .css("border-radius", "15px")
                                            .css('padding', '2px 5px')
                                            .css("background-color", "orange")
                                            .text(txt))
                        }

                        div.append($('<span>').text(inputObj.inputName))
                                .append(" ")
                                .append(inputDBInfo)
                                .append(" ")
                                .append(inputDBInfoSend)
                                .append("<br>");
                    } catch (err) {

                    }
                }
                return div;
            },
            GetProcessDescriptionList: function (apiId) {

                var div = $("<div>").addClass('sa-desc-block');

                var extApiList = (cr_project_desc_by_backlog[apiId])
                        ? cr_project_desc_by_backlog[apiId]
                        : [];

                var idx = 1;
                for (var i in  extApiList) {
//                try {
                    var divZad = $('<div class="sa-desc-item">');
                    var extId = extApiList[i];
                    var o = cr_project_desc[extId];


                    if (SAFN.IsCommand(o.description)) {
                        divZad.append($("<span class='sa-desc-item-no'>").text(idx++));
                        divZad.append($('<div class="sa-desc-item-body">')
                                .attr("id", "core_api_desc_" + o.id)
                                .append(o.description)
                                .append(" (command)")
                                .append("<br>"));
                        div.append(divZad);

                        SADebug.SetDrawLine("core_api_desc_" + o.id, "core_api_" + apiId, 'api_desc_send_to');
                    } else {
                        if (o.fkRelatedScId) {
                            var fnType = cr_js_list[o.fkRelatedScId].fnType;
                            var fnName = cr_js_list[o.fkRelatedScId].fnCoreName;

                            if (fnType === 'core') {
                                divZad.append($("<span class='sa-desc-item-no'>").text(idx++));
                                divZad.append($('<div class="sa-desc-item-body">')
                                        .attr("id", "core_api_desc_" + o.id)
                                        .append(o.description)
                                        .append(" (JavaScript)")
                                        .append("<br>"));
                                div.append(divZad);

                                SADebug.SetDrawLine("core_api_desc_" + o.id, "core_api_" + apiId, 'api_desc_send_to');

                            } else if (fnType === 'java') {
                                divZad.append($("<span class='sa-desc-item-no'>").text(idx++));
                                divZad.append($('<div class="sa-desc-item-body">')
                                        .attr("id", "core_api_desc_" + o.id)
                                        .append(o.description)
                                        .append(" (Java)")
                                        .append("<br>"));
                                div.append(divZad);

                                SADebug.SetDrawLine("core_api_desc_" + o.id, "core_api_" + apiId, 'api_desc_send_to');
                            }
                        }
                        if (o.fkRelatedApiId) {
                            divZad.append($("<span class='sa-desc-item-no'>").text(idx++));
                            divZad.append($('<div class="sa-desc-item-body">')
                                    .attr("id", "core_api_desc_" + o.id)
                                    .append(o.description)
                                    .append(" (API)")
                                    .append("<br>"));
                            div.append(divZad);

                            SADebug.SetDrawLine("core_api_desc_" + o.id, "core_api_" + apiId, 'api_desc_send_to');
                        }
                    }
                }
//                alert(JSON.stringify(div.html()))
                return div;
            }
        },
        GUI: {}
    },
    GetLineDivId4Drawing: function (childBacklodId, parentBacklogId) {
        var userStory = 'this.userStories[childBacklodId]';
        var parentUserStory = 'this.parentUserStories[parentBacklogId]';
        var titlePure = userStory + " -  " + parentUserStory;
        var title = userStory + " - <br>" + parentUserStory;
        var id = makeId(10);
        var line = $('<div>')
                .attr('id', id)
                .attr('title', titlePure)
                .addClass('line_class')
//                .append(title)
                ;
        $('#SUS_IPO_GUI_Design1').append(line);

        var from = document.getElementById(childBacklodId);
        var to = document.getElementById(parentBacklogId);


        SADebug.AdjustLine(from, to, line[0]);
        return id;
    },
    AdjustLine: function (from, to, line) {

//        var t = 100;
        var t = 0;
        var dfT = $('#zzddff').offset().top;
        
        var dWidht = $(from).width()/2+ $(to).width()/2

        var fT = $(from).offset().top - dfT + from.offsetHeight ;
        var tT = $(to).offset().top - dfT + to.offsetHeight/2 ;
        var fL = $(from).offset().left  + from.offsetWidth / 2+40;
        var tL = $(to).offset().left+40;// + to.offsetWidth / 2;
        var CA = Math.abs(tT - fT);
        var CO = Math.abs(tL - fL);
        var H = Math.sqrt(CA * CA + CO * CO);
        var ANG = 180 / Math.PI * Math.acos(CA / H);
        if (tT > fT) {
            var top = (tT - fT) / 2 + fT;
        } else {
            var top = (fT - tT) / 2 + tT;
        }
        if (tL > fL) {
            var left = (tL - fL) / 2 + fL;
        } else {
            var left = (fL - tL) / 2 + tL;
        }

        if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
            ANG *= -1;
        }
        top -= H / 2;
        line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
        line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
        line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
        line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
        line.style["-transform"] = 'rotate(' + ANG + 'deg)';
        line.style.top = top + 'px';
        line.style.left = left + 'px';
        line.style.height = (H )+ 'px';
    },
    Connect: function (div1, div2, color, thickness) {
        var off1 = SADebug.GetOffset(div1);
        var off2 = SADebug.GetOffset(div2);
        // bottom right
        var x1 = off1.left + off1.width;
        var y1 = off1.top + off1.height;
        // top right
        var x2 = off2.left + off2.width;
        var y2 = off2.top;
        // distance
        var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2) - (thickness / 2);
        // angle
        var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
        // make hr
        var htmlLine = "<div class='customLineZad' id='" + makeId(5) + "'style='padding:0px; margin:0px; height:" + thickness +
                "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx +
                "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" +
                angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" +
                angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle +
                "deg);' />";
        //
//        alert(htmlLine);
        $('#gui_component_main_view').append(htmlLine);
    },

    GetOffset: function (el) {
        var rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset,
            width: rect.width || el.offsetWidth,
            height: rect.height || el.offsetHeight
        };
    },

}
