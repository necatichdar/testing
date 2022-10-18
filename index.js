const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ message: "Welcome to ahmet-advert application." });
});

db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to ahmet-advert application." });
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
