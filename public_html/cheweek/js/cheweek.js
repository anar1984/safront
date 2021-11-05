

    function genTaskListTable(params) {
        var tbid = $("#comp_id_21010301052003928142 tbody");
        var json = initJSON();
        //json.kv.fkUserId ='21040211344601629324';
        json.kv.fnId = '21110215082702238186';
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
                               .append($("<td>")
                                           .append(o.createdBy))
                               .append($("<td>")
                                           .append(o.fkActionId))
                               .append($("<td>")
                                           .append(o.fkTaskTypeId))
                               .append($("<td>")
                                           .append(o.lastClosedComment))
                               .append($("<td>")
                                           .append(o.taskPrioritetAdi))
                               .append($("<td>")
                                           .append(o.taskStatus))
                               .append($("<td>")
                                           .append(o.taskNo))
                               .append($("<td>")
                                           .append(o.status))
                      tbid.append(tr);
                  }
                  
            }
        });
    }
