var DataTypes = require("sequelize").DataTypes;
var _sequelizeMetum = require("./sequelizeMetum");
var _category = require("./category");
var _image = require("./image");
var _userToken = require("./userToken");
var _user = require("./user");

function initModels(sequelize) {
  var sequelizeMetum = _sequelizeMetum(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var image = _image(sequelize, DataTypes);
  var userToken = _userToken(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  image.belongsTo(category, { as: "category", foreignKey: "categoryId"});
  category.hasOne(image, { as: "image", foreignKey: "categoryId"});
  userToken.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(userToken, { as: "user_tokens", foreignKey: "user_id"});

  return {
    sequelizeMetum,
    category,
    image,
    userToken,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
