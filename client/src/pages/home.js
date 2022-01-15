import React from "react";
import BannerImage from "../assets/Best-Online-Shopping-Sites-For-Grocery.jpeg";
import "./styles/home.css";
function Home() {
    return (
 <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Welcome Online Grocery Store </h1>
        
        <button> Search </button>
        
        <button> Saved Items </button>
      </div>
    </div>
  );

}

export default Home;