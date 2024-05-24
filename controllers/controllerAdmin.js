const { Ticket, User } = require('../models');
const bcrypt = require('bcryptjs');

class ControllerAdmin {
    static async loginPage(req, res) {
        try {
            res.render("admin/loginPage");
        } catch (error) {
            res.send(error);
        }
    }

    static async signupPage(req, res) {
        try {
            res.render("admin/signupPage");
        } catch (error) {
            res.send(error);
        }
    }

    static async validateAccount(req, res) {
        try {
            const { name, email, password, role } = req.body;
    
            if (name) { // Registration
                if (role === "admin" || role === "buyer") {
                    await User.create({ name, email, password, role });
                    res.redirect(role === "admin" ? `/admin/tickets` : `/`);
                }
            } else { // Login
                const user = await User.findOne({ where: { email } });
                if (user) {
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (isPasswordValid) {
                        req.session.user = { id: user.id, role: user.role };
                        res.redirect(user.role === "admin" ? `/admin/tickets` : `/`);
                    } else {
                        throw new Error("Invalid credentials");
                    }
                } else {
                    throw new Error("Invalid credentials");
                }
            }
        } catch (err) {
            console.error(err);
            res.send("Invalid credentials");
        }
    }
    

    static async adminHome(req, res) {
        try {
            const {name} = req.query
            const data = await Ticket.findAll();
            res.render('admin/adminHome', { data ,name});
        } catch (error) {
            res.send(error);
        }
    }

    static async addTicketForm(req, res) {
        try {
            let {errors}=req.query
            res.render('admin/addTicket',{errors});
        } catch (error) {
            res.send(error);
        }
    }

    static async addTicket(req, res) {
        try {
            const { name, date, place, typeSeat, stock, price } = req.body;
            await Ticket.create({ name, date, place, typeSeat, stock, price });
            res.redirect('/admin/tickets');
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errors = error.errors.map(err => err.message)
                res.redirect(`/admin/tickets/add?errors=${errors}`)
            } else {
                res.send(error)
            }
        }
    }
    

    static async editTicketForm(req, res) {
        try {
            const { id } = req.params;
            const {errors} = req.query
            const ticket = await Ticket.findByPk(id);
            res.render('admin/editTicket', { ticket ,errors});
        } catch (error) {
            res.send(error);
        }
    }

    static async editTicket(req, res) {
        const { id } = req.params;
        try {
            const { name, date, place, typeSeat, stock, price } = req.body;
            await Ticket.update({ name, date, place, typeSeat, stock, price }, { where: { id } });
            res.redirect('/admin/tickets');
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errors = error.errors.map(err => err.message)
                res.redirect(`/admin/tickets/${id}/edit?errors=${errors}`)
            } else {
                res.send(error)
            }
        }
    }

    static async deleteTicket(req, res) {
        try {
            const { id } = req.params;
            const ticket = await Ticket.findByPk(id)
            let name = `${ticket.name}`
            await Ticket.destroy({ where: { id } });
            res.redirect(`/admin/tickets?name=${name}`);
        } catch (error) {
            res.send(error);
        }
    }

    static async logout(req, res) {
        try {
            await req.session.destroy();
            res.redirect('/login');
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = ControllerAdmin;
