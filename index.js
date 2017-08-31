const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')();
const bodyParser = require('body-parser');

let dataMap = [];
let dataReduce;
let displayStr = "";

const proc1 = (req, res, next) => {
	console.log('proc1 - req ', req.body);
	dataMap.push(req.body.model.value1);
	dataReduce = dataMap.reduce((sum, value) => {
		return sum + value;
	}); 
	displayStr += ':' + req.body.model.value2;
	console.log('proc 1 - dataReduce ' + dataReduce);
	console.log('displayStr ', displayStr );
	next();
};

const proc2 = (req, res, next) => {
	res.json({ sum: dataReduce, set: dataMap, display: displayStr });
};
	
router
.route('/')
.get([ proc1, proc2], (req, res, next) => {})
.post([ proc1, proc2],(req, res, next) => {});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);
app.use('/', router);
app.listen(3100, () => {
	console.log('Running');
});