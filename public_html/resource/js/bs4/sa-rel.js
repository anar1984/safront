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
        $(".leader-line").remove();
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
    DrawLines: function () {
        for (var i = 0; i < SADebug.Lines.length; i++) {
            try {
                var from = SADebug.Lines[i].fromId;
                var to = SADebug.Lines[i].toId;

                new LeaderLine(
                        document.getElementById(from),
                        document.getElementById(to),
                        {
                            color: 'rgb(41,146,210)',
//                                    color: 'rgb(255,146,27)',
//                                    dash: true,
                            startPlug: 'square',
                            endPlug: 'arrow',
                            startSocket: 'right',
                            endSocket: 'left',

                        }
                );
            } catch (err) {
            }
        }
    },
    CallGUI: function (backlogId) {
        if (backlogId.length < 3)
            return;
        SADebug.GUIFunction.GetSelectFromApi(backlogId);
        SADebug.RemoveAllDrawLine();
        SADebug.DrawLines();
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
        $('#gui_component_main_view').append(line);
        SADebug.AdjustLine(childBacklodId, parentBacklogId, line[0]);
        return id;
    },
    AdjustLine: function (from, to, line) {

        var t = 100;
//        var t = 0;

        var fT = from.offsetTop + from.offsetHeight - from.clientTop - 80 / 2;
        var tT = to.offsetTop + to.offsetHeight - to.clientTop - 80 / 2;
        var fL = from.offsetLeft + from.offsetWidth / 2;
        var tL = to.offsetLeft + to.offsetWidth / 2;
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
        line.style.height = H + 'px';
    },
    DrawLineOnZoom: function () {
        SADebug.RemoveAllDrawLine();
        SADebug.DrawLines();
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

        GetSelectFromApi: function (backlogId) {

            var outputList = SACore.GetBacklogDetails(backlogId, "inputIds").split(',');
            for (var i in outputList) {
                try {
                    var oid = outputList[i];
                    oid = oid.trim();
                    var inputObj = SAInput.getInputObject(oid);


                    if (inputObj.selectFromBacklogId && !SADebug.LoadedBacklogsFromPart.includes(inputObj.selectFromBacklogId)) {

                        var body = SADebug.Pattern.API.GetPattern(inputObj.selectFromBacklogId);
                        $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c1').append(body);
                        SADebug.LoadedBacklogsFromPart.push(inputObj.selectFromBacklogId)
                        SADebug.CallApi(inputObj.selectFromBacklogId);
                        SADebug.SetDrawLine("core_gui_" + backlogId, "core_api_" + inputObj.selectFromBacklogId, 'gui_select_from');
                    }

                    if (inputObj.fkDependentBacklogId && !SADebug.LoadedBacklogsFromPart.includes(inputObj.fkDependentBacklogId)) {
                        var body = SADebug.Pattern.API.GetPattern(inputObj.fkDependentBacklogId);
                        $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c1').append(body);
                        SADebug.LoadedBacklogsFromPart.push(inputObj.fkDependentBacklogId)
                        SADebug.CallApi(inputObj.fkDependentBacklogId);
                        SADebug.SetDrawLine("core_gui_" + backlogId, "core_api_" + inputObj.fkDependentBacklogId, 'gui_select_from');
                    }


                    if (inputObj.sendToBacklogId && !SADebug.LoadedBacklogsToPart.includes(inputObj.sendToBacklogId)) {
                        var body = SADebug.Pattern.API.GetPattern(inputObj.selectFromBacklogId);
                        $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c3').append(body);
                        SADebug.LoadedBacklogsToPart.push(inputObj.sendToBacklogId);
                        SADebug.CallApi(inputObj.sendToBacklogId);
                        SADebug.SetDrawLine("core_gui_" + backlogId, "core_api_" + inputObj.sendToBacklogId, 'gui_send_to');
                    }

                    try {
                        var eventList = cr_input_action_rel[inputObj.id];
                        for (var i = 0; i < eventList.length; i++) {
                            var relId = eventList[i];
                            var obj = cr_input_action_rel_list[relId];
                            var eventType = obj.actionType;
                            var apiId = obj.fkApiId;


                            if (apiId) {
                                var body = SADebug.Pattern.API.GetPattern(apiId);
                                var apiAction = SACore.GetBacklogDetails(apiId, "apiAction");
                                if (apiAction === 'R' && !SADebug.LoadedBacklogsFromPart.includes(apiId)) {
                                    $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c1').append(body);
                                    SADebug.LoadedBacklogsFromPart.push(apiId);
                                    SADebug.CallApi(apiId);
                                    SADebug.SetDrawLine("core_gui_" + backlogId, "core_api_" + apiId, 'gui_select_from');
                                } else if (apiAction !== 'R' && !SADebug.LoadedBacklogsToPart.includes(apiId)) {
                                    $("#core_gui_" + backlogId).closest('div.sa-gui-rw').find('.sa-c3').append(body);
                                    SADebug.LoadedBacklogsToPart.push(apiId);
                                    SADebug.CallApi(apiId);
                                    SADebug.SetDrawLine("core_gui_" + backlogId, "core_api_" + apiId, 'gui_send_to');
                                }

                            }
                        }
                    } catch (err) {
                    }

                    //action = ,redirect,fill, popup
                    var guiId = inputObj.param1;
                    if (guiId) {
                        var guiDesign = SADebug.GetGuiDesign(guiId);

                        var div3 = $("<div class='sa-cwr'>")
                                .append($('<div class="sa-gui-esas">')
                                        .append($('<div class="sa-gui-rw sa-rw row">')
                                                .append($('<div class="sa-c1">'))
                                                .append($('<div class="sa-c2">')
                                                        .attr("id", "core_gui_" + guiId)
                                                        .append($('<div>')
                                                                .append(guiDesign)
                                                                .addClass('row redirectClass gui-design')))
                                                .append($('<div class="sa-c3">'))
                                                )
                                        .append($('<div class="sa-gui-dept-rw sa-rw">'))
                                        )
                                ;
                        $("#core_gui_" + backlogId).closest('div.sa-gui-esas').find('.sa-gui-dept-rw').first().append(div3);

                        SADebug.CallGUI(guiId);
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
                    }
                } catch (err) {

                }
            }

        }
    },
    Pattern: {
        API: {
            GetPattern: function (apiId) {
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
                                                .addClass('row-fixed-width')
                                                .append("<h6>Input(s)</h6>")
                                                .append(SADebug.Pattern.API.GetInputList(apiId)))
                                        .append($("<div>")
                                                .addClass('row-fixed-width2')
                                                .append("<h6>Description(s)</h6>")
                                                .append(SADebug.Pattern.API.GetProcessDescriptionList(apiId)))
                                        .append($("<div>")
                                                .addClass('row-fixed-width')
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

                        div.append(inputObj.inputName)
                                .append("<br>");


                    } catch (err) {

                    }
                }
                return div;
            },
            GetProcessDescriptionList: function (apiId) {

                var div = $("<div>").addClass('text-vertical');

                var extApiList = (cr_project_desc_by_backlog[apiId])
                        ? cr_project_desc_by_backlog[apiId]
                        : [];

                for (var i in  extApiList) {
//                try {

                    var extId = extApiList[i];
                    var o = cr_project_desc[extId];


                    if (SAFN.IsCommand(o.description)) {
                        div.append(o.description)
                                .append(" (command)")
                                .append("<br>")
                    } else {
                        if (o.fkRelatedScId) {
                            var fnType = cr_js_list[o.fkRelatedScId].fnType;
                            var fnName = cr_js_list[o.fkRelatedScId].fnCoreName;

                            if (fnType === 'core') {
                                div.append(o.description)
                                        .append(" (JavaScript)")
                                        .append("<br>")
                            } else if (fnType === 'java') {
                                div.append(o.description)
                                        .append(" (Java)")
                                        .append("<br>")
                            }
                        }
                        if (o.fkRelatedApiId) {
                            div.append(o.description)
                                    .append(" (API)")
                                    .append("<br>")
                        }
                    }
                }
                return div;
            }
        },
        GUI: {}
    }

}