import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import studentRouter from './routes/studentRouter.js'

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req,res) =>{
    res.send('welcome home');
})

app.use('/students', studentRouter) // http://localhost:5000/students

app.listen(port,() => {
    console.log('listening on port ' +port);
})