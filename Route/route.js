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

const nodemailer = require("nodemailer")
// const { route } = require('express/lib/application')
//login
routeExp.route('/').get(async function(req, res) {
    var session = req.session
    if (session.name) {
        res.redirect("/acceuil")
    } else {
        res.render("page-login.html", {erreur: ""})
    }
})

//acceuil
routeExp.route('/acceuil').get(async function(req, res) {
    var session = req.session;
    //console.log("session", session);
    if (session.email) {
        res.render("acceuil.html", {type_util: session.typeUtil})
    } else {
        res.redirect("/")
    }
})

routeExp.route('/IT').get(async function(req, res){
    var session = req.session
    //console.log("session.typeUtil ", session.typeUtil);
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/IT.html")
    } else {
        res.redirect("/")
    }
})

routeExp.route('/operation').get( async function(req, res) {
    var session = req.session
    if (session.typeUtil == "Operation") {
        res.render("./operation/operation.html")
    } else {
        res.redirect("/")
    }
})

routeExp.route('/evaluationTL').get( async function(req, res) {
    var session = req.session
    if (session.typeUtil == "Operation") {
        res.render("./operation/evaluationTL.html")
    } else {
        res.redirect("/")
    }
})

routeExp.route('/production').get(async function(req, res){

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
        res.render("./production/production.html")
    } else {
        res.redirect("/")
    }
})

routeExp.route('/inventaire').get(async function(req, res){
    var session = req.session
    if (session.typeUtil == "IT" || session.typeUtil == "Operation") {
        res.render("./it/inventaire.html")
    } else {
        res.redirect("/")
    }
})

// all instruction
routeExp.route('/instruction').get(async function(req, res){

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
            .then(async ()=>{
                var allInstruct = await InstructionModel.find({validation: true});
                var InstructAll = [];

                allInstruct.forEach(instr => {
                    instr.instruction = instr.instruction.substr(0,50) + " ..."
                    //InstructAll.push(instr)
                });
                //console.log("allInstruct ", InstructAll);
                var instructionLong = await InstructionModel.find({validation: true});
                res.render("./it/instruction.html",{allInstruct : allInstruct, instruction: instructionLong} )
            })
    } else {
        res.redirect("/")
    }
})


routeExp.route('/addInventaire').post(async function (req, res) {
    var name = req.body.name
    var code = req.body.code
    var nombre = req.body.nombr

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
            .then(async ()=>{
                if ((await InventaireModel.findOne({code: code})) || name == "" || code == "" || nombre == "") {
                    res.send('error')
                } else {
                    var newMat = {
                        name: name,
                        code: code,
                        nombre: nombre
                    }
                    var mat = await InventaireModel(newMat).save()
                    // console.log("addInventaire", mat);
                    res.send("success")
                }
            })
    } else {
        res.redirect("/")
    }
})   


// Get all Material in inventary
routeExp.route('/allInventaire').get(async function (req, res) {
    
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
            .then(async ()=>{
                var allInv = await InventaireModel.find()
                // console.log("al", allInv);
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
            .then(async ()=>{
                var invent = await InventaireModel.findOne({code: codeM})
                
                // console.log("codeM", invent);
                res.send(invent)
            })
    } else {
        res.redirect("/")
    }
})

//Update Material
routeExp.route('/updateInvent').post(async function (req, res) {
    var code = req.body.code;
    var name = req.body.name;
    var nombre = req.body.nombre;

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
            .then(async ()=>{
                var updat = await InventaireModel.findOneAndUpdate({code: code}, {name: name, nombre: nombre})
                // console.log("updat ", updat);
                res.send("success")
            })  
    } else {
        res.redirect("/")
    }
})

//delete material in inventary
routeExp.route('/deleteMaterial').post(async function (req, res) {
    var code= req.body.code;

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
            .then(async ()=>{
                var delet = await InventaireModel.findOneAndDelete({code: code})
                // console.log("delet", delet);
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})

//new instruction
routeExp.route('/addInstruction').post(async function (req, res) {
    var name= req.body.name;
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
            .then(async()=>{
                // console.log("name ",name);
                // console.log("titre ",titre);
                // console.log("instruct ",instruct);
                if ((await InstructionModel.findOne({name: name})) || name == "" || titre == "" || instruct == ""){
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
            .then(async()=>{
                var instructUpdat = await InstructionModel.findOneAndUpdate({name: oldName}, {name: name, title: title, instruction: instruct})
                // console.log("instructUpdat", instructUpdat);
                res.send("success")
                // if ((await InstructionModel.findOne({$or: [{name: name}]})) || name=="" || titre == "" || instruct == ""){
                //     console.log("error");
                //     res.send('error')
                // } else {
                //     console.log("succ");
                //     var newInst = {
                //         name: name,
                //         title: titre,
                //         instruction: instruct
                //     }
                //     var inst = await InstructionModel(newInst).save()
                //     console.log("instruction", inst);   
                //     res.send("success")
                // }
            })
    } else {
        res.redirect("/")
    }
})


//delete material in inventary
routeExp.route('/deleteInstruction').post(async function (req, res) {
    var name= req.body.name;

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
            .then(async ()=>{
                var delet = await InstructionModel.findOneAndDelete({name: name})
                // console.log("delet", delet);
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})

//all Team Leader
routeExp.route('/allTL').get(async function (req, res) {
    
    var session = req.session
    if ( session.typeUtil == "Operation") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async ()=>{
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
    if ( session.typeUtil == "Operation") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async ()=>{
                var all = await UserModel.find()
                // console.log("all", all);
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
            .then(async ()=>{
                if ((await TLModel.findOne({mcode: mcode})) || name == "" || mcode == "" || strengths == "") {
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
    // var mcode = req.body.mcode;
    var strengths = req.body.strengths;
    var weaknesses = req.body.weaknesses;
    var opportunities = req.body.opportunities;
    var threats = req.body.threats;

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
            .then(async()=>{
                var TLUpdat = await TLModel.findOneAndUpdate({mcode: oldMCode}, {name: name, strengths: strengths, weaknesses: weaknesses, opportunities: opportunities, threats: threats})
                // console.log("TLUpdat", TLUpdat);
                res.send("success")
                // if ((await InstructionModel.findOne({$or: [{name: name}]})) || name=="" || titre == "" || instruct == ""){
                //     console.log("error");
                //     res.send('error')
                // } else {
                //     console.log("succ");
                //     var newInst = {
                //         name: name,
                //         title: titre,
                //         instruction: instruct
                //     }
                //     var inst = await InstructionModel(newInst).save()
                //     console.log("instruction", inst);   
                //     res.send("success")
                // }
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
            .then(async()=>{
                var deleteUser = await TLModel.findOneAndDelete({mcode: mcode})
                // console.log("deleteUser", deleteUser);
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})

//get planning
routeExp.route('/planning').get(async function(req, res){
    var session = req.session
    //if (session.typeUtil == "TL" || session.typeUtil == "Operation") {

        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async()=>{
                
                var allPlaning = await PlanningModel.find()
                var agent = await AgentModel.find()
                //console.log("agent", agent);
                res.render("./production/planning.html", {plan: allPlaning, agent: agent})
                //res.render("./production/charteRangeFilter.html", {plan: allPlaning, agent: agent})
            })
    // } else {
    //     res.redirect("/")
    // }
})

//get planning
routeExp.route('/planning/:project/:shift').get(async function(req, res){
    var session = req.session
    var shift = req.params.shift
    var project = req.params.project;
    console.log("shift", shift);
    console.log("project", project);
    //if (session.typeUtil == "TL" || session.typeUtil == "Operation") {

        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true
                }
            )
            .then(async()=>{
                
                var allPlaning = await PlanningModel.find()
                var agent = await AgentModel.find()
                console.log("agent", shift , " ", project);
                res.render("./production/planning.html", {plan: allPlaning, agent: agent})
            })
    // } else {
    //     res.redirect("/")
    // }
})

//liste agent
routeExp.route('/agent').get(async function(req, res){

    var session = req.session
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
        res.render("./production/listeAgent.html")
    } else {
        res.redirect("/")
    }
})

//Evaluation agent
routeExp.route('/evaluationAgent').get(async function(req, res){

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
            .then(async()=>{
                var listAgent = await AgentModel.find();
                //console.log("listAgent", listAgent);
                res.render("./production/evaluationAgent.html", {listAgent: listAgent})

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
    if (session.typeUtil == "TL" || session.typeUtil == "Operation") {
        mongoose
            .connect(
                "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
                {
                    useUnifiedTopology: true,
                    UseNewUrlParser: true,
                }
            )
            .then(async ()=>{
                if ((await AgentModel.findOne({mcode: mcode})) || name == "" || mcode == "" || number == "") {
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
            .then(async ()=>{
                if ((await EvaluationAgent.findOne({mcode: mcode})) || production == "" || quality == "") {
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
            .then(async ()=>{
                var all = await AgentModel.find()
                // console.log("all", all);
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
            .then(async ()=>{
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
    var name = req.body.name;
    var usualName = req.body.usualName;
    var number = req.body.number;
    var shift = req.body.shift;
    var project = req.body.project;
    var site = req.body.site;
    var quartier = req.body.quartier;
    var phon = req.body.tel;

    // console.log("phon", phon);
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
            .then(async()=>{
                if (name=="") {
                    res.send('error')
                } else {
                    var agent = await AgentModel.findOneAndUpdate({mcode: oldMCode}, {name: name, usualName: usualName,  number: number, shift: shift, project: project, site: site, quartier: quartier, tel: phon})
                    //console.log("agent", agent);
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
            .then(async()=>{
                if (production=="") {
                    res.send('error')
                } else {
                    var agent = await EvaluationAgent.findOneAndUpdate({mcode: oldMCode}, {production: production, quality: quality,  comportement: comportement})
                    // console.log("agent", agent);
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
            .then(async()=>{
                var deleteUser = await AgentModel.findOneAndDelete({mcode: mcode})
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
            .then(async()=>{
                var deleteUser = await EvaluationAgent.findOneAndDelete({mcode: mcode})
                // console.log("deleteUser", deleteUser);
                res.send("success")
            })
    } else {
        res.redirect("/")
    }
})
//get user
routeExp.route('/user').get(async function(req, res){

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
            .then(async()=>{
                var allTL = await TLModel.find()
                //console.log("allTL ", allTL);
                res.render("./operation/user.html", {allTL: allTL})
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
            .then(async()=>{
                if ((await UserModel.findOne({mcode: mcode, email: email}))|| mcode=="" || name=="" || email=="" || type=="") {
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
        const char = v.charAt(Math.random() * v.length -1 )
        code +=char;
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
            .then(async()=>{
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
            .then(async()=>{
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
    var mcode = req.body.ancien_mcod

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
            .then(async()=>{
                var userUpd = await UserModel.findOneAndUpdate({mcode: mcode}, {name: name, email:email, typeUtil: type_util})
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
            .then(async()=>{
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
            .then(async()=>{
                var deletUser = await UserModel.findOneAndDelete({mcode: mcode})
                //console.log("deletUser", deletUser);
                res.send("success")
            })

    } else {
        res.redirect("/")
    }
})


//post login    
routeExp.route('/login').post(async function(req, res) {
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
        .then(async ()=>{
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
                res.render("page-login.html",{
                    erreur: "Email ou mot de passe incorrect"
                })
            }
        })
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

routeExp.route("/profil").get( async function (req, res) {
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
        .then(async ()=>{
            var profil = await UserModel.findOne({mcode: session.mcode})
            // console.log("profil", profil);
            res.render("profil.html", {profil: profil})
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
        res.render("pages-forget.html", {err: ""})
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
    .then(async ()=>{
        if (await UserModel.findOne({email: email})) {
            session.mailconfirm = email
            session.code = randomCode()
            sendEmail(
                session.mailconfirm,
                "Verification code project tools solumada",
                htmlVerification(session.code)
            )
            res.redirect("/sendMail");
        } else {
            res.render("pages-forget.html", {err: "Username does not exist"})
        }
    })
})

routeExp.route("/sendMail").get(async function (req, res){
    var session = req.session;
    if(session.mailconfirm){
        res.render("resetPassword1.html", {err: ""})
    }else{
        res.redirect("/")
    }
})
function randomCode() {
    var code = "";
    let variable = "0123456789";
    for (let i = 0; i < 6; i++) {
        const char = variable.charAt(Math.random() * variable.length -1)
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

routeExp.route("/getOneInstruction").post(async function(req, res){
    var nameInstruct = req.body.instructionName
    console.log("nameInstruct", nameInstruct);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var instruct = await InstructionModel.findOne({name: nameInstruct})
            console.log("instruct", instruct);
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
            if (await PlanningModel.findOne({mcode: mcode})){//}  || shift=="" || mcode=="" || prenom=="" || project=="" ) {
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

class Plannings{
    constructor(shift, usualName, mcode, project, start, end){
        this.shift = shift;
        this.usualName = usualName;
        this.mcode = mcode;
        this.project = project;
        this.start = start;
        this.end = end
    }

}
routeExp.route("/allPlanning").get(async function (req, res) {
    
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var allPlanning = await PlanningModel.find()
            var planning = []
            allPlanning.forEach(plan => {
                var usualName =  plan.usualName;
                var shift = plan.shift;
                var mcode = plan.mcode;
                var project = plan.project;
                if (plan.start) {
                    var dateS = new Date(plan.start)
                    var dateF = new Date(plan.end)
                    dateS = dateS.toLocaleDateString("fr")
                    dateF = dateF.toLocaleDateString("fr")

                    plan.start = dateS
                }else{
                    var dateS = null;
                    var dateF = null
                }
                var newP = new Plannings(shift, usualName, mcode, project, dateS, dateF)
                planning.push(newP)
                //
                
            });
            //console.log("allPlanning", planning);
            res.send(planning)
        })
})

routeExp.route("/allPlannigView").get(async function (req, res) {
    
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            var allPlanning = await PlanningModel.find()
            
            //console.log("allPlanning", allPlanning);
            res.send(allPlanning)
        })
})

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
            var allPlanningShift = await PlanningModel.find({shift: shift, project: project})
            
            var allPlaning = await PlanningModel.find()
            console.log("allPlanningShift", allPlanningShift);
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
    //console.log("req", req.body);
    mongoose
        .connect(
            "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                UseNewUrlParser: true,
            }
        )
        .then(async () => {
            if (shift=="" || project=="") {
                res.send("error")
            } else {
                var planUpd = await PlanningModel.findOneAndUpdate({mcode: mcodeAncien}, {mcode: mcodeNouv, usualName: prenomUpdat, shift: shift, start: start, end: end, project: project})
                //console.log("planUpd", planUpd);
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
            var deletePlan = await PlanningModel.findOneAndDelete({mcode: mcode})
            console.log("deletePlan", deletePlan);
            res.send("success")
        })
})
module.exports = routeExp