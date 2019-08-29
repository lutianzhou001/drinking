var unirest = require("unirest");
var sd = require('silly-datetime');
var req = unirest("POST", "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send");
var cron = require('node-cron');


cron.schedule('* 7,9,11,13,15,17,19,20 * * *', () => {
req.headers({
	"x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
	"x-rapidapi-key": "ae2ad23146msh06a431323e86027p11a924jsn731ce3762748",
	"content-type": "application/json",
	"accept": "application/json"
});

req.type("json");

var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
var value  = "亲爱的：现在时间 "+time+"，请喝水"
console.log(value)
req.send({
	"personalizations": [
		{
			"to": [
				{
					"email": "lihaley@sina.cn"
				}
			],
			"subject": value
		}
	],
	"from": {
		"email": "Donald_Trump@whitehouse.com"
	},
	"content": [
		{
			"type": "text/plain",
			"value": value + "              ————来自特朗普的iPhone"
		}
	]
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);
	console.log(res.body);
});
});
