import { db } from "../Database/database.js"
import { nanoid } from 'nanoid'

export async function urlsShorten(req, res) {
    const { url } = req.body
    const { id } = res.locals.session
    try {

        const shortUrl = nanoid()

        await db.query(`
            INSERT INTO urls ("shortUrl", url, "userId")
            VALUES ($1, $2, $3)
        ;`, [shortUrl, url, id])

        await db.query(`
            INSERT INTO ranking ("userId")
            VALUES ($1)
        ;`, [id])

        const urlId = await db.query(`
            SELECT id FROM urls
            WHERE "shortUrl"=$1
        ;`, [shortUrl])

        res.status(201).send({ id: urlId.rows[0].id, shortUrl: shortUrl })

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function urlsId(req, res) {

    try {
        const { id, shortUrl, url } = res.locals.url

        res.status(200).send({ id, shortUrl, url })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function urlOpen(req, res) {
    const { shortUrl } = req.params

    try {

        let { visitCount } = res.locals.shortExist
        const { url } = res.locals.shortExist
        await db.query(`
            UPDATE urls SET "visitCount" = $1
            WHERE "shortUrl" = $2
        ;`, [visitCount += 1, shortUrl])

        res.status(200).redirect(url)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteUrl(req, res) {
    const { id } = res.locals.url

    try {
        await db.query(`
            DELETE FROM urls
            WHERE id=$1
        ;`, [id])

        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
}