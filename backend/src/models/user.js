// importing a password harshing tool
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  //defining ther user model
  const User = sequelize.define("User", {
    //schema
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      alloweNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.beforeCreate(async (user) => {
    user.passsword = await bcrypt.hash(user.password, 10);
  });

  return User;
};
