const ExportImportTool = (function () {
    const event_builder = function () {
        $(document).on('change', 'select.ei-db-list', function (ev) {
            load_table_list(this);
        })

        $(document).on('click', '.ei-export-btn', function (ev) {
            export_tables(this);
        })

        $(document).on('click', '.ei-import-btn', function (ev) {
            run_import_sql(this);
        })

        $(document).on('click', '.ei-deploy-release-btn', function () {
            deploy_release_action(this);
        })


    }

    const deploy_release_action = function () {
        var data = {};
        data.fkDeployReleaseId = $('.ie-deploy-release-list').val();

        if (!data.fkDeployReleaseId) {
            return;
        }
        callApi("22052712284901276187", data, true, function (res) {
            var urlJava = urlGl + "api/get/deploy/" + res.kv.java_zip_file;
            var urlCommon = urlGl + "api/get/deploy/" + res.kv.common_zip_file;
            var urlEntity = urlGl + "api/get/deploy/" + res.kv.entity_zip_file;
            var urlDb = urlGl + "api/get/deploy/" + res.kv.db_structure_zip_file;

            if (res.kv.common_zip_file)
                $('.hoye').html(`<a href='${urlCommon}' target='_blank'>${res.kv.common_zip_file}</a><br>`);

            if (res.kv.java_zip_file)
                $('.hoye').append(`<a href='${urlJava}' target='_blank'>${res.kv.java_zip_file}</a><br>`)

            if (res.kv.entity_zip_file)
                $('.hoye').append(`<a href='${urlEntity}' target='_blank'>${res.kv.entity_zip_file}</a><br>`)

            if (res.kv.db_structure_zip_file)
                $('.hoye').append(`<a href='${urlDb}' target='_blank'>${res.kv.db_structure_zip_file}</a><br>`)



        });
    }

    const run_import_sql = function (el) {
        var data = {};
        data.importSql = $('.ei-import-sql').is(":checked") ? "1" : "";
        data.importEntity = $('.ei-import-entity').is(":checked") ? "1" : "";
        data.importFolder = $('.ei-import-folder').is(":checked") ? "1" : "";
        callService("serviceIoImportAndRunScripts", data, true, function (res) {
            alert(JSON.stringify(res))
        });
    }

    const export_tables = function (el) {
        var table_id = $('select.ei-table-list').val();

        if (!table_id){ Toaster.showError("Tables are not selected.")}
        
        table_id = table_id.toString().replace(/,/g, '|');
        var data = {};
        data.fkTableId = table_id;
        data.tableStructure = $('.ei-only-table-sctructure').is(":checked") ? "1" : "";
        data.tableHistory = $('.ei-only-table-history').is(":checked") ? "1" : "";
        data.tableData = $('.ei-only-table-data').is(":checked") ? "1" : "";

        $('.hoxe').html('In Progress');
        callApi('22051711163103472938', data, true, function (res) {
            var urlCommon = urlGl + "api/get/deploy/" + res.kv.db_structure;

            if (res.kv.db_structure)
                $('.hoxe').html(`<a href='${urlCommon}' target='_blank'>${res.kv.db_structure}</a><br>`);
        })
    }

    const load_table_list = function (el) {
        var fkDbId = $(el).val();
        if (!fkDbId) return;

        var select = $('select.ei-table-list');
        select.html('')

        callApi('22051710561008812400', { fkDbId: fkDbId }, true, function (res) {
            (!res.tbl) ? "" : res.tbl[0].r.map(function (o) {
                select.append(`<option value='${o.id}'>${o.tableName}</option>`)
            })
            select.attr('multiple', true)
            select.selectpicker('refresh');

        })
    }

    const html = () => `
                        <div class='col-lg-4'>
                            <label>Action</label>
                            <select class='form-control eventdesc-eventtype'>
                            </select>
                        </div>     
                        <div class='col-lg-8'>
                            <label>Descripion</label>
                            <textarea class='form-control eventdesc-eventdesc' rows=3></textarea>
                        </div>       
                    `;


    const load = function () {
        load_db_list();
        load_deploy_release_list();
    }

    const load_deploy_release_list = function () {
        var select = $('select.ie-deploy-release-list');
        select.html('');
        callApi('22052111302105571050', {}, true, function (res) {
            (!res.tbl) ? "" : res.tbl[0].r.map(function (o) {
                select.append(`<option value='${o.id}'>${o.releaseName + "(" + o.releaseDate + ")"}</option>`)
            })
        })
    };

    const load_db_list = function () {
        var select = $('select.ei-db-list');
        select.html('<option><option>')
        callApi('22051710464405364686', null, true, function (res) {
            (!res.tbl) ? "" : res.tbl[0].r.map(function (o) {
                select.append(`<option value='${o.id}'>${o.dbName}</option>`)
            })
        })

    }


    return (Object.freeze || Object)({
        init: function init_() {
            event_builder();
        },
        loader: function loader_() {
            load();
        }



    });

}());