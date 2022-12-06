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
    const posts = await pool.query('SELECT * FROM posts');
    return posts.rows;
  }
};
