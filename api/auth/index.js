import { verify } from 'jsonwebtoken';
import { findOne } from '../models/Users'


module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
        return res.sendStatus(403)
    }
    verify(token, 'mi-secreto', (err, decoded) => {
        const { _id } = decoded
            findOne({ _id }).exec()
                .then( user => {
                    req.user = user
                    next()
                })
    })
}