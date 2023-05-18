import { db } from "../Database/database.js"
import { nanoid } from 'nanoid'

export async function urlsShorten(req, res) {
    const { url } = req.body
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    try {

        const shortUrl = nanoid()

        const user = await db.query(`
            SELECT * FROM users 
            WHERE token=$1;
        `, [token])

        await db.query(`
            INSERT INTO urls ("shortUrl", url, "userId")
            VALUES ($1, $2, $3)
        ;`, [shortUrl, url, user.rows[0].id])

        res.status(201).send({ id: user.rows[0].id, shortUrl: shortUrl })

    } catch (err) {
        res.status(500).send(err.message)
    }
}