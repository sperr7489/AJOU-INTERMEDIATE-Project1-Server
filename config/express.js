const express = require("express");
const cors = require("cors");

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    require('../src/Feed/feedRoute')(app);
    
    return app;
}