'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      this.hasMany(models.TransactionTicket, { foreignKey: 'TicketId' });
    }
  }
  
  Ticket.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty"
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date cannot be empty"
        }
      }
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Place cannot be empty"
        }
      }
    },
    typeSeat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Type of seat cannot be empty"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock cannot be empty"
        },
        isInt: {
          msg: "Stock must be an integer"
        },
        min: {
          args: [0],
          msg: "Stock cannot be negative"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price cannot be empty"
        },
        isInt: {
          msg: "Price must be an integer"
        },
        min: {
          args: [0],
          msg: "Price cannot be negative"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  
  return Ticket;
};
