const pool = require('./pool');
const bcrypt = require('bcrypt');

function User() {};

User.prototype = {
  //find user by id or username
  find: function(user = null, callback) {
    if(user) {
      var field = Number.isInteger(user) ? 'id' : 'username';
    }

    let sql = `SELECT * FROM users WHERE ${field} = ?`;

    pool.query(sql, user, function(err, result) {
      if(err) throw err;
      if(result.length)
        callback(result[0]);
    });
  },

  create: function(body, callback) {
    let pwd = body.password;
    body.password = bcrypt.hashSync(pwd, 10);

    var bind = [];

    for(prop in body) {
      bind.push(prop);
    }

    let sql = `INSERT INTO users (username, fullname, password) VALUES (?,?,?)`
    
    pool.query(sql, bind, function(err, lastId) {
      if(err) throw err;
      callback(lastId);
    });
  },

  login: function(username, password, callback) {
    this.find(username, function(result) {
      if(result) {
        if(bcrypt.compareSync(password, result.password)) {
          callback(result);
          return;
        }
      }
      callback(null);
    })
  }
};


module.exports = User;