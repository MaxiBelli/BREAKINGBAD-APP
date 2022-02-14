import React from "react";
import { Link } from "react-router-dom" 


export default function LandingPage(){
    return(
        <div>
            <h1>Welcome to Breaking Bad App</h1>
            <Link to="/home">
                <button>Get Into</button>
            </Link>
        </div>
    )
}