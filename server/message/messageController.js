const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const { Message } = require("../database");
const { encrypt, decrypt } = require("../utils/encryptionUtils");

/**
 * Obtiene el mensaje segun el uuid y secret pasado por parametros en la
 * peticion POST. Si no lo encuentra o la contraseña no coincide con 
 * la del mensaje se devuelve error 404.
 * @param {*} req 
 * @param {*} res 
 */
const getMessage = async (req, res) => {
    let json = req.body;

    let msg = await Message.findOne({ where: { id: json["id"] } });

    if (msg != null) {
        const match = await bcrypt.compare(json["secret"], msg["secret"])
                                  .then()
                                  .catch(err => res.status(404));
        if (match) {
            // obj con para enviar los datos necesarios.
            msg = {
                content: decrypt(msg["content"], json["secret"]),
                alias: msg["alias"],
                date: msg["date"],
            };

            if (msg === null || !match) res.status(404);
            else res.json(msg);

        }else res.status(404); //Si la contraseña no coincide con la almacenada 
    } else res.status(404); //si el mensaje no ha sido encontrado
    res.send();
};

/**
 * Guarda en la db el mensaje que se ha enviado mediante
 * la petición POST.
 * @param {*} req 
 * @param {*} res 
 */
const sendMessage = async (req, res) => {
    let json = req.body;
    let uuid = uuidv4();
    // Comprobar si existe para evitar que la pk ya haya sido asignada a otro msg.
    const msg = await Message.findOne({ where: { id: uuid } }).catch((err) => {
        res.status(500);
        res.send();
    });
    if (!msg) {
        //console.log(json["content"] + " " + json["secret"]);
        const [message, created] = await Message.findOrCreate({
            where: { id: uuid },
            defaults: {
                alias: json["alias"] ? json["alias"] : "Unknown",
                content: encrypt(json["content"], json["secret"]),
                secret: bcrypt.hashSync(json["secret"], 2),
                date: new Date(),
            },
        }).catch((err) => {
            res.status(404);
            res.send();
        });

        if (created) {
            res.send(uuid);
            console.log("message Created id: " + message.id);
        }
    }
};

/**
 * Elimina el mensaje pasado mediante la peticion DELETE.
 * @param {*} req 
 * @param {*} res 
 */
const deleteMessage = async (req, res) => {
    let json = req.body;

    try {
        let idmsg = json["id"];
        let secret = json["secret"];
        if (secret === undefined) throw Error("Secret is not exist");

        let msg = await Message.findOne({ where: { id: idmsg } });
        const match = await bcrypt.compare(secret, msg["secret"]);

        if (match) {
            await Message.destroy({where: { id: json["id"] }});
            res.status(201);
        }else res.status(404);
    }
    catch(err) {
        res.status(404);
    }
    finally{
        res.send();
    }
};

module.exports = {
    getMessage,
    sendMessage,
    deleteMessage
};
