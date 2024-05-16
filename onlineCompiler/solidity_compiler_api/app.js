const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/database');
const questionRoutes = require('./routes/questionRoutes.js');
const compileRoutes = require('./routes/compilerRoute.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', compileRoutes);
app.use('/questions', questionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
