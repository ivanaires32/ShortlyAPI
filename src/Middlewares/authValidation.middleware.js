export async function authValidation(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) return res.sendStatus(401)

    try {

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }

}