
function loadDocEditorRunService() {

    $( "#runServiceStartDate" ).daterangepicker({
        singleDatePicker: true
    });
    $( "#runServiceEndDate" ).daterangepicker({
        singleDatePicker: true
    }); 
    $('#runServiceTime').datetimepicker({
        format: 'HH:mm'
    });
}
