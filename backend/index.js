import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';
import routes from './routes/seminarRoutes.js';
import reviewroutes from './routes/reviewRoutes.js';

const app = express();
const PORT = 5000;

// mongo connection
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost/reactMastersDB', {
	
mongoose.connect('mongodb+srv://wamidgette:wamidgette@cluster0.mw6fd.mongodb.net/webinars_database?retryWrites=true&w=majority', {  //Atlas database connection
    useNewUrlParser: true,
    useUnifiedTopology: true},
	() => console.log(" Mongoose is connected")
);

// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// CORS setup
app.use(cors());

routes(app);
reviewroutes(app);

app.get('/', (req, res) => 
    res.send(`Our seminar application is running on port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`Our seminar server is running on port ${PORT}`)
);

