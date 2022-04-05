const express = require("express");
const cors = require("cors");

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.get('/', (req, res) => {
        res.send('두잇 project1 중급 스터디 - API 서버');
    })

    require('../src/Feed/feedRoute')(app);
    require('../src/comment/commentRoute')(app);
    
    return app;
}