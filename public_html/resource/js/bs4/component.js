function ComponentInfo() {
    this.showProperties = !0, this.isFromTableNew = !1, this.fkInputTableId = "", this.inputType = "", this.orderNo = "", this.label = "", this.tableName = "", this.componentType = "", this.secondContetn = "", this.content = "", this.cellNo = "6", this.param1 = "", this.containerCSS = "", this.css = "", this.isFromTable = !1, this.tableRowId = 0, this.tableHeader = "", this.id = "", this.isDragable = !1, this.withLabel = !0, this.description = "", this.hasOnClickEvent = !0, this.isLabelInTop = !0, this.inputTable = "", this.addTooltip = !0, this.action = "", this.inSection = "", this.event = "", this.relatedSUS = "", this.pureDescription = "", this.sequence = [], this.rowNo = ""
}
var masTab = {
        dependingID: {},
        addDeend: function (t, e) {
            this.dependingID[t] = e
        }
    },
    Component = {
        FillComponentInfo: function (t, e) {
            t.fkInputTableId = replaceTags(e.fkRelatedCompId), t.id = replaceTags(e.id), t.inputType = replaceTags(e.inputType), t.cellNo = replaceTags(e.cellNo), t.tableName = replaceTags(e.tableName), t.componentType = replaceTags(e.componentType), t.orderNo = replaceTags(e.orderNo), t.label = replaceTags(e.inputName), t.content = replaceTags(e.inputContent), t.param1 = replaceTags(e.param1), t.containerCSS = replaceTags(e.param2), t.css = replaceTags(e.param4) + ";" + replaceTags(e.param3), t.event = replaceTags(e.inputEvent), t.action = replaceTags(e.action), t.inSection = replaceTags(e.section), t.relatedSUS = replaceTags(e.param1), t.description = "";
            try {
                t.description = (new UserStory).setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc4Select(e)
            } catch (n) {
                t.description = (new UserStory).setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc(e)
            }
            try {
                t.pureDescription = SAInputDesc.getDescriptionByIn(e.id)
            } catch (n) {
                t.pureDescription = replaceTags(e.description)
            }
            try {
                t.inputTable = replaceTags(e.inputTable)
            } catch (e) {
                t.inputTable = ""
            }
        },
        GetComponentHtmlNew: function (t) {
            t.componentType = replaceTags(t.componentType), t.content = replaceTags(t.content), t.css = replaceTags(Component.ReplaceCSS(t.css)), t.label = replaceTags(t.label), t.tableHeader = t.label;
            t.content;
            t.label = "hlink" !== t.componentType && !0 === t.isFromTable ? "" : t.label, t.content = !1 === t.isFromTableNew && !0 === t.isFromTable && "txa" !== t.componentType && "cmb" !== t.componentType && "mcmb" !== t.componentType && "rbtn" !== t.componentType && "cbox" !== t.componentType && "btn" !== t.componentType && "hlink" !== t.componentType ? "cell_" + t.tableRowId : t.content;
            var e = "";
            return "IN" === t.inputType || "GUI" === t.inputType ? e += this.GetComponentHtlmByType(t) : "TBL" === t.inputType || "tbl" === t.inputType ? e += this.InputTable(t) : "TAB" === t.inputType || "tab" === t.inputType ? e += this.InputTab(t) : "GRP" === t.inputType && (e += this.Group(t)), e
        },
        GetComponentHtlmByType: function (t) {
            var e = "";
            switch (t.componentType) {
                case "txt":
                    e += Component.EditBox(t);
                    break;
                case "txa":
                    e += Component.TextArea(t);
                    break;
                case "cmb":
                    e += Component.SelectBox(t);
                    break;
                case "mcmb":
                    e += Component.MultiSelectBox(t);
                    break;
                case "rbtn":
                    e += Component.RadioButton(t);
                    break;
                case "cbox":
                    e += Component.CheckBox(t);
                    break;
                case "date":
                    e += Component.Date(t);
                    break;
                case "time":
                    e += Component.Time(t);
                    break;
                case "lbl":
                    e += Component.Label(t);
                    break;
                case "irbtn":
                    e += Component.InnerRadioButton(t);
                    break;
                case "icbox":
                    e += Component.InnerCheckBox(t);
                    break;
                case "iedit":
                    e += Component.InnerEditBox(t);
                    break;
                case "hr":
                    e += Component.InnerLine(t);
                    break;
                case "btn":
                    e += Component.Button(t);
                    break;
                case "hdn":
                    e += Component.Hidden(t);
                    break;
                case "hcrr":
                    e += Component.HiddenCarrier(t);
                    break;
                case "sctn":
                    e += Component.Section(t);
                    break;
                case "fhtml":
                    e += Component.FreeHtml(t);
                    break;
                case "fcomp":
                    e += Component.FreeComponent(t);
                    break;
                case "icon":
                    e += Component.Icon(t);
                    break;
                case "tab":
                    e += Component.Tab(t);
                    break;
                case "file":
                    e += Component.FilePicker(t);
                    break;
                case "hlink":
                    e += Component.Hiperlink(t);
                    break;
                case "img":
                    e += Component.Image(t);
                    break;
                case "ytube":
                    e += Component.Youtube(t);
                    break;
                default:
                    e += Component.EditBox(t)
            }
            return e
        },
        ComponentEvent: {
            Init: function (t, e) {
                Component.ComponentEvent.addClassToElement(t, e), Component.ComponentEvent.addAttrToElement(t, e), Component.ComponentEvent.addEventToElement(t, e), $(t).addClass("component-input-class").attr("row-no", e.rowNo).attr("pdid", e.id), Component.ComponentEvent.addId2Component(t, e), Component.ComponentEvent.setPureEventByDescription(t, e), "close" === e.action ? Component.ComponentEvent.getCloseEvent(t) : "popup" === e.action ? Component.ComponentEvent.getPopupEvent(t, e) : "redirect" === e.action ? Component.ComponentEvent.getRedirectEvent(t, e) : "fill" === e.action ? Component.ComponentEvent.getFillEvent(t, e) : "save" === e.action ? (Component.ComponentEvent.getCloseEvent(t), Component.ComponentEvent.getSaveEvent(t, e)) : "delete" === e.action && Component.ComponentEvent.getDeleteEvent(t, e)
            },
            addClassToElement: function (t, e) {
                try {
                    var n = cr_comp_input_classes[e.id];
                    if (n)
                        for (var a = n.split(","), o = 0; o < a.length; o++) {
                            var p = a[o],
                                l = cr_gui_classes[p].className;
                            l = l.replace(".", ""), t.addClass(l), "loadLivePrototype" !== global_var.current_modal || "sa-onloadclick" !== l && "sa-onloadchange" !== l && "sa-onloadclick-async" !== l && "sa-onloadchange-async" !== l || t.addClass("init-on-loader")
                        }
                } catch (t) {}
            },
            addAttrToElement: function (t, e) {
                try {
                    for (var n = cr_input_comp_attribute[e.id], a = 0; a < n.length; a++) {
                        var o = n[a],
                            p = Object.keys(o)[0],
                            l = o[p];
                        t.attr(p, l)
                    }
                } catch (t) {}
            },
            addEventToElement: function (t, e) {
                try {
                    for (var n = cr_input_action_rel[e.id], a = 0; a < n.length; a++) {
                        var o = n[a],
                            p = cr_input_action_rel_list[o],
                            l = p.actionType,
                            s = p.fkApiId;
                        t.attr(l + "_trigger_id", s), t.attr(l, "triggerAPI(this,'" + s + "')")
                    }
                } catch (t) {}
            },
            setPureEventByDescription: function (t, e) {
                try {
                    if (e.pureDescription.includes("fn_(isnoteditable)") && t.prop("disabled", !0), e.pureDescription.includes("fn_(isreadonly)") && t.prop("readonly", !0), e.pureDescription.includes("fn_(Placeholderis)")) {
                        var n = getParamFromFnline(e.pureDescription, "fn_(Placeholderis)", "Placeholderis");
                        t.prop("placeholder", n)
                    }
                    if (e.pureDescription.includes("fn_(Defaultvalueis)")) {
                        n = getParamFromFnline(e.pureDescription, "fn_(Defaultvalueis)", "defaultval");
                        t.attr("value", n)
                    }
                } catch (t) {}
            },
            addId2Component: function (t, e) {
                t.attr("id", "comp_id_" + e.id)
            },
            getEventLine: function (t) {
                return t.event + "=''"
            },
            getCloseEvent: function (t) {
                t.attr("data-dismiss", "modal")
            },
            getPopupEvent: function (t, e) {
                try {
                    t.attr("onclick", "new UserStory().setGUIComponentButtonGUIModal('" + e.relatedSUS + "',this)")
                } catch (t) {}
            },
            getRedirectEvent: function (t, e) {
                try {
                    t.attr("onclick", "new UserStory().setGUIComponentRedirectGUIModal(this,'" + e.relatedSUS + "',event)")
                } catch (t) {}
            },
            getFillEvent: function (t, e) {
                try {
                    t.attr("onclick", "new UserStory().setGUIComponentFillGUIModal(this,'" + e.relatedSUS + "','" + e.inSection + "')")
                } catch (t) {}
            },
            getSaveEvent: function (t) {
                try {
                    t.attr("onclick", "new UserStory().setGUIComponentSaveGUIModal(this,event)")
                } catch (t) {}
            },
            getDeleteEvent: function (t) {
                try {
                    t.attr("onclick", "new UserStory().setGUIComponentDeleteGUIModal(this)")
                } catch (t) {}
            }
        },
        ContainerDiv: function (t) {
            t.cellNo || (t.cellNo = 12);
            var e = $("<div></div>").attr("data-toggle", "tooltip").attr("orderNo", t.orderNo).attr("style", Component.ReplaceCSS(t.containerCSS)).attr("id", t.id).attr("pid", t.id).addClass("loadLivePrototype" === global_var.current_modal ? "draggable" : "").addClass("loadLivePrototype" === global_var.current_modal ? "resize1" : "").addClass(t.addTooltip ? "tooltipMan" : "").addClass("component-class").addClass("component-container-dashed").addClass("col-lg-" + t.cellNo);
            "loadLivePrototype" === global_var.current_modal && e.attr("ondragover", "allowDrop(event)").attr("ondragstart", "drag(event)").attr("ondrop", "drop(event)");
            try {
                var n = cr_cont_input_classes[t.id];
                if (n)
                    for (var a = n.split(","), o = 0; o < a.length; o++) {
                        var p = a[o],
                            l = cr_gui_classes[p].className;
                        l = l.replace(".", ""), e.addClass(l);
                        var s = cr_gui_classes[p].classBody;
                        try {
                            if (s.length > 1)
                                for (var r = s.split(/\r*\n/), i = 0; i < r.length; i++) try {
                                    var d = r[i].split(":")[0];
                                    u = (u = r[i].split(":")[1]).replace(";", ""), e.css(d, u)
                                } catch (t) {}
                        } catch (t) {}
                    }
            } catch (t) {}
            try {
                for (a = cr_input_cont_attribute[t.id], o = 0; o < a.length; o++) {
                    var c = a[o],
                        u = c[d = Object.keys(c)[0]];
                    e.attr(d, u)
                }
            } catch (t) {}
            return t.hasOnClickEvent && (e.attr("onclick", "loadLivePrototype" === global_var.current_modal ? "new UserStory().setInputByGUIComponent('" + t.id + "')" : ""), "loadLivePrototype" === global_var.current_modal && e.addClass("hover-prototype-selector").append($("<div>").addClass("tool_element_edit").attr("comp-Id", t.id).append(`<div style='display:inline-block;' class="dropdown">\n                        <span class="figureAddbtn" onclick="fillRelatedApi4InputEvent('${t.id}')" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                        <i class="fab fa-asymmetrik" aria-hidden="true"></i>\n                        </span>\n                        <div class="dropdown-menu dropdown-menu-large-btn" aria-labelledby="dropdownMenuButton">\n                        <div class="row animation-block-for-find">                      \n                        <div class="col-12">\n                            <fieldset class="border p-2">\n                                <legend class="w-auto w-auto-man">\n                                    Event Relation\n                                </legend>\n                    \n                                Event<br>\n                                <select class=" form-control input_event_type">\n                                    <option value="onclick">onclick</option>\n                                    <option value="onchange">onchange</option>\n                                    <option value="ondblclick">ondblclick</option>\n                                </select><br>\n                    \n                                Related API<br>\n                                <select  class="form-control input_event_related_api">                                                        \n                                </select>\n                    \n                                <i onclick='insertNewInputActionRel(this)' class="fa fa-plus"></i>\n                                <br><br>\n                                <table style='border: 1px solid #dee2e6; width:100%;'>\n                                    <thead>\n                                        <tr>\n                                            <th>Event</th>\n                                            <th>API</th>\n                                            <th></th>\n                                        </tr>\n                                    </thead>\n                                    <tbody class='input_event_related_api_table_list_body'>\n                    \n                                    </tbody>\n                                </table>\n                            </fieldset>\n                        </div>\n                    \n                    \n                    </div>\n                        </div>\n                      </div>`).append('<div style=\'display:inline-block;\' class="dropdown">\n                        <span class="figureAddbtn"  type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                        <i class="fas fa-paint-brush"></i>\n                        </span>\n                        <div class="dropdown-menu dropdown-menu-large-btn" aria-labelledby="dropdownMenuButton1">\n                        <div class="row animation-block-for-find">                      \n                        <div class="col-12 "  style="display:flex;flex-wrap:wrap">\n                            <fieldset class="border p-2">\n                            <legend class="w-auto w-auto-man">\n                                background-color\n                            </legend>\n                            <div class="figureBgSelectOption">\n                            <button data-bgcolorspan="transparent" style="background-color: transparent;" class="ColopickerSpanLine  change-color-component gactive"><i class="fas fa-times"></i></button>\n                            <button data-bgcolorspan="#007bff" style="background-color: #007bff;" class="ColopickerSpanLine  change-color-component "></button>\n                            <button data-bgcolorspan="#6c757d" style="background-color: #6c757d;" class="ColopickerSpanLine change-color-component "></button>\n                            <button data-bgcolorspan="#28a745" style="background-color: #28a745;" class="ColopickerSpanLine change-color-component"></button>\n                            <button data-bgcolorspan="#dc3545" style="background-color: #dc3545;" class="ColopickerSpanLine change-color-component"></button>\n                            <button data-bgcolorspan="#ffc107" style="background-color: #ffc107;" class="ColopickerSpanLine change-color-component"></button>\n                            <button data-bgcolorspan="#17a2b8" style="background-color: #17a2b8;" class="ColopickerSpanLine change-color-component "></button>\n                            <button data-bgcolorspan="#343a40" style="background-color: #343a40;" class="ColopickerSpanLine change-color-component"></button>\n                 \n                            </div>\n                            </fieldset>\n                            <fieldset class="border p-2">\n                            <legend class="w-auto w-auto-man">\n                                font-color\n                            </legend>\n                            <div class="figureBgSelectOption">\n                            <button data-bgcolorspan="black" style="background-color: transparent;" class="ColopickerSpanLine  change-font-component gactive"><i class="fas fa-times"></i></button>\n                            <button data-bgcolorspan="#007bff" style="background-color: #007bff;" class="ColopickerSpanLine  change-font-component "></button>\n                            <button data-bgcolorspan="#6c757d" style="background-color: #6c757d;" class="ColopickerSpanLine change-font-component "></button>\n                            <button data-bgcolorspan="#28a745" style="background-color: #28a745;" class="ColopickerSpanLine change-font-component"></button>\n                            <button data-bgcolorspan="#dc3545" style="background-color: #dc3545;" class="ColopickerSpanLine change-font-component"></button>\n                            <button data-bgcolorspan="#ffc107" style="background-color: #ffc107;" class="ColopickerSpanLine change-font-component"></button>\n                            <button data-bgcolorspan="#17a2b8" style="background-color: #17a2b8;" class="ColopickerSpanLine change-font-component "></button>\n                            <button data-bgcolorspan="#343a40" style="background-color: #343a40;" class="ColopickerSpanLine change-font-component"></button>\n                 \n                            </div>\n                            </fieldset>\n                            <fieldset class=" col-6 border p-2">\n                            <legend class="w-auto w-auto-man">\n                            text-align\n                        </legend>\n                            <div class="figureBgSelectOption">\n                           \n                            <button data-bgalign="left"  class="ColopickerSpanLine  change-align-component "><i class="fas fa-align-left"></i></button>\n                            <button data-bgalign="center"  class="ColopickerSpanLine  change-align-component "><i class="fas fa-align-center"></i></button>\n                            <button data-bgalign="right"  class="ColopickerSpanLine change-align-component "><i class="fas fa-align-right"></i></button>\n                           \n                 \n                            </div>\n                            </fieldset>\n                            <fieldset class=" col-6 border p-2">\n                            <legend class="w-auto w-auto-man">\n                            font-style\n                        </legend>\n                            <div class="figureBgSelectOption">\n                           \n                            <button data-key="font-weight" data-bgalign="bold"  class="ColopickerSpanLine  change-fstyle-component "><i class="fas fa-bold"></i></button>\n                            <button data-key="font-style" data-bgalign="italic"  class="ColopickerSpanLine  change-fstyle-component "><i class="fas fa-italic"></i></button>\n                            <button data-key="text-decoration" data-bgalign="underline"  class="ColopickerSpanLine change-fstyle-component "><i class="fas fa-underline"></i></button>\n                           \n                 \n                            </div>\n                            </fieldset>\n                            <fieldset class=" col-6 border p-2">\n                            <legend class="w-auto w-auto-man">\n                            width\n                        </legend>\n                            <div class="figureBgSelectOption">\n                            <input class="form-control col-6" type="number" name="" id="widthComponent">\n                            <select name="" class="form-control bg-light form-control-sm col-6" id="getStyleVah1d1">\n                       <option value="px">px</option>\n                       <option value="px">rem</option>\n                       <option value="px">cm</option>\n                   </select>\n                            </div>\n                            </fieldset>\n                            <fieldset class=" col-6 border p-2">\n                            <legend class="w-auto w-auto-man">\n                            height\n                        </legend>\n                            <div class="figureBgSelectOption">\n                           \n                            <input class="form-control col-6" type="number" name="" id="heightComponent">\n                            <select name="" class="form-control bg-light form-control-sm col-6" id="getStyleVah1d2">\n                       <option value="px">px</option>\n                       <option value="px">rem</option>\n                       <option value="px">cm</option>\n                   </select>\n                            </div>\n                            </fieldset>\n                        </div>\n                    \n                    \n                    </div>\n                        </div>\n                      </div>').append('<div style=\'display:inline-block;\' class="dropdown">\n                        <span class="figureAddbtn"  type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                        <i class="fas fa-key"></i>\n                        </span>\n                        <div class="dropdown-menu dropdown-menu-large-btn" aria-labelledby="dropdownMenuButton1">\n                        <div class="row animation-block-for-find">                      \n                        <div class="col-12">\n                        <fieldset class="border p-2">\n                        <legend class="w-auto w-auto-man">\n                            Class\n                        </legend>\n                        <table style="width:100%">\n                            <tbody>\n                                <tr>\n                                    <td style="padding:5px;">\n\n                                        <select id="gui_prop_in_gui_class_list" class="classListOnChange" style="padding:0px;border-radius:4px;border:1px solid gray;width:100%"></select>\n                                    </td>\n                                    <td style="width: 1%">\n                                        <i class="fa fa-plus" onclick="addGuiClassToInput(this)" style="  font-size:16px;cursor:pointer;" aria-hidden="true"></i>\n\n                                    </td>\n                                    <td style="width: 1%">\n                                        <i class="fa fa-bars" onclick="guiClassModal(this)" style="  font-size:16px;cursor:pointer;" aria-hidden="true"></i>\n\n                                    </td>\n                                </tr>\n                                <tr class="input4NewClassAdding" style="display:none">\n                                    <td style="padding:5px;" colspan="2">\n\n                                        <input id="gui_prop_in_gui_class_new" style="padding:0px;border-radius:4px;border:1px solid gray;width:100%">\n                                    </td>\n                                    <td style="width: 1%">\n                                        <button class="buttons" onclick="insertNewClassDirect2(this)" style="   cursor:pointer;">Add</button>\n\n                                    </td>\n\n                                </tr>\n                            </tbody>\n                        </table>\n                        <table class="cst_table123" style="width:100%;font-size: 11px; ">\n                            <tbody class="input_class_list_in_component"></tbody>\n                        </table>\n\n                    </fieldset>\n                    <fieldset class="border p-2">\n                            <legend class="w-auto w-auto-man">\n                                Attributes\n                            </legend>\n                            <table style="width:100%">\n                                <tbody>\n                                    <tr>\n                                        <td style="padding:5px;">\n                                            <span class="col-form-label control-label">Name:</span>\n                                            <input type="text" id="gui_prop_in_attr_name" style=" padding:0px;border-radius:4px;border:1px solid gray;width:100%">\n                                        </td>\n                                        <td style="padding:5px;">\n                                            <span class="col-form-label control-label">Value:</span>\n                                            <input type="text" id="gui_prop_in_attr_value" style="padding:0px;border-radius:4px;border:1px solid gray;width:100%">\n                                        </td>\n                                        <td>\n                                            <i class="fa fa-plus" onclick="addInputAttributes2(this)" style="padding-top:20px; font-size:16px;cursor:pointer;" aria-hidden="true"></i>\n\n                                        </td>\n\n                                    </tr>\n                                </tbody>\n                            </table>\n                            <table class="cst_table123" style="width:100%;font-size: 11px; ">\n                                <tbody class="input_attributes_list_in_component"></tbody>\n                            </table>\n\n                        </fieldset>\n                        </div>\n                    \n                    \n                    </div>\n                        </div>\n                      </div>').append('<span class="figureAddbtn component-container-button" ><i class="fas fa-bars"></i></span>').append('<span class="figureAddbtn " id="element-edit-button-hover"><i class="far fa-edit"></i></span>').append($("<select>").addClass("light-selectbox-custom").attr("id", "gui-cell-selectbox-changed").append("<option " + (1 == t.cellNo ? "selected=selected" : "") + ' value="1">1</option>').append("<option " + (2 == t.cellNo ? "selected=selected" : "") + ' value="2">2</option>').append("<option " + (3 == t.cellNo ? "selected=selected" : "") + ' value="3">3</option>').append("<option " + (4 == t.cellNo ? "selected=selected" : "") + ' value="4">4</option>').append("<option " + (5 == t.cellNo ? "selected=selected" : "") + ' value="5">5</option>').append("<option " + (6 == t.cellNo ? "selected=selected" : "") + ' value="6">6</option>').append("<option " + (7 == t.cellNo ? "selected=selected" : "") + ' value="7">7</option>').append("<option " + (8 == t.cellNo ? "selected=selected" : "") + ' value="8">8</option>').append("<option " + (9 == t.cellNo ? "selected=selected" : "") + ' value="9">9</option>').append("<option " + (10 == t.cellNo ? "selected=selected" : "") + ' value="10">10</option>').append("<option " + (11 == t.cellNo ? "selected=selected" : "") + ' value="11">11</option>').append("<option " + (12 == t.cellNo ? "selected=selected" : "") + ' value="12">12</option>')).append('<span class="figureAddbtn cellWitdhAdd" cell-num=' + t.cellNo + ' "data-add="false"><i class="fas fa-angle-left"></i></span>').append('<span class="figureAddbtn cellWitdhAdd" cell-num=' + t.cellNo + '  data-add="true"><i class="fas fa-angle-right"></i></span>').append('<span class="figureAddbtn drag-areas-comp " ><i class="fas fa-arrows-alt"></i></span>').append($("<span>").attr("onclick", 'new UserStory().deleteInputFromUSList(this,"' + t.id + '")').addClass("figureAddbtn delete-btn-inp").css("color", "red").append("<i class='fas fa-trash-alt'></i>")))), e
        },
        AddMandatoryStar: function (t) {
            return t.pureDescription && "undefined" !== t.pureDescription && t.pureDescription.includes("fn_(ismandatory)") ? '<span style="color:red">*</span>' : ""
        },
        ReplaceCSS: function (t) {
            try {
                return t = t.replace(/##/g, "")
            } catch (e) {
                return t
            }
        },
        InputTableAction: {
            GenAddColumn: function (t) {
                return $('<i class="fa fa-plus">').css("font-size", "14px").attr("title", "Add new column").css("color", "#d5d6da !important").css("cursor", "pointer").attr("onclick", "fillInputTableColumnsCombo('" + t.fkInputTableId + "')")
            },
            GenTableProperties: function (t) {
                return $('<i class="fa fa-table">').css("font-size", "14px").attr("title", "Table Properties").css("color", "#d5d6da !important").css("cursor", "pointer").addClass("component-class").attr("onclick", "readInputTableProperties(this,'" + t.id + "')")
            },
            GenReadFromContent: function (t) {
                var e = "1" === SAInput.Tables[t.fkInputTableId].readContent ? "#2196F3" : "#d5d6da";
                return $('<i class="fa fa-inbox">').attr("title", "Read From Content").css("font-size", "14px").css("color", e).css("cursor", "pointer").attr("onclick", "setInputTableReadFromContent(this,'" + t.fkInputTableId + "')")
            },
            GenRemoveTable: function (t) {
                return $('<i class="fa fa-trash-o">').attr("title", "Remove Table").css("font-size", "14px").css("color", "#d5d6da").css("cursor", "pointer").attr("onclick", "removeInputTable(this,'" + t.id + "','" + t.fkInputTableId + "')")
            },
            GenMoveDrag: function (t) {
                return $('<i class="fa fa-arrows-alt">').attr("title", "Move Table with Drag and Drop").css("font-size", "14px").css("color", "#d5d6da").css("cursor", "pointer")
            },
            RegenTableBody: function (t) {
                var e = $(t).attr("table-id"),
                    n = $(t).val(),
                    a = n > 0 ? this.GenInputTableBodyHtml(e, n).html() : "";
                $(t).parent().parent().find("tbody").html(a), updateRowCountInputTable(e, n)
            },
            RegenTableBodyDetails: function (t, e, n, a, o, p) {
                var l = a || "0",
                    s = t,
                    r = e,
                    i = this.GenInputTableBodyHtml(s, r, n, l, p);
                "1" === $(".component-table-class-for-zad-" + s).attr("sa-tablenotempty") || p ? $(".component-table-class-for-zad-" + s).find("tbody").append(i.html()) : $(".component-table-class-for-zad-" + s).find("tbody").html(i.html());
                var d = document.getElementById("comp_id_" + o);
                loadSelectBoxesAfterGUIDesign(d)
            },
            GenRowCount: function (t) {
                for (var e = this.GetTableRowCount(t.fkInputTableId), n = $("<select>").attr("style", "font-size:11px;padding:1px 4px;border:none").attr("table-id", t.fkInputTableId).attr("onchange", "Component.InputTableAction.RegenTableBody(this)"), a = 0; a <= 15; a++) {
                    var o = $("<option>").val(a).append(a);
                    a === parseInt(e) && o.attr("selected", !0), n.append(o)
                }
                return n
            },
            GetTableRowCount: function (t) {
                var e = global_var.component_table_default_row_count;
                try {
                    var n = SAInput.Tables[t].rowCount;
                    e = n.length > 0 ? n : e
                } catch (t) {}
                return e
            },
            GenInputTableHtml: function (t) {
                var e = t.fkInputTableId;
                if (0 === e.length) return "";
                var n = SAInput.getInputDetails(t.id, "fkBacklogId"),
                    a = this.GetTableRowCount(e),
                    o = $("<table>"),
                    p = this.GenInputTableHeaderHtml(e, t),
                    l = this.GenInputTableBodyHtml(e, a, n);
                return o.append(p).append(l), o.html()
            },
            MatchShowComponentAndId: function (t, e) {
                for (var n = {}, a = 0; a < t.length; a++) {
                    var o = t[a].trim();
                    0 !== o.length && (n[o] = e[a])
                }
                return n
            },
            GenInputTableShowHideHtml: function (t, e) {
                var n = $("<div>"),
                    a = SAInput.Tables[t].fkInputId.split(","),
                    o = SAInput.Tables[t].showComponent.split(","),
                    p = this.MatchShowComponentAndId(a, o),
                    l = SAInput.Tables[t].showColumn.split(","),
                    s = this.MatchShowComponentAndId(a, l),
                    r = SAInput.Tables[t].showColumnName.split(","),
                    i = this.MatchShowComponentAndId(a, r);
                a = this.SetColumnsOrder(a);
                for (var d = $("<ul>").addClass("table-row-show-hide-ul").append("<li><span class=''><input type='checkbox' style='margin-bottom:20px' checked='true' class='all-table-row-checked'>All</span><li>"), c = 0; c < a.length; c++) {
                    var u = a[c].trim();
                    if (0 !== u.length) {
                        var m = SAInput.getInputDetails(u, "componentType"),
                            b = SAInput.GetInputName(u),
                            f = $('<label href="#">').addClass("component-class-show-hide").attr("id", u).attr("pid", u).attr("orderNo", SAInput.getInputDetails(u, "orderNo")).addClass("loadLivePrototype" === global_var.current_modal ? "draggable" : "").attr("onclick", "loadLivePrototype" === global_var.current_modal ? "new UserStory().setInputByGUIComponent('" + u + "')" : "").append("<input data-check=" + u + " checked='true' type='checkbox'>").append(replaceTags(b));
                        p[u].trim(), s[u].trim(), i[u].trim(), l = "", r = "";
                        if ("" == f);
                        else var v = $("<li>").append(f).append("", " ").append(l, " ").append(r, " ").append($("<div>").addClass("editTools btn-group").append('<span onclick="" id="group-data-table-btm"  class="btn btn-sm btn-light table-gorup-by-th" tbid=' + e.id + " data-order=" + u + '><i class="fas fa-layer-group"></i></span>'));
                        "loadLivePrototype" !== global_var.current_modal && "1" === s[u].trim() && v.empty().hide(), "icbox" !== m && "cbox" !== m || v.empty().hide();
                        try {
                            for (var h = cr_input_cont_attribute[u], C = 0; C < h.length; C++) {
                                var g = h[C],
                                    y = Object.keys(g)[0],
                                    I = g[y];
                                v.attr(y, I)
                            }
                        } catch (t) {}
                        try {
                            var S = cr_cont_input_classes[u];
                            if (S) {
                                h = S.split(",");
                                for (var T = 0; T < h.length; T++) {
                                    var _ = h[T],
                                        k = cr_gui_classes[_].className;
                                    k = k.replace(".", "")
                                }
                            }
                        } catch (t) {}
                        $("#" + t).parents(".component-container-dashed").find(".groupBySelectBox4Table").append("<option>" + v + "</option>"), d.append(v)
                    }
                }
                return n.append(d), n
            },
            GenInputTableHeaderHtml: function (t, e) {
                var n = $("<thead>"),
                    a = SAInput.Tables[t].fkInputId.split(","),
                    o = SAInput.Tables[t].showComponent.split(","),
                    p = this.MatchShowComponentAndId(a, o),
                    l = SAInput.Tables[t].showColumn.split(","),
                    s = this.MatchShowComponentAndId(a, l),
                    r = SAInput.Tables[t].showColumnName.split(","),
                    i = this.MatchShowComponentAndId(a, r);
                a = this.SetColumnsOrder(a);
                var d = SAInput.getInputDetails(e.id, "fkDependentBacklogId"),
                    c = $("<th>");
                try {
                    cr_input_comp_attribute_kv[e.id]["sa-advanced-filter-active"] && c.addClass("text-center").append($("<span>").addClass(" btn btn-sm").attr("id", "table-show-hide-button-id-a").html('<i class="fas fa-cog"></i>'))
                } catch (t) {}
                for (var u = $("<tr>").append(c), m = $("<tr>").addClass("filter-table-row-header-tr redirectClass").addClass("hide-filt-drag").append($("<th>")), b = 0; b < a.length; b++) {
                    var f = a[b].trim(),
                        v = SAInput.getInputDetails(f, "componentType");
                    if (0 !== f.length) {
                        var h = SAInput.GetInputName(f);
                        if ("icbox" === v || "cbox" === v) {
                            var C = $('<label href="#">').addClass("component-class").attr("id", f).attr("pid", f).attr("orderNo", SAInput.getInputDetails(f, "orderNo")).addClass("loadLivePrototype" === global_var.current_modal ? "draggable" : "").attr("onclick", "loadLivePrototype" === global_var.current_modal ? "new UserStory().setInputByGUIComponent('" + f + "')" : "");
                            try {
                                cr_input_comp_attribute_kv[f]["sa-checkAllNone"] ? C.append(replaceTags(h)) : C.append("<input type='checkbox' class='all-check-button-allTable'>")
                            } catch (t) {
                                C.append("<input type='checkbox' class='all-check-button-allTable'>")
                            }
                        } else C = "1" === i[f].trim() ? "" : $('<label href="#">').addClass("component-class").attr("id", f).attr("pid", f).attr("orderNo", SAInput.getInputDetails(f, "orderNo")).addClass("loadLivePrototype" === global_var.current_modal ? "draggable" : "").attr("onclick", "loadLivePrototype" === global_var.current_modal ? "new UserStory().setInputByGUIComponent('" + f + "')" : "").append(replaceTags(h));
                        var g = "1" === p[f].trim() ? "#2196F3" : "#d5d6da",
                            y = "1" === s[f].trim() ? "#2196F3" : "#d5d6da",
                            I = "1" === i[f].trim() ? "#2196F3" : "#d5d6da",
                            S = "loadLivePrototype" === global_var.current_modal ? $('<i class="fa fa-list-alt" aria-hidden="true">').css("cursor", "pointer").css("font-size", "8px").css("color", g).attr("onclick", "showInputTableColumnComponent(this,'" + t + "','" + f + "')") : "",
                            T = (l = "loadLivePrototype" === global_var.current_modal ? $('<i class="fa fa-eye" aria-hidden="true">').css("cursor", "pointer").css("font-size", "8px").css("color", y).attr("onclick", "showInputTableColumnEntireComponent(this,'" + t + "','" + f + "')") : "", r = "loadLivePrototype" === global_var.current_modal ? $('<i class="fa fa-cubes" aria-hidden="true">').css("cursor", "pointer").css("font-size", "8px").css("color", I).attr("onclick", "showInputTableColumnItselfComponent(this,'" + t + "','" + f + "')") : "", $("<th>").addClass("text-center").append(C).append(S, " ").append(l, " ").append(r, " "));
                        if ("loadLivePrototype" !== global_var.current_modal) try {
                            T.append("" === C ? "" : "<span class='handle-drag'></span>");
                            try {
                                cr_input_comp_attribute_kv[f]["sa-column-filter-active"] && T.append("" === C ? "" : "<span class=' btn btn-sm filter-handle-button btn-outline-secondary '><i class='fas fa-filter'></i></span>")
                            } catch (t) {}
                        } catch (t) {}
                        var _ = SAInput.getInputDetails(f, "fkDependentOutputId"),
                            k = $("<select>").addClass("form-control filter-table-row-select").attr("id", "filter-table-row-" + f).attr("placeholder", h).attr("onchange", "triggerAPI(this,'" + d + "')").attr("data-live-search", "true").attr("sa-global-trigger", "1").attr("data-actions-box", "true").attr("filter-id", f),
                            w = $("<input>").addClass("form-control filter-table-row-select").attr("id", "filter-table-row-" + f).attr("placeholder", h).attr("data-live-search", "true").attr("onchange", "triggerAPI(this,'" + d + "')").attr("data-actions-box", "true").attr("sa-global-trigger", "1").attr("filter-id", f);
                        if ("lbl" === v || "hlink" === v)
                            if (_) var x = $("<th>").addClass("hide-filt-drag").append("" == C ? "" : addAttrToElementSingileByR(k, SAInput.Inputs[f]));
                            else x = $("<th>").addClass("hide-filt-drag").append("" == C ? "" : addAttrToElementSingileByR(w, SAInput.Inputs[f]));
                        else x = $("<th>").addClass("hide-filt-drag").append("" == C ? "" : $("<span>").addClass(" filter-table-row-select").attr("id", "filter-table-row-" + f).attr("placeholder", h).attr("filter-id", f));
                        "loadLivePrototype" !== global_var.current_modal && "1" === s[f].trim() && (T.hide(), x.hide());
                        try {
                            for (var A = cr_input_cont_attribute[f], G = 0; G < A.length; G++) {
                                var B = A[G],
                                    D = Object.keys(B)[0],
                                    E = B[D];
                                T.attr(D, E), x.attr(D, E)
                            }
                        } catch (t) {}
                        try {
                            var L = cr_cont_input_classes[f];
                            if (L) {
                                A = L.split(",");
                                for (var R = 0; R < A.length; R++) {
                                    var N = A[R],
                                        P = cr_gui_classes[N].className;
                                    P = P.replace(".", ""), T.addClass(P)
                                }
                            }
                        } catch (t) {}
                        u.append(T), "loadLivePrototype" !== global_var.current_modal && m.append(x)
                    }
                }
                n.append(u);
                try {
                    cr_input_comp_attribute_kv[e.id]["sa-advanced-filter-active"] && n.append(m)
                } catch (t) {}
                return n
            },
            TableEmptyMessage: function (t) {
                return '<div class="col-lg-12" style="padding:30px;text-align:center"><h5> No columns (inputs) have been entered on this table</h5><i class="fa fa-plus" title="Add new column" onclick="fillInputTableColumnsCombo(\'' + t + '\')" \n                    style="font-size: 30px; color: rgb(213, 214, 218); cursor: pointer;" aria-hidden="true"></i>'
            },
            GetTableReadContent: function (t) {
                var e = "0";
                try {
                    e = SAInput.Tables[t].readContent
                } catch (t) {}
                return e
            },
            GetTableCellValue: function (t, e, n) {
                var a = "Lorem Ipsum";
                if ("1" === this.GetTableReadContent(t)) {
                    a = "";
                    try {
                        a = SAInput.getInputDetails(e, "inputContent").split(/\r*\n/)[n]
                    } catch (t) {}
                }
                return a
            },
            SetColumnsOrder: function (t) {
                var e = {},
                    n = t;
                try {
                    for (var a = 0; a < t.length; a++) {
                        var o = t[a];
                        0 !== o.trim().length && (o = o.trim(), e[o] = SAInput.getInputDetails(o, "orderNo"))
                    }
                    n = Object.keys(e).sort((function (t, n) {
                        return e[t] - e[n]
                    }))
                } catch (t) {}
                return n
            },
            GenInputTableBodyHtml: function (t, e, n, a) {
                var o = a || "0",
                    p = $("<tbody>"),
                    l = SAInput.Tables[t].fkInputId.split(","),
                    s = SAInput.Tables[t].showComponent.split(","),
                    r = SAInput.Tables[t].showColumn.split(","),
                    i = SAInput.Tables[t].showColumnName.split(","),
                    d = this.MatchShowComponentAndId(l, s),
                    c = this.MatchShowComponentAndId(l, r);
                this.MatchShowComponentAndId(l, i);
                l = this.SetColumnsOrder(l);
                for (var u = 1; u <= e; u++) {
                    for (var m = $("<tr>").addClass("redirectClass").attr("bid", n).append($("<td>").append(u + parseInt(o)).addClass("text-center").css("min-width", "25px")), b = 0; b < l.length; b++) {
                        var f = l[b].trim();
                        if (0 !== f.length) {
                            0;
                            var v = this.GetTableCellValue(t, f, u - 1);
                            if ("1" === d[f].trim()) {
                                var h = new ComponentInfo;
                                Component.FillComponentInfo(h, SAInput.Inputs[f]), h.secondContent = v, h.isFromTableNew = !0, h.isFromTable = !0, h.tableRowId = "1", h.withLabel = !1, h.hasOnClickEvent = !0, h.cellNo = "12", h.showProperties = !1, h.rowNo = parseInt(a) + parseInt(u), v = Component.GetComponentHtmlNew(h)
                            }(v = $(v).clone()).find(".tool_element_edit").remove();
                            var C = $("<td>").addClass("component-input-class").addClass("component-table-input-class").attr("pdid", f).val(v).append(v),
                                g = SAInput.getInputDetails(f, "fkDependentBacklogId"),
                                y = SAInput.getInputDetails(f, "fkDependentOutputId");
                            if (masTab.addDeend(g, f), g && g.length > 0) {
                                loadBacklogInputsByIdIfNotExist(g);
                                var I = SAInput.getInputDetails(y, "inputName");
                                C.attr("rel_api", g).attr("rel_core_inputid", f).attr("rel_core_selected_field", I).addClass("has_table_relation_td").addClass("sa_data_table_col_rel_" + g + "_" + f)
                            }
                            "loadLivePrototype" !== global_var.current_modal && "1" === c[f].trim() && C.hide();
                            try {
                                cr_input_comp_attribute_kv[f]["sa-column-filter-active"] && (C.append("<span class='btn btn-light single-row-column-filter-button btn-sm'><i class='fas fa-filter'></i></span>"), C.addClass("position-relative"))
                            } catch (t) {}
                            m.append(C)
                        }
                    }
                    p.append(m)
                }
                return loadTableFIlterInside(), p
            },
            GenFilterBodyForInputTable: function (t, e, n) {
                try {
                    if (cr_input_comp_attribute_kv[e.id]["sa-advanced-filter-active"]) return $("<div>").addClass("modal fade").attr("id", "cheweek-modal-filter" + t).attr("tabindex", "-1").attr("role", "dialog").attr("aria-labelledby", "cheweek-modal-filterLabel").attr("aria-hidden", "true").append($("<div>").addClass("modal-dialog").attr("role", "document").attr("style", "max-width: 45% !important").append($("<div>").attr("style", "padding: 5px 10px;").addClass("modal-header").append("<b class='modal-title'>Ətraflı Filtr</b>").append('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>')).append($("<div>").addClass("modal-body d-flex").append($("<div>").addClass("col-3").append($("<div>").addClass("table-show-hide-row-div").attr("data-tableId", e.id).append($("<div>").addClass("col-12 p-2 form-group").append($("<div>").hide().addClass("input-group date").attr("id", "datetimepicker10").append('<button  data-api-tabid="' + t + '" class="btn col-6 btn-light" id="file_export_excel_new">New</button>').append('<button  data-api-tabid="' + t + '" class="btn col-6 btn-light" id="file_export_excel">Export</button>').append('<input type="file" data-api-tabid="' + t + '" class="form-control form-control-sm" id="file_excel_import">'))).append($("<div>").addClass("col-12 p-2 form-group").append($("<div>").addClass("btn-group").append('<span class="btn btn-sm btn-light" id="show-table-row-btn"><i class="fas fa-eye"></i></span>').append('<span class="btn btn-sm btn-light " id="hide-table-row-btn"><i class="fas fa-eye-slash"></i></span>'))).append(this.GenInputTableShowHideHtml(t, e)))).append($("<div>").addClass("col-9 table-advanced-filter-section-div").attr("id", "table-advanced-filter-section-div" + t).append($("<div>").addClass("component-section-row")))))
                } catch (t) {}
            },
            GenFilterBodyForTableColumn: function (t, e, n) {
                try {
                    if (cr_input_comp_attribute_kv[e.id]["sa-advanced-filter-active"]) return $("<div>").attr("data-tableId", t).attr("data-compIdTab", e.id).addClass("table-column-show-hide-row-div table-filter-block-draggable").attr("id", "table-column-filter-details-id").append($("<span>").attr("id", "table-column-filter-details-span").addClass("table-show-hide-button-class-close").html('<i class="fas fa-times"></i>')).append($("<div>").addClass("col-10 p-2").append($("<div>").addClass("btn-group float-right get-api-id").append('<span class="btn btn-sm btn-light table-show-hide-button-id-second" d data-tabid="' + t + '"><i class="fas fa-cog" aria-hidden="true"></i></span>').append('<span class="btn btn-sm btn-light" id="group-data-table-btm-single"><i class="fas fa-layer-group"></i></span>')).append("<span class='btn btn-sm nm-filed-column'></span>")).append("<hr>").append($("<ul>").addClass("col-12  ms-ContextualMenu-list").append($('<li class="ms-ContextualMenu-item sort-by-az-fortable ">').append($("<button>").append('<span style="padding: 0px 10px 0px 0px;"><i class="fas fa-sort-alpha-down"></i></span>').append("A-dan Z-yə qədər çeşidləyin"))).append($('<li class="ms-ContextualMenu-item sort-by-za-fortable ">').append($("<button>").append('<span style="padding: 0px 10px 0px 0px;"><i class="fas fa-sort-alpha-down-alt"></i></span>').append("Z-dən A-ya qədər çeşidləyin"))).append($('<li class="ms-ContextualMenu-item ">').append($('<button type="button"  data-toggle="modal" data-target="#filter-for-table-modal-comp" >').append('<span style="padding: 0px 10px 0px 0px;"><i class="fas fa-text-height"></i></span>').append("Mətn Filtrləri")))).append("<hr>").append($("<div>").addClass("col-12 p-2 form-group").append($("<div>").addClass("input-group ").attr("data-apiId", n).attr("id", "filter-single-colmn-selectpicker")))
                } catch (t) {}
            }
        },
        InputTable: function (t) {
            for (var e = "loadLivePrototype" === global_var.current_modal && t.showProperties ? $('<div class="col-lg-12 text-right">').attr("id", "comp_id_" + t.id).css("padding-top", "15px").append(" &nbsp;").append(this.InputTableAction.GenAddColumn(t)).append(" &nbsp;").append(this.InputTableAction.GenTableProperties(t)).append(" &nbsp;").append(this.InputTableAction.GenReadFromContent(t)).append("  &nbsp;&nbsp;").append(this.InputTableAction.GenMoveDrag(t)).append("  &nbsp;&nbsp;&nbsp;&nbsp;").append(this.InputTableAction.GenRemoveTable(t)).append("  &nbsp;&nbsp;").append(this.InputTableAction.GenRowCount(t)).append(" ") : "", n = t.fkInputTableId, a = SAInput.getInputDetails(t.id, "fkDependentBacklogId"), o = "", p = SAInput.Tables[n].fkInputId.split(","), l = 0; l < p.length; l++) {
                var s = p[l].trim();
                if (0 !== s.length) try {
                    o += cr_input_comp_attribute_kv[s]["sa-selectedfield"], o += l < p.length - 1 ? "," : ""
                } catch (t) {}
            }
            var r = $('<table class="table">').addClass("component-table-class-for-zad").addClass("component-table-class-for-zad-" + n).attr("table-id", n).attr("input-id", t.id).attr("sa-tableselectedfield", o).attr("style", gui_component.defaultCSS.InputTable + Component.ReplaceCSS(t.css)).append(e).append(this.InputTableAction.GenInputTableHtml(t));
            Component.ComponentEvent.Init(r, t);
            var i = Component.ContainerDiv(t);
            return i.removeClass("component-class").removeAttr("onclick"), i.append($("<div>").addClass("progressloader loaderTable1")), i.append(r), i.addClass("table-responsive"), i.append(this.InputTableAction.GenFilterBodyForInputTable(n, t, a)), i.append(this.InputTableAction.GenFilterBodyForTableColumn(n, t, a)), i.append($("<span>").addClass("btn btn-sm btn-light modal-inside-table-expand position-absolute top-0 right-0").css("top", "0").css("right", "0").css("z-index", "22").append('<i class="fas fa-expand"></i>')), $("<div></div>").append(i).html()
        },
        InputTab: function (t) {
            var e = $("<div>").append(this.InputTabAction.GenPropertiesLine(t)).append(this.InputTabAction.GetBody(t));
            Component.ComponentEvent.Init(e, t);
            var n = Component.ContainerDiv(t).attr("style", Component.ReplaceCSS(t.containerCSS));
            return n.removeClass("component-class").removeAttr("onclick"), n.append(e), $("<div></div>").append(n).html()
        },
        InputTabAction: {
            GenRedirectTo: function (t) {
                var e = "";
                return "loadLivePrototype" === global_var.current_modal && (e = $('<i class="fa fa-mail-forward">').css("font-size", "11px").attr("title", "Redirect to").css("color", "#d5d6da !important").css("cursor", "pointer").attr("onclick", "new UserStory().redirectUserStoryCore('" + t + "')")), e
            },
            GetBody: function (t) {
                var e = [];
                try {
                    e = SAInput.Tabs[t.fkInputTableId].fkRelatedBacklogId.split(",")
                } catch (t) {}
                return 0 === e.length ? this.TabEmptyMessage(t.fkInputTableId) : this.GetTabBody(t, e)
            },
            GetTabBody: function (t, e) {
                var n = $('<div class="tab-content">'),
                    a = this.GetTabHeader(t, e),
                    o = this.GetTabContent(t, e);
                return n.append(a).append(o), n
            },
            GetTabHeader: function (t, e) {
                var n = $('<ul class="nav nav-tabs">').attr("role", "tablist"),
                    a = 0;
                for (var o in e) {
                    var p = $('<li class="nav-item">').addClass("sa-tab-action-zad"),
                        l = e[o].trim(),
                        s = SACore.GetBacklogname(l),
                        r = SACore.GetBacklogDetails(l, "description");
                    r = r || s;
                    var i = 0 === a ? " active " : "";
                    a++, p.append($('<a class="nav-link">').addClass(i).css("font-size", "14px").attr("href", "#tab_" + t.fkInputTableId + "_" + l).attr("data-toggle", "tab").append(replaceTags(r)).append(" ").append(this.GenRedirectTo(l))), n.append(p)
                }
                return n
            },
            GetTabContent: function (t, e) {
                var n = $('<div class="tab-content">'),
                    a = !0;
                for (var o in e) {
                    var p = e[o].trim();
                    if (0 !== p.length) {
                        var l = a ? " active " : "";
                        a = !1;
                        var s = $('<div class="container tab-pane">').addClass(l).attr("id", "tab_" + t.fkInputTableId + "_" + p),
                            r = SAInput.toJSONByBacklog(p);
                        t.sequence.push(p);
                        var i = (new UserStory).getGUIDesignHTMLBody(r, 0, t.sequence);
                        s.append(i), n.append(s)
                    }
                }
                return n
            },
            GenAddUserStory: function (t) {
                return $('<i class="fa fa-plus">').css("font-size", "14px").attr("title", "Add User Story").css("color", "#d5d6da !important").css("cursor", "pointer").attr("onclick", "addUserStoryToTabModal('" + t.fkInputTableId + "')")
            },
            GenPropertiesLine: function (t) {
                return "loadLivePrototype" === global_var.current_modal && t.showProperties ? $('<div class="col-lg-12 text-right">').attr("id", "comp_id_" + t.id).css("padding-top", "15px").append(" &nbsp;").append(this.GenAddUserStory(t)).append(" &nbsp;").append(this.GenTableProperties(t)).append(" &nbsp;").append(this.GenMoveDrag(t)).append("  &nbsp;&nbsp;&nbsp;&nbsp;").append(this.GenRemoveTable(t)).append("  &nbsp;&nbsp;") : ""
            },
            GenTableProperties: function (t) {
                return $('<i class="fa fa-table">').css("font-size", "14px").attr("title", "Table Properties").css("color", "#d5d6da !important").css("cursor", "pointer").addClass("component-class").attr("onclick", "readInputTableProperties(this,'" + t.id + "')")
            },
            GenRemoveTable: function (t) {
                return $('<i class="fa fa-trash-o">').attr("title", "Remove Table").css("font-size", "14px").css("color", "#d5d6da").css("cursor", "pointer").attr("onclick", "removeInputTable(this,'" + t.id + "','" + t.fkInputTableId + "')")
            },
            GenMoveDrag: function (t) {
                return $('<i class="fa fa-arrows-alt">').attr("title", "Move Table with Drag and Drop").css("font-size", "14px").css("color", "#d5d6da").css("cursor", "pointer")
            },
            GenInputTableHtml: function (t) {
                var e = t.fkInputTableId;
                if (0 === e.length) return "";
                var n = SAInput.getInputDetails(t.id, "fkBacklogId"),
                    a = this.GetTableRowCount(e),
                    o = $("<table>"),
                    p = this.GenInputTableHeaderHtml(e),
                    l = this.GenInputTableBodyHtml(e, a, n);
                return o.append(p).append(l), o.html()
            },
            GenInputTableHeaderHtml: function (t) {
                for (var e = $("<thead>"), n = SAInput.Tables[t].fkInputId.split(","), a = (SAInput.Tables[t].orderNo.split(","), SAInput.Tables[t].showComponent.split(",")), o = $("<tr>").append($("<th>").append("")), p = 0; p < n.length; p++) {
                    var l = n[p].trim();
                    if (0 !== l.length) {
                        var s = SAInput.GetInputName(l),
                            r = $('<a href="#">').addClass("component-class").attr("onclick", "loadLivePrototype" === global_var.current_modal ? "new UserStory().setInputByGUIComponent('" + l + "')" : "").append(replaceTags(s)),
                            i = "1" === a[p].trim() ? "#2196F3" : "#d5d6da",
                            d = "loadLivePrototype" === global_var.current_modal ? $('<i class="fa fa-list-alt" aria-hidden="true">').css("cursor", "pointer").css("font-size", "8px").css("color", i).attr("onclick", "showInputTableColumnComponent(this,'" + t + "','" + l + "')") : "";
                        o.append($("<th>").append(r).append(d))
                    }
                }
                return e.append(o), e
            },
            TabEmptyMessage: function (t) {
                return '<div class="col-lg-12" style="padding:30px;text-align:center"><h5> No User Stories have been entered on this tab</h5><i class="fa fa-plus" title="Add new column" onclick="addUserStoryToTabModal(\'' + t + '\')" \n                    style="font-size: 30px; color: rgb(213, 214, 218); cursor: pointer;" aria-hidden="true"></i>'
            },
            GetTableReadContent: function (t) {
                var e = "0";
                try {
                    e = SAInput.Tables[t].readContent
                } catch (t) {}
                return e
            },
            GetTableCellValue: function (t, e, n) {
                var a = "Lorem Ipsum";
                if ("1" === this.GetTableReadContent(t)) {
                    a = "";
                    try {
                        a = SAInput.getInputDetails(e, "inputContent").split(/\r*\n/)[n]
                    } catch (t) {}
                }
                return a
            },
            GenInputTableBodyHtml: function (t, e) {
                for (var n = $("<tbody>"), a = SAInput.Tables[t].fkInputId.split(","), o = (SAInput.Tables[t].orderNo.split(","), SAInput.Tables[t].showComponent.split(",")), p = 0, l = 1; l <= e; l++) {
                    for (var s = $("<tr>").append($("<td>").append(l)), r = 0; r < a.length; r++) {
                        var i = a[r].trim();
                        if (0 !== i.length) {
                            p++;
                            var d = this.GetTableCellValue(t, i, l - 1);
                            if ("1" === o[r].trim()) {
                                var c = new ComponentInfo;
                                Component.FillComponentInfo(c, SAInput.Inputs[i]), c.secondContent = d, c.isFromTableNew = !0, c.isFromTable = !0, c.tableRowId = "1", c.withLabel = !1, c.hasOnClickEvent = !0, c.cellNo = "12", c.showProperties = !1, d = Component.GetComponentHtmlNew(c)
                            }
                            s.append($("<td>").addClass("component-input-class").attr("pdid", i).val(d).append(d))
                        }
                    }
                    n.append(s)
                }
                return 0 === p && n.html($("<tr>").append($("<td>").append(this.TableEmptyMessage(t)))), n
            }
        },
        EditBox: function (t) {
            t.content = !0 === t.isFromTableNew ? t.secondContent : t.content;
            var e = Component.AddMandatoryStar(t),
                n = $("<input></input>").addClass("form-control").attr("style", gui_component.defaultCSS.EditBox + Component.ReplaceCSS(t.css)).attr("type", "text").attr("value", t.content);
            Component.ComponentEvent.Init(n, t);
            var a = Component.ContainerDiv(t);
            return !0 === t.withLabel && (a.append($('<span class="comp-title-span"></span>').append(t.label)).append(e), a.append(t.isLabelInTop ? "<br>" : "")), a.append(n), $("<div></div>").append(a).html()
        },
        HiddenCarrier: function (t) {
            t.content = !0 === t.isFromTableNew ? t.secondContent : t.content;
            var e = Component.AddMandatoryStar(t),
                n = $("<input></input>").addClass("form-control").attr("style", gui_component.defaultCSS.EditBox + Component.ReplaceCSS(t.css)).attr("type", "text").css("border", "2px #e2dfd0  dashed").attr("value", t.content);
            Component.ComponentEvent.Init(n, t);
            var a = Component.ContainerDiv(t);
            return !0 === t.withLabel && (a.append($('<span class="comp-title-span"></span>').append(t.label)).append(e), a.append(t.isLabelInTop ? "<br>" : "")), a.append(n), "loadLivePrototype" !== global_var.current_modal && a.css("display", "none"), $("<div></div>").append(a).html()
        },
        Hidden: function (t) {
            t.content = !0 === t.isFromTableNew ? t.secondContent : t.content;
            Component.AddMandatoryStar(t);
            var e = $("<input></input>").addClass("form-control").attr("style", gui_component.defaultCSS.EditBox + Component.ReplaceCSS(t.css)).attr("type", "hidden").attr("value", t.content);
            Component.ComponentEvent.Init(e, t);
            var n = Component.ContainerDiv(t);
            return n.append(e), $("<div></div>").append(n).html()
        },
        InnerEditBox: function (t) {
            t.content = !0 === t.isFromTableNew ? t.secondContent : t.content;
            var e = Component.ContainerDiv(t),
                n = $("<input></input>").attr("style", gui_component.defaultCSS.InnerEditBox + Component.ReplaceCSS(t.css)).attr("type", "text").attr("value", t.content);
            return Component.ComponentEvent.Init(n, t), e.append(n), $("<div></div>").append(e).html()
        },
        Image: function (t) {
            var e = Component.ContainerDiv(t),
                n = $('<div class="col-lg-12 biyzad text-center">').css("border", "1px solid gray").append($("<h5>").append("No Image")).append(t.showProperties ? $("<i class='fa fa-plus'>").css("font-size", "20px").attr("onclick", "new UserStory().setGUIComponentUploadImage()") : ""),
                a = $("<img></img>").attr("sa-type", "image").attr("style", gui_component.defaultCSS.Image + Component.ReplaceCSS(t.css)).attr("src", t.content);
            return Component.ComponentEvent.Init(a, t), e.append(a), t.content || e.append(n), $("<div></div>").append(e).html()
        },
        Youtube: function (t) {
            var e = Component.ContainerDiv(t),
                n = $("<iframe></iframe>").attr("style", gui_component.defaultCSS.Youtube + Component.ReplaceCSS(t.css)).attr("src", "https://www.youtube.com/embed/" + t.content);
            return Component.ComponentEvent.Init(n, t), e.append(n), $("<div></div>").append(e).html()
        },
        FilePicker: function (t) {
            var e = Component.AddMandatoryStar(t),
                n = $("<input></input>").addClass("form-control").attr("sa-type", "filepicker").attr("style", gui_component.defaultCSS.FilePicker + Component.ReplaceCSS(t.css)).attr("type", "file").attr("value", t.content);
            Component.ComponentEvent.Init(n, t);
            var a = Component.ContainerDiv(t);
            return !0 === t.withLabel && (a.append($('<span class="comp-title-span"></span>').append(t.label).append(e)), a.append(t.isLabelInTop ? "<br>" : "")), a.append($("<form><form>").append(n)), a.append('<div id="progress_bar_new"></div>'), $("<div></div>").append(a).html()
        },
        Date: function (t) {
            var e = Component.AddMandatoryStar(t),
                n = $("<input></input>").attr("sa-type", "date").addClass("form-control").attr("style", gui_component.defaultCSS.Date + Component.ReplaceCSS(t.css)).attr("type", "date").attr("value", t.content);
            Component.ComponentEvent.Init(n, t);
            var a = Component.ContainerDiv(t);
            return !0 === t.withLabel && (a.append($('<span class="comp-title-span"></span>').append(t.label).append(e)), a.append(t.isLabelInTop ? "<br>" : "")), a.append(n), $("<div></div>").append(a).html()
        },
        Time: function (t) {
            var e = Component.AddMandatoryStar(t),
                n = $("<input></input>").addClass("form-control").attr("sa-type", "time").attr("style", gui_component.defaultCSS.Time + Component.ReplaceCSS(t.css)).attr("type", "time").attr("value", t.content);
            Component.ComponentEvent.Init(n, t);
            var a = Component.ContainerDiv(t);
            return !0 === t.withLabel && (a.append($('<span class="comp-title-span"></span>').append(t.label).append(e)), a.append(t.isLabelInTop ? "<br>" : "")), a.append(n), $("<div></div>").append(a).html()
        },
        TextArea: function (t) {
            var e = Component.AddMandatoryStar(t),
                n = $("<textarea></textarea>").addClass("form-control").attr("style", gui_component.defaultCSS.TextArea + Component.ReplaceCSS(t.css)).attr("rows", "3").text(t.content);
            Component.ComponentEvent.Init(n, t);
            var a = Component.ContainerDiv(t);
            return !0 === t.withLabel && (a.append($('<span class="comp-title-span"></span>').append(t.label).append(e)), a.append(t.isLabelInTop ? "<br>" : "")), a.append(n), $("<div></div>").append(a).html()
        },
        SelectBox: function (t) {
            var e = Component.AddMandatoryStar(t),
                n = $("<select></select>").addClass("form-control").addClass("sa-sct-full-width").attr("sa-type", "select").attr("data-actions-box", "true").attr("data-live-search", "true").attr("style", gui_component.defaultCSS.SelectBox + Component.ReplaceCSS(t.css));
            Component.ComponentEvent.Init(n, t);
            var a = Component.ContainerDiv(t);
            !0 === t.withLabel && (a.append($('<span class="comp-title-span"></span>').append(t.label).append(e)), a.append(t.isLabelInTop ? "<br>" : ""));
            var o = t.id,
                p = SAInput.getInputDetails(o, "selectFromBacklogId"),
                l = SAInput.getInputDetails(o, "selectFromInputId");
            if (p) n.addClass("hasTriggerApiCall"), n.attr("hasTriggerApiCall", "1"), n.attr("selectFromBacmkogId", p), n.attr("selectFromInputId", l);
            else if (t.content)
                for (var s = t.content.split(/\r*\n/), r = 0; r < s.length; r++) {
                    var i = "",
                        d = "";
                    try {
                        s[r].includes("::") ? (i = s[r].split("::")[0], d = s[r].split("::")[1]) : (i = s[r], d = s[r])
                    } catch (t) {
                        d = s[r]
                    }
                    n.append($("<option></option>").val(i).text(d))
                } else if ("1" === n.attr("default-value-is-null")) n.append($("<option></option>").append(""));
                else
                    for (r = 1; r < 4; r++) n.append($("<option></option>").append("Value " + r));
            return a.append(n), $("<div></div>").append(a).html()
        },
        MultiSelectBox: function (t) {
            var e = Component.AddMandatoryStar(t),
                n = $("<select></select>").addClass("form-control").attr("sa-type", "multiselect").addClass("sa-selectpicker").attr("multiple", !0).attr("data-actions-box", "true").attr("data-live-search", "true").attr("row", "4").attr("style", gui_component.defaultCSS.MultiSelectBox + Component.ReplaceCSS(t.css));
            Component.ComponentEvent.Init(n, t);
            var a = Component.ContainerDiv(t);
            !0 === t.withLabel && (a.append($('<span class="comp-title-span"></span>').append(t.label).append(e)), a.append(t.isLabelInTop ? "<br>" : ""));
            var o = t.id,
                p = SAInput.getInputDetails(o, "selectFromBacklogId"),
                l = SAInput.getInputDetails(o, "selectFromInputId");
            if (p) {
                var s = SAInput.GetInputName(l);
                triggerAPI2Fill(n, p, s)
            } else if (t.content)
                for (var r = t.content.split(/\r*\n/), i = 0; i < r.length; i++) n.append($("<option></option>").append(r[i]));
            else
                for (i = 1; i < 4; i++) n.append($("<option></option>").append("Value " + i));
            return a.append(n), $("<div></div>").append(a).html()
        },
        RadioButton: function (t) {
            var e = Component.AddMandatoryStar(t),
                n = Component.ContainerDiv(t);
            if (!0 === t.withLabel && (n.append($('<span class="comp-title-span"></span>').append(t.label).append(e)), n.append(t.isLabelInTop ? "<br>" : "")), t.content.length > 0)
                for (var a = t.content.split(/\r*\n/), o = 0; o < a.length; o++) {
                    var p = $("<input></input>").attr("type", "radio").attr("name", "optradio").attr("checked", !0);
                    Component.ComponentEvent.Init(p, t), n.append($("<label></label>").addClass("radio-inline").append(p).append($("<span class='comp-title-span'></span>").attr("style", gui_component.defaultCSS.RadioButton + Component.ReplaceCSS(t.css)).text(a[o]).append("&nbsp; ")))
                } else
                    for (o = 1; o <= 3; o++) {
                        p = $("<input></input>").attr("type", "radio").attr("name", "optradio").attr("checked", !0);
                        Component.ComponentEvent.Init(p, t), n.append($("<label></label>").addClass("radio-inline").append(p).append($("<span class='comp-title-span'></span>").attr("style", gui_component.defaultCSS.RadioButton + Component.ReplaceCSS(t.css)).text("Option " + o + "   ").append("&nbsp; ")))
                    }
            return $("<div></div>").append(n).html()
        },
        CheckBox: function (t) {
            var e = Component.AddMandatoryStar(t),
                n = Component.ContainerDiv(t);
            if (!0 === t.withLabel && (n.append($('<span class="comp-title-span></span>').append(t.label).append(e)), n.append(t.isLabelInTop ? "<br>" : "")), t.content.length > 0)
                for (var a = t.content.split(/\r*\n/), o = 0; o < a.length; o++) {
                    var p = $("<input></input>").attr("sa-type", "checkbox").attr("type", "checkbox").attr("checked", !0);
                    Component.ComponentEvent.Init(p, t), n.append($("<label></label>").addClass("radio-inline").append(p).append($("<span class='comp-title-span'></span>").attr("style", gui_component.defaultCSS.CheckBox + Component.ReplaceCSS(t.css)).text(a[o]).append("&nbsp; ")))
                } else
                    for (o = 1; o <= 3; o++) {
                        p = $("<input></input>").attr("type", "checkbox").attr("sa-type", "checkbox").attr("name", "optradio").attr("checked", !0);
                        Component.ComponentEvent.Init(p, t), n.append($("<label></label>").addClass("radio-inline").append(p).append($("<span class='comp-title-span'></span>").attr("style", gui_component.defaultCSS.CheckBox + Component.ReplaceCSS(t.css)).text("Option " + o + "   ").append("&nbsp; ")))
                    }
            return $("<div></div>").append(n).html()
        },
        Label: function (t) {
            t.content = !0 === t.isFromTableNew ? t.secondContent : t.content;
            var e = Component.AddMandatoryStar(t),
                n = Component.ContainerDiv(t),
                a = t.content ? t.content : t.label,
                o = $('<span class="comp-title-span"></span>').attr("style", gui_component.defaultCSS.Label + Component.ReplaceCSS(t.css)).append(a).append(e);
            return Component.ComponentEvent.Init(o, t), n.append(o), $("<div></div>").append(n).html()
        },
        Hiperlink: function (t) {
            t.content = !0 === t.isFromTableNew ? t.secondContent : t.content;
            var e = $("<a></a>").attr("style", gui_component.defaultCSS.Hiperlink + Component.ReplaceCSS(t.css)).text(t.label).append("<br>");
            Component.ComponentEvent.Init(e, t), t.param1 ? e.attr("href", "#") : t.content ? e.attr("href", t.content) : e.attr("href", "#");
            var n = Component.ContainerDiv(t);
            return t.isFromTable ? n.append("") : n.append("<br>"), n.append(e), $("<div></div>").append(n).html()
        },
        InnerRadioButton: function (t) {
            t.content = !0 === t.isFromTableNew ? t.secondContent : t.content;
            var e = Component.AddMandatoryStar(t),
                n = Component.ContainerDiv(t),
                a = $("<input></input>").attr("type", "radio");
            return Component.ComponentEvent.Init(a, t), n.append(a).append($("<span class='comp-title-span'></span>").attr("style", gui_component.defaultCSS.InnerRadioButton + Component.ReplaceCSS(t.css)).text(t.content ? t.content : t.label).append(e).append("<br>")), $("<div></div>").append(n).html()
        },
        InnerCheckBox: function (t) {
            t.content = !0 === t.isFromTableNew ? t.secondContent : t.content;
            var e = Component.AddMandatoryStar(t),
                n = Component.ContainerDiv(t),
                a = $("<input></input>").attr("sa-type", "checkbox").attr("type", "checkbox");
            return Component.ComponentEvent.Init(a, t), n.append(a).append($("<span class='comp-title-span'></span>").attr("style", gui_component.defaultCSS.InnerCheckBox + Component.ReplaceCSS(t.css)).text(t.content ? t.content : t.label).append(e).append("<br>")), $("<div></div>").append(n).html()
        },
        InnerLine: function (t) {
            var e = Component.ContainerDiv(t),
                n = $("<hr></hr>").attr("style", gui_component.defaultCSS.InnerLine + Component.ReplaceCSS(t.css));
            return Component.ComponentEvent.Init(n, t), e.append(n), $("<div></div>").append(e).html()
        },
        Icon: function (t) {
            t.content = t.content ? t.content : "fa-user-circle";
            var e = Component.ContainerDiv(t);
            t.isFromTable ? e.append("") : e.append("<br>");
            var n = $("<i></i>").addClass("fa " + t.content).attr("style", Component.ReplaceCSS(t.css));
            return Component.ComponentEvent.Init(n, t), e.append(n), $("<div></div>").append(e).html()
        },
        Button: function (t) {
            t.content = t.content ? t.content : t.label;
            var e = $("<input></input>").addClass("form-control").attr("style", gui_component.defaultCSS.Button + Component.ReplaceCSS(t.css)).attr("type", "button").attr("value", t.content);
            Component.ComponentEvent.Init(e, t);
            var n = Component.ContainerDiv(t);
            return t.isFromTable ? n.append("") : n.append("<br>"), n.append(e), $("<div></div>").append(n).html()
        },
        FreeHtml: function (t) {
            var e = this.SectionAction.FreeEmptyEmptyMessage();
            if (t.content.length > 0) try {
                e = replaceTagsReverse(t.content)
            } catch (t) {}
            var n = Component.ContainerDiv(t);
            return n.append(e), $("<div></div>").append(n).html()
        },
        FreeComponent: function (t) {
            t.content = !0 === t.isFromTableNew ? t.secondContent : t.content;
            var e = Component.AddMandatoryStar(t),
                n = $("<div>");
            t.content && t.content.length > 1 && (n = $(replaceTagsReverse(t.content))), n.attr("style", Component.ReplaceCSS(t.css)).append(e), Component.ComponentEvent.Init(n, t);
            var a = Component.ContainerDiv(t);
            return a.append(n), $("<div></div>").append(a).html()
        },
        Section4: function (t, e) {
            var n = this.SectionAction.SectionEmptyMessage(t.id);
            if (t.param1 > 0) try {
                var a = "__" + makeId(15);
                n = "<div class='loaderSection' pid='" + t.param1 + "' id='" + a + "'><div>", (new UserStory).hasSequence(t.sequence, t.param1), t.sequence.push(t.param1);
                var o = new Carrier;
                o.setLineId(e.getLineId()), o.set("param1", t.param1), o.set("sectionId", a), o.set("sequence", t.sequence), o.setBacklogId(t.param1), _LoadSectionGuiContainer(o)
            } catch (t) {}
            t.hasOnClickEvent = !0;
            var p = Component.ContainerDiv(t);
            return p.append(this.SectionAction.GetPropertiesSection(t)), p.append($('<div class="row">').addClass("component-section-row filedset-style-section").append($("<span>").addClass("section-legend").text("section")).append(n)), $("<div></div>").append(p).html()
        },
        Section: function (t) {
            var e = this.SectionAction.SectionEmptyMessage(t.id);
            if (t.param1 > 0) try {
                loadBacklogInputsByIdIfNotExist(t.param1);
                var n = SAInput.toJSONByBacklog(t.param1);
                (new UserStory).hasSequence(t.sequence, t.param1), t.sequence.push(t.param1), e = (new UserStory).getGUIDesignHTMLBody(n, 0, t.sequence)
            } catch (t) {}
            t.hasOnClickEvent = !0, t.showProperties = !0;
            var a = Component.ContainerDiv(t);
            return a.append(this.SectionAction.GetPropertiesSection(t)), Component.SectionAction.AddSectionToggle.InitToogle(t, a, e), $("<div></div>").append(a).html()
        },
        Group: function (t) {
            var e = this.GroupAction.GroupHeader(t),
                n = this.GroupAction.GroupBody(t.fkInputTableId);
            t.hasOnClickEvent = !0, t.showProperties = !0;
            var a = Component.ContainerDiv(t);
            return a.append(e), Component.SectionAction.AddSectionToggle.InitToogle(t, a, n), $("<div></div>").append(a).html()
        },
        GroupAction: {
            GroupBody: function (t) {
                var e = $("<div>"),
                    n = SAInput.Tables[t].fkInputId.split(",");
                n = Component.InputTableAction.SetColumnsOrder(n);
                for (var a = !1, o = 0; o < n.length; o++) {
                    var p = n[o].trim();
                    if (0 !== p.length) {
                        a = !0;
                        var l = new ComponentInfo;
                        Component.FillComponentInfo(l, SAInput.Inputs[p]);
                        var s = Component.GetComponentHtmlNew(l);
                        e.append(s)
                    }
                }
                return a || e.html(Component.GroupAction.GroupEmptyMessage()), e.html()
            },
            GroupHeader: function (t) {
                return "loadLivePrototype" === global_var.current_modal && t.showProperties ? $('<div class="col-lg-12 text-right">').attr("id", "comp_id_" + t.id).css("padding-top", "15px").append(" &nbsp;").append(Component.InputTableAction.GenAddColumn(t)).append(" &nbsp;").append(Component.InputTableAction.GenTableProperties(t)).append(" &nbsp;").append(Component.InputTableAction.GenRemoveTable(t)).append(" ") : ""
            },
            GroupEmptyMessage: function () {
                return '<div class="col-lg-12" style="padding:30px;text-align:center"><h5> No Input has been entered on this group</h5></div>'
            }
        },
        SectionAction: {
            AddSectionToggle: {
                InitToogle: function (t, e, n) {
                    var a = $('<div class="row">'),
                        o = $('<i class="fas fa-chevron-up">');
                    Component.SectionAction.AddSectionToggle.ControlSectionTogglePassive(t, a, o), Component.SectionAction.AddSectionToggle.AddToogleBodyByInnerHtml(t, e, a, n), Component.SectionAction.AddSectionToggle.AddSectionToogleIconButton(t, e, o)
                },
                AddToogleBodyByInnerHtml: function (t, e, n, a) {
                    e.append(n.addClass("component-section-row").addClass("filedset-style-section").addClass("modal-hide-btn-class").attr("data-section-title", t.label).append(a))
                },
                AddSectionToogleIconButton: function (t, e, n) {
                    try {
                        cr_input_comp_attribute_kv[t.id]["sa-section-toggle"] && e.append($("<span>").append(n).addClass("open-modal-hide-modal-btn"))
                    } catch (t) {}
                },
                ControlSectionTogglePassive: function (t, e, n) {
                    try {
                        if (cr_input_comp_attribute_kv && cr_input_comp_attribute_kv[t.id] && cr_input_comp_attribute_kv[t.id]["sa-section-toggle-passive"]) {
                            var a = "0px";
                            cr_input_comp_attribute_kv[t.id]["sa-section-toggle-height"] && (a = cr_input_comp_attribute_kv[t.id]["sa-section-toggle-height"]), $('<i class="fas fa-chevron-down">'), e.css("height", a), e.addClass("closed-modal")
                        }
                    } catch (t) {}
                }
            },
            GetPropertiesSection: function (t) {
                return "loadLivePrototype" === global_var.current_modal && t.showProperties ? $('<div class="col-lg-12 text-right">').addClass("live-prototype-component-properties").attr("id", "comp_id_" + t.id).css("padding-top", "15px").append(" &nbsp;").append(this.GenAddUserStory(t)).append(" &nbsp;").append(this.GenRedirectTo(t)).append(" &nbsp;").append(this.GenTableProperties(t)).append("  &nbsp;&nbsp;").append(this.GenMoveDrag(t)).append("  &nbsp;&nbsp;&nbsp;").append(this.GenRemoveSection(t)).append(" ") : ""
            },
            SectionEmptyMessage: function (t) {
                return '<div class="col-lg-12" style="padding:30px;text-align:center"><h5> No User Story has been entered on this section</h5><i class="fa fa-plus" title="Add User Story" onclick="fillSectionUserStory(\'' + t + '\')" \n                    style="font-size: 30px; color: rgb(213, 214, 218); cursor: pointer;" aria-hidden="true"></i>'
            },
            FreeEmptyEmptyMessage: function () {
                return '<div class="col-lg-12" style="padding:30px;text-align:center"><h5> No HTML Content has been entered on this component</h5></div>'
            },
            GenAddUserStory: function (t) {
                return $('<i class="fa fa-plus">').css("font-size", "14px").attr("title", "Add User Story").css("color", "#d5d6da !important").css("cursor", "pointer").attr("onclick", "fillSectionUserStory('" + t.id + "')")
            },
            GenRedirectTo: function (t) {
                return $('<i class="fa fa-mail-forward">').css("font-size", "14px").attr("title", "Redirect to").css("color", "#d5d6da !important").css("cursor", "pointer").attr("onclick", "new UserStory().redirectUserStoryCore('" + t.param1 + "')")
            },
            GenTableProperties: function (t) {
                return $('<i class="fa fa-table">').css("font-size", "14px").attr("title", "Table Properties").css("color", "#d5d6da !important").css("cursor", "pointer").addClass("component-class").attr("onclick", "readInputTableProperties(this,'" + t.id + "')")
            },
            GenMoveDrag: function (t) {
                return $('<i class="fa fa-arrows-alt">').attr("title", "Move Table with Drag and Drop").css("font-size", "14px").css("color", "#d5d6da").css("cursor", "pointer")
            },
            GenReadFromContent: function (t) {
                var e = "1" === SAInput.Tables[t.fkInputTableId].readContent ? "#2196F3" : "#d5d6da";
                return $('<i class="fa fa-inbox">').attr("title", "Read From Content").css("font-size", "14px").css("color", e).css("cursor", "pointer").attr("onclick", "setInputTableReadFromContent(this,'" + t.fkInputTableId + "')")
            },
            GenRemoveSection: function (t) {
                return $('<i class="fa fa-trash-o">').attr("title", "Remove Table").css("font-size", "14px").css("color", "#d5d6da").css("cursor", "pointer").attr("onclick", "removeSection(this,'" + t.id + "')")
            }
        },
        Tab: function (t) {
            var e = "";
            t.inputTable;
            if (t.param1 > 0) {
                var n = SAInput.toJSONByBacklog(t.param1);
                (new UserStory).hasSequence(t.sequence, t.param1), t.sequence.push(t.param1), e = (new UserStory).getGUIDesignHTMLBody(n, 0, t.sequence)
            }
            var a = Component.ContainerDiv(t);
            return a.append($("<div class='row'></div>").append(e)), $("<div></div>").append(a).html()
        }
    };