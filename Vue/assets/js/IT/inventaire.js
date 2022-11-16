var inventaireUCDataT = $('#inventaireUCActifDataT').DataTable(
    {
        "ajax": { "url": "/allUCActifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'localisation', 'render': function (localisation) {
                    if (!localisation) {
                        return ""
                    } else {
                        return localisation
                    }
                }
            },
            {
                'data': "departement", 'render': function (departement) {
                    if (!departement) {
                        return ""
                    } else {
                        return departement
                    }
                }
            },
            {
                'data': 'equipement', 'render': function (equipement) {
                    if (!equipement) {
                        return ""
                    } else {
                        return equipement
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'processeur', 'render': function (processeur) {
                    if (!processeur) {
                        return ""
                    } else {
                        return processeur
                    }
                }
            },
            {
                'data': 'ram', 'render': function (ram) {
                    if (!ram) {
                        return ""
                    } else {
                        return ram
                    }
                }
            },
            {
                'data': 'diskDur', 'render': function (diskDur) {
                    if (!diskDur) {
                        return ""
                    } else {
                        return diskDur
                    }
                }
            },
            {
                'data': 'capacite', 'render': function (capacite) {
                    if (!capacite) {
                        return ""
                    } else {
                        return capacite
                    }
                }
            },
            {
                'data': 'cleWin', 'render': function (cleWin) {
                    if (!cleWin) {
                        return ""
                    } else {
                        return cleWin
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

var inventaireEcranDataT = $('#inventaireEcranActifDataT').DataTable(
    {
        "ajax": { "url": "/allEcranActifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'localisation', 'render': function (localisation) {
                    if (!localisation) {
                        return ""
                    } else {
                        return localisation
                    }
                }
            },
            {
                'data': "departement", 'render': function (departement) {
                    if (!departement) {
                        return ""
                    } else {
                        return departement
                    }
                }
            },
            {
                'data': 'equipement', 'render': function (equipement) {
                    if (!equipement) {
                        return ""
                    } else {
                        return equipement
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'resolution', 'render': function (resolution) {
                    if (!resolution) {
                        return ""
                    } else {
                        return resolution
                    }
                }
            },
            {
                'data': 'portHdmi', 'render': function (portHdmi) {
                    if (!portHdmi) {
                        return ""
                    } else {
                        return portHdmi
                    }
                }
            },
            {
                'data': 'portVga', 'render': function (portVga) {
                    if (!portVga) {
                        return ""
                    } else {
                        return portVga
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

var inventaireClavierActifDataT = $('#inventaireClavierActifDataT').DataTable(
    {
        "ajax": { "url": "/allClavierActifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'localisation', 'render': function (localisation) {
                    if (!localisation) {
                        return ""
                    } else {
                        return localisation
                    }
                }
            },
            {
                'data': "departement", 'render': function (departement) {
                    if (!departement) {
                        return ""
                    } else {
                        return departement
                    }
                }
            },
            {
                'data': 'equipement', 'render': function (equipement) {
                    if (!equipement) {
                        return ""
                    } else {
                        return equipement
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'portUsb', 'render': function (portUsb) {
                    if (!portUsb) {
                        return ""
                    } else {
                        return portUsb
                    }
                }
            },
            {
                'data': 'portPci', 'render': function (portPci) {
                    if (!portPci) {
                        return ""
                    } else {
                        return portPci
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

var inventaireSourisActifDataT = $('#inventaireSourisActifDataT').DataTable(
    {
        "ajax": { "url": "/allSourisActifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'localisation', 'render': function (localisation) {
                    if (!localisation) {
                        return ""
                    } else {
                        return localisation
                    }
                }
            },
            {
                'data': "departement", 'render': function (departement) {
                    if (!departement) {
                        return ""
                    } else {
                        return departement
                    }
                }
            },
            {
                'data': 'equipement', 'render': function (equipement) {
                    if (!equipement) {
                        return ""
                    } else {
                        return equipement
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'portUsb', 'render': function (portUsb) {
                    if (!portUsb) {
                        return ""
                    } else {
                        return portUsb
                    }
                }
            },
            {
                'data': 'portPci', 'render': function (portPci) {
                    if (!portPci) {
                        return ""
                    } else {
                        return portPci
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

var inventairePhoneActifDataT = $('#inventairePhoneActifDataT').DataTable(
    {
        "ajax": { "url": "/allPhoneActifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'imei1', 'render': function (imei1) {
                    if (!imei1) {
                        return ""
                    } else {
                        return imei1
                    }
                }
            },
            {
                'data': 'imei2', 'render': function (imei2) {
                    if (!imei2) {
                        return ""
                    } else {
                        return imei2
                    }
                }
            },
            {
                'data': 'chargeur', 'render': function (chargeur) {
                    if (!chargeur) {
                        return ""
                    } else {
                        return chargeur
                    }
                }
            },
            {
                'data': 'cable', 'render': function (cable) {
                    if (!cable) {
                        return ""
                    } else {
                        return cable
                    }
                }
            },
            {
                'data': 'housse', 'render': function (housse) {
                    if (!housse) {
                        return ""
                    } else {
                        return housse
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

var inventaireUCInActifDataT = $('#inventaireUCInActifDataT').DataTable(
    {
        "ajax": { "url": "/allUCInactifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'localisation', 'render': function (localisation) {
                    if (!localisation) {
                        return ""
                    } else {
                        return localisation
                    }
                }
            },
            {
                'data': "departement", 'render': function (departement) {
                    if (!departement) {
                        return ""
                    } else {
                        return departement
                    }
                }
            },
            {
                'data': 'equipement', 'render': function (equipement) {
                    if (!equipement) {
                        return ""
                    } else {
                        return equipement
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'processeur', 'render': function (processeur) {
                    if (!processeur) {
                        return ""
                    } else {
                        return processeur
                    }
                }
            },
            {
                'data': 'ram', 'render': function (ram) {
                    if (!ram) {
                        return ""
                    } else {
                        return ram
                    }
                }
            },
            {
                'data': 'diskDur', 'render': function (diskDur) {
                    if (!diskDur) {
                        return ""
                    } else {
                        return diskDur
                    }
                }
            },
            {
                'data': 'capacite', 'render': function (capacite) {
                    if (!capacite) {
                        return ""
                    } else {
                        return capacite
                    }
                }
            },
            {
                'data': 'cleWin', 'render': function (cleWin) {
                    if (!cleWin) {
                        return ""
                    } else {
                        return cleWin
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

var inventaireEcranInActifDataT = $('#inventaireEcranInActifDataT').DataTable(
    {
        "ajax": { "url": "/allEcranInactifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'localisation', 'render': function (localisation) {
                    if (!localisation) {
                        return ""
                    } else {
                        return localisation
                    }
                }
            },
            {
                'data': "departement", 'render': function (departement) {
                    if (!departement) {
                        return ""
                    } else {
                        return departement
                    }
                }
            },
            {
                'data': 'equipement', 'render': function (equipement) {
                    if (!equipement) {
                        return ""
                    } else {
                        return equipement
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'resolution', 'render': function (resolution) {
                    if (!resolution) {
                        return ""
                    } else {
                        return resolution
                    }
                }
            },
            {
                'data': 'portHdmi', 'render': function (portHdmi) {
                    if (!portHdmi) {
                        return ""
                    } else {
                        return portHdmi
                    }
                }
            },
            {
                'data': 'portVga', 'render': function (portVga) {
                    if (!portVga) {
                        return ""
                    } else {
                        return portVga
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

var inventaireClavierInactifDataT = $('#inventaireClavierInactifDataT').DataTable(
    {
        "ajax": { "url": "/allClavierInActifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'localisation', 'render': function (localisation) {
                    if (!localisation) {
                        return ""
                    } else {
                        return localisation
                    }
                }
            },
            {
                'data': "departement", 'render': function (departement) {
                    if (!departement) {
                        return ""
                    } else {
                        return departement
                    }
                }
            },
            {
                'data': 'equipement', 'render': function (equipement) {
                    if (!equipement) {
                        return ""
                    } else {
                        return equipement
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'portUsb', 'render': function (portUsb) {
                    if (!portUsb) {
                        return ""
                    } else {
                        return portUsb
                    }
                }
            },
            {
                'data': 'portPci', 'render': function (portPci) {
                    if (!portPci) {
                        return ""
                    } else {
                        return portPci
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

var inventaireSourisInActifDataT = $('#inventaireSourisInActifDataT').DataTable(
    {
        "ajax": { "url": "/allSourisInactifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'localisation', 'render': function (localisation) {
                    if (!localisation) {
                        return ""
                    } else {
                        return localisation
                    }
                }
            },
            {
                'data': "departement", 'render': function (departement) {
                    if (!departement) {
                        return ""
                    } else {
                        return departement
                    }
                }
            },
            {
                'data': 'equipement', 'render': function (equipement) {
                    if (!equipement) {
                        return ""
                    } else {
                        return equipement
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'portUsb', 'render': function (portUsb) {
                    if (!portUsb) {
                        return ""
                    } else {
                        return portUsb
                    }
                }
            },
            {
                'data': 'portPci', 'render': function (portPci) {
                    if (!portPci) {
                        return ""
                    } else {
                        return portPci
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

var inventairePhoneInActifDataT = $('#inventairePhoneInActifDataT').DataTable(
    {
        "ajax": { "url": "/allPhoneInactifInventaire", "dataSrc": "" },
        "columns": [
            { 'data': 'name' },
            {
                'data': "type", 'render': function (type) {
                    if (!type) {
                        return ""
                    } else {
                        return type
                    }
                }
            },
            {
                'data': 'numSerie', 'render': function (numSerie) {
                    if (!numSerie) {
                        return ""
                    } else {
                        return numSerie
                    }
                }
            },
            {
                'data': 'marque', 'render': function (marque) {
                    if (!marque) {
                        return ""
                    } else {
                        return marque
                    }
                }
            },

            {
                'data': 'imei1', 'render': function (imei1) {
                    if (!imei1) {
                        return ""
                    } else {
                        return imei1
                    }
                }
            },
            {
                'data': 'imei2', 'render': function (imei2) {
                    if (!imei2) {
                        return ""
                    } else {
                        return imei2
                    }
                }
            },
            {
                'data': 'chargeur', 'render': function (chargeur) {
                    if (!chargeur) {
                        return ""
                    } else {
                        return chargeur
                    }
                }
            },
            {
                'data': 'cable', 'render': function (cable) {
                    if (!cable) {
                        return ""
                    } else {
                        return cable
                    }
                }
            },
            {
                'data': 'housse', 'render': function (housse) {
                    if (!housse) {
                        return ""
                    } else {
                        return housse
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
$("#addInvent").on('click', function () {

    $(".type").css('display', "none")
    $(".localisation").css('display', "none")
    $(".departement").css('display', "none")
    $(".equipement").css('display', "none")
    $(".numSerie").css('display', "none")
    $(".marque").css('display', "none")
    $(".processeur").css('display', "none")
    $(".ram").css('display', "none")
    $(".diskDur").css('display', "none")
    $(".capacite").css('display', "none")
    $(".cleWin").css('display', "none")
    $(".resolution").css('display', "none")
    $(".imei").css('display', "none")
    $(".chargeur-cable-housse").css('display', "none")
    $(".portsClavier").css('display', "none")
    $(".portsEcran").css('display', "none")

})

$("#nameMat").on("change", function () {
    console.log("nameMat", $("#nameMat").val());
    $(".type").css('display', "block")
    $(".marque").css('display', "block")
    $(".numSerie").css('display', "block")

    if ($("#nameMat").val() == "uc") {
        $(".localisation").css('display', "block")
        $(".departement").css('display', "block")
        $(".equipement").css('display', "block")
        $(".processeur").css('display', "block")
        $(".ram").css('display', "block")
        $(".diskDur").css('display', "block")
        $(".capacite").css('display', "block")
        $(".cleWin").css('display', "block")
        $(".portsClavier").css('display', "none")
        $(".portsEcran").css('display', "none")
        $(".imei").css('display', "none")
        $(".chargeur-cable-housse").css('display', "none")
    } else if ($("#nameMat").val() == "ecran") {
        $(".localisation").css('display', "block")
        $(".departement").css('display', "block")
        $(".equipement").css('display', "block")
        $(".resolution").css('display', 'block')
        $(".portsEcran").css('display', 'block')

        $(".processeur").css('display', "none")
        $(".ram").css('display', "none")
        $(".diskDur").css('display', "none")
        $(".capacite").css('display', "none")
        $(".cleWin").css('display', "none")
        $(".portsClavier").css('display', "none")
        $(".imei").css('display', "none")
        $(".chargeur-cable-housse").css('display', "none")
    } else if ($("#nameMat").val() == "clavier" || $("#nameMat").val() == 'souris') {

        $(".processeur").css('display', "none")
        $(".ram").css('display', "none")
        $(".diskDur").css('display', "none")
        $(".capacite").css('display', "none")
        $(".cleWin").css('display', "none")
        $(".localisation").css('display', "block")
        $(".departement").css('display', "block")
        $(".equipement").css('display', "block")
        $(".portsClavier").css('display', "block")
        $(".portsEcran").css('display', "none")
        $(".imei").css('display', "none")
        $(".chargeur-cable-housse").css('display', "none")
    } else if ($("#nameMat").val() == 'phone') {
        $(".imei").css('display', "block")
        $(".chargeur-cable-housse").css('display', "block")
        $(".processeur").css('display', "none")
        $(".ram").css('display', "none")
        $(".diskDur").css('display', "none")
        $(".capacite").css('display', "none")
        $(".cleWin").css('display', "none")
        $(".localisation").css('display', "none")
        $(".departement").css('display', "none")
        $(".equipement").css('display', "none")
        $(".portsClavier").css('display', "none")
        $(".portsEcran").css('display', "none")
    }
})

// Add material in inventary
$('#saveMateriel').on("click", function () {
    //swal("HEY", "Message", "warning")
    var Inventaire

    if ($("#actif").is(':checked')) {
        $("#actif").attr('value', 'true');
    } else {
        $("#actif").attr('value', 'false');
    }
    if ($("#nameMat").val() == "uc") {

        Inventaire = {
            actif: $("#actif").val(),
            name: $('#nameMat').val(),
            type: $('#type').val(),
            localisation: $('#localisation').val(),
            departement: $('#departement').val(),
            equipement: $('#equipement').val(),
            numSerie: $('#numSerie').val(),
            marque: $('#marque').val(),
            processeur: $('#processeur').val(),
            ram: $('#ram').val(),
            diskDur: $('#diskDur').val(),
            capacite: $('#capacite').val(),
            cleWin: $('#cleWin').val(),
        }
    } else if ($("#nameMat").val() == "ecran") {
        if ($("#portHdmi").is(':checked')) {
            $("#portHdmi").attr('value', 'true');
        } else {
            $("#portHdmi").attr('value', 'false');
        }
        if ($("#portVga").is(':checked')) {
            $("#portVga").attr('value', 'true');
        } else {
            $("#portVga").attr('value', 'false');
        }
        Inventaire = {
            actif: $("#actif").val(),
            name: $('#nameMat').val(),
            type: $('#type').val(),
            localisation: $('#localisation').val(),
            departement: $('#departement').val(),
            equipement: $('#equipement').val(),
            numSerie: $('#numSerie').val(),
            marque: $('#marque').val(),
            resolution: $('#resolution').val(),
            portHdmi: $('#portHdmi').val(),
            portVga: $('#portVga').val(),

        }
    } else if ($("#nameMat").val() == "clavier" || $("#nameMat").val() == 'souris') {

        if ($("#portUsb").is(':checked')) {
            $("#portUsb").attr('value', 'true');
        } else {
            $("#portUsb").attr('value', 'false');
        }
        if ($("#portPci").is(':checked')) {
            $("#portPci").attr('value', 'true');
        } else {
            $("#portPci").attr('value', 'false');
        }
        Inventaire = {
            actif: $("#actif").val(),
            name: $('#nameMat').val(),
            type: $('#type').val(),
            localisation: $('#localisation').val(),
            departement: $('#departement').val(),
            equipement: $('#equipement').val(),
            numSerie: $('#numSerie').val(),
            marque: $('#marque').val(),
            portUsb: $('#portUsb').val(),
            portPci: $('#portPci').val(),
        }
    } else if ($("#nameMat").val() == 'phone') {
        if ($("#chargeur").is(':checked')) {
            $("#chargeur").attr('value', 'true');
        } else {
            $("#chargeur").attr('value', 'false');
        }
        if ($("#cable").is(':checked')) {
            $("#cable").attr('value', 'true');
        } else {
            $("#cable").attr('value', 'false');
        }
        if ($("#housse").is(':checked')) {
            $("#housse").attr('value', 'true');
        } else {
            $("#housse").attr('value', 'false');
        }
        Inventaire = {
            actif: $("#actif").val(),
            name: $('#nameMat').val(),
            type: $('#type').val(),
            numSerie: $('#numSerie').val(),
            marque: $('#marque').val(),
            imei1: $('#imei1').val(),
            imei2: $('#imei2').val(),
            chargeur: $('#chargeur').val(),
            cable: $('#cable').val(),
            housse: $('#housse').val()
        }
    }
    console.log("Inventaire", Inventaire);
    $.ajax({
        url: '/addInventaire',
        method: 'post',
        data: Inventaire,
        success: function (response) {
            if (response == "error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Vous devez completer les champs'
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
                //searchOnDatatable(inventaireDataT, Inventaire.code)
                if (Inventaire.name == "ecran" && Inventaire.actif == "true") {
                    window.location = "/inventaireEcran"
                } else if (Inventaire.name == "uc" && Inventaire.actif == "true") {
                    window.location = "/inventaire"
                } else if (Inventaire.name == "souris" && Inventaire.actif == "true") {
                    window.location = "/inventaireSouris"
                } else if (Inventaire.name == "phone" && Inventaire.actif == "true") {
                    window.location = "/inventairePhone"
                } else if (Inventaire.name == "clavier" && Inventaire.actif == "true") {
                    window.location = "/inventaireClavier"
                } else if (Inventaire.name == "ecran" && Inventaire.actif == "false") {
                    window.location = "/inventaire-inact-ecran"
                } else if (Inventaire.name == "uc" && Inventaire.actif == "false") {
                    window.location = "/inventaire-inact-uc"
                } else if (Inventaire.name == "souris" && Inventaire.actif == "false") {
                    window.location = "/inventaire-inact-souris"
                } else if (Inventaire.name == "phone" && Inventaire.actif == "false") {
                    window.location = "/inventaire-inact-phone"
                } else if (Inventaire.name == "clavier" && Inventaire.actif == "false") {
                    window.location = "/inventaire-inact-clavier"
                }
            }
        }
    })
})

//Empty form Inventaire
function clearForm() {
    $('#nameMat').val('');
    $('#type').val('');
    $('#localisation').val('');
    $('#departement').val('');
    $('#equipement').val('');
    $('#numSerie').val('');
    $('#marque').val('');
    $('#processeur').val('');
    $('#ram').val('');
    $('#diskDur').val('');
    $('#capacite').val('');
    $('#cleWin').val('');
    $('#resolution').val('');
    $("#portHdmi").attr('value', 'false');
    $("#portVga").attr('value', 'false');
    $("#portUsb").attr('value', 'false');
    $("#portPci").attr('value', 'false');
    $('#imei1').val('');
    $('#imei2').val('');
    $("#chargeur").attr('value', 'false');
    $("#cable").attr('value', 'false');
    $("#housse").attr('value', 'false');

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