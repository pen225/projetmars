const { check} = require('express-validator');


const validator = [
    check('nom', 'Le nom doit contenir 3 caracteres au minimum')
        .exists()
        .isLength({ min: 3 }),
    check('prenom', 'Le prenom doit contenir 3 caracteres au minimum')
        .exists()
        .isLength({ min: 3 }),
    check('email', "Votre email n'est pas correcte" )
        .isEmail()
        .normalizeEmail(),
    check('password', 'Votre password doit contenir 4 caracteres au minimum')
        .exists()
        .isLength({ min: 4 }),
    check('repeatePassword')
        .trim()
        .isLength({min:4, max:16})
        .custom( async (repeatePassword, {req}) =>{
            const password = req.body.password
            if(password !== repeatePassword){
                throw new Error('Mot de passe non identique');
              }
        })
        
]


module.exports = {
    validator
}