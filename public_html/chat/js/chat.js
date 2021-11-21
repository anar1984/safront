var ticker = Utility.getParamFromUrl('current_ticker_id');
var isGroup_chat = ''
window.onload = function () {
    Utility.addParamToUrl("current_chat_user", '')
    Utility.addParamToUrl("current_chat_gorup", "")
    global_var.current_ticker_id = ticker;
    global_var.current_project_id = '210102102810037910965'
    getProjectUserssync('210102102810037910965');
    getProjectUsersForElById4Chat(global_var.current_project_id)
    sidebarGeneratecomment();
    genRelUserlistCreated();
    var saChat = new SAChat();
    saChat.init();
      
};
var SAChat = function () {
    this.socket = null;
};



SAChat.prototype = {
    init: function () {
        var that = this;

        this.socket = io.connect();
        this.socket.on('connect', function () {
            /*   document.getElementById('info').textContent = 'Ad Daxil et';
              document.getElementById('nickWrapper').style.display = 'block';
              document.getElementById('nicknameInput').focus(); */

            that.socket.emit('login', global_var.current_ticker_id);
        });
        this.socket.on('nickExisted', function () {
            Toaster.showError(('Bu istifadəçi hal hazırda aktivdir zəhmət olmasa çıxış edin'));
            document.getElementById('info').textContent = '!nickname is taken, choose another pls';
        });
        this.socket.on('loginSuccess', function () {
            document.title = 'Cheweek Chat  ';
            document.getElementById('loginWrapper').style.display = 'none';
            document.getElementById('messageInput').focus();
        });
        this.socket.on('error', function (err) {
            if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '!fail to connect :(';
            } else {
                document.getElementById('info').textContent = '!fail to connect :(';
            }
        });
        this.socket.on('system', function (nickName, userCount, type) {

            var us = ''
            try {
                us = SAProjectUser.ProjectUsers[nickName].userName;
            } catch (error) {
                us = 'NaMəlum'
            }
            var msg = us + (type == 'login' ? ' Daxil Oldu' : ' Tərk etdi');
            that._displayNewMsg('Cheweek Admin', msg, 'red');
            document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
        });
        this.socket.on('newMsg', function (user, msg, color, fkGroupId, fkUserId) {
            var groupId = Utility.getParamFromUrl('current_chat_gorup');
            var usId = Utility.getParamFromUrl('current_chat_user');
            if (fkGroupId.length > 0) {
                if (groupId === fkGroupId) {
                    var us = ''
                    try {
                        us = SAProjectUser.ProjectUsers[user].userName;
                    } catch (error) {
                        us = 'NaMəlum'
                    }

                    that._displayNewMsg(us, msg, color);
                } else {
                    var elm = $(".container-group-item#" + fkGroupId).find('.count-message');
                    var ct = elm.text();
                    elm.text(parseFloat(ct ? ct : 0) + 1);
                    elm.show();

                }
                ding();
            }
            if (fkUserId.length > 0) {
                if (ticker === fkUserId) {
                    if (usId === user) {
                        var us = ''
                        try {
                            us = SAProjectUser.ProjectUsers[user].userName;
                        } catch (error) {
                            us = 'NaMəlum'
                        }

                        that._displayNewMsg(us, msg, color);
                    } else {
                        var elm = $(".container-group-item#" + user).find('.count-message');

                        if (elm.length > 0) {

                            var ct = elm.text();
                            elm.text(parseFloat(ct ? ct : 0) + 1);
                            elm.show();

                        } else {
                            var us = SAProjectUser.ProjectUsers[user].userName;
                            var img = SAProjectUser.ProjectUsers[user].userImage;

                            var src = fileUrl(img);
                            var div = sideBarBlockgen(us, user, src, '0', '1');

                            $("#list-wrap-container-user").prepend(div).find('#' + user).find(".count-message").show();

                        }

                    }
                }
                ding();
                return
            }


        });
        this.socket.on('newImg', function (user, img, color,fkGroupId, fkUserId) {

            var groupId = Utility.getParamFromUrl('current_chat_gorup');
            var usId = Utility.getParamFromUrl('current_chat_user');
            if (fkGroupId.length > 0) {
                if (groupId === fkGroupId) {
                    var us = ''
                    try {
                        us = SAProjectUser.ProjectUsers[user].userName;
                    } catch (error) {
                        us = 'NaMəlum'
                    }
    
                    that._displayImage(us, msg, color);
                } else {
                    var elm = $(".container-group-item#" + fkGroupId).find('.count-message');
                    var ct = elm.text();
                    elm.text(parseFloat(ct ? ct : 0) + 1);
                    elm.show();
    
                }
                ding();
            }
            if (fkUserId.length > 0) {
                if (ticker === fkUserId) {
                    if (usId === user) {
                        var us = ''
                        try {
                            us = SAProjectUser.ProjectUsers[user].userName;
                        } catch (error) {
                            us = 'NaMəlum'
                        }
    
                        that._displayImage(us, msg, color);
                    } else {
                        var elm = $(".container-group-item#" + user).find('.count-message');
    
                        if (elm.length > 0) {
    
                            var ct = elm.text();
                            elm.text(parseFloat(ct ? ct : 0) + 1);
                            elm.show();
    
                        } else {
                            var us = SAProjectUser.ProjectUsers[user].userName;
                            var img = SAProjectUser.ProjectUsers[user].userImage;
    
                            var src = fileUrl(img);
                            var div = sideBarBlockgen(us, user, src, '0', '1');
    
                            $("#list-wrap-container").prepend(div).find('#' + user).find(".count-message").show();
    
                        }
    
                    }
                }
                ding();
                return
            }
        });
      
        document.getElementById('sendBtn').addEventListener('click', function () {
            var messageInput = document.getElementById('messageInput'),
                groupId = Utility.getParamFromUrl('current_chat_gorup'),
                usId = Utility.getParamFromUrl('current_chat_user'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
                 messageInput.value = '';
                messageInput.focus();
            if (msg.trim().length != 0) {
                messageInput.value = '';

                that._displayNewMsgMe('me', msg, color);
               
                if (groupId) {
                    that.socket.emit('postMsg', groupId, '', msg, color);
                    saveMessageToDatabase('',isGroup_chat,groupId,msg,'');
                }
                if (usId) {
                    that.socket.emit('postMsg', '', usId, msg, color);
                    saveMessageToDatabase(usId,isGroup_chat,'',msg,'');
                }

                //msgData.fileUrl =msg;
                return;
            };

        }, false);
        document.getElementById('messageInput').addEventListener('keyup', function (e) {
            var messageInput = document.getElementById('messageInput'),
                groupId = Utility.getParamFromUrl('current_chat_gorup'),
                usId = Utility.getParamFromUrl('current_chat_user'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
            if (e.keyCode == 13 && msg.trim().length != 0) {
                messageInput.value = '';

                that._displayNewMsgMe('me', msg, color);
               
                if (groupId) {
                   
                    that.socket.emit('postMsg', groupId, '', msg, color);
                    saveMessageToDatabase('',isGroup_chat,groupId,msg,'');
                }
                if (usId) {
                    that.socket.emit('postMsg', '', usId, msg, color);
                    saveMessageToDatabase(usId,isGroup_chat,'k',msg,'');
                }

               
            };

        }, false);
        /*  document.getElementById('clearBtn').addEventListener('click', function() {
             document.getElementById('historyMsg').innerHTML = '';
         }, false) */
        document.getElementById('sendImage').addEventListener('change', function () {
            if (this.files.length != 0) {
                var file = this.files[0],
                    reader = new FileReader(),
                    color = document.getElementById('colorStyle').value;
                if (!reader) {
                    that._displayNewMsg('system', '!your browser doesn\'t support fileReader', 'red');
                    this.value = '';
                    return;
                };
                reader.onload = function (e) {
                    this.value = '';
                    that.socket.emit('img', e.target.result, color);
                    that._displayImage('me', e.target.result, color);
                };
                reader.readAsDataURL(file);
            };
            var msgData = {};
            //  msgData.body =msg;
            var grpId = document.querySelector('.-messagecontent');
            grpId = grpId.getAttribute("id");
            msgData.fkGroupId = grpId;
            msgData.fileUrl = msg;

            saveMessageToDatabase(fkUserId,isViewed,grpId,'',msg);
           
        }, false);
        this._initialEmoji();
        document.getElementById('emoji').addEventListener('click', function (e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            emojiwrapper.style.display = 'block';
            e.stopPropagation();
        }, false);
        document.body.addEventListener('click', function (e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            if (e.target != emojiwrapper) {
                emojiwrapper.style.display = 'none';
            };
        });
        document.getElementById('emojiWrapper').addEventListener('click', function (e) {
            var target = e.target;
            if (target.nodeName.toLowerCase() == 'img') {
                var messageInput = document.getElementById('messageInput');
                messageInput.focus();
                messageInput.value = messageInput.value + '[emoji:' + target.title + ']';
            };
        }, false);
    },
    _initialEmoji: function () {
        var emojiContainer = document.getElementById('emojiWrapper'),
            docFragment = document.createDocumentFragment();
        for (var i = 69; i > 0; i--) {
            var emojiItem = document.createElement('img');
            emojiItem.src = 'resource/content/emoji/' + i + '.gif';
            emojiItem.title = i;
            docFragment.appendChild(emojiItem);
        };
        emojiContainer.appendChild(docFragment);
    },
    _displayNewMsg: function (user, msgt, color) {

        var container = document.getElementById('historyMsg'),
            //  msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8),
            //determine whether the msg contains emoji

            msg = this._showEmoji(msg);
        var dlv = document.createElement('div');
        dlv.classList.add('message-list')
        var msg = document.createElement('div');
        msg.classList.add('msg');

        var imgUs = document.createElement("b");
        var us = ''

        imgUs.innerText = user;
        msg.appendChild(imgUs);

        var p = document.createElement("p")
        p.innerHTML = msgt;

        msg.appendChild(p);

        var tm = document.createElement('div');
        tm.innerText = date;

        dlv.appendChild(msg);
        dlv.appendChild(tm);


        //   msgToDisplay.style.color = color || '#000';
        //   msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span>' + msg;
        container.appendChild(dlv);
        container.scrollTop = container.scrollHeight;
    },
    _displayNewMsgMe: function (user, msg, color) {

        var container = document.getElementById('historyMsg'),
            // msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8),

            msg = this._showEmoji(msg);
        var dp = document.createElement('div');
        dp.classList.add('message-list');
        dp.classList.add('me');

        var txDiv = document.createElement('div');

        txDiv.classList.add('msg');
        var pd = document.createElement('p');

        pd.innerHTML = msg;
        txDiv.appendChild(pd)

        var tm = document.createElement('div');

        tm.innerHTML = date;

        dp.appendChild(txDiv);
        dp.appendChild(tm);

        // msgToDisplay.style.color = color || '#000';
        // msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span>' + msg;
        container.appendChild(dp);
        container.scrollTop = container.scrollHeight;
    },
    _displayImage: function (user, imgData, color) {
        var container = document.getElementById('historyMsg'),
            msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8);
        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span> <br/>' + '<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>';
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
    _showEmoji: function (msg) {
        var match, result = msg,
            reg = /\[emoji:\d+\]/g,
            emojiIndex,
            totalEmojiNum = document.getElementById('emojiWrapper').children.length;
        while (match = reg.exec(msg)) {
            emojiIndex = match[0].slice(7, -1);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="resource/content/emoji/' + emojiIndex + '.gif" />'); //todo:fix this in chrome it will cause a new request for the image
            };
        };
        return result;
    }
};




function sidebarGeneratecomment() {

    var that = this;
    var json = initJSON();
    json.kv.fkAssgineeId = ticker;

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/cl/elcompro/readRealtionGroupAndUser",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            res = res.tbl[0].r;
            $("#list-wrap-container").empty();
        
            for (let index = 0; index < res.length; index++) {
                var nm = res[index].fkGroupId;
               
                getGroupList(nm)

            }
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });

}
function saveMessageToDatabase(fkUserId,isGorup,fkGroupId,body,fileUrl) {
    var that = this;
    var json = {};
    if(fkUserId){
        json.fkUserId = fkUserId;
    }
  
        json.isViewed = '0';

    if (fileUrl) {
        
    json.fileUrl = fileUrl;
    }
    if (fkGroupId) {
        json.fkGroupId = fkGroupId; 
    }
    if (body) {
        json.body = body; 
    }
   
   // var data = JSON.stringify(json);
    be.callApi('21052614480303666321', json);
    /* $.ajax({
        url: urlGl + "api/post/cl/elcompro/createCommentTable",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            console.log(res);
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    }); */
}
function getGroupList(gorupId) {
    var that = this;
    var json = initJSON();
    json.kv.id = gorupId;

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/cl/elcompro/readCommentGroupList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            arr = res.tbl[0].r;
        
            for (let index = 0; index < arr.length; index++) {
                var nm = arr[index].nameGroup;
                var id = arr[index].id;
                var isgr = arr[index].isGroup;
                var crt  = arr[index].createdBy
        
                var src = fileUrl(arr[index].groupImage);
                var admn = ''
                   if(crt === ticker){
                      admn = true
                   }
                var div = sideBarBlockgen(nm, id, src, isgr,'',admn);
                $("#list-wrap-container").append(div);
        
            }
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

function sideBarBlockgen(nm, id, isrc, isGroup, count,isadmin) {
   var edit = $("<span>")
    if (isadmin=== true) {
       edit.addClass("edit-admin-group-btn")
           .append('<i class="far fa-edit"></i>')
    }else{
        edit.hide();
    }
    var div = $('<div>')
                .addClass("list container-group-item")
                .attr('id',id)
                .attr('data-isGroup', isGroup)
                .append($("<img>")
                          .attr('src',isrc))
                .append($("<div>").addClass("info")
                           .append('<span class="user">'+nm+'</span>')
                           .append('<span class="text"></span>'))
                .append('<span class="time count-message">'+count ? count : ''+'</span>')
                .append(edit)
    /* 
        div.setAttribute('onclick', 'triggerAPI(this,"21052611563704387613")'); */
   
    return div

}

function Genblockmessage(data, el) {
    $('#historyMsg').empty();/* 
    var usImga = $(el).find('img').attr('src');
    var usNm = $(el).find('.info ').attr('src'); */

    try {
        var mesList = data._table.r;

        for (var index = 0; index < mesList.length; index++) {
            if (index < 51) {

                var bdy = mesList[index].body;
                var crtBy = mesList[index].createdBy;
                var idMs = mesList[index].id;
                var tmie = mesList[index].insertDate;


                var dlv = document.createElement('div');
                dlv.classList.add('message-list')
                var msg = document.createElement('div');
                msg.classList.add('msg');

                var imgUs = document.createElement("b");
                //imgUs.classList.add('image-mini-block')
                var us = SAProjectUser.ProjectUsers[crtBy].userName;
                if (us === '') {
                    imgUs.innerText = 'Error User';
                } else {
                    imgUs.innerText = us;
                }



                if (crtBy === global_var.current_ticker_id) {
                    dlv.classList.add('me')
                } else {
                    msg.appendChild(imgUs);
                }


                var p = document.createElement("p")
                p.innerHTML = bdy;

                msg.appendChild(p);

                var tm = document.createElement('div');
                tm.innerText = tmie;

                dlv.appendChild(msg);
                dlv.appendChild(tm);



                $('#historyMsg').prepend(dlv);

            }

            const scrollContainer = document.getElementById('historyMsg');
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
    } catch (err) {
            console.log(err);
        $('#historyMsg').append('Söhbət boşdur');
    }
}

function commentsavedatabase(data) {
    data.body = $('#text-message-input').html();
    data.fkGroupId = $('.-messagecontent').attr('id');

    $('#text-message-input').html("");
}
$(document).on("click", "#add_user_button", function (e) {
    var userId = $("#userListChatSelect").val();
    var logo = SAProjectUser.ProjectUsers[userId].userImage;
    var name = SAProjectUser.ProjectUsers[userId].userName;

    /* var ls  = {};
      ls.groupImage = logo;
      ls.nameGroup = name;
      ls.fkUserId = userId;
    be.callApi('21100815312700281008',ls);
    $("#addUserChat").modal("hide");
    sidebarGeneratecomment();
    $("#list-wrap-container").find(".container-group-item").first("click") */
    var chk  = $("#list-wrap-container-user").find("#"+userId);
    if(chk.length>0){
        chk.click();
        $("#addUserChat").modal("hide");
        return
    }
    var src = fileUrl(logo);
    var div = sideBarBlockgen(name, userId, src, '0');
    $("#list-wrap-container-user").prepend(div);
    $("#addUserChat").modal("hide");
    $('#list-wrap-container-user .container-group-item').first().click();
})
$(document).on("click", "#addUserGroupBtnUpdate", function (e) {
    var userId = $("#gorup-add-user-update").val();
    
               console.log(userId);
                var groupId = Utility.getParamFromUrl('current_chat_gorup');
                for (let l = 0; l < userId.length; l++) {
                    const k = userId[l];
                    relationGroupUserAnd(groupId,k)
                }

                readRealtionGroupListUser(groupId);
             
   
                $("#gorup-add-user-update").val('');
})
$(document).on("click", "#add_group_button", function (e) {
    var userId = $("#userListChatSelect4Group").val();
    var logo = $("#comp_id_21052416171700517121").attr("fname");
    var name = $("#group_chat_name").val(); 
    var json = initJSON();
    var that = this;
    json.kv.nameGroup = name;
    json.kv.groupImage = logo;
    json.kv.createdBy = ticker;

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/cl/elcompro/insertCommentGroup",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
             
                var grpId =res.kv.id
                relationGroupUserAnd(grpId,ticker);
                for (let l = 0; l < userId.length; l++) {
                    const k = userId[l];
                    relationGroupUserAnd(grpId,k)
                }
              
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });

  
   
    
})

function relationGroupUserAnd(fkGroupId,userId){
     
    
         var json = initJSON();
         var that = this;
         json.kv.fkAssgineeId = userId;
         json.kv.fkGroupId = fkGroupId;
         var data = JSON.stringify(json);
         $.ajax({
             url: urlGl + "api/post/cl/elcompro/createGroupAndUserRelation",
             type: "POST",
             data: data,
             contentType: "application/json",
             crossDomain: true,
             async: true,
             success: function (res) {
               console.log(res.kv.id);
                $("#addGroupChat").modal("hide");
             },
             error: function () {
                 Toaster.showError(('somethingww'));
             }
         });
     
   
}

$(document).on("click", ".open", function (e) {
    const sidebar = $(".cst-cheweek-sidebar");
    sidebar.toggleClass("opened");

    if (sidebar.hasClass('opened')) {
        var i = document.createElement('i');
        i.classList.add('fas');
        i.classList.add('fa-times');

        $(this).html(i);
    } else {
        var i1 = document.createElement('i');
        i1.classList.add('fas');
        i1.classList.add('fa-ellipsis-h');
        $(this).html(i1);
    }
})

$(document).on("change", "#updateGroupChat .group-name-update", function (e) {
    var nm =$(this).val();
    if(nm.trim().length > 0){
        var grid = $(this).attr("data-gr-id")
        var lss = {};
             lss.id = grid;
             lss.nameGroup = nm
          be.callApi('21060211225807438849',lss);
         $(".container-group-item#"+grid).find('.info .user').text(nm);
    }
  
   
})

$(document).on("click", ".edit-admin-group-btn", function (e) {
    $("#updateGroupChat").modal("show");
    var id  = $(this).parents('.container-group-item').attr("id")
    var nm  = $(this).parents('.container-group-item').find('span.user').text();
    readRealtionGroupListUser(id);
    $("#updateGroupChat .group-name-update").val(nm).attr("data-gr-id",id);

});

$(document).on("click", ".container-group-item", function (e) {
    $(".container-group-item").removeClass("akitvec");
    $(this).addClass("akitvec");
    var id = $(this).attr('id');
    var isGroup = $(this).attr('data-isGroup');
    $(this).find(".count-message").text("").hide();
    isGroup_chat =isGroup ;
    if (isGroup === '0') {
        Utility.addParamToUrl("current_chat_user", id);
        Utility.addParamToUrl("current_chat_gorup", "");
    } else {
        Utility.addParamToUrl("current_chat_user", "");
        Utility.addParamToUrl("current_chat_gorup", id);
    }

    var imgd = $(this).find('img').attr('src');
    var us = $(this).find('span.user').text();

    $('.-messagecontent').attr('id', id);
    $('.-messagecontent').attr('data-isGroup', isGroup);
    $('.-messagecontent header img').attr('src', imgd);
    $('#user-header-bolean').text(us);
    genChatMessagesRooms(this, id, isGroup);

});

var userList4ticker ={};

function readRealtionGroupListUser(fkGroupId) {
    var json = initJSON();
    json.kv.fkGroupId = fkGroupId;

    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/cl/elcompro/readGetUserByGroupRelation",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
               $("#groupEditTableList").html('');
                var dt = res.tbl[0].r
               for (let i = 0; i < dt.length; i++) {
                   const o = dt[i];
                   
                   var us = SAProjectUser.ProjectUsers[o.fkAssgineeId].userName;
                 var  btn = "<button class='btn btn-light btn-sm' data-idl="+o.id+" onclick='deleteGroupRelation(this)' ><i class='fas fa-trash-alt'></i></button>"

                     if(ticker === o.fkAssgineeId){
                         us+= " <span style='color:red'>(Admin)<span>";
                         btn =''
                     }else{
                     }
                   $("#groupEditTableList")
                         .append($("<tr>")
                                   .append('<td scope="row">'+(i+1)+'</td>')
                                   .append('<td >'+us+'</td>')
                                   .append('<td >'+btn+'</td>')
                                   )

                  $("#gorup-add-user-update").find("[value="+o.fkAssgineeId+"]").remove();
               }
               $("#gorup-add-user-update").selectpicker("refresh")
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });  
}

function deleteGroupRelation(elm) {
      var idl  = $(elm).attr("data-idl")

    var lg = {}
      lg.id = idl
    be.callApi("211014130845052610180",lg);
    groupId = Utility.getParamFromUrl('current_chat_gorup'),
    readRealtionGroupListUser(groupId);
}

function genRelUserlistCreated(){

   /*  var json = initJSON();
    json.kv.createdBy = ticker;

    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/cl/elcompro/getDistinctSendCreatedIdListFromChat",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
          console.log(res.kv.id);
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    }); */
    var list = ''
    try {
        var res = be.callApi("21101310294709059177");
        res = res._table.r;

    for (let k = 0; k < res.length; k++) {
        const ll = res[k];
        list+= ll.createdBy+"%IN%"
    }
    } catch (error) {
        
    }
    try {
        var res1 = be.callApi("21101317470407705547");
        res1 = res1._table.r
    for (let k = 0; k < res1.length; k++) {
        const ll = res1[k];
        list+= ll.fkUserId+"%IN%"
    }
    } catch (error) {
        
    }
    genUserListforIdChatSelf(list)
  
};


function genChatMessagesRooms(el, ids, isGroup) {
    var dt = {}
    if (isGroup === "0") {
        dt.fkUserId = ids;
        dt.createdBy = ticker;
    } else {
        dt.fkGroupId = ids;
    }

    var els = be.callApi("21052615190704745176", dt);
    Genblockmessage(els, el);
};
function getProjectUsersForElById4Chat(id) {
      var elm = $("#userListChatSelect");
      var elm1 = $("#userListChatSelect4Group");
      var elm2 = $("#gorup-add-user-update");

    var json = initJSON();

    json.kv['fkProjectId'] = id;
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
            $(elm).empty().append($('<option>'));
            $(elm1).empty().append($('<option>'));
            try {
                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    if(ticker === o.fkUserId){

                    }else{
                        $(elm)
                        .append($('<option>').val(o.fkUserId)
                                .append(o.userName))
                        $(elm1)
                        .append($('<option>').val(o.fkUserId)
                                .append(o.userName))
                        $(elm2)
                        .append($('<option>').val(o.fkUserId)
                                .append(o.userName))
                    }
                  
                }


            } catch (err) {

            }
            $(elm).selectpicker('refresh');
            $(elm1).selectpicker('refresh');
            $(elm2).selectpicker('refresh');

        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
};

function ding() {
    var sound = new Audio("https://app.sourcedagile.com/api/get/files/mixkit-tile-game-reveal-960_77F24EC8726AA.wav");
    sound.play();
};


function genUserListforIdChatSelf(list){
    var json = initJSON();

    json.kv['fkProjectId'] = global_var.current_project_id;
    json.kv['id'] = list;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetUserList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
          
            try {
                var obj = res.tbl[0].r;
                for (var i in obj) {
                    var o = obj[i];
                    if(ticker === o.fkUserId){

                    }else{
                        var src = fileUrl(o.userImage);
                                var div = sideBarBlockgen(o.userPersonName, o.id, src, 0);
                                $("#list-wrap-container-user").append(div);
                    }
                  
                }


            } catch (err) {

            }
           

        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
};