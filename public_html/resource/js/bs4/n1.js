var _220304054258036310054_ = {

    flow_backlog_map: {},
    flow_backlog_pair: {},
    flow_backlog_desc: {},
    flow_details_list: {},
    loader: () => {
        _220304054258036310054_.filter_by_label();
        _220304054258036310054_.load_flow_group_select();
        // _220304054258036310054_.map_flow_group();
    },
    filtered_label_backlog: {},
    filter_by_label: () => {
        var labelIds = _220304054258036310054_.filter_label_list(); //'22030400100108212361';
        _220304054258036310054.filtered_label_backlog = {};
        callApi("22032518255608017729", {
            fkLabelId: labelIds
        }, true, function(res) {
            _220304054258036310054.filtered_label_backlog = res.tbl[0].r;

        })
    },
    set_labeled_backlog_visibility: () => {
        var data = _220304054258036310054.filtered_label_backlog;
        if (data) {
            $('.olp2').hide();
            data.map((o) => {
                $(`.olp-${o.fkBacklogId}`).show();
            })
        }

    },
    set_dizayn_effekt: () => {
        $('.olp1').each(function() {
            // $(this).find('span.olp2').css('border-left', '2px solid yellow')

            $(this).find('span.olp2')
                .css('padding-left', '22px')
                .css('margin-left', '-22px')
                .css('border-left', '2px solid blue')
                .css('border-radius', '0px 0px 0px 60px')

            $(this).find('.olp1').each(function() {
                if ($(this).is(":last-child")) {
                    $(this).find('span.olp2')
                        .css('padding-left', '22px')
                        .css('margin-left', '-20px')
                        .css('border-left', '2px solid blue')
                        .css('border-radius', '0px 0px 0px 60px')

                };
                if (!$(this).is(":last-child"))
                    $(this).css('border-left', '2px solid blue');
            })
        })

    },
    filter_label_list: () => {

        var labelId = '';

        $('.prManag-task-filter-checkbox-label').each(function() {
            if ($(this).is(":checked")) {
                var id = $(this).val();
                labelId += (id) ? id + "%IN%" : "";
            }
        })

        return labelId


    },
    load_flow_group_select: () => {
        var select = $('#comp_id_22030803450902384159');
        select.html('<option></option>');
        select.attr('onchange', '_220304054258036310054_.map_flow_group_core(this)')
        var data = {};
        data.fkLabelId = _220304054258036310054_.filter_label_list();
        callApi("22030511170609167656", data, true, function(res) {
            res.tbl[0].r.map((o) => {
                select.append(`<option value='${o.id}'>${o.groupName}</option>`);
            })
            select.attr('multiple', 'multiple')
            select.selectpicker('refresh');
        })
    },
    map_flow_group_core: (el) => {

        var group_list = $(el).val();

        var div = $('#22030803450902333051');
        div.html('');

        group_list.map((o) => {
            if (o) {
                _220304054258036310054_.map_flow_group(o);
            }
        })


    },
    map_flow_group: (flow_group_id) => {

        //22030616495806702640 Parent sorgusu
        //22030617061505242829 Techizat sorgusu

        var select = $('#comp_id_22030803450902384159');
        var flow_group_name = select.find(`option[value="${flow_group_id}"]`).first().text();

        var tr = $(`<div>`);
        var div = $('#22030803450902333051');

        var div_group = $('<div>');
        div_group.append($('<span class="d-flex align-items-center">')
            .append(`<h1>${flow_group_name}</h1>`)
            .append(` <button id="addNewflowListFromStoryy" class="btn btn-sm btnforTitleList">
                            <i class="fas fa-plus-circle" aria-hidden="true"></i>
                        </button>
                        `)
        )
        div_group.append(tr);
        div.append(div_group);

        // flow_group_id = '22030616495806702640';
        callApi('22030808135801162223', {
            fkFlowGroupId: flow_group_id
        }, true, function(res) {
            res.tbl[0].r.map((item) => {
                _220304054258036310054_.map_flow_details(item.id, item.flowName, flow_group_name, tr);
            })

        })
    },
    map_flow_details: (flow_id, flow_name, flow_group_name, tr) => {
        var id = flow_id;
        var div = $('#22030803450902333051');
        // div.html('heş zad seçilməyib!!!!');
        var dt = {};
        _220304054258036310054_.flow_backlog_map = dt;
        callApi('22030406013701734834', {
            fkBacklogFlowId: id
        }, true, function(res) {
            // div.html(JSON.stringify(res));
            var flow_item_count = 0;

            res.tbl[0].r.map((o) => {
                flow_item_count++;
                var fromId = o.fkFromBacklogId;
                var fromName = o.fromBacklogName;
                var oid = o.id;
                var toId = o.fkToBacklogId;
                var toName = o.toBacklogName;
                var fkParentId = o.fkParentId;
                var desc = o.descripton;

                _220304054258036310054_.flow_details_list[oid] = o;
                _220304054258036310054_.flow_backlog_pair[fromId] = fromName;
                _220304054258036310054_.flow_backlog_pair[toId] = toName;

                fkParentId = (fkParentId === '-1') ? id : fkParentId;

                if (!dt[fkParentId]) {
                    dt[fkParentId] = [];
                }
                dt[fkParentId].push(oid);

            })
            _220304054258036310054_.flow_backlog_map = dt;
            _220304054258036310054_.map_show(id, flow_name, flow_item_count, flow_group_name, tr);
            _220304054258036310054_.set_dizayn_effekt();
            _220304054258036310054_.set_labeled_backlog_visibility();
        })
    },
    add_child_backlog: (el, id) => {
        var from = $(el).attr('fromID');
        var data = {};
        data.fkFromBacklogId = from ? from : '-1';
        data.fkToBacklogId = $(el).closest('.prosesCartToolDivChild_12').find('.selectPicker_ListStoryCardt').val();
        data.description = $(el).closest('.prosesCartToolDivChild_12').find('.prosesDivChild_textarea').val();
        data.fkBacklogFlowId = $(el).attr('flowId');
        data.fkParentId = from ? from : '-1';
        callApi('22030400033000374400', data, true, function(res) {
            var el = $('#comp_id_22030803450902384159')
            _220304054258036310054_.map_flow_group_core(el);
        })
    },
    delete_child_backlog: (el, id) => {
        var data = {};
        data.id = id;
        if (confirm('are you sure')) {
            callApi('22030412151009877861', data, true, function(res) {
                var el = $('#comp_id_22030803450902384159')
                _220304054258036310054_.map_flow_group_core(el);
            })
        }
    },
    update_child_refresh: (el, id) => {
        var dat = $(el).closest('.prosesCartToolDivChild_12').find('.selectPicker_ListStoryCardt').val();
        var data = {};
        data.id = id;
        data.fkNewToBacklogId = dat;
        data.dwscription = $(el).closest('.prosesCartToolDivChild_12').find('.prosesDivChild_textarea').val();;
        callApi('22030510404506604436', data, true, function(res) {
            var el = $('#comp_id_22030803450902384159')
            _220304054258036310054_.map_flow_group_core(el);
        })
    },
    map_show: (flow_id, flow_name, flow_item_count, flow_group_name, tr) => {
        var a = '';
        tr.attr('fid', flow_id)
            .addClass("parent_id_" + flow_id)
            .addClass("parent_div_zad_shey")
            .attr("order_no", "")
            .attr('parent_no', '');
        var a = '-1';
        tr.append(`<div class='flowListColumnn' style='' id='${flow_id}' name="${flow_name}">
                       
                       <h5 style="margin-bottom:1px;" class='ml-1'>${flow_name}  ${(flow_item_count) ? flow_item_count : ''}</h5>               
                       
                         
                        
                    <div class="dropdown show ml-2 mr-2">                        
                          <button class = "btnMEnuAcanDropDow"  id="dropdownMenuLink" data-toggle="dropdown">
                          <i class="fal fa-ellipsis-v"></i>
                          </button>                       

                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <button  class="btn btn-sm _bussinesFollowuUpdateedit21list ml-2 d-block">
                            <i class="fas fa-edit" style="color: #595959;"> </i>
                            Update
                          </button>                                  
                                                                      
                          <button class = "btn btn-sm _bussinesFollowuSilmek1list ml-2 d-block" >
                          <i class="fas fa-trash-alt mr-1" style="color: #595959;"></i>
                            Sil
                          </button> 
                        </div>
                     </div>                      
                                                <div class="btnMEnuAcanselectUcun">
                                                    <button class="btnMEnuAcan" type="">
                                                        <i class="fas fa-plus text-light"></i>
                                                    </button>
                                                    <div class='prosesCartToolDivChild_12 displayNone'>

                                                       <div>
                                                       <div class='selectSpanTit'><span class = "comp-title-span"> Project </span></div>
                                                       <select onchange='prosessListingstoryCArdBYproject(this)' data-live-search="true" class="form-control usmg-selectpicker selectPicker_mappingProject selectPicker_mappingStoryCardt"></select>
                                                       </div>

                                                        <div>
                                                       <div class='selectSpanTit'><span class = "comp-title-span"> Story Card </span></div>
                                                       <select data-live-search="true" class="form-control usmg-selectpicker selectPicker_ListStoryCardt"></select>
                                                       </div>
                          
                                                       <div style="">
                                                       <textarea class='processlistInputt form-control form-control-sm mr-auto prosesDivChild_textarea' placeholder='Description'></textarea>
                                                       </div>

                                                      <div class='cs-input-group processlistBtnGroupp'>
                                                       <button class='btn btn-sm' onclick ='_220304054258036310054_.add_child_backlog(this,${a})' flowId="${flow_id}" fromID=""><i class="fas fa-plus-circle"> </i></button>
                                                       <button class='btn btn-sm' onclick='_220304054258036310054_.update_child_refresh(this,"${flow_id}")' style='margin:0px 5px'><i class="fas fa-redo"></i></i></button>
                                                       <button class='btn btn-sm' onclick='_220304054258036310054_.delete_child_backlog(this,"${flow_id}")' style="margin-right: -10px;"><i class="fas fa-trash-alt"></i></button>                          
                                                       </div>
                                                       </div>
                                                </div>
                                    
              </div>`);

        loadProjectList2SelectboxByClassNochange('selectPicker_mappingProject');
        var res4 = callApi('22030400352507334738', {}, false);
        var idc = 1;
        _220304054258036310054_.map_iteration([flow_id], tr, idc, flow_id, flow_id);
        _220304054258036310054_.hide_element_zad();
    },
    map_iteration: (parnetIds, tr, idc, parent_id, flow_id) => {
        if (idc >= 20) {
            return;
        }

        var st = `.parent_id_${parent_id}`;
        var elm = $(st).first();
        var order_no = elm.attr('order_no');
        var fromTo = _220304054258036310054_.flow_backlog_map;
        var rcd = 1;
        parnetIds.map((M) => {
            if (fromTo[M]) {
                fromTo[M].map((item) => {

                    var child_id = [];
                    child_id.push(item);
                    var tr3 = $('<div>')
                    tr3.addClass("olp1");
                    tr3.addClass("parent-div-zad-olma");
                    tr3.addClass('parent_id_' + item);

                    var spc = '';
                    //  ` <div class="flowListSpdivTemp">
                    //                 <div class="mapListBorder"></div>
                    //                 <i class = "fal fa-angle-right flowBorderIcon"> </i>
                    //             </div>`;
                    // 

                    var row_number_new = (order_no) ? spc + order_no + "." + rcd :
                        spc + rcd;

                    tr3.attr('order_no', row_number_new)
                        .attr('parent_id', st)
                        .attr('parent_no', order_no);

                    var item_obj = _220304054258036310054_.flow_details_list[item];

                    var backlog = _220304054258036310054_.backlog_block(row_number_new, item_obj);
                    tr3.append(backlog);

                    elm.append(tr3);
                    loadProjectList2SelectboxByClassNochange('selectPicker_mappingProject12');
                    rcd = rcd + 1;
                    _220304054258036310054_.map_iteration(child_id, tr, idc, item, flow_id);

                })
            }
        })

    },
    hide_element_zad: () => {
        $('.flowListSpanAna').each(function() {
            var last = $(this).find('.flowListSpdivTemp').last();
            last.addClass("flowListSpdivZad");
        })
        $('.flowListSpdivTemp').css('visibility', 'hidden');
        $('.flowListSpdivZad').css('visibility', 'visible');

    },
    backlog_block: (row, obj) => {

        var menu = (`  
                   <div class="btnMEnuAcanselectUcun d-inline-block">
                         <button class="btnMEnuAcan" type="">
                             <i class="fas fa-plus" style="color:#595959;"></i>
                         </button>
                         <div class='prosesCartToolDivChild_12 displayNone'>
                            <div>
                            <div class='selectSpanTit'><span class = "comp-title-span"> Project </span></div>
                            <select onchange='prosessListingstoryCArdBYproject(this)' data-live-search="true" class="form-control usmg-selectpicker selectPicker_mappingProject12 selectPicker_mappingStoryCardt"></select>
                            </div>

                             <div>
                           <div class='selectSpanTit'><span class = "comp-title-span"> Story Card </span></div>
                           <select data-live-search="true" class="form-control usmg-selectpicker selectPicker_ListStoryCardt"></select>
                           </div>
                          
                           <div style="">
                           <textarea class='processlistInputt form-control form-control-sm mr-auto prosesDivChild_textarea' placeholder='Description'></textarea>
                           </div>

                          <div class='cs-input-group processlistBtnGroupp'>
                           <button class='btn btn-sm' onclick ='_220304054258036310054_.add_child_backlog(this,"${obj.fkParentId}")' flowId="${obj.fkBacklogFlowId}" fromID="${obj.id}"><i class="fas fa-plus-circle"> </i></button>
                           <button class='btn btn-sm' onclick='_220304054258036310054_.update_child_refresh(this,"${obj.id}")' style='margin:0px 5px'><i class="fas fa-redo"></i></i></button>
                           <button class='btn btn-sm' onclick='_220304054258036310054_.delete_child_backlog(this,"${obj.id}")' style="margin-right: -10px;"><i class="fas fa-trash-alt"></i></button>                          
                           </div>
                         </div>
                 </div>
        
                  `);

        var chheck = (`<input type="checkbox" class="assign-label-story-card-item-new" pid="${obj.fkToBacklogId}">`);
        var spc = ''; // '&nbsp;&nbsp;&nbsp;&nbsp;';
        var span = $('<span class="flowListSpanAna">')
            .addClass("olp2")
            .addClass(`olp-${obj.fkToBacklogId}`)
            .addClass("flow-item-span-zad")
            .append(chheck)
            // .append(spc)
            .append(`${row}.${obj.toBacklogName}`)
            .attr('ondblclick', `processMapCcartTascList("${obj.fkToBacklogId}")`)
            .append(`<span class='us-item-status-${obj.toBacklogStatus}'>${obj.toBacklogStatus}<span>`)
            .append((obj.toBacklogBugCount > 0) ? `<i class='fa fa-bug' style='color:red'>-${obj.toBacklogBugCount}</i>` : '')
            .append((obj.toBacklogNewCount > 0) ? `<span class='us-item-status-new' title='Tasks with New Status'>${obj.toBacklogNewCount}<span>` : '')
            .append((obj.toBacklogOngoingCount > 0) ? `<span class='us-item-status-ongoing' title='Tasks with ongoing Status'>${obj.toBacklogOngoingCount}<span>` : '');
        span.append(menu);

        return span;
    },
    child_body: (item, M, backlogName, res4, flow_id) => {
        var select = _220304054258036310054_.backlog_select(res4);

        var div2 = $(`<div class="hollele_zad" style="">`);
        div2.attr("parent_id", item)
        div2.append(`${backlogName}`);
        // .append(select)
        // .append(`<input style='width:50px'>`)
        // .append(` <button onclick='_220304054258036310054_.add_child_backlog(this,"${item}","${flow_id}")'>+</button><br>
        //                   <button onclick='_220304054258036310054_.delete_child_backlog(this,"${M}")'>D</button>
        //           <br><br>`);
        return div2;
    },


}


function prosessListingstoryCArdBYproject(el) {
    var data = {};
    data.fkProjectId = $(el).val();
    var select = $(el).closest('.btnMEnuAcanselectUcun').find('.selectPicker_ListStoryCardt');
    select.empty();
    select.selectpicker('refresh')
    callApi('22030400352507334738', data, true, function(res) {
        // select.attr('multiple','multiple');        
        res.tbl[0].r.map((o) => {
            select.append(`<option value='${o.id}'>${o.backlogName}</option>`)
        })
        select.selectpicker('refresh')
    })

}

// flow list
$(document).on("click", '#comp_id_2203040544260546631list', function() {
    var form_id = showForm('220305111813060410352');
    $('#comp_id_22030511382805053008').click();
})

// flow after h1
$(document).on("click", '#addNewflowListFromStoryy', function() {
        var form_id = showForm('22030400071402369492');
        $('#comp_id_22030400103203868372').click();
    })
    // flow list update
$(document).on("click", '._bussinesFollowuUpdateedit21list', function() {
        var listVal = $(this).closest('.flowListColumnn').attr('name');
        var listValID = $(this).closest('.flowListColumnn').attr('id');

        callApi('22030400004501333040', {
            id: listValID
        }, true, function(res) {
            console.log(res);
            var folowVal = res.kv.fkFlowGroupId;
            var form_id = showForm('22030400071402369492');
            $('#comp_id_22030400103203868372').click();
            $('.createBAcligFlowForSilmekUPdatede12').hide();
            $('#22030517054901113840').show();
            $('#comp_id_22030511403403431952').attr('sa-data-value', folowVal);
            $('#comp_id_22030511403403431952').val(folowVal);
            $('#comp_id_22030511403403431952').selectpicker('refresh');
            $('#comp_id_22030400072902367021').val(listVal);
            $('#comp_id_22030518473400099595').val(listValID);
        })

    })
    // flow list delete
$(document).on("click", '._bussinesFollowuSilmek1list', function() {
    var data = {};
    data.id = $(this).closest('.flowListColumnn').attr('id');
    if (confirm('Are You sure')) {
        callApi('22030500134008555797', data, true, function() {
            $('#comp_id_22030803450902384159').change();
        })
    }

});

$(document).on('click', '.btnMEnuAcan', function() {
    $(this).next().toggleClass('displayNone');
    $(this).find('i').toggleClass('fa-ellipsis fa-times');
    $('#comp_id_22030511403403431952').attr('sa-data-value', folowVal);
    $('#comp_id_22030511403403431952').val(folowVal);
    $('#comp_id_22030511403403431952').selectpicker('refresh');
    $('#comp_id_22030400072902367021').val(listVal);
    $('#comp_id_22030518473400099595').val(listValID);
})


// flow list delete
$(document).on("click", '._bussinesFollowuSilmek1list', function() {
    var data = {};
    data.id = $(this).closest('.flowListColumnn').attr('id');
    if (confirm('Are You sure')) {
        callApi('22030500134008555797', data, true, function() {
            $('#comp_id_22030803450902384159').change();
        })
    }

});

$(document).on('click', '.btnMEnuAcan', function() {
    $(this).next().toggleClass('displayNone');
    $(this).find('i').toggleClass('fa-ellipsis fa-times');
})