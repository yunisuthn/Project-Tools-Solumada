const express = require('express')
const routeExp = express.Router()
const mongoose = require('mongoose')

const InventaireModel = require('../Model/InventaireModel')
const InstructionModel = require('../Model/InstructionModel')
const TLModel = require('../Model/TeamLeaderModel')
const AgentModel = require('../Model/AgentModel')
const UserModel = require('../Model/UserModel')
const EvaluationAgent = require('../Model/EvaluationAgentModel')
const PlanningModel = require("../Model/PlanningModel")
const HistoriqueModel = require("../Model/HistoriqueModel")
const ProjectModel = require("../Model/ProjectModel")
const ProjetFileModel = require("../Model/ProjetFileModel")
const moment = require("moment")

const ReportingModel = require("../Model/ReportingModel");
const ProductionModel = require("../Model/ProductionReporting");
const FauteModel = require("../Model/FauteReporting");

const ProjectSheets = require('../Model/ProjectSheets')

var formidable = require('formidable');
//Operation Sheets
routeExp.route('/operation').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "Admin") {
        res.render("./operation/operation.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/add_row/:options').post(async function (req, res) {
    var session = req.session
    var exception = ["OtherTasks", "FormerProjects", "Upcoming"]
    var opt = req.params.options;
    var id = req.body.id;
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                if (id == "") {
                    var data = {
                        type: opt,
                        option: "",
                        name: "",
                        project_leader: "",
                        team_leader: "",
                        date_start: ""
                    }
                    var last = await ProjectSheets(data).save()
                    if (exception.includes(opt)) {
                        await ProjectSheets.findOneAndUpdate({ _id: last._id }, {
                            option: "<div class='row'>" +
                                "<div class='col-md-6'>" +
                                "<i class='fa fa-save' onclick=save(" + "'" + last._id + "'" + ") style='color:green;font-size:30px;cursor:pointer'></i></div>" +
                                "<div class='col-md-6'><i class='fa fa-trash-o' onclick=delete_project(" + "'" + last._id + "'" + ") style='color:red;font-size:30px;cursor:pointer'></i></div>" + "</div>",
                            name: "<input type='text' class= 'form-control new" + last._id + "' >",
                            project_leader: "",
                            team_leader: "",
                            date_start: ""
                        })
                        res.send("Ok");
                    }
                    else {
                        await ProjectSheets.findOneAndUpdate({ _id: last._id }, {
                            option: "<div class='row'>" +
                                "<div class='col-md-6'>" +
                                "<i class='fa fa-save' onclick=save(" + "'" + last._id + "'" + ") style='color:green;font-size:30px;cursor:pointer'></i></div>" +
                                "<div class='col-md-6'><i class='fa fa-trash-o' onclick=delete_project(" + "'" + last._id + "'" + ") style='color:red;font-size:30px;cursor:pointer'></i></div>" + "</div>",
                            name: "<input type='text' class= 'form-control new" + last._id + "' >",
                            project_leader: "<input type='text' class= 'form-control new" + last._id + "'  >",
                            team_leader: "<input type='text' class= 'form-control new" + last._id + "'  >",
                            date_start: "<input type='date' class= 'form-control new" + last._id + "'  >"
                        })
                        res.send("Ok");
                    }


                }
                else {
                    var last = await ProjectSheets.findOne({ _id: id });
                    if (exception.includes(opt)) {
                        await ProjectSheets.findOneAndUpdate({ _id: id }, {
                            option: "<div class='row'>" +
                                "<div class='col-md-6'>" +
                                "<i class='fa fa-save' onclick=save(" + "'" + id + "'" + ") style='color:green;font-size:30px;cursor:pointer'></i></div>" +
                                "<div class='col-md-6'><i class='fa fa-trash-o' onclick=delete_project(" + "'" + id + "'" + ") style='color:red;font-size:30px;cursor:pointer'></i></div>" + "</div>",
                            name: "<input type='text' value='" + last.name + "' class= 'form-control new" + id + "' >",
                            project_leader: "",
                            team_leader: "",
                            date_start: ""
                        })
                        res.send("Ok")
                    }
                    else {
                        await ProjectSheets.findOneAndUpdate({ _id: id }, {
                            option: "<div class='row'>" +
                                "<div class='col-md-6'>" +
                                "<i class='fa fa-save' onclick=save(" + "'" + id + "'" + ") style='color:green;font-size:30px;cursor:pointer'></i></div>" +
                                "<div class='col-md-6'><i class='fa fa-trash-o' onclick=delete_project(" + "'" + id + "'" + ") style='color:red;font-size:30px;cursor:pointer'></i></div>" + "</div>",
                            name: "<input type='text' value='" + last.name + "' class= 'form-control new" + id + "' >",
                            project_leader: "<input type='text' value='" + last.project_leader + "' class= 'form-control new" + id + "'  >",
                            team_leader: "<input type='text' value='" + last.team_leader + "' class= 'form-control new" + last._id + "'  >",
                            date_start: "<input type='date' value='" + last.date_start + "' class= 'form-control new" + last._id + "'  >"
                        })
                        res.send("Ok")
                    }


                }

            })
        // option:"<div class='row'>"+
        // "<div class='col-md-6'><i class='fa fa-save' style='color:green;font-size:30px;cursor:pointer'></i></div>"+
        // "<div class='col-md-6'><i class='fa fa-trash-o' style='color:red;font-size:30px;cursor:pointer'></i></div>"+"</div>"
    } else {
        res.redirect("/")
    }
})

routeExp.route('/get_data/:options').get(async function (req, res) {
    var session = req.session
    var opt = req.params.options
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {

                var data_send = await ProjectSheets.find({ type: opt });
                res.send(data_send);
            })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/delete_project').post(async function (req, res) {
    var session = req.session
    var id = req.body.id;
    if (session.typeUtil == "Admin") {
        await ProjectSheets.findOneAndDelete({ _id: id })
        res.send("Ok");
    }
    else {
        res.redirect("/")
    }
})

routeExp.route('/save').post(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                await ProjectSheets.findOneAndUpdate({ _id: req.body.id }, {
                    name: req.body.name,
                    option: update_generator(req.body.id),
                    project_leader: req.body.project_leader,
                    team_leader: req.body.team_leader,
                    date_start: valid_date(moment(req.body.date_start).format("YYYY-MM-DD"))
                })
                res.send("Ok")
            })
    }
    else {
        res.redirect("/")
    }
})
function update_generator(id) {
    return "<div class='row'>" +
        "<div class='col-md-6'>" +
        "<i class='fa fa-edit' onclick=update_project(" + "'" + id + "'" + ") style='color:green;font-size:30px;cursor:pointer'></i></div>" +
        "<div class='col-md-6'><i class='fa fa-trash-o' onclick=delete_project(" + "'" + id + "'" + ") style='color:red;font-size:30px;cursor:pointer'></i></div>" + "</div>"
};
function valid_date(date) {
    if (date == "Invalid date") {
        return ""
    }
    else {
        return date
    }
}

// mongoose
//         .connect(
//             "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
//             {
//                 useUnifiedTopology: true,
//                 UseNewUrlParser: true
//             }
//         )
//         .then(async () => {
//             await ProjectSheets.deleteMany({});
//             console.log("done");
//         })

//planning cong?? Ricardo Base de donn??e
const leaveModel = require("../Model/leave")
const userModelClock = require("../Model/User")

const XLSX = require('xlsx');
const pdfParse = require("pdf-parse")
const fs = require("fs")

var dateTime = require('node-datetime');
const nodemailer = require("nodemailer")
const { findOneAndUpdate } = require('../Model/InventaireModel')
// const { route } = require('express/lib/application')
//login
var session
routeExp.route('/').get(async function (req, res) {
    session = req.session
    if (session.name) {
        res.redirect("/acceuil")
    } else {
        res.render("page-login.html", { erreur: "" })
    }
})

//acceuil
routeExp.route('/acceuil').get(async function (req, res) {
    session = req.session;
    //console.log("session", session);
    if (session.email) {
        res.render("acceuil.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/IT').get(async function (req, res) {
    session = req.session
    //console.log("session.typeUtil ", session.typeUtil);
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        res.render("./it/IT.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})


routeExp.route('/op_sheet').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "Admin") {
        res.render("./operation/operation_sheet.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/evaluationTL').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "Admin") {
        res.render("./operation/evaluationTL.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/production').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        res.render("./production/production.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

//ACTIF Inventaire
//Inventaire uc
routeExp.route('/inventaire').get(async function (req, res) {
    session = req.session
    var page = "actif/inventaireUC.html"
    await nombreIn(page, session, res)
})

//console.log("nombreIn()", nombreIn());
async function nombreIn(page, session, res) {
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var obj = {}
                obj.ucA = (await InventaireModel.find({ actif: true, name: "uc" })).length
                obj.ecranA = (await InventaireModel.find({ actif: true, name: "ecran" })).length
                obj.clavierA = (await InventaireModel.find({ actif: true, name: "clavier" })).length
                obj.sourisA = (await InventaireModel.find({ actif: true, name: "souris" })).length
                obj.phoneA = (await InventaireModel.find({ actif: true, name: "phone" })).length

                obj.ucI = (await InventaireModel.find({ actif: false, name: "uc" })).length
                obj.ecranI = (await InventaireModel.find({ actif: false, name: "ecran" })).length
                obj.clavierI = (await InventaireModel.find({ actif: false, name: "clavier" })).length
                obj.sourisI = (await InventaireModel.find({ actif: false, name: "souris" })).length
                obj.phoneI = (await InventaireModel.find({ actif: false, name: "phone" })).length
                //= ucA.length
                //console.log("obj", obj);
                res.render("./it/" + page, { type_util: session.typeUtil, obj: obj })
            })
    } else {
        res.redirect("/")
    }
}

// Get Inventaire ecran
routeExp.route('/inventaireEcran').get(async function (req, res) {
    session = req.session
    var page = "actif/inventaire-ecran.html"
    await nombreIn(page, session, res)
    // if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    //     res.render("./it/actif/inventaire-ecran.html", { type_util: session.typeUtil })
    // } else {
    //     res.redirect("/")
    // }
})

//Inventaire clavier
routeExp.route('/inventaireClavier').get(async function (req, res) {
    session = req.session

    var page = "actif/inventaire-clavier.html"
    await nombreIn(page, session, res)
    // if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    //     res.render("./it/actif/inventaire-clavier.html", { type_util: session.typeUtil })
    // } else {
    //     res.redirect("/")
    // }
})

//Inventaire souris
routeExp.route('/inventaireSouris').get(async function (req, res) {
    session = req.session
    var page = "actif/inventaire-souris.html"
    await nombreIn(page, session, res)
    // if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    //     res.render("./it/actif/inventaire-souris.html", { type_util: session.typeUtil })
    // } else {
    //     res.redirect("/")
    // }
})

//Inventaire phone
routeExp.route('/inventairePhone').get(async function (req, res) {
    session = req.session
    var page = "actif/inventaire-phone.html"
    await nombreIn(page, session, res)
    // if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    //     res.render("./it/actif/inventaire-phone.html", { type_util: session.typeUtil })
    // } else {
    //     res.redirect("/")
    // }
})


//INACTIF Inventaire
//Inventaire uc
routeExp.route('/inventaire-inact-uc').get(async function (req, res) {
    session = req.session
    var page = "inactif/inventaireUC.html"
    await nombreIn(page, session, res)
    // if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    //     res.render("./it/inactif/inventaireUC.html", { type_util: session.typeUtil })
    // } else {
    //     res.redirect("/")
    // }
})

// Get Inventaire ecran
routeExp.route('/inventaire-inact-ecran').get(async function (req, res) {
    session = req.session
    var page = "inactif/inventaire-ecran.html"
    await nombreIn(page, session, res)
    // if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    //     res.render("./it/inactif/inventaire-ecran.html", { type_util: session.typeUtil })
    // } else {
    //     res.redirect("/")
    // }
})

//Inventaire clavier
routeExp.route('/inventaire-inact-clavier').get(async function (req, res) {
    session = req.session
    var page = "inactif/inventaire-clavier.html"
    await nombreIn(page, session, res)
    // if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    //     res.render("./it/inactif/inventaire-clavier.html", { type_util: session.typeUtil })
    // } else {
    //     res.redirect("/")
    // }
})

//Inventaire souris
routeExp.route('/inventaire-inact-souris').get(async function (req, res) {
    session = req.session
    var page = "inactif/inventaire-souris.html"
    await nombreIn(page, session, res)
    // if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    //     res.render("./it/inactif/inventaire-souris.html", { type_util: session.typeUtil })
    // } else {
    //     res.redirect("/")
    // }
})

//Inventaire phone
routeExp.route('/inventaire-inact-phone').get(async function (req, res) {
    session = req.session
    var page = "inactif/inventaire-phone.html"
    await nombreIn(page, session, res)
    // if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    //     res.render("./it/inactif/inventaire-phone.html", { type_util: session.typeUtil })
    // } else {
    //     res.redirect("/")
    // }
})

// all instruction
routeExp.route('/instruction').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInstruct = await InstructionModel.find({ validation: true });
                var InstructAll = [];

                allInstruct.forEach(instr => {
                    instr.instruction = instr.instruction.substr(0, 50) + " ..."
                    //InstructAll.push(instr)
                });
                //console.log("allInstruct ", InstructAll);
                var instructionLong = await InstructionModel.find({ validation: true });
                res.render("./it/instruction.html", { type_util: session.typeUtil, allInstruct: allInstruct, instruction: instructionLong })
            })
    } else {
        res.redirect("/")
    }
})


routeExp.route('/addInventaire').post(async function (req, res) {
    var actif = req.body.actif
    var name = req.body.name
    var nomPoste = req.body.nomPoste
    var type = req.body.type
    var localisation = req.body.localisation
    var departement = req.body.departement
    var equipement = req.body.equipement
    var numSerie = req.body.numSerie
    var marque = req.body.marque
    var processeur = req.body.processeur
    var ram = req.body.ram
    var diskDur = req.body.diskDur
    var capacite = req.body.capacite
    var cleWin = req.body.cleWin
    var cleWinOriginal = req.body.cleWinOriginal
    var resolution = req.body.resolution
    var portHdmi = req.body.portHdmi
    var portVga = req.body.portVga
    var portDvi = req.body.portDvi
    var portUsb = req.body.portUsb
    var portPci = req.body.portPci
    var imei1 = req.body.imei1
    var imei2 = req.body.imei2
    var chargeur = req.body.chargeur
    var cable = req.body.cable
    var housse = req.body.housse
    var antivirus = req.body.antivirus
    var vpn = req.body.vpn
    var usb = req.body.usb
    var versionWin = req.body.versionWin
    var commentaire = req.body.commentaire

    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                if (type == "" &&
                    localisation == "" && departement == "" && equipement == "" && numSerie == "" &&
                    marque == "" && processeur == "" && ram == "" && diskDur == "" && capacite == "" && cleWin == "" && resolution == "" &&
                    portHdmi == "false" && portVga == "false" && portDvi == "false" && portUsb == "false" && portPci == "false" && imei1 == "" && imei2 == "" &&
                    chargeur == "false" && cable == "false" && housse == "false" && antivirus == "" && vpn == "" && usb == "" && commentaire == ""
                    && versionWin == "" && nomPoste == "") {
                    res.send('error')
                } else {
                    var newMat = {
                        actif: actif, nomPoste: nomPoste,
                        name: name, type: type,
                        localisation: localisation, departement: departement,
                        equipement: equipement, numSerie: numSerie,
                        marque: marque, processeur: processeur,
                        ram: ram, diskDur: diskDur,
                        capacite: capacite, cleWin: cleWin,
                        cleWinOriginal: cleWinOriginal,
                        resolution: resolution,
                        portHdmi: portHdmi, portVga: portVga, portDvi: portDvi,
                        portUsb: portUsb, portPci: portPci,
                        imei1: imei1, imei2: imei2,
                        chargeur: chargeur, cable: cable, housse: housse,
                        antivirus: antivirus,
                        vpn: vpn, nbUsb: usb, versionWin: versionWin, commentaire: commentaire
                    }
                    var mat = await InventaireModel(newMat).save()
                    //console.log("addInventaire", mat);

                    var historique = {
                        user: session.name,
                        model: "Ajout Inventaire",
                        date: new Date(),
                        crud: "Ajout",
                        old: {
                            "Actif": actif,
                            "Nom du Poste": nomPoste,
                            "Nom": name, "Type": type,
                            "Localisation": localisation,
                            "D??partement": departement,
                            "Equipement": equipement,
                            "Num Serie": numSerie,
                            "Marque": marque, "Processeur": processeur,
                            "RAM": ram, "Disque Dur": diskDur,
                            "Capacit??": capacite,
                            "Cl?? Win Craqu??": cleWin,
                            "Cl?? Win Original": cleWinOriginal,
                            "R??solution": resolution,
                            "Port HDMI": portHdmi, "Port VGA": portVga,
                            "Port DVI": portDvi,
                            "Port USB": portUsb, "Port PCI": portPci,
                            "IMEI1": imei1, "IMEI2": imei2,
                            "Chargeur": chargeur,
                            "Cable": cable, "Housse": housse,
                            "Antivirus": antivirus,
                            "VPN": vpn, "Nombre USB": usb,
                            "Version Win": versionWin,
                            "Commentaire": commentaire
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()



                    res.send("success")
                }
            })
    } else {
        res.redirect("/")
    }
})

//GET DATA inventaire ACTIF
//invetaire UC
routeExp.route('/allUCActifInventaire').get(async function (req, res) {
    session = req.session
    //console.log("allUcActif");
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "uc", actif: true })//, commentaire: "commentaire" })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})

// Get all Material in inventary Ecran
routeExp.route('/allEcranActifInventaire').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "ecran", actif: true })
                //console.log("allInv", allInv);
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})


// Get all Material in inventary Clavier
routeExp.route('/allClavierActifInventaire').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "clavier", actif: true })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})

// Get all Material in inventary souris
routeExp.route('/allSourisActifInventaire').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "souris", actif: true })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})

// Get all Material in inventary phone
routeExp.route('/allPhoneActifInventaire').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "phone", actif: true })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})

//GET DATA inventaire INACTIF
//invetiaire UC inactif
routeExp.route('/allUCInactifInventaire').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "uc", actif: false })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})
// Get all Material in inventary Ecran
routeExp.route('/allEcranInactifInventaire').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "ecran", actif: false })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})


// Get all Material in inventary Clavier
routeExp.route('/allClavierInactifInventaire').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "clavier", actif: false })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})

// Get all Material in inventary souris
routeExp.route('/allSourisInactifInventaire').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "souris", actif: false })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})

// Get all Material in inventary phone
routeExp.route('/allPhoneInactifInventaire').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "phone", actif: false })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})



//get One Material
routeExp.route('/getInventaire').post(async function (req, res) {
    var codeM = req.body.code

    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var invent = await InventaireModel.findOne({ code: codeM })

                // console.log("codeM", invent);
                res.send(invent)
            })
    } else {
        res.redirect("/")
    }
})

//get One Instruction
routeExp.route('/getInstruction').post(async function (req, res) {
    var name = req.body.name

    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                //console.log("name", name);
                var instru = await InstructionModel.findOne({ name: name })

                //console.log("instru", instru);
                res.send(instru)
            })
    } else {
        res.redirect("/")
    }
})

//Update Material
routeExp.route('/updateInvent').post(async function (req, res) {
    session = req.session
    var actifUpdat = req.body.actifUpdat;
    var nameMatUpd = req.body.nameMatUpd;
    var typeUpdat = req.body.typeUpdat;
    var localisationUpdat = req.body.localisationUpdat;
    var departementUpdat = req.body.departementUpdat;
    var equipementUpdat = req.body.equipementUpdat;
    var numSerieUpdat = req.body.numSerieUpdat;
    var marqueUpdat = req.body.marqueUpdat;
    var processeurUpdat = req.body.processeurUpdat;
    var ramUpdat = req.body.ramUpdat;
    var diskDurUpdat = req.body.diskDurUpdat;
    var capaciteUpdat = req.body.capaciteUpdat;
    var cleWinUpdat = req.body.cleWinUpdat;
    var cleWinOriginalUpdat = req.body.cleWinOriginalUpdat;
    var resolutionUpdat = req.body.resolutionUpdat;
    var antivirusUpdat = req.body.antivirusUpdat;
    var vpnUpdat = req.body.vpnUpdat;
    var usbUpdat = req.body.usbUpdat;
    var portHdmiUpdat = req.body.portHdmiUpdat;
    var portVgaUpdat = req.body.portVgaUpdat;
    var portDviUpdat = req.body.portDviUpdat;
    var portUsbUpdat = req.body.portUsbUpdat;
    var portPciUpdat = req.body.portPciUpdat;
    var imei1Updat = req.body.imei1Updat;
    var imei2Updat = req.body.imei2Updat;
    var chargeurUpdat = req.body.chargeurUpdat;
    var cableUpdat = req.body.cableUpdat;
    var housseUpdat = req.body.housseUpdat;
    var versionWinUpdat = req.body.versionWinUpdat;
    var commentaireUpdat = req.body.commentaireUpdat;
    var nomPosteUpdat = req.body.nomPosteUpdat;

    var nomPosteA = req.body.nomPosteA;
    var portHdmiA = req.body.portHdmiA;
    var portVgaA = req.body.portVgaA;
    var portDviA = req.body.portDviA;
    var portUsbA = req.body.portUsbA;
    var portPciA = req.body.portPciA;
    var imei1A = req.body.imei1A;
    var imei2A = req.body.imei2A;
    var chargeurA = req.body.chargeurA;
    var cableA = req.body.cableA;
    var housseA = req.body.housseA;
    var nameMatA = req.body.nameMatA;
    var typeA = req.body.typeA;
    var localisationA = req.body.localisationA;
    var departementA = req.body.departementA;
    var equipementA = req.body.equipementA;
    var numSerieA = req.body.numSerieA;
    var marqueA = req.body.marqueA;
    var processeurA = req.body.processeurA;
    var ramA = req.body.ramA;
    var diskDurA = req.body.diskDurA;
    var capaciteA = req.body.capaciteA;
    var cleWinA = req.body.cleWinA;
    var resolutionA = req.body.resolutionA;
    var antivirusA = req.body.antivirusA;
    var vpnA = req.body.vpnA;
    var nbreUsbA = req.body.nbreUsbA
    var actifA = req.body.actifA;
    var versionWinA = req.body.versionWinA;
    var commentaireA = req.body.commentaireA;
    var id = req.body.id

    // console.log("versionWinA", versionWinA);
    // console.log("versionWinAUpdat", versionWinUpdat);
    //console.log("nombreInventA ", nombreInventA, " nameInventA ", nameInventA);
    //console.log("session", session);
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {

                // console.log("actif = ", actifUpdat);
                // console.log("name = ", nameMatUpd);
                // console.log("typeA = ", typeUpdat);
                // console.log("localisationA = ", localisationUpdat);
                // console.log("departementA = ", departementUpdat);
                // console.log("equipementA = ", equipementUpdat);
                // console.log("numSerieA = ", numSerieUpdat);
                // console.log("marqueA = ", marqueUpdat);

                // console.log("processeurA = ", processeurUpdat);
                // console.log("ramA = ", ramUpdat);
                // console.log("diskDurA = ", diskDurUpdat);
                // console.log("capaciteA = ", capaciteUpdat);
                // console.log("cleWinA = ", cleWinUpdat);
                // console.log("antivirusA = ", antivirusUpdat);
                // console.log("vpnA = ", vpnUpdat);
                // console.log("nbreUsbA = ", usbUpdat);
                // console.log("versionWinA = ", versionWinUpdat);
                // console.log("commentaireA = ", commentaireA);


                // console.log("resolutionA = ", resolutionA);
                // console.log("portHdmiA = ", portHdmiA);
                // console.log("portVgaA = ", portVgaA);

                var getInvet = await InventaireModel.findById({
                    _id: id
                })
                // console.log("getInve", getInvet);
                // console.log("id", actifUpdat);
                var updat
                if (getInvet.name == "uc") {

                    //console.log("getInve", getInvet);
                    updat = await InventaireModel.findOneAndUpdate({
                        _id: id
                    },
                        {
                            actif: actifUpdat,
                            name: nameMatUpd, nomPoste: nomPosteUpdat,
                            type: typeUpdat,
                            localisation: localisationUpdat,
                            departement: departementUpdat,
                            equipement: equipementUpdat,
                            numSerie: numSerieUpdat,
                            marque: marqueUpdat,
                            processeur: processeurUpdat,
                            ram: ramUpdat,
                            diskDur: diskDurUpdat,
                            capacite: capaciteUpdat,
                            cleWin: cleWinUpdat,
                            cleWinOriginal: cleWinOriginalUpdat,
                            antivirus: antivirusUpdat,
                            vpn: vpnUpdat,
                            nbUsb: usbUpdat,
                            versionWin: versionWinUpdat,
                            commentaire: commentaireUpdat
                        })
                    if (getInvet.actif == actifUpdat && nameMatUpd == nameMatA && typeUpdat == typeA
                        && localisationA == localisationUpdat && departementA == departementUpdat
                        && equipementA == equipementUpdat && numSerieUpdat == numSerieA &&
                        marqueUpdat == marqueA
                        && processeurA == processeurUpdat && ramA == ramUpdat
                        && diskDurA == diskDurUpdat && capaciteA == capaciteUpdat &&
                        cleWinA == cleWinUpdat
                        && antivirusA == antivirusUpdat && vpnA == vpnUpdat
                        && nbreUsbA == usbUpdat && commentaireA == commentaireUpdat &&
                        versionWinA == versionWinUpdat) {

                    } else {
                        var historique = {
                            user: session.name,
                            model: "Update Inventaire UC",
                            crud: "Modification",
                            date: new Date(),
                            old: {
                                "Actif": actifA,
                                "Nom du Mat??riel": nameMatA,
                                "Type": typeA,
                                "Localisation": localisationA,
                                "D??partement": departementA,
                                "Equipement": equipementA,
                                "Num S??rie": numSerieA,
                                "Marque": marqueA,
                                "Processeur": processeurA, "RAM": ramA,
                                "Disque dure": diskDurA, "Capacit??": capaciteA,
                                "Cl?? Window": cleWinA, "Antivirus": antivirusA,
                                "VPN": vpnA, "Nombre USB": nbreUsbA,
                                "Commentaire": commentaireA
                            },
                            new: {
                                "Actif": actifUpdat,
                                "Nom du Mat??riel": nameMatUpd,
                                "Type": typeUpdat,
                                "Localisation": localisationUpdat,
                                "D??partement": departementUpdat,
                                "Equipement": equipementUpdat,
                                "Num S??rie": numSerieUpdat,
                                "Marque": marqueUpdat,
                                "Processeur": processeurUpdat, "RAM": ramUpdat,
                                "Disque dure": diskDurUpdat, "Capacit??": capaciteUpdat,
                                "Cl?? Window": cleWinUpdat, "Antivirus": antivirusUpdat,
                                "VPN": vpnUpdat, "Nombre USB": usbUpdat,
                                "Commentaire": commentaireUpdat
                            }
                        }
                        var historie = await HistoriqueModel(historique).save()
                        // console.log("historique", historie);
                    }
                } else if (getInvet.name == "ecran") {
                    updat = await InventaireModel.findOneAndUpdate({
                        _id: id
                    },
                        {
                            actif: actifUpdat,
                            name: nameMatUpd,
                            type: typeUpdat,
                            localisation: localisationUpdat,
                            departement: departementUpdat,
                            equipement: equipementUpdat,
                            numSerie: numSerieUpdat,
                            marque: marqueUpdat,
                            resolution: resolutionUpdat,
                            portHdmi: portHdmiUpdat,
                            portVga: portVgaUpdat,
                            portDvi: portDviUpdat,
                            commentaire: commentaireUpdat

                        })

                    if (actifA == actifUpdat && nameMatUpd == nameMatA && typeUpdat == typeA
                        && localisationA == localisationUpdat && departementA == departementUpdat
                        && equipementA == equipementUpdat && numSerieUpdat == numSerieA &&
                        marqueUpdat == marqueA
                        && resolutionA == resolutionUpdat && portHdmiA == portHdmiUpdat
                        && portVgaA == portVgaUpdat && portDviA == portDviUpdat
                        && commentaireA == commentaireUpdat) {

                    } else {
                        var historique = {
                            user: session.name,
                            model: "Update Inventaire ??cran",
                            crud: "Modification",
                            date: new Date(),
                            old: {
                                "Actif": actifA,
                                "Nom du Mat??riel": nameMatA,
                                "Type": typeA,
                                "Localisation": localisationA,
                                "D??partement": departementA,
                                "Equipement": equipementA,
                                "Num S??rie": numSerieA,
                                "Marque": marqueA,
                                "R??solution": resolutionA,
                                "Port HDMI": portHdmiA,
                                "Port VGA": portVgaA,
                                "Port DVI": portDviA,
                                "Commentaire": commentaireA
                            },
                            new: {
                                "Actif": actifUpdat,
                                "Nom du Mat??riel": nameMatUpd,
                                "Type": typeUpdat,
                                "Localisation": localisationUpdat,
                                "D??partement": departementUpdat,
                                "Equipement": equipementUpdat,
                                "Num S??rie": numSerieUpdat,
                                "Marque": marqueUpdat,
                                "R??solution": resolutionUpdat,
                                "Port HDMI": portHdmiUpdat,
                                "Port VGA": portVgaUpdat,
                                "Port DVI": portDviUpdat,
                                "Commentaire": commentaireUpdat

                            }
                        }
                        var historie = await HistoriqueModel(historique).save()
                        //console.log("historique", historie);
                    }
                } else if (getInvet.name == "souris" || getInvet.name == "clavier") {
                    updat = await InventaireModel.findOneAndUpdate({
                        actif: actifA,
                        name: nameMatA,
                        type: typeA,
                        localisation: localisationA,
                        departement: departementA,
                        equipement: equipementA,
                        numSerie: numSerieA,
                        marque: marqueA,
                        portUsb: portUsbA,
                        portPci: portPciA,
                        commentaire: commentaireA
                    },
                        {
                            actif: actifUpdat,
                            name: nameMatUpd,
                            type: typeUpdat,
                            localisation: localisationUpdat,
                            departement: departementUpdat,
                            equipement: equipementUpdat,
                            numSerie: numSerieUpdat,
                            marque: marqueUpdat,
                            portUsb: portUsbUpdat,
                            portPci: portPciUpdat,
                            commentaire: commentaireUpdat

                        })
                    if (actifA == actifUpdat && nameMatUpd == nameMatA && typeUpdat == typeA
                        && localisationA == localisationUpdat && departementA == departementUpdat
                        && equipementA == equipementUpdat && numSerieUpdat == numSerieA &&
                        marqueUpdat == marqueA
                        &&
                        portUsbUpdat == portUsbA &&
                        portPciUpdat == portPciA
                        && commentaireA == commentaireUpdat) {

                    } else {
                        var historique = {
                            user: session.name,
                            model: "Update Inventaire " + nameMatA,
                            crud: "Modification",
                            date: new Date(),
                            old: {
                                "Actif": actifA,
                                "Nom du Mat??riel": nameMatA,
                                "Type": typeA,
                                "Localisation": localisationA,
                                "D??partement": departementA,
                                "Equipement": equipementA,
                                "Num S??rie": numSerieA,
                                "Marque": marqueA,
                                "Port USB": portUsbA, "Port PCI": portPciA,
                                "Commentaire": commentaireA
                            },
                            new: {
                                "Actif": actifUpdat,
                                "Nom du Mat??riel": nameMatUpd,
                                "Type": typeUpdat,
                                "Localisation": localisationUpdat,
                                "D??partement": departementUpdat,
                                "Equipement": equipementUpdat,
                                "Num S??rie": numSerieUpdat,
                                "Marque": marqueUpdat,
                                "Port USB": portUsbUpdat, "Port PCI": portPciUpdat,
                                "Commentaire": commentaireUpdat
                            }
                        }
                        var historie = await HistoriqueModel(historique).save()
                        //console.log("historique", historie);
                    }
                } else if (getInvet.name == "phone") {

                    updat = await InventaireModel.findOneAndUpdate({
                        actif: actifA,
                        name: nameMatA,
                        type: typeA,
                        numSerie: numSerieA,
                        marque: marqueA,
                        imei1: imei1A,
                        imei2: imei2A,
                        chargeur: chargeurA,
                        cable: cableA,
                        housse: housseA,
                        commentaire: commentaireA
                    },
                        {
                            actif: actifUpdat,
                            name: nameMatUpd,
                            type: typeUpdat,
                            numSerie: numSerieUpdat,
                            marque: marqueUpdat,
                            imei1: imei1Updat,
                            imei2: imei2Updat,
                            chargeur: chargeurUpdat,
                            cable: cableUpdat,
                            housse: housseUpdat,
                            commentaire: commentaireUpdat

                        })
                    if (actifA == actifUpdat && nameMatUpd == nameMatA && typeUpdat == typeA
                        && numSerieUpdat == numSerieA &&
                        marqueUpdat == marqueA
                        &&
                        imei1A == imei1Updat && imei2A == imei2Updat &&
                        chargeurA == chargeurUpdat && cableA == cableUpdat &&
                        housseA == housseUpdat
                        && commentaireA == commentaireUpdat) {

                    } else {
                        var historique = {
                            user: session.name,
                            model: "Update Inventaire Phone",
                            date: new Date(),
                            crud: "Modification",
                            old: {
                                "Actif": actifA,
                                "Nom du Mat??riel": nameMatA,
                                "Type": typeA,
                                "Num S??rie": numSerieA,
                                "Marque": marqueA,
                                "IMEI 1": imei1A, "IMEI 2": imei2A,
                                "chargeur": chargeurA,
                                "cable": cableA,
                                "housse": housseA,
                                "commentaire": commentaireA
                            },
                            new: {
                                "actif": actifUpdat,
                                "Nom du Mat??riel": nameMatUpd,
                                "Type": typeUpdat,
                                "Num S??rie": numSerieUpdat,
                                "Marque": marqueUpdat,
                                "IMEI 1": imei1Updat, "IMEI 2": imei2Updat,
                                "Chargeur": chargeurUpdat,
                                "Cable": cableUpdat,
                                "Housse": housseUpdat,
                                "Commentaire": commentaireUpdat
                            }
                        }
                        var historie = await HistoriqueModel(historique).save()
                        //console.log("historique", historie);
                    }
                }
                // console.log("updat ", updat);


                // res.send(updat)
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/getOneInventaire').post(async function (req, res) {

    var id = req.body.id;
    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var invent = await InventaireModel.findOne({ _id: id })

                // console.log("codeM", invent);
                res.send(invent)
            })
    } else {
        res.redirect("/")
    }
})

//delete material in inventary
routeExp.route('/deleteMaterial').post(async function (req, res) {
    var actifD = req.body.actifD;
    session = req.session

    var id = req.body.id
    var nameD = req.body.nameD
    var typeD = req.body.typeD; var localisationD = req.body.localisationD;
    var departementD = req.body.departementD
    var equipementD = req.body.equipementD; var numSerieD = req.body.numSerieD;
    var marqueD = req.body.marqueD; var processeurD = req.body.processeurD;
    var ramD = req.body.ramD; var diskDurD = req.body.diskDurD;
    var capaciteD = req.body.capaciteD; var cleWinD = req.body.cleWinD
    var resolutionD = req.body.resolutionD; var portHdmiD = req.body.portHdmiD;
    var portVgaD = req.body.portVgaD; var portUsbD = req.body.portUsbD;
    var portPciD = req.body.portPciD;
    var imei1D = req.body.imei1D
    var imei2D = req.body.imei2D; var chargeurD = req.body.chargeurD;
    var cableD = req.body.cableD; var housseD = req.body.housseD;
    var antivirusD = req.body.antivirusD; var vpnD = req.body.vpnD
    var nbUsbD = req.body.nbUsbD

    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var donner = await InventaireModel.findById({ _id: id })
                var historique = {
                    user: session.name,
                    model: "Delete Inventaire",
                    date: new Date(),
                    crud: "Ajout",
                    old: {
                        "Actif": donner.actif, "Nom Poste": donner.nomPoste,
                        "Name": donner.name, "Type": donner.type,
                        "Localisation": donner.localisation, "D??partement": donner.departement,
                        "Equipement": donner.equipement, "Num s??rie": donner.numSerie,
                        "Marque": donner.marque, "Processeur": donner.processeur,
                        "RAM": donner.ram, "Disque Dure": donner.diskDur,
                        "Capacit??": donner.capacite, "Cl?? Win Craqu??": donner.cleWin,
                        "Cl?? Win Original": donner.cleWinOriginal,
                        "R??solution": donner.resolution,
                        "Port HDMI": donner.portHdmi, "Port VGA": donner.portVga,
                        "Port DVI": donner.portDvi,
                        "Port USB": donner.portUsb, "Port PCI": donner.portPci,
                        "IMEI1": donner.imei1, "IMEI2": donner.imei2,
                        "Chargeur": donner.chargeur, "Cable": donner.cable,
                        "Housse": donner.housse,
                        "Antivirus": donner.antivirus,
                        "VPN": donner.vpn, "Nombre USB": donner.usb,
                        "Version Win": donner.versionWin,
                        "Commentaire": donner.commentaire
                    }
                }
                await HistoriqueModel(historique).save()
                var deleted = await InventaireModel.findByIdAndDelete({ _id: id })

                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})

//new instruction
routeExp.route('/addInstruction').post(async function (req, res) {
    var name = req.body.name;
    var titre = req.body.titre;
    var instruct = req.body.instruct;

    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                // console.log("name ",name);
                // console.log("titre ",titre);
                // console.log("instruct ",instruct);
                if ((await InstructionModel.findOne({ name: name })) || name == "" || titre == "") {
                    console.log("error");
                    res.send('error')
                } else {
                    // console.log("succ");
                    var newInst = {
                        name: name,
                        title: titre,
                        instruction: instruct
                    }
                    var inst = await InstructionModel(newInst).save()

                    var historique = {
                        user: session.name,
                        model: "Ajout Instruction",
                        crud: "jout",
                        date: new Date(),
                        old: {
                            "Nom": name,
                            "Titre": titre,
                            "Instruction": instruct
                        }
                    }
                    await HistoriqueModel(historique).save()
                    // console.log("instruction", inst);
                    res.send("success")
                }
            })
    } else {
        res.redirect("/")
    }
})

//Udpat instruction
routeExp.route("/UpdateInstruct").post(async function (req, res) {
    var oldName = req.body.nameOld;
    var name = req.body.name;
    var title = req.body.title;
    var instruct = req.body.instruct;
    var titleOld = req.body.titleOld;
    var instructOld = req.body.instructOld;

    session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var instructUpdat = await InstructionModel.findOneAndUpdate({ name: oldName }, { name: name, title: title, instruction: instruct })
                // console.log("instructUpdat", instructUpdat);
                if (name == oldName && title == titleOld && instruct == instructOld) {

                } else {
                    var historique = {
                        user: session.name,
                        model: "Update Instruction",
                        crud: "Modification",
                        date: new Date(),
                        new: {
                            "Nom": name,
                            "Titre": title,
                            "Instruction": instruct
                        },
                        old: {
                            "Nom": oldName,
                            "Titre": titleOld,
                            "Instruction": instructOld
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()
                    //console.log("historique", historie);
                }
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})


//delete material in inventary
routeExp.route('/deleteInstruction').post(async function (req, res) {
    var name = req.body.name;

    session = req.session

    //console.log("name", name);
    //if (session.typeUtil == "IT" || session.typeUtil == "Admin") {
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {

            var getInstruct = await InstructionModel.findOne({ name: name })
            var historique = {
                user: session.name,
                model: "Supression Instruction",
                crud: "Delete",
                date: new Date(),
                old: {

                    "Nom": getInstruct.name,
                    "Titre": getInstruct.title,
                    "Instruction": getInstruct.instruction
                }
            }
            await HistoriqueModel(historique).save()

            await InstructionModel.findOneAndDelete({ name: name })
            //console.log("delet", delet);
            res.send("success")
        })
    // } else {
    //     res.redirect("/")
    // }
})

//all Team Leader
routeExp.route('/allTL').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var all = await TLModel.find()
                // console.log("all", all);
                res.send(all)
            })
    } else {
        res.redirect("/")
    }
})

//all user to login
routeExp.route('/allUser').get(async function (req, res) {

    session = req.session
    //if (session.typeUtil == "Admin") {
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            var all = await UserModel.find()
            // console.log("all", all);
            res.send(all)
        })
    // } else {
    //     res.redirect("/")
    // }
})

//all history
routeExp.route('/allHistory').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var all = await HistoriqueModel.find()
                //console.log("all", all);
                res.send(all)
            })
    } else {
        res.redirect("/")
    }
})

//add new TL
routeExp.route('/addTL').post(async function (req, res) {
    var name = req.body.name
    var mcode = req.body.mcode
    var strengths = req.body.strengths
    var weaknesses = req.body.weaknesses
    var opportunities = req.body.opportunities
    var threats = req.body.threats
    // console.log("rq.b o ", req.body);

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                if ((await TLModel.findOne({ mcode: mcode })) || name == "" || mcode == "") {
                    console.log("error");
                    res.send('error')
                } else {
                    var newTL = {
                        name: name,
                        mcode: mcode,
                        strengths: strengths,
                        weaknesses: weaknesses,
                        opportunities: opportunities,
                        threats: threats,
                    }
                    var tl = await TLModel(newTL).save()

                    var historique = {
                        user: session.name,
                        model: "Ajout Evaluation TL",
                        date: new Date(),
                        crud: "Ajout",
                        old: {
                            "Name": name,
                            "Mcode": mcode,
                            "Points forts": strengths,
                            "Faiblesses": weaknesses,
                            "Opportunit??s": opportunities,
                            "Menaces": threats,
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()


                    // console.log("addInventaire", tl);
                    res.send("success")
                }
            })
    } else {
        res.redirect("/")
    }
})

//get one instruction
routeExp.route("/updateTl").post(async function (req, res) {
    var oldMCode = req.body.mcodeOld;
    var name = req.body.name;
    var mcode = req.body.mcodeN;
    var strengths = req.body.strengths;
    var weaknesses = req.body.weaknesses;
    var opportunities = req.body.opportunities;
    var threats = req.body.threats;

    var nameA = req.body.nameA;
    var strengthsA = req.body.strengthsA;
    var weaknessesA = req.body.weaknessesA;
    var opportunitiesA = req.body.opportunitiesA;
    var threatsA = req.body.threatsA;

    // console.log("threatsA ", threatsA, " opportunitiesA ", opportunitiesA);
    // console.log("weaknessesA ", weaknessesA, " strengthsA ", strengthsA);
    // console.log("nameA ", nameA, " mcode ", oldMCode);
    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var TLUpdat = await TLModel.findOneAndUpdate({ mcode: oldMCode }, { mcode: mcode, name: name, strengths: strengths, weaknesses: weaknesses, opportunities: opportunities, threats: threats })
                // console.log("TLUpdat", TLUpdat);
                if (mcode == oldMCode && name == nameA && strengths == strengthsA && weaknesses == weaknessesA && opportunities == opportunitiesA && threats == threatsA) {

                } else {
                    var historique = {
                        user: session.name,
                        model: "Update Evaluation TL",
                        date: new Date(),
                        crud: "Modification",
                        old: {
                            "name": nameA,
                            "mcode": mcode,
                            "strengths": strengthsA,
                            "weaknesses": weaknessesA,
                            "opportunities": opportunitiesA,
                            "threats": threatsA,
                        },
                        new: {
                            "name": name,
                            "mcode": oldMCode,
                            "strengths": strengths,
                            "weaknesses": weaknesses,
                            "opportunities": opportunities,
                            "threats": threats,
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()
                    //console.log("historique", historie);
                }
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})

//delete TL
routeExp.route("/deleteTeamLeader").post(async function (req, res) {
    var mcode = req.body.mcode

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var tl = await TLModel.findOne({ mcode: mcode })
                // console.log("tl", tl);
                var historique = {
                    user: session.name,
                    model: "Delete Evaluation TL",
                    date: new Date(),
                    old: {
                        "Name": tl.name,
                        "Mcode": tl.mcode,
                        "Points forts": tl.strengths,
                        "Faiblesses": tl.weaknesses,
                        "Opportunit??s": tl.opportunities,
                        "Menaces": tl.threats,
                    }
                }
                await HistoriqueModel(historique).save()

                var deleteUser = await TLModel.findOneAndDelete({ mcode: mcode })
                // console.log("deleteUser", deleteUser);
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})

//get planning
routeExp.route('/planning').get(async function (req, res) {
    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {

        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var allPlaning = await PlanningModel.find()
                var agent = await AgentModel.find()

                var plan = await ProjectModel.find()
                // console.log("allPlaning", allPlaning);
                res.render("./production/planning.html", { type_util: session.typeUtil, plan: plan, agent: agent })
                //res.render("./production/charteRangeFilter.html", {plan: allPlaning, agent: agent})
            })
    } else {
        res.redirect("/")
    }
})

//get planning
routeExp.route('/planning/:project/:shift').get(async function (req, res) {
    session = req.session
    var shift = req.params.shift
    var project = req.params.project;
    // console.log("shift", shift);
    // console.log("project", project);
    //if (session.typeUtil == "TL" || session.typeUtil == "Admin") {

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {

            var allPlaning = await PlanningModel.find()
            var agent = await AgentModel.find()
            //console.log("agent", shift, " ", project);
            res.render("./production/planning.html", { type_util: session.typeUtil, plan: allPlaning, agent: agent })
        })
    // } else {
    //     res.redirect("/")
    // }
})

//liste agent
routeExp.route('/agent').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var Projet = await ProjectModel.find();
                // console.log("listAgent", Projet);
                res.render("./production/listeAgent.html", { type_util: session.typeUtil, projet: Projet })

            })
    } else {
        res.redirect("/")
    }
})

//get agence
routeExp.route("/getOneAgent").post(async function (req, res) {
    var mcode = req.body.mcode1
    //console.log("log", mcode);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            var agent = await AgentModel.findOne({ mcode: mcode })
            //console.log("agent", agent);
            res.send(agent)
        })
})

//get all project
routeExp.route("/getAllProjet").get(async function (req, res) {

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            var projet = await ProjectModel.find()
            res.send(projet)
        })
})

//Evaluation agent
routeExp.route('/evaluationAgent').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var listAgent = await AgentModel.find();
                //console.log("listAgent", listAgent);
                res.render("./production/evaluationAgent.html", { type_util: session.typeUtil, listAgent: listAgent })

            })
    } else {
        res.redirect("/")
    }
})

// Add agent
routeExp.route('/addAgent').post(async function (req, res) {
    var name = req.body.name
    var usuelName = req.body.usualName
    var mcode = req.body.mcode
    var number = req.body.number
    var shift = req.body.shift
    var project = req.body.project
    var site = req.body.site
    var quartier = req.body.quartier
    var phon = req.body.phon


    session = req.session

    //console.log("project", project);
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                if ((await AgentModel.findOne({ mcode: mcode })) || name == "") {
                    console.log("error");
                    res.send('error')
                } else {
                    var newTL = {
                        name: name,
                        usualName: usuelName,
                        mcode: mcode,
                        number: number,
                        shift: shift,
                        project: project,
                        site: site,
                        quartier: quartier,
                        tel: phon
                    }
                    var agent = await AgentModel(newTL).save()
                    var historique = {
                        user: session.name,
                        model: "Ajout Agent",
                        date: new Date(),
                        crud: "Ajout",
                        old: {
                            "Nom": name,
                            "Pr??nom usuel": usuelName,
                            "Mcode": mcode,
                            "Num??ro": number,
                            "Shift": shift,
                            "Projet": project,
                            "Site": site,
                            "Quartier": quartier,
                            "T??l??phone": phon
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()

                    // console.log("agent", agent);
                    res.send("success")
                }
            })
    } else {
        res.redirect("/")
    }
})



// Add Evaluation Agent
routeExp.route('/addEvaluationAgent').post(async function (req, res) {
    var mcode = req.body.mcode
    var name = req.body.name
    var production = req.body.production
    var quality = req.body.quality
    var comportement = req.body.comportement

    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                if ((await EvaluationAgent.findOne({ mcode: mcode })) || production == "" || quality == "") {
                    console.log("error");
                    res.send('error')
                } else {
                    var newAgent = {
                        usualName: name,
                        mcode: mcode,
                        production: production,
                        quality: quality,
                        comportement: comportement,
                    }
                    var historique = {
                        user: session.name,
                        model: "Ajout Agent",
                        date: new Date(),
                        crud: "Ajout",
                        old: {
                            "Pr??nom usuel": name,
                            "Mcode": mcode,
                            "Production": production,
                            "Qualit??": quality,
                            "Comportement": comportement,
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()

                    var agent = await EvaluationAgent(newAgent).save()
                    // console.log("agent", agent);
                    res.send("success")
                }
            })
    } else {
        res.redirect("/")
    }
})
// get all Agent
routeExp.route('/allAgent').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var all = await AgentModel.find()
                //console.log("all", all);
                res.send(all)
            })
    } else {
        res.redirect("/")
    }
})


// get all evaluation Agent
routeExp.route('/allEvaluationAgent').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var all = await EvaluationAgent.find()
                // console.log("all", all);
                res.send(all)
            })
    } else {
        res.redirect("/")
    }
})

//Update Agent
routeExp.route("/updateAgent").post(async function (req, res) {
    var oldMCode = req.body.mcodeOld;
    var mcodeNew = req.body.mcodeNew;
    var name = req.body.name;
    var usualName = req.body.usualName;
    var number = req.body.number;
    var shift = req.body.shift;
    var project = req.body.project;
    var site = req.body.site;
    var quartier = req.body.quartier;
    var phon = req.body.tel;

    var nameA = req.body.nameA;
    var usualNameA = req.body.usualNameA;
    var numberA = req.body.numberA;
    var shiftA = req.body.shiftA;
    var projectA = req.body.projectA;
    var siteA = req.body.siteA;
    var quartierA = req.body.quartierA;
    var phonA = req.body.telA;

    //console.log("req.body", req.body);
    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                if (name == "") {
                    res.send('error')
                } else {
                    var agent = await AgentModel.findOneAndUpdate({ mcode: oldMCode }, { mcode: mcodeNew, name: name, usualName: usualName, number: number, shift: shift, project: project, site: site, quartier: quartier, tel: phon })
                    //console.log("agent", agent);
                    if (mcodeNew == oldMCode && name == nameA && usualName == usualNameA && numberA == number && shiftA == shift && projectA == project && siteA == site && quartierA == quartier && phonA == phon) {

                    } else {
                        var historique = {
                            user: session.name,
                            model: "Update Agent",
                            date: new Date(),
                            crud: "Modification",
                            old: {
                                "mcode": oldMCode,
                                "name": nameA,
                                "usualName": usualNameA,
                                "number": numberA,
                                "shif": shiftA,
                                "project": projectA,
                                "site": siteA,
                                "quartier": quartierA,
                                "phon": phonA,
                            },
                            new: {
                                "mcode": mcodeNew,
                                "name": name,
                                "usualName": usualName,
                                "number": number,
                                "shif": shift,
                                "project": project,
                                "site": site,
                                "quartier": quartier,
                                "phon": phon,
                            }
                        }
                        var historie = await HistoriqueModel(historique).save()
                        //console.log("historique", historie);
                    }

                    res.send("success")

                }
            })
    } else {
        res.redirect("/")
    }
})


//Update Evaluation Agent
routeExp.route("/updateEvalAgent").post(async function (req, res) {
    var oldMCode = req.body.mcodeOld;
    var production = req.body.production;
    var quality = req.body.quality;
    var comportement = req.body.comportement;

    var mcodeN = req.body.mcodeN;
    var productionA = req.body.productionA;
    var nameA = req.body.nameA;
    var name = req.body.name;
    var qualityA = req.body.qualityA;
    var comportementA = req.body.comportementA;

    session = req.session

    // console.log("req.body", req.body);
    // console.log("name", name);
    // console.log("mcodeN", mcodeN);
    //console.log("req.body", req.body);
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                if (production == "") {
                    res.send('error')
                } else {
                    var agent = await EvaluationAgent.findOneAndUpdate({ mcode: oldMCode }, { mcode: mcodeN, usualName: name, production: production, quality: quality, comportement: comportement })
                    // console.log("agent", agent);

                    if (mcodeN == oldMCode && name == nameA && productionA == production && quality == qualityA && comportementA == comportement) {

                    } else {
                        var historique = {
                            user: session.name,
                            model: "Update Evaluation Agent",
                            date: new Date(),
                            crud: "Modification",
                            old: {
                                "Mcode": oldMCode,
                                "Nom usuel": nameA,
                                "Production": productionA,
                                "Qualit??": qualityA,
                                "Comportement": comportementA,
                            },
                            new: {
                                "Mcode": mcodeN,
                                "Nom usuel": name,
                                "Production": production,
                                "Qualit??": quality,
                                "Comportement": comportement,
                            }
                        }
                        var historie = await HistoriqueModel(historique).save()
                        //console.log("historique", historie);
                    }
                    res.send("success")

                }
            })
    } else {
        res.redirect("/")
    }
})

//delete Agent
routeExp.route("/deleteAgent").post(async function (req, res) {
    var mcode = req.body.mcode

    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var getAgent = await AgentModel.findOne({ mcode: mcode });
                var historique = {
                    user: session.name,
                    model: "Delete Agent",
                    date: new Date(),
                    crud: "Delete",
                    old: {
                        "Name": getAgent.name,
                        "Pr??nom usuel": getAgent.usuelName,
                        "Mcode": getAgent.mcode,
                        "Num??ro": getAgent.number,
                        "Shift": getAgent.shift,
                        "Projet": getAgent.project,
                        "Site": getAgent.site,
                        "Quartier": getAgent.quartier,
                        "T??l??phone": getAgent.phon
                    }
                }
                var historie = await HistoriqueModel(historique).save()

                var deleteUser = await AgentModel.findOneAndDelete({ mcode: mcode })
                // console.log("deleteUser", deleteUser);
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})

//delete evaluation Agent
routeExp.route("/deleteEvalAgent").post(async function (req, res) {
    var mcode = req.body.mcode

    session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {

                var dUser = await EvaluationAgent.findOne({ mcode: mcode })
                //console.log("dUser.", dUser);
                var historique = {
                    user: session.name,
                    model: "Delete Evaluation Agent",
                    date: new Date(),
                    crud: "Ajout",
                    old: {
                        "Pr??nom usuel": dUser.usuelName,
                        "Mcode": dUser.mcode,
                        "Production": dUser.production,
                        "Qualit??": dUser.quality,
                        "Comportement": dUser.comportement
                    }
                }
                var historie = await HistoriqueModel(historique).save()

                var deleteUser = await EvaluationAgent.findOneAndDelete({ mcode: mcode })
                // console.log("deleteUser", deleteUser);
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})
//get user
routeExp.route('/user').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var allTL = await TLModel.find()
                //console.log("allTL ", allTL);
                res.render("./operation/user.html", { type_util: session.typeUtil, allTL: allTL })
            })
    } else {
        res.redirect("/")
    }
})


//historique
routeExp.route('/historique').get(async function (req, res) {

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var allHistoryDelet = await HistoriqueModel.find()
                //console.log("allTL ", allTL);

                //console.log("allHistory", allHistory.length);
                if (allHistoryDelet.length > 300) {
                    for (let i = 0; i < 5; i++) {
                        var deleteHist = await HistoriqueModel.findOneAndDelete({ _id: allHistoryDelet[i]._id })
                        //console.log("deleteHist", deleteHist);
                    }
                }
                var allHistory = await HistoriqueModel.find()
                var newAllHistory = [];
                // var time = require('time');
                // var a = new time.Date(1337324400000);

                // a.setTimezone('Europe/Amsterdam');
                //console.log("allHistory", allHistory);
                allHistory.forEach(element => {
                    //console.log("element", element._id);

                    var today = element.date;
                    today = today.setHours(today.getHours() + 3);


                    var dt = dateTime.create(today);
                    var formatted = dt.format('Y-m-d H:M:S');
                    //formatted.setTimezone('Europe/Amsterdam');
                    var user = {
                        user: element.user,
                        model: element.model,
                        heure: formatted,
                        old: element.old,
                        new: element.new
                    }
                    newAllHistory.push(user)
                });
                //console.log("newAllHistory", newAllHistory);


                res.render("./operation/historique.html", { type_util: session.typeUtil, history: newAllHistory })
            })
    } else {
        res.redirect("/")
    }
})

//add user
routeExp.route("/signup").post(async function (req, res) {
    var type = req.body.type_util;
    var mcode = req.body.mcode;
    var name = req.body.name;
    var email = req.body.email;

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                if ((await UserModel.findOne({ mcode: mcode, email: email })) || mcode == "" || name == "" || email == "" || type == "") {
                    res.send('error')
                } else {
                    var password = randomPassword()
                    var new_user = {
                        typeUtil: type,
                        mcode: mcode,
                        name: name,
                        email: email,
                        password: "password"
                    }
                    var user = await UserModel(new_user).save()
                    // console.log("user ", user);
                    res.send(name)
                }
            })
    } else {
        res.redirect("/")
    }
})

//creation mot de passe
function randomPassword() {
    var code = ""
    let v = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!??&#"
    for (let i = 0; i < 6; i++) {
        const char = v.charAt(Math.random() * v.length - 1)
        code += char;
    }
    return code
}


//get one Agent
routeExp.route("/getOneAgent").post(async function (req, res) {
    var mcode1 = req.body.mcode1

    session = req.session
    //console.log("mcode1", req.body.mcode1);
    //if (session.typeUtil == "TL" || session.typeUtil == "Admin") {
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            var agent = await AgentModel.findOne({ mcode: mcode1 })
            //console.log("user", agent);
            res.send(agent)
        })
    // } else {
    //     res.redirect("/")
    // }
})

//get one TL
routeExp.route("/getOneTL").post(async function (req, res) {
    var mcode1 = req.body.mcode

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var tl = await TLModel.findOne({ mcode: mcode1 })
                // console.log("user", tl);
                res.send(tl)
            })
    } else {
        res.redirect("/")
    }
})

//update User
routeExp.route('/updateUser').post(async function (req, res) {
    var name = req.body.username;
    var email = req.body.email;
    var type_util = req.body.type_util;
    var mcodeA = req.body.ancien_mcod

    var nameA = req.body.nameA;
    var emailA = req.body.emailA;
    var typeA = req.body.typeA;
    var mcode = req.body.mcode

    session = req.session

    //console.log("mcode", req.body);
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var userUpd = await UserModel.findOneAndUpdate({ mcode: mcodeA }, { mcode: mcode, name: name, email: email, typeUtil: type_util })

                if (mcode == mcodeA && name == nameA && emailA == email && type_util == typeA) {

                } else {
                    var historique = {
                        user: session.name,
                        model: "Utilisateur",
                        crud: "Modification",
                        date: new Date(),
                        old: {
                            "mcode": mcodeA,
                            "name": nameA,
                            "email": emailA,
                            "type utilisateur": typeA,
                        },
                        new: {
                            "mcode": mcode,
                            "name": name,
                            "email": email,
                            "type utilisateur": type_util,
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()
                    //console.log("historique", historie);
                }
                // console.log("userUpd", userUpd);
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})


//get one User
routeExp.route("/getOneUser").post(async function (req, res) {
    var mcode1 = req.body.mcode

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var userONe = await UserModel.findOne({ mcode: mcode1 })
                //console.log("user", userONe);
                res.send(userONe)
            })
    } else {
        res.redirect("/")
    }
})

//delete User
routeExp.route("/deleteUser").post(async function (req, res) {
    var mcode = req.body.mcode;

    session = req.session
    if (session.typeUtil == "Admin") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var deletUser = await UserModel.findOneAndDelete({ mcode: mcode })
                //console.log("deletUser", deletUser);
                res.send("success")
            })

    } else {
        res.redirect("/")
    }
})


//post login
routeExp.route('/login').post(async function (req, res) {
    session = req.session;
    var email = req.body.email;
    var password = req.body.password;
    // console.log("req", req.body);
    await login(email, password, session, res);
})

//function login
async function login(email, password, session, res) {
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            var logger = await UserModel.findOne({
                email: email,
                password: password
            })

            // console.log("logger", logger);
            if (logger) {
                session.name = logger.name;
                session.email = logger.email;
                session.typeUtil = logger.typeUtil;
                session.mcode = logger.mcode;
                res.redirect("/acceuil")
            } else {
                res.render("page-login.html", {
                    erreur: "Email ou mot de passe incorrect"
                })
            }
        })

        .catch(err => {
            console.log("erreur de connexion mdatabase");
            // res.status(500).send({
            //     message: err.message || 'some error'
            // });;
        });
}

routeExp.route("/logout").get(async function (req, res) {
    session = req.session;
    session.name = null;
    session.email = null;
    session.typeUtil = null;
    session.mcode = null;
    //console.log("session", session);
    res.redirect("/")
})

routeExp.route("/profil").get(async function (req, res) {
    session = req.session
    if (session.name) {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var profil = await UserModel.findOne({ mcode: session.mcode })
                // console.log("profil", profil);
                res.render("profil.html", { type_util: session.typeUtil, profil: profil })
            })
    } else {
        res.redirect("/")
    }
})


//reset password
routeExp.route("/resetPassword").get(async function (req, res) {
    session = req.session
    if (session.mailconfirm) {
        res.redirect('/sendMail')
    } else {
        res.render("pages-forget.html", { err: "" })
    }
})

//send mail
routeExp.route("/sendMail").post(async function (req, res) {
    session = req.session
    var email = req.body.email
    // console.log("email", email);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            if (await UserModel.findOne({ email: email })) {
                session.mailconfirm = email
                session.code = randomCode()
                sendEmail(
                    session.mailconfirm,
                    "Verification code project tools solumada",
                    htmlVerification(session.code)
                )
                res.redirect("/sendMail");
            } else {
                res.render("pages-forget.html", { err: "Username does not exist" })
            }
        })
})

routeExp.route("/sendMail").get(async function (req, res) {
    session = req.session;
    if (session.mailconfirm) {
        res.render("resetPassword1.html", { err: "" })
    } else {
        res.redirect("/")
    }
})
function randomCode() {
    var code = "";
    let variable = "0123456789";
    for (let i = 0; i < 6; i++) {
        const char = variable.charAt(Math.random() * variable.length - 1)
        code += char;
    }
    return code
}


function sendEmail(receiver, subject, text) {
    var mailOptions = {
        from: 'SOLUMADA ACADEMY',
        to: receiver,
        subject: subject,
        html: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function htmlVerification(code) {
    return (
        "<center><h1>AUTHENTICATION OF YOUR PROJECT TOOLS SOLUMADA</h1>" +
        "<h3 style='width:250px;font-size:50px;padding:8px;background-color:#84E62A,; color:white'>" +
        code +
        "<h3></center>"
    );
}

//Mailing
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'developpeur.solumada@gmail.com',
        pass: 'maomiexymeryjrze'
    }
});

routeExp.route("/check").post(async function (req, res) {
    session = req.session
    //console.log("session", session);
    if (session.code == req.body.code) {
        res.send("match")
    } else {
        res.send("not")
    }
})

routeExp.route("/changePassword").post(async function (req, res) {
    var newpass = req.body.pass;
    session = req.session;

    // console.log("session", session);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var up = await UserModel.findOneAndUpdate(
                { email: session.mailconfirm },
                { password: newpass }
            );

            session.mailconfirm = null;
            session.code = null;


            // console.log("success", up);
            res.send("success");
        });
})

routeExp.route("/getOneInstruction").post(async function (req, res) {
    var nameInstruct = req.body.instructionName
    // console.log("nameInstruct", nameInstruct);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var instruct = await InstructionModel.findOne({ name: nameInstruct })
            // console.log("instruct", instruct);
            res.send(instruct)
        })
})

routeExp.route("/addPlanning").post(async function (req, res) {
    var shift = req.body.shift;
    var mcode = req.body.mcode;
    var prenom = req.body.nom;
    var project = req.body.project;
    var start = req.body.start;
    var end = req.body.end;

    //console.log("req.body", req.body);

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            //var plan = await PlanningModel.
            if (mcode == "") {//}  || shift=="" || mcode=="" || prenom=="" || project=="" ) {
                console.log("error");
                res.send("error")
            } else {
                var data = {
                    shift: shift,
                    mcode: mcode,
                    usualName: prenom,
                    project: project,
                    start: start,
                    end: end
                }

                var plan = await PlanningModel(data).save()
                //console.log("plan", plan);
                res.send("success")
            }
        })
})

class Plannings {
    constructor(shift, usualName, mcode, project, start, end) {
        this.shift = shift;
        this.usualName = usualName;
        this.mcode = mcode;
        this.project = project;
        this.start = start;
        this.end = end
    }

}

class Reporting {
    constructor(mcode, name, production, faute, start, end) {
        this.mcode = mcode;
        this.name = name;
        this.production = production;
        this.faute = faute;
        this.start = start;
        this.end = end;
    }
}

class Production {
    constructor(mcode, name, username, number, production, date, id) {
        this.mcode = mcode;
        this.name = name;
        this.username = username;
        this.production = production;
        this.number = number;
        this.date = date;
        this.id = id
    }
}

class Faute {
    constructor(mcode, name, username, number, faute, date, id) {
        this.mcode = mcode;
        this.name = name;
        this.username = username;
        this.faute = faute;
        this.number = number;
        this.date = date;
        this.id = id
    }
}

class ReportingWeek {
    constructor(mcode, name, production, faute, start, end) {
        this.mcode = mcode;
        this.name = name;
        this.production = production;
        this.faute = faute;
        this.start = start;
        this.end = end;
    }
}

routeExp.route("/allPlanning").get(async function (req, res) {
    //console.log("allPlanning");
    // leaveModel.find({ $or: [{ status: "en attente" }, { status: "en cours" }] })
    //     .then(notes => {
    //         //console.log("notes", notes);

    //         //Shift - Nom - Start - End - Projet
    //         res.send(notes);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || 'some error'
    //         });
    //     });



    leaveModel.find({ $or: [{ status: "en attente" }, { status: "en cours" }] })
        .then(notes => {
            //console.log("notes", notes);

            //Shift - Nom - Start - End - Projet
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'some error'
            });
        });
});

// routeExp.route("/allPlanning").get(async function (req, res) {

//     mongoose
//         .connect(
//             "mongodb+srv://solumada:solumada@cluster0.z3s3n.mongodb.net/Pointage?retryWrites=true&w=majority",
//             {
//                 useUnifiedTopology: true,
//                 UseNewUrlParser: true,
//             }
//         )
//         .then(async () => {

//             var allPlanning = await PlanningModel.find()
//             var planning = []
//             allPlanning.forEach(plan => {
//                 var usualName = plan.usualName;
//                 var shift = plan.shift;
//                 var mcode = plan.mcode;
//                 var project = plan.project;
//                 if (plan.start) {
//                     var dateS = new Date(plan.start)
//                     var dateF = new Date(plan.end)
//                     dateS = dateS.toLocaleDateString("fr")
//                     dateF = dateF.toLocaleDateString("fr")

//                     plan.start = dateS
//                 } else {
//                     var dateS = null;
//                     var dateF = null
//                 }
//                 var newP = new Plannings(shift, usualName, mcode, project, dateS, dateF)
//                 planning.push(newP)


//             });
//             console.log("allPlanning", planning);
//             res.send(planning)
//         })
// })

//get all planning
routeExp.route("/allPlannigView").get(async function (req, res) {
    //console.log("allPlanning");
    leaveModel.aggregate([
        {
            $lookup: {
                from: 'cusers',
                localField: 'm_code',
                foreignField: 'm_code',
                as: 'users'
            }
        },
        {
            $match: {
                $or: [
                    {
                        "users.shift": "SHIFT 1"
                    },
                    {
                        "users.shift": "SHIFT 2"
                    },
                    {
                        "users.shift": "SHIFT 3"
                    },
                    {
                        "users.shift": "SHIFT WEEKEND"
                    }
                    // , {
                    //     status: "en cours"
                    // }
                ]
            }
        }
    ])
        .then(user => {
            var newUs = []
            var allProjet = []
            for (let i = 0; i < user.length; i++) {
                const element = user[i];
                if (element.users.length > 0) {
                    newUs.push(element)
                    //console.log("newUs", element.users[0].project);
                    allProjet.push(element.users[0].project)
                }

            }
            // uniqueArray = allProjet.filter(function (item, pos) {
            //     return allProjet.indexOf(item) == pos;
            // })
            // //console.log("uniqueArray", uniqueArray);

            // var project = []
            // for (let i = 0; i < uniqueArray.length; i++) {
            //     element = uniqueArray[i].split("/")
            //     for (let j = 0; j < element.length; j++) {
            //         if (project.includes(element[j]) || element[j] == '') {

            //         } else {
            //             project.push(element[j])
            //         }
            //     }
            // }
            // project = project.sort()
            // console.log("project", project);
            // for (let k = 0; k < 25; k++) {
            //     console.log(" project[k] ", project[k]);
            //     var projectN = { name: project[k] }
            //     var j = ProjectModel(projectN).save()
            //     //console.log("j", j);
            // }
            res.send(newUs)
        })
});

// get year
routeExp.route("/getAnnee").get(async function (req, res) {
    var anne = await leaveModel.find()
    var getAnne = []
    console.log("anne", anne);
    for (let i = 0; i < anne.length; i++) {
        const element = anne[i];
        var date = new Date(element.date_start)
        // console.log("date", date.getFullYear());
        if (!getAnne.includes(date.getFullYear())) {
            getAnne.push(date.getFullYear())
        }
        var date1 = new Date(element.date_end)
        //console.log("date", date1.getFullYear());
        if (!getAnne.includes(date1.getFullYear())) {
            getAnne.push(date1.getFullYear())
        }

    }
    console.log("element", getAnne);
    res.send("ok")
})


// get month
routeExp.route("/getMonth").get(async function (req, res) {
    var anne = await leaveModel.find()
    var getAnne = []
    //console.log("anne", anne);
    for (let i = 0; i < anne.length; i++) {
        const element = anne[i];

        var date = new Date(element.date_start)
        // console.log("date", date.getFullYear());
        var dateStart = date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear()
        //console.log("newDate", dateStart);
        if (!getAnne.includes(dateStart)) {
            getAnne.push(dateStart)
        }

        var date1 = new Date(element.date_end)
        var dateEnd = date1.toLocaleString('default', { month: 'long' }) + " " + date1.getFullYear()
        if (!getAnne.includes(dateEnd)) {
            getAnne.push(dateEnd)
        }

    }
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let sortYearMonth = (a, b) => {
        let monthA = monthOrder.indexOf(a.slice(0, 3))
        let yearA = a.slice(3, 6)
        let monthB = monthOrder.indexOf(b.slice(0, 3))
        let yearB = b.slice(3, 6)
        return (`${yearA}-${monthA}` < `${yearB}-${monthB}`) ? -1 : (`${yearA}-${monthA}` > `${yearB}-${monthB}`) ? 1 : 0
    }

    let sortedMonths = getAnne.sort(sortYearMonth)


    console.log("indices", sortedMonths);
    res.send("ok")
})

// routeExp.route("/allPlannigView").get(async function (req, res) {
//     mongoose
//         .connect(
//             "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
//             {
//                 useUnifiedTopology: true,
//                 UseNewUrlParser: true,
//             }
//         )
//         .then(async () => {
//             // var planning = await AgentModel.aggregate([
//             //     {
//             //         $lookup: {
//             //             from: "cleaves",
//             //             localField: "m_code",
//             //             foreignField: "mcode",
//             //             as: "code"
//             //         }
//             //     }
//             // ])
//             // var newPlan = []
//             // for (let i = 0; i < planning.length; i++) {
//             //     const element = planning[i];
//             //     if (element.code.length > 0) {
//             //         console.log("element", element);
//             //     }
//             // }
//             // leaveModel.find({ $or: [{ status: "en attente" }, { status: "en cours" }] })
//             //     .then(notes => {
//             //         //console.log("notes", notes);

//             //         //Shift - Nom - Start - End - Projet
//             //         res.send(notes);
//             //     }).catch(err => {
//             //         res.status(500).send({
//             //             message: err.message || 'some error'
//             //         });;
//             //     });

//             leaveModel.aggregate([
//                 {
//                     $lookup: {
//                         from: "plannings",
//                         localField: "m_code",
//                         foreignField: "mcode",
//                         as: "code"
//                     }
//                 }
//             ])
//                 .then(plan => {
//                     //console.log("plan", plan);

//                     for (let i = 0; i < plan.length; i++) {
//                         const element = plan[i];
//                         console.log("element", element.code);
//                         if (element.code.length > 0) {
//                             console.log("element", element);
//                         }
//                     }
//                 })
//                 .catch(err => {
//                     res.status(500).send({
//                         message: err.message || 'some error'
//                     });;
//                 });
//         })
// })

routeExp.route("/planning/project/shift").get(async function (req, res) {
    var shift = req.params.shift;
    var project = req.params.project;
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var allPlanningShift = await PlanningModel.find({ shift: shift, project: project })

            var allPlaning = await PlanningModel.find()
            //console.log("allPlanningShift", allPlanningShift);
            res.send(allPlanningShift)

            //res.render("./production/planning.html", {plan: allPlaning})

        })
})

routeExp.route("/udpatePlanning").post(async function (req, res) {
    var mcodeAncien = req.body.mcodeAncien;
    var mcodeNouv = req.body.mcodeNouv;
    var shift = req.body.shift;
    var project = req.body.projet;
    var start = req.body.start;
    var end = req.body.end;
    var prenomUpdat = req.body.prenomUpdat

    var shiftA = req.body.shiftA;
    var projectA = req.body.projetA;
    var startA = req.body.startA;
    var endA = req.body.endA;
    var prenomA = req.body.prenomA
    //console.log("req", req.body);


    session = req.session
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            if (shift == "" || project == "") {
                res.send("error")
            } else {
                var planUpd = await PlanningModel.findOneAndUpdate({ mcode: mcodeAncien }, { mcode: mcodeNouv, usualName: prenomUpdat, shift: shift, start: start, end: end, project: project })
                //console.log("planUpd", planUpd);
                if (mcodeAncien == mcodeNouv && shift == shiftA && project == projectA && start == startA && endA == end && prenomA == prenomUpdat) {

                } else {
                    var historique = {
                        user: session.name,
                        model: "Planning",
                        date: new Date(),
                        crud: "Modification",
                        old: {
                            "mcode": mcodeAncien,
                            "prenom": prenomA,
                            "shift": shiftA,
                            "project": projectA,
                            "start": startA,
                            "end": endA
                        },
                        new: {
                            "mcode": mcodeNouv,
                            "prenom": prenomUpdat,
                            "shift": shift,
                            "project": project,
                            "start": start,
                            "end": end
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()
                    //console.log("historique", historie);
                }
                res.send("success")
            }
        })
})

routeExp.route("/deletePlanning").post(async function (req, res) {
    var mcode = req.body.mcode;

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var deletePlan = await PlanningModel.findOneAndDelete({ mcode: mcode })
            // console.log("deletePlan", deletePlan);
            res.send("success")
        })
})

//get projet
routeExp.route('/projet').get(async function (req, res) {

    session = req.session
    //if (session.typeUtil == "TL" || session.typeUtil == "Admin") {

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var allP = await ProjectModel.find()
            //console.log('allP', allP);
            res.render("./production/projet.html", { type_util: session.typeUtil, allProj: allP })
        })
    // } else {
    //     res.redirect("/")
    // }
})

//get reporting
routeExp.route('/reporting').get(async function (req, res) {

    session = req.session
    //if (session.typeUtil == "TL" || session.typeUtil == "Admin") {

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var listAgent = await AgentModel.find()
            res.render("./production/reporting.html", { type_util: session.typeUtil, listAgent: listAgent })

        })
    // } else {
    //     res.redirect("/")
    // }
})

//New Projet
routeExp.route('/newProjet').post(async function (req, res) {
    var name = req.body.name;
    session = req.session;
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {

            mongoose
                .connect(
                    "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                    {
                        useUnifiedTopology: true,
                        UseNewUrlParser: true,
                    }
                )
                .then(async () => {
                    if ((await ProjectModel.findOne({ name: name })) || name == "") {
                        res.send('error')
                    } else {
                        var newP = {
                            name: name
                        }
                        var historique = {
                            user: session.name,
                            model: "Ajout Projet",
                            date: new Date(),
                            crud: "Ajout",
                            old: {
                                "Nom": name
                            }
                        }
                        var historie = await HistoriqueModel(historique).save()

                        var Proj = await ProjectModel(newP).save()
                        //console.log("proje", Proj);
                        res.send("success")
                    }
                })
        })
})

//Update Projet
routeExp.route('/updateProjet').post(async function (req, res) {
    var nameOld = req.body.nameOld;
    var nameNew = req.body.nameNew;
    session = req.session;

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {

            mongoose
                .connect(
                    "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                    {
                        useUnifiedTopology: true,
                        UseNewUrlParser: true,
                    }
                )
                .then(async () => {
                    if ((await ProjectModel.findOne({ name: nameNew })) || nameNew == "") {
                        res.send('error')
                    } else {
                        var historique = {
                            user: session.name,
                            model: "Update Agent",
                            date: new Date(),
                            crud: "Ajout",
                            old: {
                                "Nom": nameOld
                            },
                            new: {
                                "Nom": nameNew
                            }
                        }
                        var historie = await HistoriqueModel(historique).save()

                        var Proj = await ProjectModel.findOneAndUpdate({ name: nameOld }, { name: nameNew })
                        //console.log("proje", Proj);
                        res.send("success")
                    }
                })
        })
})

//Delete Projet
routeExp.route('/deleteProjet').post(async function (req, res) {
    var name = req.body.name;
    session = req.session;

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {

            var projet = await ProjectModel.findOne({ name: name })
            console.log("projet", projet);
            var historique = {
                user: session.name,
                model: "Delete Projet",
                date: new Date(),
                crud: "Delete",
                old: {
                    "Nom": name
                }
            }
            var historie = await HistoriqueModel(historique).save()

            var Proj = await ProjectModel.findOneAndDelete({ name: name })
            res.send("success")
        })
})

routeExp.route('/projet/:projet').get(async function (req, res) {
    session = req.session
    var projet = req.params.projet
    //console.log("projet", projet);
    res.render('./production/projetPDF.html', { type_util: session.typeUtil, projet: projet })
})

//const express = require('express');

// default options
//app.use(fileUpload());

routeExp.route('/upload').post(async function (req, res) {
    // console.log("log", req.files.avatar);
    // console.log("req", req.body.name);

    var filename = ""
    var nameProjet = req.body.name
    if (req.files) {
        //console.log(req.files);
        var file = req.files.avatar
        filename = file.name
        //console.log("filename", filename);

        file.mv('./Vue/uploads/' + filename, function (err) {
            if (err) {
                console.log("error");
                res.send('error ', err)
            } else {
                // console.log("succes");
                mongoose
                    .connect(
                        "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                        {
                            useUnifiedTopology: true,
                            UseNewUrlParser: true,
                        }
                    )
                    .then(async () => {
                        var allProjetFile = await ProjetFileModel.find()
                        //console.log("allProjetFile", allProjetFile);
                        if (await ProjetFileModel.findOne({ nameProjet: nameProjet })) {
                            var fileUpd = await ProjetFileModel.findOneAndUpdate({ nameProjet: nameProjet }, { nameFile: filename })
                            //console.log("fileUpd", fileUpd);
                        } else {
                            var fileData = {
                                nameProjet: nameProjet,
                                nameFile: filename
                            }
                            //console.log("fileData data", fileData);
                            //var mat = await InventaireModel(newMat).save()
                            var file = await ProjetFileModel(fileData).save()
                            //console.log("fileUpdAdd", file);
                        }
                        //console.log("file", file);
                    })
                res.send('File Uploaded')
            }
        })
    }
});


routeExp.route("/extract-text").post(async function (req, res) {

    //console.log("req.body", req.body);
    var name = req.body.name
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var file = await ProjetFileModel.findOne({ nameProjet: name })
            //console.log("file.nameFile", file);
            if (file) {
                res.send(file.nameFile)
            } else {
                res.send("vide")
            }
        })
})

// Create Reporting
routeExp.route("/addReporting").post(async function (req, res) {
    var name = req.body.name;
    var mcode = req.body.mcode;
    var nom = req.body.nom;
    var number = req.body.number;
    var params = req.body.params;
    var date = req.body.date;
    session = req.session;
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            if (params == "production") {
                if ((await ProductionModel.findOne({ name: name, mcode: mcode, nom: nom, production: req.production, date: date })) || mcode == "") {//|| start == "" || end == "") {
                    res.send('error')
                } else {
                    var dataReport = {
                        name: nom,
                        prenom: name,
                        mcode: mcode,
                        production: req.body.production,
                        number: number,
                        date: date
                    }

                    var saveR = await ProductionModel(dataReport).save()

                    var historique = {
                        user: session.name,
                        model: "Ajout Production",
                        date: new Date(),
                        crud: "Ajout",
                        old: {
                            "Nom": name,
                            "Mcode": mcode,
                            "Production": req.body.production,
                            "Date": date,
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()

                    //console.log("saeve", saveR);
                    res.send("success")
                }

            } else {

                if ((await FauteModel.findOne({ name: name, mcode: mcode, nom: nom, faute: req.faute, date: date })) || mcode == "") {//|| start == "" || end == "") {
                    res.send('error')
                } else {
                    var dataReport = {
                        name: nom,
                        prenom: name,
                        mcode: mcode,
                        faute: req.body.faute,
                        number: number,
                        date: date
                    }

                    var saveR = await FauteModel(dataReport).save()

                    var historique = {
                        user: session.name,
                        model: "Ajout Faute",
                        date: new Date(),
                        crud: "Ajout",
                        old: {
                            "Nom": name,
                            "Mcode": mcode,
                            "Faute": req.body.faute,
                            "Date": date,
                        }
                    }
                    var historie = await HistoriqueModel(historique).save()

                    //console.log("saeve", saveR);
                    res.send("success")
                }
            }
        })

})

//all
routeExp.route("/allReporting").get(async function (req, res) {

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var allRep = await ReportingModel.find();

            var reporting = [];
            allRep.forEach(report => {
                var name = report.name;
                var mcode = report.mcode;
                var production = report.production;
                var faute = report.faute;
                if (report.start) {
                    var dateS = new Date(report.start);
                    var dateF = new Date(report.end);
                    dateS = dateS.toLocaleDateString("fr");
                    dateF = dateF.toLocaleDateString("fr");
                } else {
                    var dateS = null;
                    var dateF = null;
                }
                var newReport = new Reporting(name, mcode, production, faute, dateS, dateF)
                reporting.push(newReport)
            })
            //console.log("reporting", reporting);
            res.send(reporting)
        })
})



//all Productin Reporting
routeExp.route("/allProduction").get(async function (req, res) {

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var productionReport = await ProductionModel.aggregate([
                {
                    $lookup: {
                        from: "agents",
                        localField: "mcode",
                        foreignField: "mcode",
                        as: "agent"
                    }
                }
            ])
            console.log("productionReport", productionReport);
            // var allProd = await ProductionModel.find();

            var reporting = [];
            productionReport.forEach(report => {
                var id = report._id;
                var name = report.name;
                var username = report.prenom;
                var mcode = report.mcode;
                var number = report.number;
                var production = report.production;
                if (report.date) {
                    var dateS = new Date(report.date);
                    dateS = dateS.toLocaleDateString("fr");

                } else {
                    var dateS = null;
                    //var dateF = null;
                }
                var prodRp = {
                    id: report._id,
                    name: report.name,
                    username: report.prenom,
                    mcode: report.mcode,
                    number: report.number,
                    production: report.production,
                    date: dateS,
                    projet: report.agent[0].project
                }
                //var faute = report.faute;
                //var newReport = new Production(mcode, name, username, number, production, dateS, id)
                reporting.push(prodRp)
            })
            console.log("reporting", reporting);
            res.send(reporting)
            // res.send("production")
        })
})


//all Faute Reporting
routeExp.route("/allFaute").get(async function (req, res) {

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var allF = await FauteModel.find();

            var reporting = [];
            allF.forEach(report => {
                var name = report.name;
                var id = report._id;
                var username = report.prenom;
                var mcode = report.mcode;
                var number = report.number;
                var faute = report.faute;
                //var faute = report.faute;
                if (report.date) {
                    var dateS = new Date(report.date);
                    //var dateF = new Date(report.end);
                    dateS = dateS.toLocaleDateString("fr");
                    //dateF = dateF.toLocaleDateString("fr");
                } else {
                    var dateS = null;
                    //var dateF = null;
                }
                var newReport = new Faute(mcode, name, username, number, faute, dateS, id)
                reporting.push(newReport)
            })
            //console.log("reporting", reporting);
            res.send(reporting)
        })
})
//reporting par mois
routeExp.route("/allReportingMois").get(async function (req, res) {

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var allRep = await ReportingModel.find();

            var reporting = [];
            var newReporting = []

            var suit = 0
            allRep.forEach(report => {
                var name = report.name;
                var mcode = report.mcode;
                var production = report.production;
                var faute = report.faute;
                var dateM = ""
                var dateY = ""
                var monthL = ""
                if (report.start) {
                    var dateS = new Date(report.start);
                    dateM = dateS.getMonth() + 1
                    dateY = dateS.getFullYear()
                    const dateMountL = new Date();
                    dateMountL.setMonth(dateM - 1);
                    monthL = dateMountL.toLocaleString('en-US', {
                        month: 'long',
                    })
                    dateS = dateS.toLocaleDateString("fr");
                } else {
                    var dateS = null;
                }
                var c = 1;
                var productionNew
                reporting.forEach(data => {
                    var debut = data.start.split("/");
                    var debutM = parseInt(debut[1])
                    var debutY = parseInt(debut[2])
                    if ((data.mcode == mcode) && (debutM === dateM) && (debutY === dateY)) {
                        productionNew = production
                        c = 0
                    }
                })

                if (c == 0) {

                    newReporting = reporting.map(obj => {
                        var debut = obj.start.split("/");
                        var debutM = parseInt(debut[1])
                        var debutY = parseInt(debut[2])
                        if ((obj.mcode == mcode) && (debutM === dateM) && (debutY === dateY)) {
                            obj.production = parseInt(obj.production) + parseInt(production);
                            obj.faute = parseInt(obj.faute) + parseInt(faute)
                            return obj
                        }

                        return obj;
                    });
                    suit = 1
                } else {
                    var newReport = new Reporting(mcode, name, production, faute, dateS, monthL)
                    reporting.push(newReport)
                    if (suit == 1) {
                        newReporting.push(newReport)
                    }
                }
            })
            //console.log("newReportingMonth", newReporting);
            res.send(newReporting)
        })
})

//selection par semaine
routeExp.route("/allReportingWeek").get(async function (req, res) {

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var allRep = await ReportingModel.find();
            var reporting = [];
            var newReporting = []
            // console.log("allRep", allRep);
            var suit = 0
            allRep.forEach(report => {
                var name = report.name;
                var mcode = report.mcode;
                var production = report.production;
                var faute = report.faute;
                var dateM = ""
                var dateY = ""
                var monthL = ""
                if (report.start) {
                    var dateS = new Date(report.start);
                    var first = dateS.getDate() - dateS.getDay();
                    var firstDayWeekAll = new Date(dateS.setDate(first));
                    var lastDayWeek = new Date(dateS.setDate(first + 6));
                    dateM = dateS.getMonth() + 1
                    dateY = dateS.getFullYear()

                    const dateMountL = new Date();
                    dateMountL.setMonth(dateM - 1);
                    monthL = dateMountL.toLocaleString('en-US', {
                        month: 'long',
                    })
                } else {
                    var dateS = null;
                }
                var c = 1;
                var productionNew
                reporting.forEach(data => {
                    var dateSRep = new Date(data.start);
                    var firstRep = dateSRep.getDate() - dateSRep.getDay();
                    var firstDayWeekRep = new Date(dateSRep.setDate(firstRep));
                    var lastDayWeek = new Date(dateSRep.setDate(firstRep + 6));
                    if ((firstDayWeekAll.toString() === firstDayWeekRep.toString())) {
                        productionNew = production
                        c = 0
                    }
                })

                if (c == 0) {

                    newReporting = reporting.map(obj => {
                        var dateSNewR = new Date(obj.start);
                        var firstNewR = dateSNewR.getDate() - dateSNewR.getDay();
                        var firstDayWeekNW = new Date(dateSNewR.setDate(firstNewR));
                        if ((firstDayWeekAll.toString() === dateSNewR.toString())) {
                            return { ...obj, production: parseInt(obj.production) + parseInt(production), faute: parseInt(obj.faute) + parseInt(faute) };
                        }

                        return obj;
                    });
                    suit = 1
                } else {
                    var newReport = new Reporting(mcode, name, production, faute, firstDayWeekAll, monthL)
                    reporting.push(newReport)
                    if (suit == 1) {
                        newReporting.push(newReport)
                    }
                }
            })

            var newReportingWeek = []
            reporting.forEach(rep => {
                var name = rep.name;
                var production = rep.production;
                var mcode = rep.mcode;
                var faute = rep.faute;
                var start = rep.start;
                var end = rep.end;
                var dateS = ""
                if (rep.start) {
                    var dateS = new Date(rep.start)
                    var dateF = new Date(rep.end)
                    dateS = dateS.toLocaleDateString("fr")
                    dateF = dateF.toLocaleDateString("fr")
                    rep.start = dateS
                } else {
                    var dateS = null;
                    var dateF = null
                }
                var newP = new ReportingWeek(mcode, name, production, faute, dateS, end)
                newReportingWeek.push(newP)
                //

            });

            //console.log("newReportingWeek", newReportingWeek);
            res.send(newReportingWeek)
        })
})


//Update Reporting
routeExp.route('/updateReporting').post(async function (req, res) {
    var mcodeA = req.body.mcodeA;
    var nameA = req.body.nameA;
    var productionA = req.body.productionA;
    var fauteA = req.body.fauteA;
    var debutA = req.body.debutA;
    var mcode = req.body.mcode;
    var production = req.body.production;
    var faute = req.body.faute;
    var debut = req.body.start;
    var name = req.body.name;
    var id = req.body.id;
    var reporting = req.body.reporting;


    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            if (reporting == "production") {

                var historique = {
                    user: session.name,
                    model: "Update Production",
                    date: new Date(),
                    crud: "Update",
                    old: {
                        "Mcode": mcodeA,
                        "Nom": nameA,
                        "Production": productionA,
                        "D??but": debutA,
                        //"Fin": finA
                    },
                    new: {
                        "Mcode": mcode,
                        "Nom": name,
                        "Production": production,
                        "Date": debut,
                        //"Fin": fin
                    }
                }
                var historie = await HistoriqueModel(historique).save()

                var userUdp = await AgentModel.findOne({ mcode: mcode })
                //var updateReport = await ReportingModel.findOneAndUpdate({ mcode: mcodeA, production: productionA, faute: fauteA, start: debutA, end: finA }, { mcode: mcode, name: name, production: production, faute: faute, start: debut, end: fin })
                var updatProd = await ProductionModel.findByIdAndUpdate(
                    { _id: id },
                    {
                        mcode: mcode,
                        production: production, date: debut,
                        name: userUdp.name,
                        prenom: userUdp.usualName,
                        number: userUdp.number,
                    }
                )
                //console.log("updateReport", updateReport);
                res.send("succes")
            } else {

                var historique = {
                    user: session.name,
                    model: "Update Faute",
                    date: new Date(),
                    crud: "Update",
                    old: {
                        "Mcode": mcodeA,
                        "Nom": nameA,
                        "Faute": fauteA,
                        "D??but": debutA,
                        //"Fin": finA
                    },
                    new: {
                        "Mcode": mcode,
                        "Nom": name,
                        "Faute": faute,
                        "Date": debut,
                        //"Fin": fin
                    }
                }
                var historie = await HistoriqueModel(historique).save()

                var userUdp = await AgentModel.findOne({ mcode: mcode })
                //var updateReport = await ReportingModel.findOneAndUpdate({ mcode: mcodeA, production: productionA, faute: fauteA, start: debutA, end: finA }, { mcode: mcode, name: name, production: production, faute: faute, start: debut, end: fin })
                var updatProd = await FauteModel.findByIdAndUpdate(
                    { _id: id },
                    {
                        mcode: mcode,
                        faute: faute, date: debut,
                        name: userUdp.name,
                        prenom: userUdp.usualName,
                        number: userUdp.number,
                    }
                )
                //console.log("updateReport", updateReport);
                res.send("succes")
            }
            // if (mcode == "" || debut == "" || fin == "") {
            //     console.log("error");
            //     res.send("error")
            // } else {
            // }
        })
})

//delete delete Production
routeExp.route('/deleteProduction').post(async function (req, res) {
    var mcode = req.body.mcode;
    var name = req.body.name;
    var production = req.body.production;
    var faute = req.body.faute;
    var start = req.body.start;
    var end = req.body.end;
    var id = req.body.id;

    //console.log("req = ", req.body.start);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var getProd = await ProductionModel.findOne({ _id: id })

            var startR = new Date(getProd.date)
            //var EndR = new Date(getProd.end)
            var historique = {
                user: session.name,
                model: "Delete Production",
                date: new Date(),
                crud: "Delete",
                old: {
                    "Mcode": getProd.mcode,
                    "Nom": getProd.name,
                    "Production": getProd.production,
                    //"Faute": getProd.faute,
                    "D??but": startR.toLocaleDateString("fr"),
                }
            }
            var historie = await HistoriqueModel(historique).save()

            var deleteRep = await ProductionModel.findByIdAndDelete({ _id: id })
            res.send("succes")
            //console.log("deleteRep", deleteRep);
        })

})

// delete faute deleteFaute&a

routeExp.route('/deleteFaute').post(async function (req, res) {
    var mcode = req.body.mcode;
    var name = req.body.name;
    var production = req.body.production;
    var faute = req.body.faute;
    var start = req.body.start;
    var end = req.body.end;
    var id = req.body.id;

    //console.log("req = ", req.body.start);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var getProd = await FauteModel.findOne({ _id: id })
            console.log('getProd', getProd);
            var startR = new Date(getProd.date)
            //var EndR = new Date(getProd.end)
            var historique = {
                user: session.name,
                model: "Delete Faute Reporting",
                date: new Date(),
                crud: "Delete",
                old: {
                    "Mcode": getProd.mcode,
                    "Nom": getProd.name,
                    "Faute": getProd.faute,
                    //"Faute": getProd.faute,
                    "D??but": startR.toLocaleDateString("fr"),
                }
            }
            var historie = await HistoriqueModel(historique).save()

            var deleteRep = await FauteModel.findByIdAndDelete({ _id: id })
            res.send("succes")
            //console.log("deleteRep", deleteRep);
        })

})
// routeExp.route('/listeUser').get(async function (req, res) {
//     session = req.session
//     var projet = req.params.projet
//     //console.log("projet", projet);
//     res.render('./it/ListeUser', { type_util: session.typeUtil, projet: projet })
// })



//get user
routeExp.route('/listecours').get(async function (req, res) {

    session = req.session
    //if (session.typeUtil == "Admin") {
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            var allTL = await TLModel.find()

            //console.log("allTL ", allTL);
            res.render("./it/listeCours.html", { type_util: session.typeUtil, allTL: allTL })
        })
    // } else {
    //     res.redirect("/")
    // }
})

// Ajout agent dans le fichier excel
routeExp.route("/addAgentFile").get(async function (req, res) {
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {

            const parseExcel = (filename) => {
                const excelData = XLSX.readFile(filename);

                return Object.keys(excelData.Sheets).map(name => ({
                    name,
                    data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
                }));
            }
            var liste = []
            parseExcel("./Vue/assets/listeUser.xlsx").forEach(element => {
                liste.push(element.data)
            });

            for (let i = 0; i < liste[0].length; i++) {
                const element = liste[0][i];
                //console.log("element", element);
                var dataUser = {
                    name: element.Nom,
                    usualName: element.NomUsuel,
                    mcode: element.MCode,
                    number: element.Numbering,
                    shift: element.Shift,
                    project: element.Projet,
                    site: element.Site,
                    quartier: element.Quartier,
                    tel: element.Phon
                }
                //console.log("dataUser", dataUser);
                var agent = await AgentModel(dataUser).save()
                // var listA = await AgentModel.find()
                // for (let i = 0; i < listA.length; i++) {
                //     const element = listA[i]._id;
                //     await AgentModel.findOneAndDelete({ _id: element })
                // }
                //console.log("dataUser", agent);
            }
            //console.log("liste", liste);
            res.send("coucou")
        })
})

// Partage des projets en array dans le base de donn??e
// routeExp.route("/AddProjet").get(async function (req, res) {
//     mongoose
//         .connect(
//             "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
//             {
//                 useUnifiedTopology: true,
//                 UseNewUrlParser: true,
//             }
//         )
//         .then(async () => {

//             var allProjet = await AgentModel.find()
//             for (let i = 0; i < allProjet.length; i++) {
//                 const element = allProjet[i];
//                 console.log("element", element.project);
//             }
//             //console.log("liste", allProjet);
//             res.send(allProjet)
//         })
// })

//liste agent filter par shift
routeExp.route('/agentFilter/:shift').get(async function (req, res) {

    session = req.session
    var shift = req.params.shift;

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            var all = await AgentModel.find({ shift: shift })
            // var Projet = await ProjectModel.find();
            //console.log("listAgent", all);
            res.send(all)
        })
})


//liste agent filter par agent
routeExp.route('/agentFilterProjet/:projet').get(async function (req, res) {

    session = req.session
    var projet = req.params.projet;

    //console.log("projet", projet);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            var all = await AgentModel.find({ project: { $all: [projet] } })
            // var Projet = await ProjectModel.find();
            //console.log("listProjet", all);
            //console.log("agentFilterProjet");
            res.send(all)
        })
})
//liste agent filter
routeExp.route('/agentFilterProjShift/:shift/:projet').get(async function (req, res) {

    session = req.session
    var shift = req.params.shift;
    var projet = req.params.projet;

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
            var all = await AgentModel.find({ shift: shift, project: { $all: [projet] } })
            // var Projet = await ProjectModel.find();
            // console.log("listAgent", all);
            res.send(all)
        })
})

//get shift
routeExp.route('/getAllUserClock').get(async function (req, res) {

    userModelClock.find()
        .then(notes => {
            console.log("notes", notes);

            //Shift - Nom - Start - End - Projet
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'some error'
            });
        });

})


//Backup DataBase

routeExp.route("/backup_databas").get(async function (req, res) {
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            try {
                var inventaire = await InventaireModel.find({ validation: true });
                var instruction = await InstructionModel.find({ validation: true });
                var tl = await TLModel.find({ validation: true });
                var agent = await AgentModel.find({ validation: true });
                var user = await UserModel.find({ validation: true });
                var evaluationAgent = await EvaluationAgent.find({ validation: true });
                var planning = await PlanningModel.find({ validation: true });
                var historique = await HistoriqueModel.find({ validation: true });
                var projet = await ProjectModel.find({ validation: true });
                var reporting = await ReportingModel.find({ validation: true });


                //var data = fs.readFileSync("data.json");
                var myObject = []
                myObject.push({ "inventaire": inventaire }, { "instruction": instruction },
                    { "tl": tl }, { "agent": agent }, { "user": user },
                    { "evaluationAgent": evaluationAgent }, { "planning": planning },
                    { "historique": historique }, { "projet": projet }, { "reporting": reporting },
                );

                var newData2 = JSON.stringify(myObject);
                fs.writeFile("./Route/BackUpData/data.json", newData2, (err) => {
                    if (err) throw err;
                    //console.log("New data added");
                });
                console.log("finish backup");
                res.send("finish backup")
            } catch (err) {
                console.log(err);
                res.send(data)
            }
        });
})


routeExp.route("/addReportingExcel").post(async function (req, res) {
    console.log("filename", req.files);

    //console.log("req", req.files);
    if (req.files) {
        //console.log(req.files);
        var file = req.files.avatar
        filename = file.name
        console.log("filename", filename);

        file.mv('./Vue/reportingFile/' + filename, function (err) {
            if (err) {
                console.log("error", err);
                //res.send('error ', err)
            } else {
                mongoose
                    .connect(
                        "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                        {
                            useUnifiedTopology: true,
                            UseNewUrlParser: true,
                        }
                    )
                    .then(async () => {
                        const parseExcel = (filename) => {

                            const excelData = XLSX.readFile(filename);

                            return Object.keys(excelData.Sheets).map(name => ({
                                name,
                                data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
                            }));
                        };

                        var liste = []
                        parseExcel("./Vue/reportingFile/" + filename).forEach(element => {
                            liste.push(element.data)
                        });

                        //console.log("liste", liste[0].length);
                        for (let i = 0; i < liste[0].length; i++) {
                            const element = liste[0][i];
                            var c = {
                                nom: element.NOM,
                                prenom: element.PRENOM,
                                mcode: element.MCODE,
                                number: element.NUMBERING
                            }
                            console.log("lement", c);
                            var proj = await ProductionModel(c).save()
                            //console.log("proj", proj);
                        }
                        res.send("finish")

                    });
            }
        })
    }
})

// routeExp.route("/addUserexcel").get(async function (req, res) {
//     mongoose
//         .connect(
//             "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
//             {
//                 useUnifiedTopology: true,
//                 UseNewUrlParser: true,
//             }
//         )
//         .then(async () => {
//             const parseExcel = (filename) => {
//                 const excelData = XLSX.readFile(filename);
//                 return Object.keys(excelData.Sheets).map(name => ({
//                     name,
//                     data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
//                 }));
//             };

//             var liste = []
//             parseExcel("./Vue/assets/ListeAgents.xlsx").forEach(element => {
//                 //console.log("elemetn", element);
//                 liste.push(element.data)
//             });

//             //console.log("liste", liste[0]);
//             //var membre = await CGNModel.find({ $or: [{ cours: "Problem solving and decision making" }] })
//             // for (let i = 0; i < liste[0].length; i++) {
//             //     var elementliste = liste[0][i];
//             //     for (let j = 0; j < membre.length; j++) {
//             //         const elementmb = membre[j];
//             //         //console.log(j, "elementmb", elementmb.name);
//             //         if (elementmb.name == undefined && (elementliste.EMAIL == elementmb.username)) {
//             //             var cgn = await CGNModel.findOneAndUpdate({ username: elementmb.username, cours: "Problem solving and decision making" }, { name: elementliste.NOM })

//             //         }
//             //     }
//             // }
//             //console.log("liste.length", liste[0].length);
//             for (let i = 0; i < liste[0].length; i++) {
//                 const agent = liste[0][i];
//                 //console.log("agent", liste[0][i]);

//                 var projet = agent.Projet.split("/")
//                 console.log("projet", projet);
//                 var c = {
//                     name: agent.NomComplet,
//                     usualName: agent.NomUsuel,
//                     mcode: agent.MCode,
//                     number: agent.Numbering,
//                     shift: agent.Shift,
//                     project: projet,
//                     site: agent.Site,
//                     quartier: agent.Quartier,
//                     tel: agent.Phon
//                 }
//                 console.log("lement", c);
//                 var proj = await AgentModel(c).save()
//                 // console.log("proj", proj);
//             }
//             res.send("finish")

//         });
// })


// routeExp.route("/addProjetexcel").get(async function (req, res) {
//     mongoose
//         .connect(
//             "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
//             {
//                 useUnifiedTopology: true,
//                 UseNewUrlParser: true,
//             }
//         )
//         .then(async () => {
//             const parseExcel = (filename) => {

//                 const excelData = XLSX.readFile(filename);

//                 return Object.keys(excelData.Sheets).map(name => ({
//                     name,
//                     data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
//                 }));
//             };

//             var liste = []
//             parseExcel("./Vue/assets/listeCours.xlsx").forEach(element => {
//                 liste.push(element.data)
//             });

//             console.log("liste", liste[0].length);
//             //var membre = await CGNModel.find({ $or: [{ cours: "Problem solving and decision making" }] })
//             // for (let i = 0; i < liste[0].length; i++) {
//             //     var elementliste = liste[0][i];
//             //     for (let j = 0; j < membre.length; j++) {
//             //         const elementmb = membre[j];
//             //         //console.log(j, "elementmb", elementmb.name);
//             //         if (elementmb.name == undefined && (elementliste.EMAIL == elementmb.username)) {
//             //             var cgn = await CGNModel.findOneAndUpdate({ username: elementmb.username, cours: "Problem solving and decision making" }, { name: elementliste.NOM })

//             //         }
//             //     }
//             // }
//             for (let i = 0; i < liste[0].length; i++) {
//                 const element = liste[0][i].UP;
//                 var c = {
//                     name: element
//                 }
//                 console.log("lement", c);
//                 var proj = await ProjectModel(c).save()
//                 console.log("proj", proj);
//             }
//             res.send("finish")

//         });
// })
module.exports = routeExp



//"mongodb+srv://rica:ryane_jarello5@cluster0.z3s3n.mongodb.net/Pointage?retryWrites=true&w=majority"