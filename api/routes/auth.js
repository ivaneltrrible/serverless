import { Router } from 'express';
import { randomBytes, pbkdf2 } from 'crypto';
import { sign } from 'jsonwebtoken';
import { findOne, create } from '../models/Users';
import { isAuthenticated } from '../auth/index';
//const app = express();

/*app.route('/')
    .get((req, res) => {
        res.send({ get: 'Desde get' })
    })
    .post((req, res) => {
        res.send({ post: 'Desde post' })
    })
*/

const router = Router();

const signToken = (_id) => {
    return sign({ _id }, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365,
    })
}

router.post('/register', (req, res) => {
    const { email, password } = req.body
    findOne({ email }).exec()
            .then( user => {
                if(user){
                    res.send(`El email: ${email} que ingresaste ya esta registrado`)
                }
                randomBytes(16, (err, buferSalt) => {
                    const salt = buferSalt.toString('base64')
                    if (err) throw err;
                    pbkdf2(password, salt, 10000, 64, 'sha1', (err, key) => {
                        if (err) throw err;
                        const encryptedPassword = key.toString('base64');
                        create({ 
                            email: email, 
                            password: encryptedPassword,
                            salt: salt
                        })
                        .then(() => res.send(`Usuario creado con exito ${email}`))
                    })
                })
                
            })
    
})
router.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email })
        .then( user => {
            if(!user){
                return res.send('Usuario y/o contraseña incorrecta')
            }
            pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                if(err) throw err
                const encryptedPassword = key.toString('base64')
                if(encryptedPassword === user.password){
                    const token = signToken(user._id)
                    return res.send({ token })
                }
                return res.send('Usuario y/o contraseña incorrecta')
            })
        })
})

router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user)  
})

module.exports = router;