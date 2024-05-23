'use strict';
const fs = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/tickets.json','utf8'))
    data = data.map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Tickets', data)
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Tickets',data)
  }
};
