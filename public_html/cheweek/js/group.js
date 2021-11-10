var chDashboard = {
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
       genBlockHtml: function () {
         
          return $("<div>")
                     .addClass("d-flex col-12 banner-group")
                                 

       },
       genSinglePanel: function (name,id,content,count) {
           
        return $("<div>")
                   .attr("id",id)
                   .addClass("d-flex col-4 flex-wrap m-2 bg-e4ecf7 rounded")
                   .append($("<div>")
                               .addClass("header-group col-12 p-3  text-center")
                               .append($('<h3 class="brend-color">').append(name)))
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

       },
       genSinglePanelItem: function (itName, count) {
           return $("<div>")
                       .addClass("col-6 d-flex mt-2")
                       .css("font-size",'20px')
                       .append($("<div>")
                                    .addClass("col-9 bg-dce3ed brend-color p-0 pl-2 rounded-left text-left")
                                   .append(itName))
                       .append($("<div>")
                                    .addClass("col-3 brend-color text-center bg-fff p-0 rounded-right")
                                   .append(count))
       }
       


      

}