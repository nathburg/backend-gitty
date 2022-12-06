const pool = require('../utils/pool');

module.exports = class Post {
  id;
  username;
  title;
  description;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.title = row.title;
    this.description = row.description;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows.map((row) => new Post(row));
  }

  static async insert({ username, title, description }) {
    const { rows } = await pool.query(
      `INSERT INTO posts (username, title, description)
    VALUES ($1, $2, $3)
    RETURNING *`,
      [username, title, description]
    );
    return new Post(rows[0]);
  }
};
