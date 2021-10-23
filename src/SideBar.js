import React from 'react';

const SideBar = () => {
    const categorieOptions = ["mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"];

    const showOrHidden = (e) => {
        if(e.target.textContent === "Categories"){
            let divUsed = document.getElementById("categorie-options");
            if(divUsed.style.visibility === "hidden"){
                divUsed.style.visibility = "visible";
                divUsed.style.position = "unset";
            }else{
                divUsed.style.visibility = "hidden";
                divUsed.style.position = "absolute";
            }
            
        }else{
            let divUsed = document.getElementById("categorie-options-plateforme");
            if(divUsed.style.visibility === "hidden"){
                divUsed.style.visibility = "visible";
                divUsed.style.position = "unset";
            }else{
                divUsed.style.visibility = "hidden";
                divUsed.style.position = "absolute";
            }
        }
    }

    return (
    <div className = "side-bar">
            <h1>Wawarons</h1>
            <div  className="categories">
                <h2 onClick = {showOrHidden}>Categories</h2>
                <div id = "categorie-options">
                    {
                        categorieOptions.map((option, index) => {
                            return <p key = {index} className = "categorie" >{option}</p>
                        })
                    }
                </div>
            <h2 onClick = {showOrHidden}>Platforms</h2>
            <div id="categorie-options-plateforme">
                <p className = "categorie" id = "PC">PC</p>
                <p className = "categorie" id = "Browser">Browser</p>
            </div>
            </div> 
        </div>
    );
};

export default SideBar;