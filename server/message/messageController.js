const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const { Message } = require("../database");
const { encrypt, decrypt } = require("../utils/encryptionUtils");

const getMessage = async (req, res) => {
    let json = req.body;

    let msg = await Message.findOne({ where: { id: json["id"] } }).catch(
        (err) => {
            res.status(500);
            res.send();
        }
    );

    const match = await bcrypt.compare(json["secret"], msg["secret"]); // si el pass no coindice con el pass del message en la DB, res 404
    if (match) {
        // obj con para enviar los datos necesarios.
        msg = {
            content: decrypt(msg["content"], json["secret"]),
            alias: msg["alias"],
            date: msg["date"],
        };

        if (msg === null || !match) {
            res.status(404);
            res.send();
        } else {
            res.json(msg);
        }
    }
};

const sendMessage = async (req, res) => {
    let json = req.body;
    let uuid = uuidv4();
    // Comprobar si existe para evitar que la pk ya haya sido asignada a otro msg.
    const msg = await Message.findOne({ where: { id: uuid } }).catch((err) => {
        res.status(500);
        res.send();
    });
    if (!msg) {
        console.log(json["content"] + " " + json["secret"]);
        const [message, created] = await Message.findOrCreate({
            where: { id: uuid },
            defaults: {
                alias: json["alias"],
                content: encrypt(json["content"], json["secret"]),
                secret: bcrypt.hashSync(json["secret"], 2),
                date: new Date(),
            },
        }).catch((err) => {
            res.status(404);
            res.send();
        });

        if (created) {
            res.status(201);
            res.send();
            console.log("message Created id: " + message.id);
        }
    }
};
module.exports = {
    getMessage,
    sendMessage,
};
