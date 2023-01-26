var request = require("request");
var fs = require("fs");

// This is your API token
var TOKEN = "97bfaeed78c54401b403b783b17db92d"

// This method is going to be used to send all the requests
function make_request(method, url, data, files = {}, callback){
	var data = JSON.parse(JSON.stringify(data))
	for (var i of Object.keys(files))
		data[i] = fs.createReadStream(files[i])

	request({
		method: method,
        	url: url,
        	headers: {
                	'token': TOKEN
        	},
        	formData: data
	}, function (error, response, body) {
		if (error) throw new Error(error);

		if (callback != undefined)
			callback(JSON.parse(body))
	});
}

	
console.log("Creating person for Brad Pitt")
make_request("POST", "https://api.luxand.cloud/subject", {name: "Brad Pitt"}, {}, function(response){

	// You can also upload file from local storage instead of using URL
	// make_request("POST", "https://api.luxand.cloud/subject/" + response.id, {}, {photo: "/path/to/image.jpg"}, function(body){
	make_request("POST", "https://api.luxand.cloud/subject/" + response.id, {photo: "https://faces.nyc3.cdn.digitaloceanspaces.com/brad-pitt.jpg"}, {}, function(body){
		console.log("Verifying Brad Pitt in this photo https://faces.nyc3.cdn.digitaloceanspaces.com/angelina-and-brad.jpg")
		
		// You can also upload file from local storage instead of using URL
		// make_request("POST", "https://api.luxand.cloud/photo/verify/" + response.id, {}, {"photo": "/path/to/image.jpg"}, function(body){
		make_request("POST", "https://api.luxand.cloud/photo/verify/" + response.id, {"photo": "https://faces.nyc3.cdn.digitaloceanspaces.com/angelina-and-brad.jpg"}, {}, function(body){
                	console.log(body)
       		})
	})
})