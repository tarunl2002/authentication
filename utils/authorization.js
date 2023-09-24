const roles = ['admin', 'member', 'user'];

const authorization = (role, user) => {
    return (req, res, next) => {
        console.log(role);
        if (!user) {
            return res.status(401).json('Cookies Not Found');
        }
        if (role!==roles[0]) {
            return res.status(403).json({
                message: 'forbidden'
            });
        }
        next();
    }
}

module.exports = authorization;