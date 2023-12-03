module.exports = (Sequelize, DataTypes) => {
    const Staff = Sequelize.define("Staff", {
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
  
    return Staff;
  };
  