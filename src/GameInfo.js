import React, { useEffect, useState } from 'react';
import signePlus from './Images/signe-plus.png';
import manetteLogo from './Images/manette-logo.png';
import HomeLogo from './Images/Home-logo.png';
const api_key = process.env.REACT_APP_API_KEY;
const GameInfo = ({id}) => {
    const [dataGameInfo, setDataGameInfo] = useState([]);
    const [screenshots, setScreenshots] = useState(false);
    const regExp = /[a-zA-Z]/g;
    const method = {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            "x-rapidapi-key": api_key
        }  
    }
    
    useEffect(() => {
       if(regExp.test({id}.id) || parseInt({id}.id) > 514){
           window.location.href = "/game-not-found";
        }else{
            fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${window.location.href.split("/")[window.location.href.split("/").length - 1]}`, method)
            .then(response => response.json()).then((data) => {
                if (data.satus !== 0){
                    setDataGameInfo(data);
                    if(data.screenshots.length){
                        setScreenshots(true)
                    }else{
                        setScreenshots(false);
                    }
                }else{
                    window.location.href = "";
                }
            })
            .catch(err => {console.error(err)});
        }
        }, [])

    let listeImg = null;
    if(screenshots === true) {
        listeImg = dataGameInfo.screenshots.map((image, index) => {
            if(index < 3){
                return <li key = {index}><img src={image.image} className = "img-screenshots" alt = {`${dataGameInfo.title}-screenshots-${index}`}/></li>;
            }
            return null;
        })
    };

    const hiddenShowMoreGameInfo = () => {
        const moreInfoGame = document.querySelector(".more-info");
        moreInfoGame.classList.toggle("hidden");
    }

    const parseDate = (date) => {
            let newDate = new Date(date);
            newDate = newDate.toLocaleDateString("FR-fr", {year: "numeric",month: "long", day: "numeric"});
            return newDate;
    };        

    return (
        <div className = "background-game-info">
        <img src={HomeLogo} alt="Acceuil-logo" id = "Home-logo" onClick = {() => window.location.href = "/FreeGames/"}/>
        <div className = "game-info-container">
            <a href= {dataGameInfo.game_url} target = "_blank"><img src={manetteLogo} alt="manette-logo" id = "manette-logo"/></a>
            <p id = "genre-game">{dataGameInfo.genre}</p>
            <h1>
                {dataGameInfo.title}
            </h1>
            <div className="top-container">
             <img src= {dataGameInfo.thumbnail} alt= {dataGameInfo.title} />
             <p className = "short-description">{dataGameInfo.short_description}</p>
            </div>
            <div className = "description">
                <h2>Description :</h2>
                <p>{dataGameInfo.description}</p>
            </div>
            <div className = "img-game">
                <ul id = "liste-screenshots-game">{listeImg}</ul>
            </div>
        <div className = "more-info-signe" onClick = {hiddenShowMoreGameInfo}>
            <img src={signePlus} alt="" style = {{width: "32px", height: "32px"}}/>
        </div>
        <div className ="more-info hidden">
            <div className = "informations-about-game">
                <h2>Platform :</h2>
                <p>{dataGameInfo.platform}</p>
            </div>
            <div className = "informations-about-game">
                <h2>Publisher :</h2>
                <p>{dataGameInfo.publisher}</p>
            </div>
            <div className = "informations-about-game">
                <h2>Developer :</h2>
                <p>{dataGameInfo.developer}</p>
            </div>
            <div className = "informations-about-game">
                <h2>Release date :</h2>
                <p>{dataGameInfo.release_date ? parseDate(dataGameInfo.release_date):null}</p>
            </div>
        </div>
        <div className="relevance-games">
            
        </div>
        </div>
    </div>
    );
};

export default GameInfo;