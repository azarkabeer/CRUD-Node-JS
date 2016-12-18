var exec = require('child_process').exec;

exec("ls",function(err,stdout)
{
	if (err) console.log(err);
	else
		console.log("Listing finished");
		console.log(stdout);
});