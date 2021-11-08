


var cheweek ={
    cheweek_id:"210102102810037910965",
    init: function () {
        this.genUserInfoAccount();
         Utility.addParamToUrl('current_project_id',this.cheweek_id)
         getProjectUserssync(this.cheweek_id);
        this.getTaskListTable();
        this.genCountNotification();
        genTimePickerById("date_timepicker_start_end");
    
    },
    getTaskListTable: function () {
        var tbid = $("#comp_id_21010301052003928142 tbody");
        var json = initJSON();
        //json.kv.fkUserId ='21040211344601629324';
        json.kv.fnId = '21110215082702238186';
        json.kv.startLimit = '0';
        json.kv.endLimit = '50';
        json.kv.fkAssigneID = global_var.current_ticker_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceIoRunFunctionForSql",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
            
                  var list  = res.tbl[0].r;
                  for (let i = 0; i < list.length; i++) {
                      const o = list[i];

                   var tr = $("<tr>")
                                .addClass("redirectClass")
                               .append($("<td>")
                                          .addClass("text-center brend-color")
                                           .css("max-width","20px")
                                           .append(i+1))
                               .append($("<td>")
                                            .addClass("text-center")
                                           .append($("<input>")
                                                            .addClass("tdOperation cst-chkc-bl2 cst-clck-box")
                                                            .attr("type",'checkbox')
                                                            .attr("id",'comp_id_21011108222503965957')
                                                            ))
                               .append($("<td>")
                                           .addClass("text-center")
                                           .append($("<span>")
                                                             .addClass("brend-color")
                                                            .attr("sa-data-value",o.taskNo)
                                                            .append(o.taskNo)
                                                            ))
                               .append($("<td>")
                                           .addClass("text-center")
                                           .append($("<span>")
                                                             .addClass("issue_status_"+o.taskStatus+"")
                                                            .attr("sa-data-value",o.taskStatus)
                                                            .attr("onclick_trigger_id",'21022123300700666582')
                                                            .attr("onclick","new UserStory().setGUIComponentButtonGUIModal('21031615384404924960',this)")
                                                            .append(o.taskStatus)
                                                            ))
                               .append($("<td>")
                                           .addClass("text-center")
                                           .append($("<a href='#'>")
                                                            .addClass("_taskListTaskTypeIdField brend-color")
                                                            .attr("sa-data-value",o.fkTaskTypeId)
                                                            .attr("sa-data-fktasktypeid",o.fkTaskTypeId)
                                                            .attr("sa-selectedfield",'fkTaskTypeId')
                                                           .append(o.taskTypeName)
                                                            ))
                                .append($("<td>")
                                           .append($("<a href='#'>")
                                                             .addClass("_taskListRequestId brend-color")
                                                            .attr("sa-data-value",o.fkRequestId)
                                                            .attr("onclick_trigger_id",'21031217414702167956')
                                                            .attr("sa-selectedfield",'fkRequestId1')
                                                            .attr("onclick","new UserStory().setGUIComponentButtonGUIModal('21031515423709217523',this)")
                                                            .append(o.requestName+" - "+o.requestCode +" - "+Utility.convertDate(o.requestDate))
                                                            ))
                                .append($("<td>")
                                            .css("width",'80px')
                                           .addClass("text-center")
                                           .append(cheweek.genUSerImageBlock(o.createdBy,'createdBy')))
                                .append($("<td>")
                                            .css("width",'80px')
                                           .addClass("text-center")
                                           .append(cheweek.genUSerImageBlock(o.createdBy,'fkAssigneeId')))
                              
                      tbid.append(tr);
                      $('[data-toggle="popover"]').popover({
                        html:true
                        });
                  }
                  
            }
        });
    },
    genUSerImageBlock: function (id,filed) {
           

        var user = SAProjectUser.ProjectUsers[id];
        return $('<img>')
                        .addClass("rounded-circle")
                        .css("width",'28px')
                        .css("height",'28px')
                        .css("border",'1px dashed #17335996')
                        .attr("src",fileUrl(user.userImage))
                         .attr('data-trigger',"hover") 
                        .attr('data-placement',"bottom")
                        .attr('sa-data-value',id)
                        .attr('data-original-title',filed==="createdBy"?"Daxil Edən":"İcra Edən")
                        .attr('data-toggle','popover')
                        .attr('data-content','<img width="50px" class="rounded-circle" height="50px" src="'+fileUrl(user.userImage)+'" ><b> '+user.userName+'</b>')
                        .attr('sa-selectedfield',filed)
                        


    },
    genCountNotification: function () {
        var count = be.callApi("21092414280609718466");
        $(".number_cst_elc").show().text(count.id); 
    },
    genNotificationList: function () {
   var elmenet = document.querySelector(".cont_cst_elc");
     var oper = getTaskTypeList();
         oper = oper._table.r;
     var stat = GetTaskStatusList();
         stat = stat._table.r;
      
   try{
           var reqid = ''
        elmenet.innerHTML = '';
    
                  var ld = {};
                    ld.startLimit = 0
                    ld.endLimit = 29;
                    ld.isViewed = "0";
           res = be.callApi("21091715532307023897",ld); 
             
           res = res._table.r;
           
                        
              
         
     for (let i = 0; i < res.length; i++) {
        
          var o = res[i];
               if(o.isViewed === "0"){

               
               reqid += o.fkRequestId+"%IN%"
            var dlv= document.createElement('div');
                dlv.classList.add('sec_cst_elc');
                dlv.classList.add('new_cst_elc');
                dlv.classList.add('redirectClass');
                dlv.setAttribute('pid',o.id);
                var radio = document.createElement("div")
                    radio.classList.add('new_cst_elc_round')
                var chkb =document.createElement("input")
                    chkb.setAttribute('type','checkbox');
                    chkb.setAttribute('id',o.id);
                    chkb.classList.add('new_cst_elc_radio');
                 var lblk =document.createElement("label");
                   lblk.setAttribute("for",o.id)
                    radio.appendChild(chkb);
                    radio.appendChild(lblk);

            var hid  = document.createElement("input");
                       hid.value = o.fkRequestId;
                       hid.setAttribute("sa-selectedfield",'fkRequestId');
                       hid.classList.add("d-none");
            var hid1  = document.createElement("input");
                       hid1.value = o.fkActionId;
                       hid1.setAttribute("sa-selectedfield",'fkActionId');
                       hid1.classList.add("d-none");
            var hid2  = document.createElement("input");
                       hid2.value = o.fkTaskId;
                       hid2.setAttribute("sa-selectedfield",'fkTaskId');
                       hid2.classList.add("d-none");
            
           var msg = document.createElement('div');
               msg.classList.add('profCont_cst_elc');
        
               var imgUs = document.createElement("img");
                  imgUs.classList.add('profile_cst_elc')
               var us = SAProjectUser.ProjectUsers[o.fkExecuterId].userImage;
               var userName = SAProjectUser.ProjectUsers[o.fkExecuterId].userName; 
             
                    if(us===''){
                     imgUs.setAttribute('src',urlGl+'api/get/files/userprofile.png');
                    }else{
                      imgUs.setAttribute('src',urlGl+'api/get/files/'+us);   
                    }
                    imgUs.setAttribute('data-trigger', 'hover')
                    imgUs.setAttribute('data-toggle', 'popover')
                      imgUs.setAttribute('data-content', userName)
                      imgUs.setAttribute("title", 'Daxil Edən')
                    msg.appendChild(imgUs);
                        
               
               var pa = document.createElement("div");
                   pa.classList.add('txt_cst_elc');
                   pa.classList.add('operationDiv');

               var p = document.createElement("div");
                   p.classList.add('txt_cst_elc');
                   p.classList.add('messageBodyNot');
                 
                  if(o.messageBody){
                      p.innerText= o.messageBody;
                  }else{
                      p.innerText= 'Mesaj Yoxdur';
                  }
               var a = document.createElement("a");
                   a.setAttribute("href",'#')
                   a.classList.add('operation');
                   a.classList.add('_taskListTaskTypeIdField');
                   a.setAttribute('sa-data-fktasktypeid',o.fkTaskTypeId);
               var b = document.createElement("div");
                   b.classList.add('txt_cst_elc');
                var ba = document.createElement('a');
                   ba.classList.add('requestNotBody');
                   ba.classList.add("requestNotBody"+o.fkRequestId);
                   ba.setAttribute('href',"#");
                   ba.setAttribute('onclick_trigger_id',"21031217414702167956");
                   ba.classList.add('text_click_mezmun');
                   ba.setAttribute('data-fkActionId',o.fkActionId); 
                   ba.setAttribute('data-fkTaskId',o.fkTaskId); 
                   ba.setAttribute('data-fkRequestId',o.fkRequestId); 
                   ba.setAttribute('data-fkTaskTypeId',o.fkTaskTypeId); 
                   ba.setAttribute('data-fkExecuterTaskId',o.fkExecuterId); 
                   ba.setAttribute('data-id',o.id);
                   b.appendChild(ba);
           
                  if(o.fkTaskTypeId){

                       for (let l = 0; l < oper.length; l++) {
                                if(oper[l].id==o.fkTaskTypeId){
                                  a.innerText=" " +oper[l].taskTypeName+" ("+o.taskNo+')';
                                }
                              
                       }
    
                  }
                   
               var tm = document.createElement('div');
                   tm.classList.add('sub_cst_elc');
                  var tm1 = document.createElement('span');
                      tm1.innerText =Utility.convertDate(o.createdDate)+" "+Utility.convertTime(o.createdTime)+" ";

                       var st = document.createElement('span');
                       st.classList.add('issue_status_'+o.taskStatus)
                       
                        for (let c = 0; c < stat.length; c++) {
                                if(stat[c].id==o.taskStatus){
                                  st.innerText=stat[c].taskStatusName;
                                }
                              
                       }
                 
                  
                   tm.appendChild(tm1);
                pa.appendChild(st)
               pa.appendChild(a)
          
            dlv.appendChild(msg);
              
            dlv.appendChild(p);
            dlv.appendChild(hid);
            dlv.appendChild(hid1);
            dlv.appendChild(hid2);
            dlv.appendChild(b);
            dlv.appendChild(pa);
            dlv.appendChild(radio);
           
         
            dlv.appendChild(tm);
            elmenet.appendChild(dlv);        
     }
           }

               var ol = {}
               ol.id = reqid
              var bodys = be.callApi("21092311192302154896",ol);
                   bodys = bodys._table.r
                for (let j = 0; j < bodys.length; j++) {
                   const el = bodys[j];
            
                         $(".requestNotBody"+el.id).text(el.requestBody+" ("+el.requestCode+")");
    
                 }
                $('[data-toggle="popover"]').popover();
   }catch(err){
    $(".number_cst_elc").hide();
   }
    },
    genUserInfoAccount: function () {
        
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        var data = JSON.stringify(json);
        that = this;
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrGetAccountInfo",
            type: "POST",
            data: data,
            async: true,
            contentType: 'text/html',
            success: function (res) {

                var img = (res.tbl[0].r[0].userImage)
                        ? fileUrl(res.tbl[0].r[0].userImage)
                        : fileUrl(that.getDefaultUserprofileName());               
                $('#user_index_img').attr('src',img);
                $('#user_index_img_large').attr('src',img);
                $('#name_index_block').text(res.tbl[0].r[0].userPersonName);
                global_var.current_domain = res.kv.currentDomain;
                global_var.current_ticker_id = res.tbl[0].r[0].id;
                global_var.current_user_type = res.tbl[0].r[0].liUserPermissionCode;
                Utility.addParamToUrl('current_user_type', global_var.current_user_type);
                new User().removeTagsByPermission();
            },
            error: function () {
                //bu hisse de error atmalidir. lakin atmir

                document.location = "login.html";
//                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
    }
    

}

$(document).on("mouseenter",'.notBtn_cst_elc', function () {
    var trig  = $(this).attr("data-hovered");
       if(trig==='false'){
           setTimeout(() => {
            cheweek.genNotificationList();
            $(this).attr("data-hovered","true");
           }, 200);
       
       }else{

       }
     
})

function genTimePickerById(id){
    $('#'+id).daterangepicker({
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        defaultDate: false,
        ranges: {
            'Bu Gün': [moment(), moment()],
            'Dünən': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Son 7 gün': [moment().subtract(6, 'days'), moment()],
            'Son 30 gün': [moment().subtract(29, 'days'), moment()],
            'Bu Ay': [moment().startOf('month'), moment().endOf('month')],
            'Son Ay': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small btn-cancel-value-clear',
        separator: ' to ',
        locale: {

            applyLabel: 'Axtar',
            cancelLabel: 'ləğv et',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Xüsusi',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
        }
    });
}