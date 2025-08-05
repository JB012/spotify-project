import Player from "./Player";
import Profile from "./Profile";
import { useNavigate } from "react-router";

function Pages({code, currentPage}) {
    const navigate = useNavigate();
    return (
        <div className="flex">
            <nav>
                <svg style={{alignSelf: "center"}} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#1ED760" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                </svg>
                <div className="flex flex-col h-full justify-center text-xs">
                    <div onClick={() => navigate("/profile", {replace: true})} style={{backgroundColor: currentPage === "Profile" ? "#141414" : "", borderLeft: currentPage === "Profile" ? "4px solid #1ED760" : "4px solid black"}} className={"flex flex-col items-center gap-2"}>
                        <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><title>Profile</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
                        <div>Profile</div>
                    </div>
                    <a href="/player" style={{backgroundColor: currentPage === "Player" ? "#141414" : "", borderLeft: currentPage === "Player" ? "4px solid #1ED760" : "4px solid black"}} className="flex flex-col gap-2 items-center">
                        <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><title>Player</title><path d="M14.5,10.37C15.54,10.37 16.38,9.53 16.38,8.5C16.38,7.46 15.54,6.63 14.5,6.63C13.46,6.63 12.63,7.46 12.63,8.5A1.87,1.87 0 0,0 14.5,10.37M14.5,1A7.5,7.5 0 0,1 22,8.5C22,10.67 21.08,12.63 19.6,14H9.4C7.93,12.63 7,10.67 7,8.5C7,4.35 10.36,1 14.5,1M6,21V22H4V21H2V15H22V21H20V22H18V21H6M4,18V19H13V18H4M15,17V19H17V17H15M19,17A1,1 0 0,0 18,18A1,1 0 0,0 19,19A1,1 0 0,0 20,18A1,1 0 0,0 19,17Z" /></svg>
                        <div>Player</div>
                    </a>
                </div>
            </nav>
            {currentPage === "Profile" ? < Profile code={code}/> : <Player />}
        </div>
    )
}
export default Pages;