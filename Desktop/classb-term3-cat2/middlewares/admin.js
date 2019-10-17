module.exports = function (req, res, next){
    if(!req.user.isAdmin) return res.send("Access Denied").status(403)
    next()
}