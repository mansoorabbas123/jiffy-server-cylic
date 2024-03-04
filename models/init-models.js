var DataTypes = require("sequelize").DataTypes;
var _sequelizeMetum = require("./sequelizeMetum");
var _category = require("./category");
var _image = require("./image");
var _product = require("./product");
var _userToken = require("./userToken");
var _user = require("./user");

function initModels(sequelize) {
  var sequelizeMetum = _sequelizeMetum(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var image = _image(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var userToken = _userToken(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  image.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasOne(image, { as: "image", foreignKey: "category_id"});
  product.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(product, { as: "products", foreignKey: "category_id"});
  userToken.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(userToken, { as: "user_tokens", foreignKey: "user_id"});

  return {
    sequelizeMetum,
    category,
    image,
    product,
    userToken,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
