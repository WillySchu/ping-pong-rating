module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ping-pong-ratings'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
