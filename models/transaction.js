'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.TransactionTicket, { foreignKey: 'TransactionId' });
    }
    get discountedPriceTotal() {
      if (this.stock >= 5) {
        return Math.ceil(this.priceTotal * 0.95);
      }
      return this.priceTotal;
    }
  }
  Transaction.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    date: DataTypes.DATE,
    priceTotal: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};