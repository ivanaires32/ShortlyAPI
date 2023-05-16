import bcrypt from "bcrypt"
import { db } from "../Database/database.js"


export async function validateSignUp(req, res, next) {
    const { email, password, confirmPassword } = req.body
    try {
        const userRepeated = await db.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])

        if (userRepeated.rowCount !== 0) return res.status(409).send("Email já cadastrado")

        if (password !== confirmPassword) return res.status(422).send("Confirmação de senha incorreta")

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function validateSignIn(req, res, next) {
    const { email, password } = req.body
    try {
        const user = await db.query(`
            SELECT * FROM users WHERE email=$1
        `, [email])

        if (user.rowCount === 0) return res.status(401).send("Email não encontrado")

        const passwordUser = bcrypt.compareSync(password, user.rows[0].password)
        if (!passwordUser) return res.status(401).send("Senha incorreta")

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }
}