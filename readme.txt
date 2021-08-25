mkdir testMongo
cd testMongo
npm init -y
npm install npm install express body-parser cors mongo uuid express-promise-router
npm install mongodb

use studentdb
db.students.drop()
db.students.insert( { '_id' : '0001', 'fname': 'Susan', 'lname' : 'Smith', 'grade': 'A' })
db.students.insert( { '_id' : '0002', 'fname': 'Tim', 'lname' : 'Duncan', 'grade': 'B'})
db.students.insert( { '_id' : '0003', 'fname': 'John', 'lname' : 'Doe', 'grade': 'C' })
db.students.insert( { '_id' : '0004', 'fname': 'Julie', 'lname' : 'Jones', 'grade': 'B' })
db.students.count()