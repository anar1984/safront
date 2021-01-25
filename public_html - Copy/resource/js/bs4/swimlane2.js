


var FromTo = {peer:[
]
};

var Idcontent = {content:[

]}


var is_line_dragged2 =false
let idgenvLane = 23734723742
//$( document ).ready(function() {







  $(document).on('dragover', ".Content",function(e){

    e.preventDefault();
    e.stopPropagation();
  });


 $(document).on("dragstart",".contentArrow",function(e){
     
     
     is_line_dragged2 = true;

    e.originalEvent.dataTransfer.setData("getCardZoneId", $(this).parent().attr("id"));
   
    e.stopPropagation();
 });

 
$(document).on('drop', ".Content",function(e){


   
   var data1 = e.originalEvent.dataTransfer.getData("getCardZoneId");
   is_line_dragged2 = false;
    var data2 = $(this).attr("id") ;
    //removeLine(data1,data2);
     var dataText = "text"
    new LeaderLine(document.getElementById(data1), document.getElementById(data2), {
       
      middleLabel: LeaderLine.pathLabel(dataText),
     size: 2,
     startPlug: 'square',
     color: 'black'
   
    }
    )



   
    var kv={};
    kv= [data1,data2,dataText];
    FromTo.peer.push(kv);
   

    e.stopPropagation();
   

});


//add lane btn 


function genUsLane(idgena){
  return $("<tr>")
          .attr("id","laneId"+idgena)
          .append($("<th>")
          
                  .addClass("LaneheaderColumn")
                  .append($("<div>")
                           .addClass("laneHeaderName")
                           .append($("<span>")
                                      .text("Lane"))
                           .append('<input type="text" class="form-control LaneheaderRenameInput" >'))
                 
                  .append($("<div>").addClass("EditSectionLane")
                            .append($("<div>")
                         
                                      .addClass(' btn btn-light dragLaneClass')
                                     .append('<i class="fas fa-arrows-alt"></i>'))
                           .append($("<div>")
                                     .addClass("dropdown addlineAfterPart ")
                                        .append('<button class="btn btn-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><i class="fas fa-ellipsis-v"></i></button>')
                                     .append($("<div>")
                                      .addClass("dropdown-menu ")
                                      .append('<a class="dropdown-item" id="AddLeftColmn" href="#"> <i class="fas fa-chevron-left arrowCustom"></i>Add Column</a>')
                                      .append('<a class="dropdown-item" id="LaneWidthAddBtn"  href="#"><i class="fas fa-chevron-right arrowCustom"></i>Add Column</a>')
                                      .append('<a class="dropdown-item" id="LaneWidthRemoveBtn" href="#"><i class="fas fa-times arrowCustom"></i>Remove Column</a>')
                                      .append('<a class="dropdown-item" id="LaneHideBtn" href="#"><i class="fas fa-minus arrowCustom"></i>Hide Line</a>')
                                      .append('<a class="dropdown-item" id="LaneRemoveBTn" href="#"><i class="fas fa-trash-alt arrowCustom"></i>Delete Lane</a>')
                                      
                                      )))
                            .append($("<div>")
                                        .addClass(" ShowLaneBtnSect")
                                        .append('<button class="ShowLaneBtn btn btn-light" ><i class="fas fa-plus"></i></button>')
                                        .append($("<div>")
                                                   .addClass("HideNameLine")
                                                   .append($("<span>")))));
    
}

 
$(document).on("click", "#LaneAddBtn" , function(){


   
  $(".Graphtable tbody").append(genUsLane(idgenvLane))
   var countsltd1= 30
  for (var i = 0; i < countsltd1; i++) {
  

    $("#laneId"+idgenvLane).append('<td><td>');
 


  }
  $("#laneId"+idgenvLane).find("td").append(genusAdderPopupopenedSl());
  idgenvLane++
  LaneRepair()
  $(".Graphtable tbody tr").arrangeable({
    dragSelector: ".dragLaneClass",
 
    })
  items = document.querySelectorAll('.Graphtable td');
  
})
  
/// rename lane

$(document).on("dblclick",".laneHeaderName",function(){

  var alreadyname =$(this).find("span").text();

  $(this).find(".LaneheaderRenameInput").css("visibility","visible");
  $(this).find(".LaneheaderRenameInput").val(alreadyname);
  $(this).find(".LaneheaderRenameInput").focus()

})

$(document).on("focusout",".LaneheaderRenameInput",function(){
   var thisVal= $(this).val();
  
   if(thisVal.trim().length > 0){
       
     $(this).parent().find('span').text(thisVal);

     $(this).css("visibility","hidden")

   }
  
})


// lane show hide 
$(document).on("click","#LaneHideBtn",function(){
   var nameLane = $(this).parents("th").find(".laneHeaderName span").text()
  $(this).parents("tr").css("width","40px");
  $(this).parents("tr").css("overflow","hidden");
  $(this).parents("tr").css("pointer-events","none");
  $(this).parents("th").find(".ShowLaneBtnSect").css("display","block")
  $(this).parents("th").find(".laneHeaderName").css("display","none")
  $(this).parents("th").find(".HideNameLine span").text(nameLane)
  
})


$(document).on("click",".ShowLaneBtn",function(){
  
  $(this).parents("tr").removeAttr("style")
  $(this).parents(".ShowLaneBtnSect").css("display","none")
  $(this).parents("th").find(".laneHeaderName").css("display","block")
  
})





//resize lane btn 
$(document).on("click","#LaneWidthAddBtn",function(){

  
  var widthLane= $(this).parents("tr").width();
  
  var Addwidth = widthLane + 202;

  $(this).parents("tr").css("width",Addwidth+"px");

  var countsltd2 = 30;
  for (var i = 0; i < countsltd2; i++) {
  

    $(this).parents("tr").append('<td></td>');
 


  }
  
      
  
  
    $(this).parents("tr").find("td:gt(-31)").append(genusAdderPopupopenedSl());
  

  LaneRepair();
  items = document.querySelectorAll('.Graphtable td');
})



$(document).on("click","#LaneWidthRemoveBtn",function(){

  var widthLane= $(this).parents("tr").width();
  var rmwidth = widthLane - 202;
  if(widthLane>204){
    $(this).parents("tr").css("width",rmwidth+"px");
    $(this).parents("tr").find("td:gt(-31)").remove();
  }
  LaneRepair()
 // $("tr:gt(3)")
})

$(document).on("click","#LaneRemoveBTn" ,function(){

  if(confirm("Are You Sure Delete Lane?!!!!")){
    $(this).parents("tr").remove()
  }

})


//generate figure jquery
 

function genUsStickMAn(idgen,bgclr){

 return $("<div>")
          .addClass("stickManFigure Content")
          .attr("draggable","true")
          .attr("data-colorcst","4")
          .attr("id", idgen)
          .append($("<div>")
                    .addClass("contentArrow")
                    .attr("id", "dragArrow")
                     .attr("draggable","true")
                    .append('<i class="fas fa-arrow-right"></i>'))
          .append($("<div>").addClass("remvFigbody headFG")
                   .attr("style","border: 5px solid"+bgclr+" ;"))
          .append($("<div>").addClass("remvFigbody torsoFG")
                   .attr("style","border: 3px solid"+bgclr+" ;"))
          .append($("<div>").addClass("remvFigbody leftarmFG")
                   .attr("style","border: 3px solid"+bgclr+" ;"))
          .append($("<div>").addClass("remvFigbody rightarmFG")
                   .attr("style","border: 3px solid"+bgclr+" ;"))
          .append($("<div>").addClass("remvFigbody leftlegFG")
                   .attr("style","border: 3px solid"+bgclr+" ;"))
          .append($("<div>").addClass("remvFigbody leftfootFG")
                   .attr("style","border: 3px solid"+bgclr+" ;"))
          .append($("<div>").addClass("remvFigbody rightlegFG")
                   .attr("style","border: 3px solid"+bgclr+" ;"))
          .append($("<div>").addClass("remvFigbody rightfootFG")
                   .attr("style","border: 3px solid"+bgclr+" ;"))
          .append($("<div>").addClass("ContentBody StickMnbody"))
          
}

function genUsSquare(idgen,bgclr){

 return $("<div>")
          .addClass("Content col-11 square")
          .attr("draggable","true")
          .attr("data-colorcst","1")
          .attr("id", idgen)
          .attr("style","background-color:"+bgclr+" ;")
          .append($("<div>")
                    .addClass("contentArrow")
                    .attr("id", "dragArrow")
                     .attr("draggable","true")
                    .append('<i class="fas fa-arrow-right"></i>'))
          .append($("<div>")
                   .addClass("ContentBody")
                  
                    )
          
}
function genUsRectangle(idgen,bgclr){

 return $("<div>")
          .addClass("Content USrectangle")
          .attr("draggable","true")
          .attr("data-colorcst","5")
          .attr("data-text","TextVal")
          .attr("id", idgen)
          .attr("style","background-color:"+bgclr+" ;")
          .append($("<div>")
                    .addClass("contentArrow")
                    .attr("id", "dragArrow")
                     .attr("draggable","true")
                    .append('<i class="fas fa-arrow-right"></i>'))
          .append($("<div>")
                   .addClass("UserRectBody")
                   .attr("data-hastxt","1"))
          .append($("<div>")
                   .addClass("StatFigure")
                   .html("User  <br> Story"))
          
}
function genUsTriangle(idgen,bgclr){

 return $("<div>")
          .addClass("Content triangle")
          .attr("draggable","true")
          .attr("data-colorcst","2")
          .attr("id", idgen)
          .attr("style","border-color:transparent transparent "+bgclr+" transparent;")
          .append($("<div>")
                    .addClass("contentArrow trinagleArrow")
                    .attr("id", "dragArrow")
                     .attr("draggable","true")
                    .append('<i class="fas fa-arrow-right"></i>'))
          .append($("<div>")
                   .addClass("ContentBody TriangleBody")
                  
                    )
          
}
function genUsHexagon(idgen,bgclr){

 return $("<div>")
          .addClass("Content hexagon")
          .attr("draggable","true")
          .attr("data-colorcst","2")
          .attr("id", idgen)
          .attr("style","background-color:"+bgclr+" ;")
          .append($("<div>")
                    .addClass("contentArrow")
                    .attr("id", "dragArrow")
                     .attr("draggable","true")
                    .append('<i class="fas fa-arrow-right"></i>'))
          .append($("<div>")
                   .addClass("ContentBody")
                  
                    )
          
}
function genUsRhomb(idgen,bgclr){

 return $("<div>")
          .addClass("Content rhomb")
          .attr("draggable","true")
          .attr("data-colorcst","1")
          .attr("id", idgen)
          .attr("style","background-color:"+bgclr+" ;")
          .append($("<div>")
                    .addClass("contentArrow rhombArrow ")
                    .attr("id", "dragArrow")
                     .attr("draggable","true")
                    .append('<i class="fas fa-arrow-right"></i>'))
          .append($("<div>")
                   .addClass("ContentBody rhombBody")
                  
                    )
          
}
function genUsEllipse(idgen,bgclr){

 return $("<div>")
          .addClass("Content ellipse")
          .attr("draggable","true")
          .attr("data-colorcst","1")
          .attr("id", idgen)
          .attr("style","background-color:"+bgclr+" ;")
          .append($("<div>")
                    .addClass("contentArrow  ")
                    .attr("id", "dragArrow")
                     .attr("draggable","true")
                    .append('<i class="fas fa-arrow-right"></i>'))
          .append($("<div>")
                   .addClass("ContentBody ")
                  
                    )
          
}

function genUsCircle(idgen,bgclr){
  return $("<div>")
  .attr("draggable","true")
  .addClass("Content  col-11 circle")
  .attr("data-colorcst","1")
  .attr("id", idgen)
  .attr("style","background-color:"+bgclr+" ;")
  .append($("<div>")
            .addClass("contentArrow")
            .attr("id", "dragArrow")
            .attr("draggable","true")
            .append('<i class="fas fa-arrow-right"></i>'))
  .append($("<div>")
           .addClass("ContentBody")
        
            )
          
}
function genUsDocumentFg(idgen,bgclr){
  return $("<div>")
  .attr("draggable","true")
  .addClass("Content DocumentFg")
  .attr("data-colorcst","1")
  .attr("id", idgen)
  .attr("style","background-color:"+bgclr+" ;")
  .append($("<div>")
            .addClass("contentArrow")
            .attr("id", "dragArrow")
            .attr("draggable","true")
            .append('<i class="fas fa-arrow-right"></i>'))
  .append($("<div>")
           .addClass("ContentBody")
        
            )
          
}


function genUsDiamond(idgen,bgclr){
  return $("<div>")
              .addClass("Content diamond")
              .attr("draggable","true")
              .attr("data-colorcst","1")
              .attr("id", idgen)
              .attr("style","background-color:"+bgclr+" ;")
          .append($("<div>")
            .addClass("contentArrow arrowdiamond")
            .attr("id", "dragArrow")
            .attr("draggable","true")
            .append('<i class="fas fa-arrow-right"></i>'))
          .append($("<div>")
                   .addClass("ContentBody DiamondBody")
                   )
          
}
function genUSCardfg(idgen,bgclr){
  return $("<div>")
              .addClass("Content cardfg")
              .attr("draggable","true")
              .attr("data-colorcst","1")
              .attr("id", idgen)
         
              .attr("style","background-color:"+bgclr+" ;")
          .append($("<div>")
            .addClass("contentArrow ")
            .attr("id", "dragArrow")
            .attr("draggable","true")
            .append('<i class="fas fa-arrow-right"></i>'))
          .append($("<div>")
                   .addClass("ContentBody ")
                   )
          
}


//tdAdder swimlane 
function genusAdderPopUpTdSl(){

  return $("<div>")
           .addClass("tdAdderSwimlane")
           .append('<p class="selectColorWord">Select Figure</p>')
           .append($("<div>")
                     .addClass("figureSelectOption")
                     .append(`<span data-figurnum="10" class="figureFromspansw"><i class="fal fa-male"></i></span>`)
                     .append('<span data-figurnum="12" class="figureFromspansw "><i class="fal fa-circle"></i></span>')
                     .append('<span data-figurnum="14" class="figureFromspansw selectedfigureswfg"><i class="fal fa-square"></i></span>')
                     .append('<span data-figurnum="16" class="figureFromspansw"><div class="diamondFigureForm"></div></span>')
                     .append('<span data-figurnum="18" class="figureFromspansw"><i class="fal fa-hexagon"></i></span>')
                     .append('<span data-figurnum="20" class="figureFromspansw"><i class="fal fa-triangle"></i></span>')
                     .append('<span data-figurnum="22" class="figureFromspansw"><i class="fal fa-file"></i></span>')
                     .append('<span data-figurnum="24" class="figureFromspansw"><i class="fal fa-diamond"></i></span>')
                     .append('<span data-figurnum="26" class="figureFromspansw"><div class="EllipseFigureForm"></div></span>')
                     .append(`<span data-figurnum="28" class="figureFromspansw"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                           <path d="M35.75,41.75c0.097,0,0.194-0.014,0.29-0.043c0.422-0.128,0.71-0.517,0.71-0.957v-30c0-0.553-0.447-1-1-1h-20
                           c-0.553,0-1,0.447-1,1v30c0,0.44,0.288,0.829,0.71,0.957c0.421,0.129,0.878-0.036,1.122-0.402l9.168-13.752l9.168,13.752
                           C35.106,41.588,35.422,41.75,35.75,41.75z M34.75,37.447l-8.168-12.252c-0.186-0.278-0.498-0.445-0.832-0.445
                           s-0.646,0.167-0.832,0.445L16.75,37.447V11.75h18V37.447z"/>
                           </svg></span>`)
                     .append(`<span data-figurnum="30" class="figureFromspansw usicon"><i class="fal fa-rectangle-landscape"></i> <span class="customSpanUst">User <br> Story</span></span>`)
                     )
          .append('<p class="selectColorWord">Select Color Figure</p>')
          .append($("<div>")
                    .addClass("figureBgSelectOption")
                    .append('<span data-bgcolorspan="#e3b6aac4" style="background-color: #e3b6aa;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#bad9f9c4" style="background-color: #bad9f9;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#c1e57cc4" style="background-color: #c1e57c;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#fdf67cc4" style="background-color: #fdf67c;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#fa8065c4" style="background-color: #fa8065;" class="ColopickerSpan selectedColorPickerswfg"></span>')
                    .append('<span data-bgcolorspan="#b0b0b0c4" style="background-color: #b0b0b0;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#ff3300c4" style="background-color: #ff3300;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#3399ffc4" style="background-color: #3399ff;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#bda8b6c4" style="background-color: #bda8b6;" class="ColopickerSpan"></span>')
                                   )
            .append($("<div>")
                       .addClass("tableAdderAccept")
                       .append('<div class="figureAddbtn" id="tdAdderslAccept"><i class="fas fa-check"></i></div>')
                       .append('<div class="figureAddbtn" id="CancelSlpopup" ><i class="fas fa-times"></i></div>')
                       )




}
function genusAdderPopupopenedSl(){

     return $("<div>")
              .addClass("tdAdderSwimlaneOpened")
              .append($("<div>")
                        .addClass("tdAdderSlopDiv")
                        .append($("<button>")
                                 .addClass("btn tdAdderSwimlaneOpenedbtn")
                                 .append('<i class="fas fa-plus-circle"></i>')));
}

$(document).on("click",".tdAdderSwimlaneOpenedbtn",function(){

   $(this).parents("td").append(genusAdderPopUpTdSl());
   $(this).parents(".tdAdderSwimlaneOpened").remove();


})

$(document).on("click","#CancelSlpopup",function(){

   $(this).parents("td").append(genusAdderPopupopenedSl());
   $(this).parents(".tdAdderSwimlane").remove();


})

$(document).on("click",".ColopickerSpan",function(){

   $(this).parent().find(".selectedColorPickerswfg").removeClass("selectedColorPickerswfg");
   $(this).addClass("selectedColorPickerswfg")

})


$(document).on("click",".figureFromspansw",function(){

   $(this).parent().find(".selectedfigureswfg").removeClass("selectedfigureswfg");
   $(this).addClass("selectedfigureswfg")

})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<----Figre Adderr  ---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var countFigure = 123454353;

$(document).on("click","#tdAdderslAccept",function(){

      var figureAdder = $(this).parents("td").find(".selectedfigureswfg").attr("data-figurnum");
      
      var fogureColorbg = $(this).parents("td").find(".selectedColorPickerswfg").attr("data-bgcolorspan");
     
      if(figureAdder==10){
        $(this).parents("td").append(genUsStickMAn(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==12){
        $(this).parents("td").append(genUsCircle(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==14){
        $(this).parents("td").append(genUsSquare(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==16){
        $(this).parents("td").append(genUsDiamond(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==18){
        $(this).parents("td").append(genUsHexagon(countFigure,fogureColorbg));
        $(this).parents("td").find('.hexagon').attr("data-hexcol",fogureColorbg);
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==20){
        $(this).parents("td").append(genUsTriangle(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
       if(figureAdder==22){
        $(this).parents("td").append(genUSCardfg(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      } 
      if(figureAdder==24){
        $(this).parents("td").append(genUsRhomb(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==26){
        $(this).parents("td").append(genUsEllipse(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==28){
        $(this).parents("td").append(genUsDocumentFg(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==30){
        $(this).parents("td").append(genUsRectangle(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        
        var dataHtml = $('[data-text="TextVal"]').clone();
    
        $(".ContentCopyDiv").html(dataHtml);
    
        $(".CardSwimAdd").css("display","Block");
        $(".ChangeFigur").css("display","none");
        $(".Forgeneralfigure").css("display","none");
        $(".ForUSerStFigure").css("display","block");
        countFigure++ ;
      }
     
    
      LaneRepair()
    


})


$(document).on("dblclick",".figureFromspansw",function(){

      var figureAdder = $(this).attr("data-figurnum");
      
      var fogureColorbg = $(this).parents("td").find(".selectedColorPickerswfg").attr("data-bgcolorspan");
     
      if(figureAdder==10){
        $(this).parents("td").append(genUsStickMAn(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==12){
        $(this).parents("td").append(genUsCircle(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==14){
        $(this).parents("td").append(genUsSquare(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==16){
        $(this).parents("td").append(genUsDiamond(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==18){
        $(this).parents("td").append(genUsHexagon(countFigure,fogureColorbg));
        $(this).parents("td").find('.hexagon').attr("data-hexcol",fogureColorbg);
        $(this).parents("td").append(genTableEditbtn());
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==20){
        $(this).parents("td").append(genUsTriangle(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
       if(figureAdder==22){
        $(this).parents("td").append(genUSCardfg(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      } 
      if(figureAdder==24){
        $(this).parents("td").append(genUsRhomb(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==26){
        $(this).parents("td").append(genUsEllipse(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==28){
        $(this).parents("td").append(genUsDocumentFg(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        countFigure++ ;
      }
      if(figureAdder==30){
        $(this).parents("td").append(genUsRectangle(countFigure,fogureColorbg));
        $(this).parents("td").append(genTableEditbtn());
       
        $(this).parents(".tdAdderSwimlane").remove();
        
        var dataHtml = $('[data-text="TextVal"]').clone();
    
        $(".ContentCopyDiv").html(dataHtml);
    
        $(".CardSwimAdd").css("display","Block");
        $(".ChangeFigur").css("display","none");
        $(".Forgeneralfigure").css("display","none");
        $(".ForUSerStFigure").css("display","block");
        countFigure++ ;
      }
     
    
      LaneRepair()
    


})




//generate  table tdd 

function generateTDSl(){

  var genTdCount = 4;
  
 for (var i = 0; i < genTdCount; i++) {
  

    $(".Graphtable tbody").append(genUsLane(idgenvLane));
    idgenvLane++
  }
  var countsltd= 30;
  for (var x = 0; x < countsltd; x++) {
  

    $(".Graphtable tbody tr").append('<td></td>');
 


  };
   

  $(".Graphtable tbody tr td").append(genusAdderPopupopenedSl());

}
generateTDSl()

function genTableEditbtn(){
  return $("<div>")
           .addClass("btn-group contentDropEDit")
           .append('<button type="button" class="btn  " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></button>')
           .append($("<div>")
                      .addClass("dropdown-menu")
                      .append('<a class="dropdown-item" id="AddTopColmn" href="#"><i class="fas fa-chevron-up arrowCustom"></i>Add Column</a>')
                      .append('<a class="dropdown-item"  id="AddBottomColmn" href="#"><i class="fas fa-chevron-down arrowCustom"></i>Add Column</a>')
                      .append('<a class="dropdown-item"  id="AddRightColmn" href="#"><i class="fas fa-chevron-right arrowCustom"></i>Add Column</a>')
                      .append('<a class="dropdown-item"  id="AddLeftColmn" href="#"><i class="fas fa-chevron-left arrowCustom"></i>Add Column</a>')
                      .append('<a class="dropdown-item" id="FigureIndexUp" href="#"><i class="fas fa-level-up-alt arrowCustom"></i>Backward</a>')
                      .append('<a class="dropdown-item" id="FigureIndexDown" href="#"><i class="fas fa-level-down-alt arrowCustom"></i>Forward</a>')
                      .append('<a class="dropdown-item" id="FigureRemoveBTn" href="#"><i class="fas fa-trash-alt arrowCustom"></i>Delete Figure</a>')
                      )
}



//open edit popup and edit figure ---->>>>>>


function genusReadyTdSl(){

  return  $("<td>")
          .append($("<div>")
                    .addClass("tdAdderSwimlaneOpened")
                    .append($("<div>")
                              .addClass("tdAdderSlopDiv")
                              .append($("<button>")
                                        .addClass("btn tdAdderSwimlaneOpenedbtn")
                                        .append('<i class="fas fa-plus-circle"></i>'))))
}

$(document).on("click", "#AddBottomColmn" , function(){

  
    $(this).parents("td").after(genusReadyTdSl());
    $(this).parents("tr ").find("td:last-child").remove();
     
  
     LaneRepair()
})

$(document).on("click", "#AddTopColmn" , function(){

  
  $(this).parents("td").before(genusReadyTdSl());
  $(this).parents("tr ").find("td:last-child").remove();
  
  LaneRepair()
})




$(document).on("click", "#FigureIndexUp" , function(){

  
    $(this).parents("td").find(".Content").css("z-index","500");
   
    
     console.log("Dfsdf");
  
      
})

$(document).on("click", "#FigureIndexDown" , function(){

  
    $(this).parents("td").find(".Content").css("z-index","1");
   
    
     console.log("Dfsdf");
  
      
})

$(document).on("click", "#FigureRemoveBTn" , function(){

  if(confirm("Are you Sure Delete Figure?!!")){
    $(this).parents("td").find(".Content").remove();
    $(this).parents("td").append(genusAdderPopupopenedSl());
    $(this).parents(".contentDropEDit").remove();
    
     
  };
  LaneRepair();
      
})

$(document).on("click", ".ExitCardswim" , function(){

    var hastxt = $(document).find('[data-text="TextVal"]').find(".UserRectBody").attr("data-hastxt");
    
  
    if(hastxt==1){
      console.log(hastxt);
      $(document).find('[data-text="TextVal"]').parent().append(genusAdderPopupopenedSl());
      $(document).find('[data-text="TextVal"]').parent().find(".contentDropEDit").remove();
      $(document).find('[data-text="TextVal"]').remove();
    }
    $(".CardSwimAdd").css("display","none")
    $(".Content").removeAttr("data-text")
})

$(document).on("click", ".SwimBackG" , function(){

  var hastxt = $(document).find('[data-text="TextVal"]').find(".UserRectBody").attr("data-hastxt");
    
  
  if(hastxt==1){
    console.log(hastxt);
    $(document).find('[data-text="TextVal"]').parent().append(genusAdderPopupopenedSl());
    $(document).find('[data-text="TextVal"]').parent().find(".contentDropEDit").remove();
    $(document).find('[data-text="TextVal"]').remove();
  }

    $(".CardSwimAdd").css("display","none")
    $(".Content").removeAttr("data-text")
})

$(document).on("change", "#select-text" , function(){


  let textVal=$("#select-text").val();
  var idFigure=$(document).find('[data-text="TextVal"]').attr("id");
 

  $(document).find('[data-text="TextVal"]').find(".ContentBody").find("span").remove();
    
    $(document).find('[data-text="TextVal"]').find(".ContentBody").append('<span>'+textVal+'</span>');
    var txtsave ={};
    txtsave=[idFigure,textVal];
    Idcontent.content.push(txtsave);
    LaneRepair()
})


$(document).on("change", "#select-textUS" , function(){

  let textVal=$("#select-textUS").val();


  $(document).find('[data-text="TextVal"]').find(".UserRectBody").find("span").remove();
    
    $(document).find('[data-text="TextVal"]').find(".UserRectBody").append('<span>'+textVal+'</span>');
    $(document).find('[data-text="TextVal"]').find(".UserRectBody").attr("data-hastxt","2")
    LaneRepair()
})

function fgStickMan(color){
  return `<div class="remvFigbody headFG" style="border: 5px solid ${color} ;" ></div>
          <div class="remvFigbody torsoFG " style="border: 3px solid ${color} ;" ></div>
          <div class="remvFigbody leftlegFG" style="border: 3px solid ${color} ;" ></div>
          <div class="remvFigbody rightlegFG" style="border: 3px solid ${color} ;" ></div>
          <div class="remvFigbody leftarmFG" style="border: 3px solid ${color} ;" ></div>
          <div class="remvFigbody rightarmFG " style="border: 3px solid ${color} ;" ></div>
          <div class="remvFigbody leftfootFG" style="border: 3px solid ${color} ;" ></div>
          <div class="remvFigbody rightfootFG" style="border: 3px solid ${color} ;" ></div>
  `
}
let color ; 

function getBgColorHex(){

  var hex;
  if(color.indexOf('#')>-1){
      //for IE
      hex = color;
  } else {
      var rgb = color.match(/\d+/g);
      hex = '#'+ ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2);
  }
  return hex;
}
$(document).on("click",".figureFromspansChange",function(){
  
  var fbg = $(this).attr("data-figurnum");
   var dot= $('[data-text="TextVal"]');
   
    var col = getBgColorHex()
  //  console.log(col);

  if(fbg==10){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.addClass("Content stickManFigure");
    dot.attr("data-colorcst","4");
   dot.removeAttr("style");
   dot.find(".ContentBody").attr("class","ContentBody StickMnbody");
   dot.find(".contentArrow").attr("class","contentArrow");
    dot.find(".remvFigbody").remove();
    dot.append(fgStickMan(color));
  }
  if(fbg==12){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.addClass("Content circle");
    dot.attr("data-colorcst","1");
    dot.attr('style',"background-color:"+color+";");
    dot.find(".ContentBody").attr("class","ContentBody");
    dot.find(".contentArrow").attr("class","contentArrow");
    dot.find(".remvFigbody").remove();
  }
  if(fbg==14){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.addClass("Content square");
    dot.attr("data-colorcst","1");
    dot.attr('style',"background-color:"+color+";");
    dot.find(".ContentBody").attr("class","ContentBody");
    dot.find(".contentArrow").attr("class","contentArrow");
    dot.find(".remvFigbody").remove();

  }
  if(fbg==16){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.addClass("Content diamond");
    dot.attr("data-colorcst","1");
    dot.attr('style',"background-color:"+color+";");
    dot.find(".ContentBody").attr("class","ContentBody DiamondBody");
    dot.find(".contentArrow").attr("class","contentArrow arrowdiamond");
    dot.find(".remvFigbody").remove();
  }
  if(fbg==18){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.attr("data-hexcol",col+"c4");
    dot.addClass("Content hexagon");
    dot.attr("data-colorcst","2");
    dot.attr('style',"background-color:"+color+";");
    dot.find(".ContentBody").attr("class","ContentBody ");
    dot.find(".contentArrow").attr("class","contentArrow ");
    dot.find(".remvFigbody").remove();
  }
  if(fbg==20){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.addClass("Content triangle");
    dot.attr("style","border-color:transparent transparent "+color+" transparent;");
    dot.attr("data-colorcst","2");
    dot.find(".ContentBody").attr("class","ContentBody TriangleBody");
    dot.find(".contentArrow").attr("class","contentArrow trinagleArrow");
    dot.find(".remvFigbody").remove();
  }
  if(fbg==22){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.addClass("Content cardfg");
    dot.attr("data-colorcst","1");
    dot.attr('style',"background-color:"+color+";");
    dot.find(".ContentBody").attr("class","ContentBody");
    dot.find(".contentArrow").attr("class","contentArrow");
    dot.find(".remvFigbody").remove();
  } 
  if(fbg==24){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.addClass("Content rhomb");
    dot.attr("data-colorcst","1");
    dot.attr('style',"background-color:"+color+";");
    dot.find(".ContentBody").attr("class","ContentBody rhombBody");
    dot.find(".contentArrow").attr("class","contentArrow rhombArrow");
    dot.find(".remvFigbody").remove();
  }
  if(fbg==26){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.addClass("Content ellipse");
    dot.attr("data-colorcst","1");
    dot.attr('style',"background-color:"+color+";");
    dot.find(".ContentBody").attr("class","ContentBody");
    dot.find(".contentArrow").attr("class","contentArrow");
    dot.find(".remvFigbody").remove();
  }
  if(fbg==28){
    dot.removeClass();
    dot.removeAttr("data-hexcol");
    dot.addClass("Content DocumentFg");
    dot.attr("data-colorcst","1");
    dot.attr('style',"background-color:"+color+";");
    dot.find(".ContentBody").attr("class","ContentBody");
    dot.find(".contentArrow").attr("class","contentArrow");
    dot.find(".remvFigbody").remove();
  }

})

$(document).on("click",".Colorchangespan",function(){
 
  var fbg = $(this).attr("data-bgcolorspan");
  var CstmFig = $('[data-text="TextVal"]').attr("data-colorcst"); 
  color = fbg;
  
  if(CstmFig==1){
    $('[data-text="TextVal"]').removeAttr("style");
    $('[data-text="TextVal"]').attr("style","background-color:"+fbg+";");
  }
  if(CstmFig==2){
    $('[data-text="TextVal"]').removeAttr("style");
    $('[data-text="TextVal"]').attr("data-hexcol",fbg);
    $('[data-text="TextVal"]').attr("style","background-color:"+fbg+";");
  }
  if(CstmFig==4){
    $('[data-text="TextVal"]').removeAttr("style");
    $('[data-text="TextVal"]').find(".headFG").attr("style","border: 5px solid "+fbg+";");
    $('[data-text="TextVal"]').find(".torsoFG,.leftlegFG,.rightlegFG,.leftarmFG,.rightarmFG,.leftfootFG,.rightfootFG").attr("style","border: 3px solid "+fbg+";");
  }
  if(CstmFig==5){
    $('[data-text="TextVal"]').removeAttr("style");
    $('[data-text="TextVal"]').attr("style","background-color:"+fbg+";");
  }




})

$(document).on("change","#selecttextfontSize",function () {
   
  var fbg = $(this).val();
     
  $('[data-text="TextVal"]').find(".ContentBody").removeAttr("style");
  $('[data-text="TextVal"]').find(".ContentBody").attr("style","font-size:"+fbg+"px;")
  $('[data-text="TextVal"]').find(".UserRectBody").removeAttr("style");
  $('[data-text="TextVal"]').find(".UserRectBody").attr("style","font-size:"+fbg+"px;")
   
})


$(document).on("click", "#CancelFigureInsideText" , function(){


    $(".CardSwimAdd").css("display","none")
    $(".Content").removeAttr("data-text")
})

$(document).on("dblclick", ".Content" , function(){
  $(this).attr("data-text","TextVal")
  var CstmFig = $('[data-text="TextVal"]').attr("data-colorcst");

  if(CstmFig==1||CstmFig==2||CstmFig==3||CstmFig==4){
    $(".CardSwimAdd").css("display","Block");
     color = $('[data-text="TextVal"]').css("backgroundColor");
    // console.log(color);
     var text = $('[data-text="TextVal"]').find(".ContentBody span").text();
     $("#select-text").val(text)
     var dataHtml = $('[data-text="TextVal"]').clone();

     $(".ContentCopyDiv").html(dataHtml)
    
     $(".ChangeFigur").css("display","block");
    $(".Forgeneralfigure").css("display","block");
    $(".ForUSerStFigure").css("display","none");

  }
  if(CstmFig==5){
    
     
    $("#select-text").val(text);
    var dataHtml = $('[data-text="TextVal"]').clone();

    $(".ContentCopyDiv").html(dataHtml);

    $(".CardSwimAdd").css("display","Block");
    $(".ChangeFigur").css("display","none");
    $(".Forgeneralfigure").css("display","none");
    $(".ForUSerStFigure").css("display","block");

  }
     
})


$(document).on("change", "#FigureWitdh" , function(){
    
     var width = $(this).val()
 
  $('[data-text="TextVal"]').css("width", width +"%");

   console.log(width);
})
$(document).on("change", "#FigureHeight" , function(){
    
     var height = $(this).val();
 
  $('[data-text="TextVal"]').css("height", height +"%");

   console.log(height);
})



 
function LaneRepair(){
  $(".leader-line").remove()
  var list = FromTo.peer;
  for (var i=0;i<list.length;i++){
    var id = list[i];
    var k =   Object.keys(id);

    
     
      new LeaderLine(document.getElementById(id[0]), document.getElementById(id[1]), {
      color: 'black', 
      middleLabel: LeaderLine.pathLabel(id[2]),
      size: 2,
      startPlug: 'square',
    })

    
        
    
  }
   
}


 






$(document).on("mouseover","textPath",function(e) {
  e.stopPropagation();
  $("#dataText").removeAttr("id");
  $(this).attr("id","dataText");

  var Cordn = $("#dataText").position();
  $(".addtextLine").css("display","block");
  $(".addtextLine").css("top",Cordn.top+"px");
  $(".addtextLine").css("left",Cordn.left+"px");
  $(".addtextLine").css('transform', 'translate(-50%, -50%)');
 
 
 
  var textLine= $("#dataText").text();
  $("#addTextInput").val(textLine);

 
});

//remove line 
$(document).on("click","#lineRemovebtn",function(e){

if(confirm("Are You sure Line Remove ?!!")){

  $("#dataText").parents("svg").remove();
  $(this).parent().css("display","none");
}

})




//Text Add 

$(document).on("click","#lineEditPopupOpened", function(e){
  $("#addTextInput").focus();
 

});


//text edit none
$(document).on("mouseleave",".addtextLine",function(){


  var Textval = $("#addTextInput").val();

  if(Textval.trim().length >0){
    $("#dataText").text(Textval);
  }
  
 

  $(".addtextLine").css("display","none");

 
  
});
$(document).on("click",".ChangeLineColor", function(e){

  e.preventDefault();
  e.stopPropagation();
 })

 $(document).on("click",".ColorchangeLinespan", function(e){

   var colorline = $(this).attr("data-bgcolorspan")
   
     $("#dataText").parents("text").css("fill",colorline)
     $("#dataText").parents("svg").find("use").css("stroke", colorline)
     $("#dataText").parents("svg").find("use").css("fill", colorline)

 })



/* po> */




var dragSrcEl = null;

  function handleDragStart(e) {



    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
  
    if (is_line_dragged2 === true) {
      return;
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');

    }
   LaneRepair()
    return false;
  }

  function handleDragEnd(e) {

    if (is_line_dragged2 === true) {
      return;
    }
    

    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }


 

  let items = document.querySelectorAll('.Graphtable td');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
  




  $(".Graphtable tbody tr").arrangeable({

    dragSelector: ".dragLaneClass",
      
    
         
  })

  

//});




