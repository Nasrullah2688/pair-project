const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const routerBio = require('./routes/routerBio')
const authMiddleware = require('./middleware/auth');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Terapkan middleware di level aplikasi
app.use('/profile', authMiddleware); // Terapkan middleware auth untuk rute profile
app.use('/admin', authMiddleware); // Jika Anda memiliki rute admin yang juga memerlukan autentikasi
app.use('/', userRoutes);
app.use('/', adminRoutes);
app.use('/', routerBio); // Tambahkan routerBio ke dalam aplikasi

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
