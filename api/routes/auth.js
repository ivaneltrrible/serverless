const express = require('express');
const crypto = require('crypto')
const Users = require('../models/Users');
//const app = express();

/*app.route('/')
    .get((req, res) => {
        res.send({ get: 'Desde get' })
    })
    .post((req, res) => {
        res.send({ post: 'Desde post' })
    })
*/

const router = express.Router();

router.post('/register', (req, res) => {
    const { email, password } = req.body
    crypto.randomBytes(16, (err, buferSalt) => {
        const salt = buferSalt.toString('base64')
        if (err) throw err;
        console.log(`Asi es en bufer: ${buferSalt} asi es el length ${salt.length} asi es en string: ${salt}`)
    })
})
router.post('/login', (req, res) => {
    res.send('Desde login')
})

module.exports = router;