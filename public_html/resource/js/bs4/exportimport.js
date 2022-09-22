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

        $(document).on('change', 'select.ei-project-gui-list', function () {
            load_story_card_by_project(this);
        })

        $(document).on('change', 'select.ei-project-api-list', function () {
            load_api_by_project(this);
        })

        $(document).on('click', '.ei-primary-gui-list', function () {
            deploy_by_storycards(this);
        })

        $(document).on('click', '.ei-primary-api-list', function () {
            deploy_by_api(this);
        })

    }

    const deploy_by_api = function (el) {
        var fkApiId = $('select.ei-storycard-api-list').val();
        fkApiId = fkApiId.toString();
        fkApiId = fkApiId.replace(/,/g, "|");


        if (!fkApiId) return;

        var select = $('.ei-span-api-list');
        select.text('in progress');

        callApi('22071510323200509813', { fkApiId: fkApiId }, true, function (res) {
            select.text('Folder Name:' + res.kv.folderName);
        })
    }

    const deploy_by_storycards = function (el) {
        var storycard = $('select.ei-storycard-gui-list').val();
        storycard = storycard.toString();
        storycard = storycard.replace(/,/g, "|");


        if (!storycard) return;

        var select = $('.ei-span-gui-list');
        select.text('in progress');

        callApi('22071504522800394004', { fkStoryCardId: storycard }, true, function (res) {
            select.text('Folder Name:' + res.kv.folderName);
        })
    }

    const load_api_by_project = function (el) {
        var fkProjectId = $(el).val();
        if (!fkProjectId) return;

        var select = $('select.ei-storycard-api-list');
        select.html('')

        callApi('22071616271502924994', { fkProjectId: fkProjectId }, true, function (res) {
            res.tbl[0].r.map(function (o) {
                var ln = `<option value='${o.id}'>${o.backlogName}</option>`;
                select.append(ln);
            })
            select.attr('multiple', "true")
            select.selectpicker('refresh');
        })
    }

    const load_story_card_by_project = function (el) {
        var fkProjectId = $(el).val();
        if (!fkProjectId) return;

        var select = $('select.ei-storycard-gui-list');
        select.html('')

        callApi('22030400352507334738', { fkProjectId: fkProjectId }, true, function (res) {
            res.tbl[0].r.map(function (o) {
                var ln = `<option value='${o.id}'>${o.backlogName}</option>`;
                select.append(ln);
            })
            select.attr('multiple', "true")
            select.selectpicker('refresh');
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

        if (!table_id) { Toaster.showError("Tables are not selected.") }

        table_id = table_id.toString().replace(/,/g, '|');
        var data = {};
        data.fkTableId = table_id;
        data.tableStructure = $('.ei-only-table-sctructure').is(":checked") ? "1" : "";
        data.tableHistory = $('.ei-only-table-history').is(":checked") ? "1" : "";
        data.tableData = $('.ei-only-table-data').is(":checked") ? "1" : "";
        data.fromDate = toDate('ei-from-date-list');
        data.toDate = toDate('ei-to-date-list');


        $('.hoxe').html('In Progress');
        callApi('22051711163103472938', data, true, function (res) {
            var urlCommon = urlGl + "api/get/deploy/" + res.kv.db_structure;

            $.get(urlCommon, function (data) {
                $(".ei-sql-query").text(data);

            });

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
        load_project_list();
    }

    const load_project_list = function () {
        var select = $("select.ei-project-gui-list");
        var select1 = $("select.ei-project-api-list");

        select.html('<option></option>');
        select1.html('<option></option>');


        callApi("22071615512005378995", {}, true, function (res) {
            res.tbl[0].r.map(function (o) {
                var ln = `<option value='${o.id}'>${o.projectName}</option>`;

                select.append(ln);
                select1.append(ln);

            })

            select.selectpicker('refresh');
            select1.selectpicker('refresh');

        })
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