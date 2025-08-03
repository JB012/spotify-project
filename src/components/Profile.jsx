import { useEffect, useState } from "react"
import axios from 'axios'
import useAuth from "./useAuth";
import '../App.css'

function pad(num) {
    return (num < 10) ? '0' + num.toString() : num.toString();
}

function convertDurationToMinSec(duration_ms) {
    const seconds = duration_ms / 1000;
    return `${Math.floor(seconds / 60)}:${pad(Math.floor(seconds % 60))}`;
}
function Profile({code}) {
    //Writing as a custom Hook deduplicates requests and cache responses between components. 
    const {data: userData} = useAuth(code);
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [timeRange, setTimeRange] = useState("");

    function handleTimeRange(event) {
        const timeRange = event.target.value;
        if (timeRange !== "") {
            event.target.style.color = "white";

            axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, {
                headers: {
                    Authorization: `Bearer ${userData["access_token"]}`
                }
            }).then(topArtists => {
                axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, {
                    headers: {
                        Authorization: `Bearer ${userData["access_token"]}`
                    }
                }).then(topTracks => {
                    setTimeRange(timeRange);    
                    setTopArtists(topArtists.data.items);
                    setTopTracks(topTracks.data.items);
                }).catch(err => console.log(err.response.data));
            }).catch(e => console.log(e.response.data));
        }
    }

    useEffect(() => {
        if (userData !== '') {
            axios.get("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
                headers: {
                    Authorization: `Bearer ${userData["access_token"]}`
                }
            }).then(topArtists => {
                axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
                    headers: {
                        Authorization: `Bearer ${userData["access_token"]}`
                    }
                }).then(topTracks => {    
                    setTopArtists(topArtists.data.items);
                    setTopTracks(topTracks.data.items);
                }).catch(err => console.log(err.response.data));
            }).catch(e => console.log(e.response.data));
        }
    }, [userData]);

    return (
        <div className="flex">
            <nav>
                <a href="#">Profile</a>
                <a href="#">Player</a>
            </nav>
            <div className="container w-full h-full pl-50 pt-20 pr-20">
                <header id="header-container" className="flex flex-col gap-y-10 justify-center items-center w-full h-full">
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
                </header>
                <div className="flex w-full justify-end">
                    <select onChange={(e) => handleTimeRange(e)}>
                        <option style={{color: timeRange === "short_term" ? "white" : "gray"}} value="short_term">Short Term</option>
                        <option style={{color: timeRange === "medium_term" ? "white" : "gray"}} value="medium_term">Medium Term</option>
                        <option style={{color: timeRange === "long_term" ? "white" : "gray"}} value="long_term">Long Term</option>
                    </select>
                </div>
                <section id="top-container" className="flex justify-around">
                    <div id="top-artists" className="flex flex-col grow w-full">
                        <div>Top Artists</div>
                        <ul id="top-artists-list" className="w-full">
                        {
                                topArtists.map((topArtist) => 
                                <li key={topArtist.id} className="top-artists-item">
                                    <img width='50px' height='50px' className="rounded-full" src={topArtist.images[2].url} />
                                    <div>{topArtist.name}</div>
                                </li>)
                            }
                        </ul>
                    </div>
                    <div id="top-songs" className="flex flex-col grow w-full">
                        <div>Top Tracks</div>
                        <ul id="top-songs-list" className="w-full">
                            {
                                topTracks.map((topTrack) => 
                                    <li key={topTrack.id} className="top-tracks-item">
                                        <img src={topTrack.album.images[2].url}/>
                                        <div className="flex flex-col w-full">
                                            <div className="flex justify-between">
                                                <div>{topTrack.name}</div>
                                                <div className="sub-text text-center">
                                                    {
                                                       convertDurationToMinSec(topTrack["duration_ms"])
                                                    }
                                                </div>
                                            </div>
                                            <div className="sub-text">
                                                {
                                                    topTrack.album.artists.map((artist) => artist === topTrack.album.artists[topTrack.album.artists.length - 1] ? `${artist.name} ` : `${artist.name}, `)
                                                }
                                                &middot; 
                                                {` ${topTrack.album.name}`}
                                                
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
};
export default Profile