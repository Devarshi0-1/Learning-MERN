import http from 'http';
import { randomData as RandomData } from './random.js';

const port = 5000;
const server = http.createServer((req, res) => {
	if (req.url === '/') res.end(`<h1>This is Home Page</h1>`);
	else if (req.url === '/learn')
		res.end(
			`<button><a href="https://youtu.be/cGAdC4A5fF4?t=3157" target="_blank">Learn Backend</a></button>`
		);
	else res.end(`<h1>${RandomData.time}</h1>`);
});

server.listen(`${port}`, () => {
	console.log('Server is working');
	console.log(`Click On:\nhttp://localhost:${port}/`);
});