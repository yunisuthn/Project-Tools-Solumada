//var header = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "aout", ]
var planningDataTable = $("#planningDataTable").DataTable({
    "ajax": { "url": "/allPlanning", "dataSrc": "" },
    "columns": [
        { "data": "shift" },
        { "data": "usualName" },
        { "data": "mcode" },
        { "data": "project" },
        {
            "data": "start", "render": function (start) {
                if (start == "") {
                    return ""
                } else {
                    return start
                }
            }
        },
        {
            "data": "end", "render": function (end) {
                if (end == "") {
                    return ""
                } else {
                    return end
                }
            }
        }, {
            "defaultContent": "\
                <div class='btn-group d-flex justify-content-center' role='group' aria-label='Basic mixed styles example'>\
                    <button type='button' class='btn px-2 btn-sm btn-warning btnUpdatePlanning' class='btn btn-sm btn-warning' data-toggle='modal' data-target='#UpdatePlanningModal' data-bs-whatever='@getbootstrap'><i class='fa fa-edit'></i></button>\
                    <button type='button' class='btn px-2 btn-sm btn-danger btnDeletePlanning' class='btn btn-sm btn-warning'><i class='fa fa-trash'></i></button>\
                </div>\
            "
        }
    ],
})


$(document).on("click", '#savePlanning', function () {
    console.log("savePlanning");
    var shift = $("#shift").val()
    var mcode = $("#mcode").val()
    var nom = $("#nom").val()
    var project = $("#projet").val()
    var start = $("#start").val()
    var end = $("#end").val()

    var addPlanning = {
        shift: shift,
        mcode: mcode,
        nom: nom,
        project: project,
        start: start,
        end: end
    }

    $.ajax({
        url: "/addPlanning",
        method: "post",
        data: addPlanning,
        success: function (res) {
            if (res == "success") {
                Swal.fire({
                    icon: 'success',
                    title: "New planning added",
                    text: `Planning ${nom} saved successfully`
                })
                clearForm()
                window.location = "/planning"
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "This material is already exist or you need to complete the field"
                })

            }
        }
    })
    console.log("shift", addPlanning);
})

function clearForm() {
    $("#shift").val("");
    $('#mcode').val("");
    $("#nom").val("");
    $('#projet').val("");
    $('#start').val("")
    $('#end').val("")
}

var mcodeUpdat = ""
var prenomUpdat = ""
$(document).on("click", '.btnUpdatePlanning', function () {
    console.log("btnUpdatePlanning");
    var getCol = $(this).closest('tr')
    var shift = getCol.find('td:eq(0)').text()
    prenomUpdat = getCol.find('td:eq(1)').text()
    mcodeUpdat = getCol.find('td:eq(2)').text()
    var project = getCol.find('td:eq(3)').text()
    var start = getCol.find('td:eq(4)').text()
    var end = getCol.find('td:eq(5)').text()

    start = start.split("/").reverse().join("-")
    end = end.split("/").reverse().join("-")
    console.log("start", start);
    $('#shiftUpdat').val(shift)
    $('#mcodeUpdate').val(mcodeUpdat);
    $('#nomUpdat').val(prenomUpdat);
    $('#projectUpdat').val(project);
    $('#startUpdat').val(start);
    $('#endUpdat').val(end);
})

$(document).on("click", "#saveUpdatPlanning", function () {
    var shiftUpd = $('#shiftUpdat').val();
    var mcodeUpd = $('#mcodeUpdate').val();
    var nomUpd = $('#nomUpdat').val();
    var projectUpd = $('#projectUpdat').val();
    var startUpd = $('#startUpdat').val();
    var endUpd = $('#endUpdat').val();

    var planningUpd = {
        shift: shiftUpd,
        mcodeAncien: mcodeUpdat,
        mcodeNouv: mcodeUpd,
        prenomUpdat: nomUpd,
        projet: projectUpd,
        start: startUpd,
        end: endUpd
    }

    $.ajax({
        url: '/udpatePlanning',
        method: 'post',
        data: planningUpd,
        success: function (res) {
            if (res == "success") {
                Swal.fire(
                    'Update',
                    'Update successfully!',
                    'success',
                    { confirmButtonText: 'Ok' }
                )
                window.location = "/planning"
                viderUpdate()
                //$("#planningDataTable").DataTable().ajax.reload(null, false);

            } else {
                Swal.fire(
                    'Error',
                    "The field is empty!",
                    'info',
                    {
                        confirmButtonText: 'Ok',
                    });

            }
        }
    })
})

function viderUpdate() {
    $('#shiftUpdat').val("");
    $('#projectUpdat').val("");
    $('#startUpdat').val("");
    $('#endUpdat').val("");
    $('#cancelUpdatePlan').click()

}

$(document).on('click', '.btnDeletePlanning', function () {
    Swal.fire({
        title: 'Delete Planning',
        text: 'Are you sure to delete this planning?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'green',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var getCol = $(this).closest('tr');
            var codeDelete = getCol.find('td:eq(2)').text();
            deleteMaterial = {
                mcode: codeDelete
            }
            $.ajax({
                url: '/deletePlanning',
                method: 'post',
                data: deleteMaterial,
                success: function (res) {
                    responseTxt = 'Planning deleted successfully!';
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: responseTxt,
                        showConfirmButton: true
                    })
                    $("#planningDataTable").DataTable().ajax.reload(null, false)
                },
                error: function (resp) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: resp,
                        showConfirmButton: false,
                        timer: 1700
                    })
                }
            })
        }
    })
})


// var globalViewDataTable = $("#globalViewDataTable").DataTable({
//     "ajax": {"url": "/allPlanning", "dataSrc": ""},
//     "columns": [
//         {"data": "shift"},
//         {"data": "usualName"},
//         {"data": "mcode"},
//         {"data": "project"},
//     //     {"data": "start", "render": function(start)
//     //     {
//     //         if (start=="") {
//     //             return ""
//     //         } else {

//     //             return start
//     //         }
//     //     }
//     // },
//     //     {"data": "end", "render": function (end) {
//     //         if (end =="") {
//     //             return ""
//     //         } else {
//     //             return end
//     //         }
//     //     }},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//         {"data": ""},
//     ],
// })

// var columns = $('#planningDataTable').dataTable().dataTableSettings[0].aoColumns;
// $.each(columns, function(i,v) {
//     console.log("v.sTitle", v.sTitle);});

// function colorer(date) {
//     var dataTableHeaderElements = $('#globalViewDataTable').DataTable().columns().header();
//     var headers = [];
//     for (var i = 4; i< dataTableHeaderElements.length; i++) {
//         headers.push($(dataTableHeaderElements[i]).text())
//     }


//     console.log("headers", headers);
//     return date
// }













google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Shift');
  data.addColumn('string', 'Nom');
//   data.addColumn('string', 'M-Code');
//   data.addColumn('string', 'Projet');
  data.addColumn('date', 'Season Start Date');
  data.addColumn('date', 'Season End Date');

  data.addRows([
    ['Nom1','mcodem',    new Date(2022, 7, 5), new Date(2022, 7, 5)],
    ['Nom','mcode',   new Date(2022, 5, 4), new Date(2022, 5, 4)],
    ['Nom3','mcode1',   new Date(2022, 6, 5), new Date(2022, 6, 5)],
    ['Nom7','mcodeZ',  new Date(2022, 6, 5), new Date(2022, 6, 17)],
    // ['Seattle Seahawks', new Date(2022, 8, 5), new Date(2022, 9, 5)],
    // ['Pittsburgh Steelers',  new Date(2022, 8, 5), new Date(2022, 9, 5)],
    // ['Indianapolis Colts',   new Date(2006, 8, 5), new Date(2007, 1, 5)],
    // ['New York Giants',      new Date(2007, 8, 5), new Date(2008, 1, 5)],
    // ['Pittsburgh Steelers',  new Date(2008, 8, 5), new Date(2009, 1, 5)],
    // ['New Orleans Saints',   new Date(2009, 8, 5), new Date(2010, 1, 5)],
    // ['Green Bay Packers',    new Date(2010, 8, 5), new Date(2011, 1, 5)],
    // ['New York Giants',      new Date(2011, 8, 5), new Date(2012, 1, 5)],
    // ['Baltimore Ravens',     new Date(2012, 8, 5), new Date(2013, 1, 5)],
    // ['Seattle Seahawks',     new Date(2013, 8, 5), new Date(2014, 1, 5)],
  ]);

  var options = {
    height: 450,
    timeline: {
      groupByRowLabel: true
    }
  };

  var chart = new google.visualization.Timeline(document.getElementById('chart_div1'));

  chart.draw(data, options);
}





///////EXAMPLE
// $(document).ready(function () {

//     var dataset = [
//         {
//             prenom: 'data',
//             dateData_1: 'Date A1',
//             dateData_2: 'Date A2',
//             dateData_3: 'Date A3',
//             dateData_4: 'Date A4',
//             dateData_5: 'Date A5',
//             dateData_6: 'Date A4',
//             dateData_7: 'Date A5',
//             dateData_8: 'Date A5',
//         },
//         {
//             prenom: 'data',
//             dateData_1: 'Date B1',
//             dateData_2: 'Date B2',
//             dateData_3: 'Date B3',
//             dateData_4: 'Date B4',
//             dateData_5: 'Date B5',
//             dateData_6: 'Date A4',
//             dateData_7: 'Date A5',
//             dateData_8: 'Date A5',
//         },
//         {
//             prenom: 'data',
//             dateData_1: 'Date C1',
//             dateData_2: 'Date C2',
//             dateData_3: 'Date C3',
//             dateData_4: 'Date C4',
//             dateData_5: 'Date C5',
//             dateData_6: 'Date A4',
//             dateData_7: 'Date A5',
//             dateData_8: 'Date A5',
//         },
//         {
//             prenom: 'data',
//             dateData_1: 'Date D1',
//             dateData_2: 'Date D2',
//             dateData_3: 'Date D3',
//             dateData_4: 'Date D4',
//             dateData_5: 'Date D5',
//             dateData_6: 'Date A4',
//             dateData_7: 'Date A5',
//             dateData_8: 'Date A5',
//         },
//         {
//             prenom: 'dataS',
//             dateData_1: 'Date E1',
//             dateData_2: '',
//             dateData_3: 'Date E3',
//             dateData_4: 'Date E4',
//             dateData_5: 'Date E5',
//             dateData_6: 'Date A4',
//             dateData_7: 'Date A5',
//             dateData_8: 'Date A5',
//         }
//     ]
//     var donner= [{
//         shift: 'shift 1',
//         mcode: 'mcodem',
//         usualName: 'nom',
//         project: 'porjce',
//         start: "2022-09-01",
//         end: "2022-09-05",
//         // _id: new ObjectId("63198e82bff58a50a2eb9a86"),
//         // __v: 0

//     }]
//     console.log("donner", donner);
//     var columns = [{title: 'shift', data: "shift"},{title: 'mcode', data: "mcode"},{title: 'usualName', data: "usualName"}, {title: 'project', data: "project"}]//, "mcode", "shift"];

//     donner.forEach(d => {
//         var ddateS = new Date(d.start)
//         var ddateF = new Date(d.end)

//         var jStart = ddateS.getDate()
//         var jEnd = ddateF.getDate()
//         console.log("ddate", ddateS.getDate());
//         console.log("ddateF", ddateF.getDate());
//         for (let i = jStart; i < jEnd.length; i++) {
//             const element = array[i];
//             donner[0].push({date: "date"})
//         }
//     });
//     console.log("EXAMPLE EXAMPLE EXAMPLE", donner);
//     //var columns = [];
//     // for (var i = 1; i <= 8; i++) {
//     //     var date = new Date(2022, 8, i);
//     //     columns.push({
//     //         title: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
//     //         data: 'dateData_' + i
//     //     });
//     // }

//     console.log("columns", columns);

//     var myTable = $('#exampleDataT').DataTable({
//         data: donner,
//         columns: columns
//     });

// });