module.exports = (Sequelize, DataTypes, Op, Model) => {
  const Menu = Sequelize.define("Menu", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    Ingredients: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postrer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Menu;
};
