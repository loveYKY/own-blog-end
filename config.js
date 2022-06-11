const config = {
  DEBUG: true,
  MYSQL: {
    host: 'localhost',
    database: 'blog',
    username: 'root',
    password: 'toor'
  }
}

// if (process.env.NODE_ENV === 'production') {
//   config.MYSQL = {
//     host: 'localhost',
//     database: 'blog',
//     username: 'root',
//     password: 'toor'
//   }
// }

module.exports = config