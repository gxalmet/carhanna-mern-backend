import express from 'express';
import bodyparser from 'body-parser';

import projectRoutes from './routes/project-routes.js';
import userRoutes from './routes/user-routes.js';
import teamRoutes from './routes/team-routes.js';
import screamRoutes from './routes/scream-routes.js';
//import uploadRouter from './routes/uploadRouter.js';
//import commentRouter from './routes/commentRouter.js';
import cors from 'cors';
import User from './models/user.js';
import Project from './models/project.js';
import path from 'path';

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());


// app.use('/api/user/schema', async(req, res) => {
//     res.send(new User);
// });
// app.use('/api/project/schema', async(req, res) => {
//     res.send(new Project);
// });


app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/scream', screamRoutes);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'frontend/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
// });

//Export

export default app;