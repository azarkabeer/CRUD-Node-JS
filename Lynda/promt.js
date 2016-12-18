var readline = require("readline");
var rl = readline.createInterface(process.stdin,process.stdout);

var realPerson = {
	 name: '',
	 sayings: []
};

rl.question("What is the name of real person", function(answer){

	realPerson.name = answer;
	rl.setPrompt(`What would ${realPerson.name} say`);
	rl.prompt();

	rl.on('line',function(saying){

		if(saying.toLowerCase().trim() === 'exit')
		{
			rl.close();
		}
		else
		{

		rl.setPrompt(`What would ${realPerson.name} say again exit to leave`);
		rl.prompt();
		realPerson.sayings.push(saying);
        }
	});

});

rl.on('close',function(){
	console.log("%s is person saying %j",realPerson.name,realPerson.sayings)
})