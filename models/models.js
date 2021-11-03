const Sequelize = require('sequelize');

const restaurantModel = {
    name: {
      type: Sequelize.STRING, // TEXT in sqlite
      allowNull: false,
      validate: {
        notEmpty: {
            msg: "Please enter a valid Restaurant name"
        },
      }
    },
    imagelink: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
            msg: "Please enter a valid Restaurant name"
        },
      }
    },
  };

const menuModel = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "Please enter a valid Restaurant name"
      },
      isAlpha: {
          msg: "Please only input letters"
      }
    }
  },
};

const menuItemModel = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "Please enter a valid Restaurant name"
      },
      isAlpha: {
          msg: "Please only input letters"
      }
    }
  },
  price: {
    type: Sequelize.FLOAT, 
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "Please enter a valid Restaurant name"
      },
      isNumeric: {
          msg: "Please only input numbers"
      }
    }
  },
};

module.exports = { restaurantModel, menuModel, menuItemModel };