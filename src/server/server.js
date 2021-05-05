const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
// const router = express.Router();
app.use(cors());
app.use(bodyParser.json());

let dbConn = null;

app.post('/database/connections', (req, res) => {
    const user = req.get('user');
    if (!user) {
        res.status(400);
        return res.send("No user sent in db connection");
    }
    const host = req.get('host');
    const password = req.get('password');
    const database = req.get('database');
    try {
        if (dbConn) {
            dbConn.end();
            // dbConn.release();
        }
        dbConn = mysql.createConnection({
            host,
            user,
            password,
            database
        })
        return res.status(200);
    } catch (e) {
        res.status(400);
        res.send(e);
    }
})

app.get("/database", (req,res)=>{
    if (!dbConn) {
        res.status(400);
        return res.send("No connections have been established (yet).")
    }
    dbConn.query('SHOW DATABASES', (error, results, field) => {
        res.send(results);
    });
});

const [port, host] = [5000, 'localhost']
const server = app.listen(port, host, () => {
    console.log(`server running at http://${host}:${port}`);
});

process.on('SIGINT', () => {
    console.log('\nexiting gracefully.');
    console.log('cleaning up resources, and connections.');
    if (dbConn) {
        dbConn.end();
    }
    server.close();
    process.exit();
})

process.on('SIGTERM', () => {
    console.log('cleaning up resources');
    // db.end();
    app.close();
    process.exit();
})

