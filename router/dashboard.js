const express = require('express');
const userController = require('../controller/control');
const router = express.Router();
const axios = require("axios");



// router.get('/', userController.afficheDashboard)
router.get('/', (req, res) =>{
    axios.get("https://api.neoscan.io/api/main_net/v1/get_all_nodes")
    .then((response) =>{
        console.log(response.data);
        return response.data
    })
    .catch(err => console.log(err))
    res.render('dashboard')
})

module.exports = router;