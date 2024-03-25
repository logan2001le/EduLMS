const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); 
const app = express();
const _CONST = require('./app/config/constant')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

require('./app/models/createTables');

// Thay đổi kết nối cơ sở dữ liệu
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'root',
    database: 'edutrack'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL.');
    }
});

const authRoute = require('./app/routers/auth');
const userRoute = require('./app/routers/user');
const notificationRoutes = require('./app/routers/notificationRoutes');
const contractsRoutes = require('./app/routers/contractsRouter');
const dashboardRouter = require('./app/routers/dashboardRouter');

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/notifications', notificationRoutes);
app.use('/api/contracts', contractsRoutes);
app.use('/api/dashboard', dashboardRouter);


const PORT = process.env.PORT || _CONST.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
