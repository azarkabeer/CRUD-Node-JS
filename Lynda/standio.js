var questions = [
 "what is your name",
 "what is your emp number",
 "what is your title"
];

var answers = [];

function ask(i){
	process.stdout.write(`\n\n ${questions[i]} \n`);
	process.stdout.write(">");

}



ask(0);

process.stdin.on('data',function(data){
	process.stdout.write(data.toString().trim())
	answers.push(data.toString().trim());

	if(answers.length < questions.length)
	{
		ask(answers.length);
	}
	else
	{
		process.exit();
	}
});

process.on('exit',function(){

	process.stdout.write("\n\n");

	for(i=0;i<questions.length ;i++)
	{
		process.stdout.write(` \n ${questions[i]} `)
		process.stdout.write("\n Answer: ");
		process.stdout.write(`${answers[i]} `)
	}

});