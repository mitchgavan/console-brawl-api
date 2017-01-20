const checkAuthorized = require('../auth/auth')

module.exports = function(controller, router) {
  router.param('id', controller.params);

  router.route('/')
    .get(checkAuthorized(), controller.get)
    .post(checkAuthorized(), controller.post)

  router.route('/:id')
    .get(checkAuthorized(), controller.getOne)
    .put(checkAuthorized(), controller.put)
    .delete(checkAuthorized(), controller.delete)
};
