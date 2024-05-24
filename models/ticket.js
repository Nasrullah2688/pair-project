'use strict';
const { Model,Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      this.hasMany(models.TransactionTicket, { foreignKey: 'TicketId' });
    }

    static getByTypeSeat(role) {
      let options = {
        where: {}
      };
    
      if (role && role !== "all") {
        options.where.typeSeat = {
          [Op.eq]: role
        };
      }
    
      return Ticket.findAll(options);
    }
    
  }
  
  Ticket.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty"
        },
        notNull: {
          msg: "Name cannot be null"
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date cannot be empty"
        },
        notNull: {
          msg: "Date cannot be null"
        }
      }
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Place cannot be empty"
        },
        notNull: {
          msg: "Place cannot be null"
        }
      }
    },
    typeSeat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Type of seat cannot be empty"
        },
        notNull: {
          msg: "Type of seat cannot be null"
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
        notNull: {
          msg: "Stock cannot be null"
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
        notNull: {
          msg: "Price cannot be null"
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
