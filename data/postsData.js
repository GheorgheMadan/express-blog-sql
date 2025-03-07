const mysql = require('mysql2');

const connetion = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'mySQL@Madan.com123',
    database: 'posts_db'
  }
);

connetion.connect((err) => {
  if (err) throw err;
  console.log('Connect to MySQL');

})

module.exports = connetion;