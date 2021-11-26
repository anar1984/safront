var cheweek_group = {
       init:function () {
                     
       },
       getModulList:function () {
                  
              var json = initJSON();            
              json.kv.apiId = '21111814293203195280';
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
              
                         var div = $(".component-class#21041212141705702084 >.component-section-row");
                        var block = $("<div>");
                         var dat = res.tbl[0].r;
                        
                         for (let i = 0; i < dat.length; i++) {
                                const o = dat[i];
                                var bl = block.find("#"+o.modulKey)
                               if(bl.length>0){
                                      var ct = bl.find(".count-modul").text();
                                      bl.find(".count-modul").text(parseFloat(ct)+parseFloat(o.rowCount));
                                   bl.find('.group-body').append(that.genSinglePanelItem(o.etapName,o.rowCount,o.etapCode));
                               }else{
                                      block.append(that.genSinglePanel(o.modulName,o.modulKey,"0"))  
                                      var ct = block.find("#"+o.modulKey).find(".count-modul").text();
                                      block.find("#"+o.modulKey).find(".count-modul").text(parseFloat(ct)+parseFloat(o.rowCount));
                                      block.find("#"+o.modulKey).find('.group-body').append(that.genSinglePanelItem(o.etapName,o.rowCount,o.etapCode));

                               }
                                
                         }
                        
                         div.html(that.genBlockHtml(block.html()));
             
                         resetTimer();
                         startTimer();
                  }
              });
       },
       genBlockHtml: function (content) {
         
              
          return $("<div>")
                     .append($("<div>")
                                 .addClass("col-12 ")
                                 .append($("<div>")
                                            .addClass("text-center p-1 float-right d-inline-block")
                                            .append($("<span>")
                                                        .addClass("mr-3 brend-color timer-modul-list align-middle")
                                                        .attr("id",'modul-list-timer')
                                                        .css("font-size",'20px')
                                                        .text("00:00"))
                                            .append($("<button>")
                                                        .attr("id",'startstop_group')
                                                        .addClass("btn btn-light brend-bg btn-sm white-color")
                                                        .html('<i class="fas fa-pause"></i>'))
                                            .append($("<button>")
                                                        .addClass("btn btn-light brend-bg btn-sm white-color")
                                                        .attr("onclick",'cheweek_group.getModulList()')
                                                        .html('<i class="fas fa-redo"></i>'))
                                                        
                                             ))
                     .addClass("d-flex col-12 flex-wrap banner-group")
                     .append($("<div>")
                                  .addClass("row col-12")
                                  .css("height",'calc(100vh - 100px)')
                                  .css("overflow",'auto')
                                  .html(content))
                                 

       },
       genSinglePanel: function (name,id,count) {
           
       return   $("<div>").addClass(" col-4 p-2")
                 .append($("<div>")
                     .attr("id",id)
                     .addClass("d-flex  flex-wrap bg-shadow-3 modul-content-panel  bg-e4ecf7 h-100 rounded")
                     .append($("<div>")
                                 .addClass("header-group col-12 p-3   text-center")
                                 .append($('<h2 class="brend-color font-weight-bold">').append(name)))
                     .append($("<div>")
                                .addClass("group-body flex-wrap justify-content-center p-3 col-12 d-flex")
                                /* .append(content) */)
                    .append($("<div>").addClass("footer-group col-12")
                                      .append($("<div>")
                                                   .addClass('text-center d-inline float-left')
                                                   .append($("<span>")
                                                                .addClass("brend-color p-1")
                                                               .append('<i class="fas fa-clipboard-list"></i>'))
                                                    .append($("<span>")
                                                                .addClass("brend-color count-modul p-1")
                                                               .append(count)))
                                      .append($("<div>")
                                                  .addClass("text-center link-memzun-list-byetapId d-inline brend-color  p-1 float-right")
                                                   .append('<i class="far fa-window-maximize"></i>')))
                )
         

       },
       genSinglePanelItem: function (itName, count,id) {
           return  $("<div>")
           .addClass('col-6 p-0 etap-block-mini-for-modul')
           .attr("data-etap",id)
           .append(
              $("<div>")
              .addClass(" d-flex m-1  bg-shadow-3 p-0 rounded")
              .css("font-size",'20px')
              .append($("<div>")
                           .addClass("col-9 bg-dce3ed brend-color p-2  font-weight-bold rounded-left text-left")
                          .append(itName))
              .append($("<div>")
                           .addClass("col-3 brend-color text-center bg-fff font-weight-bold p-1 rounded-right")
                          .append(count))
           )
          
       },
       
}

var  seconds = 59,
    minutes = 4,
    hours = 0,
    timer;

function buildTimer() {
       var bl = $("#modul-list-timer")
  seconds--
  if (seconds <= 0) {
       if(minutes <= 0&&seconds <= 0){
              cheweek_group.getModulList();
              return
        }
    seconds = 60;
    minutes--;
    if (minutes <= 0) {
      minutes = 0;
     
    }
    
  }
  if(bl.length>0){
       $("#modul-list-timer").html((minutes < 10 ? "0" + minutes.toString(): minutes)+":"+(seconds < 10 ? "0" + seconds.toString(): seconds));

  }else{
       stopTimer();   
  }
 
}

function startTimer() {
  clearTimeout(timer);
  timer = setInterval(buildTimer, 1000);
  return false;
}
function stopTimer() {
  clearTimeout(timer);
  return false;
}
function resetTimer() {
       stopTimer();
       seconds = 59;
       minutes = 4;
       hours   = 0; 
}

$(document).on("click","#startstop_group", function () {
       var bt = $(this).html();
       if (bt=== '<i class="fas fa-play" aria-hidden="true"></i>') {
              $(this).html('<i class="fas fa-pause" aria-hidden="true"></i>');
              startTimer();
            } else {
                 $(this).html('<i class="fas fa-play" aria-hidden="true"></i>');
              stopTimer();
        } 
})
$(document).on("click",".link-memzun-list-byetapId", function () {
     var list = $(this).closest(".modul-content-panel").find('.etap-block-mini-for-modul')
     var codeList =[]
           
          list.each(function (e) {

              codeList.push($(this).attr("data-etap"));
              
          }) 
      
})
