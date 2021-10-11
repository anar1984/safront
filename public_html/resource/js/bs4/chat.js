window.onload = function() {
    var ticker = Utility.getParamFromUrl('current_ticker_id')
    global_var.current_ticker_id =ticker;
    global_var.current_project_id = '210102102810037910965'
    getProjectUserssync('210102102810037910965');
    getProjectUsersForElById(global_var.current_project_id, $("#userListChatSelect"))
    sidebarGeneratecomment();
    var saChat = new SAChat();
    saChat.init();
    
};
var SAChat = function() {
    this.socket = null;
};

SAChat.prototype = { 
    init: function() {
        var that = this;
        
        this.socket = io.connect();
        this.socket.on('connect', function() {
          /*   document.getElementById('info').textContent = 'Ad Daxil et';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus(); */
           
            that.socket.emit('login', global_var.current_ticker_id);
        });
        this.socket.on('nickExisted', function() {
            Toaster.showError(('Bu istifadəçi hal hazırda aktivdir zəhmət olmasa çıxış edin'));
            document.getElementById('info').textContent = '!nickname is taken, choose another pls';
        });
        this.socket.on('loginSuccess', function() {
            document.title = 'Cheweek Chat  ' ;
            document.getElementById('loginWrapper').style.display = 'none';
            document.getElementById('messageInput').focus();
        });
        this.socket.on('error', function(err) {
            if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '!fail to connect :(';
            } else {
                document.getElementById('info').textContent = '!fail to connect :(';
            }
        });
        this.socket.on('system', function(nickName, userCount, type) {
           
            var us =''
            try {
                us = SAProjectUser.ProjectUsers[nickName].userName; 
            } catch (error) {
               us='NaMəlum' 
            }
            var msg = us + (type == 'login' ? ' Daxil Oldu' : ' Tərk etdi');
            that._displayNewMsg('Cheweek Admin', msg, 'red');
            document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
        });
        this.socket.on('newMsg', function(user, msg, color) {
            var us =''
            try {
                us = SAProjectUser.ProjectUsers[user].userName; 
            } catch (error) {
               us='NaMəlum' 
            }
            that._displayNewMsg(us, msg, color);
        });
        this.socket.on('newImg', function(user, img, color) {
            
            var us =''
            try {
                us = SAProjectUser.ProjectUsers[user].userName; 
            } catch (error) {
               us='NaMəlum' 
            }
            that._displayImage(us, img, color);
        });
      /*   document.getElementById('loginBtn').addEventListener('click', function() {
            var nickName = document.getElementById('nicknameInput').value;
            if (nickName.trim().length != 0) {
                that.socket.emit('login', nickName);
            } else {
                document.getElementById('nicknameInput').focus();
            };
        }, false);
      document.getElementById('nicknameInput').addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                var nickName = document.getElementById('nicknameInput').value;
                if (nickName.trim().length != 0) {
                    that.socket.emit('login', nickName);
                };
            };
        }, false); */
        document.getElementById('sendBtn').addEventListener('click', function() {
            var messageInput = document.getElementById('messageInput'),
                groupId =  Utility.getParamFromUrl('current_chat_gorup'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
            messageInput.value = '';
            messageInput.focus();
            if (msg.trim().length != 0) {
                that.socket.emit('postMsg',fkUserID,fkGroupId, msg, color);
                that._displayNewMsgMe('me', msg, color);
                var msgData = {};
                msgData.body =msg;
                msgData.fkGroupId =groupId;
                msgData.fkUserId =groupId;
                //msgData.fileUrl =msg;
                be.callApi('21052614480303666321',msgData);
                return;
            };
            
        }, false);
        document.getElementById('messageInput').addEventListener('keyup', function(e) {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
            if (e.keyCode == 13 && msg.trim().length != 0) {
                messageInput.value = '';
                that.socket.emit('postMsg', msg, color);
                that._displayNewMsgMe('me', msg, color);
                var msgData = {};
                var grpId = document.querySelector('.-messagecontent');
                grpId = grpId.getAttribute("id");
                 msgData.fkGroupId =grpId;
                //msgData.fileUrl =msg;
                be.callApi('21052614480303666321',msgData);
            };
            
        }, false);
       /*  document.getElementById('clearBtn').addEventListener('click', function() {
            document.getElementById('historyMsg').innerHTML = '';
        }, false) */
        document.getElementById('sendImage').addEventListener('change', function() {
            if (this.files.length != 0) {
                var file = this.files[0],
                    reader = new FileReader(),
                    color = document.getElementById('colorStyle').value;
                if (!reader) {
                    that._displayNewMsg('system', '!your browser doesn\'t support fileReader', 'red');
                    this.value = '';
                    return;
                };
                reader.onload = function(e) {
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
              msgData.fkGroupId =grpId;
              msgData.fileUrl =msg;
              be.callApi('21052614480303666321',msgData);
        }, false);
        this._initialEmoji();
        document.getElementById('emoji').addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            emojiwrapper.style.display = 'block';
            e.stopPropagation();
        }, false);
        document.body.addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            if (e.target != emojiwrapper) {
                emojiwrapper.style.display = 'none';
            };
        });
        document.getElementById('emojiWrapper').addEventListener('click', function(e) {
            var target = e.target;
            if (target.nodeName.toLowerCase() == 'img') {
                var messageInput = document.getElementById('messageInput');
                messageInput.focus();
                messageInput.value = messageInput.value + '[emoji:' + target.title + ']';
            };
        }, false);
    },
    _initialEmoji: function() {
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
    _displayNewMsg: function(user, msgt, color) {
        
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

                 imgUs.innerText=user;
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
    _displayNewMsgMe: function(user, msg, color) {
        
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
    _displayImage: function(user, imgData, color) {
        var container = document.getElementById('historyMsg'),
            msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8);
        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span> <br/>' + '<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>';
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
    _showEmoji: function(msg) {
        var match, result = msg,
            reg = /\[emoji:\d+\]/g,
            emojiIndex,
            totalEmojiNum = document.getElementById('emojiWrapper').children.length;
        while (match = reg.exec(msg)) {
            emojiIndex = match[0].slice(7, -1);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="resource/content/emoji/' + emojiIndex + '.gif" />');//todo:fix this in chrome it will cause a new request for the image
            };
        };
        return result;
    }
};
