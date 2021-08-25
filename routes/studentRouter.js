import express, { query } from 'express'
import Router from 'express-promise-router'
import {v4 as uuidv4} from 'uuid'
import mongodb from 'mongodb'

const router = Router();
const { MongoClient } = mongodb;

var uri = 'mongodb://localhost:27017'
var options = ''

const queryStudents = ((req, res, next) => {
    var students = []
    
    try {


        MongoClient.connect( uri, options, function( err, client) {
            const db = client.db('studentdb');  // use studentdb

                // step 1: declare promise
                var myPromise = () => {
                    return new Promise(( resolve, reject) => {
                        db.collection('students')
                        .find()
                        .toArray( function(err,data) {
                            if (err) {
                                console.log('queryStudent: err=' + err)
                            }
                            else {
                                    data.forEach( (element) => {
                                        let student = {'id': element['_id'],
                                            'fname': element['fname'],
                                            'lname': element['lname'],
                                            'grade': element['grade']}
                                        students = [ ...students, student]
                                    })
                            }
                            resolve( students)
                        })
                    })   
                }
                // step 2: async promise handler
                var callMyPromise = async () => {
                    var result = await( myPromise() );
                    return result;  //executed after result is resolved
                }
                // step 3: make the call 
                callMyPromise().then( function (result) {
                    client.close();
                    console.log('queryStudents:callMyPromise()')
                    res.status(200).json({data: result});
                }) 
            })    
    }
    catch (e) {
        next(e);
    }

    //res.status(200).json( {'status': 'ok'})
});
//==================================================================================
// queryStudent
//==================================================================================
const queryStudent = ((req, res, next) => {
    const {id} = req.params   
    const query = {'_id': id} 
    try {

        MongoClient.connect( uri, options, function( err, client) {
            const db = client.db('studentdb');  // use studentdb

                // step 1: declare promise
                var myPromise = () => {
                    return new Promise(( resolve, reject) => {
                        db.collection('students')
                        .find(query)
                        .limit(1)
                        .toArray( function(err,data) {
                            if (err) {
                                console.log('queryStudent: err=' + err)
                            }
                            else {
                                var element = data[0]
                                let student = {'id': element['_id'],
                                            'fname': element['fname'],
                                            'lname': element['lname']}
                                    resolve(student);
                            }
                           
                        })
                    })   
                }
                // step 2: async promise handler
                var callMyPromise = async () => {
                    var result = await( myPromise() );
                    return result;  //executed after result is resolved
                }
                // step 3: make the call 
                callMyPromise().then( function (result) {
                    client.close();
                    console.log('queryStudent:callMyPromise()')
                    res.status(200).json({data: result});
                }) 
            })    
    }
    catch (e) {
        next(e);
    }

    //res.status(200).json( {'status': 'ok'})
});
//==================================================================================
// insertStudent
//==================================================================================
const insertStudent = ((req, res, next) => {
    const {fname, lname, grade} = req.body   
    const user = {'_id': uuidv4(), 'fname': fname, 'lname': lname, 'grade': grade}
    console.log('insertStudent:user=' + JSON.stringify(user));
    try {

        MongoClient.connect( uri, options, function( err, client) {
            const db = client.db('studentdb');  // use studentdb

                // step 1: declare promise
                var myPromise = () => {
                    return new Promise(( resolve, reject) => {
                        db.collection('students')
                        .insertOne(user)
                        .then( (value) => {
                            console.log('insertStudent: value=' + value);
                            if (err) {
                                console.log('queryStudent: err=' + err)
                            }
                            else {
                                resolve({value});
                            }
                           
                        })
                    })   
                }
                // step 2: async promise handler
                var callMyPromise = async () => {
                    var result = await( myPromise() );
                    return result;  //executed after result is resolved
                }
                // step 3: make the call 
                callMyPromise().then( function (result) {
                    client.close();
                    console.log('queryStudent:callMyPromise()')
                    res.status(200).json({data: result});
                }) 
            })    
    }
    catch (e) {
        next(e);
    }

    //res.status(200).json( {'status': 'ok'})
});
//==================================================================================
// updateStudent
//==================================================================================
const updateStudent = ((req, res, next) => {
    const {id} = req.params
    const {fname, lname, grade} = req.body   
    const query = { _id : id}
    const update = { $set: {'fname': fname, 'lname': lname, 'grade': grade}}
    const updateOptions = {upsert: false}
    console.log('updateStudent: update=' + JSON.stringify(updateStudent));
    try {
        // mongoClient.connect( 'mongodb://localhost:27017')
        MongoClient.connect( uri, options, function( err, client) {
            const db = client.db('studentdb');  // use studentdb

                // step 1: declare promise
                var myPromise = () => {
                    return new Promise(( resolve, reject) => {
                        db.collection('students')
                        .findOneAndUpdate(query, update, updateOptions)
                        .then( (value) => {
                            console.log('updateStudent: value=' + value);
                            if (err) {
                                console.log('queryStudent: err=' + err)
                            }
                            else {
                                resolve({value});
                            }
                           
                        })
                    })   
                }
                // step 2: async promise handler
                var callMyPromise = async () => {
                    var result = await( myPromise() );
                    return result;  //executed after result is resolved
                }
                // step 3: make the call 
                callMyPromise().then( function (result) {
                    client.close();
                    console.log('queryStudent:callMyPromise()')
                    res.status(200).json({data: result});
                }) 
            })    
    }
    catch (e) {
        next(e);
    }

    //res.status(200).json( {'status': 'ok'})
});
//==================================================================================
// deleteStudent
//==================================================================================
const deleteStudent = ((req, res, next) => {
    const {id} = req.params;
    const query = { _id: id }
    console.log('deleteStudent: id=' + id);
    try {

        MongoClient.connect( uri, options, function( err, client) {
            const db = client.db('studentdb');  // use studentdb

                // step 1: declare promise
                var myPromise = () => {
                    return new Promise(( resolve, reject) => {
                        console.log('deleteStudent: Promise()')
                        db.collection('students')
                        .deleteOne(query)
                        .then( (value) => {
                            console.log('deleteStudent: value=' + value);
                            if (err) {
                                console.log('deleteStudent: err=' + err)
                            }
                            else {
                                resolve({value});
                            }
                           
                        })
                    })   
                }
                // step 2: async promise handler
                var callMyPromise = async () => {
                    var result = await( myPromise() );
                    return result;  //executed after result is resolved
                }
                // step 3: make the call 
                callMyPromise().then( function (result) {
                    client.close();
                    console.log('deleteStudent:callMyPromise()')
                    res.status(200).json({data: result});
                }) 
            })    
    }
    catch (e) {
        next(e);
    }

    //res.status(200).json( {'status': 'ok'})
});


router.get('/', queryStudents)    // GET http://localhost:5000/students/
router.get('/:id', queryStudent)    // GET http://localhost:5000/students/:id
router.post('/', insertStudent)    //  POST http://localhost:5000/students/
router.delete('/:id', deleteStudent)    // delete http://localhost:5000/students/:id
router.patch('/:id', updateStudent)    // PATCH http://localhost:5000/students/:id
export default router