const mongoose = require('mongoose')

const Inventaire = mongoose.Schema({
    actif: Boolean,
    name: String,
    nomPoste: String,
    type: String,
    localisation: String,
    departement: String,
    equipement: String,
    numSerie: String,
    marque: String,
    processeur: String,
    ram: String,
    diskDur: String,
    capacite: String,
    cleWin: String,
    cleWinOriginal: String,
    resolution: String,
    portHdmi: Boolean,
    portVga: Boolean,
    portUsb: Boolean,
    portDvi: Boolean,
    portPci: Boolean,
    imei1: String,
    imei2: String,
    chargeur: Boolean,
    cable: Boolean,
    housse: Boolean,
    antivirus: String,
    vpn: String,
    nbUsb: String,
    modelNum: String,
    commentaire: String,
    versionWin: String
})

module.exports = mongoose.model('Inventaire', Inventaire)