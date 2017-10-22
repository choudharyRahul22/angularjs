var express = require('express'),
  app=express();


app.get('/customers',function (req,res) {
    res.json(customers);
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

var customers = [
    {joinDate:'11-22-2017',name:'Rahul',salary:'55000',city:'Bareilly'},
    {joinDate:'10-22-2017',name:'Shalu',salary:'54000',city:'Noida'},
    {joinDate:'18-22-2017',name:'Shubham',salary:'57000',city:'Delhi'},
    {joinDate:'19-22-2017',name:'Kuldeep',salary:'51000',city:'Ghaziabad'}


]