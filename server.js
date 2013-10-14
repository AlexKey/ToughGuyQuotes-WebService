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
           callback(str); 
        });
    
    }
    
    http.get(url,responeCallBack).end();
}



http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    

    getQuotes("Alex", "Key", 10, function(quotes) {
    
        res.end(quotes);
    });
    


}).listen(process.env.PORT, process.env.IP);