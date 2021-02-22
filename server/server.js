const express    = require("express");
const minimist   = require('minimist');
const bodyParser = require("body-parser");

const messageRouter  = require("./routes/messageRoutes");
const app  = express();

// inicializar variables server --port <port> --address <address>
let args = minimist(process.argv.slice(2));
const port = (args.port)?args.port:process.env.PORT;
const address = (args.address)?args.address:process.env.ADDRESS;


require("./database") // Inicializa la db y crea el objeto sequelizer

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/message", messageRouter);

app.listen (port, address, () => {
    console.log(`App listening at http://${address}:${port}`)
})
