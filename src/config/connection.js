const mongoose = require('mongoose');

class Connection {
    constructor() {
        this.dataBaseConnectionMonngoDB();
    }

    dataBaseConnectionMonngoDB(){
        this.mongoDBConnection = mongoose.connect("mongodb://localhost/nodejs", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Conexão estabelecida com o mongoDB");
        })
        .catch((error) => {
            console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`)
        })
    }
}

module.exports = new Connection();