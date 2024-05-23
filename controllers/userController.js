const { Userrr } = require('../models/index')

class userController{
    static async loginForm(req, res){
        try {
            res.render('auth-pages/login-form')
        } catch (error) {
            res.send(error)
        }
    }
    
    static async registerForm(req, res){
        try {
            res.render('auth-pages/register-form')
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res){
        try {
            const { username, password, role } = req.body
            const newUserrr = await Userrr.create({ username, password, role })
            res.redirect('/login')
        } catch (error) {
            res.send(error);
        }
        
    }
}



module.exports = userController