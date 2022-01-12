let bodyParser = require('body-parser');
let mongooose = require('mongoose');

//Connect to database
mongooose.connect('mongodb://<login>:<password>cluster0.6ruxv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//Create a schema - this is like a blueprint
let todoSchema = new mongooose.Schema({
    item: String
});
let Todo = mongooose.model('Todo', todoSchema);
let itemOne = Todo({item: 'buy flowers'}).save((err) => {
    if (err) throw err;
    console.log('item saved');
});

let data = [{item: 'get milk'}, {item: 'get bread'}, {item: 'walk dog'}];
let urlencodeParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
    app.get('/todo', (req, res) => {
        res.render('todo', {todos: data});
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