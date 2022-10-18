module.exports = (sequelize, Sequelize) => {
  const Advert = sequelize.define("advert", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Advert;
};