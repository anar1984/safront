const development = (function () {
    const event_builder = function () {
        $(document).on('change', '.dev-5', function (ev) {
            update_story_card(this);
        })

        $(document).on('click', '.tr-g-5', function (ev) {
            runApiOnStoryCard(this);
        })
    }

    const api_change_event = el=>{
        var data={};
        data.id = $(el).val();
        if (!data.id) return;
        callApi("22091522331706739676",data,true,res=>{
            $('select.dev-5').selectpicker('val',res.kv.id);
        })
    }

    const update_story_card = el=>{
        var data = {};
        data.id = Utility.getParamFromUrl("current_backlog_id");
        data.fkStoryCardId  = $('select.dev-5').val();

        if (!data.id || !data.fkStoryCardId){
            Toaster.showError("Story Card yoxdur.")
            return;
        }

        callApi('22091518414201731890',data)
    }

    const load_story_card_list = ()=>{
        var pr_id = Utility.getParamFromUrl("current_project_id");
        if (!pr_id){ return}
    
        var slc = $('.dev-5');
        slc.html('<option/>')
        callApi('220915172131013610261',{fkProjectId:pr_id},true,res=>{
             res.tbl[0].r.map(o=>{
                slc.append(`<option value='${o.id}'>${o.backlogName}</option>`);
             })
             slc.selectpicker('refresh');
        })
    }
 

    const loader = data=>{
        load_story_card_list();
    }

    return (Object.freeze || Object)({
        init: function init() {
            event_builder();
        },
        load:function(data){
            loader(data);
        }


    });
}());


development.init();











