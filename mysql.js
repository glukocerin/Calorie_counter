'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'test2',
  password  : 'test',
  database	: 'caloriecounter'
});

function addItem(attributes, cb) {
	connection.query('INSERT INTO calorie SET?', attributes, function (err, result) {
		if(err) throw err;
		return getItem(result.insertId, cb);
	});
}

function getAllItems(cb) {
	connection.query('SELECT id, name, calories, date FROM calorie', function(err, result) {
		if(err) throw err;
		return cb(result);
	});
}

function getItem(id, cb) {
	// console.log("req getItem id: " + id);
	connection.query('SELECT id, name, calories, date FROM calorie WHERE id=?', id, function (err, result) {
		if(err) throw err;
		// console.log('res getItem id: ' + result);
		return cb(result[0]);
	});
}

function removeItems(id, cb) {
	console.log(id);
	connection.query('DELETE FROM calorie WHERE id= ?', id, function(err, result) {
		if(err) throw err;
		console.log('ez jon vissza: ' + result);
		return cb({'id': id});
	});

}

module.exports = {
	add 	: addItem,
	get 	: getItem,
	getAll 	: getAllItems,
	remove 	: removeItems 
	}