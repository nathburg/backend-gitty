const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  email;
  login;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.login = row.login;
  }
  static async insert({ login, email }) {
    if (!login) throw new Error('login is required');

    const { rows } = await pool.query(
      `
          INSERT INTO github_users (login, email)
          VALUES ($1, $2)
          RETURNING *
        `,
      [login, email]
    );

    return new GithubUser(rows[0]);
  }
  static async findByLogin(login) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM github_users
      WHERE login=$1
      `,
      [login]
    );

    if (!rows[0]) return null;

    return new GithubUser(rows[0]);
  }
};
