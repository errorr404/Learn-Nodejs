// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/', { 'useNewUrlParser': true },(err,database)=>{
  if(err) {
     return console.log('unable to connect to MongoDB server');
  }else {

  console.log('Connected to MongoDB server');
 // console.log('da',db);
  const db = database.db('TodoApp');
  db.collection('Todos').insertOne({
      text:"HEllo,This is Dixit",
      place:"Bhopal"
  },(err,result)=>{
    if(err) {
      return console.log('Unable to insert todo',err);
    }
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2))
  });

  database.close();
}

});
