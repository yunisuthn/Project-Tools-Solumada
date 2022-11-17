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
const ReportingModel = require("../Model/ReportingModel");

//planning congé Ricardo Base de donné
const leaveModel = require("../Model/leave")
const userModelClock = require("../Model/User")

const XLSX = require('xlsx');
const pdfParse = require("pdf-parse")
const fs = require("fs")

var dateTime = require('node-datetime');
const nodemailer = require("nodemailer")
// const { route } = require('express/lib/application')
//login
routeExp.route('/').get(async function (req, res) {
    var session = req.session
    if (session.name) {
        res.redirect("/acceuil")
    } else {
        res.render("page-login.html", { erreur: "" })
    }
})

//acceuil
routeExp.route('/acceuil').get(async function (req, res) {
    var session = req.session;
    //console.log("session", session);
    if (session.email) {
        res.render("acceuil.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/IT').get(async function (req, res) {
    var session = req.session
    //console.log("session.typeUtil ", session.typeUtil);
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/IT.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/operation').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "Operation") {
        res.render("./operation/operation.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/evaluationTL').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "Operation") {
        res.render("./operation/evaluationTL.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

routeExp.route('/production').get(async function (req, res) {

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
        res.render("./production/production.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

//ACTIF Inventaire
//Inventaire uc
routeExp.route('/inventaire').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/actif/inventaireUC.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

// Get Inventaire ecran
routeExp.route('/inventaireEcran').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/actif/inventaire-ecran.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

//Inventaire clavier
routeExp.route('/inventaireClavier').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/actif/inventaire-clavier.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

//Inventaire souris
routeExp.route('/inventaireSouris').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/actif/inventaire-souris.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

//Inventaire phone
routeExp.route('/inventairePhone').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/actif/inventaire-phone.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})


//INACTIF Inventaire
//Inventaire uc
routeExp.route('/inventaire-inact-uc').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/inactif/inventaireUC.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

// Get Inventaire ecran
routeExp.route('/inventaire-inact-ecran').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/inactif/inventaire-ecran.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

//Inventaire clavier
routeExp.route('/inventaire-inact-clavier').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/inactif/inventaire-clavier.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

//Inventaire souris
routeExp.route('/inventaire-inact-souris').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/inactif/inventaire-souris.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

//Inventaire phone
routeExp.route('/inventaire-inact-phone').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/inactif/inventaire-phone.html", { type_util: session.typeUtil })
    } else {
        res.redirect("/")
    }
})

// all instruction
routeExp.route('/instruction').get(async function (req, res) {

    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
    var resolution = req.body.resolution
    var portHdmi = req.body.portHdmi
    var portVga = req.body.portVga
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

    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
                    portHdmi == "false" && portVga == "false" && portUsb == "false" && portPci == "false" && imei1 == "" && imei2 == "" &&
                    chargeur == "false" && cable == "false" && housse == "false" && antivirus == "" && vpn == "" && usb == "") {
                    res.send('error')
                } else {
                    var newMat = {
                        actif: actif,
                        name: name, type: type,
                        localisation: localisation, departement: departement,
                        equipement: equipement, numSerie: numSerie,
                        marque: marque, processeur: processeur,
                        ram: ram, diskDur: diskDur,
                        capacite: capacite, cleWin: cleWin,
                        resolution: resolution,
                        portHdmi: portHdmi, portVga: portVga,
                        portUsb: portUsb, portPci: portPci,
                        imei1: imei1, imei2: imei2,
                        chargeur: chargeur, cable: cable, housse: housse,
                        antivirus: antivirus,
                        vpn: vpn, nbUsb: usb,
                    }
                    var mat = await InventaireModel(newMat).save()
                    //console.log("addInventaire", mat);
                    res.send("success")
                }
            })
    } else {
        res.redirect("/")
    }
})

//GET DATA inventaire ACTIF
//invetiaire UC
routeExp.route('/allUCActifInventaire').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async () => {
                var allInv = await InventaireModel.find({ name: "uc", actif: true })
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})
// Get all Material in inventary Ecran
routeExp.route('/allEcranActifInventaire').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
                res.send(allInv)
            })
    } else {
        res.redirect("/")
    }
})


// Get all Material in inventary Clavier
routeExp.route('/allClavierActifInventaire').get(async function (req, res) {
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
    var session = req.session
    var code = req.body.code;
    var codeN = req.body.codeNew;
    var name = req.body.name;
    var nombre = req.body.nombre;
    var licence = req.body.licence;
    var commentaire = req.body.commentaire;
    var nameInventA = req.body.nameInventA;
    var nombreInventA = req.body.nombreInventA;
    var licencInventA = req.body.licencInventA;
    var commentInventA = req.body.commentInventA;

    //console.log("nombreInventA ", nombreInventA, " nameInventA ", nameInventA);
    //console.log("session", session);
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {

                var updat = await InventaireModel.findOneAndUpdate({ code: code },
                    { code: codeN, name: name, nombre: nombre, licence: licence, commentaire: commentaire })
                // console.log("updat ", updat);
                if (code == codeN && name == nameInventA && nombre == nombreInventA
                    && licence == licencInventA && commentaire == commentInventA) {

                } else {
                    var historique = {
                        user: session.name,
                        model: "Inventaire",
                        date: new Date(),
                        old: {
                            "code": code,
                            "name": nameInventA,
                            "nombre": nombreInventA,
                            "licence": licencInventA,
                            "commentaire": commentInventA
                        },
                        new: {
                            "code": codeN,
                            "name": name,
                            "nombre": nombre,
                            "licence": licence,
                            "commentaire": commentaire
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
routeExp.route('/deleteMaterial').post(async function (req, res) {
    var code = req.body.code;

    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
                var delet = await InventaireModel.findOneAndDelete({ code: code })
                // console.log("delet", delet);
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

    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
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
                        model: "Instruction",
                        date: new Date(),
                        new: {
                            "name": name,
                            "title": title,
                            "instruction": instruct
                        },
                        old: {
                            "name": oldName,
                            "title": titleOld,
                            "instruction": instructOld
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

    var session = req.session

    //console.log("name", name);
    //if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true
            }
        )
        .then(async () => {
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

    var session = req.session
    if (session.typeUtil == "Operation") {
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

    var session = req.session
    //if (session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "Operation") {
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
    var session = req.session
    if (session.typeUtil == "Operation") {
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
                        model: "Evaluation TL",
                        date: new Date(),
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

    var session = req.session
    if (session.typeUtil == "Operation") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
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
    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {

        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {

                var planning = await PlanningModel.aggregate([
                    {
                        $sort: {
                            project: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$project",

                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            project: "$_id",

                        }
                    }
                ])
                var agent = await AgentModel.find()

                var plan = await ProjectModel.find()
                //console.log("agent", plan);
                res.render("./production/planning.html", { type_util: session.typeUtil, plan: plan, agent: agent })
                //res.render("./production/charteRangeFilter.html", {plan: allPlaning, agent: agent})
            })
    } else {
        res.redirect("/")
    }
})

//get planning
routeExp.route('/planning/:project/:shift').get(async function (req, res) {
    var session = req.session
    var shift = req.params.shift
    var project = req.params.project;
    // console.log("shift", shift);
    // console.log("project", project);
    //if (session.typeUtil == "TL" || session.typeUtil == "Operation") {

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

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
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

//Evaluation agent
routeExp.route('/evaluationAgent').get(async function (req, res) {

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
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


    var session = req.session

    //console.log("project", project);
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
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
    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
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
                            model: "Agent",
                            date: new Date(),
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

    var session = req.session

    // console.log("req.body", req.body);
    // console.log("name", name);
    // console.log("mcodeN", mcodeN);
    //console.log("req.body", req.body);
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
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
                            model: "Evaluation Agent",
                            date: new Date(),
                            old: {
                                "mcode": oldMCode,
                                "name": nameA,
                                "production": productionA,
                                "quality": qualityA,
                                "comportement": comportementA,
                            },
                            new: {
                                "mcode": mcodeN,
                                "name": name,
                                "production": production,
                                "quality": quality,
                                "comportement": comportement,
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

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
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

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async () => {
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

    var session = req.session
    if (session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "Operation") {
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
                if (allHistoryDelet.length == 10) {
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
                    //console.log("element", element.date);

                    var today = element.date;
                    today = today.setHours(today.getHours() + 3);


                    var dt = dateTime.create(today);
                    var formatted = dt.format('d-m-Y H:M:S');
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

    var session = req.session
    if (session.typeUtil == "Operation") {
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
    let v = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!é&#"
    for (let i = 0; i < 6; i++) {
        const char = v.charAt(Math.random() * v.length - 1)
        code += char;
    }
    return code
}


//get one Agent
routeExp.route("/getOneAgent").post(async function (req, res) {
    var mcode1 = req.body.mcode1

    var session = req.session
    //console.log("mcode1", req.body.mcode1);
    //if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "Operation") {
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

    var session = req.session

    //console.log("mcode", req.body);
    if (session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "Operation") {
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

    var session = req.session
    if (session.typeUtil == "Operation") {
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
    var session = req.session;
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
    var session = req.session;
    session.name = null;
    session.email = null;
    session.typeUtil = null;
    session.mcode = null;
    //console.log("session", session);
    res.redirect("/")
})

routeExp.route("/profil").get(async function (req, res) {
    var session = req.session
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
    var session = req.session
    if (session.mailconfirm) {
        res.redirect('/sendMail')
    } else {
        res.render("pages-forget.html", { err: "" })
    }
})

//send mail
routeExp.route("/sendMail").post(async function (req, res) {
    var session = req.session
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
    var session = req.session;
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
    var session = req.session
    //console.log("session", session);
    if (session.code == req.body.code) {
        res.send("match")
    } else {
        res.send("not")
    }
})

routeExp.route("/changePassword").post(async function (req, res) {
    var newpass = req.body.pass;
    var session = req.session;

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
            //console.log("user", user.users);
            var newUs = []
            for (let i = 0; i < user.length; i++) {
                const element = user[i];
                if (element.users.length > 0) {
                    newUs.push(element)
                }

            }
            res.send(newUs)
        })
});

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


    var session = req.session
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

    var session = req.session
    //if (session.typeUtil == "TL" || session.typeUtil == "Operation") {

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

    var session = req.session
    //if (session.typeUtil == "TL" || session.typeUtil == "Operation") {

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

    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {

            // mongoose
            //     .connect(
            //         "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            //         {
            //             useUnifiedTopology: true,
            //             UseNewUrlParser: true,
            //         }
            //     )
            //     .then(async () => {
            // if ((await ProjectModel.findOne({ name: nameNew })) || nameNew == "") {
            //     res.send('error')
            // } else {
            var Proj = await ProjectModel.findOneAndDelete({ name: name })
            //console.log("proje", Proj);
            res.send("success")
            //}
            //})
        })
})

routeExp.route('/projet/:projet').get(async function (req, res) {
    var session = req.session
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
    var production = req.body.production;
    var faute = req.body.faute;
    var start = req.body.start;
    var end = req.body.end;

    //console.log("end", end);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            if ((await ReportingModel.findOne({ name: name, mcode: mcode, production: production, faute: faute, start: start, end: end })) || mcode == "" || start == "" || end == "") {
                res.send('error')
            } else {
                var dataReport = {
                    name: name,
                    mcode: mcode,
                    production: production,
                    faute: faute,
                    start: start,
                    end: end
                }

                var saveR = await ReportingModel(dataReport).save()
                //console.log("saeve", saveR);
                res.send("success")
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
    var productionA = req.body.productionA;
    var fauteA = req.body.fauteA;
    var debutA = req.body.debutA;
    var finA = req.body.finA;
    var mcode = req.body.mcode;
    var production = req.body.production;
    var faute = req.body.faute;
    var debut = req.body.start;
    var fin = req.body.end;
    var name = req.body.name;


    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            if (mcode == "" || debut == "" || fin == "") {
                console.log("error");
                res.send("error")
            } else {
                var updateReport = await ReportingModel.findOneAndUpdate({ mcode: mcodeA, production: productionA, faute: fauteA, start: debutA, end: finA }, { mcode: mcode, name: name, production: production, faute: faute, start: debut, end: fin })
                //console.log("updateReport", updateReport);
                res.send("succes")
            }
        })
})

//delete reporting
routeExp.route('/deleteReporting').post(async function (req, res) {
    var mcode = req.body.mcode;
    var name = req.body.name;
    var production = req.body.production;
    var faute = req.body.faute;
    var start = req.body.start;
    var end = req.body.end;

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
            var deleteRep = await ReportingModel.findOneAndDelete({ mcode: mcode, name: name, production: production, faute: faute, start: start, end: end })
            res.send("succes")
            //console.log("deleteRep", deleteRep);
        })

})


// routeExp.route('/listeUser').get(async function (req, res) {
//     var session = req.session
//     var projet = req.params.projet
//     //console.log("projet", projet);
//     res.render('./it/ListeUser', { type_util: session.typeUtil, projet: projet })
// })



//get user
routeExp.route('/listecours').get(async function (req, res) {

    var session = req.session
    //if (session.typeUtil == "Operation") {
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

// Partage des projets en array dans le base de donnée
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

    var session = req.session
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

    var session = req.session
    var projet = req.params.projet;

    console.log("projet", projet);
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
            console.log("agentFilterProjet");
            res.send(all)
        })
})
//liste agent filter
routeExp.route('/agentFilterProjShift/:shift/:projet').get(async function (req, res) {

    var session = req.session
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
module.exports = routeExp



//"mongodb+srv://rica:ryane_jarello5@cluster0.z3s3n.mongodb.net/Pointage?retryWrites=true&w=majority"