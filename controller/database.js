
init = async () => {
    global.mongoose = require("mongoose");
    mongoose.set('debug', true);
    mongoose.Promise = global.Promise;

    const DB_CONSTANTS = require("../constants/MONGODB");

    global.mongooseConn = await global.mongooseConn ? global.mongooseConn : mongoose.connect(DB_CONSTANTS.MONGODB_ADDRESS + DB_CONSTANTS.MONGODB_PORT + "/" + DB_CONSTANTS.DB_NAME, {useNewUrlParser: true});
    global.schema = mongoose.schema;
}

module.exports = {
    init
}