var Person = require("./lib/Person")

var ben = new Person("Ben");
var azar = new Person("AZar");

ben.on('speak',function(said)
{
	console.log(`${this.name} : ${said}`);
});

ben.emit('speak',"Hey hey");

azar.on('write',function(data)
{
	console.log(`${this.name} : ${data}`);
})

azar.emit('write',"Javascript");

