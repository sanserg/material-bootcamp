const express = require("express");
const app = express();


// //Import route files
const rootRoutes = require('./routes/rootRoutes');

//Data parsers for the request body
app.use(express.json())

//Define the route files here
app.use('/',rootRoutes);

//Starts the application server 
var port = process.env.PORT || 6005
app.listen(port, function() {
    console.log("Server running at: http://localhost:" + port);
}); 




