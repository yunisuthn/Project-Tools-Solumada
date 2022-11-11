var inventaireDataT = $('#inventaireDataT').DataTable(
    {
        "ajax": { "url": "/allInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "code", 'render': function (code) {
                    if (!code) {
                        return ""
                    } else {
                        return code
                    }
                }
            },
            {
                'data': 'nombre', 'render': function (nombre) {
                    if (!nombre) {
                        return ""
                    } else {
                        return nombre
                    }
                }
            },
            {
                'data': "licence", 'render': function (licence) {
                    if (!licence) {
                        return ""
                    } else {
                        return licence
                    }
                }
            },
            {
                'data': 'commentaire', 'render': function (commentaire) {
                    if (!commentaire) {
                        return ""
                    } else {
                        return commentaire
                    }
                }
            },
            {
                'defaultContent': `\
                    <div class= 'btn-group d-flex justify-content-center' role='group' aria-label='Basic mixed styles example'>\
                        <button type='button' class='btn px-2 px-2 rounded mx-1 btn-sm btn-warning btnUpdateInventaire' data-toggle='modal' data-target='#modalUpdateInventaire' data-bs-whatever='@getbootstrap'><i class='fa fa-edit'></i></button>\
                        <button type='button' class='btn px2 btn-sm rounded btn-danger btnDeleteInventaire'><i class='fa fa-trash'></i></button>\
                    <div>\
                `
            }
        ]
    }
)

// Add material in inventary
$('#saveMateriel').on("click", function () {
    //swal("HEY", "Message", "warning")
    Inventaire = {
        name: $('#nameMat').val(),
        code: $('#codeMat').val(),
        nombr: $('#nombreMat').val(),
        licence: $('#licenceMat').val(),
        commentaire: $('#commentaireMat').val()
    }
    $.ajax({
        url: '/addInventaire',
        method: 'post',
        data: Inventaire,
        success: function (response) {
            if (response == "error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ce matériel est déjà existant ou le nom ou la référence est incomplet'
                })
                // clearForm()
                // window.location = "/inventaire"
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Nouveau matériel sauvegardé',
                    text: `Matériel ${Inventaire.name} sauvegardé avec succès`,
                })
                clearForm()
                $("#inventaireDataT").DataTable().ajax.reload(null, false)
                searchOnDatatable(inventaireDataT, Inventaire.code)
                window.location = "/inventaire"
            }
        }
    })
})

//Empty form Inventaire
function clearForm() {
    $('#nameMat').val('');
    $('#codeMat').val('');
    $('#nombreMat').val('');
    $('#licenceMat').val('');
    $('#commentaireMat').val('');
    $('#cancelMat').click();
}

function searchOnDatatable(dataTab, value) {
    currentPage = dataTab.page();
    dataTab.search(value).draw();
}


//Update Inventaire
var codeMat = ''
var nameInventA = ""
var nombreInventA = ""
var licencInventA = ""
var commentInventA = ""
$(document).on('click', '.btnUpdateInventaire', function () {
    var getCol = $(this).closest('tr');
    codeMat = getCol.find('td:eq(1)').text()
    codeMate = {
        code: codeMat
    }

    $.ajax({
        url: '/getInventaire',
        method: "post",
        data: codeMate,
        dataType: 'json',
        success: function (res) {
            var respData = JSON.parse(JSON.stringify(res))
            // console.log("respData", respData);
            nameInventA = respData.name;
            nombreInventA = respData.nombre;
            $("#nameUpdatMat").val(respData.name);
            $("#nombreUpdatMat").val(respData.nombre)
            $("#refUpdatMat").val(respData.code)
            $("#licencUpdatMat").val(respData.licence)
            $("#commentUpdatMat").val(respData.commentaire)
        }
    })
})


// Save Update Inventaire
$(document).on('click', '#saveUpdateMat', function () {
    var nameMatUpd = $('#nameUpdatMat').val();
    var nbreMatUpd = $('#nombreUpdatMat').val();
    var refMatUpd = $('#refUpdatMat').val();
    var licenceUpd = $('#licencUpdatMat').val();
    var commentUpd = $('#commentUpdatMat').val();
    var matUpd = {
        code: codeMat,
        codeNew: refMatUpd,
        name: nameMatUpd,
        nombre: nbreMatUpd,
        licence: licenceUpd,
        commentaire: commentUpd,
        nameInventA: nameInventA,
        nombreInventA: nombreInventA,
        licencInventA: licencInventA,
        commentInventA: commentInventA
    }

    $.ajax({
        url: "/updateInvent",
        method: 'post',
        data: matUpd,
        success: function (res) {
            console.log("res", res);
            Swal.fire(
                'Update',
                'Mise à jour réussie du matériel ! ',
                'success',
                {
                    confirmButtonText: 'OK',
                }
            )
            $("#nameUpdatMat").val("");
            $("#nombreUpdatMat").val("");
            $("#cancelUpdate").click();
            $('#inventaireDataT').DataTable().ajax.reload(null, false)
            window.location = '/inventaire'
        }
    })
})

//Delete material in inventary
$(document).on('click', '.btnDeleteInventaire', function () {
    Swal.fire({
        title: 'Supprimer',
        text: 'Etes-vous sûr de vouloir supprimer ce matériel?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'green',
        confirmButtonText: 'Oui!'
    }).then((result) => {
        if (result.isConfirmed) {
            var getCol = $(this).closest('tr');
            var codeDelete = getCol.find('td:eq(1)').text();
            deleteMaterial = {
                code: codeDelete
            }
            $.ajax({
                url: '/deleteMaterial',
                method: 'post',
                data: deleteMaterial,
                success: function (res) {
                    responseTxt = 'Matériel supprimé avec succès!';
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: responseTxt,
                        showConfirmButton: true
                    })
                    $("#inventaireDataT").DataTable().ajax.reload(null, false)
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


var type = $('#typeUtil').val()// document.getElementById("typeUtil")//$('#typeUtil').val();

if (type.trim() == "IT") {
    $("#utilisateur").css("display", "none")
    $("#historique").css("display", "none")
    // console.log("page IT");
} else if (type.trim() == "TL") {
    $("#utilisateur").css("display", "none")
    $("#historique").css("display", "none")
    // console.log("page TL");
} 