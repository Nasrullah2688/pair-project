const { Ticket,User } = require('../models');

class ControllerAdmin {
    static async loginPage(req, res) {
        try {
            res.render("Admin/loginPage")
        } catch (error) {
            res.send(error)
            
        }
    }

    static async signupPage(req, res) {
        try {
            res.render("Admin/signupPage")
        } catch (error) {
            res.send(error)
        }
    }

    static async validateAccount(req, res) {
        try {
            const { name, email, password, role } = req.body;
    
            if (name) { // Jika ada nama, ini berarti proses pendaftaran
                if (role === "admin") {
                    const data = await User.create({
                        name: name,
                        email: email,
                        password: password,
                        role: role
                    });
                    res.redirect(`/admin/tickets`);
                } else if (role === "buyer") {
                    const data = await User.create({
                        name: name,
                        email: email,
                        password: password,
                        role: role
                    });
                    res.redirect(`/`);
                }
            } else { // Jika tidak ada nama, ini berarti proses login
                const data = await User.findOne({
                    where: { email, password }
                });
                if (data) {
                    if (data.role === "buyer" || data.role === "Buyer") {
                        res.redirect(`/`);
                    } else if (data.role === "admin" || data.role === "Admin") {
                        res.redirect(`/admin/tickets`);
                    }
                } else {
                    throw new Error("Hei anda penyusup! muhasabah diri anda!!! Data kamu berbeda dengan data kami!");
                }
            }
        } catch (err) {
            console.error(err);
            res.send("Hei anda penyusup! muhasabah diri anda!!! Data kamu berbeda dengan data kami!");
        }
    }

    static async adminHome(req, res) {
        try {
            const data = await Ticket.findAll()
            res.render('admin/adminHome', { data })
        } catch (error) {
            res.send(error)
        }
    }

    static async addTicketForm(req, res) {//ini unruk render
        try {
            res.render('admin/addTicket')
        } catch (error) {
            res.send(error)

        }
    }

    static async addTicket(req, res) {//ini untuk handler 
        try {
            const { name, date, place, typeSeat, stock, price } = req.body;
            const newTicket = await Ticket.create({
                name,
                date,
                place,
                typeSeat,
                stock,
                price
            });
            res.redirect('/admin/tickets');
        } catch (error) {
            res.send(error)

        }
    }

    static async editTicketForm(req, res) {//ini untuk rander
        try {
            const { id } = req.params
            const ticket = await Ticket.findByPk(id)
            res.render('admin/editTicket', { ticket })
        } catch (error) {
            res.send(error)

        }
    }

    static async editTicket(req, res) {//ini untuk handler
        try {
            const { id } = req.params
            const { name, date, place, typeSeat, stock, price } = req.body
            await Ticket.update({
                name,
                date,
                place,
                typeSeat,
                stock,
                price
            }, {
                where: { id }
            });
            res.redirect('/admin/tickets')
        } catch (error) {
            res.send(error)

        }
    }

    static async deleteTicket(req, res) {
        try {
            const { id } = req.params
            await Ticket.destroy({ where: { id } })
            res.redirect('/admin/tickets')// Mengarahkan kembali ke halaman admin
        } catch (error) {
            res.send(error)

        }
    }
    
}

module.exports = ControllerAdmin;
