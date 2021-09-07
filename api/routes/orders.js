const express = require('express');
const Orders = require('../models/Orders');
const { isAuthenticated, hasRoles } = require('../auth/index')
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

//Consultar all Orders
router.get('/', (req, res) => {
    Orders.find()
        .exec()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
})

//Query for get Orders by ID
router.get('/:id', (req, res) => {
    Orders.findById(req.params.id)
        .exec()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
})

router.post('/', isAuthenticated, (req, res) => {
    Orders.create(req.body)
        .then(result => res.status(201).send(result))
        .catch(err => console.log(err))
})

router.put('/:id',isAuthenticated, hasRoles(['admin', 'user']), (req, res) => {
    Orders.findOneAndUpdate(req.params.id, req.body)
        .then(() => res.status(204))
        .catch(err => console.log(err))
})

router.delete('/:',isAuthenticated, (req, res) => {
    Orders.findOneAndDelete(req.params.id)
        .then(() => res.status(204))
        .catch(err => console.log(err))
})

module.exports = router