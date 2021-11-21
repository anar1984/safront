
var ticker = Utility.getParamFromUrl('current_ticker_id');
var isGroup_chat = ''
var mediaRecorder,
    chunks = [],
    audio = new Audio(),
    audioSrc,
    type = {
        'type': "audio/wav"
    },
    blob;

window.onload = function () {
    Utility.addParamToUrl("current_chat_user", '')
    Utility.addParamToUrl("current_chat_gorup", "")
    global_var.current_ticker_id = ticker;
    global_var.current_project_id = '210102102810037910965';
    global_var.current_domain = '48edh';
    getProjectUserssync('210102102810037910965');
    getProjectUsersForElById4Chat(global_var.current_project_id)
    sidebarGeneratecomment();
    genRelUserlistCreated();
    var saChat = new SAChat();
    saChat.init();
    paramAddUserGen4();
    new FgEmojiPicker({
        trigger: ['.vac-emoji-wrapper'],
        position: ['top', 'left'],
        emit(obj, triggerElement) {
          const emoji = obj.emoji;
          document.querySelector('textarea').value += emoji;
        }
    }); 

};
var SAChat = function () {
    this.socket = null;
};



SAChat.prototype = {
    init: function () {
        var that = this;

        this.socket = io.connect();
        this.socket.on('connect', function () {

            that.socket.emit('login', global_var.current_ticker_id);
        });
        this.socket.on('nickExisted', function () {
            Toaster.showError(('Bu istifadəçi hal hazırda aktivdir zəhmət olmasa çıxış edin'));
           // document.getElementById('info').textContent = '!nickname is taken, choose another pls';
        });
        this.socket.on('loginSuccess', function () {
            document.title = 'Cheweek Chat  ';
        });
        this.socket.on('error', function (err) {
           /*  if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '!fail to connect :(';
            } else {
                document.getElementById('info').textContent = '!fail to connect :(';
            } */
            console.log(err);
        });
        this.socket.on('system', function (nickName, userCount, type) {

           /*  var us = ''
            try {
                us = SAProjectUser.ProjectUsers[nickName].userName;
            } catch (error) {
                us = 'NaMəlum'
            }
            var msg = us + (type == 'login' ? ' Daxil Oldu' : ' Tərk etdi');
            that._displayNewMsg('Cheweek Admin', msg, 'red');
           // document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online'; */
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
                    ding();
                } else {
                    var elm = $(".container-group-item#" + fkGroupId).find('.count-message');
                    var ct = elm.text();
                    elm.text(parseFloat(ct ? ct : 0) + 1);
                    elm.show();
                    ding();
                }
           
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
                        ding();
                    } else {
                        var elm = $(".container-group-item#" + user).find('.count-message');

                        if (elm.length > 0) {

                            var ct = elm.text();
                            elm.text(parseFloat(ct ? ct : 0) + 1);
                            elm.show();
                            ding();

                        } else {
                            var us = SAProjectUser.ProjectUsers[user].userName;
                            var img = SAProjectUser.ProjectUsers[user].userImage;

                            var src = fileUrl(img);
                            var div = sideBarBlockgen(us, user, src, '0', '1');

                            $("#list-wrap-container-user").prepend(div).find('#' + user).find(".count-message").show();
                            ding();
                        }

                    }
                }
                return
            }


        });
        this.socket.on('newImg', function (user, fkGroupId, fkUserId, imgData, color) {

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

                    that._displayImage(us, imgData, color);
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

                        that._displayImage(us, imgData, color);
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
        this.socket.on('newVoice', function (user, fkGroupId, fkUserId,url , color) {
              console.log("user="+user);
              console.log("url="+url);
              console.log("color="+color);
              console.log("fkGroupId="+fkGroupId);
              console.log("fkUserId="+fkUserId);
    
              
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

                    that._displayVoice(us, url, 'wav');
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

                        that._displayVoice(us, url, 'wav');
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

        document.getElementById('vac-icon-send').addEventListener('click', function () {
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
                    saveMessageToDatabase('', isGroup_chat, groupId, msg, '','text');
                }
                if (usId) {
                    that.socket.emit('postMsg', '', usId, msg, color);
                    saveMessageToDatabase(usId, isGroup_chat, '', msg, '','text');
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
                    saveMessageToDatabase('', isGroup_chat, groupId, msg, '','text');
                }
                if (usId) {
                    that.socket.emit('postMsg', '', usId, msg, color);
                    saveMessageToDatabase(usId, isGroup_chat, 'k', msg, '','text');
                }


            };

        }, false);
        /*  document.getElementById('clearBtn').addEventListener('click', function() {
             document.getElementById('historyMsg').innerHTML = '';
         }, false) */
        document.getElementById('sendImage').addEventListener('change', function () {
            var groupId = Utility.getParamFromUrl('current_chat_gorup'),
                usId = Utility.getParamFromUrl('current_chat_user'),
                color = document.getElementById('colorStyle').value;
            var result
            if (this.files.length != 0) {
                var files = this.files;
                var trc = 0;
                $(this).attr('fname', '');
                for (var i = 0, f; f = files[i]; i++) {
                    //            var file = files[0];
                    var file = f;
                    var fileext = file['name'].split('.').pop();
                    var fname = file['name'].split('.')[0];
                    //            console.log('fname=' + fname);
                    if (files && file) {
                        var reader = new FileReader();
                        reader.fileName = fname;
                        reader.fileExt = fileext;
                        console.log(reader.fileExt);
                        reader.fileNo = i;
                        reader.onload = function (readerEvt) {
                            trc++;
                            var fname1 = readerEvt.target.fileName;
                            var fileext1 = readerEvt.target.fileExt;
                            var binaryString = readerEvt.target.result;
                            result = uploadFile4IpoCoreImportChat(fileext1, btoa(binaryString), fname1, 'sendImage');
                            that._displayImageMe('me', result, reader.fileExt);
                            if (groupId) {

                                that.socket.emit('img',result, reader.fileExt, groupId, '', );
                               
                                saveMessageToDatabase('', '', groupId, '', result,'image');
                            }
                            if (usId) {
                                that.socket.emit('img', result, reader.fileExt, '', usId,);
                                saveMessageToDatabase(usId, '', 'k', '', result,'image');
                            }

                        };
                        reader.readAsBinaryString(file, fname);
                    }
                }



            };


        }, false);
      //  this._initialEmoji();
       /*  document.getElementById('emoji').addEventListener('click', function (e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            emojiwrapper.style.display = 'block';
            e.stopPropagation();
        }, false); */
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
        var svgButton = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24" class=""><path id="vac-icon-close-outline" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path><!----></svg>'
        $(document).on("click", '.vac-icon-microphone', function (e) {
            var mainDiv = $(this).parents('.vac-icon-textarea-left');
            mainDiv.append('<div class="vac-dot-audio-record"></div>');
            mainDiv.append('<div class="vac-dot-audio-record-time">00:00</div>');
            mainDiv.append('<div class="vac-svg-button vac-icon-audio-confirm"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path id="vac-icon-checkmark" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path><!----></svg></div>');
            $(this).parents('.vac-svg-button').append(svgButton).addClass("vac-icon-audio-stop");
            $(this).remove();
           that._startRecord()
        })
        var svgButton2 = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 512 512" class="vac-icon-microphone">
                          <path id="vac-icon-microphone" d="M432.8,216.4v39.2c0,45.2-15.3,84.3-45.2,118.4c-29.8,33.2-67.3,52.8-111.6,57.9v40.9h78.4c5.1,0,10.2,1.7,13.6,6c4.3,4.3,6,8.5,6,13.6c0,5.1-1.7,10.2-6,13.6c-4.3,4.3-8.5,6-13.6,6H157.6c-5.1,0-10.2-1.7-13.6-6c-4.3-4.3-6-8.5-6-13.6c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6H236v-40.9c-44.3-5.1-81.8-23.9-111.6-57.9s-45.2-73.3-45.2-118.4v-39.2c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6s10.2,1.7,13.6,6c4.3,4.3,6,8.5,6,13.6v39.2c0,37.5,13.6,70.7,40,97.1s59.6,40,97.1,40s70.7-13.6,97.1-40c26.4-26.4,40-59.6,40-97.1v-39.2c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6c5.1,0,10.2,1.7,13.6,6C430.2,206.2,432.8,211.3,432.8,216.4z M353.5,98v157.6c0,27.3-9.4,50.3-29,69c-19.6,19.6-42.6,29-69,29s-50.3-9.4-69-29c-19.6-19.6-29-42.6-29-69V98c0-27.3,9.4-50.3,29-69c19.6-19.6,42.6-29,69-29s50.3,9.4,69,29C344.2,47.7,353.5,71.6,353.5,98z">
                        </path><!----></svg>`
        $(document).on("click", '.vac-icon-audio-stop', function (e) {
            var mainDiv = $(this).parents('.vac-icon-textarea-left');
            mainDiv.find('.vac-dot-audio-record').remove();
            mainDiv.find('.vac-dot-audio-record-time').remove();
            mainDiv.find('.vac-icon-audio-confirm').remove();
            $(this).append(svgButton2).removeClass("vac-icon-audio-stop");
            $(this).find('#vac-icon-close-outline').parent().remove();
            that._removeRecord();
        })
        $(document).on("click", '.vac-icon-audio-confirm', function (e) {
            var mainDiv = $(this).parents('.vac-icon-textarea-left');
            mainDiv.find('.vac-dot-audio-record').remove();
            mainDiv.find('.vac-dot-audio-record-time').remove();
            mainDiv.find('.vac-icon-audio-stop').removeClass('vac-icon-audio-stop').html(svgButton2);
           
            mainDiv.find('.vac-icon-audio-confirm').remove();

            var groupId = Utility.getParamFromUrl('current_chat_gorup'),
            usId = Utility.getParamFromUrl('current_chat_user');
            mediaRecorder.stop(); 
           setTimeout(() => {
             var elm = $("<source>")
            var reader = new window.FileReader();
            reader.readAsDataURL(blob);
               reader.onloadend = function(event) {
                var st = 'data:audio/wav;base64,';
                base64data = reader.result;
                base64data = base64data.substr(st.length, base64data.length - st.length);
                
            var  result = uploadFile4IpoCoreImportChat('wav', base64data, 'voice_record', 'sendImage');                   // the actual conversion of data from binary to base64 format
                                  that._displayVoice('me', result, reader.fileExt);
                                if (groupId) {
                                    
                                    that.socket.emit('voice', result, 'wav', '', groupId );
                                    saveMessageToDatabase('', '', groupId, '', result,'voice');
                                }
                                if (usId) {
                                    that.socket.emit('voice',result, 'wav', '', usId );
                                    saveMessageToDatabase(usId, '', 'k', '', result,'voice');
                                }
    
            };
          
            
            //$("#historyMsg").append('<audio download preload="metadata"  src="' + audioSrc + '" controls ></audio>');
    
           }, 1000);

        })
    },
    /* _initialEmoji: function () {
        var emojiContainer = document.getElementById('emojiWrapper'),
            docFragment = document.createDocumentFragment();
        for (var i = 69; i > 0; i--) {
            var emojiItem = document.createElement('img');
            emojiItem.src = 'resource/content/emoji/' + i + '.gif';
            emojiItem.title = i;
            docFragment.appendChild(emojiItem);
        };
        emojiContainer.appendChild(docFragment);
    }, */
    _displayNewMsg: function (user, msg, color) {

        var container = $('#historyMsg'),
            //  msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8),
            //determine whether the msg contains emoji

             msg = msg; //this._showEmoji(msg);
        var dlv = genBlockMessageTypeText(user,'',msg,date);
     
        container.append(dlv);
     
        const scrollContainer = document.getElementById('historyMsg');
        scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    },
    _displayNewMsgMe: function (user, msg, color) {

        var container = $('#historyMsg'),
            // msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8),

            msg = msg ;/* this._showEmoji(msg); */
            var dlv = genBlockMessageTypeText('me','',msg,date);
        container.append(dlv);
     
        const scrollContainer = document.getElementById('historyMsg');
        scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    },
    _displayImage: function (user, imgData, color) {

        var container = $('#historyMsg'),
            date = new Date().toTimeString().substr(0, 8);

        var dp = genBlockMessageTypeImage(user,'',imgData,date)
          container.append(dp);
     
          const scrollContainer = document.getElementById('historyMsg');
          scrollContainer.scrollTo({
              top: scrollContainer.scrollHeight,
              left: 0,
              behavior: 'smooth'
          });
    },
    _displayImageMe: function (user, imgData, extension) {
        var container = $('#historyMsg'),
            date = new Date().toTimeString().substr(0, 8);

            var dp = genBlockMessageTypeImage('me','',imgData,date)

        container.append(dp);
      
        const scrollContainer = document.getElementById('historyMsg');
        scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    },
    _displayVoice: function (user, imgData, extension) {
        var container = $('#historyMsg'),
            date = new Date().toTimeString().substr(0, 8);

            var dp = genBlockMessageTypeVoice(user,'',imgData,date)

        container.append(dp);
      
        const scrollContainer = document.getElementById('historyMsg');
        scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    },
    /* _showEmoji: function (msg) {
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
    }, */
    _startRecord: function () {
        navigator.mediaDevices.getUserMedia({
            'audio': true
        }).then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
    
            if (navigator.vibrate) navigator.vibrate(150);
    
            mediaRecorder.ondataavailable = function (event) {
                chunks.push(event.data);
               
            }
    
            mediaRecorder.onstop = function () {
                stream.getTracks().forEach(function (track) {
                    track.stop()
                });
    
                blob = new Blob(chunks,type);
                audioSrc = window.URL.createObjectURL(blob);
               
                audio.src = audioSrc;
    
                chunks = [];
        
            }
    
            startTimer()
    
    
        }).catch(function (error) {
            if (location.protocol != 'https:') {
    
            } else {
    
            }
    
        }); 
    },
    _stopRecord: function () {
       
    },
    _removeRecord: function () {
       
        mediaRecorder.stop();
        
    }
};



function paramAddUserGen4() {
    var dt = SAProjectUser.ProjectUsers[ticker].userImage;
    var src = fileUrl(dt);
    console.log(src);
    $("#profile-logo-user-img").attr('src', src);

}

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
            try {
                res = res.tbl[0].r;
                $("#list-wrap-container").empty();
    
                for (let index = 0; index < res.length; index++) {
                    var nm = res[index].fkGroupId;
    
                    getGroupList(nm)
    
                }
            } catch (error) {
                $("#preloader3").hide();
            }
           
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });

}

function saveMessageToDatabase(fkUserId, isGorup, fkGroupId, body, fileUrl,typeComment) {
    var that = this;
    var json = {};
    if (fkUserId) {
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
    json.typeComment = typeComment;

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
            try {
                arr = res.tbl[0].r;

                for (let index = 0; index < arr.length; index++) {
                    var nm = arr[index].nameGroup;
                    var id = arr[index].id;
                    var isgr = arr[index].isGroup;
                    var crt = arr[index].createdBy

                    var src = fileUrl(arr[index].groupImage);
                    var admn = ''
                    if (crt === ticker) {
                        admn = true
                    }
                    var div = sideBarBlockgen(nm, id, src, isgr, '', admn);
                    $("#list-wrap-container").append(div);

                }
           
            } catch (error) {
              
            }
            $("#preloader3").hide();
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

function sideBarBlockgen(nm, id, isrc, isGroup, count, isadmin) {
    var edit = $("<span>")
    if (isadmin === true) {
        edit.addClass("edit-admin-group-btn")
            .append('<i class="far fa-edit"></i>')
    } else {
        edit.hide();
    }
    var div = $('<div>')
        .addClass("list container-group-item")
        .attr('id', id)
        .attr('data-isGroup', isGroup)
        .append($("<img>")
            .attr('src', isrc))
        .append($("<div>").addClass("info")
            .append('<span class="user">' + nm + '</span>')
            .append('<span class="text"></span>'))
        .append('<span class="time count-message"></span>')
        .append(edit)
    /* 
        div.setAttribute('onclick', 'triggerAPI(this,"21052611563704387613")'); */

    return div

}

function Genblockmessage(data, el) {
    $('#historyMsg').empty();
    /* 
        var usImga = $(el).find('img').attr('src');
        var usNm = $(el).find('.info ').attr('src'); */

    try {
        var mesList = data._table.r;

        for (var index = 0; index < mesList.length; index++) {
             const o = mesList[index];
            if (index < 51) {
                var  typ = o.typeComment
                var bdy = o.body;
                var crtBy = o.createdBy;
                var idMs = o.id;
                var tmie = Utility.convertTime(o.createdTime);
                var url = o.fileUrl;
                var us = SAProjectUser.ProjectUsers[crtBy].userName;
                if (crtBy === global_var.current_ticker_id) {
                    us ='me'
                } 

                var dlv
                 if(typ==='text'){
                    dlv = genBlockMessageTypeText(us,idMs,bdy,tmie);
                 }
                 else if(typ==='image'){
                    dlv = genBlockMessageTypeImage(us,idMs,url,tmie);
                 }
                 else if(typ==='voice'){
                    dlv = genBlockMessageTypeVoice(us,idMs,url,tmie);
                 }
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
    
        $('#historyMsg').append('Söhbət boşdur');
    }
}
function genBlockMessageTypeText(user,id,body,time) {
    var usnm = user
    if(user==='me'){
     usnm ='';
    }
    return $("<div>")
            .addClass('message-list '+user)
            .attr("data-id",id)
            .append($("<div>")
                         .addClass("msg")
                         .append('<div><b>'+usnm+'</b></div>')
                         .append($("<p>")
                                    .text(body)))
            .append($("<div>").addClass("time-block").text(time))
                  
}
function genBlockMessageTypeImage(user,id,url,time) {
     var src = fileUrl(url);
     var usnm = user
     var down = fileUrlPrivate(url)
     if(user==='me'){
      usnm ='';
     }
    return $("<div>")
            .addClass('message-list '+user)
            .attr("data-id",id)
            .append($("<div>")
                         .addClass("msg")
                         .append('<div><b>'+usnm+'</b></div>')
                         .append($("<img>")
                                     .attr("width",'200px')
                                    .attr('src',src))
                         .append($("<a>")
                                     .attr('download',url)
                                    .attr('href',down)
                                    .html('<i class="fas fa-download"></i>'))
                                   
                                    )
            .append($("<div>").addClass("time-block").text(time))
                  
}
function genBlockMessageTypeVoice(user,id,url,time) {
     var src = fileUrl(url);
     var usnm = user
     if(user==='me'){
      usnm ='';
     }
     var down = fileUrlPrivate(url)
    return $("<div>")
            .addClass('message-list '+user)
            .attr("data-id",id)
            .append($("<div>")
                         .addClass("msg")
                         .append('<div><b>'+usnm+'</b></div>')
                         .append($("<audio>")
                                    .attr('src',src)
                                    .attr("download",down)
                                    .attr("controls",'true')))
            .append($("<div>").addClass("time-block").text(time))
                  
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
    var chk = $("#list-wrap-container-user").find("#" + userId);
    if (chk.length > 0) {
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
        relationGroupUserAnd(groupId, k)
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

            var grpId = res.kv.id
            relationGroupUserAnd(grpId, ticker);
            for (let l = 0; l < userId.length; l++) {
                const k = userId[l];
                relationGroupUserAnd(grpId, k)
            }

        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });




})

function relationGroupUserAnd(fkGroupId, userId) {


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
    var nm = $(this).val();
    if (nm.trim().length > 0) {
        var grid = $(this).attr("data-gr-id")
        var lss = {};
        lss.id = grid;
        lss.nameGroup = nm
        be.callApi('21060211225807438849', lss);
        $(".container-group-item#" + grid).find('.info .user').text(nm);
    }


})

$(document).on("click", ".edit-admin-group-btn", function (e) {
    $("#updateGroupChat").modal("show");
    var id = $(this).parents('.container-group-item').attr("id")
    var nm = $(this).parents('.container-group-item').find('span.user').text();
    readRealtionGroupListUser(id);
    $("#updateGroupChat .group-name-update").val(nm).attr("data-gr-id", id);

});

$(document).on("click", ".container-group-item", function (e) {
    $(".container-group-item").removeClass("akitvec");
    $(this).addClass("akitvec");
    var id = $(this).attr('id');
    var isGroup = $(this).attr('data-isGroup');
    $(this).find(".count-message").text("").hide();
    isGroup_chat = isGroup;
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
    $('.-messagecontent header ').find('.chat-logo-image-user').remove();
    $('.-messagecontent header ').prepend($("<img>").addClass('chat-logo-image-user').attr('src', imgd));
    $('#user-header-bolean').text(us);
    genChatMessagesRooms(this, id, isGroup);
    $(".banner-loader").hide();
});

var userList4ticker = {};

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
                var btn = "<button class='btn btn-light btn-sm' data-idl=" + o.id + " onclick='deleteGroupRelation(this)' ><i class='fas fa-trash-alt'></i></button>"

                if (ticker === o.fkAssgineeId) {
                    us += " <span style='color:red'>(Admin)<span>";
                    btn = ''
                } else {}
                $("#groupEditTableList")
                    .append($("<tr>")
                        .append('<td scope="row">' + (i + 1) + '</td>')
                        .append('<td >' + us + '</td>')
                        .append('<td >' + btn + '</td>')
                    )

                $("#gorup-add-user-update").find("[value=" + o.fkAssgineeId + "]").remove();
            }
            $("#gorup-add-user-update").selectpicker("refresh")
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

function deleteGroupRelation(elm) {
    var idl = $(elm).attr("data-idl")

    var lg = {}
    lg.id = idl
    be.callApi("211014130845052610180", lg);
    var groupId = Utility.getParamFromUrl('current_chat_gorup')
    readRealtionGroupListUser(groupId);
}
$(document).on("click", "#deleteGrup3Button", function (e) {

    var groupId = Utility.getParamFromUrl('current_chat_gorup');
    var lg = {}
    lg.id = groupId
    be.callApi("21060210414606582775", lg);
    $("#deleteTwoEtapGrup").hide();
    $("#updateGroupChat").hide();
})

function genRelUserlistCreated() {

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
            list += ll.createdBy + "%IN%"
        }
    } catch (error) {

    }
    try {
        var res1 = be.callApi("21101317470407705547");
        res1 = res1._table.r
        for (let k = 0; k < res1.length; k++) {
            const ll = res1[k];
            list += ll.fkUserId + "%IN%"
        }
    } catch (error) {

    }
    genUserListforIdChatSelf(list)

};


function genChatMessagesRooms(el, ids, isGroup) {
    var dt = {}
    if (isGroup === "0") {
        dt.fkUserId = ids +"%IN%" +ticker;
        dt.createdBy = ids +"%IN%" +ticker;
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
                    if (ticker === o.fkUserId) {

                    } else {
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


function genUserListforIdChatSelf(list) {
    var json = initJSON();
     if(!list){
         return;
     }
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
                    if (ticker === o.fkUserId) {

                    } else {
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

function uploadFile4IpoCoreImportChat(fileext, file_base_64, file_name, id) {
    var pbDiv = $('#' + id).closest('div').find('#progress_bar_new');

    var idx = makeId(10);

    var d = new Object();
    d.file_base_64 = file_base_64;
    d.file_extension = fileext;
    d.file_type = "general";
    d.file_name = file_name;
    conf = JSON.parse('{"kv":{}}');
    conf['kv'] = d;
    conf.kv.cookie = getToken();
    var dat = JSON.stringify(conf);
    var finalname = "";
    $.ajax({
        url: urlGl + "api/post/upload",
        type: "POST",
        data: dat,
        contentType: "application/json",
        async: false,
        beforeSend: function () {
            pbDiv.append('<br>').append($('<span>')
                .attr('id', 'pro_zad_span' + idx)
                .text(file_name)
                .append($('<img>')
                    .attr('id', 'pro_zad_' + idx)
                    .attr('src', 'resource/img/loader.gif'))
            )
        },
        uploadProgress: function (event, position, total, percentComplete) {
            //            console.log('test')
            var percentVal = percentComplete + '%';
            pbDiv.text(percentVal);
        },
        success: function (data) {
            finalname = data.kv.uploaded_file_name;

            $('#pro_zad_' + idx).remove();
            $('#pro_zad_span' + idx)
                .after($('<i class="fa fa-times">')
                    .attr('pid', idx)
                    .attr('onclick', 'removeFilenameFromZad(this,\'' + finalname + '\')'));



            var st = $('#' + id).attr('fname');
            st = (st && st !== 'undefined') ? st : '';
            st += (st) ? global_var.vertical_seperator + finalname :
                finalname;

            $('#' + id).attr('fname', st);
            //importSendNameApiDB(finalname)
        },
        error: function () {}
    });
    return finalname;
}
var timer = $(".vac-dot-audio-record-time");
var seconds = 0;
var minutes = 0;
var tk;
function buildTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            seconds = 0;
        }
    }
    timer.text((minutes < 10 ? "0" + minutes.toString() : minutes) + ":" + (seconds < 10 ? "0" + seconds.toString() : seconds));
}

function stopTimer() {
   
    seconds = 0;
    minutes = 0;
    clearInterval(tk);
   
}

function startTimer() {
    seconds = 0;
    minutes = 0;
    timer = $(".vac-dot-audio-record-time");
    clearInterval(tk);
    tk = setInterval(buildTimer, 1000);

}

if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
}


if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constrains) {
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constrains, resolve, reject);
        });
    }
}



/// chat >>>>>

$(document).on('click', '.for-chewekk-new-chat-link', function () {
    var div = $(".component-class#21041212141705702084 >.component-section-row ");
    var f = $(this).attr("data-link")
    /*   $.get("resource/chat/public/index.html", function (html_string) {
     $(div).html(html_string);
     
     sidebarGeneratecomment();
     
     
     }); */

    window.open('chat.html?current_modal=chat&current_ticker_id=' + global_var.current_ticker_id, '_blank');


})

$(document).on("keypress", "#text-message-input", function (e) {
    if (e.which == 13) {

        var txt = $(this).text();
        var today = new Date();

        if (txt.trim().length > 0) {


            var dp = document.createElement('div');
            dp.classList.add('message-list');
            dp.classList.add('me');

            var txDiv = document.createElement('div');

            txDiv.classList.add('msg');
            var pd = document.createElement('p');

            pd.innerHTML = txt;
            txDiv.appendChild(pd)

            var tm = document.createElement('div');

            tm.innerHTML = today;

            dp.appendChild(txDiv);
            dp.appendChild(tm);


            $('#message-wrap-chat').append(dp);


            const scrollContainer = document.getElementById('message-wrap-chat');
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
            triggerAPI(this, '21052614480303666321')
        }


    }
})

function sideBarFirstClick(data) {

    $('#list-wrap-container .container-group-item').first().click();

}

function sidebarGeneratecomment() {
    var arr = be.callApi('21052514335607055154');

    arr = arr._table.r;
    $("#list-wrap-container").empty();
    for (let index = 0; index < arr.length; index++) {
        var nm = arr[index].nameGroup;
        var id = arr[index].id;
        var src = fileUrl(arr[index].groupImage);
        sideBarBlockgen(nm, id, src);


    }
}

function sideBarBlockgen(nm, id, isrc) {
    var div = document.createElement('div');
    div.classList.add('list');
    div.classList.add('container-group-item');
    div.setAttribute('id', id);/* 
     div.setAttribute('onclick', 'triggerAPI(this,"21052611563704387613")'); */

    var img = document.createElement('img');
    img.setAttribute('src', isrc);

    var subDiv = document.createElement('div');
    subDiv.classList.add('info');
    var spn1 = document.createElement('span');
    spn1.classList.add('user');
    spn1.innerText = nm;
    var spn2 = document.createElement('span');
    spn2.classList.add('text');
    spn2.innerText = "";
    subDiv.appendChild(spn1);
    subDiv.appendChild(spn2);

    var spn3 = document.createElement('span');
    spn3.classList.add('time');
    spn3.innerText = "1 saat";

    div.appendChild(img);
    div.appendChild(subDiv);
    div.appendChild(spn3);

    $("#list-wrap-container").append(div);
}

function Genblockmessage(data, el) {
    $('#historyMsg').empty();
    var usImga = $(el).find('img').attr('src');
    var usNm = $(el).find('.info ').attr('src');

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

    var ls = {};
    ls.groupImage = logo;
    ls.nameGroup = name;
    ls.fkUserId = userId;
    be.callApi('21100815312700281008', ls);
    $("#addUserChat").modal("hide");
    sidebarGeneratecomment();
    $("#list-wrap-container").find(".container-group-item").first("click")
})


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
}
)

$(document).on("click", ".container-group-item", function (e) {
    $(".container-group-item").removeClass("akitvec");
    $(this).addClass("akitvec");
    var id = $(this).attr('id');
    Utility.addParamToUrl("current_chat_gorup", id)
    var imgd = $(this).find('img').attr('src');
    var us = $(this).find('span.user').text();

    $('.-messagecontent').attr('id', id);
    $('.-messagecontent header img').attr('src', imgd);
    $('#user-header-bolean').text(us);
    genChatMessagesRooms(this, id)
})

function genChatMessagesRooms(el, ids) {
    var dt = {}
    dt.fkGroupId = ids
    var els = be.callApi("21052615190704745176", dt);
    Genblockmessage(els, el)
}