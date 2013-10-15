var http = require('http');

function getQuotes(firstName, lastName, count, callback) {
    var url = "http://api.icndb.com/jokes/random/" + count + "?firstName=" + firstName + "&lastName=" + lastName;

    
    var responeCallBack = function(response) {
        var str = '';

        //turn the stream into flow mode
        response.on('data', function(chunk) {
            str += chunk;
        });
        
        
        //when all the data is read
        response.on('end', function() {
           callback(JSON.parse(str)); 
        });
    
    }
    
    http.get(url,responeCallBack).end();
}



http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    
    getQuotes("Lyndon", "B", 10, function(data) {

        var quotes = data.value;

        var quotesToReturn = {};

        for (var i = 0; i < quotes.length; i++) {
            var quote = quotes[i]
                quotesToReturn[quote.id] = quote.joke;
                console.log(quote);
            
        }

        res.end(JSON.stringify(quotesToReturn));
    });


}).listen(process.env.PORT, process.env.IP);
