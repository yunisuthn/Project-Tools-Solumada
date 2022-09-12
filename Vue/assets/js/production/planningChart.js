

google.load('visualization', '1', {
    packages: ['controls']
});
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
    var dashboard = new google.visualization.Dashboard(
    document.getElementById('dashboard'));

    var control = new google.visualization.ControlWrapper({
        'controlType': 'ChartRangeFilter',
            'containerId': 'control',
            'options': {
            // Filter by the date axis.
            'filterColumnIndex': 1,
                'ui': {
                'chartType': 'LineChart',
                    'chartOptions': {
                    'width': 985,
                        'height': 70,
                        'chartArea': {
                        width: '80%', // make sure this is the same for the chart and control so the axes align right
                        height: '80%'
                    },
                        'hAxis': {
                        'baselineColor': 'none'
                    }
                },
                // Display a single series that shows the closing value of the stock.
                // Thus, this view has two columns: the date (axis) and the stock value (line series).
                'chartView': {
                    'columns': [1, 2]
                }
            }
        },
        // Initial range: 2012-02-09 to 2012-03-20.
        //'state': {'range': {'start': new Date(1380740460000), 'end': new Date(1380740480000)}}
    });

    var chart = new google.visualization.ChartWrapper({
        'chartType': 'Timeline',
            'containerId': 'chart',
            'options': {
            'width': 900,
                'height': 600,
                'chartArea': {
                width: '80%', // make sure this is the same for the chart and control so the axes align right
                height: '80%'
            },
                'backgroundColor': '#ffd'
        },
            'view': {
            'columns': [0, 1, 2]
        }

    });

    var data = new google.visualization.DataTable();
    data.addColumn({
        type: 'string',
        id: 'TestAction'
    });

    data.addColumn({
        type: 'date',
        id: 'Start'
    });
    data.addColumn({
        type: 'date',
        id: 'End'
    });
    data.addRows([
        ['MO Call', new Date(2013, 10, 2, 12, 0, 25, 0), new Date(2013, 10, 2, 12, 1, 0, 0)],

        ['MO Call', new Date(2013, 10, 2, 12, 1, 20, 0), new Date(2013, 10, 2, 12, 1, 40, 0)],

        ['MO Call', new Date(2013, 10, 2, 12, 2, 20, 0), new Date(2013, 10, 2, 12, 2, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 3, 15, 0), new Date(2013, 10, 2, 12, 4, 0, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 4, 20, 0), new Date(2013, 10, 2, 12, 4, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 5, 20, 0), new Date(2013, 10, 2, 12, 6, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 7, 10, 0), new Date(2013, 10, 2, 12, 7, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 8, 20, 0), new Date(2013, 10, 2, 12, 9, 40, 0)],



        ['MO Call', new Date(2013, 10, 2, 12, 21, 20, 0), new Date(2013, 10, 2, 12, 22, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 23, 15, 0), new Date(2013, 10, 2, 12, 24, 0, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 24, 20, 0), new Date(2013, 10, 2, 12, 24, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 25, 20, 0), new Date(2013, 10, 2, 12, 26, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 27, 10, 0), new Date(2013, 10, 2, 12, 27, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 28, 20, 0), new Date(2013, 10, 2, 12, 29, 40, 0)],

        ['MO Call', new Date(2013, 10, 2, 12, 30, 15, 0), new Date(2013, 10, 2, 12, 31, 0, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 32, 20, 0), new Date(2013, 10, 2, 12, 33, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 34, 20, 0), new Date(2013, 10, 2, 12, 36, 0, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 37, 10, 0), new Date(2013, 10, 2, 12, 38, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 39, 20, 0), new Date(2013, 10, 2, 12, 40, 40, 0)],

        ['Youtube', new Date(2013, 10, 2, 12, 21, 20, 0), new Date(2013, 10, 2, 12, 22, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 23, 15, 0), new Date(2013, 10, 2, 12, 24, 0, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 24, 20, 0), new Date(2013, 10, 2, 12, 24, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 25, 20, 0), new Date(2013, 10, 2, 12, 26, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 27, 10, 0), new Date(2013, 10, 2, 12, 27, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 28, 20, 0), new Date(2013, 10, 2, 12, 29, 40, 0)],

        ['Youtube', new Date(2013, 10, 2, 12, 42, 20, 0), new Date(2013, 10, 2, 12, 42, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 43, 15, 0), new Date(2013, 10, 2, 12, 44, 0, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 44, 20, 0), new Date(2013, 10, 2, 12, 44, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 45, 20, 0), new Date(2013, 10, 2, 12, 46, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 47, 10, 0), new Date(2013, 10, 2, 12, 47, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 48, 20, 0), new Date(2013, 10, 2, 12, 49, 40, 0)],

        ['MO Call', new Date(2013, 10, 2, 12, 50, 15, 0), new Date(2013, 10, 2, 12, 51, 0, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 52, 20, 0), new Date(2013, 10, 2, 12, 53, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 54, 20, 0), new Date(2013, 10, 2, 12, 56, 0, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 57, 10, 0), new Date(2013, 10, 2, 12, 58, 40, 0)],
        ['MO Call', new Date(2013, 10, 2, 12, 59, 20, 0), new Date(2013, 10, 2, 12, 59, 50, 0)],

        ['Browser', new Date(2013, 10, 2, 13, 1, 20, 0), new Date(2013, 10, 2, 13, 1, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 13, 3, 15, 0), new Date(2013, 10, 2, 13, 4, 0, 0)],
        ['Browser', new Date(2013, 10, 2, 13, 4, 20, 0), new Date(2013, 10, 2, 13, 4, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 13, 5, 20, 0), new Date(2013, 10, 2, 13, 6, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 13, 7, 10, 0), new Date(2013, 10, 2, 13, 7, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 13, 8, 20, 0), new Date(2013, 10, 2, 13, 9, 40, 0)],

        ['Browser', new Date(2013, 10, 2, 12, 10, 15, 0), new Date(2013, 10, 2, 12, 11, 0, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 12, 20, 0), new Date(2013, 10, 2, 12, 13, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 14, 20, 0), new Date(2013, 10, 2, 12, 16, 0, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 17, 10, 0), new Date(2013, 10, 2, 12, 18, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 19, 20, 0), new Date(2013, 10, 2, 12, 20, 40, 0)],



        ['Browser', new Date(2013, 10, 2, 12, 0, 10, 0), new Date(2013, 10, 2, 12, 0, 30, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 0, 45, 0), new Date(2013, 10, 2, 12, 1, 0, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 1, 20, 0), new Date(2013, 10, 2, 12, 1, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 2, 10, 0), new Date(2013, 10, 2, 12, 2, 25, 0)],


        ['Browser', new Date(2013, 10, 2, 12, 3, 15, 0), new Date(2013, 10, 2, 12, 4, 0, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 4, 20, 0), new Date(2013, 10, 2, 12, 4, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 5, 20, 0), new Date(2013, 10, 2, 12, 6, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 7, 10, 0), new Date(2013, 10, 2, 12, 7, 40, 0)],
        ['Browser', new Date(2013, 10, 2, 12, 8, 20, 0), new Date(2013, 10, 2, 12, 9, 40, 0)],

        ['Youtube', new Date(2013, 10, 2, 12, 2, 20, 0), new Date(2013, 10, 2, 12, 2, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 3, 15, 0), new Date(2013, 10, 2, 12, 4, 0, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 4, 20, 0), new Date(2013, 10, 2, 12, 4, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 5, 20, 0), new Date(2013, 10, 2, 12, 6, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 7, 10, 0), new Date(2013, 10, 2, 12, 7, 40, 0)],
        ['Youtube', new Date(2013, 10, 2, 12, 8, 20, 0), new Date(2013, 10, 2, 12, 9, 40, 0)],

        ['WIFI', new Date(2013, 10, 2, 12, 0, 10, 0), new Date(2013, 10, 2, 12, 0, 30, 0)],
        ['WIFI', new Date(2013, 10, 2, 12, 0, 45, 0), new Date(2013, 10, 2, 12, 1, 0, 0)],
        ['WIFI', new Date(2013, 10, 2, 12, 1, 20, 0), new Date(2013, 10, 2, 12, 1, 40, 0)],

        ['WIFI', new Date(2013, 10, 2, 12, 21, 20, 0), new Date(2013, 10, 2, 12, 22, 40, 0)],
        ['WIFI', new Date(2013, 10, 2, 12, 23, 15, 0), new Date(2013, 10, 2, 12, 24, 0, 0)],
        ['WIFI', new Date(2013, 10, 2, 12, 24, 20, 0), new Date(2013, 10, 2, 12, 24, 40, 0)],
        ['WIFI', new Date(2013, 10, 2, 12, 25, 20, 0), new Date(2013, 10, 2, 12, 26, 40, 0)],
        ['WIFI', new Date(2013, 10, 2, 12, 27, 10, 0), new Date(2013, 10, 2, 12, 27, 40, 0)],
        ['WIFI', new Date(2013, 10, 2, 12, 28, 20, 0), new Date(2013, 10, 2, 12, 29, 40, 0)]
    ]);

    dashboard.bind(control, chart);
    dashboard.draw(data);
}



