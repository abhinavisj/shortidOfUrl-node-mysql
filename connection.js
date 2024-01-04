const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "shortlink",
})

connection.connect((error)=>{
    if(error){
        console.log({error:error})
    }else{
        console.log("Database has been connected successfully.")
    }
})

module.exports = {connection,};