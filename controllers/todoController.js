let bodyParser = require('body-parser');
let mongooose = require('mongoose');

let fs = require('fs');
let login = fs.readFileSync('loginDb.txt', 'utf8').split(':');

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
        data.push(req.body);
        res.json({todos:data});
    });
    app.delete('/todo/:item', (req, res) => {
        data = data.filter((todo) => {
            return todo.item.replace(' ', '-') !== req.params.item;
        });
        res.json(data);
    });
}