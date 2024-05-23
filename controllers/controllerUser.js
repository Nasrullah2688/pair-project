const PDFDocument = require('pdfkit');
const fs = require('fs');
const { Ticket, Transaction, TransactionTicket } = require('../models');

class ControllerUser {
    static async home(req, res) {
        try {
            let data = await Ticket.findAll()
            res.render('users/home', { data })
        } catch (error) {
            res.send(error)
        }
    }

    static async detailTicket(req, res) {
        try {
            const { id } = req.params
            let data = await Ticket.findByPk(id)
            res.render('users/detailTickets', { data })
        } catch (error) {
            res.send(error)
        }
    }

    static async takeTicket(req, res) {
        try {
            const { id } = req.params
            const { stock } = req.body
            const ticket = await Ticket.findByPk(id);
            const totalPrice = ticket.price * stock // Hitung total harga
            const transaction = await Transaction.sequelize.transaction() // Mulai transaksi dalam transaksi tertentu

            try {
                const newTransaction = await Transaction.create({
                    name: ticket.name,
                    stock,
                    date: new Date(),
                    priceTotal: totalPrice
                }, { transaction })

                await TransactionTicket.create({
                    TicketId: ticket.id,
                    TransactionId: newTransaction.id
                }, { transaction })

                await Ticket.update({
                    stock: Ticket.sequelize.literal(`stock - ${stock}`)
                }, {
                    where: { id: ticket.id },
                    transaction
                })

                await transaction.commit()
                res.redirect('/')
            } catch (error) {
                res.send(error)
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async allTransactions(req, res) {
        try {
            const transactions = await Transaction.findAll({
                include: [TransactionTicket]
            })

            let totalAmount = 0
            transactions.forEach(transaction => {
                totalAmount += transaction.priceTotal
            })

            res.render('users/allTransactions', { transactions, totalAmount })
        } catch (error) {
            res.send(error)
        }
    }
    
    static async beliDanBuatInvoice(req, res) {
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
                totalAmount += transaction.priceTotal
    
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
                    doc.font('Helvetica').fontSize(12).text(`Jumlah: ${transaction.priceTotal / transaction.stock}`, { align: 'left' });
                    doc.moveDown();
                }
    
                await Transaction.destroy({
                    where: { id: transaction.id }
                })
            })
    
            doc.addPage().font('Helvetica-Bold').fontSize(14).text('Total Pembayaran', { align: 'center' });
            doc.moveDown();
            doc.font('Helvetica').fontSize(12).text(`Total: ${totalAmount}`, { align: 'left' });
    
            doc.end();
        } catch (error) {
            res.send(error)
        }
    }
    
}

module.exports = ControllerUser;
