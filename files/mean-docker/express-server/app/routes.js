var Todo = require('./models/todo');
var Client = require('./models/client');


function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getClients(res) {
    Client.find(function (err, clients) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(clients); // return all todos in JSON format
    });
};
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            value: req.body.value,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'+'/public/index_2.html'); // load the single view file (angular will handle the page changes on the front-end)

    });
};
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/clients', function (req, res) {
        // use mongoose to get all todos in the database
        getClients(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/clients', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Client.create({
            client_id: req.body.client_id,
            password:req.body.password,
            client_name: req.body.client_name,
            interest_rateme: req.body.interest_rate,
            interest: req.body.interest,
            begin_date: req.body.begin_date,
            last_modify_time: req.body.last_modify_time,
            balance: req.body.balance,

            done: false
        }, function (err, client) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getClients(res);
        });

    });

    // delete a todo
    app.delete('/api/clients/:client_id', function (req, res) {
        Todo.remove({
            _id: req.params.client_id
        }, function (err, client) {
            if (err)
                res.send(err);

            getClients(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'+'/public/index_2.html'); // load the single view file (angular will handle the page changes on the front-end)

    });
};