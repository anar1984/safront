  var typLine='line-svg-1'
  var lineColor = '#6d6d6d'

 function genLeadeLine(start,end,type,clor,text){
   
  

  if(type ==="line-svg-3"){

    new LeaderLine(document.getElementById(start), document.getElementById(end), {
       
      middleLabel: LeaderLine.pathLabel(text),
     size: 2,
     startPlug: 'arrow',
     color: clor,
     dash: {animation: true}
   
    }
    )
  }
  if(type ==="line-svg-2"){
    new LeaderLine(document.getElementById(start), document.getElementById(end), {
       
      middleLabel: LeaderLine.pathLabel(text),
      outlineColor: clor,
      color: "tansparent",
      outline: true,
      endPlugOutline: true,
      endPlugSize: 1.5
   
    }
    )
  }
  if(type ==="line-svg-1"){
    new LeaderLine(document.getElementById(start), document.getElementById(end), {
       
      middleLabel: LeaderLine.pathLabel(text),
     size: 2,
     startPlug: 'square',
     color: clor 
   
    }
    )
  }
  if(type ==="line-svg-4"){
    new LeaderLine(document.getElementById(start), document.getElementById(end), {
       
      middleLabel: LeaderLine.pathLabel(text),
     size: 2,
     startPlug: 'arrow1',
     color: clor 
   
    }
    )
  }

   
 }


var FromTo = {peer:[
]
};

var Idcontent = {content:[

]}


var is_line_dragged2 =false
var idgenvLane = 23734723742;
$( document ).ready(function() {





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
    
    genLeadeLine(data1,data2,typLine,lineColor,dataText)
    
   
    var kv={};
    kv= [data1,data2,typLine,lineColor];
    FromTo.peer.push(kv);
   

    e.stopPropagation();
    LaneRepair();

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
           .addClass("resizeFigure")
          .append($("<div>")
                    .addClass("stickManFigure Content")
                    .attr("draggable","true")
                    .attr("data-colorcst","4")
                    .attr("id", idgen)
                    .attr("style","background-color:"+bgclr+" ;")
                    .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg3.png" alt="">')

                    .append($("<div>")
                    .addClass("contentArrow")
                    .attr("id", "dragArrow")
                    .attr("draggable","true")
                    .append('<i class="fas fa-arrow-right"></i>'))
                    .append($("<div>").addClass("ContentBody StickMnbody")))
          
}

function genUsSquare(idgen,bgclr){

 return $("<div>")
          .addClass("resizeFigure")
          .append($("<div>")
                    .addClass("Content  square")
                    .attr("draggable","true")
                    .attr("data-colorcst","1")
                    .attr("id", idgen)
                    .attr("style","background-color:"+bgclr+" ;")
                    .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg10.png" alt="">')
                    .append($("<div>")
                              .addClass("contentArrow")
                              .attr("id", "dragArrow")
                               .attr("draggable","true")
                              .append('<i class="fas fa-arrow-right"></i>'))
                    .append($("<div>")
                             .addClass("ContentBody")
                            
                              ))
          
}
function genUsRectangle(idgen,bgclr){

 return  $("<div>")
            .addClass("resizeFigure")
            .append($("<div>")
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
                              .addClass("StatFigure data-show-activity-storycard")
                              .html("User  <br> Story"))          
                     .append($("<div>")
                              .addClass("StatFigure1 data-show-activity-ipo")
                              .html("show  <br> proto")))           
          
}
function genUsTriangle(idgen,bgclr){

 return  $("<div>")
            .addClass("resizeFigure")
            .append($("<div>")           
                     .addClass("Content triangle")
                     .attr("draggable","true")
                     .attr("data-colorcst","2")
                     .attr("id", idgen)
                     .attr("style","background-color:"+bgclr+" ;")
                    .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg2.png" alt="">')

                     .append($("<div>")
                               .addClass("contentArrow trinagleArrow")
                               .attr("id", "dragArrow")
                                .attr("draggable","true")
                               .append('<i class="fas fa-arrow-right"></i>'))
                     .append($("<div>")
                              .addClass("ContentBody TriangleBody")
                             
                               ))
          
}
function genUsHexagon(idgen,bgclr){

 return  $("<div>")
            .addClass("resizeFigure")
            .append($("<div>")           
                     .addClass("Content hexagon")
                     .attr("draggable","true")
                     .attr("data-colorcst","2")
                     .attr("id", idgen)
                     .attr("style","background-color:"+bgclr+" ;")
                     .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg6.png" alt="">')
 
                     .append($("<div>")
                               .addClass("contentArrow")
                               .attr("id", "dragArrow")
                                .attr("draggable","true")
                               .append('<i class="fas fa-arrow-right"></i>'))
                     .append($("<div>")
                              .addClass("ContentBody")
                             
                               ))
                     
}
function genUsRhomb(idgen,bgclr){

 return  $("<div>")
            .addClass("resizeFigure")
            .append($("<div>")
                     .addClass("Content rhomb")
                     .attr("draggable","true")
                     .attr("data-colorcst","1")
                     .attr("id", idgen)
                     .attr("style","background-color:"+bgclr+" ;")
                     .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg4.png" alt="">')
 
                     .append($("<div>")
                               .addClass("contentArrow  ")
                               .attr("id", "dragArrow")
                                .attr("draggable","true")
                               .append('<i class="fas fa-arrow-right"></i>'))
                     .append($("<div>")
                              .addClass("ContentBody ")
                             
                               ))           
          
}
function genUsEllipse(idgen,bgclr){

 return $("<div>")
          .addClass("resizeFigure")
          .append($("<div>")
                    .addClass("Content ellipse")
                    .attr("draggable","true")
                    .attr("data-colorcst","1")
                    .attr("id", idgen)
                    .attr("style","background-color:"+bgclr+" ;")
                    .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg8.png" alt="">')

                    .append($("<div>")
                              .addClass("contentArrow  ")
                              .attr("id", "dragArrow")
                               .attr("draggable","true")
                              .append('<i class="fas fa-arrow-right"></i>'))
                    .append($("<div>")
                             .addClass("ContentBody ")
                            
                              ))
          
}

function genUsCircle(idgen,bgclr){
  return  $("<div>")
           .addClass("resizeFigure")
           .append(
            $("<div>")
            .attr("draggable","true")
            .addClass("Content   circle")
            .attr("data-colorcst","1")
            .attr("id", idgen)
            .attr("style","background-color:"+bgclr+" ;")
            .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg1.png" alt="">')

            .append($("<div>")
                      .addClass("contentArrow")
                      .attr("id", "dragArrow")
                      .attr("draggable","true")
                      .append('<i class="fas fa-arrow-right"></i>'))
            .append($("<div>")
                     .addClass("ContentBody")
                  
                      ))
  
          
}
function genUsDocumentFg(idgen,bgclr){
  return  $("<div>")
             .addClass("resizeFigure")
             .append($("<div>")
             .attr("draggable","true")
             .addClass("Content DocumentFg")
             .attr("data-colorcst","1")
             .attr("id", idgen)
             .attr("style","background-color:"+bgclr+" ;")
             .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg7.png" alt="">')

             .append($("<div>")
                       .addClass("contentArrow")
                       .attr("id", "dragArrow")
                       .attr("draggable","true")
                       .append('<i class="fas fa-arrow-right"></i>'))
              .append($("<div>")
                       .addClass("ContentBody")
        
            ));       
          
}


function genUsDiamond(idgen,bgclr){
  return  $("<div>")
             .addClass("resizeFigure")
             .append($("<div>")
                         .addClass("Content diamond")
                         .attr("draggable","true")
                         .attr("data-colorcst","1")
                         .attr("id", idgen)
                         .attr("style","background-color:"+bgclr+" ;")
                    .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg5.png" alt="">')

                     .append($("<div>")
                       .addClass("contentArrow ")
                       .attr("id", "dragArrow")
                       .attr("draggable","true")
                       .append('<i class="fas fa-arrow-right"></i>'))
                     .append($("<div>")
                              .addClass("ContentBody ")
                              ))           
          
}
function genUSCardfg(idgen,bgclr){
  return  $("<div>")
             .addClass("resizeFigure")
             .append($("<div>")
                         .addClass("Content cardfg")
                         .attr("draggable","true")
                         .attr("data-colorcst","1")
                         .attr("id", idgen)
                         .attr("style","background-color:"+bgclr+" ;")
                         .append(' <img src="http://localhost/github/safron/public_html/resource/img/lg9.png" alt="">')
     
                     .append($("<div>")
                       .addClass("contentArrow ")
                       .attr("id", "dragArrow")
                       .attr("draggable","true")
                       .append('<i class="fas fa-arrow-right"></i>'))
                     .append($("<div>")
                              .addClass("ContentBody ")
                              ))           
          
}


//tdAdder swimlane 
function genusAdderPopUpTdSl(){

  return $("<div>")
           .addClass("tdAdderSwimlane")
           .append('<p class="selectColorWord">Select Figure</p>')
           .append($("<div>")
                     .addClass("figureSelectOption")
                     .append(`<span data-figurnum="10" class="figureFromspansw"><img src="http://localhost/github/safron/public_html/resource/img/lg3.png" alt=""></span>`)
                     .append('<span data-figurnum="12" class="figureFromspansw "><img src="http://localhost/github/safron/public_html/resource/img/lg1.png" alt=""></span>')
                     .append('<span data-figurnum="14" class="figureFromspansw selectedfigureswfg"><img src="http://localhost/github/safron/public_html/resource/img/lg10.png" alt=""></span>')
                     .append('<span data-figurnum="16" class="figureFromspansw"><img src="http://localhost/github/safron/public_html/resource/img/lg5.png" alt=""></span>')
                     .append('<span data-figurnum="18" class="figureFromspansw"><img src="http://localhost/github/safron/public_html/resource/img/lg6.png" alt=""></span>')
                     .append('<span data-figurnum="20" class="figureFromspansw"><img src="http://localhost/github/safron/public_html/resource/img/lg2.png" alt=""></span>')
                     .append('<span data-figurnum="22" class="figureFromspansw"><img src="http://localhost/github/safron/public_html/resource/img/lg9.png" alt=""></span>')
                     .append('<span data-figurnum="24" class="figureFromspansw"><img src="http://localhost/github/safron/public_html/resource/img/lg4.png" alt=""></span>')
                     .append('<span data-figurnum="26" class="figureFromspansw"><img src="http://localhost/github/safron/public_html/resource/img/lg8.png" alt=""></span>')
                     .append(`<span data-figurnum="28" class="figureFromspansw"><img src="http://localhost/github/safron/public_html/resource/img/lg7.png" alt=""></span>`)
                     .append(`<span data-figurnum="30" class="figureFromspansw usicon"><img src="http://localhost/github/safron/public_html/resource/img/lg10.png" alt=""> <span class="customSpanUst">User <br> Story</span></span>`)
                     )
          .append('<p class="selectColorWord">Select Color Figure</p>')
          .append($("<div>")
                    .addClass("figureBgSelectOption")
                    .append('<span data-bgcolorspan="#fff" style="background-color: #fff;" class="ColopickerSpan selectedColorPickerswfg"></span>')
                    .append('<span data-bgcolorspan="#e3b6aac4" style="background-color: #e3b6aa;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#bad9f9c4" style="background-color: #bad9f9;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#c1e57cc4" style="background-color: #c1e57c;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#fdf67cc4" style="background-color: #fdf67c;" class="ColopickerSpan"></span>')
                    .append('<span data-bgcolorspan="#fa8065c4" style="background-color: #fa8065;" class="ColopickerSpan "></span>')
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
        $(".ForUSerStFigure").css("display","flex");
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
        $(".ForUSerStFigure").css("display","flex");
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

     console.log('esfefsefs')

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
$(document).on("click", ".lines-block-act .geItem" , function(){
         
  $('.geItem').removeClass('gactive');
  $(this).addClass('gactive');
  typLine = $(this).attr('data-tylp');
  
})
$(document).on("click", ".ColopickerSpanLine" , function(){
    $(".ColopickerSpanLine").removeClass('gactive')
  $(this).addClass('gactive')
    lineColor = $(this).attr('data-bgcolorspan');
  
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


  var textVal=$("#select-text").val();
  var idFigure=$(document).find('[data-text="TextVal"]').attr("id");
 

  $(document).find('[data-text="TextVal"]').find(".ContentBody").find("span").remove();
    
    $(document).find('[data-text="TextVal"]').find(".ContentBody").append('<span>'+textVal+'</span>');
    var txtsave ={};
    txtsave=[idFigure,textVal];
    Idcontent.content.push(txtsave);
    LaneRepair()
})


$(document).on("change", ".SelectFigureText" , function(){

  var idt=$(this).val();
  var textVal=$( ".SelectFigureText option:selected" ).text();

  if(idt.length >0){
 
    $(document).find('[data-text="TextVal"]').find(".UserRectBody").find("span").remove();
    $(document).find('[data-text="TextVal"]').attr("data-sed-id",idt);
      
      $(document).find('[data-text="TextVal"]').find(".UserRectBody").append('<span>'+textVal+'</span>');
      $(document).find('[data-text="TextVal"]').find(".UserRectBody").attr("data-hastxt","2")
      LaneRepair();
  }

})


var color ; 


$(document).on("click",".figureFromspansChange",function(){
  
  var fbg = $(this).attr("data-figurnum");
   var dot= $('[data-text="TextVal"]');
   dot.removeClass();
  if(fbg==10){
    dot.addClass("Content stickManFigure");
    dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg3.png');
  }
  if(fbg==12){
    dot.addClass("Content circle");
    dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg1.png');
  }
  if(fbg==14){
    dot.addClass("Content square");
    dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg10.png');

  }
  if(fbg==16){
    dot.addClass("Content diamond");
    dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg5.png');
  }
  if(fbg==18){

    dot.addClass("Content hexagon");
    dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg6.png');
  }
  if(fbg==20){
      dot.addClass("Content triangle");
      dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg2.png');
  }
  if(fbg==22){
    dot.addClass("Content cardfg");
    dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg9.png');
  } 
  if(fbg==24){
    dot.addClass("Content rhomb");
    dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg4.png');
    
  }
  if(fbg==26){
    dot.addClass("Content ellipse");
    dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg8.png');

  }
  if(fbg==28){
    dot.addClass("Content DocumentFg");
    dot.find("img").attr('src','http://localhost/github/safron/public_html/resource/img/lg7.png');
  }

})

$(document).on("click",".Colorchangespan",function(){
 
  var fbg = $(this).attr("data-bgcolorspan");
 
    $('[data-text="TextVal"]').removeAttr("style");
    $('[data-text="TextVal"]').attr("style","background-color:"+fbg+";");
  
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
     var dataHtml = $('[data-text="TextVal"]').parent(".resizeFigure").clone();

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
    $(".ForUSerStFigure").css("display","flex");

  }
     
})


$(document).on("change", "#FigureWitdh" , function(){
    
     var width = $(this).val();
 
  $('[data-text="TextVal"]').css("width", width +"%");

 
})
$(document).on("change", "#FigureHeight" , function(){
    
     var height = $(this).val();
 
     $('[data-text="TextVal"]').css("height", height +"%");

})



 
function LaneRepair(){
  $(".leader-line").remove();
  
  var dt =$('.activity-conatiner').scrollTop();
  var dtl =$('.activity-conatiner').scrollLeft();
  
  $('.activity-conatiner').scrollTop(0);
  $('.activity-conatiner').scrollLeft(0);
  var list = FromTo.peer;
  for (var i=0;i<list.length;i++){
    var id = list[i];
    var k =   Object.keys(id);

    
     
    try {
      genLeadeLine(id[0],id[1],id[2],id[3],'text');
    } catch (error) {
      
    }
    
    
        
    
  }
   
  $('.activity-conatiner').scrollTop(dt);
  $('.activity-conatiner').scrollLeft(dtl);
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
   LaneRepair();
   $(".over").removeClass('over')
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


 

  var items = document.querySelectorAll('.Graphtable td');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
  
 
  $(document).on("click", "#LaneAddBtn" , function(){


   
    $(".Graphtable tbody").append(genUsLane(idgenvLane))
     var countsltd1= 30
    for (var i = 0; i < countsltd1; i++) {
    
  
      $("#laneId"+idgenvLane).append('<td></td>');
   
      items = document.querySelectorAll('.Graphtable td');
  
    }
    $("#laneId"+idgenvLane).find("td").append(genusAdderPopupopenedSl());
    idgenvLane++
    LaneRepair()
    $(".Graphtable tbody tr").arrangeable({
      dragSelector: ".dragLaneClass",
   
      })

  
  
  
    
  })
 


  $(".Graphtable tbody tr").arrangeable({

    dragSelector: ".dragLaneClass",
      
    
         
  })

  

});




