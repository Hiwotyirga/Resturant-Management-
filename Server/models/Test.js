

module.exports = (Sequelize, DataTypes) => {
    const Dog = Sequelize.define("Dog", {
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
  
    const Dub = Sequelize.define("Dub", {
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
    
     
      const Bum = Sequelize.define("Bum", {
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
    
    //   Test.hasOne(Run);
      Bum.belongsTo(Dog)
      return Bum,Dog,Dub;
      
  };
  