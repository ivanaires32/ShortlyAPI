import { db } from "../Database/database.js"

export async function myData(req, res) {
    const { id, name } = res.locals.session
    try {

        const viewsTotal = await db.query(`
            SELECT SUM("visitCount") AS "visitCount"
            FROM urls 
            WHERE "userId"=$1
        ;`, [id])

        const urlsUser = await db.query(`
            SELECT id, "shortUrl", url, "visitCount"
            FROM urls
            WHERE "userId"=$1
        ;`, [id])

        const dataUser = {
            id,
            name,
            visitCount: viewsTotal.rows[0].visitCount,
            shortenedUrls: urlsUser.rows
        }
        res.status(200).send(dataUser)

    } catch (err) {
        res.status(500).send(err.message)
    }
}