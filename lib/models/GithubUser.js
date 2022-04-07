const pool = require('../utils/pool');

module.exports = class GithubUser {
  username;
  photoUrl;
  
  constructor(row) {
    this.username = row.github_username;
    this.photoUrl = row.photo_url;
  }

  static insert({ username, photoUrl }) {
    if (!username) throw new Error('Username is required');
    return pool.query(
      `
        INSERT INTO
          users (github_username, photo_url)
        VALUES
          ($1, $2)
        RETURNING
          *
      `,
      [username, photoUrl]
    )
      .then(({ rows }) => new GithubUser(rows[0]));
    
  }

  static findByUsername(username) {
    return pool.query(
      `
      SELECT 
        *
      FROM 
        users
      WHERE 
        github_username=$1
      `,
      [username]
    )
      .then(({ rows }) => { if(!rows[0]) return null;
      else {
        return new GithubUser(rows[0]);
      } });
      

    

    
  }

  toJSON() {
    return { ...this };
  }

  static findByUsernamePosts(username) {
    return pool.query(
      `
      SELECT
        username,
        posts.text as posts
      FROM
        users
      INNER JOIN
        posts
      ON
        users.github_username = posts.username
      WHERE
        username=$1
      GROUP BY
        username
        `,
      [username]
    )
      .then(({ rows }) => rows[0]);
  }

};
