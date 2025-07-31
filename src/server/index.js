const express = require("express");
const axios = require('axios');
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const { use } = require("react");

const corsOptions = {
    origin: ["http://[::1]:5173"]
};
const app = express();
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname + "\\..")));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

CLIENT_ID = "abc07599e714445188e214243ba389dc";
CLIENT_SECRET = "45e6e0ce7f7d4d1dad93aad10168ee34";
REDIRECT_URI = `http://[::1]:5173/callback`;
SCOPE = ["user-read-email","user-read-private"];
PORT=3001;

app.post("/login", (request, response) => {
    const code = request.body.code;
    axios.post(
        url = 'https://accounts.spotify.com/api/token',
        data = new URLSearchParams({
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'code': code
        }),
        config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            }
        })
        .then(resp1 => {
            return response.send(JSON.stringify(resp1.data));
        }).catch(err => console.log(err.response.data));

})

//Might not need to implement in back-end since token would have to be updated via front-end but it might not matter.
app.post("/refresh", async (req, res) => {
    var refresh_token = req.body.refreshToken;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
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

app.listen(PORT, () => {
    console.log(`Listening on :${PORT}`)
})