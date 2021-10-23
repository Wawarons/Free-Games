import React, { useEffect } from 'react';
import aboutLogo from '../Images/about-50.png';
import windows from '../Images/windows24px.jpg';
import browser from '../Images/globe24px.jpg';
const GameCard = ({title, plateforme, genre, image, id}) => {
        const getPlateforme = (plateforme) => {
            if(plateforme.plateforme === "PC (Windows)"){
                return <img src = {windows} alt = "windows-logo" />
            }else{
                return <img src = {browser} alt = "browser-logo" />
            }
        }
        

    return (
        <div className = "Game" id = {id}>
            <div className = "about-hover">
            <img src={aboutLogo} alt="about-logo" id = "about-logo-hover"/>
            </div>
            <h2>{title}</h2>
            <img src={image} alt={title} className = "picture-game"/>
            <p>{genre}<span>{getPlateforme({plateforme})}</span></p>
        </div>
    );
};

export default GameCard;