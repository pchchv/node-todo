let bodyParser = require('body-parser');
let mongooose = require('mongoose');

let fs = require('fs');
let login = fs.readFileSync('login.txt', 'utf8').split(':');

//Connect to database
mongooose.connect(`mongodb://${login[0]}:${login[1]}@cluster0.6ruxv.mongodb.net/todo`);

//Create a schema - this is like a blueprint
let todoSchema = new mongooose.Schema({
    item: String
});
let Todo = mongooose.model('Todo', todoSchema);

let urlencodeParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
    app.get('/todo', (req, res) => {
        //get data from db and pass it to view
        Todo.find({}, (err, data) => {
            if (err) console.log(err);
            res.render('todo', {todos: data});
        });
    });
    app.post('/todo', urlencodeParser, (req, res) => {
        //get data from the view and add it to db
        let newTodo = Todo(req.body).save((err, data) => {
            if (err) console.log(err);
            res.json(data);
        });
    });
    app.delete('/todo/:item', (req, res) => {
        data = data.filter((todo) => {
            return todo.item.replace(' ', '-') !== req.params.item;
        });
        res.json(data);
    });
}