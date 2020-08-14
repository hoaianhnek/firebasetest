var express = require('express');
var app = express();

// router.get('/',function(req,res){
//   res.sendFile(path.join(__dirname + '/index.html'));
//   //__dirname : It will resolve to your project folder.
// });

// app.use('/', router);
// app.listen(port);
app.use(express.static(__dirname + '/'));
app.listen(8080, function() {console.log('server listening on port 8080...')})