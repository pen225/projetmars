const req = require('express/lib/request');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const userToken = class{
    static creatToken = (data) =>{
        let user = {
            nom : data.nom,
            prenom : data.prenom,
            email : data.email,
            password : data.password
        }
        let token = jwt.sign(user, process.env.JWT_PASS_SECRET)
        console.log(token)
        return token;
    }

    static verifToken = (token) =>{
        try {
            let decoded = jwt.verify(token, process.env.JWT_PASS_SECRET);
            console.log(decoded);
            return {success: decoded}
          } catch {
            // err
            console.log("Token non valide");
            return {error: "Token non valide"}
        }
    }

}


module.exports = userToken;
