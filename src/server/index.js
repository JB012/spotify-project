const express = require("express");
const axios = require('axios');
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');

require("dotenv").config({
    path: path.resolve(__dirname, ".env")
});

const corsOptions = {
    origin: ["http://[::1]:5173"]
};
const app = express();

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname + "\\..")));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = "http://[::1]:5173/profile";
const scope = ["user-read-email","user-read-private", "user-follow-read", "user-top-read", "user-read-recently-played"];
const port = 3001;

app.get("/login", (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=${scope}&state=123456&redirect_uri=${redirectURI}&prompt=consent`);
});

app.post("/authorize", (request, response) => {
    const code = request.body.code;
    axios.post(
        url = 'https://accounts.spotify.com/api/token',
        data = new URLSearchParams({
            'grant_type': 'authorization_code',
            'redirect_uri': redirectURI,
            'code': code
        }),
        config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(clientID + ':' + clientSecret).toString('base64'))
            }
        })
        .then(resp1 => {
            return response.send(JSON.stringify(resp1.data));
        }).catch(err => {console.log(err.response.data);console.log("/authorize error")});

})

//Might not need to implement in back-end since token would have to be updated via front-end but it might not matter.
app.post("/refresh", async (req, res) => {
    var refresh_token = req.body.refreshToken;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(clientID + ':' + clientSecret).toString('base64'))
        },
        form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
        },
        json: true
    };

    req.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token || refresh_token;
        res.send({
            accessToken: access_token,
            refreshToken: refresh_token
        });
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on :${port}`)
})