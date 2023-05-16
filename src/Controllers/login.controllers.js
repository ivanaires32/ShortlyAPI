import { db } from "../Database/database.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password } = req.body

    try {

        const hash = bcrypt.hashSync(password, 10)

        await db.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        `, [name, email, hash])

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function signIn(req, res) {

    try {
        const token = uuid()
        res.status(200).send({ token: token })

    } catch (err) {
        res.status(500).send(err.message)
    }
}