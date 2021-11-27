var cheweek_mezmun = {
    etap_list:[],
    init:function () {
        
        var elm = $(".component-class#21041212141705702084 >.component-section-row");
             
        var block = this.genMezmunBlock();
          var sidebar = this.leftSideBarHtml(this.genMezmunFilterList());
          block.append(sidebar);
          block.append($('<div id="content">')
                          .append(this.genHeaderMezmunList())
                          .append($("<div>")
                                        .addClass("cs-task-main mt-1")
                                       .append($("<div>")
                                                    .addClass("cs-task-panel-column"))));
          block.append(this.genFileLIst());
          elm.html(block)
          $('.selectpicker').selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-chevron-down',
        });
        getProjectUsers4Tapsiriq();
        getFilterCOmboBoxListMezmun();
        this.genEtapList();
        this.getMezmunList();
        

    },
    genEtapList: function(){
          var list = this.etap_list
        for (let i = 0; i < list.length; i++) {
            const o = $(list[i]);
            o.removeClass("col-6")
          //  o.addClass("col-2")
            o.find("div").first().css("font-size",'12px')
                 
            $("#content-header-box").append(o)
        }
    } ,
    getFiltersItemValues:function () {
      
        var tasktypeId =$("#taskTypeId-filter-tapsiriq").val();
        var createdBy = $("#createdby-filter-tapsiriq").val();
        var fkTaskTypeId = $("#taskTypeId-filter-tapsiriq").val();
        var fkCompanyId = $("#sirket-filter-tapsiriq").val();
        var fkBranchId = $("#filial-filter-tapsiriq").val();
        var fkKontragentId = $("#kontragent-filter-tapsiriq").val();
        var val = $("#date_timepicker_start_end_tapsiriq").val();
        var serach = $("#search-item-text-input").val();
            
            var json = initJSON();            
            
         //   json.kv.requestStatus = reqStat;
            json.kv.startLimit = 0;
            json.kv.endLimit = 25;
             if (serach) {
                serach = '%'+serach+'%'
                json.kv.reqeustDescription = serach ? serach : "";
            //    json.kv.reqeustCode = serach ? serach : "";
    
            }
            if (createdBy.length >0) {
                json.kv.createdBy = createdBy.length >0 ? createdBy : "";
            }
             if (fkBranchId.length >0) {
                json.kv.fkBranchId = fkBranchId.length >0? fkBranchId : "";
            } 
            if (fkKontragentId.length >0) {
                json.kv.fkKontragentId = fkKontragentId.length >0 ? fkKontragentId : "";
            }
            if (fkCompanyId.length >0) {
                json.kv.fkCompanyId = fkCompanyId.length >0 ? fkCompanyId : "";
            }
            if (val) {
                json.kv.createdDate = val ? val : "";
            
            } 

        return json
    },
    getMezmunList: function () {
        var chkAll = $("#show-all-colmn-tapsriq")
             var json = this.getFiltersItemValues();
             var type_view = localStorage.getItem('mezmun_view');
             if (!type_view) {
                  type_view = "kanban";
              };
           if (type_view === 'kanban') {
            var db = ["('new','ongoing','waiting')", "('closed','canceled','tamamlanib','defected','rejected','tesdiqlenib')"];
            if (!chkAll.prop("checked")) {
                $(".cs-task-panel-column").empty()
                        .append(tapsiriqColStatement('aktiv', "Aktiv"))
                        .append(tapsiriqColStatement('passiv', "Passiv"));
    
                for (let i = 0; i < db.length; i++) {
                    const g = db[i];
                    json.kv.requestStatus = g;
                 
                    cheweek_mezmun.getMezmunListApi(json,i);
                      
                }
    
    
            } else {
                $(".cs-task-panel-column").empty()
                        .append(tapsiriqColStatement('aktiv', "Aktiv"))
    
                const g = db[0];
                json.kv.requestStatus = g;
                         
                   cheweek_mezmun.getMezmunListApi(json,0);
    
        
                $(".cs-task-col.aktiv").find('.cs-card-fullview').click();
            }
            this.getStatusRowCountApi()
           }
           else if(type_view === 'table'){
            $(".cs-task-panel-column").empty()
            .append($("<table>").addClass('table cst-table-hover')
                                 .attr("id",'mezmun-list-table')
                                 .append($("<thead>").append(cheweek_mezmun.genHeaderMezmunListForTable()))
                                 .append($("<tbody>"))
                                 );
               var stFull ="('new','ongoing','waiting','closed','canceled','tamamlanib','defected','rejected','tesdiqlenib')"
               var stl ="('new','ongoing','waiting')"
            if (!chkAll.prop("checked")) {
                json.kv.requestStatus = stFull
            }else{
                json.kv.requestStatus = stl
            }
            cheweek_mezmun.getMezmunListApi(json,0);
           }
            
        //} 
    
    },
    getMezmunListApi:function (json,partOF) {
        json.kv.apiId = '21112206040002117371';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceIoCallActionApi",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                var type_view = localStorage.getItem('mezmun_view');
                if (!type_view) {
                     type_view = "kanban";
                 };
              if (type_view === 'kanban') {
                try {
                        if(partOF === 0){
                            $(".count-cs-aktiv").text(res.kv.rowCount)
                        }else{
                            $(".count-cs-passiv").text(res.kv.rowCount)
                        }
                  
                    genAktivPassiv(res, partOF, res.kv.rowCount);
                } catch (error) {
                
                }
              }
              if (type_view === 'table') {
                     
                      genTableViewMezmun(res, partOF, res.kv.rowCount);
              }
                
                  
            }
        });
    },
    genMezmunBlock:function (params) {
        return $("<div>")
                  .addClass("wrapper");
    },
    genFileLIst : function (params) {
       return $("<div>")
                 .addClass("file-list-block");
    },
    genKanbanZone: function (znID,znName) {
      
       return  $("<div>")
       .addClass("cs-task-col " + znID)
       .append($("<div>")
               .addClass("cs-task-boxes cs-gray-bg")
               .append($("<div>")
                       .addClass("cs-task-status-header")
                       .append($("<div>")
                               .addClass('d-flex bd-highlight cs-flex-align-middle')
                               .append(`<div class="flex-fill bd-highlight">
                                                 <div class="cs-card-size cs-dark-gray-color">
                                                 <span><i class="fas fa-clipboard-list" aria-hidden="true"></i></span>
                                                 <span class='count-cs-${znID}' >0</span>
                                             </div>
                                         </div>`)
                               .append(`<div class="flex-fill bd-highlight">
                                             <h4 class="cs-status-box-name cs-dark-blue-color text-center">${znName}</h4>
                                         </div>`)
                               .append(`<div class="flex-fill bd-highlight">
                                             <div class="cs-card-fullview cs-dark-gray-color">
                                                 <a href="#"><i class="fas fa-columns" aria-hidden="true"></i></a>
                                             </div>
                                         </div>`)

                               ))

               .append($("<div>")
                       .addClass('cs-task-item-box')
                       .append($("<div>")
                               .attr("id", 'flex-col-' + znID)
                               .addClass("cs-task-item-box-bg cs-gray-bg"))
                       ))
                              

    },
    leftSideBarHtml: function (filterList) {
      
       return $("<nav>")
                  .attr("id",'sidebar')
                  .addClass("active")
                  .append($("<ul>")
                    .addClass("list-unstyled components")
                    .append(filterList))
                              

    },
    genMezmunFilterList: function () {
         return  `<li class="">
         <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle collapsed">Bölmələr</a>
         <ul class="list-unstyled collapse task-menu-button-group" id="homeSubmenu2">
             <li>
                 <a href="#" data-view="aktiv_passiv">Məzmunlar</a>
             </li>
             <li>
                 <a href="#" data-view="status">Sorğular</a>
             </li>
            
         </ul>
     </li>
     <li class="">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle collapsed">Görünüş</a>
                <ul class="list-unstyled collapse task-view-button-group" id="homeSubmenu">
                    <li class='d-flex'>
                    <svg class='align-self-center' xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                    viewBox="0 0 0.33 0.2" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"> <defs>  <style type="text/css">  <![CDATA[.fil0 {fill:#9C572E}]]></style> </defs>
                   <g id="Layer_x0020_1">
                   <metadata id="CorelCorpID_0Corel-Layer"/>
                   <path class="fil0" d="M0.02 0.13l0.29 0c0.01,0 0.02,0.01 0.02,0.02l0 0.04c0,0.01 -0.01,0.01 -0.02,0.01l-0.29 0c-0.01,0 -0.02,0 -0.02,-0.01l0 -0.04c0,-0.01 0.01,-0.02 0.02,-0.02z"/>
                     <path class="fil0" d="M0.02 0l0.29 0c0.01,0 0.02,0.01 0.02,0.02l0 0.04c0,0.01 -0.01,0.02 -0.02,0.02l-0.29 0c-0.01,0 -0.02,-0.01 -0.02,-0.02l0 -0.04c0,-0.01 0.01,-0.02 0.02,-0.02z"/>
                  </g>
                   </svg>
                        <a href="#" data-view="table">Cədvəl</a>
                    </li>

                    <li class='d-flex'>
                    <svg class='align-self-center' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 0.33 0.24">
                   <defs>  <style type="text/css">   <![CDATA[    .fil1 {fill:#9C572E}   ]]>  </style> </defs> <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"/>
                    <path class="fil1" d="M0.19 0l0.12 0c0.01,0 0.02,0.01 0.02,0.02l0 0.07c0,0.01 -0.01,0.02 -0.02,0.02l-0.12 0c-0.01,0 -0.01,-0.01 -0.01,-0.02l0 -0.07c0,-0.01 0,-0.02 0.01,-0.02z"/>
                    <path class="fil1" d="M0.19 0.13l0.12 0c0.01,0 0.02,0.01 0.02,0.02l0 0.07c0,0.01 -0.01,0.02 -0.02,0.02l-0.12 0c-0.01,0 -0.01,-0.01 -0.01,-0.02l0 -0.07c0,-0.01 0,-0.02 0.01,-0.02z"/>
                    <path class="fil1" d="M0.02 0l0.12 0c0.01,0 0.01,0.01 0.01,0.02l0 0.07c0,0.01 0,0.02 -0.01,0.02l-0.12 0c-0.01,0 -0.02,-0.01 -0.02,-0.02l0 -0.07c0,-0.01 0.01,-0.02 0.02,-0.02z"/>
                    <path class="fil1" d="M0.02 0.13l0.12 0c0.01,0 0.01,0.01 0.01,0.02l0 0.07c0,0.01 0,0.02 -0.01,0.02l-0.12 0c-0.01,0 -0.02,-0.01 -0.02,-0.02l0 -0.07c0,-0.01 0.01,-0.02 0.02,-0.02z"/>
                    </g>
                     </svg>
                        <a href="#" data-view="kanban">Kanban</a>
                    </li>
                   
                </ul>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle collapsed">Filtr</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                    <li class='d-flex'>
                    <svg class='align-self-center' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 0.33 0.31">
                    <defs><style type="text/css"><![CDATA[.fil2 {fill:#5B8C43}]]></style></defs><g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"/>
                    <path class="fil2" d="M0.25 0.1c0.01,-0.05 -0.03,-0.09 -0.07,-0.1 -0.05,-0.01 -0.1,0.03 -0.1,0.07 -0.01,0.06 0.03,0.1 0.07,0.11 0.05,0 0.1,-0.03 0.1,-0.08zm-0.25 0.2c0,0.01 0.01,0.01 0.02,0.01 0.04,0 0.3,0.01 0.31,0 0.01,-0.01 0,-0.07 -0.06,-0.11 -0.03,-0.02 -0.11,-0.01 -0.16,-0.01 -0.01,0 -0.03,0 -0.04,0.01 -0.02,0.01 -0.03,0.02 -0.04,0.02 -0.01,0.02 -0.03,0.05 -0.03,0.08z"/>
                    </g>
                    </svg>
                    <select class="selectpicker user-filter-tapsiriq"  id="excekuter-filter-tapsiriq" title="İcra edən" multiple="" data-live-search="true">
                               
                        </select>
                    </li>

                    <li class='d-flex'>
                    <svg class='align-self-center' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 0.33 0.31">
                    <defs>
                     <style type="text/css">
                      <![CDATA[
                       .fil3 {fill:#F0BF1D}
                      ]]>
                     </style>
                    </defs>
                    <g id="Layer_x0020_1">
                     <metadata id="CorelCorpID_0Corel-Layer"/>
                     <path class="fil3" d="M0.25 0.1c0.01,-0.05 -0.03,-0.09 -0.07,-0.1 -0.05,-0.01 -0.1,0.03 -0.1,0.07 -0.01,0.06 0.03,0.1 0.07,0.11 0.05,0 0.1,-0.03 0.1,-0.08zm-0.25 0.2c0,0.01 0.01,0.01 0.02,0.01 0.04,0 0.3,0.01 0.31,0 0.01,-0.01 0,-0.07 -0.06,-0.11 -0.03,-0.02 -0.11,-0.01 -0.16,-0.01 -0.01,0 -0.03,0 -0.04,0.01 -0.02,0.01 -0.03,0.02 -0.04,0.02 -0.01,0.02 -0.03,0.05 -0.03,0.08z"/>
                    </g>
                   </svg>

                    <select class="selectpicker user-filter-tapsiriq"  id="createdby-filter-tapsiriq" multiple="" title="Daxil edən" data-live-search="true">
                            
                        </select>
                    </li>

                    <li class='d-flex'>
                    <svg class='align-self-center'  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 0.33 0.33">
                     <defs>  <style type="text/css">   <![CDATA[    .fil4 {fill:#F7F8DA}    .fil5 {fill:#3B8BA8}   ]]>  </style> </defs> <g id="Layer_x0020_1">  <metadata id="CorelCorpID_0Corel-Layer"/>
                      <path class="fil5" d="M0.17 0c0.09,0 0.16,0.07 0.16,0.17 0,0.09 -0.07,0.16 -0.16,0.16 -0.1,0 -0.17,-0.07 -0.17,-0.16 0,-0.1 0.07,-0.17 0.17,-0.17z"/>
                       <path class="fil4" d="M0.18 0.16l0.06 0.04c0.01,0.01 0.01,0.02 0.01,0.03 -0.01,0 -0.02,0.01 -0.02,0l-0.08 -0.04c0,0 -0.01,-0.01 -0.01,-0.02l0 -0.08c0,-0.01 0.01,-0.02 0.02,-0.02 0.01,0 0.02,0.01 0.02,0.02l0 0.07z"/>
                        </g>
                       </svg>
                        <a href='#'> Vaxtı çatan <input type='checkbox'></a>
                    </li>
                    <li class='d-flex'>
                    <svg   class='align-self-center' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 0.38 0.35">
                    <defs>
                     <style  type="text/css">
                      <![CDATA[
                       .fil6 {fill:#F7F8DA}
                       .fil7 {fill:#3B8BA8}
                      ]]>
                     </style>
                    </defs>
                    <g id="Layer_x0020_1">
                     <metadata id="CorelCorpID_0Corel-Layer"/>
                     <path class="fil6" d="M0.18 0.01c0.09,0 0.16,0.08 0.16,0.17 0,0.09 -0.07,0.16 -0.16,0.16 -0.09,0 -0.17,-0.07 -0.17,-0.16 0,-0.09 0.08,-0.17 0.17,-0.17z"/>
                     <path class="fil7" d="M0.35 0.19c-0.01,0.09 -0.08,0.16 -0.17,0.16 -0.1,0 -0.18,-0.08 -0.18,-0.17 0,-0.1 0.07,-0.17 0.16,-0.18 0.01,0 0.02,0.01 0.02,0.02 0,0.01 -0.01,0.02 -0.02,0.02 -0.07,0 -0.12,0.06 -0.12,0.14 0,0.07 0.06,0.14 0.14,0.14 0.07,0 0.13,-0.06 0.14,-0.13l-0.03 0c0,0 0,0 0,0l0.04 -0.06c0,-0.01 0,-0.01 0.01,0l0.04 0.06c0,0 0,0 -0.01,0l-0.02 0c0,0 0,0 0,0zm-0.16 -0.01l0.07 0.04c0.01,0 0.01,0.01 0.01,0.02 -0.01,0.01 -0.02,0.01 -0.03,0.01l-0.08 -0.05c0,0 -0.01,-0.01 -0.01,-0.01l0 -0.09c0,-0.02 0.01,-0.02 0.02,-0.02 0.01,0 0.02,0 0.02,0.02l0 0.08z"/>
                    </g>
                   </svg>
                       <a href='#'> Vaxtı keçən <input type='checkbox'></a>
                    </li>
                    <li class='d-flex'>
                    <svg class='align-self-center'  xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                     viewBox="0 0 0.33 0.28" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"> <defs>  <style type="text/css">   <![CDATA[    .fil8 {fill:#C20F5A}   ]]>  </style> </defs> <g id="Layer_x0020_1">  <metadata id="CorelCorpID_0Corel-Layer"/>
                   <path class="fil8" d="M0.03 0.05l0.07 0c0,0 0,0 0,-0.01l0 -0.01c0,-0.02 0.01,-0.03 0.03,-0.03l0.07 0c0.02,0 0.03,0.01 0.03,0.03l0 0.01c0,0.01 0,0.01 0,0.01l0.07 0c0.02,0 0.03,0.01 0.03,0.03l0 0.17c0,0.02 -0.01,0.03 -0.03,0.03l-0.27 0c-0.02,0 -0.03,-0.01 -0.03,-0.03l0 -0.17c0,-0.02 0.01,-0.03 0.03,-0.03zm0.1 -0.03l0.07 0c0,0 0.01,0.01 0.01,0.01l0 0.01c0,0.01 -0.01,0.01 -0.01,0.01l-0.07 0c0,0 -0.01,0 -0.01,-0.01l0 -0.01c0,0 0.01,-0.01 0.01,-0.01z"/>
                     </g>
                     </svg>
                      <select class="selectpicker user-filter-tapsiriq" title="Şirkət" onchange="cheweek_mezmun.getMezmunList()"   data-live-search="true"
                      id="sirket-filter-tapsiriq">
                   
                    </select>
                    </li>
                    <li class='d-flex'>
                    <svg class='align-self-center' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 0.33 0.28">
                     <defs>  <style type="text/css">   <![CDATA[    .fil9 {fill:#F7F8DA}    .fil10 {fill:#C20F5A}   ]]>  </style> </defs>                     <g id="Layer_x0020_1">
                      <metadata id="CorelCorpID_0Corel-Layer"/>
                      <path class="fil10" d="M0.03 0.05l0.07 0c0,0 0,0 0,-0.01l0 -0.01c0,-0.02 0.01,-0.03 0.03,-0.03l0.07 0c0.02,0 0.03,0.01 0.03,0.03l0 0.01c0,0.01 0,0.01 0,0.01l0.07 0c0.02,0 0.03,0.01 0.03,0.03l0 0.17c0,0.02 -0.01,0.03 -0.03,0.03l-0.27 0c-0.02,0 -0.03,-0.01 -0.03,-0.03l0 -0.17c0,-0.02 0.01,-0.03 0.03,-0.03zm0.1 -0.03l0.07 0c0,0 0.01,0.01 0.01,0.01l0 0.01c0,0.01 -0.01,0.01 -0.01,0.01l-0.07 0c0,0 -0.01,0 -0.01,-0.01l0 -0.01c0,0 0.01,-0.01 0.01,-0.01z"/>
                      <path class="fil9" d="M0.27 0.15l0 0c0,0 0,0.01 0.01,0.01l0.01 0c0,0 0,0 0,0l0 0.01c0,0 0,0 0,0l0.01 0.01c0,0 0,0 0,0.01l0 0c0,0.01 0,0.01 0,0.01l0 0.01c0,0 0,0 0,0l-0.01 0.01c0,0 0,0 0,0l0 0.01c0,0 0,0.01 0,0.01l-0.01 0c-0.01,0 -0.01,0 -0.01,0l0 0.01c0,0 -0.01,0 -0.01,0l-0.01 0c0,-0.01 0,-0.01 0,0l-0.01 0c0,0 -0.01,0 -0.01,0l0 -0.01c0,0 0,0 -0.01,0l-0.01 0c0,0 0,-0.01 0,-0.01l0 -0.01c0,0 0,0 0,0l-0.01 -0.01c0,0 0,0 0,0l0 -0.01c0,0 0,0 0,-0.01l0 0c0,-0.01 0,-0.01 0,-0.01l0.01 -0.01c0,0 0,0 0,0l0 -0.01c0,0 0,0 0,0l0.01 0c0.01,0 0.01,-0.01 0.01,-0.01l0 0c0,-0.01 0.01,-0.01 0.01,-0.01l0.01 0.01c0,0 0,0 0,0l0.01 -0.01c0,0 0.01,0 0.01,0.01z"/>
                     </g>
                    </svg>
                      <select class="selectpicker user-filter-tapsiriq" title="Filial" onchange="cheweek_mezmun.getMezmunList()"     data-live-search="true"
                      id="filial-filter-tapsiriq">
                   
                    </select>
                    </li>
                    <li class='d-flex'>
                    <svg  class='align-self-center' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 0.33 0.28">
                      <defs>  <style type="text/css">   <![CDATA[    .fil11 {fill:#047EB3}    .fil12 {fill:#F0BF1D}   ]]>  </style> </defs> <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"/>
                     <path class="fil11" d="M0.19 0.08c0,-0.04 -0.02,-0.07 -0.06,-0.08 -0.04,-0.01 -0.07,0.02 -0.07,0.06 -0.01,0.03 0.02,0.07 0.05,0.07 0.04,0.01 0.07,-0.02 0.08,-0.05zm-0.19 0.15c0,0 0.01,0 0.01,0 0.04,0 0.23,0.01 0.23,0 0.01,0 0.01,-0.05 -0.04,-0.08 -0.02,-0.01 -0.08,-0.01 -0.11,-0.01 -0.02,0 -0.03,0.01 -0.04,0.01 -0.01,0 -0.02,0.01 -0.03,0.02 -0.01,0.01 -0.02,0.03 -0.02,0.06z"/>
                        <path class="fil12" d="M0.27 0.12c0.01,-0.03 -0.02,-0.06 -0.05,-0.07 -0.04,-0.01 -0.07,0.02 -0.08,0.05 0,0.04 0.02,0.08 0.06,0.08 0.04,0 0.07,-0.02 0.07,-0.06zm-0.19 0.16c0,0 0.01,0 0.02,0 0.03,0 0.22,0.01 0.23,0 0.01,0 0,-0.05 -0.04,-0.08 -0.03,-0.01 -0.09,-0.01 -0.12,-0.01 -0.01,0 -0.03,0 -0.04,0.01 -0.01,0 -0.02,0.01 -0.02,0.02 -0.01,0.01 -0.03,0.03 -0.03,0.06z"/>
                        </g>
                       </svg>
                      <select class="selectpicker user-filter-tapsiriq" title="Kontragentlər"  multiple data-live-search="true"
                      id="kontragent-filter-tapsiriq">
                   
                    </select>
                    </li>
                    <li class='d-flex'>
                    <svg class='align-self-center' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003" xml:space="preserve" width="15px" height="15px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 0.33 0.35">
                    <defs>  <style type="text/css">   <![CDATA[    .fil13 {fill:#047EB3}   ]]>  </style> </defs> <g id="Layer_x0020_1">  <metadata id="CorelCorpID_0Corel-Layer"/>
                      <path class="fil13" d="M0.3 0.06l-0.13 -0.06c0,0 -0.01,0 -0.01,0l-0.13 0.06c0,0 -0.01,0 -0.01,0 0,0 0.01,0.01 0.01,0.01l0.13 0.05c0,0 0,0 0.01,0l0.13 -0.05c0,0 0,-0.01 0,-0.01 0,0 0,0 0,0zm0.02 0.02l-0.14 0.06c0,0 0,0 0,0.01l0 0.2c0,0 0,0 0,0 0,0 0,0 0,0l0.15 -0.06c0,0 0,0 0,0l0 -0.2c0,-0.01 0,-0.01 0,-0.01 0,0 -0.01,0 -0.01,0zm-0.31 0l0.14 0.06c0,0 0,0 0,0.01l0 0.2c0,0 0,0 0,0 0,0 0,0 0,0l-0.15 -0.06c0,0 0,0 0,0l0 -0.2c0,-0.01 0,-0.01 0,-0.01 0,0 0.01,0 0.01,0zm0.04 0.05l0.06 0.02c0,0.01 0,0.01 0,0.02l0 0c0,0 0,0.01 0,0l-0.06 -0.02c-0.01,0 -0.01,-0.01 -0.01,-0.02l0 0c0,0 0,0 0.01,0z"/>
                       </g>
                    </svg>
                      <select class="selectpicker user-filter-tapsiriq" title="Məhsullar"  multiple data-live-search="true"
                      id="mehsul-filter-tapsiriq">
                   
                    </select>
                    </li>
                </ul>
            </li>

     `
    },
    genHeaderMezmunList: function () {
       return $("<div>")
                   .addClass('cs-taskManagement-filter-box cs-gray-bg')
                   .append($("<div>")
                                .addClass('d-flex bd-highlight')
                                .append($('<div>')
                                      .addClass("mr-auto p-1 d-flex bd-highlight")
                                      .append(`<div class="form-group cs-search mr-1">
                                            <span id="sidebarCollapse" class="btn  cs-dark-gray-color btn-light">
                                            <i class="fas fa-bars" aria-hidden="true"></i>
                                            </span></div>`)
                                      .append(`<div class="form-group cs-search cs-filter-col"><span class="fa fa-search form-control-feedback" aria-hidden="true"></span>
                                      <input type="search" id='search-item-text-input' autocomplete="new-password"  class="form-control"  placeholder="Axtar...">
                                  </div>`)
                                     .append($("<div>")
                                                  .addClass("d-flex flex-wrap")
                                                 .attr("id",'header-etap-list-mezmun')
                                                .append(""))
                                     .append($("<div>")
                                                .addClass('d-flex align-content-start flex-wrap filter-section')
                                                .attr("id",'content-header-box')))
                                .append(`<div class="p-1 bd-highlight  d-table right-radius-5px cursor-pointer">
                                <div class="filter-layaout-box d-table-cell align-middle">
                                     <div data-toggle="tooltip" orderno="0.4" style="padding-top:4px;text-align: center;" id="210414110627034510148" pid="210414110627034510148" class="tooltipMan component-class component-container-dashed col" onclick="">
                               
                                        <div class="box-1">
                                            <input sa-type="checkbox" type="checkbox" onchange="cheweek_mezmun.getMezmunList()" id="show-all-colmn-tapsriq">
                                            <span data-after="Hamısı" data-before="Aktiv" class="toogle"></span>
                                        </div>
                                     </div>
                                </div>
                            </div>`))

    },
    genHeaderMezmunListForTable:function (params) {
       return `<tr>
       <th class="text-center"></th>
       <th class="text-center"><label href="#" class="component-class" id="21010301044803654431" pid="21010301044803654431" orderno="0.7" onclick="">Status</label> </th>
       <th class="text-center cst-a-font"><label href="#" class="component-class" id="21010301044606219226" pid="21010301044606219226" orderno="1.22" onclick="">Kontragent</label></th>

       <th class="text-center cst-a-font"><label href="#" class="component-class" id="21010301044607177560" pid="21010301044607177560" orderno="2.51" onclick="">Məzmun</label></th>

       <th class="text-center"><label href="#" class="component-class" id="21010401365809185252" pid="21010401365809185252" orderno="2.722" onclick="">Tarix</label> </th>

       <th class="text-center"><label href="#" class="component-class" id="21010301044606933894" pid="21010301044606933894" orderno="2.83" onclick="">Daxil edən</label> </th>


   </tr>` 
    },
    getTableTrFormezmun: function(say,id, mzmn, image, nameUs, taskStatus, tasktype, time, date, hid, statusID) {

        return $("<tr>")
                .addClass('cs-task-item-in-box redirectClass ')
                .attr('id', id)
                .attr('pid', id)
                .append($("<td>")
                         .addClass("text-center")
                        .append(say)) 
                .append($("<td>")
                            .addClass(" text-center bg-status-" + statusID)
                             .append($("<div>")
                                      
                                       .append(taskStatus))) 
                .append($("<td>").append(tasktype)) 
                .append($("<td>").append(`<div ><a href='#' onclick_trigger_id="21031217414702167956" class='m-0'>${mzmn}</a> </div>`)) 
                .append($("<td>")
                          .addClass("text-center")
                 .append(` <div class="cs-task-card-datatime pr-1 d-inline-block" data-trigger="hover" data-placement='bottom' data-toggle="popover" data-content="Saat: ${time} <br> Gün: ${date}" title="" data-original-title="Tarix">
                <i class="fas fa-calendar-alt"></i>
                <span >${date}</span>
            </div>`)) 
                .append($("<td>")
                        .addClass("text-center")
                       .append(`<img class="Assigne-card-story-select-img created" src="https://app.sourcedagile.com/api/get/files/${image}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameUs}" title="" data-original-title="Daxil Edən">`)) 
               
               
               .append($('<td>').append(hid).hide())
    
    
    },
    getContentTapsiriq: function(id, mzmn, image, nameUs, taskStatus, tasktype, time, date, hid, statusID) {

        return $("<div>")
                .addClass('cs-task-item-in-box redirectClass cs-white-bg')
                .attr('id', id)
                .attr('pid', id)
                .append($("<div>")
                        .addClass("cs-cart-head-title p-2")
                        .append(tasktype)
                        .append($("<span class='brend-color large-blok-icon'>")
                                .html('<i class="fas fa-columns"></i>')))
                .append(`<div class="cs-task-card-body pl-2 pr-2"">
                           <div class="cs-task-card-desc">
    
                           <p onclick_trigger_id="21031217414702167956" class=''>${mzmn}</p>
                           </div>
                           </div>`)
                .append($("<div>")
                        .addClass('cs-task-card-bottom  bg-status-' + statusID)
                        .append($("<div>")
                                .addClass('d-flex  bd-highlight cs-flex-align-middle')
                                .append($("<div>")
                                        .addClass("d-flex flex-fill align-items-center bd-highlight")
                                        .append(`<div class="cs-task-card-avatar-boxes"><ul>
                                                   <li><img class="Assigne-card-story-select-img created" src="https://app.sourcedagile.com/api/get/files/${image}" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="${nameUs}" title="" data-original-title="Daxil Edən"></li>
                                                     </ul></div>`)
                                        .append($("<div>")
                                                .addClass("cs-staturs-circle-note1 ml-2")
                                                .append(taskStatus))
                                        )
    
    
    
    
                                .append(` <div class="flex-fill bd-highlight text-right">
                                <div class="cs-task-card-datatime pr-1 d-inline-block" data-trigger="hover" data-placement='bottom' data-toggle="popover" data-content="Saat: ${time} <br> Gün: ${date}" title="" data-original-title="Tarix">
                                <i class="fas fa-calendar-alt"></i>
                                <span >${date}</span>
                            </div>
                                      <div class="cs-task-card-attachfile">
                                          <label for="cs-file-upload" class="cs-file-upload">
                                              <i class="fas fa-paperclip"></i>
                                          </label>
                                          <input id="cs-file-upload" type="file"/>
                                      </div>
                                      <label class="cs-card-ceckbox switch">
                                          <input type="checkbox" id="user-story-show-stat4tapsiriq" data-bid="${id}" class="user-story-prototype-change1" />
                                          <span class="slider round hide-off "></span>
                                      </label>
                                  </div>`)
                                ))
    
    
                .append($("<div>").addClass("stat-div-task-content")
                        .append($('<table>').addClass("stat-table-us")
                                .append($("<thead>")
                                        .append($("<tr class=total>"))
                                        .append($("<tr class='bug'>"))
                                        )
                                .append($("<tbody>")))
                        .css("display", 'none'))
    
                .append(hid.hide())
    
    
    },
    getStatusRowCountApi: function () {
        var json = initJSON();
        json.kv.apiId = '21112200395307246938';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceIoCallActionApi",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                   var aktiv = $(".cs-task-col.aktiv .cs-task-status-header .cs-flex-align-middle .flex-fill:nth-child(2)");
                   var passiv = $(".cs-task-col.passiv .cs-task-status-header .cs-flex-align-middle .flex-fill:nth-child(2)");
                      aktiv.after($("<div>")
                                     .addClass('flex-fill d-flex bd-highlight minimze-hidden-block')
                                     .attr("id","aktiv-total-task-list"))
                      passiv.after($("<div>")
                                     .addClass('flex-fill d-flex bd-highlight minimze-hidden-block')
                                     .attr("id","passiv-total-task-list"))
                try {
                    var stat = GetTaskStatusList();
                    stat = stat._table.r;
                    
                      var res = res.tbl[0].r;
                      for (let i = 0; i < res.length; i++) {
                          const o = res[i];
                            var stId = o.requestStatus
                           
                             if(stId.length<2){
                               
                             }else{
                              var taskName
                                for (let c = 0; c < stat.length; c++) {
                                    if (stat[c].id == stId) {
                                        taskName = stat[c].taskStatusName;
                                    }
                
                                }


                                if (stId === 'new' || stId === 'ongoing' || stId === 'waiting') {
                                    $("#aktiv-total-task-list").append(that.genStatusBlock(taskName,stId,o.rowCount));
                                }else{
                                    $("#passiv-total-task-list").append(that.genStatusBlock(taskName,stId,o.rowCount));

                                }

                             
                             }
                             

                          
                      }
                } catch (error) {
                    
                }
            }
        });
    },
    genStatusBlock:function (stName,stId,count) {
        return  $("<div>")
        .addClass('p-0 ')
        .append(
           $("<div>")

           .addClass(" d-flex m-1 overflow-hidden  shadow-sm p-0 rounded-pill ")
           .css("font-size",'10px')
           .css("border",'1px solid lightgray')
           .append($("<div>")
                
                        .addClass("col bg-status-"+stId+" brend-color p-1 pl-3  font-weight-bold  text-center")
                        .css("white-space",'nowrap')
                       .append(stName))
           .append($("<div>")
                        .addClass("col brend-color text-center bg-fff  align-self-center pr-2 font-weight-bold p-1 ")
                       .append(count))
        )
       
    },
   
}

function getBrancListByCompanyId(fkCompanyId) {

    var json = initJSON();
      json.kv.fkCompanyId = fkCompanyId 
    json.kv.apiId = '21112222503701715182';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceIoCallActionApi",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    
                    var  obj = res.tbl[0].r;
                    $("#filial-filter-tapsiriq").html('');
                 for (var n = 0; n < obj.length; n++) {
                       $("#filial-filter-tapsiriq").append($('<option>').val(obj[n].id).text(obj[n].branchName));
                 }
                   
                 $("#filial-filter-tapsiriq").selectpicker("refresh")
                } catch (error) {
                    
                }
                  
            }
        });
}
function getFilterCOmboBoxListMezmun() {

    var json = initJSON(); 
    json.kv.apiId = '211122225407026410927';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceIoCallActionApi",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                     
                    var  obj = res.tbl[0].r;
                    $("#mehsul-filter-tapsiriq").html('');
                 for (var n = 0; n < obj.length; n++) {
                       $("#mehsul-filter-tapsiriq").append($('<option>').val(obj[n].id).text(obj[n].productName));
                 }
                    var  obj1 = res.tbl[1].r;
                    $("#kontragent-filter-tapsiriq").html('');
                 for (var n1 = 0; n1 < obj1.length; n1++) {
                       $("#kontragent-filter-tapsiriq").append($('<option>').val(obj1[n1].id).text(obj1[n1].kaName));
                 }
                    var  obj2 = res.tbl[2].r;
                    $("#sirket-filter-tapsiriq").html('');
                 for (var n2 = 0; n2 < obj2.length; n2++) {
                       $("#sirket-filter-tapsiriq").append($('<option>').val(obj2[n2].id).text(obj2[n2].companyName));
                 }

                 $(".selectpicker").selectpicker("refresh")
                } catch (error) {
                    console.log(error);
                    console.log('sdfghjk');
                }
                  
            }
        });
}
function getProjectUsers4Tapsiriq() {


    var json = initJSON();

    json.kv['fkProjectId'] = global_var.current_project_id;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmSelectUsersByProject4Select",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {

            obj = res.tbl[0].r;
            $("#excekuter-filter-tapsiriq").html('');
            $("#createdby-filter-tapsiriq").html('');
            for (var n = 0; n < obj.length; n++) {
                $("#excekuter-filter-tapsiriq").append($('<option>').val(obj[n].fkUserId).text(obj[n].userName));
                $("#createdby-filter-tapsiriq").append($('<option>').val(obj[n].fkUserId).text(obj[n].userName));
            }

            $("#excekuter-filter-tapsiriq").selectpicker("refresh");
            $("#createdby-filter-tapsiriq").selectpicker("refresh");
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

function genAktivPassiv(res, x, say) {
      var pureRes = res

    try {
        res = res.tbl[0].r

        var oper = getreqeuest4Tapsiriq();
        oper = oper._table.r;
        var stat = GetTaskStatusList();
        stat = stat._table.r;

        for (let l = 0; l < res.length; l++) {

            const o = res[l];
            if (o.requestStatus === 'new' || o.requestStatus === 'ongoing' || o.requestStatus === 'waiting') {

                var hid = $('<div>')
                        .append($("<input>").val(o.id).attr("sa-selectedfield", 'fkRequestId'))

                var date = Utility.convertDate(o.createdDate);
                var img
                var userName
                if (o.createdBy) {
                    img = SAProjectUser.ProjectUsers[o.createdBy].userImage;
                    userName = o.userPersonName;
                } else {
                    img = 'userprofile.png';
                    userName = 'Yoxdur'
                }
                var st = $('<span>');
                for (let c = 0; c < stat.length; c++) {
                    if (stat[c].id == o.requestStatus) {
                        st.text(stat[c].taskStatusName);
                    }

                }
                var a = $("<span>")
                        .attr("href", '#')
                        .addClass('operation')
                        .addClass('_taskListTaskTypeIdField')
                        .attr('sa-data-fktasktypeid', o.kaName)
                        .text(o.kaName);

                reqeustDescription = o.requestDescription + "(" + o.requestCode + ")"
                var html = cheweek_mezmun.getContentTapsiriq(o.id, reqeustDescription, img, userName, st, a, '', date, hid, o.requestStatus);
                $("#flex-col-aktiv").append(html);
            } else {
                var hid = $('<div>')
                        .append($("<input>").val(o.id).attr("sa-selectedfield", 'fkRequestId'))

                var date = Utility.convertDate(o.createdDate);
                var img
                var userName
                if (o.createdBy) {
                    img = SAProjectUser.ProjectUsers[o.createdBy].userImage;
                    userName = o.userPersonName;
                } else {
                    img = 'userprofile.png';
                    userName = 'Yoxdur'
                }

                var st = $('<span>');
                for (let c = 0; c < stat.length; c++) {
                    if (stat[c].id == o.requestStatus) {
                        st.text(stat[c].taskStatusName);
                    }

                }
                var a = $("<span>")
                        .attr("href", '#')
                        .addClass('operation')
                        .addClass('_taskListTaskTypeIdField')
                        .attr('sa-data-fktasktypeid', o.kaName)
                        .text(o.kaName);

                reqeustDescription = o.requestDescription + "(" + o.requestCode + ")"
                var html = cheweek_mezmun.getContentTapsiriq(o.id, reqeustDescription, img, userName, st, a, "", date, hid, o.requestStatus);
                $("#flex-col-passiv").append(html);
            }


        }

        $('.cs-task-panel-column .selectpicker').selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-chevron-down',
        });

        $('[data-toggle="popover"]').popover({
            html: true
        });
         var edLmt =pureRes.kv.endLimit;
             edLmt = parseFloat(edLmt)
        if (x === 0) {
            $("#flex-col-aktiv").find('.more-button-fortapsiriq').remove();
            if (parseFloat(say) > edLmt) {
             
                $("#flex-col-aktiv").append($("<div>")
                        .addClass("more-button-fortapsiriq text-center ")
                        .text('Daha çox')
                        .attr("data-status", x)
                        .attr("start-limit", parseFloat(pureRes.kv.startLimit)+25)
                        .attr("end-limit", edLmt+25)
                        )
            }

        }

        if (x === 1) {
            $("#flex-col-passiv").find('.more-button-fortapsiriq').remove();
            if (parseFloat(say) > edLmt) {
                $("#flex-col-passiv").append($("<div>")
                        .addClass("more-button-fortapsiriq text-center ")
                        .text('Daha çox')
                        .attr("data-status", x)
                        .attr("start-limit", parseFloat(pureRes.kv.startLimit)+25)
                        .attr("end-limit", edLmt+25)
                        );
            }
        }
    } catch (error) {
        console.log(error);
    }


}
function genTableViewMezmun(res, x, say) {
      var pureRes = res
      
        var table = $("#mezmun-list-table>tbody")
    try {
        res = res.tbl[0].r

        var oper = getreqeuest4Tapsiriq();
        oper = oper._table.r;
        var stat = GetTaskStatusList();
        stat = stat._table.r;

        for (let l = 0; l < res.length; l++) {

            const o = res[l];
          

                var hid = $('<div>')
                        .append($("<input>").val(o.id).attr("sa-selectedfield", 'fkRequestId'))

                var date = Utility.convertDate(o.createdDate);
                var img
                var userName
                if (o.createdBy) {
                    img = SAProjectUser.ProjectUsers[o.createdBy].userImage;
                    userName = o.userPersonName;
                } else {
                    img = 'userprofile.png';
                    userName = 'Yoxdur'
                }
                var st = $('<span>');
                for (let c = 0; c < stat.length; c++) {
                    if (stat[c].id == o.requestStatus) {
                        st.text(stat[c].taskStatusName);
                    }

                }
                var a = $("<span>")
                        .attr("href", '#')
                        .addClass('operation')
                        .addClass('_taskListTaskTypeIdField')
                        .attr('sa-data-fktasktypeid', o.kaName)
                        .text(o.kaName);

                reqeustDescription = o.requestDescription + "(" + o.requestCode + ")"
                var html = cheweek_mezmun.getTableTrFormezmun((parseFloat(pureRes.kv.startLimit)+1+l),o.id, reqeustDescription, img, userName, st, a, '', date, hid, o.requestStatus);
                $(table).append(html);
            


        }

        $('.cs-task-panel-column .selectpicker').selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-chevron-down',
        });

        $('[data-toggle="popover"]').popover({
            html: true
        });
         var edLmt =pureRes.kv.endLimit;
             edLmt = parseFloat(edLmt)
       
            table.find('.more-button-fortapsiriq').remove();
            if (parseFloat(say) > edLmt) {
             
                table.append($("<div>")
                        .addClass("more-button-fortapsiriq text-center ")
                        .text('Daha çox')
                        .attr("data-status", x)
                        .attr("start-limit", parseFloat(pureRes.kv.startLimit)+25)
                        .attr("end-limit", edLmt+25)
                        )
            }

        

        
    } catch (error) {
        console.log(error);
    }


}


$(document).on("click", '.task-view-button-group li a', function (params) {
    var view = $(this).attr('data-view');
       $(this).closest('.task-view-button-group').find("li.active").removeClass("active");
      $(this).closest('li').addClass("active");

    localStorage.setItem("mezmun_view", view);
      cheweek_mezmun.getMezmunList();


})
$(document).on("change", '#task-kanban-search-tapsiriq', function () {

   var idk = "%%" + $(this).val() + "%%"


    //cheweek_mezmun.getMezmunList(idk);
})
$(document).on("change", '#sirket-filter-tapsiriq', function () {

   var idk =  $(this).val();
   getBrancListByCompanyId(idk);

    //cheweek_mezmun.getMezmunList(idk);
})
$(document).on("change", '#search-item-text-input', function () {
    cheweek_mezmun.getMezmunList();
})

$(document).on("click", '.more-button-fortapsiriq', function () {
    var elm = $(this).attr('data-status');
    var st = $(this).attr('start-limit');
    var ent = $(this).attr('end-limit');
    var db = ["('new','ongoing','waiting')", "('closed','canceled','tamamlanib','defected','rejected','tesdiqlenib')"];

    var json = cheweek_mezmun.getFiltersItemValues();
           json.kv.startLimit = st;
           json.kv.endLimit = ent;
           json.kv.requestStatus = db[elm];

    cheweek_mezmun.getMezmunListApi(json, parseFloat(elm));

})