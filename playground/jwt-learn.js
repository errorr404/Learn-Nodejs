const jwt = require('jsonwebtoken');

const data = {
  id: "dixit",
}

var token = jwt.sign(data,'dixit123');
console.log(token);

var decoded = jwt.verify(token,'dixit123');
console.log('decoded  ',decoded);
