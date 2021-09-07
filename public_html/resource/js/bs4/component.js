function ComponentInfo() {
    this.showProperties = true;
    this.isFromTableNew = false;
    this.fkInputTableId = "";
    this.inputType = "";
    this.orderNo = "";
    this.label = "";
    this.tableName = "";
    this.componentType = "";
    this.secondContetn = "";
    this.content = "";
    this.cellNo = "6";
    this.param1 = "";
    this.containerCSS = "";
    this.css = "";
    this.isFromTable = false;
    this.tableRowId = 0;
    this.tableHeader = "";
    this.id = "";
    this.isDragable = false;
    this.withLabel = true;
    this.description = "";
    this.hasOnClickEvent = true;
    this.isLabelInTop = true;
    this.inputTable = "";
    this.addTooltip = true;
    this.action = "";
    this.inSection = "";
    this.event = "";
    this.relatedSUS = "";
    this.pureDescription = "";
    this.sequence = [];
    this.rowNo = "";
}
var masTab = {
    "dependingID":{},
    
    addDeend: function (dependentBacklogId,inpUtid) {
        this.dependingID[dependentBacklogId] = inpUtid;
    }
}
var Component = {
    FillComponentInfo: function (comp, inputObj) {
        comp.fkInputTableId = replaceTags(inputObj.fkRelatedCompId);
        comp.id = replaceTags(inputObj.id);
        comp.inputType = replaceTags(inputObj.inputType);
        comp.cellNo = replaceTags(inputObj.cellNo);
        comp.tableName = replaceTags(inputObj.tableName);
        comp.componentType = replaceTags(inputObj.componentType);
        comp.orderNo = replaceTags(inputObj.orderNo);
        comp.label = replaceTags(inputObj.inputName);
        comp.content = replaceTags(inputObj.inputContent);
        comp.param1 = replaceTags(inputObj.param1);
        comp.containerCSS = replaceTags(inputObj.param2);
        comp.css = replaceTags(inputObj.param4) + ";" + replaceTags(inputObj.param3);
        comp.event = replaceTags(inputObj.inputEvent);
        comp.action = replaceTags(inputObj.action);
        comp.inSection = replaceTags(inputObj.section);
        comp.relatedSUS = replaceTags(inputObj.param1);
        comp.description = "";
        try {
            comp.description = new UserStory().setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc4Select(inputObj);
        } catch (e) {
            comp.description = new UserStory().setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc(inputObj); //for BView.htmt
        }

        try {
            comp.pureDescription = SAInputDesc.getDescriptionByIn(inputObj.id);
        } catch (e) {
            comp.pureDescription = replaceTags(inputObj.description);
        }

        try {
            comp.inputTable = replaceTags(inputObj.inputTable);
        } catch (err) {
            comp.inputTable = "";
        }
    },
    GetComponentHtmlNew: function (comp) {
        comp.componentType = replaceTags(comp.componentType);
        comp.content = replaceTags(comp.content);
        comp.css = replaceTags(Component.ReplaceCSS(comp.css));
        comp.label = replaceTags(comp.label);
        comp.tableHeader = comp.label;
        var tcnt = comp.content;
        comp.label = (comp.componentType !== 'hlink' && comp.isFromTable === true) ? '' : comp.label;
        comp.content = (comp.isFromTableNew === false) && (comp.isFromTable === true) && (comp.componentType !== 'txa') && (comp.componentType !== 'cmb') &&
            (comp.componentType !== 'mcmb') && (comp.componentType !== 'rbtn') && (comp.componentType !== 'cbox') &&
            (comp.componentType !== 'btn') && (comp.componentType !== 'hlink') ?
            "cell_" + comp.tableRowId : comp.content;
        var st = '';
        if (comp.inputType === 'IN' || comp.inputType === 'GUI') {
            st += this.GetComponentHtlmByType(comp);
        } else if (comp.inputType === 'TBL' || comp.inputType === 'tbl') {
            st += this.InputTable(comp);
        } else if (comp.inputType === 'TAB' || comp.inputType === 'tab') {
            st += this.InputTab(comp);
        }
        return st;
    },
    GetComponentHtlmByType: function (comp) {

        var st = "";
        switch (comp.componentType) {
            case "txt":
                st += Component.EditBox(comp);
                break;
            case "txa":
                st += Component.TextArea(comp);
                break;
            case "cmb":
                st += Component.SelectBox(comp);
                break;
            case "mcmb":
                st += Component.MultiSelectBox(comp);
                break;
            case "rbtn":
                st += Component.RadioButton(comp);
                break;
            case "cbox":
                st += Component.CheckBox(comp);
                break;
            case "date":
                st += Component.Date(comp);
                break;
            case "time":
                st += Component.Time(comp);
                break;
            case "lbl":
                st += Component.Label(comp);
                break;
            case "irbtn":
                st += Component.InnerRadioButton(comp);
                break;
            case "icbox":
                st += Component.InnerCheckBox(comp);
                break;
            case "iedit":
                st += Component.InnerEditBox(comp);
                break;
            case "hr":
                st += Component.InnerLine(comp);
                break;
            case "btn":
                st += Component.Button(comp);
                break;
            case "hdn":
                st += Component.Hidden(comp);
                break;
            case "hcrr":
                st += Component.HiddenCarrier(comp);
                break;
            case "sctn":
                st += Component.Section(comp);
                break;
            case "fhtml":
                st += Component.FreeHtml(comp);
                break;
            case "fcomp":
                st += Component.FreeComponent(comp);
                break;
            case "icon":
                st += Component.Icon(comp);
                break;
            case "tab":
                st += Component.Tab(comp);
                break;
            case "file":
                st += Component.FilePicker(comp);
                break;
            case "hlink":
                st += Component.Hiperlink(comp);
                break;
            case "img":
                st += Component.Image(comp);
                break;
            case "ytube":
                st += Component.Youtube(comp);
                break;
            default:
                st += Component.EditBox(comp);
        }
        return st;
    },
    ComponentEvent: {
        Init: function (el, comp) {


            Component.ComponentEvent.addClassToElement(el, comp);
            Component.ComponentEvent.addAttrToElement(el, comp);
            Component.ComponentEvent.addEventToElement(el, comp);


            $(el).addClass("component-input-class")
                .attr('row-no', comp.rowNo)
                .attr("pdid", comp.id);

            Component.ComponentEvent.addId2Component(el, comp);
            Component.ComponentEvent.setPureEventByDescription(el, comp);
            if (comp.action === 'close') {
                Component.ComponentEvent.getCloseEvent(el);
            } else if (comp.action === 'popup') {
                Component.ComponentEvent.getPopupEvent(el, comp);
            } else if (comp.action === 'redirect') {
                Component.ComponentEvent.getRedirectEvent(el, comp);
            } else if (comp.action === 'fill') {
                Component.ComponentEvent.getFillEvent(el, comp);
            } else if (comp.action === 'save') {
                Component.ComponentEvent.getCloseEvent(el);
                Component.ComponentEvent.getSaveEvent(el, comp);
            } else if (comp.action === 'delete') {
                Component.ComponentEvent.getDeleteEvent(el, comp);
            }
        },
        addClassToElement: function (el, comp) {

            try {
                var classElList = cr_comp_input_classes[comp.id];
                if (classElList) {
                    var cl = classElList.split(',');
                    for (var i = 0; i < cl.length; i++) {
                        var classId = cl[i];
                        var className = cr_gui_classes[classId].className;
                        className = className.replace(".", "");
                        el.addClass(className);

                        if (global_var.current_modal === 'loadLivePrototype' &&
                            (className === 'sa-onloadclick' || className === 'sa-onloadchange' ||
                                className === 'sa-onloadclick-async' || className === 'sa-onloadchange-async')) {
                            el.addClass('init-on-loader')
                        }
                    }
                }
            } catch (err) {}
        },
        addAttrToElement: function (el, comp) {
            try {
                var cl = cr_input_comp_attribute[comp.id];
                for (var i = 0; i < cl.length; i++) {
                    var kv = cl[i];
                    var key = Object.keys(kv)[0];
                    var val = kv[key];
                    el.attr(key, val);
                }
            } catch (err) {}
        },
        addEventToElement: function (el, comp) {
            try {
                var eventList = cr_input_action_rel[comp.id];
                for (var i = 0; i < eventList.length; i++) {
                    var relId = eventList[i];
                    var obj = cr_input_action_rel_list[relId];
                    var eventType = obj.actionType;
                    var apiId = obj.fkApiId;
                    el.attr(eventType + "_trigger_id", apiId);
                    el.attr(eventType, "triggerAPI(this,'" + apiId + "')");
                }
            } catch (err) {}
        },

        setPureEventByDescription: function (el, comp) {
            try {

                if (comp.pureDescription.includes('fn_(isnoteditable)')) {
                    el.prop("disabled", true);
                }
                if (comp.pureDescription.includes('fn_(isreadonly)')) {
                    el.prop("readonly", true);
                }
                if (comp.pureDescription.includes('fn_(Placeholderis)')) {
                    var res = getParamFromFnline(comp.pureDescription, 'fn_(Placeholderis)', 'Placeholderis');
                    el.prop("placeholder", res);
                }

                if (comp.pureDescription.includes('fn_(Defaultvalueis)')) {
                    var res = getParamFromFnline(comp.pureDescription, 'fn_(Defaultvalueis)', 'defaultval');
                    el.attr('value', res);
                }
            } catch (err) {

            }
        },
        addId2Component: function (el, comp) {
            el.attr('id', 'comp_id_' + comp.id);
        },
        getEventLine: function (comp) {
            var res = comp.event + "=''";
            return res;
        },
        getCloseEvent: function (el) {
            el.attr("data-dismiss", 'modal');
        },
        getPopupEvent: function (el, comp) {
            try {
                el.attr("onclick", "new UserStory().setGUIComponentButtonGUIModal('" + comp.relatedSUS + "',this)");
            } catch (err) {}
        },
        getRedirectEvent: function (el, comp) {
            try {
                //                var ev = comp.event.length===0 ? "onclick" : comp.event;
                el.attr("onclick", "new UserStory().setGUIComponentRedirectGUIModal(this,'" + comp.relatedSUS + "',event)");
            } catch (err) {}
        },
        getFillEvent: function (el, comp) {
            try {
                //                var ev = comp.event.length===0 ? "onclick" : comp.event;
                el.attr("onclick", "new UserStory().setGUIComponentFillGUIModal(this,'" +
                    comp.relatedSUS + "','" + comp.inSection + "')");
            } catch (err) {}
        },
        getSaveEvent: function (el) {
            try {
                //                var ev = comp.event.length===0 ? "onclick" : comp.event;
                //                el.attr("data-dismiss", 'modal');
                el.attr("onclick", "new UserStory().setGUIComponentSaveGUIModal(this,event)");
            } catch (err) {}
        },
        getDeleteEvent: function (el) {
            try {
                el.attr("onclick", "new UserStory().setGUIComponentDeleteGUIModal(this)");
            } catch (err) {}
        }

    },
    ContainerDiv: function (comp) {
        if (!comp.cellNo) {
            comp.cellNo = 12;
        }
        var div = $('<div></div>')

            .attr('data-toggle', 'tooltip') //muveqqeti baglayaq
            .attr("orderNo", comp.orderNo)
            .attr('style', Component.ReplaceCSS(comp.containerCSS))
            .attr('id', comp.id)
            .attr('pid', comp.id)

            .addClass(global_var.current_modal === 'loadLivePrototype' ? 'draggable' : '')
            .addClass(global_var.current_modal === 'loadLivePrototype' ? 'resize1' : "")
            //                .addClass('popup')
            .addClass(comp.addTooltip ? 'tooltipMan' : "") //muveqqeti baglayaq
            .addClass('component-class')
            .addClass('component-container-dashed')
            .addClass('col-lg-' + comp.cellNo);

        if (global_var.current_modal === 'loadLivePrototype') {
            div.attr('ondragover', 'allowDrop(event)')
                .attr('ondragstart', 'drag(event)')
                .attr('ondrop', 'drop(event)')

        }

        //add classes to container
        try {
            var classList = cr_cont_input_classes[comp.id];
            if (classList) {
                var cl = classList.split(',');
                for (var i = 0; i < cl.length; i++) {
                    var classId = cl[i];
                    var className = cr_gui_classes[classId].className;
                    className = className.replace(".", "");
                    div.addClass(className);


                    var classBody = cr_gui_classes[classId].classBody;
                    try {
                        if (classBody.length > 1) {
                            var r = classBody.split(/\r*\n/);
                            for (var j = 0; j < r.length; j++) {
                                try {
                                    var key = r[j].split(':')[0];
                                    var val = r[j].split(':')[1];
                                    val = val.replace(";", "");
                                    div.css(key, val);
                                } catch (err) {}
                            }
                        }
                    } catch (err) {}

                }
            }
        } catch (err) {}


        //add attributes to container
        try {
            var cl = cr_input_cont_attribute[comp.id];
            for (var i = 0; i < cl.length; i++) {
                var kv = cl[i];
                var key = Object.keys(kv)[0];
                var val = kv[key];
                div.attr(key, val);
            }
        } catch (err) {}



        //        div.append(global_var.current_modal === 'loadLivePrototype' && comp.showProperties
        //                ? $('<button type="button" class="btn fa fa-ellipsis-h popup-btn" data-toggle="modal" data-target="#exampleModal" id="popup-btn' + comp.id + '" ></button>')
        //                : "")

        if (comp.hasOnClickEvent) {
            div.attr('onclick', (global_var.current_modal === 'loadLivePrototype') ?
                'new UserStory().setInputByGUIComponent(\'' + comp.id + '\')' :
                "")

            if (global_var.current_modal === 'loadLivePrototype') {

                div.addClass("hover-prototype-selector").append($("<div>").addClass("tool_element_edit").attr("comp-Id", comp.id)
                    .append(`<div style='display:inline-block;' class="dropdown">
                        <span class="figureAddbtn" onclick="fillRelatedApi4InputEvent('${comp.id}')" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fab fa-asymmetrik" aria-hidden="true"></i>
                        </span>
                        <div class="dropdown-menu dropdown-menu-large-btn" aria-labelledby="dropdownMenuButton">
                        <div class="row animation-block-for-find">                      
                        <div class="col-12">
                            <fieldset class="border p-2">
                                <legend class="w-auto w-auto-man">
                                    Event Relation
                                </legend>
                    
                                Event<br>
                                <select class=" form-control input_event_type">
                                    <option value="onclick">onclick</option>
                                    <option value="onchange">onchange</option>
                                    <option value="ondblclick">ondblclick</option>
                                </select><br>
                    
                                Related API<br>
                                <select  class="form-control input_event_related_api">                                                        
                                </select>
                    
                                <i onclick='insertNewInputActionRel(this)' class="fa fa-plus"></i>
                                <br><br>
                                <table style='border: 1px solid #dee2e6; width:100%;'>
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>API</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class='input_event_related_api_table_list_body'>
                    
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                    
                    
                    </div>
                        </div>
                      </div>`)
                    .append(`<div style='display:inline-block;' class="dropdown">
                        <span class="figureAddbtn"  type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-paint-brush"></i>
                        </span>
                        <div class="dropdown-menu dropdown-menu-large-btn" aria-labelledby="dropdownMenuButton1">
                        <div class="row animation-block-for-find">                      
                        <div class="col-12 "  style="display:flex;flex-wrap:wrap">
                            <fieldset class="border p-2">
                            <legend class="w-auto w-auto-man">
                                background-color
                            </legend>
                            <div class="figureBgSelectOption">
                            <button data-bgcolorspan="transparent" style="background-color: transparent;" class="ColopickerSpanLine  change-color-component gactive"><i class="fas fa-times"></i></button>
                            <button data-bgcolorspan="#007bff" style="background-color: #007bff;" class="ColopickerSpanLine  change-color-component "></button>
                            <button data-bgcolorspan="#6c757d" style="background-color: #6c757d;" class="ColopickerSpanLine change-color-component "></button>
                            <button data-bgcolorspan="#28a745" style="background-color: #28a745;" class="ColopickerSpanLine change-color-component"></button>
                            <button data-bgcolorspan="#dc3545" style="background-color: #dc3545;" class="ColopickerSpanLine change-color-component"></button>
                            <button data-bgcolorspan="#ffc107" style="background-color: #ffc107;" class="ColopickerSpanLine change-color-component"></button>
                            <button data-bgcolorspan="#17a2b8" style="background-color: #17a2b8;" class="ColopickerSpanLine change-color-component "></button>
                            <button data-bgcolorspan="#343a40" style="background-color: #343a40;" class="ColopickerSpanLine change-color-component"></button>
                 
                            </div>
                            </fieldset>
                            <fieldset class="border p-2">
                            <legend class="w-auto w-auto-man">
                                font-color
                            </legend>
                            <div class="figureBgSelectOption">
                            <button data-bgcolorspan="black" style="background-color: transparent;" class="ColopickerSpanLine  change-font-component gactive"><i class="fas fa-times"></i></button>
                            <button data-bgcolorspan="#007bff" style="background-color: #007bff;" class="ColopickerSpanLine  change-font-component "></button>
                            <button data-bgcolorspan="#6c757d" style="background-color: #6c757d;" class="ColopickerSpanLine change-font-component "></button>
                            <button data-bgcolorspan="#28a745" style="background-color: #28a745;" class="ColopickerSpanLine change-font-component"></button>
                            <button data-bgcolorspan="#dc3545" style="background-color: #dc3545;" class="ColopickerSpanLine change-font-component"></button>
                            <button data-bgcolorspan="#ffc107" style="background-color: #ffc107;" class="ColopickerSpanLine change-font-component"></button>
                            <button data-bgcolorspan="#17a2b8" style="background-color: #17a2b8;" class="ColopickerSpanLine change-font-component "></button>
                            <button data-bgcolorspan="#343a40" style="background-color: #343a40;" class="ColopickerSpanLine change-font-component"></button>
                 
                            </div>
                            </fieldset>
                            <fieldset class=" col-6 border p-2">
                            <legend class="w-auto w-auto-man">
                            text-align
                        </legend>
                            <div class="figureBgSelectOption">
                           
                            <button data-bgalign="left"  class="ColopickerSpanLine  change-align-component "><i class="fas fa-align-left"></i></button>
                            <button data-bgalign="center"  class="ColopickerSpanLine  change-align-component "><i class="fas fa-align-center"></i></button>
                            <button data-bgalign="right"  class="ColopickerSpanLine change-align-component "><i class="fas fa-align-right"></i></button>
                           
                 
                            </div>
                            </fieldset>
                            <fieldset class=" col-6 border p-2">
                            <legend class="w-auto w-auto-man">
                            font-style
                        </legend>
                            <div class="figureBgSelectOption">
                           
                            <button data-key="font-weight" data-bgalign="bold"  class="ColopickerSpanLine  change-fstyle-component "><i class="fas fa-bold"></i></button>
                            <button data-key="font-style" data-bgalign="italic"  class="ColopickerSpanLine  change-fstyle-component "><i class="fas fa-italic"></i></button>
                            <button data-key="text-decoration" data-bgalign="underline"  class="ColopickerSpanLine change-fstyle-component "><i class="fas fa-underline"></i></button>
                           
                 
                            </div>
                            </fieldset>
                            <fieldset class=" col-6 border p-2">
                            <legend class="w-auto w-auto-man">
                            width
                        </legend>
                            <div class="figureBgSelectOption">
                            <input class="form-control col-6" type="number" name="" id="widthComponent">
                            <select name="" class="form-control bg-light form-control-sm col-6" id="getStyleVah1d1">
                       <option value="px">px</option>
                       <option value="px">rem</option>
                       <option value="px">cm</option>
                   </select>
                            </div>
                            </fieldset>
                            <fieldset class=" col-6 border p-2">
                            <legend class="w-auto w-auto-man">
                            height
                        </legend>
                            <div class="figureBgSelectOption">
                           
                            <input class="form-control col-6" type="number" name="" id="heightComponent">
                            <select name="" class="form-control bg-light form-control-sm col-6" id="getStyleVah1d2">
                       <option value="px">px</option>
                       <option value="px">rem</option>
                       <option value="px">cm</option>
                   </select>
                            </div>
                            </fieldset>
                        </div>
                    
                    
                    </div>
                        </div>
                      </div>`)
                    .append(`<div style='display:inline-block;' class="dropdown">
                        <span class="figureAddbtn"  type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-key"></i>
                        </span>
                        <div class="dropdown-menu dropdown-menu-large-btn" aria-labelledby="dropdownMenuButton1">
                        <div class="row animation-block-for-find">                      
                        <div class="col-12">
                        <fieldset class="border p-2">
                        <legend class="w-auto w-auto-man">
                            Class
                        </legend>
                        <table style="width:100%">
                            <tbody>
                                <tr>
                                    <td style="padding:5px;">

                                        <select id="gui_prop_in_gui_class_list" class="classListOnChange" style="padding:0px;border-radius:4px;border:1px solid gray;width:100%"></select>
                                    </td>
                                    <td style="width: 1%">
                                        <i class="fa fa-plus" onclick="addGuiClassToInput(this)" style="  font-size:16px;cursor:pointer;" aria-hidden="true"></i>

                                    </td>
                                    <td style="width: 1%">
                                        <i class="fa fa-bars" onclick="guiClassModal(this)" style="  font-size:16px;cursor:pointer;" aria-hidden="true"></i>

                                    </td>
                                </tr>
                                <tr class="input4NewClassAdding" style="display:none">
                                    <td style="padding:5px;" colspan="2">

                                        <input id="gui_prop_in_gui_class_new" style="padding:0px;border-radius:4px;border:1px solid gray;width:100%">
                                    </td>
                                    <td style="width: 1%">
                                        <button class="buttons" onclick="insertNewClassDirect2(this)" style="   cursor:pointer;">Add</button>

                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <table class="cst_table123" style="width:100%;font-size: 11px; ">
                            <tbody class="input_class_list_in_component"></tbody>
                        </table>

                    </fieldset>
                    <fieldset class="border p-2">
                            <legend class="w-auto w-auto-man">
                                Attributes
                            </legend>
                            <table style="width:100%">
                                <tbody>
                                    <tr>
                                        <td style="padding:5px;">
                                            <span class="col-form-label control-label">Name:</span>
                                            <input type="text" id="gui_prop_in_attr_name" style=" padding:0px;border-radius:4px;border:1px solid gray;width:100%">
                                        </td>
                                        <td style="padding:5px;">
                                            <span class="col-form-label control-label">Value:</span>
                                            <input type="text" id="gui_prop_in_attr_value" style="padding:0px;border-radius:4px;border:1px solid gray;width:100%">
                                        </td>
                                        <td>
                                            <i class="fa fa-plus" onclick="addInputAttributes2(this)" style="padding-top:20px; font-size:16px;cursor:pointer;" aria-hidden="true"></i>

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                            <table class="cst_table123" style="width:100%;font-size: 11px; ">
                                <tbody class="input_attributes_list_in_component"></tbody>
                            </table>

                        </fieldset>
                        </div>
                    
                    
                    </div>
                        </div>
                      </div>`)

                    .append('<span class="figureAddbtn component-container-button" ><i class="fas fa-bars"></i></span>')

                    .append('<span class="figureAddbtn " id="element-edit-button-hover"><i class="far fa-edit"></i></span>')
                    .append($("<select>").addClass('light-selectbox-custom')
                        .attr("id", "gui-cell-selectbox-changed")
                        .append('<option ' + (comp.cellNo == 1 ? 'selected=selected' : '') + ' value="1">1</option>')
                        .append('<option ' + (comp.cellNo == 2 ? 'selected=selected' : '') + ' value="2">2</option>')
                        .append('<option ' + (comp.cellNo == 3 ? 'selected=selected' : '') + ' value="3">3</option>')
                        .append('<option ' + (comp.cellNo == 4 ? 'selected=selected' : '') + ' value="4">4</option>')
                        .append('<option ' + (comp.cellNo == 5 ? 'selected=selected' : '') + ' value="5">5</option>')
                        .append('<option ' + (comp.cellNo == 6 ? 'selected=selected' : '') + ' value="6">6</option>')
                        .append('<option ' + (comp.cellNo == 7 ? 'selected=selected' : '') + ' value="7">7</option>')
                        .append('<option ' + (comp.cellNo == 8 ? 'selected=selected' : '') + ' value="8">8</option>')
                        .append('<option ' + (comp.cellNo == 9 ? 'selected=selected' : '') + ' value="9">9</option>')
                        .append('<option ' + (comp.cellNo == 10 ? 'selected=selected' : '') + ' value="10">10</option>')
                        .append('<option ' + (comp.cellNo == 11 ? 'selected=selected' : '') + ' value="11">11</option>')
                        .append('<option ' + (comp.cellNo == 12 ? 'selected=selected' : '') + ' value="12">12</option>')

                    )
                    .append('<span class="figureAddbtn cellWitdhAdd" cell-num=' + comp.cellNo + ' "data-add="false"><i class="fas fa-angle-left"></i></span>')
                    .append('<span class="figureAddbtn cellWitdhAdd" cell-num=' + comp.cellNo + '  data-add="true"><i class="fas fa-angle-right"></i></span>')
                    .append('<span class="figureAddbtn drag-areas-comp " ><i class="fas fa-arrows-alt"></i></span>')

                    .append($("<span>").attr("onclick", 'new UserStory().deleteInputFromUSList(this,"' + comp.id + '")').addClass("figureAddbtn delete-btn-inp").css("color", "red").append("<i class='fas fa-trash-alt'></i>"))
                )
            }

        }

        return div;
    },
    AddMandatoryStar: function (comp) {
        return ((comp.pureDescription) &&
                comp.pureDescription !== 'undefined' &&
                comp.pureDescription.includes('fn_(ismandatory)')) ?
            '<span style="color:red">*</span>' : ""
    },
    ReplaceCSS: function (arg) {
        try {
            arg = arg.replace(/##/g, "");
            return arg;
        } catch (e) {
            return arg
        }
    },
    InputTableAction: {
        GenAddColumn: function (comp) {
            return $('<i class="fa fa-plus">')
                .css("font-size", "14px")
                .attr("title", "Add new column")
                .css("color", "#d5d6da !important")
                .css("cursor", "pointer")
                .attr("onclick", "fillInputTableColumnsCombo('" + comp.fkInputTableId + "')")
        },
        GenTableProperties: function (comp) {
            return $('<i class="fa fa-table">')
                .css("font-size", "14px")
                .attr("title", "Table Properties")
                .css("color", "#d5d6da !important")
                .css("cursor", "pointer")
                .addClass("component-class")
                .attr("onclick", "readInputTableProperties(this,'" + comp.id + "')")
        },
        GenReadFromContent: function (comp) {
            var color = SAInput.Tables[comp.fkInputTableId].readContent === '1' ?
                '#2196F3' : '#d5d6da';
            return $('<i class="fa fa-inbox">')
                .attr("title", "Read From Content")
                .css("font-size", "14px")
                .css("color", color)
                .css("cursor", "pointer")
                .attr("onclick", "setInputTableReadFromContent(this,'" + comp.fkInputTableId + "')")
        },
        GenRemoveTable: function (comp) {

            return $('<i class="fa fa-trash-o">')
                .attr("title", "Remove Table")
                .css("font-size", "14px")
                .css("color", '#d5d6da')
                .css("cursor", "pointer")
                .attr("onclick", "removeInputTable(this,'" + comp.id + "','" + comp.fkInputTableId + "')")
        },
        GenMoveDrag: function (comp) {

            return $('<i class="fa fa-arrows-alt">')
                .attr("title", "Move Table with Drag and Drop")
                .css("font-size", "14px")
                .css("color", '#d5d6da')
                .css("cursor", "pointer")

        },
        RegenTableBody: function (el) {
            var tid = $(el).attr("table-id");
            var rc = $(el).val();
            var body = (rc > 0) ? this.GenInputTableBodyHtml(tid, rc).html() : "";
            $(el).parent().parent().find('tbody').html(body);
            updateRowCountInputTable(tid, rc);
        },
        RegenTableBodyDetails: function (tableId, rowCount, backlogId, startLimit, inputId) {
            var sLimit = (startLimit) ? startLimit : "0";
            var tid = tableId;
            var rc = rowCount;
            var body = this.GenInputTableBodyHtml(tid, rc, backlogId, sLimit);
            $('.component-table-class-for-zad-' + tid).find('tbody').html(body.html());

            var el12 = document.getElementById("comp_id_" + inputId);
            loadSelectBoxesAfterGUIDesign(el12);
        },
        GenRowCount: function (comp) {
            var rowCount = this.GetTableRowCount(comp.fkInputTableId);
            var select = $("<select>")
                .attr("style", "font-size:11px;padding:1px 4px;border:none")
                .attr("table-id", comp.fkInputTableId)
                .attr("onchange", "Component.InputTableAction.RegenTableBody(this)");
            for (var i = 0; i <= 15; i++) {
                var o = $('<option>').val(i).append(i);
                if (i === parseInt(rowCount))
                    o.attr('selected', true);
                select.append(o)
            }
            //                select.append( $('<option>').val("auto").append("Auto"))
            return select;
        },
        GetTableRowCount: function (tableId) {
            var rowCount = global_var.component_table_default_row_count;
            try {
                var rc = SAInput.Tables[tableId].rowCount;
                rowCount = rc.length > 0 ? rc : rowCount;
            } catch (err) {}
            return rowCount;
        },
        GenInputTableHtml: function (comp) {
            var tableId = comp.fkInputTableId;
            if (tableId.length === 0) {
                return "";
            }


            var backlogId = SAInput.getInputDetails(comp.id, "fkBacklogId");

            var rowCount = this.GetTableRowCount(tableId);
            
            var table = $("<table>")

            var thead = this.GenInputTableHeaderHtml(tableId, comp);
           // var showHide = this.GenInputTableShowHideHtml(tableId, comp);
            var tbody = this.GenInputTableBodyHtml(tableId, rowCount, backlogId);
         
            table.append(thead).append(tbody);
            return table.html();
        },
        MatchShowComponentAndId: function (col, showComponent) {
            var kv = {};
            for (var i = 0; i < col.length; i++) {
                var inputId = col[i].trim();
                if (inputId.length === 0)
                    continue;
                kv[inputId] = showComponent[i];
            }
            return kv;
        },
        GenInputTableShowHideHtml: function (tableId, comp) {
            var thead = $("<div>");
            var col = SAInput.Tables[tableId].fkInputId.split(",");

            var showComponent = SAInput.Tables[tableId].showComponent.split(",");
            var pair = this.MatchShowComponentAndId(col, showComponent);

            var showColumn = SAInput.Tables[tableId].showColumn.split(",");
            var pairShowColumn = this.MatchShowComponentAndId(col, showColumn);

            var showColumnName = SAInput.Tables[tableId].showColumnName.split(",");
            var pairShowColumnName = this.MatchShowComponentAndId(col, showColumnName);

            //            var showInTree = SAInput.Tables[tableId].showInTree.split(",");
            //            var pairShowInTree = this.MatchShowComponentAndId(col, showInTree);

            col = this.SetColumnsOrder(col);

         
            var tr = $("<ul>").addClass('table-row-show-hide-ul')/* .append(thzad.append("")) */;
            for (var i = 0; i < col.length; i++) {

                var inputId = col[i].trim();
                if (inputId.length === 0)
                    continue;


                    var type = SAInput.getInputDetails(inputId, "componentType");
                var inputName = SAInput.GetInputName(inputId);
                var a = $('<label href="#">')
                    .addClass('component-class-show-hide')
                    .attr('id', inputId)
                    .attr('pid', inputId)
                    .attr('orderNo', SAInput.getInputDetails(inputId, "orderNo"))

                    .addClass(global_var.current_modal === 'loadLivePrototype' ? 'draggable' : '')
                    .attr('onclick', (global_var.current_modal === 'loadLivePrototype') ?
                        "new UserStory().setInputByGUIComponent('" + inputId + "')" :
                        "")
                        .append("<input data-check="+inputId+" checked='true' type='checkbox'>")
                    .append(replaceTags(inputName))

                var color = pair[inputId].trim() === '1' ? "#2196F3" : "#d5d6da";
                var colorColumn = pairShowColumn[inputId].trim() === '1' ? "#2196F3" : "#d5d6da";
                var colorColumnName = pairShowColumnName[inputId].trim() === '1' ? "#2196F3" : "#d5d6da";
                //                var colorInTree = pairShowInTree[inputId].trim() === '1' ? "#2196F3" : "#d5d6da";


                var showComp = "";

                var showColumn ="";

                var showColumnName ="";

     
              if(a==""){

              }else{
                var th = $("<li>")                    //                        .css("min-width", "70px;")
                .append(a)
                .append(showComp, ' ')
                .append(showColumn, ' ')
                .append(showColumnName, ' ')
                .append($("<div>")
                           .addClass("editTools btn-group")
                           .append('<span onclick="" id="group-data-table-btm"  class="btn btn-sm btn-light table-gorup-by-th" tbid='+comp.id+' data-order='+inputId+'><i class="fas fa-layer-group"></i></span>')
                           )
               
              }
           
                //                    .append(showInTree, ' ')
                ;

                if (global_var.current_modal !== 'loadLivePrototype' &&
                    pairShowColumn[inputId].trim() === '1') {
                    th.empty().hide();
                   
                }

                if (type==='icbox'||type==='cbox') {
                    th.empty().hide();
                   
                }

                //add attribute to th tag
                try {
                    var cl = cr_input_cont_attribute[inputId];
                    for (var ii = 0; ii < cl.length; ii++) {
                        var kv = cl[ii];
                        var key = Object.keys(kv)[0];
                        var val = kv[key];
                        th.attr(key, val);
                      
                    }
                } catch (err) {}

                //add class to th tag
                try {
                    var classElList = cr_cont_input_classes[inputId];
                    if (classElList) {
                        var cl = classElList.split(',');
                        for (var iii = 0; iii < cl.length; iii++) {
                            var classId = cl[iii];
                            var className = cr_gui_classes[classId].className;
                            className = className.replace(".", "");
                          //  th.addClass(className);
                        }
                    }
                } catch (err) {}
        
            $("#"+tableId).parents('.component-container-dashed').find('.groupBySelectBox4Table').append("<option>"+th+"</option>")
                tr.append(th);
            }
            thead.append(tr);
            return thead;
        },
        GenInputTableHeaderHtml: function (tableId, comp) {
            var thead = $("<thead>");
            var col = SAInput.Tables[tableId].fkInputId.split(",");

            var showComponent = SAInput.Tables[tableId].showComponent.split(",");
            var pair = this.MatchShowComponentAndId(col, showComponent);

            var showColumn = SAInput.Tables[tableId].showColumn.split(",");
            var pairShowColumn = this.MatchShowComponentAndId(col, showColumn);

            var showColumnName = SAInput.Tables[tableId].showColumnName.split(",");
            var pairShowColumnName = this.MatchShowComponentAndId(col, showColumnName);

            //            var showInTree = SAInput.Tables[tableId].showInTree.split(",");
            //            var pairShowInTree = this.MatchShowComponentAndId(col, showInTree);

            col = this.SetColumnsOrder(col);
            var tabDepId = SAInput.getInputDetails(comp.id, "fkDependentBacklogId");
            
            var thzad = $("<th>");
            var tr = $("<tr>").append(thzad.append(""));
            var trFilter = $("<tr>").addClass("filter-table-row-header-tr redirectClass").addClass("hide-filt-drag").append($("<th>"))
            for (var i = 0; i < col.length; i++) {
                
                var inputId = col[i].trim();
                var type = SAInput.getInputDetails(inputId, "componentType");
             
                if (inputId.length === 0)
                    continue;


                var inputName = SAInput.GetInputName(inputId);
                
                if(type==="icbox"||type==="cbox"){
                    var a =  $('<label href="#">')
                    .addClass('component-class')
                    .attr('id', inputId)
                    .attr('pid', inputId)
                    .attr('orderNo', SAInput.getInputDetails(inputId, "orderNo"))

                    .addClass(global_var.current_modal === 'loadLivePrototype' ? 'draggable' : '')
                    .attr('onclick', (global_var.current_modal === 'loadLivePrototype') ?
                        "new UserStory().setInputByGUIComponent('" + inputId + "')" :
                        "")
                    .append("<input type='checkbox' class='all-check-button-allTable'>")
                }else{

                var a = (pairShowColumnName[inputId].trim() === '1') ?
                    "" :
                    $('<label href="#">')
                    .addClass('component-class')
                    .attr('id', inputId)
                    .attr('pid', inputId)
                    .attr('orderNo', SAInput.getInputDetails(inputId, "orderNo"))

                    .addClass(global_var.current_modal === 'loadLivePrototype' ? 'draggable' : '')
                    .attr('onclick', (global_var.current_modal === 'loadLivePrototype') ?
                        "new UserStory().setInputByGUIComponent('" + inputId + "')" :
                        "")
                    .append(replaceTags(inputName))
                }
                    
                var color = pair[inputId].trim() === '1' ? "#2196F3" : "#d5d6da";
                var colorColumn = pairShowColumn[inputId].trim() === '1' ? "#2196F3" : "#d5d6da";
                var colorColumnName = pairShowColumnName[inputId].trim() === '1' ? "#2196F3" : "#d5d6da";
                //                var colorInTree = pairShowInTree[inputId].trim() === '1' ? "#2196F3" : "#d5d6da";


                var showComp = (global_var.current_modal === 'loadLivePrototype') ?
                    $('<i class="fa fa-list-alt" aria-hidden="true">')
                    .css("cursor", "pointer")
                    .css('font-size', '8px')
                    .css("color", color)
                    .attr("onclick", "showInputTableColumnComponent(this,'" + tableId + "','" + inputId + "')") :
                    "";

                var showColumn = (global_var.current_modal === 'loadLivePrototype') ?
                    $('<i class="fa fa-eye" aria-hidden="true">')
                    .css("cursor", "pointer")
                    .css('font-size', '8px')
                    .css("color", colorColumn)
                    .attr("onclick", "showInputTableColumnEntireComponent(this,'" + tableId + "','" + inputId + "')") :
                    "";

                var showColumnName = (global_var.current_modal === 'loadLivePrototype') ?
                    $('<i class="fa fa-cubes" aria-hidden="true">')
                    .css("cursor", "pointer")
                    .css('font-size', '8px')
                    .css("color", colorColumnName)
                    .attr("onclick", "showInputTableColumnItselfComponent(this,'" + tableId + "','" + inputId + "')") :
                    "";

                //                var showInTree = (global_var.current_modal === 'loadLivePrototype') ?
                //                    $('<i class="fa fa-folder-open" aria-hidden="true">')
                //                    .css("cursor", "pointer")
                //                    .css('font-size', '8px')
                //                    .css("color", colorInTree)
                //                    .attr("onclick", "showInputTableColumnInTree(this,'" + tableId + "','" + inputId + "')") :
                //                    "";



                var th = $("<th>")
                    .addClass("text-center")
                    //                        .css("min-width", "70px;")
                    .append(a)
                    .append(showComp, ' ')
                    .append(showColumn, ' ')
                    .append(showColumnName, ' ')
                    .append((a==='')?"":"<span class='handle-drag btn btn-sm btn-light'><i class='fas fa-arrows-alt'></i></span>")
                //                    .append(showInTree, ' ')
                var depId = SAInput.getInputDetails(inputId, "fkDependentOutputId");
                var newelSelect = $("<select>").addClass("form-control filter-table-row-select")
                .attr("id","filter-table-row-"+inputId)
                .attr("placeholder",inputName)
                .attr("onchange","triggerAPI(this,'"+tabDepId+"')")
                .attr("data-live-search","true")
                .attr("sa-global-trigger",'1')
                /* .attr("multiple","multiple") */
                .attr("data-actions-box","true")
                .attr('filter-id',inputId)
                var newelInput = $("<input>").addClass("form-control filter-table-row-select")
                .attr("id","filter-table-row-"+inputId)
                .attr("placeholder",inputName)
                .attr("data-live-search","true")
                .attr("onchange","triggerAPI(this,'"+tabDepId+"')")
                .attr("data-actions-box","true")
                .attr("sa-global-trigger",'1')
                .attr('filter-id',inputId)
              
                if(type==="lbl"||type==="hlink"){
                    if(depId){
                  
                        var thFilt = $("<th>").addClass("hide-filt-drag").append((a=="")?"":addAttrToElementSingileByR(newelSelect, SAInput.Inputs[inputId]))  
                        
                    
                }else{
                    var thFilt = $("<th>").addClass("hide-filt-drag").append((a=="")?"":addAttrToElementSingileByR(newelInput, SAInput.Inputs[inputId])) 
                }
              
                }else{
                    var thFilt = $("<th>").addClass("hide-filt-drag").append((a=="")?"":$("<span>").addClass(" filter-table-row-select")
                    .attr("id","filter-table-row-"+inputId)
                    .attr("placeholder",inputName)
                    .attr('filter-id',inputId)) 
                }
               
                
                

                if (global_var.current_modal !== 'loadLivePrototype' &&
                    pairShowColumn[inputId].trim() === '1') {
                    th.hide();
                    thFilt.hide();
                }

                //add attribute to th tag
                try {
                    var cl = cr_input_cont_attribute[inputId];
                    for (var ii = 0; ii < cl.length; ii++) {
                        var kv = cl[ii];
                        var key = Object.keys(kv)[0];
                        var val = kv[key];
                        th.attr(key, val);
                        thFilt.attr(key, val);
                    }
                } catch (err) {}

                //add class to th tag
                try {
                    var classElList = cr_cont_input_classes[inputId];
                    if (classElList) {
                        var cl = classElList.split(',');
                        for (var iii = 0; iii < cl.length; iii++) {
                            var classId = cl[iii];
                            var className = cr_gui_classes[classId].className;
                            className = className.replace(".", "");
                            th.addClass(className);
                        }
                    }
                } catch (err) {}



              
               
                tr.append(th);
                if(global_var.current_modal !== 'loadLivePrototype'){
                    trFilter.append(thFilt);
                }

            }
            thead.append(tr);
            thead.append(trFilter);
            return thead;
        },
        TableEmptyMessage: function (tableId) {
            var msg = '<div class="col-lg-12" style="padding:30px;text-align:center">' +
                '<h5> No columns (inputs) have been entered on this table</h5>' +
                '<i class="fa fa-plus" title="Add new column" onclick="fillInputTableColumnsCombo(\'' + tableId + '\')" \n\
                    style="font-size: 30px; color: rgb(213, 214, 218); cursor: pointer;" aria-hidden="true"></i>'
            '</div>';
            return msg;
        },
        GetTableReadContent: function (tableId) {
            var readContent = '0';
            try {
                readContent = SAInput.Tables[tableId].readContent;
            } catch (err) {}
            return readContent;
        },
        GetTableCellValue: function (tableId, inputId, index) {
            var readContent = this.GetTableReadContent(tableId);
            var val = "Lorem Ipsum";
            if (readContent === '1') {
                val = "";
                try {
                    var cnt = SAInput.getInputDetails(inputId, "inputContent");
                    val = cnt.split(/\r*\n/)[index];
                } catch (err) {}
            }
            return val;
        },
        SetColumnsOrder: function (inputList) {
            var rs = {};
            var res = inputList;
            try {
                for (var j = 0; j < inputList.length; j++) {
                    var inputId = inputList[j];

                    if (inputId.trim().length === 0)
                        continue;

                    inputId = inputId.trim();

                    rs[inputId] = SAInput.getInputDetails(inputId, 'orderNo');
                }

                var keysSorted = Object.keys(rs).sort(function (a, b) {
                    return rs[a] - rs[b]
                })
                res = keysSorted;
            } catch (err) {
                console.log(err)
            }
            return res;
        },
        GenInputTableBodyHtml: function (tableId, rowCount, backlogId, startLimit) {
      
            var sLimit = (startLimit) ? startLimit : '0';
            var tbody = $('<tbody>');
            var col = SAInput.Tables[tableId].fkInputId.split(",");

            var showComponent = SAInput.Tables[tableId].showComponent.split(",");
            var showColumn = SAInput.Tables[tableId].showColumn.split(",");
            var showColumnName = SAInput.Tables[tableId].showColumnName.split(",");

            var pair = this.MatchShowComponentAndId(col, showComponent);
            var pairShowColumn = this.MatchShowComponentAndId(col, showColumn);
            var pairShowColumnName = this.MatchShowComponentAndId(col, showColumnName);

            col = this.SetColumnsOrder(col);

            var idx = 0;
            for (var j = 1; j <= rowCount; j++) {
                
                var tr = $("<tr>")
                    .addClass('redirectClass')
                    .attr("bid", backlogId)
                    //                    .append($("<td>").append("<button class='btn btn-light new-tr-add-btn btn-sm' data-pad-num='1'><i class='fas fa-chevron-right'></i></button>"))
                    .append($("<td>").append((j + parseInt(sLimit))).addClass("text-center").css("min-width",'25px'));
                for (var i = 0; i < col.length; i++) {
                    var inputId = col[i].trim();
                    if (inputId.length === 0)
                        continue;


                    idx++;
                    var val = this.GetTableCellValue(tableId, inputId, j - 1);
                 


                    if (pair[inputId].trim() === '1') {
                        var comp = new ComponentInfo();
                        Component.FillComponentInfo(comp, SAInput.Inputs[inputId]);
                
                        comp.secondContent = val;
                      
                        comp.isFromTableNew = true;
                        comp.isFromTable = true;
                        comp.tableRowId = "1";
                        comp.withLabel = false;
                        comp.hasOnClickEvent = true;
                        comp.cellNo = "12";
                        comp.showProperties = false;
                        comp.rowNo = j;
                        val = Component.GetComponentHtmlNew(comp);
                      
                    }
                       





                    var td12 = $("<td>")
                        //                            .css("min-width", "70px")
                        .addClass("component-input-class")
                        //                            .attr("sa-tableselectedfield", )
                        .addClass("component-table-input-class")
                        .attr("pdid", inputId)
                        //                            .attr("sa-data-table-row-id","")
                        .val(val)
                        .append(val);

                        
                    
                    //manage input relation with API 
                    //add dependency for API Call classes and attributes
                    //as sa_data_table_col_rel_{apiId}_{inputId}

                    var dependentBacklogId = SAInput.getInputDetails(inputId, "fkDependentBacklogId");
                    var dependentInputId = SAInput.getInputDetails(inputId, "fkDependentOutputId");
                   
                    masTab.addDeend(dependentBacklogId,inputId);
                   
                     
                    if (dependentBacklogId && dependentBacklogId.length > 0) {
                        loadBacklogInputsByIdIfNotExist(dependentBacklogId)
                        var inputSelectedField4Rel = SAInput.getInputDetails(dependentInputId, 'inputName');
                        td12.attr("rel_api", dependentBacklogId)
                            .attr('rel_core_inputid', inputId)
                            .attr('rel_core_selected_field', inputSelectedField4Rel)
                            .addClass("has_table_relation_td")
                            .addClass("sa_data_table_col_rel_" + dependentBacklogId + "_" + inputId);
                    }

                    if (global_var.current_modal !== 'loadLivePrototype' &&
                        pairShowColumn[inputId].trim() === '1') {
                        td12.hide();
                    }


                    tr.append(td12);
                }
    
                tbody.append(tr);
            }

            if (idx === 0) {
                // tbody.append(this.TableEmptyMessage(tableId));
                //tbody.html($("<tr>").append($("<td>").append(this.TableEmptyMessage(tableId))));
            }
          
            loadTableFIlterInside();
            return tbody;
        }
    },
    InputTable: function (comp) {
        var elDiv = (global_var.current_modal === 'loadLivePrototype' && comp.showProperties) ?
            $('<div class="col-lg-12 text-right">')
            .attr("id", "comp_id_" + comp.id)
            .css("padding-top", "15px")
            .append(" &nbsp;")
            .append(this.InputTableAction.GenAddColumn(comp))
            .append(" &nbsp;")
            .append(this.InputTableAction.GenTableProperties(comp))
            .append(" &nbsp;")
            .append(this.InputTableAction.GenReadFromContent(comp))
            .append("  &nbsp;&nbsp;")
            .append(this.InputTableAction.GenMoveDrag(comp))
            .append("  &nbsp;&nbsp;&nbsp;&nbsp;")
            .append(this.InputTableAction.GenRemoveTable(comp))
            .append("  &nbsp;&nbsp;")
            .append(this.InputTableAction.GenRowCount(comp))
            .append(" ") :
            "";


        //get input selected fields
        var tableId = comp.fkInputTableId;
        var tblSelectedFields = '';
        var col = SAInput.Tables[tableId].fkInputId.split(",");
        for (var i = 0; i < col.length; i++) {
            var inputId = col[i].trim();
            if (inputId.length === 0)
                continue;
            try {
                tblSelectedFields += cr_input_comp_attribute_kv[inputId]['sa-selectedfield']
                tblSelectedFields += (i < col.length - 1) ? "," : "";
            } catch (err) {}
        }



        var el = $('<table class="table">')
            .addClass("component-table-class-for-zad")
            .addClass("component-table-class-for-zad-" + tableId)
            .attr('table-id', tableId)
            .attr('input-id', comp.id)
            .attr("sa-tableselectedfield", tblSelectedFields)
            .attr('style', gui_component.defaultCSS.InputTable + Component.ReplaceCSS(comp.css))
            .append(elDiv)
            .append(this.InputTableAction.GenInputTableHtml(comp));
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        div.removeClass("component-class")
            .removeAttr("onclick")

        div.append($('<div>').addClass("progressloader loaderTable1"));
        div.append(el);
        div.addClass("table-responsive");
        div.append($("<span>")
                                 .addClass("table-show-hide-row-div-btn btn btn-sm")
                                 .attr("id",'table-show-hide-button-id-a')
                                 
                                 .html('<i class="fas fa-chevron-right"></i>'))
                     
        div.append($("<div>")
        .attr("data-tableId",comp.id)
            .addClass("table-show-hide-row-div")
             .append($("<span>")
                         .attr("id",'table-show-hide-button-id-close')
                         .addClass("table-show-hide-button-class-close")
                         .html('<i class="fas fa-times"></i>')
                         )
                         .append($("<div>")
                                  .addClass("col-10 p-2")
                                  .append($("<div>").addClass("btn-group float-right")
                                         .append('<span class="btn btn-sm btn-light" id="filter-show-hide-button-id-a"><i class="fas fa-filter"></i> Filter</span>')
                                         .append('<span class="btn btn-sm btn-light" id="show-table-row-btn"><i class="fas fa-eye"></i></span>')
                                         .append('<span class="btn btn-sm btn-light " id="hide-table-row-btn"><i class="fas fa-eye-slash"></i></span>')
                                 )
                
                                  .append("<span class='btn btn-sm'><input type='checkbox' class='all-table-row-checked'>All</span>")
                                
                                  )
                         .append($("<div>")
                                  .addClass('col-12 p-2')
                                  .append('<span class="btn btn-sm btn-light" id="filter-show-hide-button-id-a"><i class="fas fa-filter"></i> Filter</span>')
                                  
                         )
                         .append(this.InputTableAction.GenInputTableShowHideHtml(tableId, comp))

            )

       
        return $('<div></div>').append(div).html();
    },
    InputTab: function (comp) {

        var el = $("<div>")

            .append(this.InputTabAction.GenPropertiesLine(comp))
            .append(this.InputTabAction.GetBody(comp));
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp)
            .attr('style', Component.ReplaceCSS(comp.containerCSS));
        div.removeClass("component-class")
            .removeAttr("onclick")


        div.append(el);
        return $('<div></div>').append(div).html();
    },
    InputTabAction: {
        GenRedirectTo: function (backlogId) {
            var rc = "";;

            if (global_var.current_modal === "loadLivePrototype") {
                rc = $('<i class="fa fa-mail-forward">')
                    .css("font-size", "11px")
                    .attr("title", "Redirect to")
                    .css("color", "#d5d6da !important")
                    .css("cursor", "pointer")
                    .attr("onclick", "new UserStory().redirectUserStoryCore('" + backlogId + "')");
            }
            return rc;
        },
        GetBody: function (comp) {
            var usList = [];
            try {
                usList = SAInput.Tabs[comp.fkInputTableId].fkRelatedBacklogId.split(',');
            } catch (err) {}
            var el = usList.length === 0 ?
                this.TabEmptyMessage(comp.fkInputTableId) :
                this.GetTabBody(comp, usList);
            return el;
        },
        GetTabBody: function (comp, usList) {
            var div = $('<div class="tab-content">');
            var header = this.GetTabHeader(comp, usList);
            var body = this.GetTabContent(comp, usList);
            div.append(header).append(body)
            return div;
        },
        GetTabHeader: function (comp, usList) {
            var ul = $('<ul class="nav nav-tabs">').attr("role", "tablist")
            var idx = 0;
            for (var i in usList) {
                var li = $('<li class="nav-item">')
                    .addClass("sa-tab-action-zad");
                var usId = usList[i].trim();
                var usName = SACore.GetBacklogname(usId);
                var active = (idx === 0) ? " active " : "";
                idx++;
                li.append($('<a class="nav-link">')
                    .addClass(active)
                    .css('font-size', "14px")
                    .attr("href", "#" + "tab_" + comp.fkInputTableId + "_" + usId)

                    .attr("data-toggle", "tab")
                    .append(replaceTags(usName))
                    .append(" ")
                    .append(this.GenRedirectTo(usId))
                )
                ul.append(li);
            }

            return ul;
        },
        GetTabContent: function (comp, usList) {
            var div = $('<div class="tab-content">');
            var idx = true;
            for (var i in usList) {

                var usId = usList[i].trim();
                if (usId.length === 0) {
                    continue;
                }

                var active = (idx) ? " active " : "";
                idx = false;
                var divContent = $('<div class="container tab-pane">')
                    .addClass(active)
                    .attr("id", "tab_" + comp.fkInputTableId + "_" + usId)

                var jsonT = SAInput.toJSONByBacklog(usId);
                //                new UserStory().hasSequence(comp.sequence, usId);
                comp.sequence.push(usId);
                var innerHTML = new UserStory().getGUIDesignHTMLBody(jsonT, 0, comp.sequence);
                divContent.append(innerHTML);
                div.append(divContent);
            }
            return div;
        },
        GenAddUserStory: function (comp) {
            return $('<i class="fa fa-plus">')
                .css("font-size", "14px")
                .attr("title", "Add User Story")
                .css("color", "#d5d6da !important")
                .css("cursor", "pointer")
                .attr("onclick", "addUserStoryToTabModal('" + comp.fkInputTableId + "')")
        },
        GenPropertiesLine: function (comp) {
            var elDiv = (global_var.current_modal === 'loadLivePrototype' && comp.showProperties) ?
                $('<div class="col-lg-12 text-right">')
                .attr("id", "comp_id_" + comp.id)
                .css("padding-top", "15px")
                .append(" &nbsp;")
                .append(this.GenAddUserStory(comp))
                .append(" &nbsp;")
                .append(this.GenTableProperties(comp))
                .append(" &nbsp;")
                //                .append(this.InputTableAction.GenReadFromContent(comp))
                //                .append("  &nbsp;&nbsp;")
                .append(this.GenMoveDrag(comp))
                .append("  &nbsp;&nbsp;&nbsp;&nbsp;")
                .append(this.GenRemoveTable(comp))
                .append("  &nbsp;&nbsp;")

                :
                "";
            return elDiv;
        },
        GenTableProperties: function (comp) {
            return $('<i class="fa fa-table">')
                .css("font-size", "14px")
                .attr("title", "Table Properties")
                .css("color", "#d5d6da !important")
                .css("cursor", "pointer")
                .addClass("component-class")
                .attr("onclick", "readInputTableProperties(this,'" + comp.id + "')")
        },
        GenRemoveTable: function (comp) {

            return $('<i class="fa fa-trash-o">')
                .attr("title", "Remove Table")
                .css("font-size", "14px")
                .css("color", '#d5d6da')
                .css("cursor", "pointer")
                .attr("onclick", "removeInputTable(this,'" + comp.id + "','" + comp.fkInputTableId + "')")
        },
        GenMoveDrag: function (comp) {

            return $('<i class="fa fa-arrows-alt">')
                .attr("title", "Move Table with Drag and Drop")
                .css("font-size", "14px")
                .css("color", '#d5d6da')
                .css("cursor", "pointer")

        },
        GenInputTableHtml: function (comp) {
            var tableId = comp.fkInputTableId;
            if (tableId.length === 0) {
                return "";
            }

            var backlogId = SAInput.getInputDetails(comp.id, "fkBacklogId");

            var rowCount = this.GetTableRowCount(tableId);
            console.log(rowCount);
            var table = $("<table>");
            var thead = this.GenInputTableHeaderHtml(tableId);
            var tbody = this.GenInputTableBodyHtml(tableId, rowCount, backlogId);
            table.append(thead).append(tbody);
            return table.html();
        },
        GenInputTableHeaderHtml: function (tableId) {
            var thead = $("<thead>");
            var col = SAInput.Tables[tableId].fkInputId.split(",");
            var orderNo = SAInput.Tables[tableId].orderNo.split(",");
            var showComponent = SAInput.Tables[tableId].showComponent.split(",");
            var tr = $("<tr>").append($("<th>").append(""));
            for (var i = 0; i < col.length; i++) {
                var inputId = col[i].trim();
                if (inputId.length === 0)
                    continue;
                var inputName = SAInput.GetInputName(inputId);
                var a = $('<a href="#">')
                    .addClass('component-class')
                    .attr('onclick', (global_var.current_modal === 'loadLivePrototype') ?
                        "new UserStory().setInputByGUIComponent('" + inputId + "')" :
                        "")
                    .append(replaceTags(inputName))

                var color = showComponent[i].trim() === '1' ? "#2196F3" : "#d5d6da";
                var showComp = (global_var.current_modal === 'loadLivePrototype') ?
                    $('<i class="fa fa-list-alt" aria-hidden="true">')
                    .css("cursor", "pointer")
                    .css('font-size', '8px')
                    .css("color", color)
                    .attr("onclick", "showInputTableColumnComponent(this,'" + tableId + "','" + inputId + "')") :
                    "";
                tr.append($("<th>")
                    //                        .css("min-width", "70px;")
                    .append(a)
                    .append(showComp)
                );
            }
            thead.append(tr);
            return thead;
        },
        TabEmptyMessage: function (tableId) {
            var msg = '<div class="col-lg-12" style="padding:30px;text-align:center">' +
                '<h5> No User Stories have been entered on this tab</h5>' +
                '<i class="fa fa-plus" title="Add new column" onclick="addUserStoryToTabModal(\'' + tableId + '\')" \n\
                    style="font-size: 30px; color: rgb(213, 214, 218); cursor: pointer;" aria-hidden="true"></i>'
            '</div>';
            return msg;
        },
        GetTableReadContent: function (tableId) {
            var readContent = '0';
            try {
                readContent = SAInput.Tables[tableId].readContent;
            } catch (err) {}
            return readContent;
        },
        GetTableCellValue: function (tableId, inputId, index) {
            var readContent = this.GetTableReadContent(tableId);
            var val = "Lorem Ipsum";
            if (readContent === '1') {
                val = "";
                try {
                    var cnt = SAInput.getInputDetails(inputId, "inputContent");
                    val = cnt.split(/\r*\n/)[index];
                } catch (err) {}
            }
            return val;
        },
        GenInputTableBodyHtml: function (tableId, rowCount) {

            var tbody = $('<tbody>');
            var col = SAInput.Tables[tableId].fkInputId.split(",");
            var orderNo = SAInput.Tables[tableId].orderNo.split(",");
            var showComponent = SAInput.Tables[tableId].showComponent.split(",");
            var idx = 0;
            for (var j = 1; j <= rowCount; j++) {
                var tr = $("<tr>").append($("<td>").append(j));
                for (var i = 0; i < col.length; i++) {
                    var inputId = col[i].trim();
                    if (inputId.length === 0)
                        continue;
                    idx++;
                    var val = this.GetTableCellValue(tableId, inputId, j - 1);
                    if (showComponent[i].trim() === '1') {
                        var comp = new ComponentInfo();
                        Component.FillComponentInfo(comp, SAInput.Inputs[inputId]);
                        comp.secondContent = val;
                        comp.isFromTableNew = true;
                        comp.isFromTable = true;
                        comp.tableRowId = "1";
                        comp.withLabel = false;
                        comp.hasOnClickEvent = true;
                        comp.cellNo = "12";
                        comp.showProperties = false;
                        val = Component.GetComponentHtmlNew(comp);
                    }
                    tr.append($("<td>")
                        //                            .css("min-width", "70px")
                        .addClass("component-input-class")
                        .attr("pdid", inputId)
                        .val(val)
                        .append(val));
                }
                tbody.append(tr);
            }

            if (idx === 0) {
                // tbody.append(this.TableEmptyMessage(tableId));
                tbody.html($("<tr>").append($("<td>").append(this.TableEmptyMessage(tableId))));
            }

            return tbody;
        }
    },
    EditBox: function (comp) {
        comp.content = (comp.isFromTableNew === true) ? comp.secondContent : comp.content;
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
            .addClass("form-control")
            .attr('style', gui_component.defaultCSS.EditBox + Component.ReplaceCSS(comp.css))
            .attr('type', 'text')
            .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span"></span>')
                    .append(comp.label))
                .append(star);
            div.append(comp.isLabelInTop ? "<br>" : "");
        }

        div.append(el);
        return $('<div></div>').append(div).html();
    },

    HiddenCarrier: function (comp) {
        comp.content = (comp.isFromTableNew === true) ? comp.secondContent : comp.content;
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
            .addClass("form-control")
            .attr('style', gui_component.defaultCSS.EditBox + Component.ReplaceCSS(comp.css))
            .attr('type', 'text')
            .css('border', '2px #e2dfd0  dashed')
            .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span"></span>')
                    .append(comp.label))
                .append(star);
            div.append(comp.isLabelInTop ? "<br>" : "");
        }

        div.append(el);

        if (global_var.current_modal !== 'loadLivePrototype') {
            div.css("display", "none")
        }

        return $('<div></div>').append(div).html();
    },
    Hidden: function (comp) {
        comp.content = (comp.isFromTableNew === true) ? comp.secondContent : comp.content;
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
            .addClass("form-control")
            .attr('style', gui_component.defaultCSS.EditBox + Component.ReplaceCSS(comp.css))
            .attr('type', 'hidden')
            .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);

        div.append(el);
        return $('<div></div>').append(div).html();
    },

    InnerEditBox: function (comp) {
        comp.content = (comp.isFromTableNew === true) ? comp.secondContent : comp.content;
        var div = Component.ContainerDiv(comp);
        var el = $('<input></input>')
            .attr('style', gui_component.defaultCSS.InnerEditBox + Component.ReplaceCSS(comp.css))
            .attr('type', 'text')
            .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return $('<div></div>').append(div).html();
    },
    Image: function (comp) {
        var div = Component.ContainerDiv(comp);

        var emptyMsg = $('<div class="col-lg-12 biyzad text-center">')
            .css("border", "1px solid gray")
            .append($('<h5>').append("No Image"))
            .append((comp.showProperties) ? $("<i class='fa fa-plus'>")
                .css("font-size", "20px")
                .attr('onclick', 'new UserStory().setGUIComponentUploadImage()') :
                "");

        var el = $('<img></img>')
            .attr("sa-type", 'image')
            .attr('style', gui_component.defaultCSS.Image + Component.ReplaceCSS(comp.css))
            .attr('src', comp.content);




        Component.ComponentEvent.Init(el, comp);
        div.append(el);

        if (!comp.content)
            div.append(emptyMsg);

        return $('<div></div>').append(div).html();
    },
    Youtube: function (comp) {
        var div = Component.ContainerDiv(comp);
        var el = $('<iframe></iframe>')
            .attr('style', gui_component.defaultCSS.Youtube + Component.ReplaceCSS(comp.css))
            .attr('src', 'https://www.youtube.com/embed/' + comp.content);
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return $('<div></div>').append(div).html();
    },
    FilePicker: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
            .addClass("form-control")
            .attr("sa-type", "filepicker")
            .attr('style', gui_component.defaultCSS.FilePicker + Component.ReplaceCSS(comp.css))
            .attr('type', 'file')
            .attr('value', comp.content);

        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span"></span>')
                .append(comp.label)
                .append(star));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }


        div.append($('<form><form>').append(el));
        div.append('<div id="progress_bar_new"></div>');
        return $('<div></div>').append(div).html();
    },
    Date: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
            .attr('sa-type', "date")
            .addClass("form-control")
            .attr('style', gui_component.defaultCSS.Date + Component.ReplaceCSS(comp.css))
            .attr('type', 'date')
            .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span"></span>')
                .append(comp.label)
                .append(star));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }

        div.append(el);
        return $('<div></div>').append(div).html();
    },
    Time: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
            .addClass("form-control")
            .attr('sa-type', "time")
            .attr('style', gui_component.defaultCSS.Time + Component.ReplaceCSS(comp.css))
            .attr('type', 'time')
            .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span"></span>')
                .append(comp.label)
                .append(star));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }

        div.append(el);
        return $('<div></div>').append(div).html();
    },
    TextArea: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var el = $('<textarea></textarea>')
            .addClass("form-control")
            .attr('style', gui_component.defaultCSS.TextArea + Component.ReplaceCSS(comp.css))
            .attr('rows', '3')
            .text(comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span"></span>')
                .append(comp.label)
                .append(star));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }
        div.append(el);
        return $('<div></div>').append(div).html();
    },
    SelectBox: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var select = $('<select></select>')
            .addClass("form-control")
            .addClass("sa-sct-full-width")
            .attr("sa-type", 'select')
            .attr('data-actions-box', "true")
            .attr('data-live-search', "true")
            .attr('style', gui_component.defaultCSS.SelectBox + Component.ReplaceCSS(comp.css));

        Component.ComponentEvent.Init(select, comp);



        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span"></span>')
                .append(comp.label)
                .append(star));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }

        //fill auto fill by select from API
        var inputId = comp.id;
        var selectFromBacmkogId = SAInput.getInputDetails(inputId, "selectFromBacklogId");
        var selectFromInputId = SAInput.getInputDetails(inputId, "selectFromInputId");

        if (selectFromBacmkogId) {
            select.addClass("hasTriggerApiCall");
            select.attr("hasTriggerApiCall", "1");
            select.attr("selectFromBacmkogId", selectFromBacmkogId);
            select.attr("selectFromInputId", selectFromInputId);

            //            if (!SAInput.LoadedBacklogs4Input.includes(selectFromBacmkogId)) {
            //                loadBacklogInputsByIdIfNotExist4SelectBoxLoader(selectFromBacmkogId, select, selectFromInputId, selectFromBacmkogId)
            //                SAInput.LoadedBacklogs4Input.push(selectFromBacmkogId);
            //            } else {
            //                var selectedField = SAInput.GetInputName(selectFromInputId)
            //                triggerAPI2Fill(select, selectFromBacmkogId, selectedField);
            //            }

            //loadBacklogInputsByIdIfNotExist(selectFromBacmkogId)

            //var selectedField = SAInput.GetInputName(selectFromInputId)
            // triggerAPI2Fill(select, selectFromBacmkogId, selectedField);

        } else {
            if (comp.content) {
                var r = comp.content.split(/\r*\n/);
                for (var i = 0; i < r.length; i++) {
                    var val = "";
                    var txt = "";
                    try{
                      if (r[i].includes("::")){
                          val = r[i].split("::")[0];
                          txt = r[i].split("::")[1];
                      }else{
                                                  val = r[i];
                                                  txt = r[i];

                      }
                        
                    }catch(err){
                        txt = r[i];
                    }
                    select.append($('<option></option>').val(val).text(txt));
                }
            } else {
                if (select.attr('default-value-is-null') === '1') {
                    select.append($('<option></option>').append(''));
                } else {
                    for (var i = 1; i < 4; i++) {
                        select.append($('<option></option>').append('Value ' + (i)));
                    }
                }
            }

        }

        div.append(select);
        return $('<div></div>').append(div).html();
    },
    MultiSelectBox: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var select = $('<select></select>')
            .addClass("form-control")
            .attr('sa-type', 'multiselect')
            .addClass('sa-selectpicker')
            .attr('multiple', true)
            .attr('data-actions-box', "true")
            .attr('data-live-search', "true")

            //                .attr('multiple', 'true')
            .attr('row', '4')
            .attr('style', gui_component.defaultCSS.MultiSelectBox + Component.ReplaceCSS(comp.css));

        Component.ComponentEvent.Init(select, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span"></span>')
                .append(comp.label)
                .append(star));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }


        //fill auto fill by select from API
        var inputId = comp.id;
        var selectFromBacmkogId = SAInput.getInputDetails(inputId, "selectFromBacklogId");
        var selectFromInputId = SAInput.getInputDetails(inputId, "selectFromInputId");
        if (selectFromBacmkogId) {
            var selectedField = SAInput.GetInputName(selectFromInputId)
            triggerAPI2Fill(select, selectFromBacmkogId, selectedField);
        } else {
            if (comp.content) {
                var r = comp.content.split(/\r*\n/);
                for (var i = 0; i < r.length; i++) {
                    select.append($('<option></option>').append(r[i]));
                }
            } else {
                for (var i = 1; i < 4; i++) {
                    select.append($('<option></option>').append('Value ' + (i)));
                }
            }
        }

        div.append(select);
        return $('<div></div>').append(div).html();
    },
    RadioButton: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span"></span>')
                .append(comp.label)
                .append(star));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }
        if (comp.content.length > 0) {
            var r = comp.content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                var el = $('<input></input>')
                    .attr('type', 'radio')
                    .attr('name', 'optradio')
                    .attr('checked', true);
                Component.ComponentEvent.Init(el, comp);
                div.append($('<label></label>')
                    .addClass('radio-inline')
                    .append(el)
                    .append($("<span class='comp-title-span'></span>")
                        .attr('style', gui_component.defaultCSS.RadioButton + Component.ReplaceCSS(comp.css))
                        .text(r[i])
                        .append('&nbsp; '))
                );
            }
        } else {
            for (var i = 1; i <= 3; i++) {
                var el = $('<input></input>')
                    .attr('type', 'radio')
                    .attr('name', 'optradio')
                    .attr('checked', true);
                Component.ComponentEvent.Init(el, comp);
                div.append($('<label></label>')
                    .addClass('radio-inline')
                    .append(el)
                    .append($("<span class='comp-title-span'></span>")
                        .attr('style', gui_component.defaultCSS.RadioButton + Component.ReplaceCSS(comp.css))
                        .text('Option ' + i + '   ')
                        .append('&nbsp; '))
                );
            }
        }

        return $('<div></div>').append(div).html();
    },
    CheckBox: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span class="comp-title-span></span>').append(comp.label)
                .append(star))
            div.append((comp.isLabelInTop ? "<br>" : ""))
        }

        if (comp.content.length > 0) {
            var r = comp.content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                var el = $('<input></input>')
                    .attr('sa-type', 'checkbox')
                    .attr('type', 'checkbox')
                    .attr('checked', true);
                Component.ComponentEvent.Init(el, comp);
                div.append($('<label></label>')
                    .addClass('radio-inline')
                    .append(el)
                    .append($("<span class='comp-title-span'></span>")
                        .attr('style', gui_component.defaultCSS.CheckBox + Component.ReplaceCSS(comp.css))
                        .text(r[i])
                        .append('&nbsp; '))
                );
            }
        } else {
            for (var i = 1; i <= 3; i++) {
                var el = $('<input></input>')
                    .attr('type', 'checkbox')
                    .attr('sa-type', 'checkbox')
                    .attr('name', 'optradio')
                    .attr('checked', true);
                Component.ComponentEvent.Init(el, comp);
                div.append($('<label></label>')
                    .addClass('radio-inline')
                    .append(el)
                    .append($("<span class='comp-title-span'></span>")
                        .attr('style', gui_component.defaultCSS.CheckBox + Component.ReplaceCSS(comp.css))
                        .text('Option ' + i + '   ')
                        .append('&nbsp; '))
                );
            }
        }

        return $('<div></div>').append(div).html();
    },
    Label: function (comp) {
        comp.content = (comp.isFromTableNew === true) ? comp.secondContent : comp.content;
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        var label = (comp.content) ? comp.content : comp.label;
        var el = $('<span class="comp-title-span"></span>')
            .attr('style', gui_component.defaultCSS.Label + Component.ReplaceCSS(comp.css))
            .append(label)
            .append(star);
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return $('<div></div>').append(div).html();
    },
    Hiperlink: function (comp) {
        comp.content = (comp.isFromTableNew === true) ? comp.secondContent : comp.content;
        var a = $('<a></a>')
            .attr('style', gui_component.defaultCSS.Hiperlink + Component.ReplaceCSS(comp.css))
            .text(comp.label)
            .append('<br>');
        Component.ComponentEvent.Init(a, comp);
        (comp.param1) ?
        a.attr('href', '#'): (comp.content) ?
            a.attr('href', comp.content) :
            a.attr('href', '#');
        var div = Component.ContainerDiv(comp);
        !(comp.isFromTable) ? div.append('<br>'): div.append("");
        div.append(a);
        return $('<div></div>').append(div).html();
    },
    InnerRadioButton: function (comp) {
        comp.content = (comp.isFromTableNew === true) ? comp.secondContent : comp.content;
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        var el = $('<input></input>')
            .attr('type', 'radio');
        Component.ComponentEvent.Init(el, comp);
        div.append(el)
            .append($("<span class='comp-title-span'></span>")
                .attr('style', gui_component.defaultCSS.InnerRadioButton + Component.ReplaceCSS(comp.css))
                .text((comp.content) ? comp.content : comp.label)
                .append(star)
                .append('<br>'));
        return $('<div></div>').append(div).html();
    },

    InnerCheckBox: function (comp) {
        comp.content = (comp.isFromTableNew === true) ? comp.secondContent : comp.content;
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        var el = $('<input></input>')
            .attr('sa-type', 'checkbox')
            .attr('type', 'checkbox');
        Component.ComponentEvent.Init(el, comp);
        div.append(el)
            .append($("<span class='comp-title-span'></span>")
                .attr('style', gui_component.defaultCSS.InnerCheckBox + Component.ReplaceCSS(comp.css))
                .text((comp.content) ? comp.content : comp.label)
                .append(star)
                .append('<br>'));
        return $('<div></div>').append(div).html();
    },
    InnerLine: function (comp) {
        var div = Component.ContainerDiv(comp);
        var el = $("<hr></hr>")
            .attr('style', gui_component.defaultCSS.InnerLine + Component.ReplaceCSS(comp.css));
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return $('<div></div>').append(div).html();
    },
    Icon: function (comp) {
        comp.content = (comp.content) ? comp.content : 'fa-user-circle';
        var div = Component.ContainerDiv(comp);
        !(comp.isFromTable) ? div.append('<br>'): div.append("");
        var el = $('<i></i>')
            .addClass('fa ' + comp.content)
            .attr('style', Component.ReplaceCSS(comp.css));
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return $('<div></div>').append(div).html();
    },
    Button: function (comp) {
        comp.content = (comp.content) ? comp.content : comp.label;
        var btn = $('<input></input>')
            .addClass("form-control")
            .attr('style', gui_component.defaultCSS.Button + Component.ReplaceCSS(comp.css))
            .attr('type', 'button')
            .attr('value', comp.content);
        Component.ComponentEvent.Init(btn, comp);
        //        (comp.param1) ? btn.attr('onclick', "new UserStory().setGUIComponentButtonGUIModal(\'" + comp.param1 + "\')")
        //                .attr('data-toggle', "modal")
        //                .attr('data-target', "#userstory-gui-input-component-res-sus1")
        //                : "";

        var div = Component.ContainerDiv(comp);
        !(comp.isFromTable) ? div.append('<br>'): div.append("");
        div.append(btn);
        return $('<div></div>').append(div).html();
    },
    FreeHtml: function (comp) {
        var innerHTML = this.SectionAction.FreeEmptyEmptyMessage();
        if (comp.content.length > 0) {
            try {
                innerHTML = replaceTagsReverse(comp.content);
            } catch (err) {}
        }
        var div = Component.ContainerDiv(comp);
        div.append(innerHTML);
        return $('<div></div>').append(div).html();
    },
    FreeComponent: function (comp) {
        comp.content = (comp.isFromTableNew === true) ? comp.secondContent : comp.content;
        var star = Component.AddMandatoryStar(comp);
        var el = $("<div>");

        if (comp.content && comp.content.length > 1) {
            el = $(replaceTagsReverse(comp.content));
        }
        el.attr('style', Component.ReplaceCSS(comp.css))
            .append(star);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);

        div.append(el);
        return $('<div></div>').append(div).html();
    },
    Section4: function (comp, carrier1) {
        var innerHTML = this.SectionAction.SectionEmptyMessage(comp.id);
        if (comp.param1 > 0) {
            try {

                var sectionId = "__" + makeId(15);
                var divTemp = "<div class='loaderSection' pid='" + comp.param1 + "' id='" + sectionId + "'><div>";
                innerHTML = divTemp; //new UserStory().getGUIDesignHTMLBody(jsonT, 0, comp.sequence);
                new UserStory().hasSequence(comp.sequence, comp.param1);
                comp.sequence.push(comp.param1);



                var carrier = new Carrier();
                carrier.setLineId(carrier1.getLineId());
                carrier.set("param1", comp.param1);
                carrier.set("sectionId", sectionId);
                carrier.set("sequence", comp.sequence);
                carrier.setBacklogId(comp.param1);
                _LoadSectionGuiContainer(carrier);

            } catch (err) {}
        }
        comp.hasOnClickEvent = true;
        //        comp.showProperties = false;
        var div = Component.ContainerDiv(comp);

        div.append(this.SectionAction.GetPropertiesSection(comp));
        div.append($('<div class="row">')
            .addClass("component-section-row filedset-style-section")
            .append($("<span>").addClass("section-legend").text("section"))
            .append(innerHTML));

        //        div.append(innerHTML);
        return $('<div></div>').append(div).html();
    },
    Section: function (comp) {
        var innerHTML = this.SectionAction.SectionEmptyMessage(comp.id);
        if (comp.param1 > 0) {
            try {
                loadBacklogInputsByIdIfNotExist(comp.param1);
                var jsonT = SAInput.toJSONByBacklog(comp.param1);
                new UserStory().hasSequence(comp.sequence, comp.param1);
                comp.sequence.push(comp.param1);
                //                innerHTML = this.GetComponentHtmlNew(jsonT, 0, comp.sequence);


                innerHTML = new UserStory().getGUIDesignHTMLBody(jsonT, 0, comp.sequence);
            } catch (err) {
                console.log("Section is not loaded")
            }
        }
        comp.hasOnClickEvent = true;
        comp.showProperties = true;
        var div = Component.ContainerDiv(comp);

        div.append(this.SectionAction.GetPropertiesSection(comp));
        div.append($('<div class="row">')
            .addClass("component-section-row filedset-style-section")
            .append($("<span>").addClass("section-legend").text(comp.label))
            .append(innerHTML));

        //        div.append(innerHTML);
        return $('<div></div>').append(div).html();
    },
    SectionAction: {
        GetPropertiesSection: function (comp) {
            var elDiv = (global_var.current_modal === 'loadLivePrototype' && comp.showProperties) ?
                $('<div class="col-lg-12 text-right">')
                .addClass("live-prototype-component-properties")
                //                    .css("display", "none")
                .attr("id", "comp_id_" + comp.id)
                .css("padding-top", "15px")
                .append(" &nbsp;")
                .append(this.GenAddUserStory(comp))
                .append(" &nbsp;")
                .append(this.GenRedirectTo(comp))
                .append(" &nbsp;")
                .append(this.GenTableProperties(comp))
                .append("  &nbsp;&nbsp;")
                .append(this.GenMoveDrag(comp))
                .append("  &nbsp;&nbsp;&nbsp;")
                .append(this.GenRemoveSection(comp))

                .append(" ") :
                "";
            return elDiv;
        },
        SectionEmptyMessage: function (tableId) {
            var msg = '<div class="col-lg-12" style="padding:30px;text-align:center">' +
                '<h5> No User Story has been entered on this section</h5>' +
                '<i class="fa fa-plus" title="Add User Story" onclick="fillSectionUserStory(\'' + tableId + '\')" \n\
                    style="font-size: 30px; color: rgb(213, 214, 218); cursor: pointer;" aria-hidden="true"></i>'
            '</div>';
            return msg;
        },
        FreeEmptyEmptyMessage: function () {
            var msg = '<div class="col-lg-12" style="padding:30px;text-align:center">' +
                '<h5> No HTML Content has been entered on this component</h5>' +
                '</div>';
            return msg;
        },
        GenAddUserStory: function (comp) {
            return $('<i class="fa fa-plus">')
                .css("font-size", "14px")
                .attr("title", "Add User Story")
                .css("color", "#d5d6da !important")
                .css("cursor", "pointer")
                .attr("onclick", "fillSectionUserStory('" + comp.id + "')")
        },
        GenRedirectTo: function (comp) {
            return $('<i class="fa fa-mail-forward">')
                .css("font-size", "14px")
                .attr("title", "Redirect to")
                .css("color", "#d5d6da !important")
                .css("cursor", "pointer")
                .attr("onclick", "new UserStory().redirectUserStoryCore('" + comp.param1 + "')")
        },
        GenTableProperties: function (comp) {
            return $('<i class="fa fa-table">')
                .css("font-size", "14px")
                .attr("title", "Table Properties")
                .css("color", "#d5d6da !important")
                .css("cursor", "pointer")
                .addClass("component-class")
                .attr("onclick", "readInputTableProperties(this,'" + comp.id + "')")
        },
        GenMoveDrag: function (comp) {

            return $('<i class="fa fa-arrows-alt">')
                .attr("title", "Move Table with Drag and Drop")
                .css("font-size", "14px")
                .css("color", '#d5d6da')
                .css("cursor", "pointer")

        },
        GenReadFromContent: function (comp) {
            var color = SAInput.Tables[comp.fkInputTableId].readContent === '1' ?
                '#2196F3' : '#d5d6da';
            return $('<i class="fa fa-inbox">')
                .attr("title", "Read From Content")
                .css("font-size", "14px")
                .css("color", color)
                .css("cursor", "pointer")
                .attr("onclick", "setInputTableReadFromContent(this,'" + comp.fkInputTableId + "')")
        },
        GenRemoveSection: function (comp) {

            return $('<i class="fa fa-trash-o">')
                .attr("title", "Remove Table")
                .css("font-size", "14px")
                .css("color", '#d5d6da')
                .css("cursor", "pointer")
                .attr("onclick", "removeSection(this,'" + comp.id + "')")
        },
    },
    Tab: function (comp) {
        //        var innerHTML = new UserStory().genGUIDesignHtmlById(comp.param1);
        var innerHTML = "";
        var inputTable = comp.inputTable;
        //        if (inputTable.length > 0) {
        //            try {
        //                jsonT = {"tbl": []};
        //                jsonT.tbl.push(JSON.parse(inputTable));
        //                innerHTML = new UserStory().getGUIDesignHTMLBody(jsonT, 0);
        //            } catch (err) {
        //
        //            }
        //        }



        if (comp.param1 > 0) {
            var jsonT = SAInput.toJSONByBacklog(comp.param1);
            new UserStory().hasSequence(comp.sequence, comp.param1);
            comp.sequence.push(comp.param1);
            innerHTML = new UserStory().getGUIDesignHTMLBody(jsonT, 0, comp.sequence);
        }
        var div = Component.ContainerDiv(comp);
        div.append($("<div class='row'></div>")
            .append(innerHTML))
        return $('<div></div>').append(div).html();
    }
}