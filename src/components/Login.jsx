function Login() {
    const clientID = "abc07599e714445188e214243ba389dc";
    // const clientSecret = "4606ab8aecf84187bc446f7af5601f36";
    const redirectURI = `http://[::1]:5173/callback`;
    const scope = ["user-read-email","user-read-private", "user-follow-read", "user-top-read", "user-read-recently-played"];
    const redirect_url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=${scope}&state=123456&redirect_uri=${redirectURI}&prompt=consent`;
    
    return ( 
        <>
        <a href={redirect_url}>Connect to Spotify Account</a>
        </>  
    );
}

export default Login