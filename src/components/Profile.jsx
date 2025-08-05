import { useEffect, useState } from "react"
import axios from 'axios'
import useAuth from "./useAuth";
import '../App.css'
import { replace, useNavigate } from "react-router";

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
    /* const [currentPage, setCurrentPage] = useState("Profile");
    const navigate = useNavigate(); */

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
        <>
            {/* <nav>
                <svg style={{alignSelf: "center"}} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#1ED760" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                </svg>
                <div className="flex flex-col h-full justify-center text-xs">
                    <div onClick={() => {setCurrentPage("Profile"); navigate("/profile", {replace: true});}} style={{backgroundColor: currentPage === "Profile" ? "#141414" : "", borderLeft: currentPage === "Profile" ? "4px solid #1ED760" : "4px solid black"}} className={"flex flex-col items-center gap-2"}>
                        <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><title>Profile</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
                        <a href="#">Profile</a>
                    </div>
                    <div onClick={() => {setCurrentPage("Player"); navigate("/player", {replace: true})}} style={{backgroundColor: currentPage === "Player" ? "#141414" : "", borderLeft: currentPage === "Player" ? "4px solid #1ED760" : "4px solid black"}} className="flex flex-col gap-2 items-center">
                        <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><title>Player</title><path d="M14.5,10.37C15.54,10.37 16.38,9.53 16.38,8.5C16.38,7.46 15.54,6.63 14.5,6.63C13.46,6.63 12.63,7.46 12.63,8.5A1.87,1.87 0 0,0 14.5,10.37M14.5,1A7.5,7.5 0 0,1 22,8.5C22,10.67 21.08,12.63 19.6,14H9.4C7.93,12.63 7,10.67 7,8.5C7,4.35 10.36,1 14.5,1M6,21V22H4V21H2V15H22V21H20V22H18V21H6M4,18V19H13V18H4M15,17V19H17V17H15M19,17A1,1 0 0,0 18,18A1,1 0 0,0 19,19A1,1 0 0,0 20,18A1,1 0 0,0 19,17Z" /></svg>
                        <a href="#">Player</a>
                    </div>
                </div>
            </nav> */}
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
                                    <img width='64px' height='64px' className="rounded-sm" src={topArtist.images[2].url} />
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
                                        <img className="rounded-sm" src={topTrack.album.images[2].url}/>
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
        </>
    )
};
export default Profile