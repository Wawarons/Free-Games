import React, {Suspense, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import GameCard from './Components/GameCard';
const api_key = process.env.REACT_APP_API_KEY;
const Games = () => {
    const [data, setData] = useState([]);
    const sortType = [{nom: "Popularité",type: "popularity"},{nom: "Release date",type: "release-date"},{nom: "alphabetical",type: "alphabetical"},{nom: "relevance",type: "relevance"}];
    const [categorieChoisie, setCategorieChoisie] = useState([]);
    const [plateformeChoisie, setPlateformeChoisie] = useState([]);
    const method = {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            "x-rapidapi-key": api_key
        }  
    }

    useEffect(() => {
        document.querySelectorAll(".categorie").forEach((categorie) => {    
            categorie.addEventListener("click", (e) => {
                if(e.target.textContent === "PC" || e.target.textContent === "Browser"){
                    e.target.textContent === "PC" ? document.getElementById("Browser").classList.remove("selected"):document.getElementById("PC").classList.remove("selected")
                    gestionAddOrRemoveValueFromData(plateformeChoisie, setPlateformeChoisie, e.target);
                }else{
                    gestionAddOrRemoveValueFromData(categorieChoisie, setCategorieChoisie, e.target);
                }
                getDataSortedByType();
                e.target.classList.toggle("selected");
            })
            
        });


        const gestionAddOrRemoveValueFromData = (dataName, setDataName, value) => {
            dataName === plateformeChoisie ? (
                setDataName(dataName.pop())
                ):setDataName(dataName);
            if(dataName.includes(value.textContent)){
                let index = dataName.indexOf(value.textContent);
                if (index > -1){dataName.splice(index, 1)}
            }else{
                setDataName(dataName.push(value.textContent));
            }
            }
        getData();
        }, []);
        
    const getData = () => {
        document.querySelectorAll(".categorie").forEach((categorie) => {
            categorie.classList.remove("selected");
        })
        fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", method)
            .then(response => response.json()).then((data) => setData(data))
            .catch(err => {
	            console.error(err);
            });
    }

    const getDataSorted = (e) => {
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${e.target.dataset.sort}`,method)
    .then(response => response.json()).then((data) => setData(data)).catch(err => {console.error(err)});
    }


    const getDataSortedByType = () => {
        if(plateformeChoisie.length > 0 && categorieChoisie.length > 0){
            fetch(`https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${categorieChoisie.join(".")}&platform=${plateformeChoisie.join(".").toLowerCase()}`, method)
            .then(response => response.json()).then((data) => setData(data))
            .catch(err => {console.error(err)});

        }else if (categorieChoisie.length > 0 && plateformeChoisie.length === 0){
            fetch(`https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${categorieChoisie.join(".")}`, method)
            .then(response => response.json()).then((data) => setData(data))
            .catch(err => {console.error(err)});

        }else if(plateformeChoisie.length && categorieChoisie.length === 0){
            fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${plateformeChoisie.join(".").toLowerCase()}`, method)
            .then(response => response.json()).then((data) => setData(data))
            .catch(err => {console.error(err)});
        }else{
            getData();
        }
    }

    const SearchData = (inputValue) => {
        let gamesResearch = [];
        if(inputValue){
                data.map((game) => {
                    if(game.title.toLowerCase().includes(inputValue.toLowerCase())){
                        return gamesResearch.push(game);
                    }
                })
                setData(gamesResearch);
                setTimeout(() => {
                    document.querySelectorAll(".Game").forEach((game) => {
                        game.addEventListener("click", (e) => {
                          e.stopImmediatePropagation();
                          window.location.href = `game-info/${e.currentTarget.id}`;
                        })
                      });
                },200)
            }else{
                getDataSortedByType();
            }
    }

     return (
         <div className = "games-list-home">
             <div className ="sort-bar">
                <input type = "search" onChange = {(e) => SearchData(e.target.value)} placeholder = "Search"/>
                <div className="sort-option">
                {
                    sortType.map((sortBy, index) => {
                        return <h3 key = {index} data-sort = {sortBy.type} onClick = {getDataSorted}>{sortBy.nom}</h3>
                    })
                }
                </div>
             </div>
             {
                 data.length > 0 ?
                 data.map((game, index) => {
                    return (
                        <Link key = {index} to = {`game-info/${game.id}`}>
                            <GameCard  key = {index} id = {game.id} title = {game.title} plateforme = {game.platform} genre = {game.genre}  image = {game.thumbnail}/>
                        </Link>
                    )
                 }):null

             }
         </div>
     );
};
export default Games;
    
