export default {
  Query: {
    users: (parent, args, { db }, info) => db.User.findAll(),
    user: (parent, { id }, { db }, info) => db.User.findByPk(id),
  },
}
