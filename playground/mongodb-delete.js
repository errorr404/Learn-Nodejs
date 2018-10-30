// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', { 'useNewUrlParser': true },(err,database)=>{
  if(err) {
     return console.log('unable to connect to MongoDB server');
  }else {

  console.log('Connected to MongoDB server');
 // console.log('da',db);
  const db = database.db('TodoApp');
  // delete many
  db.collection('Todos').deleteMany({text:'HEllo,This '}).then((result)=>{
    console.log(result);
  })

  //database.close();
}

});
