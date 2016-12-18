var expect = require("chai").expect;
var tools = require("../lib/tools")


describe("Tools",function(){


describe("printName()",function(){
	it("should last name first and firstname last",function(){

	var results = tools.printName({firstname:"Azar",last:"Kabeer"});
	expect(results).to.equal("Kabeer,Azar");
});
});

describe("loadWiki()",function(){

	it("should load wiki page of George Washinton",function(done){

		tools.loadWiki({ first: "George" , last: "Washinton"},function(html){

			expect(html).to.be.ok;
			done();

			});
	});
	

});

});
