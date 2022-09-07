//var header = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "aout", ]
var planningDataTable = $("#planningDataTable").DataTable({
    "ajax": {"url": "/allPlanning", "dataSrc": ""},
    "columns": [
        {"data": "shift"},
        {"data": "usualName"},
        {"data": "mcode"},
        {"data": "project"},
       { "data": "start", "render": function(start){
            if (start=="") {
                return ""
            } else {
                return start
            }
        }},
        {"data": "end", "render": function (end) {
            if (end =="") {
                return ""
            } else {
                return end
            }
        }},{
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
            if (res=="success") {
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
$(document).on("click", '.btnUpdatePlanning', function () {
    console.log("btnUpdatePlanning");
    var getCol = $(this).closest('tr')
    var shift = getCol.find('td:eq(0)').text()
    var prenom = getCol.find('td:eq(1)').text()
    mcodeUpdat = getCol.find('td:eq(2)').text()
    var project = getCol.find('td:eq(3)').text()
    var start = getCol.find('td:eq(4)').text()
    var end = getCol.find('td:eq(5)').text()

    start = start.split("/").reverse().join("-")
    end = end.split("/").reverse().join("-")
    console.log("start", start);
    $('#shiftUpdat').val(shift)
    // $('#mcodeUpdate').val(mcodeUpdat);
    // $('#nomUpdat').val(prenom);
    $('#projectUpdat').val(project);
    $('#startUpdat').val(start);
    $('#endUpdat').val(end);
})

$(document).on("click", "#saveUpdatPlanning", function () {
    var shiftUpd = $('#shiftUpdat').val();
    // var mcodeUpd = $('#mcodeUpdate').val();
    // var nomUpd = $('#nomUpdat').val();
    var projectUpd = $('#projectUpdat').val();
    var startUpd = $('#startUpdat').val();
    var endUpd = $('#endUpdat').val();

    var planningUpd = {
        shift: shiftUpd,
        mcode: mcodeUpdat,
        //nom : nomUpd,
        projet: projectUpd,
        start: startUpd,
        end: endUpd
    }

    $.ajax({
        url: '/udpatePlanning',
        method: 'post',
        data: planningUpd,
        success: function (res) {
            if (res=="success") {
                Swal.fire(
                    'Update',
                    'Update successfully!',
                    'success',
                    {confirmButtonText: 'Ok'}
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

$(document).on('click', '.btnDeletePlanning', function() {
    Swal.fire({
        title: 'Delete Planning',
        text: 'Are you sure to delete this planning?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'green',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) =>{
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


var globalViewDataTable = $("#globalViewDataTable").DataTable({
    "ajax": {"url": "/allPlanning", "dataSrc": ""},
    "columns": [
        {"data": "shift"},
        {"data": "usualName"},
        {"data": "mcode"},
        {"data": "project"},
        {"data": "start", "render": function(start)
        {
            if (start=="") {
                return ""
            } else {

                return start
            }
        }
    },
        {"data": "end", "render": function (end) {
            if (end =="") {
                return ""
            } else {
                return end
            }
        }},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
        {"data": ""},
    ],
})

// var columns = $('#planningDataTable').dataTable().dataTableSettings[0].aoColumns;
// $.each(columns, function(i,v) { 
//     console.log("v.sTitle", v.sTitle);});

function colorer(date) {
    var dataTableHeaderElements = $('#globalViewDataTable').DataTable().columns().header();
    var headers = [];
    for (var i = 4; i< dataTableHeaderElements.length; i++) {
        headers.push($(dataTableHeaderElements[i]).text())    
    }
    

    console.log("headers", headers);
    return date
}