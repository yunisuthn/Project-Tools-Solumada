var productionDataTable = $("#productionDataTable").DataTable({
    "ajax": {
        "url": "/allProduction", "dataSrc": ""
    },
    "columns": [
        { "data": "mcode" },
        { "data": "username" },
        { "data": "date" },
        { "data": "production" },
        { "data": "projet" },
        // { "data": "faute" },
        {
            "data": null,
            "render": function (data, type, row) {
                return (`\ 
                <div class='btn-group d-flex justify-content-center' role='group' aria-label='Basic mixed styles example'>\
                    <button type='button' class='btn px-2 px-2 rounded mx-1 btn-sm btn-warning btnUpdateProduction'onclick='updateRepor("production", "${data.id}")' data-toggle='modal' data-target='#modalUpdateReporting'><i class='fa fa-edit'></i></button>\
                    <button type='button' class='btn px2 btn-sm rounded btn-danger btnDeleteProduction' onclick='deleteProd("${data.id}")' ><i class='fa fa-trash'></i></button>\
                </div>\
            `)
            }
            //'defaultContent': 
        }
    ]
})

var fauteDataTable = $("#fauteDataTable").DataTable({
    "ajax": {
        "url": "/allFaute", "dataSrc": ""
    },
    "columns": [
        { "data": "mcode" },
        { "data": "username" },
        { "data": "date" },
        // { "data": "end" },
        { "data": "faute" },
        // { "data": "faute" },
        {
            "data": null,
            render: function (data) {
                return (`\ 
                <div class='btn-group d-flex justify-content-center' role='group' aria-label='Basic mixed styles example'>\
                    <button type='button' class='btn px-2 px-2 rounded mx-1 btn-sm btn-warning btnUpdateFaute' onclick='updateRepor("faute", "${data.id}")' data-toggle='modal' data-target='#modalUpdateReporting'><i class='fa fa-edit'></i></button>\
                    <button type='button' class='btn px2 btn-sm rounded btn-danger btnDeleteFaute' onclick='deleteProd("${data.id}")'><i class='fa fa-trash'></i></button>\
                </div>\
            `)
            }
            //'defaultContent': 
        }
    ]
})

var reporting = ""
var updateReporting = ""
var idDelete = ""
function getReporting(params) {
    reporting = params
    document.getElementById("reportingProduction").style.display = "none";
    document.getElementById("reportingFaute").style.display = "none";
    //console.log("log", params);
    if (params == "production") {
        document.getElementById("reportingProduction").style.display = "flex";
        document.getElementById("reportingFaute").style.display = "none";
    } else {
        document.getElementById("reportingProduction").style.display = "none";
        document.getElementById("reportingFaute").style.display = "flex";

    }
}

var nom
//var prenom
var number
$('#mcode').on("change", function () {
    console.log("mcode");
    var mcode = $("#mcode").val();
    var user = {
        mcode1: mcode.trim()
    }

    $.ajax({
        url: "/getOneAgent",
        data: user,
        method: "post",
        success: function (res) {
            //console.log("res", res);
            nom = res.name
            number = res.number
            $("#name").val(res.usualName)
        }
    })
})

$('#saveReporting').on("click", function () {
    var mcode = $('#mcode').val();
    var name = $('#name').val();
    var production = $('#production').val();
    var faute = $('#faute').val();
    var date = $("#date").val();
    //var end = $('#end').val();
    var dataReport
    if (reporting == "production") {
        dataReport = {
            mcode: mcode,
            name: name,
            nom: nom,
            number: number,
            params: reporting,
            production: production,
            date: date
        }

    } else {
        dataReport = {
            mcode: mcode,
            name: name,
            nom: nom,
            number: number,
            params: reporting,
            faute: faute,
            date: date
        }
    }




    $.ajax({
        url: "/addReporting",
        method: "post",
        data: dataReport,
        success: function (res) {
            console.log("res", res);
            if (res == "error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ce donnée est déjà enregistré ou vous devez compléter les champs'
                })
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Nouveau Reporting sauvegardé",
                    text: `Reporting de ${name} sauvegardé avec succès`,
                    //timer: 2000

                })
                $("#cancelReporting").click();
                //$('#')
                window.location = "/reporting"
            }
        }
    })

})


var mcodeA = ""
var nameA = "";
var productionA = "";
var fauteA = "";
var debutA = "";

$(document).on('click', '.btnUpdateProduction', function () {
    //console.log("btnUpdateReporting");
    var getCol = $(this).closest('tr');
    mcodeA = getCol.find('td:eq(0)').text();
    nameA = getCol.find('td:eq(1)').text();
    productionA = getCol.find('td:eq(3)').text();
    // fauteA = getCol.find('td:eq(4)').text();
    // reportingA = getCol.find('td:eq(3)').text();
    debutA = getCol.find('td:eq(2)').text();
    debutA = debutA.split("/").reverse().join("-");
    //finA = finA.split("/").reverse().join("-")
    //console.log("fin1", finA);

    $("#mcodeUpd").val(mcodeA);
    $("#nameUpdatReport").val(nameA);
    $("#debutUpdat").val(debutA);
    $("#productionUpdat").val(productionA)
})

$(document).on('click', '.btnUpdateFaute', function () {
    var getCol = $(this).closest('tr');
    mcodeA = getCol.find('td:eq(0)').text();
    nameA = getCol.find('td:eq(1)').text();
    fauteA = getCol.find('td:eq(3)').text();
    debutA = getCol.find('td:eq(2)').text();
    debutA = debutA.split("/").reverse().join("-");

    $("#mcodeUpd").val(mcodeA);
    $("#nameUpdatReport").val(nameA);
    $("#debutUpdat").val(debutA);
    $("#fauteUpdat").val(fauteA)
})

var idUpdt
function updateRepor(upd, idupd) {
    updateReporting = upd
    idUpdt = idupd
    // console.log("idupd", idupd);
    // console.log("upd", upd);
    if (upd == "production") {
        $(".productUpd").css("display", "flex")
        $(".fauteUpd").css("display", 'none')
    } else {
        $(".productUpd").css("display", "none")
        $(".fauteUpd").css("display", 'flex')
    }
}
function deleteProd(id) {
    idDelete = id
}

$("#mcodeUpd").on('change', function () {

    var mcode = $("#mcodeUpd").val();
    //console.log("mcode", mcode);
    var user = {
        mcode1: mcode
    }

    $.ajax({
        url: '/getOneAgent',
        data: user,
        method: "post",
        success: function (res) {
            //console.log("res", resusualName);
            $("#nameUpdatReport").val(res.usualName)
        }
    })
})


$("#saveUpdateMat").on("click", function () {
    var nameUpdat = $("#nameUpdatReport").val();
    var mcodeUpdat = $("#mcodeUpd").val();
    var productionUpdat = $("#productionUpdat").val();
    var fauteUpdat = $("#fauteUpdat").val();
    var startUpdat = $('#debutUpdat').val();
    var endUpdat = $('#finUpdat').val();

    var dataReportUpdat
    // console.log("startUpdat", startUpdat);
    // console.log("endUpdat", endUpdat);
    if (updateReporting == "production") {
        dataReportUpdat = {
            name: nameUpdat,
            mcode: mcodeUpdat,
            production: productionUpdat,
            id: idUpdt,
            //faute: fauteUpdat,
            reporting: updateReporting,
            start: startUpdat,
            //end: endUpdat,

            mcodeA: mcodeA,
            productionA: productionA,
            //fauteA: fauteA,
            debutA: debutA,
            nameA: nameA,
            //finA: finA
        }
    } else {
        dataReportUpdat = {
            name: nameUpdat,
            mcode: mcodeUpdat,
            faute: fauteUpdat,
            start: startUpdat,
            //end: endUpdat,
            reporting: updateReporting,
            id: idUpdt,

            mcodeA: mcodeA,
            fauteA: fauteA,
            debutA: debutA,
            nameA: nameA,
            //finA: finA
        }

    }


    $.ajax({
        url: "/updateReporting",
        data: dataReportUpdat,
        method: "post",
        success: function (resp) {
            //console.log("resp", resp);

            if (resp == "error") {
                Swal.fire(
                    'Error',
                    'Field is empty',
                    'info',
                    {
                        confirmButtonText: 'Ok'
                    }
                )
            } else {
                Swal.fire(
                    'Update',
                    'Update successfully!',
                    'success',
                    { confirmButtonText: 'Ok' }
                )
                $("#cancelUpdate").click()
                //reportingDataTable.ajax.reload(null, false)
                // reportingDataTable.ajax.reload(null, false)
                // reportingDataTable.ajax.reload(null, false)
                window.location = "/reporting"
            }
        }
    })
})


// const fileSelector = document.getElementById('myfile');
// fileSelector.addEventListener('change', (event) => {
//     const fileList = event.target.files;
//     console.log(fileList);
// });


document.getElementById('uploadReporting').onsubmit = function (event) {
    console.log("uploadReporting");
    event.preventDefault() // prevent form from posting without JS
    var xhttp = new XMLHttpRequest(); // create new AJAX request

    xhttp.open("POST", "/addReportingExcel")
    var formData = new FormData()
    formData.append('avatar', document.getElementById('avatar').files[0]) // since inputs allow multi files submission, therefore files are in array
    xhttp.send(formData)
    //console.log("form");
}

$(document).on("click", '.btnDeleteProduction', function () {
    Swal.fire({
        title: 'Delete Production',
        text: 'Avez vous sûre de supprimer ce reporting?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'green',
        confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
        if (result.isConfirmed) {

            var getCol = $(this).closest('tr');
            var mcode = getCol.find('td:eq(0)').text();
            var name = getCol.find('td:eq(1)').text();
            var production = getCol.find('td:eq(4)').text();
            var faute = getCol.find('td:eq(5)').text();
            var debut = getCol.find('td:eq(2)').text();
            var fin = getCol.find('td:eq(3)').text();


            debut = debut.split("/").reverse().join("-");
            fin = fin.split("/").reverse().join("-")
            var deleteReport = {
                mcode: mcode,
                name: name,
                production: production,
                faute: faute,
                start: debut,
                end: fin,
                id: idDelete
            }

            $.ajax({
                url: "/deleteProduction",
                data: deleteReport,
                method: "post",
                success: function (res) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Reporting supprimé avec succès',
                        showConfirmButton: true
                    })
                    $("#productionDataTable").DataTable().ajax.reload(null, false)
                    // $("#reportingDataTableMonth").DataTable().ajax.reload(null, false)
                    // $("#reportingDataTableWeek").DataTable().ajax.reload(null, false)

                    //$("#").DataTable().ajax.reload(null, false)
                    //window.location = '/reporting'
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


$(document).on("click", '.btnDeleteFaute', function () {
    Swal.fire({
        title: 'Delete Faute Reporting',
        text: 'Avez vous sûre de supprimer ce faute?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'green',
        confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
        if (result.isConfirmed) {

            var getCol = $(this).closest('tr');
            var mcode = getCol.find('td:eq(0)').text();
            var name = getCol.find('td:eq(1)').text();
            var production = getCol.find('td:eq(4)').text();
            var faute = getCol.find('td:eq(5)').text();
            var debut = getCol.find('td:eq(2)').text();
            var fin = getCol.find('td:eq(3)').text();


            debut = debut.split("/").reverse().join("-");
            fin = fin.split("/").reverse().join("-")
            var deleteReport = {
                mcode: mcode,
                name: name,
                production: production,
                faute: faute,
                start: debut,
                end: fin,
                id: idDelete
            }

            $.ajax({
                url: "/deleteFaute",
                data: deleteReport,
                method: "post",
                success: function (res) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Reporting supprimé avec succès',
                        showConfirmButton: true
                    })
                    $("#fauteDataTable").DataTable().ajax.reload(null, false)
                    // $("#reportingDataTableMonth").DataTable().ajax.reload(null, false)
                    // $("#reportingDataTableWeek").DataTable().ajax.reload(null, false)

                    //$("#").DataTable().ajax.reload(null, false)
                    //window.location = '/reporting'
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
// document.getElementById("reportingDataTable").style.display = "none";
// document.getElementById("reportingDataTableMonth").style.display = "block";
var reportingDataTableMonth = $("#reportingDataTableMonth").DataTable({
    "ajax": {
        "url": "/allReportingMois", "dataSrc": ""
    },
    "columns": [
        { "data": "name" },
        { "data": "mcode" },
        { "data": "end" },
        { "data": "production" },
        { "data": "faute" }
    ]
})

var reportingDataTableWeek = $("#reportingDataTableWeek").DataTable({
    "ajax": {
        "url": "/allReportingWeek", "dataSrc": ""
    },
    "columns": [
        { "data": "name" },
        { "data": "mcode" },
        { "data": "end" },
        { "data": "start" },
        { "data": "production" },
        { "data": "faute" },
    ]
})