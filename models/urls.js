const { connection } = require('../connection');

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS urls (
      id INT AUTO_INCREMENT PRIMARY KEY,
      shortId VARCHAR(255) NOT NULL UNIQUE,
      redirectUrl VARCHAR(255) NOT NULL,
      visitHistory JSON,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table: ', err);
    } else {
      console.log({"msg":'Table created successfully', result: result});
    }

    // Close the connection
    // connection.end();
  });

  module.exports = { connection, }