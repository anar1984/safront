var cheweek_mezmun = {
    init:function () {
           
           var block = this.genBlockHtml();
              var div = $('<div>')
                div.append(this.genSinglePanelItem("HHDjsjsjd",'3596'))
                div.append(this.genSinglePanelItem("jdjgdfgd",'2564'))
                div.append(this.genSinglePanelItem("sdfsdf",'0816'))
                div.append(this.genSinglePanelItem("sdfsfsdf",'566'))
                block.append(this.genSinglePanel("test",'tes22',div.html(),"677"));
                $("#panelSecond1").html(block)
           
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
    leftSideBarHtml: function () {
      
       return $("<div>")
                  .addClass("d-flex col-12 flex-wrap banner-group")
                              

    },
    genSinglePanel: function (name,id,content,count) {
        
    return   $("<div>").addClass(" col-4 p-2")
              .append($("<div>")
                  .attr("id",id)
                  .addClass("d-flex  flex-wrap bg-shadow-3  bg-e4ecf7 rounded")
                  .append($("<div>")
                              .addClass("header-group col-12 p-3   text-center")
                              .append($('<h2 class="brend-color font-weight-bold">').append(name)))
                  .append($("<div>")
                             .addClass("group-body flex-wrap p-3 col-12 d-flex")
                             .append(content))
                 .append($("<div>").addClass("footer-group p-2 col-12")
                                   .append($("<div>")
                                                .addClass('text-center d-inline float-left')
                                                .append($("<span>")
                                                             .addClass("brend-color p-1")
                                                            .append('<i class="fas fa-clipboard-list"></i>'))
                                                 .append($("<span>")
                                                             .addClass("brend-color p-1")
                                                            .append(count)))
                                   .append($("<div>")
                                               .addClass("text-center d-inline p-1 float-right")
                                                .append('<i class="far fa-window-maximize"></i>')))
             )
      

    },
    genSinglePanelItem: function (itName, count) {
        return $("<div>")
                    .addClass("col-6 d-flex mt-2")
                    .css("font-size",'20px')
                    .append($("<div>")
                                 .addClass("col-9 bg-dce3ed brend-color p-0 pl-2 font-weight-bold rounded-left text-left")
                                .append(itName))
                    .append($("<div>")
                                 .addClass("col-3 brend-color text-center bg-fff font-weight-bold p-0 rounded-right")
                                .append(count))
    }
    
}