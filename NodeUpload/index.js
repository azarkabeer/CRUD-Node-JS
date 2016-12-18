//This utility will help us to upload excel file and save the data into Mongo DB
var express = require('express');
var bodyParser= require('body-parser');
var router = express.Router();
const multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express()
var mongoXlsx = require('mongo-xlsx');
var fileUpload = require('express-fileupload');
var fs = require('fs')
var connect = require('connect')
var MongoClient = require('mongodb').MongoClient


app.use(fileUpload());

//Declaring variables
var model = null;
var url = 'mongodb://localhost:27017/test';




//Connecting to MongoDB Database - TEST
MongoClient.connect(url,(err,database) => {

	if (err) return console.log(err)
    db = database
    var d = new Date();
    
    app.listen(3000, () => {
    console.log('listening on 3000')

    console.log('The node got restarted at TIME' ,(d.getHours()),':',d.getMinutes());
     })

})


//Function to handle get method
app.get('/',function(req,res){
	res.sendFile('/Users/azar/Documents/NodeUpload/FileUpload.html')
})


// app.post('/upload', upload.single('excel'), function (req, res, next) {
//   // req.file is the `avatar` file 
//   // req.body will hold the text fields, if there were any 
 

// 			console.log('File Upload done')
// 			//res.send("Uploaded")
// 			res.send(req.body.excel)
// 			res.redirect('/');
		

// })

app.post('/upload', function(req, res) {
    var excelFile;
 
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    var uploadedFileName = req.files.excel.name;
    console.log(uploadedFileName);
    var collectionName = uploadedFileName.substring(0, uploadedFileName.length - 5);
    excelFile = req.files.excel;
    var targetFilename = 'uploads/' + uploadedFileName;
    console.log(targetFilename)
    excelFile.mv(targetFilename, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {

        	       mongoXlsx.xlsx2MongoData(uploadedFileName,model,function(err,data)
			       {
					   console.log(data);
					   db.collection(collectionName).remove({});
					   db.collection(collectionName).insert(data,(err,result) =>
					   {
							if (err) return console.log(err)

							console.log('saved to database')
					   })
    				
			        })

            res.send('File uploaded!');
        }
    });
});
 



