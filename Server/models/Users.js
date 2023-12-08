// C:\Users\Hiwi\Resturant-Management-\Server\models\Users.js
module.exports = (Sequelize, DataTypes) => {
  const Users = Sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Reservation,{
      onDelete:"cascade"
    });
  };

  return Users;
};
