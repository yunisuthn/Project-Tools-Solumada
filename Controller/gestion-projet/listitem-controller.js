const { default: mongoose } = require("mongoose");
const TList = require("../../Model/TList");
const TListItem = require("../../Model/TListItem");
const UserModel = require("../../Model/UserModel");

const getListItems = async (filter = {}) => await TListItem.find(filter).sort({ "range": "asc" });

const getListItem = async (req, res) => {
    try {
        const list = await TListItem.findById(mongoose.Types.ObjectId(req.params.id));
        const parent = await TList.findById(mongoose.Types.ObjectId(list.parent));
        
        return res.send({
            status: 1,
            list: list,
            parent: parent,
            users: await UserModel.find(),
        });
    } catch (error) {
        console.log(error)
        return res.send({ status: 0 });
    }
}

const postListItem = async (req, res) => {
    try {
        const { title, parent, boardid } = req.body;
        const newListItem = await new TListItem({
            title: title,
            parent: mongoose.Types.ObjectId(parent),
            boardId: mongoose.Types.ObjectId(boardid),
            owner: req.session.mcode,
            members: [req.session.email],
            createdAt: new Date()
        }).save();
        res.send({
            status: 1,
            newListItem: newListItem,
        });
    } catch (error) {
        console.log(error);
        res.send({ status: 0 });
    }    
}

// make move (drag&drop)
const postMoveListItem = async (req, res) => {
    try {
        const { child, parent } = req.body;
        await TListItem.findByIdAndUpdate(
            mongoose.Types.ObjectId(child), {
            parent: mongoose.Types.ObjectId(parent),
        });
        res.send({
            status: 1,
        });
    } catch (error) {
        console.log(error)
        res.send({ status: 0 });
    }    
}

// delete list item
const deleteListItem = async (req, res) => {
    try {
        const id = req.params.id;
        await TListItem.findByIdAndDelete(mongoose.Types.ObjectId(id));
        res.send({
            status: 1,
        });
    } catch (error) {
        console.log(error)
        res.send({ status: 0 });
    }    
}

const updateItemRange = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        // update range by the data id
        data.forEach(async e => {
            await TListItem.findByIdAndUpdate(mongoose.Types.ObjectId(e.id), { range: e.range });
        });

        res.send({ status: 1 });
    } catch (error) {
        console.log(error)
        res.send({ status: 0 });
    }
}
// update list item

const updateListItem= async (req, res) => {
    try {
        const id = req.params.id;
        const data = JSON.parse(req.body.data);
        console.log(data)
        // send email
        const { oldmembers, members, taskTitle } = data;
        if (members && oldmembers) {
            members.forEach(member => {
                // if a new member
                if (oldmembers.indexOf(member) < 0) {
                    sendEmail(req.session.mcode, member, taskTitle);
                }
            });
        }
        // update list item by id
        const updated = await TListItem.findByIdAndUpdate(mongoose.Types.ObjectId(id), data);

        res.send({ status: 1, updated: updated });
    } catch (error) {
        console.log(error)
        res.send({ status: 0 });
    }
}

function sendEmail(adder/*email*/, receiver /*email*/, task) {
    const nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'developpeur.solumada@gmail.com',
            pass: 'maomiexymeryjrze'
        }
    });

    // template
    const template = `
    <div style="padding: 10px; width: 100%; font-size: 13px; font-family: verdana; background: #fff; box-shadow: 0 0 2px rgba(0, 0, 0, 0.3)">
      <p>Hi ${receiver}, </p>
      <p>Vous avez été ajouté dans une tâche appelé <b>${task}</b>.</p>
      <p>Par <b>${adder}</b></p>
      <br>
      <p>Merci</p>
    </div>`;
    var mailOptions = {
        from: 'SOLUMADA ACADEMY',
        to: receiver,
        subject: "Gestion de projet",
        html: template
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { postListItem, getListItems, postMoveListItem, deleteListItem, getListItem, updateItemRange, updateListItem }