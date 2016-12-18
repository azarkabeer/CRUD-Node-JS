const express = require('express')
const bodyParser= require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')

const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb://localhost:27017/test',(err,database) => {

	if (err) return console.log(err)
    db = database
    
    app.listen(3000, () => {
    console.log('listening on 3000')
     })

})




// app.listen(3000,function() {
// console.log('listening on 3000')
// })


// app.get('/',function(req,res)
// {
// 	res.send('Hello from Node');
// })



app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => 
  {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})



app.post('/search', (req, res) => {
	console.log(req.body);
  db.collection('quotes').find(req.body).toArray((err, result) => 
  {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.get('/log',(req,res) => {
	var cursor = db.collection('quotes').find().toArray(function(err,results){
		console.log(results)

	})
})

// app.post('/quotes', function (req,res)
// {
// 	res.send("posted");
// 	 console.log(req.body)

// })


app.post('/quotes',(req,res) => {
	db.collection('quotes').save(req.body,(err,result) =>
	{
		if (err) return console.log(err)

		console.log('saved to database')
	    console.log(req.body)
	    res.redirect('/')

	})
})