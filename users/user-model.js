const db = require('../data/db-config.js');

module.exports = {
  allUsers,
  findById,
  addUser,
  findUserPosts
}

function findUserPosts(userId) {
  return db('posts as p')
  .select('p.id', 'p.contents as Quote', 'u.username as Author')
  .join('users as u', 'p.user_id', '=', 'u.id')
  .where({ user_id: userId })
  // or
  // .where('user_id', '=',  userId)
}

function allUsers() {
  return db('users');
}

function findById(id) {
  return db('users').where({ id }).first();
}

function addUser(data) {
  return db('users').insert(data, 'id').then(ids => {
    const [ id ] = ids;

    return findById(id)
  })
}