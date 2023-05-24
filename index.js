import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

mongoose
	.connect('mongodb://127.0.0.1:27017', {
		dbName: 'learningBackend',
	})
	.then(() => console.log('Database connected'))
	.catch(() => console.log('There was an error connecting to the Database'));

const usersSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
});

const users = mongoose.model('users', usersSchema);

app.get('/', (req, res) => {
	res.status(200);
	res.render('form');
});

app.post('/', async (req, res) => {
	res.status(200);

	const { username, email, password } = req.body;

    console.clear();
	console.log(`Username: ${username}\nEmail: ${email}\nPassword: ${password}`);

	await users.create({ username, email, password });

	res.redirect('/success');
});

app.get('/success', (req, res) => {
	res.status(200);
	res.render('success');
});

app.get('/learn', (req, res) => {
	res.status(200);
	res.render('learn');
});

app.get('/add', async (req, res) => {
	await users.create({
		name: 'Devarshi',
		email: 'example@gmail.com',
		password: 'thisispassword',
	});
	res.send('Nice');
});

app.listen(`${port}`, () => {
	console.log(`Server is Working`);
	console.log(`http://localhost:${port}/`);
});

// https://youtu.be/cGAdC4A5fF4?t=7210