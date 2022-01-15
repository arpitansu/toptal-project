const {connect} = require("mongoose"); 

const { DB_HOST, DB_USER, DB_PASS, DB } = process.env;

const CONNCTION_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB}?retryWrites=true&w=majority`

connect(CONNCTION_URI, {useUnifiedTopology: true, useNewUrlParser : true}, (err, res) => {
    if(err) {
        console.error("error in connecting to database : ", err.message)
    }
    else{
        console.log("connection successful")
    }
});