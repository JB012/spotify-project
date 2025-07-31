import { useEffect, useState } from "react"
import axios from 'axios'
import useAuth from "./useAuth";
import '../App.css'

function Profile({code}) {
    //Writing as a custom Hook deduplicates requests and cache responses between components. 
    const {data: userData} = useAuth(code);
    const [topArtists, setTopArtists] = useState([]);
    
    useEffect(() => {
        if (userData !== '') {
            axios.get("https://api.spotify.com/v1/me/top/artists", {
                headers: {
                    Authorization: `Bearer ${userData["access_token"]}`
                }
            }).then(topArtists => {
                setTopArtists(topArtists.data.items);
            }).catch(e => console.log(e.response.data));
        }
    }, [userData]);

    /* useEffect(() => {
        if (authenticationData.accessToken !== "") {
            axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${authenticationData.accessToken}`
                }
            })
            .then(jsonData => setUserData({data: jsonData.data}))
            .catch(err => {
                    console.log(err.response.data);
                    if (err.response.status === "401") {
                        axios.post("http://[::1]:3001/refresh", {accessToken: authenticationData.accessToken})
                        .then(tokens => {
                            authenticationData.accessToken = tokens.accessToken;
                            authenticationData.refreshToken = tokens.refreshToken;
                        })
                        .catch(err => console.log(err.response.data))
                    }
                });
                
        }
    }, [authenticationData, userData]); */

    return (
        <>
            <div className="container w-full h-full">
                <div id="header-container" className="flex flex-col gap-y-2 justify-center items-center w-full h-full">
                    <div className="text-3xl font-bold">
                        {userData["display_name"]}
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex flex-col text-center">
                            <div className="green-text">{userData.followers?.total}</div>
                            <div className="sub-text">FOLLOWERS</div>
                        </div>
                        <div className="flex flex-col text-center">
                            <div className="green-text">{userData.following?.total}</div>
                            <div className="sub-text">FOLLOWING</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Profile