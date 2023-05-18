import { db } from "../Database/database.js"

export async function myUrls(req, res) {
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

export async function ranking(req, res) {
    try {

        const datasUsers = await db.query(`
        SELECT users.id,  users.name,
        COUNT(urls.url) AS "linksCount", SUM(urls."visitCount") AS "visitCount"
        FROM urls JOIN users ON users.id=urls."userId"
        GROUP BY users.id 
        ORDER BY "visitCount" DESC
        LIMIT 10 
        ;`)

        res.send(datasUsers.rows)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

