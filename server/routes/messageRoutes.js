const router = require("express").Router();
const messageLib = require('../message/messageController');

/**
 * POST /api/message - recupera el mensaje con el id pasado en la peticion
 */
router.post("/", messageLib.getMessage);

/**
 * POST /api/message/send - Si el mensaje con id pasado en la peticion no existe
 *                          lo crea.
 */
router.post("/send", messageLib.sendMessage);


module.exports = router;