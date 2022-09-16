var historyDataTable = $('#historyDataTable').DataTable(
    {
        "ajax": {"url": "/allHistory", "dataSrc": ""},
        "columns": [
            {'data': 'user'},
            {'data': "model"},
            {'data': 'old', 'render': function (old) {
                var json = JSON.stringify(old)
                return  json
            }},
            {'data': "new", 'render': function (old) {
                var json = JSON.stringify(old)
                return  json
            }},
        ]
    }
)