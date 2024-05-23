const { Ticket } = require('../models');

class ControllerAdmin {
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
