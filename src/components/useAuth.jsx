import { useState, useEffect } from "react"
import axios from 'axios'

function useAuth(code) {
    /* const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [expiresIn, setExpiresIn] = useState(""); */
    const [userData, setUserData] = useState({data: ""});
    useEffect(() => {
        //TODO: catch(err => if status 401 then refresh tokens)
        axios.post("http://[::1]:3001/login", {code}).then(json => {
            
            /* setAccessToken(json.data.access_token);
            setRefreshToken(json.data.refresh_token);
            setExpiresIn(json.data.expires_in) */

            axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${json.data.access_token}`
                }
            }).then(jsonData => {
                axios.get("https://api.spotify.com/v1/me/following?type=artist", {
                    headers: {
                    Authorization: `Bearer ${json.data.access_token}`
                   } 
                }).then(followingList => {
                    setUserData({data: {...json.data, ...jsonData.data, following: followingList.data.artists}});
                }).catch(err => {
                    console.log(err.response.data);
                });
            })
        });

    }, [code]);

    return userData
}

export default useAuth