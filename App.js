import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import mongoose, { mongo } from 'mongoose';
import morgan from 'morgan';
import Hello from './hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import UserRoutes from './Users/routes.js';
import cors from 'cors';

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/kanbas';
console.log('Connecting to MongoDB at ' + CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);
// Wait for the connection to be established
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
const sessionOptions = {
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV === 'development') {
    console.log('Running in development mode');
    sessionOptions.proxy = true;
    sessionOptions.cookie = { 
        secure: true, 
        sameSite: 'none',
    };
}
app.use(session(sessionOptions));
Lab5(app);
Hello(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
app.listen(4000, () => console.log('Server running on port 4000'));