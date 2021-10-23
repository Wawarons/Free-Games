import React from 'react'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import GameInfo from './GameInfo';
import Games from './Games';
import SideBar from './SideBar';
import Error from './Error';

function App() {
  return (
    <div className="App">
      <Router basename = "/Free-Games">
        <Switch>
          <Route exact path = "/">
            <SideBar />
            <Games />
          </Route>
          <Route exact path = "/game-info/:idGameInfo"> 
              <GameInfo id = {window.location.href.split("/")[window.location.href.split("/").length - 1]} />
          </Route>
          <Route path = ""> 
              <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
