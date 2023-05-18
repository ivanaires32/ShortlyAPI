export async function urlsUser(req, res, next) {
    const { id } = res.locals.session

    res.send(res.locals.session)
}