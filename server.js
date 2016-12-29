var express = require('express'),
    app = express(),
    path = require('path'),
    root = __dirname,
    bp = require('body-parser'),
    port = process.env.PORT || 8000;

app.use(express.static(path.join(root,'/client')));
app.use(express.static(path.join(root,'/bower_components')));
app.use(express.static(path.join(root,'/node_modules')));
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');

// app.get('/', function(req, res){
//   res.render("index");
// })

require('./server/config/mongoose.js');
require('./server/config/route.js')(app);



var server = app.listen(8000, function(){
  console.log("listening to port 8000")
});

require('./server/config/socket.js')(app, server);



