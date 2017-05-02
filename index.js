var express = require('express'),
	app = express(),
	router = express.Router(),
	bodyParser = require('body-parser')
  
var exchanges = [];

var exchangeIndex = 1;
var sc = [0,0,0,0]
var score = {
	   "A" : 0,
       "B" : 0,
       "C" : 0,
       "D" : 0,
       "num" : 0
           }


app.use(express.static('public')) 

router.route('/exchanges') 


	.get( function(req,res) {
		res.json(exchanges);
	})

	.post(function(req, res) { 


		if(req.body.eva === 'A') 
			score.A++;
		if(req.body.eva === 'B') 
			score.B++;
		if(req.body.eva === 'C') 
			score.C++;
		if(req.body.eva === 'D') 
			score.D++;
		score.num++;

	    var exchange = {}; 
	    exchange.id = exchangeIndex++
	    exchange.name = req.body.name
	    exchange.sid = req.body.sid
	    exchange.eva = req.body.eva
	    exchange.scores = score

	    exchanges.push(exchange); 

	    console.log(exchange.scores)

	    res.json({ message: 'Added a new exchange'} ) 
	})
  

app.use('/api', bodyParser.json(), router)
// app.use('/api',bodyParser.urlencoded({extended:false}), router)

app.listen(50012, function() {
	console.log('server is running...')
})
