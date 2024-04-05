import express from 'express';
import morgan from 'morgan';
import Hello from './hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import cors from 'cors';


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
Lab5(app);
Hello(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
app.listen(4000, () => console.log('Server running on port 4000'));