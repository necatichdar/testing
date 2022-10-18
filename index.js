const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.json({ message: "Welcome to ahmet-advert application." });
});

db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to ahmet-advert application." });
});



// firebase storage upload 
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    // 
    credential: admin.credential.cert(serviceAccount),
    // Storage url buraya gelecek
    storageBucket: "gs://dsn-web-27534.appspot.com"
});
app.locals.bucket = admin.storage().bucket()

app.get('/backup', function (req, res) {
    console.log(path.join(__dirname, 'app/view', '/index.html'));
    console.log("****");
    console.log(req.query.id);
    res.sendFile(path.join(__dirname, 'app/view', '/upload.html'));
});

app.post('/backup', async function (req, res) {
    console.log("****");
    console.log(req.body);
    if (req.body.name == 'Necati@06+') {
        await app.locals.bucket.upload(path.join(__dirname, 'database.sqlite'), {
            destination: `backup/${new Date().toISOString().
                replace(/T/, ' ').
                replace(/\..+/, '')}/database.sqlite`,
        });
        res.redirect('/')
        // res.send('Yeni Database Kaydedildi!');
    }
    else {
        res.send('Yeni Database Kaydedilemedi!');
    }
});
// app.get('/upload', async (req, res) => {
//     var r = await app.locals.bucket.upload(path.join(__dirname, 'database.sqlite'), {
//         destination: `backup/${new Date().toISOString().
//             replace(/T/, ' ').
//             replace(/\..+/, '')}/database.sqlite`,
//     })
//     console.log(r);
//     res.send('done');
// })

app.get('/getDB', function (req, res) {
    const file = path.join(__dirname, 'database.sqlite');
    res.download(file); // Set disposition and send it.
});

//? Tanımlama İşlemleri
const advertRouter = require('./app/routes/advert.routes');
const userRouter = require('./app/routes/user.routes');
app.use('/api/advert', advertRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
