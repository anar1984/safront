
function loadDocEditorRunService() {
    $('#project_list_for_export').selectpicker('refresh');
    $('#backlog_list_for_export').selectpicker('refresh');
    $('#run_service_intensive_select').selectpicker('refresh');
    $('#run_service_repeat_select').selectpicker('refresh');
    $('#run_service_status_select').selectpicker('refresh');
    $('#run_service_weekday_select').selectpicker('refresh');
    $('#sdofm_day_of_Month_select').selectpicker('refresh');
    $('#swofm_fl_action_select').selectpicker('refresh');
    $('#swofm_weekday_select').selectpicker('refresh');

    $( "#runServiceStartDate" ).daterangepicker({
        singleDatePicker: true
    });
    $( "#runServiceEndDate" ).daterangepicker({
        singleDatePicker: true
    }); 
    $('#runServiceTime').datetimepicker({
        format: 'HH:mm'
        // sideBySide: true
    });
    $('#runServiceExecutiveDate').daterangepicker({
        singleDatePicker: true
    });
    $('.hr_spa').hide();
}

// function run_business_intensive() {
  
//     }
$(document).on("change", "#run_service_intensive_select", function (e) {
    var run_intensive = $('#run_service_intensive_select').val();
    run_action = run_intensive;
    switch (run_action) {
            case 'weekly':
                run_enabled = 'run-enabled';
            break;
            case 'monthly':
                run_enabled = 'run-enabled';
            break;
            case 'Yearly':
                run_enabled = 'run-enabled';
            break;
        }
        if (run_enabled){
            $('.run-intensive').removeClass('run-enabled');
            $('.' + run_intensive + '-actions').addClass(run_enabled);
        }
});

$(document).on("change", ".checkcontainer.spa input[type='radio']", function (e) {
    if($('#specific-day-of-month').is(':checked')) {
        $('.run_spa').removeClass('spa_enable');
        $('.hr_spa').hide();
        $('.hr_spa').show();
        $('.spa_sdofm_day_of_Month_select').addClass('spa_enable');
    }
    if($('#before-last-fay-of-month').is(':checked')) {
        $('.run_spa').removeClass('spa_enable');
        $('.hr_spa').hide();
        $('.hr_spa').show();
        $('.spa_days_before_last_day_of_month').addClass('spa_enable');
    }
    if($('#specific-weekday-of-month').is(':checked')) {
        $('.run_spa').removeClass('spa_enable');
        $('.hr_spa').hide();
        $('.hr_spa').show();
        $('.spa_swofm_fl_action_select').addClass('spa_enable');
        $('.spa_swofm_weekday_select').addClass('spa_enable');
    }
});