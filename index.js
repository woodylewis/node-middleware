const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')();
const bodyParser = require('body-parser');

let dataMap = [];
let dataReduce;
let counter = 0;

const proc1 = (req, res, next) => {
	dataMap.push(++counter);
	dataReduce = dataMap.reduce((sum, value) => {
		return sum + value;
	}); 
	console.log(dataReduce);
	next();
/*
	Object.getOwnPropertyNames(set)
	.forEach((key, element) => {
		console.log(key + ' ' + set[key]);
	});

	let keys = Object.keys(set);
	keys.forEach((key,val) => {
		console.log(key + ' => ' + set[key]);
	});

	console.log('proc1');
*/
};

const proc2 = (req, res, next) => {
	console.log('proc2');
	res.json({ message: dataReduce });
};
	
router
.route('/')
.get([ proc1, proc2], (req, res, next) => {
 	console.log('Start');
})
.post((req, res, next) => {
	console.log('post ', req.body);
	res.json({ message: 'received' });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);
app.use('/', router);
app.listen(3100, () => {
	console.log('Running');
});
