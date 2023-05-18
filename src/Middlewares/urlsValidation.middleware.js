import { db } from "../Database/database.js"

export async function urlsValidation(req, res, next) {
    const { id } = req.params

    try {
        const url = await db.query(`
            SELECT * FROM urls
            WHERE id=$1
        ;`, [id])

        if (url.rowCount === 0) return res.sendStatus(404)

        res.locals.url = url.rows[0]

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function open(req, res, next) {
    const { shortUrl } = req.params

    try {
        const exist = await db.query(`
            SELECT * FROM urls
            WHERE "shortUrl"=$1
        ;`, [shortUrl])

        if (exist.rowCount === 0) return res.sendStatus(404)

        res.locals.shortExist = exist.rows[0]

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function delShortUrl(req, res, next) {
    const { userId } = res.locals.url
    const { id } = res.locals.session
    try {

        if (id !== userId) return res.sendStatus(401)

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }
}