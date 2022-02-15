const database = require("./database");

exports.getItems = function () {
	return database.query("select * from ccca.item", []);
};
