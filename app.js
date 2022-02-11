require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./database/db');
const userRoute = require('./routes/UserRoutes');
const productRoute = require('./routes/ProductRoutes');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');

//middleware
app.use(express.json());
app.use(cors());
connectDB();

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

app.get('/', (req, res, next) => {
    res.send('API is working');
})

//error-handling
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`App is running on port ${port}`));


