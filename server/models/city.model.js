'user strict';
var dbConn = require('../config/db.config');
//city object create
var city = function (city) {
    this.fldName = city.fldName;
    this.fldLat = city.fldLat;
    this.fldLong = city.fldLong;
    this.fldCountry = city.fldCountry;
    this.fldAbbreviation = city.fldAbbreviation;
    this.fldCapitalStatus = city.fldCapitalStatus;
    this.fldPopulation = city.fldPopulation;
};
city.create = function (newCity, result) {
    dbConn.query("INSERT INTO tblCitiesImport set ?", newCity, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
city.findById = function (id, result) {
    dbConn.query("Select * from tblCitiesImport where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
city.findAll = function (result) {
    dbConn.query("Select * from tblCitiesImport", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('citys : ', res);
            result(null, res);
        }
    });
};
city.update = function (id, city, result) {
    dbConn.query("UPDATE tblCitiesImport SET fldName=?,fldLat=?,fldLong=?,fldCountry=?,fldAbbreviation=?,fldCapitalStatus=?,fldPopulation=? WHERE id = ?", [city.fldName, city.fldLat, city.fldLong, city.fldCountry, city.fldAbbreviation, city.fldCapitalStatus, city.fldPopulation, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
city.delete = function (id, result) {
    dbConn.query("DELETE FROM tblCitiesImport WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = city;