const db = require('../db.js')
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator')
require('dotenv').config()

const generateAccessToken = (id, token, accessLvl, role) => {
    const payload = {
        id,
        token,
        accessLvl,
        role,
    }
    return jwt.sign(payload, process.env.JWT_SIGN, {expiresIn: "168h"} )
}

class authController {
    // async registration(req, res) {
    //     try {
    //         const errors = validationResult(req)
    //         if (!errors.isEmpty()) {
    //             return res.status(400).json({message: "Ошибка при регистрации", errors})
    //         }

    //         const {email, password, phone} = req.body;
    //         const {rows: [existingEmail, ...anyExistingEmail]} = await db.query('SELECT * FROM auth.users WHERE Email = $1', [email])
    //         if (existingEmail) {
    //             return res.status(400).json({message: "Пользователь с таким почтовым адресом уже существует"})
    //         }

    //         const hashPassword = bcrypt.hashSync(password, 7);
    //         const {rows: [user]} = await db.query('INSERT INTO auth.users (email, password, phone) values ($1, $2, $3) RETURNING *', [email, hashPassword, phone])
    //         const token = generateAccessToken(user.id, user.email, user.role, user.phone)
    //         return res.json({token})
    //     } catch (e) {
    //         console.log(e)
    //         res.status(400).json({message: 'Registration error'})
    //     }
    // }

    async login(req, res) {
        try {
            const {authToken} = req.body
            const {rows: [user, ...anyusers]} = await db.query('SELECT * FROM auth.users WHERE token = $1', [authToken])
            if (!user) {
                return res.status(400).json({message: `Access denied`})
            }
            // const validPassword = bcrypt.compareSync(password, user.password)
            // if (!validPassword) {
            //     return res.status(400).json({message: `Введен неверный пароль`})
            // }
            const token = generateAccessToken(user.id, user.token, user.accesslvl, user.role)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new authController()