const pool = require('../utils/pool');

module.exports = class Post {
  id;
  text;
  username;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
    this.username = row.username;
  }

  static insert({ text, username }) {
    return pool.query(
      `
      INSERT INTO
        posts (text, username)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [text, username]
    ).then(({ rows }) => new Post(rows[0]));

    
  }
};
