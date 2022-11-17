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
                'data': 'antivirus', 'render': function (antivirus) {
                    if (!antivirus) {
                        return ""
                    } else {
                        return antivirus
                    }
                }
            },
            {
                'data': 'vpn', 'render': function (vpn) {
                    if (!vpn) {
                        return ""
                    } else {
                        return vpn
                    }
                }
            },
            {
                'data': 'nbUsb', 'render': function (nbUsb) {
                    if (!nbUsb) {
                        return ""
                    } else {
                        return nbUsb
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
                'data': 'antivirus', 'render': function (antivirus) {
                    if (!antivirus) {
                        return ""
                    } else {
                        return antivirus
                    }
                }
            },
            {
                'data': 'vpn', 'render': function (vpn) {
                    if (!vpn) {
                        return ""
                    } else {
                        return vpn
                    }
                }
            },
            {
                'data': 'nbUsb', 'render': function (nbUsb) {
                    if (!nbUsb) {
                        return ""
                    } else {
                        return nbUsb
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

    $(".antivirus").css('display', "none")
    $(".vpn").css('display', "none")
    $(".usb").css('display', "none")

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
        $(".antivirus").css('display', "block")
        $(".vpn").css('display', "block")
        $(".usb").css('display', "block")
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
        $(".antivirus").css('display', "none")
        $(".vpn").css('display', "none")
        $(".usb").css('display', "none")
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
        $(".antivirus").css('display', "none")
        $(".vpn").css('display', "none")
        $(".usb").css('display', "none")
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
        $(".antivirus").css('display', "none")
        $(".vpn").css('display', "none")
        $(".usb").css('display', "none")
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
            antivirus: $('#antivirus').val(),
            vpn: $('#vpn').val(),
            usb: $('#usb').val(),
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
    //console.log("Inventaire", Inventaire);
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
    $('#antivirus').val('');
    $('#vpn').val('');
    $('#usb').val('');

    $('#cancelMat').click();
}

function searchOnDatatable(dataTab, value) {
    currentPage = dataTab.page();
    dataTab.search(value).draw();
}


//Update Inventaire
var nameMatA = ''
var typeA = ""
var localisationA = ""
var departementA = ""
var equipementA = ""
var numSerieA = ''
var marqueA = ""
var processeurA = ""
var ramA = ""
var diskDurA = ""
var capaciteA = ''
var cleWinA = ""
var resolutionA = ""
var portHdmiA = ""
var portVgaA = ""
var portUsbA = ''
var portPciA = ""
var imei1A = ""
var imei2A = ""
var chargeurA = ""
var cableA = ""
var housseA = ""
var antivirusA = ""
var vpnA = ""
var nbreUsbA = ""
$(document).on('click', '.btnUpdateInventaire', function () {


    $(".typeUpdat").css('display', "none")
    $(".localisationUpdat").css('display', "none")
    $(".departementUpdat").css('display', "none")
    $(".equipementUpdat").css('display', "none")
    $(".numSerieUpdat").css('display', "none")
    $(".marqueUpdat").css('display', "none")
    $(".processeurUpdat").css('display', "none")
    $(".ramUpdat").css('display', "none")
    $(".diskDurUpdat").css('display', "none")
    $(".capaciteUpdat").css('display', "none")
    $(".cleWinUpdat").css('display', "none")
    $(".resolutionUpdat").css('display', "none")
    $(".imeiUpdat").css('display', "none")

    $(".antivirusUpdat").css('display', "none")
    $(".vpnUpdat").css('display', "none")
    $(".usbUpdat").css('display', "none")

    $(".chargeur-cable-housseUpdat").css('display', "none")
    $(".portsClavierUpdat").css('display', "none")
    $(".portsEcranUpdat").css('display', "none")

    var getCol = $(this).closest('tr');
    var name = getCol.find('td:eq(0)').text();
    console.log("name", name);
    nameMatA = getCol.find('td:eq(0)').text();
    console.log("nameMatA", nameMatA);
    $(".typeUpdat").css('display', "block")
    $(".localisationUpdat").css('display', "block")
    $(".departementUpdat").css('display', "block")
    if (nameMatA == "uc") {
        typeA = getCol.find('td:eq(1)').text()
        localisationA = getCol.find('td:eq(2)').text()
        departementA = getCol.find('td:eq(3)').text()
        equipementA = getCol.find('td:eq(4)').text()
        numSerieA = getCol.find('td:eq(5)').text()
        marqueA = getCol.find('td:eq(6)').text()
        processeurA = getCol.find('td:eq(7)').text()
        ramA = getCol.find('td:eq(8)').text()
        diskDurA = getCol.find('td:eq(9)').text()
        capaciteA = getCol.find('td:eq(10)').text()
        cleWinA = getCol.find('td:eq(11)').text()
        antivirusA = getCol.find('td:eq(12)').text()
        vpnA = getCol.find('td:eq(13)').text()
        nbreUsbA = getCol.find('td:eq(14)').text()

        $(".localisationUpdat").css('display', "block")
        $(".departementUpdat").css('display', "block")
        $(".equipementUpdat").css('display', "block")
        $(".processeurUpdat").css('display', "block")
        $(".ramUpdat").css('display', "block")
        $(".diskDurUpdat").css('display', "block")
        $(".capaciteUpdat").css('display', "block")
        $(".cleWinUpdat").css('display', "block")
        $(".antivirusUpdat").css('display', "block")
        $(".vpnUpdat").css('display', "block")
        $(".usbUpdat").css('display', "block")
        $(".portHdmiUpdat").css('display', "none")
        $(".portUsbUpdat").css('display', "none")
        $(".imeiUpdat").css('display', "none")


        $(".chargeur-cable-housse").css('display', "none")
    } else if (nameMatA == "ecran") {
        typeA = getCol.find('td:eq(1)').text()
        localisationA = getCol.find('td:eq(2)').text()
        departementA = getCol.find('td:eq(3)').text()
        equipementA = getCol.find('td:eq(4)').text()
        numSerieA = getCol.find('td:eq(5)').text()
        marqueA = getCol.find('td:eq(6)').text()
        resolutionA = getCol.find('td:eq(7)').text()
        portHdmiA = getCol.find('td:eq(8)').text()
        portVgaA = getCol.find('td:eq(9)').text()

        $(".localisationUpdat").css('display', "block")
        $(".departementUpdat").css('display', "block")
        $(".equipementUpdat").css('display', "block")
        $(".resolutionUpdat").css('display', 'block')
        $(".portsEcranUpdat").css('display', 'block')
        $(".processeurUpdat").css('display', "none")
        $(".ramUpdat").css('display', "none")
        $(".diskDurUpdat").css('display', "none")
        $(".capaciteUpdat").css('display', "none")
        $(".cleWinUpdat").css('display', "none")
        $(".portsClavierUpdat").css('display', "none")
        $(".imeiUpdat").css('display', "none")
        $(".antivirusUpdat").css('display', "none")
        $(".vpnUpdat").css('display', "none")
        $(".portUsbUpdat").css('display', "none")
        $(".usbUpdat").css('display', "none")
        $(".chargeur-cable-housseUpdat").css('display', "none")
    } else if (nameMatA == "clavier" || nameMatA == "souris") {
        typeA = getCol.find('td:eq(1)').text()
        localisationA = getCol.find('td:eq(2)').text()
        departementA = getCol.find('td:eq(3)').text()
        equipementA = getCol.find('td:eq(4)').text()
        numSerieA = getCol.find('td:eq(5)').text()
        marqueA = getCol.find('td:eq(6)').text()
        portUsbA = getCol.find('td:eq(7)').text()
        portPciA = getCol.find('td:eq(8)').text()

        $(".processeurUpdat").css('display', "none")
        $(".ramUpdat").css('display', "none")
        $(".diskDurUpdat").css('display', "none")
        $(".capaciteUpdat").css('display', "none")
        $(".cleWinUpdat").css('display', "none")
        $(".localisationUpdat").css('display', "block")
        $(".departementUpdat").css('display', "block")
        $(".equipementUpdat").css('display', "block")
        $(".portsClavierUpdat").css('display', "block")
        $(".portsEcranUpdat").css('display', "none")
        $(".portHdmiUpdat").css('display', "none")
        $(".imeiUpdat").css('display', "none")
        $(".antivirusUpdat").css('display', "none")
        $(".vpnUpdat").css('display', "none")
        $(".usbUpdat").css('display', "none")
        $(".chargeur-cable-housseUpdat").css('display', "none")
    } else if (nameMatA == "phone") {
        typeA = getCol.find('td:eq(1)').text()
        numSerieA = getCol.find('td:eq(2)').text()
        marqueA = getCol.find('td:eq(3)').text()
        imei1A = getCol.find('td:eq(4)').text()
        imei2A = getCol.find('td:eq(5)').text()
        chargeurA = getCol.find('td:eq(6)').text()
        cableA = getCol.find('td:eq(7)').text()
        housseA = getCol.find('td:eq(8)').text()

        $(".imeiUpdat").css('display', "block")
        $(".chargeur-cable-housseUpdat").css('display', "block")
        $(".processeurUpdat").css('display', "none")
        $(".ramUpdat").css('display', "none")
        $(".diskDurUpdat").css('display', "none")
        $(".capaciteUpdat").css('display', "none")
        $(".cleWinUpdat").css('display', "none")
        $(".localisationUpdat").css('display', "none")
        $(".departementUpdat").css('display', "none")
        $(".equipementUpdat").css('display', "none")
        $(".portsClavierUpdat").css('display', "none")
        $(".antivirusUpdat").css('display', "none")
        $(".vpnUpdat").css('display', "none")
        $(".usbUpdat").css('display', "none")
        $(".portsEcranUpdat").css('display', "none")
        $(".portUsbUpdat").css('display', "none")
        $(".portHdmiUpdat").css('display', "none")
    }
    console.log("dfsdf");

    var getActif = $("#getActif").text()
    var numAct = getActif.search("Actif")
    //console.log("numAct", numAct);
    if (numAct == 0) {
        $("#actifUpdat").prop("checked", true)
    }

    console.log("portHdmiA", portHdmiA);
    console.log("portVgaA", portVgaA);
    if (portHdmiA == "true") {
        $("#portHdmiUpdat").prop("checked", true)
    }
    if (portVgaA == "true") {
        $("#portVgaUpdat").prop("checked", true)
    }
    if (portUsbA == "true") {
        $("#portUsbUpdat").prop("checked", true)
    }
    if (portPciA == "true") {
        $("#portPciUpdat").prop("checked", true)
    }
    if (chargeurA == "true") {
        $("#chargeurUpdat").prop("checked", true)
    }

    if (cableA == "true") {
        $("#cableUpdat").prop("checked", true)
    }
    if (housseA == "true") {
        $("#housseUpdat").prop("checked", true)
    }
    // console.log("nameMatA", name);
    $("#nameMatUpdat").val(nameMatA);
    $("#typeUpdat").val(typeA)
    $("#localisationUpdat").val(localisationA)
    $("#departementUpdat").val(departementA)
    $("#equipementUpdat").val(equipementA)
    $("#numSerieUpdat").val(numSerieA);
    $("#marqueUpdat").val(marqueA)
    $("#processeurUpdat").val(marqueA)
    $("#ramUpdat").val(ramA)
    $("#diskDurUpdat").val(diskDurA)
    $("#capaciteUpdat").val(capaciteA);
    $("#cleWinUpdat").val(cleWinA)
    $("#resolutionUpdat").val(resolutionA)
    $("#antivirusUpdat").val(antivirusA)
    $("#vpnUpdat").val(vpnA)
    $("#usbUpdat").val(nbreUsbA);
    $("#portHdmiUpdat").val(portHdmiA)
    $("#portVgaUpdat").val(portVgaA)
    $("#portUsbUpdat").val(portUsbA)
    $("#portPciUpdat").val(portPciA)
    $("#imei1Updat").val(imei1A);
    $("#imei2Updat").val(imei2A)
    $("#chargeurUpdat").val(chargeurA)
    $("#cableUpdat").val(cableA)
    $("#housseUpdat").val(housseA)

})


// Save Update Inventaire
$(document).on('click', '#saveUpdateMat', function () {

    if ($("#portHdmiUpdat").is(':checked')) {
        $("#portHdmiUpdat").attr('value', 'true');
    } else {
        $("#portHdmiUpdat").attr('value', 'false');
    }
    if ($("#portVgaUpdat").is(':checked')) {
        $("#portVgaUpdat").attr('value', 'true');
    } else {
        $("#portVgaUpdat").attr('value', 'false');
    }
    if ($("#portUsbUpdat").is(':checked')) {
        $("#portUsbUpdat").attr('value', 'true');
    } else {
        $("#portUsbUpdat").attr('value', 'false');
    }
    if ($("#portPciUpdat").is(':checked')) {
        $("#portPciUpdat").attr('value', 'true');
    } else {
        $("#portPciUpdat").attr('value', 'false');
    }
    if ($("#chargeurUpdat").is(':checked')) {
        $("#chargeurUpdat").attr('value', 'true');
    } else {
        $("#chargeurUpdat").attr('value', 'false');
    }
    if ($("#cableUpdat").is(':checked')) {
        $("#cableUpdat").attr('value', 'true');
    } else {
        $("#cableUpdat").attr('value', 'false');
    }
    if ($("#housseUpdat").is(':checked')) {
        $("#housseUpdat").attr('value', 'true');
    } else {
        $("#housseUpdat").attr('value', 'false');
    }
    console.log("saveUpdateMat");
    var nameMatUpd = $("#nameMatUpdat").val();
    var typeUpdat = $("#typeUpdat").val()
    var localisationUpdat = $("#localisationUpdat").val()
    var departementUpdat = $("#departementUpdat").val()
    var equipementUpdat = $("#equipementUpdat").val()
    var numSerieUpdat = $("#numSerieUpdat").val();
    var marqueUpdat = $("#marqueUpdat").val()
    var processeurUpdat = $("#processeurUpdat").val()
    var ramUpdat = $("#ramUpdat").val()
    var diskDurUpdat = $("#diskDurUpdat").val()
    var capaciteUpdat = $("#capaciteUpdat").val();
    var cleWinUpdat = $("#cleWinUpdat").val()
    var resolutionUpdat = $("#resolutionUpdat").val()
    var antivirusUpdat = $("#antivirusUpdat").val()
    var vpnUpdat = $("#vpnUpdat").val()
    var usbUpdat = $("#usbUpdat").val();
    // var portHdmiUpdat = $("#portHdmiUpdat").val()
    // var portVgaUpdat = $("#portVgaUpdat").val()
    // var portUsbUpdat = $("#portUsbUpdat").val()
    // var portPciUpdat = $("#portPciUpdat").val()
    var imei1Updat = $("#imei1Updat").val();
    var imei2Updat = $("#imei2Updat").val()
    // var chargeurUpdat = $("#chargeurUpdat").val()
    // var cableUpdat = $("#cableUpdat").val()
    // var housseUpdat = $("#housseUpdat").val()

    var matUpd = {
        nameMatUpd: nameMatUpd,
        typeUpdat: typeUpdat,
        localisationUpdat: localisationUpdat,
        departementUpdat: departementUpdat,
        equipementUpdat: equipementUpdat,
        numSerieUpdat: numSerieUpdat,
        marqueUpdat: marqueUpdat,
        processeurUpdat: processeurUpdat,
        ramUpdat: ramUpdat,
        diskDurUpdat: diskDurUpdat,
        capaciteUpdat: capaciteUpdat,
        cleWinUpdat: cleWinUpdat,
        resolutionUpdat: resolutionUpdat,
        antivirusUpdat: antivirusUpdat,
        vpnUpdat: vpnUpdat,
        usbUpdat: usbUpdat,


        nameMatA: nameMatA,
        typeA: typeA,
        localisationA: localisationA,
        departementA: departementA,
        equipementA: equipementA,
        numSerieA: numSerieA,
        marqueA: marqueA,
        processeurA: processeurA,
        ramA: ramA,
        diskDurA: diskDurA,
        capaciteA: capaciteA,
        cleWinA: cleWinA,
        resolutionA: resolutionA,
        antivirusA: antivirusA,
        vpnA: vpnA,
        nbreUsbA: nbreUsbA
    }

    $.ajax({
        url: "/updateInvent",
        method: 'post',
        data: matUpd,
        success: function (res) {
            //console.log("res", res);
            Swal.fire(
                'Update',
                'Mise à jour réussie du matériel ! ',
                'success',
                {
                    confirmButtonText: 'OK',
                }
            )
            // $("#nameUpdatMat").val("");
            // $("#nombreUpdatMat").val("");
            // $("#cancelUpdate").click();
            // $('#inventaireDataT').DataTable().ajax.reload(null, false)
            // window.location = '/inventaire'
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