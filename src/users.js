// users.js
const pool = require('./db.js');


// db.none(`COPY questions FROM '/Users/Markus/Desktop/Hack_Reactor/SDC/Miriel/QnA/SourceData/questions.csv' CSV HEADER`)



async function getUsersOver(age) {
  const res = await pool.query(`
    SELECT
      name,
      age
    FROM users
    WHERE age > $1
  `, [age]);

  return res.rows;
}

async function insertUser({ name, age }) {
  const res = await pool.query(`
    INSERT INTO users
      (name, age)
    VALUES
      ($1, $2)
    RETURNING name, age
  `, [name, age]);

  return res.rows;
}

module.exports = {
  insertUser,
  getUsersOver
};
