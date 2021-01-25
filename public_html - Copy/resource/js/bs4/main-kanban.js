$(document).ready(function () {

    try {
        $('.content-drag').arrangeable()
    } catch (e) {
    }

    let buller = true
    $(document).on("click", ".column-header-edit", function (e) {


        if (buller) {
            $(this).parent().find(".header-choose").css("display", "block")
            $(this).css("background", "rgb(37, 56, 88)")
            $(this).css("color", "White")

            buller = false
        } else {
            $(this).parent().find(".header-choose").css("display", "none")
            $(this).css("background", "rgb(128,128,128,0.3)")
            $(this).css("color", "")
            buller = true
        }


    })
    $(document).on("click", ".Content-delete", function (e) {
        $(this).parent().parent().parent().remove()

    })
    $(document).on("click", ".content-header-edit", function (e) {


        if (buller) {
            $(this).parent().find(".header-choose").css("display", "block")
            $(this).css("background", "rgb(37, 56, 88)")
            $(this).css("color", "White")

            buller = false
        } else {
            $(this).parent().find(".header-choose").css("display", "none")
            $(this).css("background", "rgb(128,128,128,0.3)")
            $(this).css("color", "")
            buller = true
        }


    })



// content add
    $(document).on("click", ".CardContentAdd", function (e) {

        $(this).parent().find(".miniStoryCard").toggle().css("display", "block")
    })



    $(document).on("click", "#DeleteStory", function (e) {

        $(this).parent().css("display", "none")
        $(this).parent().find(".miniStoryInput").val("");
    })

    function getCardTask(StoryInputVal) {
        return $("<div>")
                .addClass("task-content content-drag")
                .append($("<div>")
                        .addClass("task-content-header")
                        .append($("<div>")
                                .addClass("ContentText")
                                .append($('<span class="isFromCustomer "></span>')
                                        .append($('<a href="#" onclick="new UserStory().redirectToDetailedView( o.id )" class="headerContentText"> </a>')
                                                .text(StoryInputVal))))
                        .append($("<div>")
                                .addClass("content-header-edit ")
                                .append($('<i class="fas fa-ellipsis-h"></i>')))
                        .append($("<div>").addClass("Column header-choose")
                                .append($("<div>")
                                        .addClass("col-12 choosebtn Content-delete")
                                        .append($('<span class=" Column-Delete">Delete</span>')))))
                .append($("<div>").addClass("taskContentBody")
                        .append($('<span class="backlog-status"></span>').append($('<div class="us-list-item"></div>')))
                        .append($('<span class="us-list-item us-priority"></span>').append(' '))
                        .append($('<span class="us-list-item   us-item-executor"></span>'))
                        .append($('<span class="us-list-item   us-item-date"></span>'))
                        .append($('<span class="us-list-item   us-item-date"></span>'))
                        .append('&nbsp;<i href="#" class="fa fa-info-circle" data-toggle="modal" data-target="#backlogTaskInfoModal" title="User Story Task Info" \n\
                      style="cursor:pointer;color:#33adff;" onclick="new UserStory().backlogTaskInfoModal(\ \)"></i>'))


    }

    $(document).on("click", "#AcceptStory", function (e) {

        let StoryInputVal = $(this).parent().find(".miniStoryInput").val()

        if (StoryInputVal.trim().length > 0) {
            $(this).parent().parent().find(".task-column-body").append(getCardTask(StoryInputVal))
            $(this).parent().css("display", "none")
            $(this).parent().find(".miniStoryInput").val("");
            try {
                $('.content-drag').arrangeable()
            } catch (er) {
            }
        }
    })



    
    $(document).on("dblclick", ".ContentText, .ContentTextTaskMgmt", function (e) {
        var id = $(this).attr('pid');
        $(this).parent().find(".StoryCardPanel").css("display", "block");
        callStoryCard(id);
    })




    $(document).on("click", ".ContentTextWithVersion", function (e) {
        var backlogId = $(this).attr('backlogId');
        var labelId = $(this).attr('labelId');

        $(this).parent().find(".StoryCardPanel").css("display", "block")

        $.get("resource/child/storycard.html", function (html_string)
        {
            if (!backlogId || backlogId === '-1') {
                return;
            }
            $('#smb-details-generalview-us-story-mgmt').html(html_string); // this is not Working
            var storyCard = getPopup(html_string);
            $("#body_of_nature").append(storyCard);
            global_var.current_backlog_id = backlogId;
            new UserStory().toggleSubmenuStoryCard();

            $('.history_show-hide').click();
            $('#change-mgmt-gui-design-label-list').val(labelId);
            $('#change-mgmt-gui-design-label-list').change();
        });
    })

    $(document).on("click", ".card-UserStory-edit-exit", function (e) {
        $(document).find(".StoryCardPanel").remove();
        new UserStory().setUSLists4KanbanView();

    })


//textarea scrol none

    function auto_grow(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    function updateOnKanbanDrag(sourcedUSId, relatedUSId, zoneStatus) {
        sourcedUSId = $(this).attr("id")
        zoneStatus = $(this).parent().attr("id")
        relatedUSId = $(this).parent().attr("id")


    }
// category 
    $(document).on("click", ".assigne", function () {
        global_var.task_mgmt_group_by = 'assigne';
        Utility.addParamToUrl('task_mgmt_group_by', global_var.task_mgmt_group_by);


        $(".categorybtn").empty()
        $(".categorybtn").append('<span class="category" >Assigne</span>');
        $(".column-body-none").css("display", "none")
        $(".groupByUserstory").css("display", "block")
    })
    $(document).on("click", ".none", function () {
        global_var.task_mgmt_group_by = 'none';
        Utility.addParamToUrl('task_mgmt_group_by', global_var.task_mgmt_group_by);

        $(".categorybtn").empty()
        $(".categorybtn").append('<span class="category" >None</span>')
        $(".column-body-none").css("display", "")
        $(".groupByUserstory").css("display", "none")
    })
    $(document).on("click", ".userStory", function () {
        global_var.task_mgmt_group_by = 'userStory';
        Utility.addParamToUrl('task_mgmt_group_by', global_var.task_mgmt_group_by);

        $(".categorybtn").empty()
        $(".categorybtn").append('<span class="category" >User Story</span>')
        $(".column-body-none").css("display", "none")
        $(".groupByUserstory").css("display", "block")
    })


})

function showStoryCardIn(id,elId) {
    var divId = (elId)? elId : "body_of_nature";

    $.get("resource/child/storycard.html", function (html_string)
    {
        if (!id || id === '-1') {
            return;
        }
        $('#smb-details-generalview-us-story-mgmt').html(html_string); // this is not Working
        var storyCard = html_string;
        $("#"+divId).html(storyCard);
        global_var.current_backlog_id = id;
        new UserStory().toggleSubmenuStoryCard();
        loadUsersAsOwner();
        setStoryCardOwner();
    });
}

function callStoryCard(id,elId,backlogName) {
    var divId = (elId)? elId : "body_of_nature";
    $('#storyCardViewManualModal-body').html(''); //alternative backlog modal oldugu ucun ID-ler tekrarlarni

    $.get("resource/child/storycard.html", function (html_string)
    {
        if (!id || id === '-1') {
            return;
        }
        $('#smb-details-generalview-us-story-mgmt').html(html_string); // this is not Working
        var storyCard = getPopup(html_string);
        $("#"+divId).append(storyCard);
        global_var.current_backlog_id = id;
        new UserStory().toggleSubmenuStoryCard();
        loadUsersAsOwner();
        setStoryCardOwner();
    });
}

// content header text addd
    function getPopup(arg) {
        return $("<div>")
                .addClass("StoryCardPanel")
                .append($("<div>")
                        .addClass("storyBackGround")
                        .css("z-index","1001")
                        .append($("<div>")
                                .addClass("Card-story")
                                .append($("<div>")
                                        .append($("<header>")).addClass('Story-card-Header')
                                        .append($('<div class="card-UserStory-name">')
                                                .append($('<span>')))
                                        .append($('<div class="card-UserStory-edit">')
                                                .append($('<div class="card-UserStory-edit-exit">')
                                                        .append($('<i class="fas fa-times"></i>')))))
                                .append($("<div>")
                                        .addClass("Card-story-body")
                                        .html((arg))))
                        )
    }
