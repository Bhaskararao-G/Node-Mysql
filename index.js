var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'assets')));

app.set('view engine', 'ejs');

var db = mysql.createConnection({
	host: 'localhost',
	user: 'admin',
	password: 'root',
	database: 'nodesql'
});

db.connect((err)=> {
	if (!err) {
		console.log('DB connection successful..!');
	} else {
		console.log("DB connection failed...", err);
	}
})

// Load home template
app.get('/', (req, res)=> {
	res.render('home');
});

// Get all todos
app.get('/get_todos', (req, res)=> {
	db.query("SELECT * FROM todos", (err, rows)=> {
		if (!err) {
			res.json({
				msg: 'success',
				data: rows
			});
		}
	});
});

// INSERT Todo
app.post('/insert', (req, res)=> {
	var sql = "INSERT INTO todos (name) VALUES ('"+ req.body.name +"')";
	db.query(sql, (err, rows)=> {
		if (!err) {
			db.query("SELECT * FROM todos", (err1, rows1)=> {
				res.json({
					msg: 'success',
					data: rows1
				});
			});
		}
	});
});

// INSERT Todo
app.post('/delete', (req, res)=> {
	var sql = "DELETE FROM todos WHERE id = "+ req.body.id +" ";
	db.query(sql, (err, rows)=> {
		if (!err) {
			db.query("SELECT * FROM todos", (err1, rows1)=> {
				res.json({
					msg: 'success',
					data: rows1
				});
			});
		}
	});
});

app.listen(8000);