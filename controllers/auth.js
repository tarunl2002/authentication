const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('.././models/Auth')

exports.signup = async (req, res, next) => {
    const { username, password, email, role } = req.body;
    try {
        if (password.length < 8) {
            return res.status(400).json({
                message: 'falied'
            });
        }
        const hash = await bcrypt.hash(password, 10);
        const saved = await new Auth({ password: hash, username, email, role }).save();
        return res.status(200).json({
            message: 'registered',
            data: {
                username: saved.username,
                email: saved.email,
                role: saved.role
            }
        });
    } catch (err) {
        next(err);
    }
}


exports.login =  async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await Auth.findOne({ username });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({
                    username: user.username,
                    role: user.role
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.cookie('auth', token, {
                    httpOnly: true,
                    maxAge: 10*1000
                }).status(200).json('Login Successful');
            }
        }
        return res.status(401).json('Cannot Login');
    } catch (err) {
        next(err);
    }
}