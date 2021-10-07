const express = require('express')
const app = express();
const router = express.Router();

const pool = require('./database');

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM person');
    console.log(links);
    res.send(links)
})

pool.query('select * from person');

app.listen(3000, () => {
    console.log('Port listen', 3000);
});