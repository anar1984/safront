var chDashboard = {
       init:function () {
              
              var block = this.genBlockHtml();
              var content = this.genSinglePanelItem("revan",'6543');
                   block.append(this.genSinglePanel("test",'tes22',content,"677"));
                   $("")
              
       },
       genBlockHtml: function () {
         
          return $("<div>")
                     .addClass("d-flex col-12 banner-group")
                                 

       },
       genSinglePanel: function (name,id,content,count) {
           
        return $("<div>")
                   .attr("id",id)
                   .addClass("d-flex col-4 m-2")
                   .append($("<div>")
                               .addClass("header-group col-12 text-center")
                               .append($('<h3>').append(name)))
                   .append($("<div>")
                              .addClass("group-body col-12 d-flex")
                              .append(content))
                  .append($("<div>").addClass("footer-group col-12")
                                    .append($("<div>")
                                                 .addClass('text-center d-inline float-left')
                                                 .append($("<span>")
                                                              .addClass("brend-color")
                                                             .append('<i class="fas fa-clipboard-list"></i>'))
                                                  .append($("<span>")
                                                              .addClass("brend-color")
                                                             .append(count)))
                                    .append($("<div>")
                                                .addClass("text-center d-inline")
                                                 .append('<i class="far fa-window-maximize"></i>')))

       },
       genSinglePanelItem: function (itName, count) {
           return $("<div>")
                       .addClass("col-6 d-flex")
                       .append($("<div>")
                                    .addClass("col-9 bg-8ca1c0 brend-color text-left")
                                   .append(itName))
                       .append($("<div>")
                                    .addClass("col-3 brend-color text-center")
                                   .append(count))
       }
       


      

}