const { Model } = require('sequelize');
const { Ticket, Transaction } = require('./'); // Pastikan ini sesuai dengan struktur direktori Anda

module.exports = (sequelize, DataTypes) => {
    class TransactionTicket extends Model {
        static associate(models) {
            // Definisikan asosiasi di sini jika ada
            this.belongsTo(models.Ticket, { foreignKey: 'TicketId' });

            // Asosiasi antara TransactionTicket dan Transaction
            this.belongsTo(models.Transaction, { foreignKey: 'TransactionId' });
        }
    }

    TransactionTicket.init({
        TicketId: DataTypes.INTEGER,
        TransactionId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'TransactionTicket',
    });

    return TransactionTicket;
};
