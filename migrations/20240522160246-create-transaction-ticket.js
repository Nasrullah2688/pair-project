'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionTickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TicketId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Tickets"
        },
        key:'id',
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      TransactionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Transactions"
        },
        key:'id',
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TransactionTickets');
  }
};