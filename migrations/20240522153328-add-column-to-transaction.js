'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     */
    // await queryInterface.addColumn("Transactions", "UserId",{
    //   type: Sequelize.INTEGER,
    //   references:{
    //     model:"Users"
    //   },
    //   key:'id',
    //   onDelete:'cascade',
    //   onUpdate:'cascade'
    // })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeColumn('Transactions', 'UserId')
  }
};
