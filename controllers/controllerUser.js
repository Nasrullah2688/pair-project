const PDFDocument = require('pdfkit');
const fs = require('fs');
const { Ticket, Transaction, TransactionTicket, UserProfile } = require('../models');
const {Op} = require('sequelize')
const formatRupiah = require('../helper/format')

class ControllerUser {

    static async showUserProfile(req, res) {
        try {
            const { id } = req.params;
            const userProfile = await UserProfile.findOne({ where: { id }, include: ['User'] });


            res.render('users/showUserProfile', { userProfile });
        } catch (error) {
            res.send(error);
        }
    }


    static async home(req, res) {
        try {
            let deta;
            let { role } = req.query;
    
            if (role) {
                deta = await Ticket.getByTypeSeat(role);
            } else {
                deta = await Ticket.findAll();
            }
    
            const { search } = req.query;
            if (search) {
                deta = await Ticket.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                });
            }
    
            const userId = req.session.user.id;
            const userProfile = await UserProfile.findOne({ where: { UserId: userId } });
    
            res.render('users/home', { deta, userProfile });
        } catch (error) {
            res.send(error);
        }
    }


    static async detailTicket(req, res) {
        try {
            const { id } = req.params
            let data = await Ticket.findByPk(id)
            res.render('users/detailTickets', { data, formatRupiah })
        } catch (error) {
            res.send(error)
        }
    }

    static async takeTicket(req, res) {
        try {
            const { id } = req.params;
            const { stock } = req.body;
            const ticket = await Ticket.findByPk(id);
            const totalPrice = ticket.price * stock; // Calculate total price
    
            // Access the current user's ID from the session
            const userId = req.session.user.id;
    
            const transaction = await Transaction.sequelize.transaction(); // Start a transaction
    
            try {
                const newTransaction = await Transaction.create({
                    name: ticket.name,
                    stock,
                    date: new Date(),
                    priceTotal: totalPrice,
                    UserId: userId // Associate the current user's ID with the transaction
                }, { transaction });
    
                await TransactionTicket.create({
                    TicketId: ticket.id,
                    TransactionId: newTransaction.id
                }, { transaction });
    
                await Ticket.update({
                    stock: Ticket.sequelize.literal(`stock - ${stock}`)
                }, {
                    where: { id: ticket.id },
                    transaction
                });
    
                await transaction.commit();
                res.redirect('/');
            } catch (error) {
                await transaction.rollback(); // Rollback the transaction if an error occurs
                res.send(error);
            }
        } catch (error) {
            res.send(error);
        }
    }
    

    static async allTransactions(req, res) {
        try {
            const transactions = await Transaction.findAll({
                include: [TransactionTicket]
            })

            let totalAmount = 0
            transactions.forEach(transaction => {
                totalAmount += transaction.discountedPriceTotal
            })

            res.render('users/allTransactions', { transactions, totalAmount, formatRupiah})
        } catch (error) {
            res.send(error)
        }
    }
    
    static async beliDanBuatInvoice(req, res) {//ini yang ada nested include untuk cetak invoice
        try {
            const transactions = await Transaction.findAll({
                include: [
                    {
                        model: TransactionTicket,
                        include: [
                            { model: Ticket }
                        ]
                    }
                ]
            })
    
            const doc = new PDFDocument({ size: [4 * 72, 6 * 72] });
            const filePath = 'invoice_pembelian.pdf'
            const fileStream = fs.createWriteStream(filePath)
    
            doc.pipe(fileStream)
    
            fileStream.on('finish', () => {
                res.download(filePath, (err) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('Gagal Mengunduh File')
                    } else {
                        fs.unlinkSync(filePath);
                    }
                })
            })
    
            let totalAmount = 0
    
            transactions.forEach(async (transaction) => {
                const tickets = transaction.TransactionTickets.map(tt => tt.Ticket)
                totalAmount += transaction.discountedPriceTotal
    
                for (let i = 0; i < transaction.stock; i++) {
                    doc.addPage()
                        .font('Helvetica-Bold').fontSize(24).text('Invoice', { align: 'center' });
                    doc.moveDown();
                    doc.font('Helvetica').fontSize(12).text(`Nomor Invoice: ${Math.floor(100000 + Math.random() * 900000)}`, { align: 'left' });
                    doc.moveDown();
                    doc.font('Helvetica').fontSize(12).text(`Tanggal: ${new Date(transaction.createdAt).toLocaleDateString()}`, { align: 'left' });
                    doc.moveDown();
                    doc.font('Helvetica').fontSize(12).text(`Tempat: ${tickets[0].place}`, { align: 'left' });
                    doc.moveDown();
                    doc.font('Helvetica').fontSize(12).text(`Nama Pertandingan: ${transaction.name}`, { align: 'left' });
                    doc.moveDown();
            
                }
    
                await Transaction.destroy({
                    where: { id: transaction.id }
                })
            })
    
            doc.addPage().font('Helvetica-Bold').fontSize(14).text('Total Pembayaran', { align: 'center' });
            doc.moveDown();
            doc.font('Helvetica').fontSize(12).text(`Total: ${formatRupiah(totalAmount)}`, { align: 'left' });
    
            doc.end();
        } catch (error) {
            res.send(error)
        }
    }
    
}

module.exports = ControllerUser;
