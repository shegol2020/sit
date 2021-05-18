'use strict'

    module.exports = (app) => {
    const controller = require('../controllers/ControllerTodolist.js');

    // app.route('api/todolist')
    //     .get(controller.list)
    //     .post(controller.add);
    app.route('api/todolist/:eventId')
        .get(controller.read)
        // .put(controller.update)
        // .delete(controller.delete)
};