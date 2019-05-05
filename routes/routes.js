const router = require('express').Router();
const Todo = require('../models/todo');

router.get('/', (req, res) => {
    Todo.find({}).then(results => {
        let todos = results.filter(todo => {
            return !todo.done;
        });

        let doneTodos = results.filter(todo => {
            return todo.done;
        })

        res.render('index', {todos: todos, doneTodos: doneTodos});
    })
});

router.post('/todos', (req, res) => {
    let newTodo = new Todo({description: req.body.description});

    newTodo
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
});

router.post('/todos/:id/completed', (req, res) => {
    let todoId = req.params.id;

    Todo.findById(todoId)
        .exec()
        .then(result => {
            result.done = !result.done;
            return result.save();
        }).then(result => {
            res.redirect('/');
        });
});

module.exports = router;