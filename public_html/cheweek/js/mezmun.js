var cheweek_mezmun = {
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
          elm.html(block)
          $('.selectpicker').selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-chevron-down',
        });
        getProjectUsers4Tapsiriq();
        this.getMezmunList();

    },
    getMezmunList: function (serach) {
        var chkAll = $("#show-all-colmn-tapsriq")
        var tasktypeId =$("#taskTypeId-filter-tapsiriq").val();
        var createdBy = $("#createdby-filter-tapsiriq").val();
        var fkTaskTypeId = $("#taskTypeId-filter-tapsiriq").val();
        var executorİd = $("#excekuter-filter-tapsiriq").val();
        var fkKontragentId = $("#kontragent-filter-tapsiriq").val();
        var val = $("#date_timepicker_start_end_tapsiriq").val();
       
        var type_view = localStorage.getItem('mezmun_view');
        if (!type_view) {
            type_view = "kanban";
        };
        //if (type_view === 'kanban') {
             
            var json = initJSON();            
            
         //   json.kv.requestStatus = reqStat;
            json.kv.startLimit = 0;
            json.kv.endLimit = 25;
           /*  if (serach) {
                json.kv.reqeustDescription = serach ? serach : "";
                json.kv.reqeustCode = serach ? serach : "";
    
            }
            if (createdBy) {
                json.kv.createdBy = createdBy ? createdBy : "";
            }
            if (tasktypeId) {
                json.kv.fkTaskTypeId = tasktypeId ? tasktypeId : "";
            }
            if (fkKontragentId) {
                json.kv.fkKontragentId = fkKontragentId ? fkKontragentId : "";
            }
            if (val) {
                json.kv.createdDate = val ? val : "";
            
            } */
            var db = ["('new','ongoing','waiting')", "('closed','canceled','tamamlanib','defected','rejected','tesdiqlenib')"];
            if (!chkAll.prop("checked")) {
                $(".cs-task-panel-column").empty()
                        .append(tapsiriqColStatement('aktiv', "Aktiv"))
                        .append(tapsiriqColStatement('passiv', "Passiv"));
    
                for (let i = 0; i < db.length; i++) {
                    const g = db[i];
                    json.kv.requestStatus = g;
                  
                    cheweek_mezmun.getMezmunListApi(json)
                    if (i === 0) {
                       
                    }
    
                    if (i === 1) {
                   
                    }
    
                }
    
    
            } else {
                $(".cs-task-panel-column").empty()
                        .append(tapsiriqColStatement('aktiv', "Aktiv"))
    
                const g = db[0];
                json.kv.requestStatus = g;
                         
                   cheweek_mezmun.getMezmunListApi(json)
    
        
                $(".cs-task-col.aktiv").find('.cs-card-fullview').click();
            }
        //} 
    },
    getMezmunListApi:function (json) {
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
                try {
                  
                    genAktivPassiv(res, 0, res.kv.rowCount);
                } catch (error) {
                    
                }
                  
            }
        });
    },
    genMezmunBlock:function (params) {
        return $("<div>")
                  .addClass("wrapper");
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
                      <select class="selectpicker user-filter-tapsiriq" title="Şirkət"  multiple data-live-search="true"
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
                      <select class="selectpicker user-filter-tapsiriq" title="Filial"  multiple data-live-search="true"
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
                                      <input type="search" autocomplete="new-password"  class="form-control"  placeholder="Axtar...">
                                  </div>`)
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
        if (x === 0) {
            if (say > 25) {
                $("#flex-col-aktiv").append($("<div>")
                        .addClass("more-button-fortapsiriq text-center ")
                        .text('Daha çox')
                        .attr("data-status", 'aktiv')
                        .attr("start-limit", '25')
                        .attr("end-limit", '50')
                        )
            }

        }

        if (x === 1) {
            if (say > 25) {
                $("#flex-col-passiv").append($("<div>")
                        .addClass("more-button-fortapsiriq text-center ")
                        .text('Daha çox')
                        .attr("data-status", 'passiv')
                        .attr("start-limit", '25')
                        .attr("end-limit", '50')
                        );
            }
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
    //cheweek_mezmun.getMezmunList(idk);


})
$(document).on("change", '#task-kanban-search-tapsiriq', function (params) {

   var idk = "%%" + $(this).val() + "%%"


    //cheweek_mezmun.getMezmunList(idk);
})