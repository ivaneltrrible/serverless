const express = require('express');
const Meals = require('../models/Meals');
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

//Consultar all meals
router.get('/', (req, res) => {
    Meals.find()
        .exec()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
})

//Query for get meals by ID
router.get('/:id', (req, res) => {
    Meals.findById(req.params.id)
        .exec()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
})

router.post('/', (req, res) => {
    Meals.create(req.body)
        .then(result => res.status(201).send(result))
        .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
    Meals.findOneAndUpdate(req.params.id, req.body)
        .then(() => res.status(204))
        .catch(err => console.log(err))
})

router.delete('/:', (req, res) => {
    Meals.findOneAndDelete(req.params.id)
        .then(() => res.status(204))
        .catch(err => console.log(err))
})

module.exports = router;